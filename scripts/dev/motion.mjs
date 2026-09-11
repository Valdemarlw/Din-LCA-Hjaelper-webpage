// Verifies the motion layer with animations enabled (no reduced-motion emulation).
// usage: node motion.mjs <baseUrl> <outDir>
import { chromium } from "@playwright/test";
import { mkdirSync } from "fs";
import { join } from "path";

const [base = "http://localhost:5175", outDir = "."] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const results = [];
const check = (name, ok, extra = "") => results.push(`${ok ? "PASS" : "FAIL"} ${name} ${extra}`.trim());

async function settle(page, ms) {
  await page.waitForTimeout(ms);
}

for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width < 600 ? 844 : 900 } });
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /nej tak/i }).click().catch(() => {});

  // Hero choreography: headline words start masked, count-up ends on the real figure.
  const h1 = page.locator("h1");
  const earlyOpacity = await page.locator("main p").first().evaluate((el) => getComputedStyle(el).opacity);
  await settle(page, 3200);
  const h1Text = await h1.getAttribute("aria-label");
  check(`[${width}] hero h1 keeps accessible text`, h1Text === "LCA-beregning der bare virker");
  const wordsShown = await h1.locator("span span").evaluateAll((els) => els.every((e) => /none|matrix\(1, 0, 0, 1, 0, 0\)/.test(getComputedStyle(e).transform)));
  check(`[${width}] hero words finished rising`, wordsShown);
  const gwp = await page.locator("text=Samlet GWP").locator("xpath=following-sibling::p[1]/span[1]").innerText();
  check(`[${width}] hero count-up ends at 4,8`, gwp.trim() === "4,8", `(got "${gwp.trim()}")`);
  check(`[${width}] lede started transparent`, Number(earlyOpacity) < 1, `(opacity ${earlyOpacity})`);
  await page.screenshot({ path: join(outDir, `motion-hero-${width}.png`), clip: { x: 0, y: 0, width, height: width < 600 ? 844 : 900 } });

  // Process connector draws when scrolled into view.
  const list = page.locator("ol").filter({ hasText: "Send dit projekt" });
  const wrap = list.locator("xpath=.."); // the connector svg is drawn in the wrapper around the list
  await list.scrollIntoViewIfNeeded();
  await settle(page, 150);
  const svg = wrap.locator("svg").first();
  check(`[${width}] process connector rendered`, (await svg.count()) === 1);
  const pathEarly = await svg.locator("path").first().evaluate((p) => p.getAttribute("stroke-dashoffset") ?? p.style.strokeDashoffset ?? "");
  await settle(page, 3600);
  const pathLate = await svg.locator("path").first().evaluate((p) => p.getAttribute("stroke-dashoffset") ?? p.style.strokeDashoffset ?? "");
  check(`[${width}] connector finished drawing`, /^0(px)?$/.test(pathLate), `(early "${pathEarly}", late "${pathLate}")`);
  const arrows = await svg.locator("g path").count();
  check(`[${width}] six arrowheads incl. the loop`, arrows === 6, `(${arrows})`);
  const discsVisible = await list.locator("li > div").first().evaluate((el) => getComputedStyle(el).opacity);
  check(`[${width}] step discs visible after draw`, Number(discsVisible) === 1, `(${discsVisible})`);
  await wrap.screenshot({ path: join(outDir, `motion-process-${width}.png`) });

  // Reference stats count to their real values.
  const refs = page.locator("text=Referenceprojekter").first();
  await refs.scrollIntoViewIfNeeded();
  await settle(page, 3000);
  const stats = await page.locator("a[href^='/referenceprojekter/'] p:nth-of-type(2)").allInnerTexts();
  check(`[${width}] reference stats settle`, JSON.stringify(stats) === JSON.stringify(["6,88 → 3,839", "72 %", "16 %"]), JSON.stringify(stats));

  // Nav hides on scroll down, returns on scroll up.
  await page.mouse.move(width / 2, 400);
  await page.mouse.wheel(0, -20000);
  await settle(page, 700);
  await page.mouse.wheel(0, 900);
  await settle(page, 600);
  const hiddenT = await page.locator("header").evaluate((el) => getComputedStyle(el).translate);
  await page.mouse.wheel(0, -300);
  await settle(page, 600);
  const shownT = await page.locator("header").evaluate((el) => getComputedStyle(el).translate);
  check(`[${width}] nav hides on scroll down`, /-\d/.test(hiddenT), `(${hiddenT})`);
  check(`[${width}] nav returns on scroll up`, shownT === "none" || /^0px( 0px)?$/.test(shownT), `(${shownT})`);

  await page.close();
}

// Reduced motion: nothing hidden, no inline opacity 0 anywhere in the final DOM.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#root > *");
  await settle(page, 600);
  const hiddenCount = await page.evaluate(
    () => [...document.querySelectorAll("main *")].filter((el) => el.style && el.style.opacity === "0" && el.style.height !== "0px").length
  );
  check("reduced motion leaves nothing at opacity 0", hiddenCount === 0, `(${hiddenCount})`);
  const gwp = await page.locator("text=Samlet GWP").locator("xpath=following-sibling::p[1]/span[1]").innerText();
  check("reduced motion shows final figure immediately", gwp.trim() === "4,8", `(got "${gwp.trim()}")`);
  await ctx.close();
}

await browser.close();
console.log(results.join("\n"));
process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);
