---
title: "Urbit Core"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Urbit Core

Use this as the smallest orientation layer when a task mentions Urbit but does not yet clearly belong to operations, identity, development, or a specific userspace app.

This file should stay short. Route to the narrower skill as soon as the task is clear.

## Route by task

- Running a ship, booting a comet, troubleshooting a pier, backups, runtime flags, or local networking: load [`running-urbit-os`](../running-urbit-os/SKILL.md).
- Urbit ID, planets, stars, galaxies, ownership, Bridge, Azimuth, keys, custody, or breaches: load [`using-urbit-id`](../using-urbit-id/SKILL.md).
- Hoon, Gall, Clay, desks, generators, marks, tests, Kelvin changes, or app development: load [`urbit-development`](../urbit-development/SKILL.md).
- Hawk, Obelisk, Urbit MCP, or another userspace app: load [`using-urbit-apps`](../using-urbit-apps/SKILL.md).

## Working rules

1. Do not guess across domains. If a task is about identity custody, do not answer from runtime operations alone.
2. Prefer public upstream docs, source repositories, and app manuals over memory.
3. Keep side-effecting work explicit. Operations that write a pier, use live keys, or touch networked ships require confirmation and narrow scope.
4. Load deeper references only when they are relevant.

## Reference index

- [Glossary](references/glossary.md) — compact terms used across the skill collection
