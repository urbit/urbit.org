+++
title = "Filesharer"
date = "2022-02-16"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "Simple file sharing on Urbit"
reward = "2 stars"
assignee = ["~tinden-pontev"]
grant_id = "P0102"
completed = false
canceled = true
link = ""
+++

## Overview

Filesharer will allow peers to upload files to managed storage, either on or off
Urbit, and share files with each other. It will also allow the user to control
access to his files using a whitelist of users and/or groups combined with user
defined tags for each file. Integration with the %pals app will allow easy
sharing with friends (mutuals).

## Implementation details

The app will handle:

- File metadata and sharing of file URLs: Web, IPFS, clay, and is extensible to
  other formats.

- Permissions by users and (subscribed) groups, tags.

- Adding/removing files to be shared, system save dialog of saved files from
  'server' ship, management of file tags

## User Stories

As a user, I can:

- Upload files to online storage using Urbit, S3, IPFS.

- Designate access to files by user or by group.

- Organize and fine tune access by file with user defined tags.

## Background

I started the Filesharer apprenticeship grant early last year with
~timluc-miptev as my advisor. I implemented a basic functionality in the
back-end to share links between peers using a whitelist of users and/or groups.
The ability to create user defined tags was included, but does not affect access
rules.

The following areas need to be added:

- Adding the ability to differentiate white listing by tag. This will add quite
  a bit of complexity, but the value should be well worth it.

- Adding a black-list of users and/or groups

- Integration with the `%pals` app

- Adding scrys that will be usefull to the front end. There are scrys
  implemented in the current state, but the exact form of scrys needed in the
  final project may be different.

## Milestones

### Milestone 1: Add functional web app front end for current filesharer.

Expected completion: 8 weeks

Payment: 1 star

- Rework state and clean up code for implementation of planned features and
  improving readability.
- Create web interface to allow upload and download of files with %clay and S3
  with current (simple) access control.

- Add scrys to allow browsing files by tag, by user (ship), and by file type.

- Finished state should allow some testing with "real world" use.

### Milestone 2: Expand features and app integration

Expected completion: 8 weeks

Payment: 1 star

- Add ability to restrict whitelist by tag.

- Add blacklist of users.

- Include IPFS file links. And any other appropriate formats.

- Add integration with %pals app
