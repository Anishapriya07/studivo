/* ==========================================
   STUDIVO THEME ENGINE
   Light & Dark Mode Switcher with LocalStorage Persistence & Dynamic Brand Logo Swapping
   ========================================== */

const THEME_STORAGE_KEY = 'studivo_theme_mode_v1';

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) {}
  return 'dark'; // Default
}

function updateNavLogoTheme(theme) {
  const brandLogos = document.querySelectorAll('.nav-brand img');
  brandLogos.forEach(img => {
    if (img.src.includes('logo-horizontal') || img.src.includes('logo-light')) {
      img.src = theme === 'light' ? 'assets/logo/logo-light.svg' : 'assets/logo/logo-horizontal.svg';
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {}

  updateNavLogoTheme(theme);

  if (window.fintechHubPage && typeof window.fintechHubPage.renderAll === 'function') {
    window.fintechHubPage.renderAll();
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

// Apply saved theme immediately on script execution
(function() {
  const initialTheme = getSavedTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = getSavedTheme();
  updateNavLogoTheme(currentTheme);
});

/* ==========================================
   STUDIVO CURRENCY ENGINE
   Global currency replacer
   ========================================== */
window.currencyEngine = {
  getSymbol: function() {
    let currencySetting = localStorage.getItem('studivo_currency') || 'USD $';
    let parts = currencySetting.split(' ');
    return parts.length > 1 ? parts[1] : '$';
  },
  
  applyCurrency: function(root = document.body) {
    const symbol = this.getSymbol();
    // Match any of the known currency symbols immediately followed by a digit
    // We include space just in case, e.g. "د.إ 500"
    const symbolRegex = /(?:\$|₹|€|£|¥|د\.إ|C\$|A\$|S\$)\s*([\d,.]+)/g;
    
    function walk(node) {
      if (!node) return;
      if (node.nodeType === 3) { // Text node
        if (symbolRegex.test(node.nodeValue)) {
           node.nodeValue = node.nodeValue.replace(symbolRegex, symbol + '$1');
        }
      } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE' && node.nodeName !== 'OPTION' && node.nodeName !== 'SELECT') {
        for (let i = 0; i < node.childNodes.length; i++) {
          walk(node.childNodes[i]);
        }
      }
    }
    
    walk(root);
  },

  init: function() {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
      this.applyCurrency();
      
      // Observe DOM for dynamic changes (like rendering components)
      const observer = new MutationObserver((mutations) => {
        let newNodes = [];
        for (let m of mutations) {
          if (m.addedNodes.length > 0) {
            for (let i = 0; i < m.addedNodes.length; i++) {
              newNodes.push(m.addedNodes[i]);
            }
          } else if (m.type === 'characterData') {
            newNodes.push(m.target);
          }
        }
        
        if (newNodes.length > 0) {
          observer.disconnect();
          for (let node of newNodes) {
            this.applyCurrency(node);
          }
          observer.observe(document.body, { childList: true, subtree: true, characterData: true });
        }
      });
      
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });

      // Handle currency selector change in Settings
      const selector = document.getElementById('currency-selector');
      if (selector) {
        selector.addEventListener('change', () => {
           this.applyCurrency(document.body);
        });
      }
    });
  }
};

window.currencyEngine.init();

/* ==========================================
   STUDIVO SIDE MENU ENGINE
   Hamburger Menu Logic
   ========================================== */
function initSideMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sideMenu = document.getElementById('side-menu');
  const overlay = document.getElementById('side-menu-overlay');
  const closeBtn = document.getElementById('side-menu-close');

  if (!hamburgerBtn || !sideMenu || !overlay) return;

  function openMenu() {
    sideMenu.classList.add('open');
    overlay.classList.add('open');
  }

  function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('open');
  }

  hamburgerBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking on any link inside the menu
  const links = sideMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSideMenu();
});
