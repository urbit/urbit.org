+++
title = "Subassembly Event App"
date = "2024-09-06"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Create an update to %live to support the Subassembly event requirements"
reward = "4 stars"
assignee = ["~nospur-sontud"]
champion = ["~mocbel"]
grant_id = "TBD"
completed = false
canceled = false
+++

## Description
The UF is looking to develop an Urbit app for the Subassembly series. This grant is for the creation of the initial MVP for this product experience. It does not include everything possible in an event app, but instead starts with the core functionality that would be high leverage in an app for Subassembly PNW and it's focus on identity, trust, and reputation.

There are two possible pathways for this application: a net-new application, or an extension on top of the app %live, from ~mocbel.

If %live is extended for this purpose, it will need to support all of the elements noted below, as well as the user stories defined in the milestones.

If %live cannot be used for this purpose, the alternative path is for ~lagrev-nocfep and the Urbit Labs team to develop the core gall agent during a Build Party on September 6th. The Gall agent will include:
- An event that includes
	- event host
	- event title
	- event tag
	- event start time
	- event end time
	- event location
	- event details
		- ideally takes arbitrary markdown
- A schedule that includes talks
	- talk title
	- speaker
	- start time
	- end time\
- a venue map
- an event details page
- Attendee list
	- Host of the event holds the full list
		- an attendee is a collection of:
			- @p (required)
			- %tlon nickname
			- %tlon avatar
			- ens domain
			- telegram
			- phone number
			- github
			- email
			- signal
			- twitter
		- but where non-@p/%tlon information is only revealed mutually
			- mutual matching will be done using %pals tags, where if both parties have tagged each other with the event tag
What is required of the grantee for this project is to build a robust front end experience.
- The subassembly venue is not in a high internet connectivity location, so reloading content every time it is opened is untenable. The assumption is that the app needs to be a PWA with local storage of updated data, but if a grantee is a mobile app dev and would prefer to put out a mobile app, that is acceptable as well.
- It is assumed that the 'matching' activity will occur *after* the conclusion of the event.
- the Venue Map should be able to store an image in localstorage and support navigating it with pinch to zoom
- There should be a deeplink to the Tlon group for the event, ~sarlev-sarsen/subassembly

#### Future Work
Future work opportunities for this grant include making the app more general purpose as well as adding features like post-event recording uploads or non-attendee content access.

## Initial working prototype
#### Milestone 1 - 2 stars
Due date: September 27, 2024
This first stage of the grant will be to get a working prototype of the app that functionally satisfies all of the following user stories. These user stories do not need to be highly polished, but they do need to *work*. Additional polish will occur during milestone 2.
### User Stories
As an event host...
- I have a form that will help me construct a poke that will set the event, the schedule, and the attendee list.
- I can edit the event, schedule, and attendee list
- I can upload a venue map as an image (specific format TBD)

As an event attendee...
- I can run `|install ~bitdeg %subassembly` on my ship to install the app
- I can find a list of events to which I am invited (this can currently be a list of 1). If there are no events, I should receive a message about the subassembly series and a link out to some clearweb page on urbit.org for additional info
- I can select from the list of events to which I am invited and get into an event specific interface
- I can navigate around the app as a typical mobile experience with a nav experience for the following pages:
	- Venue Map
	- Event Details
	- Attendee List
	- Schedule
- On the attendee list page, I can...
	- see a list of @p, %tlon nickname, and %tlon avatar
	- an indicator of if we are a match
	- if i have already 'swiped' on them
	- a button to 'start swiping'
	- a button for "your matches"
- On the 'swiping page', I can...
	- See their avatar, nickname and @p
	- have an option to signal matching interest or non-matching interest
	- see some indicator of if I have already made a selection on this @p (but should be able to change my selection)
- On the "your matches" page, I can...
	- see my list of matches, and click on them to see their full profile with any details they have chosen to share
	- have clickable links to:
		- deeplink into a DM in the tlon mobile app
		- open their Github
		- open a text message to them
		- open a phone call
		- etc.

## Production ready app experience
#### Milestone 2 - 2 stars
Due Date: October 11th
The final milestone's core focus is about polishing the app experience from "it works" to "it just works". The user stories of milestone 1 should go from 'technically implemented' to 'pleasant to use.' The grantee will work with ~lagrev-nocfep and ~sarlev-sarsen to polish every possible hard edge of the app. The polish done at this stage will be about the event attendee experience, while the event host experience can remain just 'workable' for this initial MVP.
### User Stories
- As an event attendee, I can install the app as either a PWA or Mobile App on my mobile device while I have a working internet connection, and then utilize the following features even on a spotty or absent internet connection:
	- Viewing the venue map
	- Viewing the event schedule
	- Viewing the event details
	- For any non-offline-functional elements of the app, such as the matching feature, the interface should fail gracefully. This could come in the form of an error message built in, or something similar.
