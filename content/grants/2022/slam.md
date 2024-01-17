+++
title = "Slam"
date = "2022-02-28"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]
[extra]
image = ""
description = "Slam Action Game"
reward = "3 stars"
assignee = ["~hanfel-dovned"]
champion = ["~rabsef-bicrym"]
grant_id = "P0101"
completed = true
link = "~hanfel-dovned/arcadia"
deliverable = "~hanfel-dovned/slam"
+++

## Overview

Slam is a small action game for Urbit where you battle your %pals' %gora.

## Background

Super Smash Bros. for Nintendo 3DS has a mode called StreetSmash where players can battle the AI-controlled ghosts of other players using little hockey pucks—see [this video](https://youtu.be/x1xBUU8_12Y?t=106) for gameplay footage.

I'd like to create a similar asynchronous social action game on Urbit: StreetSmash, but with %gora instead of Nintendo characters, and with %pals instead of StreetPass guests.

## Motivation

The obvious value that Slam will bring to the network is that it's fun. But there's a deeper motivation here. An Urbitier reason that's a little harder to articulate. Luckily for me, this recent post from ~winter-paches captures it perfectly:

> Consider paldev's suite of tiny apps: %pals, %face, %zone, &c. Throw in Dalten Collective's %gora. Taken individually they look throwaway and useless. However, their eventual personal use is emergent as different people discover ways to use and combine them in interesting ways. Eventually those patterns will become socialized and copied, but in advance of that there will be wildly varied experimentation which may look like chaos. Imagine if facebook were a totally open set of components/api in which anyone could individually combine, configure and tailor them how they saw fit. You and i might both have "facebook" but it might be totally unrecognizable as such.

Slam's integration with pals and gora is something that can only happen on Urbit, and I think that pursuing projects which explore these types of combinations will give us a lot of intel about how we can best achieve a future where small-scale custom software is common.

## About Me

Hi! I'm ~hanfel-dovned.

Throughout college, I developed about two dozen games ranging in scope from small weekend projects to a multi-year professional release on consoles. I designed and coded them in GameMaker: Studio using GML, a language with C-like syntax and looser-than-C rules. Some games were made entirely by me, and on others I collaborated with a couple friends on art and sound.

After graduating, I discovered Urbit in mid-2021, fell in love with it, went through Hoon School, did an apprenticeship, attended Assembly, and plan on building on Urbit full time beginning this summer.

My Hoon skills are up to par with the previous out-of-date Gall Guide; I can write a Gall agent, but don't have any experience with implementing a frontend or distributing apps. Code for my apprenticeship is [here](https://github.com/hanfel-dovned/urbit-text-editor).

## Design

As with any game, the specific features and details that I have in my head are still fuzzy and will need to be fleshed out over the course of development. For example:

- The controls will need to be adapated to a mouse and keyboard, which will change the game's feel and necessitate rethinking some of the mechanics.

- It would be cool to be able to level up your gora or have some reason to compete with your friends, but I don't want the metagame to be addictive in such a way that makes people feel compelled to play the relatively simple actual game for longer than they have fun with it.

- Exposing a player's entire gora collection to all of their pals would be a privacy concern. Slam could pull only from a player's public gora collection, or there could be a specific tag players add to gorae that they want Slam to be able to recognize.

- Could Slam issue a default gora to all players in case they don't have any yet? Using crow for this looks promising.

- What implications would a progression system have for a gora's value? If you own a gora with a high win count, and some other future app wants to use that info for something interesting, should that consideration impact the design of the progression system?

- Is it worth it to try and prevent players from cheating? Likely not, but testing the waters here could help the Urbit community discover new mechanisms for sources of truth in decentralized apps.

## Implementation Plan

1. Develop the game in Javascript using the Kaboom.js library.

- I don’t have a ton of experience with JavaScript, but I’m confident that this portion of development will go pretty smoothly. Kaboom seems really easy to use from the little I’ve messed with it, and there’s plenty of JavaScript documentation everywhere.

2. Write the hoon backend to gather data for Slam from %pals and %gora.

- While I have experience writing gall agents, Slam will be more complicated with its inter-app functionality.

- Future improvements/stretch goals to Slam notwithstanding, the primary goal of the hoon agent in this iteration will be the gathering of gora and pal data and the surfacing of that data to the Kaboom.js implementation of the game.

3. Integrate the backend with the frontend.

4. Future/stretch goals:

- %gora have unique properties based on their data
- multiple AI for computer-controlled combatants
- score sharing modality (possibly the issuance of a gora from a loser to a winner)
- %gora stat improvement paths
- 'arenas' for battle w/ prescribed rules and a 3rd party arbiter of victory for direct p2p play, confidence in scores

Though I will likely work on the first three points concurrently, naturally allowing their designs to mesh and influence each other, it seems unlikely to me that I’ll be able to complete the entire project within the 2-3 month time period that would be appropriate for a single milestone.

I have therefore separated them out into two separate milestones that cover, roughly, bullets one and two+three, respectively.

## Champion

I’ll be working with ~rabsef-bicrym as a champion. Rabsef has, with [Quartus](https://github.com/dalten-collective), produced a lot of software that is live on the network today and I am confident that he will be able to answer the questions I may run in to while writing Slam; things along the lines of: “What does the workflow look like for developing gall agents that require other apps? How do I install apps on a fake ship? etc.” Quartus also produced %gora so I’ll have a direct connection to the %gora development team, should I need any support working with their system.

## Milestones

### Milestone 1 - Frontend Game Demo is Released

Expected Completion: May 2022

Payment: 1 Star

A fully playable and polished single-player version of Slam with all gameplay mechanics intact, but no pals or gora implementation, will be available for Urbit users to play via app distribution.

### Milestone 2 - Full Slam Release

Expected Completion: August 2022

Payment: 2 Stars

Slam will be updated with social functionality. Enemies will be generated from the player's pals' public gorae by pulling in their images as sprites and tweaking parameters like size and color according to each gora's info.

As part of these social features, Slam will be updated with menus for features including viewing one's gora army and seeing pals' high scores.

If germane, Slam's core gameplay will also be tweaked according to player feedback from the demo, potentially including graphical and audio enhancements; this will be a tight, solid, highly polished little game. If any minor bugs pop up in the weeks after release, they will be quickly fixed.
