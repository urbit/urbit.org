+++
title = "Guide to S3"
date = "2021-03-17"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Documentation" ]

[extra]
image = ""
description = "Contribute an easy-to-follow guide on self-hosting an S3 storage solution for use with Urbit to urbit.org."
reward = "1 star"
assignee = ["~tomnyr-tirsyr"]
id = ""
completed = true
canceled = false
link = ""
+++

The aim of this proposal is to produce, publish and maintain an easy-to-follow guide on self-hosting an S3-compatible storage solution for use with Urbit, with the goal of having it merged into the urbit.org site.

Currently most users have to rely on a large cloud provider to manage and host their S3 storage. However I imagine most users of Urbit are the kind of people that do not want to trust these providers with their data, and would much rather host themselves.

Unfortunately installing, configuring, securing and hosting this kind of software can be quite fiddly and time-consuming. There are quite a few moving parts (configuring the S3 solution, hosting with Docker, reverse proxying, TLS, DNS…) and debugging issues can be difficult. I work with these technologies on a daily basis at my job, and have plenty of experience troubleshooting them.

The process is very similar whether the user opts to host on their own hardware, or with a cloud provider like DigitalOcean - so the guide will cover both options.

I have already written a basic guide on hosting MinIO for use with Urbit, and a handful of users have indeed found it useful. However I did not spend long writing it, and it is published on a proprietary platform at a potentially non-static URL. I now plan to re-write and contribute the guide to urbit.org, with the aim of everyone on Urbit having the knowledge they need to self-host this solution should they want to.

## Milestones

### Guide written

1 star
The full guide, written up and merged to urbit.org.
