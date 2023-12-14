+++
title = "Eyre Request Cache"
date = "2022-06-14"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Core Dev" ]

[extra]
image = ""
description = "Speed up Urbit http server by implementing a cache for requests"
reward = "5 stars"
assignee = ["~watter-parter"]
champion = ["~tirrel"]
grant_id = "B0151"
completed = true
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefillGrant+ID=B0151&prefillGrant+Name=Eyre%20Request%20Cache"
+++


## Rationale

Urbit is a personal server, but the webserving part of it is slow, which is a
problem for any use case that involves using your urbit as a regular webpage
server and handling requests at scale. However, it doesn't need to be slow. For
its HTTP I/O driver, Urbit uses a library called H2O, which is incredibly fast,
but unfortunately, Urbit cannot take advantage of that speed because every HTTP
request currently is routed through the slow Arvo event loop.

Since a large amount of HTTP requests are essentially just read requests, we can
treat many of them as cacheable scries, which would allow the Urbit runtime to
fulfill them without invoking the Arvo event loop.

This would enable Urbit users with large audiences to serve web pages to them
without worrying about making their Urbit slow and unusable. This would
eliminate the need for a pattern we've frequently seen of people putting an
nginx or caddy cache in front of their Urbit to mask its shortcomings.

This is one part of a two-part bounty. This part focuses on the changes to the
the Eyre API on the Arvo side, and the second part focuses on changes to the
runtime. This part can be merged into the Urbit codebase before the runtime
work, but the desired speedup will not occur until both parts are in.

## Implementation

Eyre will store a map of mutable URL bindings to a trie (`+of` core) that contains a tagged union of either a scry path or a pair of a simple payload (defined in lull.hoon) and an aeon (a revision number).

HTTP requests coming in to eyre will first check this map, and if it matches, returns either the payload immediately, or performs the scry and returns that immediately. It if doesn't match, it just goes through the current normal path for HTTP requests.

New %tasks will be created for eyre to add and remove from this map.

Eyre will give a %gift to the runtime upon startup and whenever a binding is added or removed from the map.

### Milestone 1: 3 stars

Have a complete pass-through interface inside Eyre for catching GET requests and
bypassing the normal flow to do a scry instead. Fully implement the Clay request
flow and subscription for keeping track of all scry paths in the map. Milestone
is considered complete once the code is to spec and has been tested by
~tacryt-socryp.

### Milestone 2: 2 stars

Have a complete modification to Arvo for issuing a new runtime %gift to notify
the interpreter that content in the Eyre scry map has changed, and test  that it
is sent upon %born events and when content changes. This milestone is considered
complete once the code is to spec, it has been tested by ~tacryt-socryp, and one
or more reviewers from the core team has approved the code, but not necessarily
merged it.

reward: 5 stars
