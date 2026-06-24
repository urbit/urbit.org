---
title: "README"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Kelvin Migrations

Use this nested reference set when updating a desk or Gall app across a Kelvin decrement.

Kelvin migrations should stay version-aware. This index describes the reusable workflow; version-specific files capture concrete changes for a source and target Kelvin pair.

## Available version references

- [409k to 408k](409-to-408.md) — initial public checklist for migrating desks and Gall apps from 409k-compatible source to 408k-compatible target.

## General workflow

1. Identify the source Kelvin, target Kelvin, runtime/Vere version, and relevant release notes.
2. Inventory the desk:
   - `sys.kelvin`
   - `desk.bill`
   - `desk.docket-0`
   - `app/`
   - `mar/`
   - `sur/`
   - `lib/`
   - `ted/`
   - `gen/` or `tests/` if present
   - dependency manifests or vendored source pins
3. List every Gall agent, mark, generator, test, dependency, and persisted state type that may need migration.
4. Add the target Kelvin to `sys.kelvin` while preserving local ordering style.
5. Do not bump public app versions until fresh-install and upgrade-path tests pass.
6. Treat imported libraries with the same rigor as local source.
7. Prefer upstreaming dependency fixes and pinning tested commits over long-lived vendored overrides.

## Test requirements

Run both classes of tests when practical:

1. Fresh target-Kelvin install:
   - boot a fake ship with the matching runtime and target-Kelvin pill
   - install cross-desk dependencies under canonical desk names
   - commit/load each desk
   - build marks, agents, generators, and tests
   - start agents from `desk.bill`
   - exercise primary pokes, watches, scries, HTTP routes, and cross-desk flows
2. Source-Kelvin to target-Kelvin upgrade:
   - boot a source-Kelvin fake ship
   - install the currently published desk
   - create realistic non-empty state
   - apply the patched desk
   - upgrade runtime/kernel to the target Kelvin
   - confirm `on-load` succeeds and Kiln does not suspend the desk

For distributed apps, use at least two fake ships when peer subscriptions, remote pokes, or replicated state are important.

## Safety and reporting

Report:

- source and target Kelvin
- runtime/pill source
- release-note risks that required patches
- no-op release-note items and why they are no-ops
- dependency changes and exact pins
- fresh-install test results
- upgrade-path test results
- remaining blockers
