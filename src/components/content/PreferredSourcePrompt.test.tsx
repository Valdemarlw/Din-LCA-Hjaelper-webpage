import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PreferredSourcePrompt } from "./PreferredSourcePrompt";

describe("PreferredSourcePrompt", () => {
  it("uses Google's documented domain-level deeplink without implying endorsement", () => {
    const html = renderToStaticMarkup(<PreferredSourcePrompt />);

    expect(html).toContain(
      'href="https://www.google.com/preferences/source?q=xn--dinlcahjlper-edb.dk"',
    );
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('data-analytics-event="preferred_source_klik"');
    expect(html).toContain("Vælg os som foretrukken kilde på Google");
    expect(html).not.toContain("anbefalet af Google");
  });
});
