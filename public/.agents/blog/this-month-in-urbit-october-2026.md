---
title: "This Month in Urbit: October 2026"
source_kind: "blog"
canonical_url: "/blog/this-month-in-urbit-october-2026"
human_md_url: "/blog/this-month-in-urbit-october-2026.md"
agent_mode: "fallback"
dependencies:
  - "/overview/running-urbit/get-urbit-id.md"
  - "/blog/glurff-because-it-would-be-funny.md"
related_pages:
  - "/blog.md"
  - "/overview/running-urbit/get-urbit-id.md"
  - "/blog/glurff-because-it-would-be-funny.md"
  - "/blog/this-month-in-urbit-october-2026.md"
---

Human-oriented content: /blog/this-month-in-urbit-october-2026.md

# This Month in Urbit: October 2026

October brings Sign in with Urbit, new ship managers and mobile clients, Glurff, Heathcliff, browser utilities, and tools built for their owners.

- Date: 2026-10-30
- Author: ~sarlev-sarsen

![October 2026 This Month in Urbit artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+October/Blog_TMIU+October_Hero.jpg)

Welcome to This Month in Urbit. This is month #7 of doing these recaps and things are officially heating up. We have disclaimed before that Urbit is a decentralized and distributed network, such that we can't know everything that is happening for certain. But this month is the first month where we know for a fact that we are leaving out cool projects because there is just too much going on!

Want to know more about what is happening on the network? Boot a planet and ask around!

![Running an urbit — October 2026 artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+October/TIMU+October_B.jpg)

