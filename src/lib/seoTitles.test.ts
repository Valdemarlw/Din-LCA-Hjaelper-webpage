import { describe, expect, it } from "vitest";
import { getBlogPost } from "../data/blogPosts";
import { getReferenceProject } from "../data/referenceProjects";
import {
  BR18_CHECKER_SEO_TITLE,
  MAX_SEO_TITLE_LENGTH,
  buildSeoTitle,
} from "./seoTitles";

const BLOG_SLUGS = [
  "lca-beregning-pris",
  "hvornaar-er-lca-lovpligtig",
  "lcabyg-hjaelp-outsource",
  "klimakrav-2025",
  "lca-sommerhuse",
];

describe("Bing title-length fixes", () => {
  it("keeps the five flagged blog titles within the search title limit", () => {
    for (const slug of BLOG_SLUGS) {
      const post = getBlogPost(slug);
      expect(post?.metaTitle).toBeTruthy();
      expect(buildSeoTitle(post!.metaTitle!).length).toBeLessThanOrEqual(
        MAX_SEO_TITLE_LENGTH,
      );
    }
  });

  it("keeps the case titles within the search title limit", () => {
    for (const slug of ["ternedalen-42", "agavevej-4a"]) {
      const project = getReferenceProject(slug);
      expect(project?.metaTitle).toBeTruthy();
      expect(buildSeoTitle(project!.metaTitle!).length).toBeLessThanOrEqual(
        MAX_SEO_TITLE_LENGTH,
      );
    }
  });

  it("keeps the BR18 checker title within the limit", () => {
    expect(BR18_CHECKER_SEO_TITLE.length).toBeLessThanOrEqual(
      MAX_SEO_TITLE_LENGTH,
    );
  });
});
