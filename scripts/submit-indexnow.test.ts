import { describe, expect, it } from "vitest";
import { buildIndexNowPayload, extractSitemapUrls } from "./submit-indexnow";

const KEY = "0123456789abcdef0123456789abcdef";
const HOST = "xn--dinlcahjlper-edb.dk";

describe("IndexNow submission", () => {
  it("extracts canonical URLs from the generated sitemap", () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://${HOST}/</loc></url>
        <url><loc>https://${HOST}/kontakt</loc></url>
      </urlset>`;

    expect(extractSitemapUrls(sitemap)).toEqual([
      `https://${HOST}/`,
      `https://${HOST}/kontakt`,
    ]);
  });

  it("builds a host-scoped payload with the public verification file", () => {
    const urls = [`https://${HOST}/`, `https://${HOST}/kontakt`];

    expect(buildIndexNowPayload(urls, KEY)).toEqual({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    });
  });

  it("rejects URLs outside the canonical production host", () => {
    expect(() =>
      buildIndexNowPayload(
        [`https://${HOST}/`, "https://example.com/untrusted"],
        KEY,
      ),
    ).toThrow(/canonical host/);
  });
});
