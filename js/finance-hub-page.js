/* ==========================================
   STUDIVO FINTECH FINANCE HUB PAGE CONTROLLER
   Multi-Currency Engine, HTML5 Canvas Charts, Pocket Money Tracker, Budget & Savings Goals
   ========================================== */

const FINANCE_STORAGE_KEY = 'studivo_finance_hub_v1';
const CURRENCY_STORAGE_KEY = 'studivo_user_currency_v1';

// Supported Currencies Map
const currenciesMap = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', position: 'prefix' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', position: 'prefix' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', position: 'prefix' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', position: 'prefix' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', position: 'prefix' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', position: 'prefix' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', position: 'prefix' },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', position: 'prefix' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', position: 'prefix' }
};

const defaultFintechState = {
  monthlyBudget: 800.00,
  pocketAllowance: 1200.00,
  transactions: [
    { id: 'tx-1', type: 'income', title: 'Monthly Pocket Allowance', amount: 800.00, category: 'Allowance', date: '2026-08-01' },
    { id: 'tx-2', type: 'expense', title: 'CS Textbook & Software', amount: 85.50, category: 'Textbooks & Tech', date: '2026-08-03' },
    { id: 'tx-3', type: 'expense', title: 'Campus Coffee & Snacks', amount: 32.00, category: 'Food & Coffee', date: '2026-08-05' },
    { id: 'tx-4', type: 'income', title: 'Tutoring Side Hustle', amount: 150.00, category: 'Side Hustle', date: '2026-08-07' },
    { id: 'tx-5', type: 'expense', title: 'Subway Monthly Pass', amount: 45.00, category: 'Transport', date: '2026-08-09' },
    { id: 'tx-6', type: 'expense', title: 'Weekend Movie & Social', amount: 28.00, category: 'Social & Ent', date: '2026-08-10' }
  ],
  savingsGoals: [
    { id: 'sg-1', title: 'MacBook Pro Fund', target: 1800.00, current: 1350.00, icon: '💻', color: '#6366F1' },
    { id: 'sg-2', title: 'Spring Break Trip', target: 500.00, current: 340.00, icon: '🏖️', color: '#EC4899' },
    { id: 'sg-3', title: 'Emergency Student Fund', target: 600.00, current: 480.00, icon: '🛡️', color: '#10B981' }
  ]
};

const categoryColors = {
  'Food & Coffee': '#EC4899',
  'Textbooks & Tech': '#6366F1',
  'Transport': '#06B6D4',
  'Social & Ent': '#8B5CF6',
  'Housing & Dorm': '#F59E0B',
  'Allowance': '#10B981',
  'Side Hustle': '#3B82F6'
};

class FintechFinanceHubPage {
  constructor() {
    this.state = this.loadState();
    this.selectedCurrencyCode = this.loadCurrencyPreference();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(FINANCE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load finance state from localStorage', e);
    }
    return JSON.parse(JSON.stringify(defaultFintechState));
  }

  saveState() {
    try {
      localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save finance state', e);
    }
  }

