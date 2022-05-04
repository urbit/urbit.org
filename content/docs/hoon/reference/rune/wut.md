+++
title = "Conditionals ? ('wut')"
weight = 6
template = "doc.html"
aliases = ["docs/reference/hoon-expressions/rune/wut/"]
+++

Hoon has the usual program control branches. It also has the usual logical
operators: AND `?&`, OR `?|`, and NOT `?!`. It also has a `?=` rune that tests
whether a value matches a given type. In the course of type inference, Hoon
learns from `?=` tests in the test condition of [`?:` ("wutcol")](#wutcol)
expressions.

## Overview

All `?` runes reduce to `?:` and/or `?=`.

If the condition of an `?:` is a `?=`, **and** the `?=` is
testing a leg of the subject, the compiler specializes the subject
type for the branches of the `?:`. Branch inference also works
for expressions which expand to `?:`.

The test does not have to be a single `?=`; the compiler can
analyze arbitrary boolean logic ([`?&` ("wutpam")](#wutpam),
[`?|` ("wutbar")](#wutbar), [`?!` ("wutzap")](#wutzap)) with full
short-circuiting. Equality tests ([`.=` ("dottis")](/docs/hoon/reference/rune/dot#dottis)) are **not**
analyzed.

If the compiler detects that the branch is degenerate (only one
side is taken), it fails with an error.

---

## `?|` "wutbar"

Logical OR.

#### Syntax

Variable number of arguments.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?|  p1
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
?|(p1 p2 p3 pn)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
|(p1 p2 p3 pn)
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%wtbr p=(list hoon)]
```

#### Expands to

**Pseudocode**: `a`, `b`, `c`, ... as elements of `p`:

```hoon
?:(a & ?:(b & ?:(c & ?:(... ?:(z & |)))))
```

#### Desugaring

```hoon
|-
?~  p
  |
?:  i.p
  &
$(p t.p)
```

#### Produces

If any argument evaluates to true (`%.y`), true. If all arguments evaluate to
false (`%.n`), false.

#### Examples

```
> |(=(6 42) =(42 42))
%.y

> |(=(6 42) =(42 43))
%.n
```

---

## `?-` "wuthep"

Switch against a union, with no default.

#### Syntax

One fixed argument, then a variable number of pairs.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall style #1</td>
<td>
<pre>
?-  p
  q1a  q1b
  q2a  q2b
  qna  qnb
==
</pre>
</td>
</tr>
<tr>
<td>Tall style #2</td>
<td>
<pre>
?-    p
    q1a
  q1b
::
    q2a
  q2b
::
    qna
  qnb
==
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?-(p q1a q1b, q2a q2b, qna qnb)
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
[%wthp p=wing q=(list (pair spec value))]
```

#### Expands to

**Pseudocode**: `a`, `b`, `c`, ... as elements of `q`:

```hoon
?:  ?=(p.a p)  q.a
?:  ?=(p.b p)  q.b
?:  ?=(p.c p)  q.c
...
~|(%mint-lost !!)
```

#### Desugaring

```hoon
|-
?.  q
  ~|(%mint-lost !!)
?:  ?=(p.i.q p)
  q.i.q
$(q t.q)
```

#### Discussion

The `?-` rune is for a conditional expression in which the type of `p`
determines which branch is taken. Usually the type of `p` is a union of other
types. There is no default branch.

The compiler makes sure that your code neither misses a case of the union, nor
includes a double case that isn't there. This is not special handling for `?-`,
just a consequence of the semantics of `?:`, which `?-` reduces to.

A missing case will throw the `mint-lost` error. An extra case will throw
`mint-vain`.

#### Examples

```
> =cor  |=  vat=?(%a %b)
        ?-  vat
          %a  20
          %b  42
        ==

> (cor %a)
20

> (cor %b)
42

> (cor %c)
! nest-fail
```

---

## `?:` "wutcol" {#wutcol}

Branch on a boolean test.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?:  p
  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?:(p q r)
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
[%wtcl p=hoon q=hoon r=hoon]
```

#### Produces

If `p` produces true (`%.y`), then `q`. If `p` produces false (`%.n`), then `r`.
If `p` is not a boolean, compiler yells at you.

#### Discussion

If test analysis reveals that either branch is never taken, or if `p` is not a
boolean, compilation fails. An untaken branch is indicated with `mint-lost`.

Note also that all other branching expressions reduce to `?:`.

#### Examples

```
> ?:((gth 1 0) 3 4)
3

> ?:  (gth 1 0)
    3
  4
3

> ?:((gth 1 2) 3 4)
4

> ?:  (gth 1 2)
    3
  4
4
```

---

## `?.` "wutdot"

Branch on a boolean test, inverted.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?.  p
  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?.(p q r)
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
[%wtdt p=hoon q=hoon r=hoon]
```

#### Expands to

```hoon
?:(p r q)
```

#### Discussion

`?.` is just like `?:`, but with its last two subexpressions reversed.

As is usual with inverted forms, use `?.` when the true-case expression is much
taller and/or wider than the false-case expression.

#### Examples

```
> ?.((gth 1 2) 3 4)
3

> ?.(?=(%a 'a') %not-a %yup)
%yup

> ?.  %.y
    'this false case is less heavy than the true case'
  ?:  =(2 3)
    'two not equal to 3'
  'but see how \'r is much heavier than \'q?'
'but see how \'r is much heavier than \'q?'
```

---

## `?^` "wutket"

Branch on whether a wing of the subject is a cell.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?^  p
  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?^(p q r)
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
[%wtkt p=wing q=hoon r=hoon]
```

#### Expands to

```hoon
?:(?=(^ p) q r)
```

#### Discussion

The type of the wing, `p`, must not be known to be either an atom or a cell, or
else you'll get a `mint-vain` error at compile time. `mint-vain` means that one
of the `?^` branches, `q` or `r`, is never taken.

#### Examples

```
> ?^(0 1 2)
! mint-vain
! exit

> ?^(`*`0 1 2)
2

> ?^(`*`[1 2] 3 4)
3
```

---

## `?<` "wutgal"

Negative assertion.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?<  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?<(p q)
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
[%wtgl p=hoon q=hoon]
```

#### Expands to

```hoon
?:(p !! q)
```

#### Discussion

`?<` is used to force a crash when some condition `p` doesn't yield false
(`%.n`). It can be used for type inference with the `?=` rune, much like the
`?>` rune.

#### Examples

```
> ?<(=(3 4) %foo)
%foo

> ?<(=(3 3) %foo)
dojo: hoon expression failed

> =a `*`[12 14]

> `^`a
nest-fail

> ?<(?=(@ a) `^`a)
[12 14]
```

---

## `?>` "wutgar"

Positive assertion.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?>  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?>(p q)
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
[%wtgr p=hoon q=hoon]
```

#### Expands to

```hoon
?.(p !! q)
```

#### Discussion

`?>` is used to force a crash when some condition `p` doesn't yield true
(`%.y`). It can be used for type inference, with the `?=` rune, to specify the
type of a value.

#### Examples

```
> ?>(=(3 3) %foo)
%foo

> ?>(=(3 4) %foo)
dojo: hoon expression failed

> =a `*`123

> `@`a
nest-fail

> ?>(?=(@ a) `@`a)
123
```

---

## `?+` "wutlus"

Switch against a union, with a default.

#### Syntax

Two fixed arguments, then a variable number of pairs.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall style #1</td>
<td>
<pre>
?+  p  q
  r1a  r1b
  r2a  r2b
  rna  rnb
==
</pre>
</td>
</tr>
<tr>
<td>Tall style #2</td>
<td>
<pre>
?+    p  q
    r1a
  r1b
::
    r2a
  r2b
::
    rna
  rnb
==
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?+(p q r1a r1b, r2a r2b, rna rnb)
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
[%wtls p=wing q=hoon r=(list (pair spec hoon))]
```

#### Expands to

**Pseudocode**: `a`, `b`, `c`, ... as elements of `r`:

```hoon
?:  ?=(p.a p)  q.a
?:  ?=(p.b p)  q.b
?:  ?=(p.c p)  q.c
...
q
```

#### Desugaring

```hoon
|-
?.  r
  q
?:  ?=(p.i.r p)
  q.i.r
$(r t.r)
```

#### Discussion

The `?+` rune is for a conditional expression in which the type of `p`
determines which branch is taken. Usually the type of `p` is a union of other
types. If `p`'s type doesn't match the case for any given branch, the default
expression, `q`, is evaluated.

If there is a case that is never taken you'll get a `mint-vain` error.

#### Examples

```
> =cor  |=  vat=@tas
        ?+  vat  240
          %a  20
          %b  42
        ==

> (cor %a)
20

> (cor %b)
42

> (cor %c)
240
```

---

## `?&` "wutpam"

Logical AND.

#### Syntax

Variable arguments.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?&  p1
    p2
    pn
==
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?&(p1 p2 pn)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
&(p1 p2 pn)
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%wtpm p=(list hoon)]
```

#### Expands to

**Pseudocode**: `a`, `b`, `c`, ... as elements of `p`:

```hoon
?.(a | ?.(b | ?.(c | ?.(... ?.(z | &)))))
```

#### Desugaring

```hoon
|-
?~  p
  &
?.  i.p
  |
$(p t.p)
```

#### Produces

If ALL arguments evaluate to true (`%.y`), true (`%.y`). If one or more evalute
to false (`%.n`), false (`%.n`).

#### Examples

```
> &(=(6 6) =(42 42))
%.y

> &(=(6 7) =(42 42))
%.n
```

---

## `?@` "wutpat"

Branch on whether a wing of the subject is an atom.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?@  p
  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?@(p q r)
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
[%wtpt p=wing q=hoon r=hoon]
```

#### Expands to

```hoon
?:(?=(@ p) q r)
```

#### Produces

If `p` is an atom, `q`. If `p` is a cell, `r`.

#### Discussion

The type of the wing, `p`, must not be known to be either an atom or a cell, or
else you'll get a `mint-vain` error at compile time. `mint-vain` means that one
of the `?@` branches, `q` or `r`, is never taken.

#### Examples

```
> ?@(0 1 2)
! mint-vain
! exit

> ?@(`*`0 1 2)
1

> ?@(`*`[1 2] 3 4)
4
```

---

## `?~` "wutsig"

Branch on whether a wing of the subject is null.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?~  p
  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?~(p q r)
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
[%wtsg p=wing q=hoon r=hoon]
```

#### Expands to

```hoon
?:(?=($~ p) q r)
```

#### Produces

If `p` is null (`~`), `q`. If `p` is non-null, `r`.

#### Discussion

It's bad style to use `?~` to test for any zero atom. Use it only for a true
null, `~`.

#### Examples

```
> =foo ""

> ?~(foo 1 2)
1
```

---

## `?=` "wuttis"

Test pattern match.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?=  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?=(p q)
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
[%wtts p=spec q=wing]
```

#### Produces

`%.y` (true) if the noun at `q` is in the type of `p`; `%.n` (false) otherwise.

#### Discussion

`?=` is not as powerful as it might seem. For instance, it
can't generate a loop -- you cannot (and should not) use it to
test whether a `*` is a `(list @)`. Nor can it validate atomic
auras.

Patterns should be as weak as possible. Unpack one layer of
union at a time. Don't confirm things the type system knows.

For example, when matching from a tagged union for the type `[%foo p=@ q=[@ @]]`, the appropriate pattern is `[%foo *]`. You have one
question, which is whether the head of the noun is `%foo`.

A common error is `find.$`, meaning `p` is not a type.

#### Examples

```
> =bar [%foo %bar %baz]
> ?=([%foo *] bar)
%.y
```

---

## `?!` "wutzap"

Logical NOT.

#### Syntax

One argument, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
?!  p
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
?!(p)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
!p
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%wtzp p=hoon]
```

#### Expands to

```hoon
.=(| p)
```

#### Produces

The logical NOT of `p`, which must evaluate to either `%.y` or `%.n`.

#### Examples

```
~zod:dojo> ?!(.=(1 2))
%.y

~zod:dojo> !&
%.n

~zod:dojo> !|
%.y

~zod:dojo> !(gth 5 6)
%.y
```
