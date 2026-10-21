# G-Force MMA & Fitness: website previews

Draft website for G-Force MMA & Fitness, a family-owned martial arts school at 4240 Hicksville Road, Bethpage, NY 11714 (owner and head instructor: Sensei Neil Gonzales). Three design directions of the same 11-page site, hosted on GitHub Pages for client review.

**Preview link to share:** https://gregviteno.github.io/gforce-mma-website/

| Folder | Version | Live preview |
|---|---|---|
| `v1/` | Version 1: Original (tagged "Current") | https://gregviteno.github.io/gforce-mma-website/v1/ |
| `zen-v2/` | Version 2: Zen | https://gregviteno.github.io/gforce-mma-website/zen-v2/ |
| `neo-v3/` | Version 3: Neo | https://gregviteno.github.io/gforce-mma-website/neo-v3/ |
| `zen-v4/` | Redirect only (old zen link → `zen-v2/`) | |
| `index.html` | Landing page linking the three versions (each opens in a new tab) | |

All pages are `noindex` and `robots.txt` blocks crawlers while this is a draft.

- **Open work:** [`TODO.md`](TODO.md)
- **Decisions, rules and workflow for editing:** [`CLAUDE.md`](CLAUDE.md)
- **Mobile QA scripts:** [`tools/`](tools/)

## Pages (same in every version)

`index.html`, `about.html`, `contact.html`, `schedule.html`, and seven program pages: `little-warriors.html`, `kids-jiu-jitsu.html`, `kids-kickboxing.html`, `girls-wrestling.html`, `jiu-jitsu.html`, `kickboxing.html`, `hiit.html`.

Each version folder is self-contained: its own `site.css`, `site.js`, `img/`, and for zen-v2/neo-v3 also `booking.js` and `schedule-data.js` (v1 keeps its schedule in `schedule-data.js` too). zen-v2 self-hosts its fonts in `fonts/` + `fonts.css`.

## Deploying

Push to `main`. GitHub Pages rebuilds automatically (about 30 seconds). Check the build with:

```sh
gh api repos/gregviteno/gforce-mma-website/pages/builds/latest --jq '.status + " " + .commit[:7]'
```
