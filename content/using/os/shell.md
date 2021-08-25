+++
title = "Shell"
template = "doc.html"
weight = 2
+++

The dojo is our shell; it processes system commands and returns output. It's a
good place to quickly experiment with Urbit. On the surface the dojo is just a
Hoon REPL. On the inside, the dojo is a system for operating on and transforming
data in Urbit.

### Quickstart

You can use the dojo to run arbitrary Hoon code, as well as non-Hoon system
commands.

#### Math

Evaluate a Hoon expression (whitespace matters):

```
~your-urbit:dojo> (add 2 2)
~your-urbit:dojo> %+  add  2  2
```

Tall-form Hoon may require multiple lines:

```
~your-urbit:dojo> %+  add
~your-urbit:dojo< 2
~your-urbit:dojo< 2
```

Hoon uses something called [the subject](/docs/hoon/hoon-school/the-subject-and-its-legs).
The dojo has its own subject and that's where Hoon's equivalent of variables,
called faces, are stored.

Use `=var` to save faces to the dojo subject.

```
~your-urbit:dojo> =foo (add 2 2)
```

Note, however, that `=var` is dojo syntax, not Hoon syntax. You cannot bind a
face in a `.hoon` file in this way.

#### System commands

Use `=dir` to set the current working directory:

```
~your-urbit:dojo> =dir %/gen
```

