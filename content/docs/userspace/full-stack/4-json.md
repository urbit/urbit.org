+++
title = "4. JSON"
weight = 4
template = "doc.html"
+++

Data sent between our agent and our front-end will all be encoded as JSON. In
this section, we'll briefly look at how JSON works in Urbit, and write a library
to convert our agent's structures to and from JSON for our front-end.

JSON data comes into Eyre as a string, and Eyre parses it with the
[`++de-json:html`](/docs/hoon/reference/zuse/2e_2-3#de-jsonhtml) function in
[`zuse.hoon`](/docs/hoon/reference/zuse/table-of-contents). The
hoon type it's parsed to is `$json`, which is defined as:

```hoon
+$  json                    ::  normal json value
  $@  ~                     ::  null
  $%  [%a p=(list json)]    ::  array
      [%b p=?]              ::  boolean
      [%o p=(map @t json)]  ::  object
      [%n p=@ta]            ::  number
      [%s p=@t]             ::  string
  ==                        ::
```

Once Eyre has converted the raw JSON string to a `$json` structure, it will be
converted to the mark the web client specified and then delivered to the target
agent (unless the mark specified is already `%json`, in which case it will be
delivered directly). Outbound facts will go through the same process in
reverse - converted from the agent's native mark to `$json`, then encoded in a
string by Eyre using
[`++en-json:html`](<(/docs/hoon/reference/zuse/2e_2-3#en-jsonhtml)>) and delivered
to the web client. The basic flow for both inbound messages (pokes) and outbound
messages (facts and scry results) looks like this:

![eyre mark flow diagram](https://media.urbit.org/docs/userspace/full-stack-guide/eyre-mark-flow-diagram.svg)

The mark conversion will be done by the corresponding mark file in `/mar` on the
agent's desk. In our case it would be `/mar/journal/action.hoon` and
`/mar/journal/update.hoon` in the `%journal` desk for our `%journal-action` and
`%journal-update` marks, which are for the `$action` and `$update` structures we
defined previously.

Mark conversion functions can be included directly in the mark file, or they can
be written in a separate library, then imported and called by the mark file. We
will do the latter in this case, so before we create the mark files themselves,
we'll write a library called `/lib/journal.hoon` with the conversion functions.

## `$json` utilities

[`zuse.hoon`](/docs/hoon/reference/zuse/table-of-contents) contains three main
cores for converting to and from `$json`:

- [`++enjs:format`](/docs/hoon/reference/zuse/2d_1-5#enjsformat) - Functions to
  help encode data structures as `$json`.
- [`++dejs:format`](/docs/hoon/reference/zuse/2d_6#dejsformat) - Functions to
  decode `$json` to other data structures.
- [`++dejs-soft:format`](/docs/hoon/reference/zuse/2d_7#dejs-softformat) -
  Mostly the same as `++dejs:format` except the functions produce units which
  are null if decoding fails, rather than just crashing.

### `++enjs:format`

This contains ten functions for encoding `$json`. Most of them are for specific
hoon data types, such as `++tape:enjs:format`, `++ship:enjs:format`,
`++path:enjs:format`, etc. We'll just have a look at the two most general and
useful ones: `++frond:enjs:format` and `++pairs:enjs:format`.

#### `++frond`

This function is for forming a JSON object from a single key-value pair. For
example:

```
> (frond:enjs:format 'foo' s+'bar')
[%o p={[p='foo' q=[%s p='bar']]}]
```

When stringified by Eyre, this will look like:

```json
{ "foo": "bar" }
```

#### `++pairs`

This is similar to `++frond` and also forms a JSON object, but it takes multiple
key-value pairs rather than just one:

```
> (pairs:enjs:format ~[['foo' n+~.123] ['bar' s+'abc'] ['baz' b+&]])
[%o p={[p='bar' q=[%s p='abc']] [p='baz' q=[%b p=%.y]] [p='foo' q=[%n p=~.123]]}]
```

When stringified by Eyre, this will look like:

```json
{
  "foo": 123,
  "baz": true,
  "bar": "abc"
}
```

Notice that we used a knot for the value of `foo` (`n+~.123`). Numbers in JSON
can be signed or unsigned and integers or floating point values. The `$json`
structure uses a knot so that you can decide whether a particular number should
be treated as `@ud`, `@sd`, `@rs`, etc.

### `++dejs:format`

This core contains many functions for decoding `$json`. We'll touch on some
useful families of `++dejs` functions in brief, but because there's so many, in
practice you'll need to look through the [`++dejs`
reference](/docs/hoon/reference/zuse/2d_6) to find the correct functions for
your use case.

#### Number functions

- `++ne` - decode a number to a `@rd`.
- `++ni` - decode a number to a `@ud`.
- `++no` - decode a number to a `@ta`.
- `++nu` - decode a hexadecimal string to a `@ux`.

For example:

```
> (ni:dejs:format n+'123')
123
```

#### String functions

- `++sa` - decode a string to a `tape`.
- `++sd` - decode a string containing a `@da` aura date value to a `@da`.
- `++se` - decode a string containing the specified aura to that aura.
- `++so` - decode a string to a `@t`.
- `++su` - decode a string by parsing it with the given [parsing
  rule](/docs/hoon/reference/stdlib/4f).

#### Array functions

`++ar`, `++as`, and `++at` decode a `$json` array to a `list`, `set`, and
n-tuple respectively. These gates take other `++dejs` functions as an argument,
producing a new gate that will then take the `$json` array. For example:

```
> ((ar so):dejs:format a+[s+'foo' s+'bar' s+'baz' ~])
<|foo bar baz|>
```

Notice that `++so` is given as the argument to `++ar`. `++so` is a `++dejs`
function that decodes a `$json` string to a `cord`. The gate resulting from `(ar so)` is then called with a `$json` array as its argument, and its product is a
`(list @t)` of the elements of the array.

Many `++dejs` functions take other `++dejs` functions as their arguments. A
complex nested `$json` decoding function can be built up in this manner.

#### Object functions

- `++of` - decode an object containing a single key-value pair to a head-tagged
  cell.
- `++ot` - decode an object to a n-tuple.
- `++ou` - decode an object to an n-tuple, replacing optional missing values
  with a given value.
- `++oj` - decode an object of arrays to a `jug`.
- `++om` - decode an object to a `map`.
- `++op` - decode an object to a `map`, and also parse the object keys with a
  [parsing rule](/docs/hoon/reference/stdlib/4f).

For example:

```
> =js %-  need  %-  de-json:html
  '''
  {
    "foo": "hello",
    "baz": true,
    "bar": 123
  }
  '''

> %-  (ot ~[foo+so bar+ni]):dejs:format  js
['hello' 123]
```

## Our types as JSON

We need to decide how our `$action` and `$update` types will be represented as
JSON in order to write our conversion functions. There are many ways to do this,
but in this case we'll do it as follows:

### Actions

| JSON                                              | Noun                                           |
| ------------------------------------------------- | ---------------------------------------------- |
| `{"add":{"id":1648366311070,"txt":"some text"}}`  | `[%add id=1.648.366.034.844 txt='some text']`  |
| `{"edit":{"id":1648366311070,"txt":"some text"}}` | `[%edit id=1.648.366.034.844 txt='some text']` |
| `{"del":{"id":1648366311070}}`                    | `[%del id=1.648.366.034.844]`                  |

### Updates

| Noun                                                                                            | JSON                                                                                                 |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `[1.648.366.492.459 %add id=1.648.366.034.844 txt='some text']`                                 | `{time:1648366481425,"add":{"id":1648366311070,"txt":"some text"}}`                                  |
| `[1.648.366.492.459 %edit id=1.648.366.034.844 txt='some text']`                                | `{time:1648366481425,"edit":{"id":1648366311070,"txt":"some text"}}`                                 |
| `[1.648.366.492.459 %del id=1.648.366.034.844]`                                                 | `{time:1648366481425,"del":{"id":1648366311070}}`                                                    |
| `[1.648.366.492.459 %jrnl ~[[id=1.648.366.034.844 txt='some text'] ...]`                        | `{time:1648366481425,"entries":[{"id":1648366311070,"txt":"some text"},...]}`                        |
| `[1.648.366.492.459 %logs ~[[1.648.366.492.459 %add id=1.648.366.034.844 txt='some text'] ...]` | `{time:1648366481425,"logs":[{time:1648366481425,"add":{id":1648366311070,"txt":"some text"}},...]}` |

Now let's write our library of encoding/decoding functions.

## `/lib/journal.hoon`

```hoon
/-  *journal
|%
```

First, we'll import the `/sur/journal.hoon` structures we previously created.
Next, we'll create two arms in our core, `++dejs-action` and `++enjs-update`, to
handle incoming poke `$action`s and outgoing facts or scry result `$update`s.

### `$json` to `$action`

```hoon
++  dejs-action
  =,  dejs:format
  |=  jon=json
  ^-  action
  %.  jon
  %-  of
  :~  [%add (ot ~[id+ni txt+so])]
      [%edit (ot ~[id+ni txt+so])]
      [%del (ot ~[id+ni])]
  ==
```

The first thing we do is use the [`=,`
rune](/docs/hoon/reference/rune/tis#-tiscom) to expose the `++dejs:format`
namespace. This allows us to reference `ot`, `ni`, etc rather than having to
write `ot:dejs:format` every time. Note that you should be careful using `=,`
generally as the exposed wings can shadow previous wings if they have the same
name.

We then create a gate that takes `$json` and returns a `$action` structure.
Since we'll only take one action at a time, we can use the `++of` function,
which takes a single key-value pair. `++of` takes a list of all possible `$json`
objects it will receive, tagged by key.

For each key, we specify a function to handle its value. Ours will be objects,
so we use `++ot` and specify the pairs of the key and `+dejs` function to decode
it. We then cast the output to our `$action` structure.

You'll notice the nesting of these `++dejs` functions approximately reflects the
nested structure of the `$json` it's decoding.

### `$update` to `$json`

```hoon
++  enjs-update
  =,  enjs:format
  |=  upd=update
  ^-  json
  |^
  ?+    -.q.upd  (logged upd)
      %jrnl
    %-  pairs
    :~  ['time' (numb p.upd)]
        ['entries' a+(turn list.q.upd entry)]
    ==
  ::
      %logs
    %-  pairs
    :~  ['time' (numb p.upd)]
        ['logs' a+(turn list.q.upd logged)]
    ==
  ==
  ++  entry
    |=  ent=^entry
    ^-  json
    %-  pairs
    :~  ['id' (numb id.ent)]
        ['txt' s+txt.ent]
    ==
  ++  logged
    |=  lgd=^logged
    ^-  json
    ?-    -.q.lgd
        %add
      %-  pairs
      :~  ['time' (numb p.lgd)]
          :-  'add'
          %-  pairs
          :~  ['id' (numb id.q.lgd)]
              ['txt' s+txt.q.lgd]
      ==  ==
        %edit
      %-  pairs
      :~  ['time' (numb p.lgd)]
          :-  'edit'
          %-  pairs
          :~  ['id' (numb id.q.lgd)]
              ['txt' s+txt.q.lgd]
      ==  ==
        %del
      %-  pairs
      :~  ['time' (numb p.lgd)]
          :-  'del'
          (frond 'id' (numb id.q.lgd))
      ==
    ==
  --
--
```

Our `$update` encoding function's a little more complex than our `$action`
decoding function, since our `$update` structure is more complex.

Like the previous one, we use `=,` to expose the namespace of `++enjs:format`.

Our gate takes an `$update` and returns a `$json` structure. We use `|^` so we
can separate out the encoding functions for individual entries (`++entry`) and
individual logged actions (`++logged`).

We first test the head of the `$update`, and if it's `%jrnl` (a list of
entries), we `turn` over the entries and call `++entry` to encode each one. If
it's `%logs`, we do the same, but call `++logged` for each item in the list.
Otherwise, if it's just a single update, we encode it with `++logged`.

We primarily use `++pairs` to form the object, though sometimes `++frond` if it
only contains a single key-value pair. We also use `++numb` to encode numerical
values.

You'll notice more of our encoding function is done manually than our previous
decoding function. For example, we form arrays by tagging an ordinary `list`
with `%a`, and strings by tagging an ordinary `cord` with `%s`. This is typical
when you write `$json` encoding functions, and is the reason there are far fewer
`+enjs` functions than `+dejs` functions.

## Resources

- [The JSON Guide](/docs/hoon/guides/json-guide) - The stand-alone JSON guide
  covers JSON encoding/decoding in great detail.
- [The Zuse reference](/docs/hoon/reference/zuse/table-of-contents) - The
  `zuse.hoon` reference documents all JSON-related functions in detail.

- [`++enjs:format` reference](/docs/hoon/reference/zuse/2d_1-5#enjsformat) -
  This section of the `zuse.hoon` documentation covers all JSON encoding
  functions.

- [`++dejs:format` reference](/docs/hoon/reference/zuse/2d_6) - This section of
  the `zuse.hoon` documentation covers all JSON _decoding_ functions.

- [Eyre overview](/docs/arvo/eyre/eyre) - This section of the Eyre vane
  documentation goes over the basic features of the Eyre vane.
