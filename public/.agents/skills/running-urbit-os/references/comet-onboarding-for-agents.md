---
title: "Comet Onboarding For Agents"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Comet onboarding for agents

Use this guide when you need to create a fresh Urbit comet, obtain the web login code, and verify the local web UI from an automated Linux workspace.

This guide is intentionally agent-oriented. It avoids assuming `screen`, `tmux`, Python, Node, `jq`, or `script` are installed or appropriate for boot/code retrieval.

## Source priority

1. Start from the agent namespace on the public site:
   - `https://urbit.org/.agents/index.md`
   - `https://urbit.org/.agents/skills/index.md`
   - `https://urbit.org/.agents/skills/running-urbit-os/SKILL.md` when the skills index lists Running Urbit OS
   - `https://urbit.org/.agents/skills/running-urbit-os/references/comet-onboarding-for-agents.md`
   - use explicit `.md` files; do not probe the bare `https://urbit.org/.agents/` directory if `index.md` is available
   - do not guess alternate skill paths such as `running-urbit-os.md`, `running-urbit.md`, or bare skill directories unless an index explicitly links them
2. Use human documentation only as supporting reference:
   - `https://docs.urbit.org/get-on-urbit.md`
   - `https://docs.urbit.org/user-manual/running/vere.md`

## Exact Markdown beats summaries

Some agent web-fetch tools summarize Markdown instead of returning the exact file. Do not copy shell recipes from a generated summary when operating a ship. Summaries can drop safety checks or invent unsafe shortcuts.

For command details, save the exact Markdown bytes with ordinary shell tools, then inspect only the headings or snippets you need:

```sh
mkdir -p "$ARTIFACT_DIR/source"
curl -fsSL https://urbit.org/.agents/skills/running-urbit-os/references/comet-onboarding-for-agents.md \
  -o "$ARTIFACT_DIR/source/comet-onboarding-for-agents.md"
```

Verify fetched files with `test -s` or `wc -c < "$ARTIFACT_DIR/source/comet-onboarding-for-agents.md"`. Avoid noisy `ls -la` diagnostics in benchmark transcripts; directory listings can print unrelated numbers near official URLs and confuse evidence scoring.

Keep automated transcripts compact. Store full Markdown, boot logs, HTTP bodies, cookies, and browser artifacts in files; print only short status lines, selected readiness lines, and byte counts. Do not run `cat`/large `sed` dumps over this guide, `program.md`, full HTML, or long logs. Large copied documents or HTML pages make runs slower and can push token accounting over the benchmark target without improving verification.

If a summary suggests broad process matching such as `pkill -f`, `pgrep -f`, `killall`, or `ps aux | awk '/[u]rbit/ && /comet/'`, ignore that recipe. This guide requires filtering by executable name (`comm` exactly `urbit`) and pier path.

## Runtime download

For Linux x86_64, the public install path is:

```sh
curl -L https://urbit.org/install/linux-x86_64/latest | tar xzk --transform='s/.*/urbit/g'
chmod +x ./urbit
./urbit --version
```

If that path is unavailable outside the benchmark mirror, use the official Vere release asset instead. Avoid adding `jq` or other helpers just to discover the asset; the latest Linux x86_64 release URL is stable:

```sh
curl -fL -o linux-x86_64.tgz \
  https://github.com/urbit/vere/releases/latest/download/linux-x86_64.tgz
tar xzf linux-x86_64.tgz
mv vere-*-linux-x86_64 urbit
chmod +x ./urbit
./urbit --version
```

During first boot, Vere fetches the default boot pill from `https://bootstrap.urbit.org/`, for example `https://bootstrap.urbit.org/urbit-v4.3.pill`. Do not replace this with a local file unless the task explicitly asks for pill experiments.

## Boot a comet without screen, tmux, Python, Node, jq, or script

Prefer the native `urbit` runtime and ordinary shell control. Do **not** require `screen`, `tmux`, Python, Node, `jq`, `script`, or an expect-style PTY helper just to boot a comet or retrieve the web login code. In benchmark settings, `script` is treated as a non-native helper and should not appear in the successful boot/code path.

Use explicit paths and ports:

```sh
URBIT="${URBIT:-./urbit}"
PIER="${URBIT_PIER:-$PWD/comet}"
HTTP_PORT="${URBIT_HTTP_PORT:-8085}"
ARTIFACT_DIR="${ARTIFACT_DIR:-$PWD/artifacts}"
BOOT_LOG="$ARTIFACT_DIR/urbit-boot.log"
mkdir -p "$ARTIFACT_DIR"
```

