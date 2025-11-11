+++
title = "Verifying Urbit ID on Keybase"
date = "2020-02-18"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Create a Gall app that links Urbit identities with Keybase."
reward = "2 stars"
assignee = ["yosoyubik"]
id = "550468262"
completed = false
canceled = true
link = ""
+++

Keybase is a service to aggregate multiple web2 identities and offers secure p2p messaging and file storage. Keybase assumes each ID service has multiple users.
In the Urbit paradigm, each Uribt ID is a self-sovereign host (personal server). Each Urbit ID is one service and one user.

### Bounty Description

Create a Gall app and that creates a Urbit ID based identity service and hosts an identity proof of the Urbit ID. Keybase offers a guide for creating these proofs and can be found at keybase guide for adding new services.

##### Gall application:

- Create an identity service for a Urbit ID
- Check that the config is valid
- Keybase needs to check the proof periodically on the Identity Service
- Link on the Identity Service to the corresponding verified Keybase profile
- Use Urbit ID sigil as a badge (badge: a small SVG image)

-Suggested prefilled fields:

- 'display_name': 'Urbit'
- 'Username': 'ship-name'
- Logo 32px black&white sigil and 16px black&white sigil
- 'Description': 'A clean-slate OS and network for the 21st century'

##### User interface:

- Create valid `validate_proof_config.json` using form fields
- Binary authorization
- I am ship-name on urbit [yes or no]

### Resources:

- [Proof Creation](https://keybase.io/docs/proof_integration_guide#2-2-proof-creation)
- [Proof Checking](https://keybase.io/docs/proof_integration_guide#2-3-proof-checking)
- [Linking](https://keybase.io/docs/proof_integration_guide#3-linking-user-profiles)

### Prerequisites:

- Map your Urbit ID with a DNS domain
- Load an SSL certificate using acme
- `:acme &path /top-level-domain/second-level-domain/optional-subdomain`
- Example: `https://zod.urbit.org` --> `:acme &path /org/urbit/zod`

### Contribution Guidelines:

- Do not begin work until your request to claim this bounty is accepted.

- Submit your work as a pull request to [the urbit/urbit repo](https://github.com/urbit/urbit/pulls)

- When applying to work on the bounty, tell us a little about yourself and some projects you’ve worked on in the past.

- You have 90 days from the time of approval to complete this bounty.

## Milestones

### PR is merged

2 stars
Your work is accepted, and your PR is merged.
