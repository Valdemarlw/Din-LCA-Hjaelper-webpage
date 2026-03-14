# Task: Build the Din LCA Hjælper website

## Context
We've completed content strategy and design planning for a B2B marketing website. All decisions are documented. Your job is to read the briefs and build the site.

## Step 1: Read these files in order
1. `content-strategy.md` — what to say, page structure, messaging, A4/A5 strategy
2. `design-brief.md` — how it looks, typography, design principles, layout specs, technical requirements
3. `scraped-content.md` — old website content for reference only (much is outdated, B2C content should be ignored)

## Step 2: Propose a color palette
The color palette was intentionally left open. Propose one before building. Constraints:
- Take cues from the sibling brand at https://www.a45lca.dk/ (greens/teals)
- Restrained: one accent color + neutrals
- Works with the existing logo (dark navy + teal/mint gradient — see `1 Skabeloner/Logo/Logo - hvid baggrund.png`)
- Light background, B2B professional aesthetic
- Present the palette for approval before writing code

## Step 3: Build the site
Use the /frontend skill. Build a modern, fast, responsive marketing site.

Tech: Vite + React (or whatever the skill recommends for a lightweight marketing site). Keep dependencies minimal.

### Pages to build (in order):
1. **Homepage** — 6 sections as specified in design-brief.md: Hero → Problem → Services → Process → Pricing → Final CTA
2. **Om Os** — short about page
3. **Kontakt** — split layout with form (fields specified in design-brief.md), form sends to valdemar.wernblad@dinlcahjælper.dk

### Navigation & Footer as specified in the brief.

## Step 4: Verify
Check responsiveness at 375px, 768px, 1280px+. Run the dev server and confirm it works.

## Key constraints (do not deviate)
- Danish language only
- B2B only — targeting small architecture firms
- CTA everywhere: "Få et tilbud"
- A45 is a KEY value anchor — "Fra 3.500 kr — inkl. A45 adgang". No separate A4/A5 price. No link to A45 pricing page.
- No mention of: student status, specific calculation tools, education
- Font: Inter (or DM Sans)
- The feel: confident, calm, clear — generous whitespace, strong typographic hierarchy, restrained color
- WCAG 2.1 AA accessibility
- Page load under 2 seconds
- Phone: +45 29 89 99 99
- Email: valdemar.wernblad@dinlcahjælper.dk
- Logo: `1 Skabeloner/Logo/Logo - hvid baggrund.png` (needs transparent bg — open to redesign)

## Reference sites for design feel
- https://ramp.com/ — confident hero, clear hierarchy, unhurried pacing
- https://www.notion.com/ — generous whitespace, progressive disclosure, clean
- https://www.a45lca.dk/ — sibling brand, color reference
