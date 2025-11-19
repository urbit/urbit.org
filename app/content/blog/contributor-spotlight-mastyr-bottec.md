+++
title = "Contributor Spotlight: ~mastyr-bottec"
date = "2025-11-25"
description = "A preview for developers to experience an unlimited loom using the vere64 runtime"
# aliases = []

[extra]
# author = ""
ship = "~sarlev-sarsen"
image = "https://urbit-network-explorer.s3.us-east-2.amazonaws.com/2025.10.9..3.34.2..547a.e147.ae14.7ae1-d9ea8b61-008b-4abb-affb-6e82045dcbf2.png"
# imageCard =
# imageIndex =
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["spotlight", "vere64", "runtime"]
+++

**~sarlev:** So, starting at the top, what's the first thing that drew you into the idea that we needed to throw away and rewrite the entire network computing? Or are you even sold on that?

**~mastyr-bottec:** This is a good question. I mean, I'm fairly sold on it. It's a funny question though, isn't it? Think: if you actually had the authority to throw away the whole stack-- and you went ahead with it-- you would just shut down civilization, full stop. Clearly we can't do that... at least not until we have something new that's ready to go, and we've already migrated to it. It's a migration.

**~sarlev:** How do you think that migration will happen?

**~mastyr-bottec:** Well, statistically speaking, I don't think it'll happen. Realistically speaking there's 99.9% chance that we're going to fail, but it's the kind of thing where we have to give it a shot, and at least have a bit of fun along the way. We have to be shooting for the moon-- that 0.1% chance.

But okay, I do have a straight answer to your first question though. How was I drawn into Urbit? Well, I was sitting browsing Hacker News when I was doing my last year of my master's degree. I was just listening to a lecture, getting really jaded about having to find a job at Facebook or something to just design new emojis or make new buttons. I didn't find the potential work available very interesting because it all seemed like slop, even at that time.

**~sarlev:** And this was pre-AI barrage, but it was the same?

**~mastyr-bottec:** Yeah.

**~sarlev:** And so you got hooked. What exactly was the hook of Urbit that got you?

**~mastyr-bottec:** I like the holistic approach it takes to the whole problem of modern computation. The analysis of that very problem, I thought, was very convincing, and the solution also pretty elegantly designed. I mean, I think I'm like every other Urbit user in this regard: I want to see more people, including myself, be able to actually own and control more of what they do with their computer, if not their whole digital lives. But, we're a long way off. I'm sort of proof in the pudding here. I run an Urbit but it's kind of a pain. I definitely don't use it for anything important, except for chatting about working on Urbit I guess (some say this is important).

**~sarlev:** What do you think is the current hurdle for people to use Urbit?

**~mastyr-bottec:** I think that the hurdles to Urbit adoption are partly technical and partly social. First, we need to actually make Urbit capable of doing things. It needs a killer app, or something, right? That's talked about frequently: what's the killer app? For me, there aren't _that_ many things that Urbit has to do for it to start being useful for me in my persona life. Providing a sensible photos, CalDAV/CardDAV, and notes syncing and management experience would be basically everything _I'd_ need to move off of iCloud, for example.

I'm a very novice homelab guy. Mostly I just use my Linux server for building Vere, but I would like to be storing all of my family's photos and syncing all of our calendars and todos and notes and stuff with it too. Unfortuately, lthe effort and time required to do that is just too high for me. Perhaps I'm too lazy. I'm technically capable of it, but managing Unix infrastructure really is just a mess-- despite all the tooling out there-- and I spend enough time on the computer as it is working on Urbit.

So, I'm kind of an Urbit maximalist in this way, I guess you could say. I salute the guys out there running Unix homelabs in production for their families-- and I know a number of them-- but I just refuse to do the same. I'm not ready for that responsibility, given the technology available. iCloud provides a better support model, right? And all it takes from me is money. The way I see it is: I'll work on Urbit until it's ready, then I'll run stuff for my family with it. I find this to be a fantastic motivator, even though I'm not certain of success. And, yes, I'm losing some freedom from using iCloud along the way, too, of course.

**~sarlev:** And maybe your soul, too.

