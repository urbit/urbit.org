+++

title = "This Month in Urbit: June 2026"
date = "2026-06-26"
description = "June 2026 brings non-Hoon languages, Tlon's public launch, and the long-awaited %hawk499 interface builder."
summary = "This Month in Urbit for June 2026 covers %hawk499 from ~migrev-dolseg, Yamoon and the broader Languages on Nock discussion, Tlon Messenger public signups, and the new public Urbit agent skills snapshot for operating and developing on Urbit."
search_terms = [
    "this month in urbit",
    "june 2026 urbit",
    "%hawk499",
    "%hawk",
    "hawk499",
    "yamoon",
    "languages on nock",
    "non-hoon languages",
    "tlon messenger",
    "public signups",
    "urbit skills",
    "agent skills",
    "urbit mcp"
]

[extra]
ship = "~sarlev-sarsen"
tags = ["this-month-in-urbit", "ecosystem", "applications", "ai", "agents", "hawk499"]
+++

Welcome to This Month in Urbit, our series for sharing recent happenings from around the Urbit network. To fully participate, you will need to know how to run an Urbit ship. If you don't know how to do that yet, point your favorite AI agent at this page and it will help get you started. Or [check out the getting started documentation](https://docs.urbit.org/get-on-urbit) to do it the old school way.

This guide is written to be human-friendly, allowing you to follow along and learn something new. Embedded in this page are also instructions for your agent; share the link and your agent should help you through getting the enclosed items up and running. The AI landscape is fast-moving and variable, so we can't guarantee everything will work smoothly, but we try to test across various models and agent harnesses. If you or your agents ever get stuck, just give a shout in [The Urbit Foundation group on Tlon Messenger](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17) and we'll help you out.

## June Quickstart
To get started with our featured experiments for this month, try booting a moon off the June TMIU pill. If you don't have it already, get the runtime for your OS:
```
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

In the dojo of your planet, run `|moon` and you'll get a moon networking key. You can do this from the webterm on a Tlon-hosted planet. Then boot your moon with the June TMIU pill:
```
urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-june.pill --http-port 8899
```
(if you don't have moon keys, replace the moon args with `-c tmiu-june-comet` to just get started with a comet.)

## %hawk499
The biggest release this month is `%hawk499` from `~migrev-dolseg`. For those who have been tinkering with their urbits live on the network for the past few years, [`%hawk`](https://hawk.computer) has been a beloved tool in the toolbox, and `~migrev-dolseg` its beloved creator. From using it as a simple site builder to create a 'front door' for the clearweb (see `~rus`'s [urbitfederation.org](https://urbitfederation.org)), to a way to publish 'gists', and even build comprehensive [webapps like `~nordus-mocwyl`'s guitar course](https://urbit.org/blog/building-beyond-beginner-guitar), `%hawk` has proven itself as a powerful framework for bringing the capabilities of your urbit to life. Even the [hawk.computer](https://hawk.computer) site is written in, and served via, `%hawk`.

`%hawk499` is a step change in what it looks like to build interfaces into your urbit. In the words of `~migrev-dolseg`: 

> "The One Interface To Rule Them All"

This comes from his observation that there is unlikely to be a world where there is "One Filesystem To Rule Them All." And this seems to be a reasonable claim. Your average computer user doesn't even know what a filesystem is, let alone whether their data needs to go in a relational database, a file tree, or any other form factor. 

So with `%hawk499`, we see `~migrev-dolseg` leaning in to building a strong interface tool. Instead of the legacy model of storing everything as a `%manx`, with 499 se see a different strategy:

> "No user data is stored by the %hawk499 agent. But the hawk499 pages can still do stateful things by using other agents to store data."

It's not that 499 stores nothing, but rather it makes full use of Urbit's open nature to say, 'We'll do the interface in `%hawk499`, but put your data in the agents that are best suited for it. It is through this model that 499 gets to absorb and compose the data of other apps, and thus focus on delivering self-styled interfaces to users. 

In other changes from legacy `%hawk`, `%hawk499` offers noticeable performance improvements, as well as the ability to update data across the network. For an overview view, [check this out](https://willhanlen.com/~~/outbox/26/6/hawk-ui-demo/), or just install it yourself at:

```
|install ~dister-migrev-dolseg
```

*As a word of warning, this is an early release and not advised to be installed on a ship running a legacy version of `%hawk`, so test it on a moon or comet first if you currently run `%hawk` on your main urbit ship. Need help with `%hawk` or `%hawk499`? [Jump in `~migrev-dolseg`'s group](https://join.tlon.io/0v7.nikjh.4ei7s.8fol7.bfe0h.8ad5p).*

## Yamoon
First getting a mention in this month's ["Languages on Nock"](/blog/languages-on-nock) article, [Yamoon](https://github.com/the-man-with-a-golden-mind/yamoon/tree/master) slid into the scene out of nowhere. From the repo readme:

> "yamoon makes writing Hoon pleasant and efficient by hiding its complex rune-based syntax and specific atom molds behind familiar concepts. It provides a robust, type-checked pipeline for building Hoon libraries and Gall agents."

For people who have long resisted Urbit development due a Hoon-aversion, Yamoon can save you from runic syntax:
```
functions:
  twoNumbers:
    input:
      a: number
      b: number
    output: number
    return:
      (a + b)
```

Hardcore hooners might say, "Sure but look at what it compiles to; wouldn't that just be easier to write?"

```
|%
  ++  twoNumbers
    |=  [a=@ud b=@ud]
      (add a b)
--
```

But as we suggest in the "Languages on Nock" article, different tools work for different problems--and different minds. If you blocker was learned to write idiomatic Hoon, consider yourself unblocked, and go build! You can self-host the code, or use it [via a hosted version](https://yamoon-page.michmajchrzak.workers.dev/).

## Tlon public launch

In other Urbit ecosystem news, Tlon Messenger is now [open for public signups](https://x.com/tloncorporation/status/2067611600970768657?s=20)--no more waitlist! Go to [tlon.io](https://tlon.io/) today to get a hosted urbit, their native mobile app, and your very own Tlonbot. In contrast to something like Claude Tag in Slack, Urbit is the place where you can own both the messenger, and the agent. 

If you are already on the network, you can continue to invite your friends with your own invite codes so they are dropped right into your DMs or the group you invited them to.

## Urbit-skills alpha

As a last mention, we are experimenting with making some baseline `urbit-skills` available. Point your agents at urbit.org or this post and they should be able to find them. Please send any feedback or your usage experience to `~sarlev` and we will continue to improve them as effective patterns emerge.

---agent---

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
