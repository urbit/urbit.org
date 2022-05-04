+++
title = "5. Marks"
weight = 5
template = "doc.html"
+++

In this section we'll write the mark files for our agent. We'll need two marks,
one for poke `$action`s and one for subscription updates and scry results, both
of which are `$update`s. Our `$action` mark will be called `%journal-action` and
our `$update` mark will be called `%journal-update`. These will be located at
`/mar/journal/action.hoon` and `/mar/journal/update.hoon`.

Note that a mark called `%foo-bar` will first be looked for in
`/mar/foo-bar.hoon`, and if it's not there it will be looked for in
`/mar/foo/bar.hoon`. That's why we can have a single name like `%journal-action`
but have it in `/mar/journal/action.hoon`

## `%journal-action`

```hoon
/-  *journal
/+  *journal
|_  act=action
++  grow
  |%
  ++  noun  act
  --
++  grab
  |%
  ++  noun  action
  ++  json  dejs-action
  --
++  grad  %noun
--
```

First we import our `/sur/journal.hoon` structure file and also our
`/lib/journal.hoon` library (containing our `$json` conversion functions). The
sample of our mark door is just our `$action` structure. The `++grow` arm of a
mark core, if you recall, contains methods for converting _from_ our mark _to_
another mark. Actions only ever come inwards in pokes, so we don't need to worry
about converting an `$action` _to_ `$json`. The `++grow` arm can therefore just
handle the generic `%noun` case, simply returning our mark door's sample without
doing anything.

`++grab`, conversely, defines methods for converting _to_ our mark _from_
another mark. Since `$action`s will come in from the front-end as `$json`, we
need to be able to convert `$json` data to our `$action` structure. Our
`/lib/journal.hoon` library contains the `++dejs-action` function for performing
this conversion, so we can just specify that function for the `%json` case.
We'll also define a standard `%noun` method, which will just "clam" (or "mold")
the incoming noun with the `$action` mold. Clamming/molding coerces a noun to a
type and is done by calling a mold as a function.

Lastly, `++grad` defines revision control methods, but can be delegated to
another mark. Since this mark will never be used for actually storing files in
Clay, we can just delegate it to the generic `%noun` mark rather than writing a
proper set of `++grad` methods.

## `%journal-update`

```hoon
/-  *journal
/+  *journal
|_  upd=update
++  grow
  |%
  ++  noun  upd
  ++  json  (enjs-update upd)
  --
++  grab
  |%
  ++  noun  update
  --
++  grad  %noun
--
```

Next we have our `%journal-update` mark file. The sample of our mark door is our
`$update` structure. Our `$update`s are always outbound, never inbound, so we
only need to define a method for converting our `$update` structure to `$json`
in the `++grow` arm, and not the opposite direction in `++grad`. Our
`/lib/journal.hoon` library contains the `++enjs-update` function for performing
this conversion, so we can call it with the sample `$update` as its argument. We
can add `%noun` conversion methods and delegate revision control to the `%noun`
mark in the same manner as our `%journal-action` mark above.

## Resources

- [The Marks section of the Clay documentation](/docs/arvo/clay/marks/marks) -
  This section of the Clay vane documentation covers mark files comprehensively.
- [The mark file section of the Gall
  Guide](/docs/userspace/gall-guide/7-sur-and-marks#mark-files) - This part of
  the Gall Guide goes through the basics of mark files.

- [The JSON Guide](/docs/hoon/guides/json-guide) - This also covers writing mark
  files to convert to/from JSON.
