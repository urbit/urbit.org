+++
title = "Calls % ('cen')"
weight = 10
template = "doc.html"
aliases = ["docs/reference/hoon-expressions/rune/cen/"]
+++

The `%` family of runes is used for making 'function calls' in Hoon. To be more
precise, these runes evaluate the `$` arm in cores, usually after modifying the
sample. (The default sample is replaced with the input values given in the
call.)

These runes reduce to the `%=` rune.

## `%_` "cencab"

Resolve a wing with changes, preserving type.

#### Syntax

One fixed argument, then a variable number of pairs.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall style #1</td>
<td>
<pre>
%_  a=wing
  b=wing  c=hoon
  d=wing  e=hoon
  f=wing  g=hoon
==
</pre>
</td>
</tr>
<tr>
<td>Tall style #2</td>
<td>
<pre>
%_    a=wing
    b=wing
  c=hoon
::
    d=wing
  e=hoon
::
    f=wing
  g=hoon
==
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
%_(a=wing b=wing c=hoon, d=wing e=hoon, ...)
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
[%cncb p=wing q=(list (pair wing hoon))]
```

#### Expands to

```hoon
^+(a %=(a b c, d e, ...))
```

#### Semantics

A `%_` expression resolves to the value of the subject at wing `a`, but modified
according to a series of changes: `b` is replaced with the product of `c`, `d`
with the product of `e`, and so on. At compile time a type check is performed to
ensure that the resulting value is of the same type as `a`.

#### Discussion

`%_` is different from `%=` because `%=` can change the type of a wing with
mutations. `%_` preserves the wing type.

See [how wings are resolved](/docs/hoon/reference/limbs/).

#### Examples

```
> =foo [p=42 q=6]

> foo(p %baz)
[p=%baz q=6]

> foo(p [55 99])
[p=[55 99] q=6]

> %_(foo p %baz)
[p=7.496.034 99]

> %_(foo p [55 99])
! nest-fail
```

---

## `%:` "cencol"

Call a gate with many arguments.

#### Syntax

One fixed argument, then a variable number of arguments.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
%:  a=hoon
  b=hoon
  c=hoon
   ...
  d=hoon
==
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
%:(a b c d)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
(a b c d)
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%cncl p=hoon q=(list hoon)]
```

#### Semantics

A `%:` expression calls a gate with many arguments. `a` is the gate to be
called, and `b` through `d` are the arguments. If there is only one
subexpression after `a`, its product is the sample. Otherwise, a single argument
is constructed by evaluating all of `b` through `d` -- however many
subexpressions there are -- and putting the result in a cell: `[b c ... d]`.

#### Discussion

When `%:` is used in tall-form syntax, the series of expressions after `p` must be terminated with `==`.

#### Examples

```
> %:  add  22  33  ==
55

> =adder |=  a=*
         =+  c=0
         |-
         ?@  a  (add a c)
         ?^  -.a  !!
         $(c (add -.a c), a +.a)

> %:  adder  22  33  44  ==
99

> %:  adder  22  33  44  55  ==
154

> %:(adder 22 33 44)
99

> (adder 22 33 44)
99
```

---

## `%.` "cendot"

Call a gate (function), inverted.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
%.  a  b
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
%.(a b)
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
[%cndt p=hoon q=hoon]
```

#### Semantics

The `%.` rune is for evaluating the `$` arm of a gate, i.e., calling a function.
`a` is for the desired sample value (i.e., input value), and `b` is the gate.

#### Expands to

```hoon
%-(b=hoon a=hoon)
```

#### Discussion

`%.` is just like `%-`, but with its subexpressions reversed; the argument comes
first, and then the gate.

#### Examples

```
> =add-triple |=([a=@ b=@ c=@] :(add a b c))

> %.([1 2 3] add-triple)
6
```

---

## `%-` "cenhep" {#cenhep}

Call a gate (function).

#### Syntax

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
%-  a
b
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
%-(a b)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
(a b)
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%cnhp p=hoon q=hoon]
```

#### Semantics

This rune is for evaluating the `$` arm of a gate, i.e., calling a gate as a
function. `a` is the gate, and `b` is the desired sample value (i.e., input
value) for the gate.

#### Expands to

```hoon
%~($ a b)
```

#### Discussion

