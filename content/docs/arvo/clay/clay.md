+++
title = "Overview"
weight = 1
template = "doc.html"
aliases = ["/docs/learn/arvo/clay/"]
+++

Our filesystem.

`%clay` is version-controlled, referentially-transparent, and global.
While this filesystem is stored in `%clay`, it is mirrored to Unix for
convenience. Unix tells `%clay` whenever a file changes in the Unix
copy of the filesystem so that the change may be applied. `%clay` tells
unix whenever an app or vane changes the filesystem so that the change
can be effected in Unix. Apps and vanes may use `%clay` to write to the
filesystem, query it, and subscribe to changes in it. Ford and gall use
`%clay` to serve up apps and web pages.

`%clay` includes three components. First is the filesystem/version
control algorithms, which are mostly defined in `++ze` and `++zu` in
zuse. Second is the write, query, and subscription logic. Finally, there
is the logic for communicating requests to, and receiving requests from,
foreign ships.

### User documentation

[Filesystem](/using/os/filesystem)

How to interact with the Clay filesystem via Dojo. This includes basics such as
mounting to Unix, changing directory, merging, and listing files.

### Developer Documentation

[Architecture](/docs/arvo/clay/architecture)

A conceptual overview of how Clay was designed.

[Using Clay](/docs/arvo/clay/using)

A quick overview of how the most common tasks involving Clay are performed:
reading and subscribing, syncing to Unix, and merging.

[Data Types](/docs/arvo/clay/data-types)

Explanations of the many data types found throughout Clay.

[Scry Reference](/docs/arvo/clay/scry)

Reference for Clay's various scry endpoints.

[API Reference](/docs/arvo/clay/tasks)

Details of the various `task`s you can use to interact with Clay.

[Examples](/docs/arvo/clay/examples)

Example usage of the various Clay `task`s.

[Marks](/docs/arvo/clay/marks/marks)

Details of `mark`s as well as a guide to writing them and their usage.
