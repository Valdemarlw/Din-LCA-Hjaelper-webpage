#!/bin/bash
# Setup script for the "DLH review" cloud environment.
# Paste into the environment's setup script field at claude.ai/code.
# Runs as root on Ubuntu before env vars are set; must exit 0.

# Firecrawl CLI (auth comes from FIRECRAWL_API_KEY in the environment variables)
npm install -g firecrawl-cli@1.26.24 || true

# claude-seo v2.5.0 (pinned tag) into ~/.claude/skills and ~/.claude/agents
git clone --depth 1 --branch v2.5.0 https://github.com/AgriciDaniel/claude-seo /tmp/claude-seo \
  && CLAUDE_SEO_TAG=v2.5.0 bash /tmp/claude-seo/install.sh || true

# Personal working preferences (the local ~/.claude/CLAUDE.md is not carried to the cloud)
mkdir -p ~/.claude
cat > ~/.claude/CLAUDE.md <<'EOF'
# Valdemar - cloud session preferences
- Mirror the user's language. Never use the em dash character; use a plain dash.
- Direct, concise, human. No AI filler or hype.
- Read before writing. Prefer the simplest complete change. Do not widen the task.
- Proof is behavioral: run the tests and check the result in a browser before saying done. Say how you checked it.
- Report outcomes, not code walkthroughs. End with one line: what is waiting on Valdemar, or "nothing".
EOF

exit 0
