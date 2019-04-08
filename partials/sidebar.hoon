:: Getting Started 
/=  get-started-list
  /;  |=  $=  a
    $:
    (map knot cord)
    %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
    ~
  ==
  a
  /:  /===/web/docs/getting-started
  /^  $:
    (map knot cord)
    %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
    ~
  ==
  /.  /front/
  /^  %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
  /_
    /^  $:
      (map knot cord)
      (map knot [(map knot cord) (map knot (map knot cord)) ~])
      ~
    ==
    /.  /front/
      /^  (map knot [(map knot cord) (map knot (map knot cord)) ~])
      /_
      /^  [(map knot cord) (map knot (map knot cord)) ~]
      /.
        /front/
      /_  /front/
      ==
    ==
  ==
:: Using
/=  use-list
  /;  |=  $=  a
    $:
    (map knot cord)
    %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
    ~
  ==
  a
  /:  /===/web/docs/using
  /^  $:
    (map knot cord)
    %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
    ~
  ==
  /.  /front/
  /^  %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
  /_
    /^  $:
      (map knot cord)
      (map knot [(map knot cord) (map knot (map knot cord)) ~])
      ~
    ==
    /.  /front/
      /^  (map knot [(map knot cord) (map knot (map knot cord)) ~])
      /_
      /^  [(map knot cord) (map knot (map knot cord)) ~]
      /.
        /front/
      /_  /front/
      ==
    ==
  ==
:: Concepts 
/=  concept-list
  /;  |=  $=  a
    $:
    (map knot cord)
    %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
    ~
  ==
  a
  /:  /===/web/docs/concepts
  /^  $:
    (map knot cord)
    %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
    ~
  ==
  /.  /front/
  /^  %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
  /_
    /^  $:
      (map knot cord)
      (map knot [(map knot cord) (map knot (map knot cord)) ~])
      ~
    ==
    /.  /front/
      /^  (map knot [(map knot cord) (map knot (map knot cord)) ~])
      /_
      /^  [(map knot cord) (map knot (map knot cord)) ~]
      /.
        /front/
      /_  /front/
      ==
    ==
  ==
:: Learn
/=  learn-list
  /;  |=  $=  a
    $:
    (map knot cord)
    %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
    ~
  ==
  a
  /:  /===/web/docs/learn
  /^  $:
    (map knot cord)
    %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
    ~
  ==
  /.  /front/
  /^  %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
  /_
    /^  $:
      (map knot cord)
      (map knot [(map knot cord) (map knot (map knot cord)) ~])
      ~
    ==
    /.  /front/
      /^  (map knot [(map knot cord) (map knot (map knot cord)) ~])
      /_
      /^  [(map knot cord) (map knot (map knot cord)) ~]
      /.
        /front/
      /_  /front/
      ==
    ==
  ==
:: Reference
/=  ref-list
  /;  |=  $=  a
    $:
    (map knot cord)
    %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
    ~
  ==
  a
  /:  /===/web/docs/reference
  /^  $:
    (map knot cord)
    %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
    ~
  ==
  /.  /front/
  /^  %+  map  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
  /_
    /^  $:
      (map knot cord)
      (map knot [(map knot cord) (map knot (map knot cord)) ~])
      ~
    ==
    /.  /front/
      /^  (map knot [(map knot cord) (map knot (map knot cord)) ~])
      /_
      /^  [(map knot cord) (map knot (map knot cord)) ~]
      /.
        /front/
      /_  /front/
      ==
    ==
  ==
