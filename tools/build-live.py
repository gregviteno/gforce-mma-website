#!/usr/bin/env python3
"""Build the public g-forcemma.com site from zen-3.0/ (live since 2026-11-09; zen-v2/ before that).

usage: python3 tools/build-live.py <outdir> [srcdir, default zen-3.0]

Copies the source folder and strips everything that only belongs in the client draft:
draft bar, yellow notes, placeholder captions, empty review boxes, phone lines
with no number, sample class times. "Photo needed" spots become name tiles and
the booking form falls back to email (GF_CONFIG.mailto) until formEndpoint is set.
Fails if any draft note survives. Edit the source folder, never the output.
"""
import re, shutil, sys
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / (sys.argv[2] if len(sys.argv) > 2 else 'zen-3.0')
OUT = Path(sys.argv[1]).resolve()
EMAIL = 'gforcemmafitness@gmail.com'
TILE = {'Adult kickboxing class': 'Kickboxing', 'Adult Brazilian jiu-jitsu class': 'Brazilian Jiu-Jitsu',
        'G-Fit 360 class': 'G-Fit 360', 'Dawn Rizzi': 'DR'}

def sub(s, pat, rep, flags=re.S, need=False):
    s2, n = re.subn(pat, rep, s, flags=flags)
    if need and not n: raise SystemExit(f'pattern not found: {pat[:70]}')
    return s2

def cut_section(s, marker):
    while marker in s:
        i = s.index(marker); a = s.rindex('<section', 0, i); b = s.index('</section>', i) + len('</section>')
        s = s[:a] + s[b:]
    return s

