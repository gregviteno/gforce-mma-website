# QA tools

Both scripts talk to a headless Chrome over the DevTools protocol (Node 22+ built-in `WebSocket`, no npm installs). Start a local server and Chrome first; see `../CLAUDE.md`, "Workflow".

- **`qa.mjs <outdir> <widths> <path...>`**: for each page and width (mobile emulation, 3× density) prints one JSON line with horizontal overflow, tap targets under 44px, text under 14px, unloaded images and page weight, and saves a full-page PNG at the first width. Pass `""` as a path for the landing page.
- **`shot.mjs <out.png> <width> <url> <selector|top> [pad]`**: screenshot of one element (or the first screen) at a given width. Output is 2× density, so a 1440px-wide shot is 2880px.
- **`fontcheck.mjs <url>`**: lists the web fonts that actually loaded on a page.
- **`sync-2026-10-21.py`**: the one-off script that brought v1 in line with v2/v3 on 2026-10-21. Kept as a record of exactly what changed; don't re-run it.
