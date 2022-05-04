+++
title = "Environment Setup"
description = "How to set up an environment for Urbit development."
weight = 11
template = "doc.html"
+++

This guide covers best practices for preparing your environment to develop
within the Urbit ecosystem.

## Text editors

A variety of plugins have been built to provide support for the Hoon language in
different text editors. These are listed below.

**Note:** The hoon compiler expects Unix-style line endings (LF) and will
fail to parse Windows-style line endings (CRLF). Make sure your editor is set
to use LF for line endings, especially if you're developing on Windows.

#### Atom

Atom is free and open-source and runs on all major operating systems. It is
available [here](https://atom.io/). A package for Hoon support is maintained by
Tlon and may be obtained using the package manager within the editor by
searching for `Hoon`.

#### Sublime Text

Sublime Text is closed-source, but may be downloaded for free and there is no
enforced time limit for evaluation. It runs on all major operating systems. It
is available [here](https://www.sublimetext.com/).

#### Visual Studio Code

Visual Studio Code is free and open-source and runs on all major operating
systems. It is available [here](https://code.visualstudio.com/). Hoon support
may be acquired in the Extensions menu within the editor by searching for
`Hoon`.

#### Emacs

Emacs is free and open-source and runs on all major operating systems. It is
available [here](https://www.gnu.org/software/emacs/). Hoon support is available
with [hoon-mode.el](https://github.com/urbit/hoon-mode.el).

#### Vim

Vim is free and open-source and runs on all major operating systems. It is
available [here](https://www.vim.org/). Hoon support is available with
[hoon.vim](https://github.com/urbit/hoon.vim).

## Development ships

### Creating a fake ship

To do work with Hoon, we recommended using a "fake" ship — one that's not
connected to the network.

Because such a ship has no presence on the network, you don't need an Azimuth
identity. You just need to have [installed the Urbit binary](/getting-started/cli).

To create a fake ship named `~zod`, run the command below. You can replace `zod`
with any valid Urbit ship-name.

```
./urbit -F zod
```

This should take a couple of minutes, during which you should see a block of boot
messages, starting with the Urbit version number.

### Fake ship networking

Fake ships on the same machine can automatically talk to one another. Having
created a fakezod, you can create a fake `~bus` the same way:

```
./urbit -F bus
```

Now in the fakezod's dojo, try:

```
> |hi ~bus
>=
hi ~bus successful
```

### Faster fake ship booting

While working with Hoon, you'll often want to delete an old fake ship and
recreate a fresh one. Rather than having to wait a few minutes for the fresh
ship to be initialised, you can instead create a backup copy of a fake ship.
That way you can just delete the current copy, replace it with the backup, and
reboot in a matter of seconds.

To do this, boot a fresh fake ship like usual, but with a different name:

```
./urbit -F zod -c zod.new
```

Once it's finished booting, it's a good idea to mount its desks so you don't
have to do it again each time. In the dojo:

```
> |mount %base
>=
> |mount %garden
>=
> |mount %landscape
>=
> |mount %bitcoin
>=
> |mount %webterm
>=
```

Next, shut the ship down with `ctrl+D`. Then, copy the pier and start using the
copy instead:

```
cp -r zod.new zod
./urbit zod
```

Now whenever you want a fresh fakezod, you can just shut it down and do:

```
rm -r zod
cp -r zod.new zod
./urbit zod
```

## Working with desks

If you're just working in the dojo or experimenting with generators, committing
to the `%base` desk on a fake ship is fine. If you're working on a Gall agent or
developing a desk for distribution, you'll most likely want to work on a
separate desk and it's slightly more complicated.

### Mount a desk

To mount a desk to Unix so you can add files, you just need to run the `|mount`
command in the dojo and specify the name of the desk to mount:

```
|mount %base
```

The desk will now appear in the root of your pier (zod in this case):

```
zod
└── base
```

You can unmount it again by running the `|unmount` command in the dojo:

```
|unmount %base
```

### Create a new desk

To create a new desk, you'll need to merge from an existing one, typically
`%base`. In the dojo, run the following (you can change `%mydesk` to your
preferred name):

```
|merge %mydesk our %base
```

If you now mount it, you'll have `/mydesk` directory in your pier with all the
files of the `%base` desk inside. You can then delete the contents, copy in your
own files and `|commit` it.

Desks must contain all the `mark` files, libraries, etc, that they need. A
`sys.kelvin` file is mandatory, and there are a few `mark` files necessary as
well. In the next couple of sections we'll look at different ways to populate a
new desk with the necessary files.

### Minimal desk

This is the absolute minimal desk you'll be able to commit:

```
skeleton
├── mar
│   ├── hoon.hoon
│   ├── kelvin.hoon
│   ├── mime.hoon
│   ├── noun.hoon
│   ├── txt-diff.hoon
│   └── txt.hoon
└── sys.kelvin
```

`sys.kelvin` specifies the kernel kelvin version with which the desk is
compatible. You can copy it across from the `%base` desk, or just run the
following in the terminal from within the desk directory:

```sh
echo "[%zuse 419]" > sys.kelvin
```

The other `mark` files can just be copied across from the `%base` desk.

### Using dev desks

If you're working on something more complex, for example a desk with agents and
a front-end, there will be a number of `mark` files, libraries, etc, that will
be necessary. Rather than having to manually copy all the files from the
relevant default desks, the [urbit git repo](https://github.com/urbit/urbit)
includes some dev desks which can be used as a base. To get these, make sure you
have git installed and then clone the repo:

```
git clone https://github.com/urbit/urbit ~/git/urbit
```

If you now change to the `~/git/urbit/pkg` directory, you'll see the source for
the default desks, among other things:

```
cd ~/git/urbit/pkg
```

The desks ending in `-dev`, like `base-dev` and `garden-dev`, contain files for
interfacing with those respective desks. If you're creating a new desk that has
a tile and front-end, for example, you might like to use `base-dev` and
`garden-dev` as a base. To create such a base, there's a `symbolic-merge.sh`
script included in the directory. You can use it like so:

```
./symbolic-merge base-dev mydesk
./symbolic-merge garden-dev mydesk
```

After running that, you'll have a `mydesk` desk in the `pkg` directory that
contains the symlinked files from both those dev desks. To copy the files into
your pier, you can create and mount a mydesk desk in the dojo:

```
|merge %mydesk our %base
|mount %mydesk
```

Then, you can go into your pier:

```
cd /path/to/fake/zod
```

Delete the contents of `mydesk`:

```
rm -r mydesk/*
```

And then copy in the contents of the desk you created:

```
cp -rL ~/git/urbit/pkg/mydesk/* mydesk
```

Note you have to use `cp -rL` rather than just `cp -r` because the
`symbolic-merge.sh` script creates symlinks, so the `L` flag is to resolve them
and copy the actual files.

Now you can just add a `sys.kelvin` file:

```
echo "[%zuse 419]" > mydesk/sys.kelvin
```

And you'll be able to mount the desk with `|commit %mydesk`.

## Project organization

When you're developing a desk, it's best to structure your working directory
with the same hierarchy as a real desk. For example, `~/project/mydesk` might
look like:

```
mydesk
├── app
│   └── foo.hoon
├── desk.bill
├── desk.docket-0
├── lib
│   └── foo.hoon
├── mar
│   └── foo
│       ├── action.hoon
│       └── update.hoon
├── sur
│   └── foo.hoon
└── sys.kelvin

```

That way, whenever you want to test your changes, you can just copy it across to
your pier like:

```
cp -ruv mydesk/* /path/to/fake/zod/mydesk
```

And then just commit it in the dojo:

```
|commit %mydesk
```

If you're [using dev desks](#using-dev-desks) as a base, it's best to keep those
files separate from your own code.

### Syncing repos

A useful pattern is to work from a git repo and sync your work with the pier of
a fake ship. An easy way to do this is with the following command:

```
watch rsync -zr --delete /working/repo/desk/* /path/to/fake/zod/mydesk
```

Here `/working/repo/desk` is the folder that has the proper desk structure
outlined above, and `/path/to/fake/zod/mydesk` is the desk you wish to copy the
contents of the working repo to. From here, you can edit from the working repo
and perform git commands there, while testing your changes on the fake ship.
