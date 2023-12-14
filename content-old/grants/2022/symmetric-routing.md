+++
title = "Symmetric Routing" 
date = "2022-05-04"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Core Dev" ]

[extra]
image = ""
description = "Change Urbit's peer discovery, routing, and packet forwarding to use symmetric routing"
reward = "1 star"
mentor = ["~rovnys-ricfer"]
assignee = ["~novned-tidsyl", "~boldur-dashes"]
grant_id = "A0135"
completed = false
canceled = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0162&prefill_Grant+Name=Symmetric%20Routing"
+++

### Project Description

This project will change Urbit's peer discovery, routing, and packet forwarding to use "symmetric routing". A rough spec can be found [here](https://gist.github.com/belisarius222/7ec6f40b3a498c38e696139d8dbd8b10). "Symmetric" means that every response packet will retrace the same steps through the network as the request packet that triggered it. This will simplify routing in a few different ways.

Ideally this project would be done by two engineers, but one experienced C programmer could also do it. The apprentices will write this code themselves, not as part of a larger team. It affects both Vere and the Arvo kernel. ~rovnys-ricfer, who wrote the symmetric routing spec and Urbit's previous routing system, will mentor the engineers.

## Deliverables

- New Ames I/O driver in Vere that implements symmetric routing
- Modified code in Arvo's Ames vane to use symmetric routing
- Aqua testing harness and peer discovery tests
  -Code in Arvo and Vere to handle upgrading from the old protocol to this one

## User Stories

- A new ship of any rank can join the network
- Any ship can make a request to any other ship, and the response will be routed back
- A route tightens (has fewer hops) with each new request and response
- A route loosens when a tighter route times out
- A ship still has connectivity behind both symmetric and asymmetric NAT
- Stars properly handle packet forwarding

### Prerequisites

- Proficiency in C and Hoon
- Basic understanding of the Ames network protocol and packet format

### Educational Outcomes for the Apprentice

The apprentice will learn about:

- Peer discovery
- NAT traversal
- Firewall pinholes
- Bit twiddling in Hoon and C
- The Arvo/Vere interface
- Vane internals

### Responsibilities of the Mentor

- Clarify spec and implementation plan
- Answer questions about existing code
- Code review: style, correctness, performance, patterns and anti-patterns
- Help with upgrade and deployment strategy

### Duration and Compensation

Expected duration is two months.
1 star paid at completion of apprenticeship
