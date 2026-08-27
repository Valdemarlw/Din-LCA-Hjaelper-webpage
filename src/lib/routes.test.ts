import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { ALL_ROUTES } from "./routes";

/**
 * Guard tests for the route list.
 *
 * `vercel.json` serves a real 404 for unmatched paths instead of rewriting
 * everything to index.html. That makes route coverage safety-critical: a page
 * reachable in the router but absent from ALL_ROUTES is prerendered nowhere and
 * returns 404 to real users. These tests fail when that happens.
 */
describe("ALL_ROUTES", () => {
  const mainTsx = readFileSync(join(__dirname, "..", "main.tsx"), "utf-8");
  const routerPaths = [...mainTsx.matchAll(/path="([^"]+)"/g)].map((m) => m[1]);

  it("covers every static path declared in the router", () => {
    // "*" is the catch-all that renders NotFoundPage; it is prerendered to
    // dist/404.html rather than to a route of its own.
    const staticPaths = routerPaths.filter((p) => !p.includes(":") && p !== "*");
    const missing = staticPaths.filter((p) => !ALL_ROUTES.includes(p));
    expect(missing).toEqual([]);
  });

  it("declares a catch-all route so unmatched paths render the 404 page", () => {
    expect(routerPaths).toContain("*");
  });

  it("has a concrete route for every dynamic router segment", () => {
    // Every `path="/blog/:slug"` needs at least one generated `/blog/<slug>`.
    const dynamicPrefixes = routerPaths
      .filter((p) => p.includes(":"))
      .map((p) => p.slice(0, p.indexOf(":")));
    for (const prefix of dynamicPrefixes) {
      const generated = ALL_ROUTES.filter((r) => r.startsWith(prefix) && r !== prefix);
      expect(generated.length, `no generated routes for ${prefix}:slug`).toBeGreaterThan(0);
    }
  });

  it("contains no duplicates", () => {
    expect(ALL_ROUTES.length).toBe(new Set(ALL_ROUTES).size);
  });

  it("includes Ternedalen and excludes the redirected Mørkdalvej case route", () => {
    expect(ALL_ROUTES).toContain("/referenceprojekter/ternedalen-42");
    expect(ALL_ROUTES).not.toContain("/referenceprojekter/moerkdalvej-6");
  });

  it("uses root-relative paths without trailing slashes", () => {
    const malformed = ALL_ROUTES.filter((r) => r !== "/" && (!r.startsWith("/") || r.endsWith("/")));
    expect(malformed).toEqual([]);
  });
});
