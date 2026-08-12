/* ==========================================
   STUDIVO UNIFIED GAMIFICATION HUB PAGE CONTROLLER
   Connecting Career, Wellness, Finance & Knowledge Hub with XP, Badges, Challenges & Local Leaderboard
   ========================================== */

const achievementBadges = [
  { id: 'ach_1', title: 'First Step', desc: 'Add your first job application', icon: '🚀', xp: 50, category: 'Career' },
  { id: 'ach_2', title: 'Pipeline Architect', desc: 'Track 3+ job applications in Kanban', icon: '💼', xp: 100, category: 'Career' },
  { id: 'ach_3', title: 'Interview Ready', desc: 'Review 3+ technical flashcards', icon: '🎓', xp: 75, category: 'Career' },
  { id: 'ach_4', title: 'DSA Initiate', desc: 'Complete Data Structures skill items', icon: '🧠', xp: 150, category: 'Career' },
  { id: 'ach_5', title: 'Mindful Check-in', desc: 'Log your daily mood & gratitude', icon: '😌', xp: 50, category: 'Wellness' },
  { id: 'ach_6', title: 'Zen Master', desc: 'Complete a 25-min Pomodoro focus session', icon: '🧘', xp: 100, category: 'Wellness' },
  { id: 'ach_7', title: 'Breathing Master', desc: 'Practice 4-7-8 breathing exercise', icon: '🌬️', xp: 75, category: 'Wellness' },
  { id: 'ach_8', title: 'Hydration Hero', desc: 'Drink 8 glasses of water in a day', icon: '💧', xp: 50, category: 'Wellness' },
  { id: 'ach_9', title: 'Journal Philosopher', desc: 'Save 2+ daily reflection entries', icon: '📝', xp: 80, category: 'Wellness' },
  { id: 'ach_10', title: 'Budget Optimizer', desc: 'Set up your monthly student budget', icon: '💰', xp: 50, category: 'Finance' },
  { id: 'ach_11', title: 'Smart Logger', desc: 'Log 3+ student expenses', icon: '💸', xp: 80, category: 'Finance' },
  { id: 'ach_12', title: 'Savings Pioneer', desc: 'Make a $50 deposit to a savings goal', icon: '🏦', xp: 100, category: 'Finance' },
  { id: 'ach_13', title: 'Tech Investor', desc: 'Reach 50%+ on laptop savings goal', icon: '💻', xp: 200, category: 'Finance' },
  { id: 'ach_kn_1', title: 'Book Explorer', desc: 'Read 3+ curated book summaries', icon: '📚', xp: 100, category: 'Knowledge' },
  { id: 'ach_kn_2', title: 'Knowledge Seeker', desc: 'Bookmark 3+ books in your library', icon: '🧠', xp: 75, category: 'Knowledge' },
  { id: 'ach_kn_3', title: 'Lifelong Learner', desc: 'Complete 2+ books in your library', icon: '🚀', xp: 150, category: 'Knowledge' },
  { id: 'ach_kn_4', title: 'Knowledge Contributor', desc: 'Contribute your first book & summary', icon: '📚', xp: 100, category: 'Contribution' },
  { id: 'ach_kn_5', title: 'Student Reviewer', desc: 'Add 2+ student book reviews', icon: '✍️', xp: 75, category: 'Contribution' },
  { id: 'ach_kn_6', title: 'Community Learner', desc: 'Contribute 3+ books to your personal library', icon: '🌟', xp: 150, category: 'Contribution' },
  { id: 'ach_14', title: 'Streak Starter', desc: 'Maintain a 3-day check-in streak', icon: '🔥', xp: 75, category: 'Streak' },
  { id: 'ach_15', title: 'Streak Legend', desc: 'Reach a 7-day check-in streak', icon: '⚡', xp: 250, category: 'Streak' },
  { id: 'ach_16', title: 'Quest Hunter', desc: 'Complete all daily challenges', icon: '🏆', xp: 150, category: 'Quests' },
  { id: 'ach_17', title: 'Tri-Hub Explorer', desc: 'Perform actions across all student hubs', icon: '🌟', xp: 200, category: 'Special' },
  { id: 'ach_18', title: 'Perfectionist', desc: 'Reach 80%+ progress on a career roadmap', icon: '🎯', xp: 300, category: 'Career' },
  { id: 'ach_19', title: 'Grandmaster Student', desc: 'Reach Level 5 student status', icon: '👑', xp: 500, category: 'Special' },
  { id: 'ach_20', title: 'Studivo Legend', desc: 'Unlock 10+ achievement badges', icon: '💎', xp: 1000, category: 'Special' }
];

