+++
title = "Overview"
weight = 1
template = "doc.html"
+++

Clay is a typed filesystem, and we call these file types `mark`s. When talking about Hoon and Arvo we'll often talk of types like `@ud`, `(list @t)`, etc. A `mark` will specify such a type for its files, but it does more than just that - it also defines conversion routines to and from other `mark`s, as well as diff, patch, and merge routines.

For example, a `%txt` `mark` defines the type of a `%txt` file as a `wain` (a `(list @t)`). It defines a conversion function to a `%mime` `mark` to allow it to be serialized and sent to a browser or to the Unix filesystem. It also includes Hunt-McIlroy diff, patch, and merge algorithms. Conversion functions will be different for different `mark`s, as will things like diff algorithms. An image file like a `%png`, for example, just replaces the old blob of data with the new one rather than implementing a complex binary diff and patch algorithm, so how these functions are implemented depends on the file type and use case.

`mark` files are stored in the `/mar` directory. The `path` of the `%txt` `mark`, for example, is `/mar/txt/hoon`.

A `mark` is a door (a core with a sample) with three arms: `+grab`, `+grow`, and `+grad`. The door's sample defines its type. In `+grab` is a series of functions to convert from other `mark`s to the given `mark`. In `+grow` is a series of functions to convert from the given `mark` to other `mark`s. In `+grad` is `+diff`, `+pact`, `+join`, `+mash`, and `+form`.

Here's its basic structure in an informal pseudocode:

```
|_  <mark-type>
++  grab:
  ++  noun: <noun> -> <mark-type>
  ++  mime: <mime> -> <mark-type>
  ++  txt: <txt> -> <mark-type>
  ...
++  grow:
  ++  noun: <mark-type> -> <noun>
  ++  mime: <mark-type> -> <mime>
  ++  txt: <mark-type> -> <txt>
  ...
++  grad
  ++  form: <diff-mark>
  ++  diff: (<mark-type>, <mark-type>) -> <diff-type>
  ++  pact: (<mark-type>, <diff-type>) -> <mark-type>
  ++  join: (<diff-type>, <diff-type>) -> <diff-type> or NULL
  ++  mash: (<diff-type>, <diff-type>) -> <diff-type>
```

These types are basically what you would expect. In `+grab`, only a `+noun` arm is mandatory, the rest are optional. The `+grow` arm itself is optional, as are any arms within it. In `+grad`, all arms are mandatory unless revision control is delegated to another `mark`, which we'll discuss later.

In general, for a particular `mark`, the `+grab` and `+grow` entries should be inverses of each other. They needn't be symmetrical though - you may want to be able to convert from your `mark` to `%json` but not from `%json` to your `mark`, for example.

In `+grad`, `+diff` takes two instances of a `mark` and produces a diff of them whose `mark` is given by `+form`. `+pact` takes an instance of a `mark` and patches it with the given diff. In general, if `+diff` called with A and B produces diff D, then `+pact` called with A and D should produce B.

`+join` takes two diffs and attempts to merge them into a single diff. If there are conflicts, it produces null. `+mash` takes two diffs and forces a merge, even if there are conflicts. How your `+mash` function force-merges conflicting diffs is up to you. The `%txt` `mark` annotates any conflicts, for example, but there may be other ways. If `+join` of two diffs does not produce null, then `+mash` of the same diffs should produce the same result. Note that `+mash` is not used by Clay in its ordinary filesystem operations, so you may wish to leave it as a dummy arm that crashes if called.

Alternately, instead of `+form`, `+diff`, `+pact`, `+join`, and `+mash`, a `mark` can provide the same functionality by defining `+grad` to be the name of another `mark` to which we wish to delegate the revision control responsibilities. Then, before running any of those functions, Clay will convert to the other `mark`, and convert back afterward. For example, the `%hoon` `mark` is revision-controlled in the same way as `%txt`, so its `+grad` is simply `++ grad %txt`. Of course, `+txt` must be defined in `+grow` and `+grab` as well.

We mentioned that `+noun` is the only mandatory arm in `+grab`, but there are a couple of others that, while not mandatory, are of particular interest.

The first is a `+mime` arm for converting to and from the `%mime` `mark`. When you `|commit` a file to a `desk` mounted to Unix, Clay will receive the data as a `%mime` `mark`, and then convert it to the `mark` matching the file extension. It will perform the same operation in reverse when mounting a `desk` to Unix. For this reason, any `mark` you wish to be able to access from the Unix filesystem should have `%mime` conversion routines. In certain cases (such as the scry interface), Eyre will also need to convert your `mark` to a `%mime` in order to encode it in an HTTP response, so you may require a `+mime` arm for that reason as well.

The second case of interest is the `+json` arm for converting to and from a `%json` `mark`. If, for example, you want to write a Gall agent to which you can subscribe through Eyre's channel system, it must produce data with a `mark` containing `%json` conversion routines. If it doesn't, Eyre will not be able to deliver the data to the subscribed HTTP client in the SSE stream.

## Sections

[Writing Marks](/docs/arvo/clay/marks/writing-marks) - A practical walkthrough of writing a `mark` file.

[Using Marks](/docs/arvo/clay/marks/using-marks) - Details of using `mark` conversion gates and `mark` cores in your own code.

[Examples](/docs/arvo/clay/marks/examples) - The example code used in the Writing Marks guide.
