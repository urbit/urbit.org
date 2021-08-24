/-  poketime
/+  default-agent
|%
+$  versioned-state
    $%  state-0
    ==
::
+$  state-0
    $:  [%0 counter=@]
    ==
::
+$  card  card:agent:gall
::
--
=|  state=versioned-state
^-  agent:gall
=<
|_  =bowl:gall
+*  this      .
    def   ~(. (default-agent this %|) bowl)
    hc    ~(. +> bowl)
::
++  on-init
  ^-  (quip card _this)
  ~&  >  '%poketime initialized successfully'
  =.  state  [%0 0]
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  ~&  >  '%poketime recompiled successfully'
  `this(state !<(versioned-state old-state))
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %noun
    ?+    q.vase  (on-poke:def mark vase)
        %print-state
      ~&  >>  state
      ~&  >>>  bowl  `this
      ::
        %print-subs
      ~&  >>  &2.bowl  `this
      ::
        %poke-self
      ?>  (team:title our.bowl src.bowl)
      :_  this
      ~[[%pass /poke-wire %agent [our.bowl %poketime] %poke %noun !>([%receive-poke 2])]]
      ::
        [%receive-poke @]
        ~&  >  "got poked from {<src.bowl>} with val: {<+.q.vase>}"  `this
    ==
    ::
      %poketime-action
      ~&  >>>  !<(action:poketime vase)
      =^  cards  state
      (handle-action:hc !<(action:poketime vase))
      [cards this]
  ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+     path  (on-watch:def path)
      [%counter ~]
      ~&  >>  "got counter subscription from {<src.bowl>}"  `this
  ==
++  on-leave
  |=  =path
  ~&  "got counter leave request from {<src.bowl>}"  `this
++  on-peek   on-peek:def
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire  (on-agent:def wire sign)
      [%counter @ ~]
    ?+  -.sign  (on-agent:def wire sign)
        %fact
      =/  val=@  !<(@ q.cage.sign)
      ~&  >>  "counter val on {<src.bowl>} is {<val>}"
      `this
      ==
      ::
      [%poke-wire ~]
    ?~  +.sign
      ~&  >>  "successful {<-.sign>}"  `this
    (on-agent:def wire sign)
  ==
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
::  start helper core
|_  bowl=bowl:gall
++  handle-action
  |=  =action:poketime
  ^-  (quip card _state)
  ?-    -.action
      %increase-counter
    =.  counter.state  (add step.action counter.state)
    :_  state
    ~[[%give %fact ~[/counter] [%atom !>(counter.state)]]]
    ::
      %poke-remote
    :_  state
    ~[[%pass /poke-wire %agent [target.action %poketime] %poke %noun !>([%receive-poke 99])]]
    ::
      %poke-self
    :_  state
    ~[[%pass /poke-wire %agent [target.action %poketime] %poke %noun !>(%poke-self)]]
    ::
      %subscribe
    :_  state
    ~[[%pass /counter/(scot %p host.action) %agent [host.action %poketime] %watch /counter]]
    ::
      %leave
    :_  state
    ~[[%pass /counter/(scot %p host.action) %agent [host.action %poketime] %leave ~]]
    ::
      %kick
    :_  state
    ~[[%give %kick paths.action `subscriber.action]]
    ::
      %bad-path
    :_  state
    ~[[%pass /bad-path/(scot %p host.action) %agent [host.action %poketime] %watch /bad-path]]
  ==
--
