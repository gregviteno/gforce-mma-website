const t = await (await fetch('http://127.0.0.1:9333/json/new?about:blank', { method: 'PUT' })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const P = new Map(); ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && P.has(m.id)) { P.get(m.id)(m); P.delete(m.id); } });
const send = (method, params = {}) => new Promise(r => { const i = ++id; P.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Network.enable');
await send('Page.navigate', { url: process.argv[2] }); await new Promise(r => setTimeout(r, 4000));
const { result } = await send('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: `document.fonts.ready.then(()=>[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.weight))` });
console.log(JSON.stringify(result.result.value)); ws.close(); await fetch('http://127.0.0.1:9333/json/close/' + t.id);
