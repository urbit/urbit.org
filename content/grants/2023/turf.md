+++

title = "Turf"
date = "2023-05-17"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Build a thriving and customizable virtual world on Urbit"
reward = "9 Stars"
assignee = ["~midlev-mindyr"]
champion = ["~reb"]
grant_id = "P0265"
completed = false
canceled = true

+++

## Summary 

Turf is like if [gather.town](http://gather.town/) were fully customizable, interconnected, and lived on Urbit. However, to start out with, it will have a lot less content and features. Turf will be good for Urbit for the following reasons:

- it will be fun / it will give people another reason to use Urbit day-to-day
- it will enable spontaneous and casual social interactions
- it will be a space that people can mold and construct freely, which means it can naturally develop into a vibrant, complex virtual world
- it will cause people to crave app interoperability like never before, which will mean I can later build a plugins system (Monkey) and actually convince people to use it

Each turf is made up of pixelated tiles which can be customized with a variety of items, and people can run around in them and chat with voice and text. Everyone can make their own turfs, and (with consent) make portals to other turfs. At the end of the final milestone, we hope to have a thriving, organically self-organizing web of connected turfs, where people know how to get where they’re going and have lots of new things to discover all around them.

## Why me

I have some amateur gamedev experience, some hoon experience, plenty of frontend experience (see Astrolabe). I have been thinking about something like Turf for a while, but I’m actually proposing it now because it seems like a necessary step to generate interest in a plugin system I want to build (plus it sounds fun!). So, I want to be the one to build Turf so that I can use it to demonstrate and promote Monkey (the plugin system).

## User Stories

After each user story is the short code for the milestone which will implement it:

SP - Single-Player MVP

MP - Multiplayer

HT - Hometowns

AI - Advanced Items

SS - Super Speed with WebRTC

TP - Advanced Turfs & Permissions

?? - Some Future Grant??

**My Avatar**

- I can customize my avatar’s appearance somewhat (SP)

**My Turf**

- I can have a turf (SP)
- I can have multiple turfs (TP)
- I can resize my turf(s) (SP)
- I can customize my turf’s appearance by placing items (floor, walls, furniture, decor, objects, portals) (SP)
- I can move around in a turf (SP)
- I can explicitly specify who can and can’t enter my turf (SP)
- I can specify advanced permissions for my turf(s) (TP)
- I can grant write access to part of a turf (even if I'm not a star) (TP)
- I can transfer ownership of my turf to someone else (TP)

**Items**

- I can create my own items (wearable, wall, floor, furniture, etc) (AI)
- I can add items I find in the wild to my library (AI)
- I can make my custom items do cool custom things (??)

**Multiplayer**

- I can see other people moving around (MP)
- I can see other people moving around in realtime (SS)
- I can chat with other people over text (MP)
- I can chat with other people over voice (SS)
- I can create portals to other turfs (MP)
- I can walk through portals to travel between turfs (MP)
- I can summon people when I’m in a turf I admin (MP)
- I can teleport home to my turf from anywhere (MP)
- I can place my turf in a hometown (HT)
- As a star, I can grant plots of turf to planets for embedding (HT)

**Misc**

- I can integrate other apps with my turf (using %monkey) (??)

# Milestones

I’m asking for 9 stars for 6 milestones, which I plan to complete in 46 weeks, working part-time with a couple built-in vacations. These milestones may be accelerated if I’m able to spend fewer days on my day job. The Due Dates assume a contract is signed before May 20th, 2023. Milestones 4-6 may be reordered based on user feedback.

## Milestone #1 - Single-Player MVP

Reward: 1 star

Time: 6 weeks (plus a bit of time I’ve already put in)

Due Date: June 25th, 2023

- You have a little pixel-art character which you can customize with basic wearable items (facial features, skin color, hats, hair, shirts, pants)
- You have a turf associated with your ship, composed of tiles
    - Each tile has a square image 32x32px image
    - You can place a limited set of basic items (e.g. walls, floor, grass, tables, chairs)
    - You can resize your turf
- You can move around on the grid

## Milestone #2 - Multiplayer

Reward: 2 stars

Time: 9 weeks (I’d say 6, but I will have less time to work on Turf during this period)

Due Date: August 27th, 2023

- Through mutual agreement, two players can link their turfs with a 2-way portal. Players can visit each other by traveling through those portals.
- When in a turf with other players, you can see them move around (with some ames lag)
- You can send ephemeral, turf-scoped text chats which appear in a bubble overhead and in a chatbox sidebar
- Very basic permissions: I can choose to blacklist or whitelist @ps to gate visitors to my turf (prevent unwanted neighbors of neighbors)
- You can summon people to your turf
- You can teleport yourself home from anywhere

## Milestone #3 - Hometowns

Reward: 1 star

Time: 5 weeks

Due Date: October 1st, 2023

- When I walk off my turf, I appear in my hometown, which is a star’s turf
- I can choose what star I want as my hometown and place my house in it, although some may require manual approval
- My turf/house has some little house avatar in the hometown which is customizable in some way
- Basic permissions for allowing people to claim (or request to claim) write access for a plot of land

## Milestone #4 - Advanced Items

Reward: 2 stars

Time: 9 weeks

Due Date: December 3rd, 2023

- You can create custom items w/ custom art (tile, furniture, decor, wearable)
    - Enable png import
    - In-app pixel art canvas
- Items can have basic interactions like:
    - portal: teleport the activator to a particular turf (with or without coordinates)
    - sign: display some text, markdown, or html in a popup
- Items can have a foreground and/or a background image
- Items can have simple animations
- Items can be oversized (e.g. a tree which is taller than 1 tile)
    - Items turn partially transparent when a person walks behind them
- Sharing items: when you see a cool item in someone else’s turf, you can add it to your personal item library

## Milestone #5 - Advanced Turfs & Permissions

Reward: 1 star

Time: 10 weeks (would be 7 or 8, but for Christmas-time)

Due Date: Feb 11th, 2024

- You can create multiple turfs (and link them together, of course)
- You can transfer your turf to someone else
- You can ban all comets and/or moons from your turf
- You can grant people/lists of people permission to do the following wrt your turf
    - Join, move around, and chat (whole turf)
    - Redecorate tiles, add/remove items, create custom items (for sections or whole turf)
    - Claim sections of turf (with limits, of course)
    - Full admin (for sections or whole turf)
- Permission lists
    - You can assemble lists of people to more easily whitelist or blacklist the same people over and over. E.g. if you want to make the same 5 people and some of your moons admins in multiple of your turfs
    - You can sync a list to a group so that only members of the group have access to the land
    - There’s a “pals” list

## Milestone #6 - Super Speed with WebRTC

Reward: 2 stars

Time: 7 weeks (hard to estimate, because I’ve never done anything with WebRTC)

Due Date: March 31st, 2024

- Use WebRTC for low latency movement and chat
- Use WebRTC for proximity voice chat
- Enable private voice chat areas

## Some other time

- Use a plugin system (Monkey) to enable other apps to embed content, e.g. shared whiteboards; %radio streams; interacting with an item automatically requests a gora; link the text chat to a groups channel
- Item animations? (or include in Advanced Items milestone)
- Item inventories (allow some items to be picked up, carried, and set down elsewhere by visitors with no write access)
- Custom items with custom code so you can turn your turf into a full game or an economy or whatever
- Decentralized turfs
    - When you want to visit a galaxy turf that’s not turf-enabled, you instead ask one of its turf-enabled stars (if any) for its opinion on the layout of that galaxy-turf
    - Stars can coordinate to maintain agreement about what the fictional galaxy-turf looks like
    - When in a galaxy-turf, you can interact with any other people who have the same idea of what it looks like, even if they got it from a different star
    - The same can be done between galaxies for the notional “root turf”
    - The same can perhaps be done between any group of ships for some arbitrary unrooted turf
