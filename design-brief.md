# Din LCA Hjælper — Design Brief

This document contains everything needed to design and build the website. Read this file and `content-strategy.md` together — this file covers how it should look and feel, content-strategy.md covers what to say and why.

---

## 1. Context

Din LCA Hjælper is a B2B LCA (Life Cycle Assessment) consulting service for small Danish architecture firms (1-5 people). We handle LCA calculations for their building projects so they comply with BR18 climate regulations.

The website has 3 pages: Homepage, Om Os (About), Kontakt (Contact). The homepage includes pricing. The goal is to get architects to submit their project and request a quote.

**Sibling brand:** A45 (a45lca.dk) — a software platform for A4/A5 documentation, also run by the same person. Access to A45 is included as a value-add in the LCA service. The two brands should feel related but not identical.

---

## 2. Design Direction

### The Feel

- **Confident** — We know what we're doing. No overexplaining.
- **Calm** — Nothing competes for attention. Every section breathes.
- **Clear** — The visitor always knows what to read and what to do next.

### Reference Sites

- **Ramp.com** — Dark, confident hero; clear product sections; strong typographic hierarchy; unhurried pacing
- **Notion.com** — Light, generous whitespace; bento grid layouts; progressive disclosure; clean and modern
- **A45lca.dk** — Green/teal palette; the sibling brand to stay visually connected to

**Shared DNA from references:** Both Ramp and Notion feel confident and unhurried. They don't cram everything above the fold. They trust the visitor will scroll. Whitespace is a design element, not wasted space. Clear visual hierarchy at every point — you always know what to look at first, second, third.

---

## 3. Color Palette

**Intentionally left open.** Propose a color palette that:

- Takes cues from the A45 sibling brand (greens/teals) so the two feel related
- Uses a restrained palette: one accent color (likely teal) plus neutrals
- Color guides attention, it doesn't decorate
- No rainbow gradients, no colored section backgrounds, no multi-color text
- The existing logo uses dark navy + teal/mint gradient — this can inform the direction
- Light background preferred (not dark mode — the audience is construction professionals)

---

## 4. Typography

**Primary font:** Inter (fallback: system sans-serif). Clean, highly legible, handles Danish characters (æ, ø, å) well.

**Alternative if a warmer feel is preferred:** DM Sans — geometric but softer.

### Type Scale

| Element | Size (desktop) | Weight | Line Height |
|---|---|---|---|
| Hero headline | 52–60px | Bold (700) | 1.1 |
| Section headline | 32–40px | Semibold (600) | 1.2 |
| Sub-headline | 20–24px | Medium (500) | 1.4 |
| Body text | 16–18px | Regular (400) | 1.6–1.7 |
| Small / meta text | 14px | Regular (400) | 1.5 |
| CTA button text | 16px | Semibold (600) | — |

### Rules

- One bold headline, one supporting sentence, one CTA per section — maximum
- Clear weight contrast between heading levels
- Body text must be comfortable to read at 60–70 characters per line

---

## 5. Design Principles

### 1. Generous Whitespace
Whitespace is the primary design element. Large padding between sections (80–120px). Let key messages stand alone. Never cram features, logos, and CTAs into tight spaces.

### 2. Strong Typographic Hierarchy
Typography does the heavy lifting, not graphics. At any point on the page, the visitor should know what to read first, second, and third. Avoid multiple competing headlines or same-size text blocks.

### 3. Restrained Color Palette
One accent color (teal) plus neutrals. Color guides attention, it doesn't decorate. No rainbow gradients, no colored section backgrounds, no multi-color text.

### 4. Purposeful Animation
Motion should clarify, not decorate. Subtle scroll-triggered reveals, smooth transitions, micro-interactions that confirm user actions. No bouncing elements, spinning loaders, or auto-playing video.

### 5. Progressive Disclosure
Don't overwhelm. Lead with the core value proposition, layer in details as they scroll. Each scroll-stop answers one question before introducing the next.

---

## 6. Homepage Structure

Each section is a full "moment" — one purpose, one message, one action.

### Section 1: Hero
**Purpose:** What we do + for whom, in 5 seconds.

- Large headline + subheadline
- Price anchor: "Fra 3.500 kr — inkl. A45 adgang"
- Single CTA: "Få et tilbud"
- Clean — no clutter, just the message
- Light background preferred, but a dark navy hero transitioning to light is also an option

