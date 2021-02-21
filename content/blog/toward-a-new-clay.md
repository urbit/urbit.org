+++
title = "Toward a New %clay"
date = 2016-07-14
description = "Urbit's revision-control system, %clay, is itself due for a (medium-sized) revision!"
aliases = ["/posts/essays/toward-a-new-clay", "/posts/toward-a-new-clay", "/blog/clay"]
[extra]
author = "Curtis Yarvin"
ship = "~sorreg-namtyv"
+++

TLDR: (a) Urbit's revision-control system, `%clay`, is itself due
for a (medium-sized) revision!  (b) this time, you yourself can
really help!  (c) please don't give away the buried spoiler!

This explanation does not (or at least should not) require you to
know anything about Urbit.

### But %clay is already pretty cool

Of course, nothing in Urbit is allowed to be _lame_.  `%clay` is
actually quite cool.  It does need some work.  But first, let's
talk about what it is and why it's cool.

`%clay` is the Arvo vane (Urbit kernel module) for revision
control.  It's an authenticated, human-memorable global immutable
namespace which is also a typed revision-control system.  It's
also very good at subscription and synchronization.  Urbit
currently uses `%clay` to distribute live hotpatches; we
transparently upgrade the whole network with one checkin.

### Compared to other revision-control systems

`%clay` is clearly a vanilla DVCS in the modern `git` style.  Of
deployed DVCS these days, `%clay` is probably closest in spirit
to `bzr` or maybe `fossil`.

Obviously, as a part of a larger whole, you would expect any
Urbit RCS to be brutally spartan.  `%clay` is.  It's even more
spartan than `bzr`.

(In fact, it's really too spartan to fully use at the moment.  We
ourselves still use `%clay` mainly as a distribution system, and
do all internal development on GitHub.  This is because the
present `%clay` lacks a few little conveniences, like commit
messages.  See upgrades, below.)

There are lots of normal DVCS things in `%clay`.  But there are
also cool and unusual ones.  Let's take a brief tour of the
high-level system, then describe what we think should change
about it.

### Anatomy of a DVCS

A DVCS is a historical state graph.  A point in this graph is a
snapshot of some tree-structured system, like a filesystem.

These snapshots, including recursive internal nodes, are stored in
a content-addressable store.  Pointers in this store are used to
construct a revision graph, whose edges are edit and/or merge
actions.  Some sort of namespace attaches meaningful names to
current revisions in this graph.

There are six big questions in the design of a DVCS:

- how are snapshots named?
- what is the data structure within a snapshot?
- how does it map to the Unix filesystem?
- how is the system queried?
- how is the revision graph defined?
- how does the content-addressable store work?

## Anatomy of %clay

A good way to summarize `%clay` (at present) is that its answers
to the first four questions are interesting, and its answers to
the last two are boring.  We'll talk about all six, though.

### Global namespace: [ship desk case]

The permanent global name of a `%clay` snapshot is a `++beak`.  A beak
is a triple: `[ship desk case]`.

The `++ship` is an Urbit ship.  A ship is a network address, a
human-memorable name and a cryptographic identity.  The address
width is variable; shorter addresses are more desirable.  Most
users have 32-bit addresses, which we map to four-syllable
synthetic names like `~sorreg-namtyv`.

The `++desk` is a 4-letter word meaning "branch."

The `++case` is a version, one of three kinds: a version sequence
number, a named label, or a date.

In the Urbit path syntax, the beak is the first three segments of
the path: `/ship/desk/case/my/cat/picture`.

In most cases, a path parser has a default ship, desk and case,
each of which can be replaced by `=`.  So `/=home=/my/cat/picture`
is the data at `/my/cat/picture` on your own ship, in the `%home`
desk, right now.  Immutability doesn't have to be inconvenient.

`%clay` has no concept of a mutable name or a magic `HEAD`.  Use
the current date.  If you're referring to remote data and you're
worried about clock skew, subtract a second or three, or be
prepared to block.  (Or keep your clock unskewed, which shouldn't
be _that_ hard.)  It's not like mutable-name schemes work any
better than this anyway.

(Immutability is central to `%clay`.  `git` merely adopted the
reflog.  `%clay` was born in it, molded by it...)

`%clay` is objective; each Urbit node hosts only one ship, but
treats domestic and foreign data (almost) the same way.  If you
ask your `%clay` repository for someone else's data, it will
block the request until it gets the data, which it then caches.
At present, we always fulfill requests from the origin ship,
though in future we could certainly use it as a tracker.

