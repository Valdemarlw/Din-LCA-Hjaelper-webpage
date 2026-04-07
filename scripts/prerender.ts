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

  for (const route of ROUTES) {
    const url = `${origin}${route}`;
    console.log(`Rendering ${route}...`);

    await page.goto(url, { waitUntil: "networkidle" });

    // Wait for React to mount
    await page.waitForSelector("#root > *", { timeout: 10000 });

    // Get the full HTML
    let html = await page.content();

    // Remove the module script tag so the static HTML is self-contained
    // but keep it so the SPA still hydrates for interactive users
    // Just ensure the content is there for crawlers

    // Write to the correct location
    const dir = route === "/" ? DIST : join(DIST, route.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html, "utf-8");
    console.log(`  → wrote ${join(dir, "index.html")}`);
  }

  await browser.close();
  server.httpServer.close();
  console.log("Prerendering complete.");
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
