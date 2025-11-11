+++
title = "Pokur: Texas Holdem on Urbit"
date = "2021-09-16"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]
[extra]
image = ""
description = "Multiplayer Poker App on Urbit"
reward = "2 stars"
assignee = ["~hodzod-walrus"]
grant_id = "P0068"
completed = true
canceled = false
link = ""
+++

## Pokur: Texas Hold 'em on Urbit

## Purpose

The goal of this project is to release a multiplayer Poker app on Urbit. Most users understand Urbit as an excellent communication tool, but so far there are few apps which showcase Urbit’s full potential as a general networked OS. Games are an excellent way to introduce people to this, and poker’s turn-based gameplay is ideal for development on Urbit in its current state. This project will also lay the groundwork for future financial transactions on Urbit in the form of BTC wagering for cash games and tournaments. For now, though, this facet of the app will wait for future payment rails.

## Background

I was first motivated to build a game on Urbit after seeing ~ponrep build a chess app. I’m also a casual poker fan, so seeing it as a suggested apprenticeship project was great.

I’ve spent the last several weeks working on an apprenticeship grant, which was extremely successful --I was able to become proficient in Hoon and app development using Gall. I now have a [basic poker app](https://github.com/benmcc100/pokur). There are several tasks required to get this program release-ready, and this grant is intended to cover that.

## Implementation

I intend to follow the same general structure of my apprenticeship app. Pokur exists as two Gall apps, a client and a server. While there exist fully-p2p algorithms for playing trustless poker, marking one ship as a server has many benefits for ease-of-play (notably turn timers), and remains an effective decentralized implementation of the game. Players can select a server of their choosing when creating a new game, or host a game themselves. When it comes to fairness, players are only required to trust the ship hosting the server. This model of trust is similar to someships acting as btc-providers, and the Urbit address space is well-designed for marking stars as high-trust nodes capable of providing services such as poker hosting.

I’ve already implemented the basic game logic. There are a few edge cases that remain unresolved, notably the logic surrounding side pots in a situation with multiple all-ins. I’m aware of these issues and will be able to manage them easily. My primary development task is now to build on this basic logic to create tournament and cash game modes, and add useful features such as rule customization, invite management, and messaging in-game.I’ll probably need to refactor certain elements of my apprenticeship code. As I wrote it, I learned much more about Hoon, so older parts of the codebase arenaturally lower-quality. I’d like to rewrite these parts to make the app more extensible. Everything works in its current state, but I think this will allow me to more easily build the aforementioned features.

One of the key reasons for this proposal is ensuring that Pokur can have an extended open beta process. I think this is a good way, as a solo developer, to ensure every in-game scenario is bug-free. This is critical if ships are to play for ‘real money’ in the future.

For this reason I intend to release a beta version of Pokur that does not include BTC integration. After publicising the beta release, I hope to get lots of community feedback on gameplay, any bug reports, and use these to push improvements.

## User Stories

● As a user, I can create a newtable and specify the hosting server and the game rules (tournament/cash, buy-in, timers, etc.)

● I can invite other users to play with me, who can then invite their friends before the game begins

● Once in-game, I can play poker within the rules specified for the table, and concede if I so choose

● If I install the Pokur server app, I can use it for my own games or invite others to use it for theirs

● I can look at a history of the games I’ve played in

## Milestones

### Milestone 1 - Development & Polish

Expected completion: Nov 2021

Payment: 1 star

● I’ll start by refactoring some elements of the codebase from my apprenticeship and fixing the known gameplay issues (main one is lack of proper side-pot logic).

● Next I’ll polish the game, adding features including but not limited to:

\* Tournament vs cash mode

\* In-game turn timers

\* Invite management (decline game invite, cancel invite, etc)

\* Custom user-designed game rules (starting stack size, turn time limit, etc)

\* In-game chat

● Also included in ‘polish’ will be a cleaner and nicer looking UI.

### Milestone 2: Release and testing

Expected completion: 2022

Payment: 1 star

● Will begin by publicising the github repo to the Urbit community and dedicating a star to hosting a Pokur server for people to use. I will also host a group for installation help, organizing tournaments, reporting bugs, and generally encouraging the use of Pokur beta.

● Pokur is also a prime candidate for an Urbit software distribution system. I will take any steps required to publish Pokur on that platform and hope to be one of the first independent apps available there.

● Reward for this phase is to cover all maintenance and upgrades required to:

\* Reveal latent gameplay bugs and fix them

\* Ensure Pokur is available on any future Urbit software distribution platform(c)establish a Pokur-playing community on Urbit and maintain a Pokur server on a dedicated ship for at least a year or until at least 2 others are active.
