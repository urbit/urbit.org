+++
title = "Runtime Support for Scry over HTTP"
date = "2024-04-28"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Core"]

[extra]
image = ""
description = "Runtime Support for Scry over HTTP"
reward = "1 star"
assignee = [""]
champion = ["~rovnys-ricfer"]
grant_id = "B0343"
completed = false
canceled = true
+++

Arvo now supports receiving scry requests as HTTP GET requests (as of [this PR](https://github.com/urbit/urbit/pull/6741)), but they are not optimized in the runtime. What remains to be done is:

- Add dispatch logic to the runtime to submit an Arvo +peek (read) request instead of a +poke (write) request that injects an event, based on whether the path in the URL indicates the request is a scry request, i.e. it starts with /~_~/.
- Ensure the runtime honors whether the request is logged in using the standard auth token. There is prior art for this check, in the runtime's static HTTP response handler.
- Add logic to look up the scry request using the runtime's existing HTTP scry cache.
- Add logic to populate the HTTP scry cache when receiving a scry response from Arvo.