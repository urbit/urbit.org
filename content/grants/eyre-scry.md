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
assignee = ""
champion = "~tirrel"
grant_id = "B0182"
completed = false
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefillGrant+ID=&prefillGrant+Name=Eyre%20Request%20Cache"
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

Eyre will store a map from URLs to clay scry paths. HTTP requests coming in to
eyre will first check this map, and if it matches, scries the file out of clay
and returns it immediately. It if doesn't match, it just goes through the
current normal path for HTTP requests.

New %tasks will be created for eyre to add and remove from this map.

A %warp request to clay is maintained for each clay file in the map in order to
be notified about changes to them. When notified about said changes, Eyre will
give a %gift to the runtime.

reward: 5 stars
