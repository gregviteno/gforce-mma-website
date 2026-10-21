# Bring all three preview versions to the same content. Run from the repo root.
import glob, re, sys, shutil

LOG = []
def edit(path, pairs, required=True):
    s = open(path, encoding='utf-8').read(); o = s
    for a, b in pairs:
        c = s.count(a)
        if c == 0:
            if required: LOG.append(f'MISSING  {path}: {a[:70]!r}')
            continue
        s = s.replace(a, b)
    if s != o: open(path, 'w', encoding='utf-8').write(s)
def sub(path, pattern, repl, flags=0, expect=None):
    s = open(path, encoding='utf-8').read()
    s2, n = re.subn(pattern, repl, s, flags=flags)
    if expect is not None and n != expect: LOG.append(f'COUNT {n}!={expect} {path}: {pattern[:60]}')
    if s2 != s: open(path, 'w', encoding='utf-8').write(s2)
    return n

ALL = {v: sorted(glob.glob(f'{v}/*.html')) for v in ('v1', 'zen-v2', 'neo-v3')}

# ---------- 1. hero badge: lead with Neil (all versions) ----------
for v in ('zen-v2', 'neo-v3'):
    edit(f'{v}/index.html', [('<figcaption class="stat"><b>29 years training</b><span>Sensei Neil Gonzales · BJJ &amp; Karate black belt</span></figcaption>',
        '<figcaption class="stat"><b>Sensei Neil Gonzales</b><span>Nearly 30 years in martial arts</span><span>BJJ &amp; Karate black belt</span></figcaption>')])
edit('v1/index.html', [('<p><b>BJJ &amp; Karate Black Belt</b>Head instructor, 29 years training</p>',
    '<p><b>Sensei Neil Gonzales</b>Nearly 30 years in martial arts<br>BJJ &amp; Karate black belt</p>')])

# ---------- 2. Haley credential: credential bold, name underneath ----------
for v in ('zen-v2', 'neo-v3'):
    edit(f'{v}/index.html', [('<li><b>Haley Gonzales</b><span>2024 National Wrestling Champion (Fargo)</span></li>',
        '<li><b>National champion</b><span>Coach Haley, 2024 Fargo Nationals (wrestling)</span></li>')])
edit('v1/index.html', [('<li><b>National champ</b><span>Haley: 2024 Fargo National Champion, 2× NY State</span></li>',
    '<li><b>National champion</b><span>Coach Haley, 2024 Fargo Nationals (wrestling)</span></li>')])

