+++
title = "Using Marks"
weight = 3
template = "doc.html"
+++

In the last document, [Writing Marks](/docs/arvo/clay/marks/writing-marks), we walked through writing `mark` files and touched on how Clay handles them. They needn't just be left to background vane processes though, you can also use them yourself in your code.

There are two kinds of cores that Clay can build for you: A `mark` conversion gate and a `mark` core. Each has two kinds: Statically typed and dynamically typed. Clay has a `care` for producing each of these:

- `%b` - Build a dynamically typed `mark` core.
- `%c` - Build a dynamically typed `mark` conversion gate.
- `%e` - Build a statically typed `mark` core.
- `%f` - Build a statically typed `mark` conversion gate.

You can either use these by `%pass`ing Clay a [%warp task](/docs/arvo/clay/tasks#warp) with the appropriate `care`, or else with a [Clay scry](/docs/arvo/clay/scry). In the examples here we've used the latter.

## mark conversion gates

`mark` conversion gates simply convert from one `mark` to another.

### Static

A static `mark` conversion gate looks like `$-(a b)`, where `a` is the type of the `mark` you're converting _from_, and `b` is type of the `mark` you're converting _to_. For example, a `mark` conversion gate from `%txt` to `%mime` would look like `$-(wain mime)`. You'd simply feed it a `wain` and get a `$mime` in return.

#### Example

We get our `%txt` to `%mime` `mark` conversion gate with a `%f` scry like so:

```
> =txt-to-mime .^($-(wain mime) %cf /===/txt/mime)
```

Note we had to specify the type of the gate as `$-(wain mime)` in the scry - if the type returned by the scry doesn't match that specification it'll fail. This is where a statically typed `mark` conversion gate differs from the dynamically typed gate, which we'll discuss later.

Now that we have our conversion gate, we can just call it with a valid `wain` and we'll get our `$mime` in return:

```
> (txt-to-mime ~['foo'])
[p=/text/plain q=[p=3 q=7.303.014]]
```

### Dynamic

A dynamically typed `mark` conversion gate is called a `$tube:clay`, and looks like:

```hoon
+$  tube  $-(vase vase)
```

As you can see from the type definition, it takes and returns a `vase` rather than needing the types explicitly defined. Rather than failing on a type mismatch when the scry is performed, it'll instead fail when it's actually run and fed a `vase` of the wrong type. Apart from handling `vase`s, it otherwise behaves the same as a statically typed `mark` conversion gate.

#### Example

We get our `%txt` to `%mime` `$tube` with a `%c` scry like so:

```
> =txt-mime-tube .^(tube:clay %cc /===/txt/mime)
```

And then we can again feed it the `wain` that a `%txt` `mark` wants, only this time it's wrapped in a `vase`:

```
> !<  mime  (txt-mime-tube !>(~['foo']))
[p=/text/plain q=[p=3 q=7.303.014]]
```

We then get our `$mime` back, but also in a `vase`.

## mark cores

While a `mark` conversion gate is built from functions defined in `+grab` and `+grow`, a `mark` core gives you everything in `+grad` so you can create diffs, merge diffs, patch files, etc. An extra arm `+vale` is also included that lets you convert a `noun` to the type the `%mark` takes by running the `+noun` arm of `+grab` in the original `mark` file.

### Static

A statically typed `mark` core is a `(nave:clay a b)` where `a` is the type of the `mark` and `b` is the type for diffs (which is the type of the `mark` specified in `+form:grad`). For example, a static `mark` core for a `%txt` `mark` looks like `(nave:clay wain (urge:clay cord))`.

`+nave:clay` looks like this in full:

```hoon
++  nave
  |$  [typ dif]
  $_
  ^?
  |%
  ++  diff  |~([old=typ new=typ] *dif)
  ++  form  *mark
  ++  join  |~([a=dif b=dif] *(unit (unit dif)))
  ++  mash
    |~  [a=[ship desk dif] b=[ship desk dif]]
    *(unit dif)
  ++  pact  |~([typ dif] *typ)
  ++  vale  |~(noun *typ)
  --
```

In brief, the arms of the core do the following:

- `+form` - `mark` for diffs.
- `+vale` - Clam `noun` to the `mark`'s type.
- `+diff` - Create diff of two files.
- `+pact` - Patch a file with a diff.
- `+join` - Merge two diffs, returning `~` if there's a conflict.
- `+mash` - Force merge of two diffs.

#### Examples

First we get the `%txt` `mark` core with a `%e` scry:

```
> =txt-nave .^((nave:clay wain (urge:clay cord)) %ce /===/txt)
```

Note we specified the `mark` type `wain` and diff type `(urge:clay cord)` in the `nave` returned by the scry.

We can see the `mark` for diffs with `+form`:

```
> form.txt-nave
%txt-diff
```

To clam a noun to the type of the `mark` (a `wain` in the case of a `%txt` `mark`), we can call `+vale` with a `noun`:

```
> (vale:txt-nave ~['foo' 'bar'])
<|foo bar|>
```

We can create a diff of two files with `+diff`:

```
> (diff:txt-nave ~['foo' 'bar' 'baz'] ~['foo' 'zoo' 'baz'])
~[[%.y p=1] [%.n p=<|bar|> q=<|zoo|>] [%.y p=1]]
```

Let's create some more diffs for experimentation:

```
> =diff-a (diff:txt-nave ~['foo' 'bar' 'baz'] ~['foo' 'zoo' 'baz'])
> =diff-b (diff:txt-nave ~['foo' 'bar' 'baz'] ~['zap' 'bar' 'baz'])
> =diff-c (diff:txt-nave ~['foo' 'bar' 'baz'] ~['foo' 'bla' 'baz'])
```

If we try merging diffs `a` and `b` with `+join`, we get a new merged diff back in a `unit`:

```
> (join:txt-nave diff-a diff-b)
[~ [~ ~[[%.n p=<|foo|> q=<|zap|>] [%.n p=<|bar|> q=<|zoo|>] [%.y p=1]]]]
```

If we try merging diffs `a` and `c` however, we get `~` because of a conflict:

```
> (join:txt-nave diff-a diff-c)
[~ ~]
```

If we run `+mash` on `a` and `b` we get the same diff as with `+join` (sans the `unit`):

```
> (mash:txt-nave [our %home diff-a] [our %blah diff-b])
[~ ~[[%.n p=<|foo|> q=<|zap|>] [%.n p=<|bar|> q=<|zoo|>] [%.y p=1]]]
```

If we `+mash` `a` and `c`, however, we get a diff with the conflict annotated rather than just `~`:

```
> (mash:txt-nave [our %home diff-a] [our %blah diff-c])
[ ~
  ~[
    [%.y p=1]
    [ %.n
      p=<|bar|>
        q
      <|>>>>>>>>>>>> ~zod/home zoo ++++++++++++ bar ------------ bla <<<<<<<<<<<< ~zod/blah|>
    ]
    [%.y p=1]
  ]
]
```

Note that the `%txt` `mark` annotates conflicts, but there are no specific rules around how the `+mash` arm should force-merge conflicting diffs apart from that it must return a valid diff, however the `mark` specified in `+form` defines that.

Finally, we can patch our `wain` with diff `a` and get a new, modified `wain`:

```
> (pact:txt-nave ~['foo' 'bar' 'baz'] diff-a)
<|foo zoo baz|>
```

### Dynamic

A dynamically typed `mark` core is a `$dais:clay`, which looks like:

```hoon
+$  dais
  $_  ^|
  |_  sam=vase
  ++  diff  |~(new=_sam *vase)
  ++  form  *mark
  ++  join  |~([a=vase b=vase] *(unit (unit vase)))
  ++  mash
    |~  [a=[ship desk diff=vase] b=[ship desk diff=vase]]
    *(unit vase)
  ++  pact  |~(diff=vase sam)
  ++  vale  |~(noun sam)
  --
```

It has the same arms as the statically typed `mark` core, the difference is that it takes and returns `vase`s rather than the data directly. Additionally, it's a door rather than an ordinary core, and takes the type of the `mark` wrapped in a `vase` as its argument.

#### Examples

We can get a `%txt` `mark` `dais` with a `%b` scry:

```
> =txt-dais .^(dais:clay %cb /===/txt)
```

Its `+form` arm functions the same as a static core:

```
> form.txt-dais
%txt-diff
```

So does `+vale` except it returns a `vase`:

```
> !<  wain  (vale:txt-dais ~['foo' 'bar'])
<|foo bar|>
```

All the other arms also deal in `vase`s. Because it's a door, the `+pact` and `+diff` arms take the original file in a `vase` as the door sample rather than being given directly to the arm. Calling `+diff` arm, for example, works like so:

```
> !<  (urge:clay cord)  (~(diff txt-dais !>(~['foo' 'bar'])) !>(~['foo' 'baz']))
~[[%.y p=1] [%.n p=<|bar|> q=<|baz|>]]
```