(`%` represents your current directory. For a complete explanation on urbit
paths, see the [filesystem section](#filesystem).)

Generators (files in `/gen`) are run with `+`:

```
~your-urbit:dojo> +hello 'world'
```

Save output to a file in `%clay` with `*`:

```
~your-urbit:dojo> *some/file/path/hoon 'hello world'
```

Run system commands from `:hood`, like `reload`, using `|`:

```
~your-urbit:dojo> |reload %eyre
```

### Generators

Generators are short Hoon scripts, saved as `.hoon` files in the `/gen`
directory. Many dojo commands exist in the form of generators. The syntax for
running a generator is `+genname` for a generator saved as `genname.hoon`.

#### `+cat`

Accepts a path and displays the file. Similar to Unix `cat`.

```
~your-urbit:dojo> +cat %/gen/curl/hoon
```

#### `+code`

Generates a code that is used to remotely log into your ship. No
arguments.

```
~your-urbit:dojo> +code
```

You can change your code to a new randomly generated one by entering `|code
%reset`. Please note that this will prevent [Bridge](/docs/glossary/bridge)
from being able to derive your code in the future.

#### `+curl`

Retrieves data from a URL. Accepts a `tape`. Similar to Unix `curl`.

```
~your-urbit:dojo> +curl "http://nyt.com"
```

#### `+hello`

Just prints the argument. Accepts a `@ta`.

```
~your-urbit:dojo> +hello 'mars'
```

#### `+ls`

Similar to Unix `ls`. Accepts a path.

```
~your-urbit:dojo> +ls %/gen
~your-urbit:dojo> +ls /~talsur-todres/home/2/gen/program
```

#### `+solid`

Compile the current state of the kernel and output a
noun. Usually downloaded to a file in unix. No arguments.

```
~your-urbit:dojo> .urbit/pill +solid
```

#### `+test`

Testrunner. Can test multiple generators at once, conventionally ones
in the `/test` folder. Takes a path.

```
~your-urbit:dojo> +test /lib
```

#### `+ticket`

Generate a ticket for an urbit ship. Takes an urbit name (`@p`).


```
~your-urbit:dojo> +ticket ~talsur-todres-your-urbit
```

#### `+tree`

Generate a recursive directory listing. Takes a path.

```
~your-urbit:dojo> +tree %/sys
```

### Hood

The hood is the system daemon. See `gen/hood` and `app/hood`.

`|hi` - Sends a direct message. Sort of like Unix `write`. Accepts
an urbit name (`@p`) and a string (`tape`, which is text wrapped with double-quotes).

```
~your-urbit:dojo> |hi ~binzod "you there?"
```

`|link` / `|unlink` - Link / unlink a remote app. Accepts an
Urbit name and an app name.

```
~your-urbit:dojo> |link ~talsur-todres %octo
```

`|mass` - Prints the current memory usage of all the kernel modules.
No arguments.

```
~your-urbit:dojo> |mass
```

`|reload` - Reloads a kernel module (vane) from source. Accepts any
number of vane names.

```
~your-urbit:dojo> |reload %clay %eyre
```

`|reset` - Reloads `hoon.hoon` and all modules. No arguments.

```
~your-urbit:dojo> |reset
```

`|start` - Starts an app. Accepts an app name.

```
~your-urbit:dojo> |start %curl
```

---

### dojo manual

#### Sources and sinks

A dojo command is either a **source** or a **sink**. A source is just something
that can be printed to your console or the result of some computation. A
sink is an **effect**: a change to the filesystem, a network message, a
change to your environment, or a typed message to an app.

Sources can be chained together, but we can only produce one effect per
command.

#### Sinks

#### `=` - Set variable

Set any environment variable:

```
~your-urbit:dojo> =foo 42
~your-urbit:dojo> (add 2 foo)

44
```

Make sure to note that `=var` is dojo syntax, not Hoon syntax. You cannot bind a
variable in a `.hoon` file in this way.

#### Special variables

There are a few special variables that the dojo maintains.

#### `:` - Send to app

`:app` goes to a local `app`, `:~ship/app` goes to the `app` on `~ship`.

Send a `helm-hi` message to `hood`:

```
~your-urbit:dojo> :hood &helm-hi 'hi'
```

Apps usually expect marked data, so `&` is often used here.

#### `*` - Save in `%clay`

Save a new `.hoon` file in `gen`:

```
~your-urbit:dojo> *%/gen/foo/hoon '# hello'
```

The last component of the path is expected to be the mark (or mime
type).

#### `.` - Export to Unix

Export a noun to Unix with `.`:

```
~your-urbit:dojo> .foo/bar/baz (add 2 2)
```

Which creates a file at `pier/.urb/put/foo/bar.baz`.

This is very often used with `+solid`:

```
~your-urbit:dojo> .urbit/pill +solid
```

Which outputs a new `urbit.pill` to `pier/.urb/put/urbit.pill`

### Sources

#### `_` - Run a function

Use `_` to run a gate (or function):

Write an arbitrary function and pass data to it:

```
~your-urbit:dojo> _|=([a=@] (mul a 3)) 3
9
```

Use a function to get the status code from an http request:

```
~your-urbit:dojo> _|=([p=@ud q=* r=*] p) +http://google.com
301
```

#### `+` `-` - HTTP requests

`+http[s]://example.com` - sends a GET request

`+http[s]://example.com &json [%s 'hi']` - sends a POST request with the
JSON `"hi"` in the body.

`-http[s]://example.com &json [%s 'hi']` - sends a PUT request with the
JSON `"hi"` in the body.

Note that the first of these is a source while the last two are sinks.

#### `+` - Generators

Generators are simple Hoon scripts loaded from the filesystem. They live
in `gen/`.

An example of a generator that is built into your urbit is `+code`. It produces
the code needed to log into your ship remotely.

```
~your-urbit:dojo> +code
fintyr-haldet-fassev-solhex
```

### Variables

You can use `=` to set an environment variable in dojo, but there are
a few reserved names that have special uses.

#### `dir`

Current working `%clay` desk and revision. Read / write.

**Examples:**

```
~your-urbit:dojo> =dir %/gen
~your-urbit:dojo> +ls %
404/hoon docs/ dojo/hoon lib/ listen/hoon md static/udon talk/ testing/udon tree/main/ unmark/ womb/
```

#### `lib`

Current set of libraries (`/lib`) in your environment. Can be set
with `/+`. Read / write.

**Examples:**

```
~your-urbit:dojo> /+  number-to-words
```
Now we can use arms from lib/number-to-words.hoon
```
~your-urbit:dojo> (to-words:eng-us:number-to-words 123.456)
```

#### `sur`

Current set of structures (`/sur`) in your environment. Can be set
with `/-`. Read / write.

**Examples:**

```
~your-urbit:dojo> /-  sole
```
Now we can use arms in sur/sole.hoon.
```
~your-urbit:dojo> `sole-effect:sole`[%bel ~]
```

#### `now`

The current (128-bit `@da`) time. Read-only.

**Example:**

```
~your-urbit:dojo> now
~2016.3.21..21.10.57..429a
```

#### `our`

The current urbit ship. Read-only.

**Example:**

```
~your-urbit:dojo> our
~your-urbit
```

#### `eny`

512 bits of entropy. Read-only.

**Example:**

```
~your-urbit:dojo> eny
\/0vnt.d474o.gpahj.jcf3o.448fh.2lamb.82ljm.8ol8u.b02vi.mrvvp.b7et2.knb7m.l8he\/
  8.8qb9s.drm36.77n9b.a0qst.30g03.l5lb5.nvsbc.v39tn
\/
```

### Troubleshooting

If you encounter `%dy-edit-busy` while entering commands, it is
because your dojo is blocked on a timer or an HTTP request. Type backspace
and your dojo will end the blocked command.


## Using Generators with Gall {#gall}

You can send typed pokes to a Gall agent with the following syntax.
```
:chanel &chanel-action [%increase-counter step=9]
```
Gall has support for routing input to generators before passing it to the agent, and we can use this to make the above agent interactions cleaner. This particularly helps for agents that users will access via the dojo.

### Gall Generator Mechanics
Let's take an example with the `s3-store` agent. We can poke it like so:
```
:s3-store|set-endpoint 'myendpoint.com'
```

The above expands to "poke `%s3-store` with the output from calling `+s3-store/set-endpoint 'myendpoint.com'`." This is similar to how marks look for marks like `chanel-action` in `mar/chanel/action.hoon`.

The output is passed to `+on-poke` of `s3-store` as `[mark data]`.

#### Example: `gen/s3-store/set-endpoint.hoon`
Open the file `gen/s3-store/set-endpoint.hoon`. Its code (as of this writing) is:
```hoon
/-  *s3
:-  %say
|=  $:  [now=@da eny=@uvJ =beak]
        [[endpoint=@t ~] ~]
    ==
:-  %s3-action
^-  action
[%set-endpoint endpoint]
```
The arguments to this `%say` generator are:
1. `[now=@da eny=@uvJ =beak]`, the normal environment variables passed to a `%say` generator.
2. `[endpoint=@t ~]`, a list of arguments
3. `~`: this generator takes no optional arguments

In our example of `:s3-store|set-endpoint 'myendpoint.com'`, the generator takes `'myendpoint.com'` as the first argument, and evaluates it to `[%s3-action [%set-endpoint endpoint]]`.

We can check this at the dojo by running the generator directly:
```
> +s3-store/set-endpoint 'myendpoint.com'
[%set-endpoint endpoint='myendpoint.com']
```
Notice that the dojo automatically applies the mark to the data and removes the mark: this is a normal `%say` generator; no magic.

### Raw `|` Commands
In the dojo, any command like `|reset` or `|commit` is simply a shortcut for `:hood|reset` or `:hood|commit`. The `hood` generator is run, and then the `hood` agent processes the result.

To see the commands available to `hood` and the variables for those commands, just browse the `gen/hood` directory.  Each generator file represents a command, and you can open the files to see the exact sample that each command takes.

#### Example: `|commit`
When we run `|commit %home`, that calls the generator `gen/hood/commit.hoon` with argument `%home`. It returns a cell like so:
```
:- %kiln-commit
[mon auto]
```
So a `%home` argument returns `[%kiln-commit [%home %.n]]`. We can check this in the dojo:
```
> +hood/commit %home
[%home %.n]
```
If run as `|commit`, the whole `[%kiln-commit [%home %.n]]` is passed as `[mark vase]` to the `+on-poke` of `hood`, from whence it is passed to [lib/hood/kiln.hoon](https://github.com/urbit/urbit/blob/35946bd168734c6d16adb61b04c314362cdf344d/pkg/arvo/lib/hood/kiln.hoon#L420). There, the mark is matched and handled.

### Summary
    You can make these simple generators for your own applications quite easily. Just follow the approach of `s3-store` above, and you can make separate `|` commands for all the actions you want your users to perform from the dojo.

