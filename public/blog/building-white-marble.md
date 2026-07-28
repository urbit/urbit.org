# Building White Marble: Capital, Membership, and Software on Urbit

White Marble Syndicate connects member-governed data, local AI compute, and portable software through Urbit.

- Date: 2026-07-28
- Author: ~sicdev-pilnup

![White Marble Syndicate](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+White+Marble/Blog_white+marble_Hero16_9.jpg)

Models are getting smarter, and the private data they need is getting more valuable.

Early large language models trained across large portions of the public internet. New gains increasingly depend on material that is harder to find: private code, specialized research, institutional records, and the accumulated context of real communities. AI providers want access to more of what their users know.

Examples abound. In July 2026, a security researcher [reported that xAI's Grok Build CLI uploaded complete local Git repositories](https://cryptobriefing.com/xai-grok-build-cli-private-code-leak/), including untracked files and secrets, to cloud storage. The CLI's opt-out toggle reportedly did not stop the transfer. Amid the hubbub around Mythos' alleged cybersecurity and CBRN risk, [access to the frontier of intelligence required 30-day retention](https://www.digitalapplied.com/blog/fable-5-30-day-data-retention-zdr-enterprise-2026), while zero-data-retention terms remained available for less capable models.

Naturally, Providers don't want the heat of "we're hoovering up all the data we can get our hands on," so they cite safety, telemetry, better answers, and model improvement. And in the meantime, Users have little power over how those incentives or terms change. White Marble Syndicate is a pushback to that model. It aims, instead, to keep a community's distinctive corpus and conversations under member control. As models become more interchangeable, that private data becomes the asset.

## Build With What Exists

The work began during a period of uncertainty in the Urbit ecosystem in the summer of 2024. Core development, funding, and organizational responsibilities were in motion. `~lagrev-nocfep`, `~hanfel-dovned`, and `~sarlev-sarsen` wanted a project that did not depend on a radical change to Urbit itself. They asked what Urbit could do today.

Urbit already supplied persistent identity, pseudonymous peer-to-peer networking, private application state, and software a small group could control. By September 2024, they called the idea Privateer. The initial plan paired Urbit with [Tinybox-class machines](https://tinygrad.org/#tinybox) and other local hardware for community-controlled AI inference. A group could pool resources, run a model, and eventually sell unused compute to trusted peers.

The sovereign hardware thesis survived, but the center moved. Hardware became more expensive while open models became much more capable on modest machines. A gaming PC, workstation, or homelab could now run useful models. Compute looked increasingly interchangeable. The scarce part was the data.

As `~sarlev-sarsen` emphasizes, "It's the data. It's the sovereignty. It's the corpus of information that you're actually operating over. A model can be replaced as capabilities and costs change. A carefully assembled body of knowledge, with provenance, translations, commentary, and the judgment of the people curating it, develops value over time. It is harder to recreate and easier to lose."

The White Marble Syndicate emerged that fall as the first focused test. Its mandate is "to acquire, preserve, and use scholarship concerning the ancient Greek and Roman world." The corpus is bounded enough for retrieval-augmented generation on relatively small models, but rich enough that selection, provenance, translation, and scholarly disagreement matter.

`~lagrev-nocfep` explains more about why this specific corpus served as a starting point for the project:
> "We chose to focus on classics and classical scholarship for a few convergent reasons:  there is an ample but enumerable corpus from the ancient world, there are a large number of public domain translations, the languages themselves are pretty good with machine translation tools, and there has been substantial scholarly work carried out over centuries which is reasonably straightforward to import.
>
> In addition, unlike some other topics, there is a fairly bright line delimiting what is and is not classical scholarship:  we would countenance Byzantine Greek or Etruscan, but not, say, Egyptian."

Building out the vision laid out before them required three connected systems: capital formation, membership coordination, and software distribution.

## Capital Formation

![White Marble capital formation](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+White+Marble/Blog_White+Marble_Capital+Formation_16x9.jpg)

Collecting a serious library and running local inference cost money. White Marble solicited cash contributions through [`%fund`](https://github.com/tocwex/fund), a crypto-backed peer-to-peer fundraising app built by [`~tocwex.syndicate`](https://syndicate.box)--but run directly on `~pondeg`, the star owned and operated by the White Marble DAO. The campaign paid for initial corpus curation, AI research tools, compute, and infrastructure.

Some backers contributed through accounts associated with their Urbit IDs. Others used only an Ethereum keypair. The campaign needed no email list, card numbers, or third-party payment processor. By August 8, 2025, it had raised $2,800. The modest sum was enough to test whether a small, distributed group could capitalize a useful service with existing tools.

While initial contributors received one, manually-distributed, `$WHTMRBL` token for each $100 contributed, membership no longer depends on the original crowdfunding campaign. The [White Marble website](https://whitemarble.ai) now uses a distribution contract that exchanges 100 USDC for one `$WHTMRBL` token. New members can enter through the same wallet-based system without asking an administrator to recreate the original `%fund` drive.

## Membership Coordination

![White Marble membership coordination](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+White+Marble/Blog_White+Marble_Membership+Coordination_16x9.jpg)

`$WHTMRBL` is a membership record, voting instrument, and portable software credential. The [bylaws](https://whitemarble.ai/blog/posts/bylaws.html) define a member as anyone holding at least one token, with one vote per complete token. Members can bring a motion with support from five percent of issued tokens, and amendments require a two-thirds vote with quorum. They collectively own the library, treasury, website, forum, repositories, AI-generated outputs, and `~pondeg` itself. A board and named administrators handle the work between votes.

White Marble deployed the token through [`%slab`](https://github.com/tocwex/slab), the `~tocwex.syndicate` launchpad, using Syndicate contracts that associate `$WHTMRBL` with the `~pondeg` NFT. The owner of `~pondeg` controls token issuance. Putting `~pondeg` in a wallet governed by `$WHTMRBL` holders would close the loop. The fungible membership token would control the non-fungible identity, which controls the computer running the Syndicate's software.

Members already use the token as a software key. They sign into the [White Marble portal](https://portal.whitemarble.ai/apps/privateer) with the Ethereum wallet holding `$WHTMRBL`, even if they do not own an Urbit ID or run a ship. But if they *do* have an Urbit ID, in the same wallet as their membership token, software running on `~pondeg` will automatically invite them into the members-only Tlon Messenger group.

## Software Distribution

![White Marble data sovereignty](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+White+Marble/Blog_White+Marble_Data+Sovereignty_16x9.jpg)

White Marble's software has two layers, both of which run natively on urbit: `%privateer` and `%computeer`.

`%privateer` is the member and library-management side. Its agents run on `~pondeg`, verify `$WHTMRBL` ownership, store member sessions, serve the library and chat interface, and provide a private forum for acquisitions and corpus development. The authoritative conversation history and application state persist on the collective's Urbit.

`%computeer` is the inference side. Its core agent runs on a ship beside an inference engine, in this case AnythingLLM layered over vLLM, and controls which `%privateer` ships may submit requests. It supports request allowances, unlimited access, and model selection. White Marble does not currently use automated USDC payment or metering, but the optionality exists. 

For the software architecture, `~hanfel-dovned` explains the thinking behind the split:

> "White Marble's technical ethos has always been to skate to where the puck is going. We quickly realized that as open-source models got smarter, compute wasn't going to be a bottleneck for basic LLM chat. Similarly, the Hoon we wrote to do sidecarred inference was innovative in 2024, but by now everyone's got their own version.
>
> The split between %privateer and %computeer was in anticipation of this. %computeer is a thin compute provisioner that you could swap out for anything. The scarcity lies in %privateer, the part that defines group membership and stores the data."

In the current state, White Marble operates both sides. `~sarlev-sarsen` runs the models directly. Full conversations cross Ames to this trusted `%computeer` node for processing, and no third-party inference provider receives them. `%privateer` stores the authoritative history on `~pondeg`, so the collective owns the resulting data rather than a frontier lab that may retain it, change its terms, or train against it.

Privacy here rests on a small-community trust relationship. The compute operator and administrators can access infrastructure and diagnostic information. Members know who operates the model, where the durable copy of their sessions lives, and which organization is accountable for it. The guarantees are social and backed by community-controlled infrastructure; they do not provide cryptographic confidentiality.

### Ames as a Compute-Sharing Network

Because requests between `%privateer` and `%computeer` travel over [Ames](https://docs.urbit.org/urbit-os/kernel/ames), Urbit's encrypted peer-to-peer network, the model endpoint never needs public exposure.

This removes a barrier to small-scale compute sharing. Letting another community reach a model in your home or office normally means opening ports, configuring a reverse proxy, managing certificates and changing addresses, or setting up an overlay network. Tailscale is very good, but it still adds another network, account system, and access-control layer for participants to coordinate.

Instead of dealing with those extra layers, a community can point `%privateer` at a provider's Urbit identity without exposing the model server or negotiating inbound port forwarding, and all the provider needs to do is allow that Urbit ID in `%computeer`. 

This is a minor convenience for an inference provider in a data center. For the 'provider' that is a friend's gaming PC under a desk or a GPU in a homelab, it changes what is practical. And for those looking for trustworthy inference, instead of complex "Trusted Execution Environments" (TEEs) or Terms of Service, the relationship is "We are friends, why would I spy on you? That's gross." 

And if you stop being friends? As `~hanfel-dovned` noted, layers can also evolve independently. White Marble can change providers without changing membership or moving its authoritative library. A `%computeer` operator with spare capacity could serve another `%privateer` community whose durable state remains separate. Compute becomes a service between known peers rather than an API key purchased from an untrustworthy cloud.

## From Promised Governance to Technical Enforcement

There is a long road to travel betwen the current state of the project, and the idealized future. White Marble is already member-controlled as an organization, but from the governance perspective the next step is making that control durable across the technical stack. Future smart contracts and voting tools will give members authority over treasury policy, token issuance, administrator appointments, operating budgets, corpus changes, and the star itself.

The design for a closed loop still needs opportunities for judgment from trusted roles, and release valves to prevent accidentally lost assets or malicious 'governance attacks'. Curators should have latitude to curate, compute operators should be agile enough to maintain compute, and routine maintenance should not require a constitutional vote. But with the bylaws defining the 'political' system, The technical work now is deciding which decisions to enforce automatically and which to leave with accountable people (and how to keep those people accountable).

Once that enforcement layer is implemented, while a breach can reset `~pondeg`'s network continuity and keys and effectuate pulling control from an operator, it cannot transfer the pier, corpus, or session history. So durable exit also needs member-controlled backups, data exports, deployment credentials, and tested restoration procedures. Ideas the project is exploring include permissioned uploads to, and retrieval from, IPFS, or federating session data our to members who run software on their own urbits, thus enabling the sharding of syndicate data over the membership.

### The Next Advancement

All that said, the lowest hanging fruit is sharpening the fuzzy divide between `%computeer`'s control of compute and `%privateer`'s control of data. Earth-side software--[AnythingLLM](https://anythingllm.com/)--is used for Retrival Augmented Generation (RAG), which means the corpus data drifts out of `~pondeg` and into the hands of the compute provider. But there is work underway to do vectorized embeddings and subsequent session context construction natively in `%privateer`, with just select pieces of data going out to the `%computeer` provider.

When completed, doing RAG on the star controlled by the membership will strengthen the claim that, if operators stop serving the membership, members are able to replace them and move the infrastructure, without having given up the most valuable assets: their corpus of data. 

## From Collaborative Community to Distributed Network

Certainly, White Marble aims to be useful to its membership in its own right, but the true goal is that the design replicates outward and in interwoven ways. Interwoven replication means another community adapts the structure and piggybacks on existing resources, creating syndicates that collaborate piecemeal across relationships and resources as needs emerge. A group could assemble medical research, legal history, or private organizational memory. It could define membership through a Syndicate token, serve members through `%privateer`, and select a `%computeer` provider over Ames, perhaps even purchasing compute from White Marble before growing large enough to run its own compute.

Few communities should copy White Marble exactly. With the software already written, another group may not need a crowdfund. But certainly communities should not have to surrender their memory to use intelligence against it. White Marble gives other groups a working structure to test, alter, or reject. The next useful result will be another community trying it.

Learn more at [whitemarble.ai](https://whitemarble.ai).

---

*Disclosure: Some members of the Urbit Foundation and broader Urbit community have a direct stake in White Marble. This article describes the project as a case study and is not an endorsement of the token.*
