+++
title = "Filesystem"
template = "doc.html"
weight = 3
+++

Urbit has its own revision-controlled filesystem, Clay. Clay is a typed, global,
referentially transparent namespace. An easy way to think about it is like typed
`git`.

The most common way to use Clay is to mount a Clay node in a Unix directory. The mounted directory is always at the root of your pier directory.

For more information on Clay, see the [Overview](@/docs/arvo/clay/clay.md), and
additional usage information at [Using Clay](@/docs/arvo/clay/using.md). 

### Quickstart

This quick-start guide will walk you through some common commands. Follow along
using your Dojo. When you get a `>=` message after entering a command, this means
that the command was successful.

A [`desk`](@/docs/glossary/desk.md) is something like an independently
revision-controlled branch of your urbit's file-system. Your urbit's system
files live in the `%home` `desk`.

It's important to note that whenever you want to sync changes from your Unix
directory to your ship, you must use the `|commit %desk` command, where `%desk`
is the `desk` that you'd like to sync to.

When developing it's a good idea to use a separate `desk`. Create a `%sandbox`
`desk` based on the `%home` `desk`:

```
~zod:dojo> |merge %sandbox ~zod %home
```

Running `our` produces your ship-name, meaning that you can run the following
command instead of typing out the entire thing. This is especially useful for
comets due to their very long names.

```
~zod:dojo> |merge %sandbox our %home
```

Most of the time we want to use Clay from Unix.  Mount the entire contents of
your `sandbox` desk to Unix:

```
~zod:dojo> |mount /=sandbox=
```

To explore the filesystem from inside Urbit `+ls` and `+cat` are useful. `+ls`
displays files in the current directory, and `+cat` displays the contents of
a file.

We use `%` to mean "current directory." The result of the command below
is just like using `ls` in a Unix terminal.

```
~zod:dojo> +ls %
```

Notice how `+cat %` does the same thing. That's because everything in Clay,
including directories, is a file.

Sync from your friend `~bus`'s `%experiment` desk to your `%sandbox` desk:

```
~zod:dojo> |sync %sandbox ~bus %experiment
```

If and when your sync is successful, you will receive a message:

```
kiln: sync succeeded from %experiment on ~bus to %sandbox
```

The ship that you sync from will get their own message indicating that you're
both connected as peers:

```
; ~zod is your neighbor.
```

---

### Clay manual

The following constitutes an explanation of handy commands that most Urbit
pilots will want to know at some point. Reading this section will get you to the
point that you can navigate the file system, sync with Unix, merge your desk,
and other basic tasks familiar to novice users of the Unix terminal.

#### Paths

A path in Clay is a list of URL-safe text, restricted to the characters `[a
z]`,`[0 9]`, `.`, `-`, `_`, and `~`. This path is a list of strings each
prepended by `/`. In other words, paths are expressed as `/foo/bar/baz`. File
extensions are separated from file names with `/`, not `.`. Extensions are
syntactically identical to subdirectories, except that they must terminate the
path.

Paths begin with three strings indicating the ship, desk, and revision, and
might look like `/~dozbud-namsep/home/11`.

The first component is `ship`, which is, as you might guess, the name of
an Urbit ship. The second component is `desk`, which is a workspace meant to
contain other directories; the default `desk` is `%home`. The third component is
the revision, which represents version information in various ways: date and time;
a version sequence, which is a value incremented by one whenever a file on the
given `desk` is modified; or an arbitrary plaintext label.

You can find what your current ship, desk, and revision is at any given moment by
typing `%` in the Dojo and looking at the first three results. This will display
as a cell rather than a path, like
```
[~.~zod ~.home ~.~2021.3.19..16.11.20..0c60]
```
Here we see that the revision consists of the date, time, and a short hash.

We use this format because, unlike the current internet, the Urbit network uses a
global namespace. That means that a file named `example.hoon` in the `/gen`
directory on the `%home` desk of your ship `~lodleb-ritrul` would have a
universal address to anyone else on the network:
`/~lodleb-ritrul/home/186/gen/example/hoon`. That, of
course, doesn't mean that everyone on the network has privileges to access that
path. But given the revision-controlled and immutable nature of Urbit, this
means that if the file requested is available, it will always be the same. This
means that if an Urbit is serving a webpage, that exact version will always be
retrievable (assuming you have access to it).


#### Relative paths

The `%` command, which we gestured at in the above section, represents the
**relative path**, which is the path where you are currently working.

`%`s can be stacked to indicate one level further up in the hierarchy for each
additional `%`. Try the following command:

```
~zod:dojo> %%%
```

You'll notice that it only has your ship name and the empty list. The
two additional `%`s abandoned the revision and the `desk` information by moving
up twice the hierarchy.

There are no local relative paths. `/foo/bar` must be written as
`%/foo/bar`.

#### Substitution

You don't need to write out the explicit path every time you want to reference
somewhere outside of your working directory. You can substitute `=` for the
segments of a path.

Recall that a full address in the the Urbit namespace is of the form
`/ship/desk/case/path`. To switch to the `%sandbox` `desk`, you would enter

