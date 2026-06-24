---
title: "Urbit MCP"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Urbit MCP

## When to use this reference

Use this reference when you want an LLM client to operate against a running Urbit ship through the Model Context Protocol.

`%mcp` exposes Urbit capabilities as MCP tools, prompts, and resources over HTTP at the ship's `/mcp` endpoint.

## What it is

Urbit MCP is a general-purpose MCP interface for Urbit.

- repo: `https://github.com/gwbtc/urbit-mcp`
- desk name: `%mcp`
- transport: HTTP MCP endpoint at `http://<ship-host>:<port>/mcp`
- auth model: ship web login cookie from `~/login`

This is useful when you want Claude, Codex, or another MCP-capable client to:

- inspect and edit files in a desk
- run tests and build files
- install apps
- scry or poke agents
- add new MCP tools, prompts, or resources

## Prerequisites

- a running Urbit ship, real or fake
- terminal access to the machine running that ship
- `peru` installed and working

The upstream README assumes you can run `peru --version` successfully before building.

## Install and build workflow

Create and mount the desk on the ship:

```dojo
|new-desk %mcp
|mount %mcp
```

From the `urbit-mcp` checkout, build and optionally copy the desk into the mounted pier path:

```bash
./build.sh -p ~/path/to/ship/mcp
```

Then commit and install the desk on the ship:

```dojo
|commit %mcp
|install our %mcp
```

### Build script behavior

`build.sh` does the following:

- requires `peru`
- rebuilds `dist/`
- copies `desk/` into `dist/`
- runs `peru sync`
- optionally copies the built desk into the path provided with `-p`

Useful commands:

- `./build.sh` — build the full desk
- `./build.sh build-dev` — build developer dependencies when `desk-dev` exists
- `./build.sh clean` — remove `dist/` and `dist-dev/`

## Authentication

Get the ship's web login code from Dojo:

```dojo
+code
```

Note that depending on how your urbit runtime interfaces with your agent harness, you may need to ask the user to retrieve this web login code manually.

Post that password to `~/login` and capture the `set-cookie` header:

```bash
curl -i http://localhost:80/~/login -X POST -d "password=<dojo-code>"
```

The returned cookie will look like:

```text
urbauth-~your-ship=<token>
```

That cookie is then passed through to the MCP client.

## Registering clients

### Claude

Register the server with Claude using HTTP transport:

```bash
claude mcp add --transport http zod http://localhost:80/mcp --header "Cookie: urbauth-~your-ship=<token>" --scope user
```

### Codex

Codex uses `mcp-proxy` in front of the streamable HTTP transport.

Install:

```bash
uvx mcp-proxy
```

Then add a server entry to `~/.codex/config.toml`:

```toml
[mcp_servers.fen]
command = "uvx"
args = [
  "mcp-proxy",
  "--transport", "streamablehttp",
  "--headers", "Cookie", "urbauth-~your-ship=<token>",
  "http://localhost:80/mcp"
]
```

## Default capabilities

The default tool implementations live under:

```text
desk/fil/default/mcp/tools/
```

Current built-in tools include:

- desk and file operations: `build-file`, `commit-desk`, `get-file`, `insert-file`, `list-files`, `mount-desk`, `new-desk`, `run-tests`, `install-app`
- ship and agent operations: `get-our-id`, `poke-our-agent`, `nuke-agent`, `revive-agent`, `scry`, `toggle-permissions`
- MCP self-extension: `add-mcp-feature`, `add-mcp-prompt`, `add-mcp-resource`, `add-mcp-tool`

Built-in prompts live under:

```text
desk/fil/default/mcp/prompts/
```

Built-in resources live under:

```text
desk/fil/default/mcp/resources/
```

## Client UX patterns

### Prompts as slash commands

Default prompts are exposed to MCP clients as slash commands with this shape:

```text
/mcp__<server-name>__<tool-name>
```

Example:

```text
/mcp__zod__commit-desk mcp
```

### Resources as `@` mentions

MCP resources can be pulled directly into the context window with `@` mentions.

Example:

```text
@zod:https://docs.urbit.org/llms.txt
```

## Extending `%mcp`

The repo is designed to let the LLM help add new MCP features.

- new tools can be added by describing the tool and, ideally, giving examples
- new prompts can be added as reusable prompt snippets
- new resources can point at public `https://` URLs or `beam://` Clay paths

For custom tools, upstream notes that threads run inside `%mcp-server` must have this signature:

```hoon
$-((map @t argument:tool:mcp) shed:khan)
```

This is the key constraint to remember if you are adapting an existing Hoon thread into an MCP tool.

## Gotchas

- `%mcp` depends on a running ship and normal ship web authentication.
- The build assumes `peru` is installed and in `PATH`.
- The `-p` flag copies into a mounted desk path and removes existing contents there first.
- Claude and Codex use different client registration paths even though they both target the same `/mcp` endpoint.

## Sources

- `https://github.com/gwbtc/urbit-mcp`
- upstream repository README and build script
- `desk/fil/default/mcp/tools/`
- `desk/fil/default/mcp/prompts/`
- `desk/fil/default/mcp/resources/`
