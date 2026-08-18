/* ==========================================================================
   KRISHA TECH - Main Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('krishatech-theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('krishatech-theme', theme);
  }

  setTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }

  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }

  // WhatsApp Contact Form Submission Handler
  const contactForm = document.getElementById('krisha-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name')?.value || '';
      const phone = document.getElementById('form-phone')?.value || '';
      const bizType = document.getElementById('form-biztype')?.value || '';
      const msg = document.getElementById('form-msg')?.value || '';

      const text = `Hello Krisha Tech! 👋%0A%0AI am interested in getting a website for my business:%0A• *Name:* ${encodeURIComponent(name)}%0A• *Mobile:* ${encodeURIComponent(phone)}%0A• *Business Type:* ${encodeURIComponent(bizType)}%0A• *Details:* ${encodeURIComponent(msg)}`;
      
      const whatsappUrl = `https://wa.me/917083330914?text=${text}`;
      window.open(whatsappUrl, '_blank');
    });
  }
});
