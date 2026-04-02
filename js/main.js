/* Beach Construction LLC — Shared JS */

(function () {
  'use strict';

  // ── Helpers ───────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ── Active nav link ───────────────────────────────────
  const path = window.location.pathname;
  $$('.nav__link, .nav__dropdown-item').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && path.endsWith(href.split('/').pop())) {
      a.classList.add('active');
    }
  });

  // ── Scroll: nav background ────────────────────────────
  const nav = $('#nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Scroll reveal ─────────────────────────────────────
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
  );
  $$('.reveal').forEach(el => io.observe(el));

  // ── Hero parallax + entrance ──────────────────────────
  const hero = $('.page-hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  // ── Mobile nav ────────────────────────────────────────
  const burger = $('#burger');
  const mobileNav = $('#mobileNav');
  const mobileClose = $('#mobileClose');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    const closeMenu = () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    };
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    $$('.mobile-link', mobileNav).forEach(l => l.addEventListener('click', closeMenu));
  }

  // ── Expandable service cards ───────────────────────────
  $$('.service-card--expandable').forEach(card => {
    card.addEventListener('click', e => {
      // Let the Learn More link navigate normally
      if (e.target.closest('.service-card__link')) return;

      const isExpanded = card.classList.contains('expanded');
      // Collapse all others
      $$('.service-card--expandable').forEach(c => c.classList.remove('expanded'));
      // Toggle this one
      if (!isExpanded) card.classList.add('expanded');
    });
  });

  // ── Nav dropdown (click to open, click outside to close) ─
  $$('.nav__dropdown').forEach(dropdown => {
    dropdown.querySelector('.nav__link').addEventListener('click', e => {
      e.preventDefault();
      const isOpen = dropdown.classList.contains('open');
      $$('.nav__dropdown').forEach(d => d.classList.remove('open'));
      if (!isOpen) dropdown.classList.add('open');
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav__dropdown')) {
      $$('.nav__dropdown').forEach(d => d.classList.remove('open'));
    }
  });

  // ── FAQ accordion ─────────────────────────────────────
  $$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      // close all
      $$('.faq-item').forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        if (a) a.classList.remove('open');
      });
      // toggle
      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  // ── Smooth anchor scroll ──────────────────────────────
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = (nav ? nav.offsetHeight : 72) + 16;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });

  // ── Gallery filters ───────────────────────────────────
  $$('.gallery__filter').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.gallery__filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      $$('.gallery__item').forEach(item => {
        const show = f === 'all' || item.dataset.category === f;
        item.style.opacity = show ? '1' : '0.15';
        item.style.pointerEvents = show ? 'auto' : 'none';
        item.style.transition = 'opacity 0.3s';
      });
    });
  });

})();
