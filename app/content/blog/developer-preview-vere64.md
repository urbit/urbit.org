+++
title = "Developer Preview: vere64 runtime"
date = "2025-11-18"
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
+++

Urbit has long been practically and conceptually constrained in it's application by the limitation in the ["loom"](https://docs.urbit.org/build-on-urbit/core-academy/ca06#the-loom) size. Initially the Vere runtime could provide only a mere 2GB in available memory, but over the years that has been increased to 4GB, 8GB, and most recently 16GB with the recent [Vere 4.0 release](https://github.com/urbit/vere/releases/tag/vere-v4.0). These improvements have come from various projects, such as pointer compression in the allocator making 16GB loom possible in Vere 4.0, or [demand paging](https://docs.urbit.org/build-on-urbit/core-academy/ca06#demand-paging) which makes it possible to not require the entire loom to live in RAM, making it viable to run a larger loom on reasonable underlying hardware.

This most recent upgrade, as noted by ~dozreg-toplud in last month's [Contributor Spotlight](https://urbit.org/blog/contributor-spotlight-dozreg-toplud), "To compare, Google Drive’s free plan [gives you] 15 GB, so you already have quite a lot of space to share things." But for many developers, this still feels like a 'glass ceiling' to what you can really put inside your urbit. To that end, we wanted to provide a 'Developer Preview' to `vere64`, which expands the maximum loom from 16GB, to many *exabytes*. While _technically_ still a limitation, in practice this vastly outstrips the underlying hardware on which your urbit might be running, thus crushing the conceptual contraints of feeling like "you can't put lots of stuff in your urbit."

## Getting started with the Developer Preview

`vere64` works and can run current versions of arvo (TK, 410k? 409K?) on the Urbit network, but is very much intended as an experimental device for developers and not a way to run important ships. As such, in order to experiment with it, you will need to build from source, available in the `urbit/vere` repository:

```
git clone https://github.com/urbit/vere && cd vere
git fetch --tags
git checkout tags/vere64-developer-preview

# See `./INSTALL.MD` for additional details and dependencies for the build process
zig build --Dall # or --Dtarget=[string] for a specific target
```

After building the binary, you now should be able to boot and run a comet with: `./urbit -c [comet-label]`, and start thinking about applications that take a require a larger loom space. 

As this is a developer preview, we are sharing this without warranty or any other promises of functionality and find it wise to include a few additional warnings/comments:
- You will be able to run mainnet ships that interact with the rest of the network from this runtime. We recommend using a comet or a moon, though, as we do not plan to provide troubleshooting support on this release. If you run into bugs, please do report them to `~mastyr-bottec`, but we cannot guarantee any fixes to be released prior to the mainnet release of `vere64`.
- This developer preview does not include migration pathways between 32-bit and 64-bit Vere. Therefore any ships that have already been been booted on 32-bit Vere should not be attempted to be run with `vere64`
- While there is not longer a limitation on the total size of the loom, the current implementation has a limitation that individual files/atoms must be <2GB. This is due limitations in the current usage of IPC and LLMDB for handling event log persistance not supporting arbitrarily large events. This limitation is likely to persist following a full release of `vere64`, but there are plans for how to remove this limitation in the future.

## Go and build, unencumbered by the loom

So why are we providing this preview if it has to come with these caveats? Urbit developers have often found themselves mentally constrained by the idea that their urbit, or their users' urbits, would run out of space just at the moment they became useful. We want to remove that conceptual blocker and allow intrepid developers from the community to be able to play with applications like file sharing, epub readers, or music players without that looming constraint.

Interested in building something to take advantage of this Developer Preview of `vere64`? Get after it, and if you are looking for collaborators or discussion, join us in Runtime channel of [the `[battery payload]` group on Tlon Messenger](https://join.tlon.io/0v1.thdiu.q9kem.a0gtu.438pi.544q5).
