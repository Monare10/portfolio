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
  'Full Stack Development',
  'Backend Engineering',
  'Frontend Engineering',
  'Software Engineering'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const subtitleEl = document.querySelector('.hero-subtitle');

function typeRole() {
  // Safety check in case the element isn't found
  if (!subtitleEl) return; 

  const current = roles[roleIndex];
  
  if (isDeleting) {
    subtitleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    subtitleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  // Logic for when to delete or move to next word
  let typeSpeed = isDeleting ? 50 : 80;

  if (!isDeleting && charIndex === current.length) {
    // Pause at the end of the word before deleting
    typeSpeed = 2000; 
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    // Pause before typing the next word
    typeSpeed = 500; 
  }

  setTimeout(typeRole, typeSpeed);
}

// Wait for the DOM to load before starting the animation
document.addEventListener('DOMContentLoaded', () => {
  // Clear the default text from HTML so it doesn't overlap
  if (subtitleEl) subtitleEl.textContent = ''; 
  setTimeout(typeRole, 500);
});