---
title: Hawk Core Model
app: "%hawk"
reference_type: app-subtopic
app_metadata_reference: "README.md"
related_references:
  - "README.md"
  - "ui-and-ops.md"
dependencies: []
---

# Hawk Core Model

## Mental Model

Hawk is a tree of programmable pages.

- A `file` is an `axal page`: a tree whose nodes are Hawk pages.
- A `path` is a `(list @tas)`: a location in that tree.
- A `page` has three parts:
  - `meta=info`
  - `code=mime`
  - `data=manx`
- `data.page` is both UI and application data.
- `code.page` compiles against a Hawk subject and returns a `load`.
- A `card` is an `info`: a tree of typed atoms used as the command sent to a page.
- An empty card `[~ ~]` means “something changed, re-render if needed.”

## Core Types

- `axal`: recursive namespace shape, `[fil=(unit item) dir=(map @tas $)]`
- `info`: `(axal dime)`, used for metadata and cards
- `dime`: `(pair @tas @)`, an aura-tagged atom like `[%da ~2024.1.1]`
- `manx`: renderable interface data; write it with Sail
- `load`: the intermediate result of evaluating Hawk code

## Hawk-500 Compile Subject

Every Hawk page should assume these are available:

- `the-card=card`
- `the-file=file`
- `here=path`
- `origin=(unit path)`
- `c=~(. iu card)` for card/info lookups
- `f=~(. fu file)` for file lookups
- `d=~(. mx data:(~(git fu file) /))`
- `m=~(. iu meta:(~(git fu file) /))`
- `hawk`, `hawk-utils`, `html-utils`, `mu=manx-utils`, `strandio`, `..zuse`

## Preferred Page Patterns

- Default to returning plain `manx` unless you need a richer `load`.
- Use Sail for UI. Use `;>` when the page is mostly prose or udon.
- Treat `data.page` as the source of truth for what the user sees.
- Keep commands explicit: the root dime at `/` is the command kind.

## Load Patterns

Use these loads intentionally:

- `%manx`: return a final UI directly.
- `%vase`: pretty-print a value for debugging or inspection.
- `%shed`: run asynchronous Khan/strand work, but only as the final load.
- `%view`: mirror another page's `data.page`.
- `%twin`: reuse another page's `code.page` on the current subtree.
- `%call`: reuse another page's `code.page` with a fixed card.
- `%lens`: evaluate as if at another path; good for subtree reductions and search.
- `%cons` / `%snoc`: prepend or append load results.
- `%join`: wrap a list of loads in a `div`.
- `%lynx`: join loads under a supplied `marx`.
- `%marx`: rewrite the output tag or attributes.

## Cards And Forms

Forms POST cards.

- Input names are card paths like `"/task/title"` or `"/due"`.
- Values are parsed as dimes when possible, not always plain strings.
- The root dime at `/` should identify the command.

Useful system card paths:

- `/sys/view` to open a Hawk menu after submit
- `/sys/scroll` to scroll to an element after submit
- `/sys/redirect` to redirect after a successful poke
- `/sys/redirect-via-name` to read the redirect target from another card path

Useful system card metadata:

- `/sys/src`
- `/sys/our`
- `/sys/now`
- `/sys/eny`
- `/sys/from`
- `/sys/url/...`

## Reading Card Data

Use `c`, the bound `+iu` door.

- `reb:c` unit lookup
- `rib:c` lookup with bunt
- `rob:c` lookup or crash
- `rub:c` lookup with fallback
- `peb:c`, `pib:c`, `pob:c`, `pub:c` for printed values
- `peb-as:c`, `pib-as:c`, `pob-as:c`, `pub-as:c` for explicit aura printing

Prefer these over ad hoc `info` traversal.

## Event Loop Rules

A poke is one run of the event loop:

1. A card is sent to a page.
2. Permissions are checked.
3. `code.page` is evaluated against the card.
4. `data.page` is replaced with the result.
5. If data changed, updates propagate to subscribers and ancestors.

When multiple cards are involved, longest path is evaluated first.

## Metadata That Matters

These metadata paths are especially important:

- `/title`: `%tas`, page title
- `/pulse`: `%f`, periodic refresh via empty card
- `/peek/public`: `%f`, readable from the clearweb
- `/poke/public`: `%f`, form submissions allowed from the clearweb

Be deliberate with inherited metadata. Public access is metadata-driven.

## File And Path Utilities

Use Hawk's doors instead of hand-rolling tree traversal.

From `hawk-utils`:

- `relative [from up down]` to construct relative paths
- `stub` to parse a cord into a `(unit path)`
- `mong` and `fong` for safe list indexing

From `fu`:

- `get`, `git`, `got`, `gut` for page lookup
- `has` for existence checks
- `tip`, `met`, `mim`, `cod`, `dat` for current-page access
- `wah`, `wax`, `wap` for subtree listing and flattening

## Underdocumented Areas

The manual explicitly notes gaps:

- `manx-utils` is undocumented; inspect `/lib/html-utils/hoon` for details.
- `hawk-utils` is only partially documented; inspect `/lib/hawk/hoon` when you need more.