class GamificationHubPage {
  constructor() {
  }

  saveState() {
    store.saveState();
  }

  init() {
    this.renderHeaderStats();
    this.renderChallenges();
    this.renderBadges();
    this.renderTimeline();
    this.renderLeaderboard();
  }

  renderHeaderStats() {
    const user = store.get().user;
    const unlockedCount = store.get().gamification.unlockedBadges.length;
    const totalBadges = achievementBadges.length;
    const completionPct = Math.round((unlockedCount / totalBadges) * 100);

    const levelEl = document.getElementById('user-level-display');
    const xpTextEl = document.getElementById('user-xp-display');
    const xpBarEl = document.getElementById('user-xp-bar');
    const streakEl = document.getElementById('user-streak-display');
    const completionPctEl = document.getElementById('completion-pct-text');
    const completionRingEl = document.getElementById('completion-ring-circle');

    if (levelEl) levelEl.textContent = `Lvl ${user.level}`;
    if (xpTextEl) xpTextEl.textContent = `${user.xp} / ${user.maxXp} XP`;
    if (xpBarEl) {
      const pct = Math.min(100, Math.round((user.xp / user.maxXp) * 100));
      xpBarEl.style.width = `${pct}%`;
    }
    if (streakEl) streakEl.textContent = `${user.streak} Days 🔥`;

    if (completionPctEl) completionPctEl.textContent = `${completionPct}%`;

    if (completionRingEl) {
/* ==========================================
   STUDIVO UNIFIED GAMIFICATION HUB PAGE CONTROLLER
   Connecting Career, Wellness, Finance & Knowledge Hub with XP, Badges, Challenges & Local Leaderboard
   ========================================== */

const achievementBadges = [
  { id: 'ach_1', title: 'First Step', desc: 'Add your first job application', icon: '🚀', xp: 50, category: 'Career' },
  { id: 'ach_2', title: 'Pipeline Architect', desc: 'Track 3+ job applications in Kanban', icon: '💼', xp: 100, category: 'Career' },
  { id: 'ach_3', title: 'Interview Ready', desc: 'Review 3+ technical flashcards', icon: '🎓', xp: 75, category: 'Career' },
  { id: 'ach_4', title: 'DSA Initiate', desc: 'Complete Data Structures skill items', icon: '🧠', xp: 150, category: 'Career' },
  { id: 'ach_5', title: 'Mindful Check-in', desc: 'Log your daily mood & gratitude', icon: '😌', xp: 50, category: 'Wellness' },
  { id: 'ach_6', title: 'Zen Master', desc: 'Complete a 25-min Pomodoro focus session', icon: '🧘', xp: 100, category: 'Wellness' },
  { id: 'ach_7', title: 'Breathing Master', desc: 'Practice 4-7-8 breathing exercise', icon: '🌬️', xp: 75, category: 'Wellness' },
  { id: 'ach_8', title: 'Hydration Hero', desc: 'Drink 8 glasses of water in a day', icon: '💧', xp: 50, category: 'Wellness' },
  { id: 'ach_9', title: 'Journal Philosopher', desc: 'Save 2+ daily reflection entries', icon: '📝', xp: 80, category: 'Wellness' },
  { id: 'ach_10', title: 'Budget Optimizer', desc: 'Set up your monthly student budget', icon: '💰', xp: 50, category: 'Finance' },
  { id: 'ach_11', title: 'Smart Logger', desc: 'Log 3+ student expenses', icon: '💸', xp: 80, category: 'Finance' },
  { id: 'ach_12', title: 'Savings Pioneer', desc: 'Make a $50 deposit to a savings goal', icon: '🏦', xp: 100, category: 'Finance' },
  { id: 'ach_13', title: 'Tech Investor', desc: 'Reach 50%+ on laptop savings goal', icon: '💻', xp: 200, category: 'Finance' },
  { id: 'ach_kn_1', title: 'Book Explorer', desc: 'Read 3+ curated book summaries', icon: '📚', xp: 100, category: 'Knowledge' },
  { id: 'ach_kn_2', title: 'Knowledge Seeker', desc: 'Bookmark 3+ books in your library', icon: '🧠', xp: 75, category: 'Knowledge' },
  { id: 'ach_kn_3', title: 'Lifelong Learner', desc: 'Complete 2+ books in your library', icon: '🚀', xp: 150, category: 'Knowledge' },
  { id: 'ach_kn_4', title: 'Knowledge Contributor', desc: 'Contribute your first book & summary', icon: '📚', xp: 100, category: 'Contribution' },
  { id: 'ach_kn_5', title: 'Student Reviewer', desc: 'Add 2+ student book reviews', icon: '✍️', xp: 75, category: 'Contribution' },
  { id: 'ach_kn_6', title: 'Community Learner', desc: 'Contribute 3+ books to your personal library', icon: '🌟', xp: 150, category: 'Contribution' },
  { id: 'ach_14', title: 'Streak Starter', desc: 'Maintain a 3-day check-in streak', icon: '🔥', xp: 75, category: 'Streak' },
  { id: 'ach_15', title: 'Streak Legend', desc: 'Reach a 7-day check-in streak', icon: '⚡', xp: 250, category: 'Streak' },
  { id: 'ach_16', title: 'Quest Hunter', desc: 'Complete all daily challenges', icon: '🏆', xp: 150, category: 'Quests' },
  { id: 'ach_17', title: 'Tri-Hub Explorer', desc: 'Perform actions across all student hubs', icon: '🌟', xp: 200, category: 'Special' },
  { id: 'ach_18', title: 'Perfectionist', desc: 'Reach 80%+ progress on a career roadmap', icon: '🎯', xp: 300, category: 'Career' },
  { id: 'ach_19', title: 'Grandmaster Student', desc: 'Reach Level 5 student status', icon: '👑', xp: 500, category: 'Special' },
  { id: 'ach_20', title: 'Studivo Legend', desc: 'Unlock 10+ achievement badges', icon: '💎', xp: 1000, category: 'Special' }
];

class GamificationHubPage {
  constructor() {
    this.pendingBadgeId = null;
  }

  saveState() {
    store.saveState();
  }

  init() {
    this.renderHeaderStats();
    this.renderChallenges();
    this.renderBadges();
    this.renderTimeline();
    this.renderLeaderboard();
  }

  renderHeaderStats() {
    const user = store.get().user;
    const unlockedCount = store.get().gamification.unlockedBadges.length;
    const totalBadges = achievementBadges.length;
    const completionPct = Math.round((unlockedCount / totalBadges) * 100);

    const levelEl = document.getElementById('user-level-display');
    const xpTextEl = document.getElementById('user-xp-display');
    const xpBarEl = document.getElementById('user-xp-bar');
    const streakEl = document.getElementById('user-streak-display');
    const completionPctEl = document.getElementById('completion-pct-text');
    const completionRingEl = document.getElementById('completion-ring-circle');

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
    if (streakEl) streakEl.textContent = `${user.streak} Days 🔥`;

    if (completionPctEl) completionPctEl.textContent = `${completionPct}%`;

    if (completionRingEl) {
      const perimeter = 314;
      const offset = perimeter * (1 - completionPct / 100);
      completionRingEl.style.strokeDashoffset = offset;
    }
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

  addXP(amount, reason = 'Action Completed') {
    const user = store.get().user;
    this.previousXp = user.xp;
    user.xp += amount;
    user.totalXp = (user.totalXp || (1800 + this.previousXp)) + amount;

    this.showToastNotification(`+${amount} XP earned! 🎉`);

    if (user.xp >= user.maxXp) {
      user.level += 1;
      user.xp = user.xp - user.maxXp;
      user.maxXp = Math.round(user.maxXp * 1.3);
      this.showToastNotification(`🎉 Level Up!<br>You reached Level ${user.level}!`);
      this.triggerUnlockModal(`LEVEL UP! You reached Level ${user.level}! 🎉`, '👑');
    }

    this.saveState();
    this.renderHeaderStats();
    this.updateLeaderboardRank();
  }

  renderBadges() {
    const container = document.getElementById('badges-grid-container');
    if (!container) return;

    const gamification = store.get().gamification;
    // ensure claimedBadges array exists for backward compatibility
    if (!gamification.claimedBadges) {
      gamification.claimedBadges = [...gamification.unlockedBadges];
    }
    const unlockedSet = new Set(gamification.unlockedBadges || []);
    const claimedSet = new Set(gamification.claimedBadges || []);

    container.innerHTML = achievementBadges.map(b => {
      const isUnlocked = unlockedSet.has(b.id);
      const isClaimed = claimedSet.has(b.id);
      
      return `
        <div class="glass-card achievement-badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon-box" style="${!isUnlocked ? 'filter: grayscale(100%) opacity(50%);' : ''}">${b.icon}</div>
          <span class="badge ${isClaimed ? 'badge-success' : 'badge-primary'}" style="font-size: 0.65rem; margin-bottom: 4px;">${b.category}</span>
          <h4 style="font-size: var(--text-sm); margin-bottom: 2px;">${b.title}</h4>
          <p style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: var(--space-2);">${b.desc}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: auto;">
            <span style="font-size: 0.75rem; font-weight: bold; color: ${isClaimed ? 'var(--status-success)' : 'var(--brand-primary)'};">
              +${b.xp} XP
            </span>
            ${isClaimed ?
              `<button class="btn btn-sm btn-accent" disabled>Claimed</button>` :
              (isUnlocked ?
                `<button class="btn btn-sm btn-accent" style="background: var(--brand-secondary);" onclick="window.gamificationHubPage.tryUnlockBadge('${b.id}')">Claim XP</button>` :
                `<button class="btn btn-sm" style="background: var(--glass-surface-2); color: var(--text-muted);" onclick="window.gamificationHubPage.demoUnlockBadge('${b.id}')">Unlock</button>`
              )
            }
          </div>
        </div>
      `;
    }).join('');
  }

  demoUnlockBadge(badgeId) {
    const gamification = store.get().gamification;
    if (!gamification.unlockedBadges.includes(badgeId)) {
      gamification.unlockedBadges.push(badgeId);
      this.saveState();
      this.renderBadges();
      this.showToastNotification(`Achievement unlocked! You can now claim XP.`);
    }
  }

  tryUnlockBadge(badgeId) {
    const gamification = store.get().gamification;
    if (gamification.claimedBadges && gamification.claimedBadges.includes(badgeId)) return;

    const badge = achievementBadges.find(b => b.id === badgeId);
    if (!badge) return;

    this.pendingBadgeId = badgeId;
    this.triggerUnlockModal(`Claim Reward: ${badge.title}! (+${badge.xp} XP)`, badge.icon);
  }

  claimPendingBadgeXP() {
    // Close modal always (handles both badge claims and level-up dismissals)
    const modal = document.getElementById('unlock-modal-overlay');
    if (modal) modal.classList.remove('active');

    if (!this.pendingBadgeId) return;

    const badgeId = this.pendingBadgeId;
    const gamification = store.get().gamification;
    this.pendingBadgeId = null;

    if (!gamification.claimedBadges) gamification.claimedBadges = [...gamification.unlockedBadges];
    if (gamification.claimedBadges.includes(badgeId)) return;

    const badge = achievementBadges.find(b => b.id === badgeId);
    if (!badge) return;

    gamification.claimedBadges.push(badgeId);
    if (!gamification.unlockedBadges.includes(badgeId)) {
      gamification.unlockedBadges.push(badgeId);
    }
    
    gamification.timeline.unshift({
      id: badgeId,
      date: new Date().toISOString().split('T')[0],
      title: badge.title,
      xp: badge.xp
    });

    this.saveState();
    this.addXP(badge.xp, `Claimed Badge: ${badge.title}`);
    this.renderBadges();
    this.renderTimeline();
  }

  renderChallenges() {
    const dailyContainer = document.getElementById('daily-challenges-container');
    const weeklyContainer = document.getElementById('weekly-challenges-container');

    const gamification = store.get().gamification;

    if (dailyContainer) {
      dailyContainer.innerHTML = gamification.dailyChallenges.map(dc => `
        <div class="glass-card" style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4); margin-bottom: var(--space-2);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span class="badge badge-accent">${dc.hub}</span>
            <div>
              <h4 style="font-size: var(--text-sm);">${dc.title}</h4>
              <span style="font-size: 0.7rem; color: var(--brand-primary);">+${dc.xp} XP</span>
            </div>
          </div>
          ${dc.claimed ? 
            `<button class="btn btn-sm btn-accent" disabled>Claimed</button>` : 
            (dc.done ? 
              `<button class="btn btn-sm btn-accent" style="background: var(--brand-secondary);" onclick="window.gamificationHubPage.claimDailyChallengeXP('${dc.id}')">Claim XP</button>` :
              `<button class="btn btn-sm btn-secondary" onclick="window.gamificationHubPage.doDailyChallengeAction('${dc.id}')">Complete</button>`
            )
          }
        </div>
      `).join('');
    }

    if (weeklyContainer) {
      weeklyContainer.innerHTML = gamification.weeklyChallenges.map(wc => {
        const pct = Math.min(100, Math.round((wc.progress / wc.target) * 100));
        return `
          <div class="glass-card" style="margin-bottom: var(--space-3);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-1);">
              <h4 style="font-size: var(--text-sm);">${wc.title}</h4>
              <span style="font-size: 0.7rem; font-weight: bold; color: var(--brand-secondary);">+${wc.xp} XP</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 4px;">
              <span>Progress</span>
              <span>${wc.progress} / ${wc.target}</span>
            </div>
            <div style="background: rgba(255,255,255,0.06); height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: var(--space-3);">
              <div style="width: ${pct}%; height: 100%; background: var(--gradient-primary); transition: width 0.4s ease;"></div>
            </div>
            <div style="text-align: right;">
              ${wc.claimed ? 
                `<button class="btn btn-sm btn-accent" disabled>Claimed</button>` : 
                (wc.progress >= wc.target ? 
                  `<button class="btn btn-sm btn-accent" style="background: var(--brand-secondary);" onclick="window.gamificationHubPage.claimWeeklyChallengeXP('${wc.id}')">Claim XP</button>` :
                  `<button class="btn btn-sm btn-secondary" onclick="window.gamificationHubPage.doWeeklyChallengeAction('${wc.id}')">Progress Action</button>`
                )
              }
            </div>
          </div>
        `;
      }).join('');
    }
  }

  doDailyChallengeAction(id) {
    const gamification = store.get().gamification;
    const dc = gamification.dailyChallenges.find(c => c.id === id);
    if (dc && !dc.done) {
      dc.done = true;
      this.saveState();
      this.renderChallenges();
      this.showToastNotification(`Challenge completed! You can now claim XP.`);
    }
  }

  claimDailyChallengeXP(id) {
    const gamification = store.get().gamification;
    const dc = gamification.dailyChallenges.find(c => c.id === id);
    if (dc && dc.done && !dc.claimed) {
      dc.claimed = true;
      this.saveState();
      this.addXP(dc.xp, dc.title);
      this.renderChallenges();
    }
  }

  doWeeklyChallengeAction(id) {
    const gamification = store.get().gamification;
    const wc = gamification.weeklyChallenges.find(c => c.id === id);
    if (wc && wc.progress < wc.target) {
      wc.progress += 1;
      this.saveState();
      this.renderChallenges();
      if (wc.progress >= wc.target) {
        this.showToastNotification(`Weekly Challenge completed! You can now claim XP.`);
      } else {
        this.showToastNotification(`Progress updated! ${wc.progress}/${wc.target}`);
      }
    }
  }

  claimWeeklyChallengeXP(id) {
    const gamification = store.get().gamification;
    const wc = gamification.weeklyChallenges.find(c => c.id === id);
    if (wc && wc.progress >= wc.target && !wc.claimed) {
      wc.claimed = true;
      this.saveState();
      this.addXP(wc.xp, wc.title);
      this.renderChallenges();
    }
  }

  renderTimeline() {
    const container = document.getElementById('achievement-timeline-container');
    if (!container) return;

    const timeline = store.get().gamification.timeline;
    container.innerHTML = timeline.slice(0, 5).map(item => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--glass-border);">
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <span style="font-size: 1.4rem;">🌟</span>
          <div>
            <h4 style="font-size: var(--text-sm);">${item.title}</h4>
            <span style="font-size: 0.7rem; color: var(--text-muted);">${item.date}</span>
          </div>
        </div>
        <span class="badge badge-success">+${item.xp} XP</span>
      </div>
    `).join('');
  }

  renderLeaderboard() {
    const container = document.getElementById('leaderboard-list-container');
    if (!container) return;

    const leaderboard = store.get().gamification.leaderboard;
    container.innerHTML = leaderboard.map(lb => `
      <div class="glass-card" style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-3); margin-bottom: var(--space-2); ${lb.isUser ? 'border-color: var(--brand-primary); background: rgba(108,99,255,0.1);' : ''}">
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <div style="font-weight: bold; width: 24px; text-align: center; color: ${lb.rank === 1 ? '#F59E0B' : lb.rank === 2 ? '#94A3B8' : lb.rank === 3 ? '#B45309' : 'var(--text-muted)'}; font-size: 1.1rem;">
            #${lb.rank}
          </div>
          <div class="avatar-circle" style="width: 34px; height: 34px; font-size: 0.75rem;">${lb.avatar}</div>
          <div>
            <h4 style="font-size: var(--text-sm);">${lb.name}</h4>
            <span style="font-size: 0.7rem; color: var(--text-muted);">${lb.school}</span>
          </div>
        </div>
        <span style="font-size: var(--text-sm); font-weight: bold; color: var(--brand-primary);">${lb.xp} XP</span>
      </div>
    `).join('');
  }

  updateLeaderboardRank() {
    const user = store.get().user;
    const leaderboard = store.get().gamification.leaderboard;
    const userLb = leaderboard.find(l => l.isUser);
    if (userLb) {
      userLb.xp = user.totalXp || (1800 + user.xp);
      leaderboard.sort((a, b) => b.xp - a.xp);
      leaderboard.forEach((item, index) => item.rank = index + 1);
      this.saveState();
      this.renderLeaderboard();
    }
  }

  triggerUnlockModal(message, icon = '🎉') {
    const modalOverlay = document.getElementById('unlock-modal-overlay');
    const modalIcon = document.getElementById('unlock-modal-icon');
    const modalMsg = document.getElementById('unlock-modal-message');

    if (modalOverlay && modalIcon && modalMsg) {
      modalIcon.textContent = icon;
      modalMsg.textContent = message;
      modalOverlay.classList.add('active');
    }
  }

  showToastNotification(msg) {
    const toast = document.createElement('div');
    toast.className = 'glass-panel';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--glass-surface-1);
      border: 1px solid var(--glass-border);
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-md);
      color: var(--text-base);
      font-weight: 600;
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      transform: translateY(100px);
      opacity: 0;
    `;
    toast.innerHTML = `<span>✨</span><span>${msg}</span>`;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    }, 10);
    
    // Animate out
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

window.gamificationHubPage = new GamificationHubPage();
document.addEventListener('DOMContentLoaded', () => {
  window.gamificationHubPage.init();
});
