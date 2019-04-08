/=  essays-list
  /:  /===/web/posts/essays
  /^  (map @ta (map knot cord))
  /_  /front/
/=  media-list
  /:  /===/web/posts/media
  /^  (map @ta (map knot cord))
  /_  /front/
/=  update-list
  /:  /===/web/posts/updates
  /^  (map @ta (map knot cord))
  /_  /front/
|%
++  item  $:  tag=@ta
              file=@ta
              front=(map knot cord)
          ==
--
=/  new-list/(list item)
;:  welp  %+  turn
            ~(tap by essays-list)
          |=  [fil=@ta fro=(map knot cord)]
          [tag='essays' file=fil front=fro]
          %+  turn
            ~(tap by media-list)
          |=  [fil=@ta fro=(map knot cord)]
          [tag='media' file=fil front=fro]
          %+  turn
            ~(tap by update-list)
          |=  [fil=@ta fro=(map knot cord)]
          [tag='updates' file=fil front=fro]
    ==
^-  manx
;div.posts.col-sm-10
  ;h1: Posts
  ;*  %+  turn
        %+  sort
          new-list
        |=  [b=item c=item]
        %+  gth
          %-  unt:chrono:userlib
          %+  slav
            %da
          (fall (~(get by front.b) %date) (scot %da *@da))
        %-  unt:chrono:userlib
          %+  slav
            %da
        (fall (~(get by front.c) %date) (scot %da *@da))
      |=  ite/item
      =/  title  (fall (~(get by front.ite) %title) '')
      =/  date  (fall (~(get by front.ite) %date) '')
      =/  prev  (fall (~(get by front.ite) %preview) '')
      ;div.mb-8
        ;span.h4.mt-0.mb-0.text-mono.text-500.gray-light: {(trip date)}
        ;span.h4.h-font.text-600.ml-4: {(trip tag.ite)}
        ;a/"/posts/{(trip tag.ite)}/{(trip file.ite)}"
          ;h2.mt-1: {(trip title)}
        ==
        ;p.mt-2: {(trip prev)}
      ==
==