^-  manx
;ol.list-reset.h-font.mt-6
:: section: Getting Started
  ;li.mb-4
    ;a.h-font.text-600(href "/docs/getting-started"): Getting Started
    ;ol.list-reset.h-font
  ;*  %+  turn
      %+  sort
      ~(tap by -.+.get-started-list)
      |=  $:  $=  a
      %+  pair  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
      $=  b
      %+  pair  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
      ==
      =/  sort-a  (slav %ud (fall (~(get by -.q.a) %sort) '100.000'))
      =/  sort-b  (slav %ud (fall (~(get by -.q.b) %sort) '100.000'))
      (lth sort-a sort-b)
    |=  $=  a
    %+  pair  knot
    $:
      (map knot cord)
      (map knot [(map knot cord) (map knot (map knot cord)) ~])
      ~
    ==
    =/  title  (~(get by -.q.a) %title)
    =/  parent  p.a
    =/  one
      ;ol.list-reset.h-font
        ;*
        %+  turn
        %+  sort  ~(tap by -.+.q.a)
        |=  $:  $=  a
        %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
          $=  b
        %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
        ==
        =/  sort-a  (slav %ud (fall (~(get by -.q.a) %sort) '100.000'))
        =/  sort-b  (slav %ud (fall (~(get by -.q.b) %sort) '100.000'))
        (lth sort-a sort-b)
          |=  $=  b
          %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
          =/  oneparen  p.b
          =/  onetitle  (~(get by -.q.b) %title)
          =/  two
            ;ol.list-reset.h-font
            ;*
              %+  turn
              %+  sort  ~(tap by -.+.q.b)
              |=  $:  $=  a  (pair knot (map knot cord))
                $=  b  (pair knot (map knot cord))
              ==
              =/  sort-a  (slav %ud (fall (~(get by q.a) %sort) '100.000'))
              =/  sort-b  (slav %ud (fall (~(get by q.b) %sort) '100.000'))
              (lth sort-a sort-b)

            |=  $=  c  (pair knot (map knot cord))
            =/  twoparen  p.c
            =/  sectitle  (fall (~(get by q.c) %title) '')
            ;li
              ;a.h-font(href "/docs/getting-started/{(trip parent)}/{(trip oneparen)}/{(trip twoparen)}"): {(trip sectitle)}
            ==
            ==
          ?~  onetitle
          ;li;
          ;li
            ;a.h-font(href "/docs/getting-started/{(trip parent)}/{(trip oneparen)}"): {(trip (need onetitle))}
            ;+  two
          ==
        ==
    ;li
      ;a.h-font(href "/docs/getting-started/{(trip parent)}"): {(trip (need title))}
      ;+  one
    ==
  ==
  ==
