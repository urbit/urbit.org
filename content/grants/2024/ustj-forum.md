+++
title = "USTJ Forum"
date = "2024-05-17"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Create a clearweb-usable forum for the Urbit Systems Technical Journal"
reward = "2 stars equivalent in USDC"
assignee = ["~polwex"]
champion = ["~lagrev-nocfep"]
grant_id = "P0345"
completed = true
canceled = false
+++

## Description

A key objective for the Urbit Systems Technical Journal is to foster conversations in good faith about Urbit and software built on it or like it.  To that end, we wish to have a Reddit or Hacker News style forum which we can use to promote technical and cultural discussions.  This should be built and served from Urbit and operate under the aegis of the Urbit Foundation.

The forum software should support the following features:
- Clearweb visibility. Forum threads should be visible without a login just like a subreddit.  While hosted on an Urbit ship, the main forum should simply be accessible via EAuth at a single URL. Sort the main forum by new/top.
- The forum should be threaded and allow voting.  (Again, think of how Hacker News operates.)  Sort within a thread by new/top.
- Differentiated roles. A particular forum should allow moderation and support banning and restriction of privileges (e.g. only mods can post new threads, but anyone can reply).
- Custom styling. Urbit Foundation and Other Means have prepared a style language for official materials that USTJ adheres to (See urbitsystems.tech for a preview of this style).  We need to be able to drop in CSS that makes it look compatible for every portion of the experience, from login to browsing to posting.
- Onboarding via Urbit.  Red Horizon is already prepared to provision a fleet for new commenters to join.

Some points that have changed from previous descriptions of the concept:
- It is easier to support a single ship-hosted backend server rather than try to gossip or decentralize the application.  Therefore the forum will be accessed at a single URL rather than from within a ship app.

- Rather than use EAuth’s fake comets, we should facilitate just getting interested parties signed up to use Urbit (thus the RH connexion above).


Estimated Completion: June 2024