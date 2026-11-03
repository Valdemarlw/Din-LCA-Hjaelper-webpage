# Shared installation

Use `firecrawl-get-started`. Update only the CLI with `npm install -g firecrawl-cli@VERSION`, choosing a verified release. Do not use `init`, `setup skills`, `setup workflows`, `make` or `launch` for this managed setup: they can install unwanted global skills or MCP connections and overwrite custom routing.

Global skill sources live in `~/Projects/agent-config/skills`. The folders in `~/.agents/skills` and `~/.claude/skills` link to those sources. Vault-only workflows live in the Vault's `.agents/skills` and its generated Claude adapters. Keep those scopes intact.
