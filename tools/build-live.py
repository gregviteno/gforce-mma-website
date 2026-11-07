#!/usr/bin/env python3
"""Build the public g-forcemma.com site from zen-v2/.

usage: python3 tools/build-live.py <outdir>

Copies zen-v2/ and strips everything that only belongs in the client draft:
draft bar, yellow notes, placeholder captions, empty review boxes, phone lines
with no number, sample class times. "Photo needed" spots become name tiles and
the booking form falls back to email (GF_CONFIG.mailto) until formEndpoint is set.
Fails if any draft note survives. Edit zen-v2/, never the output.
"""
import re, shutil, sys
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / 'zen-v2'
OUT = Path(sys.argv[1]).resolve()
EMAIL = 'gforcemmafitness@gmail.com'
TILE = {'Adult kickboxing class': 'Kickboxing', 'Adult Brazilian jiu-jitsu class': 'Brazilian Jiu-Jitsu',
        'G-Fit 360 class': 'G-Fit 360', 'Dawn Rizzi': 'Dawn Rizzi'}

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
    s = s.replace(' <a href="#">Privacy</a> · <a href="#">Terms</a>', '')
    s = s.replace('<p class="slot-note" id="slot-note" hidden>Sample times until G-Force sends the real schedule.</p>', '<p class="slot-note" id="slot-note" hidden></p>')
    # sections that only hold placeholders
    s = cut_section(s, 'class="reviews-wrap')
    s = cut_section(s, 'class="starter"')
    if name == 'schedule.html':
        s = s.replace('<p class="lede">Find a class that fits your week. Tap any class to try it free.</p>',
                      f'<p class="lede">We\'re updating the class schedule. Email <a href="mailto:{EMAIL}">{EMAIL}</a> or stop by during front desk hours and we\'ll find a class that fits your week.</p>')
        s = sub(s, r'\s*<div class="sample-note" id="sampleNote".*?</div>', '', need=True)
        s = sub(s, r'<section aria-label="Weekly class schedule".*?</section>\n?', '', need=True)
    return s

if OUT.exists(): shutil.rmtree(OUT)
shutil.copytree(SRC, OUT, ignore=shutil.ignore_patterns('.DS_Store'))
for f in sorted(OUT.glob('*.html')):
    s = page(f.read_text(), f.name)
    left = re.findall(r'class="todo[^"]*"[^>]*>([^<]*)', s) + re.findall(r'Sample times|draftbar|Placeholder', s)
    if left: raise SystemExit(f'{f.name}: draft content left: {left}')
    f.write_text(s)
sd = OUT / 'schedule-data.js'; t = sd.read_text()
t = t.replace('window.GF_SCHEDULE_IS_SAMPLE = true;', 'window.GF_SCHEDULE_IS_SAMPLE = false;')
t = re.sub(r'window\.GF_SCHEDULE = \[.*?\];', 'window.GF_SCHEDULE = []; /* real times not in yet; see zen-v2/schedule-data.js */', t, flags=re.S)
sd.write_text(t)
js = OUT / 'site.js'; t = js.read_text()
t = t.replace("'<p>Class times coming soon.</p>'", f"'<p>We\\'re updating class times. Email <a href=\"mailto:{EMAIL}\">{EMAIL}</a> and we\\'ll find a time that fits.</p>'")
js.write_text(t)
(OUT / 'CNAME').write_text('g-forcemma.com\n')
print('built', OUT, len(list(OUT.glob('*.html'))), 'pages')
