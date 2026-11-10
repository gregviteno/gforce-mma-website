# G-Force website: open items

## Resume here (updated 2026-11-09)

**Where things stand**
- **Live:** https://g-forcemma.com is built from `zen-3.0/` (Fenriz-style light layout with micro-animations). Pages are open to Google; images are blocked from image search until the kids' photo releases are signed.
- **Previews:** https://gregviteno.github.io/gforce-mma-website/compare/ (Zen, Zen 2.0, Zen 3.0). The preview shows yellow notes where info is missing; the live site hides those spots.
- **To publish:** edit `zen-3.0/`, run the checks (`tools/qa.mjs`, `tools/wordcheck.mjs`), push, then rebuild the live repo with `python3 tools/build-live.py <live-checkout>` and push it. Details in `CLAUDE.md` under "Publishing the live site".

**1. Waiting on G-Force (Neil / Dawn).** Each item is hidden on the live site until it arrives.
- [ ] Phone number.
- [ ] Class schedule (a photo of the board works).
- [ ] Texting: will they text people back, and from which number?
- [ ] Which instructors teach each class.
- [ ] Dawn's headshot (her card shows a "DR" tile).
- [ ] Instagram and Facebook links.
- [ ] Real Google reviews (start asking families now).
- [ ] What to wear to the first class, and are there loaners?
- [ ] How fast they reply to a booking.
- [ ] Program FAQs: how often to come, belts/levels, gear.
- [ ] Signed photo releases for the kids in the photos (unlocks image search).
- [ ] Logo file (PNG with transparent background, or SVG). The header uses a stand-in "G FORCE" wordmark and the favicon is a plain "G".
- [ ] The "extra photo" of Neil with the championship belt: where should it go?
- [ ] Higher-quality originals of the 2026-11-09 photos (they came by text).
- [ ] Optional: a photo of Neil and Dawn doing BJJ for the hero; membership terms (contract or month-to-month) for the FAQ.

**2. Needs Greg (accounts and decisions)**
- [ ] Google Search Console: add `g-forcemma.com` (DNS TXT record at GoDaddy), submit `https://g-forcemma.com/sitemap.xml`, request indexing for the homepage.
- [ ] Google Business Profile: website set to https://g-forcemma.com/, name, address and hours matching the site exactly.
- [ ] Booking form: pick a form service that emails the gym (no GoHighLevel). Right now the form opens the visitor's email app.
- [ ] Privacy and Terms pages: needed before the text-message consent box can come back.
- [ ] Tracking: GA4 and Meta Pixel IDs, if wanted (slots exist in `GF_CONFIG`).
- [ ] Check the "Leave feedback" Google Doc allows comments from anyone with the link.
- [ ] Optional: Bing Webmaster Tools (import from Search Console).
- [ ] Housekeeping: delete the stale local folders outside the repo (`gforce-preview*`, `gforce-website-preview-*`).

**3. Our follow-ups when info arrives**
- For any item in section 1: add it to `zen-3.0/`, delete its hiding rule in `tools/build-live.py`, rebuild and push. The full list of hidden spots is in the next section.
- Photo releases signed: remove `noimageindex,max-image-preview:none` and the two image-crawler blocks in `tools/build-live.py`, rebuild.
- A coach bio changes: update `about.html` and re-copy it into the coach pop-ups on the homepage and the 7 program pages.
- Class schedule: replace the sample data in `zen-3.0/schedule-data.js` (one line per class), then remove the schedule rules from `build-live.py`.

Find any yellow note in the preview with: `grep -rn 'class="todo' zen-3.0`

## Hidden on the live site until we have the info (Greg, 2026-11-09)

g-forcemma.com shows only what we have real info for. These are removed by `tools/build-live.py` at build time; `zen-3.0/` (the preview) still has them, with yellow notes, so they come back as soon as the info is in. When an item arrives: add it to `zen-3.0/`, delete its rule from `build-live.py`, rebuild and push.

