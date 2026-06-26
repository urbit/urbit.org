---
name: generators
description: Master Hoon generators including naked generators (simple values), %say generators (with arguments), and %ask generators (interactive prompts). Use when creating command-line tools, scripts, one-off computations, testing utilities, or accessing system state via scries.
user-invocable: true
disable-model-invocation: false
validated: accurate
last-updated: ~2026.2.25
---

# Generators Reference

Master Hoon generators including naked generators, %say generators, %ask generators, and their use cases. Use when creating command-line tools, scripts, one-off computations, or testing utilities.

## Overview

Generators are Hoon programs that produce a value and exit. They're simpler than Gall agents, perfect for CLI tools, data processing, and testing.

> **IMPORTANT**: Generators are pure computations. They cannot make HTTP requests, send pokes, produce Gall cards, or cause side effects. For operations requiring effects (network requests, pokes, subscriptions), use threads (spider) or Gall agents.

## Learning Objectives

1. Understand generator types and use cases
2. Write naked generators for simple tasks
3. Build %say generators with arguments
4. Create interactive %ask generators
5. Access the system with scries
6. Build testing and utility generators

## 1. Generator Types

### Naked Generator

Simplest form. Must be a gate. When called, a single argument must be provided

```hoon
::  /gen/hello.hoon
|=  *  ::  argument is ignored
'Hello, World!'
```

**Usage**: `+hello ~` (or any other argument) in dojo

```hoon
::  /gen/increment.hoon
|=  a=@
+(a)
```

**Usage**: `+increment 42`

### `%say` Generator

Takes arguments and returns a pair of a mark as a `@tas` term and a noun.
You would usually use %noun mark unless you want to change how the output is
printed.

%say generator is constructed as a pair [%say $-(args [mark *])].

The gate sample `args` must follow this structure:

```
$:                          ::  environment
  $:  now=@da             ::  timestamp
      eny=@uvJ            ::  entropy
      bec=beak            ::  clay beak
  ==
  ::                      ::  unnamed args
  $:  
      $:  arg=@           ::  required arguments
      ==
      ~
  ==
  ::                      ::  named args
  $:
      $:  named-arg=@     ::  optional arguments
      ==
      ~
  ==
==
```

When the `%say` generator is called, "required" arguments must be present, and
optional arguments can be added with `=name value` syntax. A comma separates
required args from the optional ones.

If some part of the sample is not needed, it can be stubbed out with `*`.

A %say generator that takes no arguments:

```hoon
::  /gen/no-args.hoon
:-  %say
|=  *
:-  %noun
(add 42 24)
```

To call: `+no-args`

A `%say` generator that prints current time:

```hoon
::  /gen/time.hoon
:-  %say
|=  [[now=@da eny=@uvJ bec=beak] ~ ~]
:-  %noun
now
```

To call: `+time`

A `%say` generator that takes two arguments and adds them:

```hoon
::  /gen/add.hoon
:-  %say
|=  [* [a=@ b=@ ~] ~]
:-  %noun
(add a b)
```

To call: `+add 1 2`

Notice that the arguments must be separate:

`+add [1 2] -> error (we passed one argument [1 2] instead of two separate args)`

A `%say` that takes two arguments and adds them with an optional offset:

```hoon
::  /gen/add-offset.hoon
:-  %say
|=  [* [a=@ b=@ ~] [off=@ ~]]
:-  %noun
:(add a b off)
```

To call:

```
> +add-offset 1 2
3
> +add-offset 1 2, =off 2
5
```

In the absence of the optional argument it is set to the default value of the type.

### `%ask` Generator

`%ask` generators are interactive state machines in Dojo. You wouldn't want to
make them unless you know what you are doing and want to make an interactive
tool in Dojo. Refer to hoon/generators in documentation if necessary.

## 2. Naked Generators

### Basic Example

```hoon
::  /gen/add-two.hoon
::
::  Simple computation (naked generators have no bowl access)
::
|=  *
(add 2 2)
```

> **Note**: Naked generators do not have access to the bowl (no `now`, `eny`, `bec`). They can only perform pure computations or scries. Use a `%say` generator if you need system data like the current time.

