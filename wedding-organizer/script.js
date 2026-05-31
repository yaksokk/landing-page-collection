// ========================
// ACKERMAN BRIDAL — JS
// ========================

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorFollower.style.transform = 'translate(-50%,-50%) scale(1.5)';
    cursorFollower.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.opacity = '0.6';
  });
});

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// Counter animation
const nums = document.querySelectorAll('.num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute('data-target');
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, 25);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
nums.forEach(n => counterObserver.observe(n));

// Duplicate testimoni cards for infinite scroll
const track = document.getElementById('testiTrack');
if (track) {
  const cards = track.innerHTML;
  track.innerHTML = cards + cards;
}

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = '✓ Pesan Terkirim!';
    btn.style.background = '#9d6e6f';
    setTimeout(() => {
      btn.textContent = 'Kirim Pesan 💌';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// Nav toggle mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.position = 'fixed';
    navLinks.style.top = '80px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.flexDirection = 'column';
    navLinks.style.background = 'rgba(250,246,241,0.98)';
    navLinks.style.padding = '2rem';
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Parallax hero circles
window.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
  document.querySelectorAll('.hero-circle').forEach((el, i) => {
    const factor = (i + 1) * 0.5;
    el.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
  });
});
