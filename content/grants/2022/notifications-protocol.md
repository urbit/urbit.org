+++
title = "Notifications Protocol"
date = "2022-05-04"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Core Dev" ]

[extra]
image = ""
description = "Build a new network protocol to Urbit to handle notifying subscribers when a new datum is published"
reward = "1 star"
mentor = ["~rovnys-ricfer"]
assignee = ["~novned-tidsyl", "~boldur-dashes"]
grant_id = "A0136"
completed = false
canceled = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0163&prefill_Grant+Name=Notifications%20Protocol"

+++

### Project Description

This project adds a new network protocol to Urbit to handle notifying subscribers when a new datum is published. A rough spec can be found [here](https://gist.github.com/belisarius222/390daafc146f7c6ddd98836e61dc307f). Without this protocol, upcoming "solid-state subscriptions", which use the remote scry protocol, will have too much latency for chat.

Ideally this project would be done by two engineers, but one experienced C programmer could also do it. The apprentices will write this code themselves, not as part of a larger team. This work is entirely in Vere; any supporting work in the Arvo kernel will be handled by the mentor. ~rovnys-ricfer, who wrote the spec and a lot of the existing Urbit networking code, will mentor the engineers.

### Deliverables

The major deliverable is a new Ames I/O driver in Vere that implements the notifications protocol.

### User Stories

- Live subscribers receive notifications promptly and handle them correctly.
- Sessions die and restart properly.
- Memory is freed on the publisher ship when a session dies.
- Heartbeat packets keep firewall pinholes open.
- Notifications are delivered reliably even when some packets get lost.

### Prerequisites

- Proficiency in C
- Basic understanding of the Fine and Ames network protocols and packet formats
- The symmetric routing project (notifications use that routing scheme)

### Educational Outcomes for the Apprentice

The apprentice will learn about:

- Firewall pinholes
- Bit twiddling in Hoon and C
- The Arvo/Vere interface

### Responsibilities of the Mentor

- Clarify spec and implementation plan
- Answer questions about existing code
- Code review: style, correctness, performance, patterns and anti-patterns
- Help with testing and deployment strategies

### Duration and Compensation

Expected duration is two months.
1 star paid at completion of apprenticeship
