|%
+$  action
  $%  [%increase-counter step=@ud]
      [%poke-remote target=ship]
      [%poke-self target=ship]
      [%subscribe host=ship]
      [%leave host=ship]
      [%kick paths=(list path) subscriber=ship]
      [%bad-path host=ship]
  ==
--
