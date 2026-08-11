/* ==========================================
   STUDIVO UNIFIED GAMIFICATION HUB PAGE CONTROLLER
   Connecting Career, Wellness, Finance & Knowledge Hub with XP, Badges, Challenges & Local Leaderboard
   ========================================== */

const GAMIFICATION_STORAGE_KEY = 'studivo_gamification_hub_v1';

// Achievement Definitions (including Knowledge Hub & Student Contributions)
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

const defaultGamificationState = {
  user: {
    name: 'Alex Rivers (You)',
    level: 3,
    xp: 450,
    maxXp: 800,
    streak: 5,
    lastDate: new Date().toISOString().split('T')[0]
  },
  unlockedBadges: ['ach_1', 'ach_5', 'ach_8', 'ach_10', 'ach_14'],
  timeline: [
    { id: 'ach_1', date: '2026-08-08', title: 'First Step', xp: 50 },
    { id: 'ach_5', date: '2026-08-09', title: 'Mindful Check-in', xp: 50 },
    { id: 'ach_8', date: '2026-08-10', title: 'Hydration Hero', xp: 50 },
    { id: 'ach_10', date: '2026-08-10', title: 'Budget Optimizer', xp: 50 },
    { id: 'ach_14', date: '2026-08-11', title: 'Streak Starter', xp: 75 }
  ],
  dailyChallenges: [
    { id: 'dc_1', title: 'Log Today\'s Mood & Reflection', hub: 'Wellness', xp: 50, done: true },
    { id: 'dc_2', title: 'Practice 1 Career Skill or Flashcard', hub: 'Career', xp: 60, done: false },
    { id: 'dc_3', title: 'Log 1 Student Expense or Deposit', hub: 'Finance', xp: 40, done: true },
    { id: 'dc_4', title: 'Read 1 Book Summary in Knowledge Hub', hub: 'Knowledge', xp: 50, done: false }
  ],
  weeklyChallenges: [
    { id: 'wc_1', title: 'Maintain 5-Day Check-in Streak', xp: 200, progress: 5, target: 5, done: true },
    { id: 'wc_2', title: 'Save $150 Towards Goals', xp: 250, progress: 100, target: 150, done: false },
    { id: 'wc_3', title: 'Complete 2 Book Summaries', xp: 300, progress: 1, target: 2, done: false }
  ],
  leaderboard: [
    { rank: 1, name: 'Sarah Kim', school: 'Stanford', xp: 2850, avatar: 'SK' },
    { rank: 2, name: 'Alex Rivers (You)', school: 'Studivo Pro', xp: 2250, avatar: 'AR', isUser: true },
    { rank: 3, name: 'David Lee', school: 'MIT', xp: 2100, avatar: 'DL' },
    { rank: 4, name: 'Maya Rodriguez', school: 'UC Berkeley', xp: 1950, avatar: 'MR' },
    { rank: 5, name: 'Jason Park', school: 'CMU', xp: 1700, avatar: 'JP' }
  ]
};

