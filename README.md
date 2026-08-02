# Portfolio — Navin Kumar

Static portfolio site. No build step, no dependencies, no framework — three files
you can edit directly and push.

```
portfolio/
  index.html      all content lives here
  css/main.css    design tokens at the top, sections below
  js/main.js      theme toggle, scroll reveal, active nav
```

## Run it locally

```bash
npx --yes serve portfolio -l 4321
```

Then open http://localhost:4321.

## Deploy

Already live at **https://ns-0437.github.io/** — GitHub Pages serving `main` / root of
`github.com/ns-0437/ns-0437.github.io`. Because the repo is named after the account it
is a *user site*, so it serves at the domain root with no `/portfolio` path. Push to
`main` and Pages rebuilds in about a minute; there's no Actions workflow involved.

Project sites (`/agentfuse`, `/worst-user-journey`) are unaffected — user sites and
project sites coexist.

```bash
git push origin main
```

## Custom domain (sharmanavin.me)

Not set up yet — the domain wasn't registered as of Aug 2 2026 (`NXDOMAIN`, no
nameservers). Do **not** commit a `CNAME` file before DNS resolves: Pages will start
serving only that hostname and redirect the `github.io` URL to it, taking the live
site offline until the domain works.

Order of operations once the domain is bought:

1. At the registrar, point the apex at GitHub Pages:

   | Type | Name | Value |
   |------|------|-------|
   | A    | `@`  | `185.199.108.153` |
   | A    | `@`  | `185.199.109.153` |
   | A    | `@`  | `185.199.110.153` |
   | A    | `@`  | `185.199.111.153` |
   | CNAME | `www` | `ns-0437.github.io.` |

2. Wait for it to resolve — `nslookup sharmanavin.me 8.8.8.8` should return those IPs.
3. Then, and only then, add the domain:

   ```bash
   printf 'sharmanavin.me\n' > CNAME && git add CNAME && git commit -m "Custom domain" && git push
   ```

4. In **Settings → Pages**, tick *Enforce HTTPS* once the certificate is issued
   (can take up to an hour).

Nothing else needs changing — the site already serves from a domain root, and every
asset path in `index.html` is relative.

## Editing

**Colours and type** — every token is at the top of `css/main.css` under `:root`
(light) and `[data-theme="dark"]`. Change `--accent` and the whole page follows.

**Add a project** — copy any `<article class="card">` block in the projects grid.
`is-feature` is only a marker for the two headline projects; the grid is 2-up
regardless.

**Add a role** — copy a `<div class="tl-item">` in the timeline, newest first. The
top item automatically gets the filled accent dot.

**Portrait** — `img/portrait.jpg`, a 4:5 crop at 800×1000. Replace the file at the same
path and the layout follows; the CSS crops to fill with `object-fit: cover`.

## Still to do

- `#writing` holds three **placeholder** posts marked `is-todo`. Write them or delete
  the whole `<section id="writing">` — an empty blog reads worse than none.
- Project cards for Research Scout, Résumé Optimizer, HAR-in-Dark and Natural Sound
  Recognition link to your GitHub profile, not to their repos. Point them at the real
  repo URLs.
- Add `og-image.png` (1200×630) and an `og:image` meta tag so links preview properly
  when shared.

## Notes

- Theme respects `prefers-color-scheme` until the visitor clicks the toggle, then
  their choice sticks in `localStorage`.
- Text colours are AA-contrast checked in both themes.
- Honours `prefers-reduced-motion`; has a print stylesheet so the page doubles as a
  one-page handout.
