class AdminPortal {
  constructor() {
    this.requestsKey = 'studivo_book_requests_v1';
    this.requests = [];
  }

  init() {
    this.bindNavigation();
    this.bindForms();
    this.loadRequests();
    this.renderRequests();
    this.loadPendingBooks();
    this.renderPendingBooks();
  }

  bindForms() {
    const addBookForm = document.getElementById('add-book-form');
    if (addBookForm) {
      addBookForm.addEventListener('submit', (e) => this.handleAddBookSubmit(e));
    }
  }

  handleAddBookSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('prefill-title').value.trim();
    const author = document.getElementById('prefill-author').value.trim();
    const category = document.getElementById('add-category').value;
    const description = document.getElementById('add-description').value.trim();
    const summary = document.getElementById('add-summary').value.trim();
    const keyIdeasRaw = document.getElementById('add-key-ideas').value.trim();
    const review = document.getElementById('add-review').value.trim();

    const keyTakeaways = keyIdeasRaw.split('\n').map(idea => idea.replace(/^-/, '').trim()).filter(idea => idea.length > 0);

    const newBook = {
      id: 'book-' + Date.now(),
      title,
      author,
      category,
      readTime: '10 min read', 
      readTimeNum: 10,
      difficulty: 'Beginner',
      difficultyNum: 1,
      rating: '5.0 / 5',
      ratingNum: 5.0,
      coverGradient: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
      icon: '📚',
      description,
      overview: description,
      summary5Min: summary,
      keyTakeaways,
      personalReview: review,
      status: 'Published'
    };

    const CUSTOM_BOOKS_KEY = 'studivo_custom_books_v1';
    let customBooks = [];
    try {
      const saved = localStorage.getItem(CUSTOM_BOOKS_KEY);
      if (saved) customBooks = JSON.parse(saved);
    } catch (e) {}

    customBooks.unshift(newBook);

    try {
      localStorage.setItem(CUSTOM_BOOKS_KEY, JSON.stringify(customBooks));
    } catch (err) {}

    const successMsg = document.getElementById('add-book-success');
    if (successMsg) {
      successMsg.style.display = 'block';
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }

