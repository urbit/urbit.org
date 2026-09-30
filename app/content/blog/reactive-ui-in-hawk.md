+++
title = "Reactive UI in hawk"
date = "2026-09-28"
description = "Hawk has a new reactive UI system."
summary = "Hawk has a new reactive UI system. It renders data from any app on your ship in a way that live-updates on the screen as it changes."
search_terms = [
    "reactive UI in Hawk",
    "Hawk",
    "Hawk 499",
    "reactive UI",
    "Hoon UI",
    "Plume",
    "Datastar",
    "Gall subscriptions",
    "vitals",
    "Urbit frontend",
    "server-rendered UI"
]

[extra]
author = "Will Hanlen"
ship = "~migrev-dolseg"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Reactive+UI/Blog_Reactive+UI_Social.jpg"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Reactive+UI/Blog_Reactive+UI_Social16_9.jpg"
imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Reactive+UI/Blog_Reactive+UI_Banner.jpg"
imageEmail = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Reactive+UI/Blog_Reactive+UI_Mail.jpg"
tags = ["hawk", "hoon", "reactive-ui", "developers"]
+++

![Reactive UI in Hawk concept art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Reactive+UI/Blog_Reactive+UI_Hero.jpg)

Hawk has a new reactive UI system.

It renders data from any app on your ship in a way that live-updates on the screen as it changes.

Hawk handles the hard parts, you just connect to the data you want, write the UI, and hawk handles the rest.

Developers no longer need to know javascript! The whole reactive sytem is written in hoon.

