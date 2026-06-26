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

This companion is for AI agents helping a user reproduce or explore the June 2026 _This Month in Urbit_ items. The human-facing article is intentionally narrative; use this section as the operational checklist and source map.

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
- Do not install `%hawk499`, run `%mcp` tools, or write runtime endpoints unless the user explicitly confirms the target ship and the requested operation.
- If using the Hawk499 HTTP CLI, keep cookie jars outside repositories and do not print cookie values.
- If a command fails, surface the exact error and stop. Do not silently switch to an unreviewed install path.

## Featured reference table

| Item | What it is | Link / command | Agent notes |
| --- | --- | --- | --- |
| `%hawk499` | Runtime interface builder from `~migrev-dolseg`, distinct from legacy `%hawk` | `|install ~dister-migrev-dolseg`; demo: <https://willhanlen.com/~~/outbox/26/6/hawk-ui-demo/> | Use a disposable ship first. Load the Hawk499 skill references before authoring endpoints or using the HTTP CLI. |
| `%hawk` | Existing programmable page/site builder | <https://hawk.computer>; skill ref: `/.agents/skills/using-urbit-apps/references/hawk/README.md` | Do not conflate `%hawk` and `%hawk499`. |
| Yamoon | Non-Hoon language that compiles to Hoon | <https://github.com/the-man-with-a-golden-mind/yamoon/tree/master>; related article: `/blog/languages-on-nock` | Reading/development reference. Use `urbit-development` for Hoon/Gall context. |
| Tlon Messenger public signups | Hosted Urbit and native messenger access without waitlist | <https://tlon.io/>; announcement: <https://x.com/tloncorporation/status/2067611600970768657?s=20> | Informational. Do not infer private Tlon credentials or signup details. |

## Minimal exploration flow

1. Ask whether the user wants to read, install `%hawk499`, write a `%hawk499` endpoint, try Yamoon, or sign up for Tlon Messenger.
2. For general Urbit booting, load `/.agents/skills/running-urbit-os/SKILL.md` and prefer a disposable moon or comet.
3. For `%hawk499`, load `/.agents/skills/using-urbit-apps/references/hawk499/README.md` before giving commands.
4. If the user wants lesson installation, use the Hawk499 installing-lessons reference and keep `SHIP_URL`, `COOKIE_JAR`, and `HAWK499_CODE` local to the user's machine.
5. If the user wants to understand the distinction between `%hawk` and `%hawk499`, load both app references and summarize the difference before recommending an install path.
6. For Yamoon, treat the repository and `/blog/languages-on-nock` as source material; do not claim production readiness beyond what those sources say.
7. For Tlon Messenger, direct users to <https://tlon.io/> and the announcement link; do not automate account signup.
