// usage: node crop.mjs <url> <outPrefix> <width> <selector>[,<selector>...]
import { chromium } from "@playwright/test";
const [url, outPrefix, widthArg, selectorsArg] = process.argv.slice(2);
const width = Number(widthArg || 1440);
const selectors = selectorsArg.split("|");
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForSelector("#root > *");
const nej = page.getByRole("button", { name: /nej tak/i });
if (await nej.count()) await nej.first().click().catch(() => {});
await page.waitForTimeout(800);
let i = 0;
for (const sel of selectors) {
  const loc = page.locator(sel).first();
  await loc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const path = `${outPrefix}-${i++}.png`;
  await loc.screenshot({ path });
  console.log("ok", path, sel);
}
await browser.close();