If `%clay` discards cached data, it keeps a hash, so that your
urbit can't violate the local illusion of immutability.  We
can't, of course, prevent anyone else's ship from sending
conflicting claims in different directions.  But we can prevent
programs on our own ship from hearing about them, meaning that we
retain local referential transparency.

### Local structure: dome, arch, leaf and mark

A `%clay` snapshot is called a `++dome`.  A dome is the `%clay`
equivalent of a tree-structured filesystem.

Each node in this tree is one uniform structure, an `++arch`,
which is both file and directory.  A `++leaf` or data value in
this arch is a typed document.

A logical document type is called a `++mark`.  A mark is a
symbolic pointer to a Hoon source file, in the same dome, for an
engine that can validate, compare, and/or convert
documents of that mark.

Let's go over arches and marks a little more closely...

#### An arch is a uniform filesystem node

Most filesystems and RCS have modal nodes.  For instance, a git
data node can be a blob or a tree.  `%clay` (and the Urbit
namespace in general) has one kind of node, an `arch`:

```
  ++  arch  (pair (unit leaf) (map knot arch))
  ++  leaf  (pair mark noun)
```

An arch has an optional typed-data leaf, and optional named
children.  In Unix terms, it's a file, a directory, or both.  It
can't be neither: an empty arch, with no data and no children, is
auto-pruned.  As in `git` (but not in Unix), the hierarchy is a
pure function of its leaves.  Paths exist only because of the
data they point to.

The `++knot` names in an arch path are also a little special.
They're typed, in a sense; any knot can be parsed invertibly into
a typed atom.  The atom is an arbitrary unsigned integer.  Its
type (an `++aura` if you know Hoon) defines the semantics and
presentation of the atom: for instance, a symbol, a decimal,
a date, etc.

Ultimately a filesystem is a database, and a path is a primary
key.  It's very useful to be able to store simple data in this
key, in a standard and unambiguous way.

Why uniform nodes?  One, they map nicely to information trees
where a subtree may need some custom collective presentation,
not an automatically generated Apache style directory listing.
Two, non-uniform nodes introduce a whole pointless category of
node type conflicts -- for which life is far too short.

#### A mark is an executable document type

A mark is "like an executable MIME type."  It's best defined as a
symbolic mapping from a filesystem to a schema engine.

If you have a MIME type `text/html`, you need to watch the
Internets to track what the W3C thinks HTML is.  If you have an
Urbit mark `%html`, you can functionally construct (using our
insanely powerful functional build vane `%ford`) a core which
can validate or normalize HTML, apply patch and diff logic, and
translate to and from other marks.  `%ford` can even reason about
translation paths and construct multistep conversions.

(Urbit does not actually have this super-smart `%html` mark right
now.  But it probably should, huh.  And this page was composed in
Markdown and translated to HTML by `%ford`.)

Where does the source code of a mark live?  Within the same dome
as the data it describes.  `%html` files are described by the
Hoon source at `/===/mar/html`, which perhaps gets mapped into
your Unix filesystem at `$ship/home/mar/html.hoon`.

This Hoon file is not self-contained.  It has dependencies.  The
`%html` mark may depend on various structures and libraries
elsewhere in Urbit.  But the source code for all them is within
this dome.

One constraint this puts on domes is that _all domes are
descendants of the base system dome_.  Domes are versions of one
reality, not fragments of that reality.  You can't create a new
empty dome -- you'd have no mark source, and be unable to install
any validated files.

Enforcing the rule that all domes are congruent (if only in that
they all contain the base system files) costs us nothing in the
implementation, does not inconvenience the user, and ensures that
weird collisions between non-parallel things don't happen.

### Unix mapping and mounting

Every DVCS is its own filesystem in a sense.  But every DVCS
works by mapping and mounting itself, in some sense, to Unix.

#### Mapping arches to Unix

How do we map arches into Unix?  The arch structure maps 1:1 to
the Unix directory tree.  When the arch has a leaf, we derive a
dot extension from the file's mark.

So, supposing we have a leaf `foo` which is an HTML document
(mark `%html`), with two children `bar` and `moo`, also HTML
documents, in Unix we'll see:

```
foo.html
foo/bar.html
foo/moo.html
```

This maps invertibly back into `%clay`, and it looks perfectly
unremarkable from the Unix side.  File completion sometimes gets
a little annoying.

It would be if nice every possible Unix tree, even every
plausible Unix tree, mapped cleanly and completely to a `%clay`
dome.  There are always horrid exceptions, even in common use --
like extensionless Makefiles.  The trivial solution is that if
`%clay` finds a file mysterious, it won't track it.

One often unquestioned assumption in new system software is that
compatibility with old content is important.  It's nice, but not
that important.  Most content in a new system is new content.
The important compatibility direction is export, not import.  So
the new system should subset, not superset, the ancient formats.

