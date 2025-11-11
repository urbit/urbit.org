+++
title = "Urbit LFS - filehosting"
date = "2021-03-10"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Share large files"
reward = "4 stars"
assignee = ["~tabnus-fondeg"]
id = "1736585775"
completed = false
canceled = true
link = ""
+++

## Vision

Allow Urbit to be a personal cloud storage interface. Upload files/images to a provider and share links with chats. A technical user can be their own provider.

## Design

A provider is a ship running the lfs-provider gall app that is paired with an http fileserver. A client is a ship running the lfs-client gall app.

A provider can limit clients to %kids, specific groups, or manual lists of authorized ships. A client can subscribe to multiple providers.

When a client requests an upload, the provider verifies permissions and file storage limits, and returns a one-time upload url to the fileserver.

When the uploading is finished, the fileserver notifies the provider to update client storage usage.

## Me

I'm an experienced functional programmer, but amateur hooner. I've read through the Urbit hoon docs, and the GitHub Gall Guide, and I'm starting to appreciate the odd martian soil. I want to try building something real and practical on the platform. I want to run a personal fileserver with my Urbit instead of emailing files and moving USBs.

After completing an exploratory proof-of-concept, this proposal replaces https://grants.urbit.org/proposals/1760204192 with more detailed project milestones.

## Milestones

### Proof of concept

1 stars
Client – Proivder – Fileserver

Client subscribes to a provider, and pokes to request an upload. Provider creates an upload url on the fileserver, and passes it to the client.

### Upload limits

1 stars
Provider tracks uploaded files per client and enforces filesize limits based on groups, %kids, list of ships. Clients store limits locally as well.

Fileserver confirms upload to provider

### Handle Errors

1 stars
When any of the servers shutdown, a transaction is either canceled or can be resumed from a checkpoint.

Provider can import/export the map from ship to uploaded files to prevent data loss.

### Permissions and demo UI

1 stars
The fileid gives permission to delete the file on the fileserver. Create and manage share-links using fileid. Provider can throttle file requests.

Demo html/javascript UI for client to manage files.
