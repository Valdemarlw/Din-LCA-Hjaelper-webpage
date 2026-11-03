# 02 Regulation and fact check

Date: 3 November 2026. Branch: `review/regulation`.

## Scope

Checked: all 9 blog posts (`src/data/blogPosts.ts`), FAQ (`src/data/faqs.ts`), glossary (`src/data/glossary.ts`), project type pages (`src/data/projectTypes.ts`), comparison and reference project data (regulatory statements only), BR18 checker logic and copy (`src/lib/br18.ts`, `src/pages/BR18CheckerPage.tsx`, `docs/BR18_CHECKER_SPEC.md`), homepage problem section, `public/llms.txt`, `public/llms-full.txt`, `public/ai.txt`, and the FAQ/Article JSON-LD built from that data.

Not checked: prices and service scope. The task is regulation, and those are guarded by `HANDOFF.md`.

## Primary sources (all checked 3 November 2026)

| Key | Source |
|---|---|
| S1 | BR18 (Aktuelt) §§ 297-298, https://www.bygningsreglementet.dk/tekniske-bestemmelser/11/krav/297_298/ |
| S2 | BR18 historic version 17 (1/1-30/6 2025) §§ 297-298, https://www.bygningsreglementet.dk/historisk/version-17/tekniske-bestemmelser/11/krav/297_298/ |
| S3 | BR18 guidance on climate impact, ch. 1.12 Grænseværdi, https://www.bygningsreglementet.dk/tekniske-bestemmelser/11/brv/bygningers-klimapaavirkning-1-juli-2025/kap-1_12/ |
| S4 | Dokumentationsvejledning ved færdigmelding (01.07.2025), pp. 16-17, https://www.bygningsreglementet.dk/media/0o1nbejw/dokumentation-af-bygningsreglementets-tekniske-bestemmelser-i-forbindelse-med-faerdigmelding-af-byggeriet-2025.pdf |
| S5 | BEK nr. 271 af 11/03/2025, § 2 (entry into force and transition), https://www.retsinformation.dk/eli/lta/2025/271 |
| S6 | Social- og Boligstyrelsen news 01-04-2025, https://www.sbst.dk/nyheder/2025/nye-krav-til-bygningers-klimapaavirkning-traeder-i-kraft-1-juli-2025 |
| S7 | SBST / Videncenter for Bygningers Klimapåvirkning FAQ, https://www.sbst.dk/byggeri/baeredygtigt-byggeri/videncenter-for-bygningers-klimapaavirkning/faq |
| S8 | SBST "Ny metode til beregning af bygningers energibehov" (2026), https://www.sbst.dk/materialer/2026/metode-for-beregning-af-bygningers-energimaessige-ydeevne-epbd |

## Findings ranked by impact

