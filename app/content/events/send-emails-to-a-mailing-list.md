+++
title = "Send Emails to a Mailing List"
date = "2021-10-07"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]
[extra]
image = ""
description = "An agent that works with SendGrid, to be used for sending subscriber content to a mailing list."
reward = "4 stars"
assignee = ["~novlud-padtyv"]
grant_id = "P0066"
completed = true
canceled = false
link = ""

+++

## Send Emails to a Mailing List via Urbit

Writers prefer reaching their audiences via email because email has the highest open rate. Urbit provides a writer the ability to own their data and network, but limits a publication's reach by confining it within Urbit. Enabling a writer to send emails from their Publish Notebook directly to their mailing list will allow them to reach their whole audience while continuing to own all of their data, and enhance Urbit’s popularity as a content platform.

We propose writing a Gall agent called `%mailer` to hook up a writer’s Urbit server to the Sendgrid REST API and allow them to automatically send emails to different mailing lists when they publish new notes to specified notebooks.

The initial task is getting the Urbit to send plaintext emails and basic HTML emails properly. Next, we
allow the Urbit to store the writer's mailing list in a Gall agent and provide a means of importing mailing addresses via CSV.

Once `%graph-store` posts can be converted to HTML, we will support converting `%graph-store` posts to rich HTML emails. The mark converters will work in the same way as in the static site project but repurposed for the context of email.

The interface to this project will be provided as a “Mailer” tile which has basic UI affordances for setting a Sendgrid API key, importing a CSV mailing list, and choosing to associate or dissociate any given Publish notebook with a mailing list.

### Architecture

One gall agent: %mailer

++on-init

On initial load, tells file-server that it wants to serve a webpage at /mailer

++on-poke

Receives commands that allow the following:

- setting a new named mailing list
- adding email addresses to an existing mailing list
- removing email addresses from an existing mailing list
- removing a mailing list
- setting a SendGrid API key, and other account details, which then makes the necessary calls to sendgrid to configure the account properly
- sending an email to a mailing list
- beginning to listen to a particular publish notebook (which will then send an email for every new note added)
- stopping listening to a particular publish notebook.
- handle callback from SendGrid for mailing list unsubscribe events

++on-peek

- Read out a particular mailing list
- read out the keys of all existing mailing lists (and their associated publish notebooks)
- read out the SendGrid account details

## Milestones

### Milestone 1 - Basic %mailer app and templates

Expected completion:

Payment: 1 star

- App should be fully functional according to the architecture description above, but does not have a friendly frontend

- A number of mark converters that implement email templates for notebook posts.

### Milestone 2 - Delivery of the frontend

Estimated completion:

Payment: 3 stars

- Gated on Grid shipping, the app should have a grid tile that gives the user an interface for setting up the SendGrid api details, managing mailing lists and their associated notebooks.
