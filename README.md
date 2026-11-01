# 25xacademy.com

The 25X Academy website. Static site built with Astro 7, plain CSS, GSAP and Lenis for motion. No forms, no tracking scripts.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321, live reload
npm run build      # builds to dist/
npm run preview    # serves dist/ exactly as it will run in production
npm run placeholders   # lists every [FILL] / [DECISION] still open
```

Needs Node 22.23 or newer (Node 24 recommended).

## Where things live

| Path | What |
|---|---|
| `src/data/site.ts` | Business details, links, navigation, John's stats and credentials. **Fill the placeholders here first** |
| `src/data/programs.ts` | Programs, workshop days, BuildAlong Hub phases, FAQ |
| `src/data/ideas.ts` | The 13 business tool ideas (one page each at /ideas/...) |
| `src/data/glossary.ts` | Glossary terms |
| `src/data/schema.ts` | schema.org structured data. Placeholders are left out automatically |
| `src/content/guides/*.md` | Guides. Add a new `.md` file with the same frontmatter and it gets a page, a card and a sitemap entry |
| `src/content/legal/*.md` | Privacy, Terms, Refund. **Source of truth** for the legal text (copied from `../legal/` on 2026-11-01) |
| `src/pages/` | One file per page |
| `src/scripts/motion.ts` | All animation. Content is in the HTML first; motion is added on top and switched off for "reduce motion" users |
| `src/styles/global.css` | Design tokens and shared components |
| `public/` | robots.txt, llms.txt, favicon, share image, `_headers` and `_redirects` for Cloudflare Pages |
| `og-src/` | HTML sources for the share image and app icon (rendered to PNG). Also the case-study cards used on vibecoding77.com (`case-study.html` + `case-studies.ts`; PNGs in `../website/case-study-images/`) |

Unfilled placeholders show on the page with a yellow striped highlight, so none can slip through to launch.

## Deploy to Cloudflare Pages (free)

25xacademy.com is already on Cloudflare (nameservers `elinore` and `nolan.ns.cloudflare.com`), so no DNS move is needed.

1. Push this folder to the GitHub repo `millenialninja/25XAcademy`.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick the repo.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. Environment variable: `NODE_VERSION` = `24` (the version the site is built and tested with locally).
5. Deploy. Check the `*.pages.dev` preview link.
6. When ready to go live: Pages project → **Custom domains** → add `25xacademy.com` and `www.25xacademy.com`. Cloudflare swaps the DNS records from the old Lovable site to Pages.
   - **Don't touch** `app.25xacademy.com` (TagMango) or the MX/TXT records (Google Workspace email).
7. Optional: turn on **Web Analytics** for the project (free, no cookies).

After launch: submit `https://25xacademy.com/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.

Old URLs from the Lovable site (/program, /apply, /about, /contact-us) redirect to their new pages via `public/_redirects`.
