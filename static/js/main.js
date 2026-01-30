// Theme Management
let isDark = false;

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  applyTheme();
  updateThemeToggle();
}

function toggleTheme() {
  isDark = !isDark;
  applyTheme();
  updateThemeToggle();
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark);
}

function updateThemeToggle() {
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  const toggles = document.querySelectorAll('.theme-toggle');
  toggles.forEach(toggle => {
    toggle.innerHTML = isDark ? sunIcon : moonIcon;
  });
}

// Mobile Menu
let isMenuOpen = false;

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      document.querySelector('.nav-mobile').classList.toggle('open', isMenuOpen);
      menuToggle.innerHTML = isMenuOpen ? closeIcon : menuIcon;
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      isMenuOpen = false;
      document.querySelector('.nav-mobile').classList.remove('open');
      if (menuToggle) {
        menuToggle.innerHTML = menuIcon;
      }
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();

  // Theme toggle event listeners
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
