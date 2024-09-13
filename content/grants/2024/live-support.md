+++
title = "Subassembly Event App"
date = "2024-09-13"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Support an update to %live to support the Subassembly event requirements"
reward = "1 star"
assignee = ["~bisnyx-mormyl"]
champion = ["~mocbel"]
grant_id = "TBD"
completed = false
canceled = false
fund-campaign = ""
+++

# Project Overview
*This campaign is for the support element of the Subassembly App upgrades to %live, from ~mocbel. The project overview of these projects are identical, while milestones are oriented towards the specific deliverables for this campaign's project worker*

The UF is looking to further development of %live for use by the the Subassembly series and beyond. This grant is for the creation of the initial MVP for this product experience. It does not include everything possible in an event app, but instead starts with the core functionality that would be high leverage in an app for Subassembly PNW and it's focus on identity, trust, and reputation.

This grant is one of three interrelated campaigns for:
1. the backend updates to %live, headed by ~polrel-witter
2. the front end PWA interface, headed by ~widmes-hassen
3. blended back and front end support, from ~bisnyx-mormyl

Given that the %live application exists and has much of the necessary functionality already implemented, this grant scope will focus on extending the application functionality, as well as developing a react+PWA front end experience as an alternative to the existing Sail+HTMX front end. The app will include the following:
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


What is required of the grantees for this project—and the other two related projects—is to build a robust front end experience.
- The subassembly venue is not in a high internet connectivity location, so reloading content every time it is opened is untenable. The assumption is that the app needs to be a PWA with local storage of updated data, but if a grantee is a mobile app dev and would prefer to put out a mobile app, that is acceptable as well.
- It is assumed that the 'matching' activity will occur *after* the conclusion of the event.
- the Venue Map should be able to store an image in localstorage and support navigating it with pinch to zoom
- There should be a deeplink to the Tlon group for the event, ~sarlev-sarsen/subassembly
#### Future work
Future work opportunities for this grant includes implementing limited-access speaker sessions, where only a subset of attendees are permissioned to view and attend particular sessions.

# Milestones
## Milestone 1 - Subassembly Support - 1 Star

Milestone 1 of this campaign is entirely focused on supporting timely and high-polish delivery of upgrades to %live in advance of the Subassembly event. This role is expected to flow to whichever work will serve that end. This may include:
- Supporting JSON parsing in the %live app
- Assisting in design of UI/UX flows for the mobile PWA app experience
- JS / CSS wrangling for the PWA experience
- And any other support for the Frontend and Backend scopes relating to this project.
**Due Date: October 20, 2024**

The successful completion of this milestone is to be at the discretion of ~mocbel / ~polrel-witter as the maintainer of the %live application and project lead, in consultation with ~tocwex / ~sarlev-sarsen as the primary end-user of the Subassembly implementation of the %live application.
