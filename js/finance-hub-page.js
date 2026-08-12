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
  'Side Hustle': '#3B82F6',
  '🍔 Food': '#EC4899',
  '🎬 Entertainment': '#8B5CF6',
  '📚 Stationery': '#6366F1',
  '🚗 Transport': '#06B6D4',
  '🛍️ Shopping': '#F59E0B',
  '💊 Health': '#10B981',
  '📱 Bills': '#EF4444',
  '📦 Other': '#6B7280'
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
    return 'INR';
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
    this.renderAll();
  }

  renderAll() {
    this.renderBudgetOverview();
    this.renderTransactions();
    this.renderCategoryProgress();
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
    const monthlyAllowance = this.state.pocketAllowance || 0;
    const remainingMoney = monthlyAllowance - totalExpense;
    const spentPct = monthlyAllowance > 0 ? Math.min(100, Math.round((totalExpense / monthlyAllowance) * 100)) : 0;

    const balanceEl = document.getElementById('fintech-net-balance');
    const allowanceEl = document.getElementById('fintech-monthly-allowance');
    const spentEl = document.getElementById('fintech-total-expense');
    const remainingMoneyEl = document.getElementById('fintech-remaining-money');
    const progressBarEl = document.getElementById('fintech-budget-progress-bar');
    const progressTextEl = document.getElementById('fintech-budget-pct-text');

    if (balanceEl) balanceEl.textContent = this.formatAmount(netPocketBalance);
    if (allowanceEl) allowanceEl.textContent = this.formatAmount(monthlyAllowance);
    if (spentEl) spentEl.textContent = this.formatAmount(totalExpense);
    
    if (remainingMoneyEl) {
      remainingMoneyEl.textContent = this.formatAmount(remainingMoney);
      remainingMoneyEl.style.color = remainingMoney >= 0 ? 'var(--status-success)' : 'var(--status-danger)';
    }
  }

  submitAllowance() {
    const inputEl = document.getElementById('modal-allowance-input');
    if (!inputEl) return;
    
    const num = parseFloat(inputEl.value);
    if (!isNaN(num) && num >= 0) {
      this.state.pocketAllowance = num;
      this.saveState();
      this.renderAll();
      
      const modal = document.getElementById('manage-allowance-modal');
      if (modal) modal.classList.remove('active');

      if (typeof showToast === 'function') {
        showToast(`Allowance updated successfully!`, 'success');
      } else {
        alert(`Allowance updated successfully!`);
      }
      
      inputEl.value = '';
    } else {
      alert('Please enter a valid amount.');
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
      
      let emoji = '';
      let catName = t.category;
      const parts = t.category.split(' ');
      if (parts.length > 1 && /[\u{1F300}-\u{1F9FF}]/u.test(parts[0])) {
        emoji = parts[0];
        catName = parts.slice(1).join(' ');
      }

      // Format date to "12 Aug 2026"
      const d = new Date(t.date);
      const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

      return `
        <div class="glass-card" style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4); margin-bottom: var(--space-2);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div>
              <h4 style="font-size: var(--text-sm); margin-bottom: 2px;">${emoji ? emoji + ' ' : ''}${t.title}</h4>
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">${catName}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div style="text-align: right;">
              <span style="font-weight: bold; font-size: var(--text-base); display: block; color: ${isIncome ? 'var(--status-success)' : 'var(--text-main)'};">
                ${isIncome ? '+' : ''}${this.formatAmount(t.amount)}
              </span>
              <span style="font-size: 0.7rem; color: var(--text-muted);">${dateStr}</span>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="fintechHubPage.editTransaction('${t.id}')">✏️ Edit</button>
            <button class="btn btn-ghost btn-sm" onclick="fintechHubPage.deleteTransaction('${t.id}')">🗑️ Delete</button>
          </div>
        </div>
      `;
    }).join('');
  }

  submitExpense() {
    const titleInput = document.getElementById('expense-name-input');
    const amountInput = document.getElementById('expense-amount-input');
    const categoryInput = document.getElementById('expense-category-input');
    const dateInput = document.getElementById('expense-date-input');

    const title = titleInput ? titleInput.value.trim() : '';
    const amount = amountInput ? parseFloat(amountInput.value) : 0;
    const category = categoryInput ? categoryInput.value : '📦 Other';
    let date = dateInput ? dateInput.value : '';

    if (!title) {
      alert('Please enter an expense name.');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }
    if (!date) {
      date = new Date().toISOString().split('T')[0];
    }

    if (this.editingTxId) {
      const existingTx = this.state.transactions.find(t => t.id === this.editingTxId);
      if (existingTx) {
        existingTx.title = title;
        existingTx.amount = amount;
        existingTx.category = category;
        existingTx.date = date;
      }
      this.editingTxId = null;
    } else {
      const newTx = {
        id: `tx-${Date.now()}`,
        type: 'expense',
        title: title,
        amount: amount,
        category: category,
        date: date
      };
      this.state.transactions.unshift(newTx);
    }

    this.saveState();
    this.renderAll();

    // Clear form
    if (titleInput) titleInput.value = '';
    if (amountInput) amountInput.value = '';
    if (dateInput) dateInput.value = '';

    // Close modal
    const modal = document.getElementById('add-expense-modal');
    if (modal) modal.classList.remove('active');

    // Show success message
    if (typeof showToast === 'function') {
      showToast('Expense saved successfully!', 'success');
    } else {
      alert('Expense saved successfully!');
    }
  }

  editTransaction(txId) {
    const tx = this.state.transactions.find(t => t.id === txId);
    if (!tx) return;
    
    this.editingTxId = txId;
    
    const titleInput = document.getElementById('expense-name-input');
    const amountInput = document.getElementById('expense-amount-input');
    const categoryInput = document.getElementById('expense-category-input');
    const dateInput = document.getElementById('expense-date-input');

    if (titleInput) titleInput.value = tx.title;
    if (amountInput) amountInput.value = tx.amount;
    if (categoryInput) categoryInput.value = tx.category;
    if (dateInput) dateInput.value = tx.date;
    
    const modal = document.getElementById('add-expense-modal');
    if (modal) modal.classList.add('active');
  }

  deleteTransaction(txId) {
    if (!confirm('Are you sure you want to delete this expense?')) return;
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

      let catName = cat;
      const parts = cat.split(' ');
      if (parts.length > 1 && /[\u{1F300}-\u{1F9FF}]/u.test(parts[0])) {
        catName = parts.slice(1).join(' ');
      }

      return `
        <div style="margin-bottom: var(--space-3);">
          <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); margin-bottom: 4px;">
            <span style="font-weight: bold; color: var(--text-main);">${catName}</span>
            <span style="color: var(--text-muted);">${this.formatAmount(amt)}</span>
          </div>
          <div style="background: rgba(255,255,255,0.06); height: 8px; border-radius: 4px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: ${color}; border-radius: 4px; transition: width 0.5s ease;"></div>
          </div>
        </div>
      `;
    }).join('');
  }
}

let fintechHubPage;
document.addEventListener('DOMContentLoaded', () => {
  fintechHubPage = new FintechFinanceHubPage();
  fintechHubPage.init();
});