1. **Wrong maths on the 2025 tightening** (`klimakrav-2025`). The post said "8,0 er en tredjedel af den tidligere (12,0)". 8 is two thirds of 12, so this was off by a factor of two. Fixed.
2. **Pre-2025 rules described as a uniform limit for all building types** (`klimakrav-2025`, `llms-full.txt`). Before 1 July 2025, 12,0 applied only to new buildings over 1.000 m² heated floor area that were covered by the energy frame. Summer houses, unheated buildings and extensions were not covered at all (S2, S7). Fixed, and the historic table in `graensevaerdier-co2` now says this too.
3. **"Industri, haller" listed under øvrigt byggeri 8,0** (`graensevaerdier-co2`). Warehouses and halls ("lager o.lign.") are 7,5 (S1 § 298 stk. 1 nr. 4). Industry with an integrated production line (BBR 221) is exempt from the limit (§ 298 stk. 9). SBST's own examples of øvrigt are schools, nurseries and car parks (S7). Fixed.
4. **Reference area described as based on heated floor area** (`graensevaerdier-co2`, glossary `etageareal`). § 297 stk. 5 uses etageareal per § 455, heated and unheated, and includes basements, ground-level waste rooms and shelters at 100 %. Only B6 uses heated area (§ 297 stk. 11). Fixed.
5. **Extension limit tied to the main building** (FAQ, sommerhus project page). § 298 stk. 3: an extension follows the limit for *the extension's own use* (S1, S7). Fixed.
6. **Extension threshold stated without the residential condition** (homepage `Problem.tsx`, `llms-full.txt`). "Tilbygninger over 250 m²" implied that commercial extensions under 250 m² are exempt. They are not (§ 297 stk. 3 only covers houses and holiday homes). Fixed.
7. **Unverified future date in the checker result** (`br18.ts`). The B6 text said "fra 29. maj 2026 den nye EPBD-metode". SBST still describes the method as applying "når det nye Bygningsdirektiv implementeres" (S8). The BR18 version list shows no version change since 1 January 2026 (S1). I couldn't confirm that the method is in force, so the checker text now names the energy frame (§§ 250-256) without a date. No logic change.
8. **Wrong authority name** (`graensevaerdier-co2` FAQ). "Bolig- og Planstyrelsen" is now Social- og Boligstyrelsen (S6). Fixed.
9. **Vague exceptions FAQ** (`klimakrav-2025`). "Midlertidige bygninger med kort levetid og visse småbygninger" is replaced with the actual list from § 297 stk. 2-3, the agricultural exemption (S7, BR18 § 6) and the critical-infrastructure carve-out.
10. **Transition rule wording** (`klimakrav-2025` FAQ). "Ansøgt efter 1. juli 2025" is now "indsendt 1. juli 2025 eller senere", matching BEK 271/2025 § 2 stk. 2 (S5).
11. **Smaller wording errors**: "næsten halvt så meget" (4,0 vs 6,7 is 40 % lower), machines under 1 ton "helt fritaget" (they *may* be left out, § 297 stk. 9 nr. 3-4), A5 described without energy use, a glossary worked example that produced 50 kg CO₂e/m²/år next to limits of 4-8 (now 6,0), and "materialer med levetid over 50 år tæller kun for 50 års brug" (misleading, since A1-A3 counts in full). All fixed.
12. **Missing upcoming tightening**. Nothing on the site mentioned SBST's 2027/2029 targets (S7). I added a short section with the table to `graensevaerdier-co2`. It clearly says the targets aren't adopted yet. The 2029 values equal today's lavemissionsklasse in § 297 stk. 13.

## Claim table

Status: **correct** = matches the source, no change. **fixed** = changed. **unverified** = no primary source found, so I flagged it and left the text as it is.

