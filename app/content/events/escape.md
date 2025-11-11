+++
title = "Escape"
date = "2019-12-03"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Apps", "Dev: Tool" ]

[extra]
image = ""
description = "A reputation agent for Stars."
reward = "4 stars"
assignee = ["yosoyubik"]
id = "1146667285"
completed = false
canceled = true
link = ""
+++

"How much _Escape_ does `~marzod` have?"

When a planet is newly booted into the Urbit Network there is a fundamental service that its sponsor needs to provide: peer discovery. In order to do this the sponsor needs to be up and running, with a stable internet connection. The Urbit Network is still young but there has been several instances where planets discovered that, right after a first boot, they can't communicate with anybody in the network due to their sponsor not been active.

These planets need to quickly escape, that is, leave their sponsor star and find a new one that provides a good service. A simple way to assess the likelihood of the sponsor being a good actor in the network is to look at on-chain data from the Azimuth contract, in particular, _Escapes_. If a sponsor has a low Escape score (planets that leave), one could use this as a proxy and say that the sponsor will keep behaving in the same way as the past data indicates. More over, if a planet attracts more planets, that signals more strongly the good quality of the provided service.

This proposal addresses this problem by using the Beta Reputation to create a Landscape app that will show the score of a planet's sponsor based on data from Azimuth, in particular the number of planets spawned, and the number of planets that have escaped. [The Beta Reputation](https://www.csee.umbc.edu/~msmith27/readings/public/josang-2002a.pdf) uses the Beta Distribution to calculate the score (e.g. successful/unsuccessful events over the total number of interactions) as the expected value of a probability distribution. More data available (high number of booted planets) will narrow down the confidence of the probability (if a star has only booted a planet that didn't escape, the confidence of that score `(1-0.67=33%)` is smaller than the one of a star that has booted 200 planets and only two have escaped `(1-0.87=13%)`)

A full reputation system for stars is out of scope for this proposal, but some ideas would be to include network uptime or other, more subjective metrics, ideally agreed by the children of each star.

The aim of this proposal is not to create a perfect reputation system but rather, to introduce in the minds of the users that there is a sponsor that they need to pay attention to, that is providing a service, not only to them but to others in the network, and that the likelihood of that operator's behavior can be attested since the data is publicly available and in a blockchain.

The Beta Reputation is a system that is very easy to understand to non-technical users but has a statistical background behind it. Nevertheless this is just one of the many reputation systems that are out there like [Regret](https://dl.acm.org/doi/pdf/10.1145/375735.376110), [Fire](https://eprints.soton.ac.uk/259559/1/dong-ecai2004.pdf) or [Travos](https://idp.springer.com/authorize/casa?redirect_uri=https://link.springer.com/content/pdf/10.1007/s10458-006-5952-x.pdf&casa_token=M38itGxqsu0AAAAA:lAUgQUvbc4dZFhrNs4SSPWrQ9PzUj05pzmU5zkvPkytDOfgFOIxVP0a8Tzk_VkRi37J1bRHPJ2IhTD8C). I envision this work as a starting point for introducing reputation systems in Urbit as libraries that can be used by the community for experimentation.

With this is mind the Beta library (`/lib/beta.hoon`) can be used with any app that has a well defined data structure that comprises a list of timestamped events with a certain score, weighted, if desired, for a specific dimension. The ability to tag each event with a weighted dimension allows for complex reputations where different data points can be aggregated together.

## Milestones

### Gall Agent and Beta Reputation Library

2 stars
Delivery of the agent and library for the Beta reputation that's able to poke Azimuth for the Blockchain data, calculate the reputation score, and store it on the agent.

### Escape UI

2 stars
Delivery of the UI interface that will show the Reputation Score to the user, with the ability to search for specific sponsors and filter the results accordingly.
