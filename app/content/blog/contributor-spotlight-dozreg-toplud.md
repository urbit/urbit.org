+++
title = "Contributor Spotlight: ~dozreg-toplud"
date = "2025-11-04"
description = "A peek into the mind behind UrWASM, and the undertaking to make Urbit faster"
# aliases = []

[extra]
ship = "~sarlev-sarsen"
image = "/images/dozreg-toplud-spotlight.png"
tags =  ["spotlight", "UrWASM", "subject-knowledge analysis"]
+++

> **Q:** *What about Urbit drew you in and captured your attention?*

**\~dozreg-toplud:** For me the most captivating thing about Urbit was the radical simplicity of the stack. While I have technical background, I wasn’t much of a programmer before Urbit. Of course, I had to write some code in my previous occupation. But whenever I had any curiosity to learn something about software development, I ended up falling into rabbit holes of abstractions of the modern software stack, which quickly killed the motivation. Having to deal with the build systems on top of Docker containers on top of dependency installations in the OS just felt like useless busywork, so I wanted to it as little as possible of it to do what I needed: run computations, manage physics simulation results in some semi-automated way to analyze the results

And when I got familiar with Urbit, what was really interesting for me is, for a lack of a better word, the shallowness of the software stack. On the low level you have Nock as a sort of function instruction set architecture, and a very simple one. You have a self-hosted language, which is currently the biggest part of the stack in terms of complexity and line count. Then you have the Arvo state machine and the kernel modules that it drives, and that’s basically it. It’s not that much code. When I write a userspace program, like a Gall agent, I feel like I am still very close to the core of the computation, and I find this very satisfying.

Of course, there is a lot of complexity not present in the Arvo stack when it comes to the external operations, networking. This code is part of the Urbit runtime. But Arvo does not attempt to define how the external operations are executed, which are nondeterministic anyway, and being able to clearly reason about the local data and computations that you have just feels right.

> **Q:** *So this shallowness and simplicity is one of your favorite parts of the system.  This is a common thread in Urbit lore and a lot of people have come in thanks to this historical Urbit idea that your urbit is simple enough that you can go in and fix it, but in some sense that's very much a developer perspective. By contrast, my grandmother, my mom will never go in and fix their Urbit \-- So, where do you think this simplicity will rise and change the way that people either interact with their computers or that because they have this simplicity the way that computers impact their lives might be a bit different than at present?*

**\~dozreg-toplud:** Even if you can’t fix your urbit by yourself, having the system be as simple as possible is still worthwhile in my opinion, if just for the sanity of interacting with it.

I don’t remember who said it first, but there is a saying “Conspiracy theorists don’t have the right answers, but they ask the right questions”. Sure, your CPU most likely does not have an antenna that sends all your data to the nearest CIA van. But if you don’t understand your computer, if you don’t know what it can and, importantly, what it cannot do, can you really trust it with your secrets?

Urbit tries to tip the scale towards trusting your computer in several ways. A Nock program by itself is a pure function, running any Nock won’t lead your computer to send any data to a third party, and you can be certain of that. The way userspace code actually operates is, the program produces a list of outcomes that it would like the kernel to perform. The kernel, or any sort of wrapper around the third-party program, could inspect that list the same way it can inspect any data before acting on it, possibly applying some permission rules. “OK, the program is trying to make an HTTP request. That’s fine. Now, it tries to read the contents of a file outside of its filesystem partition. Crash the program, alert the user”.

It’s worth noting that we don’t currently have such a permissioning system in place, but there are people working on it, and Urbit architecture makes this work a lot easier on the backend part. In fact, I believe the hardest part of the permissioning project is the Web interaction, since currently the main interface to your urbit is the web browser, and the browser session is essentially logged in as root. And the workarounds that the security team tried to build hit the obstacle of Chromium-based browsers not adhering to the Web standard on iframes.

If you can be at ease with your computer, you could trust it enough to store sensitive information, documents, passwords, photos, without the fear that they would somehow leak.

> **Q:** *As you mention, improving security is an effort that is underway and a fundamental part of Urbit 'becoming real'. The other thing that's come up often in Urbit's descriptive history is that it aims to be a computer that can last forever or that, because you can put all of your data in it, it can last for generations. Is there something that would change in how you use your computer if you knew it would last forever?*

**\~dozreg-toplud:** The easiest comparison I guess would be the cloud services that we use. My current email service provider, that I used for at least 13 years, started bugging me about switching to paid plan: “The mailbox is 86% full, pay up or delete/archive locally your stuff”. I already had to move some files from Google Photos that now lie somewhere on my disk and I can’t just scroll through them or do a semantic search that I could do when the photos were uploaded.

I am not that paranoid when it comes to cloud file storage. Google probably doesn’t spend time looking at my collection of cat photos. I would actually trust it more than myself in hosting files online if it comes to managing a Linux box. But if I could use my urbit to do that, I would trust myself more.

