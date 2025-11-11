+++
title = "%nested-goals"
date = "2022-06-22"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]
[extra]
image = ""
description = "Urbit application for individual and social management of high-level goals and their tasks"
reward = "6 stars"
champion = ["~tacryt-socryp"]
assignee = ["~niblyx-malnus"]
grant_id = "P0143"
completed = true
canceled = false
link = "~dister-dozzod-niblyx-malnus/proposal-nested-goals"
deliverable = "~niblyx-malnus/gol-cli"
+++

# Project Description
## Main Structure
- Every goal is an independent, uniquely identifiable, and self-contained unit.
- Every goal should be able to be succinctly summarized in a short sentence or two, much like a commit message.
- Every goal describes the transformation of the current state of the universe into a new desired future state. A goal is a description of this desired future state. A goal can also be a description of a set of criteria and a prescription for the means of evaluating whether these criteria have been met in a given state.
- Goals can be related to one another in two ways:
   - *Precedence*, which describes a relationship in time. When one goal precedes another, the state described by the second goal can only be achieved after passing through the state described by the first goal.
  - *Containment*, which describes the natural human tendency to hierarchically nest goals which exist at different levels of abstraction, ranging from the scale of the existential to the scale of fine motor movements. When Goal A contains Goal B, several things are implied. It is implied that we must pass through the state described by Goal B before getting to the state described by Goal A; in other words Goal B precedes Goal A. It is implied that Goal B is part of the same effort as Goal A. And it is implied that Goal B is a goal on a smaller scale than Goal A.