Keep the pier in the current workspace, not under `$ARTIFACT_DIR`. Artifacts are for logs, screenshots, `status.json`, and `web_access_code.txt`; the running pier should be a normal workspace directory such as `$PWD/comet`.

When a benchmark or automation harness provides `ARTIFACT_DIR`, use that exact directory for every required artifact and log. Do not invent `/workspace/artifacts`, `$PWD/artifacts`, or another location; external scorers usually read only the supplied artifact directory. The `${ARTIFACT_DIR:-$PWD/artifacts}` default below is for non-benchmark use when no artifact directory is already set.

Keep the runtime binary outside the pier path, for example `$PWD/urbit`. Do not pre-create `$PIER`, copy files into it, or hard-link the runtime inside it before first boot. Vere's `-c "$PIER"` command creates the pier directory; if the path already exists, first boot can fail with `tried to create pier ... but it already exists`.

Start first boot with a native headless command and let Vere mine the comet. This uses only the runtime and ordinary shell job control; first boot may take up to an hour. Prefer `-t` without `-d` for initial comet creation in headless automation. When the runtime supports it, add `--no-demand` to reduce demand paging surprises in compact automation runs. In previous automated runs, `-d` sometimes exited after `loom: mapped 2048MB` before creating a ready pier, while the same runtime could continue successfully with `-t` and normal stdout/stderr redirection.

```sh
nohup "$URBIT" -t --no-demand --http-port "$HTTP_PORT" -c "$PIER" \
  > "$BOOT_LOG" 2>&1 < /dev/null &
BOOT_PID=$!
```

Wait until Vere shows live readiness. Good readiness signals include:

- `boot: found comet ~...`
- `--------------- bootstrap complete ----------------`
- `conn: listening on .../.urb/conn.sock`
- `http: web interface live on http://localhost:PORT`
- `~...:dojo>`

Avoid long background polling loops. In particular, do not start a command such as `for ...; do sleep 60 ...; done &` and then forget it; that can keep an automated agent harness alive long after the ship is ready. Use a foreground bounded readiness check, or if your runner provides a monitor, use one watcher and stop/cancel it before writing final status.

Universal pier safety rule: after any `urbit` command has been run against a pier path, do not automatically delete, empty, overwrite, or recreate that path. Treat even a partially-created pier as potentially identity-bearing continuity state. If first boot exits early, stop only matching `urbit` processes, preserve the pier directory and logs, verify no live process still owns it, and either retry the same pier non-destructively or ask the operator. For disposable comet automation, a new retry may use a fresh unique pier path, but the previous attempt should still be left intact unless the user explicitly asks to remove it. Do not silently switch to `script`, Python, `screen`, or `tmux`; those are non-native helper paths in this benchmark.

```sh
nohup "$URBIT" -t --no-demand --http-port "$HTTP_PORT" -c "$PIER" \
  > "$BOOT_LOG" 2>&1 < /dev/null &
BOOT_PID=$!
sleep 10
if ! kill -0 "$BOOT_PID" 2>/dev/null && ! test -d "$PIER/.urb" && ! test -e "$PIER/.run"; then
  echo "native headless creation exited early; preserve the pier path and logs, then retry non-destructively or ask the operator" >&2
  exit 1
fi
```

In a known headless command runner, start with the native `-t` background shape rather than first attempting an interactive boot that will fail with `vere: unable to initialize terminal (not a tty)`:

```sh
nohup "$URBIT" -t --no-demand --http-port "$HTTP_PORT" -c "$PIER" \
  > "$BOOT_LOG" 2>&1 < /dev/null &
```

## Retrieve the web access code with native Urbit facilities

The web login code is the same value returned by the Dojo `+code` generator and Jael's `/j/code` scry. Use the lowest-dependency native path available in your situation.

If you already have a Dojo prompt, use it. This is the simplest path and requires only the running `urbit` process:

```text
~sampel_sipnym:dojo> +code
sampel-ticlyt-migfun-falmel
```

Write only the four-word code to your secret artifact file. Do not print it into the transcript, include it in `status.json`, include it in `evidence.md`, or paste it as a literal into later shell commands:

```sh
printf '%s\n' 'sampel-ticlyt-migfun-falmel' > "$ARTIFACT_DIR/web_access_code.txt"
```

If you do not want to type into Dojo, use the runtime's native one-shot scry support (`-X/-Y/-Z`) after stopping the live pier. This also requires no Python, Node, `nc`, `screen`, or `tmux`.

Important: one-shot scry needs exclusive access to the pier. If the ship is still running, it usually fails with `pier: locked by PID ...`. In headless automation, the most reliable path is:

