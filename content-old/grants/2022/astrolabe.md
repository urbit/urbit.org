+++

title = "Astrolabe"
date = "2022-03-03"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev: Other"]

[extra]
image = ""
description = "Urbit address space explorer"
reward = "5 stars"
assignee = ["~midlev-mindyr"]
champion = ["~norsyr-torryn"]
grant_id = "P0099"
completed = true
canceled = false
link = "~poster-hoster-midlev-mindyr/astrolabe"
deliverable = "~midlev-mindyr/astrolabe"

+++

## Astrolabe

Astrolabe (%astrolabe) is a one-stop shop %docket app for exploring Urbit address space. Main features: ID Search, Sigil Search, Sky Chart, and Ship View (for viewing a given ship's details). Astrolabe integrates with %pals wherever possible, and contains documentation to explain the many quirks of Urbit address space to a new user.

## Justification

There should be a place on Urbit to explore Urbit address space. It will help new Urbiters get their bearings, and be a useful tool for anyone who wants to explore. Having open-source tools for this in one place on Urbit is important.
I like the name Astrolabe, because it's an old-timey guide to the heavenly bodies. Planisphere could also be cool.

## Features

ID Search

You type IDs into a box to search all keyed Azimuth points. It automatically checks to see if you're typing valid prefixes and suffixes, and warns you if you're not. When you search for a specific complete @p, it takes to you a Ship View of that point. When you search a partial @p (or use wildcards), it will show you the spawned/owned ships which match your search. You can also search by Azimuth point numbers Obviously it will also highlight your pals, and clicking on a search result will take you to a Ship View.

There are in-app explanations of how @p's work, what the valid suffixes and prefixes are, why ~dozzod is special, why some moons only seem to have 6 syllables sometimes, etc.

### Sigil Search (Sigil Input Tool)

There are in-app docs on how sigils work, etc.

You can use a visual interface to enter sigils, either just general shapes, or specific shape/pattern combos. As with the ID search, you can be specific or search with wildcards. As far as I know, this tool hasn't built anywhere yet, but it shouldn't be too hard to let users mix and match svgs. Ok, it might be a little hard. See this table to understand why we shouldn't just have a dropdown for each basic shape: ![there are 40 prefixes that are based on a circle shape](https://i.imgur.com/sqS9yVml.png)

### Sky Chart

This is mostly a rip-off of Tirrel's PKI Graph, but with some performance improvements. It integrates with %pals to highlight your pals on the sky chart. Clicking/tapping on a point opens a small modal with basic info and a button to take you to a Ship View of the point.

There are in-app explanations of the basics of how Urbit ID ownership works, and the purpose of sponsors in networking.

### Ship View

Summary view for any ship. As on urbit.live or urbit.me, it shows the @p, owner, parent, etc. Allows PNG or SVG download of sigils. Displays tags from %pals, and potentially allows you to add pals and/or edit tags from that screen.

## Docs

All the explainer docs in the app are also integrated with the %docs app.

## Credentials / About Me

I have a moderate amount of experience with frontend development (Angular, React, a tiny bit of Svelte), and I've done backend server stuff as well. I'm a hobbyist artist with enough CSS knowledge to be dangerous, and I believe if I put my mind to it I can come up with a visually and experientially pleasing UI for Astrolabe. I'm a bit obsessive and perfectionistic which helps me to deliver polished results. I think I can write well enough to synthesize and flesh out clear and concise explainer docs for each page.

I contributed some features to the Canvas app, if you'd like to see a bit of my work.

I don't really know Hoon yet, but I'm a quick learner and I think it'll be fine.

In conclusion, I think I'm capable of doing the job well, and I plan on doing so, and I would love to get rewarded for it.

## Implementation

Check out the source code on Github.

## Frontend

Some of this app has already been implemented in various places. I'm confident that I can pull those pieces together and implement what's missing. The hardest problems that I foresee here are optimizing/reworking the Star Chart from Tirrel's PKI Graph and implementing the Sigil Input Tool.

## Backend

I'm sure I'll need lots of scries. I'll likely have to write some Hoon to make some scry endpoints that don't exist, or to make more convenient ones. Most likely I'll have to write some Hoon for interacting with %pals. The biggest unknown for me is how search will work. It may be that users will only be able to search for ships that they've had some interaction with. I'll have to research this (probably starting with the Groups search feature).

## Milestones

I'm planning to put in about 75 hours a month. Since initially submitting the proposal, I've been learning hoon, but I'll have to do some further learning "on the job".

The rewards are based on $100 per estimated hour.

### Milestone #1 - Skeleton app with Ship view

Time to Complete: ~80 hours over ~1 month

Desired Reward: 1 star

- Make a cool frontend for @p entry (alert user of mistakes)

- ship view

  - sigil, azimuth info, etc
  - may involve learning more hoon

- @p explainer doc

- put some polish on it

### Milestone #2 - @p Search

Time to Complete: ~100 hours over ~1 1⁄3 months

Desired Reward: 1 star

- write hoon for searching urbit ids

  - will involve learning more hoon / gall

- update frontend with search

### Milestone #3 - Star Chart

Time to Complete: ~100 hours over ~1 1⁄3 months

Desired Reward: 1 star

- PKI graph with performance optimizations

- networking explainer doc

- links to ship views

- inevitable tweaking and polishing

### Milestone #4 - Sigil Search

Time to Complete: ~100 hours over ~1 1⁄3 months

Desired Reward: 1 star

- design and make a cool ui for inputting sigils

- use sigil data with existing search

- sigil explainer doc(s)

### Milestone #5 - Polish Round

Time to Complete: ~70 hours over ~1 month (very rough estimate)

Desired Reward: 1 star

- Integrations:

  - Show Groups profile pic in Ship View
  - %pals integration in Ship View and Star Chart
  - Display a ship’s public gora (if applicable)

- make the ui even slicker, if possible
- keyboard shortcuts / accessibility improvements
- dark/light mode support
- we’ll know what else we need when we get here

## In Total

Time to Complete: ~450 hours over ~6 months

Desired Reward: 5 stars
