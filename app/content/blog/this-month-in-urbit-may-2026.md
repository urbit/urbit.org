+++

title = "This Month in Urbit: May 2026"
date = "2026-05-29"
description = "May ecosystem updates on notetaking tools, peer-to-peer ebook sharing, and more agent-oriented and agent-built tools"
summary = "This Month in Urbit for May 2026 covers %notes, %boox, %last, Hermes Agent integration, Tlon's agent experiments, %claw, %mcp, and recent contributor writing about agentic Urbit and concurrent IO in Spider threads."
search_terms = [
    "this month in urbit",
    "may 2026 urbit",
    "%notes",
    "obsidian notes",
    "%boox",
    "urbit books",
    "%last",
    "audioscrobble",
    "urbit agents",
    "hermes agent",
    "tlonbot",
    "%claw",
    "urbit mcp",
    "spider threads"
]

[extra]
# author = ""
ship = "~sarlev-sarsen"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+May/Blog_TMIU+May_Social.jpg"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+May/Blog_TMIU+May_Social16_9.jpg"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+May/Blog_TMIU+May_Banner.jpg"
tags = ["this-month-in-urbit", "ecosystem", "applications", "ai", "agents", "mcp"]
+++

![May 2026 This Month in Urbit Concept Art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+May/Blog_TMIU+May_Social16_9.jpg)

Welcome to This Month in Urbit, our series for sharing recent happenings from around the Urbit network. We aim to share new apps, bleeding edge experiments, and general news from the ecosystem in a way that helps you get your feet wet. To fully participate, you will need to know how to run an Urbit ship. If you don't know how to do that yet, point your favorite AI agent at this page and it will help get you started. Or [check out the getting started documentation](https://docs.urbit.org/get-on-urbit) to do it the old school way.

Not quite ready to run your own ship? Many of these experiments can still be experienced if you have a hosted ship, but please note that most should not be considered stable software, so they could negatively impact your ship's functionality.

