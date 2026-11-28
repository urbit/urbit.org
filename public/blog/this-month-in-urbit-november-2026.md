# This Month in Urbit: November 2026

November brings Omabit, anonymous Lattice browsing, network visibility tools, new apps, Nockchain's Open Proof Machine, and Tlon Buckets.

- Date: 2026-11-27
- Author: ~sarlev-sarsen

![November 2026 This Month in Urbit artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+November/Blog_TMIU+November_Hero.jpg)

Welcome to This Month in Urbit where we share happenings from around the network and interesting experiments from the community.

Ready to get started? You'll need a running urbit and a curious attitude!

This month we add to the ways that you can get on the network. As always, you can get the default `vere` runtime:

```sh
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

and then boot into a moon with the November "This Month In Urbit" pill:

```sh
urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-november.pill --http-port 8899
```

But we also have 2 other ways to access the network which are worth mentioning:

## Self-hosting on Omarchy

![Self-hosting with Omabit — November 2026 artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+November/TIMU+November_Omabit.png)

First up, for any new [Omarchy](https://omarchy.org) users, check out `~sarlev`'s ["Omabit" plugin](https://x.com/sarlev_/status/2118782598751375406) which gives you an agent-assisted way of self-hosting Urbit OS on your Omarchy instance. Getting started is as simple as running the following command in your preferred Omarchy terminal:

```sh
omarchy plugin install https://github.com/thelifeandtimes/omabit --enable
```

From there, just click through the setup to install the urbit runtime and dependencies and you'll have a nice little Omarchy plugin that can boot and run urbits (both livenet ships and fakeship development instances) for you and your friends. Omabit comes with a built-in 'Agent Help' button so that your default AI can help you with any troubleshooting issues you may have. Already have your own more bespoke Agent setup? It has comprehensive CLI and MCP interfaces so that you can wire up your agents to maintain your local fleet.

And to put the icing on the cake, you and your agents can use Omabit to manage a fleet across any compatible Linux system to which you have `ssh` access. This gives Omarchy users the opportunity to self-host ships on their personal workstation, run development ships on their laptop on the go, or even manage them in a VPS.

## Skipping hosting with `libmesa`-based Lattice browsing

Perhaps you aren't quite ready to host your own ship. Maybe you just want a little trial view into *some* of the content on the network? Lattice, by this month's spotlight contributor `~ricsul-bilwyt`, now features a sort of 'public-network, view-only trial' feature. Building off [`libmesa` from `~mopfel-winrux`](https://github.com/mopfel-winrux/libmesa), Lattice now supports browsing of the public content available on Lattice--without having to boot an instance of Urbit OS!

Download the Lattice desktop app from [lattice.nisfeb.com](https://lattice.nisfeb.com) and after opening it for the first time just click 'Browse anonymously' and you will be able to access content served directly to you over Urbit's peer-to-peer, end-to-end encrypted network. Granted, all the content you will be able to see is served publicly so you can debate the usefulness of the encryption. But if that's bothering you, just boot a ship and run Lattice directly to access more selectively available content!

## Accountability and Network Visibility

![Accountability and network visibility — November 2026 artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+November/TIMU+November_Visability.png)

As you boot a ship, or begin to explore the network via Lattice's Ames browser, you'll begin to intuit the importance of network participation. Want people to link to your Lattice pages? Probably good to be online. Need help getting your ship up and running? Having a devoted sponsor goes a long way.

Of course, accountability requires visibility. In order to give network participants a better view into the connectivity landscape, `~lagrev-nocfep` put together `%accountability`, an app that allows you to tell at a glance if your galaxy sponsor is a deadbeat.

Install it with:

```hoon
|install ~magbel %accountability
```

We can't be sure, but we then have to assume `~raddem-tidwyt` [saw this and said, "hold my beer"](https://x.com/itsTylerIRL/status/2117000213265338471). And built `%sextant`.

1-part `%accountability`, 1-part `%hits`, 1-part `%astrolabe`, and 1-part `%pals` frontend, `%sextant` gives an information-packed interface for understanding the topology of the Urbit Network. Live ships, sponsorship trees, known booted moons, published software from your `%pals`... All of it accessible in a beautifully designed and presented interface.

Install it with:

```hoon
|install ~nosfyl %sextant
```

An amazing "yes, and..." to `~lagrev-nocfep`'s idea of drawing forth accountability via visibility.

## Buyer Beware experiments

![Buyer beware experiments — November 2026 artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+November/TIMU+November_Caution.png)

In an extension of this question of accountability, here are two random projects from people we have to admit we don't really know... Naturally, we are stoked to see people building on Urbit--we just will say 'check out these experiments with a little bit of caution.'

`~famrel` makes [the claim that they are working to integrate Urbit](https://x.com/singularityhack/status/2117465846503141488?a=SXINZ7IEkReQIp4fKBk&s=20) into their [Claw Bank](https://clawbank.co/) tooling, giving AI agents the ability to form a company, open a bank account, sign enforceable Ricardian contracts, and even potentially take out bank loans.

Similarly exploring the space of enabling economic activity, [@0xSvoboda built an urbit-native wallet](https://x.com/0xSvoboda/status/2117946539549319224?a=uo-Yo2BDu2MdEQ5uouk&s=20) for the Octra blockchain. We'll put this one out with a pretty explicit warning: **DO NOT USE THIS FOR MATERIAL AMOUNTS OF VALUE**. The Gall 2026 project is working towards userspace permissions and there is a scope for security hardening work of Arvo and Vere in 2027, but today we cannot make guarantees about their security and all userspace applications can access and modify state on your ship.

That said, it is awesome to see people building towards the future they want to see, and we'll keep hardening Urbit's core until it becomes the best way to store and transact digital value.

## Having fun with things

But not everything needs to be super secure or serious. Sometimes the right move is to just have fun with things. And nobody knows how to do that better than `~disden-talhes`. We spoke with him last month in his Contributor Spotlight about `%noltbook` and `%glurff`, and now [he is expanding the Gluewear suite of apps with `%id`](https://x.com/GlueWear/status/2123075883229716963).

Designed with an 'in-person' contact exchange use case in mind, `%id` supports sharing your Urbit ID--and any other contact or identity info you chose to include--via a QR code. It carries both 'public' and 'private' card sharing, with optional fields being set to share in either or both of those modes. So next time you are about to hand a business card to a new friend, see if you can get them on urbit and have them scan your `%id` instead.

And once your new friend is on Urbit and you are looking for something fun to do together, definitely [give `%ursketch` a try](https://x.com/Sovereign_Stack/status/2116986714937786545).
~tansyr-tilbus built it to run within [Glurff](https://glurff.com), so to get playing just install both apps on your ship:

```hoon
|install ~nolset %glurff
|install ~livbec-pitsyd-botryp-hoshec--faltec-lavtel-firrup-marzod %ursketch
```

Once you have them installed, head to Glurff's gameroom and get to playing (there's also a console with Doom in there).

## Releases from the network heavy hitters

![Releases from the network heavy hitters — November 2026 artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_TMIU+November/TIMU+November_D.png)

While fun and games are one side of Urbit, there are also heavy hitters in the room delivering on more serious infrastructure and tooling.

[Nockchain just released their Open Proof Machine (OPM)](https://x.com/nockchain/status/2122406405814575568), a Zero-Knowledge virtual machine for Nock. While not strictly a VM for running Urbit OS, the OPM has end-to-end soundness for the verifier which prevents false claims about Nock computations across all 12 opcodes.

If you are curious to learn more, we highly recommend you check out the [OPM explainer on Nockchain.org](https://nockchain.org/research/zkvm) and the [zkVM page on Nock.is](https://nock.is/content/building/zkvm/). And you could always go [read the source](https://github.com/nockchain/nock-zkvm/tree/rel5.4) which is a Lean 4 formalization.

## Tlon Corporation ships 'Buckets'

And as Tlon continues to ship improvements to their Tlonbot experience, they have [released a new 'Buckets' channel type](https://x.com/tloncorporation/status/2123053866933481522) which gives a shared space for you, your friends, and all your agents to post and share files with one another. If you are looking for a fun way to collaborate with family and friends using AI, definitely give it a try. You could probably even use it as a fun way to build and share little browser games with your friends!
