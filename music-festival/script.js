// MESSIFEST 2025 — JS

// Countdown
const festDate = new Date('2025-11-14T07:00:00');
function updateCountdown() {
  const now = new Date();
  const diff = festDate - now;
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = '<div class="cd-item"><span class="cd-num">LIVE NOW!</span></div>';
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  document.getElementById('cd-days').textContent = String(days).padStart(3, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Day tabs
const dayTabs = document.querySelectorAll('.day-tab');
dayTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    dayTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const grid = document.getElementById('lineupGrid');
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(10px)';
    setTimeout(() => {
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    }, 300);
  });
});
document.getElementById('lineupGrid').style.transition = 'opacity 0.3s, transform 0.3s';

// FAQ Toggle
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

// Announce bar duplicate
const bar = document.querySelector('.announce-inner');
if (bar) bar.innerHTML += bar.innerHTML;

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.artist, .stage-card, .ticket-card, .faq-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.08}s, transform 0.5s ease ${(i % 6) * 0.08}s`;
  revealObserver.observe(el);
});

// Hero title entrance
window.addEventListener('load', () => {
  ['.ht1', '.ht2', '.ht3'].forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(80px) skewY(5deg)';
    el.style.transition = `opacity 0.8s ease ${0.3 + i * 0.15}s, transform 0.8s ease ${0.3 + i * 0.15}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 50);
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Mouse parallax orbs
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});
