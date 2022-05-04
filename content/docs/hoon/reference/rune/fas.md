+++
title = "Imports / ('fas')"
weight = 15
template = "doc.html"
+++

Fas (`/`) runes are not technically hoon runes, but instead are instructions to
Arvo's build system. In the past, the build system was its own vane called
[Ford](/docs/arvo/ford/ford). Ford has since been merged into the filesystem
vane [Clay](/docs/arvo/clay/clay), but these are still referred to as "Ford
runes".

Ford runes are used at the top of a hoon file, and they typically specify
imports.

## `/-` "fashep"

Import structure libraries from `/sur`.

#### Syntax

```hoon
/-  foo, bar, baz
```

Note there is only a single space between each item.

#### Semantics

Names correspond to files in the `/sur` directory of the same desk as this file, e.g.
`/sur/foo.hoon` for `foo`. Names containing hyphens, e.g. `foo-abc`, will first
resolve to `/sur/foo-abc.hoon`, and if that doesn't exist, it will try
`/sur/foo/abc.hoon`.

Imports may be given a different face by doing `xyz=foo`. Imports may have their
face stripped (so you can directly reference their wings) with `*foo`.

---

## `/+` "faslus"

Import libraries from `/lib`.

#### Syntax

```hoon
/+  foo, bar, baz
```

Note there is only a single space between each item.

#### Semantics

Names correspond to files in the `/lib` directory of the same desk as this file,
e.g. `/lib/foo.hoon` for `foo`. Names containing hyphens, e.g. `foo-abc`, will
first resolve to `/lib/foo-abc.hoon`, and if that doesn't exist, it will try
`/lib/foo/abc.hoon`.

Imports may be given a different face by doing `xyz=foo`. Imports may have their
face stripped (so you can directly reference their wings) with `*foo`.

---

## `/=` "fastis"

Build and import a hoon file at the specified path.

#### Syntax

Two arguments.

```hoon
/=  some-face  /path/to/file
```

#### Semantics

This lets you build and import a hoon file from anywhere in the desk.

The first argument is the face to pin it as. The second argument is the path to
the file in the same desk as this file. The file must be a `%hoon` file, and the
trailing mark (`hoon`) must be omitted from the path.

#### Examples

To build and import `/foo/bar.hoon` you would do:

```hoon
/=  foobar  /foo/bar
```

---

## `/*` "fastar"

Import the file at the specified path as the specified mark.

#### Syntax

Three arguments.

```hoon
/*  some-face  %as-mark  /path/to/file
```

#### Semantics

The first argument is the face to pin it as. The second argument is the mark it
should be converted to. The third argument is the path to the file in the same
desk as this file, with the trailing mark included.

The mark specified may be different to the mark of the file, as long as
conversion is possible. Note that a `%hoon` file will not be built like with
`/=`: the type of a `%hoon` file is a `@t` so that is what will be pinned.

#### Examples

To import `/foo/bar.hoon` you would do:

```hoon
/*  foobar  %hoon  /foo/bar/hoon
```

`foobar` would then be an `@t` of the contents of that file.

---

## `/$` "fasbuc"

Import mark conversion gate.

#### Syntax

Three arguments.

```hoon
/$  some-face   %from-mark   %to-mark
```

#### Semantics

The first argument is the face to pin it as. The second argument is the mark to
convert _from_. The third argument is the mark to convert _to_.

The result will be a gate of `$-(type-1 type-2)`, pinned with the specified
face. The types are the data types of the _from_ mark and _to_ mark,
respectively.

The mark conversion gate will be built from marks in `/mar` on the same desk as
this file.

#### Examples

To build a mark conversion gate from `%txt` to `%mime`, you would do:

```hoon
/$  txt-to-mime  %txt  %mime
```

`txt-to-mime` would be a gate of `$-(wain mime)`. You could then call the gate
like:

```
> (txt-to-mime ~['first line' 'second line'])
[p=/text/plain q=[p=22 q=37.949.953.370.267.411.298.483.129.707.945.775.026.849.432.323.909.990]]
```

---

## `/~` "fassig"

Import, build, evaluate and pin the results of many hoon files in a directory.

#### Syntax

Three arguments.

```hoon
/~  some-face  some-type  /some/directory
```

#### Semantics

The first argument is the face to pin the results with. The second argument is
the type each hoon file produces when evaluated. The third argument is the path
to a directory in the same desk as this file, containing `%hoon` files.

Each hoon file in the specified directory will be built and evalutated. The
result of evaluating each file will be added to a
[`++map`](/docs/hoon/reference/stdlib/2o#map) and pinned with the specified face
(`some-face`). The keys of the map will be the name of each file, and the values
of the map will be the result of evaluating each file and casting its result to
the type specified (`some-type`).

All of the hoon files in the specified directory, when evaluated, must produce
data of a type that nests under the type specified (`some-type`). File with a
mark other than `%hoon` will be ignored.

The type of the map will be `(map knot some-type)`.

#### Examples

If the `/foo/bar` directory contains three files:

- `x.hoon` containing `(silt ~[1 2 3 4 5])`
- `y.hoon` containing `(silt ~[99 100])`
- `z.hoon` containing `(silt ~[22 33 44])`

Then the following `/~` expression:

```hoon
/~  foo  (set @ud)  /foo/bar
```

...will pin a `(map knot (set @ud))` with a face of `foo` which contains:

```
{[p=~.y q={100 99}] [p=~.z q={22 33 44}] [p=~.x q={5 1 2 3 4}]}
```

---

## `/%` "fascen"

Build and import a mark core.

#### Syntax

Two arguments.

```hoon
/%  some-face  %some-mark
```

#### Semantics

The first argument is a face to pin the mark core with. The second argument is a
mark.

The static mark core (a `nave:clay`) for the specified mark (which resides in
the same desk as the file) is built and pinned to the subject with the specified
face.

#### Examples

To build the mark core for the `%txt` mark:

```hoon
/%  foo  %txt
```

Its arms can then be accessed like:

```
> form:foo
%txt-diff
```
