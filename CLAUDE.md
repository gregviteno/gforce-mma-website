# Working on the G-Force website previews

Read `README.md` for the layout and `TODO.md` for open work before changing anything.

## Rules from Greg (the user)

- **Every content edit goes into all three versions** (`v1/`, `zen-v2/`, `neo-v3/`) so they stay uniform. The markup differs between v1 and zen/neo (e.g. v1's credentials strip is `.proof`, zen/neo's is `.v-cred`; v1's hero badge is `.hero-badge`, zen/neo's is `.stat`), so find the equivalent element in each.
- **No hallucinating.** Only report what was verified: a screenshot, a grep, or a live check. If something wasn't checked, say so.
- **No AI slop in copy:** no eyebrow labels above headings, no punchy two-part headings ("One roof. Every age."), no full stops at the end of headings, no "01/02" numbering on cards, no corny lines ("meet Neil, Dawn and Haley, the family who teaches every class"), no puffery ("Bethpage's best", "world-renowned"). Plain, specific wording. Keep Neil's own facts.
- **Mobile must be immaculate.** Check 360, 390, 430 and 768px wide with the tools below before pushing. No horizontal overflow, 44px tap targets for controls, nothing covering faces in photos.
- Don't invent facts. Neil started training in 1997, so in 2026 that's 29 years; the hero badge says "Nearly 30 years in martial arts" for that reason.

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
- **Landing page:** cards in order v1, v2, v3; only v1 has the "Current" tag; no intro sentence; big green "Open preview" buttons; each opens in a new tab.

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

## Source material (local only, not in this public repo)

In `/Users/greg/Desktop/G-Force MMA & Fitness /`: the intake answers (`_draft.json`, `G-Force MMA & Fitness — Website Intake Summary.docx`), `G-Force — Website Build Notes.docx`, `G-Force Website_ Your Feedback.docx`, and the photo folders `Photos – Classes`, `Photos – Events`, `Team`. Kids' photos stay out of the repo except the optimized ones already used on the site.