### Mounting desks to Unix

If a `%clay` desk is _mounted_, it has a two-way live sync to
the Unix directory of the same name within the pier.

When files in a mount directory change, `%clay` notices it
through `libuv` filesystem watching (ultimately `inotify()` or
`FSEvents`), computes diffs, and automatically commits them to
the desk.  And if `%clay` creates a new version for its own
urbity reasons, it will revise the Unix files.

Keeping all mounted files in the same Unix subdirectory makes it
easy to move the whole pier in a tarfile.  Edits applied while
the `urbit` process isn't running will be detected and applied
the next time it starts.

In conventional DVCS terms, `%clay` has a 1:1 static mapping from
branches to working directories.  Why?

Why not?  Do we need that "what branches are checked out in what
directories" piece of state?  Why force the user to worry about
which branches are mounted to which directories?  Why not just
mount them under their own names?  Is there some crippling global
shortage of disk space for source files? Our planet is running
out of inodes?  Wut?

### Queries, subscriptions and synchronization

There are two ways to get data out of `%clay`: dereference the Urbit
namespace, or send a request/subscription.  Sync is in userspace.

#### Dereferencing the namespace

`%clay` is just part of the full Urbit namespace.  The full namespace
has a two-character prefix which expresses what vane to query
(always `%c` for `%clay`).  The suffix is a mode flag; `%x` for
data, `%y` for a list of children, `%z` for the whole arch
subtree, `%w` for the version number.  (Each vane has its own
modes.)

For example, the full path to my cat picture is

```
/cx/~sorreg-namtyv/home/[now]/my/cat/picture
```

(where `now` is the current date).

If the data model is `++image` (hypothetical -- we don't really
do image processing in Urbit right now), the normal way to load
this data in a Hoon program is
```
.^(image /cx/~sorreg-namtyv/home/[now]/my/cat/picture)
```

This produces a statically typed value (which works by
dynamically checking `image` against the actual type of the
value, but this comparison caches well).

Internally, an Urbit namespace request produces a `++cage`, which
has a mark, a `++span` (language-level type), and an actual noun.
The product is doubly optional, `(unit (unit cage))`; this is `~`
if we don't know the value of this name at present but might
learn it in future, `[~ ~]` if we know we'll never know it, or
`[~ ~ value]` if we know it now.

In high-level shell programming (`:dojo`), we can make apparently
"blocking" requests to `%clay`.  What actually happens: when `%clay`
produces `~`, we stop trying to compute this expression and wait
on one or more blocking requests.  When we are unblocked, we
recompute again from scratch; the intermediate computation is not
saved at all.

Urbit doesn't like to block.  It likes to save coherent data
structures, not incomplete computation contexts.  When Urbit
pretends to block for you, this is a courtesy service.  You
can return the courtesy of not expecting miracles from it.
When in doubt, send an actual request.

### Requests and subscriptions

A true request (local or remote) has access to the same
namespace, but can (a) read across case (revision) ranges,
and (b) filter by subtree.

If the revision range in a request stretches into the future, the
request becomes a subscription.  Urbit messaging always regards a
single response as a special case of a subscription.

Generally, the response stream created by a request starts with
all the data the server has available right now; updates will
follow when they become available; the subscription will be
closed when the request range is complete.

#### Userspace synchronization

Synchronization per se is done in userspace.  In `%clay`, sync just
means an application (typically the `%kiln` module in the system
app `:hood`) subscribes to a remote desk, and saves its change
stream locally.  So sync is really an emergent feature of `%clay`.

### Revision graph

`%clay`'s revision graph is completely uninteresting at present.
Some changes are proposed below, however.

As in any DVCS, a dome is the child of one parent dome (an edit)
or more parents (a merge).  Often the parent of any revision is
the previous version in the sequence, but it can be anything.

### Storage model

`%clay`'s storage model is completely uninteresting.  It's also a
little funky and I want to change it, so I'll be super vague.

A `++lobe`, a 128-bit atom, is the Merkle hash of a `blob`, which
is essentially a leaf.  All blobs are stored in a hash table
(`(map lobe blob)`), and reference each other through lobes.

At present we don't GC this space at all, because we don't
actually delete any roots.

