+++

title = "%homunculus"
date = "2024-02-01"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Tool"]

[extra]
image = ""
description = ""
reward = "5 Stars"
assignee = ["~sivrul-litsub"]
champion = ["~lagrev-nocfep"]
grant_id = "P0331"
completed = true
canceled = false

+++

## Description

Imagine a world where Urbit can be navigated through Midnight Commander style terminal menus — where app developers have an alternative to web interfaces.

Homunculus is an agent that serves as a framework for building TUI front-ends for your apps. Developers will be able to define their front-end in Sail, as if they were writing a normal web interface, and Homunculus will turn it into a text based display on the terminal. Homunculus' style attribute and semantic element system will make it intuitive to describe how your text display should look and operate. You will be able to specify color, size, position, borders, layering, and make use of elements with specific functionality like inputs, and much more.

Homunculus will send terminal events like keystrokes and clicks in a format that is easily interpreted by your agent, providing a simple API to make your text interface interactive. For example, instead of just telling you that a click happened at a certain coordinate, Homunculus will tell you which one of your elements was clicked.

This project will provide the necessary infrastructure to expand terminal interfaces beyond CLIs, which is currently not feasible with %drum. Homunculus will open up the possibility for apps like terminal text editors, or even games with interfaces like the original Dwarf Fortress.

TUIs are beautiful and I believe they are highly consistent with the aesthetic vision of Urbit. Homunculus will further Urbit as a creative medium and as a vessel for unique experiences using computers.

### Personal context

I recently released Mast, which is an easy to use framework for building dynamic and interactive Sail front-ends that work as SPAs rather than static pages. In many ways, Homunculus is an extension of the developments that I had made building Mast, and it deals with many of the same problems, so I already have quite a bit of familiarity with the task at hand.

## Milestone 1: Build Homunculus

Estimated time: 2 months

Payment: 2 stars

- A Sail attribute and semantic element system will be defined allowing developers to describe the style, positioning, and functionality of their interface in the manner of semantic HTML and CSS — but uniquely designed for Urbit terminal displays (the conceptual work for this has already been done). Developers should only need to write Sail elements with these attributes and tag names, and then render this Sail and send the $manx to Homunculus.

- The $manx received by Homunculus will then be parsed into output for the terminal.

- Homunculus will keep track of certain details about the current state of an app's display and use this information to parse terminal input into meaningful information for the app depending on the kinds of elements rendered.

## (Update: April 5th)

- Milestone 1 has been completed, and Eyre has been integrated, meaning that the terminal client can be remote from your ship. A simple Bash script sets up a connection over HTTP, sending terminal input to Homunculus and receiving its rendered output stream. This allows the terminal to serve as a graphical interface alternative to the browser.

- Milestone 2 has been expanded:

## Milestone 2: Turn Homunculus into a desktop environment, create a filesystem explorer, and write user and developer documentation

Estimated time: 2 months

Payment: 3 stars

- Until now, user experience on Urbit has been locked in to singular browser windows on an app-by-app basis, where the Landscape home page only aggregates links to these apps. Instead of this, as a desktop environment, Homunculus will provide a new basic user experience where multiple app windows are hosted and managed simultaneously all within one terminal instance.

- Users will have the freedom to completely determine what their desktop is like depending on what kind of functionality is important to them. It should be easy for a user to write their own apps and widgets to populate their desktop. I believe this further realizes Urbit's goal to create a personally owned, operated, and understood computing environment.

- A file manager will be created to provide a first basic utility for the desktop environment, where you can browse your filesystem, and launch app windows.

- Documentation will be made to give clear explanations and examples of how to write Sail for Homunculus and integrate it in your agents to make dynamic and interactive graphical TUIs.

- Create a video demo that shows off how users and developers will use %homunculus.

- Hold a release party in gather.town so that community members can come check it out and ask questions.

## Total compensation

5 stars