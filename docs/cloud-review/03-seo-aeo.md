# Task 03: SEO and AEO audit and fixes

Read `docs/cloud-review/CONTEXT.md` first.

## Goal

DLH ranks in Google and gets cited by AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude) for Danish LCA and BR18 questions.

## Steps

1. Technical audit with claude-seo (`/seo`, `seo-technical`, `seo-schema`, `seo-sitemap`, `seo-local`) against the live domain and the prerendered build: indexability, canonicals, sitemap, robots, hreflang if relevant, Core Web Vitals risks, structured data validity, internal linking, titles and descriptions.
2. AEO/GEO audit with `ai-seo` and claude-seo `seo-geo`: answer-first structure, FAQ blocks, citable facts, entity clarity, `llms.txt`/`llms-full.txt`/`ai.txt` quality. Use `firecrawl-search` to test which sources currently answer 10-15 core Danish queries (for example "hvornår er LCA lovpligtigt", "LCA beregning pris", "grænseværdi CO2 BR18 2025", "LCA sommerhus") and who gets cited.
3. Competitor gap: update `SEO_COMPETITOR_ANALYSIS.md` findings with `competitors` and `firecrawl-map` on the top 3-5 Danish competitors. Propose missing pages and topic clusters (`content-strategy`, `site-architecture`).
4. Implement safe fixes: metadata, schema, internal links, FAQ structure, llms files, sitemap. Do not change regulatory claims (task 02 owns them) or pricing (`HANDOFF.md`).
5. New content ideas go in the report as briefs, not as published pages.

## Done means

- Branch `review/seo-aeo` pushed and a PR opened.
- Report at `docs/cloud-review/reports/03-seo-aeo.md`: findings ranked by impact, what you fixed, the query/citation test table, and a prioritised content plan.
- Lint, tests and prerender build pass; structured data validated.
