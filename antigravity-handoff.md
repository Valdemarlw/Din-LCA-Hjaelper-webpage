# Antigravity Handoff — Din LCA Hjælper Website

## What happened so far (in Claude Code)

We completed Phase 1: Content Strategy & Copywriting. The full business context, messaging, positioning, and design direction have been worked out across two documents:

1. **`content-strategy.md`** — What to say and why. Target audience, pain points, positioning, tone, page structure, section-by-section content direction, A4/A5 strategy, navigation, and all copy decisions.
2. **`design-brief.md`** — How it should look and feel. Design principles, typography (Inter, full type scale), color direction (intentionally left open for you to propose — take cues from the sibling brand at a45lca.dk), section-by-section layout specs, reference sites (Ramp.com, Notion.com), technical requirements, what to avoid, and all available assets.

**Read both files completely before doing anything.** They are the source of truth for this project.

---

## What you need to do now

### Step 1: Read the briefs
Read `content-strategy.md` and `design-brief.md` in full. Everything you need is in there — business context, audience, tone, page structure, typography, design principles, technical requirements, and constraints.

### Step 2: Propose a color palette
The color palette was intentionally left open. Propose one that:
- Takes cues from the A45 sibling brand (a45lca.dk) — greens/teals
- Stays restrained: one accent color + neutrals
- Works with the existing logo (dark navy + teal/mint gradient, house with hand holding leaves)
- Suits a light-background B2B professional site for Danish construction industry

### Step 3: Generate visual mockups
Before writing any code, use your `generate_image` tool to create mockups of:
- The hero section (try both light bg and dark navy options — the brief mentions both)
- The pricing section (this is critical — needs to feel transparent and trustworthy)
- The overall page flow/layout

We'll agree on the visual direction before any code gets written.

### Step 4: Initialize and build
Once the visual direction is approved:
- Initialize the project (Vite + React, or whatever you recommend for a fast, lightweight marketing site)
- Build section by section following the homepage structure in the design brief (6 sections)
- Then build the two secondary pages (Om Os, Kontakt with the form)
- Use the typography scale and design principles from the brief exactly as specified

### Step 5: Verify
Use your browser tool to verify the site looks correct, is responsive, and works across breakpoints (375px mobile, 768px tablet, 1280px+ desktop).

---

## Key decisions already made (do not change these)

- **B2B only** — targeting small architecture firms, not private clients
- **3 pages:** Homepage (with pricing), Om Os, Kontakt
- **CTA:** "Få et tilbud" everywhere
- **A45 access is a key value anchor** — included in the price, highlighted prominently, but NO separate price listed for A4/A5 and NO link to A45 pricing
- **No mention of:** student status, specific calculation tools (LCAbyg), education
- **Danish language only**
- **Font:** Inter (or DM Sans if warmer feel is better)
- **The feel:** Confident, calm, clear
- **Light background** preferred (not dark mode)

---

## Files to read
- `content-strategy.md` — start here
- `design-brief.md` — then here
- `scraped-content.md` — the old website content, for reference only (much of this is outdated)

---

## Logo
Available at: `1 Skabeloner/Logo/Logo - hvid baggrund.png`
It's a PNG with white background — needs transparent bg or SVG conversion. Open to redesigning it during the design phase.

## Contact info for the site
- Phone: +45 29 89 99 99
- Email: valdemar.wernblad@dinlcahjælper.dk
- Domain: dinlcahjælper.dk
