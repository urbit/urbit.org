+++
title = "Urbit Interface Framework" 
date = "2022-08-24"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Other" ]

[extra]
image = ""
description = "Develop framework for alternative urbit web browser interface"
reward = "5 stars"
champion = ["~nocsyx-lassul"]
assignee = ["~nortex-ramnyd"]
grant_id = "P0100"
completed = false
canceled = false
+++

Proposal to develop web application creation tooling and framework in hoon following [thick stateful server single-page application architecture](https://en.wikipedia.org/wiki/Single-page_application#Thick_stateful_server_architecture).

The framework is abstracted into a library that is used by a gall agent. The gall agent defines the application's data model and state controller. View model is defined separately from the agent. This ensures that agent api remains as is and, if needed, agent could implement multiple different view/UI models, e.g some other UI framework that is targeting different kind of device instead of web browser. It also means existing agents can plug in the view model defined with this framework without making changes to agent data and controller model.

Being a SPA, in-app links and navigation is intercepted: DOM patching and history api is used instead. In-app navigation is handled by a router in which URL paths are mapped to UI states, either strucutred as separate pages but could also be more granular (i.e. some UI state might only change part of current document not the whole document).

The view model should be defined using sail components. Sail components abstract view model into splitted subviews, which store their own internal state and controller. Component's controller is conceptually similar to agent's controller (on-poke arm), it receives  [mark vase] and produces list of card:agent:gall and the component with possible internal state modification. `+on-init` in called when component is going to be mounted to DOM. At this arm, a card needs to be sent that declares which browser events this component expects to receive.

```
++  sail-component
  $_  ^|
  |_  [props children bowl:sail]
  ++  on-poke  |~([mark vase] *(quip card:agent:gall _^|(..on-poke)))
  ++  on-init  *(quip card:agent:gall _^|(..on-poke))
  ++  manx  *^manx
  --
```

Component's on-poke arm receives from browser user interaction events (DOM events) and handles these accordingly, by emitting cards and/or modifying state.

In case agent's state or component's internal state gets modified at on-poke call, a view patch is sent to browser. The view patch is an html string representing the component(s) whose state (and thus their sail template at `+manx` which interpolates state) got modified.

The patch is then applied in the application's javascript context with diffHTML.

The view model declares component tree in sail syntax:

```
:: component1, component2 are imported from some path :: 
:: foo, boo are passed in from agent
;div#root
  ;component1(prop1 (p foo));
  ;component2
    =prop1  (p foo)
    =prop2  (p boo)
  ==
==
```

gate `+p` produces jammed atom that is encoded to tape since manx properites must be tapes. decoding is handled by the library and components receive nouns that they have to normalize to their own needed structures (using `;;(mold noun)`)

---

**milestones**

_sail component abstraction layer and framework base logic_

2 stars

the base of the framework is written in scope of this milestone. this is the base functionality of writing sail components and attaching the resulting UI logic to agent.

_routing and navigation layer_

1 star

- implementing url mapping to view states.

- implementing history api.

_hot reloading_

1 star

implementing transition logic when components source code changes

_documentation and example agent_

1 star

documentation about using this framework and example usage in form of a todo app