`%-` is used to call a function; `a` is the function
([`gate`](/docs/hoon/reference/rune/bar#bartis), `q` the argument. `%-` is a
special case of [`%~` ("censig")](#censig), and a gate is a special case of a
[door](/docs/hoon/reference/rune/bar#barcab).

#### Examples

```
> =add-triple |=([a=@ b=@ c=@] :(add a b c))

> (add-triple 1 2 3)
6

> %-(add-triple [1 2 3])
6
```

---

## `%^` "cenket"

Call gate with triple sample.

#### Syntax

Four arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
%^    a
    b
  c
d
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
%^(a b c d)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
(a b c d)
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%cnkt p=hoon q=hoon r=hoon s=hoon]
```

#### Expands to

```hoon
%-(a=hoon [b=hoon c=hoon d=hoon])
```

#### Examples

```
> =add-triple |=([a=@ b=@ c=@] :(add a b c))

> %^(add-triple 1 2 3)
6
```

---

## `%+` "cenlus"

Call gate with a cell sample.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
%+  a
  b
c
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
%+(a b c)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
(a b c)
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%cnls p=hoon q=hoon r=hoon]
```

#### Semantics

A `%+` expression is for calling a gate with a cell sample. `a` is the gate to
be called, `b` is for the head of the sample, and `c` is for the sample tail.

#### Expands to

```hoon
%-(a=hoon [b=hoon c=hoon])
```

#### Examples

```
> =add-triple |=([a=@ b=@ c=@] :(add a b c))

> %+(add-triple 1 [2 3])
6
```

---

## `%~` "censig"

Evaluate an arm in a door.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
%~  p  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
%~(p q r)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
~(p q r1 r2 rn)
</pre>
</td>
</tr>
</table>

In the irregular form, `r` may be split into multiple parts. Multiple parts of
`r` will be formed into a cell.

#### Semantics

A `%~` expression evaluates the arm of a door (i.e., a core with a sample). `a`
is a wing that resolves to the arm from within the door in question. `b` is the
door itself. `c` is the sample of the door.

#### Discussion

`%~` is the general case of a function call, `%-`. In both, we replace the sample (`+6`) of a core. In `%-` the core is a gate and the `$` arm is evaluated. In `%~` the core is a door and any arm may be evaluated. You must identify the arm to be run: `%~(arm door arg)`.

See also [`|_`](/docs/hoon/reference/rune/bar#barcab).

#### Examples

```
> =mycore |_  a=@
          ++  plus-two  (add 2 a)
          ++  double  (mul 2 a)
          --

> ~(plus-two mycore 10)
12

> ~(double mycore 10)
20
```

---

## `%*` "centar"

Evaluate an expression, then resolve a wing with changes.

#### Syntax

Two fixed arguments, then a variable number of pairs.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall style #1</td>
<td>
<pre>
%*  a=wing  b=hoon
  c=wing  d=hoon
  e=wing  f=hoon
       ...
  g=wing  h=hoon
==
</pre>
</td>
</tr>
<tr>
<td>Tall style #2</td>
<td>
<pre>
%*    a=wing  b=hoon
    c=wing
  d=hoon
::
    e=wing
  f=hoon
::
    g=wing
  h=hoon
==
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
%*(a b c d, e f, g h)
</pre>
</td>
</tr>
<tr><td>Irregular</td><td>None.</td></tr>
</table>

#### AST

```hoon
[%cntr p=wing q=hoon r=(list (pair wing hoon))]
```

#### Semantics

A `%*` expression evaluates some arbitrary Hoon expression, `b`, and then
resolves a wing of that result, with changes. `a` is the wing to be resolved,
and one or more changes is defined by the subexpressions after `b`.

#### Expands to

```hoon
=+  b=hoon
%=  a=wing
  c=wing  d=hoon
  e=wing  f=hoon
       ...
  g=wing  h=hoon
==
```

#### Examples

```
> %*($ add a 2, b 3)
5

> %*(b [a=[12 14] b=[c=12 d=44]] c 11)
[c=11 d=44]

> %*(b [a=[12 14] b=[c=12 d=44]] c 11, d 33)
[c=11 d=33]

> =foo [a=1 b=2 c=3 d=4]

> %*(+ foo c %hello, d %world)
[b=2 c=%hello d=%world]

> =+(foo=[a=1 b=2 c=3] foo(b 7, c 10))
[a=1 b=7 c=10]

> %*(foo [foo=[a=1 b=2 c=3]] b 7, c 10)
[a=1 b=7 c=10]
```

---

## `%=` "centis"

Resolve a wing with changes.

#### Syntax

One fixed argument, then a variable number of pairs.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall style #1</td>
<td>
<pre>
%=  a=wing
  b=wing  c=hoon
  d=wing  e=hoon
       ...
  f=wing  g=hoon
==
</pre>
</td>
</tr>
<tr>
<td>Tall style #2</td>
<td>
<pre>
%=    a=wing
    b=wing
  c=hoon
::
    d=wing
  e=hoon
::
    f=wing
  g=hoon
==
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
%=(a b c, d e, f g)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
a(b c, d e, f g)
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%cnts p=wing q=(list (pair wing hoon))]
```

#### Semantics

A `%=` expression resolves a wing of the subject, but with changes made.

If `a` resolves to a leg, a series of changes are made to wings of that leg
(`b`, `d`, and `f` above are replaced with the respective products of `c`, `e`,
and `g` above). The modified leg is returned.

If `a` resolves to an arm, a series of changes are made to wings of the parent
core of that arm. (Again, `b`, `d`, and `f` are replaced with the respective
products of `c`, `e`, and `g`.) The arm is computed with the modified core as
the subject, and the product is returned.

#### Discussion

Note that `a` is a wing, not just any expression. Knowing that a function call
`(foo baz)` involves evaluating `foo`, replacing its sample at slot `+6` with
`baz`, and then resolving to the `$` limb, you might think `(foo baz)` would
mean `%=(foo +6 baz)`.

But it's actually `=+(foo =>(%=(+2 +6 baz) $))`. Even if `foo` is a wing, we
would just be mutating `+6` within the core that defines the `foo` arm. Instead
we want to modify the **product** of `foo` -- the gate -- so we have to pin it
into the subject.

Here's that again in tall form:

```hoon
=+  foo
=>  %=  +2
      +6  baz
    ==
  $
```

#### Examples

```
> =foo [p=5 q=6]

> foo(p 42)
[p=42 q=6]

> foo(+3 99)
[p=5 99]
```
