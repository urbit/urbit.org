+++

title = "Elm"
date = "2023-06-08"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Tool"]

[extra]
image = ""
description = "Making Elm the frontend technology for Urbit"
reward = "5 Stars + Bonus"
assignee = ["~racfer-hattes"]
champion = ["~rovnys-ricfer"]
grant_id = "P0275"
completed = true
canceled = false

+++

# Description

I think Elm is a great language for developing frontends. The Elm architecture is conceptually very similar to how %gall agents are structured.

Goals:

1. Remove the need to convert to and from JSON to interact with Urbit from Elm
2. Make interacting with Urbit from Elm as painless as possible

To eliminate the need to convert through JSON Elm needs to support serializing and deserializing jammed nouns.

For potential portability reasons Elm libraries are not allowed to have JS FFI. This means that we need to implement as much as possible in pure Elm.

# Milestones and Compensation

## Milestone 1: Jam and Nouns

Reward: 2 Stars

Deliverables: 
 - An Elm library that implements `++jam` and `++cue` in Elm.
 - An Elm library for manipulating Nock Nouns and converting Elm data structures and type to and from Nock Nouns.

## Milestone 2: Noun Channels

Reward: 1 Star

Deliverables: An Elm airlock library that supports subscriptions and pokes encoded as jammed Nouns. The library should be designed to be as ergonomic as possible.

## Milestone 3: Documentation and Project Template

Reward: 1 Star

Deliverables: 
 - Good documentation for resulting the package + a set of tutorials that cover some tricky bits.
 - A git repo with all of the boilerplate required to communicate with Urbit. This repo is intended to be used by ASL students to bootstrap their project frontend.

## Milestone 4: State replication

Reward: 1 star

Deliverables: A library file for %gall agents to facilitate automatic arbitrary state diffing and publication of the diffs. Airlock functionality to reconcile the published state diff and preset the user of the library with the current state of the %gall agent. 

## Bonus

Upon successful completion of project, the contributor will also receive a 6K USDC bonus funded by Vaporware

