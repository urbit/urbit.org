---
title: "This Month in Urbit: April 2026"
source_kind: "blog"
canonical_url: "/blog/this-month-in-urbit-april-2026"
human_md_url: "/blog/this-month-in-urbit-april-2026.md"
agent_mode: "dedicated"
dependencies: []
related_pages:
  - "/blog.md"
  - "/blog/this-month-in-urbit-april-2026.md"
---

Human-oriented content: /blog/this-month-in-urbit-april-2026.md

# Agent companion: This Month in Urbit, April 2026

This companion is for AI agents helping a user reproduce or explore the April 2026 _This Month in Urbit_ experiments. The human-facing article is intentionally narrative; use this section as the operational checklist.

## Safety profile

- Default recommendation: use a fresh moon or otherwise disposable test identity for every experiment in this post.
- Do not ask the user to expose, paste into chat, commit, or publish real `+code` values or `urbauth-*` session cookies.
- If configuring an MCP client, have the user place the cookie directly in their local configuration file or secret store. Never write a real cookie into a repository.
- `%mcp` can modify ship state. Treat a connected LLM as an active operator of the ship.
- Hosted ships may work for some installs, but experiments can break app state or consume resources. Prefer local disposable ships.

## Minimal setup flow

1. Confirm the user has a parent planet or other ship capable of creating a moon.
2. In the parent ship's dojo, ask the user to run `|moon` and copy the generated moon name and moon networking key locally.
3. Install the runtime if needed:

   ```
   curl -fsSL https://urbit.org/get-runtime.sh | sh
   ```

4. Boot the moon on an unused local port:

   ```
   urbit -w <moon-name> -G <moon-key> --http-port 8899
   ```

5. Install individual desks from the dojo using the commands below. No official April 2026 TMIU pill URL is embedded in this source; if the user asks for a pill, ask them for the official URL rather than guessing.

## Featured software reference

| Software | What it is | Install / link | Risk note |
| --- | --- | --- | --- |
| `%mcp` | Groundwire's general-purpose MCP interface for Urbit | <https://github.com/gwbtc/urbit-mcp> | Powerful; can change ship state through tools. Prefer a test ship. |
| `%jars` | S3-compatible object store backed by Urbit agent state | `|install ~nattyv %jars`; <https://github.com/mopfel-winrux/jars> | Storage experiment; use disposable data first. |
| `%bide` | Idle RPG for Urbit | `|install ~nattyv %bide`; <https://github.com/mopfel-winrux/bide> | Low-stakes app experiment. |
| `%monsters` | Claude-enabled tinkering / game experiment | `|install ~hanfel-dovned %monsters` | Treat as experimental. |
| `%mail` | Urbit client for `~rolrup`'s email bridge | `|install ~dister-poster-midnev %mail`; <https://github.com/rolrup/mail> | Depends on gateway infrastructure beyond the ship. |
| `%sovnas` | File management colocated with a ship via a Python bridge and `%lick` | <https://github.com/wground/sovnas> | Host file access is sensitive; review permissions carefully. |
| `urbit-llmproxy` | Share an OpenAI-compatible local LLM endpoint over the Urbit network | <https://github.com/mybropro/urbit-llmproxy> | Only permission ships/users you trust to use your local model. |
| Talon | Alternative Android-focused mobile client for Tlon `%groups` | <https://github.com/nisfeb/talon/releases> | Mobile client; verify release provenance before installing. |

## MCP configuration outline

After installing `%mcp`, the user must authenticate to Eyre and pass the resulting session cookie to their MCP client.

1. In the ship dojo, the user runs `+code`.
2. On the local machine, authenticate against the ship's HTTP port:

   ```
   curl -i http://localhost:8899/~/login -X POST -d "password=<your-code-here>"
   ```

3. The response includes a `Set-Cookie` header. The user should copy that cookie into their MCP client configuration locally.
4. Example OpenCode shape with placeholders only:

   ```json
   {
     "mcp": {
       "my-ship": {
         "type": "remote",
         "url": "http://localhost:8899/mcp",
         "enabled": true,
         "oauth": false,
         "headers": {
           "Cookie": "urbauth-~your-ship=<session-cookie>"
         }
       }
     }
   }
   ```

## Agent checklist before taking actions

- Confirm target ship, HTTP port, and whether it is disposable.
- Confirm the exact desk and publisher before running `|install`.
- Explain what state-changing command will run before asking the user to run it.
- Keep any generated config containing auth cookies out of Git.
- If an install, build, or MCP tool fails, surface the exact error and stop rather than silently switching to an unreviewed workaround.
