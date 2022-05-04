+++
title = "Casts ^ ('ket')"
weight = 11
template = "doc.html"
aliases = ["docs/reference/hoon-expressions/rune/ket/"]
+++

[`^-` ("kethep")](#kethep), [`^+` ("ketlus")](#ketlus), and [`^=`
("kettis")](#kettis) let us adjust types without violating type constraints.

The `nest` algorithm which tests subtyping is conservative; it never allows
invalid nests, it sometimes rejects valid nests.

## `^|` "ketbar"

Convert a gold core to an iron core (contravariant).

#### Syntax

One argument, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
^|  p
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
^|(p)
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
[%ktbr p=hoon]
```

#### Produces

`p` as an iron core; crash if not a gold core.

#### Discussion

An iron core is an opaque function (gate or door).

Theorem: if type `x` nests within type `a`, and type `y` nests
within type `b`, a core accepting `b` and producing `x` nests
within a iron core accepting `y` and producing `a`.

Informally, a function fits an interface if the function has a
more specific result and/or a less specific argument than the
interface.

#### Examples

The prettyprinter shows the core metal (`.` gold, `|` iron):

```
~zod:dojo> |=(@ 1)
<1.gcq [@  @n <250.yur 41.wda 374.hzt 100.kzl 1.ypj %151>]>

~zod:dojo> ^|(|=(@ 1))
<1|gcq [@  @n <250.yur 41.wda 374.hzt 100.kzl 1.ypj %151>]>
```

---

## `^:` "ketcol"

Mold gate for type `p`.

**Note this rune is now redundant.**

#### Syntax

One argument, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
^:  p
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
^:(p)
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
[%ktcl p=spec]
```

#### Produces

A gate that returns the sample value if it's of the correct type, but crashes
otherwise.

#### Discussion

`^:` is used to produce a mold that crashes if its sample is of the wrong type.

Molds used to produced their bunt value if they couldn't mold their sample. This
is no longer the case: molds now crash if molding fails, so **this rune is
redundant**.

One may expect that `^:(path /foo)` would result in a syntax error since `^:`
only takes one child, but instead it will parse as `=< ^ %:(path /foo)`. Since
`:` is the irregular syntax for `=<` this is is parsed as "get `^` (i.e. the
mold for cells) from a subject of `(path /foo)`", with `:` being the irregular
syntax for `=<`.

#### Examples

```
> ^:  @
< 1.goa
  { *
    {our/@p now/@da eny/@uvJ}
    <19.hqf 23.byz 5.mzd 36.apb 119.zmz 238.ipu 51.mcd 93.glm 74.dbd 1.qct $141>
  }
>

> (^:(@) 22)
22

> (^:(@) [22 33])
ford: %ride failed to execute:
```

---

## `^.` "ketdot"

Typecast on value produced by passing `q` to `p`.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
^.  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
^.(p q)
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
[%ktdt p=hoon q=hoon]
```

#### Expands to

```hoon
^+(%:(p q) q)
```

#### Discussion

`p` produces a gate and q is any Hoon expression.

`^.` is particularly useful when `p` is a gate that 'cleans up' the type information about some piece of data. For example, `limo` is used to turn a raw noun of the appropriate shape into a genuine list. Hence we can use `^.` to cast with `limo` and similar gates, ensuring that the product has the desired type.

#### Examples

```
> =mylist [11 22 33 ~]

> ?~(mylist ~ i.mylist)
mint-vain

> =mylist ^.(limo mylist)

> ?~(mylist ~ i.mylist)
11

> ?~(mylist ~ t.mylist)
~[22 33]
```

---

## `^-` "kethep"

Typecast by explicit type label.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
^-  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
^-(p q)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
`p`q
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%kthp p=spec q=hoon]
```

#### Expands to

```hoon
^+(^*(p) q)
```

#### Discussion

It's a good practice to put a `^-` ("kethep") at the top of every arm
(including gates, loops, etc). This cast is strictly necessary
only in the presence of head recursion (otherwise you'll get a
`rest-loop` error, or if you really screw up spectacularly an
infinite loop in the compiler).

#### Examples

```
~zod:dojo> (add 90 7)
97

~zod:dojo> `@t`(add 90 7)
'a'

~zod:dojo> ^-(@t (add 90 7))
'a'

/~zod:dojo> =foo  |=  a=@tas
                  ^-  (unit @ta)
                  `a

