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
