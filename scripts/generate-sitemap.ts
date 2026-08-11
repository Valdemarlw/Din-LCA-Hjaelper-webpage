/**
 * Generates dist/sitemap.xml and dist/robots.txt from the canonical route list.
 *
 * Two things this fixes, both confirmed against the live site on 2026-08-11:
 *
 * 1. The old hand-maintained sitemap emitted raw UTF-8 in <loc>
 *    ("https://dinlcahjælper.dk/"). The Sitemaps 0.9 spec requires ASCII URLs,
 *    so every entry is now written in punycode (xn--dinlcahjlper-edb.dk).
 * 2. <lastmod> was hardcoded to April/June 2026 while the build changed daily,
 *    telling crawlers nothing had changed. It is now derived from the build.
 *
 * Run after `vite build` and before/alongside prerendering.
 * Usage: npx tsx scripts/generate-sitemap.ts
 */
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { execFileSync } from "child_process";
import { ALL_ROUTES, sitemapMetaFor } from "../src/lib/routes";

/** Punycode host. The unicode form is not valid in a sitemap <loc>. */
const ORIGIN = "https://xn--dinlcahjlper-edb.dk";
const DIST = join(process.cwd(), "dist");

/**
 * Last content change, as a date crawlers can trust.
 * Prefers the last git commit touching content or pages; falls back to today.
 */
function lastContentChange(): string {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", "src/data", "src/pages", "src/components"],
      { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  } catch {
    // Not a git checkout (e.g. some CI images) - fall through to today.
  }
  return new Date().toISOString().slice(0, 10);
}

function buildSitemap(lastmod: string): string {
  const entries = ALL_ROUTES.map((route) => {
    const { priority, changefreq } = sitemapMetaFor(route);
    const loc = `${ORIGIN}${route === "/" ? "/" : route}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

/** Rewrites the Sitemap: directive to the punycode host, leaving the rest alone. */
function syncRobots(): void {
  const src = join(DIST, "robots.txt");
  if (!existsSync(src)) {
    console.warn("  ! dist/robots.txt not found, skipping robots sync");
    return;
  }
  const original = readFileSync(src, "utf-8");
  const updated = original.replace(
    /^Sitemap:.*$/gm,
    `Sitemap: ${ORIGIN}/sitemap.xml`
  );
  writeFileSync(src, updated, "utf-8");
  console.log(`  → robots.txt Sitemap: directive set to ${ORIGIN}/sitemap.xml`);
}

const lastmod = lastContentChange();
writeFileSync(join(DIST, "sitemap.xml"), buildSitemap(lastmod), "utf-8");
console.log(`Sitemap: ${ALL_ROUTES.length} routes, lastmod ${lastmod}, host ${ORIGIN}`);
syncRobots();
