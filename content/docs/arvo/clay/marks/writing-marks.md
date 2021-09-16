+++
title = "Writing Marks"
weight = 2
template = "doc.html"
+++

Here we'll walk through a practical example of writing a `mark` file.

We'll create a `mark` for CSV (comma separated values) files, a simple format for storing tabular data in a text file. Note that there's already a `csv.hoon` `mark` and library, but we'll create new ones for demonstrative purposes. It shouldn't be an issue to overwrite the existing ones on a fakezod.

CSV files separate fields with commas and rows with line breaks. They look something like:

```
foo,bar,baz
blah,blah,blah
1,2,3
```

There is a little complexity surrounding special characters in fields and line endings, but otherwise the only other rule is that all rows must have the same number of fields. You can refer to [RFC4180 on the IETF website](https://datatracker.ietf.org/doc/html/rfc4180) for more details.

We'll represent such a structure in Hoon as a `(list (list @t))` like:

```hoon
[['foo' 'bar' 'baz' ~] ['blah' 'blah' 'blah' ~] ['1' '2' '3' ~] ~]
```

We could perhaps create the type with a `$|` rune to include row-length validation in the mold itself, but a `(list (list @t))` is simpler for demonstrative purposes.

## A simple mark

Let's begin with the simplest `mark` file:

```hoon
|_  csv=(list (list @t))
++  grab
  |%
  ++  noun  (list (list @t))
  --
++  grow
  |%
  ++  noun  csv
  --
++  grad  %noun
--
```

The door takes a `(list (list @t))` as its sample, and we've given it a face of `csv` so we can easily reference it. Note its face could be anything, it needn't be the name of our `mark`. When we're doing something with data that has a `%csv` `mark` like converting it to another `mark` or creating a diff, this is where our data will reside.

Next we have the `+grab` arm of our door, which contains a core with arms for converting _to_ our `mark` _from_ other `mark`s. We've given it one arm for the `%noun` `mark` - the most generic `mark` which will take any `noun`. Our `+noun` arm will simply clam whatever it's given with the `(list (list @t))` `mold`.

Next is the `+grow` arm which does the inverse of `+grab`, converting _from_ our `mark` _to_ another `mark`. We've also given it a `+noun` arm, this time it will simply return the door's sample named `csv`, which is of course already a `noun`.

Note that the `+noun` arm is _mandatory_ in `+grab`. Clay cannot build a `mark` core without it. Conversion arms for any other `mark`s apart from `%noun` are optional.

Finally we have the `+grad` arm. This arm specifies functions for revision control like creating diffs, patching files and so on. In our case, rather than writing all those functions, we've just delegated those tasks to the `%noun` `mark`. We can do this because we've specified conversion routines to and from the `%noun` `mark` in our `+grow` and `+grab` arms. When we modify a file with a `%csv` `mark`, Clay will convert our data to a `%noun` `mark`, execute the necessary `+grad` functions from the `%noun` `mark` file, and then convert it back to a `%csv` `mark` again.

So now we have a valid `%csv` `mark` file. If we save this as `csv.hoon` in the `/mar` directory we could store `%csv` data in Clay. This may be sufficient for some applications, but what if we want to import a CSV file from Unix or elsewhere? In the next section, we'll look at conversions to and from a `%mime` `mark` to address this.

## `%mime` conversions

The `$mime` type represents raw data from Unix or elsewhere. For example, if a text file from Unix containing the word `foo` were converted to a `$mime` type in Urbit, it would look something like:

```hoon
[/text/plain q=[p=3 q=7.303.014]]
```

`/text/plain` is its [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) and `p.q` is the byte-length of `q.q`, which is the data itself as an `atom`.

The `%mime` `mark` is used by Clay to store and convert `$mime` data. It's an important `mark` for moving files from Unix to Urbit and vice versa. When you add a file to a `desk` you have mounted to Unix and `|commit` the change, Clay will first receive the file as a `%mime` `mark`, then convert from a `%mime` to whatever `mark` matches the file extension. For example, `foo.txt` will be converted from `%mime` to `%txt`. Additionally, data fetched by Iris over HTTP will come in as a `$mime-data:http`, which is an unvalidated form of `$mime` that you may wish to convert to a `%mime` `mark` and then to another `mark`. Likewise with Eyre, some of the lower-level interfaces receive HTTP requests with `$mime-data:http` in them.

So with the nature of the `%mime` `mark` hopefully now clear, the reason we want conversion methods to and from `%mime` in our `%csv` `mark` is so we can import CSV files from Unix and vice versa.

Since a CSV file on Unix will just be a long string with ASCII or UTF-8 encoding, we can treat `q.q` in the `$mime` as a `cord`, and thus write a parser to convert it to a `(list (list @t))`. For this purpose, here's a library: `csv.hoon`, which you can view in full on the [Examples](/docs/arvo/clay/marks/examples#libcsvhoon) page.

The library contains four functions:

- `+de-csv` - Parse a CSV `cord` to a `(list (list @t))`.
- `+en-csv` - Encode a `(list (list @t))` as a CSV `cord`.
- `+validate` - Check all rows of `(list (list @t))` are the same length.
- `+csv-join` - Ignore this for now, we'll use it later on.

The decoding and encoding arms use parsing functions from the Hoon standard library. It's not important to be familiar with parsing in Hoon for our purposes here, but you can have a look at the [Parsing Guide](/docs/hoon/guides/parsing) in the Hoon documentation if you're interested. The important thing to note is that `+de-csv` takes a valid CSV-format `@t` and returns a `(list (list @t))`, and `+en-csv` does the reverse - it takes a `(list (list @t))` and returns a CSV-format `@t`.

Let's try the library in the dojo. After we've added it to `/lib` and run `|commit`, we can build the file:

```
> =csv -build-file %/lib/csv/hoon
```

...try decode a CSV-format `@t`:

```
> (de-csv:csv 'foo,bar,baz\0ablah,blah,blah\0a1,2,3')
~[<|foo bar baz|> <|blah blah blah|> <|1 2 3|>]
```

...and try encode a `(list (list @t))` as a CSV-format `@t`:

```
> (en-csv:csv [['foo' 'bar' 'baz' ~] ['blah' 'blah' 'blah' ~] ['1' '2' '3' ~] ~])
'foo,bar,baz\0ablah,blah,blah\0a1,2,3\0a'
```

With that working, we can add an import for our library to our `%csv` `mark` defintion and add a `+mime` arm to both our `+grab` and `+grow` arms:

```hoon
/+  *csv
|_  csv=(list (list @t))
++  grab
  |%
  ++  mime  |=((pair mite octs) (de-csv q.q))
  ++  noun
    |=  n=*
    ^-  (list (list @t))
    =/  result  ((list (list @t)) n)
    ?>  (validate result)
    result
  --
++  grow
  |%
  ++  mime
    ?>  (validate csv)
    [/text/csv (as-octs:mimes:html (en-csv csv))]
  ++  noun
    ?>  (validate csv)
    csv
  --
++  grad  %noun
--
```

In `+grab` we've added a `+mime` arm to convert _from_ a `%mime` `mark` _to_ our `%csv` `mark`. It's a simple gate that takes a `$mime` (specified as `(pair mite octs)` to avoid conflict with the arm name), runs the data through the `+de-csv` function and returns a `(list (list @t))` of the CSV data.

We've also added a `+mime` arm to `+grow` for converting _from_ our `%csv` `mark` _to_ a `%mime` `mark`. We encode our `(list (list @t))` `csv` sample with our `+en-csv` function and then run that through `as-octs:mimes:html` to get a `$octs` (so it has the byte-length). We also add the `/text/csv` MIME type so it's a valid `$mime`.

Additionally, we've used the `+validate` function in a few places to make sure our CSV data has consistent row lengths.

If we save the above mark file as `csv.hoon` in `/mar` and `|commit %home`, we should now be able to import CSV files into Urbit. Let's give it a go. In the root of our `%home` `desk`, let's add a file named `foo.csv` with the following contents:

```
foo,bar,baz
blah,blah,blah
1,2,3
```

If we now `|commit %home`, we should see it's been successfully added:

```
> |commit %home
>=
+ /~zod/home/4/foo/csv
```

And if we try reading the file with the `-read` thread:

```
> -read [%x our %home da+now /foo/csv]
~[<|foo bar baz|> <|blah blah blah|> <|1 2 3|>]
```

We can see our `%csv` `mark` has successfully converted our `foo.csv` file to a `(list (list @t))` when it was imported.

Let's try the other direction now. We can create a new `bar.csv` files in the root of `%home` from the dojo like so:

```
> */bar/csv ~[['abc' 'def' ~] ['ghi' 'jkl' ~]]
+ /~zod/home/5/bar/csv
```

And if we check it in the terminal on the Unix side we can see it's been correctly encoded:

```
> cat zod/home/bar.csv
abc,def
ghi,jkl
```

So now our `%csv` `mark` lets us move data in and out of Urbit. In the next section, we'll look at the `+grad` arm in more detail.

## `+grad`

So far we've just delegated `+grad` functions to the `%noun` `mark`, but now we'll look at writing our own.

For demonstrative purposes, we can just poach the algorithms used in the `+grad` arm of the `%txt` `mark` and modify them to take our `(list (list @t))` type instead of a `wain`. It's not the most efficient algorithm for a CSV file but it'll do the job.

Our diff format will be a `(urge:clay (list @t))`, and we'll use some `differ` functions from `zuse.hoon` like `+loss`, `+lusk` and `+lurk` to produce diffs and apply patches.

The [csv.hoon library](/docs/arvo/clay/marks/examples#libcsvhoon) we imported also contains a `+csv-join` function which we'll use in the `+join` arm, just to save space here.

Here's the new `%csv` `mark` defintion:

```hoon
/+  *csv
|_  csv=(list (list @t))
++  grab
  |%
  ++  mime  |=((pair mite octs) (de-csv q.q))
  ++  noun
    |=  n=*
    ^-  (list (list @t))
    =/  result  ((list (list @t)) n)
    ?>  (validate result)
    result
  --
++  grow
  |%
  ++  mime
    ?>  (validate csv)
    [/text/csv (as-octs:mimes:html (en-csv csv))]
  ++  noun
    ?>  (validate csv)
    csv
  --
++  grad
  |%
  ++  form  %csv-diff
  ++  diff
    |=  bob=(list (list @t))
    ^-  (urge:clay (list @t))
    ?>  (validate csv)
    ?>  (validate bob)
    (lusk:differ csv bob (loss:differ csv bob))
  ++  pact
    |=  dif=(urge:clay (list @t))
    ^-  (list (list @t))
    =/  result  (lurk:differ csv dif)
    ?>  (validate result)
    result
  ++  join
    |=  $:  ali=(urge:clay (list @t))
            bob=(urge:clay (list @t))
        ==
    ^-  (unit (urge:clay (list @t)))
    (csv-join ali bob)
  ++  mash
    |=  $:  [ship desk (urge:clay (list @t))]
            [ship desk (urge:clay (list @t))]
        ==
    ^-  (urge:clay (list @t))
    ~|(%csv-mash !!)
  --
--
```

In our modified `+grad` arm, we've replaced the `%noun` delegation with a core containing five arms: `+form`, `+diff`, `+pact`, `+join`, and `+mash`. These arms are all required for a valid `+grad` if it's not delegated to another `mark`. We'll now look at each in detail.

### `+form`

```hoon
++  form  %csv-diff
```

`+form` simply specifies the `mark` of the diff file that may be produced by other `+grad` functions. If your diff is the same type as your `mark`, it could just specify itself like `%csv`. In our case our diff is a `(urge:clay (list @t))` rather than a `(list (list @t))`, so we need a separate mark file for the diff itself.

Here's another `mark` file which can be saved as `csv-diff.hoon` in `/mar`:

```hoon
|_  dif=(urge:clay (list @t))
++  grab
  |%
  ++  noun  (urge:clay (list @t))
  --
++  grow
  |%
  ++  noun  dif
  --
++  grad  %noun
--
```

It's very bare-bones, we just need it for our `%csv` `mark` to work. In our `%csv` `mark`, we've specified it as `%csv-diff` in `+form`.

### `+diff`

```hoon
++  diff
  |=  bob=(list (list @t))
  ^-  (urge:clay (list @t))
  ?>  (validate csv)
  ?>  (validate bob)
  (lusk:differ csv bob (loss:differ csv bob))
```

This arm produces the diff of two `%csv` files. The first `%csv` file will be given as the sample of the parent door, which if you'll recall we gave a face of `csv`. The second `%csv` file will be given as the sample of the gate in `+diff`, which we've named `bob` here. We then just produce the diff of these two files and return it as the type of the mark specified in `+form`, which in our case is `(urge:clay (list @t))` for a `%csv-diff`. Clay will use `+diff` when a file is revised, so it doesn't have to store a whole new copy of the file each time it's modified.

### `+pact`

```hoon
++  pact
  |=  dif=(urge:clay (list @t))
  ^-  (list (list @t))
  =/  result  (lurk:differ csv dif)
  ?>  (validate result)
  result
```

`+pact` patches a `%csv` file with the given diff. Its gate takes a diff and applies it to the `%csv` given as the sample of the parent door (which we gave a face of `csv`). If the patch succeeds, it will return a new `%csv` file - a valid `(list (list @t))`. When we read a file that's been modified in Clay, Clay will apply all the diffs it has with `+pact` and return the resulting file.

### `+join`

```hoon
++  join
  |=  $:  ali=(urge:clay (list @t))
          bob=(urge:clay (list @t))
      ==
  ^-  (unit (urge:clay (list @t)))
  (csv-join ali bob)
```

The `+join` arm merges two different diffs. It takes them both as the sample of its gate (which we've named `ali` and `bob`), and returns a new diff wrapped in a `unit` like `(unit (urge:clay (list @t)))`. The `unit` will be `~` if the merge failed due to a conflict. This is used by Clay in some cases when `desk`s are merged. If diff merges are not possible for your use case, you could just have it always return `~`.

### `+mash`

```hoon
++  mash
  |=  $:  [ship desk (urge:clay (list @t))]
          [ship desk (urge:clay (list @t))]
      ==
  ^-  (urge:clay (list @t))
  ~|(%csv-mash !!)
```

This is like `+join` except it forces a diff merge even if there's a conflict. Rather than returning a `unit`, it just returns the diff - a `(urge:clay (list @t))` in our case. Also unlike `+join`, it takes the `ship` and `desk` each diff came from as well as the diff itself.

The `+mash` arm is not used by Clay in its file revision operations, so it's safe to just make it a dummy arm that crashes as we've done here. If you were to use it, it would likely just be used manually in an agent, thread or generator.

An example of its use would be the `%txt` `mark`, which includes a proper `+mash` function that produces a diff with any conflicts annotated, though how you have `+mash` handle conficts would depend on your use case. If there were no conflicts between the two diffs, it should produce the same diff as the `+join` arm.

## Conclusion

So there you have it, a fully functional `mark` for CSV files. A `mark` file can be as complex or as simple as you'd like, they're very flexible depending on your use case. Additional conversion methods can always be added as they're needed. For example, with just a few lines of code we could add arms for converting CSV files to `%json` or `%txt` and vice versa.

In the next document, we'll look at building and using `mark` cores and `mark` conversion gates in our own code.