| # | Where | Old text | New text | Status | Source |
|---|---|---|---|---|---|
| 1 | All pages, checker | Limits 4,0 / 6,7 / 7,5 / 8,0 by type, sommerhus split at 150 m² heated area | - | correct | S1 § 298 stk. 1 |
| 2 | All pages, checker | A4+A5 limit 1,5 for all types | - | correct | S1 § 298 stk. 5 |
| 3 | Checker | Lavemission 3,2 / 5,4 / 5,4 / 6,1 / 6,4, A4-A5 1,1 | - | correct | S1 § 297 stk. 13, 15 |
| 4 | All pages | Main limit covers A1-A3, B4, B6, C3-C4; D reported but outside the limit | - | correct | S1 § 297 stk. 4, § 298 stk. 1; S7 |
| 5 | All pages | 50-year reference study period from færdigmelding | - | correct | S1 § 297 stk. 4 |
| 6 | All pages, checker | Exempt: unheated < 50 m², transportable constructions, temporary pavilions | - | correct | S1 § 297 stk. 2 |
| 7 | All pages, checker | Extensions < 250 m² heated area exempt only for stuehuse, enfamiliehuse, række-/kæde-/dobbelthuse, sommerhuse | - | correct | S1 § 297 stk. 3 |
| 8 | FAQ, llms.txt | Agricultural avls- og driftsbygninger exempt | - | correct | S7 (BR18 § 6) |
| 9 | Posts, checker | § 298 stk. 9-10 buildings: calculation still required, no limit | - | correct | S1 § 298 stk. 9-10; S7 |
| 10 | Posts, FAQ | Renovations not covered | - | correct | S1 § 297 stk. 1; S7 |
| 11 | Posts, FAQ | Unheated buildings: B6 = 0 | - | correct | S1 § 297 stk. 12 nr. 4 |
| 12 | Checker | B6 via Tabel 12 (sommerhus) and Tabel 13 (tilbygning) | - | correct | S1 § 297 stk. 12 |
| 13 | Posts, FAQ | Mixed use: area-weighted limit | - | correct | S1 § 298 stk. 4; S3 |
| 14 | Posts | Rounded to one decimal before evaluation (Ternedalen 3,839 vs 4,0) | - | correct | S1 § 298 stk. 6 |
| 15 | Posts, FAQ | Documentation submitted at færdigmelding; needed for ibrugtagningstilladelse; municipal spot checks | - | correct | S4 (§ 40 stk. 2 nr. 4, § 46); S7 |
| 16 | Posts | 1.000 m² threshold abolished 1 July 2025 | - | correct | S2 § 298; S1 |
| 17 | `graensevaerdier-co2` | "Før 2023: Ingen krav" | - | correct | S7 |
| 18 | Posts, FAQ | Daginstitution, schools, car parks = øvrigt 8,0; plejehjem = beboelse | - | correct | S3; S7 |
| 19 | Posts | A4 includes terminal processes and transport of equipment | - | correct | S7 |
| 20 | Posts | Water use on site excluded from A5 | - | correct | S1 § 297 stk. 9 nr. 6 |
| 21 | `klimakrav-2025` | "Selv den højeste nye grænse (8,0) er en tredjedel af den tidligere (12,0). For sommerhuse er stramningen endnu større (4,0 vs. 12,0)" | "Selv den højeste nye grænse (8,0) ligger en tredjedel under den tidligere (12,0). For sommerhuse under 150 m² er grænsen kun en tredjedel af den gamle (4,0 mod 12,0)" | fixed | arithmetic; S1, S2 |
| 22 | `klimakrav-2025` | "Før juli 2025 gjaldt en ensartet grænseværdi på 12,0 kg CO₂e/m²/år for alle bygningstyper." | "Før juli 2025 gjaldt én fælles grænseværdi på 12,0 kg CO₂e/m²/år, og kun for nybyggeri med over 1.000 m² opvarmet etageareal, der var omfattet af energirammen. Mindre byggeri skulle kun lave beregningen, og sommerhuse, uopvarmede bygninger og tilbygninger var slet ikke omfattet." | fixed | S2; S7 |
| 23 | `llms-full.txt` | "Stramning fra tidligere ensartet grænse på 12,0." | "Før 1. juli 2025 gjaldt 12,0 kun for nybyggeri over 1.000 m² omfattet af energirammen." | fixed | S2; S7 |
| 24 | `graensevaerdier-co2` historic table | "Kun bygninger over 1.000 m² skulle overholde grænsen" / "LCA-beregning påkrævet, men ingen grænseværdi" | "Kun nybyggeri omfattet af energirammen og med over 1.000 m² opvarmet etageareal" / "Nybyggeri omfattet af energirammen skulle beregne, men havde ingen grænseværdi" | fixed | S2; S7 |
| 25 | `graensevaerdier-co2` table | Øvrigt nybyggeri: "Industri, haller, institutioner m.m." | "Fx skoler, børnehaver og parkeringshuse" | fixed | S1 § 298 stk. 1, 9; S7 |
| 26 | `graensevaerdier-co2` table | "Kontorer" | "Kontor, handel og lager" | fixed | S1 § 298 stk. 1 nr. 4 |
| 27 | `klimakrav-2025` | "Etageboliger og kontorer skal holde 7,5 ..., mens øvrigt erhvervsbyggeri har grænsen 8,0." (+ table rows) | "Etageboliger, kontorer, handel og lager skal holde 7,5 ..., mens øvrigt byggeri som skoler, børnehaver og parkeringshuse har grænsen 8,0." (+ table rows aligned) | fixed | S1; S7 |
| 28 | `graensevaerdier-co2` | "Referencearealet tager udgangspunkt i det opvarmede etageareal, men tillægger vægtede andele ..." | "Referencearealet er etagearealet efter BR18 § 455, både opvarmet og uopvarmet, med nogle justeringer: kældre, affaldsrum i terrænniveau og sikringsrum tæller fuldt med, udestuer og integrerede garager tæller 50 %, og integrerede carporte, overdækninger og udvendige trapper tæller 25 %. ..." | fixed | S1 § 297 stk. 5, 11 |
| 29 | Glossary `etageareal` | "baseret på BBR"; "udgangspunkt i det opvarmede etageareal jf. BBR"; row "Opvarmet etageareal 100%" / "Kældre 100%" | "baseret på etagearealet efter BR18 § 455"; "etagearealet efter BR18 § 455, både opvarmet og uopvarmet"; rows "Etageareal efter § 455 (opvarmet og uopvarmet)" / "Kældre, affaldsrum i terrænniveau og sikringsrum" | fixed | S1 § 297 stk. 5 |
| 30 | FAQ (tilbygninger) | "skal overholde samme grænseværdi som den bygningstype, de knytter sig til" | "skal overholde den grænseværdi, der gælder for tilbygningens egen anvendelse" | fixed | S1 § 298 stk. 3; S7 |
| 31 | `projectTypes` sommerhus | "Ved 250 m² eller derover gælder samme grænseværdi som hovedbygningen." | "Ved 250 m² eller derover skal tilbygningen overholde den grænseværdi, der gælder for dens anvendelse." | fixed | S1 § 298 stk. 3 |
| 32 | `Problem.tsx` (homepage) | "For uopvarmede bygninger over 50 m² og tilbygninger over 250 m² gælder kravet også." | "Kravet gælder også uopvarmede bygninger over 50 m², alle tilbygninger til erhverv og etageboliger, og boligtilbygninger fra 250 m²." | fixed | S1 § 297 stk. 3 |
| 33 | `llms-full.txt` (2 places) | Same "tilbygninger over 250 m²" wording | Residential/commercial distinction spelled out | fixed | S1 § 297 stk. 3 |
| 34 | `br18.ts` checker B6 text | "Driftsenergi (B6) kræver en energirammeberegning (BE18 / fra 29. maj 2026 den nye EPBD-metode)." | "Driftsenergi (B6) beregnes ud fra bygningens energirammeberegning (BR18 §§ 250-256)." | fixed (date unverified) | S1 § 297 stk. 11; S8 |
| 35 | `graensevaerdier-co2` FAQ | "Bolig- og Planstyrelsen opdaterer løbende vejledningen." | "Grænseværdierne står i BR18 § 298 på bygningsreglementet.dk. Social- og Boligstyrelsen udgiver vejledningen til reglerne." | fixed | S6 |
| 36 | `graensevaerdier-co2` intro | "Alle nybyggerier i Danmark skal overholde disse grænser for at opnå ibrugtagningstilladelse." | "Byggeri, der er omfattet af kravet, skal overholde grænserne for at få ibrugtagningstilladelse." | fixed | S1 § 298 stk. 9-10 |
| 37 | `klimakrav-2025` FAQ | "gælder for byggerier med byggetilladelse ansøgt efter 1. juli 2025" | "gælder, når ansøgningen om byggetilladelse er indsendt 1. juli 2025 eller senere" | fixed | S5 § 2 |
| 38 | `klimakrav-2025` FAQ | "Undtaget er bl.a. midlertidige bygninger med kort levetid og visse småbygninger." | Full list from § 297 stk. 2-3, agricultural exemption and § 298 stk. 9 carve-out | fixed | S1; S7 |
| 39 | `lca-sommerhuse` | "Det er næsten halvt så meget som enfamiliehuse (6,7)." | "Det er 40 % lavere end grænsen for enfamiliehuse (6,7)." | fixed | arithmetic |
| 40 | `a4-a5-dokumentation` | "maskiner under 1 ton er helt fritaget fra klimaregnskabet" | "energiforbrug fra maskiner under 1 ton kan udelades" | fixed | S1 § 297 stk. 9 nr. 3 |
| 41 | `klimakrav-2025`, `graensevaerdier-co2` | A5 = "spild og affald" | adds energiforbrug | fixed | S7 |
| 42 | FAQ, glossary `betragtningsperiode` | "materialer med levetid over 50 år kun tæller for 50 års brug" | "Materialer, der holder længere end 50 år, regnes med én gang ..." | fixed | S1 § 297 stk. 4, 10 |
| 43 | Glossary `co2-aekvivalenter` | Example 500.000 / (200 × 50) = 50 kg CO₂e/m²/år | 60.000 / (200 × 50) = 6,0 kg CO₂e/m²/år | fixed | arithmetic, plausibility |
| 44 | `projectTypes` erhverv | "uopvarmede lagerbygninger og haller over 50 m² opvarmet etageareal" | "... over 50 m² etageareal" | fixed | S1 § 297 stk. 2 |
| 45 | `graensevaerdier-co2` | (no mention of 2027/2029) | New section "Kommende skærpelser i 2027 og 2029" with SBST targets, marked as not adopted | added | S7; S1 § 297 stk. 13 |
| 46 | Glossary `epd` | EPD per EN 15804 "enten +A1 eller +A2" | - | unverified | BR18 only says DS/EN 15804 (S1 § 297 stk. 8); whether +A1 EPDs are still accepted wasn't confirmed |
| 47 | FAQ, glossary | EPD "typisk gyldig i 5 år" | - | unverified | General EPD practice, not in BR18 |
| 48 | FAQ | Generic data "bevidst sat højt" / "konservative" | - | unverified | Not stated in S1; likely from BUILD background reports |
| 49 | Glossary `modul-a5` FAQ | A4+A5 split 38 % waste / 27 % energy / 8 % waste transport / 27 % A4 | - | unverified | No source found. Suggest removing or citing the VCBK study it came from |
| 50 | Posts, FAQ | Missing or wrong documentation "kan udløse bøde" | - | unverified | Plausible under byggeloven § 30, not checked against retsinformation |
| 51 | `graensevaerdier-co2` | Etageboliger "inkl. ungdomsboliger og ældreboliger" | - | unverified | S3 supports plejehjem as beboelse; youth housing not checked |
| 52 | Glossary `dgnb` | "I nyere DGNB-versioner (fra 2023) er BR18's CO₂-krav et indbygget minimumskrav" | - | unverified | Not a BR18 claim; DGNB manual not checked |
| 53 | Posts, glossary | Hotspot shares (fundament up to 30 %, 3-5 elements = 60-80 %, sommerhus split table) | - | unverified (illustrative) | DLH experience figures, not regulation |
| 54 | Posts | "Uopvarmede bygninger over 50 m²" (used site-wide) | - | correct with caveat | Exactly 50 m² is also covered (exemption is "mindre end 50 m²"). Low impact, left as is |

