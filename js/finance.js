/* ==========================================
   STUDIVO PERSONAL FINANCE MANAGER
   Student Budget Planner, Expense Tracker & Dynamic SVG Chart
   ========================================== */

class FinanceManager {
  constructor(storage, gamificationEngine) {
    this.store = storage;
    this.gamification = gamificationEngine;
  }

  init() {
    this.renderBudgetOverview();
    this.renderExpenses();
    this.renderSVGChart();
    this.renderSavingsGoals();
  }

  /* --- 1. Budget Overview Summary --- */
  renderBudgetOverview() {
    const financeState = this.store.get().finance;
    const monthlyBudget = financeState.monthlyBudget || 1200;
    const totalSpent = financeState.expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    const remaining = Math.max(0, monthlyBudget - totalSpent);
    const spentPercentage = Math.min(100, Math.round((totalSpent / monthlyBudget) * 100));

    const budgetEl = document.getElementById('finance-budget-total');
    const spentEl = document.getElementById('finance-spent-total');
    const remainingEl = document.getElementById('finance-remaining-total');
    const progressEl = document.getElementById('finance-budget-progress-bar');
    const pctTextEl = document.getElementById('finance-budget-pct-text');

    if (budgetEl) budgetEl.textContent = `$${monthlyBudget.toFixed(2)}`;
    if (spentEl) spentEl.textContent = `$${totalSpent.toFixed(2)}`;
    if (remainingEl) remainingEl.textContent = `$${remaining.toFixed(2)}`;
    if (pctTextEl) pctTextEl.textContent = `${spentPercentage}% of monthly budget spent`;
    if (progressEl) {
      progressEl.style.width = `${spentPercentage}%`;
      if (spentPercentage > 90) {
        progressEl.style.background = 'var(--status-danger)';
      } else if (spentPercentage > 75) {
        progressEl.style.background = 'var(--status-warning)';
      } else {
        progressEl.style.background = 'var(--gradient-emerald)';
      }
    }
  }

  setMonthlyBudget(newBudget) {
    const val = parseFloat(newBudget);
    if (!isNaN(val) && val > 0) {
      this.store.get().finance.monthlyBudget = val;
      this.store.saveState();
      this.renderBudgetOverview();
      showToast(`Updated monthly budget to $${val}`, 'success');
    }
  }

  /* --- 2. Expense Tracker List --- */
  renderExpenses() {
    const container = document.getElementById('expenses-list-container');
    if (!container) return;

    const expenses = this.store.get().finance.expenses;
    if (expenses.length === 0) {
      container.innerHTML = `<div class="text-muted" style="text-align:center; padding:var(--space-6);">No expenses logged yet!</div>`;
      return;
    }

    const categoryIcons = {
      Education: '📚',
      Food: '🍔',
      Transport: '🚌',
      Wellness: '🧘',
      Housing: '🏠',
      Entertainment: '🎬'
    };

    container.innerHTML = expenses.map(exp => `
      <div class="expense-item">
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <div class="expense-category-icon">
            ${categoryIcons[exp.category] || '💸'}
          </div>
          <div>
            <h4 style="font-size: var(--text-sm);">${exp.title}</h4>
            <span style="font-size: var(--text-xs); color: var(--text-muted);">${exp.category} • ${exp.date}</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: var(--space-4);">
          <span class="expense-amount">-$${parseFloat(exp.amount).toFixed(2)}</span>
          <button class="btn btn-ghost btn-sm" onclick="financeManager.deleteExpense('${exp.id}')">✕</button>
        </div>
      </div>
    `).join('');
  }

  addExpense(title, amount, category) {
    const parsedAmount = parseFloat(amount);
    if (!title || isNaN(parsedAmount) || parsedAmount <= 0) {
      showToast('Please enter a valid expense title and amount', 'warning');
      return;
    }

    const financeState = this.store.get().finance;
    const newExp = {
      id: `exp-${Date.now()}`,
      title,
      amount: parsedAmount,
      category: category || 'Education',
      date: new Date().toISOString().split('T')[0]
    };

    financeState.expenses.unshift(newExp);
    this.store.saveState();
    this.renderBudgetOverview();
    this.renderExpenses();
    this.renderSVGChart();
    this.gamification.addXP(40, 'Logged Financial Expense');

    // Complete q-4 quest if pending
    const quest = this.store.get().gamification.quests.find(q => q.id === 'q-4');
    if (quest && !quest.completed) {
      this.gamification.completeQuest('q-4');
    }

    showToast(`Logged expense $${parsedAmount.toFixed(2)} for ${title}`, 'success');
  }

