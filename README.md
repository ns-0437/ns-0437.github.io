# Portfolio: Navin Kumar

Static portfolio site. No build step, no dependencies, no framework. Three files
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

Already live at **https://ns-0437.github.io/**, served by GitHub Pages from `main` / root of
`github.com/ns-0437/ns-0437.github.io`. Because the repo is named after the account it
is a *user site*, so it serves at the domain root with no `/portfolio` path. Push to
`main` and Pages rebuilds in about a minute; there's no Actions workflow involved.

Project sites (`/agentfuse`, `/worst-user-journey`) are unaffected, because user sites and
project sites coexist.

```bash
git push origin main
```

## CI checks

`.github/workflows/checks.yml` runs on every push and pull request. It does **not**
deploy; Pages already does that. It guards against regressions, and takes about 15
seconds:

| Check | Fails the build when |
|---|---|
| Em dashes | an em dash appears in `index.html` or `README.md` |
| Local assets | a `src`/`href` points at a css/js/image file that isn't in the repo |
| Internal anchors | a `href="#foo"` has no matching `id="foo"` |
| Image budget | anything in `img/` exceeds 400 KB |
| Portrait ratio | `img/portrait.jpg` is not 4:5 |
| External links | never fails, warns only (LinkedIn and X often block CI runners) |

Run the em dash check locally before pushing if you want. It matches by codepoint, so
the command doesn't contain the character it's looking for:

```bash
python3 -c "import io,sys;d=chr(0x2014);print([f'{p}:{n}' for p in ('index.html','README.md') for n,l in enumerate(io.open(p,encoding='utf-8'),1) if d in l] or 'clean')"
```

## Custom domain (sharmanavin.me)

Not set up yet. The domain wasn't registered as of Aug 2 2026 (`NXDOMAIN`, no
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

2. Wait for it to resolve. `nslookup sharmanavin.me 8.8.8.8` should return those IPs.
3. Then, and only then, add the domain:

   ```bash
   printf 'sharmanavin.me\n' > CNAME && git add CNAME && git commit -m "Custom domain" && git push
   ```

4. In **Settings → Pages**, tick *Enforce HTTPS* once the certificate is issued
   (can take up to an hour).

Nothing else needs changing. The site already serves from a domain root, and every
asset path in `index.html` is relative.

## Editing

**Colours and type.** Every token is at the top of `css/main.css` under `:root`
(light) and `[data-theme="dark"]`. Change `--accent` and the whole page follows.

**Add a project.** Copy any `<article class="card">` block in the projects grid.
`is-feature` is only a marker for the two headline projects; the grid is 2-up
regardless.

**Add a role.** Copy a `<div class="tl-item">` in the timeline, newest first. The
top item automatically gets the filled accent dot.

**Portrait.** `img/portrait.jpg`, a 4:5 crop at 800×1000. Replace the file at the same
path and the layout follows; the CSS crops to fill with `object-fit: cover`.

**Add a certification.** Copy an `<li>` in the Education column of `#background`. If the
credential has a public verification page, append an `<a>` inside the same `<li>`; it
picks up the accent styling and arrow automatically.

## The Background section

`#background` is a 3-across grid of `.bg-col` blocks that wraps, so the five columns
sit as three then two. Adding or removing a column needs no CSS change; the grid
reflows. Row gap is deliberately wider than column gap (64px vs 48px) so the two rows
do not read as one list.

| Column | Holds |
|---|---|
| Education & Certifications | degree, then credentials with verify links |
| Retrieval Strategies | vector, hybrid, reranking, HyDE, metadata, chunking |
| LLMs & Agents | fine-tuning, agent frameworks, MCP, vector stores |
| Evaluation & Reliability | retrieval and detection metrics, failure analysis |
| Technical Expertise | languages, ML stack, data, production, CI/CD |

## Projects on the page

Ordered by strength, not date. The first three carry a Live badge because they have
something a visitor can actually open:

| Project | Live | Repo |
|---|---|---|
| AgentFuse | dashboard on GitHub Pages | `ns-0437/agentfuse` |
| The Internet's Worst User Journey | demo on GitHub Pages | `ns-0437/worst-user-journey` |
| Relevant Section Identification | app on Cloud Run | `ns-0437/relevant-section-identification` |
| Research Scout | no | not yet linked |
| AI Résumé Optimizer | no | not yet linked |
| Human Activity Recognition in the Dark | no | not yet linked |
| Natural Sound Recognition | no | not yet linked |

## Still to do

- `#writing` holds three **placeholder** posts marked `is-todo`. Write them or delete
  the whole `<section id="writing">`; an empty blog reads worse than none.
- The four projects marked "not yet linked" above point at the GitHub profile rather
  than their own repos. Point them at real URLs.
- Add `og-image.png` (1200×630) and an `og:image` meta tag so links preview properly
  when shared.

## Notes

- Theme respects `prefers-color-scheme` until the visitor clicks the toggle, then
  their choice sticks in `localStorage`.
- Text colours are AA-contrast checked in both themes.
- Honours `prefers-reduced-motion`; has a print stylesheet so the page doubles as a
  one-page handout.
