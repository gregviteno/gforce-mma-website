# Working on the G-Force website previews

Read `README.md` for the layout and `TODO.md` for open work before changing anything.

## Rules from Greg (the user)

- **Zen 3.0 (`zen-3.0/`) is the live site since 2026-11-09 (Greg: "implement the final zen 3.0 as the live website"). Edit `zen-3.0/` for anything that should go live.** `zen-v2/` (the earlier live Zen) and `zen-2.0/` are kept as previews only.
- (Earlier rule, kept for history) **Zen was the chosen layout (Greg, 2026-11-04). Edit `zen-v2/` only.** `v1/` and `neo-v3/` are frozen at the 2026-10-21 content and no longer kept in sync, so the older decisions below still describe them but not Zen where the Zen section says otherwise.
- **No hallucinating.** Only report what was verified: a screenshot, a grep, or a live check. If something wasn't checked, say so.
- **No AI slop in copy:** no eyebrow labels above headings, no punchy two-part headings ("One roof. Every age."), no full stops at the end of headings, no "01/02" numbering on cards, no corny lines ("meet Neil, Dawn and Haley, the family who teaches every class"), no puffery ("Bethpage's best", "world-renowned"). Plain, specific wording. Keep Neil's own facts.
- **Mobile must be immaculate.** Check 360, 390, 430 and 768px wide with the tools below before pushing. No horizontal overflow, 44px tap targets for controls, nothing covering faces in photos.
- Don't invent facts. Neil started training in 1997. The 2026-11-04 copy came from G-Force and says "30 years training" and "three decades", and Greg confirmed it's their wording, so Zen uses 30. Treat their copy as final.

## Zen decisions from Greg, 2026-11-04 (these override the older list below)

- **Homepage hero** (`.fam-hero`): family theme. Three background photos (Neil and Dawn doing BJJ, women boxing, kids group), the header tabs, one bold line "Martial Arts and Fitness available for the Whole Family!" and one "Book a Free Class" button to `#book`. No badge, sub-copy or checkmarks. Copy sits low so it never covers a face; re-check this whenever a photo changes. The kids panel is `img/hero-family-kids*` from `Photos – Classes/Kids Sparring.png`. The other two panels are G-Force's own photos from 2026-11-09 (Greg picked them): adult kickboxing group (`img/hero-kickboxing*`, left) and adult BJJ drill (`img/hero-bjj*`, middle, `object-position:74% 70%` so the man on the mat stays out from under the headline on desktop and isn't clipped at 768px).
- **Ticker:** Your First Class is Free · Beginner Friendly / No Experience Necessary · BJJ · Muay Thai / Kickboxing · Wrestling · Pre-school Programs · Self-Defense · Anti-Bullying · Family-owned in Bethpage · 4240 Hicksville Road NY.
- **About page:** only the one-paragraph intro, "Meet the Family" with Greg's bios, and the booking band. The story, virtues and amenities sections were removed on purpose. Bio text is Greg's wording with typos fixed only.
- **Programs and order** (menu, footer, cards, booking form): Kids & teens: Little Ninjas, Kids Kickboxing, Kids Jiu-Jitsu, Girls Wrestling. Adults: Kickboxing, Brazilian Jiu-Jitsu, G-Fit 360. Pages are `little-ninjas.html` and `g-fit-360.html`. G-Fit 360 keeps the Express HIIT description, because the intake files only ever mention Express HIIT and Greg said to use the G-Fit 360 name.
- **No sharp shapes** (the "Soft pass" at the end of `zen-v2/site.css`). Pills for buttons and chips, 10px inputs, 16px photos, 20px panels. Tinted panels instead of outlined boxes, spacing instead of rules, no accent bars, stripes or heavy shadows. Program and instructor cards have no box. The hero is one rounded frame set in from the page edge. Build new components to this scale.

## Zen 2.0 (`zen-2.0/`), started 2026-11-09

Greg asked for a version modeled on https://www.fenriz-gym.com/ ("replicate the Fenriz gym website" but with G-Force's own wording, and better). It copies Fenriz's structure and feel only: black and light-grey sections, Anton uppercase headings with a colour bar behind them (G-Force green gradient instead of Fenriz's yellow-red-blue), full-bleed black-and-white photo breaks with grain, image tiles for programs, a full-screen MENU overlay, square buttons, and a centred footer. No Fenriz text, photos, logo or paid font (Kenyan Coffee) are used. Content is the same as `zen-v2/` (copied 2026-11-09), so content edits made in `zen-v2/` do not reach Zen 2.0 automatically. The live site is still built from `zen-v2/`. `site.css` in `zen-2.0/` is a fresh stylesheet, not the layered zen-v2 one. The "no sharp shapes" Zen rule does not apply here; square corners are part of the Fenriz look.

