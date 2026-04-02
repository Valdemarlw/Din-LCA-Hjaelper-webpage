# Handoff: Din LCA Hjælper — SEO Content Build-Out (Phase 1: Blog)

## What was done

A complete SEO & AI SEO audit was performed on dinlcahjælper.dk. The audit included:

1. **NotebookLM research** — 42 sources on SEO, AI SEO (GEO/AEO), llms.txt, Claude Code SEO workflows were interrogated to build a comprehensive knowledge base
2. **Competitor research via Firecrawl** — scraped and analyzed 5 Danish LCA competitors (CALCA, Energiberegner, DMR, NBS Nordic, NIRAS). Full report at `SEO_COMPETITOR_ANALYSIS.md`
3. **AI discovery files created** — `public/llms.txt`, `public/llms-full.txt`, `public/ai.txt` following the llms.txt v1.1.1 specification
4. **robots.txt updated** — added 7 additional AI bots (Applebot, Amazonbot, Bytespider, cohere-ai, Meta-ExternalAgent, Diffbot, YouBot) + AI file references
5. **sitemap.xml updated** — added `<lastmod>` dates
6. **Structured data enhanced** — upgraded to ProfessionalService + LocalBusiness dual type, added Person schema (Valdemar), BreadcrumbList, hasOfferCatalog, expanded FAQPage to 10 questions
7. **Body text optimized for AI** — declarative entity paragraph in Hero (first 30% rule), FAQ answers always in DOM (was conditional rendering, invisible to AI), 3 new recommendation-query FAQs, expanded Footer entity block
8. **Title tag optimized** — keyword-first format, 46 chars

All changes are uncommitted on the `master` branch. Build verified (`npm run build` succeeds, JSON-LD validates).

## What comes next — the full plan

The detailed next-steps plan is at: `.claude/plans/jazzy-exploring-yao.md`

**We are starting Phase 1: Blog / Educational Content Pages.** This is the single biggest content gap — Energiberegner dominates informational search with educational articles, and DHL has zero blog content.

### Phase 1 blog posts (priority order):
1. "Hvad er en LCA-beregning? Alt du skal vide" — targets the #1 informational keyword
2. "Nye klimakrav 2025: Hvad betyder det for dit byggeri?" — timely, CALCA owns this today
3. "A4 og A5: Dokumentation af byggeprocessens CO₂" — our unique angle, links to A45
4. "LCA-beregning for sommerhuse — udfordringer og løsninger" — long-tail, strictest CO₂ limits
5. "Grænseværdier for CO₂ i byggeri: Komplet oversigt" — reference content

### What needs to be built:
- Blog routing infrastructure (`/blog` index + `/blog/[slug]` article pages)
- Reusable blog post template component
- Article schema markup per post
- Blog index page with article cards
- Navbar update (add "Viden" or "Blog" link)
- Sitemap, llms.txt, prerender updates for new routes
- The actual content for each article (800-1,200 words each, in Danish)

## Skills to use

**Run these skills in this order when starting Phase 1:**

### 1. `/product-marketing-context` (FIRST)
Set up the positioning, ICP, and messaging context document. This is referenced by other skills and ensures consistency. Key inputs:
- Target: Small Danish architecture firms (1-5 people) needing LCA calculations
- Positioning: Price-competitive specialist (fra 3,500 kr), personal service, includes A45
- Language: Danish. All content must be in Danish.
- Competitors: CALCA, Energiberegner, DMR, NBS Nordic, NIRAS

### 2. `/content-strategy`
Plan the blog content strategy: topic clusters, keyword mapping by funnel stage, publishing order, internal linking plan between articles and existing pages.

### 3. `/site-architecture`
Plan URL structure for blog (`/blog/hvad-er-lca-beregning` vs `/viden/...`), navigation placement, breadcrumb structure, and how blog pages connect to existing service/contact pages.

### 4. `/frontend-design`
Build the blog infrastructure: index page, article template, responsive card layout. Must match existing design (navy + teal color scheme, Inter font, Tailwind CSS, Framer Motion animations).

### 5. `/copywriting` (per article)
Write each blog article in Danish. Each article needs:
- 800-1,200 words
- Clear H1 with target keyword
- Answer-shaped opening paragraph (declarative, factual — for AI extraction)
- Logical H2/H3 structure
- 3-5 unique FAQ questions per article (different from homepage FAQs)
- Internal links to homepage services, contact page, and other blog posts
- CTA at bottom linking to `/kontakt`

### 6. `/ai-seo` (per article)
After writing, optimize each article for AI search engines:
- Ensure entity clarity and answer-shaped paragraphs
- Add to llms.txt and llms-full.txt
- Verify content passes the "first 30% rule" (key facts in top 30%)
- Check for AI cannibalization with existing pages

### 7. `/schema-markup` (per article)
Add Article schema, BreadcrumbList, and unique FAQPage schema per blog post.

### 8. `/seo-audit` (final check)
Run a final SEO audit after all blog posts are live to verify:
- No duplicate content/cannibalization issues
- All pages indexed
- Schema validates
- Internal linking is healthy

### 9. `/copy-editing` (final polish)
Review all copy for consistency, tone, and quality in Danish.

## Important context

- **Language:** Everything is in Danish. The site targets Danish architects.
- **Focus on DHL only.** A45 has its own website (a45lca.dk). The DHL site should link to A45 where relevant but not deeply integrate its content. The A4/A5 blog post is the natural connection point.
- **Pricing:** Advertised "fra 3.500 kr" is the minimum. Typical charges are 4,000-5,000 kr. Don't over-promise on pricing.
- **Tone:** Professional but accessible. Not corporate. Not student-y. Personal — it's Valdemar behind the business.
- **Tech stack:** React 19 + TypeScript + Vite + Tailwind CSS 4.2 + Framer Motion + react-helmet-async. Deployed on Vercel with prerendering.
- **Existing content:** Homepage (7 sections), About page, Contact page. No blog yet.

## Skills we might want to add

The current skill set covers most needs, but consider adding:
- A **Danish content writing / localization** skill if the copywriting skill produces English-patterned Danish
- A **blog/article writing** skill optimized for long-form educational SEO content (different format than landing page copy)
- An **internal linking** skill for managing cross-page link architecture as the site grows

## Later phases (after blog)

Per the plan file:
- **Phase 2:** Project type pages (`/lca-beregning/enfamiliehus`, etc.) — use `/programmatic-seo`
- **Phase 3:** Reference projects page — use `/copywriting` + `/frontend-design`
- **Phase 4:** A45 connection refinement
- **Phase 5:** Ongoing SEO maintenance + future ideas (glossary, comparison pages, calculator)
