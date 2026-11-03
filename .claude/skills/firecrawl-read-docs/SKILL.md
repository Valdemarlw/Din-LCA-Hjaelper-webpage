---
name: firecrawl-read-docs
description: "Find and read current official documentation for a named library, API, SDK or tool, including setup, migration and version-specific behavior. Use supplied official URLs directly; use the Developer Index when the right page is unknown."
metadata:
  upstream: https://github.com/firecrawl/skills/blob/2bf714d9f45e85085036a533ceb943c8577aef2b/skills/core/firecrawl-developer-index/references/official-documentation.md
  upstream-commit: 2bf714d9f45e85085036a533ceb943c8577aef2b
  adapted: 2026-11-03
---

# Read official documentation

Follow the shared Firecrawl credit policy in `.claude/skills/firecrawl/rules/credits.md`. Ordinary research is authorized; this does not authorize outreach, publication, private uploads, or new paid providers.

Establish the product, language and relevant version from the request or repository. Read a supplied official URL directly. Otherwise run `firecrawl developer "PRODUCT VERSION specific question" --limit 5 --json -o .firecrawl/docs-search.json`, then inspect the passages and official URLs. Do not send private source or secrets in the query.

Scrape only pages needed to establish signatures, defaults, examples, compatibility and deprecations. If the index is insufficient, use ordinary search scoped to the official domain. For a documentation section, map the site and crawl only a bounded relevant path rather than downloading the entire site.

Answer with direct official citations and explicit version context. A merged issue or PR is not proof that a fix shipped; use `firecrawl-developer-index` for repository history and unresolved discrepancies. Do not claim code was tested unless it ran. Respect explicit tool and source choices.
