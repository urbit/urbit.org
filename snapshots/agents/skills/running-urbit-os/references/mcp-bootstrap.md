# MCP Bootstrap for Disposable Ships

Use this reference when a public task explicitly requires a disposable Urbit ship that exposes an MCP endpoint for agent tooling.

This is an advanced operational workflow. Prefer fake ships or disposable comets. Do not use it with livenet identities unless the user explicitly provides key material and confirms the operation.

## Required inputs

| Input | Description |
| --- | --- |
| Runtime path | An installed Urbit/Vere runtime, for example `urbit` on `PATH` or a user-provided runtime path. |
| Pill path | A user-provided pill known to include the MCP server desk/app. |
| Pier path | A disposable pier directory approved for this task. |
| Ames port | Explicit UDP port that does not collide with another ship. |
| HTTP port | Explicit HTTP port for login and MCP transport. |
| Ship mode | Fake ship, comet, fake/lab moon, or user-confirmed livenet ship. |

## Safety rules

- Use fake ships or disposable comets by default.
- Never search for or invent livenet keys.
- Never print, commit, or log key strings, keyfiles, cookies, `.urb/`, generated moon keys, or pier secrets.
- Keep ports explicit; do not assume common ports are free.
- If an HTTP, MCP, or runtime step fails, surface the exact error and fix the workflow rather than bypassing it.

## Boot pattern

For a fake `~zod`:

```sh
URBIT="$(command -v urbit)"
PILL="<mcp-enabled-pill>"
PIER="<disposable-pier>"
AMES_PORT="<udp-port>"
HTTP_PORT="<http-port>"

setsid "$URBIT" -t -F zod -B "$PILL" \
  -p "$AMES_PORT" --http-port "$HTTP_PORT" \
  -c "$PIER" > "$PIER.log" 2>&1 < /dev/null &
```

For a local-only comet:

```sh
setsid "$URBIT" -t -L -B "$PILL" \
  -p "$AMES_PORT" --http-port "$HTTP_PORT" \
  -c "$PIER" > "$PIER.log" 2>&1 < /dev/null &
```

Use `-L` for local lab work unless live networking is explicitly required.

## Login and MCP verification

1. Obtain the ship login code through a supported local interface such as Dojo or `conn.sock`.
2. Authenticate to Eyre:

```sh
curl -sS -i "http://127.0.0.1:$HTTP_PORT/~/login" \
  -X POST \
  --data-urlencode "password=<four-word-code>"
```

3. Capture only the `urbauth-*` cookie name/value for the current session.
4. Verify the MCP endpoint path documented by the installed MCP app.

Do not include real login codes or cookie values in committed notes.
