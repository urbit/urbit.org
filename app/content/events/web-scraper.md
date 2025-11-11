+++
title = "Web Scraper"
date = "2020-02-06"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps", "Dev: Tool" ]

[extra]
image = ""
description = "It is often useful for archival purposes to pull down an entire website, however many sites have a complex network of pages that would be difficult to download one at a time."
reward = "1 star"
assignee = ["~dalsup-ridges"]
id = "1967189374"
completed = false
canceled = true
link = ""
+++

Build a web crawler that given a url will walk through all the links for that given domain and download each page, rewriting the links to be local as it goes. This web crawler should be written as a thread that writes to Clay.

A completed app should:

Take a url or set or urls, connect to the given url over HTTP and download each page, following links on the same domain and rewriting the links to be local as it goes. This should function like wget with the `--mirror`, `--convert-links`, and `--page-requisites` options.

### Resources

[wget](https://www.gnu.org/software/wget/)

### Contribution Guidelines

Do not begin work until your request to claim this bounty is accepted. We will assign a designer to work with you on the interface.

### Submit your code as a PR to the Urbit repository.

- Do not begin work until your request to claim this bounty is accepted. We will assign a designer to work with you on the interface.
- Submit your code as a PR to the [urbit](https://github.com/urbit/urbit) repository.
- You have 45 days from the time of approval to complete this bounty.

## Milestones

### PR is merged

1 stars
Your pull request is merged.
