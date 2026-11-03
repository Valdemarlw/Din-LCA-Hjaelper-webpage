---
name: Din LCA Hjælper
description: BR18 LCA calculations by one named specialist, shown as a working answer with limits, units and a fixed price.
colors:
  green: "#173b33"
  green-deep: "#0f2a24"
  green-soft: "#e2efe8"
  mist: "#edf4f0"
  white: "#ffffff"
  spark: "#ff7a3d"
  spark-ink: "#1a0f08"
  paper: "#f6f7f5"
  ink: "#132320"
  body: "#3c4946"
  muted: "#5b6864"
  line: "#e0e6e3"
  brick: "#b2412a"
  ochre: "#8a5f0c"
typography:
  display:
    fontFamily: "Hedvig Letters Serif, Georgia, serif"
    fontSize: "5.25rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Hedvig Letters Serif, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  numeral:
    fontFamily: "Hedvig Letters Serif, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.25
  title:
    fontFamily: "Hanken Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.005em"
  lede:
    fontFamily: "Hanken Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Hanken Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1
rounded:
  inline: "8px"
  inset: "12px"
  tile: "16px"
  sheet: "24px"
  field: "32px"
  pill: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "32px"
  sheet-pad-mobile: "24px"
  sheet-pad-desktop: "32px"
  section-mobile: "80px"
  section-desktop: "112px"
  container: "72rem"
  field-max: "68rem"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.mist}"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.green-deep}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.green}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.green-soft}"
  button-spark:
    backgroundColor: "{colors.spark}"
    textColor: "{colors.spark-ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-spark-hover:
    backgroundColor: "#ff6a26"
  button-light:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.green}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  tag-soft:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.green}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  tag-spark:
    backgroundColor: "{colors.spark}"
    textColor: "{colors.spark-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  sheet-white:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.sheet}"
    padding: "32px"
  sheet-green:
    backgroundColor: "{colors.green}"
    textColor: "{colors.mist}"
    rounded: "{rounded.sheet}"
    padding: "32px"
  forest-field:
    backgroundColor: "{colors.green}"
    textColor: "{colors.mist}"
    rounded: "{rounded.field}"
    padding: "96px 48px"
  inline-field:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.green}"
    rounded: "{rounded.inline}"
    padding: "2px 28px 2px 8px"
  nav-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  nav-link-active:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.green}"
---

# Design System: Din LCA Hjælper

## Overview

**Creative North Star: "Skov og mandarin"**

A deep forest field, softened by fine grain and large rounded corners, carries the serious part: headlines, the hero check, the closing call. Around it the page is pale paper and mint, quiet and orderly, with hairline-ruled lists instead of boxed cards. One mandarin spark sits on the few things a visitor must not miss: the BR18 limit seal, the price, the phone button, selection and small markers.

The system shows the work the way the visitor's own documents show it. Numbers, limits and units are set in the display serif at reading size, so a limit value or a price reads like a figure in a report rather than a marketing badge. Density is moderate: generous section rhythm, tight internal lists.

Motion is rare and explanatory. The seal value settles in when the building type changes, the process connector draws once when it enters view, and its iteration loop draws last in spark. Everything else is static; sections do not fade in.

**Key Characteristics:**
- Rounded forest fields (24px mobile, 32px desktop) with grain, inset from the page edge.
- Hedvig Letters Serif at one weight (400) for headlines and figures; Hanken Grotesk for everything else.
- Pill buttons in the text face; hover shifts colour only, press scales to 0.97.
- Hairline lists on paper instead of card grids.
- Mandarin used sparingly as the single spark.

## Colors

A two-green world on tinted paper, with one warm mandarin accent and every neutral pulled toward the forest hue.

### Primary
- **Deep Forest** (green): hero, page-hero and final-CTA fields, primary buttons, the A4/A5 sheet, active icon strokes and the process connector. Large areas always carry the grain overlay.
- **Night Forest** (green-deep): primary button hover and the footer ground.

### Secondary
- **Pale Mint** (green-soft): icon tiles, check discs, soft tags, inline form fields, nav hover and active state, the light CTA panel.
- **Mist** (mist): lede text on forest fields (at 75-85% opacity), alternate section ground (process section), light button fill.

### Tertiary
- **Mandarin Spark** (spark): the hero limit seal, the price underline, the phone button and the spark button on forest fields, the "Inkluderet" tags, separator dots and bullet markers, link underlines, focus ring, text selection, footer column headings on Night Forest.
- **Spark Ink** (spark-ink): text on any mandarin fill.

### Neutral
- **Tinted Paper** (paper): page and section ground; the navbar sits on it.
- **White** (white): sheets, the hero check card, process discs, portrait caption.
- **Forest Ink** (ink): headings and strong text.
- **Body Slate** (body): running text, 17px.
- **Muted Slate** (muted): labels, units, captions, fine print.
- **Hairline** (line): list rules, sheet rings, dividers.
- **Brick** (brick) and **Ochre** (ochre): status only, as 10% tinted tags with full-strength text (over limit, warning). Never decorative.

