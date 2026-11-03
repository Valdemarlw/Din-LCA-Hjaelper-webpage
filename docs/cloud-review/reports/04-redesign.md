# 04 Full redesign

Date: 3 November 2026. Branch `review/redesign`, based on master at `fd16d6e`.

## Scope and method

- Screenshotted every page type at 375 and 1280 px from the prerendered build, before and after: home, viden, project types, a project type, reference projects, a reference project, BR18 checker, comparison, FAQ, glossary, a glossary term, blog index, a blog post, about, contact, privacy and 404. They are in `docs/cloud-review/screenshots/redesign/{before,after}/` (2x JPEG, full page).
- Skills loaded before forming an opinion: `frontend-design`, `impeccable` (context, init, new-work, craft floor, detect, finish reviewer), `redesign-existing-projects`, `emil-design-eng`, `remove-animations`, `review-animations`, `break-ui`, Mobbin `best-practices` and `search`, `firecrawl` with its credit rules, and `dansk-humanizer` for the new Danish lines. Emil Kowalski's skills were already vendored in `.claude/skills/` (MIT), so nothing was fetched from GitHub.
- `PRODUCT.md` was written with Valdemar's answers (architects first; the logo stays, the palette around it is open).
- Directions were decided with Valdemar in five rounds, not by me alone. The brief asked for three directions and my pick. Valdemar rejected the first six, steered the next ones, and chose the final palette and headline typeface himself.

## References (21 sites, plus 26 Mobbin hero and calculator sections in round 5)

One-person and small-firm services, and specialist sites:

1. [The Performance Lab, hero](https://mobbin.com/sites/sections/ac1d73d9-645a-431f-b848-170d641673b5) (Mobbin). Its method tabs read like instrument channels. Takeaway: show the method, not adjectives.
2. [Trawelt, hero and process](https://mobbin.com/sites/sections/07e71cd4-4d6a-4ffc-b583-6e9484302cd6) (Mobbin). A boutique consultancy with a printed-ticket identity, using huge step numerals only where the order matters.
3. [Kalstore, meet the founder](https://mobbin.com/sites/sections/5e1e6047-eef1-417c-b42b-c7ab44205e35) (Mobbin). A portrait beside a large statement in one colour block. This became the Person section idea.
4. [incident.io, founders' note](https://mobbin.com/sites/sections/67e11461-af20-4b7e-8e9a-8f0cdc669a8d) (Mobbin). A personal note with a small photo and signatures. Takeaway: a named person beats a team photo.
5. [Craft Agency, process](https://mobbin.com/sites/sections/698886b8-377c-40e9-97e1-767a59eb9f28) (Mobbin). Process steps as a quiet list with numerals in one accent.
6. [Webb Yates Engineers](https://www.webbyates.com) (Firecrawl). An engineering practice that leads with its project. Takeaway: show a real case.

Danish and Nordic building world:

7. [Materialepyramiden](https://www.materialepyramiden.dk) (Firecrawl). Materials by CO₂ in their own photos. This drove rounds 1 and 2.
8. [Bygningsreglementet.dk](https://bygningsreglementet.dk) (Firecrawl). The visitor's own regulation: numbered chapters, § references and brick red. This is where the § 297-298 labels in the hero come from.
9. [LCAbyg](https://www.lcabyg.dk) (Firecrawl). The tool category this service sits next to: dark green with a dashboard. It showed what to avoid looking like.
10. [Arkitekten](https://www.arkitektforeningen.dk/arkitekten) (Firecrawl). The architects' own publication: cobalt and a confident serif. It is one of the reasons for a serif headline.
11. [Vandkunsten](https://vandkunsten.com) (Firecrawl). Large statement typography with a real team photo.
12. [Lendager](https://lendager.com) (Firecrawl). Material reuse told through photography.
13. [Henning Larsen](https://www.henninglarsen.com) (Firecrawl). The Nordic standard: a full-bleed photo hero. This was the "canon" card F.
14. [C.F. Møller](https://www.cfmoller.com) (Firecrawl). The same canon, for comparison.

Outside the category:

15. [Vitsoe](https://www.vitsoe.com) (Firecrawl). A product catalogue with restrained type.
16. [Teenage Engineering](https://teenage.engineering) (Firecrawl). An instrument identity with one strong object.
17. [Stripe Press](https://press.stripe.com) (Firecrawl). An editorial object with depth and grain. This is where the grain on the green fields comes from.
18. [Pentagram](https://www.pentagram.com) (Firecrawl). A studio confident enough to say little.
19. [Samara, tech specs](https://mobbin.com/sites/sections/120f7f99-5161-475c-9ec3-1bf425cf944d) (Mobbin). Building specs laid out like a datasheet.
20. [In Common With, specs and downloads](https://mobbin.com/sites/sections/6c5ddd6d-bd8e-4cbf-9616-8016064f2bdc) (Mobbin). Facts in a quiet table.
21. [Clay, hero](https://mobbin.com/sites/sections/7370ae4a-cb10-432b-bc5b-f524e917c1f6) and [Wise, hero with calculator](https://mobbin.com/sites/sections/ed4009c4-f3a6-4228-9287-548135488099) (Mobbin, round 5). Clay sets one headline in a single rounded colour field. Wise puts the working calculation in the hero. These two set the final hero layout.

Round 5 hero sweep (Mobbin `search_sections`, "hero section" and "hero section with an inline quote calculator"): Figma, Oryzo, Maze, HubSpot, Hashnode, Vucko, Epidemic Sound, Better Stack, Heron AI, Mixpanel, Framer, Shopify Editions, incident.io calculator, Intercom ROI, MindMarket, Canva ROI, Corgi, Deel and User Interviews. The common pattern in the strongest ones: one big headline, one colour field, one working action, and one spark colour.

## Directions

All comps are in `docs/cloud-review/screenshots/redesign/comps/` at 1280 and 375, with HTML sources in `comps/source/`.

| Round | Comps | Valdemar's verdict |
|---|---|---|
| 1 | A Materialeprøver, B Tegningsark, C Klimaskala | "Too bold, too robust, too much like a building drawing." |
| 2 | D Materialeregnskab, E Lag for lag, F Nordisk standard | Better, liked the thin type; "too much like an architecture site"; materials as photos don't make sense, use icons; a roof under construction does not fit LCA. |
| 3 | G Ren beregning | "Too generic", disliked the type, "too wide"; asked for interesting colours and personality. |
| 4 | H Klimablå, then H1-H3 quieter variants | Better but "too much colour"; asked to add the EPD recommendation outside the hero; portrait at the top did not work. |
| 5 | I1 Skov + mandarin, I2 Nat + lime, I3 Blomme + safran | Chose I1. |
| 6 | J (refined I1), K typeface specimens | Approved J; chose headline typeface 2, Hedvig Letters Serif. |

Why J holds up: the hero answers the visitor's real question ("does my project need an LCA, and what will it cost?") with a working check instead of a picture. The seal makes the BR18 limit the visual signature. The portrait gets its own section with a phone button. The palette is two colours plus one spark, so the page has character without the default eco green-on-cream.

The other directions stay available as comps. If Valdemar later wants the drawing-sheet idea (B) or the stepped limit scale (C), both can be reused as a section rather than a whole identity.

## What changed

Design system (`src/index.css`)
- Palette: forest `#173b33` as primary, mint `#e2efe8` as secondary, mandarin `#ff7a3d` as the spark. The spark is used only on the limit seal, the price underline, the phone button, small markers, focus rings and text selection.
- The utility names (`green`, `mist`, `paper`, `ink`) were kept and pointed at the new values, so every page moved to the new palette without renaming classes.
- Type: Hedvig Letters Serif for h1 and h2 (always at its single weight), and Hanken Grotesk for text, labels and buttons. Schibsted Grotesk was removed.
- Shape: 24-32 px radii on colour fields, pill buttons, hairline lists, and a subtle grain utility on the green fields.

Components
- **Buttons:** 48 px pills in the text face. Pressing scales them to 97 % in 150 ms, and hover changes colour only. There is a new `spark` variant.
- **Subpages:** `PageHero` is now the same rounded forest field as the home hero, left-aligned.
- **Panels and cards:** `CtaPanel` is a green field with a spark button. `Sheet` and the cards use a hairline instead of hover lift.
- **FAQ:** rows open with a CSS grid-rows transition. The answers stay in the DOM, and the old staggered entrance is gone.
- **Nav, footer, layout:**
  - The nav uses pill links. On phones it now shows the wordmark instead of the bare mark (finding 15 in report 01), and the mobile menu opens without animation.
  - The footer has a grain and spark headings.
  - Route fade transitions are removed.

Home (`/`)
- New hero: "LCA-beregning der bare virker" in a forest field, with the sentence check "Jeg bygger [et enfamiliehus] på [160] m² som [nybyggeri]". It shows the LCA requirement, the limit value and the indicative price, and links to `/kontakt?type=&m2=&byggeri=` with the same prefill as the checker. The logic is the existing `evaluateBR18` and `beregnPris`, so the hero and the checker cannot disagree. The seal shows the limit for the chosen type.
- New Person section under the hero: portrait, name tag, "Ring +45 29 89 99 99" and "Eller skriv direkte".
- "Det får du" is rebuilt as an icon list with one authored line-icon set. It adds the product-specific EPD line, and A4/A5 sits in a green card.
- The Process loop is kept: same six steps, the same loop after step 03, the same wording. It now draws once when the section enters the viewport. The loop is drawn in the spark colour, and the explanation sits under step 03 at every width, which fixes finding 11 from report 01 (the note covered the connector). The infinite drifting "current" overlay is removed.
- Pricing, References, FAQ and the final CTA are restyled. Count-ups and drawn check marks are removed. The pricing list gains "Anbefaling af produkter med produktspecifik EPD".

Other pages: they get the new hero field, type, cards and links. On project-type, reference-project and blog-post pages, the hero tags and meta text were recoloured so they stay readable on green. The about portrait column is wider. The 404 uses the green field.

Content and SEO: titles, meta descriptions, canonicals, JSON-LD, routes and the sitemap are unchanged. `llms.txt` and `llms-full.txt` gained the EPD line.

## Home-page copy changes

The headline and lede are unchanged ("LCA-beregning der bare virker", "Vi håndterer hele LCA-beregningen, fra tidlig fase til myndighedsklar rapport, så du kan fokusere på projektet."). New or changed lines, all restating claims the site already makes:

| Where | Old | New |
|---|---|---|
| Hero CTA | "Få et tilbud" next to "Typisk 5.000-7.000 kr" | Sentence check with result; button "Få et fast tilbud" |
| Hero footnote | "Dansk LCA-rådgivning for arkitekter og rådgivere. Bolig, erhverv og industri, fra 80 til 3.000 m²." | "A4+A5 inkluderet", "Svar inden for 24 timer", "Bolig, erhverv og industri, 80 til 3.000 m²", and "Vejledende svar efter BR18 § 297-298. Flere valg i BR18-tjekkeren." |
| Sample card | "Eksempel på rapport, Enfamiliehus, 184 m², Godkendt" (illustrative) | Removed; replaced by the live check |
| Person section | (none) | "Du får én rådgiver, hele vejen" / "Bag Din LCA Hjælper står Valdemar Løvschal Wernblad. Han gennemgår dine tegninger, laver beregningen og står for rapporten til kommunen." / "Ring +45 29 89 99 99" / "Eller skriv direkte" |
| Det får du | (four services) | Adds "Produktspecifikke EPD'er: Vi anbefaler produkter med egen EPD, der kan bringe beregningen ned." (Valdemar's request) |
| Pricing list | (six items) | Adds "Anbefaling af produkter med produktspecifik EPD" |
| Check states | (none) | "Lovpligtig", "Lovpligtig, uden grænseværdi", "Undtaget", "Ikke omfattet", "Skriv det opvarmede etageareal for at se krav og pris." |

The new lines were checked against the `dansk-humanizer` patterns: no puffery, no stacked clauses, plain verbs.

## Motion

From the `remove-animations` audit:

| Location | Was | Verdict | Deciding branch |
|---|---|---|---|
| All sections (`Reveal`, `RevealGroup`, `RevealWords`) | Fade-up and word-mask entrances on every section and heading | Deleted, start states removed | No purpose; held content back |
| `Layout.tsx`, every page | Route cross-fade (`pageTransition`) | Deleted | Seen on every navigation |
| `Hero.tsx` | Parallax of copy and sheet, staged entrance | Deleted | Decoration |
| `HeroReportCard`, `References` | Count-ups, growing bars | Deleted (component removed) | Functional data re-animated on load |
| `Process.tsx` | Infinite drifting dash overlay, disc springs, staggered text | Deleted | Infinite loop on a persistent element |
| `Pricing.tsx` | Self-drawing check marks | Deleted | Decoration |
| Cards | Hover lift and shadow growth | Reduced to a ring colour, 150 ms | Hover, tens per day |
| `Navbar.tsx` | Mobile menu height animation | Deleted | Frequent toggle |

Kept, and reviewed with `review-animations`:
- **Button press:** scale to 0.97, 150 ms ease-out. It is feedback.
- **FAQ row:** opens with grid-rows in 200 ms ease-out. It keeps the open state from jumping.
- **Process connector:** draws once, 2.4 s, and the loop draws in 0.8 s. This explains the iteration, which is the motion the brief asked for.
- **Hero seal:** the value settles in over 240 ms when the limit changes. It shows the state change.
- **Nav:** hide on scroll-down, 200 ms.

`prefers-reduced-motion` turns all durations to near zero and shows the process lines fully drawn. Hover effects change colour only. Verdict: approve. No keyboard-triggered or high-frequency motion is left, and all of it animates transform, opacity or stroke only.

`framer-motion` is uninstalled. The brief allowed it, and nothing imports it any more. The main bundle went from 196 KB to 152 KB gzip; the module chunk is unchanged at 81 KB.

## Verification

- `npm run lint` is clean.
- `npm test` passes 49 of 49.
- `npm run build:prerender` passes and writes 47 routes plus `404.html`.
- `impeccable detect --json` on `src` returns `[]`.
- Playwright on the prerendered build:
  - All 47 routes plus a 404 path at 375, 768 and 1280: no horizontal overflow, exactly one h1 per page, no JS errors.
  - Hero check results:
    - Enfamiliehus, 160 m², nybyggeri: Lovpligtig, 6,7, ca. 6.000 kr. The seal shows 6,7.
    - Sommerhus, 94 m²: limit 4,0, ca. 5.400 kr.
    - Rækkehus: "fra 8.000 kr".
    - Tilbygning, 40 m²: "Undtaget", with no limit value.
    - Empty area: shows the prompt.
  - Hero to contact goes to `/kontakt?type=enfamiliehus&m2=160&byggeri=nybyggeri`, with the dropdown and area prefilled.
  - Checker at 210 m² goes to `/kontakt?type=enfamiliehus&m2=210&byggeri=nybyggeri`, prefilled.
  - Contact validation: an empty submit shows "Udfyld feltet.", and a bad email shows "Skriv en gyldig mailadresse."
  - The hero selects take keyboard focus, and Escape closes the mobile menu.
- `break-ui` on the hero check, the checker and the contact form:
  - Hero areas tried: 999999, 0, -12, 1, 2999, 3001, 160.75 and letters. The checker was tried with 40 m² uopvarmet and -3. The contact form was tried with a 60-character name, a 90-character email, a 2,000-character message and a prefill of m2=99999999.
  - No overflow and no crash anywhere.
  - Fixed: "Individuelt tilbud ekskl. moms" now drops the "ekskl. moms" suffix. The m² field also widens with its content.
- Firecrawl: 25 credits used in this session (72 before, 97 after) against a budget of 100.

## Adversarial review

- **impeccable finish review.** A fresh reviewer, which never saw the build thread, checked the 34 screenshots, the direction contract and comp J. Disposition: **fix**, with 7 material items, all applied:
  1. **Process loop on phones:** the ring was cut off by the screen edge. Its radius now shrinks on vertical runs.
  2. **Field width:** the hero, final CTA, subpage header and 404 fields were 32 px wider than the content column. They now line up with the nav and footer edges (`max-w-[68rem]`, `md:px-8`).
  3. **404 page:** the "404" label above the h1 was an eyebrow. It is removed.
  4. **Pricing tag:** "A4+A5 inkluderet" sat above the price like an eyebrow. It now sits inline after "ekskl. moms ...".
  5. **Problem heading:** it broke "LCA-" at a line end. "LCA-beregning" now stays together, and the heading is a step smaller in its column.
  6. **Process note:** it carried a second loop icon. That is replaced by a small spark ring that matches the loop.
  7. **Pricing card:** it had empty space at the bottom, and no longer stretches.
- **Reviewer's open question.** The About portrait overlapped the header field, close to the "portrait at the top" you rejected. I reverted it to sit beside the text.
- **My own check at 768 and 1024.** The seal overlapped the headline and the result row was cramped. Below 1024 px the seal now sits above the headline and the row stacks. At 1024 the seal is smaller.
- **Re-run after the fixes:** lint, tests and prerender pass. All routes at 375, 768 and 1280 are clean, the flows work, and `impeccable detect` returns `[]`. The after screenshots were recaptured.
- **Left on the table** (the reviewer's ceiling notes, not done): the three home reference cards still follow the big-number template, and the process loop note could sit right beside the ring on desktop.

## Left for Valdemar

- Merge decision. Merging to master deploys the live site.
- Hedvig Letters Serif has only one weight, so every h1 and h2 is regular. If the headlines ever need a bold, the alternative is to switch typeface, not to fake a bold.
- The portrait is shown in greyscale on the home page and in colour on About and Contact. Say which you prefer everywhere.
- The hero check starts prefilled with "enfamiliehus, 160 m²" so the result shows at once. You could start it empty instead.
- The A4/A5 line, the EPD line and the BR18 footnote reuse existing claims. If you want the EPD line worded differently on the live site, it lives in `src/components/sections/Services.tsx`, `Pricing.tsx` and both llms files.
- Unchanged data questions from report 01: "6,88 → 3,839" on the reference card, and testimonials.
- `design-brief.md` is still out of date (3,500 kr, A45). Archive or update it.
