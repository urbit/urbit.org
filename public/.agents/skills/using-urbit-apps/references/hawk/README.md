---
title: "Hawk"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Hawk Reference

Use this skill when editing Hawk applications or explaining Hawk behavior.

## Quick workflow

1. Identify the page path, expected card shape, and whether this is a plain page, a template, or a composed page.
2. Prefer simple `manx` output first. Only reach for richer `load` composition when behavior clearly needs it.
3. Read card data through `c` and file/tree data through `f`.
4. Use Feather classes and semantic Sail before adding custom CSS or JS.
5. Check metadata early, especially `/title`, `/pulse`, `/peek/public`, and `/poke/public`.
6. Put `!:` at the top of Hawk-500 pages while debugging.

## Read These References As Needed

- For Hawk's types, compile subject, loads, forms, event loop, and utility doors, read [core-model.md](core-model.md).
- For Feather, Spine, templates, auth/public access, URL behavior, configuration, and debugging guidance, read [ui-and-ops.md](ui-and-ops.md).

## Default Working Rules

- Treat Hawk as a tree of programmable pages: `file -> page -> {meta, code, data}`.
- Keep the root dime at `/` as the command kind for non-empty cards.
- Prefer `%manx` for straightforward pages.
- Use `%twin` for shared code, `%call` for shared code with initialization data, `%view` for mirroring another page's data, `%lens` for subtree reductions, and `%shed` only as a final asynchronous load.
- Do not hand-walk `info` or `file` trees unless the utility doors are insufficient.
- Do not put secrets in public page code. A public page exposes its `code.page` too.

## Practical Checks

- If a form behaves oddly, verify card path names and whether values are being parsed as dimes instead of plain strings.
- If a page does not update as expected, check whether it depends on the changed subtree through `%view`, `%twin`, `%call`, or `%lens`.
- If a page is meant to be internet-visible or form-submittable, verify `/peek/public` and `/poke/public`.
- If styling drifts, prefer Feather classes or `head-extras` overrides before custom one-off CSS.

## Manual And Source Pointers

- Manual root: `https://hawk.computer/~~/~/manual/`
- Install page: `https://hawk.computer/~~/install/`
- Community group: `https://join.tlon.io/0v7.nikjh.4ei7s.8fol7.bfe0h.8ad5p`
- Source browser: `https://hawk.computer/~~/eyas`
- Some utilities are underdocumented in the manual. Inspect `/lib/hawk/hoon` and `/lib/html-utils/hoon` when needed.
