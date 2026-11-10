// usage: node tools/wordcheck.mjs <widths comma list> <url> [url...]
// Flags any word that the browser splits across two lines somewhere other than after a hyphen or slash,
// and any element whose text is clipped or overflows its box horizontally. Needs the headless Chrome on :9333.
const [, , widths, ...urls] = process.argv;
const W = widths.split(',').map(Number);
const t = await (await fetch('http://127.0.0.1:9333/json/new?about:blank', { method: 'PUT' })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const P = new Map(); ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && P.has(m.id)) { P.get(m.id)(m); P.delete(m.id); } });
const send = (method, params = {}) => new Promise(r => { const i = ++id; P.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });
const probe = `(() => {
  // open every FAQ and the menu-free page state so hidden text is measured too
  document.querySelectorAll('details').forEach(d => d.open = true);
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const r = document.createRange();
  let n;
  while ((n = walker.nextNode())) {
    const el = n.parentElement; if (!el) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('[hidden],.nav,.tick,script,style,svg,.sr')) continue;
    const txt = n.textContent; const re = /\\S+/g; let m;
    while ((m = re.exec(txt))) {
      const w = m[0]; if (w.length < 2) continue;
      let prevTop = null;
      for (let i = 0; i < w.length; i++) {
        r.setStart(n, m.index + i); r.setEnd(n, m.index + i + 1);
        const rc = r.getClientRects(); if (!rc.length) continue;
        const top = Math.round(rc[0].top);
        if (prevTop !== null && Math.abs(top - prevTop) > 4) {
          const before = w[i - 1];
          if (!'-/–—·'.includes(before)) out.push('BROKEN WORD "' + w + '" in <' + el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : '') + '>');
          break;
        }
        prevTop = top;
      }
    }
  }
  document.querySelectorAll('body *').forEach(el => {
    if (el.closest('.tick,.nav,[hidden],svg,picture,.map,.sr')) return;
    const cs = getComputedStyle(el); if (cs.display === 'none') return;
    if (el.scrollWidth > el.clientWidth + 2 && (cs.overflowX === 'hidden' || cs.overflowX === 'clip') && el.textContent.trim() && !el.querySelector('img') && !el.closest('.tile,.photo'))
      out.push('CLIPPED TEXT in <' + el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0] + '> "' + el.textContent.trim().slice(0, 40) + '"');
  });
  return [...new Set(out)];
})()`;
let total = 0;
for (const url of urls) for (const w of W) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 900 });
  await send('Page.navigate', { url }); await new Promise(r => setTimeout(r, 1200));
  await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true });
  const { result } = await send('Runtime.evaluate', { returnByValue: true, expression: probe });
  const res = result.result.value || [];
  total += res.length;
  if (res.length) console.log(url.replace(/^.*?\/\/[^/]+\//, ''), w + 'px', '\n  ' + res.join('\n  '));
}
console.log('problems:', total);
ws.close(); await fetch('http://127.0.0.1:9333/json/close/' + t.id);
