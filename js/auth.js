/* ==========================================
   STUDIVO FRONTEND ROLE-BASED AUTHENTICATION ENGINE
   Session Persistence via LocalStorage & Role-Based Control System
   ==========================================
   SECURITY NOTE:
   This authentication system is for demonstration purposes only. In a production application, 
   authentication should be handled securely on a backend server.
   ========================================== */

const AUTH_STORAGE_KEY = 'studivo_auth_session_v1';

class AuthEngine {
  constructor() {
    this.session = this.loadSession();
    this.enforceRouting();
  }

  enforceRouting() {
    const path = window.location.pathname;
    let page = path.substring(path.lastIndexOf('/') + 1);
    if (!page || !page.endsWith('.html')) {
        page = 'index.html';
    }
    
    // Allow unrestricted access to login and brand guide
    if (page === 'login.html' || page === 'logo-brand-guide.html') {
       return;
    }

    // If not logged in, redirect to login
    if (!this.session || !this.session.isLoggedIn) {
      window.location.href = 'login.html';
      return;
    }

    const adminPages = ['admin-portal.html'];
    
    // Admin routing
    if (this.session.role === 'admin' && !adminPages.includes(page)) {
      window.location.href = 'admin-portal.html';
    } 
    // Student routing
    else if (this.session.role === 'student' && adminPages.includes(page)) {
      window.location.href = 'index.html';
    }
  }

  loadSession() {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) return parsed;
      }
    } catch (e) {}
    
    // Default session (Guest mode so they are forced to login)
    return {
      isLoggedIn: false,
      role: 'guest',
      username: 'Guest',
      loginTime: null
    };
  }

  saveSession(sessionData) {
    this.session = sessionData;
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
    } catch (e) {}
  }

  login(role, username, password) {
    if (role === 'admin') {
      // Hardcoded Admin Credentials for demonstration
      if (username.trim() === 'admin' && password.trim() === 'studivo123') {
        const adminSession = {
          isLoggedIn: true,
          role: 'admin',
          username: 'Admin',
          loginTime: new Date().toISOString()
        };
        this.saveSession(adminSession);
        return { success: true, message: 'Admin login successful!' };
      } else {
        return { success: false, message: 'Invalid Admin credentials! Use: admin / studivo123' };
      }
    } else {
      // Student Login
      const studentName = username.trim() || 'Alex Rivers';
      const studentSession = {
        isLoggedIn: true,
        role: 'student',
        username: studentName,
        loginTime: new Date().toISOString()
      };
      this.saveSession(studentSession);
      return { success: true, message: `Welcome back, ${studentName}!` };
    }
  }

  logout() {
    const guestSession = {
      isLoggedIn: false,
      role: 'guest',
      username: 'Guest',
      loginTime: null
    };
    this.saveSession(guestSession);
    window.location.href = 'login.html';
  }

  isAdmin() {
    return this.session.isLoggedIn && this.session.role === 'admin';
  }

  isStudent() {
    return this.session.isLoggedIn && this.session.role === 'student';
  }

  getUserRole() {
    return this.session.role || 'guest';
  }

  getUsername() {
    return this.session.username || 'Guest';
  }

  renderNavbarAuthWidget() {
    const navbar = document.querySelector('.landing-navbar');
    if (!navbar) return;

    // Check if auth badge already exists
    let authWidget = document.getElementById('navbar-auth-widget');
    if (!authWidget) {
      authWidget = document.createElement('div');
      authWidget.id = 'navbar-auth-widget';
      authWidget.style.cssText = 'display: flex; align-items: center; gap: var(--space-3); margin-left: auto;';
      
      const hamburger = document.getElementById('hamburger-btn');
      if (hamburger) {
         hamburger.parentNode.insertBefore(authWidget, hamburger);
      } else {
         navbar.appendChild(authWidget);
      }
    }

    if (this.session.isLoggedIn) {
      const isAdmin = this.session.role === 'admin';
      authWidget.innerHTML = `
        <div class="glass-card" style="padding: 4px 12px; border-radius: var(--radius-full); display: flex; align-items: center; gap: 6px; font-size: var(--text-xs); font-weight: bold; border-color: ${isAdmin ? 'var(--brand-accent)' : 'var(--brand-primary)'};">
          <span>${isAdmin ? '👨‍💼 Admin' : '👨‍🎓 Student'}</span>
          <span style="color: var(--text-muted);">(${this.session.username})</span>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="authEngine.logout()" title="Logout" style="font-size: var(--text-xs);">
          Logout 🚪
        </button>
      `;
    } else {
      authWidget.innerHTML = `
        <a href="login.html" class="btn btn-secondary btn-sm">
          Login 🔑
        </a>
      `;
    }
  }
}

const authEngine = new AuthEngine();

document.addEventListener('DOMContentLoaded', () => {
  authEngine.renderNavbarAuthWidget();
});