### Section 2: Problem
**Purpose:** Why this matters now.

- 2–3 short points about why LCA compliance matters
- Scannable — icons or simple illustrations
- Speak to the pain: it's lovpligtigt, it's confusing, deadlines are real

### Section 3: What You Get
**Purpose:** Services overview.

- Card-based layout
- Each service as a clear item: LCA-beregning, hotspot-analyse, materialeoptimering, myndighedsklar rapport, A45 adgang
- A45 highlighted as a value-add bonus — this is a KEY part of the proposition, not a footnote

### Section 4: Process
**Purpose:** How it works — remove uncertainty.

- 4-step visualization (horizontal or vertical)
- Send projekt → Modtag tilbud → Tidlig beregning → Myndighedsklar rapport
- Simple icons or numbered steps

### Section 5: Pricing
**Purpose:** Transparency builds trust.

- Single clear price block: "Fra 3.500 kr"
- What's included (short bullet list)
- A45 access called out prominently as included
- Note: "Prisen afhænger af projektets omfang"
- CTA: "Få et tilbud"

### Section 6: Final CTA
**Purpose:** Close the loop.

- Reinforce value prop in one line
- CTA button + contact info (phone + email)
- Confident, not desperate

---

## 7. Secondary Pages

### Om Os (About)

- Short page, 2–3 paragraphs
- Who is Valdemar — focus on LCA specialization and domain expertise
- "Erfaring fra projekter fra 80 til 3.000 m²" — residential, commercial, industrial
- Mention A45 connection (positions credibility — he's not just a consultant, he builds tools too)
- Professional photo if available — B2B buyers trust people, not logos
- Do NOT mention student status or education

### Kontakt

Split layout:
- **Left:** Intro text + direct contact info (phone, email)
- **Right:** Contact form

**Form fields:**

| Field | Required | Type |
|---|---|---|
| Navn | Yes | Text |
| Email | Yes | Email |
| Telefon | No | Tel |
| Projekttype | No | Dropdown: Bolig / Erhverv / Industri / Andet |
| Estimeret areal m² | No | Number |
| Tidshorisont | No | Text |
| Besked | No | Textarea |
| Vedhæft filer | No | File upload (drawings, PDFs) |

- CTA button: "Send forespørgsel"
- Form sends to: valdemar.wernblad@dinlcahjælper.dk
- Show phone number prominently — this audience often prefers calling
- Phone: +45 29 89 99 99

---

## 8. Navigation

- Logo (left)
- Links: Om os · Kontakt
- CTA button (right): "Få et tilbud"
- Sticky on scroll
- Clean and minimal — like Ramp's nav
- Mobile: hamburger menu with same structure

---

## 9. Footer

- Contact info: phone + email
- Links: Om os · Kontakt
- "Powered by A45" or small A45 logo with link
- CVR number
- Keep it minimal

---

## 10. What to Avoid

- Decorative animations or parallax effects with no purpose
- Stock photography of construction sites or people pointing at screens
- Cluttered layouts or more than 3 colors
- Multiple competing CTAs on the same screen
- Mentioning specific calculation tools (LCAbyg, etc.)
- Any reference to being a student or education status
- Dark mode by default — the audience is construction professionals
- Walls of text — every section should make one clear point
- Heavy 3D renders or gradient-heavy hero sections

---

## 11. Technical Requirements

- Desktop and mobile-first responsive design
- Page load under 2 seconds — minimal dependencies, no heavy hero videos
- Danish language only
- SEO: meta descriptions, schema markup, alt text on all images
- Cookie consent handling compliant with Danish/EU regulations
- Accessibility: WCAG 2.1 AA minimum — proper contrast, keyboard navigation
- Analytics: track form submissions, scroll depth, time on page, CTA clicks

---

## 12. Assets Available

- **Logo:** PNG with white background at `1 Skabeloner/Logo/Logo - hvid baggrund.png` — needs transparent background version or SVG conversion. Logo may be redesigned during the design phase.
- **Logo description:** House outline with a hand holding leaves inside. Text "DIN LCA HJÆLPER" below. Colors: dark navy + teal/mint gradient.
- **Domain:** dinlcahjælper.dk
- **Phone:** +45 29 89 99 99
- **Email:** valdemar.wernblad@dinlcahjælper.dk
