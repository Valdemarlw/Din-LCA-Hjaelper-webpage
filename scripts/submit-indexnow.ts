/**
 * Submits the canonical production URLs from the generated sitemap to IndexNow.
 *
 * IndexNow verifies ownership through the public key file deployed at the site
 * root. The key is intentionally public and must match the file in public/.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const CANONICAL_HOST = "xn--dinlcahjlper-edb.dk";
const INDEXNOW_KEY = "494cd1dc02544bafaa1693aab052ed42";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export function extractSitemapUrls(sitemap: string): string[] {
  return [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    match[1].replaceAll("&amp;", "&").trim(),
  );
}

export function buildIndexNowPayload(
  urls: string[],
  key: string,
): IndexNowPayload {
  if (!/^[a-f0-9]{8,128}$/i.test(key)) {
    throw new Error("IndexNow key must contain 8-128 hexadecimal characters");
  }
  if (urls.length === 0) {
    throw new Error("The sitemap contains no URLs");
  }
  if (urls.length > 10_000) {
    throw new Error("IndexNow accepts at most 10,000 URLs per request");
  }

  for (const value of urls) {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== CANONICAL_HOST) {
      throw new Error(`URL is outside the canonical host: ${value}`);
    }
  }

  return {
    host: CANONICAL_HOST,
    key,
    keyLocation: `https://${CANONICAL_HOST}/${key}.txt`,
    urlList: urls,
  };
}

function findSitemap(): string {
  const candidates = [
    join(process.cwd(), ".vercel", "output", "static", "sitemap.xml"),
    join(process.cwd(), "dist", "sitemap.xml"),
  ];
  const sitemapPath = candidates.find(existsSync);
  if (!sitemapPath) {
    throw new Error("No built sitemap found. Run the production build first.");
  }
  return readFileSync(sitemapPath, "utf-8");
}

async function verifyDeployedKey(payload: IndexNowPayload): Promise<void> {
  let lastStatus = "request failed";
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const response = await fetch(payload.keyLocation, {
        headers: { "cache-control": "no-cache" },
      });
      lastStatus = `HTTP ${response.status}`;
      if (response.ok && (await response.text()).trim() === payload.key) return;
    } catch (error) {
      lastStatus = error instanceof Error ? error.message : String(error);
    }

    if (attempt < 5) {
      await new Promise((resolve) => setTimeout(resolve, 2_000));
    }
  }

  throw new Error(
    `IndexNow key file is not live at ${payload.keyLocation} (${lastStatus})`,
  );
}

async function submit(): Promise<void> {
  const payload = buildIndexNowPayload(
    extractSitemapUrls(findSitemap()),
    INDEXNOW_KEY,
  );

  if (process.argv.includes("--dry-run")) {
    console.log(`IndexNow dry run: ${payload.urlList.length} canonical URLs`);
    return;
  }

  await verifyDeployedKey(payload);
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `IndexNow rejected the submission (HTTP ${response.status}): ${await response.text()}`,
    );
  }

  console.log(
    `IndexNow accepted ${payload.urlList.length} canonical URLs (HTTP ${response.status})`,
  );
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  submit().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