- All goals are preceded by the goals which they contain.
- Goals can precede other goals without being contained by them.
- Precedence is transitive.
- Goals are not allowed to precede themselves.
- Goals can be nested arbitrarily deep in a tree-like manner. Goals can contain subgoals can contain subgoals can contain subgoals. (Whether goals can be contained by multiple other goals may be revisited, but for simplicity here we assume only a single parent goal.)
- All uncontained goals are by default nested directly under the ultimate goal: the Pursuit of the Good and the Beautiful, or PGB for short.
- Goals can and should have deadlines. These deadlines are inherited by preceding goals as an upper bound on their deadlines. The deadline for a preceding goal can be earlier than the deadline for a succeeding goal, but it cannot be later.
- We can leverage this structure to harvest tasks. For any given goal, we can easily identify all the existing unpreceded goals which precede it. These should ideally represent all goals which can be tackled immediately.
- POTENTIALLY: Goals can contain arbitrary amounts of metadata, including perhaps longer written descriptions, links to other documents, rankings of importance…
- POTENTIALLY: %graph-store nodes can be extracted as goals and incorporated into the existing goal data structure. (suggested by `~sarlev-sarsen`)
- POTENTIALLY: Goals can be sorted according to their urgency (time left until their deadline), procrastination (time elapsed since their initial creation), and many other criteria…
- Goals can be marked completed. Goals can also be deleted. In either case, they are archived.
- Goals can be marked actionable. Actionable goals cannot have subgoals. (suggested by `~midlev-mindyr`)
- POTENTIALLY: existing goals with no actionable subgoals will prompt you to add subgoals. (suggested by `~midlev-mindyr`)
## Beyond a Single Person
- Each goal must be owned by a single identity. The owner of a goal can control who is able to view it, who is able to edit it, etc.
- The owner of a goal also owns all goals contained by that goal. In other words, for any goal, there is a single person who is completely responsible for it at every level of abstraction.
- Goals owned by different people can have precedence relationships, but not containment relationships.
- Goal ownership can be transferred. If this creates a containment relationship between two goals owned by different people, this relationship is transformed into a simple precedence relationship.
- Precedence relationships are created by the owner of the succeeding goal and not the owner of the preceding goal.
- The owner of a goal can delegate that goal to one or more other identities, giving them permissions to edit the goal, add subgoals, modify the deadline, or mark the goal complete. Delegation is not the same as ownership transfer.
- The delegatee(s) can in turn delegate subgoals. Ultimately, all decisions made by delegatees can be overridden by decisions made by delegators, with the ultimate power over any goal being held by the goal owner.
- POTENTIALLY: Goal deadlines can be synced with ucal or other urbit calendar apps.
## Possible Implications
- A simple way for an individual person to dynamically create and manage goals.
- A natural way for goals to extend beyond a single person and grow with a group.
- Useful for cathedrals. Useful for bazaars. Useful for all manner of cathedral-bazaar hybrids.
## Why Me
I have a background in computer science. This is probably not necessary, but has been useful for getting familiar with Urbit.
I am excited to implement this project because (1) I intend to use it myself and (2) I want to learn how to build on Urbit.
The project shouldn't require any expertise beyond familiarity with Hoon, Gall, and whatever else is involved in the Urbit app building stack.
I have also begun development of a 'Milestone 0' as a proof of concept, available on [github here](https://github.com/niblyx-malnus/nested-goals).
### Original Goals for Milestone 0
A basic CLI with the following affordances
(1) Add a goal with an associated description
(2) Remove a goal using a unique goal handle
(3) Nest one goal under another
(4) Unnest a goal from under another
(5) Pretty print the existing data structure
These 5 things have been accomplished. Feel free to try it out!
### Using the code
Just drop the files in `src` in their corresponding directories (`app`, `lib`, and `sur`) on the base desk of a fake zod, `|commit %base`, `|link ~zod %gol-cli` and then you should be in the CLI.
Alternatively:
```
|install ~niblyx-malnus %gol-cli
|rein %gol-cli [& %gol-cli]
|link %gol-cli
```
CLI Commands
Simply hit `Enter` to print the existing data structure based on the current context. The current context is like your current directory in a UNIX operating system. By default the data structure will be printed with respect to this goal. The default is `~` which prints the data structure in its entirety.
Add a goal with `ag 'Some text'`. This will create a goal nested under the current context.
Remove a goal with `rg ---`, where the three dashes are a standin for a "handle" which uniquely identifies a goal. These are printed next to the goals on the left.
To change the current context use `cc ---`.
To change back to the default context use `cc ~`.
To nest one goal under another, use `ng --c --p` where the child is first and the parent second.
To unnest one goal from under another, use `fg --c --p` (for "flee goal") where the child is first and the parent is second.
To print a specific goal without changing the context, use `pg ---`.
To print the ancestors or parent tree of a specific goal use `pp ---`.
(Also clearall will clear your whole data structure.)

## Milestones & Compensation

### Milestone 1

Expected Completion: July 9th

Payment: 1 star

A fully functional personal task manager CLI.
Functionality:
- Can add and remove goals. (Milestone 0)
- Can hierarchically nest goals. (Milestone 0)
- Can add deadlines to goals.
- Deadlines are inherited from ancestor goals.
- Can mark goals as actionable.
- Can mark goals as complete.
- Can create "precedence" or "dependence" relationship between two goals.
- Can interact richly with the data structure; can move up and down the hierarchy, collapse and uncollapse nested subgoals.
- Can extract ("harvest") actionable, unpreceded goals in a list to see what goals can be tackled immediately.
- Can sort by date of deadline or by date of goal creation.

### Milestone 2

Expected Completion: August 6th

Payment: 1 star

A fully functional social task manager CLI.
- Can share goals so that they are viewable by others.
- Can delegate goals (and their subgoals) to other ships. Delegates will have permissions to add subgoals, edit deadlines, edit goal descriptions, create precedence relationships, and to further delegate subgoals with respect to the goal they have been delegated.
- Can transfer ownership of goals (and all their subgoals) between ships.

## Milestone 3
Expected Completion: September 21st
Payment: 2 stars (1 for back-end API (~niblyx-malnus), 1 for front-end (~randes-losrep))

A basic but compelling front-end prototype to showcase at Assembly 2022. A working interactive browser analog of the current CLI. Focused on getting the backend hooked up to the frontend and providing a minimum viable product. The main view will be the "hierarchical/nested" view in which projects and goals can be viewed and explored.

### User Stories
I can create projects and update/delete them
I can create goals and update/delete them
I can nest goals beneath one another
I can mark goals as complete or incomplete 
I can collapse/uncollapse any hierarchy of goals or projects
I can filter out completed/uncompleted goals

## Milestone 4
Expected Completion: October 28th, 2022
Payment: 2 stars (1 for back-end (~niblyx-malnus), 1 for front-end (~randes-losrep))

Based on the relative success of the Goals prototype, we believe a self-sustaining version of the app is possible by leaning into what we already have that works and focusing on making it rock solid. To this end we want to focus on the following: 
 
Implement all existing CLI functionality in the front-end:
  (1) moving subgoals under different goals, (2) virtual children, (3) precedence, (4) priority, (5) marking actionable, (6) specifying kickoff/deadline times, (7) delegating goals and subgoals to other ships, and (8) harvesting
Integration with Groups so that pools can be created which are associated with existing groups

In addition we need to make the backend robust with the following:
- Marks/Subscription versioning to gracefully manage API upgrades
- Subscription channel update log in case front-end is kicked and must resubscribe
- Poke relays and undecided/approved/rejected status for pokes to other ships for front-end display
- Documentation

### User Stories
- I can set a deadline or a kickoff date for a goal and edit or remove it
- I can mark/unmark goals as actionable
- I can filter to see only actionable goals
- I can precede a goal before another, having the option to remove the relation
- I can prioritize a goal ahead of another, having the option to remove the relation
I can "harvest" from a goal, listing the preceding goals which can be tackled immediately
I can archive goals and have an option to view them later
I can restore or permanently delete archived goals (as an admin)
I can read about nested-goals in a documentation page
I can select a group from the Groups app and invite everyone from that group to a pool
I can move a goal to be nested elsewhere in the tree
I can make a copy of any pool 
