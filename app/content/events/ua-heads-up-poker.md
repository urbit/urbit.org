+++
title = "Userspace Apprenticeship: Heads-Up Poker"
date = "2021-05-26"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "A fun client app that would be a good way to get acquainted with Urbit's networking and p2p abilities."
reward = "1 star"
mentor = ["~timluc-miptev"]
assignee = ["~bacwyl-samweg", "~hodzod-walrus"]
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0021&prefill_Grant+Name=Heads-up%20poker"
+++

A fun client app that would be a good way to get acquainted with Urbit's networking and p2p abilities. While it would be possible to create a fully decentralized version that uses [mental poker](https://en.wikipedia.org/wiki/Mental_poker) [algorithms](https://github.com/kripod/mental-poker) to make the game fully p2p, it is probably more tractable initially to implement the game with a centralized server.

The game can be implemented such that the central server only handles queries about current deck state, and so could be swapped out for a solution with no trusted third party at a later time. Everything else can be handled player-side, including signing attestations of game state at different points.

### User Stories

As a gameserver admin I can:

- set up a server to handle shuffling/dealing
- take API calls from players who want to initiate a game.

As a player, I can:

- connect to another player with the app to initiate a game
- specify which gameserver I trust to handle card shuffling/dealing
- play iterated hands of poker
- update a game state that is either tournament-based (first to win all the chips) or cash-based (continually updating stacks of chips on each side, possibly with injections of money along the way)