    e.target.reset();
  }

  bindNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active class
        navLinks.forEach(l => l.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Switch section
        const target = e.currentTarget.getAttribute('data-target');
        this.switchSection(target);
      });
    });
  }

  switchSection(sectionId) {
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(sec => sec.style.display = 'none');
    
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
      targetSection.style.display = 'block';
    }

    if (sectionId === 'requests') {
      this.loadRequests();
      this.renderRequests();
    }
    
    if (sectionId === 'approve-books') {
      this.loadPendingBooks();
      this.renderPendingBooks();
    }
    
    // On mobile, close side menu if open
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('side-menu-overlay');
    if (sideMenu && sideMenu.classList.contains('active')) {
      sideMenu.classList.remove('active');
      overlay.classList.remove('active');
    }
  }

  loadRequests() {
    try {
      const saved = localStorage.getItem(this.requestsKey);
      if (saved) {
        this.requests = JSON.parse(saved);
      } else {
        this.requests = [];
      }
    } catch (e) {
      this.requests = [];
    }
  }

  saveRequests() {
    try {
      localStorage.setItem(this.requestsKey, JSON.stringify(this.requests));
    } catch (e) {}
  }

  renderRequests() {
    const grid = document.getElementById('requests-grid');
    if (!grid) return;

    if (this.requests.length === 0) {
      grid.innerHTML = `
        <div class="glass-panel" style="padding: var(--space-6); text-align: center;">
          <p style="color: var(--text-muted);">No student book requests at this time.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.requests.map(req => {
      const isApproved = req.status === 'Approved — Ready to Add';
      const dateStr = new Date(req.dateRequested || Date.now()).toLocaleDateString();

      let actionHtml = '';
      if (isApproved) {
        actionHtml = `
          <button class="btn btn-primary" onclick="adminPortal.continueToAddBook('${req.id}')">Continue to Add Book →</button>
        `;
      } else {
        actionHtml = `
          <button class="btn btn-primary" style="background: var(--status-success); border-color: var(--status-success);" onclick="adminPortal.approveRequest('${req.id}')">Approve / Add Book</button>
        `;
      }

      return `
        <div class="glass-card" style="padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-3);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
            <div>
              <h3 style="font-size: 1.4rem; color: var(--brand-primary); margin-bottom: 4px;">${req.title}</h3>
              <p style="font-size: var(--text-sm); color: var(--text-muted);">Author: <strong>${req.author || 'Unknown'}</strong></p>
            </div>
            <span class="badge ${isApproved ? 'badge-success' : 'badge-warning'}">${req.status}</span>
          </div>

          <div style="background: rgba(0,0,0,0.1); padding: var(--space-3); border-radius: var(--radius-sm); border: 1px solid var(--glass-border-light);">
            <span style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; font-weight: bold;">Student Reason:</span>
            <p style="font-size: var(--text-sm); margin-top: 4px; line-height: 1.5;">${req.reason}</p>
          </div>

          <div style="font-size: var(--text-xs); color: var(--text-muted);">
            Requested by: ${req.requestedBy || 'Student'} • Date: ${dateStr}
          </div>

          <div style="display: flex; gap: var(--space-3); margin-top: var(--space-2); flex-wrap: wrap;">
            ${actionHtml}
            <button class="btn btn-ghost" style="color: var(--status-danger); border-color: var(--status-danger);" onclick="adminPortal.deleteRequest('${req.id}')">Delete Request</button>
          </div>
        </div>
      `;
    }).join('');
  }

  approveRequest(id) {
    const req = this.requests.find(r => r.id === id);
    if (!req) return;

    req.status = 'Approved — Ready to Add';
    this.saveRequests();
    this.renderRequests();
  }

  deleteRequest(id) {
    if (!confirm('Are you sure you want to permanently delete this student request?')) return;
    
    this.requests = this.requests.filter(r => r.id !== id);
    this.saveRequests();
    this.renderRequests();
  }

  continueToAddBook(id) {
    const req = this.requests.find(r => r.id === id);
    if (!req) return;

    // Pre-fill the form
    const titleInput = document.getElementById('prefill-title');
    const authorInput = document.getElementById('prefill-author');
    
    if (titleInput) titleInput.value = req.title;
    if (authorInput) authorInput.value = req.author || '';

    // Navigate to Add Books section
    this.switchSection('add-books');

    // Update navigation sidebar active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    
    const addBooksLink = document.querySelector('.nav-link[data-target="add-books"]');
    if (addBooksLink) {
      addBooksLink.classList.add('active');
    }
  }

  loadPendingBooks() {
    this.pendingBooksKey = 'studivo_pending_books_v1';
    try {
      const saved = localStorage.getItem(this.pendingBooksKey);
      if (saved) {
        this.pendingBooks = JSON.parse(saved);
      } else {
        this.pendingBooks = [];
      }
    } catch (e) {
      this.pendingBooks = [];
    }
  }

  savePendingBooks() {
    try {
      localStorage.setItem(this.pendingBooksKey, JSON.stringify(this.pendingBooks));
    } catch (e) {}
  }

  renderPendingBooks() {
    const grid = document.getElementById('pending-books-grid');
    if (!grid) return;

    if (!this.pendingBooks || this.pendingBooks.length === 0) {
      grid.innerHTML = `
        <div class="glass-panel" style="padding: var(--space-6); text-align: center;">
          <p style="color: var(--text-muted);">No student books pending approval.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.pendingBooks.map(book => {
      const dateStr = new Date(book.dateSubmitted || Date.now()).toLocaleDateString();

      return `
        <div class="glass-card" style="padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-3);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
            <div>
              <span class="badge badge-primary" style="margin-bottom: 4px;">${book.category}</span>
              <h3 style="font-size: 1.4rem; color: var(--brand-primary); margin-bottom: 4px;">${book.title}</h3>
              <p style="font-size: var(--text-sm); color: var(--text-muted);">Author: <strong>${book.author || 'Unknown'}</strong></p>
            </div>
            <span class="badge badge-warning">${book.status}</span>
          </div>

          <div style="background: rgba(0,0,0,0.1); padding: var(--space-3); border-radius: var(--radius-sm); border: 1px solid var(--glass-border-light);">
            <h4 style="font-size: var(--text-sm); color: var(--brand-secondary); margin-bottom: 4px;">Student Summary</h4>
            <p style="font-size: var(--text-sm); line-height: 1.5;">${book.summary}</p>
          </div>

          <div style="background: rgba(0,0,0,0.1); padding: var(--space-3); border-radius: var(--radius-sm); border: 1px solid var(--glass-border-light);">
            <h4 style="font-size: var(--text-sm); color: var(--brand-cyan); margin-bottom: 4px;">Key Ideas</h4>
            <p style="font-size: var(--text-sm); line-height: 1.5; white-space: pre-wrap;">${book.notes}</p>
          </div>

          ${book.personalReview ? `
            <div style="background: rgba(0,0,0,0.1); padding: var(--space-3); border-radius: var(--radius-sm); border: 1px solid var(--glass-border-light);">
              <h4 style="font-size: var(--text-sm); color: var(--brand-accent); margin-bottom: 4px;">Personal Review</h4>
              <p style="font-size: var(--text-sm); line-height: 1.5; font-style: italic;">"${book.personalReview}"</p>
            </div>
          ` : ''}

          <div style="font-size: var(--text-xs); color: var(--text-muted);">
            Submitted by: ${book.submittedBy || 'Student'} • Date: ${dateStr}
          </div>

          <div style="display: flex; gap: var(--space-3); margin-top: var(--space-2); flex-wrap: wrap;">
            <button class="btn btn-primary" style="background: var(--status-success); border-color: var(--status-success);" onclick="adminPortal.approvePendingBook('${book.id}')">Approve Book</button>
            <button class="btn btn-ghost" style="color: var(--status-danger); border-color: var(--status-danger);" onclick="adminPortal.deletePendingBook('${book.id}')">Delete Submission</button>
          </div>
        </div>
      `;
    }).join('');
  }

  approvePendingBook(id) {
    const bookIdx = this.pendingBooks.findIndex(b => b.id === id);
    if (bookIdx === -1) return;

    const book = this.pendingBooks[bookIdx];
    
    const keyTakeaways = (book.notes || '').split('\\n').map(idea => idea.replace(/^-/, '').trim()).filter(idea => idea.length > 0);
    
    const approvedBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      category: book.category,
      readTime: '10 min read',
      readTimeNum: 10,
      difficulty: 'Intermediate',
      difficultyNum: 2,
      rating: '5.0 / 5',
      ratingNum: 5.0,
      coverGradient: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
      icon: '🎓',
      description: book.summary.substring(0, 100) + '...',
      overview: book.summary,
      summary5Min: book.summary,
      keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : [book.notes],
      personalReview: book.personalReview,
      status: 'Approved',
      isStudentContribution: true
    };

    const CUSTOM_BOOKS_KEY = 'studivo_custom_books_v1';
    let customBooks = [];
    try {
      const saved = localStorage.getItem(CUSTOM_BOOKS_KEY);
      if (saved) customBooks = JSON.parse(saved);
    } catch (e) {}
    
    customBooks.unshift(approvedBook);
    localStorage.setItem(CUSTOM_BOOKS_KEY, JSON.stringify(customBooks));

    this.pendingBooks.splice(bookIdx, 1);
    this.savePendingBooks();
    
    this.renderPendingBooks();
    alert('Book approved and published to Knowledge Library!');
  }

  deletePendingBook(id) {
    if (!confirm('Are you sure you want to permanently delete this student book submission?')) return;
    
    this.pendingBooks = this.pendingBooks.filter(b => b.id !== id);
    this.savePendingBooks();
    this.renderPendingBooks();
  }
}

const adminPortal = new AdminPortal();

document.addEventListener('DOMContentLoaded', () => {
  adminPortal.init();
});