class GamificationHubPage {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(GAMIFICATION_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load gamification state from localStorage', e);
    }
    return JSON.parse(JSON.stringify(defaultGamificationState));
  }

  saveState() {
    try {
      localStorage.setItem(GAMIFICATION_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save gamification state', e);
    }
  }

  init() {
    this.renderHeaderStats();
    this.renderChallenges();
    this.renderBadges();
    this.renderTimeline();
    this.renderLeaderboard();
  }

  renderHeaderStats() {
    const user = this.state.user;
    const unlockedCount = this.state.unlockedBadges.length;
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
      const perimeter = 314;
      const offset = perimeter * (1 - completionPct / 100);
      completionRingEl.style.strokeDashoffset = offset;
    }
  }

  addXP(amount, reason = 'Action Completed') {
    const user = this.state.user;
    user.xp += amount;

    if (user.xp >= user.maxXp) {
      user.level += 1;
      user.xp = user.xp - user.maxXp;
      user.maxXp = Math.round(user.maxXp * 1.3);
      this.triggerUnlockModal(`LEVEL UP! You reached Level ${user.level}! 🎉`, '👑');
    }

    this.saveState();
    this.renderHeaderStats();
    this.updateLeaderboardRank();
  }

  renderBadges() {
    const container = document.getElementById('badges-grid-container');
    if (!container) return;

    const unlockedSet = new Set(this.state.unlockedBadges);

    container.innerHTML = achievementBadges.map(b => {
      const isUnlocked = unlockedSet.has(b.id);
      return `
        <div class="glass-card achievement-badge-card ${isUnlocked ? 'unlocked' : 'locked'}" 
             onclick="gamificationHubPage.tryUnlockBadge('${b.id}')">
          <div class="badge-icon-box">${b.icon}</div>
          <span class="badge ${isUnlocked ? 'badge-success' : 'badge-primary'}" style="font-size: 0.65rem; margin-bottom: 4px;">${b.category}</span>
          <h4 style="font-size: var(--text-sm); margin-bottom: 2px;">${b.title}</h4>
          <p style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: var(--space-2);">${b.desc}</p>
          <span style="font-size: 0.75rem; font-weight: bold; color: ${isUnlocked ? 'var(--status-success)' : 'var(--brand-primary)'};">
            ${isUnlocked ? 'Unlocked ✓' : `+${b.xp} XP`}
          </span>
        </div>
      `;
    }).join('');
  }

  tryUnlockBadge(badgeId) {
    if (this.state.unlockedBadges.includes(badgeId)) return;

    const badge = achievementBadges.find(b => b.id === badgeId);
    if (!badge) return;

    this.state.unlockedBadges.push(badgeId);
    this.state.timeline.unshift({
      id: badgeId,
      date: new Date().toISOString().split('T')[0],
      title: badge.title,
      xp: badge.xp
    });

    this.saveState();
    this.addXP(badge.xp, `Unlocked Badge: ${badge.title}`);
    this.renderBadges();
    this.renderTimeline();
    this.triggerUnlockModal(`Unlocked Badge: ${badge.title}! (+${badge.xp} XP)`, badge.icon);
  }

  renderChallenges() {
    const dailyContainer = document.getElementById('daily-challenges-container');
    const weeklyContainer = document.getElementById('weekly-challenges-container');

    if (dailyContainer) {
      dailyContainer.innerHTML = this.state.dailyChallenges.map(dc => `
        <div class="glass-card" style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4); margin-bottom: var(--space-2);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span class="badge badge-accent">${dc.hub}</span>
            <div>
              <h4 style="font-size: var(--text-sm);">${dc.title}</h4>
              <span style="font-size: 0.7rem; color: var(--brand-primary);">+${dc.xp} XP</span>
            </div>
          </div>
          ${dc.done ? 
            `<span class="badge badge-success">Completed ✓</span>` : 
            `<button class="btn btn-sm btn-accent" onclick="gamificationHubPage.completeDailyChallenge('${dc.id}')">Claim</button>`
          }
        </div>
      `).join('');
    }

    if (weeklyContainer) {
      weeklyContainer.innerHTML = this.state.weeklyChallenges.map(wc => {
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
            <div style="background: rgba(255,255,255,0.06); height: 6px; border-radius: 3px; overflow: hidden;">
              <div style="width: ${pct}%; height: 100%; background: var(--gradient-primary); transition: width 0.4s ease;"></div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  completeDailyChallenge(id) {
    const dc = this.state.dailyChallenges.find(c => c.id === id);
    if (dc && !dc.done) {
      dc.done = true;
      this.saveState();
      this.addXP(dc.xp, dc.title);
      this.renderChallenges();
    }
  }

  renderTimeline() {
    const container = document.getElementById('achievement-timeline-container');
    if (!container) return;

    container.innerHTML = this.state.timeline.slice(0, 5).map(item => `
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

    container.innerHTML = this.state.leaderboard.map(lb => `
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
    const user = this.state.user;
    const userLb = this.state.leaderboard.find(l => l.isUser);
    if (userLb) {
      userLb.xp = 1800 + user.xp;
      this.state.leaderboard.sort((a, b) => b.xp - a.xp);
      this.state.leaderboard.forEach((item, index) => item.rank = index + 1);
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
}

let gamificationHubPage;
document.addEventListener('DOMContentLoaded', () => {
  gamificationHubPage = new GamificationHubPage();
  gamificationHubPage.init();
});
