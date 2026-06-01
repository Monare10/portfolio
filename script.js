// ── NAVBAR SCROLL EFFECT ─────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── MOBILE HAMBURGER MENU ────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── ACTIVE NAV LINK ON SCROLL ────────────────────
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        link.style.color = '#38BDF8';
      } else {
        link.style.color = '';
      }
    }
  });
});

// ── SCROLL ANIMATIONS ────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

const animatedEls = document.querySelectorAll(
  '.highlight-card, .skill-category, .project-card, .contact-item'
);
animatedEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ── CONTACT FORM ─────────────────────────────────
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('name').value;
  const email   = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Build mailto link
  const mailtoLink =
    `mailto:nrammutla41@gmail.com` +
    `?subject=${encodeURIComponent(subject + ' - from ' + name)}` +
    `&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

  window.location.href = mailtoLink;

  note.textContent = '✓ Opening your email client...';
  setTimeout(() => {
    note.textContent = '';
    form.reset();
  }, 3000);
});

// ── SMOOTH TYPING EFFECT ON HERO ─────────────────
const roles = [
  'Full-Stack Software Developer',
  'Python & FastAPI Developer',
  'React Frontend Developer',
  'Database Designer',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const subtitleEl = document.querySelector('.hero-subtitle');

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    subtitleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    subtitleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % roles.length;
  }

  const speed = isDeleting ? 50 : 80;
  setTimeout(typeRole, speed);
}

setTimeout(typeRole, 1000);