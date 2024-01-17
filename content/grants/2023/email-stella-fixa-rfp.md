+++
title = "Build an Email Toolchain for Urbit"
date = "2023-05-11"

[taxonomies]
grant_type = ["RFP"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "Produce an Urbit-side client for sending E2EE email"
reward = "TBD"
assignee = [""]
champion = [""]
grant_id = "P1001"
completed = false
canceled = false
+++

Email is the glue for much of the legacy web.  While many of us share an aversion to the proliferation of email, the ability to tie email to Urbit identity will enable users to unify their control over their digital life more than is currently possible.

There are a lot of ways such a project could shake out.

- The gold standard would basically be run-your-own-ProtonMail from Urbit.
- One could also build a CLI email agent, like [Mutt](http://www.mutt.org/).  This would be a good start.
- Implementing [JMAP](https://en.wikipedia.org/wiki/JSON_Meta_Application_Protocol) should be feasible as well, and simpler than IMAP/SMTP.
- The minimum viable product would be a front-end on Mars for a connected email server process on Earth, including a full user story on how to operate this without too much tetchy sysadmin work required.

Anything in between would also be acceptable.  There are some interesting crossovers possible as well, such as sending email to `@p` or via the `user@sampel-palnet.arvo.network`.
