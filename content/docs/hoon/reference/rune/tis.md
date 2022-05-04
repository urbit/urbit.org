+++
title = "Change Subject = ('tis')"
weight = 5
template = "doc.html"
+++

These runes modify the subject. (Or more precisely, they
evaluate at least one of their subexpressions with a modified subject.)

## Overview

Hoon doesn't have variables in the ordinary sense. If you want to bind a name
to a value, e.g., `a` to `12`, you do so by pinning `12` to the subject and
associating the name with it. This sort of operation is done with the `=`
family of runes.

Let's say you have some old subject `p`. To 'pin' a value to the head means to
modify the subject by repacing it with a cell of `[new-value p]`. The head of
the cell is the new value. So to pin `12` with the face `a` the new subject
would be: `[a=12 p]`.

Of course there are many variations on ways to modify the subject, useful for
different situations. Hence the whole family of `=` runes.

---

## `=>` "tisgar"

Compose two expressions.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=>  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=>(p q)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tsgr p=hoon q=hoon]
```

#### Produces

the product of `q`, with the product of `p` taken as the subject.

#### Examples

```
> =>([a=1 b=2 c=3] b)
2

> =>  9  .
9

> =>((add 2 4) [. .])
[6 6]

> =>
  |%
  ++  foo
    |=  [a=@ b=@]
    [b a]
  --
  (foo 42 27)
[27 42]
```

---

## `=|` "tisbar"

Combine a named noun with the subject by "bunting" (producing the default value)
of a given mold.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=|  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=|(p q)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tsbr p=spec q=hoon]
```

#### Expands to

```hoon
=+(*p q)
```

#### Discussion

The default (or 'bunt') value of `p` is pinned to the head of the subject.
Usually `p` includes a name for ease of reference.

Speaking more loosely, `=|` usually "declares a variable" which is
"uninitialized," presumably because you'll set it in a loop or similar.

#### Examples

```
> =|  a=@ud  a
0

> =|  a=[@t @t @t]  a
['' '' '']
```

---

## `=:` "tiscol"

Change multiple legs in the subject.

#### Syntax

Two arguments: the first a variable number of pairs, the second is fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=:  p1a  p1b
    p2a  p2b
    p3a  p3b
  ==
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=:(p1a p1b, p2a p2b, p3a p3b q)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tscl p=(list (pair wing hoon)) q=hoon]
```

#### Expands to

```hoon
=>(%_(. p) q)
```

#### Discussion

This rune is like `=.`, but for modifying the values of multiple legs of the subject.

#### Examples

```
> =+  a=[b=1 c=2]
  =:  c.a  4
      b.a  3
    ==
  a
[b=3 c=4]
```

---

## `=,` "tiscom"

Expose namespace.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=,  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=,(p q)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tscm p=hoon q=hoon]
```

#### Produces

`p` evaluates to a noun with some namespace. From within `q` you may access
`p`'s names without a wing path (i.e., you can use face `b` rather than `b.p`).

#### Discussion

This is especially useful for calling arms from an imported library core or for
calling arms from a stdlib core repeatedly. For example, JSON reparsers like
`so:dejs:format` and `of:dejs:format` can be called as `so` and `of` after
doing:

```hoon
=,  dejs:format
```

#### Examples

With an imported core:

```
> (sum -7 --7)
-find.sum
dojo: hoon expression failed

> (sum:si -7 --7)
--0

> =,  si  (sum -7 --7)
--0
```

With a dojo-defined face:

```
> =/  fan  [bab=2 baz=[3 qux=4]]
  =,  fan
  [bab qux.baz]
[2 4]
```

---

## `=.` "tisdot"

Change one leg in the subject.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=.  p  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=.(p q r)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tsdt p=wing q=hoon r=hoon]
```

#### Expands to

```hoon
=>(%_(. p q) r)
```

#### Discussion

Technically the `=.` rune doesn't change the subject. It creates a new subject
just like the old one except for a changed value at `p`. Note that the mutation
uses [`%_` ("cencab")](/docs/hoon/reference/rune/cen#cencab), so the type at `p`
doesn't change. Trying to change the value type results in a `nest-fail`.

#### Examples

```
> =+  a=[b=1 c=2]
  =.  b.a  3
  a
[b=3 c=2]

> =+  a=[b=1 c=2]
  =.(b.a 3 a)
[b=3 c=2]

> =+  a=[b=1 c=2]
  =.(b.a "hello" a)
nest-fail
```

---

## `=-` "tishep"

Combine a new noun with the subject, inverted.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=-  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=-(p q)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tshp p=hoon q=hoon]
```

#### Expands to

```hoon
=>([q .] p)
```

#### Discussion

`=-` is just like `=+` but its subexpressions are reversed. `=-` looks better
than `=+` when the expression you're pinning to the subject is much smaller than
the expression that uses it.

#### Examples

```
> =foo  |=  a=@
        =+  b=1
        =-  (add a b c)
        c=2
> (foo 5)
8
```

---

## `=^` "tisket"

Pin the head of a pair; change a leg with the tail.

#### Syntax

Four arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=^  p  q
  r
s
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=^(p q r s)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tskt p=skin q=wing r=hoon s=hoon]
```

#### Expands to

```hoon
=/(p -.r =.(q +.r s))
```

#### Discussion

- `p` is a new name (optionally with type) to pin to the subject.
- `q` is the name of an existing wing of the subject.
- `r` is an expression that produces `[p-value new-q-value]`.
- `s` is some more code to be evaluted against the modified subject.

This is a bit like doing `=/` and `=.` at the same time. It's useful for state
machines, where you want to produce both effects and a new state. For example,
many arms of a Gall agent produce `[effects new-state]` in the form of a `(quip card _this)`. In the `++on-poke` arm, you might have something like:

```hoon
=^  cards  state
  (handle-poke !<(action vase))
