# Analytics, Conversion Tracking & GDPR Consent Plan

**Site:** dinlcahjælper.dk (React 19 + Vite SPA, static-prerendered via `scripts/prerender.ts`, deployed on Vercel)
**Status:** Plan only — nothing implemented yet. The site has **zero** tracking today (no GA4, no GTM, no dataLayer, no consent tooling anywhere in `src/` or `index.html`).
**Why:** `design-brief.md` §11 requires "Analytics: track form submissions, scroll depth, time on page, CTA clicks" and "Cookie consent handling compliant with Danish/EU regulations". The site's entire purpose is quote requests ("Få et tilbud") — right now we cannot see whether a single visitor converts, which CTA works, or whether the BR18-tjekker actually feeds the contact form.

---

## 1. Tool recommendation: Plausible Analytics (cloud, EU) — clear call

**Use Plausible Analytics (plausible.io), Growth plan.** Cookieless, EU-owned (Estonia), EU-hosted (Hetzner, Germany), script under 1 KB, custom events, SPA-aware out of the box, no consent banner needed.

### Why not GA4 (the honest comparison)

| | Plausible | GA4 |
|---|---|---|
| Price | ~$9/mo (10k pageviews, EU residency included; annual ≈ $90) — verify current price at signup | Free |
| Cookies / device storage | **None** — no cookies, no localStorage | Sets `_ga` cookies → triggers the Danish cookie rules |
| Consent banner in Denmark | **Not required** (see §5) | **Required** — statistics cookies need samtykke under cookiebekendtgørelsen |
| Script weight | <1 KB, one request | ~90+ KB gtag.js, plus a CMP (Cookiebot etc.) adds ~50–100 KB more |
| Google Ads integration | None | Native (conversion import, remarketing audiences) |
| Data depth | Pageviews, events, sources, funnels (Business plan), scroll depth, time on page | Much deeper (user-level, BigQuery, audiences) |
| Fit with CLAUDE.md ("minimal JS, no bloat, fast load under 2s") | Perfect | Poor — gtag + banner is exactly the bloat the brief bans |

The decisive point: **the site needs no cookie banner today, and adding GA4 would force one.** A consent banner on a conversion-focused marketing site (a) costs money (Cookiebot-class CMPs are a recurring subscription), (b) adds JS weight against the <2s load budget, (c) loses 20–50% of the data anyway (rejected consents are unmeasured), and (d) is friction on the exact page where we want people to fill in a form. GA4's real advantages — free, and Google Ads conversion import — only matter if/when Valdemar runs paid Google Ads. If that happens later, add Google Ads' own conversion tag behind a CMP *then*; don't pay the banner tax now for data we won't use.

