---
title: "Hawk499 Learning Path"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# %hawk499 Learning Path

This path is for Hoon beginners. It starts with static content and slowly adds request handling, state, Datastar, imports, and debugging.

All lessons are sidecar files in `skills/using-urbit-apps/references/hawk499/lessons/`. They are installed into your personal `%hawk499` namespace under `/o/learn/...` through authenticated HTTP posts to `/i/o/learn/...`.

The current `%hawk499` endpoint sidebar does not sort child nodes lexically, so the installer adds a small trailing letter to each lesson route label to force the sidebar to display in lesson order. For example, lesson 01 installs as `/o/learn/01-udon-static-r`. Ignore the trailing letter while learning.

## Lesson Sequence

### 01 — Udon static page

File: `lessons/01-udon-static.txt`

Learn:

- Udon is Markdown-like content that becomes `manx`.
- `udon:helpers` wraps it in a Feather-styled HTML page.
- You do not need a handler gate for a static page.

Success check:

- `/o/learn/01-udon-static-r` renders a styled prose page.

### 02 — SAIL static page

File: `lessons/02-sail-static.txt`

Learn:

- Raw handler shape.
- `req=http-request`.
- `server` response helper door.
- SAIL produces `manx`.

Success check:

- You can identify `|=`, `=/`, `^-`, `respond-html:r`, and `;html`.

### 03 — Query params

File: `lessons/03-query-params.txt`

Learn:

- `query.req` is a map of parsed query string values.
- `fall` supplies defaults.
- Text is inserted into SAIL with `{...}`.

Success check:

- `/o/learn/03-query-params-f?name=Stuart` changes the greeting.

### 04 — Rest routing

File: `lessons/04-rest-routing.txt`

Learn:

- Runtime endpoints are prefix/splat routes.
- `prefix.req` is the matched endpoint path.
- `rest.req` is the unmatched tail beneath that endpoint.
- `base.req` is the full request path.

Success check:

- `/o/learn/04-rest-routing-i/alpha/beta` shows the extra path.

### 05 — JSON API

File: `lessons/05-json-api.txt`

Learn:

- Use `respond-json:r` for API responses.
- Use `respond-json-error:r` for structured failures.
- Branch on method before doing work.

Success check:

- GET returns JSON; POST returns method error.

### 06 — Form POST

File: `lessons/06-form-post.txt`

Learn:

- GET renders a form.
- POST reads `formencoded-body:r`.
- POST responds with a redirect after handling the command.

Success check:

- Submitting the form returns a result page without changing durable state.

### 07 — Feather static page

File: `lessons/07-feather-static.txt`

Learn:

- `feather:helpers` is the middle abstraction between raw handlers and `feather-1`.
- It links Feather CSS and wraps head/body nodes.

Success check:

- Page uses Feather utility classes without manually writing the full handler.

### 08 — Session counter

File: `lessons/08-session-counter.txt`

Learn:

- `get-session:r` reads per-user state for this endpoint.
- `set-session:r` writes per-user state for this endpoint.
- Session is keyed by requesting ship/user and endpoint prefix.

Success check:

- Increment persists across refreshes for your session.

### 09 — Datastar clicker

File: `lessons/09-datastar-clicker.txt`

Learn:

- `data-signals` declares browser-local reactive state.
- `data-on_click` mutates a signal.
- `data-text` renders a signal.

Success check:

- Button clicks update the count without a server request.

### 10 — Simple todo list

File: `lessons/10-todo-simple.txt`

Learn:

- Session state can hold a list.
- POST mutates session state.
- Redirect-after-POST avoids duplicate submissions on refresh.

Success check:

- Add and clear todo items.

### 11 — Live todo with feather-1

File: `lessons/11-todo-live-feather-1.txt`

Learn:

- `feather-1` has `get`, `post`, and `ui-diff`.
- `ui-diff` opens the live query side.
- `session-sub:r` turns session facts into Datastar patches.

Success check:

- Add items and see the list update without a full page reload.

### 12 — Public versus owner-only

File: `lessons/12-public-vs-owner-only.txt`

Learn:

- An endpoint is public unless the handler gates access.
- Owner-only check: `=(our src):req`.
- Return `403` visibly when access is denied.

Success check:

- You can explain where the access check belongs.

### 13 — Imports

File: `lessons/13-imports.txt`

Learn:

- Runtime source can import desk files with `/+`, `/-`, `/=`, and `/^`.
- Imports resolve at save time.
- `%hawk499` tracks dependencies and can mark endpoints stale.

Success check:

- Imported icon renders in the page.

### 14 — Watch and patch

File: `lessons/14-watch-and-patch.txt`

Learn:

- A live UI is a watch transformed into patches.
- `watch-sign` carries `%fact` or `%watch-ack`.
- Persistent SSE facts should be decoded with `+soft`.

Success check:

- Updating session state patches the live region.

### 15 — Debugging crashes

File: `lessons/15-debugging-crashes.txt`

Learn:

- Compile errors happen during install/save.
- Runtime crashes happen during a request.
- `/hawk499/quills` shows crash logs.
- `/hawk499/bowl` shows request shape.

Success check:

- Visiting `?crash` intentionally creates a crash log.

## Rule for Moving On

Do not advance to the next lesson until the learner can:

1. say what new concept the lesson introduced,
2. point to the line that uses it,
3. make one small modification,
4. recover from one simple error.
