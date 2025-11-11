+++

title = "Seguro Prototype"
date = "2022-05-09"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Core"]

[extra]
image = ""
description = ""
reward = "2 stars"
assignee = ["~mastyr-bottec"]
champion = ["~master-morzod"]
grant_id = "P0130"
completed = true
canceled = false
link = ""

+++

# Seguro Specification and Prototype Proposal

# Overview
Seguro improves Urbit's dependability by automatically replicating its event log across a set of machines in a cluster. The goal of this proposal is to write a working prototype of such a system. The prototype will be used to assess implementation direction and implement a complete integration.
## Problem
The [Urbit runtime](https://github.com/urbit/urbit/tree/master/pkg/urbit/vere) was designed to host just a single Urbit instance running in a Unix process, with a single file volume attached for its event log and checkpoints. For individuals running only one or a handful of ships, this architecture is satisfactory. For providing Urbit to the world as a new, decentralized, peer-to-peer network of personal servers, the current implementation has inarguably succeeded.
However, for a quickly maturing platform which needs to scale to meet enormous demand, current Urbit technology is not suitable. Its low dependability is one element which continues to prevent the Urbit community from building truly resilient and scalable hosting services.
# Background
Urbit is simple, durable, yours. Seguro dials Urbit’s durability up to 11, making Urbit not only durable, but truly permanent. With Seguro’s event log replication, ship breaching will become unnecessary. Seguro is a major component in service of an Urbit that can scale the globe with dependability high enough to support critical workloads. Seguro “harbors” could be star-level services which provide ships a pre-configured place for their piers to be automatically backed up to and restored from, giving all pilots the benefits of Seguro without any additional operational overhead. In practice, user error would no longer be a reason to have to breach a ship.

# Project Requirements
## Potential Architecture
![Seguro Architecture diagram of client and clusters](https://sarlev-sarsen.sfo3.digitaloceanspaces.com/sarlev-sarsen/2022.5.10..05.03.47-image.png)
Seguro will utilize an off-the-shelf distributed database backend technology (like dqlite) to store and replicate a ship's event log across a number of replicas. To start, the Seguro prototype will be a separate repository and program, rather than an addition to vere. An analysis of existing off-the-shelf distributed database tools will be performed, published, and two of them will be selected for integration in the prototype.
## Cluster
A Seguro cluster will consist of a master and m replication slaves (user-specified). Urbit network UDP events will be received by an IP-level load balancer which will then replicate them to all the members of the cluster. Slaves will process these events and record them in their corresponding event logs but only the Seguro master will actually emit their corresponding side effects.
# Performance
## Configuration
Users will have the option to configure Seguro's degree of optimism, which would indicate the minimum number of healthy replicas which must process an event before emitting its side effect from the master. For example, if set to 0, the master will receive, process and emit side effects from an event without waiting for any slaves in the cluster to acknowledge their successful reception and processing of said event. If set to `m`, where `m` is the number of slaves in the cluster, the master will wait for all of the slaves to process the event before emitting its side effects. 0 is most performant, `m` is most durable. In other words, setting a value of 0 tells Seguro to be "optimistic" about event replications, and `m` tells Seguro to be the opposite.

# Previous Work
[Some effort](https://github.com/urbit/urbit/commit/cfeb35e37be63f96bb50fe1f60e2f59e35c07258) to support additional database technologies for event log storage was performed by Tlon in 2018. The work aimed at adding FoundationDB, RocksDB, LMDB and SQLite as storage options. Conceptually, adoption of distributed database systems for replicated/clustered event log storage was conceived and researched as far back as 2013.
# Open Questions
1. Should the ordering of (compute event, commit event, release effect) change? Why? How?
- Yes, but not as a part of this work. Impact should be small
2. What is the nature of database integration? Are we making a new kind of pipe where we control both sides and the remote talks to an arbitrary database, or does the database have a client SDK that gets pushed into the runtime?
- Client SDKs will  be integrated into the runtime
3. What happens in case of failed nodes (master or slaves)?
- Masters: automatic leader replacement (promotion of slave to master) until no remaining healthy nodes exist
- Slaves: user warning at best
# About Me
I am Matthew LeVan (~mastyr-bottec), CTO of Wexpert Systems. I have a background in infrastructure engineering, worked extensively with cluster computing in my previous roles, and have been an Urbit enthusiast and mild contributor since 2016. At Wexpert, we are focused on building the core infrastructure to support scalable Urbit hosting on our own private servers.
# Milestones
Phase 1 - Implement a working external Seguro prototype
Deliverables:
- Brief analysis of database tools and selections with justification
- Writes/reads in and out of the Seguro cluster
- Compatibility with two databases
- Observed performance results
- Events recorded with continuous integer keys and arbitrarily sized values
	- Depending on database, either metadata records or compound keys must be used to support event values which overflow the database’s maximum size limit

Payment: 2 stars
Expected Completion: June 2022
