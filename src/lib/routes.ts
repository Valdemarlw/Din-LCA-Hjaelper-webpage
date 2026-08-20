/**
 * The canonical list of every public route on the site.
 *
 * Single source of truth, derived from the content data so it cannot drift.
 * Consumed by the prerender script, the sitemap generator and a guard test.
 *
 * This matters more than it looks: `vercel.json` no longer rewrites unknown
 * paths to index.html, so a route missing from this list is a real 404 for
 * users, not just an unprerendered page. `routes.test.ts` fails if this list
 * and the router ever disagree.
 */
import { blogPosts } from "../data/blogPosts";
import { projectTypes } from "../data/projectTypes";
import { referenceProjects } from "../data/referenceProjects";
import { glossaryTerms } from "../data/glossary";
import { comparisons } from "../data/comparisons";

/** Routes that exist independently of content data. */
export const STATIC_ROUTES = [
  "/",
  "/om-os",
  "/kontakt",
  "/privatliv",
  "/viden",
  "/blog",
  "/lca-beregning",
  "/referenceprojekter",
  "/faq",
  "/ordbog",
  "/vaerktoejer/br18-tjekker",
] as const;

/** Every public route, deduplicated and stable-ordered. */
export const ALL_ROUTES: string[] = [
  ...STATIC_ROUTES,
  ...blogPosts.map((p) => `/blog/${p.slug}`),
  ...projectTypes.map((p) => `/lca-beregning/${p.slug}`),
  ...referenceProjects.map((p) => `/referenceprojekter/${p.slug}`),
  ...glossaryTerms.map((t) => `/ordbog/${t.slug}`),
  ...comparisons.map((c) => `/sammenligninger/${c.slug}`),
];

/**
 * Sitemap priority and change frequency per route.
 * Commercial pages rank above supporting reference material.
 */
export function sitemapMetaFor(route: string): { priority: string; changefreq: string } {
  if (route === "/") return { priority: "1.0", changefreq: "weekly" };
  if (route === "/lca-beregning" || route === "/vaerktoejer/br18-tjekker")
    return { priority: "0.9", changefreq: "weekly" };
  if (route.startsWith("/lca-beregning/") || route === "/kontakt")
    return { priority: "0.8", changefreq: "monthly" };
  if (route.startsWith("/blog/") || route.startsWith("/sammenligninger/"))
    return { priority: "0.7", changefreq: "monthly" };
  if (route.startsWith("/referenceprojekter")) return { priority: "0.6", changefreq: "monthly" };
  if (route.startsWith("/ordbog/")) return { priority: "0.5", changefreq: "yearly" };
  return { priority: "0.6", changefreq: "monthly" };
}
