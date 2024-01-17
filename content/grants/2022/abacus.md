+++
title = "Abacus: basic calculator"
date = "2022-07-18"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Abacus: A basic calculator app with the ability to convert units"
reward = "1 star ($1k bonus if done by Assembly)"
assignee = ["~sorpes-ranrep"]
grant_id = "B0160"
champion = ["Holium"]
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0160&prefill_Grant+Name=Abacus"
+++

## Rationale

Every OS needs a calculator. Abacus will do all calculations in hoon, returning the results to the frontend for display.

## Overview

`abacus`: a basic calculator with the ability to convert units.

## User stories

1. As a user, I want to add, subtract, multiply, and divide numbers.
2. As a user, I want to be able to use decimals or enter fractions.
3. As a user, I want to type in longer formulas that can then calculate results.
4. As a user, I want to convert units quickly

## Architecture

For security, the UI should not send preformed dojo commands to the backend agent, but rather, a series of types that can be deserialized and used to generate hoon expressions that are then calculated.

Holium will work with the developer(s) to provide frontend support, but the team working on this bounty will be responsible for frontend implementation.

## Milestone 1: 1 star ($1k bonus if done by Assembly)

Have a working calculator app that can convert units.

For the milestone to be completed, the app must be approved by Holium and it must be hosted for distribution on Holium's app star (as well as your own if desired)

## Future work

- Hooking into the Realm Oracle for fast access to conversions, and calculations
- Ability to convert currencies and crypto currencies with real time price data

## Requirements

- At least one years of professional programming experience
- Experience with full-stack development, including JS and some server-side language
- Graduated from Hoon school