### Named Rules
**The One Spark Rule.** Mandarin marks the limit, the price, the call and small markers; nothing else. If a second element on a screen competes with the seal or the price for the eye, it does not get spark.

**The Grain-on-Forest Rule.** Every Deep Forest or Night Forest field larger than a button carries the grain overlay (fractal noise, 20% opacity, overlay blend). Flat forest reads as a placeholder.

## Typography

**Display Font:** Hedvig Letters Serif (with Georgia, serif)
**Body Font:** Hanken Grotesk Variable (with Helvetica Neue, Arial, sans-serif)

**Character:** A warm letter-serif for statements and figures against a clear grotesk for instructions and controls. The serif speaks; the grotesk operates.

### Hierarchy
- **Display** (400, 2.85rem mobile to 5.25rem at lg, line-height 1.02, -0.015em): the home hero headline only, centred, max 12ch. Subpage heroes use 2.5rem to 4rem at 1.05, left-aligned.
- **Headline** (400, 2.25rem mobile to 3rem desktop, 1.05): section h2, left-aligned, max 14-18ch where set. Panel headlines step down to 1.75-2rem.
- **Numeral** (400, 1.35-1.5rem, tight): output values, limit values, prices and the phone number on the final CTA. The headline price uses 2.4-3rem.
- **Title** (600, 18px, snug): h3 in lists, steps and FAQ questions.
- **Lede** (400, 18px mobile to 20px desktop, relaxed): the paragraph under a headline, max 46-48ch.
- **Body** (400, 17px, 1.6): running text, max 52-68ch. Secondary list text is 15px.
- **Label** (500, 13px, sentence case): output labels, units, tags, fine print, in Muted Slate.

### Named Rules
**The Single Weight Rule.** h1 and h2 are always Hedvig Letters Serif at 400; the base layer forces it so no browser fakes a bold. Hierarchy comes from size, never weight.

**The Figures-in-Serif Rule.** A number the visitor came for (limit, price, result) is set in the display serif, with its unit in 13px grotesk Muted Slate beside it.

## Layout

Content sits in a 72rem container with 20px gutters on mobile and 32px from md. Forest fields are a separate, slightly narrower frame (68rem max) inset 12px from the viewport on mobile and 32px from md, so they read as rounded objects on the paper rather than full-bleed bands. The footer is the one full-bleed forest surface.

Sections run on a fixed rhythm: 80px vertical padding on mobile, 112px from md (tight variant 48px / 64px). Section grounds alternate between paper and mist; there are no dividing rules between sections.

Desktop compositions use a 12-column grid with asymmetric splits (7/5 for list plus panel, 5/6 for price plus sheet, 8/4 for the final CTA). Everything stacks to one column on phones. The hero is centred; every other section is left-aligned. The process grid goes 1, 2, 3 columns with a snake reading order so the connector never crosses itself.

Breakpoints are Tailwind defaults: 640, 768, 1024, 1280px. Check at 375, 768 and 1280.

## Elevation & Depth

Flat by default. Depth comes from tonal contrast (white sheet on paper, paper against forest) and from hairline rings, not shadows. Sheets carry a 1px Hairline ring instead of a shadow.

### Shadow Vocabulary
- **Nav hairline** (`box-shadow: 0 1px 0 rgb(19 35 32 / 0.06)`): the navbar once the page scrolls, with 95% paper and a light backdrop blur.
- **Floating sheet** (`box-shadow: 0 24px 48px -32px rgb(19 35 32 / 0.35)`): surfaces that float over content, such as the analytics consent panel.
- **Object lift** (soft, negative-spread drops, e.g. `0 18px 30px -18px rgb(0 0 0 / 0.55)` on the seal, `0 10px 24px -14px rgb(19 35 32 / 0.45)` on the portrait caption): a physical object resting on a surface. Rare; one per composition at most.

### Named Rules
**The Hairline-Not-Shadow Rule.** A surface that sits in the page flow gets a 1px Hairline ring. Shadows are only for things that float over other content.

## Shapes

Large, soft corners on surfaces, full pills on controls. Forest fields are 24px on mobile and 32px from md. Sheets and panels are 24px. Icon tiles and small floating captions are 16px. Inset data boxes inside tools are 12px. Inline form fields are 8px. Buttons, tags, nav links, step discs and number badges are fully round.

Overflow is clipped to the corner on every rounded surface so grain and imagery follow the radius. The portrait is greyscale and clipped to the sheet radius.

The white hero check card rises out of the forest field's bottom edge: only its top corners are rounded (22px) and it meets the field's bottom with no gap.

## Components

