document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  const setMenuState = (isOpen) => {
    if (!menuButton || !navMenu) return;
    navMenu.classList.toggle('open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    const menuPath = menuButton.querySelector('path');
    if (menuPath) {
      menuPath.setAttribute('d', isOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16');
    }
  };

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setMenuState(false);
        menuButton.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (
        menuButton.getAttribute('aria-expanded') === 'true' &&
        !navMenu.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        setMenuState(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) setMenuState(false);
    });
  }

  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const willOpen = !item.classList.contains('open');
      item.classList.toggle('open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
  const portfolioItems = document.querySelectorAll('.portfolio-item[data-type]');
  const emptyState = document.getElementById('portfolio-empty');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((otherButton) => {
        const selected = otherButton === button;
        otherButton.classList.toggle('active', selected);
        otherButton.setAttribute('aria-pressed', String(selected));
      });

      portfolioItems.forEach((item) => {
        const visible = filter === 'all' || item.dataset.type === filter;
        item.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      if (emptyState) {
        emptyState.classList.toggle('visible', visibleCount === 0);
      }
    });
  });

  const trackEvent = (eventName, details = {}) => {
    if (!eventName) return;
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...details });
    }
    window.dispatchEvent(new CustomEvent('krisha:track', {
      detail: { event: eventName, ...details }
    }));
  };

  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => {
      element.dataset.track.split(/\s+/).filter(Boolean).forEach((eventName) => {
        trackEvent(eventName, {
          page: window.location.pathname,
          label: element.textContent.trim().replace(/\s+/g, ' ')
        });
      });
    });
  });

  const contactForm = document.getElementById('krisha-contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        if (formStatus) {
          formStatus.textContent = 'Please complete the required fields before continuing.';
          formStatus.classList.add('error');
        }
        return;
      }

      const nameField = document.getElementById('form-name');
      const businessField = document.getElementById('form-business');
      const phoneField = document.getElementById('form-phone');
      const businessTypeField = document.getElementById('form-biztype');
      const messageField = document.getElementById('form-msg');
      const name = nameField ? nameField.value.trim() : '';
      const business = businessField && businessField.value.trim() ? businessField.value.trim() : 'Not provided';
      const phone = phoneField ? phoneField.value.trim() : '';
      const businessType = businessTypeField ? businessTypeField.value.trim() : '';
      const message = messageField && messageField.value.trim() ? messageField.value.trim() : 'I would like to discuss the ₹2,999 business website package.';
      const whatsappMessage = [
        'Hi Krisha Tech, I’m interested in the ₹2,999 business website package.',
        '',
        `Name: ${name}`,
        `Business name: ${business}`,
        `Phone / WhatsApp: ${phone}`,
        `Type of business: ${businessType}`,
        `Message: ${message}`
      ].join('\n');

      trackEvent('contact_form_submit', { page: window.location.pathname });
      if (formStatus) {
        formStatus.textContent = 'WhatsApp is opening with your details. Press send there to complete your enquiry.';
        formStatus.classList.remove('error');
      }
      window.open(`https://wa.me/917083330914?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener');
    });
  }
});