A `blob` may be `%direct`, meaning it's defined as the data
itself, or `%delta`, defined as a change against another blob.
This is motivated by the desire not to store a full snapshot
on every file change.  But it may be misguided (see changes #0
and #1 below).

We cache the full arch tree (`++ankh`) of the latest state in
each desk.  For current queries, this mitigates a lot of the
opportunities for slowness that this data model creates.  But the
disparity between the speed of the current version and the
speed previous version is an undesirable glitch in the API.

## Our motivation for change

We actually have _three_ motivations for change...

### We need to develop on %clay

At present, we're still using `git` as a development platform.
`%clay` is certainly used, but just for its strength --
deployment.  This is starving Urbit of essential experience and
basically keeping it lame.  So, change is necessary.

### Change must come from the community

"Why?" you ask?  "Why must change come from the community?" Well,
one, duh.  Change always comes from the community.

But two, a great force for change has departed.  Philip Monk,
late maintainer of `%clay` (`~wictuc-folrex` in the old era,
`~wicdev-wisryt` in the new), is tired of types and typing.  He
spent September roaming with the bison in Montana, and is now
literally on his way to Patagonia.  On the one hand, Phil still
exists and is not at all unwilling to answer questions, even dumb
questions.  On the other hand, _Patagonia_.

So %clay needs a new owner, or owners.  At this point, we think
the community might be indoctrinated enough to take a stab.

Alas, `%clay` already has a pretty checkered ownership history.
Long ago I built a `%clay` that was really the only serious
design failure in Arvo.  Then Jared Hance, a brilliant summer
intern, took my broken `%clay` and reformed it into a minimal `git`
in about a week.  Then Philip modified Jared's `%clay` to be a
_typed_ revision-control system, which is a pretty cool thing.

But... in none of these transitions did `%clay` actually get
_rewritten_ per se.  While it's a reasonably good vane, it
does contain one or two historical decisions.

We know a lot more about Arvo than we used to, and I think we can
revisit many of these decisions.  The point of this post is to
start a `%clay` design discussion that will evolve into actual
collective action.

### Pioneers may find it worth their time

We're planning a rewards program for contributions to `%clay`.
It'll simply involve setting a time period and a pool of real
estate, and allocating the pool by judged contribution.

This is an experimental program.  We'll say more about it later.
It may not even happen.  It may happen very differently.  When in
doubt, don't talk about Fight Club.

## Some openings for change

Change, of course, must come from the community.  No one can
dictate change from the top down.  We _know_ this.  But...

This list of suggested changes for the next `%clay` is not in any
sort of order: priority, structure, difficulty, etc.  Let's talk
about the changes first; make actual plans second.  The numbers
here are just for convenience.

*All changes in this program will happen on the next-generation
(`cc-release`) branch.*

### Change #0: state reform

As mentioned above, the storage model in `%clay`, as the code is
at present, feels a little funky to me.  There's nothing terribly
awful about it, but it doesn't feel quite right and its scaling
properties are very questionable.

Briefly, `%clay` today actually derives the hierarchy from its
leaves -- rather than _logically_ so deriving it.  Only leaves
are in the object store.  This is just weird, and you can feel
`%clay` trying to be something other than what it is.  (I blame
Jared, though it's actually my fault.)

To store a dome snapshot (`++yaki`), the present code keeps a
`(map path blob)` at the root of the dome.  This is enough to
reconstruct the `++arch` structures the namespace exports.
However, all kinds of basic arch operations, like basically `ls`,
become `O(n)` in the number of leaves in the dome.  This is
obviously not quite right.

I believe the storage structure should be (removing everything
that isn't needed to serve the namespace):

```
  ++  clay  (pair safe (map term desk))
  ++  desk  (pair numb (map numb root))
  ++  dome  (pair date root)
  ++  leaf  (pair mark noun)
  ++  lobe  @uvH              ::  128-bit base32
  ++  numb  @ud               ::  decimal version number
  ++  root  (pair (unit leaf) (map knot lobe))
  ++  safe  (map lobe root)
```

Here a `++root` is the universal node, with children addressed by
hash, but logically representing the abstract `++arch`.

Users of hierarchical filesystems basically expect performance
qualities that match the filesystem structure.  A huge directory
in one place shouldn't affect search speeds somewhere else.  And
of course, `ls` can't be O(n) in the size of the filesystem.

### Change #1: store edges, cache snapshots

The current `%clay` is snapshot-oriented, like `git`.  The actual
changes are discarded.  I think this is a bad choice.

`%clay` is not a research project, and has no idea of going as
far as `darcs` in the "set-of-patches" direction.  However, at
present we actually throw away the patch (`++nori`).

I think the right DVCS design for `%clay` is a snapshot-oriented
system which also keeps the patches.  The revision graph has the
same general shape as in the old `git` style.  But rather than
just deriving the diffs from the snapshots, we can also derive
the snapshots from the diffs.  When in doubt, we save space by
dropping the snapshot, not the diff.

For an RCS which is also a general-purpose typed filesystem, it's
clear that considering edges (deltas, diffs, changes, etc) as the
primary state is optimal.  You can use diff functions to derive
deltas from snapshots, but in many data models this will always
risk losing information from the original action.  When in
doubt, save what the user did.

This is even more true for operations on the tree structure, not
on individual leaves.  Consider the heuristic energy that `git` has
to go through to figure out when `mv` has been used -- even when
`git mv` has been used!  (According to the `git` faq, this is
because the lowest common denominator remains Linus' style of
working with emailed patches.)

Edges probably don't even need to be deduplicated.  They also can
contain metadata such as commit messages (which `%clay` has no
place for at present).

Once edges are recognized as unreclaimed primary state, snapshots
can always be derived from the edges.  So we can reclaim memory
being used for snapshots.

It's also straightforward to have a kind of edge which is a list
of edges, letting us collapse feature branches trivially.

Finally, I think references in edges should wherever possible
indirect through the namespace, rather than directly to the
content address.  The user has strictly more information if you
say you merged `/~sorreg-namtyv/base/987/`, than if all you have
is the hash that this reference refers to.

### Change #2: unconfuse merge and rebase

The dispute between merge and rebase has all the bad smells of
a historical wart.  But here I'm just not sure what's right.

The user has one _intent_ whether merging or rebasing, which is
to combine changes on one desk into another.  The _algorithm_
used to construct this change, whether operational transformation
(rebasing) or a 3-way diff (merging) has one goal: use all
available information to model the authors' editing intent as
realistically as possible.  If we save edges, we should use
edges.

Whether to define the resulting change graph with the typical
structure of a merge, or the typical structure of a rebase,
strikes me as quite arbitrary, and well into the land of "pick
one and force everyone to stick with it."  But this call demands
a real expert on RCS workflow, which I'm not.

Since `%clay` is a humble part of a larger system and needs to
keep its weight down, "do it both ways because people have
different preferences" is not usually the right answer.

### Change #3: comment jihad

`%clay` needs to be brought up to the documentation standards of
`%jael`.  This means (a) the formatting matches; (b) the comments
are at the same level of quality and ubiquity.

The basic commenting standards are: (a) every core (class) needs
a block comment explanation; (b) every gate (function) needs a
line comment; (c) every face (variable) needs a line comment.

This is obviously not just a clerical task.  To write these
comments, you need to actually understand the code.  This is a
nontrivial but extremely rewarding task, even if the code you're
commenting will get replaced.

Also, the _symbols_ in `%clay` must be brought up to `%jael`
quality.  There is still far too much four-letterism here.

NB: `%clay` is about 3000 lines of pretty clean Hoon, which is
certainly not at all undocumented.  We're not exactly looking at
a Matterhorn of reverse engineering here.

### Change #4: knot to coin internal paths

One feature of Urbit paths, briefly mentioned above, is that a
path segment or `++knot` (which is just a `@tas` text string, an
ASCII symbol as an atom) must be within the range of the
invertible noun printer, `++co`.

`++co` maps a described data value, a `++coin`, to an ASCII
string which is a valid URL segment and Unix filename.  Its
friend `++so` inverts the function, perfectly.

Almost every knot is the simplest kind of `coin`, a `dime.`  A
dime is a single atom with a rendering type (`aura` if you know
Hoon).  Auras include `@tas` for symbolic text, `@ud` for
unsigned decimal, `@p` for Urbit ship, etc.  `++co` can also
print arbitrary cells, though less prettily.

This feature is cool because it lets us stuff data into names in
a precise and predictable way.  Usually the names in a namespace
are human-meaningful and human-originated, and are therefore
symbolic, but there are exceptions.  For example, blogposts may
want to be named by date.

However, it is slightly retarded for the fundamental state of our
arches to store the _rendered_ string (`++knot`), not the source
data (`++coin`).  It leads to all kinds of inefficiencies where
we're doing way more parsing than we want to.  (Parsing also
should be jet-propelled, but is not.)  It also makes it way too
easy to sneak in bad data and make it `%clay`'s problem.

So, logically, we'd be shifting from

```
  ++  arch  (pair (unit (pair mark noun)) (map knot arch))
```

```
  ++  arch  (pair (unit (pair mark noun)) (map coin arch))
```

Also, a vanilla `++map` might not be quite the right data
structure at this point -- we probably want a custom sorted tree,
which separates auras and imposes a custom order on each.  This
would let us serve simple range queries quite efficiently, so
long as they match the standard aura order (eg, alphabetical
order for symbols).

### Change #5: dome semantics by reference

While the principle that a dome contains its own mark source is
elegant, it's a pain in the ass to implement properly.  `%clay`
certainly does not do it justice at present.

The complexity is in checking every change to see whether it
includes a change to the mark source (which is very unlikely),
or a dependency of the mark source (slightly less unlikely).
And if so, do we have to update all the leaves in the dome?
This is also very unlikely.  And yet, it happens.

Instead, we could simply designate, by beak (ship, desk, and
case) a dome which contains the canonical mark source.  This
would rarely change -- you could upgrade a desk to a new mark
dome, but it would be a manual operation and probably a rare one.

The common case would just be that everyone uses the current
version of the `%base` desk when a desk is created, and never
changes it.  In practice, this means not every two-byte edit
needs to get involved in detecting and/or applying schema
evolution, a welcome simplification.

### Change #6: mark containers

Marks in present `%clay` are atomic and symbolic (like `%html`).
Since they're also used for network protocols, and the proper
design is one mark per message structure, the mark namespace gets
overloaded fast.

So we added an app hierarchy within the mark namespace, using hep
`-` as a divider.  The `:talk` app expects messages with the mark
`talk-message`, whose sources is in `/===/mar/talk/message`.

This helps, but it doesn't solve another two problems: trivial
nouns and containers.

It's retarded to have to add a source file to send a `@ud` or a
`*`.  An aura (see above under `coin`) should be a trivial mark.

Also, we need to be able to construct standard containers of
marks: lists, maps, sets, and tuples (or, as a database person
would say, "rows").

### Change #7: meta-marks

Another kind of complex mark that needs to exist: conflict,
difference, and invalid marks.

Conflict data and difference data are two types of noun that are
generated in normal RCS operation.  If we have the concept of an
`%html` noun, we also need the concept of an invertible change
from one `%html` file to another; a merge conflict between two
`%html` files; and even a conflict between two marks.

There are two kinds of changes to a dome: manual and automatic.
Manual changes are initiated by the user and should crash, unless
manually overridden.  Automatic changes should not crash, ever,
and should not lose data.  If they create problems, which they
shouldn't, these problems will need to be cleaned up manually.

This is a complex space to navigate, but it requires a conflicted
merge to be able to resolve to a valid dome containing conflict
leaves, not crash.  The present `%clay` goes halfway there and
resolves to a scratch desk, but we can go farther: the whole `git`
dumpster-fire of "merge state" deserves destruction.  One change
is a merge that produces conflicts, the next is an edit that
resolves them.

Similarly, all sorts of errors can produce invalid leaves.  One
particularly rare case which is nonetheless important is schema
evolution: what happens to files in a mark, when the mark source
code changes.  They all need to be re-normalized.  And this
operation can fail, producing an invalid value.  (We don't do any
of this now, BTW, although `%ford` has the dependency mechanism to
make it possible.)  Again, in some cases this should crash the
update to the mark source; in other cases, there is no local way
to handle the crash.

So there must be a way to preserve invalid nouns that can be
repaired by repair tools that expect invalid content, while not
actually marking them as valid so that innocent code is deluded
into using the bad content.

The bottom line: a mark needs to be split into two models:
`++mark`, the original symbolic mark with its source engine, and
something like `++logo`, the meta-mark or mark container.  The
mark is the building block; the logo is the building.

### Change #8: filesystem hierarchy standard

While all filesystems remain forks of one ur-filesystem, the
standard tends to enforce itself.  But not define itself.

I've always hated the current `/mar` for marks, for instance.  I
prefer `/mac`.  But others hate this.  And so on.  Also, by
necessity, our nascent "FHS" is heavily biased toward system
data, away from user data.  This is retarded.

Please focus all bikeshedding energy on this problem!  Better to
bikeshed about what color to paint the bikeshed, then what shape
the bike gears should be.

### Change #9: security and access control

Oh, yeah, that!  They always say not to design security in at the
last minute.  Unfortunately, this is exactly what we did.  There
is no security at all in present `%clay`.  (There is also no push
operation in `%clay`, so it's not as mad as you think -- anyone
can read anything, no one can write anything, which is fine in a
young network where there are no secrets.)

Fortunately, we don't have anything super fancy planned in this
area, just basic access-control lists.  These obviously need to
be designed along with the filesystem-hierarchy standard (see
elsewhere).

Is it even possible to do ACLs properly in `%clay`?  At this
point, yes.  There is an event-oriented security model in Arvo,
though it isn't really hooked up to anything at the moment.
There is also a privilege badge system in `%jael`.  The
combination of these two features is quite sufficient for a
decent ACL model.

The idea of event-based security is that every event passed to
`%clay` has a security `++mask`.  The mask tells us:

- the set of ships that has _contaminated_ this event
- the set of ships that has _endorsed_ this event
- the set of ships that this event may be _released_ to.

To simplify this system a little and maybe explain it, the
security question in any event is: (a) who has _caused_ this
event?  (b) who may receive its _effects_?  (These sets never
include your urbit itself, of course, only neighbors.)

For example, if we're doing something because ship X sent us a
packet, and we're going to leak the results of this something
back in a response to ship X, once `%clay` knows what our ship
thinks of its neighbor X, we should have a good picture of what
effects this event should be allowed to cause.  If `%jael` knows
that X is our friend, `%clay` can know that X can see our cat
picture.

Causality is separated out into contamination (data from ship X
got into the event) and endorsement (ship X signed the whole
event).  (This may be overdesign.)  All these sets can be defined
as the empty set (eg, releasing to the empty set means no output)
or the universal set (input from the universal set could be from
anyone, ie, is unauthenticated).

### Change #10: stop using mark-extended paths

When you read a leaf from a `%clay` dome, `%clay` is happy to
perform any necessary mark conversions (the actual work is done
by the `%ford` build vane).  You can also just ask for the leaf
in whatever mark `%clay` has it.

It's confusing to think of this mark extension as part of the
path.  You shouldn't say `+cat /===/app/talk/hoon`.  You should say
`+cat /===/app/talk`, or maybe `+cat %hoon /===/app/talk`.

A mark-extended namespace may be added to `%ford`, to compensate.
But type-converting reads are the rare case, not the common case.

### Change #11: real queries and indexes

A filesystem should postpone being a database until it can no
longer do so.  So, please don't think about this problem yet.
I'm joking, of course!

### Change #12: meta-query

Make it possible to query the list of desks in a ship :-)

### Change #13: completely redesign Unix mounting

This is actually a series of changes, described below.  But
broadly...

One of Urbit's experiments is live two-way synchronization
between the Unix filesystem and the revision-control store.
Dropbox style, as it were.  I think this experiment is basically
a failure.  It may be right for cat pictures, but I don't think
it's right for Urbit.

The fundamental problem is that there are all sorts of weird,
flaky ways applications use a mutable filesystem.  It's not at
all unusual for an editor to change a file by deleting the old
file, then writing the new one in its place.

You really don't want this to produce a delete change.  A simple
cooldown timer for the sync helps a lot with this, but causes
other weirdnesses.  In theory, a sync can even cause another
change to the same version of the same desk.  And so on.

The thing we fear is just too funky to work (there is some
strange "reflux bug" still affecting it) is any sort of _two-way_
synchronization between Unix and Urbit.

And what I think puts this feature into the deadpool, or at least
cold storage, is that there's no useful workflow that actually
uses it -- at least, when editing Urbit code.

It's actually really nice to have files on a disk that nothing
will automatically modify.  If you're using `git` and `%clay` in
parallel, it's nice to mount your `git` working directory.  The
original Urbit workflow was to work out of a mounted directory,
but the two-way updates were just too weird and scary, so now we
tend to edit elsewhere and copy in -- which is lame.

### Change #14: figure out what to do with FUSE

We actually have two forms of filesystem access to `%clay`: read-only
FUSE (in a somewhat experimental state), and filesystem watching
(using `inotify()` and `FSEvents` under a `libuv` wrapper).

The FUSE interface is a good one, though it needs more work.
Moreover, it exports the whole Urbit namespace to Unix, not just
`%clay`.  For reading Urbit data, FUSE is basically ideal.

The obvious impulse is to make a read-write FUSE.  But I don't
think FUSE should be used for recording changes to an RCS, even
though the FUSE API sends you changes as events.

There are three reasons for this.  One, the actual filesystem
writes that Unix apps make are typically of low quality and
confusing.  Some crack-brained editor will find it completely
normal and unremarkable to modify a byte in a file, by deleting
the file and rewriting it from scratch.  You can use a cooldown
timer to wait for this nonsense to converge, but leaving data in
heuristic limbo seems like a very bad idea in FUSE-land.

The second is that people derive a lot of comfort from seeing
actual files on an actual disk.  The idea that your datas are
stuck in Urbit is slightly terrifying as a user experience.
We claim to be reliable.  It's actually hard to imagine datas that
couldn't be recovered from either snapshot or log.  But how can
you possibly believe us on this?

So I think it's correct to lean all the weight of reading data
from Urbit on FUSE, and use filesystem watching for writing.
Heuristic timeouts are fine in filesystem watching, because at
least the data got written when the disk says it got written.
And at least it's on the disk.

Also, FUSE is a daemon by definition, which forces us to think a
little harder about how to run the Urbit process as a daemon.
But this is a separate discussion.

### Change #15: one-way, nonced working desk

A one-way mount is a much less crazy thing.  It works the same
way our two-way mount works today, but with only one writer: the
user, via Unix.

Since a mount is one-way, it needs to have an absolute write lock
on the desk it's writing to.  We cannot have a `%home` desk which
we are also editing with filesystem watching.

Instead, we have a temporary and anonymous state that's connected
itself with your `%home` desk.  Desk names have to be valid
symbols, but we can use `hep`, `-`.  A reasonable choice is to
pick a random 32-bit name for each mount instance -- so the desk
name is not `%home`, but `%home-bosdut-sigder`.  (Randomizing
instead of always using a fixed suffix, say, `%home-work`,
just makes all kinds of screwups less likely.)

You create a mount simply by mkdiring the desk name in your pier.
Just the base name, Urbit will come up with the `%bosdut-sigder`
part and put it in a `.desk` file at the desk root.  To forget
the mount, just delete this file.  This avoids the ugly confusion
between unmounting a mount, and deleting all the data in it.

(Urbit will keep a set of the mount desks it's used and
forgotten, not reuse them, and block all requests into them.  By
blocking, we can delete without losing referential transparency.
Yes, Virginia, Urbit can forget!)

Note that the auto-reload behavior of applications is extremely
useful when testing.  When testing, you can either switch the
active application desk from `%home` to `%home-bosdut-sigder`,
or activate autosync from the latter to the former.

### Change #16: commands as metafiles

A new idea I'd like to play with is that, since the basic model
of the mount process is to read Unix files and suck their
contents into Urbit, you should be able to control a mounted
`%clay` desk through Unix filesystem operations alone.

No Urbit command-line access, not even any `urb/` HTTP control
channels, should be required for the user to generate `%clay` data
through filesystem mount, or to set up the mount.

An RCS experience that works entirely through Unix tools, in
which the only connection between content creation tools and
revision-control tools is shared access to the filesystem itself,
is essential if your RCS has something so repulsive as a daemon.
Otherwise, you're basically, like, reinventing Perforce.

More concretely, the Urbit experience today requires `:hood`
pokes (Urbit shell commands, basically) for all nontrivial RCS
operations, from mounting to merging.  Again, there are lots of
situations in which you can write into a mounted filesystem (the
protocol for Unix communication could be easily adapted to
communicate with a browser-based editor, for instance), but you
don't want the user to have to bother with an Urbit shell.

Even commands like mounting and merging are easily communicated,
through filesystem writes that any Unix tool (including many
macro editors).

This is very easy for a filesystem watcher.  One such protocol:
if you want to send the daemon a command relative to some
directory, write a `.ur-command` metafile in that directory.  The
daemon accepts the command by deleting it.

The user experience is that you configure your mounts by simply
making the directories and configuring dotfiles in them.  Unlike
in the present system, Urbit will never modify your datas
silently in the background.

Here's what this looks like:

Suppose you want to edit some data in the `%home` desk.  Your
data is in `/=home=/mar/talk`.  You also want a read-only view
of `/=home=/arvo`.

From Unix, you do something like this:

```
  $ cd $pier
  $ mkdir -p home/mar/talk
  $ touch home/mar/talk/.edit
  $ mkdir home/arvo
  $ touch home/arvo/.read
```

Want to commit your changes?  That means merging the working
desk, `%home-bosdut-sigder`, into the `%home`.  Put a commit message
into `home/.commit` and it'll happen.  If there's an error, it
will appear as `.error`.

The mount has a .version file which simply contains the change
number (of the working desk) which any edits are relative to.  If
the urbit daemon is running and watching, edits will be absorbed
quickly (probably after a heuristic timeout), and the version
incremented.  But we always are confident that the edits are
against the latest version, or at least we can use this as a
sanity check.  All kinds of insane things can happen to get a
filesystem out of consistency.

This design obviously needs a little fleshing out, but I'm quite
confident it's a convenient and reliable way to drive `%clay`
from Unix.

## In conclusion

There's obviously a lot of fun here!  There are two things you
can do right now.

One, talk about `%clay` on [this forum
thread](http://urbit.org/~~/fora/posts/~2016.10.25..17.37.47..6937~/) or
on [:talk](http://urbit.org/stream).  Both hosted on Urbit
itself!

Two, poke around the
[code](https://github.com/urbit/arvo/blob/cc-release/arvo/clay.hoon).
Make sure you're on the development branch (`cc-release`).

Phasing in this work will be a fun and interesting challenge.
(My suspicion is that the right first task is the Unix mount.)
Let's talk...
