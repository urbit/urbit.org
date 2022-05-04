+++
title = "Hints ~ ('sig')"
weight = 14
template = "doc.html"
+++

Runes that use Nock `11` to pass non-semantic info to the interpreter. A
mnemonic to remember what sig runes are for is "we're *sig*naling some
information to the interpreter".

## `~>` "siggar"

Raw hint, applied to computation.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~>  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~>(p q)
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
[%sggr p=$@(term [p=term q=hoon]) q=hoon]
```

#### Expands to

`q`.

#### Semantics

`p` may either be a single `%term` or a pair of `[term hoon]`, the latter of
which may optionally be be written `%foo.some-hoon`. `p` will be passed to the
interpreter and `q` will be evaluated and its result produced like normal.

#### Discussion

Hoon has no way of telling what hints are used and what aren't.
Hints are all conventions at the interpreter level.

#### Examples

```
> ~>(%a 42)
42
```

Running the compiler:

```
> (make '~>(%a 42)')
[%11 p=97 q=[%1 p=42]]

> (make '~>(%a.+(2) 42)')
[%11 p=[p=97 q=[%4 p=[%1 p=2]]] q=[%1 p=42]]
```

---

## `~|` "sigbar"

Tracing printf.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~|  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~|(p q)
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
[%sgbr p=hoon q=hoon]
```

#### Expands to

`q`.

#### Convention

Prettyprints `p` in stack trace if `q` crashes.

#### Examples

```
> ~|('sample error message' !!)
'sample error message'
dojo: hoon expression failed

> ~|  'sample error message'
  !!
'sample error message'
dojo: hoon expression failed
```

---

## `~$` "sigbuc"

Profiling hit counter.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~&  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~&(p q)
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
[%sgbc p=term q=hoon]
```

#### Expands to

`q`.

#### Discussion

If profiling is on, adds 1 to the hit counter `p`, which is a `term` like
`%foo`. Profiling is enabled by passing the `-P` flag to the `urbit` binary.
Profiling results are saved in `/path/to/pier/.urb/put/profile/~some.date.txt`.

#### Examples

```
> ~$(%foo 3)
3
```

Assuming we have the binary running with the `-P` flag, if we do this:

```
> =z |=  a=@
     ?:  =(a 0)
       a
     ~$  %my-hit-counter
     $(a (dec a))

> (z 42)
0
```

...then look in `/path/to/pier/.urb/put/profile/~some.date.txt`, we'll see this
line near the top of the file:

```
my-hit-counter: 42
```

---

## `~_` "sigcab"

User-formatted tracing printf.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~_  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~_(p q)
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
[%sgcb p=hoon q=hoon]
```

#### Expands to

`q`.

#### Convention

Shows `p` in stacktrace if `q` crashes.

#### Discussion

`p` must produce a `tank` (pretty-print source).

#### Examples

```
> ~_([%leaf "sample error message"] !!)
sample error message
dojo: hoon expression failed

> ~_  [%leaf "sample error message"]
  !!
sample error message
dojo: hoon expression failed
```

---

## `~%` "sigcen"

Jet registration.

#### Syntax

Four arguments. Two fixed arguments, then a third which may be `~` if empty or
else a variable number of pairs sandwiched between two `==`s, then a fourth
fixed argument.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~%  p  q
  ==
    r1a  r1b
    r2a  r2b
    rna  rnb
  ==
s
</pre>
</td>
</tr>
<tr><td>Wide</td><td>None.</td></tr>
<tr><td>Irregular</td><td>None.</td></tr>
</table>

#### AST

```hoon
[%sgcn p=chum q=hoon r=tyre s=hoon]
```

#### Expands to

`s`.

#### Convention

Register a core with name `p`, with parent at leg `q`, exporting
the named formulas `r`, constructed by `s`.

#### Discussion

`~%` is for registering cores. A registered core declares its
formal identity to the interpreter, which may or may not be able
to recognize and/or accelerate it.

Registered cores are organized in a containment hierarchy.
The parent core is at any leg within the child core. When we
register a core, we state the leg to its parent, in the form of
wing `q`. We assume the parent is already registered -- as it
must be, if (a) we registered it on creation, (b) the child was
created by an arm defined on the parent.

(Cores are actually managed by their formula/battery. Any
function call will create a new core with a new sample, but
batteries are constant. But it is not sufficient to match the
battery -- matching the semantics constrains the payload as well,
since the semantics of a battery may depend on any parent core
and/or payload constant.)

The purpose of registration is always performance-related. It
may involve (a) a special-purpose optimizer or "jet", written
for a specific core and checked with a Merkle hash; (b) a
general-purpose hotspot optimizer or "JIT"; or (c) merely a
hotspot declaration for profiling.

As always with hints, the programmer has no idea which of (a),
(b), and (c) will be applied. Use `~%`
indiscriminately on all hotspots, bottlenecks, etc, real or
suspected.

The list `r` is a way for the Hoon programmer to help jet
implementors with named Nock formulas that act on the core.
In complex systems, jet implementations are often partial and
want to call back into userspace.

The child core contains the parent, of course. When we register
a core, we state the leg to its parent, in the form of wing `q`.
We assume that the parent -- any core within the payload -- is
already registered.

`p` is the name of this core within its parent; `q` is a the leg

Registers a jet in core `s` so that it can be called when that code is run.

#### Examples

Here's the beginning of the AES core in `zuse.hoon`:

```hoon
++  aes    !.
  ~%  %aes  ..part  ~
  |%
  ++  ahem
    |=  [nnk=@ nnb=@ nnr=@]
    =>
      =+  =>  [gr=(ga 8 0x11b 3) few==>(fe .(a 5))]
          [pro=pro.gr dif=dif.gr pow=pow.gr ror=ror.few]
      =>  |%
  ..........
```

Here we label the entire `++aes` core for optimization.

---

## `~<` "siggal"

Raw hint, applied to product.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~<  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~<(p q)
</pre>
</td>
</tr>
<tr>
<td>Irregular</td>
<td>None.</td>
</tr>
</table>

`p` may either be a a `term` or a pair of `[term hoon]`. If it's the latter, `p`
may optionally be written as `%foo.some-hoon`.

#### AST

```hoon
[%sggl p=$@(term [p=term q=hoon]) q=hoon]
```

#### Expands to

`q`.

#### Discussion

`~<` is only used for jet hints ([`~/`](#sigfas) and [`~%`](#sigcen)) at the
moment; we are not telling the interpreter something about the computation we're
about to perform, but rather about its product.

#### Examples

```
> (make '~<(%a 42)')
[%7 p=[%1 p=42] q=[%11 p=97 q=[%0 p=1]]]
> (make '~<(%a.+(.) 42)')
[%7 p=[%1 p=42] q=[%11 p=[p=97 q=[%4 p=[%0 p=1]]] q=[%0 p=1]]]
```

---

## `~+` "siglus"

Cache a computation.

#### Syntax

One argument, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~+  p
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~+(p)
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
[%sgls p=hoon]
```

#### Expands to

`p`.

#### Convention

Caches the formula and subject of `p` in a local cache (generally
transient in the current event).

#### Examples

This may pause for a second:

```
> %.(25 |=(a=@ ?:((lth a 2) 1 (add $(a (sub a 2)) $(a (dec a))))))
121.393
```

This may make you want to press `ctrl-c`:

```
> %.(30 |=(a=@ ?:((lth a 2) 1 (add $(a (sub a 2)) $(a (dec a))))))
1.346.269
```

This should work fine:

```
> %.(100 |=(a=@ ~+(?:((lth a 2) 1 (add $(a (sub a 2)) $(a (dec a)))))))
573.147.844.013.817.084.101
```

---

## `~/` "sigfas"

Jet registration for gate with registered context.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~/  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~/(p q)
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
[%sgfs p=term q=hoon]
```

#### Expands to

```hoon
~%(p +7 ~ q)
```

#### Examples

From the kernel:

```hoon
++  add
  ~/  %add
  |=  [a=@ b=@]
  ^-  @
  ?:  =(0 a)  b
  $(a (dec a), b +(b))
```

---

## `~&` "sigpam"

Debugging printf.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~&  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~&(p q)
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
[%sgpm p=hoon q=hoon]
```

#### Expands to

`q`.

#### Product

Pretty-prints `p` on the console before computing `q`.

#### Discussion

This rune has no semantic effect beyond the Hoon expression `q`. It's used
solely to create a side-effect: printing the value of `p` to the console.

It's most useful for debugging programs.

#### Examples

```
> ~&('halp' ~)
'halp'
~

> ~&  'halp'
  ~
'halp'
~
```

---

## `~=` "sigtis"

Detect duplicate.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~=  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~=(p q)
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
[%sgts p=hoon q=hoon]
```

#### Expands to

`q`.

#### Convention

If `p` equals `q`, produce `p` instead of `q`.

#### Discussion

Duplicate nouns are especially bad news in Hoon, because comparing them
takes O(n) time. Use `~=` to avoid this inefficiency.

#### Examples

This code traverses a tree and replaces all instances of `32` with
`320`:

```
> =foo |=  a=(tree)
       ?~(a ~ ~=(a [?:(=(n.a 32) 320 n.a) $(a l.a) $(a r.a)]))

> (foo 32 ~ ~)
[320 ~ ~]
```

Without `~=`, it would build a copy of a completely unchanged tree. Sad!

---

## `~?` "sigwut"

Conditional debug printf.

#### Syntax

Three arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~?  p
  q
r
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~?(p q r)
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
[%sgwt p=hoon q=hoon r=hoon]
```

#### Expands to

`r`.

#### Convention

If `p` is true, prettyprints `q` on the console before computing `r`.

#### Examples

```
> ~?((gth 1 2) 'oops' ~)
~

> ~?((gth 1 0) 'oops' ~)
'oops'
~

> ~?  (gth 1 2)
    'oops'
  ~
~

> ~?  (gth 1 0)
    'oops'
  ~
'oops'
~
```

---

## `~!` "sigzap"

Print type on compilation fail.

#### Syntax

Two arguments, fixed.

<table>
<tr><th>Form</th><th>Syntax</th></tr>
<tr>
<td>Tall</td>
<td>
<pre>
~!  p
q
</pre>
</td>
</tr>
<tr>
<td>Wide</td>
<td>
<pre>
~!(p q)
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
[%sgzp p=hoon q=hoon]
```

#### Expands to

`q`.

#### Convention

If compilation of `q` fails, prints the type of `p` in the trace.

#### Examples

```
> a
! -find.a

> ~!('foo' a)
! @t
! find.a

> ~!  'foo'
  a
! @t
! find.a
```