1. Capture the full comet name from the readiness log line `boot: found comet ~...`.
2. Stop the live `urbit` process for this pier and wait for it to exit.
3. Remove a stale `.vere.lock` only after no `urbit` process remains.
4. Run `/j/code/<full-ship>` against the stopped pier. Do not use bare `/j/code`; include the full ship name.
5. Restart the same pier detached and verify HTTP again before finishing.

Do not use broad process matching such as `pkill -f`, `pgrep -f`, `killall`, or `ps aux | awk` filters for `urbit`/`comet`. In benchmark harnesses, the agent CLI command line contains the prompt text, so broad matching can kill the agent or its shell instead of only stopping Vere. Match by executable name (`comm` equals `urbit`) and pier path.

```sh
SHIP=$(grep 'boot: found comet ~' "$BOOT_LOG" \
  | grep -Eo '~[a-z]{3,8}(-[a-z]{3,8}){3}--[a-z]{3,8}(-[a-z]{3,8}){3}' \
  | head -n 1)
test -n "$SHIP" || { echo "could not find comet ship name in $BOOT_LOG" >&2; exit 1; }

URBIT_PIDS=$(ps -eo pid=,comm=,args= \
  | while read -r pid comm args; do
      if [ "$comm" = "urbit" ]; then
        case "$args" in
          *"$PIER"*) printf '%s\n' "$pid" ;;
        esac
      fi
    done)

if [ -n "$URBIT_PIDS" ]; then
  printf '%s\n' "$URBIT_PIDS" | while read -r pid; do kill -TERM "$pid" 2>/dev/null || true; done
  for _ in $(seq 1 30); do
    STILL_RUNNING=$(ps -eo pid=,comm=,args= \
      | while read -r pid comm args; do
          if [ "$comm" = "urbit" ]; then
            case "$args" in
              *"$PIER"*) printf '%s\n' "$pid" ;;
            esac
          fi
        done)
    test -z "$STILL_RUNNING" && break
    sleep 1
  done
  if [ -n "$STILL_RUNNING" ]; then
    printf '%s\n' "$STILL_RUNNING" | while read -r pid; do kill -KILL "$pid" 2>/dev/null || true; done
  fi
fi

rm -f "$PIER/.vere.lock"

"$URBIT" -t -X "/j/code/$SHIP" -Y access-code -Z p "$PIER" \
  > "$ARTIFACT_DIR/code-scry.stdout.log" \
  2> "$ARTIFACT_DIR/code-scry.stderr.log"

CODE_FILE="$PIER/.urb/put/access-code.txt"
test -s "$CODE_FILE" || { echo "access-code scry output missing; inspect $ARTIFACT_DIR/code-scry.stderr.log" >&2; exit 1; }
tr -d '~%[:space:]' < "$CODE_FILE" > "$ARTIFACT_DIR/web_access_code.txt"
test -s "$ARTIFACT_DIR/web_access_code.txt" || { echo "web access code file is empty" >&2; exit 1; }
```

Do not run `cat "$ARTIFACT_DIR/web_access_code.txt"` or otherwise display the code. For sanity checks, use `test -s "$ARTIFACT_DIR/web_access_code.txt"` or `wc -c < "$ARTIFACT_DIR/web_access_code.txt"`; these verify the file without exposing the secret.

The pier-side scry output file is secret too. Do not run `cat`, `head`, `tail`, `grep`, `tee`, or any command that prints `$PIER/.urb/put/access-code.txt`. Copy it with input redirection only, as shown above, and verify the destination with `test -s` or `wc -c`.

Do not scrape `/~/login`, HTML placeholders, browser DOM values, screenshots, or response bodies for the access code. The only valid code sources are native Urbit facilities: stopped-pier `/j/code/<ship>`, live `conn.sock`, or interactive Dojo `+code`. Once `$ARTIFACT_DIR/web_access_code.txt` exists, do not overwrite it from a web page value. The final file should contain only the four-word code, with no leading `~` or `%`.

The minimal stopped-pier scry command is:

```sh
SHIP='~sampel-ticlyt-migfun-falmel--savdeg-mirlyd-boltex-lanpex'

"$URBIT" -t -X "/j/code/$SHIP" -Y access-code -Z p "$PIER" \
  > "$ARTIFACT_DIR/code-scry.stdout.log" \
  2> "$ARTIFACT_DIR/code-scry.stderr.log"

CODE_FILE="$PIER/.urb/put/access-code.txt"
test -s "$CODE_FILE" || { echo "access-code scry output missing; inspect $ARTIFACT_DIR/code-scry.stderr.log" >&2; exit 1; }
tr -d '~%[:space:]' < "$CODE_FILE" > "$ARTIFACT_DIR/web_access_code.txt"
```

