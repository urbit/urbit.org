+++
title = "Cells : ('col')"
weight = 9
template = "doc.html"
aliases = ["docs/reference/hoon-expressions/rune/col/"]
+++

The `:` ("col") expressions are used to produce cells, which are pairs of
values. E.g., `:-(p q)` produces the cell `[p q]`. All `:` runes reduce to `:-`.

## `:-` "colhep"

Construct a cell (2-tuple).

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
:-  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
:-(p q)
</pre>
</td>
</tr>
<tr>
<td>Irregular #1</td>
<td>
<pre>
[p q]
</pre>
</td>
</tr>
<tr>
<td>Irregular #2</td>
<td>
<pre>
p^q
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%clhp p=hoon q=hoon]
```

#### Produces

The cell of `p` and `q`.

#### Discussion

Hoon expressions actually use the same "autocons" pattern as Nock
formulas. If you're assembling expressions (which usually only the
compiler does), `[a b]` is the same as `:-(a b)`.

#### Examples

```
> :-(1 2)
[1 2]

~zod:dojo> 1^2
[1 2]
```

---

## `:_` "colcab"

Construct a cell, inverted.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
:_  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
:_(p q)
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
[%clcb p=hoon q=hoon]
```

#### Expands to

```hoon
:-(q p)
```

#### Examples

```
> :_(1 2)
[2 1]
```

---

## `:+` "collus"

Construct a triple (3-tuple).

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
:+  p
  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
:+(p q r)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
[p q r]
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%clls p=hoon q=hoon r=hoon]
```

#### Expands to:

```hoon
:-(p :-(q r))
```

#### Examples

```
> :+  1
    2
  3
[1 2 3]

> :+(%a ~ 'b')
[%a ~ 'b']
```

---

## `:^` "colket"

Construct a quadruple (4-tuple).

#### Syntax

Four arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
:^    p
    q
  r
s
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
:^(p q r s)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
[p q r s]
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%clkt p=hoon q=hoon r=hoon s=hoon]
```

#### Expands to

```hoon
:-(p :-(q :-(r s)))
```

#### Examples

```
> :^(1 2 3 4)
[1 2 3 4]

> :^    5
      6
    7
  8
[5 6 7 8]
```

---

## `:*` "coltar"

Construct an n-tuple.

#### Syntax

Variable number of arguments.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
:*  p1
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
:*(p1 p2 p3 pn)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
[p1 p2 p3 pn]
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%cltr p=(list hoon)]
```

#### Expands to

**Pseudocode**: `a`, `b`, `c`, ... as elements of `p`:

```hoon
:-(a :-(b :-(c :-(... z)))))
```

#### Desugaring

```hoon
|-
?~  p
  !!
?~  t.p
  i.p
:-  i.p
$(p t.p)
```

#### Examples

```
> :*(5 3 4 1 4 9 0 ~ 'a')
[5 3 4 1 4 9 0 ~ 'a']

> [5 3 4 1 4 9 0 ~ 'a']
[5 3 4 1 4 9 0 ~ 'a']

> :*  5
      3
      4
      1
      4
      9
      0
      ~
      'a'
  ==
[5 3 4 1 4 9 0 ~ 'a']
```

---

## `:~` "colsig"

Construct a null-terminated list.

#### Syntax

Variable number of arguments.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
:~  p1
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
:~(p1 p2 p3 pn)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
~[p1 p2 p3 pn]
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%clsg p=(list hoon)]
```

#### Expands to

**Pseudocode**: `a`, `b`, `c`, ... as elements of `p`:

```hoon
:-(a :-(b :-(c :-(... :-(z ~)))))
```

#### Desugaring

```hoon
|-
?~  p
  ~
:-  i.p
$(p t.p)
```

#### Discussion

Note that this does not produce a `list` type, it just produces a
null-terminated n-tuple. To make it a proper `list` it must be cast or molded.

#### Examples

```
> :~(5 3 4 2 1)
[5 3 4 2 1 ~]

> ~[5 3 4 2 1]
[5 3 4 2 1 ~]

> :~  5
      3
      4
      2
      1
  ==
[5 3 4 2 1 ~]
```

---

## `::` "colcol"

Code comment.

#### Syntax

```hoon
::  any text you like!
```

#### Examples

```hoon
::
::  this is commented code
::
|=  a=@         ::  a gate
(add 2 a)       ::  that adds 2
                ::  to the input
```
