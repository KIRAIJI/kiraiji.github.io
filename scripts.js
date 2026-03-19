const toggleButton = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const yearEl = document.querySelector('#currentYear');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (toggleButton && nav) {
  toggleButton.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close nav when clicking outside (for mobile)
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !toggleButton.contains(event.target)) {
      nav.classList.remove('open');
    }
  });
}

// Smooth in-page scroll for old browsers that don't support CSS scroll-behavior.
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Close mobile nav if open
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });
});