  deleteExpense(expId) {
    const financeState = this.store.get().finance;
    financeState.expenses = financeState.expenses.filter(e => e.id !== expId);
    this.store.saveState();
    this.renderBudgetOverview();
    this.renderExpenses();
    this.renderSVGChart();
    showToast('Expense removed', 'info');
  }

  /* --- 3. Pure SVG Donut Chart Renderer --- */
  renderSVGChart() {
    const chartSvg = document.getElementById('finance-svg-chart');
    const legendEl = document.getElementById('finance-chart-legend');
    if (!chartSvg) return;

    const expenses = this.store.get().finance.expenses;
    if (expenses.length === 0) {
      chartSvg.innerHTML = `<text x="100" y="100" text-anchor="middle" fill="#94A3B8" font-size="12">No Data</text>`;
      if (legendEl) legendEl.innerHTML = '';
      return;
    }

    // Group by category
    const categories = {};
    let total = 0;
    expenses.forEach(e => {
      categories[e.category] = (categories[e.category] || 0) + parseFloat(e.amount);
      total += parseFloat(e.amount);
    });

    const categoryColors = {
      Education: '#6366F1',
      Food: '#EC4899',
      Transport: '#10B981',
      Wellness: '#8B5CF6',
      Housing: '#F59E0B',
      Entertainment: '#06B6D4'
    };

    let startAngle = 0;
    let pathsSvg = '';
    let legendHtml = '';

    Object.keys(categories).forEach(cat => {
      const val = categories[cat];
      const sliceAngle = (val / total) * 360;
      const color = categoryColors[cat] || '#3B82F6';

      // SVG Donut slice calculation
      const x1 = 100 + 70 * Math.cos((Math.PI * (startAngle - 90)) / 180);
      const y1 = 100 + 70 * Math.sin((Math.PI * (startAngle - 90)) / 180);
      const endAngle = startAngle + sliceAngle;
      const x2 = 100 + 70 * Math.cos((Math.PI * (endAngle - 90)) / 180);
      const y2 = 100 + 70 * Math.sin((Math.PI * (endAngle - 90)) / 180);
      const largeArc = sliceAngle > 180 ? 1 : 0;

      pathsSvg += `
        <path d="M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${color}" opacity="0.9" />
      `;

      const pct = Math.round((val / total) * 100);
      legendHtml += `
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: var(--text-xs); margin-bottom: 4px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background: ${color}; display: inline-block;"></span>
            <span>${cat}</span>
          </div>
          <span style="font-weight: 700; color: var(--text-main);">$${val.toFixed(2)} (${pct}%)</span>
        </div>
      `;

      startAngle += sliceAngle;
    });

    // Donut hole
    pathsSvg += `<circle cx="100" cy="100" r="45" fill="#0F172A" />`;
    pathsSvg += `<text x="100" y="96" text-anchor="middle" fill="#F8FAFC" font-size="14" font-weight="bold">$${total.toFixed(0)}</text>`;
    pathsSvg += `<text x="100" y="112" text-anchor="middle" fill="#94A3B8" font-size="10">Spent</text>`;

    chartSvg.innerHTML = pathsSvg;
    if (legendEl) legendEl.innerHTML = legendHtml;
  }

  /* --- 4. Savings Goals --- */
  renderSavingsGoals() {
    const container = document.getElementById('savings-goals-container');
    if (!container) return;

    const goals = this.store.get().finance.savingsGoals;
    container.innerHTML = goals.map(g => {
      const pct = Math.min(100, Math.round((g.current / g.target) * 100));
      return `
        <div class="glass-card" style="margin-bottom: var(--space-3);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <span style="font-size: 1.4rem;">${g.icon}</span>
              <h4 style="font-size: var(--text-sm);">${g.title}</h4>
            </div>
            <span style="font-size: var(--text-xs); font-weight: bold; color: var(--status-success);">$${g.current} / $${g.target}</span>
          </div>
          <div style="background: rgba(255,255,255,0.06); height: 8px; border-radius: 4px; overflow: hidden; margin: var(--space-2) 0;">
            <div style="width: ${pct}%; height: 100%; background: var(--gradient-emerald); border-radius: 4px;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-2);">
            <span style="font-size: var(--text-xs); color: var(--text-muted);">${pct}% Reached</span>
            <button class="btn btn-sm btn-secondary" onclick="financeManager.addSavingsDeposit('${g.id}')">+ Deposit ($50)</button>
          </div>
        </div>
      `;
    }).join('');
  }

  addSavingsDeposit(goalId) {
    const goals = this.store.get().finance.savingsGoals;
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      goal.current += 50;
      this.store.saveState();
      this.renderSavingsGoals();
      this.gamification.addXP(25, `Saved $50 towards ${goal.title}`);
      showToast(`Deposited $50 to ${goal.title}! 💰`, 'success');
    }
  }
}

const financeManager = new FinanceManager(store, gamification);
