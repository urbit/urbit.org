---
title: "This Month in Urbit: June 2026"
source_kind: "blog"
canonical_url: "/blog/this-month-in-urbit-june-2026"
human_md_url: "/blog/this-month-in-urbit-june-2026.md"
agent_mode: "dedicated"
dependencies:
  - "/blog/languages-on-nock.md"
related_pages:
  - "/blog.md"
  - "/blog/languages-on-nock.md"
  - "/blog/this-month-in-urbit-june-2026.md"
---

Human-oriented content: /blog/this-month-in-urbit-june-2026.md

# Agent companion: This Month in Urbit, June 2026

This companion is for AI agents helping a user reproduce or explore the June 2026 _This Month in Urbit_ items. The human-facing article is intentionally narrative; use this section as the operational checklist and source map. This article includes a default runtime quickstart, Yamoon, Lua-Hoon, Nockasm, Tlon Messenger public signups, and the public `urbit-skills` alpha.

## Start with the public Urbit skills

Use the public skills snapshot before improvising Urbit operations or development workflows:

- Skills index: `/.agents/skills/index.md`
- Urbit core router: `/.agents/skills/urbit-core/SKILL.md`
- Running Urbit OS: `/.agents/skills/running-urbit-os/SKILL.md`
- Comet onboarding for agents: `/.agents/skills/running-urbit-os/references/comet-onboarding-for-agents.md`
- Urbit development: `/.agents/skills/urbit-development/SKILL.md`
- Kelvin migrations: `/.agents/skills/urbit-development/references/kelvin-migrations/README.md`
- Userspace apps: `/.agents/skills/using-urbit-apps/SKILL.md`
- Userspace apps bundle: `/.agents/skills/bundles/userspace-apps.yaml`

For the June Quickstart, do not look for a custom June pill. The article explicitly says there are no Gall applications being distributed across the network this month, so the default bootstrap flow is enough:

1. Install the runtime if needed:
   ```
   curl -fsSL https://urbit.org/get-runtime.sh | sh
   ```
2. If the user has a planet, ask them to run `|moon` in that planet's dojo and keep the returned moon key local.
3. Boot the moon with the default bootstrap pill:
   ```
   urbit -w <moon-name> -G <moon-key> --http-port 8899
   ```
4. If they do not have moon keys, use the article's comet fallback instead of asking for private ship credentials:
   ```
   urbit -c tmiu-june-comet --http-port 8899
   ```

Do not ask the user to paste moon keys, planet keys, `+code` values, or session cookies into chat. Treat all ship credentials and browser sessions as private.

## Safety profile

- Do not ask the user to expose, paste into chat, commit, or publish real `+code` values, `urbauth-*` session cookies, Tlon credentials, or private ship data.
- Do not ask the user to paste moon networking keys. Tell them where to place keys locally in their own terminal command, using placeholders.
- Do not install experimental Gall apps or write runtime endpoints unless the user explicitly confirms the target ship and requested operation.
- Lua-Hoon is described as not available over the network in this article; do not invent a `|install` source for it.
- Nockasm is a learning/tooling reference; do not imply it is a production Urbit app unless the linked repository says so.
- If a command fails, surface the exact error and stop. Do not silently switch to an unreviewed install path.

## Featured reference table

| Item | What it is | Link / command | Agent notes |
| --- | --- | --- | --- |
| Yamoon | Non-Hoon language that compiles to Hoon | <https://github.com/the-man-with-a-golden-mind/yamoon/tree/master>; hosted version: <https://yamoon-page.michmajchrzak.workers.dev/>; related article: `/blog/languages-on-nock` | Reading/development reference. Use `urbit-development` for Hoon/Gall context. Do not claim production readiness beyond the linked sources. |
| Lua-Hoon | Lua on a Nock substrate from `~mopfel-winrux` | <https://github.com/mopfel-winrux/lua-hoon> | Article says to install from GitHub, not over the network. Warn users it may require runtime tinkering. |
| Nockasm | Nock Assembly, a thin macro over Nock ISA for pedagogy from `~lagrev-nocfep` | <https://github.com/sigilante/nockasm>; Nock ISA: <https://nock.is>; companion article: <https://urbitsystems.tech/article/v02-i01/nock-for-everyday-coders> | Treat as a learning aid for Nock, not a Gall app quickstart. |
| Tlon Messenger public signups | Hosted Urbit and native messenger access without waitlist | <https://tlon.io/>; announcement: <https://x.com/tloncorporation/status/2067611600970768657?s=20> | Informational. Do not infer private Tlon credentials or signup details. |
| `urbit-skills` alpha | Public baseline instructions for agents working with Urbit | `/.agents/skills/index.md`; feedback to `~sarlev` | Use the public snapshot as guidance. Treat it as alpha and surface unclear or failing steps rather than improvising silently. |

## Minimal exploration flow

1. Ask whether the user wants to boot a fresh ship, try Yamoon, inspect Lua-Hoon, learn Nock with Nockasm, sign up for Tlon Messenger, or inspect the `urbit-skills` alpha.
2. For booting a fresh ship, load `/.agents/skills/running-urbit-os/SKILL.md`; prefer a moon from the user's own planet when available, and use `urbit -c tmiu-june-comet --http-port 8899` when not.
3. For Yamoon, treat the repository, hosted version, and `/blog/languages-on-nock` as source material; do not claim production readiness beyond what those sources say.
4. For Lua-Hoon, send users to <https://github.com/mopfel-winrux/lua-hoon>; do not provide a network install command unless the repository documents one.
5. For Nockasm, send users to <https://github.com/sigilante/nockasm>, <https://nock.is>, and <https://urbitsystems.tech/article/v02-i01/nock-for-everyday-coders>; frame it as pedagogical Nock tooling.
6. For Tlon Messenger, direct users to <https://tlon.io/> and the announcement link; do not automate account signup.
7. For `urbit-skills`, direct agents to `/.agents/skills/index.md` and remind them the snapshot is alpha feedback material.