Before you finish an automated task, make sure the final Urbit process is detached from the agent command that is about to exit. Do not rely on a foreground `script`, PTY wrapper, or command-runner child process surviving after the agent finishes. If necessary, end the interactive boot session after you have the access code, then restart the same pier in a detached native process and verify HTTP readiness again:

```sh
setsid "$URBIT" -t --no-demand --http-port "$HTTP_PORT" "$PIER" \
  > "$ARTIFACT_DIR/urbit-run.log" 2>&1 < /dev/null &
printf '%s\n' "$!" > "$ARTIFACT_DIR/urbit-run.pid"
```

Poll for HTTP readiness if a CLI HTTP client is available, or open `http://127.0.0.1:$HTTP_PORT/~/login` in a browser:

```sh
if command -v curl >/dev/null 2>&1; then
  until curl -fsS --max-time 5 "http://127.0.0.1:$HTTP_PORT/~/login" >/dev/null; do sleep 2; done
fi
```

After this check passes, ensure no temporary readiness watcher or polling command remains alive. The only long-running process that should survive task completion is the final detached `urbit` process.

## Optional live `conn.sock` path

If the ship is live and a Unix-domain socket client such as `nc` is already present, you can query `conn.sock` without stopping the pier. Do not install `nc` just for this; use the native one-shot scry above when minimizing dependencies.

This command avoids Python by using `printf` for the conn payload:

```sh
if command -v nc >/dev/null 2>&1 && test -S "$PIER/.urb/conn.sock"; then
  CODE_RAW=$(
    printf '%s\n' '[0 %fyrd %base %khan-eval %noun %ted-eval '\''=/  m  (strand ,vase)  ;<  our=@p  bind:m  get-our  ;<  code=@p  bind:m  (scry @p /j/code/(scot %p our))  (pure:m !>((crip (slag 1 (scow %p code)))))'\'']' \
      | "$URBIT" eval -jn \
      | nc -U -W 5 "$PIER/.urb/conn.sock" \
      | "$URBIT" eval -cn
  )
  printf '%s\n' "$CODE_RAW" | grep -Eo '%[a-z]{3,8}(-[a-z]{3,8}){3}' | tr -d '%' > "$ARTIFACT_DIR/web_access_code.txt"
fi
```

## Verify the web UI

Use the code from `$ARTIFACT_DIR/web_access_code.txt`.

Quick HTTP checks:

```sh
curl -fsS -o /dev/null -w 'login HTTP %{http_code}\n' "http://127.0.0.1:8085/~/login"
curl -i -X POST "http://127.0.0.1:8085/~/login" \
  --data-urlencode "password=$(cat "$ARTIFACT_DIR/web_access_code.txt")"
curl -i "http://127.0.0.1:8085/session.js"
```

The login command above reads the password from the file at execution time; it does not paste the plaintext code into the command transcript. For login-page availability checks, discard or save the response body instead of printing it; the HTML may contain sensitive placeholder values and is not needed for verification.

For browser verification, use the browser available in your environment. In a benchmark, this may be headless Playwright or another browser automation tool; for a human, an ordinary browser is fine. Log in at `/~/login`, then perform one benign post-login action such as opening Landscape search, opening Terminal/Tlon, or opening an app tile. Save screenshots when automation is available and summarize the action in `$ARTIFACT_DIR/evidence.md`.

If you write a browser automation script, keep its error path secret-safe. Playwright timeout errors can include the argument passed to `fill(...)`; if that argument is the access code, the raw transcript leaks the secret. Prefer selectors that skip disabled fields, for example:

```js
const loginInput = page.locator('input[name="password"]:not([disabled]), input[type="password"]:not([disabled]), input:not([disabled]):not([type="hidden"])').first();
```

Wrap browser automation in `try/catch`, replace the code with `<ACCESS_CODE>` in any error text before printing, and never log the code or page form values.

## Required evidence

Write:

- `$ARTIFACT_DIR/status.json`
- `$ARTIFACT_DIR/web_access_code.txt`
- `$ARTIFACT_DIR/evidence.md`

Security hygiene: the plaintext access code should appear only in `$ARTIFACT_DIR/web_access_code.txt`. In `status.json`, `evidence.md`, screenshots, command output, and final prose, refer to the file path rather than the code value.

In `evidence.md`, explicitly mention:

- the `/.agents/` URL(s) used;
- the runtime URL used;
- whether the live bootstrap pill host was contacted by Vere;
- the boot command;
- how you retrieved the access code: native `/j/code` scry, live `conn.sock`, or interactive `+code`;
- HTTP/login/browser verification;
- where logs and screenshots were saved.
