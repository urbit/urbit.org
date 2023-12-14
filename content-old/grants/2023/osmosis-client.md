+++

title = "Osmosis Client on Urbit"
date = "2023-03-26"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "The Urbit client for the Osmosis multi-chain DEX."
reward = "3 Stars + Bonus"
assignee = ["~larryx-woldyr"]
champion = [""]
grant_id = "B0234"
completed = true
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0234&prefill_Grant+Name=Osmosis%20Client%20for%20Urbit"
deliverable = "~larryx-woldyr/osmosis"

+++


## Overview

An Urbit app that serves a personal client for the [Osmosis](https://app.osmosis.zone) multi-chain DEX.

## Rationale

Osmosis is the leading decentralized exchange for the Cosmos ecosystem. Most users access this DEX through [the front end developed](https://github.com/osmosis-labs/osmosis-frontend) by the Osmosis team and deployed at [app.osmosis.zone](https://app.osmosis.zone).

Like many Dapps, the most used Osmosis front end is hosted on a central server. This falls short of the promise of decentralization and makes the application less resilient. On Urbit, it is easy for users to host their own front ends, making the system truly decentralized.

Osmosis uses local browser storage for user configuration. This is not portable across browsers on the same machine or on different devices. The storage of this metadata on a user's urbit allows the data to remain private to the user and will survive swapping browsers and devices. At a later date, this configuration can be used by other apps and expand the scope of interoperability, eg. displaying which ships in a chat have a Cosmos wallet.

## Scope / Implementation

The first phase of this project is to bundle the [existing Osmosis front end](https://github.com/osmosis-labs/osmosis-frontend) and make it possible to serve from an Urbit.

Once this is accomplished, a simple gall back end will be developed to replace the Osmosis client's use of browser `localStorage`. It may be necessary to fork the `osmosis-labs` code in order to replace API calls to localStorage with calls to the Urbit back end.

Developer can assume that users will access this client through a browser that can install the Keplr wallet extension. There are currently projects in process to create an in-Urbit Cosmos wallet, but that integration is out of scope for this bounty.

## Compensation

3 Stars with a 1500 USDC bonus to be provided by the Osmosis foundation.

