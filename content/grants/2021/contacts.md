+++
title = "Userspace Apprenticeship: Contacts App"
date = "2021-06-16"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "App Dev", "Arvo" ]

[extra]
image = ""
description = "Contact Management App"
reward = "1 star"
mentor = ["~timluc-miptev"]
assignee = [""]
completed = false
canceled = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0034&prefill_Grant+Name=Contacts%20App"
+++

### Contacts App

Urbit currently has ship metadata, but there is room for alternate products here. It would be useful to be able to attach arbitrary metadata to a user, both in textual format to describe them, graph-store links to materials they've written, automated lists of groups they're in, and programmatically-accessible metadata that can be used for filtering and permissioning.

These contact lists could then be shared between ships as a way to jumpstart people into your social network. Alternate interfaces to chats could give read/write access to them. While it's unlikely that this exact product would be what people finally use, it would go a long way towards feeling out the user-metadata design space.

This project would be great for someone who wanted to learn more about how Urbit data storage and sharing between apps works, as well as understanding how to interact with `graph-store`.

### User Stories

As a user I can:

- add text data to another user
- add permissions/markers to another user
- create a collection of `graph-store` links with data about the user
- automatically collect known groups the user is in
- search the user's written materials in `graph-store` (using `graph-query` or similar).
- share metadata about users with other ships, along with ways of merging it.