**~mastyr-bottec:** Apple and other megacorps are excellent at tailoring their services to suit their objectives, right? They're so powerful that they actually shape our desires, too, so that what they provide is _exactly_ what you want. They make you want to just store photos the way iCloud wants you to store them, because they're Apple and they have that power in the market... All the best web2 stuff in the market is doing this: telling you that what they provide is all you want to do! I like Urbit because we think: but maybe that's _not_ actually the way you should be storing and sharing your photos in the first place. Opening that line of thinking is interesting. It opens this whole new environment, but you don't even know what to do there because it's like you're Neo and you've just been reborn in the free world. What's the line again? What does Neo say? "Why do my eyes hurt?"

**~sarlev:** "Because you've never used them before."

**~mastyr-bottec:** And that's how it is. As a runtime developer, I've never gotten into application development on Urbit. I've had some ideas for different applications, but it's actually quite difficult to think what having all this Martian technology means-- what having this "personal operating function", purely functional system, distributed p2p network, with exactly-once message delivery, where everyone owns their own piece of the address space, etc. etc. and so on... All the things that Urbit is doing differently so that people can trust that their computer is truly theirs.

**~sarlev:** This is a good kind of transition into the technical pieces of it. In the legacy computing world did you struggle with fundamental or systemic issues that just are in your experience wholly not a concern in Urbit?

**~mastyr-bottec:** I worked at Honeywell Aerospace after I graduated with my Master's degree for two years as a data engineer writing Python scripts and deploying Kubernetes clusters. This was the "Docker containerized everything" game.

**~sarlev:** It seems like Docker is in some sense the legacy world's attempt at solving a bunch of these pain points around predictable environments and stuff—

**~sarlev:** Without rewriting the entire stack. But at the same time now it's requiring a dedicated person to go and run a bunch of these and software on top of software to just run a replicable environment. What issues did you run into in the world of Kubernetes and Docker?

**~mastyr-bottec:** Yea, I mean, I didn't have trouble with them. But, part of my job was that I became an infrastructure engineer and in order to get this company, which is not a software company, to have a bunch of their dashboards and other software tools working reliably. And I was just out of college, so I wanted to use something more interesting, I guess, more shiny, and Docker and Kubernetes were just that at the time. But it is clearly a bandaid solution to one of the problems in web2.

**~sarlev:** So what are you looking forward to in Urbit technical developments that are on the horizon?

**~mastyr-bottec:** Directed messaging and vere64, are obviously the big ones that everyone knows about. But ~midden-fabler's fastboot work has also been really good for development because it makes booting a fake ship insanely fast compared to how it used to be. I think it's something like only 7 seconds now on my MBP. Even with mining a comet it can be under 2 minutes.

**~mastyr-bottec:** But I'm hoping that someone takes the unlocks from my work on vere64 and being able to store lots of data in an urbit and builds a really good file sharing application. I want something that just handles all the different files: music, videos, text, pictures. It would be really neat to have peer-to-peer file sharing with a nice UX. Networking should be fast and the storage should be capable. Doing a BitTorrent-like replacement but better, with stuff like reputation and file reviews you can see before you decide to download something. I don't know, I haven't used my eyes before. I'm sure someone's got way better ideas than I do in this context, though.

### 00:57:29

**~sarlev:** One of the interesting things to me about Urbit has always been the identity layer and if we think about that in contrast to something like BitTorrent. How do you see that kind of changing the way that people do some of their computing?

**~mastyr-bottec:** I'm not sure exactly, in relation to torrents, but the other thing that is interesting here is with Directed Messaging, we have what I think ~master-morzod has noted is the first production implementation of Named Data Networking. What this should enable is that requests are for a particular file or packet, such that if any file becomes popular in any sort of serious manner—- even if the source original source ship stops serving the file for whatever reason-— it could be syndicated on hundreds of other ships. This is apparently a core feature of NDN. Even if the source ship was up and you wanted to download a file from its namespace, you probably wouldn't even get it from the source ship because it's been syndicated already to somebody else who's closer to you in the network path and has lower latency.

**~mastyr-bottec:** I am not a networking expert, so don't hold me to the details there but it's cool to be the first to do something in the real world, not in a research environment.

