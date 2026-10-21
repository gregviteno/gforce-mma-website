// Mobile QA over Chrome DevTools Protocol (Node built-in WebSocket + fetch).
// usage: node qa.mjs <outdir> <width,width,...> <path> [path...]
// Prints one JSON line per page/width with layout problems; saves a full-page PNG at the first width.
import { writeFileSync } from 'node:fs';

const [, , outdir, widthsArg, ...paths] = process.argv;
const widths = widthsArg.split(',').map(Number);
const BASE = 'http://127.0.0.1:8765/';

const tgt = await (await fetch('http://127.0.0.1:9333/json/new?about:blank', { method: 'PUT' })).json();
const ws = new WebSocket(tgt.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map(); const waiters = [];
ws.addEventListener('message', ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else if (m.method) for (const w of [...waiters]) if (w.method === m.method) { waiters.splice(waiters.indexOf(w), 1); w.res(m.params); }
});
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const once = method => new Promise(res => waiters.push({ method, res }));
const sleep = ms => new Promise(r => setTimeout(r, ms));

await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });

const AUDIT = `(() => {
  const W = document.documentElement.clientWidth, H = innerHeight;
  const d = el => { let s = el.tagName.toLowerCase(); if (el.id) s += '#' + el.id; if (el.classList.length) s += '.' + [...el.classList].slice(0,2).join('.');
    const t = (el.innerText || el.alt || '').trim().replace(/\\s+/g,' ').slice(0,40); return t ? s + ' "' + t + '"' : s; };
  const vis = el => { const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0'; };
  const clipped = el => { for (let p = el.parentElement; p && p !== document.documentElement; p = p.parentElement) {
      const o = getComputedStyle(p).overflowX; if (o !== 'visible') return true; } return false; };
  const r = { W, sw: document.documentElement.scrollWidth, overflow: [], tap: [], text: [], img: [], meta: {} };
  for (const el of document.querySelectorAll('body *')) {
    if (!vis(el)) continue; const b = el.getBoundingClientRect(); if (!b.width || !b.height) continue;
    if ((b.right > W + 1 || b.left < -1) && !clipped(el)) r.overflow.push(d(el) + ' [' + Math.round(b.left) + '→' + Math.round(b.right) + ']');
    if (el.matches('a[href],button,select,input:not([type=radio]):not([type=checkbox]),summary')) {
      const inText = el.matches('a') && el.closest('p,li,td,.a,blockquote,figcaption,.towns') && !el.matches('.btn');
      if (!inText && (b.height < 44 || b.width < 44)) r.tap.push(d(el) + ' ' + Math.round(b.width) + 'x' + Math.round(b.height));
    }
    for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) {
      const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 14) r.text.push(d(el) + ' ' + fs + 'px'); break; }
  }
  const dpr = devicePixelRatio;
  for (const im of document.images) { if (!vis(im)) continue; const b = im.getBoundingClientRect(); if (!b.width) continue;
    const need = b.width * dpr, have = im.naturalWidth;
    if (!im.complete || !have) r.img.push('NOT LOADED ' + (im.currentSrc || im.src).split('/').slice(-1)[0]);
    else if (have < need * 0.75) r.img.push('SOFT ' + im.currentSrc.split('/').slice(-1)[0] + ' ' + have + 'px for ' + Math.round(need) + 'px');
  }
  const vp = document.querySelector('meta[name=viewport]'); r.meta.viewport = vp ? vp.content : 'MISSING';
  r.meta.title = document.title;
  const m = document.querySelector('.mcta'); if (m && vis(m)) { const mh = m.getBoundingClientRect().height;
    const pb = parseFloat(getComputedStyle(document.body).paddingBottom) + parseFloat(getComputedStyle(document.querySelector('footer,.foot') || document.body).paddingBottom || 0);
    r.meta.mcta = Math.round(mh) + 'px bar, body pad ' + getComputedStyle(document.body).paddingBottom; }
  const res = performance.getEntriesByType('resource'); const nav = performance.getEntriesByType('navigation')[0];
  r.meta.kb = Math.round((res.reduce((a, e) => a + (e.encodedBodySize || 0), 0) + (nav ? nav.encodedBodySize : 0)) / 1024);
  r.meta.imgkb = Math.round(res.filter(e => e.initiatorType === 'img' || /\\.(webp|jpe?g|png)$/.test(e.name)).reduce((a, e) => a + (e.encodedBodySize || 0), 0) / 1024);
  return r;
})()`;

for (const p of paths) {
  for (const [wi, w] of widths.entries()) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 844, deviceScaleFactor: 3, mobile: true });
    await send('Emulation.setTouchEmulationEnabled', { enabled: true });
    const loaded = once('Page.loadEventFired');
    await send('Page.navigate', { url: BASE + p });
    await loaded;
    // scroll through so lazy images load, then back to top
    await send('Runtime.evaluate', { expression: `(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)})()`, awaitPromise: true });
    await sleep(500);
    const { result } = await send('Runtime.evaluate', { expression: AUDIT, returnByValue: true });
    const r = result.result.value;
    console.log(JSON.stringify({ page: p, w, ...r }));
    if (wi === 0) {
      const { result: m } = await send('Page.getLayoutMetrics');
      const h = Math.min(Math.ceil(m.cssContentSize.height), 16000);
      await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: true });
      await sleep(400);
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      writeFileSync(`${outdir}/${p.replace(/\//g, '_') || 'landing'}-${w}.png`, Buffer.from(shot.result.data, 'base64'));
    }
  }
}
ws.close();
await fetch(`http://127.0.0.1:9333/json/close/${tgt.id}`);
