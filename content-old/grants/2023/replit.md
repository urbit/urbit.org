+++

title = "Replit & Replit Integration for Site"
date = "2023-06-21"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Other"]

[extra]
image = ""
description = "Produce a Replit-compatible binary and instance."
reward = "4 stars"
assignee = ["~topdul-fosrus"]
champion = ["~mastyr-bottec"]
grant_id = "B0282"
completed = false
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0282&prefill_Grant+Name=Replit%20%26%20Replit%20Integration%20for%20Site"

+++

#   Replit & Replit Integration for Urbit Developer Site

A Replit instance lets you specify the running status of a ship and associated files.  In practice, this means a fakezod which is automatically logged in, has `%base` `|mount`ed, and has `|autocommit` set for ease of use.  The instance should connect to the file in some cases, the Dojo terminal in others.

We anticipate that the biggest part of this bounty will focus not on designing the Replit environment but instead on building a Prybar binary for full REPL compatibility.

By forking from your base instance, you should be able to prepare a base instance which meets the above basic setup criteria.  Then from that, build forks which automatically inject the correct code when a generator or other specified expression has been supplied to the student.

##  Milestones

### Milestone 1 (3 stars)

Build a working Replit-compatible binary and base instance.  This Replit instance should be [Prybar](https://github.com/replit/prybar)-compatible so that the Replit console can directly run the Dojo instance.  (That is, no `screen` or `tmux` screen management is necessary for the user.)

This may require using `%khan` and other affordances to interact with Dojo or a primary agent.

The final deliverable should include the Prybar binary, a base Replit instance, and a Docker image suitable for use with Replit.

### Milestone 2 (1 star)

The Hoon School docs will benefit from direct integration of executable code blocks.  To claim this bounty, you will need to prepare and include customized Replit instances at every appropriate explanation, exercise, and challenge in [the Hoon School docs](https://developers.urbit.org/guides/core/hoon-school).  (This does not mean everywhere there are code blocks now; you will work with your grant champion to identify all of these.)

(This can be split into a separate bounty based on temperament of the grantee completing Milestone 1.)

##  Resources

- https://docs.replit.com/programming-ide/configuring-repl
- https://github.com/replit/prybar
- https://replit.com/@matthew-levan/Urbit-1#README.md
- https://docs.replit.com/hosting/embedding-repls
