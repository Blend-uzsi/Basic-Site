

document.addEventListener('DOMContentLoaded', function () {
  // Loader fade out
  const loader = document.getElementById('loader');
  setTimeout(() => loader && (loader.style.opacity = 0), 900);
  setTimeout(() => loader && (loader.style.display = 'none'), 1700);

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.body.classList.remove('nav-open');
      }
    });
  });

  // Hamburger nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', function () {
    document.body.classList.toggle('nav-open');
    navLinks.classList.toggle('open');
  });

  // Animate sections on scroll (build up effect)
  const scrollSections = document.querySelectorAll('.scroll-animate');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: add a delay for a more dramatic build-up
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  scrollSections.forEach((section, i) => {
    section.style.transitionDelay = `${i * 0.13 + 0.2}s`;
    observer.observe(section);
  });

  // Gallery lightbox
  const galleryImgs = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.classList.add('active');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    }
  });

  // Scroll to top button
  const scrollBtn = document.getElementById('scrollToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Button ripple effect
  document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function (e) {
      this.classList.add('pulse');
    });
    btn.addEventListener('mouseleave', function (e) {
      this.classList.remove('pulse');
    });
  });

  // Staggered menu tile animation
  const menuTiles = document.querySelectorAll('.menu-tile');
  menuTiles.forEach((tile, i) => {
    tile.style.animationDelay = `${0.2 + i * 0.13}s`;
  });

  // Reviews carousel infinite scroll
  const reviewsCarousel = document.querySelector('.testimonials-carousel');
  const reviews = Array.from(document.querySelectorAll('.testimonial-card'));
  let reviewIndex = 0;
  let reviewWidth = 0;

  function updateReviewWidth() {
    if (reviews.length > 0) {
      reviewWidth = reviews[0].offsetWidth + 24; // margin
    }
  }
  updateReviewWidth();
  window.addEventListener('resize', updateReviewWidth);

  function moveReviews() {
    reviews.forEach((review, i) => {
      let offset = ((i - reviewIndex + reviews.length) % reviews.length) * reviewWidth;
      review.style.transform = `translateX(${offset}px)`;
    });
    reviewIndex = (reviewIndex + 1) % reviews.length;
  }
  setInterval(() => {
    moveReviews();
  }, 3000); // Adjust speed here
  moveReviews();

  // Facts number animation
  const yearsNumber = document.getElementById('years-number');
  const staffNumber = document.getElementById('staff-number');
  const roomsNumber = document.getElementById('rooms-number');
  function animateNumbers() {
    let years = 0, staff = 0, rooms = 0;
    const yearsTarget = 10, staffTarget = 20, roomsTarget = 24;
    const duration = 1200;
    const steps = 40;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      years = Math.round((yearsTarget * step) / steps);
      staff = Math.round((staffTarget * step) / steps);
      rooms = Math.round((roomsTarget * step) / steps);
      yearsNumber.textContent = years;
      staffNumber.textContent = staff;
      roomsNumber.textContent = rooms;
      if (step >= steps) {
        yearsNumber.textContent = yearsTarget;
        staffNumber.textContent = staffTarget;
        roomsNumber.textContent = roomsTarget;
        clearInterval(interval);
      }
    }, duration / steps);
  }
  const factsSection = document.querySelector('.facts-section');
  const factsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateNumbers();
    });
  }, { threshold: 0.4 });
  factsObserver.observe(factsSection);
});
