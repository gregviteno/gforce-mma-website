# G-Force website: open items

Full scan of `todo` notes: 2026-10-21. Updated for Greg's edits on 2026-11-04.
Zen (`zen-v2/`) is the chosen layout, so fix each item there only.

Find any note on the site with: `grep -rn 'class="todo' zen-v2`

## Needed from Neil / G-Force

- [ ] **Two real homepage hero photos:** Neil and Dawn doing BJJ, and women boxing. Both panels use Pexels stock placeholders for now: https://www.pexels.com/photo/6765018/ (man and woman grappling in judo gis) and https://www.pexels.com/photo/8472150/ (two women gloving up in a ring). Replace `img/hero-placeholder-*` before launch, delete the "Placeholder" notes, and check the headline doesn't cover a face.
- [ ] **Phone number.** Header, footer, contact page, booking section and "Call" buttons on 11 pages (notes: `Phone`, `Phone # needed`, `Call: phone # needed`). The mobile bottom-bar phone button currently links to `contact.html`; point it at `tel:` once the number exists.
- [ ] **Real class schedule** (a photo of the board works). Replace the sample data in each version's `schedule-data.js` (one line per class). The schedule page and the booking form's class times say "Sample times" until then.
- [ ] **Ages for Kids Jiu-Jitsu and Kids Kickboxing.** `Ages ?` chips on the homepage cards and both program pages, plus `confirm ages` in the homepage FAQ.
- [ ] **What to wear to the first class, and loaners?** Homepage step 3 (`What to wear?`) and the FAQ answer (`Need from Neil: gi, rash guard, gloves? Loaners for class one?`).
- [ ] **How fast they reply to a booking by text.** `Confirm response time` on the homepage step 2 and the booking section (index + contact).
- [ ] **Which instructors teach each class.** `Confirm which instructors teach this class` on all 7 program pages.
- [ ] **Program FAQs** (how often to come, belts/levels, gear). Placeholder `Starter page … Needs info` on all 7 program pages.
- [ ] **Photos:** Dawn's headshot (8 pages) and adult BJJ, adult kickboxing and G-Fit 360 class photos (`Photo needed`). Add each image with 480w and full-size WebP plus a JPG fallback, like the existing ones in `img/`.
- [ ] **Logo file** (PNG with transparent background or SVG). Header and footer use a stand-in "G FORCE" wordmark. Also make it the favicon.
- [ ] **Instagram and Facebook links.** Footer on every page.
- [ ] **Real Google reviews** from the Business Profile. Homepage review boxes are placeholders. Never write reviews ourselves.
- [ ] **Signed photo releases for the kids in the photos.** The preview link is public, so this matters now.
- [ ] **Membership terms** (contract or month-to-month). Not on the site anywhere; could go in the FAQ.

## Technical work before launch

- [ ] **Connect the booking form.** zen-v2 / neo-v3: set `formEndpoint` in `window.GF_CONFIG` (top of each page's `<head>`) to the GoHighLevel inbound-webhook URL; `booking.js` posts to it. v1 has no endpoint at all: its form only shows a "Draft only" message (`v1/site.js`).
- [ ] **Tracking.** `ga4` and `metaPixel` are blank in `GF_CONFIG` (zen-v2, neo-v3). v1 has no slots for them.
- [ ] **Privacy and Terms pages.** The links in the SMS consent line are `href="#"` (contact + index, all versions). Needed for text-message consent compliance.
- [ ] **Link preview image + favicon.** `og:image` points to `https://g-forcemma.com/img/hero-kids-bjj.jpg` (not live yet); v1 has no `og:image`; no page has a favicon. The landing page (`/index.html`, the link we email) has no preview tags either.
- [x] **Domain / hosting for g-forcemma.com.** Soft launch live 2026-11-07: GitHub Pages repo `gregviteno/gforce-mma-live`, GoDaddy DNS (4 GitHub A records on `@`, `www` CNAME to `gregviteno.github.io`). See "Publishing the live site" in `CLAUDE.md`.
- [ ] **HTTPS for g-forcemma.com.** As of 2026-11-07 8:45am DNS is correct and GitHub's domain check passed, but the certificate was not issued yet, so `https://` shows NET::ERR_CERT_COMMON_NAME_INVALID (GitHub's `*.github.io` cert). Custom domain was removed and re-added at 8:36am to trigger the request. Check with `gh api repos/gregviteno/gforce-mma-live/pages --jq .https_certificate`. When the state is `approved`, run `gh api -X PUT repos/gregviteno/gforce-mma-live/pages -F https_enforced=true`, then check https://g-forcemma.com and https://www.g-forcemma.com at 390 and 1440px. If still no certificate after 24 hours, remove and re-add the domain in the repo's Settings → Pages.
- [ ] **Map** is a drawn placeholder (`.map` block). "Open in Maps" works. Optional: real embed.
- [ ] **At launch:** remove `<meta name="robots" content="noindex,nofollow">` from every page, delete or open up `robots.txt`, remove the draft bar and the yellow notes.
- [ ] **Feedback doc sharing.** The "Leave feedback" button opens Greg's Google Doc (`1uzqWdO9zn-hudRDo35GGOSpZNkl2xAtL5Y0gGxKTcqg`). It must allow comments from anyone with the link. Not verifiable from the repo.

## Housekeeping

- [ ] Local folders outside this repo are **stale** copies: `gforce-website-preview-v3`, `gforce-website-preview-zen-v2`, `gforce-website-preview-neo-v3`, `gforce-preview`. This repo is the source of truth. Delete them once comfortable.
- [ ] The Claude artifact preview `https://claude.ai/artifact/SWMVXP3zUFfUyAHgpWzXj1` is an older Zen build and no longer updated. Use the GitHub Pages link instead.
