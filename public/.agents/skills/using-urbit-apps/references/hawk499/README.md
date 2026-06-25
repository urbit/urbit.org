---
title: "Hawk499"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Urbit Hawk499

## Purpose

Use `%hawk499` as a runtime interface builder for Urbit without editing the underlying `%hawk499` codebase. This skill teaches how to author endpoints, install sidecar lesson apps through the authenticated `/i` editor API, debug runtime failures, and coach a Hoon beginner through the learning path.

`%hawk499` is distinct from `%hawk`. The [`hawk`](../hawk/README.md) reference covers the separate `%hawk` project and its app/page model; this reference covers `%hawk499` runtime interface endpoints, lesson installation, and debugging workflows.

## When to Use

Use this skill when:

- Writing a `%hawk499` endpoint.
- Installing lesson apps into a user's runtime namespace under `/o/learn/...`.
- Teaching SAIL, manx, Udon, Feather, Datastar, quills, strands, and `%hawk499` request handling.
- Debugging `%hawk499` compile errors, crash logs, session state, or Datastar patches.
- Creating new sidecar examples without modifying the upstream `%hawk499` desk source.

Do **not** use this skill to edit the upstream `%hawk499` desk source. Keep examples and teaching materials in this sidecar skill directory unless the user explicitly asks otherwise.

## Required Inputs

For endpoint authoring:

- Desired endpoint path, usually `/learn/<lesson>` or another user namespace.
- Whether the endpoint is public or owner-only.
- Page type: Udon, raw handler, `feather:helpers`, or `feather-1`.
- Whether it needs state, Datastar, imports, or cross-agent watches.

For installation:

- `SHIP_URL`, e.g. `http://localhost:8080`.
- Authenticated Eyre cookie jar path, e.g. `/tmp/hawk499.cookies`.
- Lesson source path under `skills/using-urbit-apps/references/hawk499/lessons/`.

For tutoring:

- Learner's current lesson number.
- Learner's observed output or error.
- Whether to proceed, review, or debug.

## Core Mental Model

```text
Browser request
  -> Eyre HTTP
  -> quill-wrapper route match
  -> compiled quill/runtime endpoint
  -> Spider thread runs handler strand
  -> handler sends HTML, JSON, redirect, or SSE response
```

- Runtime endpoints are installed under `/o/<path>`.
- Editor URLs are `/i/o/<path>`.
- The upstream file quills live under `/lib/quills`, but this skill does not modify them.
- A normal handler receives `req=http-request` and returns `form:(strand ,~)`.
- `server` helpers such as `respond-html:r`, `respond-json:r`, `set-session:r`, and `datastar-session:r` hide Eyre/Gall wire details.

## Process

### Step 1: Choose the smallest fitting endpoint shape

Use this decision tree:

1. Static prose or Markdown-like content -> Udon.
2. Static HTML with explicit markup -> raw handler or `feather:helpers`.
3. Simple API -> raw handler returning JSON.
4. Form with session state -> raw handler with `get-session:r` / `set-session:r`.
5. Live page with server-side patches -> `feather-1` with `get`, `post`, `ui-diff`.

Avoid using `feather-1` before it is needed. Hoon beginners learn faster when each lesson introduces one new idea.

### Step 2: Author endpoint source

Use the lesson files as patterns:

| Lesson | File | Concept |
| --- | --- | --- |
| 01 | `lessons/01-udon-static.txt` | Udon static page |
| 02 | `lessons/02-sail-static.txt` | raw handler + SAIL/manx |
| 03 | `lessons/03-query-params.txt` | query params |
| 04 | `lessons/04-rest-routing.txt` | splat routing and `rest.req` |
| 05 | `lessons/05-json-api.txt` | JSON API |
| 06 | `lessons/06-form-post.txt` | form POST + redirect |
| 07 | `lessons/07-feather-static.txt` | `feather:helpers` |
| 08 | `lessons/08-session-counter.txt` | per-user session state |
| 09 | `lessons/09-datastar-clicker.txt` | Datastar client signals |
| 10 | `lessons/10-todo-simple.txt` | session-backed todo list |
| 11 | `lessons/11-todo-live-feather-1.txt` | `feather-1` live todo |
| 12 | `lessons/12-public-vs-owner-only.txt` | public vs owner-only |
| 13 | `lessons/13-imports.txt` | `/+` imports |
| 14 | `lessons/14-watch-and-patch.txt` | watch-to-patch pattern |
| 15 | `lessons/15-debugging-crashes.txt` | crash/debug loop |

### Step 3: Install without modifying the hawk499 desk

Prefer the bundled Python HTTP CLI:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  install-all
```

The CLI is dependency-free and uses the same form posts as the browser editor. It supports:

```text
login             authenticate with +code and write a cookie jar
status            verify that the cookie jar reaches the private editor
put               install/update one source file at one endpoint path
install           install one source file to one endpoint path
install-all       install all bundled lessons
get               GET a runtime endpoint
check             verify one runtime endpoint status
list              scrape the editor sidebar for known endpoints
move              move/rename one endpoint
delete            delete one runtime endpoint path
install-package   install endpoints from a JSON manifest
uninstall-package delete endpoints from a JSON manifest
check-package     smoke-check endpoints from a JSON manifest
cleanup-legacy    delete old flat/test lesson endpoints created by earlier runs
check-all         GET every bundled lesson route and verify status
routes            print lesson-file to route mapping
```

Raw HTTP shape:

```bash
curl -fsS -b "$COOKIE_JAR" \
  -X POST "$SHIP_URL/i/o/learn/01-udon-static-r" \
  --data-urlencode "op=put" \
  --data-urlencode "source@skills/using-urbit-apps/references/hawk499/lessons/01-udon-static.txt"