**~sarlev:** Let's talk about your expertise. Right now you're the lead on the Vere 64 project. What does that entail? What's the state of things right now?

**~mastyr-bottec:** First off, ~sarpen-laplux deserves the lion's share of the credit for vere64. He got the code working, booting moons, and it's his work that enabled me to get it into a state that will hopefully get merged. Right now, I am basically working through a couple of tedious tasks: writing C tests for urcrypt and merging the latest state of our development branch into the 64-bit codebase. That's what I'm doing right now. Once that work is done I am moving on to writing migrations. Right now, vere64 has a [developer preview](TK) that can run livenet ships with a functionally unlimited loom size, but you can't use it to run a ship that has been run using production releases of Vere, so we need to make that path between runtime versions possible for users with existing ships.

**~sarlev:** What goes into migrating a pier between different runtimes? This is one of those things that is interesting both in the current Urbit world and also in the broader theoretical "future Urbit" world. Urbit is an OS, it's defined in something like 70k lines of Hoon. It aims to have this 'frozen, diamond-perfect kernel. But it also kind of runs on a separate runtime and maybe theoretically in the future there are many different runtimes that are running on different substrates or eventually you have Urbit running directly on bare metal or even a crystal or something. But what does it mean to write these migrations and how does that make you think about the runtime element of the system as a whole?

**~mastyr-bottec:** The runtime is just the piece of software that makes Urbit real right now because we live in a world of Unix computers. If you want to interact with anyone else that has a computer, you need to speak Unix protocols and you need to run your system on Unix. The runtime is the tire, the rest of the car is Urbit... something like that.

People can have their critiques about it, or misunderstandings saying "Urbit is an OS but it runs on Unix?" But, I don't think it's too interesting once you realize that every programming language has something like a runtime or has a compiler. Basically all the way down the stack you have a situation where, they wrote some program in a language that already existed to actually deal with programs that want to exist in a different language and still run and actually come to life. So, that's there basically no matter what.

**~sarlev:** Right. I mean, some Urbit critics might say, "Oh, you're still just running C or whatever." But it seems the retort to them is, "well, I mean, even your C isn't running C." It's getting compiled and then running on whatever system that you're running on top of.

**~mastyr-bottec:** But Urbit has a path to actually move away from that. This is why we need to write these runtime migrations. So yeah, the whole migration thing is a practice in making sure when all of this Martian software is running on Earth and sometimes the Earth layer of representing the Martian paradigm is altered and it doesn't actually change the Martian expression or semantics. But it's changing the low-level ways we represent the nouns or organize them.

The other thing that is cool here is there are two Nock runtimes out in the wild, in production, now which is kind of neat. Nockchain uses NockVM or whatever they call it for their Layer 1 ZK proof-of-work blockchain. And they've really got a ton of people running computations on their runtime. I'm impressed that they've managed to actually get people to run their software-- it's not trivial to make Nockware that people actually run. There have been a number of different hobby runtimes out there that people have written that maybe are good, maybe are not. Some people have enjoyed writing as toy projects or educational projects. But writing and shipping another runtime that's actually used? That's pretty good. That's pretty cool.

_Editor's Note: Various people have written Nock interpreters as a side project as it can be a great way to really learn Nock. ~mopfel-winrux has written one in FORTRAN, TK (someone) wrote on in JS, and there are likely others out in the wild that we don't even know about yet._

**~sarlev:** What are the migration requirements and potential trade-offs for the full release of vere64?

**~mastyr-bottec:** The full release of vere64 will _ideally_ include both forward and backward migration capabilities. The backward migration (64-bit to 32-bit) would include early failure checks, such as verifying that the loom is smaller than 16 gigabytes, since larger looms cannot be migrated back. While a one-way migration would be simpler, backward compatibility is valuable for users who might want to run on lower-capability devices like Raspberry Pis. The main concern with 64-bit Vere is potential performance impact: many memory allocations will be twice as wide, meaning atoms under 4 billion will take twice the space (64 bits instead of 32 bits). This increased data volume-- more to pump through the CPU, write to memory, and read from disk-- this could result in a performance hit, though the extent is still uncertain and will be tested using our benchmark repository or something.