> **Q:** *In the near term, what do you want to be able to do with your personal server? Do you run your own home lab or other servers presently, or are you like, "hey I'm just running urbit and that's it?"*

**\~dozreg-toplud:** No, I don’t run anything else. Part of it is, I just didn’t have enough time or motivation to set something up. But partly I feel that I should really be only using Urbit for my needs, an extreme case of dog fooding in a way. For example, I shared some public SVG files by committing them into the Urbit filesystem and exposing them via a URL, and that led me to discover and fix a memory leak in the HTTP driver. Having to only use Urbit allows me to take a critical eye on some of its features or idiosyncrasies.

> **Q:** *One last more philosophical question before we get into some of the technical stuff. How did your relationship with computers change when you started working on Urbit or just found out about Urbit?* 

**\~dozreg-toplud:** First of all, I just learned a lot about computers and software in general. My first project was WebAssembly interpreter in Nock, so I spent a lot of time reading the WASM specification, reading the code for the WASM interpreter I use for jetting. I also had to dabble in other parts of the system, in userspace and in the kernel too. I even learned a bit about Web programming to make an web interface for a runtime to run JavaScript scripts on the backend.

Another result of working on a simple, unusual and yet often very sensible system made from scratch is that I became a lot less tolerant of bad software around me. Things that I would previously just accept as “well, that’s the state of the modern software, nothing to do about it”. Where as, after playing with Urbit and having to write some script in Matlab using its ugly interface for async computations because the synchronous version was unbearably slow, I was staring at the screen muttering “we don’t have to live like this”.

So I guess working on Urbit allowed me to develop an aversion to slow and ugly software. Which can be ironic, of course, because of Nock slowness. But in the case of Nock I can at least see that its slowness is the price for the persistence, whereas making the case for other programs is a lot harder. Also, this feeling motivates me to work on speeding Nock up.