## What I changed

- `src/data/blogPosts.ts`: corrections in `klimakrav-2025`, `a4-a5-dokumentation`, `lca-sommerhuse`, `graensevaerdier-co2` (rows 21-28, 35-41, 45). These four posts got `updated: "2026-11-03"`.
- New optional `updated` field on `BlogPost`. `BlogPostPage.tsx` uses it for JSON-LD `dateModified` and `article:modified_time`, and leaves `datePublished` unchanged. Verified in the rendered JSON-LD: `"datePublished":"2026-04-02","dateModified":"2026-11-03"`.
- `src/data/faqs.ts`, `src/data/glossary.ts`, `src/data/projectTypes.ts`, `src/components/sections/Problem.tsx`, `public/llms-full.txt`: rows 23, 29-33, 42-44.
- `src/lib/br18.ts`: one result string (row 34). No logic change, so no new test. The existing 17 BR18/price cases still pass.
- `docs/BR18_CHECKER_SPEC.md`: B6 note updated to match.

All new Danish text is short and plain and was checked against the dansk-humanizer patterns. No em dashes were added.

## Verification

- `npm run lint`: pass. `npm test`: 11 files, 49 tests pass. `npm run build:prerender`: pass, all routes rendered.
- Playwright against `vite preview` of the prerendered build at 375, 768 and 1280 px: 10 changed pages, new text present, `scrollWidth - innerWidth = 0` everywhere. In the BR18 checker, enfamiliehus 150 m² shows 6,7 and the new B6 text at all three widths. The new 4-column table scrolls inside its own container on mobile, the same as the existing tables.
- Environment note: the container's Playwright browser build (1243) doesn't match `@playwright/test` 1.58.2, which expects 1208. The prerender only ran after this link: `ln -s /opt/pw-browsers/chromium_headless_shell-1243 /opt/pw-browsers/chromium_headless_shell-1208`. Consider adding it to the environment setup script.

## Firecrawl usage

5.019 credits before, 4.966 after: **53 credits** used of the 100 budget. The Dokumentationsvejledning PDF alone cost about 35 credits.

## Left for Valdemar

1. Rows 46-53: decide whether to keep, source or remove the unverified claims. I'd remove the A5 percentage split (row 49) unless you have its source.
2. The checker has no input for agricultural buildings (exempt) or mixed use (§ 298 stk. 4). Both are already listed as v2 items in the spec. The copy doesn't promise them, so I made no change.
3. The checker result strings in `br18.ts` still contain em dashes (pre-existing, user-visible). I left them because they're design/copy scope, not regulation.
4. Watch the EPBD implementation. When the new energy method is in force in BR18, the checker's B6 text can name it again with the correct date.
5. Out of scope, but noticed: `docs/BR18_CHECKER_SPEC.md` still describes a 4.000 kr floor in the price formula. `HANDOFF.md` says never to present 4.000 as a general starting price. Worth checking that the floor isn't shown anywhere as a "from" price.
