---
title: "Hawk499 HTTP CLI"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Hawk499 HTTP CLI

`skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py` is a small dependency-free Python CLI for interacting with `%hawk499` through HTTP.

It deliberately uses the same authenticated editor route that the browser UI uses. It does **not** copy files into the `%hawk499` desk and does **not** require access to the Urbit pier filesystem.

## Authentication

Get a web login code in dojo:

```hoon
+code
```

Write a local cookie jar:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "http://localhost:8080" \
  --cookie-jar "/tmp/hawk499.cookies" \
  login \
  --code "$HAWK499_CODE"
```

Check authentication:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "http://localhost:8080" \
  --cookie-jar "/tmp/hawk499.cookies" \
  status
```

## Endpoint Lifecycle

Install or update one endpoint:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  put /scratch/demo ./demo.hoon
```

Equivalent legacy/lesson command:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  install ./demo.hoon /scratch/demo
```

View runtime response:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  get /scratch/demo
```

Check status:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  check /scratch/demo --expect-status 200
```

Move/rename:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  move /scratch/demo /scratch/demo-renamed
```

Delete:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  delete /scratch/demo-renamed
```

List known endpoints by scraping the editor sidebar:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  list --prefix /learn
```

Note: `list` is HTML-scraping, not a stable JSON read-model. A future sidecar helper endpoint should replace this.

## Package Manifests

The CLI supports JSON manifests for groups of endpoints.

Example `hawk499-package.json`:

```json
{
  "namespace": "/scratch/pkg",
  "endpoints": [
    { "path": "/hello", "source": "hello.hoon" },
    { "path": "/json", "source": "json.hoon" }
  ]
}
```

Install package:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  install-package hawk499-package.json
```

Check package:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  check-package hawk499-package.json
```

Uninstall package:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  uninstall-package hawk499-package.json
```

## Lesson-Specific Commands

Install all bundled lessons with ordered route labels:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  install-all
```

Print lesson route mapping:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py routes
```

Check lessons:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  check-all
```

Delete old unordered/test endpoints from earlier lesson installs:

```bash
python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py \
  --ship-url "$SHIP_URL" \
  --cookie-jar "$COOKIE_JAR" \
  cleanup-legacy
```

## Current Limits

The CLI can push, move, delete, smoke-check, and list endpoints by scraping the editor. It cannot yet reliably pull endpoint source, read dependency metadata, or fetch crash logs because `%hawk499` does not expose those as stable JSON HTTP APIs.

The recommended future improvement is to install a private sidecar helper endpoint, e.g. `/o/_hawk499-cli`, that exposes owner-gated JSON operations for listing, source reads, stale/deps metadata, and crash logs.
