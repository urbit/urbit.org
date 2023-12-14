+++
title = "Try Urbit Website"
date = "2021-02-13"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "A website where prospective Martians can experience the Landscape interface without any technical chops."
reward = "2 stars"
assignee = ["~taller-ravnut"]
id = "1413934727"
completed = false
canceled = true
link = ""
+++

Landing page of website collects minimal information from visitor: Name, email, optional opt-in to foundation newsletter. They are then redirected to a live Landscape interface to "kick the tires" on Urbit as a comet. There will be instruction about how the interface works, what activities to do, etc.

The server will run a script that "pre-mines" comets to create a pool of IDs and "+code" secrets. It will monitor activity to ensure enough comets are mined to keep up with demand.

The server will also maintain a database of users, status, comet ID, process ID and timestamp when assigned to user. After a predetermined time (1 day?), the server will send an email asking if the user still wants to keep their comet, then stops the process if they reply no or don't reply after some time.

The website will have an admin interface with performance stats. It will also allow admins to set up email alerts on usage, processes, comet pool, etc.

## Milestones

### Project complete

2 stars
Website and sever side scripts complete and deployed.
