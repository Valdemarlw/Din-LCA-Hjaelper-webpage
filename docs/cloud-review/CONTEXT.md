# Cloud review: shared context

Read this first in every cloud review session, then `CLAUDE.md` and `HANDOFF.md` in the repo root.

## The business

Din LCA Hjælper (DLH) sells complete, verified BR18 LCA calculations for Danish construction as a consulting service. The site is Danish, aimed at builders, architects, engineers and private house owners who need an LCA for a building permit. Live domain: https://dinlcahjælper.dk (punycode `xn--dinlcahjlper-edb.dk`). Owner: Valdemar.

Existing material worth reading before you judge anything: `design-brief.md`, `content-strategy.md`, `SEO_COMPETITOR_ANALYSIS.md`, `docs/BR18_CHECKER_SPEC.md`, `src/data/blogPosts.ts`, `public/llms.txt`, `public/llms-full.txt`.

## Hard rules

- `HANDOFF.md` commercial decisions and guardrails win over any recommendation from a skill. Do not change prices, service scope or positioning. If you think one of them is wrong, say so in the report, do not edit it.
- Never use the em dash character. Use a plain dash.
- Danish copy must read like a Danish professional wrote it. Run new or rewritten Danish text through the `dansk-humanizer` skill.
- Regulatory claims need a primary source (bygningsreglementet.dk, Social- og Boligstyrelsen, BUILD/AAU, LCAbyg, retsinformation.dk) with the date you checked it. No source, no claim.
- Firecrawl: follow `.claude/skills/firecrawl/rules/credits.md`. Budget for this session: at most 100 credits (Valdemar approved 100 per session, 300 across the first three review sessions, on 3 November 2026). Ask before going over. Check `firecrawl credit-usage` before and after, and report usage.
- Proof is behavioral: run `npm run lint`, `npm test` and `npm run build:prerender` before you push, and check changed pages in a real browser at 375px, 768px and 1280px (Chrome for Testing is at `$CHROME_PATH`; `@playwright/test` is a dev dependency).
- Work on your own branch, push it, and open a PR with the Create PR button (`gh pr create` is blocked in cloud sessions). Never merge.

## Tools in this environment

- Repo skills in `.claude/skills/`: impeccable (design, v4.8.0), redesign-existing-projects, firecrawl suite (search, scrape, map, crawl, deep-research, interact, read-docs), Mobbin skills (search, redesign-screen, best-practices, plain-writing; official mobbin/skills), Corey Haines marketing skills (ai-seo, copywriting, copy-editing, cro, site-architecture, content-strategy, competitors, product-marketing), dansk-humanizer. Design: frontend-design (Anthropic) and Emil Kowalski's design-engineering skills (emil-design-eng, remove-animations, review-animations, improve-animations, find-animation-opportunities, animation-vocabulary, break-ui).
- claude-seo v2.5.0 is installed by the environment setup script into `~/.claude/skills/seo*` (technical SEO, schema, GEO, local, sitemap, content). If `/seo` is not listed as a skill, read `~/.claude/skills/seo/SKILL.md` directly and follow it.
- Mobbin is a claude.ai connector (tools named like `search_screens`, `search_flows`). If no Mobbin tools are present, say so in the report and use Firecrawl on named reference sites instead.
- `firecrawl` CLI, authenticated through `FIRECRAWL_API_KEY`.

## Report

End with `docs/cloud-review/reports/<your-task>.md`: what you checked (scope and date), findings ranked by impact with evidence, what you changed, how you verified it, and what is left for Valdemar to decide. Write it in English; quote Danish site text as-is.
