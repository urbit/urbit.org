+++
title = "Data Types"
weight = 4
template = "doc.html"
+++

Gall apps are composed of smaller types, and this is a directory of the main
pre-defined types you'll encounter in building/reading a Gall app.

Building Gall apps is a matter of building the Gall arms you need. And building
Gall arms is about repeatedly answering two "dynamic" questions and one static
question:
1. What kind of data is coming in here?
2. What kind of data needs to go back out?
3. (static) What info does every Gall app always have access to?

If you can answer those questions, you'll feel like you always have solid ground
under your feet, and can build whatever you need to in Gall.

## Note on Finding Type Source Code
Anytime you see a type that you don't recognize, it either has to come from the
Ford imports at the top of the file (`/-` and `/+`) or from the standard
library. Just search for `++  <TYPE-NAME>` or `+$  <TYPE-NAME>` in the 4 `/sys`
Hoon files (`hoon`, `arvo`, `lull` and `zuse`), and you'll generally find what
you need.

Remember to put two spaces ("gap") after `++`/`+$` when searching.

## Standard Library Types
These are types found in `hoon.hoon`, `arvo.hoon`, and `zuse.hoon`

### Standard Library Organization
* `hoon.hoon`: general Hoon language types and functions
* `arvo.hoon`: base kernel that loads the vanes and has some types in it
* `lull.hoon`: the "public" models for each vane. These can be called by other
  vanes and user code, and aren't used for internal vane implementation.
* `zuse.hoon`: additional stdlib functions

### Key Standard Library Types that Gall Uses
* `quip` (`sys/hoon.hoon`)
  - usually in the form `(quip card _this)` or `(quip card _state_)`, where
    `_this` is the type of the current Gall agent, and `_state` is the type of
    its state variable
  - `(quip item state)`
  - `[(list item) state]`

* `vase`
- A `[type noun]`. This "marks" the data as a type so that we can extract it
  into that type from the `vase`.
- Use this when you don't know at creation time what type of data will be coming into a function. Having vase as the type of a Gall arm forces messages sent to that arm to mark their type.
```
::  Example--q is ~timluc-miptev in atom form
~zod:dojo> !>(~timluc-miptev)
[#t/@p q=3.690.144]
```

* `cage`/`cask` (`sys/arvo.hoon`)
  - `cask` is the general version of `[@tas any-data]`
  - `cage` is a specific version: `[@tas vase]`, where `@tas` should be a mark

* `wind` (`sys/arvo.hoon`) Gall `card`s are of type `(wind note gift)` ``` ::
wind is a tagged union of: [%pass p=path q=a] [%slip p=a] [%give p=b] ``` What
this means in practice is that to make a Gall card, you make it as one of:
* `[%pass p=path q=note:agent:gall]`
* `[%give p=gift:agent:gall]` In the "Gall Types" section below, we'll see what
`note:agent:gall` and `gift:agent:gall` consist of.

#### `note-arvo` and `sign-arvo`
These types are used, respectively, to pass calls to Arvo vanes and receive
returns from vanes. To find their full source, just search for `++ note-arvo` or
`++ sign-arvo` in `lull.hoon`.
* `note-arvo` (`sys/lull.hoon`)
  - tagged union of the notes that each Arvo vane can create
  - format: `[<vane-letter> task:able:<vane-name>]`
  - example: `[%g task:able:gall]`

* `sign-arvo` (`sys/lull.hoon`)
  - tagged union of values that vanes can produce and send back to Gall apps in
    the `on-arvo` arm
  - format: `[<vane-letter> task:able:<vane-name>]`
  - example: `[%e gift:able:eyre]`
  
### `path` and `wire`
These types often use a shortcut syntax that we can check in the dojo. A `path`
is just a `(list knot)`, and `wire` is an alias for `path`.

Examples of creating `path`s and pattern-matching them are below. Note the use of `/[<expression>]` syntax to insert evaluated expressions as parts of the `path`.
```
> /example/path
[%example %path ~]

> `path`[%example %path ~]
/example/path

> `path`[%example %ship (scot %p ~timluc-miptev) ~]
/example/ship/~timluc-miptev

> /example/ship/[(scot %p ~timluc-miptev)]
[%example %ship ~.~timluc-miptev ~]

> =my-path [/example/[(scot %p ~timluc-miptev)]]

::  how to pattern-match against paths
> ?=([%example @ ~] my-path)
%.y

> ?=([%example ~] my-path)
%.n
```

## Gall Types
These include anything like `...:agent:gall`. They are defined in
`sys/zuze.hoon`. Search for `++  gall` in `zuze.hoon` to find the start of that
core definition.

### Gall `agent`
`agent` is an iron core that contains the 10 arms used for the app. It also has
some types under it. Search for `++  agent` to find this part.

* `bowl:agent:gall`
  - holds the current metainformation about the Gall app
  - passed to every agent which in turn can pass it to children

* `note:agent:gall`
  - can start with `%arvo` and hold a `note-arvo` note (for "calling" arvo
    vanes)
  - or can start with `%agent` and send a poke or subscribe to a Gall agent on any ship
```hoon
+$  note
      $%  [%arvo =note-arvo]
          [%agent [=ship name=term] =task]
      ==
```
 * `card:agent:gall`
   - used heavily in Gall apps--the return type of most apps is `[(list card)
     agent]` (or `(quip card agent)`
   - `(wind note gift)`
   - think of a `wind` as an instruction to an Arvo vane or to another Gall
     agent

* `task:agent:gall`
  - used in `%agent` notes to send messages to other Gall ships  

* `gift:agent:gall`
  - "return" types from a Gall agent's `on-watch` and `on-poke` arms
  - used most often to send a `%kick` and remove subscriber(s), or to send a
    `%fact` to subscribers on a `path`

