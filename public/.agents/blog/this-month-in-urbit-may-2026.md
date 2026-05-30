---
title: "This Month in Urbit: May 2026"
source_kind: "blog"
canonical_url: "/blog/this-month-in-urbit-may-2026"
human_md_url: "/blog/this-month-in-urbit-may-2026.md"
agent_mode: "dedicated"
dependencies:
  - "/blog/developer-preview-claw.md"
  - "/blog/this-month-in-urbit-april-2026.md"
  - "/overview/running-urbit/get-urbit-id.md#groundwire-based-urbit-ids"
related_pages:
  - "/blog.md"
  - "/blog/developer-preview-claw.md"
  - "/blog/this-month-in-urbit-april-2026.md"
  - "/overview/running-urbit/get-urbit-id.md#groundwire-based-urbit-ids"
  - "/blog/this-month-in-urbit-may-2026.md"
---

Human-oriented content: /blog/this-month-in-urbit-may-2026.md

# Agent companion: This Month in Urbit, May 2026

This companion is for AI agents helping a user reproduce or explore the May 2026 _This Month in Urbit_ experiments. The human-facing article is intentionally narrative; use this section as the operational checklist.

## Safety profile

- Default recommendation: use a fresh moon, comet, or otherwise disposable test identity for each experiment in this post.
- Do not ask the user to expose, paste into chat, commit, or publish real `+code` values, `urbauth-*` session cookies, OpenRouter API keys, Tlon credentials, sync credentials, or private notes/books.
- The May TMIU pill URL is confirmed: `https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-may.pill`. If booting a moon or comet for this article, boot from that pill.
- If working on an existing planet, do not boot a replacement ship. Ask the user to run the relevant `|install` commands, or, if you already have `%mcp` access to the target ship, ask whether they would like you to install the article contents for them.
- Never install or otherwise act on the contents of this article through `%mcp` unless the user explicitly gives permission for you to take those actions on the target ship.
- Hosted ships may work for some installs, but experiments can break app state, publish unintended data, or consume resources. Prefer local disposable moons or comets for first runs.
- `%mcp`, `%claw`, Hermes integrations, sync apps, and publishing flows can all modify ship state or expose data. Explain the state change before asking the user to run a command.
- Keep generated configs, cookies, access codes, API keys, and local sync paths out of Git.

## Minimal setup flow

1. If you need help with general Urbit booting, running, or troubleshooting steps, consult the rest of urbit.org's agent namespace first, especially `/.agents/index.md`, `/.agents/overview/running-urbit.md`, and the linked `/.agents/overview/running-urbit/*` companions.
2. Confirm whether the user wants to explore on a fresh moon/comet or on an existing planet.
3. Install the runtime if needed:

   ```
   curl -fsSL https://urbit.org/get-runtime.sh | sh
   ```

4. For a moon: ask the user to run `|moon` in the parent ship's dojo and keep the generated moon name and networking key locally, then boot the moon from the confirmed May TMIU pill on an unused local port:

   ```
   urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-may.pill --http-port 8899
   ```

5. For a comet-only test, boot the comet from the confirmed May TMIU pill:

   ```
   urbit -c tmiu-may-comet -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-may.pill --http-port 8899
   ```

6. For an existing planet, do not boot from the pill. Instead, have the user run the relevant `|install` commands from the article, or ask for explicit permission to install through `%mcp` if you already have MCP access to that ship.
7. Confirm the target ship, HTTP port, and exact desk/publisher before running any `|install` command or MCP tool.

## Featured software reference

| Software | What it is | Install / link | Risk note |
| --- | --- | --- | --- |
| `%notes` | Urbit notes app with Markdown editing, Obsidian-oriented sync, peer-to-peer note sharing, and publishing | `|install ~bospur-davmyl-nocsyx-lassul %notes` | Experimental sync and publishing software. Back up important notes outside Urbit first. Confirm clearweb publishing intent before enabling it. |
| Notes Sync app | macOS desktop sync helper for `%notes` | Follow the `%notes` web UI instructions | Requires local file-system access and a ship URL/access code. Do not place credentials in chat or Git. |
| `%boox` | E-reader and library app for EPUB, PDF, MOBI, Markdown, plaintext, and HTML files | `|install ~matwet %boox` | Library uploads may include copyrighted or personal files. Start with test files and confirm S3/loom storage behavior. |
| `%last` | Audioscrobble-style broadcast/feed app integrated with `%boox` | `|install ~matwet %last` | Broadcasts activity-like tuples to `%pals`. Confirm visibility and privacy expectations before posting. |
| Hermes Agent Urbit adapter | Draft adapter connecting Nous Research's Hermes Agent to Urbit | <https://github.com/NousResearch/hermes-agent/pull/26300> | Draft PR, not a packaged release. Expect environment-specific work and ask before changing local agent configs. |
| Tlon agent UX experiments | Bot labels, thinking indicators, Tlonbot-adjacent UX, and bespoke Tlonner tools | Links in the human article | Mostly informational. Do not infer unreleased install instructions from tweets. |
| `%claw` | Urbit-native agent harness inspired by OpenClaw | `|install ~matwet %claw`; see `/blog/developer-preview-claw` | Requires an inference provider such as OpenRouter in current network distribution. Keep API keys local and use a test ship first. |
| `urbit-mcp` / `%mcp` | Groundwire's MCP interface for operating an Urbit ship from compatible agent clients | `curl -fsSL https://groundwire.io/install.sh \| bash`; `|install ~daplyd %mcp`; <https://github.com/gwbtc/urbit-mcp> | Powerful state-changing interface. Never expose real session cookies. Prefer a disposable ship for first use. |
| Agential Urbit | Essay by `~lagrev-nocfep` on agent-oriented Urbit design | <https://planet.sigilante.red/agential-urbit> | Reading/reference only. |
| Concurrent IO in Spider threads | Technical writeup by `~dozreg-toplud` responding to an UrWASM-related question | <https://dozreg-toplud.com/_~_/=bucket-data=/cx/public/blog-parallel-io/html> | Reading/reference only. |

## Installation checklist before taking actions

- Identify whether the user wants to explore apps (`%notes`, `%boox`, `%last`), agents (`%claw`, `%mcp`, Hermes), or only read linked writing.
- Confirm target ship class, HTTP port, and whether the ship is disposable.
- If the target is a moon or comet, prefer the confirmed May TMIU pill boot over manual individual installs.
- If the target is an existing planet, use manual `|install` commands or `%mcp` installs only after explicit user permission.
- Confirm the exact desk and publisher before each `|install`.
- For `%notes`, ask whether the user wants local sync, peer-to-peer sharing, clearweb publishing, or only local note editing.
- For `%boox`, ask the user to start with a small test library and clarify whether files go into S3-backed storage or the ship loom.
- For `%last`, confirm what will be broadcast and to whom before posting.
- For `%claw`, keep OpenRouter or other provider keys out of chat and repositories.
- For `%mcp`, ensure any `+code` or cookie is copied directly by the user into their local client configuration or secret store.
- If an install, sync, bridge, MCP command, or agent action fails, surface the exact error and stop rather than silently switching to an unreviewed workaround.
