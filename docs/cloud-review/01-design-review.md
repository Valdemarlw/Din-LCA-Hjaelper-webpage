# Task 01: Design and conversion review

Read `docs/cloud-review/CONTEXT.md` first.

## Goal

Make the DLH site look and convert like a top-tier B2B service site, without losing what already works. The main conversion is a quote or contact request for an LCA calculation.

## Steps

1. Run the site locally (`npm ci && npm run dev`) and screenshot every page type at 375px and 1280px: home, project types, a project type, reference projects, BR18 checker, comparison, FAQ, glossary, blog index, a blog post, about, contact.
2. Use the `impeccable` skill (critique and audit) and `redesign-existing-projects` to review hierarchy, typography, spacing, colour, motion, accessibility and responsive behaviour. Use `cro` for the conversion path (home to quote, calculator, contact form).
3. Use Mobbin (load the `search` and `best-practices` skills first; use `redesign-screen` for concrete before/after proposals) for 5-10 strong references: B2B service and consulting landing pages, pricing/quote flows, calculators, trust sections. Note what each reference does better and why it applies here. Fall back to Firecrawl scrapes of named sites if Mobbin is unavailable.
4. Rank findings by expected impact on trust and conversion. Implement the top improvements that are clearly safe (layout, hierarchy, spacing, contrast, CTA clarity, mobile issues). Keep the existing brand font and colours unless a finding shows they hurt readability.
5. Do not change prices, service scope or copy claims covered by `HANDOFF.md`. Copy edits go through `copywriting` and `dansk-humanizer`.

## Done means

- Branch `review/design` pushed and a PR opened.
- Before/after screenshots at 375px and 1280px for every changed page, committed under `docs/cloud-review/screenshots/design/`.
- Lint, tests and prerender build pass.
- Report at `docs/cloud-review/reports/01-design.md` with the larger redesign ideas you did not implement, each with its reference.
