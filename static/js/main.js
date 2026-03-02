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

function initArticleImageViewer() {
  const images = document.querySelectorAll('.blog-post-content img');
  if (!images.length) {
    return;
  }

  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.cssText = [
    'position:fixed',
    'inset:0',
    'display:none',
    'align-items:center',
    'justify-content:center',
    'padding:24px',
    'background:rgba(0,0,0,0.9)',
    'z-index:9999',
    'cursor:zoom-out'
  ].join(';');

  const fullImage = document.createElement('img');
  fullImage.alt = '';
  fullImage.style.cssText = [
    'max-width:100%',
    'max-height:100%',
    'object-fit:contain',
    'box-shadow:0 8px 30px rgba(0,0,0,0.35)'
  ].join(';');

  overlay.appendChild(fullImage);
  document.body.appendChild(overlay);

  const closeOverlay = () => {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  overlay.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.style.display === 'flex') {
      closeOverlay();
    }
  });

  images.forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (event) => {
      const anchor = img.closest('a');
      if (anchor) {
        event.preventDefault();
      }

      const src = img.currentSrc || img.src;
      if (!src) {
        return;
      }

      fullImage.src = src;
      fullImage.alt = img.alt || '';
      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
}

function initConsentSettingsLinks() {
  document.querySelectorAll('[data-open-consent-settings]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      if (typeof window.openKlaroSettings === 'function') {
        window.openKlaroSettings();
        return;
      }

      if (!window.klaro || typeof window.klaro.show !== 'function') {
        console.warn('Klaro is not available yet.');
        return;
      }

      window.klaro.show(window.klaroConfig, true);
    });
  });
}

function initProductGalleryModal() {
  const modal = document.getElementById('product-gallery-modal');
  if (!modal) {
    return;
  }

  const cards = Array.from(document.querySelectorAll('.product-card.has-gallery[data-screenshots]'));
  if (!cards.length) {
    return;
  }

  const titleEl = document.getElementById('product-gallery-title');
  const imageEl = document.getElementById('product-gallery-image');
  const thumbsEl = document.getElementById('product-gallery-thumbs');
  const dialogEl = modal.querySelector('.product-gallery-dialog');
  const closeEls = modal.querySelectorAll('[data-gallery-close]');

  let screenshots = [];
  let activeIndex = 0;

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    screenshots = [];
    thumbsEl.innerHTML = '';
    thumbsEl.style.display = 'none';
    if (dialogEl) {
      dialogEl.classList.remove('gallery-mode');
    }
    imageEl.removeAttribute('src');
    imageEl.alt = '';
  };

  const renderImage = (index) => {
    if (!screenshots.length) {
      return;
    }

    activeIndex = Math.max(0, Math.min(index, screenshots.length - 1));
    const src = screenshots[activeIndex];
    imageEl.src = src;
    imageEl.alt = titleEl.textContent || 'Product screenshot';

    const thumbButtons = thumbsEl.querySelectorAll('.product-gallery-thumb');
    thumbButtons.forEach((button, buttonIndex) => {
      button.classList.toggle('active', buttonIndex === activeIndex);
    });
  };

  const openModal = (productName, rawScreenshots) => {
    screenshots = rawScreenshots
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!screenshots.length) {
      return;
    }

    titleEl.textContent = productName || 'Product';
    thumbsEl.innerHTML = '';
    thumbsEl.style.display = screenshots.length > 1 ? 'grid' : 'none';
    if (dialogEl) {
      dialogEl.classList.toggle('gallery-mode', screenshots.length > 1);
    }

    if (screenshots.length > 1) {
      screenshots.forEach((src, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'product-gallery-thumb';
        button.setAttribute('aria-label', `Open screenshot ${index + 1}`);

        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.alt = '';

        button.appendChild(thumb);
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          renderImage(index);
        });

        thumbsEl.appendChild(button);
      });
    }

    renderImage(0);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  cards.forEach((card) => {
    const open = (event) => {
      if (event.target.closest('a')) {
        return;
      }
      openModal(card.dataset.productName, card.dataset.screenshots || '');
    };

    card.addEventListener('click', open);

    const trigger = card.querySelector('.product-gallery-trigger');
    if (trigger) {
      trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        open(event);
      });
    }
  });

  closeEls.forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('open')) {
      return;
    }

    if (event.key === 'Escape') {
      closeModal();
    }

    if (event.key === 'ArrowRight') {
      if (screenshots.length <= 1) {
        return;
      }
      renderImage(activeIndex + 1);
    }

    if (event.key === 'ArrowLeft') {
      if (screenshots.length <= 1) {
        return;
      }
      renderImage(activeIndex - 1);
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initArticleImageViewer();
  initProductGalleryModal();
  initConsentSettingsLinks();

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