:: section: Using
  ;li.mb-4
    ;a.h-font.text-600(href "/docs/using"): Using
    ;ol.list-reset.h-font
  ;*  %+  turn
      %+  sort
      ~(tap by -.+.use-list)
      |=  $:  $=  a
      %+  pair  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
      $=  b
      %+  pair  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
      ==
      =/  sort-a  (slav %ud (fall (~(get by -.q.a) %sort) '100.000'))
      =/  sort-b  (slav %ud (fall (~(get by -.q.b) %sort) '100.000'))
      (lth sort-a sort-b)
    |=  $=  a
    %+  pair  knot
    $:
      (map knot cord)
      (map knot [(map knot cord) (map knot (map knot cord)) ~])
      ~
    ==
    =/  title  (~(get by -.q.a) %title)
    =/  parent  p.a
    =/  one
      ;ol.list-reset.h-font
        ;*
        %+  turn
        %+  sort  ~(tap by -.+.q.a)
        |=  $:  $=  a
        %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
          $=  b
        %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
        ==
        =/  sort-a  (slav %ud (fall (~(get by -.q.a) %sort) '100.000'))
        =/  sort-b  (slav %ud (fall (~(get by -.q.b) %sort) '100.000'))
        (lth sort-a sort-b)
          |=  $=  b
          %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
          =/  oneparen  p.b
          =/  onetitle  (~(get by -.q.b) %title)
          =/  two
            ;ol.list-reset.h-font
            ;*
              %+  turn
              %+  sort  ~(tap by -.+.q.b)
              |=  $:  $=  a  (pair knot (map knot cord))
                $=  b  (pair knot (map knot cord))
              ==
              =/  sort-a  (slav %ud (fall (~(get by q.a) %sort) '100.000'))
              =/  sort-b  (slav %ud (fall (~(get by q.b) %sort) '100.000'))
              (lth sort-a sort-b)

            |=  $=  c  (pair knot (map knot cord))
            =/  twoparen  p.c
            =/  sectitle  (fall (~(get by q.c) %title) '')
            ;li
              ;a.h-font(href "/docs/using/{(trip parent)}/{(trip oneparen)}/{(trip twoparen)}"): {(trip sectitle)}
            ==
            ==
          ?~  onetitle
          ;li;
          ;li
            ;a.h-font(href "/docs/using/{(trip parent)}/{(trip oneparen)}"): {(trip (need onetitle))}
            ;+  two
          ==
        ==
    ;li
      ;a.h-font(href "/docs/using/{(trip parent)}"): {(trip (need title))}
      ;+  one
    ==
  ==
  ==
  :: Section: Concepts
  ;li.mb-4
    ;a.h-font.text-600(href "/docs/concepts"): Concepts
  ;ol
    ;*  %+  turn
        %+  sort
        ~(tap by -.+.concept-list)
        |=  $:  $=  a
        %+  pair  knot
        $:
          (map knot cord)
          (map knot [(map knot cord) (map knot (map knot cord)) ~])
          ~
        ==
        $=  b
        %+  pair  knot
        $:
          (map knot cord)
          (map knot [(map knot cord) (map knot (map knot cord)) ~])
          ~
        ==
        ==
        =/  sort-a  (slav %ud (fall (~(get by -.q.a) %sort) '100.000'))
        =/  sort-b  (slav %ud (fall (~(get by -.q.b) %sort) '100.000'))
        (lth sort-a sort-b)
      |=  $=  a
      %+  pair  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
      =/  title  (~(get by -.q.a) %title)
      =/  parent  p.a
      =/  one
        ;ol.list-reset.h-font
          ;*
          %+  turn
          %+  sort  ~(tap by -.+.q.a)
          |=  $:  $=  a
          %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
            $=  b
          %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
          ==
          =/  sort-a  (slav %ud (fall (~(get by -.q.a) %sort) '100.000'))
          =/  sort-b  (slav %ud (fall (~(get by -.q.b) %sort) '100.000'))
          (lth sort-a sort-b)
            |=  $=  b
            %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
            =/  oneparen  p.b
            =/  onetitle  (~(get by -.q.b) %title)
            =/  two
              ;ol.list-reset.h-font
              ;*
                %+  turn
                %+  sort  ~(tap by -.+.q.b)
                |=  $:  $=  a  (pair knot (map knot cord))
                  $=  b  (pair knot (map knot cord))
                ==
                =/  sort-a  (slav %ud (fall (~(get by q.a) %sort) '100.000'))
                =/  sort-b  (slav %ud (fall (~(get by q.b) %sort) '100.000'))
                (lth sort-a sort-b)

              |=  $=  c  (pair knot (map knot cord))
              =/  twoparen  p.c
              =/  sectitle  (fall (~(get by q.c) %title) '')
              ;li
                ;a.h-font(href "/docs/concepts/{(trip parent)}/{(trip oneparen)}/{(trip twoparen)}"): {(trip sectitle)}
              ==
              ==
            ?~  onetitle
            ;li;
            ;li
              ;a.h-font(href "/docs/concepts/{(trip parent)}/{(trip oneparen)}"): {(trip (need onetitle))}
              ;+  two
            ==
          ==
      ;li
        ;a.h-font(href "/docs/concepts/{(trip parent)}"): {(trip (need title))}
        ;+  one
      ==
    ==
  ==
