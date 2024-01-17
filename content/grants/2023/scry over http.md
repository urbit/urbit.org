+++

title = "Scry over HTTP"
date = "2023-09-30"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Core Dev"]

[extra]
image = ""
description = "Map URLs to scry requests"
assignee = ["~watter-patter", "~palfun-foslup", "~rovnys-ricfer", "~master-morzod"]
completed = false
canceled = false
reward = "n/a"
+++

# Description
Vere will interpret certain HTTP requests as scry requests and call into Arvo's +peek arm to perform the query statelessly, rather than injecting an event using Arvo's +poke arm. Vere could also maintain a cache for such HTTP requests, but that is not a requirement for a practical runtime.

# Motivation
 - We want to support requests for fully qualified scry paths, in case a ship is re-publishing someone else's content
 - We want to support %pine-style requests at the ship's current date, without the client knowing that date ahead of time
 - We need to have a coherent story for mark-converting scry responses
   - We could always jam the result of a scry request as either a default or fallback
   - We need to support arbitrary mark conversion, e.g. conversion from some mark to %json, or %html   to %mime -- %mime is probably the default

# Specification
A URL for a scryable path has the following format, where $foo means a variable path element that has valid Hoon literal syntax, *foo means a possibly-null sequence of path elements, and [exp] means an optional expression: /$PREFIX/$view/$ship/$desk/$case/*spur[.$mark]

The HTTP verb in the request must be either GET or HEAD. If it is a HEAD request, the same machinery is run as for a GET, and the same headers are present in the response, but the response body (which contains the mime-converted noun) is excluded.

# Path Resolution
The path is either a fully qualified scry path that includes the beak ([ship desk case]), or it is a partial path that does not include the whole beak.

 - $PREFIX = _~_
 - $view = %gx, %cy, %j, etc.
 - $ship, $desk, and/or $case can each be replaced with = (the fully resolved path for /===/foo/bar would be /(scot %p our)//(scot %da now)/foo/bar)

For fully qualified scry paths, the response will include a Cache-Control: max-age=31536000 header, to indicate that the response remains valid permanently. For partial scry paths, the response will include a Cache-Control: no-cache header instead. Vere will also include the Content-Length header. This implies that the result of Vere's scrying into Arvo should be a pair of %mime and a noun of the mime mold, which Vere will convert into a full HTTP response, adding headers along the way.

# Mark Conversion
If the URL does not contain a .$mark element, then Eyre will convert the mark in the cage of the scry result into %mime. If the URL does contain a .$mark element, Eyre will convert the mark in the cage of the scry result into the specified mark, then into %mime. Vere will set the HTTP response's Content-Type header to the value of the head of the mime datastructure.

If the request was made to Clay, the $desk element of the URL will be used to load the mark conversion gate. If the request was made to a Gall agent, Eyre will use the desk from which that agent was compiled to load the mark conversion gate. In all other cases, Eyre will use marks from the %base desk.

# Redirects
A variant of this design was proposed that included an optional ?redirect query-string parameter. This was rejected at least for the initial version to prevent scope creep. The original design is quoted here for posterity:

  If the URL includes the ?redirect query string, then Vere will handle this request by first resolving the request to a fully qualified scry path, then redirecting to that path. Without that header, Vere will handle the request directly. This distinction is to protect the behavior of a user refreshing in their browser to see the latest version of some file. If Vere redirects by default, the user would have to understand what was going on and also click "back" each time they wanted to refresh, which would be annoying and counterintuitive.

# Backward Compatability
This does not conflict with any existing uses of the URL namespace.

# Security Considerations
This should use the same authentication as other Eyre requests: Vere can use its existing machinery to check whether a request is authenticated (as our), which Vere then uses to populate the security mask when it calls Arvo's +peek arm.

You should be able to share one of these URLs with someone and they could auto-log-in as their Urbit to see the data. The upcoming eauth system would be the way to get this functionality. In order to get this to work with eauth, Vere will need to know about eauth sessions, so that it can scry into Eyre with the appropriate ship in the permissions mask when it calls Arvo's +peek arm. This will require augmenting the HTTP I/O driver with a (map session-id ship), since with the current eauth design, only Eyre knows about eauth sessions -- only our own sessions are legible to Vere.

A later proposal could address a shortcoming of this proposal, namely that authenticated requests can't be cached in Vere. To address this, the kernel would need to support a request asking whether a particular ship can access a scry path, without running the full scry request handler. The result of this scry would be a boolean flag.
