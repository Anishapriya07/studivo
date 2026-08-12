/* ==========================================
   STUDIVO GAMIFICATION ENGINE
   XP, Leveling, Daily Streaks, Quests & Celebration Confetti
   ========================================== */

class GamificationEngine {
  constructor(storage) {
    this.store = storage;
  }

  init() {
    this.updateHUD();
    this.checkDailyStreak();
    this.renderQuests();
    this.renderStore();
  }

  updateHUD() {
    const user = this.store.get().user;
    
    // Level & XP
    const levelEl = document.getElementById('user-level-badge');
    const xpTextEl = document.getElementById('user-xp-text');
    const xpBarEl = document.getElementById('user-xp-bar');
    const streakEl = document.getElementById('user-streak-count');
    const coinsEl = document.getElementById('user-coins-count');

    if (levelEl) levelEl.textContent = `Lvl ${user.level}`;
    if (xpTextEl) {
      const prevXp = this.previousXp !== undefined ? this.previousXp : user.xp;
      this.animateXPNumber(xpTextEl, prevXp, user.xp, user.maxXp);
    }
    this.previousXp = user.xp;

    if (xpBarEl) {
      const pct = Math.min(100, Math.round((user.xp / user.maxXp) * 100));
      xpBarEl.style.width = `${pct}%`;
    }
    if (streakEl) streakEl.textContent = `${user.streak}d`;
    if (coinsEl) coinsEl.textContent = user.coins;
  }

  animateXPNumber(el, start, end, maxXp) {
    if (start >= end) {
      el.textContent = `${end} / ${maxXp} XP`;
      return;
    }
    const duration = 500;
    const startTime = performance.now();
    el.classList.add('xp-pulse');

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress); // ease-out quad
      const currentXP = Math.floor(start + (end - start) * easeProgress);

      el.textContent = `${currentXP} / ${maxXp} XP`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${end} / ${maxXp} XP`;
        setTimeout(() => el.classList.remove('xp-pulse'), 200);
      }
    };
    requestAnimationFrame(update);
  }

  checkDailyStreak() {
    const user = this.store.get().user;
    const today = new Date().toISOString().split('T')[0];
    if (user.lastCheckin !== today) {
      const lastDate = new Date(user.lastCheckin);
      const currentDate = new Date(today);
      const diffDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        user.streak += 1;
      } else if (diffDays > 1) {
        user.streak = 1;
      }
      user.lastCheckin = today;
      this.store.saveState();
      this.updateHUD();
    }
  }

  addXP(amount, reason = 'Action Completed') {
    const state = this.store.get();
    const user = state.user;
    this.previousXp = user.xp;
    user.xp += amount;
    user.totalXp = (user.totalXp || (1800 + this.previousXp)) + amount;
    showToast(`+${amount} XP earned! 🎉 (${reason})`, 'success');

    // Level up check
    if (user.xp >= user.maxXp) {
      user.level += 1;
      user.xp = user.xp - user.maxXp;
      user.maxXp = Math.round(user.maxXp * 1.3);
      user.coins += 50; // Level up bonus coins
      showToast(`🎉 Level Up!<br>You reached Level ${user.level}!`, 'success');
      this.triggerLevelUpModal(user.level);
    }

    this.store.saveState();
    this.updateHUD();
  }

  addCoins(amount) {
    const user = this.store.get().user;
    user.coins += amount;
    this.store.saveState();
    this.updateHUD();
    showToast(`+${amount} Coins Received! 🪙`, 'info');
  }

  completeQuest(questId) {
    const state = this.store.get();
    const quest = state.gamification.quests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      quest.completed = true;
      this.store.saveState();
      this.addXP(quest.xp, quest.title);
      this.addCoins(quest.coins);
      this.renderQuests();
      if (typeof app !== 'undefined' && app.currentView === 'dashboard') {
        app.renderDashboardOverview();
      }
    }
  }

  buyStoreItem(itemId) {
    const state = this.store.get();
    const item = state.gamification.rewardsStore.find(r => r.id === itemId);
    if (!item) return;

    if (item.unlocked) {
      showToast(`Item '${item.title}' is already unlocked!`, 'info');
      return;
    }

    if (state.user.coins < item.cost) {
      showToast(`Not enough coins! Need ${item.cost - state.user.coins} more 🪙`, 'warning');
      return;
    }

    state.user.coins -= item.cost;
    item.unlocked = true;
    this.store.saveState();
    this.updateHUD();
    this.renderStore();
    showToast(`Unlocked '${item.title}'! 🎉`, 'success');
  }

  renderQuests() {
    const container = document.getElementById('quests-list-container');
    if (!container) return;

    const quests = this.store.get().gamification.quests;
    container.innerHTML = quests.map(q => `
      <div class="quest-card ${q.completed ? 'completed' : ''}">
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <div class="stat-icon-wrapper ${q.completed ? 'emerald' : ''}" style="width: 40px; height: 40px;">
            ${q.completed ? '✓' : '⚡'}
          </div>
          <div>
            <h4 style="font-size: var(--text-sm);">${q.title}</h4>
            <p style="font-size: var(--text-xs); color: var(--text-muted);">${q.desc}</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <span class="badge badge-primary">+${q.xp} XP</span>
          <span class="badge badge-warning">+${q.coins} 🪙</span>
          ${q.completed ? 
            `<button class="btn btn-sm btn-accent" disabled>Claimed</button>` : 
            `<button class="btn btn-sm btn-accent" onclick="gamification.completeQuest('${q.id}')">Claim XP</button>`
          }
        </div>
      </div>
    `).join('');
  }

  renderStore() {
    const container = document.getElementById('rewards-store-container');
    if (!container) return;

    const items = this.store.get().gamification.rewardsStore;
    container.innerHTML = items.map(item => `
      <div class="store-item-card">
        <div style="font-size: 2.5rem; margin-bottom: var(--space-2);">${item.icon}</div>
        <h4 style="font-size: var(--text-base);">${item.title}</h4>
        <span class="badge badge-primary">${item.type}</span>
        <div style="margin-top: var(--space-3); width: 100%;">
          ${item.unlocked ? 
            `<button class="btn btn-secondary btn-sm" style="width:100%;" disabled>Unlocked ✓</button>` : 
            `<button class="btn btn-primary btn-sm" style="width:100%;" onclick="gamification.buyStoreItem('${item.id}')">Buy (${item.cost} 🪙)</button>`
          }
        </div>
      </div>
    `).join('');
  }

  triggerLevelUpModal(newLevel) {
    const modal = document.getElementById('level-up-modal');
    const textEl = document.getElementById('level-up-modal-text');
    if (textEl) textEl.textContent = `You reached Level ${newLevel}! Keep crushing your goals!`;
    if (modal) modal.classList.add('active');
    this.launchConfetti();
  }

  launchConfetti() {
    // Pure Vanilla CSS Particle Confetti Engine
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#06B6D4'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10
      });
    }

    let alpha = 1;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      alpha -= 0.015;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // gravity
        p.rotation += p.rSpeed;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (alpha > 0) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    animate();
  }
}

const gamification = new GamificationEngine(store);