Another thing that I acquired working on Urbit is the lack of fear of doing something from scratch. Casey Muratori gave a [good lecture on Conway’s law](https://www.youtube.com/watch?v=5IUj1EZwpJY), which states that the software structure ends up replicating the orgchart due to the communication cost between different teams. He demonstrates that, when old features are kept around for backward compatibility purposes, the system becomes even more fractured and interfaces are duplicated because the communication cost between the past and the present is effectively infinite. Being able to throw things away, make breaking changes is important for making good software, and it is easier to do if you start from scratch.

> **Q:** *So I guess this is kind of a good a lead-in to the more technical side of things... There's this whole pile of technical debt, this unwillingness to break things, to throw everything out and and start from scratch in the legacy world. When you make the decision to leave a bunch of that behind, what are some fundamental or systemic issues that come out of that world which are just wholly not a concern in Urbit?* 

**\~dozreg-toplud:** I think the build system within Urbit is so much better to work with than any other build system in the legacy world. \~midden-fabler and I recently did a refactor of Ford, the Urbit build system, replacing explicit caches with the global persistent memoization hints. That turned the build system into a small library (around 500 lines of code) of pure functions from files to code objects. Structural sharing of nouns and global deduplication means that you get some of the advantages of static linking (all your dependencies are in one place, you ship your program with the dependencies so you don’t have to worry about version mismatch) with some of the advantages of dynamic linking (reduced memory usage, if two projects import the same library then that library will be represented with the same noun in both). When I move from working on Arvo to working on Vere, or any other project that uses regular build systems, I really miss the simplicity of Ford.

> **Q:** *What system improvements are you most looking forward to in Urbit? You've been working on Subject Knowledge Analysis (SKA), there's Vere64 for storing large amounts of data on you urbit, and the work on the Ford build system. What are you most interested about in all this?*

**\~dozreg-toplud:** Even before 64-bit Vere ships, \~master-morzod’s allocator refactoring gave us another bit of pointer compression, increasing Urbit’s addressable memory to 16 GB. To compare, Google Drive’s free plan is 15 GB, so you already have quite a lot of space to share things. Another thing that should be coming soon is Directed Messaging, and I really look forward to that. Communications between ships will get much, much faster.

For more aspirational things, on which nobody works to my knowledge, I would like to see some kind of simple user space model which is focused on sharing data. Why? Because this is what we mostly do with our computers. I want to share photos and videos, or a poll to select the time slot and a place for a dinner party. Gall agents might be a bit too simplistic for quickly assembling an interface like that. Maybe some sort of dedicated userspace language or a framework would be a better solution, I am not sure.

> **Q:** *Your point about userspace being very heavily oriented around data sharing is interesting. Can you say more there?* 

**\~dozreg-toplud:** Well, I haven't written a lot of userspace code. I've been doing mostly systems work, so it's kind of hard for me to judge what would be the best thing. But what I've noticed is that writing Gall agents is simple as long as all they are doing is interacting with other Gall agents: sending commands, subscribing to data endpoints, issuing updates. But when you try to add a web interface to the agent, it becomes a lot more complicated. And there aren’t many alternatives for interfacing with the Gall agent, the second option is command line interface.

I can see two options here. Either some sort of reactive domain-specific language for creating interfaces in a declarative manner, where you describe what sort of data you want to share, and what feedback to receive, and that page description would be compiled to an HTML+JS webpage that you would host on your Urbit, and then you would just share the link with anyone, with authentication prompt if necessary.

Another option is to ditch the traditional Web surfing paradigm entirely and browse the Urbit network directly using some sort of “Urbit browser”. A similar concept was described by \~tiller-tolbus in his [Aegean post](https://web.archive.org/web/20240206133705/https://tiller-tolbus.redhorizon.com/blog/aegean) (*the page is down, link is to the Web Archive snapshot*). Initially that browser would still have to implement HTML+JS rendering, unless some native UI solution is going to be built.

> **Q:** *You wrote a piece for USTJ a while back, as stateless UrWASM was coming along. What are you working on currently as it relates to UrWASM? What does done look like for you on that project?*

**\~dozreg-toplud:** UrWASM itself is done, the stateful version will be released together with 409 update of Arvo. As I was preparing things for the release, I decided to make a little GUI for running scripts in Urbit.

The motivation for making it was twofold. On the one hand I feel that Spider threads — that is, scripts in Hoon — are a bit underused. Often you don’t need a full-on app to perform a one-off task, and threads would be nice for that. But currently you can’t check their status: *is it still running? did it fail? if it returned, what did it return?* and so on. You also can’t reliably schedule them to run every period of time. I also wanted to work around the issue of the webterminal when the code would break up if you pasted multiple lines at ones.

The other reason is that I wanted to make a GUI for running JS scripts via \`threads-js\`, a JS runtime I implemented with stateful UrWASM. I previously had a simple GUI implemented in %hawk with \~migrev-dolseg’s help, but it was a bit too simple, it wouldn’t report if the thread is still running or crashed, it couldn’t manage multiple threads or do scheduling.

For this reason I made a Gall agent %orchestra, which allows you to write scripts in either Hoon or JavaScript and run them on your urbit. I am not a frontend developer, so it looks a bit janky, but it gets the job done.

> **Q:** *This app is just getting wrapped up, right? So like people will be able to download this desk and presumably run their own threads?*

**\~dozreg-toplud:** Sure, it is done, I want to polish it a bit and release it together with the 409 update. And somewhere in the web UI there will be a link to urbit JS library documentation.

> **Q:** *Once this is shipped, is there anything else on your radar that you want to do with it? Is it something where actually you are thinking, "I want to see if I can inspire other people to go and and you know pick some of this stuff up make it easier to do things in different languages?" What would be your kind of vision for the future on this?* 

**\~dozreg-toplud**: I think in the best case scenario some people would see the working example of a JavaScript runtime in Urbit and get inspired to write their own runtimes in Nock. There was a project on porting Lua to Urbit, that would be interesting to see. I did try to also port Python but that didn’t quite work out, but maybe people will have like some ideas to get it to work. And at the very least Urbit appreciators that are not familiar with Hoon will get some capacity of programming their server in a language they recognize.

> **Q:** *Now as your UrWASM work wraps up, you've kind of pivoted your focus towards working on Subject Knowledge Analysis (SKA). What do you hope to be able to do with that, and over what period of time?* 

**\~dozreg-toplud:** My motivation for working on SKA somewhat intersects with the set of motivations I had for working on UrWASM: I wanted Urbit to be faster. For UrWASM, having a WASM interpreter jetted with a fast WASM interpreter in C meant that some kinds of computations were inherently faster by doing them via WASM than running them in Nock. For example, sorting lists of numbers in WASM is a lot faster than in Nock today, if the list is big enough. SKA attempts to make Nock itself faster.

Now, how much faster and how much time it will take, these are two different questions.

In the current state of affairs I can add some simple optimizations powered by SKA that would make Nock about two times faster. I'll probably write an article for a future USTJ issue that goes deep into the technical details, so people should keep an eye out for that, but that is for the short term. 

Longer term there's more complex optimization which the original authors of SKA — \~ritpub-sipsyl and \~master-morzod — envisioned that would make Nock even faster. Now how much faster? I'm not ready to give the estimates here, but I believe the project is worth pursuing.

> **Q:** *Noticeably faster urbits sounds nice to me, for sure. Last question for you. If you weren't working on Urbit, what would you be doing instead?*

**\~dozreg-toplud:** Writing FORTRAN for experimental diagnostics on some plasma fusion device? Writing MATLAB and Python scripts to handle experimental data? Whatever it is, I know for sure that I would spend all my spare time playing with Urbit.
