---
title: "What Is Directed Messaging?"
source_kind: "blog"
canonical_url: "/blog/directed-messaging"
human_md_url: "/blog/directed-messaging.md"
agent_mode: "dedicated"
dependencies:
  - "/blog/this-month-in-urbit-august-2026.md"
related_pages:
  - "/blog.md"
  - "/blog/this-month-in-urbit-august-2026.md"
  - "/blog/directed-messaging.md"
---

Human-oriented content: /blog/directed-messaging.md

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
