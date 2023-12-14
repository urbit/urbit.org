+++
title = "Content Saver"
date = "2020-03-19"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev", "Arvo" ]

[extra]
image = ""
description = "Extract and save content from HTML."
reward = "2 stars"
assignee = ["lurodrigo (~tirdyr-lagrum)"]
id = "1163181298"
completed = false
canceled = true
link = ""
+++

Build an endpoint that enables the extraction of a web-pages content from HTML. The backend functionality of the [Instapaper](https://www.instapaper.com/) app should be the model here, as should the [Reader from Firefox](https://github.com/mozilla/readability).

This app should be able to: Copy both a given highlighted block of text, or a discrete page in Urbit’s blog/Publish application, give the user the option of renaming it, and save it in Markdown to the user’s Urbit planet or ship.

If you have a web scraper that can go out and fetch web pages for you, like the one indicated in [this bounty](https://grants.urbit.org/bounties/1967189374-web-scraper), you can just poke the Publish app to save it and be able to read it in Publish. (Note: this bounty is not to build a web scraper, but simply the content-extraction component)
The file should strip the content out of HTML and save it into the Markdown format.

### Resources:

- [The Instapaper API](https://www.instapaper.com/api)
- [Firefox Readability](https://github.com/mozilla/readability); this implementation can be copied to the extent that you desire.

### Contribution Guidelines:

- Do not begin work until your request to claim this bounty is accepted. We will assign a designer to work with you on the interface.
- Do not begin work until your request to claim this bounty is accepted. We will assign a designer to work with you on the interface.
- Submit your code as a PR to the [urbit](github.com/urbit/urbit) repository.
- You have 90 days from the time of approval to complete this bounty.

## Milestones

### PR is merged

2 stars
Your code is accepted and merged.
