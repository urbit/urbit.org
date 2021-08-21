+++
title = "Examples"
weight = 4
template = "doc.html"
+++

These are the files used in the [Writing Marks](/docs/arvo/clay/marks/writing-marks) guide.

## `/lib/csv/hoon`

```hoon
|%
++  validate                                             ::  All rows same length?
  |=  csv=(list (list @t))
  ^-  ?
  =/  result
    %+  roll  csv
    |=  [row=(list @t) =flag ref=(unit @ud)]
    ?.  flag
      [flag ref]
    ?~  ref
      [flag `(lent row)]
    ?.  =(u.ref (lent row))
      [%.n ref]
    [flag ref]
  flag.result
++  en-csv                                              ::  csv -> atom (to mime)
  |=  csv=(list (list @t))
  |^  ^-  @t
  (cat 3 (crip (join '\0a' (turn csv en-row))) '\0a')
  ++  en-row                                            ::  encode row
    |=  row=(list @t)
    ^-  @t
    (crip (join ',' (turn row en-field)))
  ++  en-field                                          ::  encode field
    |=  field=@t
    ^-  @t
    %+  rash
      field
    %+  cook
      |=  =tape
      ^-  @t
      ?~  tape  ''
      ?:  =('"' i.tape)
        (cat 3 (crip tape) '"')
      (crip tape)
    ;~  pose
      (full (star ;~(less (mask "\",\0a\0d") next)))
      ;~  plug
        (easy '"')
        (star ;~(pose (cold '""' doq) next))
      ==
    ==
  --
++  de-csv                                               ::  atom -> csv (from mime)
  |=  dat=@t
  |^  ^-  (list (list @t))
  =/  parsed  (parse dat)
  ?.  (validate parsed)
    ~|(%mixed-col-count !!)
  parsed
  ++  parse                                              ::  parse cord
    |=  dat=@t
    |^  ^-  (list (list @t))
    %+  rash
      dat
    %+  most
      ;~(pose (jest '\0d\0a') (mask "\0a\0d"))
    (most com parse-field)
    ++  parse-field                                      ::  parse field from cord
      |^
      %+  cook
        |=(a=tape (crip a))
      ;~(pose unenclosed enclosed)
      ++  unenclosed                                     ::  unquoted field
        ;~  sfix
          (star ;~(less (mask "\",\0a\0d") next))
          ;~  pose
            ;~  plug
              ;~(pose (jest '\0d\0a') (mask "\0a\0d"))
              ;~(less next (easy ~))
            ==
            ;~(less doq (easy ~))
          ==
        ==
      ++  enclosed                                       ::  quoted field
        |^
        ;~  sfix
          (ifix [prefix suffix] content)
          ;~  pose
            ;~(simu (mask ",\0a\0d") (easy ~))
            ;~  plug
              ;~(pose (jest '\0d\0a') (mask "\0a\0d"))
              ;~(less next (easy ~))
            ==
            ;~(less next (easy ~))
          ==
        ==
        ++  content                                      ::  quoted field contents
          %-  star
          ;~  pose
            (cold '"' (jest '""'))
            %+  cold  '\0a'
            ;~(pose (jest '\0d\0a') (just '\0d'))
            ;~(less doq next)
          ==
        ++  prefix  ;~(pose ;~(plug (star ace) doq) doq) ::  quoted field prefix
        ++  suffix  ;~(pose ;~(plug doq (star ace)) doq) ::  quoted field suffix
        --
      --
    --
  --