Zen 2.0 program cards (2026-11-09, Greg: "not too cluttered, a clean concept"): photo tile with a small level line and the title on it, one line of description, one "Program Details →" link. No chips or per-card "Try Free" buttons; one "Book a Free Class" button sits under the section.

Coach cards (Zen 2.0 and 3.0, 2026-11-09, Greg: "mainly a picture, hoverable or clickable for an expanded pop-up"): photo with role and name on it; on desktop hover the three key credentials slide up; click or tap opens a `<dialog>` (`.coach-dlg`, ids `coach-neil|dawn|haley`) holding the full About-page bio for that coach, copied into each page, plus a Book a Free Class button. When a bio changes on `about.html`, re-copy it into the dialogs on the homepage and the 7 program pages.

## Zen 3.0 (`zen-3.0/`), 2026-11-09

Zen 2.0 in light mode, at Greg's request. Same markup as Zen 2.0 (copied after the clean program cards); `zen-3.0/site.css` is Zen 2.0's stylesheet plus a "Zen 3.0 light mode" block at the end that overrides the dark sections. Edits to Zen 2.0 or Zen 3.0 don't reach each other automatically.

## Text checks

`tools/wordcheck.mjs` flags any word the browser splits mid-word (like "gforcemmafitness@gmail.co / m") and clipped text. Run it on every page at 360-1920px before pushing: `node tools/wordcheck.mjs 360,390,430,768,1024,1280,1440,1920 <urls>`. Don't use `overflow-wrap:anywhere`; it lets grid and flex columns shrink below a word's width.

## Decisions already made (don't undo without asking)

- **Hero photo** in all versions: Neil cageside with Anthony and Chris (`img/hero-neil*.{jpg,webp}`), from `Photos – Events/Neil- Fight Pic 3 3 w Anthony & Chris.png` in the local project folder.
- **Hero badge:** bold "Sensei Neil Gonzales", then "Nearly 30 years in&nbsp;martial&nbsp;arts" and "BJJ & Karate black belt". On phones (≤600px) it sits under the photo as a caption, never on top of it.
- **Credentials strip:** credential in bold, detail underneath, e.g. **National champion** / "Coach Haley, 2024 Fargo Nationals (wrestling)". Never Haley's name as the bold line. On phones it stacks one row per credential.
- **Scrolling ticker (zen/neo):** "Your first class is free · Beginner friendly · BJJ & Karate black belt head instructor · Coach Haley, National Wrestling Champion · Parent viewing area · Family-owned in Bethpage · 4240 Hicksville Road". On the homepage it sits below the credentials strip; on inner pages it's above the header. "Ages 3 to adult" was removed on purpose.
- **Removed on purpose:** kanji next to the virtues (and the Noto Serif JP font), the virtues section on the homepage (it stays on About), the "Questions to ask any school" comparison table, "Who's on the mat", all section eyebrows except the program-page breadcrumb line ("Kids & teens · Bethpage, NY").
- **Headings:** "Programs for every age", "What happens at your first class", "What your child learns", "Years of experience", "Meet your instructors", "What families say", "Frequently asked questions", "Location and hours". Program pages: "Benefits", "Instructors".
- **Hero checkmarks** stack vertically, one per line.
- **Zen (v2)** is the calm "washi paper, sumi ink, brand moss #4B701B" design: Shippori Mincho headings, Zen Kaku Gothic New body, self-hosted Latin subsets (`zen-v2/fonts/`), logo wordmark in Rajdhani/Montserrat (brand fonts from the intake). The zen layer is appended at the end of `zen-v2/site.css`.
- **Neo (v3)** is the earlier bold black/volt design. **v1** is the original first draft, now content-synced.
- **Landing page:** cards in order v1, v2, v3; only Zen (v2) has the "Current" tag; no intro sentence; big green "Open preview" buttons; each opens in a new tab.

## Workflow

