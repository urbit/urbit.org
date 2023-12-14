+++

title = "Go-Urbit Core Interface"
date = "2022-03-23"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev: Other"]

[extra]
image = ""
description = "Create a go-urbit library that contains the required functions for interfacing with Ames"
reward = "3 stars"
assignee = ["~litryl-tadmev"]
champion = ["~wicdev-wisryt"]
grant_id = "P0111"
completed = true
canceled = false
link = ""

+++

# go-urbit Core Interface

One of the missing projects in the Urbit ecosystem is the ability to directly communicate with Urbit from another device or system using the Ames protocol.

Most particularly embedded devices and low-power systems needing to transmit messages to another ship, on which running a full Urbit ship would either be not possible, or not ideal. This also includes services running in cloud environments only needing to transmit message packets.

I am proposing to create a go-urbit library that contains the required functions for interfacing with Ames.

My end goal, as discussed with ~wicdev-wisryt for a future proposal, is to rewrite the Urbit King in go using this library for maximum security and memory safety.

## Milestones

### Milestone 1 - Go Noun

Expected Completion: 15 April 2022
Payment: 1 star

Implement the Noun protocol in Golang.

Core Noun functions:

- mug
- jam
- cue

Implement the core Noun structures:

- Atom
- Cell

### Milestone 2 - Go Ames Utilities

Expected Completion: 1 May 2022
Payment: 2 stars

Implement a Golang utility library for interfacing with Ames.

- Lookup a planet's keys on Ethereum by name
- Send encrypted packets using urcrypt
- Construct and send poke
- Encode and send packet
- Write documentation on setup and usage