def page(s, name):
    s = sub(s, r'<!-- DRAFT:[^>]*-->', '')
    # Indexing (Greg, 2026-11-09): pages go into search, images stay out of image search until the kids' photo releases are signed.
    if name != 'schedule.html':
        s = s.replace('<meta name="robots" content="noindex,nofollow">', '<meta name="robots" content="index,follow,noimageindex,max-image-preview:none">')
    s = s.replace('href="index.html"', 'href="./"')
    s = sub(s, r'<div class="draftbar" role="note">.*?</div>\s*</div>\n?', '', need=True)
    s = s.replace('formEndpoint: "",', f'formEndpoint: "", mailto: "{EMAIL}",')
    # captions and inline notes
    s = s.replace('<span class="cap"><span class="todo">Placeholder</span></span>', '')
    s = sub(s, r'<p class="lede"><span class="todo only-note">[^<]*</span></p>', '')
    s = sub(s, r' ?<span class="todo only-note">[^<]*</span>', '')
    s = s.replace(' <span class="todo">confirm ages</span>', '')
    s = sub(s, r'<span class="chip"><span class="todo">Ages \?</span></span>', '')
    s = sub(s, r'<details><summary>What should we wear to the first class\?.*?</details>\s*', '')
    # missing photos -> name tiles
    def tile(m):
        label = m.group(2); return f'<div class="photo need{m.group(1)}" role="img" aria-label="{label}"><span class="ph-name" aria-hidden="true">{TILE.get(label, label)}</span></div>'
    s = sub(s, r'<div class="photo need([^"]*)" role="img" aria-label="([^"]*)"><span class="cap"><svg aria-hidden="true"><use href="#i-cam"/></svg><span><span class="todo">[^<]*</span>[^<]*</span></span></div>', tile)
    # no phone number yet
    s = s.replace(f'<br><span class="todo">Phone</span> · {EMAIL}', f'<br><a href="mailto:{EMAIL}">{EMAIL}</a>')
    s = s.replace(' <span class="btn btn-secondary btn-sm" style="pointer-events:none"><span class="todo">Call: phone # needed</span></span>', '')
    s = s.replace('<span><svg aria-hidden="true"><use href="#i-phone"/></svg><span class="todo">Phone # needed</span></span>', '')
    s = s.replace('<span class="cq"><svg aria-hidden="true"><use href="#i-phone"/></svg><span><b>Call or text</b><span class="todo">Phone # needed</span></span></span>', '')
    s = s.replace('<a class="call" href="contact.html" aria-label="Call G-Force (number coming)"><svg aria-hidden="true"><use href="#i-phone"/></svg></a>',
                  f'<a class="call" href="mailto:{EMAIL}" aria-label="Email G-Force"><svg aria-hidden="true"><use href="#i-mail"/></svg></a>')
    s = s.replace('<li><span class="todo">Instagram · Facebook links</span></li>', '')
    # Zen 2.0/3.0 footer: no phone or social links yet
    s = s.replace('<br><span class="todo">Phone</span></p>', '</p>')
    s = s.replace('\n      <div><h4>Follow Us</h4><p><span class="todo">Instagram · Facebook links</span></p></div>', '')
    s = s.replace(' <a href="#">Privacy</a> · <a href="#">Terms</a>', '')
    s = s.replace('<p class="slot-note" id="slot-note" hidden>Sample times until G-Force sends the real schedule.</p>', '<p class="slot-note" id="slot-note" hidden></p>')
    # --- 2026-11-09 (Greg): live site shows only what we have info for. Each item is listed in TODO.md
    # under "Hidden on the live site until we have the info"; the source folder keeps it for the preview.
    # No class schedule yet: drop the schedule links, buttons, sections and hours-table row.
    s = cut_section(s, 'id="times"')
    s = s.replace('<a class="btn btn-secondary" href="#times">Class Times</a>', '')
    s = s.replace('<a class="btn btn-ghost-light" href="schedule.html">See the Schedule</a>', '')
    s = sub(s, r'\s*<tr><th scope="row">Class schedule</th><td><a href="schedule.html">See this week\'s classes</a></td></tr>', '')
    s = sub(s, r'<a href="schedule.html"( aria-current="page")?>Schedule</a>', '')
    s = s.replace('Pick a program and a class time that fits your week. It takes about a minute.', 'Pick a program and leave your details. It takes about a minute.')
    # No texting set up yet: no text-message promises or SMS consent box.
    s = s.replace('<h3>We text you to confirm</h3>', '<h3>We confirm your class</h3>')
    s = s.replace("Pick a program and a class time. We'll text you to confirm and answer any questions.", "Pick a program and we'll get back to you to confirm and answer any questions.")
    s = s.replace("No payment, no commitment. We'll text you to confirm your class.", "No payment, no commitment. We'll get back to you to confirm your class.")
    s = sub(s, r'\s*<label class="consent fld full" for="b-sms">.*?</label>', '')
    # Which coach teaches which class isn't confirmed: no Instructors section (or its pop-ups) on program pages.
    if name not in ('index.html', 'about.html'):
        s = cut_section(s, 'id="who-h"')
        s = sub(s, r'<dialog class="coach-dlg".*?</dialog>\n?', '')
    # sections that only hold placeholders
    s = cut_section(s, 'class="reviews-wrap')
    s = cut_section(s, 'class="z2-light z2-reviews"')
    s = cut_section(s, 'class="starter"')
    if name == 'schedule.html':
        s = s.replace('<p class="lede">Find a class that fits your week. Tap any class to try it free.</p>',
                      f'<p class="lede">We\'re updating the class schedule. Email <a href="mailto:{EMAIL}">{EMAIL}</a> or stop by during front desk hours and we\'ll find a class that fits your week.</p>')
        s = sub(s, r'\s*<div class="sample-note" id="sampleNote".*?</div>', '', need=True)
        s = sub(s, r'<section aria-label="Weekly class schedule".*?</section>\n?', '', need=True)
    return s

if OUT.exists():  # clear the old build but keep the live repo's .git
    for p in OUT.iterdir():
        if p.name == '.git': continue
        shutil.rmtree(p) if p.is_dir() else p.unlink()
shutil.copytree(SRC, OUT, ignore=shutil.ignore_patterns('.DS_Store'), dirs_exist_ok=True)
for f in sorted(OUT.glob('*.html')):
    s = page(f.read_text(), f.name)
    left = re.findall(r'class="todo[^"]*"[^>]*>([^<]*)', s) + re.findall(r'Sample times|draftbar|Placeholder', s)
    if left: raise SystemExit(f'{f.name}: draft content left: {left}')
    f.write_text(s)
