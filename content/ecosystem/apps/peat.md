+++
title = "peat"
developer = "Quartus Co."
shortcode = "~dister-dozzod-dalten/peat"
description = "Graph Backup and Restoration Utility"
license = "REKT"
website = "https://dalten.org"
bgColor = "#574D5A"
+++

Peat is Urbit's first backup utility and works with the %graph-store backend. Quartus is also working to support backup and recovery for arbitrary agent state via %keep, as well as updated utility tooling that supports the new Groups backend.

![Screenshot](https://storage.googleapis.com/media.urbit.org/site/ecosystem/applications/peat.png)

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