(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- theme toggle ---------- */
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* follow the OS only while the visitor hasn't chosen for themselves */
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  /* ---------- current year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- scroll reveal ---------- */
  var targets = document.querySelectorAll('.card, .bg-col, .tl-item, .contact');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      /* small stagger within a row, capped so nothing lags noticeably */
      el.style.transitionDelay = (i % 3) * 60 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- nav: highlight the section in view ---------- */
  var navItems = Array.prototype.slice.call(document.querySelectorAll('.pill-nav-item'));
  var sections = navItems
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function syncNav() {
    var pos = window.scrollY + window.innerHeight * 0.3;
    var activeIndex = 0;
    sections.forEach(function (sec, i) {
      if (sec.offsetTop <= pos) activeIndex = i;
    });
    navItems.forEach(function (a, i) {
      a.classList.toggle('is-active', i === activeIndex);
    });
  }

  if (sections.length) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { syncNav(); ticking = false; });
    }, { passive: true });
    syncNav();
  }
})();
