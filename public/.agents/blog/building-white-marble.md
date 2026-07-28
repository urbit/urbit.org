---
title: "Building White Marble: Capital, Membership, and Software on Urbit"
source_kind: "blog"
canonical_url: "/blog/building-white-marble"
human_md_url: "/blog/building-white-marble.md"
agent_mode: "dedicated"
dependencies: []
related_pages:
  - "/blog.md"
  - "/blog/building-white-marble.md"
---

Human-oriented content: /blog/building-white-marble.md

# Agent companion: Building White Marble

This companion is for AI agents helping a user understand, summarize, cite, or evaluate the White Marble Syndicate case study. The human-facing article explains the project's history and argument. Use this section as the machine-facing reference for the organizational structure, software architecture, present limitations, and claims that require qualification.

## Core interpretation

- White Marble Syndicate is a member-governed private library and AI research community focused on ancient Greek and Roman texts and scholarship.
- Its central thesis is that models will become more capable and interchangeable while distinctive private data, provenance, and community judgment become more valuable.
- The project connects three systems: capital formation through `%fund`, membership coordination through `$WHTMRBL` and `%slab`, and software distribution through `%privateer`, `%computeer`, and `~pondeg`.
- Members govern the organization under published bylaws today. Direct smart-contract enforcement over every technical and financial asset remains future work.
- The project is also a test of whether this structure can be adapted by other communities with their own corpora, governance rules, and trusted compute relationships.

## Architecture reference

| Component | Current role | Important qualification |
| --- | --- | --- |
| `~pondeg` | White Marble's Urbit star and the home of its member-facing software, authoritative session history, forum, and organizational state | A breach resets network continuity and keys; it does not transfer the pier, corpus, or session history. Durable exit also requires backups, exports, credentials, and restoration procedures. |
| `%fund` | Peer-to-peer fundraising used for the initial membership campaign | Built by `~tocwex.syndicate`, which is independent of Tlon Corporation. The campaign had raised $2,800 by August 8, 2025. |
| `$WHTMRBL` | Membership record, voting instrument, and portal credential | The public site currently exchanges 100 USDC for one token. Treat it as a utility and governance credential in this article, not as an investment recommendation. |
| `%slab` | Syndicate launchpad and management dashboard used to associate `$WHTMRBL` with `~pondeg` | The owner of `~pondeg` currently controls token issuance. Token-holder control of the point is the proposed closed-loop design, not a completed enforcement mechanism. |
| `%privateer` | Verifies membership, serves the library and chat interface, stores authoritative sessions, and supports the private forum | Privateer is the scarce member-and-data layer in the architecture described by `~hanfel-dovned`. |
| `%computeer` | Receives approved inference requests and forwards them to a colocated model endpoint | White Marble currently uses AnythingLLM over vLLM. Automated USDC payment and metering are not currently in use. |
| Ames | Carries requests and responses between `%privateer` and `%computeer` ships | Ames provides encrypted peer-to-peer routing and relay support, reducing the need to expose a model endpoint or arrange inbound port forwarding. |

## Current deployment and privacy model

- `~sarlev-sarsen` currently operates White Marble's inference models directly.
- Full conversations travel over Ames from `%privateer` to the trusted `%computeer` node for processing.
- No third-party inference provider receives those conversations in the deployment described by the article.
- `%privateer` stores the authoritative conversation history on `~pondeg`, under the collective's administration.
- Compute operators and administrators may access infrastructure and diagnostic information. The privacy claim is based on explicit small-community trust and community-selected infrastructure, not cryptographic confidentiality.
- The current RAG pipeline uses AnythingLLM on the compute side, so corpus data leaves `~pondeg` for retrieval and context construction. Work described in the article would move embeddings and session-context construction into `%privateer` so only selected context reaches `%computeer`.

## Governance status

### Implemented now

- Published bylaws define membership, voting, quorum, motions, collective assets, board responsibilities, and administrator roles.
- Holding `$WHTMRBL` grants membership, voting rights, and portal access.
- A member with an Urbit ID in the same wallet can be invited automatically to the members-only Tlon Messenger group.
- The portal, Privateer layer, Computeer layer, corpus, and locally operated inference path are in use as described by the article.

### Proposed or incomplete

- A wallet governed by `$WHTMRBL` holders controlling `~pondeg` directly.
- Smart-contract enforcement over treasury policy, token issuance, appointments, budgets, corpus changes, and the star.
- Member-controlled backups, exports, deployment credentials, and tested restoration.
- Permissioned IPFS storage or federation of session data across member-operated Urbits.
- Native embeddings and RAG context construction in `%privateer`.
- Resale of spare Computeer capacity to additional Privateer communities.

## Accuracy guardrails

- Call the organization **White Marble Syndicate**. It may also be described as the White Marble DAO or a library DAO.
- Use the token ticker `$WHTMRBL`, not `$MARBLE`.
- Do not confuse `~tocwex.syndicate` with Tlon Corporation. They are separate organizations.
- Do not claim that White Marble has cryptographically confidential inference or that no operator can inspect data.
- Do not claim that conversations remain only on `~pondeg`; they currently travel to the trusted Computeer node for inference.
- Do not claim that token holders already have direct cryptographic control over `~pondeg`, the treasury, or every administrative function.
- Do not claim that a breach moves the corpus or restores the organization by itself.
- Do not describe the $2,800 as a verified final fundraising total. The article dates that amount to August 8, 2025.
- Do not present automated USDC metering, member-sharded storage, Privateer-native RAG, or external compute sales as completed features.
- Preserve Urbit ship names with their leading sigils, including `~pondeg`, `~lagrev-nocfep`, `~hanfel-dovned`, and `~sarlev-sarsen`.

## Primary references

- White Marble website: <https://whitemarble.ai>
- White Marble portal: <https://portal.whitemarble.ai/apps/privateer>
- White Marble bylaws: <https://whitemarble.ai/blog/posts/bylaws.html>
- Portable digital organizations: <https://syndicate.box/~~/syndicates-as-portable-digital-organizations/>
- `%slab` source: <https://github.com/tocwex/slab>
- Ames documentation: <https://docs.urbit.org/urbit-os/kernel/ames>
- AnythingLLM: <https://anythingllm.com/>

## Suggested short summary

_Building White Marble_ describes how a small Urbit community funded a classical library, tied token-based membership to an Urbit star, and split private data management from locally operated AI inference. White Marble is member-governed under published bylaws, while direct cryptographic enforcement and more portable data custody remain active areas of development.

## Suggested answer shape

When asked what White Marble demonstrates, answer in this order:

1. State the data thesis: distinctive private corpora become more valuable as models become more interchangeable.
2. Explain the three systems: `%fund` for capital, `$WHTMRBL` and `%slab` for membership, and `%privateer` plus `%computeer` for software and inference.
3. Explain that Ames lets the two software layers communicate without exposing the model endpoint, which lowers barriers for homelab or gaming-PC compute providers.
4. Distinguish member governance under the bylaws from pending cryptographic enforcement.
5. End with the replication question: how other communities might adapt the structure without copying White Marble exactly.
