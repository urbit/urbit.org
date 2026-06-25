---
title: "Installing Hawk499 Lessons"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Installing %hawk499 Lessons Without Editing the Desk

The lessons in this skill are sidecar source files. They are not `%hawk499` templates and are not part of the upstream `%hawk499` desk.

They install through `%hawk499`'s authenticated editor route:

```text
POST /i/o/<endpoint-path>
op=put
source=<endpoint source>
```

The installed runtime app is served at:

```text
/o/<endpoint-path>
```

## About the route suffixes

The endpoint tree in the current `%hawk499` editor sidebar renders child nodes with Hoon map iteration, not lexical sorting. Plain names such as `01-udon-static`, `02-sail-static`, and `03-query-params` therefore do **not** appear in numeric order.

The sidecar installer uses small trailing letter shims so the `/learn` sidebar displays in lesson order:

| Lesson file | Installed route label |
| --- | --- |
| `01-udon-static.txt` | `01-udon-static-r` |
| `02-sail-static.txt` | `02-sail-static-s` |
| `03-query-params.txt` | `03-query-params-f` |
| `04-rest-routing.txt` | `04-rest-routing-i` |
| `05-json-api.txt` | `05-json-api-o` |
| `06-form-post.txt` | `06-form-post-j` |
| `07-feather-static.txt` | `07-feather-static-r` |
| `08-session-counter.txt` | `08-session-counter-f` |
| `09-datastar-clicker.txt` | `09-datastar-clicker-p` |
| `10-todo-simple.txt` | `10-todo-simple-j` |
| `11-todo-live-feather-1.txt` | `11-todo-live-feather-1-x` |
| `12-public-vs-owner-only.txt` | `12-public-vs-owner-only-r` |
| `13-imports.txt` | `13-imports-z` |
| `14-watch-and-patch.txt` | `14-watch-and-patch-r` |
| `15-debugging-crashes.txt` | `15-debugging-crashes-z` |

Ignore the trailing letter when learning; it is only a sidebar-order workaround and does not change the lesson source.

## Step 1: Get a web login code

In your ship's dojo:

```hoon
+code
```

This prints a one-time web login code.

## Step 2: Create a cookie jar

Run this on the machine that can reach your ship. Adjust `SHIP_URL`.

```bash
export SHIP_URL="http://localhost:8080"
export HAWK499_CODE="paste-your-plus-code-here"
export COOKIE_JAR="/tmp/hawk499.cookies"

curl -fsS -c "$COOKIE_JAR" \
  -X POST "$SHIP_URL/~/login" \
  --data-urlencode "password=$HAWK499_CODE"
```

Equivalent Python CLI command:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  login \
  --code "$HAWK499_CODE"
```

Security rules:

- Do not put the cookie jar in the repository.
- Do not paste the cookie value into chat unless you intentionally want the agent to use it.
- Prefer giving the agent `SHIP_URL` and `COOKIE_JAR` path.
- Delete the cookie jar when finished:

```bash
rm -f /tmp/hawk499.cookies
```

## Step 3: Install one lesson

From the repository root:

```bash
export SHIP_URL="http://localhost:8080"
export COOKIE_JAR="/tmp/hawk499.cookies"

python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  install \
  skills/using-urbit-apps/references/hawk499/lessons/01-udon-static.txt \
  /learn/01-udon-static-r
```

Raw curl equivalent:

```bash
export SHIP_URL="http://localhost:8080"
export COOKIE_JAR="/tmp/hawk499.cookies"

curl -fsS -b "$COOKIE_JAR" \
  -X POST "$SHIP_URL/i/o/learn/01-udon-static-r" \
  --data-urlencode "op=put" \
  --data-urlencode "source@skills/using-urbit-apps/references/hawk499/lessons/01-udon-static.txt"
```

View it:

```text
http://localhost:8080/o/learn/01-udon-static-r
```

Edit it:

```text
http://localhost:8080/i/o/learn/01-udon-static-r
```

## Step 4: Install all lessons

Preferred:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "http://localhost:8080" \
  --cookie-jar "/tmp/hawk499.cookies" \
  install-all
```

Shell wrapper:

```bash
SHIP_URL="http://localhost:8080" \
COOKIE_JAR="/tmp/hawk499.cookies" \
bash skills/using-urbit-apps/references/hawk499/scripts/install-lessons.sh
```

Optional: login and install in one command if you are comfortable putting the one-time code in an environment variable for this shell only:

```bash
SHIP_URL="http://localhost:8080" \
HAWK499_CODE="paste-your-plus-code-here" \
COOKIE_JAR="/tmp/hawk499.cookies" \
bash skills/using-urbit-apps/references/hawk499/scripts/install-lessons.sh
```

The script posts each `lessons/*.txt` file to its ordered route label under `/i/o/learn/...`.

The Python CLI exposes the full direct-HTTP workflow:

```bash
# Print route mapping.
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py routes

# Check every installed lesson route returns 200.
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  check-all

# Delete one endpoint.
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  delete /learn/01-udon-static-r

# Delete old unordered/test endpoints from earlier sidecar runs.
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  cleanup-legacy
```

For general-purpose endpoint, package, move, list, and check commands, see `docs/http-cli.md`.

## Raw HTTP contract

The Python CLI and shell wrapper use these endpoints:

### Authenticate

```text
POST /~/login
Content-Type: application/x-www-form-urlencoded

password=<+code>
```

The response sets an `urbauth-...` cookie. Store it in a local cookie jar outside the repo.

### Install or update an endpoint

```text
POST /i/o/<endpoint-path>
Cookie: urbauth-...
Content-Type: application/x-www-form-urlencoded

op=put&source=<url-encoded endpoint source>
```

`/i` derives `<endpoint-path>` from the `/i/o/...` URL when no explicit `path=` form field is supplied. This makes the operation idempotent: the same request creates or overwrites the runtime endpoint.

### Delete an endpoint

```text
POST /i/o/<endpoint-path>
Cookie: urbauth-...
Content-Type: application/x-www-form-urlencoded

op=del
```

### Read an installed runtime endpoint

```text
GET /o/<endpoint-path>
```

Some lessons require the auth cookie because the handler itself is owner-gated or uses authenticated session state.

## Troubleshooting

### 403 Forbidden

The editor route is owner-only. Re-run login and verify `COOKIE_JAR` points to the cookie jar created by curl.

### 400 Bad Request

This is usually a Hoon compile error. Re-run the install command with `-i` instead of `-fsS` to see the response body:

```bash
curl -i -b "$COOKIE_JAR" \
  -X POST "$SHIP_URL/i/o/learn/01-udon-static-r" \
  --data-urlencode "op=put" \
  --data-urlencode "source@skills/using-urbit-apps/references/hawk499/lessons/01-udon-static.txt"
```

### 500 Runtime Error

The endpoint compiled, but crashed during the request. Open:

```text
/hawk499/quills
```

Then inspect the crash log for the lesson endpoint.

### Route confusion

Open:

```text
/hawk499/bowl
```

Then compare `prefix.req`, `rest.req`, and `base.req` with what your lesson expects.
