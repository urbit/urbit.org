---
title: "This Month in Urbit: August 2026"
source_kind: "blog"
canonical_url: "/blog/this-month-in-urbit-august-2026"
human_md_url: "/blog/this-month-in-urbit-august-2026.md"
agent_mode: "dedicated"
dependencies:
  - "/blog/obelisk-beta-release.md"
  - "/blog/developer-preview-vere64.md"
  - "/blog/contributor-spotlight-dozreg-toplud.md"
  - "/blog/gall-2026.md"
  - "/blog/building-beyond-beginner-guitar.md"
related_pages:
  - "/blog.md"
  - "/blog/obelisk-beta-release.md"
  - "/blog/developer-preview-vere64.md"
  - "/blog/contributor-spotlight-dozreg-toplud.md"
  - "/blog/gall-2026.md"
  - "/blog/building-beyond-beginner-guitar.md"
  - "/blog/this-month-in-urbit-august-2026.md"
---

Human-oriented content: /blog/this-month-in-urbit-august-2026.md

# Agent companion: This Month in Urbit, August 2026

This companion is for AI agents helping a user reproduce or explore the August 2026 _This Month in Urbit_ items. The human-facing article is intentionally narrative; use this section as the operational checklist and source map. This article includes the August TMIU pill, `%urgit`, `%atpro`, `%matpro`, `%noltbook`, `%grubbery`, and two Beyond Beginner Guitar implementation approaches: Hawk with Obelisk, or Grubbery.

## Start with the public Urbit skills

Use the public skills snapshot before improvising Urbit operations or userspace workflows:

- Skills index: `/.agents/skills/index.md`
- Running Urbit OS: `/.agents/skills/running-urbit-os/SKILL.md`
- Comet onboarding for agents: `/.agents/skills/running-urbit-os/references/comet-onboarding-for-agents.md`
- Userspace apps: `/.agents/skills/using-urbit-apps/SKILL.md`
- Userspace apps bundle: `/.agents/skills/bundles/userspace-apps.yaml`
- Urbit MCP reference: `/.agents/skills/using-urbit-apps/references/urbit-mcp/README.md`
- Hawk reference: `/.agents/skills/using-urbit-apps/references/hawk/README.md`
- Obelisk reference: `/.agents/skills/using-urbit-apps/references/obelisk/README.md`

## Safety profile

- Default recommendation: use a fresh moon, comet, or otherwise disposable test identity for the experiments in this post.
- Do not ask the user to expose, paste into chat, commit, or publish moon networking keys, real `+code` values, `urbauth-*` session cookies, OAuth tokens, Matrix credentials, repository secrets, wallet keys, or private ship data.
- Explain the runtime installer before running it and obtain permission before modifying the user's host system.
- Verify that the article-provided August pill URL is publicly retrievable before booting. If it is unavailable, surface the exact error and stop rather than substituting another pill.
- Never install an experimental desk unless the user explicitly confirms the target ship, publisher, and desk.
- `%urgit` can store and share code. Inspect repository visibility before importing anything, and do not publish private code, credentials, configuration, or commit history.
- Let the user complete `%atpro` OAuth authorization in their own browser. Do not ask for, log, or reuse authorization codes, access tokens, refresh tokens, or account credentials. Confirm before posting, following, or taking another externally visible action.
- Treat Matrix access tokens, login credentials, room contents, signing material, and federation-relay configuration as private. Do not join rooms, send messages, enable federation, or alter federation settings without explicit confirmation.
- `%noltbook` supports app sharing and `$NOCK` payments. Treat received apps as untrusted code. Never initiate or approve a payment without separately confirming the asset, amount, recipient, network, and transaction with the user.
- `%grubbery` is experimental and includes an MCP interface capable of invoking tools and changing state. Inspect exposed capabilities first, use non-sensitive test data, and confirm each state-changing or externally visible action.
- The Beyond Beginner Guitar section is informational. Do not purchase the course, submit Stripe details, connect a wallet, or grant group access on the user's behalf without an explicit request and confirmation.
- If a boot, install, login, peer connection, payment, or MCP action fails, surface the exact error and stop. Do not silently switch to an unreviewed pill, publisher, desk, identity, relay, payment route, or tool.

## August quickstart

1. Install the runtime if needed:

   ```
   curl -fsSL https://urbit.org/get-runtime.sh | sh
   ```

2. If the user has a planet, ask them to run `|moon` in that planet's dojo. Tell them not to paste its output into chat; they must substitute the returned moon name and networking key locally in their own terminal.
3. Verify that the August pill URL is publicly retrievable. After confirming the local pier name and an unused HTTP port, boot the moon:

   ```
   urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-august.pill --http-port 8899
   ```

4. If the user does not have moon keys, use the article's comet fallback with the same pill:

   ```
   urbit -c tmiu-august-comet -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-august.pill --http-port 8899
   ```

5. The article says this pill includes `%mcp`, `%obelisk`, `%pals`, and `%hawk` in addition to the month's featured applications. Verify the running ship's installed desks instead of reinstalling or guessing publishers.

## Featured software reference

| Item | What it is | Install / link | Agent notes |
| --- | --- | --- | --- |
| `%urgit` | Git repository storage and peer sharing on Urbit | `|install ~matwet %urgit` | Confirm the target ship and repository visibility. Keep secrets and private history out of shared repositories. |
| `%atpro` | AT Protocol client for interacting with services such as Bluesky from an urbit | `|install ~matwet %atpro` | OAuth is a user-controlled browser action. Never request or expose credentials or tokens. |
| `%matpro` | Matrix client with support for an Ames federation relay | `|install ~matwet %matpro` | Treat rooms, credentials, tokens, signing material, and relay configuration as private. Ask before changing federation settings. |
| `%noltbook` | Messaging, voice and video calls, app sharing, and `$NOCK` payments | `|install ~nolset %noltbook` | Treat shared apps as untrusted and require explicit, transaction-specific confirmation for payments. |
| `%grubbery` | Experimental userspace model with Grub apps, Git storage, an example calendar, and embedded MCP | `|install ~lasped-monrys-niblyx-malnus %grubbery`; <https://github.com/gwbtc/grubbery> | Use a disposable ship and test data. Inspect MCP capabilities before allowing tools or state changes. |
| Beyond Beginner Guitar | Course implementation work using Hawk with Obelisk, plus an alternative approach using Grubbery | `/blog/building-beyond-beginner-guitar`; <https://guitar.box>; <https://www.youtube.com/watch?v=RAHmOStpFoo0> | Informational unless the user explicitly requests an account, purchase, or implementation workflow. |

## Minimal exploration flow

1. Ask whether the user wants to boot the August test ship, install one featured app on an existing ship, inspect a linked repository, or review the guitar-course implementation.
2. For the complete application set, verify the article-provided August TMIU pill and prefer it on a disposable moon or comet.
3. For an existing ship, confirm the exact target ship, publisher, desk, and expected state or visibility change before each install or action.
4. For `%urgit`, begin with a new non-sensitive test repository and confirm its visibility before connecting to a peer.
5. For `%atpro` and `%matpro`, let the user perform authentication and keep all credentials local. Start with read-only browsing when the app supports it, and confirm before posting, following, joining a room, or sending a message.
6. For `%noltbook`, begin with non-sensitive messages. Do not open or install shared apps, enable camera or microphone access, or prepare a payment without separate confirmation.
7. For `%grubbery`, review the linked repository and the public MCP reference first. Inspect MCP tools before invocation and use an isolated test ship.
8. For Beyond Beginner Guitar, use the linked article, site, and video as sources. Do not infer unpublished implementation details or perform account, payment, or access-control actions.
