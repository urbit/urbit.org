+++

title = "Vere Support for Eyre Cache"
date = "2023-02-23"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Core Dev"]

[extra]
image = ""
description = "The second of a two-part bounty to add a cache to eyre."
reward = "3 stars"
assignee = ["~watter-parter"]
champion = ["~rovnys-ricfer"]
grant_id = "B0246"
completed = true
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefillGrant+ID=&prefillGrant+Name=Vere%20Support%20for%20Eyre%20Cache"

+++

## Rationale

Urbit's performance as a webserver is suboptimal, partially because the runtime does not expose a cache for GET requests. We will add a cache for GET requests that will allow inbound GET requests to avoid the Arvo event loop. This will drastically speed up the most common requests.

This is the second of a two-part bounty. The first part, [successfully completed by ~watter-parter](https://github.com/urbit/urbit/pull/5927), added the necessary support for this feature in the Eyre vane. This part will update the Vere runtime to make use of this new affordance in Eyre. Once this bounty is completed, both PRs can be merged into the codebase and be tested for release.

## Implementation

The implementation of the runtime portion of this work will involve changes to the runtime to mirror the change made to Eyre in the first section. ~rovnys-ricfer will meet periodically with ~watter-parter to discuss the best course of action.

The bounty will be successful when a cache has been successfully added and is being hit under normal usage. The test use case will be the serving of a blog or static page.

## Compensation

3 Stars

