document.addEventListener('DOMContentLoaded', function() {
  // ===== Mobile Menu Toggle =====
  const hamburger = document.getElementById('hamburger-menu');
  const navContainer = document.querySelector('.nav-container');
  const menuOverlay = document.querySelector('.menu-overlay');
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navContainer.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');

    if (navContainer.classList.contains('active')) {
      // Make menu full page and centered
      navContainer.style.height = '100vh';
      navContainer.style.overflowY = 'auto';
      navContainer.style.display = 'flex';
      navContainer.style.flexDirection = 'column';
      navContainer.style.justifyContent = 'center';
      navContainer.style.alignItems = 'center';
    } else {
      // Reset menu styles
      navContainer.style.height = '';
      navContainer.style.overflowY = '';
      navContainer.style.display = '';
      navContainer.style.flexDirection = '';
      navContainer.style.justifyContent = '';
      navContainer.style.alignItems = '';
    }
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navContainer.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
    // Reset menu styles
    navContainer.style.height = '';
    navContainer.style.overflowY = '';
    navContainer.style.display = '';
    navContainer.style.flexDirection = '';
    navContainer.style.justifyContent = '';
    navContainer.style.alignItems = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', closeMenu);
  
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // ===== Header Color Change on Scroll =====
  window.addEventListener('scroll', function() {
    const currentScrollPosition = window.pageYOffset;
    
    // Header background change on scroll
    if (currentScrollPosition > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    backToTopButton.classList.toggle('visible', currentScrollPosition > 300);
    
    // Active nav link highlighting
    updateActiveNavLink();
    
    lastScrollPosition = currentScrollPosition;
  });

  // ===== Update Active Nav Link =====
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100; // Adding offset
    
    document.querySelectorAll('section[id]').forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ===== Back to Top Button =====
  const backToTopButton = document.querySelector('.back-to-top');

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
        
        // Update active nav link immediately
        setTimeout(updateActiveNavLink, 100);
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

  // Only enable cursor trail on desktop devices (width > 768px)
  function handleCursorTrail() {
    if (window.innerWidth > 768) {
      // Show cursor trail and set up event listeners
      trailDot.style.display = 'block';
      
      window.addEventListener('mousemove', updateCursorPosition);
      animateCursor();
    } else {
      // Hide cursor trail and remove event listeners
      trailDot.style.display = 'none';
      window.removeEventListener('mousemove', updateCursorPosition);
    }
  }

  function updateCursorPosition(e) {
    mouseX = e.clientX;
    mouseY = e.clientY + yOffset;
  }

  function animateCursor() {
    // Only animate if we're on desktop
    if (window.innerWidth <= 768) return;

    dotX += (mouseX - dotX) * ease;
    dotY += (mouseY - dotY) * ease;

    trailDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }

  // Initialize cursor trail based on screen size
  handleCursorTrail();
  
  // Update on window resize
  window.addEventListener('resize', handleCursorTrail);

  // Initialize active nav link
  updateActiveNavLink();
});