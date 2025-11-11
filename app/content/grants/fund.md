+++

title = "%fund"
date = "2024-03-11"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "The tip of the spear for sovereign web3 productivity apps on urbit"
reward = "5 stars"
assignee = ["~sarlev-sarsen"]
champion = ["~faldur-marnus"]
grant_id = "P0366"
completed = false
canceled = false

+++

## Rationale
Crypto has lost sight of the world of atoms, and given up on integrating with base reality due to an underlying necessity for trust and institutions.

But the world of atoms is still where most human action - aka, economic activity - derives it's value.

%fund is the first step to giving individuals who live in the world of atoms the essential tools for self-sovereign and P2P cryptoeconomic activity.

## What is the minimum viable product for an economy?
- Propose something to be worked on

- Allocate funds to that proposed work

- Assess the completion of that work

- Pay the person who did the work

Control over these mechanisms is control over any given community’s economy and, fundamentally, the type of production of which the economy is capable. **In the legacy nation state landscape, these functions are dominated by a cartel of social reputation, legal contracts, common law practices, and the fiat banking system.** Each of these institutions have more than their fair share of issues, inefficiencies, and downright corruption. But they also still retain something that the cryptoeconomy refuses to recognize as valuable: **trusted relationships and institutions.**

The rising crypto landscape, whatever you may call it--network states, patchworks, blockchain-enabled armed patronage networks, web3, etc.-- needs to be able to plug into humanity’s adaptive ability to build trusted relationships if it is to unseat the entrenched power structures in our way.

## %fund recognizes that “Trust is humanity’s Killer App.”
Legacy world contracts:

- Trillions worth of deals through legacy world are done on plain boilerplate contracts, many more on naught but a handshake.

- What percentage are happily fulfilled in contradiction to the black letter of the written contract?  

- The legacy world often points at crypto as being full of anonymous scammers, yet legacy contracts are generally unverifiable and mean opaque reputations for all parties involved.

- Professional and social reputations are bigger drivers of settling disputes than lawsuits and courts in most cases.

- Written contracts are often more **about clarity of expectations rather than a hyper-rigid programmatic standard**; leeway and uncertainty is mediated by trusted human relationships.

In recognizing this, we aim to bring a layer of tools to the global crypto economy that give project proposers, funders, and reviewers a self-sovereign, self-hosted, and permissionless system for web3 *“Dumb Contracting”*.

But we have smart contracts! Why use dumb contracting instead? Custom smart contracts need to be designed, developed, audited, deployed, and settled. A complex process which is inaccessible to most. Dumb contracts offer:

- Flexibility of scope specificity to allow for the shifting nature of operating in the world of atoms.

- “Oracle” optionality, allowing counterparties to mutually select the third party arbiter for work quality assessments. 

- Cost reduction across formation, settlement, and conflict resolution.  

- Variable or programmatic layers atop the oracle assessment mechanisms.

- Intent-aware post-hoc ‘auditing’, instead of expensive and cumbersome smart contract audits.

In essence, we want to bring the benefits of human trust and judgement into the crypto-economy. Certainly this does not replace the usefulness of DeFi, or trustless bridges, or game theoretic Oracle enforcement mechanisms. But it sets up an essential building block for human action in next era of digital networks.

## What is %fund?
%fund is a urbit application and smart contract ecosystem for human created, understood, and assessed dumb contracts.  

- **Funding Contributors** are able to pledge support and settle outstanding pledges for proposals for human action that they wish to see in the world, as well as receive refunds for fulfilled pledges associated with work that was not completed to the satisfaction of the project terms.  

- **Project Proposers** are able to draft and present a proposal to the world with human readable milestone descriptions and funding targets, raising funding for projects of arbitrary scope and budget amounts without needing to create custom smart contracts.  

- **Escrow Assessors** are able to be compensated for providing a fair and reputable assessment service to both Project Proposers and Funding contributors, serving as a trusted arbiter of the more subjective elements of a “Dumb Contract” which a best interpreted by a human by deciding if funds in escrow are paid out to proposers or returned to contributors.  

- **All parties involved have persistent, pseudonymous identities** linked to a sovereign personal server that has a growing ecosystem of applications across which their social and professional reputation carries.

## Slated for initial release  
The initial beta release will provide the foundational functionality of %fund, and be directed at a 'crowdfunding' use case. This will include: 

- A self-hosted frontend, publicly served to the clearweb to enable any Ethereum user to participate in funding campaigns.  

- Free onboarding of entry-level users via existing urbit hosting providers.  

- Escrow Contracts supporting USDC denominated campaigns.  

- User adjustable assessor fee rate to allow for rate negotiation. 

- Pledge future support as an authenticated user and fulfill past pledges via application dashboard after application download.

## User Stories
The completed code will enable users to satisfy the following user stories, and will include %vita integration to track application downloads.

### Funding Contributor
As a funding contributor, I want to...

- ...visit a clearweb page, and...

           - ...without authenticating...

                       - connect my MetaMask wallet and be able to make a funding contribution

           - ...if I have a running Urbit and authenticate using eAuth...

                       - connect my MetaMask wallet and be able to make a funding contribution

                       - Be able to pledge future support without downloading a new app

                       - Easily download the application to access additional features

- Receive a refund if the milestone I contributed to is not completed by the listed refund date

- Enable additional functionality by downloading the %fund app, specifically I want to...

           - easily track and fulfill my pledges through a MetaMask transaction generated with the click of a button. 

           - review the status of any projects that I have funded

           - Learn how to run my own proposers or provide escrow services

### Escrow Assessor
As an escrow assessor, I want to...

- See requests for my services, including the draft proposal and associated fee amount

- View all proposals for which I am the assessor which have milestones marked "In-Review"

- Release funds to the Project Worker by signing a transaction

### Project Worker
- Via a "Create a Project" form, I want to generate a proposal proposal with:

           - Project Title

           - Description

           - Total Amount (calculated from Sum Milestone Amounts)

           - Project Status

- Set an arbitrary number of milestones each with:

           - Milestone Title

           - Description

           - Amount

           - Milestone Status

           - Estimated Delivery Date

- Chose a potential escrow assessor

           - send them a request

           - Propose a fee amount

           - Review escrow assessor status

- When all the fields are entered and the escrow provider has given their off-chain approval, hit a button to create an on-chain transaction that instantiates the proposals dedicated escrow from the %fund smart contract ecosystem.

- Serve the proposal page over HTTP from my Urbit

- View a list of my proposed projects

- See a detail view of each my projects which include

           - Funding Status

           - Refund dates

           - Amounts by Contributor

           - Amounts by Milestone

- Allow eAuth login for potential funders so they don't need to download the %fund app

## Target Milestones and Funding
Initial beta release - April 2024 - 3 stars
We will release the initial beta project that supports the user stories listed above by the end of April.

Urbit User Onboarding Metric - 1 star
Working with Red Horizon hosting, we will onboard 50 new users into urbit via our onboarding flow.

Total Value Funded Metric - 1 star
The total amount contributed into funding campaigns using our escrow contracts breaks $50,000.

https://prototype.staging.tocwexsyndicate.com