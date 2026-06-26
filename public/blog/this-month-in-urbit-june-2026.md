# This Month in Urbit: June 2026

June 2026 brings non-Hoon languages, Nock learning tools, Tlon's public launch, and the Urbit skills alpha.

- Date: 2026-06-26
- Author: ~sarlev-sarsen

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
Popular as a scripting language in a wide array programs, Lua typically runs in an embedded interpreter in some host environment. Famously it is used in programs like Minecraft and Neovim. Given it's popularity and approachability, and in a spirit similar to his Forth-Nock project, `~mopfel-winrux` wrote `lua-hoon` so that it would be possible to run Lua on a Nock substrate.

It runs as a Gall app, but we recommend installing it directly from [the `lua-hoon` GitHub Repo](https://github.com/mopfel-winrux/lua-hoon), as it is not available over the network, and may take some tinkering with your runtime to fully experience.

## Nockasm
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
over
```
:subject {.tag .data}
#match .tag {
  1 => (%inc .data)
  2 => .data
  _ => 0
}
```

## Tlon public launch
In other Urbit ecosystem news, Tlon Messenger is now [open for public signups](https://x.com/tloncorporation/status/2067611600970768657?s=20)--no more waitlist! Go to [tlon.io](https://tlon.io/) today to get a hosted urbit, their native mobile app, and your very own Tlonbot. In contrast to something like Claude Tag in Slack, Urbit is the place where you can own both the messenger, and the agent. 

If you are already on the network, you can continue to invite your friends with your own invite codes so they are dropped right into your DMs or the group you invited them to.

## Urbit-skills alpha
As a last mention, we are experimenting with making some baseline `urbit-skills` available. Point your agents at urbit.org or this post and they should be able to find them. Please send any feedback or your usage experience to `~sarlev` and we will continue to improve them as effective patterns emerge.