### With Computation

```hoon
::  /gen/fibonacci.hoon
::
|=  *
::  Generate first 10 Fibonacci numbers
::
=/  count  10
=/  a  0
=/  b  1
=/  result  *(list @ud)
|-
?:  =(count 0)
  (flop result)
=/  next  (add a b)
$(count (dec count), a b, b next, result [a result])
```

### Using Scries

```hoon
::  /gen/list-apps.hoon
::
::  List all Gall apps
::
|=  *
.^(arch %cy /===/app)
```

## 3. %say Generators

### Structure

```hoon
:-  %say
|=  $:  [now=@da eny=@uvJ bec=beak]
        [required-args ~]
        [optional-args ~]
    ==
:-  %output-mark
computation
```

### Components

- `now`: Current time
- `eny`: Entropy (randomness)
- `bec`: Beak (ship, desk, case)
- `required-args`: Unnamed required arguments
- `optional-args`: Named optional arguments
- `output-mark`: Type of output (%noun, %json, %txt, etc.)

### Examples

#### Simple Args

```hoon
::  /gen/greet.hoon
::
::  Greet a person
::
:-  %say
|=  [[now=@da eny=@uvJ bec=beak] [name=@t ~] ~]
:-  %noun
^-  cord
(cat 3 'Hello, ' name)
```

**Usage**: `+greet 'Alice'` → `'Hello, Alice'`

#### Multiple Required Args

```hoon
::  /gen/multiply.hoon
:-  %say
|=  [[now=@da eny=@uvJ bec=beak] [a=@ud b=@ud ~] ~]
:-  %noun
(mul a b)
```

**Usage**: `+multiply 5 10` → `50`

#### Optional Args

Optional arguments use bunt (default) values, not units. When the user omits an optional argument, it receives its type's default value (e.g., `0` for `@ud`, `''` for `@t`).

```hoon
::  /gen/power.hoon
:-  %say
|=  $:  [now=@da eny=@uvJ bec=beak]
        [base=@ud ~]
        [exp=_2 ~]  ::  exp defaults to 2 (bunt of _2) when omitted
    ==
:-  %noun
(pow base exp)
```

**Usage**:
- `+power 5` → `25` (exp defaults to bunt 0, treated as 2)
- `+power 5, =exp 3` → `125`

> **Note**: Optional args are NOT units. Do not use the `?~(exp default u.exp)` pattern -- `exp` is a bare `@ud`, not a `(unit @ud)`. The third tuple in the `%say` gate sample holds optional arguments that receive their type's bunt value when omitted.

#### Using System Data

```hoon
::  /gen/ship-info.hoon
:-  %say
|=  [[now=@da eny=@uvJ bec=beak] ~ ~]
:-  %noun
:*  our=p.bec
    desk=q.bec
    time=now
    random=eny
==
```

### Output Marks

(you should just use %noun unless you know what you are doing)

```hoon
::  JSON output
:-  %say
|=  [[now=@da eny=@uvJ bec=beak] [data=@t ~] ~]
:-  %json
%-  pairs:enjs:format
~[['data' s+data] ['timestamp' (sect:enjs:format now)]]

::  Text output
:-  %say
|=  [[now=@da eny=@uvJ bec=beak] ~ ~]
:-  %txt
:~  'Current time: '
    (scot %da now)
==
```

## Resources

- [Generator Guide](https://developers.urbit.org/guides/core/hoon-school/K-doors) - Generators tutorial
- [Generator Examples](https://github.com/urbit/urbit/tree/master/pkg/arvo/gen) - Built-in generators
- [Dojo Guide](https://developers.urbit.org/guides/core/environment#dojo) - Using generators

## Summary

Generators:
1. **Naked** - Simple computations, exactly one argument
2. **%say** - Arguments, system context
3. **%ask** - Interactive input prompts, rarely used
4. **Use cases** - CLI tools, testing, data processing, utilities
5. **Best practices** - Document, validate, handle errors
6. **System access** - Scries, random numbers, timestamps

Generators are perfect for one-off computations, testing utilities, and command-line tools in Urbit.