/~zod:dojo> (foo 97)
[~ ~.a]
```

## `^+` "ketlus"

Typecast by inferred type.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
^+  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
^+(p q)
</pre>
</td>
</tr>
<tr><td>Irregular</td><td>None.</td></tr>
</table>

#### AST

```hoon
[%ktls p=hoon q=hoon]
```

#### Produces

The value of `q` with the type of `p`, if the type of `q` nests within the type
of `p`. Otherwise, `nest-fail`.

#### Examples

```
~zod:dojo> ^+('text' %a)
'a'
```

---

## `^&` "ketpam"

Convert a core to a zinc core (covariant).

#### Syntax

One argument, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
^&  p
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
^&(p)
</pre>
</td>
</tr>
<tr><td>Irregular</td><td>None.</td></tr>
</table>

#### AST

```hoon
[%ktpm p=hoon]
```

#### Produces

`p` as a zinc core; crash if `p` isn't a gold or zinc core.

#### Discussion

A zinc core has a read-only sample and an opaque context. See [Advanced types](/docs/hoon/reference/advanced).

#### Examples

The prettyprinter shows the core metal in the arm labels `1.xoz` and `1&xoz`
below (`.` is gold, `&` is zinc):

```
> |=(@ 1)
< 1.xoz
  { @
    {our/@p now/@da eny/@uvJ}
    <19.hqf 23.byz 5.mzd 36.apb 119.zmz 238.ipu 51.mcd 93.glm 74.dbd 1.qct $141>
  }
>

> ^&(|=(@ 1))
< 1&xoz
  { @
    {our/@p now/@da eny/@uvJ}
    <19.hqf 23.byz 5.mzd 36.apb 119.zmz 238.ipu 51.mcd 93.glm 74.dbd 1.qct $141>
  }
>
```

You can read from the sample of a zinc core, but not change it:

```
> =mycore ^&(|=(a=@ 1))

> a.mycore
0

> mycore(a 22)
-tack.a
-find.a
ford: %slim failed:
ford: %ride failed to compute type:
```

---

## `^~` "ketsig"

Fold constant at compile time.

#### Syntax

One argument, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
^~  p
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
^~(p)
</pre>
</td>
</tr>
<tr><td>Irregular</td><td>None.</td></tr>
</table>

#### AST

```hoon
[%ktsg p=hoon]
```

#### Produces

`p`, folded as a constant if possible.

#### Examples

```
> (make '|-(42)')
[%8 p=[%1 p=[1 42]] q=[%9 p=2 q=[%0 p=1]]]

> (make '^~(|-(42))')
[%1 p=42]
```

---

## `^*` "kettar"

Produce example type value.

#### Syntax

One argument, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
^*  p
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
^*(p)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
*p
</pre>
</td>
</tr>
</table>

`p` is any structure expression.

#### AST

```hoon
[%kttr p=spec]
```

#### Produces

A default value (i.e., 'bunt value') of the type `p`.

#### Examples

Regular:

```
> ^*  @
0

> ^*  %baz
%baz

> ^*  ^
[0 0]

> ^*  ?
%.y
```

Irregular:

```
> *@
0

> *^
[0 0]

> *tape
""
```

---

## `^=` "kettis"

Bind name to a value.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
^=  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
^=(p q)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>
<pre>
p=q
</pre>
</td>
</tr>
</table>

#### AST

```hoon
[%ktts p=skin q=hoon]
```

#### Produces

If `p` is a term, the product `q` with type `[%face p q]`. `p` may also be a
tuple of terms, or a term-skin pair; the type of `q` must divide evenly into
cells to match it.

#### Examples

```
> a=1
a=1

> ^=  a
  1
a=1

> ^=(a 1)
a=1

> [b c d]=[1 2 3 4]
[b=1 c=2 d=[3 4]]

> [b c d=[x y]]=[1 2 3 4]
[b=1 c=2 d=[x=3 y=4]]
```

---

## `^?` "ketwut"

Convert any core to a lead core (bivariant).

#### Syntax

One argument, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
^?  p
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
^?(p)
</pre>
</td>
</tr>
<tr><td>Irregular</td><td>None.</td></tr>
</table>

#### AST

```hoon
[%ktwt p=hoon]
```

#### Produces

`p` as a lead core; crash if not a core.

#### Discussion

A lead core is an opaque generator; the payload can't be read or
written.

Theorem: if type `x` nests within type `a`, a lead core producing
`x` nests within a lead core producing `a`.

Informally, a more specific generator can be used as a less
specific generator.

#### Examples

The prettyprinter shows the core metal (`.` gold, `?` lead):

```
> |=(@ 1)
<1.gcq [@  @n <250.yur 41.wda 374.hzt 100.kzl 1.ypj %151>]>

> ^?(|=(@ 1))
<1?gcq [@  @n <250.yur 41.wda 374.hzt 100.kzl 1.ypj %151>]>
```
