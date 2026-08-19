document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const hamburgerIcon = menuToggleBtn?.querySelector('.hamburger-icon');
  const closeIcon = menuToggleBtn?.querySelector('.close-icon');

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.style.display = isOpen ? 'none' : 'block';
        closeIcon.style.display = isOpen ? 'block' : 'none';
      }
    });

    // Close mobile menu when clicking outside or clicking a nav link
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        if (hamburgerIcon && closeIcon) {
          hamburgerIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        navMenu.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        navMenu.classList.remove('open');
        if (hamburgerIcon && closeIcon) {
          hamburgerIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      });
    });
  }

  // Scroll Spy for Active Navigation Link Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
  highlightNavOnScroll(); // Initial check

  // Theme Toggler (Light / Dark mode with local storage persistence)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('krisha_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('krisha_theme', newTheme);
    });
  }

  // Contact Form Lead Dispatch to WhatsApp
  const contactForm = document.getElementById('krisha-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value.trim() || '';
      const phone = document.getElementById('form-phone')?.value.trim() || '';
      const biztype = document.getElementById('form-biztype')?.value || '';
      const msg = document.getElementById('form-msg')?.value.trim() || '';

      const text = `Hello Krisha Tech,%0A%0AI want a website for my business:%0A• Name: ${encodeURIComponent(name)}%0A• Phone: ${encodeURIComponent(phone)}%0A• Category: ${encodeURIComponent(biztype)}%0A• Requirements: ${encodeURIComponent(msg)}`;
      window.open(`https://wa.me/917083330914?text=${text}`, '_blank');
    });
  }
});
