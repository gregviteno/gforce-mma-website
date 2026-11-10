/* Zen 3.0 micro-animations, modeled on fenriz-gym.com's GSAP + Webflow interactions (no libraries).
   Every effect is skipped when the visitor prefers reduced motion (html.motion is never set). */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('motion')) return;
  var finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* 1. Headline letter swap (Fenriz animateHeaderHeading): per line, each letter slides in from the
     left while a copy of it slides out to the right; 10 ms between letters, 250 ms between lines. */
  function splitHeadline(h) {
    var text = h.textContent.replace(/\s+/g, ' ').trim();
    h.setAttribute('aria-label', text);
    h.textContent = '';
    var words = [];
    text.split(' ').forEach(function (w, wi) {
      if (wi) h.appendChild(document.createTextNode(' '));
      var word = document.createElement('span'); word.className = 'hw'; word.setAttribute('aria-hidden', 'true');
      Array.from(w).forEach(function (c) {
        var mask = document.createElement('span'); mask.className = 'hm';
        var ch = document.createElement('span'); ch.className = 'hc'; ch.textContent = c;
        var clone = document.createElement('span'); clone.className = 'hk'; clone.textContent = c;
        mask.appendChild(ch); mask.appendChild(clone); word.appendChild(mask);
      });
      h.appendChild(word); words.push(word);
    });
    var lineTop = null, line = -1, idx = 0;
    words.forEach(function (word) {
      var top = word.offsetTop;
      if (lineTop === null || Math.abs(top - lineTop) > 4) { lineTop = top; line++; idx = 0; }
      word.querySelectorAll('.hm').forEach(function (m) {
        var d = line * 0.25 + idx * 0.01; idx++;
        m.style.setProperty('--d', d.toFixed(3) + 's');
      });
    });
    requestAnimationFrame(function () { requestAnimationFrame(function () { h.classList.add('h-go'); }); });
    setTimeout(function () { h.querySelectorAll('.hk').forEach(function (k) { k.remove(); }); h.classList.add('h-done'); }, 3000);
  }
  document.querySelectorAll('.z2-hero h1, .phero h1').forEach(splitHeadline);

  /* 2. Heading bars wipe in when the heading reaches 70% of the viewport (Fenriz animateBrandElements),
     plus the trial-photo ghost trail (Fenriz probetraining_img). */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -30% 0px' });
  document.querySelectorAll('.sec-head h2, .cta-band h2, .book-copy h2, .foot-logo, .trail-fig').forEach(function (el) { io.observe(el); });

  /* 4 + 5. Scroll-scrubbed: content photos rise 25% and untilt 5 deg by the time they reach the middle of
     the screen (Fenriz animateCMSImages); full-width photo breaks zoom from 1.2 to 1 (animateSectionDividers). */
  var drift = Array.from(document.querySelectorAll('.z2-split-photo, .bio-photo'));
  var breaks = Array.from(document.querySelectorAll('.z2-break img'));
  drift.forEach(function (el) {
    var r = el.getBoundingClientRect();
    el.dataset.dir = (r.left + r.width / 2) < innerWidth / 2 ? '-1' : '1';
  });
  var hdr = document.querySelector('.hdr');
  var ticking = false;
  function frame() {
    ticking = false;
    var vh = innerHeight;
    drift.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = (vh - r.top) / (vh / 2 + r.height / 2); p = Math.max(0, Math.min(1, p));
      var k = 1 - p;
      el.style.transform = 'translateY(' + (k * 25).toFixed(2) + '%) rotate(' + (k * 5 * +el.dataset.dir).toFixed(2) + 'deg)';
    });
    breaks.forEach(function (img) {
      var r = img.parentNode.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = (vh - r.top) / (vh + r.height); p = Math.max(0, Math.min(1, p));
      img.style.transform = 'scale(' + (1.2 - 0.2 * p).toFixed(4) + ')';
    });
    /* 6. Header shadow once the page scrolls (Fenriz nav_background). */
    if (hdr) hdr.classList.toggle('is-scrolled', scrollY > 24);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  frame();

  /* 7. Hero photos tilt toward the pointer (Fenriz img-auto mouse move), desktop only. */
  var hero = document.querySelector('.z2-hero'), media = document.querySelector('.z2-hero-media');
  if (hero && media && finePointer) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      media.style.transform = 'perspective(1400px) rotateY(' + (x * 8).toFixed(2) + 'deg) rotateX(' + (-y * 8).toFixed(2) + 'deg) translate(' + (x * 14).toFixed(1) + 'px,' + (y * 14).toFixed(1) + 'px)';
    });
    hero.addEventListener('pointerleave', function () { media.style.transform = ''; });
  }

  /* 8. Menu links rise in one after another when the menu opens. */
  document.querySelectorAll('.nav-col a').forEach(function (a, i) { a.style.setProperty('--i', i); });
})();