:: Section: Learn
;li.mb-4
  ;a.h-font.text-600(href "/docs/learn"): Learn
  ;ol.list-reset.h-font
  ;*  %+  turn
      %+  sort
      ~(tap by -.+.learn-list)
      |=  $:  $=  a
      %+  pair  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
      $=  b
      %+  pair  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
      ==
      =/  sort-a  (slav %ud (fall (~(get by -.q.a) %sort) '100.000'))
      =/  sort-b  (slav %ud (fall (~(get by -.q.b) %sort) '100.000'))
      (lth sort-a sort-b)
    |=  $=  a
    %+  pair  knot
    $:
      (map knot cord)
      (map knot [(map knot cord) (map knot (map knot cord)) ~])
      ~
    ==
    =/  title  (~(get by -.q.a) %title)
    =/  parent  p.a
    =/  one
      ;ol.list-reset.h-font
        ;*
        %+  turn
        %+  sort  ~(tap by -.+.q.a)
        |=  $:  $=  a
        %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
          $=  b
        %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
        ==
        =/  sort-a  (slav %ud (fall (~(get by -.q.a) %sort) '100.000'))
        =/  sort-b  (slav %ud (fall (~(get by -.q.b) %sort) '100.000'))
        (lth sort-a sort-b)
          |=  $=  b
          %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
          =/  oneparen  p.b
          =/  onetitle  (~(get by -.q.b) %title)
          =/  two
            ;ol.list-reset.h-font
            ;*
              %+  turn
              %+  sort  ~(tap by -.+.q.b)
              |=  $:  $=  a  (pair knot (map knot cord))
                $=  b  (pair knot (map knot cord))
              ==
              =/  sort-a  (slav %ud (fall (~(get by q.a) %sort) '100.000'))
              =/  sort-b  (slav %ud (fall (~(get by q.b) %sort) '100.000'))
              (lth sort-a sort-b)

            |=  $=  c  (pair knot (map knot cord))
            =/  twoparen  p.c
            =/  sectitle  (fall (~(get by q.c) %title) '')
            ;li
              ;a.h-font(href "/docs/learn/{(trip parent)}/{(trip oneparen)}/{(trip twoparen)}"): {(trip sectitle)}
            ==
            ==
          ?~  onetitle
          ;li;
          ;li
            ;a.h-font(href "/docs/learn/{(trip parent)}/{(trip oneparen)}"): {(trip (need onetitle))}
            ;+  two
          ==
        ==
    ;li
      ;a.h-font(href "/docs/learn/{(trip parent)}"): {(trip (need title))}
      ;+  one
    ==
  ==
==
:: Section: Reference
;li.mb-4
  ;a.h-font.text-600(href "/docs/reference"): Reference
  ;ol.list-reset.h-font
  ;*  %+  turn
      %+  sort
      ~(tap by -.+.ref-list)
      |=  $:  $=  a
      %+  pair  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
      $=  b
      %+  pair  knot
      $:
        (map knot cord)
        (map knot [(map knot cord) (map knot (map knot cord)) ~])
        ~
      ==
      ==
      =/  sort-a  (slav %ud (fall (~(get by -.q.a) %sort) '100.000'))
      =/  sort-b  (slav %ud (fall (~(get by -.q.b) %sort) '100.000'))
      (lth sort-a sort-b)
    |=  $=  a
    %+  pair  knot
    $:
      (map knot cord)
      (map knot [(map knot cord) (map knot (map knot cord)) ~])
      ~
    ==
    =/  title  (~(get by -.q.a) %title)
    =/  parent  p.a
    =/  one
      ;ol.list-reset.h-font
        ;*
        %+  turn
        %+  sort  ~(tap by -.+.q.a)
        |=  $:  $=  a
        %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
          $=  b
        %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
        ==
        =/  sort-a  (slav %ud (fall (~(get by -.q.a) %sort) '100.000'))
        =/  sort-b  (slav %ud (fall (~(get by -.q.b) %sort) '100.000'))
        (lth sort-a sort-b)
          |=  $=  b
          %+  pair  knot  [(map knot cord) (map knot (map knot cord)) ~]
          =/  oneparen  p.b
          =/  onetitle  (~(get by -.q.b) %title)
          =/  two
            ;ol.list-reset.h-font
            ;*
              %+  turn
              %+  sort  ~(tap by -.+.q.b)
              |=  $:  $=  a  (pair knot (map knot cord))
                $=  b  (pair knot (map knot cord))
              ==
              =/  sort-a  (slav %ud (fall (~(get by q.a) %sort) '100.000'))
              =/  sort-b  (slav %ud (fall (~(get by q.b) %sort) '100.000'))
              (lth sort-a sort-b)

            |=  $=  c  (pair knot (map knot cord))
            =/  twoparen  p.c
            =/  sectitle  (fall (~(get by q.c) %title) '')
            ;li
              ;a.h-font(href "/docs/reference/{(trip parent)}/{(trip oneparen)}/{(trip twoparen)}"): {(trip sectitle)}
            ==
            ==
          ?~  onetitle
          ;li;
          ;li
            ;a.h-font(href "/docs/reference/{(trip parent)}/{(trip oneparen)}"): {(trip (need onetitle))}
            ;+  two
          ==
        ==
    ;li
      ;a.h-font(href "/docs/reference/{(trip parent)}"): {(trip (fall title ''))}
      ;+  one
    ==
  ==
==
==