**~sarlev:** I think one thing that self-hosted or quasi-technical Urbiters might be be curious about understanding is that Urbit, as a single-level store, needs to load a bunch of stuff into your memory and the runtime needs to 'fool' arvo into thinking that there is no underlying difference between storage and RAM. Historically that meant that your hardware needed to have more available RAM than the size of your urbit's loom. But as you start thinking about storing larger and larger things in your loom and you get over above the available RAM of a traditional laptop or desktop computer or whatever, they might wonder how that is even possible.

**~mastyr-bottec:** Yeah. So, so I didn't write the code for this, but we already have a feature implemented in Vere called "demand paging", which is file-backed memory mapping for our snapshot/checkpoint system. If you have a ship and you check the snapshot files (either image.bin or the north and south.bin files in .urb/chk), they might be close to 8 gigabytes and you're actually only running on a machine with 2GB RAM. You can still run the ship because the runtime automatically swaps data from the snapshot in and out between your RAM and the snapshot file on disk.

We utilize POSIX APIs to tell the OS it can use that file to swap things between disk and memory as needed. And so there's some sort of offloading algorithm. I don't know it off-hand but maybe it's a sophisticated version of least recently used, or something like that. The OS takes care of it for us, we just give it hints. The OS knows that it can offload anything when the the memory pressure is too high. So it's already taken care of. So with Vere 64, I think the biggest loom you could technically have is 2^46 bytes. So it's something like 64 TiB of loom space you can have. Going forward, the bottleneck will actually be your hardware, which is cool, which is nice, right?

**~sarlev:** Yeah.

**~mastyr-bottec:** They don't have to think about, oh man, we can't even utilize the hardware we have running underneath us.

**~mastyr-bottec:** But that was how we lived. It's how we do live. It's—technically Urbit is bleeding edge, but Mars also feels kind of like Amish country doesn't it? Maybe that's not a bad thing...

**~sarlev:** Nice. So after you're done writing migrations presumably a vere64 release would get packaged up and go out to the network. What's on the horizon for runtime work after that?

**~mastyr-bottec:** The next thing I aim to do is fix the single file size limit. Even though the plan is to ship a usable production release of vere64 after migrations work, there is an outstanding limitation that I discovered (and has long been known by elders) after tinkering with a 64-bit fakezod. Specifically, there are two bottlenecks that prevent large file storage right now or just large atom storage.

