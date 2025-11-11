+++

title = "Whom: profile and contacts manager"
date = "2022-08-25"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "A dedicated contacts app to store contact info that other apps can programmatically access"
reward = "3 stars"
assignee = ["~rivmud-fabwen"]
champion = ["~palfun-foslup"]
grant_id = "P0171"
completed = true
canceled = false
link = ""

+++

# Rationale
When I've been to in-person social events like Assembly or other meetups, I was excited to meet new people, but frustrated that I couldn't easily keep track of everyone I met. While I could add other users by `@p` in `%pals`, the tagging system doesn't lend itself to storing contact info in a structured way, like names, emails, Twitter handles, etc. Also, even at Urbit events, many people I met didn't have planets yet! I could add them into my phone's contacts or as a Web 2 social contact, but now my contacts are split between multiple disconnected sources.

Urbit needs more robust way of connecting people and representing who they are. In short, I should be able to broadcast who I am with a profile, and I should be able to keep an organized list of contacts with my friends' profiles.

While `%pals` is a great tool for defining a list of friends, its tagging feature was not meant to represent structured contact data. The `%pals` frontend states
> Applications could make use of tags for grouping content, but should not change their core behavior based on the presence or absence of specific tags.

A dedicated contacts app needs to be able to store contact info in a way that other apps can programmatically access specific info about a contact. For example, if I knew somebody in real life, I could enter their real name into my contacts app, and Groups could display their real name instead of their @p in chats.
# Overview
`%whom` would be an app that lets me manage a list of contacts.
Each contact has a variety of fields that are common in desktop/phone/Web2 contact apps (name, notes, email, phone, Twitter, GitHub, etc).
If a contact is another Urbit user with `%whom` installed, the contact will also contain info they shared about themselves (their profile).
## User stories
1. As a user, I want to add people I know to a list of contacts, whether my contact uses Urbit or not.
2. As a user, I want to view and edit info about my contacts through a frontend.
3. As a user, I want to have a shareable profile with a variety of fields, like name, email, phone, Github, Twitter, etc.
4. As a user, I want to see other users' profiles in my contacts list, in addition to the info I entered about them.
5. As a user, I want my contacts to be updated when another user updates their profile.
6. As a user, when one of my non-Urbit contacts gets a planet, I want to be able to convert them to an Urbit contact.
7. As a user with `%pals`, I want my pals to be added to my contacts list automatically.
8. As a user with `%pals`, I want to be able to add my contact as a %pal with a button click.
9. As a user with `%pals`, I want some info on my profile to be public, but I only want to share more personal info with users I trust (pals).
10. As a developer of another app, I want to be able to programmatically access specific fields from contacts.
# My background
I'm a professional fullstack software engineer and I've been active on Urbit since 2019. I operate the star ~holnes and have onboarded a few of my friends. I graduated Hoon School in 2020, attended Assembly and a few local meetups, and completed the Studio email apprenticeship with Tirrel earlier this year. I've had a great experience working with Hoon and Gall so far, and am eager to build more apps.
# Milestones / Estimates / Compensation
## Milestone 1 - Contacts
Completed by: Sep. 1
- Compensation: 1 star
- Goals:
    - Users can create and manage contacts
    - Users can view and edit contacts in a working frontend
## Milestone 2 - Profiles
- Completed by: Sep. 22 (Assembly '22)
- Compensation: 1 star
- Goals:
    - Users can create public profiles
    - Users can view public profiles in the frontend
    - Contacts contain public info from profiles
## Milestone 3 - Pals and Privacy
- Completed by: December
- Compensation: 1 star
- Goals:
    - Pals are automatically added as contacts
    - The frontend shows which contacts are pals
    - Users can click a button to send a contact a pal request
    - Users can restrict visibility on their profile, so only pals can see certain fields