sd = OUT / 'schedule-data.js'; t = sd.read_text()
t = t.replace('window.GF_SCHEDULE_IS_SAMPLE = true;', 'window.GF_SCHEDULE_IS_SAMPLE = false;')
t = re.sub(r'window\.GF_SCHEDULE = \[.*?\];', 'window.GF_SCHEDULE = []; /* real times not in yet; see the source folder\'s schedule-data.js */', t, flags=re.S)
sd.write_text(t)
js = OUT / 'site.js'; t = js.read_text()
t = t.replace("'<p>Class times coming soon.</p>'", f"'<p>We\\'re updating class times. Email <a href=\"mailto:{EMAIL}\">{EMAIL}</a> and we\\'ll find a time that fits.</p>'")
js.write_text(t)
css = OUT / 'site.css'; c = css.read_text()
if '.ph-name{' not in c:
    c += '\n/* live build: monogram tile where a photo is still missing (Dawn) */\n.photo.need{background:linear-gradient(160deg,#2C4410 0%,#4B701B 100%)}\n.ph-name{font:400 clamp(72px,9vw,140px)/1 var(--f-display);letter-spacing:.04em;color:rgba(255,255,255,.88);text-align:center;padding:16px}\n.coach>.photo.need{align-items:start;padding-top:22%}\n.foot-cols:has(>div:nth-child(2):last-child){grid-template-columns:repeat(2,auto)}\n@media (max-width:900px){.foot-cols:has(>div:nth-child(2):last-child){grid-template-columns:auto}}\n'
    css.write_text(c)
(OUT / 'schedule.html').write_text('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0; url=contact.html#visit"><link rel="canonical" href="https://g-forcemma.com/contact.html"><title>Class schedule | G-Force MMA &amp; Fitness</title></head><body><p>The class schedule is being updated. <a href="contact.html#visit">See our hours and location</a>.</p></body></html>\n')
bj = OUT / 'booking.js'; t = bj.read_text()
t = t.replace("      lines.push('OK to text me: ' + (data.sms_consent ? 'Yes' : 'No'));\n", '')
bj.write_text(t)
PAGES = ['', 'little-ninjas.html', 'kids-kickboxing.html', 'kids-jiu-jitsu.html', 'girls-wrestling.html', 'kickboxing.html', 'jiu-jitsu.html', 'g-fit-360.html', 'about.html', 'contact.html']
import datetime
today = datetime.date.today().isoformat()
(OUT / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>https://g-forcemma.com/{p}</loc><lastmod>{today}</lastmod></url>\n' for p in PAGES) + '</urlset>\n')
(OUT / 'robots.txt').write_text('# Pages are open to search engines. Image crawlers are blocked until the kids\' photo releases are signed.\nUser-agent: *\nAllow: /\n\nUser-agent: Googlebot-Image\nDisallow: /\n\nUser-agent: msnbot-media\nDisallow: /\n\nSitemap: https://g-forcemma.com/sitemap.xml\n')
(OUT / '404.html').write_text('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | G-Force MMA &amp; Fitness</title><link rel="icon" href="/favicon.ico"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F4F4F1;color:#2A2A2A;font:400 18px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;text-align:center;padding:24px}h1{font:700 clamp(36px,7vw,64px)/1 Impact,Arial Narrow,sans-serif;text-transform:uppercase;color:#111;margin:0 0 16px}a{display:inline-flex;align-items:center;min-height:48px;padding:0 24px;margin:8px;background:#4B701B;color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:.06em;text-decoration:none}a.alt{background:#111}</style></head><body><main><h1>Page not found</h1><p>This page doesn&#39;t exist. Try the homepage or book a free class.</p><p><a href="/">Homepage</a><a class="alt" href="/contact.html#book">Book a free class</a></p></main></body></html>\n')
(OUT / 'CNAME').write_text('g-forcemma.com\n')
print('built', OUT, len(list(OUT.glob('*.html'))), 'pages')
