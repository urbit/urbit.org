+++

title = "%wui - Web User Interface (Game UI for App School)"
date = "2024-07-03"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Tool" ]

[extra]
image = ""
description = ""
reward = "3 stars"
assignee = ["~nodsup-halnux"]
champion = ["~tamlut-modnys"]
grant_id = "P0376"
completed = false
canceled = true

+++

## Description

For the new App School curriculum and Docs website, students will iteratively build board games as they learn how Urbit apps are constructed. Currently, the method of debugging and printing out to terminal (as a form of app interaction) is non-optimal.

We propose a Web-User-Interface (WUI) to assist students in their Gall app projects. More specifically, students will use WUI as a wrapper library around their Tic-Tac-Toe and Minesweeper apps, which will display the state of their app via a Sail webpage.

## Implementation

WUI will...

* be implemented as a library file.
* follow the same functionality as the +dbug application – intercepting all interactions with the app, before acting on its own marks, or passing them onto the app.
* bind a Sail page to a front-end URL, using an arvo card on initialization.
* have separate library and structure files for each board.
* implement a basic http-server in its on-poke arm. Each page served back will be rendered as a card, and sent through Eyre.
* be represented as a separate library file, per game app (minesweeper and tic-tac-toe).


### User Requirements

Students should...

* be provided with a wrapper library that they can download, and should be able to wrap their game applications with one %- gate call.
*  be able to play game boards that are of any rectangular shape (minesweeper only).
*  be able to display boards that are upto 20 x 20 in size (minesweeper only).
*  have a basic structure file provided to them, to standardize app development for the course.
*  may extend game state by adding their own fields (they must not alter existing fields, however).
* be able to use the +dbug library (the wrapper must function while being wrapped by +dbug).

Overall, the WUI libraries should make it easy for students to test their game apps, while standardizing homework solutions for instructors. Both parties can devote more time to Gall app development, and less time to development minutiae.

### Other Requirements

After completion of Minesweeper and Tic-Tac-Toe WUI wrappers, the Grantee must assist with:

*  helping the Champion with the documentation of both libraries, for docs.urbit.org website.
*  address any student questions (provide a point of contact), when libraries are used in the next App School cohort.
*  provide adjustments to the two said libraries, if other users discover bugs.
*  provide minor adjustments to the libraries (within scope), as teaching requirements change in the future.

## Milestones

**Milestone 1**: 2 Stars

Completed July 1, 2024.

For completed versions of both libraries, as per the Champion's feedback and specifications. It is expected that some teaching requirements will change, so some features may change after submission. These changes are handled in Milestone 2.

**Milestone 2**: 1 Star 

ETA: October 2024

For assisting the Champion with documentation, testing, acting as a point of contact for students. Also for providing help with the next App School cohort (within the scope of WUI), should this arise in the near future.