For an example of something rendered with this system, check out the [Hoon crash course](https://hawk.computer/+/hawk-crash-course). (you might even learn some hoon)

If you already have a running ship, you can download hawk from me:

```
|install ~dister-migrev-dolseg
```

or if you want a experimental environment, I made a little quickstart script that will boot you a comet and automatically drop you into an authenticated browser session:

```
uv run https://hawk.computer/-/try
```

(Its only dependency is `uv`.)

## How it works

A reactive component is a door with four arms, typed by its model:

```
^-  (plume your-component-state-type)
|_  [props=(map mane tape) bowl]
++  deps   ::  the gall subscription paths it watches
++  fold   ::  fold one fact into the component's state
++  view   ::  component state -> markup
++  poke   ::  a DOM event -> pokes to agents
--
```

`props` are the attributes a parent component writes on the component.

```
+$  bowl
  $:  =cid        ::  this instance's DOM id
      our=@p      ::  us
      src=@p      ::  who is viewing
      tab=@ta     ::  which browser tab
      route=path  ::  where the page is mounted
      dap=term    ::  the agent serving the page
  ==
```

A reactive page is a tree of components.

## An example: peer connection check

`%vitals` comes with Landscape. It checks whether your ship can reach another one.

We'll build a page that runs that check and shows each step as it happens.

It has two components:

- `checker` reads the ship from the url
- `status` watches `%vitals` for that one ship

### The page

```
/-  vi=landscape^vitals
|^
  ^-  kite-handler
  [%plume %.y ~ [%marl part-head] (component-of checker) registry]
::
++  part-head
  ^-  marl
  :~  ;title: connection check
      ;link(rel "stylesheet", href "/hawk/~/assets/1/feather");
  ==
::
++  registry
  (malt ~[[%status (component-of status)]])
::
++  checker  ...
++  status   ...
--
```

`checker` is the root.

The registry lists the components a view can mount by name.

`%.y` makes the page private to your ship.

### checker

```
++  checker
  ^-  (plume std-model)
  |_  [props=(map mane tape) bowl]
  ++  deps  ~[(param-sub /ship 'ship' '')]
  ++  fold  fold-std
  ++  poke  no-poke
  ++  view
    |=  [state=(unit std-model) slot=marl]
    ^-  manx
    =/  ship=tape  (trip (read-param state /ship ''))
    ;main.fc.g3.p4
      =data-signals  "\{ship: ''}"
      ;h1: connection check
      ;div.fr.g2
        ;input.grow.p2.bd1.br2(data-bind "ship", placeholder "~sampel-palnet");
        ;button.p2.bd1.br2.hover(data-on_click "@nav('', 'ship=' + $ship)"): go
      ==
      ;+  ?~  ship  ;p: pick a ship
          ;plume_status
            =key   ship
            =ship  ship
            ;
          ==
    ==
  --
```

The url is a subscription too.

`param-sub` watches `?ship=` and nothing else.

`go` changes the url. The server moves the page's cursor, `checker` folds the new ship, and the view mounts a new `status`.

The page doesn't reload.

`;plume_status` mounts the child. Its attributes are its props. `key` is its identity: a new ship is a new component with a new subscription.

### status

```
++  status
  ^-  (plume result:vi)
  |_  [props=(map mane tape) bowl]
  ++  deps
    ^-  (list dep)
    =/  ship  (~(gut by props) %ship "")
    ~[[/status [our %vitals] /status/(crip ship)]]
  ::
  ++  fold
    |=  [state=(unit result:vi) =wire sign=watch-sign]
    ^-  result:vi
    ?.  ?=(%fact -.sign)
      (fall state [*@da %complete %no-data ~])
    !<(result:vi q.cage.sign)
  ::
  ++  poke
    |=  [state=(unit result:vi) form-data=(list form-field) signals=(map @t @t)]
    =/  m  (strand ,(list datastar-event))
    ^-  form:m
    =/  ship  (slav %p (crip (~(gut by props) %ship "")))
    ;<  err=(unit tang)  bind:m
      (poke-await [our %vitals] run-check+!>(ship))
    (pure:m ~)
  ::
  ++  view
    |=  [state=(unit result:vi) slot=marl]
    ^-  manx
    ?~  state  ;p: loading
    =*  status  status.u.state
    =/  busy=tape  ?:(?=(%pending -.status) "true" "false")
    ;div.fr.g3.ac.pt3.bdt1
      ;span.grow: {(trip -.status)}: {(trip -.p.status)}
      ;button.p2.bd1.br2.hover
        =data-indicator       "_poking"
        =data-attr_disabled   "$_poking || {busy}"
        =data-attr_aria-busy  "$_poking || {busy}"
        =data-on_click        "@poke('')"
        ; check
      ==
    ==
  --
```

`deps` is built from props, so each `status` watches the one ship it was given.

`%vitals` sends the last result as soon as it's watched, then a fact every time the check moves.

`check` pokes `%vitals` to start a check. The poke never draws anything. The facts do.

`check` is disabled while it's busy, for two reasons:

- `_poking` is set by datastar while the poke is in flight
- `busy` is rendered by the server while `%vitals` says the check is pending

The poke returns as soon as `%vitals` acks, so the second one is what keeps the button off until the check is done.

## Try it

Save it as an endpoint, open `?ship=~zod`, and hit check. The row walks through the check live:

![the connection check running](https://outbox.willhanlen.com/vitals-check.gif)

Open it in a second window. Both windows show the same check.

## The whole file

```
/-  vi=landscape^vitals
|^
  ^-  kite-handler
  [%plume %.y ~ [%marl part-head] (component-of checker) registry]
::
++  part-head
  ^-  marl
  :~  ;title: connection check
      ;link(rel "stylesheet", href "/hawk/~/assets/1/feather");
  ==
::
++  registry
  (malt ~[[%status (component-of status)]])
::
++  checker
  ^-  (plume std-model)
  |_  [props=(map mane tape) bowl]
  ++  deps  ~[(param-sub /ship 'ship' '')]
  ++  fold  fold-std
  ++  poke  no-poke
  ++  view
    |=  [state=(unit std-model) slot=marl]
    ^-  manx
    =/  ship=tape  (trip (read-param state /ship ''))
    ;main.fc.g3.p4
      =data-signals  "\{ship: ''}"
      ;h1: connection check
      ;div.fr.g2
        ;input.grow.p2.bd1.br2(data-bind "ship", placeholder "~sampel-palnet");
        ;button.p2.bd1.br2.hover(data-on_click "@nav('', 'ship=' + $ship)"): go
      ==
      ;+  ?~  ship  ;p: pick a ship
          ;plume_status
            =key   ship
            =ship  ship
            ;
          ==
    ==
  --
::
++  status
  ^-  (plume result:vi)
  |_  [props=(map mane tape) bowl]
  ++  deps
    ^-  (list dep)
    =/  ship  (~(gut by props) %ship "")
    ~[[/status [our %vitals] /status/(crip ship)]]
  ::
  ++  fold
    |=  [state=(unit result:vi) =wire sign=watch-sign]
    ^-  result:vi
    ?.  ?=(%fact -.sign)
      (fall state [*@da %complete %no-data ~])
    !<(result:vi q.cage.sign)
  ::
  ++  poke
    |=  [state=(unit result:vi) form-data=(list form-field) signals=(map @t @t)]
    =/  m  (strand ,(list datastar-event))
    ^-  form:m
    =/  ship  (slav %p (crip (~(gut by props) %ship "")))
    ;<  err=(unit tang)  bind:m
      (poke-await [our %vitals] run-check+!>(ship))
    (pure:m ~)
  ::
  ++  view
    |=  [state=(unit result:vi) slot=marl]
    ^-  manx
    ?~  state  ;p: loading
    =*  status  status.u.state
    =/  busy=tape  ?:(?=(%pending -.status) "true" "false")
    ;div.fr.g3.ac.pt3.bdt1
      ;span.grow: {(trip -.status)}: {(trip -.p.status)}
      ;button.p2.bd1.br2.hover
        =data-indicator       "_poking"
        =data-attr_disabled   "$_poking || {busy}"
        =data-attr_aria-busy  "$_poking || {busy}"
        =data-on_click        "@poke('')"
        ; check
      ==
    ==
  --
--
```

## How to run it

You need a ship with hawk and Landscape on it.

To boot a fresh comet that has both:

```
uv run https://hawk.computer/-/try
```

It opens your browser on the new ship when it's ready.

To add hawk to a ship you already have:

```
|install ~dister-migrev-dolseg %hawk
```

Then go to `/hawk/~/add-endpoint/vitals`, paste the file above, and save.

The page is at `/-/vitals`. Try `/-/vitals?ship=~zod`.
