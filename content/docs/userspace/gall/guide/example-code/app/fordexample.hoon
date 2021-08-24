/-  fordex=fordexample, *fordexample2
/+  *server, default-agent, group-lib=group
::  evaluate Hoon code
/=  n2w  /lib/number-to-words
::  mark example
/*  html-as-html  %html  /app/fordexample/example/html
/*  html-as-mime  %mime  /app/fordexample/example/html
::  custom mark example
/*  html-as-name  %fordexample-name  /app/fordexample/example/html
|%
+$  versioned-state
  $%  state-0
  ==
::
+$  state-0
  $:  [%0 name:fordex =age]
  ==
::
+$  card  card:agent:gall
::
--
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this      .
    def   ~(. (default-agent this %|) bowl)
::
++  on-init
  ^-  (quip card _this)
  ~&  >  'fordexample initialized successfully'
  =.  state  [%0 [first='Hoon' last='Cool Guy'] age=74]
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  ~&  >  'fordexample recompiled successfully'
  =/  prev  !<(versioned-state old-state)
  ?-  -.prev
    %0
    `this(state prev)
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %noun
    ?>  (team:title our.bowl src.bowl)
    ?+    q.vase  (on-poke:def mark vase)
        %mark-example
      ~&  >>  html-as-html
      ~&  >>  html-as-mime
      `this
        %custom-mark-example
      ~&  >>  html-as-name
      `this
        %evaluate-hoon-example
      ~&  >>  (to-words:eng-us:n2w 3)
      `this
    ==
  ==
::
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