- [ ] **Phone number.** Hidden: call buttons, "Call or text" contact card, phone line in the footer and booking section. The phone icon in the mobile bottom bar opens email instead.
- [ ] **Class schedule** (a photo of the board works). Hidden: Schedule in the menu and footer, the "Class times" section and "Class Times" button on all 7 program pages, "See the Schedule" buttons, the "Class schedule" row in the hours table, and the class-time picker in the booking form. `schedule.html` redirects to the contact page.
- [ ] **Texting.** Will G-Force text people back, and from which number? Hidden: "We text you to confirm" (now "We confirm your class"), "We'll text you" lines (now "We'll get back to you"), and the text-message consent checkbox. The consent box also needs Privacy and Terms pages before it can return.
- [ ] **Privacy and Terms pages.** Needed for the text-message consent line.
- [ ] **Which instructors teach each class.** Hidden: the Instructors section on the 7 program pages. The homepage and About page still show all three coaches.
- [ ] **Dawn's headshot.** Her card and pop-up show a green "DR" tile instead of a photo.
- [ ] **Instagram and Facebook links.** Hidden: the "Follow Us" footer column.
- [ ] **Real Google reviews.** Hidden: the "What families say" section.
- [ ] **What to wear to the first class, and loaners?** Hidden: that FAQ question and the note on homepage step 3.
- [ ] **How fast they reply to a booking.** Hidden: the reply-time note on step 2 and the booking section.
- [ ] **Program FAQs** (how often to come, belts/levels, gear). Hidden: the empty FAQ section on each program page.

## Needed from Neil / G-Force

- [x] **Homepage hero photos.** The Pexels stand-ins were replaced on 2026-11-09 with G-Force's adult kickboxing group and adult BJJ photos. If Neil wants a real photo of him and Dawn doing BJJ there, swap `img/hero-bjj*`.
- [ ] **Phone number.** Header, footer, contact page, booking section and "Call" buttons on 11 pages (notes: `Phone`, `Phone # needed`, `Call: phone # needed`). The mobile bottom-bar phone button currently links to `contact.html`; point it at `tel:` once the number exists.
- [ ] **Real class schedule** (a photo of the board works). Replace the sample data in each version's `schedule-data.js` (one line per class). The schedule page and the booking form's class times say "Sample times" until then.
- [x] **Ages for Kids Jiu-Jitsu and Kids Kickboxing:** 6+ for both (Greg, 2026-11-09). Updated on the cards, program pages, FAQ, booking form and schedule in zen-v2, Zen 2.0 and Zen 3.0.
- [ ] **What to wear to the first class, and loaners?** Homepage step 3 (`What to wear?`) and the FAQ answer (`Need from Neil: gi, rash guard, gloves? Loaners for class one?`).
- [ ] **How fast they reply to a booking by text.** `Confirm response time` on the homepage step 2 and the booking section (index + contact).
- [ ] **Which instructors teach each class.** `Confirm which instructors teach this class` on all 7 program pages.
- [ ] **Program FAQs** (how often to come, belts/levels, gear). Placeholder `Starter page … Needs info` on all 7 program pages.
- [ ] **Photos:** Dawn's headshot (8 pages, `Photo needed`). Add it with 480w and full-size WebP plus a JPG fallback, like the existing ones in `img/`.
- [ ] **"Extra photo" from Neil (2026-11-09 text):** Neil and two others with a championship belt. It was in the text thread but not in `NEW MEDIA UPDATES 11:9`, and no spot was named for it. Ask where it goes.
- [ ] **Higher-quality originals** of the 2026-11-09 photos (Dawn offered to resend them another way). Current files came by text.
- [ ] **Logo file** (PNG with transparent background or SVG). Header and footer use a stand-in "G FORCE" wordmark. Also make it the favicon.
- [ ] **Instagram and Facebook links.** Footer on every page.
- [ ] **Real Google reviews** from the Business Profile. Homepage review boxes are placeholders. Never write reviews ourselves.
- [ ] **Signed photo releases for the kids in the photos.** The preview link is public, so this matters now.
- [ ] **Membership terms** (contract or month-to-month). Not on the site anywhere; could go in the FAQ.

