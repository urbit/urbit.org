+++
title = "Troubleshooting"
weight = 5
template = "doc.html"
+++

### Changes to JS code aren't registering in the browser?
* make sure you are watching the directory
* make sure you did `|commit %home` (the )
* use `Cmd-Shift-R` (Mac) or `Ctrl-Shift-R` (PC/Linux) in Chrome/Brave to force a reload. Safari uses `Cmd-Option-R`.

* Gall keeps running an old version of my app!
  - if there's a compile error, it will run an old version until a new version successfully compiles. 
  - Gall will **not** throw the same compile error twice in a row. This can be confusing if you don't get an error message, but still see that you're running the same version

### Helper Core Note
If you have a helper core, you'll generally declare it inside your agent like so:
```hoon
+*  hc    ~(. +> bowl)
```
If you have an arm inside the helper core like `+write-file`, remember to access it inside your agent as `+write-file:hc`, and not just `+write-file`. Your agent *would* find the `+write-file` arm in the subject, but it wouldn't have its sample set to the current `bowl`--it would just have the default `bowl` sample. This can cause some weird errors and unexpected behavior.

If you are referring to a helper core arm *from another helper core arm*, then the `bowl` sample will already be replaced, and so you should just refer to `+write-arm` (or whatever the arm's name is).

### scry errors
```
scry failed for
ford: %hood failed for /~zod/home/0/app/...
```
Solution: run `|commit %home`

### mint-lost: Handle All State Cases
Usually caused by adding a new state, but not having a `?-` case to handle it.

### Reloading an App
As soon as you execute `|start %yourapp`, **the app is started forever.**  It doesn't matter whether it had errors upon loading. The only way to "remove" an app and have Gall stop monitoring it is to create a new ship and load the code in there.

### My App Compiled, but then I Got an Error Right After
Most likely you changed your state variable's structure without giving an `+on-load` transition.  If this is a development app, just delete your ship and set it up again. If not, then write the proper transition in `+on-load`.

### I Don't See an Error, but My App Doesn't Work

#### Doesn't Throw Same Error Twice
Once Gall throws an error in compilation, it won't throw the same error again.  This means that even if your app still has problems, you won't see an error after '|commit'.

Because of this, I usually leave an `+on-load` print debug in while developing. If I see the 'on-load' message print, it means that my app compiled successfully. If not, it means that I need to keep debugging the prior error.

#### Needs to Reload a Dependency
Sometimes dependencies, like a recently updated types file in `/sur`, don't get recognized. In these cases, just run `:goad %force`, and the dependencies will reload, throwing any new errors that may arise.

