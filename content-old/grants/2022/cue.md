+++

title = "Cue"
date = "2022-06-13"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "A bookmarking tool that reminds you of content you saved for later"
reward = "4 stars"
assignee = ["~mallus-fabres"]
champion = ["~fabled-faster"]
grant_id = "P0146"
completed = false
canceled = true
link = ""

+++

# Purpose
Cue is a bookmarking tool. Existing bookmarking tools, like browser bookmarking, can be convenient but tradeoff privacy. For urbit to be a fully functional personal server, it needs to take over this task. Cue provides robust, private, and convenient bookmarking, queuing, and sharing.

# The Problem
I've always got a list of articles and blog posts to read spread across platforms: a notes app, text messages, on post it notes; they are sitting in my email preventing me from having inbox 0. These things are interesting but not time sensitive. They have become a chore.

# Milestones & Compensation 
## Milestone 1 - Minimum Viable Tool
### July 2022 - 1 Star
Create a list of links stored on my ship.
Sort these bookmarks into any number of "desks"/"walls"/"stacks".
View the links by tag.
Turn the lists into a “to read” queue by having the app dispense them via (hark-store note) at a frequency (once a day, twice a week, etc) or on demand. Allow the user to set FIFO, FILO or shuffled regurgitation.
Allow the user to mark links as read with a satisfying check box.
Configurable notifications via hark-store about how many links there are to read, thereby prompting me to read something.
## Milestone 2 - Notebook Integration
### August 2022 - 1 Star
Add interface to share a link to groups by creating a notebook post referencing the link or pushing it to a collection without leaving the app.
Interface should allow me to create a notebook post without leaving the app.
At this same time, add an RSS feed reader functionality.
## Milestone 3 - Sharing
### September 2022 - 1 Star
Allow the user to share links with your %pals. Bookmarks that you share with your %pals will be added to a "desk"/"wall”/"stack" and can be interacted with the same was as native bookmarks: on demand or by setting up a queue.
Increased social sharing: Allow users to give a +1/-1 to %pals’ links and show leaderboard across your pals network.
## Milestone 4 - Urbit Visor Integration
### October 2022 - 1 Star
Allow the user to save links to Cue using Urbit Visor.
Add functionality similar to OneTab - save all open tabs to a session "desk"/"wall"/"stack.” The user can restore bookmarks in a stack at once, individually, or create a queue as with any other stack.
At this point, all docs should be on %docs.

## Future Features
Add an RSS feed: modify the existing RSS app to be stored on urbit. Allow the user to set rules for notifications per feed.
Integration with the planned Reader app.
Add thumbnails to bookmarks. Use a default preview thumnail (Twitter) or allow the user to set a specific image locatio (Pinterest).
Automatically archive site on archive.org/wayback and use that link as substitute.

# About Me
On Earth, I design industrial control equipment. Since becoming familiar with Urbit, I’ve become an enthusiast; my ship has run on a chromebook, a windows box, and a raspberry pi. I’ve recently graduated from Hoon School Live, making Hoon my first and native coding language. In addition, I’ve made several cultural contributions in the form of hosting groups, urbart, and design for the Mars Review of Books.
