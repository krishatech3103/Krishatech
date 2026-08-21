document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. FUTURISTIC ANIMATED PRELOADER
     ========================================== */
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloader-counter');
  const progressBar = document.getElementById('preloader-progress-bar');
  const statusText = document.getElementById('preloader-status-text');

  const statusMessages = [
    'INITIALIZING ENGINE...',
    'LOADING STYLING SYSTEM...',
    'OPTIMIZING RESPONSIVE UTILS...',
    'LAUNCHING KRISHA TECH...'
  ];

  if (preloader && counterEl && progressBar) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        counterEl.textContent = '100%';
        progressBar.style.width = '100%';
        if (statusText) statusText.textContent = 'READY TO LAUNCH!';

        setTimeout(() => {
          preloader.classList.add('preloader-hide');
        }, 350);
      } else {
        counterEl.textContent = `${progress}%`;
        progressBar.style.width = `${progress}%`;
        if (statusText) {
          const msgIdx = Math.floor((progress / 100) * statusMessages.length);
          statusText.textContent = statusMessages[Math.min(msgIdx, statusMessages.length - 1)];
        }
      }
    }, 45);
  }

  /* ==========================================
     2. MULTI-PAGE ACTIVE NAV LINK HIGHLIGHTING
     ========================================== */
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === '' && href === 'index.html') || (pageName === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ==========================================
     3. MOBILE NAVIGATION MENU TOGGLE
     ========================================== */
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

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        if (hamburgerIcon && closeIcon) {
          hamburgerIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      }
    });
  }

  /* ==========================================
     4. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================== */
  const animatedElements = document.querySelectorAll('[data-animate]');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => scrollObserver.observe(el));

  /* ==========================================
     5. ANIMATED STATS NUMBER COUNTER
     ========================================== */
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        let count = 0;
        const duration = 1800; // ms
        const stepTime = Math.max(Math.floor(duration / target), 20);

        const timer = setInterval(() => {
          count += Math.ceil(target / (duration / stepTime));
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          el.textContent = `${prefix}${count.toLocaleString()}${suffix}`;
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  /* ==========================================
     6. THEME TOGGLER (DARK / LIGHT MODE)
     ========================================== */
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

  /* ==========================================
     7. INTERACTIVE WEB COST ESTIMATOR / CALCULATOR
     ========================================== */
  const calcCards = document.querySelectorAll('.calc-option-card');
  const calcDisplay = document.getElementById('calc-total-display');
  const calcBtn = document.getElementById('calc-whatsapp-btn');

  if (calcCards.length > 0 && calcDisplay) {
    function updateCalculator() {
      let total = 2999; // Base package price
      const selectedFeatures = ['Starter 3-5 Page Website (₹2,999)'];

      calcCards.forEach(card => {
        const checkbox = card.querySelector('.calc-checkbox');
        const price = parseInt(card.getAttribute('data-price'), 10) || 0;
        const title = card.getAttribute('data-title') || '';

        if (checkbox && checkbox.checked) {
          card.classList.add('selected');
          total += price;
          selectedFeatures.push(`${title} (+₹${price})`);
        } else {
          card.classList.remove('selected');
        }
      });

      calcDisplay.textContent = `₹ ${total.toLocaleString()}`;

      if (calcBtn) {
        const msgText = `Hello Krisha Tech,%0A%0AI built a custom website quote on your website:%0A• Total Estimate: ₹${total.toLocaleString()}%0A• Selected Services:%0A  - ${selectedFeatures.join('%0A  - ')}%0A%0APlease get back to me with next steps!`;
        calcBtn.setAttribute('href', `https://wa.me/917083330914?text=${msgText}`);
      }
    }

    calcCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const checkbox = card.querySelector('.calc-checkbox');
        if (checkbox && e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        updateCalculator();
      });
    });

    updateCalculator();
  }

  /* ==========================================
     8. PORTFOLIO CATEGORY FILTER
     ========================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* ==========================================
     9. FAQ ACCORDION HANDLER
     ========================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  /* ==========================================
     10. CONTACT FORM DISPATCH TO WHATSAPP
     ========================================== */
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
