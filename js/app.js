/* ==========================================
   STUDIVO MAIN APPLICATION CONTROLLER
   Router, View Switcher, Toast System, Modals & Global Handlers
   ========================================== */

// --- Global Toast Notification Helper ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠️' : 'ℹ️';
  toast.innerHTML = `
    <span style="font-weight: bold;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

class StudivoApp {
  constructor() {
    this.currentView = 'dashboard';
  }

  init() {
    this.setupNavigation();
    this.setupModals();
    this.setupMobileMenu();
    this.renderDashboardOverview();
    
    // Initialize feature modules
    gamification.init();
    careerHub.init();
    wellnessSanctuary.init();
    financeManager.init();

    showToast('Welcome to Studivo! Level 3 Student Explorer 🚀', 'success');
  }

  /* --- Navigation & Router --- */
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-view]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = link.getAttribute('data-view');
        this.switchView(targetView);
      });
    });
  }

  switchView(viewName) {
    if (this.currentView === viewName) return;

    // Update nav link active styles
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-view="${viewName}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Hide old view, show new view with animation
    const views = document.querySelectorAll('.view-section');
    views.forEach(v => v.classList.remove('active'));

    const targetViewEl = document.getElementById(`view-${viewName}`);
    if (targetViewEl) {
      targetViewEl.classList.add('active');
    }

    this.currentView = viewName;

    // Refresh view specific components
    if (viewName === 'dashboard') this.renderDashboardOverview();
    if (viewName === 'career') careerHub.renderKanban();
    if (viewName === 'finance') financeManager.renderSVGChart();
    if (viewName === 'gamification') gamification.renderQuests();

    // Close mobile menu if open
    document.getElementById('app-sidebar')?.classList.remove('open');
  }

  /* --- Dashboard Overview Dynamic Population --- */
  renderDashboardOverview() {
    const state = store.get();
    
    // Welcome message
    const welcomeEl = document.getElementById('dash-welcome-title');
    if (welcomeEl) welcomeEl.textContent = `Welcome back, ${state.user.name}! 🌟`;

    // Overview Stats
    const countJobs = state.career.kanban.filter(j => j.stage === 'interview' || j.stage === 'applied').length;
    const pomos = state.wellness.pomodoroCount || 0;
    const spent = state.finance.expenses.reduce((s, e) => s + parseFloat(e.amount), 0);
    const questsDone = state.gamification.quests.filter(q => q.completed).length;

    const statJobsEl = document.getElementById('dash-stat-jobs');
    const statPomoEl = document.getElementById('dash-stat-pomo');
    const statSpentEl = document.getElementById('dash-stat-spent');
    const statQuestsEl = document.getElementById('dash-stat-quests');

    if (statJobsEl) statJobsEl.textContent = `${countJobs} Active`;
    if (statPomoEl) statPomoEl.textContent = `${pomos} Sessions`;
    if (statSpentEl) statSpentEl.textContent = `$${spent.toFixed(0)}`;
    if (statQuestsEl) statQuestsEl.textContent = `${questsDone} / ${state.gamification.quests.length}`;

    // Mini Quest Preview
    const miniQuestsEl = document.getElementById('dash-mini-quests');
    if (miniQuestsEl) {
      miniQuestsEl.innerHTML = state.gamification.quests.slice(0, 3).map(q => `
        <div class="quest-card ${q.completed ? 'completed' : ''}">
          <div style="font-size: var(--text-xs); font-weight: bold;">${q.title}</div>
          <div style="display:flex; gap:6px; align-items:center;">
            <span class="badge badge-primary">+${q.xp} XP</span>
            ${q.completed ? `<button class="btn btn-sm btn-accent" disabled>Claimed</button>` : `<button class="btn btn-sm btn-accent" onclick="gamification.completeQuest('${q.id}')">Claim XP</button>`}
          </div>
        </div>
      `).join('');
    }
  }

  /* --- Modal Controllers --- */
  setupModals() {
    // Global modal close triggers
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  /* --- Mobile Drawer Navigation --- */
  setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const sidebar = document.getElementById('app-sidebar');

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  }
}

// Linear / Apple Style Scroll Reveal Observer
function initScrollReveal() {
  const elements = document.querySelectorAll('.solution-card, .problem-card, .stat-circle-card, .testimonial-card, .glass-panel, .fintech-stat-card, .career-explorer-card, .achievement-badge-card');
  elements.forEach(el => el.classList.add('reveal-on-scroll'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// Global App Instance Initialization
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new StudivoApp();
  app.init();
  initScrollReveal();
});
