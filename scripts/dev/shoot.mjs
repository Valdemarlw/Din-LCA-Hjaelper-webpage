// usage: node shoot.mjs <baseUrl> <outDir> [route,route,...] [widths]
import { chromium } from "@playwright/test";
import { mkdirSync } from "fs";
import { join } from "path";
const [base, outDir, routesArg, widthsArg] = process.argv.slice(2);
const routes = (routesArg || "/").split(",");
const widths = (widthsArg || "1440,390").split(",").map(Number);
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const r of routes) {
    const url = base.replace(/\/$/, "") + r;
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForSelector("#root > *", { timeout: 15000 }).catch(() => {});
      // dismiss consent if present
      const nej = page.getByRole("button", { name: /nej tak/i });
      if (await nej.count()) await nej.first().click().catch(() => {});
      // scroll through to trigger whileInView reveals
      await page.evaluate(async () => { const h = document.body.scrollHeight; for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(500);
      const name = (r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "__")) + `-${w}.png`;
      await page.screenshot({ path: join(outDir, name), fullPage: true });
      console.log("ok", name);
    } catch (e) { console.log("FAIL", url, e.message.split("\n")[0]); }
  }
  await ctx.close();
}
await browser.close();
