document.addEventListener('DOMContentLoaded', function() {
  // ===== Mobile Menu Toggle =====
  const hamburger = document.getElementById('hamburger-menu');
  const navContainer = document.querySelector('.nav-container');
  const menuOverlay = document.querySelector('.menu-overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navContainer.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navContainer.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  hamburger.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // ===== Back to Top Button =====
  const backToTopButton = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('visible', window.pageYOffset > 300);
  });

  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    backToTopButton.classList.add('clicked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => backToTopButton.classList.remove('clicked'), 1000);
  });

  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Active Nav Link Highlighting =====
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    document.querySelectorAll('section[id]').forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const id = section.getAttribute('id');
        document.querySelectorAll('.nav-link').forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ===== Contact Form Handling =====
  const contactForm = document.getElementById('contact-form-2025');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will contact you soon.');
      this.reset();
    });
  }

  // ===== Location switching =====
  function switchToLocation(location) {
    document.querySelectorAll('.map-iframe, .map-btn, .location-card').forEach((el) => {
      el.classList.toggle('active', el.dataset.location === location);
    });
  }

  document.querySelectorAll('.location-card, .map-btn').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      switchToLocation(el.dataset.location);
    });
  });

  // Initialize with Dhaka as default
  switchToLocation('dhaka');

  // ===== Dynamic Title Change =====
  const sections = {
    home: 'UthsoTracer | Home',
    about1: 'UthsoTracer | About',
    solution: 'UthsoTracer | Solution',
    contact: 'UthsoTracer | Contact'
  };

  function updateTitle() {
    let currentSection = '';
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    document.querySelectorAll('section[id]').forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = section.id;
      }
    });

    if (currentSection && sections[currentSection]) {
      document.title = sections[currentSection];
    }
  }

  window.addEventListener('scroll', updateTitle);
  updateTitle();

  // ===== Scroll Animation =====
  function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate], .solution1-card');
    const windowHeight = window.innerHeight;
    const triggerOffset = windowHeight * 0.8;

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;

      if (elementPosition < triggerOffset) {
        element.classList.add('animate');

        // Special handling for core features cards
        if (element.classList.contains('solution1-card')) {
          element.classList.add('feature-animate');
        }
      }
    });
  }

  // Initialize animation on load
  animateOnScroll();

  // Add scroll event listener
  window.addEventListener('scroll', animateOnScroll);

  // ===== Counter Animation =====
  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const speed = 200; // lower = faster
    const increment = target / speed;

    const updateCount = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = document.querySelectorAll('.counter');
          counters.forEach((counter) => {
            if (!counter.classList.contains('done')) {
              animateCounter(counter);
              counter.classList.add('done');
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(document.querySelector('#impact-section'));

  // ===== Cursor Trail Animation =====
  const trailDot = document.querySelector('.cursor-trail-dot');
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  const ease = 0.8;  // faster easing
  const yOffset = 15;  // distance below the real cursor

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY + yOffset;
  });

  function animateCursor() {
    dotX += (mouseX - dotX) * ease;
    dotY += (mouseY - dotY) * ease;

    trailDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
});