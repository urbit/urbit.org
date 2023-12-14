+++
title = "Build a Single-Sign-On App for Urbit"
date = "2023-05-11"

[taxonomies]
grant_type = ["RFP"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "Produce an OAuth-compatible token issuer and login manager."
reward = "TBD"
assignee = [""]
champion = [""]
grant_id = "P1001"
completed = false
canceled = false

+++

OAuth has widespread support in Web 2.0 circles. OAuth issues permissioned tokens for service providers to manage sessions. There are burgeoning tools for Web3 integration.

OAuth focuses on access delegation, meaning that one can authenticate into a third-party session using a primary identity but without giving one’s password to the third-party service provider. “OpenID is a way to use a single set of user credentials to access multiple sites, while OAuth facilitates the authorization of one site to access and use information related to the user's account on another site.”

By providing Urbit with OAuth support, the ability to use Urbit to log into a variety of Web 2.0 services will be unlocked.

Some resources that may be helpful in scoping such a project:

- https://oauth.net/getting-started/
- https://www.oauth.com/oauth2-servers/getting-ready/
- https://www.pmail.com/devnews.htm