  /* --- Multi-Currency Helper --- */
  loadCurrencyPreference() {
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && currenciesMap[saved]) return saved;
    } catch (e) {}
    return 'USD';
  }

  setCurrency(currencyCode) {
    if (!currenciesMap[currencyCode]) return;
    this.selectedCurrencyCode = currencyCode;
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, currencyCode);
    } catch (e) {}

    // Re-render everything instantly with smooth transition
    this.renderAll();
  }

  getCurrencyObj() {
    return currenciesMap[this.selectedCurrencyCode] || currenciesMap.USD;
  }

  formatAmount(val) {
    const num = parseFloat(val) || 0;
    const curr = this.getCurrencyObj();
    const formattedNum = num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${curr.symbol} ${formattedNum}`;
  }

  formatAmountShort(val) {
    const num = parseFloat(val) || 0;
    const curr = this.getCurrencyObj();
    return `${curr.symbol} ${Math.round(num).toLocaleString()}`;
  }

  init() {
    this.renderCurrencySelector();
    this.renderAll();
  }

  renderAll() {
    this.renderBudgetOverview();
    this.renderTransactions();
    this.renderCategoryProgress();
    this.renderSavingsGoals();
    this.renderHTML5CanvasDonutChart();
    this.renderHTML5CanvasBarChart();
  }

  /* --- 1. Currency Selector Dropdown --- */
  renderCurrencySelector() {
    const selectEl = document.getElementById('fintech-currency-select');
    if (!selectEl) return;

    selectEl.innerHTML = Object.keys(currenciesMap).map(code => {
      const c = currenciesMap[code];
      const isSelected = code === this.selectedCurrencyCode;
      return `<option value="${code}" ${isSelected ? 'selected' : ''}>${c.flag} ${c.symbol} ${c.code} - ${c.name}</option>`;
    }).join('');
  }

  /* --- 2. Budget Overview & Pocket Balance --- */
  renderBudgetOverview() {
    const totalIncome = this.state.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const totalExpense = this.state.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const netPocketBalance = totalIncome - totalExpense;
    const monthlyBudget = this.state.monthlyBudget || 800;
    const remainingBudget = Math.max(0, monthlyBudget - totalExpense);
    const spentPct = Math.min(100, Math.round((totalExpense / monthlyBudget) * 100));

    const balanceEl = document.getElementById('fintech-net-balance');
    const incomeEl = document.getElementById('fintech-total-income');
    const spentEl = document.getElementById('fintech-total-expense');
    const budgetEl = document.getElementById('fintech-monthly-budget');
    const remainingEl = document.getElementById('fintech-remaining-budget');
    const progressBarEl = document.getElementById('fintech-budget-progress-bar');
    const progressTextEl = document.getElementById('fintech-budget-pct-text');

    if (balanceEl) balanceEl.textContent = this.formatAmount(netPocketBalance);
    if (incomeEl) incomeEl.textContent = `+${this.formatAmount(totalIncome)}`;
    if (spentEl) spentEl.textContent = `-${this.formatAmount(totalExpense)}`;
    if (budgetEl) budgetEl.textContent = this.formatAmountShort(monthlyBudget);
    if (remainingEl) remainingEl.textContent = this.formatAmount(remainingBudget);
    if (progressTextEl) progressTextEl.textContent = `${spentPct}% of ${this.formatAmountShort(monthlyBudget)} budget spent`;

    if (progressBarEl) {
      progressBarEl.style.width = `${spentPct}%`;
      if (spentPct > 90) {
        progressBarEl.style.background = 'var(--status-danger)';
      } else if (spentPct > 75) {
        progressBarEl.style.background = 'var(--status-warning)';
      } else {
        progressBarEl.style.background = 'var(--gradient-emerald)';
      }
    }
  }

  updateMonthlyBudget(val) {
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      this.state.monthlyBudget = num;
      this.saveState();
      this.renderBudgetOverview();
    }
  }

  /* --- 3. Transactions List --- */
  renderTransactions() {
    const container = document.getElementById('transactions-list-container');
    if (!container) return;

    const list = this.state.transactions;
    if (list.length === 0) {
      container.innerHTML = `<div class="text-muted" style="text-align:center; padding: var(--space-4);">No transactions recorded yet.</div>`;
      return;
    }

    container.innerHTML = list.map(t => {
      const isIncome = t.type === 'income';
      const color = categoryColors[t.category] || '#6366F1';

      return `
        <div class="glass-card" style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4); margin-bottom: var(--space-2);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div style="width: 38px; height: 38px; border-radius: var(--radius-sm); background: ${color}20; border: 1px solid ${color}40; color: ${color}; display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
              ${isIncome ? '💰' : '💸'}
            </div>
            <div>
              <h4 style="font-size: var(--text-sm);">${t.title}</h4>
              <span style="font-size: 0.7rem; color: var(--text-muted);">${t.category} • ${t.date}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span style="font-weight: bold; font-size: var(--text-base); color: ${isIncome ? 'var(--status-success)' : 'var(--status-danger)'};">
              ${isIncome ? '+' : '-'}${this.formatAmount(t.amount)}
            </span>
            <button class="btn btn-ghost btn-sm" onclick="fintechHubPage.deleteTransaction('${t.id}')">✕</button>
          </div>
        </div>
      `;
    }).join('');
  }

  addTransaction(type, title, amount, category) {
    const parsedAmount = parseFloat(amount);
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newTx = {
      id: `tx-${Date.now()}`,
      type,
      title: title.trim(),
      amount: parsedAmount,
      category: category || (type === 'income' ? 'Allowance' : 'Food & Coffee'),
      date: new Date().toISOString().split('T')[0]
    };

    this.state.transactions.unshift(newTx);
    this.saveState();
    this.renderAll();
  }

  deleteTransaction(txId) {
    this.state.transactions = this.state.transactions.filter(t => t.id !== txId);
    this.saveState();
    this.renderAll();
  }

  /* --- 4. Spending Categories Progress Bars --- */
  renderCategoryProgress() {
    const container = document.getElementById('category-progress-container');
    if (!container) return;

    const expenses = this.state.transactions.filter(t => t.type === 'expense');
    const totalSpent = expenses.reduce((s, t) => s + parseFloat(t.amount), 0);

    if (expenses.length === 0 || totalSpent === 0) {
      container.innerHTML = `<div class="text-muted" style="font-size: var(--text-xs);">No expense data available.</div>`;
      return;
    }

    const categories = {};
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + parseFloat(t.amount);
    });

    container.innerHTML = Object.keys(categories).map(cat => {
      const amt = categories[cat];
      const pct = Math.round((amt / totalSpent) * 100);
      const color = categoryColors[cat] || '#8B5CF6';

      return `
        <div style="margin-bottom: var(--space-3);">
          <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); margin-bottom: 4px;">
            <span style="font-weight: bold; color: var(--text-main);">${cat}</span>
            <span style="color: var(--text-muted);">${this.formatAmount(amt)} (${pct}%)</span>
          </div>
          <div style="background: rgba(255,255,255,0.06); height: 8px; border-radius: 4px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: ${color}; border-radius: 4px; transition: width 0.5s ease;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* --- 5. Pure HTML5 Canvas Donut Chart --- */
  renderHTML5CanvasDonutChart() {
    const canvas = document.getElementById('fintech-canvas-donut');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 240;
    const height = canvas.height = 240;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 90;
    const innerRadius = 55;

    ctx.clearRect(0, 0, width, height);

    const expenses = this.state.transactions.filter(t => t.type === 'expense');
    const totalSpent = expenses.reduce((s, t) => s + parseFloat(t.amount), 0);

    if (expenses.length === 0 || totalSpent === 0) {
      ctx.fillStyle = '#94A3B8';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No Expenses', centerX, centerY);
      return;
    }

    const categories = {};
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + parseFloat(t.amount);
    });

    let currentAngle = -Math.PI / 2;

    Object.keys(categories).forEach(cat => {
      const val = categories[cat];
      const sliceAngle = (val / totalSpent) * (2 * Math.PI);
      const color = categoryColors[cat] || '#6366F1';

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      currentAngle += sliceAngle;
    });

    // Inner Hole Glow & Formatted Label
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius - 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#0F172A';
    ctx.fill();

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.formatAmountShort(totalSpent), centerX, centerY + 2);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.fillText('Total Spent', centerX, centerY + 18);
  }

  /* --- 6. Pure HTML5 Canvas Spending Bar Chart --- */
  renderHTML5CanvasBarChart() {
    const canvas = document.getElementById('fintech-canvas-bar');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 460;
    const height = canvas.height = 180;
    ctx.clearRect(0, 0, width, height);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const spendingData = [45, 20, 85, 12, 60, 95, 30];
    const maxVal = 100;

    const barWidth = 36;
    const gap = (width - 40 - (days.length * barWidth)) / (days.length - 1);
    const startX = 25;
    const bottomY = height - 30;

    const curr = this.getCurrencyObj();

    days.forEach((day, i) => {
      const val = spendingData[i];
      const barHeight = (val / maxVal) * (height - 60);
      const x = startX + i * (barWidth + gap);
      const y = bottomY - barHeight;

      const grad = ctx.createLinearGradient(x, y, x, bottomY);
      grad.addColorStop(0, '#6366F1');
      grad.addColorStop(1, '#8B5CF6');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 6);
      ctx.fill();

      ctx.fillStyle = '#F8FAFC';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${curr.symbol}${val}`, x + barWidth / 2, y - 6);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px sans-serif';
      ctx.fillText(day, x + barWidth / 2, bottomY + 18);
    });
  }

  /* --- 7. Savings Goals --- */
  renderSavingsGoals() {
    const container = document.getElementById('savings-goals-grid');
    if (!container) return;

    const goals = this.state.savingsGoals;
    container.innerHTML = goals.map(g => {
      const pct = Math.min(100, Math.round((g.current / g.target) * 100));
      return `
        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <span style="font-size: 1.5rem;">${g.icon}</span>
              <h4 style="font-size: var(--text-sm);">${g.title}</h4>
            </div>
            <span style="font-size: var(--text-xs); font-weight: bold; color: ${g.color};">
              ${this.formatAmountShort(g.current)} / ${this.formatAmountShort(g.target)}
            </span>
          </div>
          <div style="background: rgba(255,255,255,0.06); height: 8px; border-radius: 4px; overflow: hidden; margin: var(--space-2) 0;">
            <div style="width: ${pct}%; height: 100%; background: ${g.color}; border-radius: 4px; transition: width 0.5s ease;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-3);">
            <span style="font-size: 0.7rem; color: var(--text-muted);">${pct}% Reached</span>
            <button class="btn btn-sm btn-secondary" onclick="fintechHubPage.depositSavings('${g.id}')">+ Deposit (${this.formatAmountShort(50)})</button>
          </div>
        </div>
      `;
    }).join('');
  }

  depositSavings(goalId) {
    const goal = this.state.savingsGoals.find(g => g.id === goalId);
    if (goal) {
      goal.current += 50;
      this.saveState();
      this.renderSavingsGoals();
    }
  }

  addCustomGoal(title, target, icon) {
    const parsedTarget = parseFloat(target);
    if (!title.trim() || isNaN(parsedTarget) || parsedTarget <= 0) return;

    this.state.savingsGoals.push({
      id: `sg-${Date.now()}`,
      title: title.trim(),
      target: parsedTarget,
      current: 0,
      icon: icon || '🎯',
      color: '#10B981'
    });
    this.saveState();
    this.renderSavingsGoals();
  }
}

let fintechHubPage;
document.addEventListener('DOMContentLoaded', () => {
  fintechHubPage = new FintechFinanceHubPage();
  fintechHubPage.init();
});
