+++
title = "Static Website Generation from Graph Store"
date = "2021-09-28"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]
[extra]
image = ""
description = "Publish Urbit notebooks to the clearweb"
reward = "5 stars"
assignee = ["~tacryt-socryp"]
grant_id = "P0058"
completed = true
canceled = false
link = ""
+++

## Static Website Generation from Graph Store

### Purpose

Publish is Urbit’s minimum viable tooling necessary for blog publishing. However, Publish lacks a critical feature: the ability to reach a clearweb audience. Many writers desire to own their data and writing experience, but shy away from writing on Urbit as the aggregate Urbit-based audience is orders of magnitude smaller than the clearweb. Building a tool to publish a Publish notebook as a static blog website is the best way to convert these writers.

The Hoon standard library has mature HTML templating functionality in the form of Sail, which allows a user-developer to pass in some predefined noun (in this case a `%graph-store` node) into a Sail template and output it as HTML.

Converting a Publish post to a static blog webpage upon any edit to the post can straightforwardly be accomplished via a Gall agent and a mark conversion. We propose that this well-defined and self-contained task can allow the specification of a few Sail template methods that take in a `%graph-store` node and render it as an HTML website.

### Use Cases

The first common use case we would like to support is to render a particular blog post as rich text, reusing many of the same JS libraries used in Landscape for the heavy-duty markdown rendering.

The second common use case we will build is rendering the blog post with comments.

The third common use case we will build is rendering a listing of all blog posts in particular notebook.

### User Stories

1. Justin Murphy has a Publish notebook. He wants to expand his audience by publishing to a regular clearweb site.
2. Justin installs the [~tirrel %static-blog] desk, which installs a Static Blog desk.
3. Justin already has a domain name set up that directs to his Urbit. He clicks the Static Blog tile. He sets a URL he wants to bind ‘/justinblog’ and picks a Publish notebook to bind it to “Justin Blog”. He picks a style he wants it to render in “Blog Article Only” (he could also select “Blog Article with Comments”)
4. He then clicks “Serve Page”, and his Publish Notebook is now rendered into static HTML and served at /justinblog.
5. He then goes to the Groups app and finds his Justin Blog. He writes a new article, and publishes it, then edits one of his existing articles and publishes it. He sees the latest state reflected on his new static site.

### Architecture: One Gall agent - %static-blog

++on-init: On initial load, tells file-server that it wants to serve a webpage at /static-blog, and subscribes to /updates on %graph-store

++on-load: n/a

++on-poke: Receives pokes which allow one to A) associate a particular graph with a particular mark that will convert that graph to a static webpage, B) dissociate them once associated, C) serve a set of static webpages at a path to the public web, D) stop serving a set of static webpages at a path.

++on-watch: Subscribe to the state of the application

++on-peek: Read out the files of a particular static site, read out the set of associations

### Future Directions:

- More marks can be built out that wrap the Sail generated from the graph-store -> html conversion and inject calls-to-action, payment links, and other forms of plugin content using Ford marks as a build pipeline

- Other graph types can and should eventually be able to converted to static sites as well.

## Milestones

### Milestone 1 - Build Agent

Payment: 3 stars

Build agent that has the build pipelines specified and watches for graph-store updates.

### Milestone 2 - HTML Templates

Payment: 1 star

Build out the two rich HTML templates for Publish notebook data specified above in “use cases”.

### Milestone 3 - Grid Tile

Payment: 1 star

Build out a tile in Grid for managing these web blogs.
