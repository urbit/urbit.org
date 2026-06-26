---
title: "This Month in Urbit: June 2026"
source_kind: "blog"
canonical_url: "/blog/this-month-in-urbit-june-2026"
human_md_url: "/blog/this-month-in-urbit-june-2026.md"
agent_mode: "dedicated"
dependencies:
  - "/blog/building-beyond-beginner-guitar.md"
  - "/blog/languages-on-nock.md"
related_pages:
  - "/blog.md"
  - "/blog/building-beyond-beginner-guitar.md"
  - "/blog/languages-on-nock.md"
  - "/blog/this-month-in-urbit-june-2026.md"
---

Human-oriented content: /blog/this-month-in-urbit-june-2026.md

# Agent companion: This Month in Urbit, June 2026

This companion is for AI agents helping a user reproduce or explore the June 2026 _This Month in Urbit_ items. The human-facing article is intentionally narrative; use this section as the operational checklist and source map. This article now includes a June TMIU pill quickstart, `%hawk499`, Yamoon, Tlon Messenger public signups, and the public `urbit-skills` alpha.

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

For the June Quickstart, prefer the article's pill flow when the user wants a ready-to-explore test ship:

1. Install the runtime if needed:
   ```
   curl -fsSL https://urbit.org/get-runtime.sh | sh
   ```
2. If the user has a planet, ask them to run `|moon` in that planet's dojo and keep the returned moon key local.
3. Boot the moon from the June TMIU pill:
   ```
   urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-june.pill --http-port 8899
   ```
4. If they do not have moon keys, use the article's comet fallback instead of asking for private ship credentials.

Do not ask the user to paste moon keys, planet keys, `+code` values, or session cookies into chat. Treat the pill URL as public, but treat all ship credentials and browser sessions as private.

For this article in particular, use the Hawk499 references when the user asks about `%hawk499` endpoint authoring, lesson installation, Datastar/Feather patterns, or the sidecar HTTP CLI:

- Hawk499 overview: `/.agents/skills/using-urbit-apps/references/hawk499/README.md`
- Hawk499 concepts: `/.agents/skills/using-urbit-apps/references/hawk499/docs/concepts.md`
- Hawk499 HTTP CLI: `/.agents/skills/using-urbit-apps/references/hawk499/docs/http-cli.md`
- Installing Hawk499 lessons: `/.agents/skills/using-urbit-apps/references/hawk499/docs/installing-lessons.md`
- Hawk499 learning path: `/.agents/skills/using-urbit-apps/references/hawk499/docs/learning-path.md`
- Hawk499 lesson coach: `/.agents/skills/using-urbit-apps/references/hawk499/docs/lesson-coach.md`

Keep `%hawk` and `%hawk499` distinct. `%hawk` is covered at `/.agents/skills/using-urbit-apps/references/hawk/README.md`; `%hawk499` has its own reference tree listed above.

## Safety profile

- Default recommendation: use a fresh moon, comet, or otherwise disposable test identity before installing `%hawk499`, especially if the user's main ship already runs legacy `%hawk`.
- Do not ask the user to expose, paste into chat, commit, or publish real `+code` values, `urbauth-*` session cookies, Tlon credentials, or private ship data.
- Do not ask the user to paste moon networking keys. Tell them where to place keys locally in their own terminal command, using placeholders.
- Do not install `%hawk499`, run `%mcp` tools, or write runtime endpoints unless the user explicitly confirms the target ship and the requested operation.
- If using the Hawk499 HTTP CLI, keep cookie jars outside repositories and do not print cookie values.
- If a command fails, surface the exact error and stop. Do not silently switch to an unreviewed install path.

## Featured reference table

| Item | What it is | Link / command | Agent notes |
| --- | --- | --- | --- |
| `%hawk499` | Runtime interface builder from `~migrev-dolseg`, distinct from legacy `%hawk` | `|install ~dister-migrev-dolseg`; demo: <https://willhanlen.com/~~/outbox/26/6/hawk-ui-demo/> | Use a disposable ship first. Load the Hawk499 skill references before authoring endpoints or using the HTTP CLI. |
| `%hawk` | Existing programmable page/site builder | <https://hawk.computer>; skill ref: `/.agents/skills/using-urbit-apps/references/hawk/README.md` | Do not conflate `%hawk` and `%hawk499`. For human help with either, point users to `~migrev-dolseg`'s group: <https://join.tlon.io/0v7.nikjh.4ei7s.8fol7.bfe0h.8ad5p>. |
| June TMIU pill | Ready-to-boot test environment for this month's experiments | `https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-june.pill` | Use a moon if available; otherwise follow the article's comet fallback. Never request private keys in chat. |
| Yamoon | Non-Hoon language that compiles to Hoon | <https://github.com/the-man-with-a-golden-mind/yamoon/tree/master>; hosted version: <https://yamoon-page.michmajchrzak.workers.dev/>; related article: `/blog/languages-on-nock` | Reading/development reference. Use `urbit-development` for Hoon/Gall context. Do not claim production readiness beyond the linked sources. |
| Tlon Messenger public signups | Hosted Urbit and native messenger access without waitlist | <https://tlon.io/>; announcement: <https://x.com/tloncorporation/status/2067611600970768657?s=20> | Informational. Do not infer private Tlon credentials or signup details. |
| `urbit-skills` alpha | Public baseline instructions for agents working with Urbit | `/.agents/skills/index.md`; feedback to `~sarlev` | Use the public snapshot as guidance. Treat it as alpha and surface unclear or failing steps rather than improvising silently. |

## Minimal exploration flow

1. Ask whether the user wants to boot the June TMIU pill, install `%hawk499`, write a `%hawk499` endpoint, try Yamoon, sign up for Tlon Messenger, or inspect the `urbit-skills` alpha.
2. For the June pill, load `/.agents/skills/running-urbit-os/SKILL.md`; prefer a moon from the user's own planet when available, and use the article's comet fallback when not.
3. For `%hawk499`, load `/.agents/skills/using-urbit-apps/references/hawk499/README.md` before giving commands.
4. If the user wants lesson installation, use the Hawk499 installing-lessons reference and keep `SHIP_URL`, `COOKIE_JAR`, and `HAWK499_CODE` local to the user's machine.
5. If the user wants help from humans, provide the Urbit Foundation group from the intro for general help or `~migrev-dolseg`'s group for `%hawk`/`%hawk499` help.
6. If the user wants to understand the distinction between `%hawk` and `%hawk499`, load both app references and summarize the difference before recommending an install path.
7. For Yamoon, treat the repository, hosted version, and `/blog/languages-on-nock` as source material; do not claim production readiness beyond what those sources say.
8. For Tlon Messenger, direct users to <https://tlon.io/> and the announcement link; do not automate account signup.
9. For `urbit-skills`, direct agents to `/.agents/skills/index.md` and remind them the snapshot is alpha feedback material.
