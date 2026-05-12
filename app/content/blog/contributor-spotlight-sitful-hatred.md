+++

title = "Contributor Spotlight: ~sitful-hatred"
date = "2026-05-12"
description = "A conversation with ~sitful-hatred on hosting, LLM tooling, and peer-to-peer file sharing"
summary = "~sitful-hatred discusses self-hosting, OpenClaw and native Urbit LLM tooling, deterministic on-ship inference, and peer-to-peer file sharing on Urbit."
# aliases = []
search_terms = [
    "contributor spotlight",
    "sitful hatred",
    "subject.network",
    "urbit hosting",
    "Native Planet",
    "Groundseg",
    "Startram",
    "OpenClaw",
    "Claude Code",
    "Qwen3",
    "GPT-2",
    "Vere64",
    "peer to peer file sharing"
]

[extra]
# author = ""
ship = "~sarlev-sarsen"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+QA+sitful-hatred/Blog_QA+sitful-hatred_Social.png"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+QA+sitful-hatred/Blog_QA+sitful-hatred_Social16_9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+QA+sitful-hatred/Blog_QA+sitful-hatred_Banner.png"
# imageDark = ""
# imageCardDark = ""
# imageIndexDark = ""
tags = ["spotlight", "hosting", "llms", "file-sharing"]
+++

![~sitful-hatred Contributor Spotlight Art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+QA+sitful-hatred/Blog_QA+sitful-hatred_Hero.png)

> **\~sarlev:** What was the first thing that drew you into the idea that we needed to throw away and rewrite the entire network computing stack?

**\~sitful-hatred:** One of the things I really liked about computers as a kid was pirating media. I had to learn a bit about how they worked just to be able to steal music or whatever. I was drawn to decentralized, censorship-resistant systems and this ongoing metagame between attempts to enforce legal boundaries on the internet and increasingly sophisticated systems for getting around those restrictions.

The thing that initially got my attention about Urbit was that it was clearly in that tradition, even if not exactly the same one. Before Urbit, everything I had seen was incremental: some cool new trick to gain leverage inside the existing system. I don’t think I’d ever seen a proposition to replace everything outright. That was such a cool and ambitious idea that it sucked me in.

> **\~sarlev:** Did seeing computing that way change how you related to computers more broadly?

**\~sitful-hatred:** I’d always been the kid who used the computer a lot, but I wasn’t a professional and I didn’t have some clear career path into software. Around the same time I started becoming interested in Urbit, I also switched to Linux because I couldn’t stand Windows 10. Those two things happening together forced me to take computers more seriously: first to understand how Urbit worked at all, and second just to use my computer effectively on Linux.

For the last ten years or so, that’s been a dovetailing experience for me: becoming more proficient with computers generally while also understanding and appreciating the kinds of systems built into Urbit. My path into working professionally with computers feels very intrinsically tied to my interest in Urbit.