## Technical work before launch

- [ ] **Booking form delivery. No GoHighLevel for this client (Greg, 2026-11-09).** The live site currently opens the visitor's email app with their details, addressed to gforcemmafitness@gmail.com (the `mailto` fallback in `zen-v2/booking.js`, switched on by `tools/build-live.py`). That loses visitors who don't use an email app. To fix, pick a plain form service that emails the gym (decision for Greg), set `formEndpoint` in `window.GF_CONFIG` to it, and confirm `booking.js` posts in the format that service expects. Then test a real submission on the live site.
- [ ] **Tracking.** `ga4` and `metaPixel` are blank in `GF_CONFIG` (zen-v2, neo-v3). v1 has no slots for them.
- [ ] **Privacy and Terms pages.** The links in the SMS consent line are `href="#"` (contact + index, all versions). Needed for text-message consent compliance.
- [ ] **Link preview image + favicon.** `og:image` points to `https://g-forcemma.com/img/hero-kids-bjj.jpg` (not live yet); v1 has no `og:image`; no page has a favicon. The landing page (`/index.html`, the link we email) has no preview tags either.
- [x] **Domain / hosting for g-forcemma.com.** Soft launch live 2026-11-07: GitHub Pages repo `gregviteno/gforce-mma-live`, GoDaddy DNS (4 GitHub A records on `@`, `www` CNAME to `gregviteno.github.io`). See "Publishing the live site" in `CLAUDE.md`.
- [x] **HTTPS for g-forcemma.com.** Live 2026-11-07 ~11:55am. The certificate covers g-forcemma.com and www, expires 2027-02-05 and GitHub renews it automatically. HTTPS is enforced, and www redirects to https://g-forcemma.com/. GitHub never requested the certificate until the custom domain was removed, left off for about 2.5 minutes, then re-added; an immediate remove and re-add did nothing.
- [ ] **Map** is a drawn placeholder (`.map` block). "Open in Maps" works. Optional: real embed.
- [x] **Open the site to Google (pages only), 2026-11-09.** Live pages now carry `index,follow,noimageindex,max-image-preview:none`; `robots.txt` blocks Googlebot-Image and msnbot-media; `sitemap.xml` lists the 10 pages. Share previews and structured data use `img/og-image.jpg` (adult class). Done by `tools/build-live.py`; the preview folders stay `noindex`.
- [ ] **Allow images in search** once Neil confirms the kids' photo releases: drop `noimageindex,max-image-preview:none` and the two image-crawler blocks in `tools/build-live.py`, rebuild.
- [ ] **Google Search Console** (needs Greg's or Neil's Google login): add the `g-forcemma.com` domain property (DNS TXT record at GoDaddy), submit `https://g-forcemma.com/sitemap.xml`, request indexing for the homepage.
- [ ] **Google Business Profile:** set the website to https://g-forcemma.com/ and make sure the name, address and hours match the site exactly (4240 Hicksville Road, Bethpage, NY 11714; Mon–Fri 7–12 & 3:30–9:30, Sat–Sun 7–12).
- [ ] **Bing Webmaster Tools** (optional): import from Search Console.
- [ ] **Feedback doc sharing.** The "Leave feedback" button opens Greg's Google Doc (`1uzqWdO9zn-hudRDo35GGOSpZNkl2xAtL5Y0gGxKTcqg`). It must allow comments from anyone with the link. Not verifiable from the repo.

## Housekeeping

- [ ] Local folders outside this repo are **stale** copies: `gforce-website-preview-v3`, `gforce-website-preview-zen-v2`, `gforce-website-preview-neo-v3`, `gforce-preview`. This repo is the source of truth. Delete them once comfortable.
- [ ] The Claude artifact preview `https://claude.ai/artifact/SWMVXP3zUFfUyAHgpWzXj1` is an older Zen build and no longer updated. Use the GitHub Pages link instead.
