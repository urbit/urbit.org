+++

title = "Peat"
date = "2022-08-17"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Social Areoloy, or, Urbit's first Backup Utility"
reward = "4 stars"
assignee = ["Quartus"]
champion = ["~sarlev-sarsen"]
grant_id = "P0174"
completed = true
canceled = false
link = "~magped-magped-rabsef-bicrym/peat"
deliverable = "~magped-magped-rabsef-bicrym/peat"

+++

# Background

Peat - Social Areology
Peat is Urbit's first backup utility. Outside of the Flag Day script and other areologic phenomena, the breach has been an impenetrable data barrier for hosts of Urbit content. Worse still, the breacher's compatriots retain access to distal copies of a host's data while the source is destroyed. Additionally, Agent state has been, to date, considered ephemeral trans-breach.

# Rationale
Urbit will eventually be a perfect diamond protocol at the center of a computing dynasty. Until that time, however, people will experience issues with their urbits. Sometimes, people will breach.
Unfortunately, data continuity across breach has remained technically possible but practically impossible for users, to date.
Urbit has been blessed with the growth of dozens of High Quality Communities each generating their own High Quality Content. Unfortunately, prior to our efforts with Peat, when the host of a High Quality Community went down, the content was lost to the ether. With Peat, this changes. Peat has already been used to recreate extremely large, high quality groups including a [chat in the Uqbar group](https://twitter.com/hocwyn/status/1543387336670695425?s=20&t=S8-xLa-tYgyvcZNXEPQtSw), and [the entirety of Networked Subject (formerly hosted on ~matwet)](https://twitter.com/_matwet/status/1544863199870214152).

As a note, **networked subject_** had been active and un-breached since OS1 released and included over 13,000 individual nodes in just one of its 5 graphs.

## Peat in a Nutshell
- Import
    - Recover a Social `graph` from a saved file - transferrable between ships
- Export
    - Export a Social `graph` to a file on underlying file system (e.g. Unix)
- Backup/Restore
    - Local recreation of a `graph` that exists, 're-basing' the `graph` to be hosted by the local ship
## Import from Disk - Details
- User has a `/path/to/pier/<project-desk>/hav` directory for importing (though they could import from anywhere, really).
- User also has a form interface, through Peat's webapp allowing them to import without tracking the files in their loom.
### From Clay
- User gets instructions from the frontend as to how to add files to this directory and commit the desk so the files are available in the OS
    - NOTE: This should be converted to using `drum`'s `get` functionality at some point, but this hasn't been wired up yet in `drum`.
- User can see all files available for restoration in the default `hav` directory, delineated by whether they represent Agent `state` or `graph`s
- User can select a file for restoration
- User can apply the file for restoration
    - Potentially needing to specify additional details, for a `graph` (e.g. what `group` to associate it with, and what to call the new `resource`)
User is informed that the restoration is underway/has completed
### From Web
- User gets instructions from the frontend as to how to upload files through the frontend, resulting in their unpacking and importing to graph store
- User can select from local files on the computer through which they're accessing the frontend.
- Note: This method avoids polluting loom with transient files - it is to be the preferred method
# Schedule/Compensation
## Milestone 1
- Peat is available on a distribution moon for use against `graph-store`
- Peat users can backup and restore graphs from disk, or duplicate extant graphs where they have access to the graph in their current `graph-store` instance.
Compensation: 3 Stars
## Milestone 2
- Peat is updated to work against new groups/socials method post assembly, post release of developer version (though we will try sooner)
- Peat includes a conversion utility for importing `graph-store` graphs into new groups/socials.
Compensation: 1 Star