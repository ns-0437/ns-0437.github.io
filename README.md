# Portfolio: Navin Kumar

Static portfolio site. No build step, no dependencies, no framework. Plain files you
edit directly and push.

```
portfolio/
  index.html      all page content lives here
  404.html        error page, reuses main.css and the saved theme
  robots.txt      points crawlers at the sitemap
  sitemap.xml     one URL, since the site is a single page
  css/main.css    design tokens at the top, sections below
  js/main.js      theme toggle, scroll reveal, active nav
  img/            portrait, og-image, favicons
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
| Site metadata | the favicon, og-image, 404, robots or sitemap is missing, a canonical/og:image/JSON-LD tag is absent, or the structured data does not parse |
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
`is-feature` marks the four headline projects that lead the grid; the grid is 2-up
regardless.

**Add a role.** Copy a `<div class="tl-item">` in the timeline, newest first. The
top item automatically gets the filled accent dot.

**Portrait.** `img/portrait.jpg`, a 4:5 crop at 800×1000. Replace the file at the same
path and the layout follows; the CSS crops to fill with `object-fit: cover`.

**Add a certification.** Copy an `<li>` in the Education column of `#background`. If the
credential has a public verification page, append an `<a>` inside the same `<li>`; it
picks up the accent styling and arrow automatically.

## Regenerating images

`img/og-image.png` (1200x630) and the favicons are generated, not hand-drawn. Both
scripts build them from the same tokens the CSS uses, so re-running after a palette
change keeps them in step. If you replace `img/portrait.jpg`, regenerate the og-image
so the preview card matches.

## The Background section

`#background` is a 3-across grid of `.bg-col` blocks that wraps, so the six columns
sit as two rows of three. Adding or removing a column needs no CSS change; the grid
reflows. Row gap is deliberately wider than column gap (64px vs 48px) so the two rows
do not read as one list.

| Column | Holds |
|---|---|
| Education & Certifications | degree, then credentials with verify links |
| Retrieval Strategies | vector, BM25, hybrid fusion, section expansion, page aggregation |
| Document Processing | partitioning, the three chunking paths, table and boilerplate handling |
| Models & Agents | fine-tuning, agent frameworks, reliability patterns, named models by role |
| Evaluation & Reliability | graded relevance, holdout splits, generalization checks, failure taxonomy, profiling |
| Technical Expertise | languages, ML stack, data, graphs, production, CI/CD |

Retrieval and document processing content is sourced from the Relevant Section
Identification technical report; the reliability, fallback and generalization lines trace
to the Reformly copilot and dependency graph generator repos. Keep it that way: every claim
should trace to a project or a measurement, including the negative ones. HyDE, cross-encoder
reranking and metadata scoring are listed as **rejected with deltas** rather than as
capabilities, because that is what the evaluation found.

## Projects on the page

Listed in page order. The first four lead because they are the strongest, not because
they are the newest; anything added later is appended. Six carry a Live badge because
they have something a visitor can actually open:

| Project | Live | Repo |
|---|---|---|
| AgentFuse | dashboard on GitHub Pages | `ns-0437/agentfuse` |
| AI Defense Lab for Payment Security | app on Cloud Run | `ns-0437/mastercard-fraud-defense` |
| The Internet's Worst User Journey | demo on GitHub Pages | `ns-0437/worst-user-journey` |
| Relevant Section Identification | app on Cloud Run | `ns-0437/relevant-section-identification` |
| Research Scout | no | `ns-0437/research-scout` |
| AI Résumé Optimizer | no | private, not linked |
| Human Activity Recognition in the Dark | no | `ns-0437/Human-Activity-Recognition-in-Dark` |
| Natural Sound Recognition | no | no repo |
| Dep Graph Generator | graph on GitHub Pages | `ns-0437/dep-graph-generator` |
| Reformly Support Copilot | app on Vercel | `ns-0437/reformly-support-copilot` |

## Still to do

- The blog section was removed rather than shipped with placeholder posts. To bring it
  back, restore the `<section id="writing">` block from git history and point the
  fourth nav item at `#writing` again.
- `AI Résumé Optimizer` shows "Source kept private" because `ns-0437/resume-optimizer`
  is a private repo. Making it public turns that note back into a link.
- `Natural Sound Recognition` has no repo on the account at all.

## Notes

- Theme respects `prefers-color-scheme` until the visitor clicks the toggle, then
  their choice sticks in `localStorage`.
- Text colours are AA-contrast checked in both themes.
- Honours `prefers-reduced-motion`; has a print stylesheet so the page doubles as a
  one-page handout.