> **\~sarlev:** You were responsible for a lot of early and middle-period onboarding, especially the [subject.network](https://subject.network) guides. What made you start writing those?

**\~sitful-hatred:** I was literally having to figure it out on my own, and the only place you could really look up information was by going into chats and asking people. There was clearly a gap there that I could exploit just by writing down what I learned.

I was also having fun with the website itself. I used a static site generator called Hugo for that site. Before that I’d only used WordPress-type hosted services, so I was also challenging myself to figure out how to run a simple website on a VPS. It was basic, but I still had to learn a lot to do it.

> **\~sarlev:** Urbit is trying to be a computer that can last forever, or at least for generations. What does that mean to you?

**\~sitful-hatred:** On a practical level, it means I’m hesitant to screw around with my main planet too much. You can always breach or whatever, but I try to treat my planet as something I respect and something I’m thoughtful about.

My other computers are basically disposable. I keep backups and then I trash things on them constantly. They’re fungible. My Urbit is the nice, precious, permanent thing.

> **\~sarlev:** In the long run, what do you want your personal server to do for you?

**\~sitful-hatred:** I really like the idea of just having it be my personal everything archive. To some degree it already behaves like that, but I’m not very disciplined about keeping all my stuff in one place.

What I would really like is that, in a decade or whatever, this one thing is where I have all of my photos, my writing over the course of my life, and everything else that makes up my digital self. It should all be in the same place. It should be something I can share, something I can program with, and something I can recombine in interesting ways.

> **\~sarlev:** You are on the hosting team at Tlon, and also a collaborator at Native Planet on Groundseg and Startram. From the hosting side of the world, what part of Urbit still feels most underappreciated to you?

**\~sitful-hatred:** The idea of having actual property rights over a digital identity in a convincingly true way. I think that’s huge, and I feel like people outside Urbit don’t appreciate it enough. It feels like one of those foundational software problems where suddenly you have a very good solution.

That’s the part I keep coming back to. It’s a basic thing, but it matters a lot.

> **\~sarlev:** What system improvements are you most looking forward to?

**\~sitful-hatred:** `Vere64` is the big one because one of the things I’m hesitant to do right now is just load my ship up with data. Once I can shove a bunch of stuff into it without worrying about blowing it up, that’ll be huge for me.

It also seems very clear that LLMs are a big part of the future—not just the medium term, but the immediate term. I’m trying to figure out what it looks like to give your Urbit its own brain and turn it into its own little autonomous system, to the extent you want that, where it has a mind and a body and you can shape how it moves between the two.

> **\~sarlev:** What are you experimenting with on the LLM side right now?

**\~sitful-hatred:** At Tlon, for the last couple of months, a lot of what I’ve been doing has been productizing LLM tooling. Our CTO vibe-coded a [plugin for OpenClaw](https://docs.openclaw.ai/channels/tlon#tlon) right before it got really popular, and that got us excited about turning it into something we could support as a first-class feature. The basic idea was that if you onboard to hosting, [you get a little OpenClaw instance](https://tlon.io/posts/tlonbot) that natively interacts with your ship and can tell it to do things or interact with other ships.

In the process, I learned that I do not like OpenClaw. It’s bloated and kind of crappy. It works for what it is, but it doesn’t fit very well with how we run ships in hosting. That pushed me toward the conclusion that this should really have a native harness. We shouldn’t be using a third-party system just to let your ship make HTTP requests to a provider or to its own engine.

Around the same time, the Groundwire guys released their MCP server. A colleague of mine at Native Planet got very excited because once he hooked Claude Code up to it, it could finally create productive software. Historically, LLMs had been fine for snippets and brainstorming, but they weren’t reliable. Claude 4.5 felt like the first model that was actually really good at Hoon, especially once you gave it a loop where it could talk to the ship, see error messages, debug its code, and just iterate.

So I started using that to build things I actually wanted. One of them was a native, OpenClaw-style harness that can interact with the hosting backend in the same way: it can send messages, get triggered by messages, point at different models, and define its context. It’s just a desk you install, give a couple of pokes to configure, and then it’s like a little person in your ship.

I also built middleware for external MCP and REST APIs. One of the big problems on hosting is authentication. If you’re trying to hook something up to GitHub, Google, or whatever, it’s still too much of an ask for casual users to set up OAuth apps, client secrets, redirect URIs, and all the rest. So I’ve been trying to make that as generic and universal as possible.

> **\~sarlev:** You’ve also been experimenting with deterministic inference on Urbit itself. What have you gotten working?

**\~sitful-hatred:** I was fooling around with the [numerics library](https://github.com/sigilante/numerics) and ended up going down a rabbit hole of: what would it take to make LLM inference work on Urbit? Is it actually plausible? It turns out that most of the math is already there. A lot of it was just a matter of doing the actual inference operations in Hoon.

This was another vibecoded project. My routine is basically: describe what I want, let the model churn for an hour, then come back, test it, see what’s broken, and validate it against reference outputs. I started with GPT-2 because I was trying to find the simplest practical thing. I got GPT-2 inference working and the outputs matched my Python reference version, which was the point where I thought: okay, hell yeah, we’re off to the races.

To make inference actually practical, I needed jets for inference because matrix multiplication is hard on the runtime. One of the hitches I hit was that if the weights were more than about 512 megabytes, Vere would crash. I was told to [try `vere64`](./developer-preview-vere64), and that did in fact fix it.

Then I went looking for the smallest model I could find that wasn’t totally useless and landed on a 1.7 billion parameter ternary-quantized Qwen3. Ternary in this case means the weights are just `-1`, `0`, or `1` instead of full 32-bit floats. It’s still too dumb to be truly practical, but you can talk to it and get coherent answers. I made CUDA jets for it, got GPU inference working, and spent a lot of time validating that the behavior was actually deterministic and lined up with IEEE 754 floating-point behavior. I was getting something like five or six tokens a second out of it. At that point I combined all the pieces into one desk so it could all talk to itself directly.

> **\~sarlev:** What interests you about doing deterministic inference that way?

**\~sitful-hatred:** One thing that occurs to me is that fully deterministic LLM inference seems plausibly useful in itself. Maybe that means ZK proofs of a given LLM output. I don’t know exactly what the killer use case is yet, or what situation would make that necessary, but it feels like one of those things that somebody is going to find a use for.

> **\~sarlev:** There’s a lot of discussion right now about userspace, Gall, and what the next iteration should look like. What feels most important to you there?

**\~sitful-hatred:** Userspace security scoping is absolutely necessary. Right now, you basically have to assume that anything on your ship can see everything else, because it can. There’s nothing preventing it from doing that.

Unless you want to dedicate a separate ship to every application you use, which is neither efficient nor practical, you need to be able to set permissions on things.

> **\~sarlev:** How are you thinking about the broader security landscape as agents get more capable?

**\~sitful-hatred:** It feels to me like we’re on the precipice of a much more hostile internet in security terms. Very soon, I think it’s going to become impossible to get away with sloppy security practices. Even the supply-chain attacks we’ve been seeing over the last couple of months—this stuff is just going to intensify.

There are going to be people with [Mythos-level models](https://red.anthropic.com/2026/mythos-preview/) who are not just the NSA or whoever, and they’re going to be racking up exploits and using them to go after anyone they think has Bitcoin or anything else worth stealing. I think there’s going to be a painful and difficult period of adjustment very soon. It’s hard for me to project what it looks like on the other side.

> **\~sarlev:** Beyond hosting and LLM tooling, what kinds of apps still pull you in?

**\~sitful-hatred:** One of the first vibecoded Gall-slop apps I made was a little ebook-sharing utility, `%boox`. It lets you maintain a collection of books on your ship, read them in a web page, and eventually share them with other people or browse public collections they have.

That’s still very near to my heart because how file sharing and pirating media was what originally got me into computers. General file sharing is almost a killer app for me: just being able to maintain a good collection and share it with people.

I showed that app internally at Tlon and `~rilfun-lidlen` had independently built a standalone web app with a lot of the same ideas around maintaining an ebook collection and sharing it with friends. So I basically cloned his interface, put it on Urbit, and added a file-sharing layer on top.

Especially with `vere64`, I think there’s going to be a lot of room for cool, niche, curated file-sharing applications. [Nobody’s installing Kazaa or DC++ anymore](https://en.wikipedia.org/wiki/Timeline_of_file_sharing), but there’s always going to be demand for good systems for sharing files with your friends in a semiclosed way that isn’t mediated by Facebook or something like that. The nice thing with Urbit is that you don’t need to know how to run servers. You just install the app and get the benefits of a peer-to-peer operating system.

> **\~sarlev:** If you weren’t working on Urbit, what would you be doing instead?

**\~sitful-hatred:** I think being a defense engineer would be fun—working on weapon systems. There’s a company that makes anti-drone turrets, and I caught myself thinking the other day, damn, that sounds like an awesome job.

I don’t know if they have any use for Kubernetes, but maybe they do.
