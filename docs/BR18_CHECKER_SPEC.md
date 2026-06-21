# BR18 LCA-tjekker + pris-lommeregner — spec (as-built)

**Status:** Bygget og verificeret 2026-06-21. Rute `/vaerktoejer/br18-tjekker`.
**Kilde for BR18-logik:** §297/§298, jf. vault `02_Areas/BR18-compliance/lca-krav-oversigt.md`.
**Kilde for pris:** vault `.claude/skills/dlh-tilbud/references/pris-formel.md` (knæk-model, PROVISORISK til 29/6).

## Hvad det er

Ét samlet, gratis selvbetjeningsværktøj. Brugeren taster bygningstype + opvarmet m² (+ nybyggeri/tilbygning, uopvarmet, evt. samfundskritisk) og får på sekunder:
1. Om en LCA-beregning er lovpligtig (§297), evt. "kun dokumentation, ingen grænseværdi" (§298 stk.9/10), eller "undtaget".
2. Gældende grænseværdi + A4/A5-grænse + B6-metode.
3. Et vejledende prisestimat (Komplet/Direkte) fra DLH's prisformel.
4. CTA til tilbud.

Engineering-as-marketing + AEO: siden eksponerer FAQ + grænseværdi-logik + prislogik som JSON-LD, og prerenderes til statisk HTML så AI-crawlere ser indholdet uden JS.

## Filer

| Fil | Rolle |
|---|---|
| `src/lib/br18.ts` | Ren beslutningslogik. `evaluateBR18(input): BR18Resultat` + `BYGNINGSTYPER` + `prisTypeFor()`. Eneste kilde til BR18-sandhed. |
| `src/lib/pris.ts` | Ren prislogik. `beregnPris(prisType, m2)` + `PRIS_KONSTANTER` (centraliseret, re-tunbar). |
| `src/lib/br18.test.ts`, `pris.test.ts` | Unit-tests (vitest). 17 cases mod kanoniske checkpoints + edge cases. |
| `src/pages/BR18CheckerPage.tsx` | Side: Helmet (meta/OG/canonical + JSON-LD FAQPage/HowTo/Breadcrumb), hero, checker, FAQ, disclaimer, CTA. |
| `src/components/tools/BR18Checker.tsx` | Interaktiv checker (delt input-state, resultatpanel). |
| `src/components/tools/PrisEstimat.tsx` | Pris-blok (Komplet/Direkte-toggle). Aldrig "kr per m²". |
| `src/main.tsx`, `scripts/prerender.ts`, `Navbar.tsx`, `sections/Pricing.tsx` | Rute, prerender-registrering, nav-link "Værktøjer", forside-teaser. |

## Beslutningslogik (verificeret mod §297/§298)

**Kritisk distinktion:** §297 = beregningspligt; §298 = grænseværdi. "Undtaget fra grænseværdi" ≠ "undtaget fra LCA".

Rækkefølge i `evaluateBR18`:
1. **uopvarmet & m² < 50** → `undtaget_helt` (ingen LCA).
2. **tilbygning & {enfamiliehus|sommerhus} & m² < 250** → `undtaget_tilbygning`. (Erhverv/etagebolig-tilbygning er IKKE undtaget — falder igennem.)
3. **samfundskritisk** → `kun_dokumentation` (beregn + dokumentér, ingen grænseværdi).
4. ellers → `lovpligtig` + grænseværdi.

**Grænseværdier (standard / lavemission), kg CO₂e/m²/år:** sommerhus <150: 4,0/3,2 · sommerhus ≥150 + enfamilie/række/kæde/dobbelt: 6,7/5,4 · etagebolig/kontor/handel/lager: 7,5/6,1 · institution/øvrigt: 8,0/6,4. **A4+A5:** 1,5/1,1 (alle typer).
**B6:** uopvarmet→0 · tilbygning→Tabel 13 · sommerhus→Tabel 12 · ellers→energiramme (BE18 / EPBD-metode fra 29/5 2026).

## Pris (knæk-model, ekskl. moms)

`pris = grundpris + sats1·min(m²,knæk) + sats2·max(0,m²−knæk)` → rund til 100, gulv 4.000, over loft → "Individuelt tilbud". Konstanter pr. type i `PRIS_KONSTANTER`. Komplet (default) / Direkte (−1.000, ikke under gulv). **Framing: aldrig "kr per m²".**

## Verifikation (alle grønne 2026-06-21)

- `tsc -b` + `vite build` + `eslint` rene.
- 17 unit-tests: prischeckpoints (60/100/150/200/250 m² pr. type, lager 478→9.300, kontor 250→12.500/300→individuelt, Direkte-gulv) + BR18 edge cases.
- `build:prerender`: 0 fejl, rute har renderet indhold + `<title>` + 3 JSON-LD + ét korrekt canonical.
- 4/4 browser-interaktion (Playwright): enfamilie 150→6,7+5.900; sommerhus 120→4,0+5.700; tilbygning 200→undtaget; kontor 300→7,5+individuelt.

## Kendte begrænsninger / v2-roadmap (fra adversariel BR18-review)

Værktøjet er bevidst holdt simpelt (vejledende, med disclaimer). Følgende håndteres IKKE i v1 og er kandidater til v2:
1. **Renovering med samtidig tilbygning.** v1 har ingen "renovering"-input (det undgår netop fejlen hvor renovering maskerer en pligtig tilbygning). Hvis "renovering" tilføjes senere, SKAL der spørges eksplicit "udvider du det opvarmede areal?" før konklusion.
2. **Blandet anvendelse (§298 stk.4).** Kun én bygningstype pr. beregning. Bør tilføje arealvægtet gennemsnit eller et hårdt "kontakt rådgiver"-stop frem for ét potentielt forkert tal.
3. ~~Sommerhus 150 m²-knæk~~ **VERIFICERET KORREKT** (2026-06-21): knækket måles på opvarmet etageareal, præcis som verbatim §298 stk.1 kræver ("opvarmet etageareal mindre end 150 m²"). Tidligere antaget at være en referenceareal-edge — afkræftet af lovteksten. Ingen ændring nødvendig.
4. **BBR-auto-mapping** (110/150/160/540 mv.) ikke implementeret; kategori vælges manuelt. Hvis auto-map tilføjes, markér usikre koder som vejledende.
5. **Energitillæg (§260) / særlige forhold (§298 stk.8)** ikke modelleret — for detaljeret til selvbetjening; flag "kontakt rådgiver".
6. **Type→pris-bucket-mapping** (etagebolig/institution/parkeringshus → kontor/lager) er en effort-proxy i `prisTypeFor`; re-tunes efter faktiske timer. Prismodel er PROVISORISK til fresh-eyes 29/6.

## Re-tuning / udvidelse

- Priser: ret kun `PRIS_KONSTANTER` i `pris.ts` (ét sted).
- BR18-regler: ret `evaluateBR18`/tabeller i `br18.ts`; kør `npm test`.
- Nye ruter til prerender: tilføj i `scripts/prerender.ts` `ROUTES`.