```
~sampel-palnet:dojo> =dir /=sandbox=
```

`=dir` is used to change the working directory - we will see more on it
[below](#changing-directories.)

The above command uses substitution to use your current `ship` and
revision; only the `desk` argument, which is located between the other two, is
given something new. Without substitution, you would need to write:

```
~sampel-palnet:dojo> =dir /~sampel-palnet/sandbox/85
```

Substitutions work the same way in the `ship/desk/case` and
paths. For example, if you are in the `/gen` directory, you can reference a file
in the `/app` directory like below. (`+cat` displays the contents of a file).

```
~sampel-palnet:dojo> =dir %/gen
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen> +cat /===/app/curl/hoon
```

Note what was substituted out, and note that we don't need to separate `=` with
`/`.

If we changed our working directory to something called `/gen/gmail`, we could
access a file called

```
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen> =dir %/gmail
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen/gmail> +cat /===/app/=/split/hoon
```

Because both paths share a directory named `/gmail` at the same position in the
address hierarchy – which, if you recall, is just a `list` – the above command
works!

We can do the same thing between desks. If `%sandbox` has been merged with
`%home`, the following command will produce the same results as the above
command.

```
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen/gmail> +cat /=sandbox=/app/=/split/hoon
```

Most commonly this is used to avoid having to know the current revision
number in the `dojo`: `/~lodleb-ritrul/home/~2021.3.19..16.11.20..0c60/gen/example/hoon`

#### Changing directories

Change the working directory with `=dir`. It's our equivalent of the Unix `cd`.

For example, the syntax to navigate to `/home/gen/ask` is:

```
~sampel-palnet:dojo> =dir /=home=/gen/ask
```

This command will turn your prompt into something like this:

```
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen/ask>
```

Using `=dir` without anything else uses the null path, which returns you to
your home desk.

```
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen/ask> =dir
```

Your dojo prompt will turn back into `~sampel-palnet:dojo>`.

To go up levels in the path hierarchy, recall the relative path expression
`%`. Stacking them represents another level higher in the hierarchy than
the current working directory for each `%` beyond the initial. The command below
brings you one level up:

```
~sampel-palnet:dojo> =dir %/gen
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen> =dir %%
```

### Revision-control

#### Mount

Syntax: `|mount %/clay/path %mount-point`

Mount the `/clay/path` at the Unix mount point `mount-point` with your pier as
root directory.

**Examples:**

```
|mount %/gen %generators
```

Mounts `%/gen` to `/generators` inside your pier directory.

#### Unmount

```
|unmount [clay-path || Unix-name]
```

Unmount the path or name from Unix.

**Examples:**

```
|unmount %/gen
```

Unmounts the Clay path `%/gen` from whatever name it was mounted as.

```
|unmount %generators
```

Unmounts the Unix path `/generators`.

#### Merge

```
|merge %target-desk ~source-ship %source-desk
```

Merges a source `desk` into a target `desk`.

This can optionally include a [merge
strategy](@/docs/arvo/clay/using.md#strategies):

```
|merge %target-desk ~source-ship %source-desk, =gem %strategy
```

You may also merge a Clay path on your own ship to a `desk`, along with an
optional strategy.

```
|merge %target-get %/clay/path, =gem %strategy
```

**Examples:**

```
|merge %examples ~wacbex-ribmex %examples
```

Merge the `%examples` `desk` from `~waxbex-ribmex`

```
|merge %home-work /=home=, =gem %fine
```

Merge `/=home=` into `%home-work` using merge strategy `%fine`.


#### Sync

```
|sync %target-desk ~source-ship %target-desk
```

Subscribe to continuous updates from remote `desk` on local `desk`. Non-comet
urbits have `|sync %home ~sponsor %kids` automatically set up (where `~sponsor`
is the planet that issued a moon, the star that issued a planet, or the galaxy
that issued a star).

**Examples:**

```
|sync %home-local ~dozbud %home
```

#### Unsync

```
|unsync %target-desk ~source-ship %source-desk
```

Unsubscribe from updates from remote `desk` on local `desk`. Arguments must
match original `|sync` command.

Example:

```
|unsync %home-local ~dozbud %home
```


### Manipulation

#### `+cat`

Syntax: `+cat path [path ...]`

Similar to Unix `cat`. `+cat` takes one or more `path`s, and prints their
contents. If that `path` is a file, the contents of the file is printed. If the
`path` terminates in a directory, the list of names at that path is produced.

#### `+ls`

Syntax: `+ls path`

Similar to Unix `ls`. `+ls` takes a single `path`.

Produces a list of names at the `path`.

```
~sampel-palnet:dojo> +cat %/our/home/gen/curl/hoon
```

#### `|rm`

Syntax: `|rm path`

Remove the data at `path`. `Path` must be a path to the actual node, not a
'directory'.

#### `|cp`

Syntax: `|cp to from`

Copy the file at `from` into the path `to`.

#### `|mv`

Syntax: `|mv to from`

Move the file at `from` into the path `to`.

In Clay, `|mv` is just a shorthand for `|cp` then `|rm`. The `|rm`
doesn't happen unless the `|cp` succeeds.
