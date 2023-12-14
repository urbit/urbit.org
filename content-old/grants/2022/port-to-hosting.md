+++
title = "Port to Hosting Protocol"
date = "2022-09-25"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Other" ]

[extra]
image = ""
description = "Create an easy way to onboard Port users to hosting providers"
reward = "3 stars"
champion = ["~latter-bolden"]
assignee = [""]
grant_id = "B0194"
completed = false
canceled = true
work_request_link="https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0194&prefill_Grant+Name=Port%20to%20Hosting%20Onboarding%20Protocol"
+++

## Summary
Over the past year, Port has established itself as a critical onramp among Urbit newcomers. For non-technical users, it remains the only free option suitable for getting onto the network in just a few clicks and serves as a first impression to the computing platform as a whole. That said, home hosting of your ship can come with a few hurdles that are most easily solved by using a hosting provider. As such, Port is well positioned to streamline network onboarding while providing a simple user experience that integrates well with the rest of the ecosystem.

## Streamlined Onboarding
Running an Urbit node locally provides a low touch way for beginners to dip their toes. But after continued use and investment in the system, the limitations of hosting from your personal computer become more pronounced. For the foreseeable future, cloud hosting providers will be the go-to option for ensuring uptime and stability once the value proposition for a recurring subscription is realized. 
Currently, this transition requires the user to navigate the decentralized ecosystem of providers and after selecting one, figure out how to archive and upload their (usually quite large) pier. For non-technical users, this presents unnecessary friction that limits adoption. 
The proposed solution is an open protocol for transitioning to hosting providers that would be fully integrated into Port. The app would present a variety of providers to choose from, direct the user to the relevant signup flow after selecting one, and handle all of the legwork required to transfer the pier.
This same tradeoff of simplified initial use vs sustainable participation applies to ephemeral identities (comets). Gatekeeping these identities at the group level is already common practice making planets necessary for full network participation. As a stretch goal, an analogous protocol would be specified and integrated to handle planet purchase and key transfer from within Port.

## User Stories

- As a Port user (PU), I can browse potential hosting providers from within the app, so I know which one would best serve my needs.
- As a PU, when I’ve decided I don’t want to host my ship locally, I can seamlessly transition to a hosting provider from within the app.
- As a PU, I’m encouraged to purchase a planet if I don’t already have one instead of booting a comet, so I can fully participate in the network. (stretch goal) 

- As a hosting provider (HP), I can apply to have my service listed within Port and set/update my logo, description, and pricing for display.
- As a HP, I can sign up new customers and pull in their existing pier through the new protocol.

- As an identity provider (IP), I can apply to have my service listed within Port and set/update my logo, description, and pricing for display.
- As an IP, I can sell identities and forward the keys to Port for ease of use.

## Milestones & Compensation

### Milestone 1: Protocol Fully Specified — 1 Month, 1 star
Research and design of the hosting and identity protocol complete. Concrete specification published. Ready to be developed against by providers.

### Milestone 2: Backend Supported, Interface Designed — 1 Month, 1 star
Functioning protocol client integrated into the Port backend. Development server built out. Mockups or other intermediate design assets available for coming frontend build out (both hosting and identity).

### Frontend Integrated — 1 Month, 1 star
User interface developed and hooked up to backend functionality. End to end support for transitioning a pier to hosting provider. Stretch goal of completing purchase flow for planets if time permits.

### Further Research
Gather feedback from other stakeholders (UF, hosting and identity providers)
Prior to applicants begining work, final conversations and edits to this scope will be covered and agreed to with the Champion.

