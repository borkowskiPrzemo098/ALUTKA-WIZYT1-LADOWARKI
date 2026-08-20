(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll progress + header state ---------- */
  const header = document.getElementById('siteHeader');
  const progressFill = document.getElementById('progressFill');
  const heroLoader = document.querySelector('.hero-loader');

  let ticking = false;
  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressFill) progressFill.style.transform = `scaleX(${pct / 100})`;
    if (header) header.classList.toggle('is-scrolled', scrollTop > 20);

    if (heroLoader && !reduceMotion && scrollTop < window.innerHeight) {
      const rot = scrollTop * 0.05;
      const rise = scrollTop * 0.12;
      heroLoader.style.transform = `translateY(calc(-50% - ${rise}px)) rotate(${rot}deg)`;
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contact form (static-site friendly demo handler) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      if (!name.value.trim() || !email.value.trim()) {
        status.textContent = 'Uzupełnij imię i adres e-mail.';
        status.classList.add('is-error');
        return;
      }
      status.classList.remove('is-error');
      status.textContent = 'Dzięki! Wiadomość gotowa do wysyłki — na razie napisz bezpośrednio na kontakt@airload.pl, formularz działa demonstracyjnie.';
      form.reset();
    });
  }

  /* ---------- Smooth anchor scroll with header offset ---------- */
  const headerHeight = () => (header ? header.offsetHeight : 0);
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight() + 1;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
})();
