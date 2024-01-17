+++
title = "Planet Sales via Urbit"
date = "2021-08-25"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev: Other"]
[extra]
image = ""
description = "Layer 2 Planet Sales via Urbit"
reward = "6 stars"
assignee = ["~tacryt-socryp"]
grant_id = "P0057"
completed = true
canceled = false
link = ""
+++

## Layer 2 Planet Sale Records via Gall Agent

Current state-of-the art planet sales are via Ethereum smart contracts, such as the ones used on [Planet Market](https://planet.market) and [Urbit Live](https://urbit.live). These solutions are severely lacking due to the massive fluctuations in Ether and gas prices. This has led to a deceleration in planet sales across all vendors. With the Urbit-native Layer 2 nearing completion, we believe now is the appropriate time to build capabilities for selling Urbit planets on Layer 2. We think the best medium to conduct sales from is the sponsoring Urbit Star itself.

The first component we propose is a Gall Agent (planet-market) to act as a database for Layer 2 invite codes. This database can keep track of the current price a given owner is willing to sell Layer 2 invite codes at, the set of available invite codes, and a history of all invite codes that have been sold.

Once this Gall Agent database is completed, we will build out a REST API and an accompanying web interface through which Layer 2 invite codes can be bought from the clearweb.

This API will be currency agnostic and can integrate with cryptocurrency, or traditional fiat processing gateways. Tirrel proposes a whitelabeled planet-sale site, available to any star-owner who wishes to sell their planets. This onramp will also be available to content creators who wish to import their community onto Urbit. (ex. Justin Murphy, [site](https://exit.otherlife.co))

This simple three step grant will open up the means of monetizing Urbit stars drastically, incentivizing address space owners to evangelize and smoothing the onboarding process.

Tirrel Corporation would like to take on this project as a grant, as we can execute it quickly and efficiently.

Once we have completed the first part of this grant, we will implement a planet sale interface within the Port application for new users who do not have a planet yet. This interface will reuse the work in the prior milestones, using Tirrel payment processing to allow the Urbit Foundation to sell Urbit planets directly from its desktop client.

## Architecture:

%planet-market agent:

++ on-init: n/a

++ on-load: n/a

++ on-poke: allow adding layer 2 planet invite codes, allow removing layer 2 planet invite codes, allow setting layer 2 planet invite codes as “sold”, allow setting the price that invite codes are selling at, allow setting a password / referral code for receiving up to N free planet invite codes

++ on-watch: keep track of updates to the data coming in

++ on-peek: query for the current set of available invite codes, for the current price, for a history of all invite codes, and for time-based subset ranges of the history

## Milestones

### Milestone 1: Gall Agent Development

Payment: 1 Star

Complete planet-market, a simple Gall agent for keeping track of layer 2 invite codes. Write a REST API for interacting with the planet-market agent using HTTP.

### Milestone 2: Web Interface

Payment: 1 Star

Make a simple web interface through which someone can get free layer 2 invite codes using the REST API if they have a password.

### Milestone 3: Port and Tirrel Payment Processor Integration

Payment: 4 stars

Integrate the above example web interface with Tirrel’s processor such that rather than giving away free planets, the web interface allows for sale of planets for USD. Add the ability to purchase invite codes. Update Port to accept an invite code, generate a passport, and boot a planet using keyfile.
