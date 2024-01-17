+++
title = "Urbit Notes"
date = "2021-08-25"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev: Other"]
[extra]
image = ""
description = "Bring your note-taking game into the 31st century!"
reward = "4 stars"
assignee = ["~ribben-donnyl"]
grant_id = "P0056"
completed = true
link = ""
+++

## Note-taker 3000 (working title)

## Purpose

- Collect random thoughts or text/code you'd like to share.
- Save them on your Urbit ship, so they're accessible everywhere.
- Allow for easy sharing of code, pastebin style.

## Personal Goals

- Increase my person human capital by writing production code in Hoon
- Add to the amount of mobile development in the greater Urbit ecosystem
- Get an Urbit app in the Apple app store.

## End Product

### A native iOS app for taking notes

- This app will be written in SwiftUI, which seems to be ready for Prime Time.
- Notes will be stored as a string of text with a title.
- Notes will be stored both local to the device and on a ship.
- Communication with ones ship via the Swift airlock library.
- Notes will be stored on ships with graph-store.
- Sharing of notes will be done with Publish.

### Documentation

- Not a primary end product, but I will write up my notes on developing the app, which I believe will be of interest to the community. (This will also be my way of dog-fooding the notes themselves.)

### Possibilities for the future:

- A native Mac app for taking notes (I will investigate how much code can be reused and how hard this will be)
- A landscape tile for interacting with notes via the web (note: I have done almost zero web front-end, so this might be better done by someone else)

## User Stories

As a user, I would like to:

- Log into my ship with a URL and +code
- Logout of my ship
- Set the title of the note (UX note: The title of the note will, by default, be set to the first line the user types, but should be editable to something else.)
- See a list of notes that I have written, sorted by "last-modified"
- Select a note from a list of notes, and edit its contents
- Search the list of notes for some keyword
- Delete a note
- Write using markup and have the text rendered appropriately on screen

As a forgetful person, I would like to:

- Write a note in my iPhone

As a less-technical user, I would like to:

- Disable markup entirely, so I don't get bold text every time I type an asterisk.

As a developer, I would like to:

- Make a note with some code in it
- Create an HTTP link to the code
- Share the HTTP link via the built-in iOS sharing functionality

## Technical requirements

Allowing edits to the same note from different sources opens up the possibility of data getting corrupted and/or clobbered. Thus, when logging in from a device, the ship should generate some kind of token and should only allow one device at a time to be logged in.

## Resources

I will probably need someone with graph-store experience to discuss my approach and offer suggestions.

## Milestones

### Milestone 1: Develop graph-store for notes

Payment: 1 Star

### Milestone 2: Develop IOS app

Payment: 1 Star

### Milestone 3: Coordinate beta testing

Payment: 1 Star

### Milestone 4: Publish on app store

Payment: 1 Star
