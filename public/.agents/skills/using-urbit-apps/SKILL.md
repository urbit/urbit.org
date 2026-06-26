---
title: "Using Urbit Apps"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Using Urbit Apps

Use this as the thin entrypoint for working with Urbit applications from the perspective of an app user, operator, or contributor trying to understand app-specific behavior.

This file should stay short. Reach for the references only when a task actually depends on the app in question.

## Scope

- app-level workflows and mental models
- public and private app behavior
- forms, queries, operational behaviors, and debugging notes
- app-specific guides that do not belong in the broader development or OS skills

## Dependencies and canonical sources

- the installation command, e.g. `|install ~dister-migrev-dolseg %hawk`, for a given application if distributed live on the network
- the source repo for the relevant app
- the app's manual or docs site, if available

## Working rules

1. Load only the app references relevant to the current task.
2. Prefer app source and manuals when there is a conflict.
3. Keep app-specific longform docs in `references/`.
4. Prefer narrow additions: one app guide file and one new bullet here.
5. Keep canonical app metadata in the frontmatter of the app overview reference, and point subtopic references back to it with `app_metadata_reference`.

## Reference index

- `%hawk` from ~migrev-dolseg
    - [Hawk](references/hawk/README.md) — overview reference with distribution, community, and source pointers
    - [Hawk core model](references/hawk/core-model.md) — compile subject, loads, cards, and file utilities
    - [Hawk UI and operations](references/hawk/ui-and-ops.md) — Feather, templates, auth, theming, and debugging
- `%mcp` from `gwbtc/urbit-mcp`
    - [Urbit MCP](references/urbit-mcp/README.md) — build and install the desk, authenticate with a ship cookie, register Claude or Codex, and extend the server with new tools, prompts, and resources
- `%obelisk` from ~nomryg-nilref
    - [Obelisk](references/obelisk/README.md) — overview reference with installation, UI dependency, and source pointers
    - [Obelisk urQL](references/obelisk/urql/README.md) — syntax, semantics, implementation status, and results
    - [Obelisk urQL syntax](references/obelisk/urql/syntax.md) — DDL, DML, query, scalar, and temporal syntax reference
    - [Obelisk testing](references/obelisk/testing.md) — test helpers, expected result construction, and failure patterns

## Bundle discovery

The optional [`bundles/userspace-apps.yaml`](../../bundles/userspace-apps.yaml) manifest provides machine-readable routing hints for Hawk, Obelisk, and Urbit MCP. It is additive: this `SKILL.md` and the nested app references remain the canonical readable entrypoints.

## Contribution pattern

To extend this skill, add a focused markdown file or nested reference folder under `references/` and then add a bullet to the "Reference Index" section above. Do not create nested `SKILL.md` files for app subtopics.
