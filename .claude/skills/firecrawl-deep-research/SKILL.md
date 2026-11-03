---
name: firecrawl-deep-research
description: "Produce an intensive, cited research report on a complex technical, scientific, policy or market question. Use for rigorous synthesis with competing explanations and open questions, rather than quick lookups or product lists."
metadata:
  upstream: https://github.com/firecrawl/skills/blob/2bf714d9f45e85085036a533ceb943c8577aef2b/skills/workflows/firecrawl-deep-research/SKILL.md
  upstream-commit: 2bf714d9f45e85085036a533ceb943c8577aef2b
  adapted: 2026-11-03
---

# Firecrawl deep research

Follow the shared Firecrawl credit policy in `.claude/skills/firecrawl/rules/credits.md`. Ordinary research is authorized; this does not authorize outreach, publication, private uploads, or new paid providers.

Infer the question, scope, relevant geography, dates, evidence standard and desired artifact from context. Ask only for missing information that changes the report. If depth is unstated, use a bounded collection plan within the standing credit allowance; do not make a runtime interview mandatory.

1. Search local/project context and current reusable captures, then identify the main factual questions, alternative explanations and potential disconfirming evidence.
2. Collect current primary sources using search, direct scraping and bounded site discovery. Start with a few distinct queries and expand where a conclusion remains unsupported. Avoid repeating full-content retrievals. For literature-centered questions use the scientific paper index, not only the web search research category; inspect `firecrawl research --help`.
3. Keep a compact evidence register with claim, source URL, publication/effective date when relevant, supporting passage and caveats. Check crucial claims against the original source; label inference and conflicting evidence. Preserve uncertainty and geography/version limits.
4. Synthesize an answer or requested report: central finding, evidence by question, competing explanations, practical implications, unresolved questions and cited sources. Adapt structure to the request instead of producing an obligatory long template. Do not substitute scrape summaries for reasoning.
5. Stop when the question is supported, the authorized collection budget is reached, or a material access gap remains. Report meaningful coverage limits and observed credit use. Further collection above 100 credits, recurring monitoring or new paid providers needs approval.

In the Vault, route valuable durable findings through its existing research and wiki conventions; outside it, save only the artifact the task needs. This skill does not authorize creating tasks, contacting people, purchasing data or publishing the report.
