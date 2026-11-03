# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: small Danish architect and advisor firms (1-5 people) without in-house LCA competence, who need a BR18 LCA for a building permit and want it handled by someone reliable. Confirmed by Valdemar, 3 November 2026.

Secondary: engineers, builders and private house or summer-house owners who need an LCA for their permit.

## Product Purpose

Din LCA Hjælper sells complete, verified BR18 LCA calculations as a consulting service, from early calculation to a report the municipality accepts, updated at completion with final quantities and recorded site consumption. Success is a quote or contact request.

## Positioning

One named specialist, Valdemar Løvschal Wernblad, does the whole calculation, including A4 and A5, at a transparent price: typically 5,000-7,000 DKK excl. VAT for a detached house or summer house. The visitor gets a fixed quote within 24 hours of sending drawings.

## Operating Context

Visitors work with drawings, sections, quantity takeoffs, material specs, EPDs and permit documents. They meet the site while preparing a building permit or færdigmelding, often under deadline. Many prefer to call.

## Capabilities and Constraints

- Free BR18 checker (`/vaerktoejer/br18-tjekker`) that says whether an LCA is required, the limit value and an indicative price, and prefills the contact form.
- Contact form via Web3Forms; no file upload.
- Static React/Vite site, prerendered for crawlers; Vercel deploy from master.
- Prices, scope and guardrails in `HANDOFF.md` are fixed. Regulatory claims need a primary source.

## Brand Commitments

- Name "Din LCA Hjælper" and the approved logo artwork in `public/brand/` stay. The palette around it is open; the logo green does not have to remain a UI colour (Valdemar, 3 November 2026).
- The portrait `public/images/valdemar-wernblad.webp` stays and should carry weight.
- Danish copy, professional and plain. No em dashes.
- Do not mention the deferred software brand.

## Evidence on Hand

- Reference projects with real numbers in `src/data/referenceProjects.ts`.
- Blog, glossary, project-type and comparison content in `src/data/`.
- No testimonials, client logos or press. Do not invent them.

## Product Principles

- The person is the proof: a one-person consultancy sells trust in Valdemar.
- Show the work the way the visitor's own documents show it: numbers, limits, units, sources.
- Price and next step are never more than a glance away.
- Regulatory facts are exact and sourced, never rounded into marketing.
