import { describe, expect, it } from "vitest";
import { getBlogPost } from "../data/blogPosts";
import { getGlossaryTerm } from "../data/glossary";
import { getReferenceProject } from "../data/referenceProjects";
import {
  BR18_CHECKER_SEO_TITLE,
  LCA_BEREGNING_SEO_TITLE,
  MAX_SEO_TITLE_LENGTH,
  REFERENCE_PROJECTS_SEO_TITLE,
  buildSeoTitle,
} from "./seoTitles";

describe("/referenceprojekter answers 'lca beregning eksempel'", () => {
  it("leads with 'Eksempler på LCA-beregninger' within the title limit", () => {
    expect(REFERENCE_PROJECTS_SEO_TITLE.startsWith("Eksempler på LCA-beregninger")).toBe(true);
    expect(REFERENCE_PROJECTS_SEO_TITLE.length).toBeLessThanOrEqual(MAX_SEO_TITLE_LENGTH);
  });
});

const BLOG_SLUGS = [
  "lca-beregning-pris",
  "hvornaar-er-lca-lovpligtig",
  "lcabyg-hjaelp-outsource",
  "klimakrav-2025",
  "lca-sommerhuse",
  "a4-a5-dokumentation",
];

describe("Bing title-length fixes", () => {
  it("keeps the flagged blog titles within the search title limit", () => {
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

  it("keeps the /lca-beregning service title within the limit and on the head search", () => {
    expect(LCA_BEREGNING_SEO_TITLE.startsWith("LCA-beregning")).toBe(true);
    expect(LCA_BEREGNING_SEO_TITLE).toContain("4.000 kr.");
    expect(LCA_BEREGNING_SEO_TITLE.length).toBeLessThanOrEqual(MAX_SEO_TITLE_LENGTH);
  });

  it("keeps the BR18 checker title within the limit", () => {
    expect(BR18_CHECKER_SEO_TITLE.length).toBeLessThanOrEqual(
      MAX_SEO_TITLE_LENGTH,
    );
  });

  it("uses the approved question-led GWP title within the search title limit", () => {
    const term = getGlossaryTerm("gwp");

    expect(term?.metaTitle).toBe("Hvad er GWP? Global Warming Potential");
    expect(buildSeoTitle(term!.metaTitle!).length).toBeLessThanOrEqual(
      MAX_SEO_TITLE_LENGTH,
    );
  });
});
