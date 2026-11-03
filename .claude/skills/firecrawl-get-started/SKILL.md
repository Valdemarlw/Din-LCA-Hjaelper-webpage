---
name: firecrawl-get-started
description: "Set up, update or diagnose the shared Firecrawl CLI and authentication for Codex and Claude Code without installing a platform plugin or widening skill scope."
metadata:
  upstream: https://github.com/firecrawl/skills/blob/2bf714d9f45e85085036a533ceb943c8577aef2b/skills/core/firecrawl/rules/install.md
  upstream-commit: 2bf714d9f45e85085036a533ceb943c8577aef2b
  adapted: 2026-11-03
---

# Firecrawl get started

Follow the shared Firecrawl credit policy in `.claude/skills/firecrawl/rules/credits.md`. Ordinary research is authorized; this does not authorize outreach, publication, private uploads, or new paid providers.

1. Run `firecrawl --version`, `firecrawl --status` and, when needed, `firecrawl doctor --help`. Status proves authentication and available credits, not successful extraction.
2. If missing or stale, verify the current official `firecrawl-cli` npm release, then install that explicit version globally. Keep credentials in the existing CLI credential store. Use `firecrawl login --browser` only when authentication is needed; do not put keys in project files or command output.
3. Verify new options with `firecrawl COMMAND --help`. The managed skill sources are in `~/Projects/agent-config/skills`, exposed through shared folder links to Codex and Claude. Do not run the bulk skill/MCP installers, replace their links or install the ChatGPT plugin as a setup shortcut.
4. When end-to-end verification is needed, run one small public URL scrape to a file, inspect its returned content and source URL, then report version, auth state and observed result. Use the shared credit policy for this check.
5. On auth or credit failure, inspect status once and report the specific blocker. Do not repeatedly retry or purchase credits.

Done when the requested installation or diagnostic result is verified; distinguish a help/status check from a real successful request.
