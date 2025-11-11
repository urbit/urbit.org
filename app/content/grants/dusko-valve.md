+++
title = "Dusko Valve"
date = "2022-04-15"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "a tool which allows NFT artists to offer planets for redemption to their patrons alongside their NFTs"
reward = "1.0 WSTR"
assignee = ["~tasset-norlux"]
champion = ["~tacryt-socryp"]
grant_id = "P0118"
completed = true
canceled = false
link = ""
+++

## Purpose

The building of Valve, a tool which allows NFT artists to offer planets for redemption to their patrons alongside their NFTs. I.e. I buy an NFT, I also get a planet. Initially, this would take the form of a contract which queries an NFT contract and whitelists planets on a corresponding webpage for those who purchased an NFT from that contract. It may evolve into a full fledged, no-code marketplace that provides NFT artists the ability to offer planets alongside their NFTs.

## Background

While NFTs can be many things, they function primarily as a membership pass, an access card to a community. Having a tool which allows artists to deploy ships alongside their NFTs would draw NFT projects to Urbit as the platform for interacting with their community. It would also onboard more users to Urbit in the process. Further, many smaller NFT projects typically have higher quality communities and art which would draw artists rather than collectors to the Urbit ecosystem.

Artists such as Haleek Maul have created custom collections of Urbit sigils which auctioned off both the artwork and corresponding planet or star together. This was a great example of artists selling artwork that immediately grants access to the Urbit community. Making a tool to do this at scale would further Urbit’s goal of becoming the primary social space for web3, as well as promote Urbit as an attractive, alternative platform to smaller NFT artists who don’t want to operate and tend to Discords, but are still interested and excited by the notion of communicating more directly with their supporters.

## Implementation

Money from this grant would go to creating a tool for NFT artists selling artwork to provide their community immediate access to Urbit by redeeming a planet.
This would initially be an integration with Metamask Protocol which queries an artist’s NFT contract to provide access to a modified planettine-based react app for distributing planets.

## Stages of Valve

1. The Valve MVP will be a redeployment of Tlon’s planentine distribution tool behind a Metamask Protocol authentication layer. Planet slugs will be maintained in an airtable to be available for redemption through planettine’s react app. Tlon will work with me to polish onboarding copy for the frontend which will clearly explain how an NFT holder redeems, then boots up, their planet. Tlon will also host all the planets of the Dusko community, starting with the core team.

2. The second phase of Valve will be replacing the planetine backend with Tirrel’s planet distribution tool. At this point Valve will now be open source and I will work with Tlon / Tirrel to create a guide that explains how NFT creators customize Valve to distribute planets for their specific contract.

## Responsibilities by Organization

### Tlon

Tlon will help with managing the integration of planettine for the backend of Valve’s MVP. By managing, I mean working with me to polish onboarding copy for the frontend. In addition, they will host the planets of the Dusko community and help with onboarding — providing learning sessions to teach people how to onboard and essentially assist in general hand-holding of the community if necessary. They will also provide marketing help to promote the Dusko project, as well as additional onboarding and promotional support to the other artists who will use Valve initially in partnership with this grant.

### Tirrel

Tirrel will work with me to develop the final version of Valve as an open source tool kit for NFT creators to customize and use to distribute planets among those holding their NFTs. Their backend will replace the planettine backend in phase 2.

### Urbit Foundation

The foundation will provide 500 planets to be used and distributed by artists to onboard their communities into Urbit. The first 181 will be for Dusko’s community, while the additional will be gifted to additional artists who I work with who want to onboard their communities to Urbit and use groups as their community’s social hub.

## User Story

I’m grateful I have access to a platform which simplifies the experience of interacting with my community.

A tool for me, as an artist selling artwork, to provide my community immediate access to an aesthetic and easy to use platform (Urbit) allows me to legitimize the use of NFTs and use them myself.

## Milestones

### Milestone 1 - MVP

Payment: 1 star

Completion: 30 Apr 2022

MVP: a web page gated using Metamask Protocol which users are granted access to once they mint a corresponding NFT.

### Milestone 2 - Airtable form and Tirrel Backend

Payment: 1 star

Completion: 30 Jun 2022

Airtable form for Valve which other artists fill out to request redeemable planets and at least two artists lined up to transition their community over to Urbit through a Valve NFT release.

Implementation of Tirrel backend and open-sourcing of Valve through release of repo and guide.
500 planets distributed in total with at least two communities transitioned over to Urbit.
