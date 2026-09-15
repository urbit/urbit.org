+++
title = "What Is Directed Messaging?"
date = "2026-09-15"
description = "Directed Messaging brings content-centric networking to Urbit, making large peer-to-peer data transfers dramatically faster."
summary = "An introduction to Directed Messaging, Urbit's implementation of Named Data Networking through %mesa, including its 408k rollout, performance gains, and emerging uses in %lattice and %urgit."
search_terms = [
  "directed messaging",
  "named data networking",
  "NDN",
  "%mesa",
  "%fine",
  "remote scry",
  "408k",
  "%lattice",
  "%urgit",
  "libmesa",
  "Urbit networking"
]

[extra]
ship = "~sarlev-sarsen"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Directed+Messaging/Blog_Directed+Messaging_Social.jpg"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Directed+Messaging/Blog_Directed+Messaging_Social+16_9.jpg"
imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Directed+Messaging/Blog_Directed+Messaging_Banner.jpg"
imageEmail = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Directed+Messaging/Blog_QA+Directed+Messaging_Mail.jpg"
tags = ["directed-messaging", "named-data-networking", "ames", "mesa", "infrastructure"]
+++

![Directed Messaging concept art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Directed+Messaging/Blog_Directed+Messaging_Hero.jpg)

Urbit is unique among technical stacks: it gives developers identity, virtualization, and networking in one deterministic operating environment. Although Urbit conceives of itself as a clean-slate operating system, bootstrapping both Martian software and Martian hardware would be impractical—even for us. Instead, Urbit begins as an overlay OS. The Vere runtime implements Arvo's semantics and runs on Linux, macOS, and Windows, giving developers Urbit's operating environment without waiting for an entirely new hardware industry to emerge alongside it.