[cards this]
```

This may also remind you of Haskell's State monad.

#### Examples

The `og` core is a stateful pseudo-random number generator.
We have to change the core state every time we generate a
random number, so we use `=^`:

```
~zod:dojo> =+  rng=~(. og 420)
           =^  r1  rng  (rads:rng 100)
           =^  r2  rng  (rads:rng 100)
           [r1 r2]
[99 46]
```

---

## `=<` "tisgal"

Compose two expressions, inverted.

#### Syntax

Two arguments, fixed

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=<  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=<(p q)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
p:q
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%tsgl p=hoon q=hoon]
```

#### Expands to

```hoon
=>(q p)
```

#### Discussion

`=<` is just `=>` backwards.

#### Examples

```
> =<(b [a=1 b=2 c=3])
2

> =<  b
  [a=1 b=2 c=3]
2

> b:[a=1 b=2 c=3]
2

> [. .]:(add 2 4)
[6 6]
```

---

## `=+` "tislus"

Combine a new noun with the subject.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=+  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=+(p q)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tsls p=hoon q=hoon]
```

#### Expands to

```hoon
=>([p .] q)
```

#### Discussion

The subject of the `=+` expression, call it `a`, becomes the cell `[p a]` for
the evaluation of `q`. That is, `=+` 'pins a value', `p`, to the head of the
subject.

Loosely speaking, `=+` is the simplest way of "declaring a variable."

#### Examples

```
> =+  42  -
42

> =+  x=42  x
42

> =+  [a='foo' b='bar']  a
'foo'
```

---

## `=;` "tismic"

Combine a named noun with the subject, possibly with type annotation; inverted
order.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=;  p
  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=;(p q r)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tsmc p=skin q=hoon r=hoon]
```

#### Expands to

```hoon
=/(p r q)
```

#### Discussion

`=;` is exactly like `=/` except that the order of its last two subexpressions
is reversed.

#### Examples

```
> =foo  |=  a=@
        =/   b  1
        =;   c=@
          :(add a b c)
        2
> (foo 5)
8
```

---

## `=/` "tisfas"

Combine a named noun with the subject, possibly with type annotation.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=/  p
  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=/(p q r)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tsfs p=skin q=hoon r=hoon]
```

#### Expands to

if `p` is a name, (e.g. `a`):

```hoon
=+(^=(p q) r)
```

if `p` is a name with a type (e.g., `a=@`):

```hoon
=+(^-(p q) r)
```

#### Desugaring

```hoon
?@  p
  =+  p=q
  r
=+  ^-($=(p.p q.p) q)
r
```

#### Discussion

`p` can be either a name or a `name=type`. If it's just a name, `=/` ("tisfas")
"declares a type-inferred variable." If it has a type, `=/` "declares a
type-checked variable."

#### Examples

```
> =/  a=@t  'hello'  a
'hello'

> =/  x  [1 2 3]  x
[1 2 3]

> =foo  |=  a=@
        =/  b  1
        =/  c=@  2
        :(add a b c)
> (foo 5)
8
```

---

## `=~` "tissig"

Compose many expressions.

#### Syntax

Variable number of arguments.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=~  p1
    p2
    p3
    pn
==
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=~(p1 p2 p3 pn)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tssg p=(list hoon)]
```

#### Produces

The product of the chain composition.

#### Examples

```
> =~  10
      [20 .]
      [30 .]
      [40 .]
      .
  ==
[40 30 20 10]

> =~  [sub (mul 3 20) (add 10 20)]
      (sub +)
      +(.)
  ==
31

> =foo =|  n=@
       =<  =~  increment
               increment
               increment
               n
           ==
       |%
       ++  increment
         ..increment(n +(n))
       --
> foo
3
```

---

## `=*` "tistar" {#tistar}

Define a deferred expression.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=*  p
  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=*(p q r)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tstr p=term q=hoon r=hoon]
```

#### Produces

`r`, compiled with a subject in which `p` is a deferred expression for `q`.

#### Discussion

`=*` assigns a name to an expression that will be evaluated in each place the
name is dereferenced. This allows you to "write" through it to the original
subject `axis`. `q` is recorded in the type information of `p`, and `q` is
calculated every time you use `p`.

This rune has some similarities with macros, and some similarities with aliases,
but it is not really either.

This rune is commonly used to give a Gall agent's state the name `state` like:

```hoon
=*  state  -
```

This lets you reference the whole `state` while also being able to reference its
individual elements like `foo` and `bar`, without having to do `foo.state`,
`bar.state`, etc.

#### Examples

```
> =+  a=1
  =*  b  a
  [a b]
[1 1]

> =+  a=1
  =*  b  a
  =.  a  2
  [a b]
[2 2]
```

---

## `=?` "tiswut"

Conditionally change one leg in the subject.

#### Syntax

Four arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
=?  p  q
  r
s
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
=?(p q r s)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

#### AST

```hoon
[%tswt p=wing q=hoon r=hoon s=hoon]
```

#### Expands to

```hoon
=.  p  ?:(q r p)
s
```

#### Discussion

Use `=?` to replace the value of leg `p` with `r` on condition `q`. As
usual, we are not actually mutating the subject, just creating
a new subject with a changed value. The change in value includes a
type check against the old subject; the type of `r` must nest under
the type of `p`.

#### Examples

```
> =a 12

> =?(a =(1 1) 22 a)
22

> =?(a =(1 2) 22 a)
12
```
