// usage: node shot.mjs <out.png> <width> <url> <selector|"top"> [pad]
import { writeFileSync } from 'node:fs';
const [, , out, w, url, sel, pad = '24'] = process.argv;
const t = await (await fetch('http://127.0.0.1:9333/json/new?about:blank', { method: 'PUT' })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const P = new Map(); ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && P.has(m.id)) { P.get(m.id)(m); P.delete(m.id); } });
const send = (method, params = {}) => new Promise(r => { const i = ++id; P.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Network.enable');
await send('Emulation.setDeviceMetricsOverride', { width: +w, height: 844, deviceScaleFactor: 2, mobile: +w < 900 });
await send('Page.navigate', { url }); await new Promise(r => setTimeout(r, 2500));
let clip;
if (sel === 'top') clip = { x: 0, y: 0, width: +w, height: 844, scale: 1 };
else {
  const { result } = await send('Runtime.evaluate', { returnByValue: true, expression: `(()=>{const e=document.querySelector(${JSON.stringify(sel)});e.scrollIntoView({block:'center'});const b=e.getBoundingClientRect();return {x:0,y:Math.max(0,b.top+scrollY-${pad}),width:innerWidth,height:b.height+${pad}*2}})()` });
  await new Promise(r => setTimeout(r, 800)); clip = { ...result.result.value, scale: 1 };
}
const s = await send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true });
writeFileSync(out, Buffer.from(s.result.data, 'base64')); ws.close(); await fetch('http://127.0.0.1:9333/json/close/' + t.id);
