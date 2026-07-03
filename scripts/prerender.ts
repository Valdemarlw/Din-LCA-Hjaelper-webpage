/**
 * Post-build prerender script.
 * Spins up a preview server, visits each route with Playwright,
 * and writes the fully-rendered HTML to dist/ so crawlers (including
 * AI bots that don't execute JS) see real content.
 *
 * Usage: npx tsx scripts/prerender.ts
 */

import { chromium } from "@playwright/test";
import { preview } from "vite";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const ROUTES = [
  "/",
  "/om-os",
  "/kontakt",
  "/viden",
  "/blog",
  "/blog/hvad-er-lca-beregning",
  "/blog/klimakrav-2025",
  "/blog/a4-a5-dokumentation",
  "/blog/lca-sommerhuse",
  "/blog/graensevaerdier-co2",
  "/blog/lca-beregning-pris",
  "/blog/hvornaar-er-lca-lovpligtig",
  "/blog/lcabyg-hjaelp-outsource",
  "/lca-beregning",
  "/lca-beregning/enfamiliehus",
  "/lca-beregning/sommerhus",
  "/lca-beregning/erhverv",
  "/referenceprojekter",
  "/referenceprojekter/agavevej-4a",
  "/referenceprojekter/lagerhal-laesovej-randers",
  "/referenceprojekter/he-bluhmesvej-67",
  "/faq",
  "/ordbog",
  "/ordbog/epd",
  "/ordbog/graensevaerdi",
  "/ordbog/hotspot-analyse",
  "/ordbog/br18",
  "/ordbog/modul-a1-a3",
  "/ordbog/modul-a4",
  "/ordbog/modul-a5",
  "/ordbog/modul-b4",
  "/ordbog/modul-b6",
  "/ordbog/modul-c3-c4",
  "/ordbog/modul-d",
  "/ordbog/generiske-data",
  "/ordbog/produktspecifikke-data",
  "/ordbog/betragtningsperiode",
  "/ordbog/gwp",
  "/ordbog/co2-aekvivalenter",
  "/ordbog/etageareal",
  "/ordbog/en-15978",
  "/ordbog/lcabyg",
  "/ordbog/dgnb",
  "/sammenligninger/din-lca-hjaelper-vs-lcabyg",
  "/vaerktoejer/br18-tjekker",
  "/privatlivspolitik",
];
const DIST = join(import.meta.dirname, "..", "dist");

async function prerender() {
  // Start Vite preview server on a random available port
  const server = await preview({ preview: { port: 0, open: false } });
  const address = server.httpServer.address();
  if (!address || typeof address === "string") throw new Error("Could not determine server address");
  const origin = `http://localhost:${address.port}`;

  console.log(`Preview server running at ${origin}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Render "/" last. It overwrites dist/index.html, which the preview server
  // uses as the SPA fallback for not-yet-prerendered routes. Rendering it early
  // bakes the homepage's <head> (canonical "/", og:url "/") into every later route.
  const orderedRoutes = [...ROUTES.filter((r) => r !== "/"), "/"];

  const failed: string[] = [];

  for (const route of orderedRoutes) {
    const url = `${origin}${route}`;
    console.log(`Rendering ${route}...`);

    try {
      // "domcontentloaded" + the explicit waits below. "networkidle" is flaky
      // (it needs 500ms of zero network requests; fonts/animation polling can
      // prevent that and abort the whole build) and isn't needed once we wait
      // for React mount + helmet head-flush directly.
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

      // Wait for React to mount
      await page.waitForSelector("#root > *", { timeout: 15000 });

      // Wait for react-helmet-async to flush the <head>. Helmet applies title +
      // canonical + og tags together a tick after mount; capturing before that
      // bakes empty titles and the homepage fallback canonical into the output.
      // Waiting until the canonical reflects THIS route guarantees the whole
      // head (incl. title) has been reconciled for the route.
      await page
        .waitForFunction(
          (expectedPath) => {
            const c = document.querySelector('link[rel="canonical"]');
            if (!c) return false;
            const href = c.getAttribute("href") || "";
            return expectedPath === "/" ? /dinlcahj.*\/$/.test(href) : href.includes(expectedPath);
          },
          route,
          { timeout: 10000 }
        )
        .catch(() => {
          console.warn(`  ! canonical did not settle for ${route} — capturing anyway`);
        });
      // Small settle so any remaining head tags from the same flush land.
      await page.waitForTimeout(200);

      const html = await page.content();

      // Write to the correct location
      const dir = route === "/" ? DIST : join(DIST, route.slice(1));
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, "index.html"), html, "utf-8");
      console.log(`  → wrote ${join(dir, "index.html")}`);
    } catch (err) {
      failed.push(route);
      console.warn(`  ! FAILED ${route}: ${(err as Error).message.split("\n")[0]}`);
    }
  }

  if (failed.length) {
    console.error(`\n${failed.length}/${orderedRoutes.length} route(s) failed: ${failed.join(", ")}`);
    process.exitCode = 1;
  }

  await browser.close();
  server.httpServer.close();
  console.log("Prerendering complete.");
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
