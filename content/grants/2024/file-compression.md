+++

title = "File Compression"
date = "2024-06-14"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Core"]

[extra]
image = ""
description = "Implement a compressed file type."
reward = "2 Stars"
assignee = ["~ramsyd-sanryg"]
champion = ["~tamlut-modnys"]
grant_id = "P0357"
completed = false
canceled = true

+++

With the impending arrival of Ares and directed messaging, Urbit will soon be able to send and store large files. In the traditional computing environment, zipped files are a useful way to soften demand when sending and storing large files. This will be useful on Urbit as well. We'd like to take inspiration from the [DEFLATE](https://en.wikipedia.org/wiki/Deflate) algorithm as well as the [gzip](https://en.wikipedia.org/wiki/Gzip) program and file format.


## Milestone 1: GZIP Compression Library
Payment: 1 Star
ETA: July 2024

Deliverables:
- GZIP Compression Library: Implement a library that will allow developers to turn any piece of Urbit data into a compressed file
- GZIP Mark File: Create a file type for compressed files
- Combine work with the previously completed de-compression work by ~nomzod-wacbyr to create a coherent library
- Thorough tests and documentation for the above.

## Milestone 2: Archive Utilities
Payment: 1 Star
ETA: August 2024
Deliverables:
- Libraries and Mark Files for Archive Formats: Develop libraries and mark files for tar and ZIP files.
- File Compression Generator: Implement a tool to compress individual files or batches of files as an archive in either ZIP or tar format, providing functionality equivalent to standard Linux compression and archive utilities.
- Tests and documentation for the above.