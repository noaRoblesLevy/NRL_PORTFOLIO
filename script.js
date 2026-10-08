// Theme toggle: remembers the visitor's choice, otherwise follows the system.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  btn.addEventListener('click', function () {
    var current = root.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Project filters: a card matches when its data-tags contains the chosen tag.
(function () {
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('#projects .card');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.dataset.filter;
      chips.forEach(function (c) { c.classList.toggle('active', c === chip); });
      cards.forEach(function (card) {
        var tags = (card.dataset.tags || '').split(' ');
        card.classList.toggle('hidden', filter !== 'all' && tags.indexOf(filter) === -1);
      });
    });
  });
})();

// Fade sections in as they scroll into view.
(function () {
  var targets = document.querySelectorAll('.section .wrap, .stats');
  if (!('IntersectionObserver' in window)) return;
  targets.forEach(function (el) { el.classList.add('reveal'); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  targets.forEach(function (el) { io.observe(el); });
})();

document.getElementById('year').textContent = new Date().getFullYear();