Alternatives considered: **Fathom** (similar, company is Canadian; EU isolation exists but Plausible's fully-EU story is simpler to defend to Datatilsynet), **Umami Cloud** (has a free tier, but US company and weaker funnel/goal UX), **self-hosted Umami/Plausible CE** (free but adds server ops to a solo founder — not worth it), **Vercel Analytics** (cookieless and zero-setup, but no custom-event taxonomy on the cheap tier and locks data into Vercel). Plausible is the clear call.

**Plan choice:** start on **Growth** ($9/mo tier). The Funnels feature is Business-plan only (~$19/mo) — start on Growth, read the funnel manually via goal filters (see §3), and upgrade only if the manual reading becomes tedious. Prices verified against plausible.io July 2026 search results; confirm at signup.

**IDN gotcha:** the domain is an IDN. Punycode form: `xn--dinlcahjlper-edb.dk`. When adding the site in Plausible, use exactly the form Plausible's "add site" flow accepts (try `dinlcahjælper.dk` first), and make `data-domain` in the snippet match that registered name character-for-character — otherwise every event is silently dropped. Verify with the live dashboard on day one (checklist §7).

---

## 2. Event taxonomy

Convention: lowercase snake_case event names; context in props, never in the event name; **no PII in props** (no names, emails, phone numbers, free-text). Areal is bucketed, never raw.

### 2.1 Conversion events (the ones that matter)

| Event | Trigger point (exact file) | Props |
|---|---|---|
| `contact_form_submitted` | `src/pages/ContactPage.tsx` `handleSubmit` — after the Web3Forms `fetch` resolves: `result: "success"` on `res.ok`, `result: "error"` in the `else` and `catch` branches | `result` ("success"/"error"), `project_type` (select value or `"ikke-valgt"`), `areal` (bucket, see §4.2) |
| `contact_form_started` | `src/pages/ContactPage.tsx` — first focus inside the `<form>` (`onFocusCapture`, fired once per page view via a ref) | — |
| `cta_clicked` | Every quote/contact CTA, via a new `analytics` prop on `src/components/ui/Button.tsx` + manual handlers on the two raw `<Link>` CTAs (inventory in §2.2) | `location`, `label`, `target` (`"/kontakt"` or `"/vaerktoejer/br18-tjekker"`) |
| `outbound_contact_clicked` | All `tel:` / `mailto:` anchors (inventory in §2.3) | `channel` ("tel"/"mail"), `location` |

### 2.2 CTA inventory — every `cta_clicked` location

All of these currently render with **no** click tracking. `location` values are fixed strings:

| `location` | Component / file | Label today | Target |
|---|---|---|---|
| `navbar` | `src/components/layout/Navbar.tsx` (desktop, ~line 56) | "Start din LCA" | /kontakt |
| `navbar_mobile` | `src/components/layout/Navbar.tsx` (mobile menu, ~line 93) | "Start din LCA" | /kontakt |
| `hero` | `src/components/sections/Hero.tsx` (~line 58) | "Få et tilbud" | /kontakt |
| `pricing_section` | `src/components/sections/Pricing.tsx` (~line 42) | "Send dine tegninger" | /kontakt |
| `pricing_section_tool` | `src/components/sections/Pricing.tsx` (~line 41) | "Estimér din pris" | /vaerktoejer/br18-tjekker |
| `final_cta` | `src/components/sections/FinalCTA.tsx` (~line 24) | "Send tegninger, få pris" | /kontakt |
| `blog_post` | `src/pages/BlogPostPage.tsx` (~line 230) | "Få et tilbud" | /kontakt |
| `project_type_page` | `src/pages/ProjectTypePage.tsx` (~line 186) | "Få et tilbud" | /kontakt |
| `project_types_hub` | `src/pages/ProjectTypesPage.tsx` (if/where a CTA exists — none found in grep; skip unless added) | — | — |
| `reference_project` | `src/pages/ReferenceProjectPage.tsx` (~line 200) | "Få et tilbud" | /kontakt |
| `comparison_page` | `src/pages/ComparisonPage.tsx` (~line 235) | "Få et tilbud" | /kontakt |
| `glossary_term` | `src/pages/GlossaryTermPage.tsx` (~line 274) | "Få et tilbud" | /kontakt |
| `about_page` | `src/pages/AboutPage.tsx` (~line 75) | "Kontakt os" | /kontakt |
| `faq_page` | `src/pages/FAQPage.tsx` (~line 198) — **raw `<Link>`, not `Button`** — needs a manual `onClick` | "Send dine tegninger" | /kontakt |
| `br18_checker_result` | `src/components/tools/BR18Checker.tsx` (~line 243) | "Få et fast tilbud" | /kontakt |
| `br18_checker_faq` | `src/pages/BR18CheckerPage.tsx` (~line 171) — **raw `<Link>`** — manual `onClick` | "Send dine tegninger" | /kontakt |
| `article_body` | `src/components/content/RenderSection.tsx` `InlineLinks` (~line 17) — markdown links inside blog/comparison content; fire only when `url === "/kontakt"` | link text | /kontakt |

Footer's plain "Kontakt" nav link (`src/components/layout/Footer.tsx` ~line 45) is navigation, not a CTA — leave it untracked to keep the data clean.

### 2.3 Outbound contact (`tel:` / `mailto:`) inventory

| `location` | File | Anchors |
|---|---|---|
| `contact_page` | `src/pages/ContactPage.tsx` (~lines 77–95, plus mailto ~line 100 and error-state mailto ~line 238) | tel + mail |
| `final_cta` | `src/components/sections/FinalCTA.tsx` (~lines 30–37) | tel + mail |
| `footer` | `src/components/layout/Footer.tsx` (~lines 55–62) | tel + mail |

These matter because Danish construction people often skip the form and just call — without this event, phone-driven conversions are invisible.

### 2.4 Tool events (BR18-tjekker + prisestimat)

| Event | Trigger point | Props |
|---|---|---|
| `br18_checker_completed` | `src/components/tools/BR18Checker.tsx` — the first time `resultat` becomes non-null in a page view (a valid areal was entered → result card rendered). `useEffect` + ref guard. | `status` (`lovpligtig` / `kun_dokumentation` / `undtaget_tilbygning` / `undtaget_helt`), `bygningstype`, `byggeri`, `areal` (bucket) |
| `price_estimate_shown` | `src/components/tools/PrisEstimat.tsx` — on mount (it only mounts when the checker shows a price). | `pris_type`, `estimat` (`"interval"` / `"individuelt"`), `frivillig` (boolean) |
| `maengdeudtraek_toggled` *(optional, nice-to-have)* | `PrisEstimat.tsx` checkbox `onChange` (~line 58) | `checked` |

### 2.5 Content engagement — scroll depth & time on page

Per design-brief §11. **No custom code**: Plausible's standard script now reports scroll depth and time-on-page per page in the dashboard (rolled out 2025 — verify it appears in the dashboard at setup; it did in the July 2026 product pages). Blog posts render inside `<article>` in `src/pages/BlogPostPage.tsx`, so per-URL scroll depth on `/blog/*` answers "do people actually read the articles" with zero code. If the metric turns out to be missing on the chosen plan, fall back to a tiny `scroll_depth` custom event (25/50/75/100 thresholds) in `BlogPostPage.tsx` — deliberately not specced further until needed.

External-link tracking (the `a45lca.dk` links): use Plausible's combined script extension `script.outbound-links.js` instead of hand-writing anything.

---

## 3. Funnel definition

**Primary funnel — "tool → quote":**
1. Pageview `/vaerktoejer/br18-tjekker` (or any landing page)
2. `br18_checker_completed`
3. Pageview `/kontakt`
4. `contact_form_submitted` (props filter: `result=success`)

**Secondary funnel — "content → quote":** pageview `/blog/*` or `/ordbog/*` → pageview `/kontakt` → `contact_form_submitted (success)`.

On **Growth** plan (no Funnels feature): read it manually — open the `br18_checker_completed` goal, note uniques; filter the `/kontakt` pageview goal by "entry page = /vaerktoejer/br18-tjekker"; compare against `contact_form_submitted` uniques. Five minutes weekly. On **Business** plan: define both funnels in the UI once and read the chart. Upgrade only if Growth-plan manual reading annoys.

The `cta_clicked → location` breakdown is the funnel's diagnostic layer: it tells you *which* CTA fed step 3.

---

## 4. Implementation sketch

### 4.1 Snippet — where it goes given the prerender setup

Put the snippet in **`index.html` `<head>`** (the real file at repo root, next to the JSON-LD block). `scripts/prerender.ts` captures each route's full DOM with `page.content()` and writes it to `dist/<route>/index.html`, so a plain script tag in the source `<head>` is automatically baked into **every** prerendered page. Nothing in `prerender.ts` needs to change.

```html
<!-- index.html, in <head> -->
<script
  defer
  data-domain="dinlcahjælper.dk"
  src="https://plausible.io/js/script.outbound-links.js"
></script>
<script>
  window.plausible =
    window.plausible ||
    function () {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
</script>
```

Three facts that make this safe in this codebase:

- **Prerender won't pollute the data.** The prerender run visits `http://localhost:<port>`; Plausible's script ignores localhost by default, so the Playwright visits during `npm run build:prerender` never register. Same for `npm run dev`.
- **SPA navigation is handled.** Plausible's default script listens for `pushState`, so react-router route changes count as pageviews without a route-change hook.
- **React StrictMode double-mount** (`src/main.tsx` wraps in `<StrictMode>`) double-fires `useEffect` in dev only — and dev is localhost, which is ignored. Production mounts once. No dedupe gymnastics needed beyond the refs already specced.

`data-domain` must match the site name registered in Plausible exactly (see IDN note in §1; punycode form is `xn--dinlcahjlper-edb.dk` if the unicode form is rejected).

### 4.2 `track()` helper — new file `src/lib/analytics.ts`

```ts
/**
 * Tiny typed wrapper around Plausible custom events.
 * No-ops when the script is blocked or not yet loaded (the queue stub
 * in index.html buffers early calls). Never put PII in props.
 */

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export type AnalyticsEvent =
  | "contact_form_started"
  | "contact_form_submitted"
  | "cta_clicked"
  | "outbound_contact_clicked"
  | "br18_checker_completed"
  | "price_estimate_shown"
  | "maengdeudtraek_toggled";

export function track(event: AnalyticsEvent, props?: Props) {
  window.plausible?.(event, props ? { props } : undefined);
}

/** Bucket areal so raw project sizes never leave the browser. */
export function arealBucket(m2: number): string {
  if (!Number.isFinite(m2) || m2 <= 0) return "ukendt";
  if (m2 < 100) return "under-100";
  if (m2 <= 250) return "100-250";
  if (m2 <= 1000) return "251-1000";
  return "over-1000";
}
```

### 4.3 Event #1 — quote-form submit (`src/pages/ContactPage.tsx`)

The most important event on the site. Changes to `handleSubmit` plus a one-shot form-start:

```tsx
import { useState, useRef } from "react";
import { track, arealBucket } from "../lib/analytics";

// inside ContactPage():
const startedRef = useRef(false);
function handleFormStart() {
  if (startedRef.current) return;
  startedRef.current = true;
  track("contact_form_started");
}

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setSubmitting(true);
  setError(false);

  const form = e.currentTarget;
  const data = new FormData(form);
  const submitProps = {
    project_type: String(data.get("project-type") || "ikke-valgt"),
    areal: arealBucket(Number(data.get("area"))),
  };
  data.append("access_key", WEB3FORMS_KEY);
  data.append("subject", "Ny forespørgsel fra dinlcahjælper.dk");

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      track("contact_form_submitted", { result: "success", ...submitProps });
      setSubmitted(true);
      form.reset();
    } else {
      track("contact_form_submitted", { result: "error", ...submitProps });
      setError(true);
    }
  } catch {
    track("contact_form_submitted", { result: "error", ...submitProps });
    setError(true);
  } finally {
    setSubmitting(false);
  }
}
```

And on the `<form>` element: `onFocusCapture={handleFormStart}`. The `started → submitted(success)` ratio is the form-abandonment number.

### 4.4 Event #2 — CTA clicks (one prop on `src/components/ui/Button.tsx`)

Nearly every CTA already goes through `Button`, so instrument once there:

```tsx
import { track } from "../../lib/analytics";

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "inverted";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  /** When set, clicking fires a cta_clicked event with this location. */
  analytics?: { location: string; label?: string };
};

// inside Button(), replacing direct use of onClick:
const handleClick = () => {
  if (analytics) {
    track("cta_clicked", {
      location: analytics.location,
      label: analytics.label ?? (typeof children === "string" ? children : ""),
      target: to ?? href ?? "",
    });
  }
  onClick?.();
};
```

Pass `onClick={handleClick}` to all three render branches (`<Link>` accepts `onClick`; the `<motion.a>` and `<motion.button>` branches likewise). Then each call site is a one-liner, e.g. in `src/components/sections/Hero.tsx`:

```tsx
<Button to="/kontakt" analytics={{ location: "hero" }}>Få et tilbud</Button>
```

…repeated for every row of the §2.2 table. The two raw `<Link>` CTAs (`FAQPage.tsx`, `BR18CheckerPage.tsx`) and the `InlineLinks` `/kontakt` case get a direct `onClick={() => track("cta_clicked", { location: "...", label, target: "/kontakt" })}`. The tel/mailto anchors in §2.3 get `onClick={() => track("outbound_contact_clicked", { channel: "tel" | "mail", location: "..." })}`. Click events race page unload only on same-tab hard navigations; all `/kontakt` CTAs are client-side router links, so no `sendBeacon` complexity is needed.

### 4.5 Event #3 — checker completion (`src/components/tools/BR18Checker.tsx`)

```tsx
import { useState, useEffect, useRef } from "react";
import { track, arealBucket } from "../../lib/analytics";

// inside BR18Checker(), after `resultat` is computed:
const completedRef = useRef(false);
useEffect(() => {
  if (resultat && !completedRef.current) {
    completedRef.current = true;
    track("br18_checker_completed", {
      status: resultat.status,
      bygningstype,
      byggeri,
      areal: arealBucket(m2),
    });
  }
}, [resultat, bygningstype, byggeri, m2]);
```

Fires once per page view — the moment a visitor first gets a real answer. And in `src/components/tools/PrisEstimat.tsx`, on mount:

```tsx
import { useState, useEffect } from "react";
import { track } from "../../lib/analytics";

// inside PrisEstimat(), after `res` is computed:
useEffect(() => {
  track("price_estimate_shown", {
    pris_type: prisType,
    estimat: res.type, // "interval" | "individuelt" — matches beregnPris() result
    frivillig,
  });
  // fire once per mount; the component only mounts when a price is first shown
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

(Check the exact discriminant values of `beregnPris`'s return type in `src/lib/pris.ts` when implementing — the code above assumes `res.type === "individuelt"` per `PrisEstimat.tsx` line 21; use the other branch's actual literal for the estimate case.)

### 4.6 Goals in Plausible

After deploying, register each custom event as a Goal in the Plausible site settings (`contact_form_submitted`, `br18_checker_completed`, `cta_clicked`, `outbound_contact_clicked`, `contact_form_started`, `price_estimate_shown`) plus a pageview goal for `/kontakt`. Props become filterable breakdowns automatically (Custom Properties must be enabled per property name in site settings).

---

## 5. GDPR / consent — why no banner, and what would change that

### Danish legal frame (verified July 2026)

- **Cookiebekendtgørelsen** (the Danish cookie order, enforced historically by Erhvervsstyrelsen, guidance now with Digitaliseringsstyrelsen) requires prior consent for **storing or reading information on the user's device** — cookies, localStorage, fingerprinting — with strictly-necessary storage as the only exemption. Statistics cookies are **not** exempt: Erhvervsstyrelsen said in 2021 it would deprioritize enforcement against simple first-party statistics cookies, but explicitly confirmed **the consent requirement still applies** ([Jurainfo](https://jurainfo.dk/artikel/erhvervsstyrelsen-vil-fremover-nedprioritere-tilsynet-med-hjemmesiders-brug-af-simple-statistikcookies-men-kravet-om-samtykke-gaelder-stadig), [Bird & Bird](https://www.twobirds.com/da/insights/2021/denmark/erhvervsstyrelsen-vil-fremover-nedprioritere-tilsynet)). So GA4 (which sets `_ga` cookies) = banner, full stop.
- **Plausible stores nothing on the device** — no cookies, no localStorage. The cookie order's trigger condition never fires, so no cookie-consent banner is required for it.
- **GDPR layer (Datatilsynet):** Datatilsynet supervises any *personal data* processing regardless of cookies. Plausible's design: no persistent identifier, no cross-site/cross-day tracking, IP + User-Agent hashed with a salt that rotates daily and raw values discarded; data processed and hosted in the EU (Hetzner, Germany) by an EU company. Position taken: to the extent the transient IP handling is "processing", the legal basis is legitimate interest (art. 6(1)(f)) for first-party, aggregate traffic measurement — a low-risk, well-precedented position (France's CNIL formally exempts cookieless analytics of this class from consent). **Honest caveat:** Datatilsynet has not explicitly blessed Plausible or any specific cookieless tool; the May-2025 joint Datatilsynet/Digitaliseringsstyrelsen cookie guidance tightened requirements *for consent-requiring trackers* but does not add a consent duty where nothing is stored on the device ([Datatilsynet GDPR-univers: cookies](https://www.datatilsynet.dk/regler-og-vejledning/gdpr-univers-for-smaa-virksomheder/cookies-og-gdpr), [Digitaliseringsstyrelsen cookievejledning](https://digst.dk/sikkerhed/digitale-tilsyn/sporingsteknologiomraadet/cookievejledningen/), [Lund Elmer Sandager on the 2025 guidance](https://les.dk/da/news/nye-cookie-krav-i-2025-skaerpet-vejledning-fra-datatilsynet-og-digitaliseringsstyrelsen)).

### Concrete obligations with Plausible (all cheap)

1. **Sign Plausible's DPA** (available in the account, self-serve).
2. **Add a `/privatlivspolitik` page — the site has none today, and needs one regardless of analytics**, because the contact form already collects name/email/phone via Web3Forms (a third-party processor — check Web3Forms' DPA and processing location when writing the page; unverified in this plan). The page must cover: form data (purpose: answering quote requests; retention; Web3Forms as processor), email/phone contact, and a short section stating that traffic is measured with Plausible Analytics, cookieless, EU-hosted, no personal data stored. Link it from `src/components/layout/Footer.tsx`, add the route in `src/main.tsx`, and add it to `ROUTES` in `scripts/prerender.ts` + `public/sitemap.xml`.
3. **No PII in event props** — enforced by the taxonomy (areal bucketed, no free text).

### What would re-open the banner question

Adding **any** of the following requires a proper consent banner/CMP (e.g. Cookiebot or Cookie Information), configured to block the script until consent, *before* the script ships:

- GA4 / Google Ads remarketing or conversion tags
- Meta Pixel, LinkedIn Insight Tag (likely candidates if outreach scales to ads)
- Session recording / heatmaps (Hotjar, Microsoft Clarity)
- Embedded third-party iframes that set cookies (YouTube embeds without `youtube-nocookie.com`)

Decision rule: the day paid ads with conversion tracking are planned, budget the CMP + banner work (roughly a day incl. consent-blocking verification) as part of that project — don't bolt it on after the tag is live.

---

## 6. Weekly dashboard — the 5 numbers

Check every Sunday (fits `/weekly-synthesis`), ~5 minutes in the Plausible dashboard:

1. **Quote requests:** `contact_form_submitted` (filter `result=success`) — the number the business runs on. Cross-check against actual inbox mails; also watch `result=error` (>0 twice in a row = investigate Web3Forms).
2. **Visitor → quote conversion rate:** unique conversions ÷ unique visitors (Plausible shows CR per goal). Benchmark yourself week over week, not against industry numbers.
3. **Checker throughput:** `br18_checker_completed` uniques, and of those, how many reached `/kontakt` (funnel step 2→3). This tells you whether the tool is a lead engine or a dead end.
4. **CTA league table:** `cta_clicked` broken down by `location` prop — which placements earn their spot; informs where to add/remove CTAs.
5. **Where converting traffic comes from:** filter the dashboard by the `contact_form_submitted` goal and read Top Sources + Top (entry) Pages. This is the "write more of what converts" signal for the blog/SEO program.

Phone reality check: add `outbound_contact_clicked` (channel=tel) to #1 mentally — quote requests that arrive by phone won't show in the form number.

---

## 7. Rollout checklist (bite-sized, executable by a local session)

Each step is independently verifiable; total ≈ half a day.

- [ ] **1. Create Plausible account + site.** Register `dinlcahjælper.dk` (fall back to `xn--dinlcahjlper-edb.dk` if the unicode form is rejected). Enable EU residency default. Sign the DPA. Note the exact `data-domain` string.
- [ ] **2. Add the snippet** to `index.html` `<head>` (§4.1, using `script.outbound-links.js`). Run `npm run build:prerender` and confirm the script tag appears in e.g. `dist/kontakt/index.html` and `dist/blog/hvad-er-lca-beregning/index.html`.
- [ ] **3. Create `src/lib/analytics.ts`** (§4.2). `npm run lint && npm run test` still green.
- [ ] **4. Instrument ContactPage** (§4.3): submit success/error + form start.
- [ ] **5. Add the `analytics` prop to Button** (§4.4) and thread it through all §2.2 Button call-sites; manual `onClick` on the two raw `<Link>` CTAs, the `InlineLinks` `/kontakt` branch, and the §2.3 tel/mailto anchors.
- [ ] **6. Instrument BR18Checker + PrisEstimat** (§4.5).
- [ ] **7. Deploy to production** (Vercel). *Note: don't try to verify on a Vercel preview URL — the script sends the hardcoded `data-domain`, so preview traffic counts as production traffic. Verify on prod, once, deliberately.*
- [ ] **8. Verify live:** open Plausible's Realtime view; on the live site (normal browser, not localhost): load the homepage (pageview appears), click the hero CTA (`cta_clicked` with `location=hero`), run the BR18-tjekker with 150 m² enfamiliehus (`br18_checker_completed` + `price_estimate_shown`), submit **one real test form entry** marked "TEST — ignorér" in besked (`contact_form_started` + `contact_form_submitted result=success`), click the footer tel link (`outbound_contact_clicked`). Check each event's props in the dashboard.
- [ ] **9. Register goals + enable custom properties** in Plausible site settings (§4.6). Delete/ignore the test conversion if desired.
- [ ] **10. Exclude yourself:** in your own browsers, set `localStorage.plausible_ignore = "true"` on the live site (Plausible's built-in self-exclusion) so Valdemar's own visits stop polluting a low-traffic site's numbers.
- [ ] **11. Write and ship `/privatlivspolitik`** (§5 item 2): page component, route in `src/main.tsx`, footer link, `scripts/prerender.ts` `ROUTES` entry, `public/sitemap.xml` entry.
- [ ] **12. Confirm scroll depth + time-on-page** appear in the dashboard (design-brief §11 coverage). If absent on the plan, file the fallback `scroll_depth` event as a follow-up — don't build it speculatively.
- [ ] **13. Calendar hook:** fold the §6 five numbers into the Sunday `/weekly-synthesis` ritual.

---

## 8. Verification notes on external claims

- Plausible pricing (Growth ~$9/mo at 10k pageviews, Business ~$19/mo with Funnels), EU hosting on all tiers, cookieless/no-banner positioning: per July 2026 search of [plausible.io](https://plausible.io/), [plausible.io/docs/subscription-plans](https://plausible.io/docs/subscription-plans) and third-party reviews — **re-verify at signup**, prices drift.
- Danish rules (consent required for statistics *cookies*; enforcement deprioritized but rule intact; 2025 joint guidance): sources linked inline in §5.
- Plausible localhost auto-exclusion, SPA `pushState` tracking, `plausible_ignore` self-exclusion, scroll-depth/time-on-page metrics: per Plausible docs as of this writing — each has a cheap runtime check built into the checklist (§7 steps 2, 8, 10, 12), so a stale doc claim gets caught during rollout rather than trusted blindly.
- Web3Forms' data-processing location/DPA: **unverified** — check while writing `/privatlivspolitik`.
