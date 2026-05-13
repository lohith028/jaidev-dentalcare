/**
 * Jaidev Multispeciality Dental Care - Main JavaScript
 * Handles interactivity, animations, and form validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar sticky scroll shadow
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // 2. Mobile hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      body.classList.toggle('nav-open');
      const expanded = body.classList.contains('nav-open');
      hamburger.setAttribute('aria-expanded', expanded);
    });
  }

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('nav-open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-open');
      
      // Close all other items
      faqItems.forEach(otherItem => otherItem.classList.remove('faq-open'));
      
      // Toggle current item
      if (!isOpen) {
        item.classList.add('faq-open');
      }
    });
  });

  // 4. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Stat Counter Animation
  const statsSection = document.querySelector('.trust-strip');
  if (statsSection) {
    const stats = statsSection.querySelectorAll('.trust-item span:first-child');
    const animateStats = () => {
      stats.forEach(stat => {
        const target = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
        const suffix = stat.innerText.replace(/[0-9]/g, '');
        let count = 0;
        const duration = 2000;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          count = Math.floor(progress * target);
          stat.innerText = count + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            stat.innerText = target + suffix;
          }
        };
        requestAnimationFrame(updateCount);
      });
    };

    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.unobserve(statsSection);
      }
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

  // 6. Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-msg')) {
          if (!field.value.trim()) {
            errorMsg.style.display = 'block';
            isValid = false;
          } else {
            errorMsg.style.display = 'none';
          }
        }

        // Phone validation (10 digits)
        if (field.id === 'phone' && field.value) {
          const phonePattern = /^[0-9]{10}$/;
          const phoneError = field.nextElementSibling;
          if (!phonePattern.test(field.value)) {
            if (phoneError) {
              phoneError.innerText = 'Please enter a valid 10-digit phone number.';
              phoneError.style.display = 'block';
            }
            isValid = false;
          }
        }
      });

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        // Simulated redirect (actual form action would be Formspree)
        setTimeout(() => {
          window.location.href = 'thank-you.html';
        }, 1500);
      }
    });
  }

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('visible'));
  }
});