### Buttons
Tactile and plain: pills in the text face that change colour, never lift.
- **Shape:** full pill; 48px tall with 24px side padding (md), 40px with 16px (sm); 15px or 14px semibold, a trailing arrow icon where the action moves forward.
- **Primary:** Deep Forest with Mist text; hover to Night Forest. The default on paper.
- **Secondary:** transparent with a 30% forest border and forest text; hover fills Pale Mint and firms the border. Pairs with a primary.
- **Spark:** Mandarin with Spark Ink text; hover to a slightly deeper mandarin. Only on forest fields and for the phone call.
- **Light:** Mist with forest text; hover to white.
- **Ghost:** forest text, Pale Mint on hover.
- **States:** colour transition 150ms ease-out; press scales to 0.97; focus is the 2px mandarin outline at 3px offset; disabled at 60% opacity.

### Tags
- **Style:** pill, 13px medium, 6px by 12px. Soft (Pale Mint / forest), Mist, Outline (Hairline border, body text), Light (12% white on forest), Spark, and status Brick and Ochre at 10% fill.
- **Use:** inclusion and status facts ("Inkluderet", "A4+A5 inkluderet"), never as a heading device.

### Cards / Containers
- **Corner Style:** 24px (sheet), 32px on desktop forest fields.
- **Background:** white with a Hairline ring; Mist; Pale Mint; or Deep Forest with grain and Mist text.
- **Shadow Strategy:** none in flow (see Elevation & Depth).
- **Internal Padding:** 24px mobile, 32px desktop; CTA panels 32px to 40px.

### Hairline Lists
The default way to show a set of items. Rows separated by 1px Hairline rules top and bottom, 20-24px vertical padding. Service rows lead with a 52px Pale Mint tile holding a 26px line icon; inclusion rows lead with a 24px Pale Mint check disc; FAQ rows end with a 28px round plus button that rotates 45 degrees when open and expands with a grid-rows transition.

### Inputs / Fields
- **Inline sentence field:** Pale Mint fill, forest semibold text, 8px radius, a 2px forest underline drawn as an inset bottom shadow; hover darkens the mint slightly. Native selects sit transparent on top of the visible label so keyboard and the phone picker keep working.
- **Focus:** 2px mandarin outline at 2px offset; caret in Deep Forest.

### Navigation
Fixed bar on paper, 64px tall on mobile and 80px from md, hides on scroll down and returns on scroll up. Links are 15px medium pills in 80% ink; hover and active fill Pale Mint with forest text. A small primary "Få et tilbud" button sits at the end. On mobile the menu opens below the bar as hairline-ruled 18px rows with a full-width primary button; Escape closes it.

### Footer
Full-bleed Night Forest with grain. 15px links in 80% Mist that go white on hover; column headings in 14px semibold Mandarin; a 15% white hairline above the legal row.

### Limit Seal (signature)
A Mandarin disc rotated -6 degrees, 96px on phones and up to 160px at xl, pinned top right of the home hero field from lg. The live limit value is set in the display serif with its unit beneath; from lg a ring of tracked capitals ("GRÆNSEVÆRDI · BR18 § 298") runs around the edge like a stamp. The value settles in (240ms, strong ease-out) when it changes. The ring lettering belongs to the seal only.

### Process Connector (signature)
Six steps on 56px white discs with a forest ring and line icon, each with a small numbered forest badge. One 1.5px forest stroke at 35% joins them with soft quarter-circle turns and small chevrons, drawn once on entry (2.4s). The optimise-and-recalculate iteration after step 03 is a 2.5px Mandarin loop that draws last. Reduced motion shows both lines fully drawn.

## Do's and Don'ts

### Do:
- **Do** put headlines and figures in Hedvig Letters Serif at 400 and let size carry hierarchy.
- **Do** frame the opening and closing of a page in a rounded, grained Deep Forest field inset from the viewport edge.
- **Do** list items with hairline rules on paper; reach for a white sheet with a Hairline ring only when a group needs to read as one object.
- **Do** keep Mandarin to the limit, the price, the call and small markers (dots, bullets, underlines, focus).
- **Do** set units and labels in 13px Muted Slate next to a serif figure.
- **Do** use line icons at 1.6 stroke with round caps, in forest, on Pale Mint tiles or white discs.
- **Do** give every interactive element the 2px Mandarin focus outline.

### Don't:
- **Don't** bold Hedvig Letters Serif or set h1/h2 in the grotesk.
- **Don't** put a small uppercase or tracked label above a headline; tracked capitals live only on the limit seal's ring.
- **Don't** use shadows on in-flow sheets or cards; use the Hairline ring.
- **Don't** fade or slide sections in on scroll; motion is reserved for the seal value and the process connector.
- **Don't** use Brick or Ochre as decoration; they mean status.
- **Don't** leave a large forest area flat without grain.