++  csv-join
  |=  [ali=(urge:clay (list @t)) bob=(urge:clay (list @t))]
  ^-  (unit (urge:clay (list @t)))
  |^
  =.  ali  (clean ali)
  =.  bob  (clean bob)
  |-  ^-  (unit (urge:clay (list @t)))
  ?~  ali  `bob
  ?~  bob  `ali
  ?-    -.i.ali
      %&
    ?-    -.i.bob
        %&
      ?:  =(p.i.ali p.i.bob)
        %+  bind  $(ali t.ali, bob t.bob)
        |=(cud=(urge:clay (list @t)) [i.ali cud])
      ?:  (gth p.i.ali p.i.bob)
        %+  bind  $(p.i.ali (sub p.i.ali p.i.bob), bob t.bob)
        |=(cud=(urge:clay (list @t)) [i.bob cud])
      %+  bind  $(ali t.ali, p.i.bob (sub p.i.bob p.i.ali))
      |=(cud=(urge:clay (list @t)) [i.ali cud])
    ::
        %|
      ?:  =(p.i.ali (lent p.i.bob))
        %+  bind  $(ali t.ali, bob t.bob)
        |=(cud=(urge:clay (list @t)) [i.bob cud])
      ?:  (gth p.i.ali (lent p.i.bob))
        %+  bind  $(p.i.ali (sub p.i.ali (lent p.i.bob)), bob t.bob)
        |=(cud=(urge:clay (list @t)) [i.bob cud])
      ~
    ==
  ::
      %|
    ?-  -.i.bob
        %|
      ?.  =(i.ali i.bob)
        ~
      %+  bind  $(ali t.ali, bob t.bob)
      |=(cud=(urge:clay (list @t)) [i.ali cud])
    ::
        %&
      ?:  =(p.i.bob (lent p.i.ali))
        %+  bind  $(ali t.ali, bob t.bob)
        |=(cud=(urge:clay (list @t)) [i.ali cud])
      ?:  (gth p.i.bob (lent p.i.ali))
        %+  bind  $(ali t.ali, p.i.bob (sub p.i.bob (lent p.i.ali)))
        |=(cud=(urge:clay (list @t)) [i.ali cud])
      ~
    ==
  ==
  ++  clean                                          ::  clean
    |=  wig=(urge:clay (list @t))
    ^-  (urge:clay (list @t))
    ?~  wig  ~
    ?~  t.wig  wig
    ?:  ?=(%& -.i.wig)
      ?:  ?=(%& -.i.t.wig)
        $(wig [[%& (add p.i.wig p.i.t.wig)] t.t.wig])
      [i.wig $(wig t.wig)]
    ?:  ?=(%| -.i.t.wig)
      $(wig [[%| (welp p.i.wig p.i.t.wig) (welp q.i.wig q.i.t.wig)] t.t.wig])
    [i.wig $(wig t.wig)]
  --
--
```

## `/mar/csv/hoon`

```hoon
/+  *csv
|_  csv=(list (list @t))
++  grab
  |%
  ++  mime  |=((pair mite octs) (de-csv q.q))
  ++  noun
    |=  n=*
    ^-  (list (list @t))
    =/  result  ((list (list @t)) n)
    ?>  (validate result)
    result
  --
++  grow
  |%
  ++  mime
    ?>  (validate csv)
    [/text/csv (as-octs:mimes:html (en-csv csv))]
  ++  noun
    ?>  (validate csv)
    csv
  --
++  grad
  |%
  ++  form  %csv-diff
  ++  diff
    |=  bob=(list (list @t))
    ^-  (urge:clay (list @t))
    ?>  (validate csv)
    ?>  (validate bob)
    (lusk:differ csv bob (loss:differ csv bob))
  ++  pact
    |=  dif=(urge:clay (list @t))
    ^-  (list (list @t))
    =/  result  (lurk:differ csv dif)
    ?>  (validate result)
    result
  ++  join
    |=  $:  ali=(urge:clay (list @t))
            bob=(urge:clay (list @t))
        ==
    ^-  (unit (urge:clay (list @t)))
    (csv-join ali bob)
  ++  mash
    |=  $:  [ship desk (urge:clay (list @t))]
            [ship desk (urge:clay (list @t))]
        ==
    ^-  (urge:clay (list @t))
    ~|(%csv-mash !!)
  --
--
```

## `/mar/csv-diff/hoon`

```hoon
|_  dif=(urge:clay (list @t))
++  grab
  |%
  ++  noun  (urge:clay (list @t))
  --
++  grow
  |%
  ++  noun  dif
  --
++  grad  %noun
--
```
