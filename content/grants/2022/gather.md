+++

title = "%gather"
date = "2022-08-22"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "An Urbit native meetup tool for subculture gatherings"
reward = "4 stars"
assignee = ["~polrel-witter", "~pontus-fadpun"]
champion = ["~dolweb-donfun", "~dinleb-rambep"]
grant_id = "P0166"
completed = true
canceled = false
link = ""

+++

# Rationale
Meatspace interaction and synchronous, virtual discussions are core values many people on Urbit share. Currently, this need is facilitated through Meetup.com, which is a good intermediate solution, but for those who are in the slow (but increasingly faster) transition to using Urbit full-time, it's clear a native meet up tool is needed. Meetup falls into the typical web2 trap of siloing functions that should integrate seamlessly with other applications. Gather tackles this problem by leveraging Urbit ID for invite and RSVP permissining, Groups to section-off contexts and make it easier for sub-cultures on Urbit to spin up gatherings (something we don't see much of on Meetup right now), and native messaging to reduce context-switching. Future integrations and features could include: connection to the Bitcoin wallet for event payment walling, beaming event pages to the Clearweb to market events outside of Urbit, QR code entrance gating, event-specific attendee profiles, and other, unforseen possibilities as applications continue to percolate from the underground.
# User Stories
- User is planning a get-together and would like to send an invite out to their friends and members of a group they're a part of.
- User is in a foreign city and is curious to know who (ships they interact with regularly or members of a Group they're a part of) is in the area and open to meeting up.
- User has a core group of people they meet up with reguarly.
- User is curious to know if they have mutual, Urbit acquaintances in their area.

# Milestones
## Milestone 1
Expected Completion: September 16, 2022
Compensation: 2 stars

**Gathering**
- User can create, send, and receive gathering invites
- User can ban ships to stop sending and receiving invites to/from selected ships
- User can see a list of gatherings they're hosting, been invited to, and RSVP'd to in a dashboard
- User can delete gatherings from their dashboard that have passed
- Host can search for ships to which to send an invite
- Host can set a maximum number of RSVPs they will accept
- Host can cancel, finalize (meaning no more RSVPs will be accepted), or mark a gathering as completed
- Host can edit an invite that has already been sent out, and unfinalize it to make changes, if needed
- Host can see who accepted/declined their invite
- Host can restrict an invite to deliver only within a specific radius; meaning an invite will only appear in a ship's dashboard if their settings location is within the host's specified radius of the venue address
- Host can include a venue location in the invite
- Host can select one or more groups the user is a part of from a dropdown menu to invite members
- Invitee can distinguish Pending, Accepted, and Completed gatherings
- Invitee can unaccept an invite if they decide they can no longer attend
- Invitee can see invite and RSVP list
- Invitee can click a button on the invite to DM the host
- Invitee can accept or decline invites
- Invitee can see distance from their address to venue included in invite
- Invitee can restrict receiving invites to only those with venue addresses in their radius
- Connect to an open source map API so the app can retreive Longitude and Latitude and calculate the distance between two addresses (the address input is left up to the user for privacy control)
    - The map API query would work as follows:
        - Ship obtains latitude and longitude coordinates from a free, open source map API such as [Nominatim address search](https://nominatim.org/release-docs/develop/api/Search/)
        - Since Nominatim has a strict use policy, ship obtains the Lat and Lon once, each time the address field is updated, and stores it locally
        - Whenever a ship receives a location-based invite, their ship will auto-calculate the distance from their location (address in their settings) to the venue (received in the invite).
**Settings**
- User can toggle whether they want to receive invites from anyone or only within a set radius from their location to the gathering venue included in the invite
- User can set a radius within which they'll receive invites, if they're not receiving invites from anyone
- User can set "My Location": street, city, state, country, and zip to determine coordinates
- User can ban/unban ships
- User can see list of banned ships
- User can create a collection to store a subset of ships or groups to easily send future invites to select groups of ships
- User can toggle notification for new invites received
## Milestone 2
Expected Completion:  November 30, 2022
Compensation: 2 stars

**Gathering**
- Implement feedback from Hackathon/Assembly
- Host can establish an event page with a title, link, description, photo, address, venue name, date, and time
- Host can toggle a gathering's settings: public or private (if so, select who's invited; no link generated to restrict access to the event page), meatspace (if so, enter address) or virtual (if so, enter an access link), allow those who RSVP'd to see other ships who are attending, restrict message thread access to anyone (with an invite, if private) or only those who RSVP'd
- Attendee can see who else has RSVP'd (if enabled by host)
- Anyone with a ship can access a event page and RSVP, if they have the link and the gathering is public
- Attendee can set a reminder on gathering's they've RSVP'd to
- Native messaging on event page for pre, during, and post-event chat/networking
- Beam event page to clearweb

# About Us
`~polrel-witter`
Over the past few years, I've worked in various operation roles at a film festival in Austin. My most relevant development experience includes designing and managing (though not coding) the festival's reader software rebuild, which is used to manage a team of 400 readers. Additionally, I served as the general IT support person for festival staff and have been around Urbit, managing a star and experimenting with optimal ways to host ships, for nearly a year now. I completed Hoon School Live back in May, have reviewed the Gall Guide and Walkthrough, and am participating in App School Live July through August.
`~pontus-fadpun`
In the last three year I've worked as a software engineer, developing frontend and backend solutions for various clients. My area of expertise was Hyperledger Fabric, where I've created software that generates smart contracts from bpmn/workflow diagrams. I've learned Hoon recently and worked on the eth-provider grant to enable urbit ships to customize their ethereum connection.
