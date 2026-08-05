---
title: "This Month in Urbit: July 2026"
source_kind: "blog"
canonical_url: "/blog/this-month-in-urbit-july-2026"
human_md_url: "/blog/this-month-in-urbit-july-2026.md"
agent_mode: "dedicated"
dependencies: []
related_pages:
  - "/blog.md"
  - "/blog/this-month-in-urbit-july-2026.md"
---

Human-oriented content: /blog/this-month-in-urbit-july-2026.md

# Agent companion: This Month in Urbit, July 2026

This companion is for AI agents helping a user reproduce or explore the July 2026 _This Month in Urbit_ items. The human-facing article is intentionally narrative; use this section as the operational checklist and source map. This article includes the July TMIU pill, the 408k Directed Messaging rollout, `%docs`, `%cliff`, Mondrian, `%caderno`, the self-contained `%graph-viz` app, Hawk 499, and new Tlon Messenger features.

## Start with the public Urbit skills

Use the public skills snapshot before improvising Urbit operations or userspace workflows:

- Skills index: `/.agents/skills/index.md`
- Running Urbit OS: `/.agents/skills/running-urbit-os/SKILL.md`
- Comet onboarding for agents: `/.agents/skills/running-urbit-os/references/comet-onboarding-for-agents.md`
- Userspace apps: `/.agents/skills/using-urbit-apps/SKILL.md`
- Userspace apps bundle: `/.agents/skills/bundles/userspace-apps.yaml`

## Safety profile

- Default recommendation: use a fresh moon, comet, or otherwise disposable test identity for the experiments in this post.
- Do not ask the user to expose, paste into chat, commit, or publish moon networking keys, real `+code` values, `urbauth-*` session cookies, Tlon credentials, private ship data, or private notebook contents.
- Never change a ship's update hash or install an experimental desk unless the user explicitly confirms the target ship and requested action.
- Enabling Directed Messaging with `&ahoy-set-hash` changes the ship's update state. Explain that change and obtain explicit permission before running it.
- The fixed Directed Messaging hash is specific to the July 2026 rollout. Check current official release guidance first, and do not apply the historical hash if a newer release has superseded it.
- Explain the runtime installer before running it and obtain permission before modifying the user's host system.
- Verify that the article-provided July pill URL is publicly retrievable before booting. If it is unavailable, surface the exact error and stop rather than substituting another pill.
- `%cliff` can edit Clay files and change publication settings. Confirm the target desk, path, and intended visibility before editing or publishing anything.
- `%docs`, `%caderno`, and Tlon Notebooks can publish content. Keep private or sensitive material out of test documents and confirm visibility before publishing.
- `%graph-viz` is self-contained and does not require `%obelisk`. Do not install `%obelisk` as part of the `%graph-viz` flow; only discuss or install it if the user separately requests it.
- This article covers Hawk 499. Do not apply instructions written specifically for Hawk 500 unless the source confirms they are compatible.
- If a boot, update, or install command fails, surface the exact error and stop. Do not silently switch to an unreviewed pill, publisher, or install path.

## July quickstart

1. Install the runtime if needed:

   ```
   curl -fsSL https://urbit.org/get-runtime.sh | sh
   ```

2. If the user has a planet, ask them to run `|moon` in that planet's dojo and keep the returned moon name and networking key local.
3. After confirming the local pier name and an unused HTTP port, boot the moon from the July TMIU pill:

   ```
   urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-july.pill --http-port 8899
   ```

4. If the user does not have moon keys, use the article's comet fallback with the same pill:

   ```
   urbit -c tmiu-july-comet -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-july.pill --http-port 8899
   ```

## Directed Messaging rollout

The article describes a two-phase rollout. The 408k release makes Directed Messaging available behind a manual update-hash change; 408k-1 is expected to enable it for all users.

1. Ask whether the user only wants to inspect their current `%base` hash or explicitly wants to enable Directed Messaging on the target ship.
2. To inspect the current `%base` hash, have the user run:

   ```
   +vats %base, =verb %.y
   ```

3. Before changing the hash, verify that the July 2026 rollout guidance still applies, explain that the command changes the ship's update state, and ask for explicit confirmation. If the guidance still applies, use the exact hash from the article even if the current `%base` hash differs:

   ```
   :hood &ahoy-set-hash 0v1p.bd1ud.hribk.6619t.70jni.n06f4.9il00.voegf.kh8i9.8se4n.124s8
   ```

4. Report the command output and any error verbatim. Do not guess a replacement hash or silently retry against another update source.

## Featured software reference

| Item | What it is | Install / link | Agent notes |
| --- | --- | --- | --- |
| Directed Messaging | 408k networking update using Named Data Networking ideas and Urbit's scry namespace | `%base` inspection and `&ahoy-set-hash` commands above | State-changing update operation. Confirm the target ship and explicit user intent before changing the hash. |
| `%docs` | Self-hosted app documentation browser and publisher | `|install ~pocwet %docs`; <https://github.com/tinnus-napbus/docs-app> | Documentation placed in a desk's `/doc` directory can be published through Eyre. Confirm public visibility first. |
| `%cliff` | Clay file explorer with editing and publication controls | `|install ~magbel %cliff` | Can edit files and alter whitelists or blacklists. Prefer a disposable ship and test paths. |
| Mondrian | Noun visualization project from `~lagrev-nocfep` | <https://github.com/sigilante/mondrian> | Repository/reference project; do not invent a network install command. |
| `%caderno` | Hoon notebook app for publishing, browsing, sharing, and forking notebooks | `|install ~magbel %caderno` | Use test notebooks first and confirm intended visibility before publishing. |
| `%graph-viz` | Self-contained Gall app that renders Graphviz DOT diagrams as SVG on-ship | `|install ~dister-nomryg-nilref %graph-viz`; <https://github.com/jackfoxy/graph-viz> | Does not depend on `%obelisk`; install only `%graph-viz` for this article's graph visualization flow. |
| `%hawk` at Kelvin 499 | Composable interface tooling for interacting with agents on a ship | `|install ~dister-migrev-dolseg %hawk`; <https://willhanlen.com/hawk499/crash-course#module-0> | Confirm instructions are for Hawk 499; public references for other Kelvin versions may not be compatible. |
| Tlon Notebooks and Context Lens | Markdown notebook channels and detailed Tlonbot run inspection | <https://tlon.io>; <https://x.com/tloncorporation/status/2075224895013736784?s=20> | Informational features. Do not automate account access or inspect private notebooks and run logs without permission. |

## Minimal exploration flow

1. Ask whether the user wants to boot the July test ship, inspect or enable Directed Messaging, install a featured Gall app, explore a linked repository, or review the Tlon features.
2. For the full set of Gall apps, verify the article-provided July TMIU pill is publicly retrievable, then prefer it on a disposable moon or comet.
3. For an existing ship, confirm the exact target, publisher, desk, and expected state or publication change before each command.
4. Install `%graph-viz` by itself; do not install `%obelisk` as a dependency.
5. For `%cliff`, begin with read-only exploration and ask separately before editing files or changing publication controls.
6. For `%docs` and `%caderno`, use non-sensitive test content and confirm clearweb or peer visibility before publishing.
7. For `%hawk`, use the linked Hawk 499 crash course and version-matched documentation before improvising interface endpoints.
8. For Tlon Notebooks or Context Lens, explain the feature and let the user perform private account actions; do not request credentials or private run logs.
