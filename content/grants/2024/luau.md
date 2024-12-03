+++

title = "Luau"
date = "2024-03-11"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Core" ]

[extra]
image = ""
description = "Urbit Lua"
reward = "25 stars"
assignee = ["~racfer-hattes"]
champion = ["~rovnys-ricfer"]
grant_id = "B0369"
completed = false
canceled = true

+++

## Rationale
Lua is a language designed to be embedded into other systems. It should be feasible to embed Lua into Urbit, by writing a Lua interpreter in Hoon. Lua is a friendly, familiar language: it's dynamically typed and imperative, its syntax is similar to Python's, it has native support for "tables", which are similar to JavaScript objects and Python dictionaries, and it has a small, tight spec. Unlike a lot of existing languages, Lua should be embeddable into Urbit without any modifications to the spec at all -- Urbit won't run some subset of Lua, but true Lua.

For performance, the Lua interpreter could be jetted in various ways. Perhaps an existing Lua interpreter, such as LuaJIT, could be used. Alternatively, a custom interpreter could be written in the runtime. Since we likely want to be able to efficiently run Lua code that calls into Hoon code through Lua's FFI facilities, we might want the jet for the Lua interpreter to be able to call back into the Nock interpreter, suggesting a tight integration with a custom interpreter, rather than an off-the-shelf interpreter -- other approaches might also be viable, though.

## Technical Details
Below is the beginning of a representation of a Lua interpreter state:

```
|%
+$  lval
  $~  [[%nil ~] meta=~]
  $:  $%  [%nil ~]
          [%boolean p=?]
          [%number p=number]
          [%string p=@t]
          [%function p=func]
          [%userdata p=userdata]
          [%thread p=thread]
          [%table p=table]
          [%ref weak=? p=@ud]  ::  reference to other lua value
      ==
      meta=(unit table)
  ==
+$  table  (map lval lval)
+$  env
  $:  vars=(map @ud lval)
      next=@ud
  ==
+$  number  ::  hard-coded to 64-bit Lua
  $%  [%integer p=@udF]
      [%float p=@rd]
  ==
+$  func
  $%  [%internal p=lfun]  ::  native lua function
      [%external p=vase]  ::  ffi into hoon
  ==
+$  lfun  ::  native lua function
  _!!  ::  TODO
+$  userdata  vase  ::  opaque host data
+$  thread  ::  coroutine
  _!!  ::  TODO
--
```

## FFI and Lua `userdata`
Lua lets its runtime "register" functions that are callable by user code. The Hoon interpreter could register Hoon standard library functions this way. A userspace Urbit app could potentially also register some of its own helper functions into its own Luau variant to allow people to use Lua to script the app.

Lua has a concept of "userdata", i.e. values supplied by the (usually C) code that runs the Lua interpreter that Lua programs can manipulate in various ways. There are two different kinds of userdata, "light" and "full". "Light" userdata is used by Lua runtimes to expose C pointers to Lua code, which is unlikely to be useful for Urbit since Luau code will be run by Nock, which never sees pointers.

"Full" userdata does not expose any operations to Lua code, other than being able to pass it into FFI functions. Luau could expose access to nouns as full userdata, which could be passed into and returned from Hoon gates registered as callable Lua functions.

We will likely also want to expose some functions to Lua code to convert between Hoon and Lua types. These will be written in Hoon and then registered with the interpreter.

We could have `Urbit.noun` and `Urbit.vase` metatables for untyped and typed Urbit nouns that are passed around as userdata, depending on whether we want Lua code to be able to call into Hoon in a statically typed or dynamically typed manner, respectively. We might very well want to support both.

For supporting imperative interpretation, we could have something like an `Urbit.strand` metatable to expose `%spider` "thread"s. This could expose Hoon functions from `lib/strandio` as imperative, effectful functions that can be called from Lua, to implement a syscall-like interface.

## Milestones
This project can be broken into the following milestones:

1. (2 Stars) Implement a parser in Hoon from Lua source code to an AST data structure.
2. (4 Stars) Implement most of the Lua specification in a Hoon interpreter, omitting only 'threads' (coroutines) and garbage collection. Built-in printing routines should trigger Nock hint-based printing (`slog`s).
3. (3 Stars) Implement Lua coroutines.
4. (1 Star) Support registering functions and userdata from Hoon to expose them to Lua using Lua's FFI and `userdata` features.
5. (2 Stars) Give interpreted Lua code access to the Hoon standard library using the registration feature. Note that this grant does not include implementing the Lua standard library, but that could be addressed in a later grant if there's enough demand for it.
6. (2 Stars) Write a basic garbage collector for Lua, in Hoon. Add support for `garbagecollect()`, `__del` destructors, and weak tables.
7. (2 Stars) Add Urbit versions of Lua's `loadstring`, `loadfile`, and `require` features. `loadfile` should read from the Urbit namespace.
8. (2 Stars) Investigate imperative interpretation, i.e. allowing Lua code to call FFI functions that trigger the Hoon Lua interpreter to pause the Lua code, emit an effect, wait to be activated again with the response, then inject the response into the Lua code and resume execution. An application of this would use `%spider` threads to give Lua code access to Urbit's `strandio` effectful helper routines. There could be productive integrations between Lua's coroutines and `%spider`'s API for trie's of threads.
9. (3 Stars) Write a LIA-style jettable wrapper for Luau.
10. (4 Stars) Experiment with jetting parts of the interpreter, or the whole interpreter. The star rewards for full jetting will be decided after these initial experiments.
