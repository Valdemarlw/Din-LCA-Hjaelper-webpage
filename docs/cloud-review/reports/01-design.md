# 01 Design and conversion review

Date: 3 November 2026. Branch `review/design`, stacked on `review/regulation` (PR #16).

## Scope and method

- Screenshotted all 13 page types at 375 and 1280 px from the prerendered build (home, project types, a project type, reference projects, a reference project, BR18 checker, comparison, FAQ, glossary, blog index, a blog post, about, contact).
- `impeccable` critique, run with two isolated reviewers: A was a design review (Nielsen heuristics, cognitive load, CRO lens from the `cro` skill and its form reference). B was the `impeccable detect` scan plus Playwright measurements at 375, 768 and 1280 (overflow, contrast, touch targets, headings, keyboard, forms).
- `impeccable` ran without a PRODUCT.md, so this was a refinement on the existing visual system, not a redesign. Brand font and colours are unchanged. I did not stop to ask Valdemar product questions; the brief was clear enough for refinement.
- Mobbin references (see below). `search_sections` failed with "Failed to execute search" three times; `search_screens` worked, so references come from web screens.
- Firecrawl: not used by this session (0 credits). The account counter moved from 34 to 71 used during the session, which is the parallel SEO session.

`design-brief.md` is out of date (3,500 kr starting price, A45 sibling brand). I only used its design direction. Someone should update or archive it so it does not mislead a later session.

## Scores

- Nielsen heuristics (reviewer A): 21/32, with 7 and 10 not applicable on a marketing site. Weakest: error prevention, recognition vs. recall and error recovery, all 2/4. Most of these were in the checker-to-contact handoff and the form.
- Technical audit (reviewer B): 15/20. Accessibility 3, performance 2, theming 3, responsive 3, implementation integrity 4. The detector found 0 issues before and after the changes.
- No horizontal overflow on any route at 375, 768 or 1280. No console errors.

## Findings ranked by impact on trust and conversion

| # | Finding | Evidence | Status |
|---|---|---|---|
| 1 | The contact page was the weakest step in the funnel. It had no "what happens next", no response time near the button, and an empty left column at 1280. | `ContactPage.tsx`; contact-1280 before | **Fixed** |
| 2 | Answers from the checker were lost on the way to the quote. The visitor typed building type and area again, and the contact dropdown (Bolig/Erhverv/Industri/Andet) did not match the price categories. | `BR18Checker.tsx` CTA was a plain `/kontakt` | **Fixed** |
| 3 | No quote CTA was visible on mobile without opening the menu. The desktop nav CTA used the weakest button style (outline). | Reviewer B: first mobile CTA at y=455; `Navbar.tsx` `variant="secondary"` | **Fixed** |
| 4 | No human face anywhere. About shows the logo where the portrait should be. For a one-person consultancy the person is the strongest trust signal. | `AboutPage.tsx` portrait slot | Needs a photo from Valdemar |
| 5 | The hero sample report reads like a real approved report ("Myndighedsklar rapport", "Godkendt"). The code says it is illustrative. | `HeroReportCard.tsx` | **Fixed**: label now reads "Eksempel på rapport" |
| 6 | On mobile the checker result renders about 1,000 px below the input with no cue. | checker-result-375 | **Fixed**: "Se resultatet" jump link under the area field below 1024 px |
| 7 | Contact form errors were the browser's English defaults ("Please fill out this field"). | Reviewer A test | **Fixed**: "Udfyld feltet." / "Skriv en gyldig mailadresse." |
| 8 | Escape did not close the mobile menu. The mobile header CTA was 34 px high; the menu button was 40 px. | Reviewer B | **Fixed**: Escape closes and returns focus; both are now 44 px |
| 9 | The hero footnote `text-mist/70` was 4.47:1 at 15 px, just under AA. | Reviewer B | **Fixed**: `mist/80`, about 5.3:1 |
| 10 | User-visible em dashes in the checker results ("Ja — der skal laves..."). | `src/lib/br18.ts` | **Fixed**: punctuation only, wording unchanged |
| 11 | In the process diagram the loop note covers the 03-to-04 connector at 768, and at 1280 its background hides the line from the loop to the turn. The row turn also runs to x=1202, past the 1184 px content edge. | Reviewer B bounding boxes; `Process.tsx` | Not changed: the loop was redesigned in the last commits, so it is Valdemar's call |
| 12 | The reference card "6,88 → 3,839" mixes 2 and 3 decimals and reads like a typo. | `References.tsx:21` | Not changed: a data question |
| 13 | Heading skips h1 to h3 on `/` (the hero card h3 comes before the first h2), `/kontakt` and `/om-os`. | Reviewer B | Not changed: low impact |
| 14 | The main JS bundle is 196 KB gzip plus an 81 KB module chunk, which is heavy for a marketing page. | Reviewer B | Not changed: performance task, outside this review |
| 15 | Minor: the Final CTA at 1280 leaves a large empty area top right. The mobile header shows only the logo mark, no wordmark. The footer label "vs. LCAbyg" is cryptic. The checker accepts a negative area silently. | Reviewer A | Not changed |

## What changed

- **Contact page** (`src/pages/ContactPage.tsx`)
  - Added a three-step "Det sker, når du har skrevet" list in the left column on desktop. On phones it comes after the form, so the form stays near the top; the DOM order matches the visual order.
  - Added "Uforpligtende. Vi vender tilbage inden for 24 timer." next to the submit button.
  - The project type dropdown now uses the checker's own building types (`BYGNINGSTYPER`), so a row house and a detached house arrive as separate types, in line with HANDOFF.
  - Type and area are prefilled from `?type=&m2=`. `byggeri` (new build or extension) goes along as a hidden field.
  - Danish validation messages.
- **BR18 checker** (`src/components/tools/BR18Checker.tsx`): the "Få et tilbud" button passes type, area and build type to the contact page. Below 1024 px there is a "Se resultatet" jump link.
- **Navigation** (`src/components/layout/Navbar.tsx`)
  - The desktop CTA is now the filled primary button.
  - On phones, "Få et tilbud" sits next to the menu button.
  - Escape closes the menu.
  - Touch targets are 44 px.
- **Hero**: footnote contrast raised. The sample card is labelled "Eksempel på rapport".
- **`src/lib/br18.ts`**: replaced em dashes with plain dashes in the visible strings. No wording or regulatory claim changed.

New Danish copy only restates claims the site already makes: the 24-hour reply (Final CTA, meta description), the fixed quote after seeing the material (Pricing), the early calculation as the first step (Process), and "uforpligtende" (checker copy). I checked it against the `dansk-humanizer` patterns: short, plain, no puffery. No prices, scope or regulatory text changed.

Note for the inbox: form submissions now carry `project-type` values such as `enfamiliehus` or `raekkehus` instead of `bolig` or `erhverv`, plus `byggeri` when the visitor came from the checker.

## Verification

- `npm run lint` is clean, `npm test` passes 49/49, and `npm run build:prerender` passes (47 routes).
- I ran these Playwright flows on the prerendered build at 375, 768 and 1280:
  - In the checker, 160 m² takes you to `/kontakt?type=enfamiliehus&m2=160&byggeri=nybyggeri`, and the dropdown and area are prefilled.
  - An empty submit shows "Udfyld feltet."; an invalid email shows "Skriv en gyldig mailadresse."
  - No horizontal overflow on `/` or `/kontakt`.
  - At 375 the header CTA is visible and 44 px high.
  - The menu opens with Enter and closes with Escape, and focus goes back to the toggle.
  - Contact order at 375: form at y=438, steps at y=1443. At 1280 the steps sit in the left column (y=565).
- `impeccable detect` on the changed files returns `[]`.
- Before and after screenshots (2x, JPEG) are in `docs/cloud-review/screenshots/design/{before,after}/`: home, contact, checker empty and checker with a result, at 375 and 1280. The nav change shows on every page; home covers it.

## References (Mobbin, web)

1. [Wix Marketplace, contact step](https://mobbin.com/screens/36826f7f-bb98-4373-a099-255e01825973). A "How it works" panel next to the form tells the visitor what happens after they submit. This is the pattern used for the new steps on /kontakt.
2. [Base44, contact a partner](https://mobbin.com/screens/e4a95c4f-75b0-4a70-b239-b032fff4c62b). A response-time promise next to the contact action, project-type chips, and the expert's photo beside the contact. It supports the 24-hour line by the button and the case for a portrait (finding 4).
3. [Superhuman, talk to sales](https://mobbin.com/screens/51d47445-4b4b-45df-9ae8-953a92bc897e). A short "what you get" checklist and trust logos sit next to a one-field form. Idea: put the Pricing inclusions list next to the contact form.
4. [Calendly-hosted lead form](https://mobbin.com/screens/4110e784-1731-4975-b637-b6b20379a1c7). The left column explains the request and the right holds a form with structured choices. It confirms the split layout DLH already uses.
5. [Zillow, contact agent](https://mobbin.com/screens/3d560f70-49a6-4c99-898a-57a7aed49807). A sticky side panel keeps the primary action in view while the visitor reads long content. Idea for project-type and blog pages: a sticky "Få et tilbud" card at desktop widths.
6. [Otter, home hero](https://mobbin.com/screens/d73f163b-0175-4247-8a2b-06e15fda35be). One attributed quote with a face directly under the hero CTAs. DLH has no testimonials yet; one named architect quote there would do the most for trust.
7. [Basecamp, pricing](https://mobbin.com/screens/29ef36ec-0911-43ff-977c-cf9ccc4cb6c9). A testimonial sits right next to the price block. Idea: put a client quote next to "Typisk 5.000-7.000 kr".
8. [Assembly, testimonials](https://mobbin.com/screens/e888ea97-01f1-4dcc-a82e-f20d21ea71a0). A large quote with portrait, name and company. A model for a References section with named clients, if Valdemar can get permission.

## Larger ideas not implemented

- **Portrait and named sender.** Put a real photo on /om-os and as a small avatar on /kontakt: "Du får svar fra Valdemar". Refs 2 and 8. Needs the photo.
- **Testimonials.** One or two named quotes from architects, under the hero CTA and next to the price. Refs 6, 7 and 8. Needs real quotes and permission; do not invent them.
- **File upload on the contact form.** "Send dine tegninger" (Pricing) points to a form with no upload; drawings go by email. Web3Forms upload needs a paid plan or another service. Ref 2.
- **Sticky quote card** on long pages: project types, blog posts, reference projects. Ref 5.
- **Inclusions next to the form.** Repeat the six Pricing bullets beside the contact form, so the visitor sees what the quote covers at the moment of asking. Ref 3.
- **Process diagram.** Move the loop note off the connector at 768 and 1280, and keep the row turn inside the content edge (finding 11).
- **Bundle size.** Code-split routes, and check whether framer-motion and posthog can load later.

## Waiting on Valdemar

- A portrait photo for /om-os and /kontakt.
- Whether "6,88 → 3,839" on the home reference card should read "6,88 → 3,84".
- Whether to rework the process loop placement (finding 11).
- Whether real testimonials can be collected.
- Updating or archiving `design-brief.md`.
