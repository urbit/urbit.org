+++
title = "Authenticate with Urbit Gall App"
date = "2021-09-16"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev: Other"]
[extra]
image = ""
description = "Exernal service/websites can verify that a user is who they say they are"
reward = "1 star"
assignee = ["dcSpark"]
grant_id = "P0065"
completed = true
canceled = false
link = ""
+++

## Authenticate with Urbit Gall App

The authenticate with Urbit ID gall app will allow external services/websites to verify that a user is who they say they are via their running ship. In other words, the website will be able to integrate this gall app/exposed endpoints with their existing login process to allow users to "Login With Urbit".

These websites need to be able to confirm with 100% certainty that a person owns the Urbit ship they claim to own, or else users can spoof and trick sites into thinking they are someone else. As such the gall app will enable identity verification via a streamlined process and will simply expose web server endpoints for the website back end to plug into (no airlock integration required).

We are choosing to implement a gall app instead of using using cryptography and crypto keys explicitly because it narrows down the complexity, skips requiring websites being forced to follow the Ethereum chain, and improves the UX considerably for end users. If we used crypto keys to check for identity, users would be required to have an Ethereum wallet installed in their web browser, ensure it has their software wallet keys or hardware wallet connected with their Urbit ID, and have to go through a multi-step process to sign a message to prove their identity every single time they want to login.

Furthermore with naive rollups on the way, this would leave out everyone on the rollups from being able to login using this scheme. This likewise would also be the case for users who jump into the Urbit ecosystem via an Urbit hosting service. As such we ruled out going down said route.

Instead we will be using the user’s running ship to authenticate them over the Urbit network itself. This will provide users a simple experience for logging themselves in to standard database-driven websites securely.Expected completion:

## Milestones

### Milestone 1 - A gall application named %hermes which allows external applications to authenticate user identities

Expected Completion: Mid-October 2021

Payment: 1 star
