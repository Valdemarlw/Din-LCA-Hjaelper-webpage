/**
 * Post-build prerender script.
 * Spins up a preview server, visits each route with Playwright,
 * and writes the fully-rendered HTML to dist/ so crawlers (including
 * AI bots that don't execute JS) see real content.
 *
 * Routes come from src/lib/routes.ts so this list cannot drift from the
 * router or the sitemap. Unmatched paths are a real 404 in production
 * (see vercel.json), so a missing route here is a user-visible failure.
 *
 * Usage: npx tsx scripts/prerender.ts
 */

import { chromium } from "@playwright/test";
import { preview } from "vite";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { ALL_ROUTES } from "../src/lib/routes";

const ROUTES = ALL_ROUTES;
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

  // Render the catch-all 404 route to dist/404.html, which Vercel serves with a
  // real 404 status for any unmatched path. This replaces the old catch-all
  // rewrite that returned HTTP 200 plus the homepage for every dead URL.
  //
  // This must run BEFORE the route loop, while dist/index.html is still the
  // clean Vite shell. The loop writes the prerendered homepage to dist/index.html
  // last, and the preview server serves that file as the SPA fallback, so a 404
  // rendered afterwards inherits the homepage's title and meta tags.
  try {
    console.log("Rendering 404...");
    await page.goto(`${origin}/__prerender_404__`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForSelector("#root > *", { timeout: 15000 });
    await page.waitForFunction(
      () => document.title.includes("ikke fundet"),
      undefined,
      { timeout: 10000 }
    );
    await page.waitForTimeout(200);
    writeFileSync(join(DIST, "404.html"), await page.content(), "utf-8");
    console.log(`  → wrote ${join(DIST, "404.html")}`);
  } catch (err) {
    failed.push("/404");
    console.warn(`  ! FAILED 404: ${(err as Error).message.split("\n")[0]}`);
  }

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
    console.error(
      `\n${failed.length}/${orderedRoutes.length + 1} route(s) failed: ${failed.join(", ")}`
    );
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
