import { describe, expect, it } from "vitest";
import { getReferenceProject } from "../data/referenceProjects";
import { buildReferenceProjectSchemas } from "./referenceProjectSeo";

describe("reference project structured data", () => {
  it.each(["ternedalen-42", "agavevej-4a"])(
    "uses Article and BreadcrumbList without FAQ or HowTo for %s",
    (slug) => {
      const project = getReferenceProject(slug);
      expect(project).toBeDefined();

      const schemas = buildReferenceProjectSchemas(project!);
      const serialized = JSON.stringify(schemas);

      expect(schemas.article["@type"]).toBe("Article");
      expect(schemas.article.headline).toBe(project!.title);
      expect(schemas.breadcrumb["@type"]).toBe("BreadcrumbList");
      expect(serialized).not.toContain("FAQPage");
      expect(serialized).not.toContain("HowTo");
    },
  );
});
