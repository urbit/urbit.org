+++

title = "This Month in Urbit: July 2026"
date = "2026-07-31"
description = "July 2026 brings Directed Messaging, refreshed Gall apps, Hoon notebooks, noun and graph visualization, Hawk 499, and new Tlon Messenger features."
summary = "This Month in Urbit for July 2026 covers Directed Messaging in 408k, updated %docs and %cliff apps, Mondrian, %caderno, %graph-viz, Hawk 499, and Tlon Messenger's new Notebooks and Context Lens."
search_terms = [
    "this month in urbit",
    "july 2026 urbit",
    "directed messaging",
    "named data networking",
    "408k",
    "%docs",
    "%cliff",
    "mondrian",
    "%caderno",
    "%graph-viz",
    "%obelisk",
    "hawk 499",
    "tlon notebooks",
    "context lens"
]

[extra]
ship = "~sarlev-sarsen"
# TODO: Replace the placeholder images before publication.
image = "https://urbit.org/images/urbit-dither-placeholder.png"
imageCard = "https://urbit.org/images/urbit-dither-placeholder.png"
tags = ["this-month-in-urbit", "ecosystem", "applications", "directed-messaging", "agents", "tlon"]
+++

![July 2026 This Month in Urbit artwork placeholder](/images/urbit-dither-placeholder.png)

Welcome to This Month in Urbit, our series for sharing recent happenings from around the Urbit network. To fully participate, you will need to know how to run an Urbit ship. If you don't know how to do that yet, point your favorite AI agent at this page and it will help get you started. Or [check out the getting started documentation](https://docs.urbit.org/get-on-urbit) to do it the old-school way.

This guide is written to be human-friendly, allowing you to follow along and learn something new. Embedded in this page are also instructions for your agent; share the link and your agent should help you through getting the enclosed items up and running. The AI landscape is fast-moving and variable, so we can't guarantee everything will work smoothly, but we try to test across various models and agent harnesses. If you or your agents ever get stuck, just give a shout in [The Urbit Foundation group on Tlon Messenger](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17) and we'll help you out.

## July Quickstart

This month, there is a variety of Gall applications to play with; as always, you can get the latest runtime by running:

