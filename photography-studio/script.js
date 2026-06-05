// ITACHI LENS STUDIO — JS

// Progress bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
});

// Nav compact
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('compact', window.scrollY > 80);
});

// Portfolio filter
const pfBtns = document.querySelectorAll('.pf-btn');
const portItems = document.querySelectorAll('.port-item');
pfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    portItems.forEach(item => {
      const cat = item.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.pointerEvents = 'auto';
      } else {
        item.style.opacity = '0.15';
        item.style.transform = 'scale(0.97)';
        item.style.pointerEvents = 'none';
      }
    });
  });
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.svc-card, .port-item, .price-card, .as-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.1}s, transform 0.6s ease ${(i % 4) * 0.1}s`;
  observer.observe(el);
});

// Hero title entrance
window.addEventListener('load', () => {
  const title = document.querySelector('.hl-title');
  const body = document.querySelector('.hl-body');
  const actions = document.querySelector('.hl-actions');
  const eyebrow = document.querySelector('.hl-eyebrow');
  [eyebrow, title, body, actions].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.8s ease ${0.2 + i * 0.15}s, transform 0.8s ease ${0.2 + i * 0.15}s`;
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 50);
  });
});

// Portfolio items transition
portItems.forEach(item => {
  item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
});

// Booking form
const bookForm = document.getElementById('bookForm');
if (bookForm) {
  bookForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = bookForm.querySelector('button');
    btn.textContent = '✓ Booking Diterima!';
    btn.style.background = '#cc0000';
    setTimeout(() => {
      btn.textContent = 'Kirim Booking 📷';
      btn.style.background = '';
      bookForm.reset();
    }, 3000);
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Cursor style on portfolio
portItems.forEach(item => {
  item.style.cursor = 'zoom-in';
  item.addEventListener('click', () => {
    const overlay = item.querySelector('.pi-overlay span');
    if (overlay) {
      const name = overlay.textContent;
      // Simple lightbox simulation
      const lb = document.createElement('div');
      lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:9000;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
      lb.innerHTML = `<div style="text-align:center"><div style="width:300px;height:400px;background:#1a1a1a;margin:0 auto 1.5rem;display:flex;align-items:center;justify-content:center;border:1px solid rgba(204,0,0,0.3)"><span style="color:rgba(204,0,0,0.4);font-size:4rem">⌀</span></div><p style="color:white;font-size:1rem;letter-spacing:0.2em">${name}</p><p style="color:#cc0000;font-size:0.7rem;letter-spacing:0.3em;margin-top:0.5rem">ITACHI LENS STUDIO</p></div>`;
      lb.addEventListener('click', () => lb.remove());
      document.body.appendChild(lb);
    }
  });
});
