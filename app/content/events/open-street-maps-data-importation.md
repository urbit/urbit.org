+++
title = "Open Street Maps Data Importation"
date = "2020-07-08"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Tool" ]

[extra]
image = ""
description = "reate a mapping tool which allows Open Street Maps data to be imported into Urbit."
reward = "2 stars"
assignee = [""]
id = "1072822195"
completed = false
canceled = true
link = ""
+++

Create a mapping tool which allows Open Street Maps data to be imported into Urbit from the OSM API, stored and queried locally, and exported to be rendered by existing map rendering Javascript libraries.

This grant should involve 2 major steps:

1: Create a client which makes it possible for OSM data in multiple formats to be serialized into Urbit and converted into a Hoon data structure.

2: Create methods by which this data can be stored and queried in Urbit, then exported and rendered by at least two different common Javascript map rendering libraries.

Additionally, write a one-page explanation for your design choices in the readme. Also in the readme, write an explanation of you you might expect a user-facing app to take advantage of your backend.

### Resources:

- [OSM Copyright and License Details](https://www.openstreetmap.org/copyright)
- [OSM API Usage Policy](https://operations.osmfoundation.org/policies/api/)
- [Rendering](https://wiki.openstreetmap.org/wiki/Rendering)
- [OSM File Formats](https://wiki.openstreetmap.org/wiki/OSM_file_formats)

### Contribution Guidelines:

- Do not begin work until your request to claim this bounty is accepted.
- Submit your work as a separate github repo, and email grants@urbit.org.
- Storage concerns: The entire OSM dataset is 40GB, so this client should be constructed so as to allow the manipulation of smaller sectors (corresponding to geographic regions) of data at any given time. The Urbit system has a memory + storage limit of 2GB.
- License: Make sure to read the above link carefully and credit OSM for the relevant data on any user-facing interface.
- When applying to work on the bounty, tell us a little about yourself and some projects you’ve worked on in the past.
- You have 90 days from the time of approval to complete this bounty.
- Successful completion of this bounty may result in an invitation to complete other API bounties.

## Milestones

### You are finished

2 stars
Your work has been approved.
