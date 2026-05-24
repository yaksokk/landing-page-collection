/* ===== I18N ENGINE =====
 * Bekerja dalam 3 mode — pilih di index.html:
 *
 *   Dengan terjemahan MANUAL → <script src="translations.js"></script>
 *   Dengan terjemahan API    → <script src="../shared/translation-api.js"></script>
 *   Tanpa terjemahan         → tidak perlu load script apapun (hapus tombol toggle di HTML & CSS)
 *
 * Tidak perlu ubah file ini apapun yang dipilih.
 * ========================= */

async function initTranslations() {
  if (window.manualTranslations) {
    /* ── Mode MANUAL ── */
    window._i18n = {
      id: window.manualTranslations.id,
      en: window.manualTranslations.en
    };

  } else if (window.TranslationAPI) {
    /* ── Mode API ── */
    const cfg = window.TranslationAPI.config;
    const sourceTexts = {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
      sourceTexts[el.getAttribute('data-i18n')] = el.textContent.trim();
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      sourceTexts[el.getAttribute('data-i18n-placeholder')] = el.getAttribute('placeholder') || '';
    });
    window._i18n = { id: sourceTexts, en: sourceTexts };
    try {
      window._i18n.en = await window.TranslationAPI.translateAllKeys(sourceTexts, cfg.sourceLang, cfg.targetLang);
    } catch (err) {
      console.warn('[i18n] API gagal, hanya Bahasa Indonesia tersedia.', err);
    }

  } else {
    /* ── Mode TANPA TERJEMAHAN ── tidak ada error, halaman jalan normal */
    window._i18n = null;
  }
}

let currentLang = 'id';

/* ===== LANGUAGE TOGGLE ===== */
function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (window._i18n?.[lang]?.[key]) el.textContent = window._i18n[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (window._i18n?.[lang]?.[key]) el.placeholder = window._i18n[lang][key];
  });
  const langId = document.getElementById('lang-id');
  const langEn = document.getElementById('lang-en');
  if (lang === 'id') {
    langId.classList.add('active');
    langEn.classList.remove('active');
  } else {
    langEn.classList.add('active');
    langId.classList.remove('active');
  }
  document.documentElement.lang = lang;
}

document.getElementById('lang-toggle')?.addEventListener('click', () => {
  if (window._i18n) setLanguage(currentLang === 'id' ? 'en' : 'id');
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  if (scrollY > 300) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) link.classList.add('active');
      });
    }
  });
});

/* ===== BACK TO TOP ===== */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('.smooth-scroll').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== MENU TABS ===== */
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanels = document.querySelectorAll('.menu-panel');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.getAttribute('data-tab');

    menuTabs.forEach(t => t.classList.remove('active'));
    menuPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const targetPanel = document.getElementById('tab-' + targetTab);
    if (targetPanel) targetPanel.classList.add('active');
  });
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = '...';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      formStatus.className = 'form-status success';
      formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + window._i18n?.[currentLang]?.form_success || 'Pesan terkirim!';
      contactForm.reset();
    } else {
      throw new Error('Server error');
    }
  } catch {
    formStatus.className = 'form-status error';
    formStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + window._i18n?.[currentLang]?.form_error || 'Terjadi kesalahan.';
  }

  submitBtn.disabled = false;
  submitBtn.textContent = window._i18n?.[currentLang]?.form_submit || 'Kirim Pesan';

  setTimeout(() => {
    formStatus.className = 'form-status';
    formStatus.innerHTML = '';
  }, 5000);
});

/* ===== INIT ===== */
(async () => {
  await initTranslations();
  setLanguage('id');
})();
