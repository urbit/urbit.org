+++

title = "Maat (Tasks)"
date = "2024-03-17"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = ""
reward = "2 stars"
assignee = ["~talfus-laddus"]
champion = ["~tamlut-modnys"]
grant_id = "P0337"
completed = true
canceled = false

+++

## Motivation



There is much to-do in the world. Urbit needs a way to keep track of all those tasks.
> It will be [created with care](https://www.createwcare.com/).

## User Story

* ~zod wants to keep track of his tasks
* ~zod wants to have different lists of tasks depending on the context
* ~zod wants to filter lists of tasks by tags
* ~zod wants to share a particular list of tasks with others
* ~zod wants to collaborate on a list of tasks with others


## User Capabilities

* Create a list
* View all lists
* Add a task with tags and description to a list
* View all tasks of a list
* Edit a task of a list
* Delete a task from a list
* Mark a task as done/undone
* Filter tasks by tag
* Share a list with the World Wide Web (read-only)
* Invite other ships to work together on a list (read and write)


## Architecture and Technology


The backend will consist of three agents:
1. Main agent with state
2. REST-API agent which exposes HTTP endpoints and peeks/pokes the main agent
3. UI agent with serves the frontend

The frontend will be written as a Progressive Web App in HTML, CSS and
Javascript and will utilize the HTMX framework.

The app will be Open Source and available under the MIT license.

> It will be [simple, stupid](https://en.wikipedia.org/wiki/KISS_principle).


## UI Design

A sidebar contains all the lists.
The top of the page contains the input field for a new task.
Right below that there are all the existing tags which can be used for filtering the tasks list.
The rest of the page is the task list itself.
Each task can be marked as done/undone and clicked on to be edited.
The read-only view of a public list accessible through the World Wide Web is
just a flat list of tasks without the other UI elements described above.

> It will be calm.

## Inspiration

- [Sourcehut Issue Tracker](https://todo.sr.ht/~sircmpwn/todo.sr.ht)
- [Status Tlon](https://status.tlon.io/)
- [Tahuti](https://github.com/matthiasschaub/tahuti)


## Completion, Payment and Deliverable

*Completion*: July 2024

*Payment*: 2 Star

*Deliverables*: The app available through Software Distribution


## Future

The future of the app could entail:

- Associate an Urbit ID with a task. Another tag `~` which stands for Urbit IDs.
- Fuzzy search tags
- Separators in a task list. Think of `Todo`, `Doing`, `Done`.
- Comments on tasks
- Due date
- Nested task lists


## Why another To-Do App?

Competition is good.

Apart from that the Urbit app Goals seems not in active development anymore.

## Why Maat?

The Egyptian goddess Maat brought order from chaos at the moment of creation.
She was the wife of Thauti, the god of wisdom who invented writing.

## Why Me?

I am Matthias Schaub, also known as talfus-laddus. I am the creator behind [Tahuti](github.com/matthiasschaub/tahuti),
an expense sharing application designed for Urbit. To aid my software development
for Urbit, I have made [Pilothouse](github.com/matthiasschaub/pilothouse) to manage a fleet of fake ships.
Additionally, I have crafted two Vim plugins to enable seamless documentation
exploration of [Hoon Runes](https://github.com/matthiasschaub/hoon-runes.vim) and the [Standard Library](https://github.com/matthiasschaub/hoon-stdlib.vim) within Vim itself.
I finished both Hoon School and App School.

In order to find out more about my previous works:

- [Personal website](https://talfus-laddus.de/)
- [Sourcehut](https://git.sr.ht/)
- [GitHub](https://github.com/matthiasschaub)