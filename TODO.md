# G-Force website: open items

Full scan of `todo` notes: 2026-10-21. Updated for Greg's edits on 2026-11-04.
Zen (`zen-v2/`) is the chosen layout, so fix each item there only.

Find any note on the site with: `grep -rn 'class="todo' zen-v2`

## Where things stand (2026-11-09)

- **2026-11-09 client edits done:** capitals on the highlighted labels, six new program photos (kids kickboxing, kids jiu-jitsu, girls wrestling, adult kickboxing, adult BJJ, G-Fit 360), Haley's accolades cut to her own 8-item list on About.

- **Live soft launch:** https://g-forcemma.com (HTTPS enforced, `noindex`), repo `gregviteno/gforce-mma-live`. To publish changes, edit `zen-v2/`, then follow "Publishing the live site" in `CLAUDE.md`.
- **Preview with draft notes:** https://gregviteno.github.io/gforce-mma-website/zen-v2/
- **Most useful next steps:**
  1. Phone number.
  2. Class schedule.
  3. A way for the booking form to reach the gym without GoHighLevel.
  4. Kids' photo releases, so the site can be opened to Google.
- **Not yet decided:** switching the uppercase buttons, menu and ticker to sentence case (offered, no answer yet).

## Needed from Neil / G-Force

- [x] **Homepage hero photos.** The Pexels stand-ins were replaced on 2026-11-09 with G-Force's adult kickboxing group and adult BJJ photos. If Neil wants a real photo of him and Dawn doing BJJ there, swap `img/hero-bjj*`.
- [ ] **Phone number.** Header, footer, contact page, booking section and "Call" buttons on 11 pages (notes: `Phone`, `Phone # needed`, `Call: phone # needed`). The mobile bottom-bar phone button currently links to `contact.html`; point it at `tel:` once the number exists.
- [ ] **Real class schedule** (a photo of the board works). Replace the sample data in each version's `schedule-data.js` (one line per class). The schedule page and the booking form's class times say "Sample times" until then.
- [ ] **Ages for Kids Jiu-Jitsu and Kids Kickboxing.** `Ages ?` chips on the homepage cards and both program pages, plus `confirm ages` in the homepage FAQ.
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
- [ ] **Open the site to Google** (after the kids' photo releases): remove `<meta name="robots" content="noindex,nofollow">` from every `zen-v2/` page and rebuild the live site. The live build already strips the draft bar and yellow notes and has no `robots.txt`. Then add the site to Google Search Console and link it from the Google Business Profile.
- [ ] **Feedback doc sharing.** The "Leave feedback" button opens Greg's Google Doc (`1uzqWdO9zn-hudRDo35GGOSpZNkl2xAtL5Y0gGxKTcqg`). It must allow comments from anyone with the link. Not verifiable from the repo.

## Housekeeping

- [ ] Local folders outside this repo are **stale** copies: `gforce-website-preview-v3`, `gforce-website-preview-zen-v2`, `gforce-website-preview-neo-v3`, `gforce-preview`. This repo is the source of truth. Delete them once comfortable.
- [ ] The Claude artifact preview `https://claude.ai/artifact/SWMVXP3zUFfUyAHgpWzXj1` is an older Zen build and no longer updated. Use the GitHub Pages link instead.
