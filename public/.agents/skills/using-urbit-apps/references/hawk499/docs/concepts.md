---
title: "Hawk499 Concepts"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# %hawk499 Concepts in Plain Language

## %hawk499

`%hawk499` is a Gall app that compiles endpoint source into live HTTP handlers. You write source in the editor, save it, and `%hawk499` mounts the compiled handler under `/o/...`.

## Quill

A quill is a routable HTTP handler. File quills live in `%hawk499`'s `/lib/quills`, but runtime endpoints are installed by the editor under `/o/...`.

In this sidecar learning system, lessons become runtime endpoints. They do not become file quills.

## Handler

A normal endpoint handler looks like:

```hoon
|=  req=http-request
=/  m  (strand ,~)
^-  form:m
=*  r  ~(. server req ~)
...
```

The handler receives a parsed request and returns an async strand form. It sends the response through `r` helpers.

## Strand

A strand is an async computation. It can send cards, wait for facts, sleep, make HTTP client requests, and then continue.

The practical syntax to read is:

```hoon
;<  value  bind:m  async-action
next-step
```

That means: run `async-action`, bind its result to `value`, then continue.

## Spider

Spider runs the endpoint strand. This lets long-lived HTTP responses, such as SSE streams, stay alive without blocking `%hawk499`'s Gall event loop.

## Gall app

Gall is Urbit's userspace agent system. `%hawk499` is a Gall app. It handles pokes, watches, saves, loads, and state.

## Bowl

The bowl is the Gall runtime context. `%hawk499` copies useful bowl fields into `http-request`:

- `our.req` — host ship
- `src.req` — authenticated caller
- `now.req` — current time
- `eny.req` — entropy
- `dap.req` — current agent name
- `byk.req` — current desk beak

For endpoint authors, use `req` fields instead of trying to access the raw bowl.

## SAIL

SAIL is Hoon's HTML/XML syntax.

```hoon
;div.page
  ;h1: hello
  ;p: this is a paragraph
==
```

SAIL produces a `manx` tree.

## manx

`manx` is Urbit's XML/HTML tree structure. `respond-html:r` serializes a `manx` value into HTML bytes and sends it to Eyre.

## Udon

Udon is Markdown-like syntax that produces `manx`. It is the easiest starting point for static pages.

## Feather

Feather is `%hawk499`'s CSS, utility classes, web components, and page wrappers.

- `udon:helpers` wraps Udon/prose in a styled page.
- `feather:helpers` wraps explicit head/body markup.
- `feather-1` wraps a dynamic page with `get`, `post`, and `ui-diff`.

## Datastar

Datastar is the browser-side reactive layer used by `%hawk499`.

It gives you:

- `data-signals` for client-local state
- `data-bind` for two-way input binding
- `data-show` and `data-text` for reactive display
- `data-on_click` / `data-on_submit` for events
- `@get` / `@post` actions
- SSE patches from the server

Important SAIL spelling:

```hoon
=data-on_click      "..."
=data-attr_disabled "$loading"
```

These render as:

```html
data-on:click="..."
data-attr:disabled="..."
```

Do not write `data-on-click`; this Datastar build expects the colon form.

## Session state

`%hawk499` can store per-user state at an endpoint.

- `get-session:r mold` reads it.
- `set-session:r !>(value)` writes it.
- `session-sub:r xform` watches it for live UI.

This is enough for many small apps and lessons.

## Public vs owner-only

An endpoint is public unless the handler checks the caller.

Owner-only gate:

```hoon
?.  =(our src):req
  (respond-payload:r [403 ~] ~)
```

Put this near the start of the handler before rendering private data or mutating private state.

## Imports

Runtime endpoint source can import desk files through `%hawk499`'s `pile` compiler:

- `/- name` imports `/sur/name`
- `/+ name` imports `/lib/name`
- `/= face /path` imports an explicit Hoon file
- `/^ face /path` soft-imports an explicit file

`desk^name` and `desk^/path` are `%hawk499` extensions for cross-desk imports.