```

View at:

```text
$SHIP_URL/o/learn/01-udon-static-r
```

Edit at:

```text
$SHIP_URL/i/o/learn/01-udon-static-r
```

Or install all bundled lessons:

```bash
SHIP_URL="http://localhost:8080" \
COOKIE_JAR="/tmp/hawk499.cookies" \
bash skills/using-urbit-apps/references/hawk499/scripts/install-lessons.sh
```

The shell script is now a thin wrapper around the Python CLI.

For general-purpose usage beyond lessons, read `docs/http-cli.md`.

### Step 4: Debug compile or runtime failures

Use this sequence:

1. If HTTP post returns `403`, authenticate again; `/i` is owner-only.
2. If HTTP post returns `400`, read the plain-text tang. It is a compile error.
3. If the page returns `500`, open `/hawk499/quills` and inspect the endpoint crash log.
4. Open `/hawk499/bowl` to inspect request fields and route shape.
5. For Datastar bugs, check attribute spelling:
   - write `data-on_click` in SAIL
   - expect `data-on:click` in the browser
   - do not write `data-on-click`
6. For SSE xforms, decode persistent facts with `+soft`, not direct `!<`, because the fact is type-stripped.

### Step 5: Tutor with the lesson-coach sub-skill

Follow `docs/lesson-coach.md`:

1. Ask the learner what they expect the code to do.
2. Have them install/run one lesson.
3. Ask them to identify the new concept introduced.
4. Ask them to make one small modification.
5. Debug together using `%hawk499` tools before proceeding.

## Sub-Skill: Endpoint Authoring

When asked to write a `%hawk499` endpoint:

- Start from the smallest fitting lesson pattern.
- Include comments explaining every new concept.
- Prefer owner-only guards only when the endpoint stores private state or exposes private data.
- Use `respond-json-error:r` or visible HTML errors; never silently fail.
- Keep state in `get-session:r` / `set-session:r` for beginner lessons.
- Use a dedicated Gall agent only when session state is no longer enough.

## Sub-Skill: Datastar UI

When asked to add live UI:

- Keep durable state on Urbit, not in browser signals.
- Use browser signals for temporary UI state like text input, loading, toggles, and tab selection.
- Use `data-indicator` or explicit signal patches to show request progress.
- Patch stable IDs with `[%outer ~ ~ node]` when possible.
- Use `session-sub:r` for per-user endpoint state.
- Return `(pure:m [state events])` from xforms.

## Sub-Skill: Debugging

When debugging:

- Distinguish compile errors from runtime crashes.
- Compile errors return from the `/i` post as `400 text/plain`.
- Runtime crashes appear in the wrapper's crash logs and `/hawk499/quills`.
- Request routing confusion should be inspected through `/hawk499/bowl`.
- SSE bugs often come from nested reads inside the same stream or from direct `!<` on type-stripped facts.

## Sub-Skill: Imports

When using imports in runtime endpoint source:

- Put fas runes before the handler body.
- Use `/+ name` for `/lib/name`.
- Use `/- name` for `/sur/name`.
- Use `/= face /path` for explicit paths.
- Use `/^ face /path` for optional imports.
- Use `desk^name` or `desk^/path` only as a `%hawk499` extension, not in ordinary Hoon files.
- Remember imports resolve at save time. Re-save or rebuild after dependency changes.

## Sub-Skill: Example Writer

When adding a new lesson:

- Put it in `skills/using-urbit-apps/references/hawk499/lessons/<nn>-<slug>.txt`.
- Start with comments explaining purpose, install path, expected URL, and concepts.
- Keep the code runnable as one endpoint source.
- Add one “try this” exercise in comments.
- Update `docs/learning-path.md` and the lesson table in this `SKILL.md`.
- Do not add it to `%hawk499/lib/templates` unless the user explicitly changes the rule.

## Outputs

- Sidecar endpoint source files.
- Installation commands using authenticated HTTP.
- Debugging guidance and corrected endpoint source.
- Human-readable explanations suitable for a Hoon beginner.

## Examples

Install lesson 03:

```bash
SHIP_URL="http://localhost:8080"
COOKIE_JAR="/tmp/hawk499.cookies"

python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  install \
  skills/using-urbit-apps/references/hawk499/lessons/03-query-params.txt \
  /learn/03-query-params-f
```

Open:

```text
http://localhost:8080/o/learn/03-query-params-f?name=Stuart
```

## Quality Checklist

- [ ] No edits to upstream `%hawk499` desk.
- [ ] Endpoint source installed under `/o/...` through `/i/o/...`.
- [ ] Cookie jar stored outside the repo.
- [ ] Lesson uses the smallest fitting abstraction.
- [ ] Public/owner-only behavior is explicit.
- [ ] Errors are surfaced, not hidden.
- [ ] Datastar attributes use SAIL underscore spelling for keyed plugins.
- [ ] Learner can explain the new concept before moving on.
