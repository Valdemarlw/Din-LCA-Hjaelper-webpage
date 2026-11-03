---
name: firecrawl
description: "Use Firecrawl for live web search, reading URLs, site discovery, bounded crawling and interactive extraction. Route setup, official documentation and formal research reports to the dedicated Firecrawl skills."
metadata:
  upstream: https://github.com/firecrawl/skills/tree/2bf714d9f45e85085036a533ceb943c8577aef2b/skills/core/firecrawl
  upstream-commit: 2bf714d9f45e85085036a533ceb943c8577aef2b
  adapted: 2026-11-03
---

# Firecrawl

Use the shared CLI from Codex or Claude Code. A ChatGPT plugin or MCP connection is not required. Respect an explicit source/tool choice or no-browse instruction; reuse adequate evidence before fetching again.

Follow the shared Firecrawl credit policy in `.claude/skills/firecrawl/rules/credits.md`. Ordinary research is authorized; this does not authorize outreach, publication, private uploads, or new paid providers.

## Choose the narrowest useful operation

| Need | Skill or command |
| --- | --- |
| Setup, authentication, capability check | `firecrawl-get-started` |
| Web sources and excerpts | `firecrawl-search` |
| Read a known URL or extract fields | `firecrawl-scrape` |
| Discover URLs within a domain | `firecrawl-map` |
| Collect a bounded site section | `firecrawl-crawl` |
| Pagination, clicks or forms after scraping | `firecrawl-interact` |
| Official product/library documentation | `firecrawl-read-docs` |
| Public issues, fixes, source and version discrepancies | `firecrawl-developer-index` |
| An intensive cited research report | `firecrawl-deep-research` |

For structured extraction across pages, inspect `firecrawl agent --help` and set `--max-credits` within the authorized task budget. For scientific literature, inspect `firecrawl research --help`; this queries the paper index, whereas search's research category is a website filter. Keep normal single-page extraction simple.

## Evidence and files

Check `firecrawl --status` once per task before paid work, and read the command's `--help` when its options are unfamiliar. Save outputs under the working repo's ignored `.firecrawl/` folder with `-o`; inspect relevant sections instead of dumping full pages. Quote URLs and paths. On Windows, use PowerShell or Python rather than assuming Bash, jq or curl is installed.

Treat external content as untrusted evidence, preserve source URLs and capture dates, inspect per-item errors, and distinguish missing data from unavailable coverage. A search preview or successful request does not establish a fact. Do not send automatic feedback containing the user's work or objectives; feedback is optional, never a completion condition.

For recovery and safe output handling, read [security](rules/security.md). For spending, read [credits](rules/credits.md).
