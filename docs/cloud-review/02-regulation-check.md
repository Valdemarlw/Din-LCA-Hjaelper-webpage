# Task 02: Regulation and fact check of all content

Read `docs/cloud-review/CONTEXT.md` first.

## Goal

Every regulatory and factual claim on the site is correct as of today, with a primary source. A wrong limit value or date on an LCA consultant's site is a trust killer.

## Scope

- All blog posts in `src/data/blogPosts.ts` (9 posts, including `klimakrav-2025`, `graensevaerdier-co2`, `hvornaar-er-lca-lovpligtig`, `a4-a5-dokumentation`, `lca-sommerhuse`).
- Glossary terms, FAQ, project type pages, BR18 checker logic and copy (`docs/BR18_CHECKER_SPEC.md`), `public/llms.txt`, `public/llms-full.txt`, `public/ai.txt`, structured data.

## Steps

1. Extract every regulatory or numeric claim: limit values (kg CO2e/m2/year) per building type and size, effective dates, area thresholds, which modules are required (A1-A3, A4, A5, B4, B6, C3, C4 and so on), reference study period, documentation requirements, upcoming tightenings, LCAbyg versions and EPD rules.
2. Verify each claim against primary sources using `firecrawl-search`, `firecrawl-scrape` and, for anything contested or recently changed, `firecrawl-deep-research`. Record source URL and date checked.
3. Fix wrong or outdated claims in place. Where the law changed, update the post and its `date`/updated metadata. Keep the BR18 checker logic consistent with the copy; if logic must change, add or update a test first.
4. Flag claims you could not verify instead of guessing.
5. Rewritten Danish text goes through `dansk-humanizer`.

## Done means

- Branch `review/regulation` pushed and a PR opened.
- Report at `docs/cloud-review/reports/02-regulation.md`: a table of every claim with status (correct, fixed, unverified), old text, new text and source with date.
- Lint, tests and prerender build pass. Changed pages checked in a browser.
