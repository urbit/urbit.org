+++
title = "%pony"
date = "2022-09-25"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Urbit-native long-form mail for threaded communications."
reward = "4 stars"
assignee = ["~hanfel-dovned"]
champion = ["~sarlev-sarsen"]
grant_id = "B0191"
completed = true
work_request_link="https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0191&prefill_Grant+Name=Pony"
+++

# %pony: Urbit-native long-form mail

## Purpose
The objective of this work is to create an Urbit-native client to facilitate long-form, threaded communication (hereafter "verbose communication") between groups of users. Communication over the Urbit network is already ubiquitous and straightforward. However, it is restricted to a particular set of formats: namely the chatroom, notebook, and collection functionality provided by the Groups app. It is entirely possible to conduct verbose communication over Groups, but Groups is not designed to facilitate such activity. A built-to-purpose Gall app and interface have the potential to dramatically improve the experience and provide a familiar communication tool for new and old users alike.

## Background
Anything you can do with email, you can certainly do with Groups. But some functions of email are difficult to replicate with Groups alone:
- Threading and subjects, i.e.: carrying on multiple conversations with the same set of ships, but with specific topics and context for each conversation, as opposed to lumping all of those conversations together in one chat.
- Per-message addressing, or carrying on a conversation with a different set of ships at different stages of the conversation. With Terran email, it's straightforward for me to start a conversation with Bob, and later add Alice, without losing context at any point. In the existing Groups app, doing this would require starting a new chat and restating all of the preceding context.
- Blind carbon copy (Bcc) functionality. It is often useful to send a message to a set of ships, without disclosing the full list of recipients to everyone receiving the message. This is strictly not possible with the current iteration of Groups.
- Archiving and sorting conversations with folders and labels. EScape, the alternative Groups client, has made some progress on this front, but first-rate functionality for organizing and sorting messages in the Groups app is still being developed. Additional affordances—for example, sending incoming messages to one or another folder based on the origin ship's status in my own %pals state—could make community management significantly easier.
- Drafts. Groups currently preserves any text written in the composition box of a channel, but a full-featured drafts system with the same organization affordances mentioned above would be a considerable improvement.
- Scheduling, and otherwise automating, the dispatch of messages.

## Implementation
This project is probably best undertaken by a two-person team, one with experience is in frontend web development and the other with enough Hoon experience to build the Gall app. Working in parallel and collaborating on the architecture of the overall application will be key to success.
On the frontend, editing text is the most complex part of the app. This is particularly true if the scope of the project includes full-featured HTML editing, as with traditional email; conversely, the scope and effort involved would be much more attainable if the content of %pony messages were initially restricted to Groups-flavored Markdown. In building up to a minimum viable app, the most expedient approach may be to make use of an open-source JavaScript text editor, such as Quill.js, ByteMD, or similar.
It seems likely that the Gall app and associated core functionality of %pony could be achieved with a new interface to the existing %graph-store, or it may be an opportunity to make use of the new 'Groups 2' framework from TLON. 
Again, in my understanding, the %graph-query agent is still forthcoming, which would make searching for messages by their content or author straightforward.
The minimum viable functionality consists in sending messages to some set of ships, saving and editing drafts, and being able to reply to a given message. Rich editing, automation and organization are likely further afield, but well within scope.

## User Stories
- I can edit a message on my ship, and send it to some set of ships.
- I can, at my discretion, choose not to include the full list of recipients along with the message (Bcc).
- I can reply to received messages, with all previous messages in the conversation easily accessible to myself and the recipient.
- I can forward a message or conversation to some set of ships.
- I can compose a message and save it as a draft without sending it.
- I can sort conversations into folders, including an archive or garbage folder for messages I'm no longer concerned with.
- I can categorize messages and conversations with custom tags.
- I can set rules controlling how %pony will handle incoming messages, based on their author, content, %pals tags, etc.
- Pending the release of %graph-query, I can search for messages according to their content, author, date of receipt, etc.
## Milestones & Compensation
Final milestones and compensation are pending selection of the bounty applicant and refinement of the exact execution plan, but are expected to look something like the following:
### Milestone 1 - MVP
Expected completion: November 30th 2022

Payment: 2 stars

The Gall agent and frontend have all core functionality in place. Sending and receiving messages, replying to threads, editing and saving drafts, and forwarding messages are all possible.

### Milestone 2 - Advanced Functionality and Polish

Expected completion: January 31st 2022

Payment: 2 stars

Received messages and conversations can be sorted into folders, archived, and categorized with custom tags. Incoming messages can be categorized and sorted according to the author's %pals status (mutual status, tags) on the recipient ship. Messages can be scheduled to be sent at a particular time, and other agents on the ship can request to write a message into %pony's Drafts folder, pending final approval by the pilot before sending.

### Strech Goals
- Referencing arbitrary agent state within a message or thread
- Integration with Contacts (%whom) application, or other agents.
- S3 Integration for 'Attachments
These and other potential features will be assessed upon the completion of the MVP application and formally agreed to between grantee and Champion prior to further work being undertaking.