The first one is that every single event that your Urbit processes is stored in an event log, which is just an append only log of all the inputs your urbit has ever received. The event log persistence layer we use in Vere is called LMDB-- Lightning Memory Mapped Database-- it's a key value store and it's actually the same key value store that Microsoft Active Directory uses, that OpenLDAP uses. LMDB can only hold values no larger than 4 GB. So LMDB needs to be replaced, and as we do that there are decisions to be made around questions like, "Do we actually want to have arbitrarily sized events stored on disk?" Because imagine you just get this 10 gigabyte file or a fresh copy of Shrek 2 3D HFR HDR 4K BluRay (lol). Okay, it gets written into your event log and then it's also in your loom... and great, now you have the file. But, first of all, it's a waste of space (since it's duplicated in the log and the loom) and second of all it's a waste of time because you have to write the same data to two different places. So figuring that out is absolutely necessary.

The other thing is that Vere implements a two process architecture. So there's the parent process and the child process. The child process is the actual Nock interpreter. It compiles and executes Nock as well as writes events and also takes and loads snapshots. It reads and writes events from and to the log and takes and loads snapshots out of and into RAM. We call that the Mars process. Then, the parent process is what we call the Urth process. Urth is the I/O drivers. It's the interface between "Earth" and Mars. So basically it take inputs from the outside world and packages them up and sends them to Mars for processing. And then Mars spits back an effect request up to the Urth process, to the parent process. Then Urth sends it out on the I/O driver, like an HTTP request, or network message to go to some other user, or something to display on the screen, etc.

And the way we communicate between those two processes is simply via IPC-- inter-process communication. IPC has a 2GB limit. It's unclear whether that's a hard cap or it just really falls over when you start to go bigger than 2. But in my testing, I can't send anything between the Mars and the Urth processes that is greater than 2GB. And so that's an issue as well. There's a shared memory design that we've talked about to replace our usage of IPC-- there are ways of relieving that bottleneck as well-- but it is but it is still a bit of an open question. So that project is on my horizon as well.

I'm not sure it that really counts as 'after' vere64 because I don't really consider vere64 to be "done" until the file size limitation is lifted, but that will come in a release after the initial vere64 production run probably, just because releasing too many big changes at once is dangerous. We want things to be stable.

**~sarlev:** Right. And I suppose the other sort of 'rolling release' effort here is making the vere64 developer preview available. The idea being developers who want to play around with what it would be like to write apps that store lots of files, they can do that a bit before everyone on the network is wondering what data to start piling into their urbit?

**~mastyr-bottec:** Yeah, and people should definitely realize that this is very much a developer preview, so it has some limitations; it'll only work with fresh ships since there is no migration path, they'll need to build it from source-- which is a good exercise to do as a developer in the first place, and there isn't going to be any explicit support for issues that arise from using the preview, although they are welcome to file bug reports or send me DMs. Technically they don't _have_ to run the vere64 developer preview to start writing things like filesharing apps, but maybe it will help some people to feel like the glass ceiling is really gone.

**~sarlev:** That's really cool. Maybe kind of heading outside of the runtime topic a little bit. I think there's been pretty clear direction on what the runtime has needed for some time, "Hey, we need a bigger loom" and your tackling that right now. There's been a bunch of forward progress in the kernel with things like Directed Messaging or Subject Knowledge Analysis (SKA) to to make networking and Nock computation faster. The other space that kind of has a lot of discussion happening in it that perhaps is a little bit more outside of your wheelhouse, but you might have an interesting "inside-out" perspective on userspace and the Urbit application model. What thoughts have you formed on the matter over the years?

**~mastyr-bottec:** Yeah. Well, can't say I've given Gall too much of a chance, and it's not like I'm some sophisticated Earth application developer that's looking for a pristine developer experience in order to win me over. But I haven't had the experience that, "Whoa! Writing an application on Urbit is amazing because Gall is a dream come true."

**~sarlev:** Do you think that's because Gall needs better dev tooling or it needs more functionality? Or perhaps it needs to actually be trying to do less?

**~mastyr-bottec:** Well, the whole composability thing was-- I think-- never really a reality, right? And I say this from the sidelines because I don't write Gall agents, but I know that there have been lots of bespoke persistence designs for handling Gall agent data. I know Tlon has gone through a bunch, graph-store's kind of the most notorious that I know of. But it seems like every Gall developer seems to come up with their own solution to data storage and that harms composability. That and because every time I update my kernel, some of my apps get suspended for being out of date. I think there is work going on there to enable "Kelvin shimming" so that this doesn't happen, but again it's a bit out of my wheelhouse so I'm not sure of the details.

**~sarlev:** Cool. Well, so I just—we've been going for a while, so I'm going give you one last question. Which is if you weren't working on Urbit, what would you be doing instead?

**~mastyr-bottec:** Because of unemployment or because we've made Urbit perfect and can move on, ha ha?!

**~sarlev:** I mean that—that's an interesting point—I wasn't ready for that kind of response but you bring up the fact that Urbit as a system is actually designed to be "done" at some point, a 'frozen' and diamond perfect kernel, rather than an ever growing ball of mud.

**~mastyr-bottec:** Well, yeah, that's the goal. That's the goal: to finish because life is bigger than the screen. And it is nice out there, outside. It's really quite nice. It's a beautiful fall day. Warm, too. We just had snow on Monday, but now it's all melted and it's-- I think it's close to 60 degrees out there. But I would be probably doing more homesteading and permaculture stuff.

**~sarlev:** So touching grass. Let's finish computers so we can go touch some grass.

**~mastyr-bottec:** Yeah, I would be going on a road trip. I'll be traveling more—going to see—going to Europe and making pilgrimages and like doing a lot more growing food and raising animals and living a good, simple life. Stuff like that, sure. I don't know. Maybe... Probably... Definitely more reading...
