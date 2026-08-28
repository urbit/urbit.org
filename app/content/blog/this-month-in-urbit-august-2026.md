+++

title = "This Month in Urbit: August 2026"
date = "2026-08-28"
description = "August 2026 brings Git, AT Protocol and Matrix clients, Noltbook, Grubbery experiments, and a Hawk-powered guitar course."
summary = "This Month in Urbit for August 2026 covers %urgit, %atpro, %matpro, %noltbook, %grubbery, and two approaches to the Beyond Beginner Guitar overhaul using Hawk with Obelisk or Grubbery."
search_terms = [
    "this month in urbit",
    "august 2026 urbit",
    "%urgit",
    "git on urbit",
    "%atpro",
    "at protocol",
    "bluesky on urbit",
    "%matpro",
    "matrix on urbit",
    "%noltbook",
    "%grubbery",
    "subject knowledge analysis",
    "hawk 499",
    "beyond beginner guitar"
]

[extra]
ship = "~sarlev-sarsen"
# TODO: Replace the placeholder images before publication.
image = "https://urbit.org/images/urbit-dither-placeholder.png"
imageCard = "https://urbit.org/images/urbit-dither-placeholder.png"
tags = ["this-month-in-urbit", "ecosystem", "applications", "protocols", "agents", "userspace"]
+++

![August 2026 This Month in Urbit artwork placeholder](/images/urbit-dither-placeholder.png)

Welcome to This Month in Urbit, our series for sharing recent happenings from around the Urbit network. To fully participate, you will need to know how to run an Urbit ship. If you don't know how to do that yet, point your favorite AI agent at this page and it will help get you started. Or [check out the getting started documentation](https://docs.urbit.org/get-on-urbit) to do it the old-school way.

This guide is written to be human-friendly, allowing you to follow along and learn something new. Embedded in this page are also instructions for your agent; share the link and your agent should help you through getting the enclosed items up and running. The AI landscape is fast-moving and variable, so we can't guarantee everything will work smoothly, but we try to test across various models and agent harnesses. If you or your agents ever get stuck, just give a shout in [The Urbit Foundation group on Tlon Messenger](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17) and we'll help you out.

## August Quickstart

This month, there is a variety of Gall applications to play with. As always, you can get the latest runtime by running:

```
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

If you want to boot a fresh ship with the August TMIU pill, we recommend using a moon. To get a moon networking key, just run `|moon` in your planet's dojo. You can do this from the webterm on a Tlon-hosted planet. Then boot your moon with the August TMIU pill:

```
urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-august.pill --http-port 8899
```

(If you don't have moon keys, replace the moon arguments with `-c tmiu-august-comet` to get started with a comet.)

As usual, the pill also includes `%mcp` from [The Groundwire Foundation](https://groundwire.io), [`%obelisk` from `~nomryg-nilref`](/blog/obelisk-beta-release), `%pals` from `~palfun-foslup`, and `%hawk` from `~migrev-dolseg`.

## Earth protocols find their way to Mars

Urbit may be a Martian computing stack, but that doesn't mean we never want to communicate with Earth. This month, `~sitful-hatred` continues his campaign to enable more classic computing use cases on Urbit—this time tackling code storage and sharing, federated social media, and secure decentralized communications. If your friends aren't yet on Urbit but they like Git, the AT Protocol, or Matrix, you can still connect and collaborate.

### Git on Urbit

Urbit's Clay filesystem has its own Urbit-native revision control system. But bootstrapping the entire developer landscape on a novel form of revision control isn't the only possible way to store and distribute code from your urbit. Sometimes something familiar is useful—particularly in an era when people are increasingly frustrated with, and suspicious of, GitHub as the sole home for their Git repositories. When you just want a safe place to stash your code and share it with friends, install `%urgit`, available from `~matwet`:

```
|install ~matwet %urgit
```

Once you have it installed, try adding `~matwet` as a peer. You will be able to browse the code repositories for the protocols he has shipped this month.

### Decentralized social protocols

Running your own personal server—and having all your friends do the same—is something like the platonic ideal of decentralized networked computing. In such a world, social protocols are decentralized by default. In some sense, this is the point of Urbit.

But as with software developers and their penchant for Git, maybe your friends aren't quite ready for that. More broadly than friends, maybe there are legacy-internet personalities you want to follow. `%atpro` lets you do this from _inside your urbit_. Install it on your ship:

```
|install ~matwet %atpro
```

You can then sign in to your Bluesky account—or another AT Protocol-compatible service—via OAuth and interact with your favorite posters and followers directly from your urbit.

### A chat app, but this time it's different, we promise

We know Urbit has a reputation as being "a chat app." But `~sitful-hatred` is helping us beat the allegations by showing that Urbit is a platform for implementing self-hosted, peer-to-peer protocols. In this case, yes, by implementing another chat app that runs on your urbit. But `%matpro` helps make the point that your urbit is a Turing-complete machine on top of which Earth-side decentralized messaging protocols can be implemented. If you have friends using Matrix, install `%matpro` and use it to connect with them:

```
|install ~matwet %matpro
```

One particularly neat feature is the ability to set up an Ames federation relay and send signed Matrix transactions directly between Urbit ships. That's Ames as an overlay network at work, helping us slowly eat all of networked computing—one byte at a time.

## Chat app advocacy

Not everyone is against the idea of a Cambrian explosion of chat apps. `~disden-talhes`, one of Urbit's greatest out-of-band thinkers, is a strong advocate for ever more chat apps on Urbit. That said, he aims to expand the definition of "chat app" as far as possible. `%noltbook` may be the maximally excessive definition:

```
|install ~nolset %noltbook
```

Yes, you can send and receive messages. You can also make voice and video calls, send and receive other apps, and send `$NOCK` payments via Nockchain. There is plenty more to discover, but we don't want to spoil the fun. Get it running and explore.

(We'll give you a hint: to get started, search for `~disden-talhes` in the sidebar and join his shared note.)

## Experimental models of userspace

The ["Neo Urbit" project](https://www.youtube.com/watch?v=I5NCB3gaBHk&t=5s) has encountered delays and other upsets over the years, but in large part it is still underway. [`vere64`](/blog/developer-preview-vere64) is under review and being prepared for release. Directed Messaging is now [live on the network](https://x.com/urbit/status/2077065985509756936?s=20). And [`~dozreg-toplud`](/blog/contributor-spotlight-dozreg-toplud) continues to chip away at an implementation of [Subject Knowledge Analysis (SKA)](https://urbitsystems.tech/article/v03-i01/subject-knowledge-analysis).

But the largest gap remains: userspace. Yes, there is [ongoing userspace security work](/blog/gall-2026). But the "Shrubbery" infohazard also remains. Whether you call it "Gall shrubbery" or "Groundwire shrubbery," `%grubbery` is one such bite at the apple:

```
|install ~lasped-monrys-niblyx-malnus %grubbery
```

At this stage, it is very much an experimental tool for tinkering. But if you point your agents at it, you may be able to connect to its embedded `%mcp`, use its Git repository storage, and even write your own Grub apps. It also includes an example calendar app—with time zones. You can find and explore [the repository on GitHub](https://github.com/gwbtc/grubbery).

## Bringing it all together

`~nordus-mocwyl` has taken recent releases—including `%hawk`, `%obelisk`, and `%grubbery`—and used them to overhaul his [Beyond Beginner Guitar course](/blog/building-beyond-beginner-guitar), available at [guitar.box](https://guitar.box) for the intrepid musician. Check out [his recent YouTube video](https://www.youtube.com/watch?v=RAHmOStpFoo0), where he covers:

- The UX improvements made possible by `%hawk` at Kelvin 499
- Using Tlon group membership and roles to control courseware access
- Implementing Stripe payments so people can sign up without needing crypto or even a permanent Urbit ID
- Using `%grubbery` as an alternative framework for producing the same functionality

Have you been wanting to start playing with your urbit but aren't sure you're up for it? Consider this your sign to start experimenting for yourself.

---agent---

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