```
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

If you want to boot a fresh ship with the July TMIU pill, we recommend using a moon. To get a moon networking key, just run `|moon` in your planet's dojo. You can do this from the webterm on a Tlon-hosted planet. Then boot your moon with the July TMIU pill:

```
urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-july.pill --http-port 8899
```

(If you don't have moon keys, replace the moon args with `-c tmiu-july-comet` to just get started with a comet.)

## Directed Messaging is live

Released on July 14, 2026, 408k is a monumental update. It implements the "Directed Messaging" project across the entire Urbit network. In short, this upgrade increases bandwidth across the network by implementing the "Named Data Networking" (NDN) protocol natively over Urbit. This networking model uses a "request<>response" design, leans on Urbit's scry namespace, and creates a "content-centric" network where recipients request named *data*, rather than data from particular sources.

The update is rolling out in two phases: the initial 408k release makes it available and allows it to be manually toggled on. To do so, first run:

```
+vats %base, =verb %.y
```

This will return your base hash. At the time of writing, it is `0v1p.bbmmr.fqrkl.bb9jn.g40no.3pddu.tbege.7g2k4.rm02c.a628h.j24nv`. Then run:

```
hood &ahoy-set-hash 0v1p.bd1ud.hribk.6619t.70jni.n06f4.9il00.voegf.kh8i9.8se4n.124s8
```

*(Even if your base hash is different, e.g. `0v1p.bbmmr.fqrkl.bb9jn.g40no.3pddu.tbege.7g2k4.rm02c.a628h.j24nv`, use the command ending in `124s8` to enable Directed Messaging.)*

The next release, 408k-1, will turn Directed Messaging on for all users. Follow along on the blog next month to learn more about the Directed Messaging project and what to expect from its rollout across the network.

## Self-documenting ships are re-shipped

As Gall apps were refreshed for the 408k release, `~tinnus-napbus` took the opportunity to update—and massively upgrade—the [`%docs`](https://github.com/tinnus-napbus/docs-app) app. You can install it by running:

```
|install ~pocwet %docs
```

In his words, "The release includes a complete responsive redesign, improved typography and navigation, Markdown/GFM support, multi-language syntax highlighting, light/dark/system themes, fast lazy-loaded Eyre caching, and configurable public documentation for selected desks."

Also released alongside the application itself are ["Mortar"](TK), [`syntect-urwasm`](TK), and [`urbit-markdown`](TK) to support desk assembly, syntax highlighting, and Markdown parsing. `urbit-markdown` in particular is built on top of `~wispem-wantex`'s Markdown library, but with strict adherence to GitHub-flavored Markdown.

For end users, `%docs` offers a location on your ship, `/docs`, where you can find developer-provided documentation for any of the applications installed on your ship. If you are a developer, all you need to do is add Markdown files to `/doc` in your desk, and the `%docs` agent will pull them into each user's instance and publish them via Eyre. To learn more, such as how to push docs for a given desk to the clearweb, install `%docs` and visit `<your-ship>/docs/d/docs/overview`.

## Exploring files beyond docs

As data transfer speeds increase across the network, perhaps your ship will become a place where you store ever more files to share with your friends. While we expect more bespoke or polished solutions to arise as exact use cases come to light, `~lagrev-nocfep` has revitalized `%cliff` from the `~paldev` suite, making it available across the network alongside the 408k update:

```
|install ~magbel %cliff
```

A simple but useful tool, `%cliff` is a Clay file explorer. It is great for looking at the desks across your ship without needing to `|mount` anything to your UNIX host and is particularly helpful if you don't have access to said host machine. That said, it is possible to edit files via Clay as well, so buyer beware—particularly if you are using a hosted ship and aren't sure exactly what you are doing.

As an improvement to `~palfun-foslup`'s original `%cliff`, the version currently distributed by `~magbel` includes functionality for setting the publication level of a given file or directory in Clay, allowing the whitelisting and blacklisting of individual ships or group lists.

## Noun Visualization and Hoon notebooks

Not to be relegated to just updating existing software, though, `~lagrev-nocfep` also shipped two original works in the past month. ["Mondrian"](https://github.com/sigilante/mondrian) is what could probably best be described as a fun "art project" that takes a noun and visualizes it along the lines of a Piet Mondrian painting, or like the [recipe cards from cookingforengineers.com](https://www.cookingforengineers.com/recipe/227/Ratatouille/trn).

![Nouns by Mondrian](https://pbs.twimg.com/media/HN8qPG9bgAABbL6?format=jpg&name=medium)

On the Gall side, he released `%caderno`, which you can download by running:

```
|install ~magbel %caderno
```

Portuguese for "notebook," `%caderno` is a Hoon notebook. Similar to a Jupyter notebook in spirit, it allows users to publish and share notebooks, with built-in functionality for browsing and forking the notebooks of your peers.

## Obelisk, also visualized

As a follow-on to his `%obelisk` project, `~nomryg-nilref` built an example of how to use its database capabilities in an effectively stateless Gall agent. `%graph-viz` lets users write the DOT "graph description language" to create flow charts, dependency graphs, state machines, and more. You can pick it up from the `~dister` moon:

```
|install ~dister-nomryg-nilref %graph-viz
```

Note here that `%obelisk` is a dependency for `%graph-viz`, so make sure you have it installed as well:

```
|install ~dister-nomryg-nilref %obelisk
```

With both desks installed, end users are able to render [Graphviz](https://graphviz.org/) DOT diagrams as SVG entirely on-ship, without a dependency on external services and without any sloppy glue code.

For full documentation and related agent skills, check out the [repo on GitHub](https://github.com/jackfoxy/graph-viz).

## Hawk, revisited

The `%hawk` project from `~migrev-dolseg` has been a community favorite since it was initially released, and this month we are seeing a huge update from `%hawk-500` to `%hawk-499`. For those who don't already have it installed, you can pick it up by running:

```
|install ~dister-migrev-dolseg %hawk
```

The Kelvin 499 version of `%hawk` takes a new approach to enabling composable interfaces and interaction with the various agents running on your ship. Give it a spin and see what you can build!

Need to familiarize yourself with Hoon a bit more before you get going? Check out the [Hoon Crash Course from `~migrev-dolseg`](https://willhanlen.com/hawk499/crash-course#module-0) to start your journey (or refresh your memory).

## Tlon is on a tear

Last but never least, the 800-pound gorilla in the room known as [Tlon Corporation](https://tlon.io) released two new features in the Tlon Messenger application: Notebooks and Context Lens.

Now, you might find yourself saying, "I thought Tlon already had notebooks?" Yes and no. The original Tlon "Notebook" was a flat collection of long-form posts. It was useful in its own right, but not always how plain-text files are stored. So, in this update, the old notebooks are becoming "Bulletins," and users get a super-powered new "Notebooks" channel type. In the [words of `~rilfun-lidlen`](https://bosser-hatber.tlon.network/notes/pub/~bosser-hatber/notebook-63/83):

> "We originally designed Notebook channels to mimic a blog or a list of articles, meant to distribute formally prepared documents to a group of people. But that's not how people take notes, and it's not how I take notes. My notes are scratchy and incomplete, and meticulously formatting them with a WYSIWYG editor was the last thing I wanted to spend my time doing. True spontaneity and creativity demand as little friction as possible, so the interface needed to accommodate messy working states. There are no cover images, no previews, and no truncation breaks to prepare. Markdown Notebook channels are plainly organized by title, ordered by last-modified time, and nestable within folders."

And it won't go unnoticed that this return of Markdown formatting to Tlon brings with it awesome compatibility with the growing presence of AI agents. If you've got a Tlonbot, just ask it to help you with any of your notebooks and it will be able to read, write, edit, and even publish to the clearweb anything that it has access to. So import your directories full of Markdown notes into your urbit and see what you and your agent get up to with this newfound functionality.

Of course, it's not just "Markdown for your agents" that Tlon is working on. Rather, they are taking a holistic view of how a user actually wants—and needs—to interact with their agents. Tlon's [new "Context Lens" feature](https://x.com/tloncorporation/status/2075224895013736784?s=20) offers a step change in what is available here.

As you might expect, your Tlonbot having its own personal server means that the full logs of agent runs get stored on a machine that is yours, so all that useful data (say, if you want to fine-tune a model of your own in the future) belongs to you. But more than that, Tlon has pointed their design sense at the problem of "what do I do when my agent does something unexpected?" Their solution, instead of making you `ssh` into a remote server (or be one of those people walking around with their laptop cracked open), is to put the details just a single tap away. For each run of your bot, you can tap the context menu to see a summary of its actions—tool uses, model provider info, written files—and even dig into an expanded view for every minute detail that might help you better understand what is going on.

This is a huge improvement for anyone who has tried to use agents via Telegram or iMessage, and when paired with all the other benefits of Tlon Messenger and Urbit, it is clearly the best way to message your agents.

---agent---

# Agent companion: This Month in Urbit, July 2026

This companion is for AI agents helping a user reproduce or explore the July 2026 _This Month in Urbit_ items. The human-facing article is intentionally narrative; use this section as the operational checklist and source map. This article includes the July TMIU pill, the 408k Directed Messaging rollout, `%docs`, `%cliff`, Mondrian, `%caderno`, `%graph-viz`, `%obelisk`, Hawk 499, and new Tlon Messenger features.

## Start with the public Urbit skills

Use the public skills snapshot before improvising Urbit operations or userspace workflows:

- Skills index: `/.agents/skills/index.md`
- Running Urbit OS: `/.agents/skills/running-urbit-os/SKILL.md`
- Comet onboarding for agents: `/.agents/skills/running-urbit-os/references/comet-onboarding-for-agents.md`
- Userspace apps: `/.agents/skills/using-urbit-apps/SKILL.md`
- Userspace apps bundle: `/.agents/skills/bundles/userspace-apps.yaml`
- Obelisk references: `/.agents/skills/using-urbit-apps/references/obelisk/README.md`

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
- The article describes `%obelisk` as a dependency of the network-distributed `%graph-viz`, while the linked source repository currently describes a self-contained desk. Verify the release-specific requirements before installing either desk, and surface the discrepancy rather than guessing.
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
   hood &ahoy-set-hash 0v1p.bd1ud.hribk.6619t.70jni.n06f4.9il00.voegf.kh8i9.8se4n.124s8
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
| `%graph-viz` | Gall app that renders Graphviz DOT diagrams as SVG on-ship | `|install ~dister-nomryg-nilref %graph-viz`; <https://github.com/jackfoxy/graph-viz> | The article says the network release requires `%obelisk`, while the linked source repository describes a self-contained desk. Verify the release-specific requirement before installing dependencies. |
| `%obelisk` | Database described in the article as a dependency for the network-distributed `%graph-viz` | `|install ~dister-nomryg-nilref %obelisk` | Install only after confirming the release-specific dependency; use `/.agents/skills/using-urbit-apps/references/obelisk/README.md` for general Obelisk guidance, not as proof of this OTA install path. |
| `%hawk` at Kelvin 499 | Composable interface tooling for interacting with agents on a ship | `|install ~dister-migrev-dolseg %hawk`; <https://willhanlen.com/hawk499/crash-course#module-0> | Confirm instructions are for Hawk 499; public references for other Kelvin versions may not be compatible. |
| Tlon Notebooks and Context Lens | Markdown notebook channels and detailed Tlonbot run inspection | <https://tlon.io>; <https://x.com/tloncorporation/status/2075224895013736784?s=20> | Informational features. Do not automate account access or inspect private notebooks and run logs without permission. |

## Minimal exploration flow

1. Ask whether the user wants to boot the July test ship, inspect or enable Directed Messaging, install a featured Gall app, explore a linked repository, or review the Tlon features.
2. For the full set of Gall apps, verify the article-provided July TMIU pill is publicly retrievable, then prefer it on a disposable moon or comet.
3. For an existing ship, confirm the exact target, publisher, desk, and expected state or publication change before each command.
4. The article says to install `%obelisk` before `%graph-viz`, but the linked source repository describes a self-contained desk. Verify the requirements of the network-distributed release before either state-changing install.
5. For `%cliff`, begin with read-only exploration and ask separately before editing files or changing publication controls.
6. For `%docs` and `%caderno`, use non-sensitive test content and confirm clearweb or peer visibility before publishing.
7. For `%hawk`, use the linked Hawk 499 crash course and version-matched documentation before improvising interface endpoints.
8. For Tlon Notebooks or Context Lens, explain the feature and let the user perform private account actions; do not request credentials or private run logs.