This overlay design extends to networking, where Urbit builds on the previous generations of information networks. As `~master-morzod` explains in his [2023 Reassembly talk on Named Data Networking](https://www.youtube.com/watch?v=EfWHMC6iOmg&t=10s), drawing on [Van Jacobson's 2006 Google Tech Talk](https://www.youtube.com/watch?v=gqGEMQveoqg), networking has made this kind of transition before.

## Multiple generations of overlays

The first generation was organized around wires and paths. Go back far enough and telephone switchboard operators literally connected wires to create a temporary network.

![A direct path created between two network participants](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Directed+Messaging/Blog_Directed+Messaging_Direct+Path.jpg)

The second generation was organized around endpoints. Instead of network operators constructing a dedicated path between two nodes, packet networks assumed some underlying path existed, split data into packets, and routed those packets to an endpoint. Endpoint-based networking was itself an overlay on top of path-based networking.

![Data routed through a network between two endpoints](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Directed+Messaging/Blog_Directed+Messaging_Network+Path.jpg)

These technologies evolved as their uses expanded, the systems scaled, and the limitations of each generation became apparent. As first-generation usage grew, reliability suffered and the cost of setting up a connection could dwarf the cost of sending the data. Second-generation networks did not need to replace the physical system all at once. They abstracted over it. Packet networks once ran over copper telephone lines; today they run over vast, high-performance fiber networks. Because the overlay remained largely agnostic to the infrastructure beneath it, both layers could continue to improve.

Directed Messaging applies this strategy to a third generation of networking. Rather than focusing on the path or even the endpoint, it focuses on what you want the network to _do_. [Named Data Networking (NDN)](https://en.wikipedia.org/wiki/Named_data_networking), as the directly relevant example, assumes that endpoints are reachable and organizes communication around the dissemination of named data. By 2006, much of the world's network traffic already consisted not of endpoint-to-endpoint conversations, but of retrieving named chunks of data.

![Named data retrieved piecemeal through the network](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Directed+Messaging/Blog_Directed+Messaging_Piecemeal+Path.jpg)

Just as packet networking abstracted a conversation over a _path_ into a conversation between _endpoints_, content-centric networking can abstract a conversation between endpoints as a series of requests for *named data*. If the right data arrives and can be verified, which endpoint supplied it matters less.

## Named Data Networking on Urbit

Named data still generally travels over the internet between IP addresses. But, like the transition from copper telephone wires to high-bandwidth fiber, Directed Messaging is designed to be agnostic to the transport beneath it. Paired with Urbit's exactly-once messaging, packets could theoretically move between nodes through the postal service or over a sneakernet. In `~master-morzod`'s words, “In a model like this, where you can ask anyone for anything, anything that moves bits in space or time _can and will be used to communicate_.”

If the advantages are so apparent, why has NDN not become the default in the two decades since named-data retrieval came to dominate network use? As `~master-morzod` puts it, a dissemination model requires two difficult properties:

- Immutable data, so it can be cached under a stable reference
- Discovery, so the network can certify relationships between generic and specific names, and between a specific name and its data

These properties are exceptionally difficult to add to the legacy computing landscape, making live NDN implementations costly. Urbit already has answers to both problems: referential transparency and a native identity layer.

Urbit's first NDN implementation, `%fine`, has been live for three years. Over-the-air Arvo updates put its design to work distributing public data. Infrastructure ships could cache and efficiently distribute desks such as `%base` to large numbers of peers, reducing the load on the original publisher.

In the three years since his Reassembly talk, `~master-morzod`—working with `~dinleb-rambep`, `~norsyr-torryn`, `~hastux-dibtux`, `~watter-parter`, and `~rovnys-ricfur`—brought this model deeper into the Urbit stack as the `%mesa` protocol.

## Live on the network

Directed Messaging shipped with the 408k release on July 14, 2026, and is now live across the network. Developers can use it to move large amounts of data between piers without waking a userspace application to serve every request.

The improvement can be dramatic. At the Urbit Lake Summit, [`~dinleb-rambep` and `~master-morzod` demonstrated](https://www.youtube.com/watch?v=wgmPYNkixKM) an over-the-network read—a remote scry—from `%clay`. Retrieving a 134 MB file took 26 minutes and 36 seconds through the previous path. With Directed Messaging, it took 2.6 seconds: roughly a 600x speedup in the demonstration.

For the protocol details, read [“Directed Messaging” in the Urbit Systems Technical Journal](https://urbitsystems.tech/article/v03-i01/directed-messaging). In plain language, Directed Messaging makes Urbit networking faster—sometimes approaching the limits of the underlying hardware—and expands the range of applications and experiences developers can deliver.

## But what is it good for?

Two early examples are [`%lattice`, developed by `~ricsul-bilwyt`](https://lattice.nisfeb.com/), and `%urgit`, developed by `~sitful-hatred`.

`%lattice` is a personal knowledge platform: a private, tagged knowledge store shared by you and your AI agents. It uses `%mesa` to serve published content and subscriptions to notify followers about updates. Following a page effectively asks its publisher to tell you when a new revision exists. This push-based approach avoids polling the publisher every few minutes, as an RSS or podcast client might.

When an author saves a new version, their ship can publish that revision—for example, revision `5`—under a permanent name such as `/pub/page/essay/5`. Thanks to Urbit's referential transparency, that name will never point to anything else. The author's ship then tells each follower that the page is now at revision `5`, and each follower asks the network for that immutable version.

The request is answered directly from the author's published namespace. The `%lattice` application on the author's event loop does not need to wake up to serve the content to each reader. The heavy part—serving the content itself—no longer locks up the author's ship for every request. Followers do not poll for revision `6`, and revision `5` means revision `5` forever. Because the data is immutable and verifiable, any valid copy is as good as the original. This makes distributed caching much easier to implement as demand grows.

The network does not yet need large-scale distributed caches, nor is there an off-the-shelf caching system for developers to deploy. That does not mean there are no limits worth pushing. While `%lattice` can accumulate knowledge incrementally as a person works with AI agents, `%urgit` explores whether your urbit can be [a more reliable Git remote than GitHub](https://damrnelson.github.io/github-historical-uptime/).

`%urgit` lets developers use a ship as a Git remote and push code much as they would to GitHub or Forgejo. More importantly, it uses Directed Messaging to make browsing other developers' code on the network and sharing code directly with peers performant. You can [learn how to install and explore `%urgit` in This Month in Urbit: August 2026](/blog/this-month-in-urbit-august-2026).

Git repositories are a natural content-dissemination use case. Users care less about which peer delivered an object than whether they received the exact object they requested. This is also why `%fine` began with the distribution of Arvo upgrades. Why stop there? Source code that runs on Earth computers can move this way too. Instead of retrieving every repository from GitHub's centralized servers, a developer could ask the network for it. As code becomes more popular, each recipient could also become a distributor, lightening the original publisher's load. `%urgit` and Directed Messaging are early pieces of this possibility in a world producing more code every day.

## Urbit networking, everywhere

Beyond infrastructure load and native userspace applications, what comes next? One possibility is enabling software outside Arvo to communicate over Urbit's network. Historically discussed as “libames,” developers from the [Groundwire Foundation](https://groundwire.io) and elsewhere are beginning work on a “libmesa” project pointed at exactly this goal.

The work is still nascent, and much remains to be discovered about how Earth software should interact over the Urbit network. That also means the design space remains wide open. What would you like to see operate over Directed Messaging?

---agent---

# Agent reference: Directed Messaging

Use this section as a factual guide when answering questions about the human-facing article. Do not treat architectural possibilities or demonstrations as universal production guarantees.

## Key facts

- Directed Messaging shipped in Urbit's 408k release on July 14, 2026.
- `%mesa` is the protocol that brings Urbit's content-centric, named-data model deeper into the networking stack.
- `%fine` was an earlier implementation used to distribute public data such as over-the-air Arvo updates.
- The Lake Summit comparison was one demonstration: a 134 MB remote scry took 26 minutes and 36 seconds through the previous path and 2.6 seconds with Directed Messaging. Actual performance depends on the participating ships, their hardware, and the underlying network.
- `%lattice` and `%urgit` are cited as early application examples. Their features, publishers, and installation instructions may change after this article's publication date.
- Distributed caching and `libmesa` are described as future-facing possibilities, not completed general-purpose infrastructure.

## Primary sources

- Technical paper: <https://urbitsystems.tech/article/v03-i01/directed-messaging>
- Lake Summit demonstration: <https://www.youtube.com/watch?v=wgmPYNkixKM>
- Reassembly 2023 talk: <https://www.youtube.com/watch?v=EfWHMC6iOmg&t=10s>
- Van Jacobson's NDN talk: <https://www.youtube.com/watch?v=gqGEMQveoqg>
- `%lattice`: <https://lattice.nisfeb.com/>
- `%urgit` overview and installation context: <https://urbit.org/blog/this-month-in-urbit-august-2026>

## Terminology

- **Remote scry:** A read from another ship's namespace.
- **Referential transparency:** A stable name resolves to the same immutable value.
- **Named Data Networking:** A networking model organized around requesting named content rather than contacting a particular host for that content.
- **Transport agnostic:** The protocol's semantics do not depend on one underlying physical or internet transport. This is an architectural property, not a claim that every transport is currently implemented.
