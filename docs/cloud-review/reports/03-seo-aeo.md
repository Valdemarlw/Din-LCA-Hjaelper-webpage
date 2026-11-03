# 03 SEO and AEO audit

Date: 3 November 2026. Branch: `review/seo-aeo`, stacked on `review/regulation` (PR #16). Regulatory facts come from `02-regulation.md` and were not changed.

## Scope

- Technical audit of the prerendered build (`npm run build:prerender`, 47 routes) and the live domain https://xn--dinlcahjlper-edb.dk: indexability, canonicals, titles and descriptions, sitemap, robots, redirects, structured data, internal links, Core Web Vitals risks. Hreflang is not relevant (Danish only, one locale).
- AEO/GEO: answer structure, FAQ blocks, entity data, `llms.txt`, `llms-full.txt`, `ai.txt`.
- Query test: 14 core Danish queries through Firecrawl search (country DK, top 10).
- Competitors: Firecrawl map of nordiclca.dk, lcapartner.dk, lca-beregninger.dk, calca.dk, energiberegner.dk and vaerdibyg.dk, plus 3 scraped pages. Findings were added to `SEO_COMPETITOR_ANALYSIS.md`.
- Skills used as checklists: claude-seo (`seo-technical`, `seo-schema`, `seo-sitemap`, `seo-geo`, `seo-local`), `ai-seo`, `competitors`, `content-strategy`, `site-architecture`, `firecrawl-search`/`-map`/`-scrape`. Mobbin wasn't needed for this task.

**Limitation:** Firecrawl search returns web SERPs, not live answers from ChatGPT, Perplexity or AI Overviews. The query table below shows which pages rank in the top 10. That's the pool answer engines retrieve from, but it doesn't prove who gets cited. To test real citations, run the same queries by hand in ChatGPT search and Perplexity, or use a paid tracker. Neither is set up here.

## Firecrawl usage

4.966 credits before, 4.929 after: **37 credits** used of the 100 budget (14 searches at 2 credits, 6 maps, 3 scrapes).

## Query and citation test

DLH position = position of dinlcahjælper.dk in Google DK top 10 via Firecrawl, 3 November 2026.

| # | Query | DLH position | Top 3 results | Commercial LCA firms in top 10 |
|---|---|---|---|---|
| 1 | hvornår er LCA lovpligtigt | #8 (/blog/hvornaar-er-lca-lovpligtig) | sbst.dk/byggeri/baeredygtigt-byggeri/national-strate<br>bygningsreglementet.dk/tekniske-bestemmelser/11/brv/bygningers-klim<br>bygogbaeredygtighed.dk/hvad-er-lca-byggeri | nbsnordic.dk, loftconsulting.dk |
| 2 | LCA beregning pris | not in top 10 | lca-beregninger.dk<br>lcapartner.dk<br>calceku.dk/lca-beregninger | lca-beregninger.dk, lcapartner.dk, calceku.dk, nordiclca.dk, pmri.dk, calca.dk |
| 3 | grænseværdi CO2 BR18 2025 | not in top 10 | bygningsreglementet.dk/tekniske-bestemmelser/11/brv/bygningers-klim<br>bygningsreglementet.dk/tekniske-bestemmelser/11/krav/297_298<br>sbst.dk/byggeri/baeredygtigt-byggeri/national-strate | - |
| 4 | LCA sommerhus | not in top 10 | bolius.dk/nyt-sommerhus-co2-krav-og-lca-beregning-1002<br>planet-huse.dk/byg-sommerhus/byggeri-i-trae<br>lykkeskovhuse.dk/lca-beregning-sommerhus | nordiclca.dk |
| 5 | LCA beregning enfamiliehus | not in top 10 | hybelhuse.dk/blog/lca<br>huscompagniet.dk/byg-med-os/hvad-er-co2-aftrykket-paa-dit-nye<br>bygningsreglementet.dk/tekniske-bestemmelser/11/brv/bygningers-klim | nordiclca.dk, energiberegner.dk |
| 6 | hvad er en LCA beregning | not in top 10 | niras.dk/ordbog/livscyklusvurdering-lca<br>molio.dk/viden/nyheder/heisings-klummer/heisings-klum<br>calca.dk/lca-beregninger | niras.dk, calca.dk, nbsnordic.dk, energiberegner.dk, nordiclca.dk |
| 7 | LCA rådgiver | not in top 10 | nordiclca.dk<br>norconsult.dk/ydelser/baeredygtighedsraadgivning/lca<br>sbst.dk/byggeri/alt-om-epder/artikler/vaelg-den-rigt | nordiclca.dk, norconsult.dk, sustainbusiness.dk, niras.dk, djursconsult.dk, calca.dk |
| 8 | LCAbyg hjælp | #3 (/sammenligninger/din-lca-hjaelper-vs-lcabyg) | lcabyg.dk<br>vbn.aau.dk/files/391626717/Brugervejledning_til_LCAbyg_<br>xn--dinlcahjlper-edb.dk/sammenligninger/din-lca-hjaelper-vs-lcabyg | - |
| 9 | A4 A5 LCA byggeplads dokumentation | #10 (/blog/a4-a5-dokumentation) | molio.dk/kurser/kursusemner/baeredygtigt-byggeri/lca-<br>acembee.com/blog/lca-a4-rapportering-for-byggepladser-en<br>sbst.dk/Media/638731490173267243/VCBK_Guide_Byggepro | acembee.com, nullcarbon.dk |
| 10 | klimakrav bygningsreglement 2025 | not in top 10 | bygningsreglementet.dk/tekniske-bestemmelser/11/brv/bygningers-klim<br>bygningsreglementet.dk/tekniske-bestemmelser/11/brv/bygningers-klim<br>mazanti.dk/nyheder/skaerpede-klimakrav-i-bygningsreglem | - |
| 11 | LCA tilbygning krav | not in top 10 | dhv.dk/nyheder/her-er-de-nye-klimkrav-fra-1-juli-20<br>bygningsreglementet.dk/tekniske-bestemmelser/11/krav/297_298<br>sbst.dk/byggeri/baeredygtigt-byggeri/national-strate | - |
| 12 | LCA færdigmelding dokumentation | not in top 10 | bygningsreglementet.dk/media/k2jfnwhf/vejledning-dokumentation-af-b<br>sbst.dk/Media/638731489052141468/VCBK_LCA-publikatio<br>vaerdibyg.dk/viden/saadan-gennemfoerer-du-lca-processen | acembee.com, nullcarbon.dk, realtimelca.com |
| 13 | BR18 LCA krav 250 m2 tilbygning | #10 (/blog/hvornaar-er-lca-lovpligtig) | bygningsreglementet.dk/tekniske-bestemmelser/11/krav/297_298<br>bygningsreglementet.dk/tekniske-bestemmelser/11/brv/bygningers-klim<br>bygningsreglementet.dk/tekniske-bestemmelser/11/brv/bygningers-klim | - |
| 14 | grænseværdier 2027 2029 klimakrav byggeri | not in top 10 | sbst.dk/byggeri/baeredygtigt-byggeri/videncenter-for<br>bygogbaeredygtighed.dk/nye-klimakrav-til-byggeriet-fra-2025l<br>strateginetvaerket.dk/wp-content/uploads/2024/09/Klimakrav-til-Ren | - |

Summary: DLH is in the top 10 for 4 of 14 queries, and all four are informational or LCAbyg-related. It isn't there for any of the money queries ("LCA beregning pris", "LCA sommerhus", "LCA beregning enfamiliehus", "LCA rådgiver"). sbst.dk (11/14) and bygningsreglementet.dk (8/14) own the regulation queries, which is expected and hard to beat. The price query is won by two small competitors that put prices on a dedicated page or the homepage (lca-beregninger.dk "Parcelhuse fra 5.000 kr", lcapartner.dk "Fast pris fra 4.500 kr."). DLH's price content sits in a blog post.

## Findings ranked by impact

1. **No visibility for commercial queries (high).** See the table above. Main causes: (a) the price answer lives in a blog post (`/blog/lca-beregning-pris`), not a top-level price page; (b) the service pages had few internal links (finding 2); (c) "LCA sommerhus" and "LCA beregning enfamiliehus" are crowded by house builders (lykkeskovhuse.dk, hjhuse.dk, huscompagniet.dk) and bolius.dk. Fix: content plan items 1-3, plus links from the existing articles (done).
2. **Weak internal linking to the service pages (high, partly fixed).** Counting in-content links inside `<main>`, glossary terms had 10-26 inbound links, but `/lca-beregning/enfamiliehus` had 4, `/erhverv` 4, `/sommerhus` 6 and the BR18-tjekker 4. Three of the regulation posts (`klimakrav-2025`, `graensevaerdier-co2`, `hvornaar-er-lca-lovpligtig`) didn't link to any service page. After the fix: enfamiliehus 7, sommerhus 7, erhverv 6, tjekker 5.
3. **`www.` serves a duplicate host (medium, Valdemar).** `https://www.xn--dinlcahjlper-edb.dk/` returns 200 with the full site instead of a 308 to the apex domain. Every page's canonical points to the apex, which limits the damage, but the www domain should redirect in Vercel (Project, Settings, Domains, set www to redirect to the apex domain). Not a code change.
4. **Duplicate titles (medium, fixed).** `/blog` and `/viden` both used "Viden om LCA-beregning | Din LCA Hjælper". `/blog/lca-sommerhuse` and `/lca-beregning/sommerhus` both used "LCA-beregning for sommerhuse | Din LCA Hjælper", so the article competed with the service page.
5. **`llms.txt` behind the corrected facts (medium, fixed).** Its FAQ said LCA is required for "større tilbygninger", the same error that PR #16 fixed elsewhere (commercial extensions are covered at any size). The file also didn't list the BR18-tjekker, the `/lca-beregning` hub or the reference projects, and had no freshness date. Now aligned with `llms-full.txt` line 68 and the site FAQ, word for word on the facts.
6. **Articles not tied to the author entity (medium, fixed).** Article JSON-LD named an author and publisher with no `@id`, so they weren't linked to the sitewide `#person` and `#business` entities in `index.html`. It also had no `image` and no `inLanguage`. The article pages showed no byline, and no updated date even when `dateModified` had changed. That date mismatch matters to Google, and a missing byline weakens E-E-A-T for regulation content.
7. **Thin About page (medium, Valdemar).** `/om-os` has 248 words, no credentials, no project count and no years of experience. It is the `url` of the author on every article. It now has `AboutPage` schema linking it to the person and the business, but the content needs Valdemar's facts (education, number of LCAs done, tools, LinkedIn profile URL for `sameAs`).
8. **Core Web Vitals risk on mobile (medium, design/dev).** Content is prerendered, so LCP should be fine. The risk is INP/TBT: every route loads one 668 KB JS bundle (195 KB gzip) plus an 81 KB gzip analytics chunk. There's no route-level code splitting. The header logos are 1600 px PNGs (80-89 KB each) shown about 32 px tall. These are visual assets, so I didn't touch them; the design session or a dev task should resize them or switch to SVG/WebP and split routes with `React.lazy`. Measure with PageSpeed Insights after deploy.
9. **Homepage H1 is generic (low, Valdemar/design).** "LCA-beregning der bare virker" contains the keyword but not BR18 or the audience. The title tag carries the intent ("LCA-beregning til BR18 | Typisk 5.000-7.000 kr"), so the impact is small. Left alone because headline copy belongs to the design session.
10. **Mixed host spelling (low, no change).** Canonicals and `og:url` use the Unicode host, while the sitemap, `og:image` and robots `Sitemap:` use punycode. Google normalises IDNs, so this is harmless. Pick one form if the canonicals are ever refactored.
11. **Sitemap `lastmod` is one date for all 47 URLs (low).** It comes from the last git commit to `src/data`, `src/pages` or `src/components`. Per-page dates (for example `post.updated`) would be more useful to crawlers. Not changed, since a wrong per-page date is worse than a global one.
12. **Schema types without rich results (info).** `HowTo` (checker) has had no rich result since 2023. `FAQPage` rich results are limited to government and health sites. Both are valid and still useful to non-Google answer engines, so I kept them.
13. **Unverified statements in llms files (info, Valdemar).** `llms.txt` says that without LCA at færdigmelding "Byggeriet betragtes som ulovligt", and calls generic data "konservative". Neither is covered by a primary source in report 02 (see rows 48 and 50 there). I didn't change them. Source them or drop them.

What already works well and needs no change: one H1 per page, unique descriptions on all 47 routes, self-referencing canonicals, a clean 404, 308 for trailing slashes and old URLs, HTTPS with HSTS, a punycode sitemap with all 47 routes, robots that welcome AI crawlers, answer-first "Kort svar" sections and FAQ blocks in the articles, and valid JSON-LD throughout.

## What I changed

| File | Change |
|---|---|
| `src/data/blogPosts.ts` | Added internal links in four posts to `/lca-beregning/enfamiliehus`, `/sommerhus`, `/erhverv` and the BR18-tjekker, mostly by linking existing words. One new sentence in `graensevaerdier-co2`: "Er du i tvivl om, hvilken grænse der gælder for dit projekt? Slå det op i BR18-tjekkeren." New `metaTitle` for `lca-sommerhuse`: "Sommerhus-LCA: sådan holder du grænsen" (58 characters with suffix, within the 60 limit tested in `seoTitles.test.ts`). No facts changed. |
| `src/pages/BlogPostPage.tsx` | Article JSON-LD: author `@id` `#person`, publisher `@id` `#business`, `image`, `inLanguage`. Visible line under the H1: "Af Valdemar Løvschal Wernblad. 2. april 2026, opdateret 3. november 2026. 5 min læsning" (the updated date shows only when `updated` is set). Same element and styling as before. |
| `src/pages/BlogPage.tsx` | Title "Artikler om LCA-beregning og BR18 \| Din LCA Hjælper" (was the same as `/viden`). |
| `src/pages/AboutPage.tsx` | `AboutPage` JSON-LD with `about` pointing to `#business` and `mainEntity` to `#person`. |
| `index.html` | Business: CVR as `identifier` (45 80 00 59, same as the footer). Person: `url` set to `/om-os`. |
| `public/llms.txt` | Freshness line, corrected "Hvornår er LCA-beregning lovpligtigt?" answer (from `llms-full.txt` and `faqs.ts`), links to the `/lca-beregning` hub, the BR18-tjekker and the reference projects. |
| `public/llms-full.txt` | Freshness line and a BR18-tjekker link. |
| `public/ai.txt` | Freshness note. |
| `SEO_COMPETITOR_ANALYSIS.md` | New dated section with the current SERP competitors and the gap against lcapartner.dk. The April price (3.500 kr) and A45 recommendations are marked as superseded by `HANDOFF.md`. |

Not changed on purpose: prices, service scope, regulatory statements, layout, visuals and headlines.

## Verification

- `npm run lint`: pass. `npm test`: 11 files, 49 tests pass. `npm run build:prerender`: pass, all 47 routes rendered (after the Playwright browser symlink, see below).
- Rerunning my audit script on `dist/`: no duplicate titles, no duplicate descriptions, all JSON-LD parses.
- Structured data: sent the JSON-LD of one page per template (home, article, about, checker, FAQ, glossary term, glossary index, comparison, project type, reference project) to validator.schema.org. 10 of 10 returned **0 errors and 0 warnings**.
- Browser: Playwright against `vite preview` at 375, 768 and 1280 px on `/blog/klimakrav-2025`, `/blog/a4-a5-dokumentation`, `/blog/hvornaar-er-lca-lovpligtig`, `/blog/graensevaerdier-co2`, `/blog` and `/om-os`. `scrollWidth - innerWidth = 0` everywhere, the new titles apply, the byline shows the updated date only on corrected posts, and the new links are present. Screenshots of the byline at 375 and 1280 px show it wraps cleanly under the H1.
- Environment: `npx playwright install chromium-headless-shell` didn't give a matching build. The prerender ran after `ln -s /opt/pw-browsers/chromium_headless_shell-1243 /opt/pw-browsers/chromium_headless_shell-1208`, the same workaround as in report 02.

## Content plan (briefs, not published)

Ordered by expected impact for the effort. Facts must come from report 02 and prices from `HANDOFF.md`. Run all Danish copy through `dansk-humanizer`.

1. **Price page at `/lca-beregning/pris`** (or `/priser`). Target: "LCA beregning pris", "LCA pris", "hvad koster LCA". Answer-first: "Et komplet enfamiliehus eller sommerhus koster typisk 5.000-7.000 kr ekskl. moms." Then a price table by building type (the same rows as the current blog post), what's included (A4/A5, update at færdigmelding), LCA Komplet vs. LCA Direkte (up to 1.000 kr off), and a link to the BR18-tjekker estimate. `Service` + `Offer` schema with `priceSpecification`. Keep the blog post as the long explainer and link the two both ways. Why: both winners of this query show prices on a dedicated commercial page.
2. **`/lca-beregning/raekkehus`** (rækkehus, kædehus, dobbelthus). Target: "LCA rækkehus", "LCA dobbelthus". Limit 6,7 (§ 298 stk. 1). Price: "fra 8.000 kr, manuelt tilbud" only, with no formula (`HANDOFF.md`). lcapartner.dk has this page; DLH doesn't.
3. **`/lca-beregning/tilbygning`**. Target: "LCA tilbygning krav", "BR18 LCA krav 250 m2 tilbygning" (DLH is only #10 today, through a blog post). Content: the 250 m² rule applies only to houses and holiday homes (§ 297 stk. 3), all commercial and apartment-building extensions are covered, and the extension follows the limit for its own use (§ 298 stk. 3). Add a worked example and link to the checker.
4. **Article: "LCA ved færdigmelding: hvad skal kommunen have?"** Target: "LCA færdigmelding dokumentation" (no DLH today). Source: Dokumentationsvejledning 2025 (S4 in report 02). Checklist format, then how DLH updates A4/A5 with recorded site use. Links to `a4-a5-dokumentation`.
5. **Expand `/om-os`** for E-E-A-T. Valdemar's background, number of calculations, tools (LCAbyg), a photo, LinkedIn. Add `sameAs` to the Person in `index.html` once the profile URL is known.
6. **Article: "Hvilke materialer giver mest CO₂ i et enfamiliehus?"** Use DLH's own reference-project data (Agavevej: roof, ground slab and foundation 72 %; Ternedalen's journey from 6,88 to 3,839). Original numbers are what answer engines quote, and only DLH has them. lcapartner.dk has a generic version (`/materialer-co2-byggeri`).
7. **Later:** a dedicated piece on the 2027/2029 tightening once SBST's targets are adopted (the section in `graensevaerdier-co2` covers it for now), and an article on "LCA-rapport: hvad indeholder den?".

Topic clusters: (A) Krav and grænseværdier, hub `graensevaerdier-co2`. (B) Pris and service by building type, hub `/lca-beregning`, adding the price page, rækkehus and tilbygning. (C) Proces and dokumentation, hub `a4-a5-dokumentation`, adding the færdigmelding article. The glossary supports all three. Every article should link to at least one service page and the checker, which is the pattern applied in this branch.

## Left for Valdemar

1. In Vercel, redirect `www.dinlcahjælper.dk` to the apex domain (finding 3).
2. Decide on the content plan, starting with the price page, rækkehus and tilbygning (items 1-3).
3. Send facts for `/om-os` and your LinkedIn profile URL (finding 7).
4. Source or remove "Byggeriet betragtes som ulovligt" and "konservative" generic data in `llms.txt` (finding 13).
5. Give the design session the CWV items: logo PNG size and route code splitting (finding 8).
6. Optional: create a Google Business Profile as a service-area business with no public address, which could help "LCA rådgiver" queries. The current `LocalBusiness` schema has no street address, which is fine for a service-area business.
