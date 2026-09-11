import { chromium } from "@playwright/test";
const base = process.argv[2] || "http://localhost:5175";
const browser = await chromium.launch();
const results = [];
const check = (name, ok, extra = "") => results.push(`${ok ? "PASS" : "FAIL"} ${name} ${extra}`);
// 1. BR18 checker produces a result and a price
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(base + "/vaerktoejer/br18-tjekker", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /nej tak/i }).click().catch(() => {});
  await page.fill("#areal", "150");
  await page.waitForTimeout(400);
  const txt = await page.locator("main").innerText();
  check("checker shows limit", /Grænseværdi/.test(txt) && /6,7/.test(txt));
  check("checker shows price", /Vejledende pris/.test(txt) && /ekskl\. moms/.test(txt));
  await page.getByRole("button", { name: "Tilbygning", exact: true }).click();
  await page.waitForTimeout(300);
  const txt2 = await page.locator("main").innerText();
  check("tilbygning under 250 is exempt text", /undtaget|Frivillig/i.test(txt2), txt2.slice(0, 0));
  await page.close();
}
// 2. Mobile menu opens and closes, FAQ toggles
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /nej tak/i }).click().catch(() => {});
  const burger = page.getByRole("button", { name: "Åbn menu" });
  await burger.click();
  await page.waitForTimeout(300);
  check("mobile menu opens", await page.locator("#mobil-menu").isVisible());
  await page.locator("#mobil-menu").getByRole("link", { name: "Om os" }).click();
  await page.waitForURL(/om-os/);
  await page.waitForTimeout(300);
  check("mobile menu closes after navigation", (await page.locator("#mobil-menu").count()) === 0);
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  const q = page.getByRole("button", { name: /Hvad er en LCA-beregning\?/ }).first();
  await q.scrollIntoViewIfNeeded();
  const before = await q.getAttribute("aria-expanded");
  await q.click();
  await page.waitForTimeout(400);
  const after = await q.getAttribute("aria-expanded");
  check("faq toggles", before === "false" && after === "true");
  await page.close();
}
// 3. Consent banner: both buttons present, denying hides it
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  const aside = page.getByRole("complementary", { name: /statistik/i });
  check("consent banner shown", await aside.isVisible());
  await page.getByRole("button", { name: "Nej tak" }).click();
  await page.waitForTimeout(300);
  check("consent banner hidden after choice", (await aside.count()) === 0);
  // footer link reopens it
  await page.getByRole("button", { name: "Statistikindstillinger" }).click();
  await page.waitForTimeout(300);
  check("settings link reopens banner", await aside.isVisible());
  await page.close();
}
// 4. Focus ring visible on keyboard nav (button has outline on focus-visible)
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /nej tak/i }).click().catch(() => {});
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  check("keyboard focus shows outline", outline !== "none", `(${outline})`);
  await page.close();
}
await browser.close();
console.log(results.join("\n"));
process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);
