+++
title = "Atoms and strings"
weight = 1
template = "doc.html"
aliases = ["docs/reference/hoon-expressions/rune/constants/"]
+++

The simplest expressions in every language are constants:
atoms, strings, paths. (Strings and paths aren't all constants per
se, because they have interpolations.)

## "Cold Atom"

A constant, cold atom.

#### Syntax

Any [warm atom](#warm) form, prefixed with `%`.

#### AST

```hoon
[%rock p=term q=*]
```

#### Discussion

A cold atom is one whose type is inferred to be of a single atom constant.

#### Examples

We can see the contrast with warm atoms by using the compiler parser function,
`ream`:

```
> (ream '%hi')
[%rock p=%tas q=26.984]

> (ream '\'hi\'')
[%sand p=%t q=26.984]

> (ream '%12')
[%rock p=%ud q=12]
```

---

## "Paths"

Path with interpolation.

#### Syntax

`/this/is/a/path`

#### Produces

A null-terminated list of the items, which are either constant `@ta` atoms
(`knots`), or expressions producing a `knot`.

#### Examples

```
> `path`/this/is/a/path
/this/is/a/path

> `path`/this/is/[`@ta`(cat 3 %a- %test)]/path
/this/is/a-test/path

> `path`/this/is/(scot %tas 'test')/path
/this/is/test/path

> /
~
```

---

## "Strings with Interpolation"

Text string with interpolation.

#### Syntax

A [$tape](/docs/hoon/reference/stdlib/2q#tape)

`"abcdefg"`

`"abc{(weld "lmnop" "xyz")}defg"`

```
> "abcdefg"
"abcdefg"

> "abc{(weld "lmnop" "xyz")}defg"
"abclmnopxyzdefg"

> (ream '"abcdefg"')
[%knit p=~[97 98 99 100 101 102 103]]
```

#### AST

```hoon
[%knit p=(list woof)]
```

#### Produces

A tape.

#### Examples

String:

```
> "hello, world."
"hello, world."
```

String with interpolation:

```
> =+(planet="world" "hello, {planet}.")
"hello, world."
```

String with interpolated prettyprinting:

```
> =+(planet=%world "hello, {<planet>}.")
"hello, %world."
```

---

## "Warm Atoms" {#warm}

A constant, warm atom.

#### Syntax

A table of examples:

```
Aura         Meaning                                 Example Literal Syntax
-------------------------------------------------------------------------
@            empty aura
@c           UTF-32                                  ~-~45fed
@d           date
  @da        absolute date                           ~2018.5.14..22.31.46..1435
  @dr        relative date (ie, timespan)            ~h5.m30.s12
@f           Loobean (for compiler, not castable)    &
@i           Internet address
  @if        IPv4 address                            .195.198.143.90
  @is        IPv6 address                            .0.0.0.0.0.1c.c3c6.8f5a
@n           nil (for compiler, not castable)        ~
@p           phonemic base (ship name)               ~sorreg-namtyv
@q           phonemic base, unscrambled              .~litsyn-polbel
@r           IEEE-754 floating-point
  @rh        half precision (16 bits)                .~~3.14
  @rs        single precision (32 bits)              .6.022141e23
  @rd        double precision (64 bits)              .~6.02214085774e23
  @rq        quad precision (128 bits)               .~~~6.02214085774e23
@s           signed integer, sign bit low
  @sb        signed binary                           --0b11.1000
  @sd        signed decimal                          --1.000.056
  @sv        signed base32                           -0v1df64.49beg
  @sw        signed base64                           --0wbnC.8haTg
  @sx        signed hexadecimal                      -0x5f5.e138
@t           UTF-8 text (cord)                       'howdy'
  @ta        ASCII text (knot)                       ~.howdy
    @tas     ASCII text symbol (term)                %howdy
@u              unsigned integer
  @ub           unsigned binary                      0b11.1000
  @ud           unsigned decimal                     1.000.056
  @uv           unsigned base32                      0v1df64.49beg
  @uw           unsigned base64                      0wbnC.8haTg
  @ux           unsigned hexadecimal                 0x5f5.e138
```

#### AST

```hoon
[%sand p=term q=*]
```

#### Discussion

A 'warm' atom is one whose type is inferred to be general, i.e., not just a
single atom type.

```
> `@`12
12

> `%12`12
nest-fail
```

#### Produces

A warm (variable) atom `q` with aura `p`. Use the Hoon compiler parser function
`ream` to take a closer look:

```
> (ream '12')
[%sand p=%ud q=12]

> (ream '\'Hello!\'')
[%sand p=%t q=36.762.444.129.608]
```
