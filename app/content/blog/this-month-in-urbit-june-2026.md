+++

title = "This Month in Urbit: June 2026"
date = "2026-06-26"
description = "June 2026 brings non-Hoon languages, Nock learning tools, Tlon's public launch, and the Urbit skills alpha."
summary = "This Month in Urbit for June 2026 covers Yamoon and the broader Languages on Nock discussion, Lua-Hoon, Nockasm, Tlon Messenger public signups, and the new public Urbit agent skills snapshot for operating and developing on Urbit."
search_terms = [
    "this month in urbit",
    "june 2026 urbit",
    "yamoon",
    "lua-hoon",
    "lua hoon",
    "nockasm",
    "nock assembly",
    "nock isa",
    "languages on nock",
    "non-hoon languages",
    "tlon messenger",
    "public signups",
    "urbit skills",
    "agent skills"
]

[extra]
ship = "~sarlev-sarsen"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+June/Blog_TMIU+June_Social.jpg"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+June/Blog_TMIU+June_Social16_9.jpg"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+June/Blog_TMIU+June_Banner.jpg"
tags = ["this-month-in-urbit", "ecosystem", "applications", "ai", "agents", "nock"]
+++

![June 2026 This Month in Urbit Concept Art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+June/Blog_TMIU+June_Hero.jpg)

Welcome to This Month in Urbit, our series for sharing recent happenings from around the Urbit network. To fully participate, you will need to know how to run an Urbit ship. If you don't know how to do that yet, point your favorite AI agent at this page and it will help get you started. Or [check out the getting started documentation](https://docs.urbit.org/get-on-urbit) to do it the old school way.

This guide is written to be human-friendly, allowing you to follow along and learn something new. Embedded in this page are also instructions for your agent; share the link and your agent should help you through getting the enclosed items up and running. The AI landscape is fast-moving and variable, so we can't guarantee everything will work smoothly, but we try to test across various models and agent harnesses. If you or your agents ever get stuck, just give a shout in [The Urbit Foundation group on Tlon Messenger](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17) and we'll help you out.

## June Quickstart
This month, there are no Gall applications being distributed acorss the network, so we are chosing to not include a custom pill in the quickstart guide. That said, having an up-to-date version of the runtime, and a fresh ship to experiment with will still be helpful. To get the runtime:
```
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

In the dojo of your planet, run `|moon` and you'll get a moon networking key. You can do this from the webterm on a Tlon-hosted planet. Then boot your moon with the default bootstrap pill:
```
urbit -w <moon-name> -G <moon-key> --http-port 8899
```
(if you don't have moon keys, replace the moon args with `-c tmiu-june-comet` to just get started with a comet.)


## Yamoon

![Yamoon concept art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+June/TIMU+June_yamoon.jpg)

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

You might ask, "Why are you showing this to me again, though?" And really it's as a bit of an empahsis of how much is happened around Nock-based computing these days. Because since that article was released, two other Nock-related projects were released!

## Lua-Hoon

![Lua-Hoon concept art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+June/TIMU+June_LuaHoon.jpg)

Popular as a scripting language in a wide array programs, Lua typically runs in an embedded interpreter in some host environment. Famously it is used in programs like Minecraft and Neovim. Given it's popularity and approachability, and in a spirit similar to his Forth-Nock project, `~mopfel-winrux` wrote `lua-hoon` so that it would be possible to run Lua on a Nock substrate.

It runs as a Gall app, but we recommend installing it directly from [the `lua-hoon` GitHub Repo](https://github.com/mopfel-winrux/lua-hoon), as it is not available over the network, and may take some tinkering with your runtime to fully experience.

## Nock Assembly

![Nock macro concept art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+June/TIMU+June_nock+macro.jpg)

Ever the educator, `~lagrev-nocfep` put together ["Nock Assembly"](https://github.com/sigilante/nockasm), or `nockasm`. As he describes it:

> "Nock Assembly is a thin macro over [Nock ISA](https://nock.is) designed to make the language more legible for pedagogical purposes."

Like with Hoon, Nock can be somewhat difficult for a newcomer. While intended to be ruthlessly simple as a Instruction Set Architecture (ISA) or a 'definition of a virtual machine that first on a t-shirt', it still generally requires a mental translation later between nouns and opcodes, to the mental model of the learner. To help got past some of these early hurdles, Nock Assembly provides lexical, named opcodes. Instead of the raw Nock for an increment:
```
[4 0 2]
```
Students get a more immediately legible:
```
(%inc .x)
```

Experiment with it, perhaps while you go through the ["Nock for Everyday Coders"](https://urbitsystems.tech/article/v02-i01/nock-for-everyday-coders) article from `~timluc-miptev`, and soon enough you'll get the hang of Nock and prefer:
```
[8 [0 2] 6 [5 [1 1] 0 2] [4 0 7] 6 [5 [1 2] 0 2] [0 7] 1 0]
```
for it's raw nature over the more classically legible:
```
:subject {.tag .data}
#match .tag {
  1 => (%inc .data)
  2 => .data
  _ => 0
}
```

## Tlon public launch

![Tlon public launch concept art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+June/TIMU+June_Tlon+Open.jpg)

In other Urbit ecosystem news, Tlon Messenger is now [open for public signups](https://x.com/tloncorporation/status/2067611600970768657?s=20)--no more waitlist! Go to [tlon.io](https://tlon.io/) today to get a hosted urbit, their native mobile app, and your very own Tlonbot. In contrast to something like Claude Tag in Slack, Urbit is the place where you can own both the messenger, and the agent. 

If you are already on the network, you can continue to invite your friends with your own invite codes so they are dropped right into your DMs or the group you invited them to.

## Urbit-skills alpha
As a last mention, we are experimenting with making some baseline `urbit-skills` available. Point your agents at urbit.org or this post and they should be able to find them. Please send any feedback or your usage experience to `~sarlev` and we will continue to improve them as effective patterns emerge.

---agent---

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
