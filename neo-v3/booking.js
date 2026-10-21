/* G-Force v3: free-class booking form, class-time picker, lead tracking.
   Settings live in window.GF_CONFIG (set in each page's <head>):
     formEndpoint  POST URL for leads (GoHighLevel inbound webhook). Empty = draft mode.
     ga4 / metaPixel  analytics IDs. Empty = nothing loads.
   Events pushed to window.dataLayer: book_cta_click, click_to_call, generate_lead. */
(function () {
  var CFG = window.GF_CONFIG || {}, DL = window.dataLayer = window.dataLayer || [];
  function track(name, data) {
    var e = { event: name }; for (var k in data || {}) e[k] = data[k]; DL.push(e);
    if (window.gtag) window.gtag('event', name, data || {});
    if (window.fbq && name === 'generate_lead') window.fbq('track', 'Lead');
  }

  /* Analytics loaders (only when IDs are filled in) */
  if (CFG.ga4) {
    var g = document.createElement('script'); g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + CFG.ga4; document.head.appendChild(g);
    window.gtag = function () { DL.push(arguments); }; window.gtag('js', new Date()); window.gtag('config', CFG.ga4);
  }
  if (CFG.metaPixel) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CFG.metaPixel); window.fbq('track', 'PageView');
  }

  /* Keep ad/source info for the lead (UTMs, gclid, fbclid) for the whole visit */
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
  var qs = new URLSearchParams(location.search), src = {};
  try { src = JSON.parse(sessionStorage.getItem('gf_src') || '{}'); } catch (e) {}
  KEYS.forEach(function (k) { if (qs.get(k)) src[k] = qs.get(k); });
  if (!src.landing_page) src.landing_page = location.pathname;
  if (!src.referrer && document.referrer) src.referrer = document.referrer;
  try { sessionStorage.setItem('gf_src', JSON.stringify(src)); } catch (e) {}

  /* Click tracking */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a'); if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) track('click_to_call', { location: a.className || 'link' });
    else if (/#book$/.test(href)) {
      track('book_cta_click', { label: a.textContent.trim().slice(0, 40) });
      var form = document.getElementById('book-form');
      if (form && href.charAt(0) === '#') {
        if (a.dataset.program) setProgram(a.dataset.program);
        if (a.dataset.who) { var r = form.querySelector('input[name="who"][value="' + a.dataset.who + '"]'); if (r) { r.checked = true; whoChanged(); } }
      }
    }
  });

  var f = document.getElementById('book-form'); if (!f) return;
  var sel = document.getElementById('b-prog'), slotWrap = document.getElementById('slot-wrap'), slots = document.getElementById('slots'),
      note = document.getElementById('slot-note'), ageWrap = document.getElementById('b-age-wrap'), msg = document.getElementById('book-msg');
  var S = window.GF_SCHEDULE || [], DAYS = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' }, ORDER = Object.keys(DAYS);
  function mins(t) { var m = /(\d+):(\d+)\s*(AM|PM)/i.exec(t || ''); if (!m) return 0; var h = +m[1] % 12; if (/pm/i.test(m[3])) h += 12; return h * 60 + (+m[2]); }

  function renderSlots() {
    var id = sel.value; slots.innerHTML = '';
    if (!id) { slotWrap.hidden = true; return; }
    var list = S.filter(function (c) { return c.program === id; })
      .sort(function (a, b) { return ORDER.indexOf(a.day) - ORDER.indexOf(b.day) || mins(a.start) - mins(b.start); });
    var html = list.map(function (c, i) {
      var v = DAYS[c.day] + ' ' + c.start + (c.note ? ' (' + c.note + ')' : '');
      return '<label class="slot"><input type="radio" name="slot" value="' + v + '"' + '><span><b>' + DAYS[c.day] + '</b>' + c.start + (c.end ? ' – ' + c.end : '') + (c.note ? ' · ' + c.note : '') + '</span></label>';
    }).join('');
    html += '<label class="slot other"><input type="radio" name="slot" value="Text me other times"><span><b>None of these work</b>Text me other times</span></label>';
    slots.innerHTML = html;
    note.hidden = !window.GF_SCHEDULE_IS_SAMPLE;
    slotWrap.hidden = false;
  }
  function setProgram(id) { if (window.GF_PROGRAMS && GF_PROGRAMS[id]) { sel.value = id; renderSlots(); } }
  function whoChanged() { var w = f.querySelector('input[name="who"]:checked'); ageWrap.hidden = !w || w.value === 'me'; }

  sel.addEventListener('change', renderSlots);
  f.addEventListener('change', function (e) { if (e.target.name === 'who') whoChanged(); });
  var q = qs.get('program'); if (q) setProgram(q);

  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var miss = ['b-name', 'b-phone'].filter(function (id) { return !document.getElementById(id).value.trim(); });
    var phone = document.getElementById('b-phone').value.replace(/\D/g, '');
    msg.hidden = false; msg.className = 'form-msg';
    if (miss.length) { msg.textContent = 'Please add your name and mobile number.'; msg.classList.add('err'); document.getElementById(miss[0]).focus(); return; }
    if (phone.length < 10) { msg.textContent = 'Please check your mobile number (10 digits).'; msg.classList.add('err'); document.getElementById('b-phone').focus(); return; }
    var data = {}; new FormData(f).forEach(function (v, k) { data[k] = v; });
    data.program_name = (window.GF_PROGRAMS && GF_PROGRAMS[data.program]) ? GF_PROGRAMS[data.program].name : 'Not sure';
    for (var k in src) data[k] = src[k];
    data.page = location.href; data.submitted_at = new Date().toISOString();
    var btn = f.querySelector('button[type="submit"]');
    function done() {
      track('generate_lead', { program: data.program || 'not_sure', who: data.who || '' });
      msg.textContent = CFG.formEndpoint
        ? "You're booked in. We'll text you shortly to confirm" + (data.slot && data.slot !== 'Text me other times' ? ' ' + data.slot + '.' : ' a class time.')
        : 'Draft only: on the live site this books your free class' + (data.slot ? ' (' + data.slot + ')' : '') + ' and sends you a text.';
      if (CFG.formEndpoint) f.reset();
    }
    if (!CFG.formEndpoint) { done(); return; }
    btn.disabled = true; btn.textContent = 'Booking…';
    fetch(CFG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
      .catch(function () { msg.textContent = 'Something went wrong. Please call or text us and we will book you in.'; msg.classList.add('err'); })
      .then(function () { btn.disabled = false; btn.textContent = 'Book My Free Class'; });
  });
})();
