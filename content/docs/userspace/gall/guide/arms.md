+++
title = "The 10 Arms of Gall: App Structure"
weight = 3
template = "doc.html"
+++

Every Gall app (also known as an agent) contains a core with exactly 10 arms.
Each of those arms is responsible for handling certain types of messages that
Gall feeds in to our agent.

Most programs create either a helper core to hold functionality that is used by
those 10 arms, or includes a `|^` within a given arm to add additional arms that
may be called within it. In addition to that, there are some types that all Gall
programs use to send requests and receive responses, as well as code conventions
that are part of nearly every Gall agent's structure.

## The 10 Arms
Gall's arms fall into a few separate families that handle broad categories of
work.

### State Management Arms
These arms handle initialization of app state, initialization of any outside
resources and upgrades to new versions of the app with different types of state.
* `+on-init`
* `+on-save`
* `+on-load`

### Listen for Input
These arms respond to calls initiated by outside entities, such as users pushing
buttons, HTTP requests incoming to the app, or other agents initiating contact
* `+on-poke`: handles any calls from outside processes that aren't subscriptions,
  i.e. one-time actions
* `+on-watch`: receives incoming subscription requests from other processes
* `+on-leave`: receives notifications that another process is unsubscribing

### Respond to Actions We Initiated
These 2 arms handle responses to requests we make to other agents or Arvo vanes.
* `+on-agent`: receives responses when we call another Gall agent's `+on-poke` or
  `+on-watch`
