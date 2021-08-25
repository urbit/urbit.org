+++
title = "`on-peek` and scry"
weight = 5
template = "doc.html"
+++

So far in this course we've stayed inside our own agents, poking them, altering
their data, etc. However, one of Urbit's big wins is the ability to query
(scry) data of *other* agents in a structured manner, when they allow it. In
this sense, Gall agents aren't just "apps"--they play a similar role to
databases.

For example, imagine that you want to find out all the groups a user is
currently subscribed to. This is stored in every ship inside the `%group-store`
Gall agent. That agent, in turn, exposes some of its internal data through
scry  queries using its `+on-peek` arm.

In this lesson, in addition to our own `+on-peek` arm, we'll examine some that
already exist in the Gall agent-space that you can query on your own. By the
end, you should be confident that you can grab any info that an agent exposes to
your Urbit.

## Example Code
* [/app/iscry.hoon](https://github.com/timlucmiptev/gall-guide/blob/master/example-code/app/iscry.hoon)
Copy the file to your ship's `app` directory, and install it as usual: `|start
%iscry`.

## Scry Mechanics
Scry uses a special rune, `.^` to query the Arvo namespace. This means that it
can ask any vane a question about its current state, and get an answer, if the
query is supported. Scry is fast relative to other Urbit operations, since
it's a read-only operation; this means that it doesn't have to write an event to
disk.

`.^` takes a sample of `[p=spec q=hoon]`, which is a mold for the query's return
value and the query itself. In practice, the query will have a form like:
```hoon
::  query for Clay (%c) + %y
[%cy /example/path]

::  query for Gall (%g) + %x
[%gx /SHIP/GALL-AGENT-NAME/TIME/example/path]
```
In all cases, the query starts with a `@tas` with the vane letter. The second
letter determines the type of query, which in this course will always be
`x` or `y` (but there are many others depending on the vane).

### `%x` or `%y`?
The `x` or `y` after the vane letter is called the `care`. The `care` indicates
what sort of query is being made. For the apps we're writing in this course,
this will also be sufficient to determine the type of the return value (the
`p=spec` in the sample of `.^`), but in general a given `care` may have more
than possible return type that is dependent on the query itself. For the apps
we're writing:
* queries with `%y` produce a `cage` with mark `%arch` and vase type `arch`
* queries with `%x` produce a cage with the mark at the end of the `path`
  queried; generally this mark will be `noun`.

### Notes on `arch`
```
::  `arch` definition
+$  arch  (axil @uvI)
++  axil
  |$  [item]
  [fil=(unit item) dir=(map @ta ~)]
```
`@uvI` is the aura for a hash (of a file), and `dir` is a map of `knot`s representing `path`s or directories. This type is used by Clay for returning files/directories, and by Gall apps (such as `%group-store`) for returning all group paths in the store.

### Using `.^`
The first argument to `.^` is a mold used to
["clam"](/docs/hoon/reference/rune/buc) the response (i.e. cast it as that
type). For `%y` queries, this will usually be `arch`. For `x` ones, you
generally put mark `noun` at the end of the path, and then clam with a mold that
you know will work for the data inside the produced `vase`. We'll see examples
of how to figure this out below.

### Example dojo Queries
Since some of these queries are sent to `%group-store`, we need to add a dummy
group so that they'll return data:
```
:group-store &group-action [%add-group [~zod %fakegroup] [%invite *(set ship)] %.n]
:group-push-hook &group-update [%add-members [~zod %fakegroup] (sy ~[~zod ~timluc ~dopzod])]
```

#### `%y` Queries
Our example apps will only deal with scries that use the `arch` mold, but most
Gall applications use custom molds.
```
::  all dirs and files in the root path
> .^(arch %cy %)

::  all groups in the `%group-store` agent
> =r -build-file %/lib/resource/hoon
> .^((set resource:r) %gy /=group-store=/groups)
```

#### `%x` Queries
```
::  paths of all chats we're in
> .^((set path) %gx /=chat-store=/keys/noun)

::  full group info for one group (with noun mold and noun mark)
> .^(noun %gx /=group-store=/groups/ship/~zod/fakegroup/noun)

::  full group info for the same group, but with `(unit group)` mold
::  below line imports the `group.hoon` library
> =g -build-file %/sur/group/hoon
> .^((unit group:g) %gx /=group-store=/groups/ship/~zod/fakegroup/noun)
```

## Dealing with Ship and Time
From the dojo, we can use `/=AGENT-NAME=`, and the dojo will fill in `=` with
ship name and time.

If we're calling from a Gall app, we'd use our `bowl` to supply those values,
like so:

```
.^((unit group:g) %gx /[(scot %p our.bowl)]/%group-store/[(scot %da now.bowl)]/groups/ship/~zod/fakegroup/noun)
```

## `+on-peek` Mechanics
When Gall receives a scry request with `%gx` or `%gy`, it:
1. translates the request and forwards it to the appropriate agent's `+on-peek`
   arm
2. waits for that arm to produce a result
3. processes the result and, if it's valid, passes it back to the caller

### Translating the Request
Gall scries have the forms below, where capitalized names are meant to be replaced with values:
```hoon
[%gx /SHIP/GALL-AGENT/TIME/example/path/mark]
::  OR
[%gy /SHIP/GALL-AGENT/TIME/example/path]
```
Gall translates `[%gy /SHIP/GALL-AGENT/TIME/example/path]` into `[%y
/example/path]` and passes that value to the `+on-peek` of agent `GALL-AGENT`.

Gall translates `[%gx /SHIP/GALL-AGENT/TIME/example/path/mark]` into `[%x
/example/path]`, and remembers the mark.

### Inside `+on-peek`
Look at the `+on-peek` arm in `iscry.hoon`. It matches against the incoming
paths, of which we match three:
1. `[%y %result ~]`
2. `[%x %friend ~]`
3. `[%x %no-result ~]`

#### Example Requests
```
> .^(arch %gy /=iscry=/result)

::  returns the ship
> .^(ship %gx /=iscry=/friend/noun)

::  crashes
> .^(noun %gx /=iscry=/no-result/noun)
```

### Processing the Result
When the result is produced by `+on-peek`, Gall returns it directly to caller if
it was a `%y` scry. If it was an `%x`, Gall runs the mark passed at the end of
its path on it, and then returns it to the caller, which clams the mold passed as
the first argument to `.^`.

So `.^(ship %gx /=iscry=/friend/noun)` is passed to `+on-peek` as `[%x %friend
~]`, and then it returns `friend.state` inside a `noun` `cage`. Because it is a
`ship=@p`, our mold of `ship` succeeds, and it returns `~timluc-miptev`. We
could just as easily pass a mold of `noun`: `.^(noun %gx /=iscry=/friend/noun)`,
which would produce `3.690.144`.

`+on-peek` returns `(unit (unit cage))`. A return of `~` is meant to represent
the value maybe existing, and `[~ ~]` means that the value does not and will not
exist. In either case, Gall produces a crash if `~` or `[~ ~]` is returned by
`+on-peek`. This is what we see above with the `/no-result` path.

#### Note on Marks
In Gall agents, you'll see `%x` queries use a `%noun` mark, the caller will look
at their source or documentation to know what type is "really" inside the vase,
and will pass that type as the mold to `.^`. In the next section, we'll see how
to examine source to see what type is expected inside a given vase.

## Querying Existing Data
Understanding the `+on-peek`s of *other* Gall agents is a big part of Gall
development.

Very often, programmers want to make extensions to Urbit that are variations on
"query existing data about chats/groups, and then do something." The "query"
part of these use cases is done with scry. A bot to monitor chats for invite
requests, for example, needs to be able to scry a particular chat's path and
check for certain patterns in the messages sent there.

Sometimes these scry paths are documented, but often they're not. No problem!
You just need to open up the source of the Gall app that stores the data you
want, see what types of scries its `+on-peek` arm takes, what form it produces
data in, and build your query accordingly.

Below, we walk through the `+on-peek` arms for `%group-store` and `%chat-store`
and see how we can extract information from them.

### `%group-store` Walkthrough
We'll refer to [this
version](https://github.com/urbit/urbit/blob/9f46f4ce24a0a3650aa3d2317a20fb9713cff7d4/pkg/arvo/app/group-store.hoon)
of `/app/group-store.hoon`.

This is the Gall agent that stores group member and owner/admin data. In its `+on-peek` arm, we see that it matches 3 paths:
```
[%y %groups ~]
[%x %groups %ship @ @ ~]
[%x %groups %ship @ @ %join @ ~]
```

#### `[%y %groups ~]`
This is the most straightforward. It creates an `arch` (since it's a `%y` scry),
and then runs `turn` on all the groups, changing the unique `resource` for each
group into a `path`. Finally, it runs `malt` to turn the result into a `(map @ta
~)`.

#### `[%x %groups %ship @ @ ~]`
This is a common form for scries: some static `path` elements to start (`%groups`
and `%ship`), followed by parameters, which are 2 atoms here. We take the tail
of the tail of the path (another common pattern: everything following the static
elements), turn it into a `resource` (`[=ship name=term]`) and then pass that
`resource` to the `peek-group` arm.

`peek=group` simply `get`s the `group` represented by the resource, and thus
produces a `(unit group)`. This is thrown into a vase, given a `noun` mark, and
returned.

*Key Point*: because the value in the vase is a `(unit group)`, our scry command
for this path would look like:
```
.^((unit group) %gx /=group-store=/groups/ship/SHIP/GROUP-NAME/noun)
```

#### `[%x %groups %ship @ @ %join @ ~]`
Here we have 2 static path components, two atom parameters, another static
component (`%join`), and one more atom.

The first 2 atoms are turned into a `resource` as above (representing a group),
and then the final atom is parsed as a ship name and we call `(peek-group-join
u.rid ship)`.

`+peek-group-join` gets the group at `rid`, and then branches on the group policy
type. If the group is `%invite`, the `ship` must be a member or in `pending`. If
it's an `%open` group, the ship or its clan cannot be banned.

So we now have determined that this scry path returns a loobean representing
whether the `ship` can join the group.

### `%chat-store` Walkthrough
We'll use [this
version](https://github.com/urbit/urbit/blob/9f46f4ce24a0a3650aa3d2317a20fb9713cff7d4/pkg/arvo/app/chat-store.hoon)
of `/app/chat-store.hoon`.

There's no `%y` queries here. The `%x` queries are:
```
[%x %all ~]
[%x %keys ~]
[%x %envelopes *]
[%x %mailbox *]
[%x %config *]
```

#### `[%x %all ~]`
Simple, just produces the whole `inbox`.

#### `[%x % keys ~]`
Also straightforward: returns the keys of the `inbox`, which, if we look in
`sur/chat-store.hoon`, are `path`s representing chat names. If we look up the
`key by` arm, we see it produces a `set`, so we could cast our result to that.

#### `[%x %envelopes *]`
This is the most complex one (although not difficult), and is left as an
exercise for the reader.

#### `[%x mailbox *]`
The code for this path throws out the static elements, and looks up the
remaining `path` in `inbox`. Since `inbox` is a `(map path mailbox)`, this
produces a `(unit mailbox)` (result of `get` is a `unit`).

#### ` [%x %config *]`
This also throws out static elements, fetches the `(unit mailbox)` at the
remaining `path`, and returns its `config` if it exists. So the result here will
be a `config` (NOT a `(unit config)`: note how the vase is formed in line 139).

## Summary
In this lesson, you saw how to write your own `+on-peek` arms to respond to scry
queries of your app's state.

Even more importantly, you learned how to use `.^` to scry any Gall agent that
exposes its data through `+on-peek`, and also how to understand their source
code. This will allow you to query any agent you wish, and build up apps that
operate on pre-existing user information to create rich experiences.

### Key Points
* scries & subscriptions let you pull in data from other apps and then use that
  data programmatically in your agents.
* scries are fast, but processing the data you pull in could potentially be
  slow.

### Note
scries can only be done on the current ship; you cannot scry remotely.

## Exercises

### Code-Reading and scry Writing
* Figure out what the `[%x %envelopes]` query in `app/chat-store.hoon` does
  exactly, and what type of value is in its vase.
* Write successful Gall scry requests to 4 different agents on your main ship.
  Use both `%x` and `%y`. Some possible agents to query in `/app`:
  - `contact-store.hoon`
  - `eth-watcher.hoon`
  - `hood.hoon`
  - `launch.hoon`
  - `metadata-store.hoon`
  - `graph-store.hoon`
  - `azimuth.hoon`
  
### `picky` app

For this exercise, you should build your own agent that you can send pokes to.
Feel free to do the pokes as `%noun`s as in the [poke
lesson](/docs/userspace/gall/guide/poke).

**You will likely want to use an [-L
ship](/docs/userspace/gall/guide/workflow) with lots of pre-existing
group/chat data for this exercise.**

#### scry helpers
In your agent, create 2 gates in the helper core. Both should take a sample of
`[mold app-name path]`
  1. A gate that does `%gy` scries
  2. A gate that does `%gx` scries
  
#### scry pokes
Create pokes that perform the following scries:
* get all groups that you are an owner or admin of (`metadata-store` and
  `group-store`)
* get full chat mailboxes by their path (`chat-store`)
* subscribe to updates from `chat-store`

