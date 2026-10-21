# G-Force website: open items

Last checked: 2026-10-21, by scanning every yellow `todo` note in all three versions plus the code.
The content gaps below are identical in v1, zen-v2 and neo-v3. Fix each one in **all three**.

Find any note on the site with: `grep -rn 'class="todo' v1 zen-v2 neo-v3`

## Needed from Neil / G-Force

- [ ] **Phone number.** Header, footer, contact page, booking section and "Call" buttons on 11 pages (notes: `Phone`, `Phone # needed`, `Call: phone # needed`). The mobile bottom-bar phone button currently links to `contact.html`; point it at `tel:` once the number exists.
- [ ] **Real class schedule** (a photo of the board works). Replace the sample data in each version's `schedule-data.js` (one line per class). The schedule page and the booking form's class times say "Sample times" until then.
- [ ] **Ages for Kids Jiu-Jitsu and Kids Kickboxing.** `Ages ?` chips on the homepage cards and both program pages, plus `confirm ages` in the homepage FAQ.
- [ ] **What to wear to the first class, and loaners?** Homepage step 3 (`What to wear?`) and the FAQ answer (`Need from Neil: gi, rash guard, gloves? Loaners for class one?`).
- [ ] **How fast they reply to a booking by text.** `Confirm response time` on the homepage step 2 and the booking section (index + contact).
- [ ] **Which instructors teach each class.** `Confirm which instructors teach this class` on all 7 program pages.
- [ ] **Program FAQs** (how often to come, belts/levels, gear). Placeholder `Starter page … Needs info` on all 7 program pages.
- [ ] **Photos:** Dawn's headshot (8 pages) and adult BJJ, adult kickboxing and Express HIIT class photos (`Photo needed`). Add each image with 480w and full-size WebP plus a JPG fallback, like the existing ones in `img/`.
- [ ] **Logo file** (PNG with transparent background or SVG). Header and footer use a stand-in "G FORCE" wordmark. Also make it the favicon.
- [ ] **Instagram and Facebook links.** Footer on every page.
- [ ] **Neil's bio, About page:** "From 2013 through 2026, Neil served as co-founder and Head Instructor of the Kids and Adult MMA program." Which school? (`Which school? Name it or reword`)
- [ ] **Neil's OK on the reworded mission line**, About page (`Edited from Neil's wording; Neil to OK`).
- [ ] **Real Google reviews** from the Business Profile. Homepage review boxes are placeholders. Never write reviews ourselves.
- [ ] **Signed photo releases for the kids in the photos.** The preview link is public, so this matters now.
- [ ] **Confirm Haley is his daughter.** The site says "their two daughters"; still an open question in the feedback doc.
- [ ] **Membership terms** (contract or month-to-month). Not on the site anywhere; could go in the FAQ.

## Decision for Greg

- [ ] **Which version to launch:** v1 (Original, tagged "Current"), v2 (Zen) or v3 (Neo).

## Technical work before launch

- [ ] **Connect the booking form.** zen-v2 / neo-v3: set `formEndpoint` in `window.GF_CONFIG` (top of each page's `<head>`) to the GoHighLevel inbound-webhook URL; `booking.js` posts to it. v1 has no endpoint at all: its form only shows a "Draft only" message (`v1/site.js`).
- [ ] **Tracking.** `ga4` and `metaPixel` are blank in `GF_CONFIG` (zen-v2, neo-v3). v1 has no slots for them.
- [ ] **Privacy and Terms pages.** The links in the SMS consent line are `href="#"` (contact + index, all versions). Needed for text-message consent compliance.
- [ ] **Link preview image + favicon.** `og:image` points to `https://g-forcemma.com/img/hero-kids-bjj.jpg` (not live yet); v1 has no `og:image`; no page has a favicon. The landing page (`/index.html`, the link we email) has no preview tags either.
- [ ] **Domain / hosting for g-forcemma.com.** Canonical and `og:url` tags already point there.
- [ ] **Map** is a drawn placeholder (`.map` block). "Open in Maps" works. Optional: real embed.
- [ ] **At launch:** remove `<meta name="robots" content="noindex,nofollow">` from every page, delete or open up `robots.txt`, remove the draft bar and the yellow notes.
- [ ] **Feedback doc sharing.** The "Leave feedback" button opens Greg's Google Doc (`1uzqWdO9zn-hudRDo35GGOSpZNkl2xAtL5Y0gGxKTcqg`). It must allow comments from anyone with the link. Not verifiable from the repo.

## Housekeeping

- [ ] Local folders outside this repo are **stale** copies: `gforce-website-preview-v3`, `gforce-website-preview-zen-v2`, `gforce-website-preview-neo-v3`, `gforce-preview`. This repo is the source of truth. Delete them once comfortable.
- [ ] The Claude artifact preview `https://claude.ai/artifact/SWMVXP3zUFfUyAHgpWzXj1` is an older Zen build and no longer updated. Use the GitHub Pages link instead.