* `+on-arvo`: receives responses from Arvo vanes (such as a list of files if we
  ask Clay to list a directory's contents)

### Access App State
* `+on-peek`: a "read-only" arm. Doesn't produce actions, but allows querying and
  returning of our agent's internal state

### Other
* `+on-fail`: if a crash happens in any arm except `+on-poke` or `+on-watch`, Gall
  sends a crash report message to this arm. Most apps ignore this message.

## Arm Input and Output Types
Some arms take and return simple data types, but Gall also has a few key input
and output types that it constantly uses. You can really drill into them
[here](/docs/userspace/gall/guide/appendix/gall_types), but let's introduce a couple key ones. We'll refresh them
and go more in depth as we explain each arm later.

### `wire` & `path`
`wire` and `path` are the same type: a list of terms. A leading `/` is syntactic sugar for a list of terms.
```
:: the next two lines are identical
/this/is/a/path
[%this %is %a %path ~]
```

### `card`, `note`, `gift`
The types used to do "function calls/returns" to Arvo vanes or other Gall agents.
They are tuples that look like:
```
::  For "calling" functions in vanes or agents
[%pass p=path q=note]

::  For "returning" values to vanes or agents
[%give p=gift]
```
`note` and `gift` look like:
```
::  note has 2 forms: 1 for calling Arvo, 1 for calling agents
$%  [%arvo =note-arvo]
    [%agent [=ship name=term] =task]

::  gift has can return %fact (piece of data) or some type of ack
$%  [%fact paths=(list path) =cage]
    [%kick paths=(list path) ship=(unit ship)]
    [%watch-ack p=(unit tang)]
    [%poke-ack p=(unit tang)]
```

### quip
```
::  quip definition
++ quip

  |$  [item state]
  [(list item) state]
  
:: Gall quip: item is card, state is agent-type
(quip card agent-type)
```
A common Gall pattern is for arms to output a `quip`. The list of `card`s are
actions to perform, and the tail of the cell contains an updated version of the
agent (i.e. the new state of the app).

## Code Organization Conventions
By convention, Gall apps generally all follow a similar structure. They do the
following, in order:
1. Ford imports of types (`/-` rune) and libraries (`/+` rune)
2. Define the app's state type
3. Wrap in the `dbug` agent for easy debugging
4. Define aliases for the agent, default agent implementation, and helper core
   (if applicable)
5. write the "10-arms" agent core
6. write the helper core that contains extra functionality so that the "10 arms"
   code isn't so long (if applicable)

### Code Example
Let's look at [the source for the publish agent (as of June 17,
2020)](https://github.com/urbit/urbit/blob/08e1abb1396e9fe0673f5696260a9bcf18b2fa0f/pkg/arvo/app/publish.hoon)

Here are links to where the pieces above are defined in it:
1. [type
   imports](https://github.com/urbit/urbit/blob/08e1abb1396e9fe0673f5696260a9bcf18b2fa0f/pkg/arvo/app/publish.hoon#L1),
   [library
   imports](https://github.com/urbit/urbit/blob/08e1abb1396e9fe0673f5696260a9bcf18b2fa0f/pkg/arvo/app/publish.hoon#L11)
2. [state type
   definitions](https://github.com/urbit/urbit/blob/e931a473dd52614304b50c2dcbfc31a16fc82542/pkg/arvo/app/publish.hoon)
   lines 19-44
3. dbug, line 62
4. [alias
   definitions](https://github.com/urbit/urbit/blob/08e1abb1396e9fe0673f5696260a9bcf18b2fa0f/pkg/arvo/app/publish.hoon#L66)
5. [arm
   definitions](https://github.com/urbit/urbit/blob/08e1abb1396e9fe0673f5696260a9bcf18b2fa0f/pkg/arvo/app/publish.hoon#L70)
   lines 70-517
6. [helper
   core](https://github.com/urbit/urbit/blob/08e1abb1396e9fe0673f5696260a9bcf18b2fa0f/pkg/arvo/app/publish.hoon#L519)

### Note on Aliases 
From line 66 of the above:
```
  +*  this  .
      def   ~(. (default-agent this %|) bol)
      main  ~(. +> bol)
```
`+*` is a macro that inserts code expansions at the start of every arm of the
door, assigning aliases on the left to `hoon`s on the right. So it doesn't add extra arms, meaning that our door here still has only 10 arms, as required.

We have aliases for the `this`, the default agent, and the helper core are
defined. The `~(. door argument)` syntax means "set the sample of `door` to
`argument` and return the resulting subject". Typically, `~(arm door argument)`
means "return the arm of `door` with the sample of the door set to `argument`",
but asking for `.` instead of a particular arm returns the whole door. It's a
way to set `door`s sample for every arm in the door at once and then later
request individual arms using `arm:alias`, as opposed to requesting individual
arms of `door` with the sample set to `argument`.

`default-agent` is a basic implementation of a Gall agent that returns valid but
dummy responses for all arms. We give it the alias `def` here, and you'll see
most Gall programs call it when they don't need a particular arm to have an
action.

Finally, note the `+>` in line 68. This is a very common idiom in Gall for
referring to the helper core. In this case, we have the `=<` rune on line 64,
which means that our Gall agent is defined with the helper core as the subject.
Because our Gall agent is a door, the sample is in the head of the tail. So we
select the tail of the tail, which is our helper core.

Many applications use `|^` instead of a helper core. This allows them to put
the heavier functions below the main logic, while keeping helpers closer to
their use place. You'll see both in these upcoming tutorials.

## debugger: `dbug`
Near the top of the file, you'll see the line `%-  agent:dbug`. This wraps our
program in the `dbug` Gall agent, which lets us inspect the state of the program
as it's running. We'll do this in more detail in the [lifecycle
lesson](/docs/userspace/gall/guide/lifecycle).

If you type `|start %dbug` at the Dojo, you'll be able to browse to
`yourshipurl/~debug` and see the current state of every app in the ship that
uses `dbug`.

How does this work? If you look at `/lib/dbug/hoon`, you'll see that its `+agent`
arm takes a Gall agent as the sample. Then it creates an `ag` alias that
gives its `bowl` to that agent. At the top of `+on-poke`, we test whether the
incoming mark is `%dbug`. If it's not, then it just forwards the `[mark vase]`
sample to the agent. If it is, it does `dbug` stuff to print the agent's state.

Because `dbug` takes the `agent` as an argument, it can call any of that
`agent`'s arms. It calls them either to provide default behavior, or to get the
agent's state using `+on-save`.

## Summary
You've now seen all the pieces that make up a complete Gall app, with a
conceptual overview of the kinds of things that each of the arms handle. If this
seems overwhelming, **don't panic**. I'll take you through each part of this
program structure in great detail in the upcoming lessons.

## Exercises

### Code Reading
In your pier, browse to the `/app/` directory. Open up 4 random files there. See
if you can find:
* the Ford imports
* the state definition
* the 10 agent arms
* a helper core, if one exists

Note the line numbers in each file for each part.

### `picky` Implementation
To do a chat-admin app, you need to get data from 3 Gall agents:
1. `chat-store`, stores all messages for all chats a ship is a member of
2. `group-store`, stores all members and admins of a group
3. `metadata-store`, stores all group->chat mappings

- List all the features that a group chat admin app will need
- For each feature, map it to one or more arms.
- Spec out what data the app will need to store internally and what it will need
  to get from each external data source.

