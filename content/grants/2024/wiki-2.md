+++

title = "%wiki phase 2"
date = "2024-02-11"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = ""
reward = "5 stars"
assignee = ["~rivmud-fabwen"]
champion = ["~poldec-tonteg"]
grant_id = "P0334"
completed = false
canceled = true

+++

## Overview
`%wiki` as it exists today is capable of publishing wikis to the clearweb, and collaborating via EAuth. However as a decentralized network of wikis, `%wiki` has the potential to do much more, and this proposal for "%wiki phase 2" is meant to address that.


The overall aims of this grant are:

* Users can read other users' wikis by logging into their own ship, without needing the wiki host's public URL

* Global search, which can include results from all public wikis on the network

* Various UX enhancements

* Shared private wikis

* A user management system





## Milestones



### Milestone 1 - Public Remote Access + Global Search

* Estimated completion: May 1st 2024

* Compensation: 2 stars

* Deliverables

 * User can create and edit content on remote public wikis

  * User does not need to join or subscribe to a public wiki to access it

  * User does not need to know the wiki host's URL

  * Host does not need to make their wiki accessible via a URL

  * `%wiki` maintains an index of wikis from across the network

  * Index is decentralized, there is no central indexer ship

  * User does not need to proactively add these wikis to the index

  * Index is reasonably exhaustive, should track the entire network of public wikis

 * Global search - search results can include matches from all indexed wikis

  * Searching will return similar pages from different wikis, including wikis the user has not visited before

   

### Milestone 2 - User Experience Enhancements

* Estimated completion: June 2024

* Compensation: 1 star

* Deliverables:

 * Mobile-friendly UI

 * Host can use custom CSS for their wiki

 * Host can use a custom logo for their wiki

 * User can bookmark remote wikis

 * User can fork remote wikis

  * User becomes the host of the forked wiki

  * Forked wiki keeps the revision history of its parent wiki



### Milestone 3 - Shared Private Wikis + User Roles

* Estimated completion: July 2024

* Compensation: 2 stars

* Deliverables:

 * Hosts can assign roles to other users such as admin, moderator, and editor

  * Admins can do anything the host can

  * Hosts/admins can restrict editing to the "editor" role or higher

  * Hosts/admins/mods can ban specific users

 * Hosts of private wikis can grant access to other specific Urbit users

  * TBD if this is based off a whitelist or `%groups` membership

 * Users can access private wikis either at their clearweb URL via EAuth, or remotely via their own ships



## My Background



I am the developer and maintainer for `%wiki`, as well as the contacts app, `%whom`.

