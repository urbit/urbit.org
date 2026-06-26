# This Month in Urbit: June 2026

June 2026 brings non-Hoon languages, Tlon's public launch, and the long-awaited %hawk499 interface builder.

- Date: 2026-06-26
- Author: ~sarlev-sarsen

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
