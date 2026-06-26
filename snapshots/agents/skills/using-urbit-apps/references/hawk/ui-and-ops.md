---
title: Hawk UI And Operations
app: "%hawk"
reference_type: app-subtopic
app_metadata_reference: "README.md"
related_references:
  - "README.md"
  - "core-model.md"
dependencies: []
---

# Hawk UI And Operations

## Feather

Use Feather as the default design system.

- Build mobile-first.
- Avoid horizontal scrolling.
- Treat tap or left-click as the primary interaction.
- Prefer POST forms over client-heavy state machines.
- Keep behavior local to the element it affects.
- Prefer autosave and visible request indicators.
- Use semantic tags.

High-value Feather primitives:

- Layout: `fr`, `fc`, `frw`, `grow`, `basis-half`, `basis-full`
- Spacing: `g*`, `p*`, `m*`
- Typography: `prose`, `mono`, `bold`, `underline`, `s*`
- Color: `f*`, `b*`, `bc*`
- State: `hover`, `toggled`, `hidden`, `loader`, `loading`, `loaded`

Feather colors are meant to be overridden with CSS variables in `head-extras`.

## Spine Components

Use Spine when it saves time over raw HTML.

- `spine-sidebar` for collapsible side layouts
- `spine-tabs` for tabbed content
- `spine-input-atom` when you want aura-aware input
- `spine-code-editor` when editing code in-page

## Templates And Reuse

Templates live in:

- `/~/system/templates`
- `/~/config/templates`

For reuse:

- Use `%twin` for shared code and templates.
- Use `%call` when the template needs initialization data.
- Expect template instances to update when the source template changes.

## Configuration And Theming

Override system parts by mirroring names under:

- `/~/config/parts`

Important built-in parts:

- `/~/system/parts/head-extras`
- `/~/system/parts/empty-page`

Use `head-extras` to:

- override Feather colors
- inject extra CSS
- inject custom JavaScript

## HTTP And URL Behavior

- Hawk lives under `/~~/...`
- Hawk forces a trailing slash for relative links to work in normal `<a>` tags.
- GET is a peek.

Useful query params on peek:

- `?code` for raw `code.page`
- `?data` for bare `data.page`
- `?mime=...` to force a content type like RSS or SVG
- `?view=tree|edit|meta|code|data|auth|dojo|make`
- `?scroll=<id>`

Root-path rebinding exists, but treat it as an operational change:

- `|pass [%e %connect [~ /] %hawk]`
- revert with `|pass [%e %connect [~ /] %docket]`

## Authentication And Authorization

Access control is metadata-driven.

- `/peek/public`: `%f` flag for read access from the clearweb
- `/poke/public`: `%f` flag for form submission from the clearweb

If a page is meant to be public or externally submittable, verify these explicitly.

## Security

- Hawk and Urbit are not security-audited.
- If a page is public, its `code.page` is public too.
- Do not put secrets in public code.
- Prefer private sub-pages or metadata for sensitive data.
- Review `/peek/public` and `/poke/public` before exposing anything.

## Debugging

- Put `!:` at the top of Hawk-500 files for better stack traces.
- `[%vase !>(...)]` is a good quick inspection pattern.
- `?code` and `?data` are useful for separating rendering bugs from shell or wrapper bugs.

## Suggested Workflow

1. Decide the page path and the command cards it should accept.
2. Model metadata first: title, pulse, public peek or poke.
3. Build the UI as Sail or manx.
4. Read card values through `c`, not ad hoc parsing.
5. Read neighboring pages through `f`, not ad hoc tree walking.
6. Start with `%manx`; reach for `%twin`, `%call`, `%view`, `%lens`, and `%shed` only when the behavior clearly needs them.
7. Style with Feather classes first and custom CSS second.
8. Add `!:` before doing deeper debugging.