As always, the Urbit community offers a growing variety of ways to run an urbit ship if you have an [Urbit ID](https://urbit.org/overview/running-urbit/get-urbit-id):

- The bare bones `vere` runtime you can get with the urbit.org `get-runtime` script:

  ```sh
  curl -fsSL https://urbit.org/get-runtime.sh | sh
  ```

- `~migrev-dolseg`'s [python script](https://hawk.computer/-#installation-), with just a `uv` dependency:

  ```sh
  uv run https://hawk.computer/-/try
  ```

- `~fidzod-fidfes` has [Orraah](https://orraah.com) which works across Windows, MacOS, and Linux.
- [Dappnode](https://dappnode.com/en-us) has joined [Umbrel in having recipes to run urbits](https://apps.umbrel.com/app/urbit) using their software and devices as well, which `~dirted-pallup` then [forked](https://x.com/quantumtekh/status/2114545781529248224) and turned into [his own thing](https://github.com/OwlWilderness/dappnode-urbit)!

Or, particularly if you don't have an Urbit ID (yet), you can get a free hosted planet from Tlon by [clicking this link](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17). This will drop you into the Urbit Foundation public group where someone will be more than glad to show you around. If you then want an identity to experiment with, run `|moon` in your dojo to get a subservient identity which you can use to boot a local node.

If you want to boot from the October "This Month in Urbit" pill, run:

```sh
urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-october.pill --http-port 8899
```

## Before putting anything in your Arvo

![Before putting anything in your Arvo — October 2026 artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+October/TIMU+October_A.jpg)

There are a few new projects around the network that won't quite touch your Arvo. First up is a spotting of [an 'in the wild' instance](https://cancel.tylerirl.com/) of ["Sign in with Urbit"](https://x.com/urbit/status/2110469929657143551?a=VPRAL9DVmkh1xUcC0kM&s=20) using EAuth from the Milady corner of the future internet. If you have a running ship, click the big glowing Urbit ID button to sign in to `~raddem-tidwyt` and play "the cancel is coming". No need to install a new desk, and you don't even need a Milady to enjoy it.

Making use of the same EAuth mechanism is [Duel Duet](https://wisbyr-pollec.com/+/duel-duet) from `~migrev-dolseg`. A musical game, you can play as a guest, log in with your urbit, and even join into the multiplayer ['Atlantis'](https://wisbyr-pollec.com/+/duel-duet?room=atlantis) room and play with others.

For those who aren't quite ready to run their own Arvo, but have an Urbit ID and are looking to experiment, reach out to `~datder-sonnet` to learn about [azimov.network](https://azimov.network). It is an implementation of a WireGuard network that uses your Urbit identity to enable connections between UNIX computers without exposing yourself to the open internet. Instead of fighting with Tailscale to figure out how to add and grant users access to select self-hosted services in your homelab, just give their `@p` access and call it good.

Also not quite ready for your Arvo, but certainly turning heads, is `~littel-wolfur`'s "Aero". It hasn't quite escaped his clutches (in no small part because [Apple loves making it hard to ship iOS apps](https://x.com/littel_wolfur/status/2115576497092350249?a=uGcTneZyWMHnO67GDvs&s=20) to your friends), but it's [a bespoke mobile launcher](https://x.com/littel_wolfur/status/2113073684227461618?a=hptQ3mfcXK4F6AqKDp0&s=20) for compatible Urbit apps. He's even got it working for `~nomryg-nilref`'s [`%obelisk`, `%graph-viz`](https://x.com/littel_wolfur/status/2113779331810148464?a=Hu_SPh5XAGIs1BeR3jU&s=20), and new [`%heathcliff`](https://github.com/jackfoxy/heathcliff) apps, as well as `~sitful-hatred`'s [`%urgit`](https://x.com/littel_wolfur/status/2114902550193557723?a=gxb6UAvZMACKP7bPiv0&s=20).

## More from the Milady universe

![More from the Milady universe — October 2026 artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+October/TIMU+October_C.jpg)

The Milady adjacent 'Network Spirituality' cohort is finding itself [intersecting with the Urbit network yet again](https://x.com/davetist/status/2112943823550865636?s=20). In addition to the previously mentioned 'Sign in with Urbit' appearance, `~firmel-rovmyl` has been putting in work to add to the list of ways to run and manage your ship: [Harbor](https://github.com/davetist/harbor). Inspired by the now-deprecated "Port" of the early 2020s, Harbor supports MacOS and Linux across both x86 and ARM architectures. He is also working on `%urbitwarden` and `%connect` to be able to use your ship as your Bitwarden server. Given the security requirements for such an application, public release will be pending Gall 2026 userspace security work.

The other network overlap comes in the form of the [Nockmilio project from `~buswel-lagpyl`](https://x.com/wiggerborea/status/2106112273337258097?a=-QmfWOwgIxOTSazM5aE&s=20). 1-part Nockchain, 1-part Remilio, and 1-part Urbit, Nockmilio sits at an intersection of sovereign computing and has [a strong cohort of Urbiters looking to make sure Telegram isn't the digital home of such a community](https://x.com/sarlev_/status/2114504843109060778?a=R89Uiw63oeMFPzOrTG8&s=20), and building [software to make NFT gated communities on Urbit](https://github.com/thelifeandtimes/gater). *Author's Note: It's me. I'm building that software. There is no reason for Telegram to exist when we have Tlon Messenger.*

## Agent-enabled experimentation continues

![Agent-enabled experimentation continues — October 2026 artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+October/TIMU+October_D.jpg)

`~lagrev-nocfep` has been a regularly mentioned contributor in these articles, and this month is no different. He's managed [APL to Nockasm compilation](https://x.com/sigilante/status/2115199409134968934?a=ptdy5hp-X8jj3T1Xixg&s=20), and theorizes that with [UrWASM and Jock you could get compilers for many more languages in just a few days](https://x.com/sigilante/status/2115248217596338253?a=NySaNyMX7PiahK6LpKk&s=20).

That, though, is the more sane of the experiments we came across this month. The other one worth mentioning? ["Lamp for Nock"](https://github.com/rogueinsiderpodcast-hub/Lamp-for-nock) which runs Nock without `libc`, a bootloader, a disk, or even any OS at all. Sure, it also lacks networking, but "The only piece of hardware it touches is the 16550 serial port at 0x3f8, polled, one byte at a time" is pretty damn cool nonetheless.

## More apps on the network

![More apps on the network — October 2026 artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+October/TIMU+October_E.jpg)

Of course, we started this article by encouraging you to boot a ship—why so if we don't tell you about apps from around the network?! There are a few good mentions this month.

As we covered in our recent article, ["Glurff, because it would be funny"](/blog/glurff-because-it-would-be-funny), `~disden-talhes` has built `%glurff` as an interface on his `%noltbook` creation:

```hoon
|install ~nolset %noltbook
|install ~nolset %glurff
```

If you enjoyed the creativity of Glurff, you may also like `%fhloston-poker` from `~foghet-filweb`:

```hoon
|install ~forbes-marmet %fhloston-poker
```

Play heads up Texas Hold 'Em with other urbiters and build up your winnings and your reputation as the most cut-throat card shark on the network.

`~nomryg-nilref` continues to ship updates to `%obelisk` and `%graph-viz`, this month providing them interfaces from his new UI framework, ["UrUI"](https://github.com/jackfoxy/urui). He also has a fresh app release this month: `%heathcliff`:

```hoon
|install ~dister-nomryg-nilref %heathcliff
```

`%heathcliff` is a feature-packed Clay filesystem explorer for your urbit. Browse your desks, edit text, preview files, manage permissions and more.

Not to be left behind in the land of useful tools, `~mopfel-winrux` of [Native Planet](https://nativeplanet.io) released `%utilities`: 25 browser apps you install from your ship. Install it on your ship:

```hoon
|install ~nattyv %utilities
```

Then open `<your-ship-url>/utilities/` and install the apps you want with one click. Each app runs in your browser, with its assets served from your own ship. Apps that use external networks, such as the Nostr clients, still connect to those services. Most work offline, and each one can be added to your phone or desktop as a Progressive Web App (PWA). There are many options at present:

- Files and media: VERT (file converter), BentoPDF, Squoosh, Mazanoke, miniPaint
- Diagrams and docs: Excalidraw, draw.io, Mermaid, FossFLOW, Typst, Office
- Dev and data: JupyterLite, Sqlime, CyberChef, IT Tools, Omni Tools, Networking Toolbox, MQTTX
- Life and fun: Super Productivity, Enclosed (burn-after-reading notes), Kiwix (offline Wikipedia), Snort and noStrudel (Nostr), EmulatorJS, js-dos

Excalidraw, Office, JupyterLite, Super Productivity and Enclosed save your data to your own ship.

As `~mopfel-winrux` puts it, "the one thats fun is the office one, you have libre office as wasm app and your files get saved to your urbit with webdav." If you are curious to learn more about how it works, check out [the repo on GitHub](https://github.com/mopfel-winrux/urbit-utilities) and shoot him a note with any questions you may have about how to contribute more software that runs in this manner.

## Building tools that work for you

![Building tools that work for you — October 2026 artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+October/TIMU+October_F.jpg)

A growing theme—which we will touch on more next month—is the intrepid Urbiter who is building tools for themselves, that work the way they want and don't farm their data out to SaaS providers and hyperscale datacenters. `~ricsul-bilwyt`'s growing `~nisfeb` Software ecosystem (with apps like [Talon](https://talon.nisfeb.com) and [Lattice](https://lattice.nisfeb.com)) came from this drive. But he is not the only one.

`~sitful-hatred` has implemented x402 payments to build payment gated pages on Urbit. It publishes a selected feed of Tlon `%notes` and enables the publisher to charge a subscription to be paid in an EVM/EIP-3009 token transfer. Getting a bunch of bot traffic to your site? Try giving them a way to pay you with the [reusable Hoon library](https://github.com/yapishu/domheap/blob/master/desk/lib/x402/README.md)...

Building on top of an `%obelisk` foundation, `~dinnyt-divsud` has been working towards putting more and more of the [Atlas Arms](https://atlasarms.com) business on Urbit. For example, his [Integrated Ballistics Lab](https://dinnyt-divsud.startram.io/apps/urgit/public/IntegratedBallisticsLab) software is both stored in an `%urgit` instance on his ship, and the ballistics data is stored inside an `%obelisk` database. It runs the computation off-ship, given the compute requirements, but by putting the database in Urbit, he can easily integrate it with his `%erpit` ERP system with the future goal of being able to provide customers with detailed testing data for the exact purchases that they made, all without needing a 3rd party service provider.

## Whisperings of the future

As we mentioned before, there is more building happening on the network than ever before. We hear rumors of a Directed Messaging library, usable to send Ames packets between Urbit IDs without needing a running Arvo. People are building multiplayer Omarchy plugins using Urbit as the identity layer and backend. There might even be a forthcoming natural language interface into Azimuth for easier management of your Urbit ID. And perhaps even something having to do with Halo...

The only way to truly know? Get on the network and explore for yourself!
