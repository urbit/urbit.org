+++
title = "Quorum"
date = "2022-08-16"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Quorum: Clone of Stack Exchange on Urbit"
reward = "3 stars"
assignee = ["~tamlut-modnys", "~litlep-nibbyt", "~sidnym-ladrut"]
grant_id = "P0167"
champion = ["~lagrev-nocfep"]
completed = true
+++

## Purpose

Suppose you are new to the network and want to look up information regarding OTA v1.9. Currently, you would either have to 1) ask the
question in %landscape, where it probably has been asked multiple times before, or 2) perform an "excavation," a seemingly endless scroll
in %landscape to recover a conversation from the last time someone had a similar problem. An app which can store and organize commonly
asked questions and their answers while allowing users to search through them would address this problem. In addition, such an app could
be a valuable resource to Hoon School and App School participants, enabling faster onboarding of new developers to the Urbit universe.

Enter %quorum, a clone of Stack Exchange on Urbit. %quorum is a platform accessible from Urbit which allows users to ask and answer
questions, search to find answers to questions that were already asked, and endorse questions and answers based on their usefulness.
The platform would be a consolidated knowledge store, with users hosting and sharing “knowledge bases” in the same way that they host
and share groups.

## User Stories

- As a curator, I can host one or more knowledge bases on my ship (with an optional set of tags) with groups-esque access controls.
- As a user, I can access knowledge bases to view existing questions and answers.
- As a user, I can submit questions to an existing knowledge base (with an optional set of tags) and submit answers to existing questions in that knowledge base.
- As a user, I can endorse (+1) or oppose (-1) questions and answers in knowledge bases.
- As a question submitter, I can designate my favorite response, which will be shown as the top response for all future viewers.
vAs a user, I can perform a content-based search inside the knowledge bases to which I am subscribed.
Timeline

## Our Team

Our team consists of three App School-enrolled developers broadly working on three separate app components:

~tamlut-modnys: Search and other algorithmic components

~litlep-nibbyt: Application back-end (Gall agents, data structures)

~sidnym-ladrut: Application front-end (HTML forms, visualization)

We hope to develop a MVP version of our app in time for a reveal at Assembly 2022.

## Future Work

- Allow authors/admins to delete knowledge bases, questions, and answers.
- Allow authors/admins to edit questions, answers, and tags.
- Implement a permissions system that enables assigning different privileges (e.g. voting, answering) to different users and user ranks.
- Improve the readability of searches by emphasizing matched keywords in rendered results.
- Enable result sorting (search, answers) by date and vote score.
- Add support for search filters like source knowledge base(s), author, tag(s) (for knowledge base or question), and time frame.
- Add a command-line script that enables importing existing %landscape notebooks as new knowledge bases (e.g. %bail-meme in ~middev/the-forge).
- Enable %pals-based filtering of answers and +1/-1 responses.
- Add per-server author reputation based on aggregate vote score and answer acceptance.
- Enable push notifications for authors when responses are made to their posts.
- Improve the efficiency of keyword search by leveraging indexing and/or more specialized algorithms/data structures.
- Enable users to comment on individual questions and answers.
- Enable users on the clearweb to browse public-facing knowledge bases and ask questions using comets/moons.

## Milestones

### Milestone #1 - Local Knowledge Base

Estimated Delivery: September 2, 2022

Reward: 2 stars

Tasks:

- Create the basics of a local-only knowledge base browser, which include:
- Creating local knowledge bases on the host ship (consisting of unique title, description, and tags).
- Browsing all existing knowledge bases and their question/answer threads.
- Submitting a new question (consisting of title, tags, & content) to a knowledge base.
- Submitting any number of answers to an existing question.
- Adding any number of +/-1s to existing questions/answers.
- Selecting a particular answer as the preferred answer, which will subsequently be rendered as the first result.
- Extend existing Urbit search algorithms (e.g. %graph-query, %sphinx) to accept app-specific data.


### Milestone #2 - Networked Knowledge Base

Delivery: September 30, 2022

Reward: 1 star

Tasks:

- Enable users to mark their knowledge bases as public (anyone can view/participate) or private (only specific ships can view/participate).
- Add the ability to join knowledge bases hosted on external ships using a unique path (e.g. ~sampel-palnet/quorum-qa).
- Enforce submission rules on knowledge base threads, i.e.:
  - One answer per question per ship.
  - Authors may not vote (+1 or -1) on their own questions/answers.
  - One vote (+1 or -1) per user-question/answer pair.
  - Only the question submitter can choose the preferred answer.
 -Integrate content-based searching and result browsing into the UI.
 
