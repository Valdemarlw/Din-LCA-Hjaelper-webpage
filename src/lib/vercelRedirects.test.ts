import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

type VercelConfig = {
  redirects?: Array<{
    source: string;
    destination: string;
    permanent: boolean;
  }>;
};

describe("legacy SEO redirects", () => {
  const configPath = new URL("../../vercel.json", import.meta.url);
  const config = JSON.parse(
    readFileSync(configPath, "utf8"),
  ) as VercelConfig;

  it("permanently redirects /a4-a5 to the canonical A4/A5 guide", () => {
    expect(config.redirects).toContainEqual({
      source: "/a4-a5",
      destination: "/blog/a4-a5-dokumentation",
      permanent: true,
    });
  });

  it("permanently redirects the removed Mørkdalvej URL to the reference overview", () => {
    expect(config.redirects).toContainEqual({
      source: "/referenceprojekter/moerkdalvej-6",
      destination: "/referenceprojekter",
      permanent: true,
    });
  });
});
