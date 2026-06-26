---
title: "Running Urbit Os"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Running Urbit OS

Use this as the thin entrypoint for runtime and operational questions about Urbit OS.

This file should stay short. Add long-form operational material under `references/` and read it only when it is relevant.

## Scope

- installing and booting ships
- pier lifecycle, backups, and upgrades
- networking, keys, and operational troubleshooting
- desk management and runtime administration

## Dependencies and canonical sources

- `https://developers.urbit.org/`
- `https://github.com/urbit/urbit`
- release notes and operational docs for the runtime being used

## Working rules

1. Separate runtime and operations guidance from identity and app guidance.
2. Prefer documented operational procedures over ad hoc shell folklore.
3. Put long-form walkthroughs in `references/`, not here.
4. Keep contributions narrow and auditable.

## Reference index

- See [references/README.md](references/README.md) for the contribution pattern.
- For autonomous comet bootstrapping with a native-first, low-dependency flow, see [references/comet-onboarding-for-agents.md](references/comet-onboarding-for-agents.md).
- For booting disposable ships that expose an MCP endpoint for agent tooling, see [references/mcp-bootstrap.md](references/mcp-bootstrap.md).

## Contribution pattern

Add focused markdown references under `references/` and list them here. Do not create nested `SKILL.md` files for subtopics.
