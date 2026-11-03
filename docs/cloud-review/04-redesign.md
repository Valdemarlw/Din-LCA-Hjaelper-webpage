# Task 04: Full redesign

Read `docs/cloud-review/CONTEXT.md` first.

## Why

Valdemar's verdict on the current site (3 November 2026): it looks vibe-coded and generic, with no real character. Motion is on everything. The colours read as a default AI palette. The earlier design review (`reports/01-design.md`) only polished the conversion path, so visitors barely notice a difference. This task is a real redesign, not another polish pass.

What he likes and wants kept: the "how it works" process section (the connected steps with the optimisation loop). Keep its idea and content; it may be restyled to fit the new direction.

## Fixed

- Copy stays as it is on every page except the home page. On the home page, rewrite only where you find a clearly stronger idea (a sharper headline, a better structure for the argument). Every new Danish line goes through `copywriting` and `dansk-humanizer`, and repeats only claims the site already makes.
- Prices, service scope, regulatory facts and the `HANDOFF.md` guardrails do not change.
- Keep the logo mark and the name. Everything else in the visual system is open: palette, type, layout, components, imagery, motion.
- The portrait (`public/images/valdemar-wernblad.webp`, same as the VW Projects site) stays and should carry more weight. For a one-person consultancy the person is the strongest trust signal.
- Keep SEO and AEO intact: titles, meta, JSON-LD, prerendered routes, internal links.

## Steps

1. **See the current site.** Run it locally and screenshot every page type at 375 and 1280 px (the page list is in `01-design-review.md`). Read `design-brief.md` and `reports/01-design.md`.
2. **Load the design skills before you form an opinion:** `frontend-design`, `impeccable` (critique, then shape), `redesign-existing-projects`, `emil-design-eng`, and `remove-animations` for the motion audit. Use `review-animations` on whatever motion survives.
3. **Find references that are not the usual SaaS template.** Use Mobbin (load `search` and `best-practices` first) and Firecrawl. Look in three places:
   - Strong one-person and small-firm consulting and professional service sites (engineering, architecture, accounting, law, specialist advisors).
   - Danish and Nordic architecture, engineering and building-industry studios and publications, because that is the visitor's own visual world: drawings, sections, material specs, technical documentation.
   - Anything outside the category with a distinct, confident identity: editorial sites, product sites, print-like layouts, technical manuals, instrument interfaces.
   Collect 15-25 references. For each, note what makes it specific and what DLH could take from it. Firecrawl budget: at most 100 credits, per `CONTEXT.md`.
4. **Propose three distinct directions,** each grounded in the subject (BR18, LCA, building materials, construction documents, the regulatory report) rather than in generic "eco" or "SaaS" tropes. For each: a name, the idea in two sentences, palette, type pairing, layout logic, motion stance, the references it draws on, and a rendered home-page comp at 375 and 1280 px. Avoid green-on-cream, gradient heroes, cards with the same radius and shadow everywhere, and fade-in-on-scroll as a default.
5. **Pick the strongest direction and build it across the whole site:** design tokens, layout, components and every page type. Motion only where it explains something (the process loop is a candidate); remove the rest. Respect `prefers-reduced-motion`. Keep the bundle lean; framer-motion may go if motion no longer needs it.
6. **Review your own build adversarially** with `impeccable` critique, `review-animations` and `break-ui` on the forms and the BR18 checker. Fix what they find.

## Done means

- Branch `review/redesign` pushed and a PR opened (Create PR button). Never merge; merging to master deploys the live site.
- `docs/cloud-review/screenshots/redesign/` holds: before and after for every page type at 375 and 1280 px, and the three direction comps.
- Lint, tests and `npm run build:prerender` pass. Every page checked in a real browser at 375, 768 and 1280 px: no JS errors, no horizontal overflow, contact form and BR18 checker still work (checker prefill to the contact form included).
- Report at `docs/cloud-review/reports/04-redesign.md`: the references with links, the three directions and why you picked one, what changed per page, any home-page copy changes with old and new text, verification, Firecrawl credits used, and what Valdemar should decide (for example switching to one of the other directions).