# ---------- 3. Version 1 catch-up ----------
V1 = ALL['v1']
COPY = [
 ("G-Force MMA &amp; Fitness was founded with a simple vision: a place where people of all ages can grow stronger, build confidence, and develop character through martial arts.",
  "Neil, Dawn and their daughters started G-Force MMA &amp; Fitness as a place where people of all ages can grow stronger, build confidence and develop character through martial arts."),
 ("We believe martial arts teaches far more than fighting. It builds confidence, helps you overcome challenges, creates friendships, and teaches lessons that carry far beyond the gym.",
  "We believe martial arts teaches more than fighting. It builds confidence, helps you overcome challenges and creates friendships, and its lessons carry well beyond the gym."),
 ("We want the lessons learned on the mats to carry into everyday life, helping children grow into confident, respectful adults and helping every student become their best.",
  "We want what kids learn on the mats to help them grow into confident, respectful adults, and we want every student to become their best."),
 ("With nearly three decades of martial arts experience and over 25 years of teaching, Sensei Neil Gonzales has dedicated his life to training, competing, and helping students become the best versions of themselves.",
  "Sensei Neil Gonzales has nearly three decades of martial arts experience and more than 25 years of teaching. He has built his life around training, competing and coaching students."),
 ("Neil began his martial arts journey in 1997, earning his first-degree black belt", "Neil started training in 1997 and earned his first-degree black belt"),
 ("In 2013, Neil expanded his training into traditional Gi Brazilian Jiu-Jitsu under Alexandre \"Soca\" Freitas, earning his brown belt in 2017. In 2019 he earned his Brazilian Jiu-Jitsu black belt under world-renowned BJJ champion Roberto \"Cyborg\" Abreu.",
  "In 2013, Neil started training traditional Gi Brazilian Jiu-Jitsu under Alexandre \"Soca\" Freitas and earned his brown belt in 2017. In 2019 he earned his Brazilian Jiu-Jitsu black belt under BJJ champion Roberto \"Cyborg\" Abreu."),
 ("Neil has competed across numerous combat sports, including Karate, Gi and No-Gi Brazilian Jiu-Jitsu, USA Boxing (Golden Gloves), Kickboxing, and MMA. Since he started teaching in 2001, he has believed martial arts training helps students develop confidence, discipline, respect, perseverance, and the determination to overcome challenges on and off the mats.",
  "Neil has competed in Karate, Gi and No-Gi Brazilian Jiu-Jitsu, USA Boxing (Golden Gloves), Kickboxing and MMA. He has taught since 2001, and he believes martial arts training builds confidence, discipline, respect and perseverance, on and off the mats."),
 ("Today, together with his wife, Dawn, and their two daughters, Neil is building G-Force MMA &amp; Fitness in Bethpage: a family-owned school where children, teens, and adults can train, challenge themselves, build lasting friendships, and reach their goals.",
  "Today Neil runs G-Force MMA &amp; Fitness in Bethpage with his wife, Dawn, and their two daughters. It's a family-owned school where kids, teens and adults train, challenge themselves, build lasting friendships and reach their goals."),
 ("Dawn Rizzi began her martial arts journey in 2002 at Tiger Schulmann's MMA, where she earned her black belt. She competed in numerous MMA and grappling tournaments along the way.",
  "Dawn Rizzi started training in 2002 at Tiger Schulmann's MMA, where she earned her black belt and competed in MMA and grappling tournaments."),
 ("In 2003, Dawn found her passion for teaching when she began instructing preschool martial arts classes. With over 20 years of teaching experience, she teaches both children's and adults' classes, bringing enthusiasm, patience, and a genuine love for teaching to every class.",
  "In 2003 she started teaching preschool martial arts classes and found she loved it. Twenty-plus years later, she teaches both kids' and adult classes."),
 ("Her greatest passion is working with children. Through positive encouragement, structure, and engaging instruction, Dawn helps young students develop confidence, focus, discipline, and respect. For Dawn, one of the greatest rewards of teaching is watching a child grow in confidence and discover what they're capable of.",
  "Working with kids is still her favorite part. Dawn uses encouragement and structure to help young students build focus, discipline and respect, and she loves watching a child grow in confidence and discover what they're capable of."),
 ("Haley Gonzales began her martial arts journey at five years old and competed in numerous Brazilian Jiu-Jitsu tournaments as a kid, winning most of them.",
  "Haley Gonzales started training at five years old and competed in Brazilian Jiu-Jitsu tournaments as a kid, winning most of them."),
 ("She went on to become a highly accomplished wrestler: 2024 Fargo National Champion, 2-time Nassau County Champion (2025 &amp; 2026), 2-time New York State Champion (2025 &amp; 2026), and a full college wrestling scholarship recipient.",
  "In wrestling, she became a 2024 Fargo National Champion, 2-time Nassau County Champion (2025 &amp; 2026), and 2-time New York State Champion (2025 &amp; 2026). She also earned a full college wrestling scholarship."),
 ("When home from college, she assists with wrestling instruction and teaches children's classes at G-Force. Through G-Force and Crash Girls Wrestling, she hopes to inspire the next generation of athletes, especially young girls, to believe in themselves and work hard for their goals.",
  "When she's home from college, she helps coach wrestling and teaches kids' classes at G-Force. Through G-Force and Crash Girls Wrestling, she hopes to help young athletes, especially girls, believe in themselves and work hard for their goals."),
 ("Our Little Warriors program introduces children, ages 3–5, to martial arts in a fun, safe, and encouraging environment. Through age-appropriate instruction, students will learn martial arts basics, balance, coordination, focus and teamwork.",
  "Little Warriors introduces kids ages 3–5 to martial arts in a fun, safe, encouraging class. They learn the basics, plus balance, coordination, focus and teamwork, all taught at their age level."),
 ("Engaging activities that make learning enjoyable.", "Games and drills that keep learning fun."),
 ("Our Kids BJJ program helps students build confidence, discipline, respect, and self-defense skills through structured, supportive instruction. Children learn technique, positioning, movement, escapes, and age-appropriate grappling skills while developing resilience and teamwork.",
  "In Kids Jiu-Jitsu, children learn technique, positioning, movement, escapes and age-appropriate grappling. Structured, supportive classes build confidence, discipline, respect, resilience and teamwork."),
 ("Competition training for kids who choose it.", "Training for kids who choose to compete. It's never required."),
 ("Our Kids Kickboxing program combines martial arts instruction with fitness, focus, and confidence-building in a safe, encouraging environment. Students learn punches, kicks, combinations, stances, footwork, and defensive skills while improving conditioning, coordination, and discipline.",
  "Kids Kickboxing mixes martial arts with fitness in a safe, encouraging class. Students learn punches, kicks, combinations, stances, footwork and defense, and they build conditioning, coordination and discipline along the way."),
 ("Dedicated girls&#x27; wrestling program run by Crash Girls Wrestling for middle school and high school athletes. In a positive, challenging environment, athletes develop wrestling fundamentals, technique, strength, confidence, and competitive discipline. The program welcomes athletes at different stages of their wrestling journey.",
  "Crash Girls Wrestling runs this girls-only program at G-Force for middle and high school athletes. Wrestlers build fundamentals, technique, strength, confidence and competitive discipline. First-timers and experienced wrestlers are both welcome."),
 ("Our Adult BJJ program welcomes newcomers and experienced practitioners who want to learn effective grappling, improve fitness, and challenge themselves. Brazilian Jiu-Jitsu emphasizes leverage, positioning, control, escapes, and submissions rather than strength alone. Whether your goal is fitness, self-defense, or competition, you can progress at your own pace.",
  "Adult BJJ is for first-timers and experienced grapplers who want to learn effective grappling, get fitter and challenge themselves. Brazilian Jiu-Jitsu relies on leverage, positioning, control, escapes and submissions, not strength alone. Train for fitness, self-defense or competition, and progress at your own pace."),
 ("Adult Kickboxing combines practical striking instruction with a high-energy, full-body workout. Students learn punches, kicks, combinations, footwork, and defense while improving stamina, coordination, and confidence. Whether you want to learn kickboxing, improve fitness, or sharpen your skills, our instructors help you train toward your goals.",
  "Adult Kickboxing teaches practical striking in a high-energy, full-body workout. You'll learn punches, kicks, combinations, footwork and defense while building stamina, coordination and confidence. Come to learn kickboxing, get in shape or sharpen skills you already have."),
 ("An energizing outlet for busy adults.", "A hard workout to burn off a long day."),
 ("EXPRESS HIIT delivers an energizing 45-minute full-body workout combining strength, cardio, and functional movement. Alternating exercise intervals and recovery periods help participants work toward improved stamina, strength, and conditioning. No martial arts experience is necessary. Come ready to move and work at your own pace.",
  "Express HIIT is a 45-minute full-body workout that mixes strength, cardio and functional movement. You alternate work intervals with recovery to build stamina, strength and conditioning. No martial arts experience needed. Come ready to move and work at your own pace."),
 ("Efficient training for busy schedules.", "In and out in 45 minutes."),
 ("Modifications for a range of fitness levels.", "Modifications for any fitness level."),
 ("<span>2024 Fargo National Champion</span>", "<span>2024 Fargo National Wrestling Champion</span>"),
 ('>What you build</h2>', '>Benefits</h2>'),
 ('>Who teaches it</h2>', '>Instructors</h2>'),
]
used = set()
for f in V1:
    s = open(f, encoding='utf-8').read()
    for i, (a, b) in enumerate(COPY):
        if a in s: s = s.replace(a, b); used.add(i)
    # Japanese font + kanji + its draft note
    s = re.sub(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/css2\?family=Noto\+Serif\+JP[^"]*">\n?', '', s)
    s = re.sub(r'<span class="k" lang="ja">[^<]*</span>', '', s)
    s = re.sub(r' ?<span class="todo only-note">Kanji added by us, confirm OK</span>', '', s)
    # section labels (keep the program-page breadcrumb line)
    s = re.sub(r'<p class="eyebrow">(?:<span class="belt"[^>]*><span class="tip">(?:<i></i>)*</span></span>)?([^<]*)</p>\s*',
               lambda m: m.group(0) if 'Bethpage, NY' in m.group(1) else '', s)
    open(f, 'w', encoding='utf-8').write(s)
for i, (a, b) in enumerate(COPY):
    if i not in used: LOG.append(f'COPY NOT FOUND in v1: {a[:70]!r}')

edit('v1/index.html', [
 ('<h2 id="programs-h">A class for every age</h2>', '<h2 id="programs-h">Programs for every age</h2>'),
 ('<h2 id="parents-h">What your child builds here</h2>', '<h2 id="parents-h">What your child learns</h2>'),
 ('<h2 id="family-h">Family-owned and family-taught</h2>', '<h2 id="family-h">Meet your instructors</h2>'),
 ('<h2 id="steps-h">How your free class works</h2>', '<h2 id="steps-h">What happens at your first class</h2>'),
 ('<h2 id="faq-h">Parents usually ask</h2>', '<h2 id="faq-h">Frequently asked questions</h2>'),
 ('<h2 id="visit-h">Right on Hicksville Road in Bethpage</h2>', '<h2 id="visit-h">Location and hours</h2>'),
 ("Don't see yours? Ask us at your free class, or send a message below.", "Have another question? Ask us at your free class or send a message below."),
 ('started it with one goal: a welcoming place where', 'started it as a welcoming place where'),
 ('<li><b>29 years</b><span>Sensei Neil on the mats, teaching since 2001</span></li>', '<li><b>29 years</b><span>Sensei Neil, training since 1997 and teaching since 2001</span></li>'),
 ('<li><span class="ic"><svg aria-hidden="true"><use href="#i-child"/></svg></span>Ages 3 to adult</li>', '<li><span class="ic"><svg aria-hidden="true"><use href="#i-check"/></svg></span>Beginner friendly</li>'),
 # hero: Sensei Neil's photo, same as versions 2 and 3
 ('<div class="photo main has-img"><img src="img/hero-kids-bjj.jpg" alt="Haley Gonzales teaching two kids in gis in front of the G-Force sign in Bethpage" style="object-position:center 8%" fetchpriority="high" decoding="async"></div>',
  '<div class="photo main has-img"><picture><source type="image/webp" srcset="img/hero-neil-480.webp 480w, img/hero-neil.webp 1000w" sizes="(max-width: 900px) 100vw, 45vw"><img src="img/hero-neil.jpg" alt="Sensei Neil Gonzales, owner and head instructor, smiling cageside in fight gloves with Anthony and Chris" style="object-position:center 20%" fetchpriority="high" decoding="async" width="1000" height="1331"></picture></div>'),
])
sub('v1/index.html', r'\n?\s*<section class="virtues" aria-labelledby="virtues-h">.*?</section>\n?', '\n', flags=re.S, expect=1)
edit('v1/about.html', [('<h2 id="virtues-h">Seven virtues in every class</h2>', '<h2 id="virtues-h">The seven virtues we teach</h2>')])
for img in ('hero-neil.jpg', 'hero-neil.webp', 'hero-neil-480.webp'):
    shutil.copy(f'zen-v2/img/{img}', f'v1/img/{img}')

# ---------- 4. Zen: self-hosted Latin fonts instead of the 174KB Google CSS ----------
for f in ALL['zen-v2']:
    edit(f, [('family=Shippori+Mincho:wght@500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Rajdhani:wght@700&family=Montserrat:wght@600&display=swap',
              'family=Rajdhani:wght@700&family=Montserrat:wght@600&display=swap'),
             ('<link rel="stylesheet" href="site.css">',
              '<link rel="preload" href="fonts/zen-kaku-gothic-new-400-latin.woff2" as="font" type="font/woff2" crossorigin>\n'
              '<link rel="preload" href="fonts/shippori-mincho-600-latin.woff2" as="font" type="font/woff2" crossorigin>\n'
              '<link rel="stylesheet" href="fonts.css">\n<link rel="stylesheet" href="site.css">')])

# ---------- 5. tap targets (all versions) ----------
TAP = '''
/* touch targets: 44px minimum for controls outside running text */
.draftbar button,.draftbar .fb-link{min-height:44px;display:inline-flex;align-items:center}
.crumbs a{display:inline-flex;align-items:center;min-height:44px}
.book-contact a{min-height:44px}
.more,.card .more,.inst .more,.more-link{display:inline-flex;align-items:center;min-height:44px}
.btn-sm{min-height:44px}
'''
for v in ALL:
    css = open(f'{v}/site.css', encoding='utf-8').read()
    if '/* touch targets' not in css: open(f'{v}/site.css', 'a', encoding='utf-8').write(TAP)

print('\n'.join(LOG) or 'all edits applied')
