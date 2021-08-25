+++
title = "Ford: Imports, Files, and Marks"
weight = 4
template = "doc.html"
+++

For nearly all Gall apps, you'll want to use some outside libraries, your own
types, and static resources (like HTML and image files). To do this, you need to
use Arvo's Ford build system, which Gall automatically calls for you whenever it
sees certain runes in your app files. Ford is part of
[Clay](@/docs/arvo/clay/overview), Arvo's filesystem vane.

There are four Ford runes, and you'll see some of them at the top of nearly all
Gall apps. They must always be given in the following order:
1. `/-`: import type files from the `/sur` directory
2. `/+`: import code libraries from the `/lib` directory
3. `/=`: import the result of building a hoon file from a user-specified path
4. `/*`: import a file and apply a mark to it

In addition to those runes, Ford has the concept of a `mark`, which is like a
filetype that you can control and extend yourself to both work with existing
data and create your own filetypes.

In this lesson, you'll learn how to include types and libraries, work with and
create marks, and import files for use in your program.

Note: these Ford (`/`) runes only work in Hoon files evaluated in Gall apps and
generators. They will not work in the dojo.

## Example Code
* to `/app/`
  - [fordexample.hoon](https://github.com/timlucmiptev/gall-guide/blob/master/example-code/app/fordexample.hoon)
* to `/app/fordexample/`
  - [example.html](https://github.com/timlucmiptev/gall-guide/blob/master/example-code/app/fordexample/example.html)
* to `/mar/fordexample/`
  - [name.hoon](https://github.com/timlucmiptev/gall-guide/blob/master/example-code/example-code/mar/fordexample/name.hoon)
* to `/sur/`
  - [fordexample.hoon](https://github.com/timlucmiptev/gall-guide/blob/master/example-code/sur/fordexample.hoon)
  - [fordexample2.hoon](https://github.com/timlucmiptev/gall-guide/blob/master/example-code/sur/fordexample2.hoon)

Now go ahead and run `|commit %home`. You should see a message that `fordexample
initialized successfully`.

## `/-` Import Types
Our code starts with:
```hoon
/-   *fordexample2, fordex=fordexample
```
The `/-` rune looks up files in the `sur` directory with a name and `.hoon`
extension, and then binds them in the current subject to the name passed. In
that sense, it's similar to defining faces in the dojo.

The syntax `fordex=fordexample` tells Ford to find the file `fordexample.hoon`
in `sur` and assign its contents to the face `fordex`. To access its `name` arm
in line 16, we need to use the syntax `name:fordex` (evaluate `name` with
`fordex` as the subject).

The syntax `*fordexample2*` tells Ford to find the file `fordexample2.hoon` in
`sur` and put it into the current subject. Essentially this means that it's not
"namespaced": we can access the `age` arm from its core directly, as we do in
line 16.

`sur` is used for data structures that are shared between apps.

## `/+` Import Libraries
This works in exactly the same way as `/-`, with the difference that it looks in
the `lib` directory. This lets us import existing and user-created libraries.

`*server` is a really common import, because it handles all HTTP response
functionality for returning results to requests. It's generally imported with
`*` to expose everything, since it's so widely used. It's also sometimes given
the face `srv`.

We've seen `default-agent` a lot already. It just gets used once, on line 27.

## `/=` Import the Evaluation of a Hoon File
In line 4, we use `/=`. The `/=` rune imports the result of building a hoon file
from a user-specified path (the second argument, `/lib/number-to-words`),
wrapping it in a face specified by the first argument (`n2w`). The final `/hoon`
at the end of the path must be omitted. This is similar to `/+` and `/-`, but just
allows us to import from any directory.

Run `:fordexample %evaluate-hoon-example`, and you'll see how we now have access
to the `+to-words` arm in `number-to-words`.

## Marks
Marks constitute Arvo's notion of file types, which define a type system for the Clay
filesystem as well as revision control operations such as diff and merge. They
exist only for Clay/Ford and processes that use Ford (like Gall), and are
defined in the `mar` directory.

Marks have two primary use cases:
1. Importing files with Ford
2. Sending data to Gall apps

We'll work with files in this lesson, and then once we get to
[poke](/docs/userspace/gall/guide/poke) and [JSON &
channels](/docs/userspace/gall/guide/chanel), we'll see how marks help us for
the data-sending use case.

### Example 1: Two Ways to Open an HTML File
Lines 6-7 of `fordexample.hoon`:
```
/*  html-as-html  %html  /app/fordexample/example/html
/*  html-as-mime  %mime  /app/fordexample/example/html
```

We'll learn exactly how this syntax works later in this lesson. For now, focus
on the `%html` and `%mime` parts. These are marks, and they are both run on the
file `example.html` (Urbit imports the file extension as a `/`).

The arguments to `/*`:
* a face name (`html-as-html` and `html-as-mime`)
* a mark to use (`%html` or `%mime`)
* a file to open

#### How the Mark Works
Open the file `/mar/html.hoon`, and you'll see that it has the code:
```hoon
=,  html
|_  htm=@t
++  grow                                                ::  convert to
  ^?
  |%                                                    ::
  ++  mime  [/text/html (met 3 htm) htm]                ::  to %mime
  ++  hymn  (need (de-xml htm))                         ::  to %hymn
  --                                                    ::
++  grab  ^?
          |%                                            ::  convert from
          ++  noun  @t                                  ::  clam from %noun
          ++  mime  |=([p=mite q=octs] q.q)             ::  retrieve form %mime
          --
++  grad  %mime
--
```
* the `+grow` arms give ways to go from html to other marks
* the `+grab` arms give ways to go from other marks to html
* the `+grad` arms defines revision control operations. Here the term `%mime`
  tells Clay to use the `mime` mark's definition of `+grad`.

`/*` looks first for a `+grow` arm from original mark -> new mark. If that is not
present, it looks for a `+grab` arm from in new mark, that can grab from the
original one.

`/*` starts by using the file extension as a mark, so line 6 loads as `%html`
already, and the mark is redundant.

In line 7, it loads the file using the mark of its extension (`%html` here). It
then looks for a `+grow` arm from `html` to `mime`, and finds it in
`/mar/html.hoon` above.

#### Checking the Results of Our Marks
In the dojo, run `:fordexample %mark-example`. You should see printed:

TODO: why does the HTML print out as a raw noun?
```
>>  '<html><head><title>Ford HTML Example</title></head></html>\0a'
>>  [[%text %html ~] 59 '<html><head><title>Ford HTML Example</title></head></html>\0a']
```
The first is the result of our `html` mark and the second is our `mime` mark.

### Using a Custom Mark
We have a custom mark in `/mar/fordexample/name.hoon`, and it gets used in line 9:
```
/*  html-as-name  %fordexample-name  /app/fordexample/example/html
```
There is no `+grow` arm from `html` to our custom mark, since `/mar/html.hoon`
had no way to know that we'd make this new mark. So we need to see whether our
new mark supplies a `+grab` arm.

The `-` in the mark means "directory", i.e. `/mar/fordexample/name.hoon`. If we
look at that file, we see it has a `+grab` from `noun`, and one from `html`. We
use the `%html` mark.

To test this, run `:fordexample %custom-mark-example` in the dojo, and you'll see:
```
>>  [first='HTML' last='<html><head><title>Ford HTML Example</title></head></html>\0a']
```
Which confirms that our toy `html` `+grab` gate was used to do the proper mark renderings.

## Doing Imports in the dojo
The runes we've looked at here only work inside Gall agents. If you want to import a library in the dojo, use `-build-file`:
```
> =default-agent -build-file %/lib/default-agent/hoon

::  when you enter this, you'll see the compiled core at `default-agent.hoon` printed out
> default-agent
```

## Exercises

### Handling More Types
* Add a `+grab` arm to `mar/fordexample/name.hoon`
  - the arm should handle `txt` marks
  - in the `+grab` arm, transform each line of the `txt` file to be a cell with
    the number of characters in the cord as the first element, and the cord as
    the last

### Understand Existing Marks
Refer to the `mar` directory in a ship for these exercises.
1.`/mar/txt.hoon`
  * What types can a `txt` mark come from?
  * What types can it convert to?
  * What is a `noun` turned into?
2. `/mar/js.hoon`
  * What do you think is happening in the `+grow` arm for `elem`?
  * What do the `+grab` arms do?

