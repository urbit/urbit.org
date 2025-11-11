+++
title = "Importing and exporting desks as jamfiles"
date = "2022-09-25"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Improve the application development experience through simplified importing and exporting of desks."
reward = "2 stars"
champion = ["~tinnus-napbus"]
assignee = ["~niblyx-malnus"]
grant_id = "B0187"
completed = true
work_request_link="https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0187&prefill_Grant+Name=Desk%20jamfile%20import%2Fexport"
+++

## Rationale

App development is typically done on a fake ship. Fake ships are isolated from
the network. If you're developing an app that interfaces with other apps, it is
inconvenient to install those apps on a fake ship as well as get the necessary
file dependencies into your own desk. Usually it involves cloning git repos,
copying around a bunch of files, and fiddling with desk merging, mounting and
editing.

To simplify this process, a way to easily import/export desks and sets of
files is necessary. 


## Overview

An app should be developed that allows users to export desks or sets
of files as jamfiles through a web UI. The jamfiles can then be imported
and either initialise a desk or be merged into an existing desk.

## User stories

As a user, I can:

- Jam a desk and download its jamfile through a web UI.
- Be presented with all files in a desk in a similar format to the output of the
  `+tree` generator, select a subset of those files, and export them in a
  jamfile through the web UI. I would use this to create jamfiles containing
  dependencies for other devs who want to interface with my app.
- Import a jamfile by fetching it from a URL I specify or by uploading it
  through a file browser dialog.
- Create a new desk from an imported jamfile.
- Merge an imported jamfile into an existing desk.

## Implementation notes

- This is going to require wrangling Clay datastructures which are a little
  complex (but not too bad).
  
- Desk creation will have to be done with a `%park` `task:clay`, this is
  currently undocumented in the Clay docs as it's fairly low-level and not
  typically used from userspace. You can look at `new-desk:cloy` in `zuse.hoon`
  for how `%park` works. You can also refer to the code in [this
  PR](https://github.com/urbit/urbit/pull/5360) for inspiration.

- It may be possible to design the jamfile to only contain the desk/files, but
  it may need to include additional metadata such as desk name, whether it's a
  full desk or just a set of files, etc. It is desirable for this information to
  be displayed to the user before they commit it to Clay. It would probably be
  good for it to list the files before commit too.

- When the user wants to merge an imported desk into an existing one, they may
  need to be presented with merge strategies to choose from. It should probably
  default to a sane one so they don't need to think about it in most cases.

- When exporting, a sensible naming scheme is desirable for the jamfile so it's
  obvious what it is.

- It is probably desirable for the user to be able to choose older desk aeons to
  export. You would have to handle the possibility of tombstoning with this
  though.

- Note: Clay no longer uses the `blob:clay` datastructure but now uses a simple
  `$page` in its place as defined in `arvo.hoon`. The docs are a bit out of date
  with this, so eg a `%blob` scry now returns a `page` rather than `blob:clay` as
  the docs say.

- [Clay is reasonably well documented
  here.](https://developers.urbit.org/reference/arvo/clay/clay)

- The front-end for this could be written in sail or something like React. It
  mostly just needs static forms so either will probably work.

- The app probably doesn't need to store imports/exports in its state apart from
  maybe the current import temporarily if it needs to be examined for info to
  display to the user.

## Milestones & Compenstation

1. Implement full desk export and create a new desk from an imported jamfile.
   (1 star)

2. Implement exporting a subset of a desk's files and merging imported desks
   into an existing desk with the user's choice of merge strategy. (1 star)
