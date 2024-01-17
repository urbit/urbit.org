+++
title = "Minesweeper"
date = "2022-07-18"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "A redesigned version of minesweeper where all of the game logic is written in hoon"
reward = "1 star ($2k if done by Assembly)"
assignee = ["~hanfel-dovned"]
grant_id = "B0163"
champion = ["Holium"]
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0163&prefill_Grant+Name=Minesweeper"
+++

## Rationale

In order to make Urbit feel like an actual OS, we need minesweeper.

## Overview

`minesweeper`: a redesigned version of minesweeper where all of the game logic is written in hoon.

## User stories

1. As a user, I want to be able to set the game difficulty (see below table)
2. As a user, I want to be able to experience the classic minesweeper game interface, but redesigned.
3. As a user, I want to be able to see previous scores (personal leaderboard).
4. As a group member, I want to be able to see scores of other people in my group.
5. As a user, I want to make a custom difficulty level, entering height, width, and # of mines.

## Architecture

Game state will be kept track of in a backend agent. The UI should only render the current game state and send moves to the agent. There will be a few types in the agent state: game-state, settings, leaderboard.

The leaderboard can be shared with others in your group, which would allow a group leaderboard to be generated. A ship can set permission of if it wants to sync its local leaderboard with the group host.

Holium will work with the developer(s) to provide frontend support, but the team working on this bounty will be responsible for frontend implementation.

## Milestone 1: 1 star ($2k if done by assembly)

Have a working minesweeper game with requirements listed.

For the milestone to be completed, the app must be approved by Holium and it must be hosted for distribution on Holium's app star (as well as your own if desired)App must be finished.