Alongside these articles we will include a [pill](https://docs.urbit.org/build-on-urbit/core-academy/ca04#pill-i) that contains the featured software when it is offered in the form of a Gall application. If other code is necessary we'll also point to the appropriate resources for that as well, such as GitHub repositories.

This guide is written to be human-friendly, allowing you to follow along and learn something new. Embedded in this page are also instructions for your agent; share the link and your agent should help you through getting the enclosed items up and running. The AI landscape is fast-moving and variable, so we can't guarantee everything will work smoothly, but we try to test across various models and agent harnesses. If you or your agents ever get stuck, just give a shout in [The Urbit Foundation group on Tlon Messenger](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17) and we'll help you out.

## May Quickstart
To get started with our featured experiments for this month, try booting a moon off the May TMIU pill. If you don't have it already, get the runtime for your OS:

```
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

In the dojo of your planet, run `|moon` and you'll get a moon networking key. You can do this from the webterm on a Tlon-hosted planet. Then boot your moon with the May TMIU pill:

```
urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-may.pill --http-port 8899
```

(if you don't have moon keys, replace the moon args with `-c tmiu-may-comet` to just get started with a comet.)

## Read / Write / Share

![May 2026 Featured Apps Concept Art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+May/TMIU+May_Apps+16_9.jpg)

An emergent theme this month is a growing quiver of tools for reading, writing, and sharing the written word. Whether you are a text creator, consumer, or circulator, we've got you covered.

### Markdown made easy

Obsidian fans rejoice! `~nocsyx-lassul`'s `%notes` app brings compatibility between your urbit and your favorite notetaking app, with full-fledged Markdown file editing and viewing. And more than that, it enables both peer-to-peer sharing of those notes across the urbit network and a way to publish your Obsidian notes without requiring a 3rd party service.

Available publicly over the network, just run:

```
|install ~bospur-davmyl-nocsyx-lassul %notes
```

A few points of note:
- `~nocsyx-lassul` warns this is still experimental software so backup your important notes elsewhere
- Publishing is dependent on your urbit being accessible from the clearweb. Every Urbit is eligible for [its own arvo.network domain](https://docs.urbit.org/user-manual/os/basics#dns-setup), if you don't already have a domain you would like to use for publishing.
- Not an Obsidian user? No problem, you can still just do everything on your urbit, `%notes` is a full-fledged notetaking app on its own!

As a present but impermanent limitation, the desktop sync app referenced in the web interface is currently only available for macOS and the installation process is a little cumbersome because it's still experimental software:

1. The download may warn you of downloading unknown software; select "keep" to finish the download.
2. After downloading, double-click to open the `.dmg` file and then drag the app icon into your Applications folder.
3. In Finder, when you click app icon to open, it will warn to throw it in the trash, click 'Done' (instead of 'Move to Trash').
4. Then open System Settings and go to Privacy & Security, scroll down to 'Security' and you should see `"Notes Sync.app" was blocked to protect your Mac`. Click 'Open Anyway'.

You should now have the Notes Sync app in your menubar, allowing you to set Ship URL, Access Code, and a Sync Directory. Sign in with your details and watch the "Status" feed to see your files sync to your ship and back!

### For the Bookworms

More of a reader than a writer? `~sitful-hatred` has you covered with `%boox` (pronounced 'books', naturally), an e-reader that stores EPUBs, PDFs, and MOBI files, as well as Markdown, plaintext, and even HTML files. To install it on a live ship:

```
|install ~matwet %boox
```

Of course, it includes key features like comprehensive metadata, file references to Anna's Archive, and tracking your reading progress for any given book; start reading a new novel on your desktop (there's even a PWA you can install), and seamlessly pick up your place on your phone or tablet. As you may expect, you can upload your existing digital library, with options to use the S3 bucket connected to your ship, or put files directly in your ship's loom.

But why should you use this instead of whatever MEGACORP e-reader you are already using? This is where it gets good. `%boox` enables you to seamlessly share your books with your friends, directly peer-to-peer. No middlemen, no restrictions. Go to the "Collections" tab, enter the `@p` of one of your `%pals`, and browse their books. See the titles, authors, and cover images of their curated collections, and if something catches your interest just hit the `grab` button to pull it down to your own ship.

The last feature of `%boox` is... `%last`, which you will find is used to populate the "Feed" page. The `%boox` interface will prompt you to install `%last` separately; it's available over the network at:

`|install ~matwet %last`

Technically a different app, but with a native integration to `%boox`, `%last` is an implementation of the [audioscrobble protocol](https://en.wikipedia.org/wiki/Last.fm), used by apps such as last.fm to help users find, process, and distribute information about the data they are consuming. In this case, `~sitful-hatred` uses it for sharing what books you are reading with your `%pals`. If you want to share more than just what books you are reading, though, go to `<ship-url>/apps/last` and broadcast some `verb<->data<->image` tuple, like "~sampel-palnet is drinking coffee at Martha's Coffee" alongside a photo of your espresso. It will now show up in a feed to your `%pals`. Scrobble whatever you like, or even look at the `%boox` source code and add a `%last` integration to an app of your own!

## Agentic Urbit

![Hermes, OpenClaw, and Urbit Workmarks](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+May/TMIU+May_All.jpg)

Every Urbiter who also wants to experiment with AI Agents inevitably says the same thing to themselves: "Please, oh please, don't make me use Telegram."

And of course the good people over at Tlon Corporation are working on relieving you of that nightmare by making Tlon Messenger more adaptable to agent chat interface needs. They are working hard implementing features like bot labels and thinking indicators, and the most straightforward way to experience these features remains just getting a Tlon hosted planet where they present you the most polished version of the experience.

Of course, since your urbit is yours, and you are reading this article about cutting edge experiences, maybe you are interested in a slightly less polished path. To that end `~malmux-halmex`, on his weekends while taking a break from building [Tlonbots on top of OpenClaw](https://tlon.io/posts/tlonbot), built out an adapter for [Nous Research's Hermes Agent](https://hermes-agent.nousresearch.com/). It is not a full release yet, but if you are already inclined to explore the agentic space and want more and more of your experiments to happen on your urbit, give it a shot.

![Hermes and Nous Research Concept Art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TIMU+May/TMIU+May_All+16_9.jpg)

The source work is currently in draft status as [PR #26300 on the Hermes repo](https://github.com/NousResearch/hermes-agent/pull/26300). Point your favorite LLM at it and ask to help you get started. If you get stuck, drop into `~sarlev`'s ["Sovereign Compute" group (`~sarlev/v3p046tv`)](https://join.tlon.io/0v3.u3q3d.3r9be.4jbou.b3q2c.6bm48) and they will give you a hand. Both `~sarlev-sarsen` and `~dinnyt-divsud` have gotten it working for their specific use cases, along with some minor style and preference tweaks.

### Personalized tools by Tlonners, for Tlonners

It might seem a little unfriendly to say, "Tell your agent to take this draft software across the finish line for your specific computing environment". You might be right. But you also... might be wrong. It might be the way to get ever more personalized software. For example, Tlon has been [running their own experiments](https://x.com/tloncorporation/status/2059280294864159200) in this vein:

- `~sitful-hatred` has [a system monitor for urbit ship operations](https://x.com/tloncorporation/status/2059273347645702396)
- `~bitter-bitduc` has [a plane tracker for the aircraft near his house](https://x.com/tloncorporation/status/2059640081409826917)
- `~dalwes-migdec` has [a tracker for her daughter's school lunch](https://x.com/tloncorporation/status/2060365737781350869)
- `~rildun-lidlen` has [a custom Are.na interface and algorithm](https://x.com/tloncorporation/status/2060023312374243789)

Each of these are hyper-bespoke, even approaching disposable, experiences that are at the same time tremendously useful to their owners.

### Other agent-friendly updates

Also relevant in the world of Agentic Urbit are `%claw` and `%mcp`. Referenced prior in [last week's `%claw` Developer Preview](/blog/developer-preview-claw), and [the April "This Month in Urbit" article](https://urbit.org/blog/this-month-in-urbit-april-2026), they are under active development and worth providing callouts here as well.

`%claw`, another project from `~sitful-hatred` is an implementation of an OpenClaw-like agent natively inside your urbit. Available over the network:

```
|install ~matwet %claw
```

Just bring your own OpenRouter API key and you'll have all you need to control your own self-hosted agent, complete with its own memory, identity, and long-running sessions.

This month in MCP news, the [`urbit-mcp`](https://github.com/gwbtc/urbit-mcp) from [Groundwire](https://groundwire.io) now comes with a quickstart script to get you running with a [Groundwire-based comet](https://urbit.org/overview/running-urbit/get-urbit-id#groundwire-based-urbit-ids) and an automatically configured MCP <> urbit ship connection for Codex, Claude Code, or OpenCode:

```
curl -fsSL https://groundwire.io/install.sh | bash
```

They are also publishing a stable version over the network:

```
|install ~daplyd %mcp
```

## News from across the network

To wrap up this month's updates, we share some introspective and explanatory writings from urbit contributors.

As the software landscape is consumed by agents, Urbiters are naturally thinking about what it means to have an agent-enabled operating system. `~lagrev-nocfep` recently wrote a piece ["Agential Urbit"](https://planet.sigilante.red/agential-urbit) which explores a radical rethinking of an agent-oriented Urbit. It explores alternative ways of thinking about identity, user interfaces, routing, and more. A worthwhile read for anyone interested in how the inner workings of Urbit might play with AI agents over time.

Another worthwhile writeup for the technically inclined is `~dozreg-toplud`'s writeup of [Concurrent IO in Spider threads](https://dozreg-toplud.com/_~_/=bucket-data=/cx/public/blog-parallel-io/html) as a response to a question from `~bonbud-macryg` about UrWASM functionality. A technical but interesting discussion, the format of which we hope to see more of as Urbit developers share their knowledge and experience with each other.

---agent---

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