1. Edit the files in this repo (not the stale local folders outside it).
2. Serve and test locally:
   ```sh
   python3 -m http.server 8765 --bind 127.0.0.1 &        # from the repo root
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
     --hide-scrollbars --remote-debugging-port=9333 --user-data-dir=/tmp/gf-chrome about:blank &
   node tools/qa.mjs <outdir> 390,360,430,768 v1/index.html zen-v2/index.html neo-v3/index.html
   node tools/shot.mjs out.png 390 http://127.0.0.1:8765/neo-v3/ .v-hero-media
   ```
   Plain `chrome --screenshot` can't go below about 500px wide; these scripts use DevTools device emulation (Node 22+, no installs).
3. Commit and push to `main`; confirm the Pages build and re-check the live URL.

## Zen 3.0 motion (2026-11-09)

`zen-3.0/motion.js` plus the "Zen 3.0 motion" block at the end of `zen-3.0/site.css` copy the micro-animations of fenriz-gym.com (taken from its GSAP code and Webflow interaction data): headline letter swap on every page title, heading bars wiping in, hero accent flicker, content photos rising and untilting on scroll, photo breaks zooming out on scroll, black-and-white program tiles that take a green tint with a Learn More button on hover, black-and-white coach cards that turn to color on hover, button fill wipe with gradient border, link underline wipe, hero photo tilt toward the pointer, menu fade with staggered links, header shadow on scroll, logo tilt on hover. The first-class section is black with Haley's portrait shown three times (faint to solid) as Fenriz's trial-training figure trail; `mix-blend-mode:lighten` hides the photo's black background. Nothing animates when the visitor prefers reduced motion (`html.motion` is only set by the inline head script when it isn't requested). Program tiles carry no description (Greg, 2026-11-09: "less text, let the photo and title emphasize").

## Live site shows only what we have info for (Greg, 2026-11-09)

`tools/build-live.py` removes, on the live build only: everything schedule-related (schedule.html becomes a redirect to contact.html), text-message promises and the SMS consent box, the Instructors section on program pages, the Follow Us column, reviews, phone lines, and empty FAQ/notes. Dawn's missing photo becomes a "DR" monogram tile. The full list, and how to bring each item back, is in TODO.md under "Hidden on the live site until we have the info". The map is a real Google Maps embed in `zen-3.0/` itself.

Copy pass (/no-ai-slop, 2026-11-09): G-Force's own text (bios, quote, mission, intake program copy, hero line, ticker, accolades) is final. Build-written lines were edited to drop puffery, filler and invented claims (e.g. "There's no sales pitch at the door", "done right", "kids can actually use", "one stripe at a time"). Keep new copy plain and sourced.

The hero is three separate photo cards under the headline (Greg: "not a collage").

## Publishing the live site (g-forcemma.com)

Soft launch went live 2026-11-07 (built from `zen-v2/`); since 2026-11-09 it is built from `zen-3.0/`. The public site is a separate repo, `gregviteno/gforce-mma-live` (GitHub Pages, custom domain g-forcemma.com, DNS at GoDaddy under Neil's account via delegate access). Never edit that repo by hand; rebuild it from `zen-3.0/` (the script's default source; pass a folder name as the second argument to build another):

```sh
gh repo clone gregviteno/gforce-mma-live /path/to/gforce-mma-live-checkout   # first time only
python3 tools/build-live.py /path/to/gforce-mma-live-checkout   # strips draft bar, yellow notes, sample times, phone lines; writes CNAME; keeps .git
cd /path/to/gforce-mma-live-checkout && git add -A && git commit -m "Update from zen-v2" && git push
```

The build fails if any `todo` note, "Sample times", draft bar or "Placeholder" text survives. Since 2026-11-09 live pages are indexed but images are not (`noimageindex`, image crawlers blocked in robots.txt) until Neil confirms the kids' photo releases (Greg chose "index pages, block images"). Preview folders stay `noindex`. The booking form has no webhook yet, so the live build opens the visitor's email app addressed to gforcemmafitness@gmail.com.

## Source material (local only, not in this public repo)

In `/Users/greg/Desktop/G-Force MMA & Fitness /`: the intake answers (`_draft.json`, `G-Force MMA & Fitness — Website Intake Summary.docx`), `G-Force — Website Build Notes.docx`, `G-Force Website_ Your Feedback.docx`, and the photo folders `Photos – Classes`, `Photos – Events`, `Team`. Kids' photos stay out of the repo except the optimized ones already used on the site.
