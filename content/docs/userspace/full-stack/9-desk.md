+++
title = "9. Desk and glob"
weight = 9
template = "doc.html"
+++

With our React app now complete, we can put together the final desk and publish
it.

## Config files

So far we've written the following files for the back-end:

```
ourfiles
├── app
│   └── journal.hoon
├── lib
│   └── journal.hoon
├── mar
│   └── journal
│       ├── action.hoon
│       └── update.hoon
└── sur
    └── journal.hoon
```

There's a handful of extra files we need in the root of our desk:

- `desk.bill` - the list of agents that should be started when our app is
  installed.
- `sys.kelvin` - the kernel version our app is compatible with.
- `desk.docket-0` - configuration of our app tile, front-end glob and other
  metadata.

We only have one agent to start, so `desk.bill` is very simple:

```
:~  %journal
==
```

Likewise, `sys.kelvin` just contains:

```
[%zuse 419]
```

The `desk.docket-0` file is slightly more complicated:

```
:~
  title+'Journal'
  info+'Dear diary...'
  color+0xd9.b06d
  version+[0 1 0]
  website+'https://urbit.org'
  license+'MIT'
  base+'journal'
  glob-ames+[~zod 0v0]
==
```

The fields are as follows:

- `title` is the name of the app - this will be displayed on the tile and when
  people search for the app to install it.
- `info` is a brief description of the app.
- `color` - the RGB hex color of the tile.
- `version` - the version number of the app. The fields represent major, minor
  and patch version.
- `website` - a link to a website for the app. This would often be its Github repo.
- `license` - the license of for the app.
- `base` - the desk name of the app.
- `glob-ames` - the ship to retrieve the front-end files from, and the hash of
  those files. We've put `~zod` here but this would be the actual ship
  distributing the app when it's live on the network. The hash is `0v0`
  initially, but once we upload the front-end files it will be updated to the
  hash of those files automatically. Note that it's also possible to distribute
  front-end files from a separate web server. In that case, you'd use
  `glob-http` rather than `glob-ames`. The [Glob section of the distribution
  guide](/docs/userspace/dist/glob) covers this alternative approach in more
  detail.

Our files should now look like this:

```
ourfiles
├── app
│   └── journal.hoon
├── desk.bill
├── desk.docket-0
├── lib
│   └── journal.hoon
├── mar
│   └── journal
│       ├── action.hoon
│       └── update.hoon
├── sur
│   └── journal.hoon
└── sys.kelvin
```

## New desk

Next, we'll create a new `%journal` desk on our ship by forking an existing one.
Once created, we can mount it to the unix filesystem.

In the dojo of a fake ship:

```
> |merge %journal our %webterm
>=
> |mount %journal
>=
```

Now we can browse to it in the unix terminal:

```sh
cd ~/zod/journal
```

Currently it has the same files as the `%webterm` desk, so we need to delete
those:

```sh
rm -r .
```

Apart from the kernel and standard library, desks need to be totally
self-contained, including all mark files and libraries necessary to build them.
For example, since our app contains a number of `.hoon` files, we need the
`hoon.hoon` mark, and its dependencies. The easiest way to ensure our desk has
everything it needs is to copy in the "dev" versions of the `%base` and
`%garden` desks. To do this, we first clone the Urbit git repository:

```sh
git clone https://github.com/urbit/urbit.git urbit-git
```

If we navigate to the `pkg` directory in the cloned repo:

```sh
cd ~/urbit-git/pkg
```

...we can combine the `base-dev` and `garden-dev` desks with the included
`symbolic-merge.sh` script:

```sh
./symbolic-merge.sh base-dev journal
./symbolic-merge.sh garden-dev journal
```

Now, we copy the contents of the new `journal` folder into our empty desk:

```sh
cp -rL journal/* ~/zod/journal/
```

Note we've used the `L` flag to resolve symbolic links, because the dev-desks
contain symlinks to files in the actual `arvo` and `garden` folders.

We can copy across all of our own files too:

```sh
cp -r ~/ourfiles/* ~/zod/journal/
```

Finally, in the dojo, we can commit the whole lot:

```
|commit %journal
```

## Glob

The next step is to build our front-end and upload the files to our ship. In the
`journal-ui` folder containing our React app, we can run:

```sh
npm run build
```

This will create a `build` directory containing the compiled front-end files. To
upload it to our ship, we need to first install the `%journal` desk. In the
dojo:

```
|install our %journal
```

Next, in the browser, we navigate to the `%docket` globulator at
`http://localhost:8080/docket/upload` (replacing localhost with the actual host):

![globulator screenshot](https://m.tinnus-napbus.xyz/pub/globulator.png)

We select our `journal` desk, then we hit `Choose file`, and select the whole
`build` directory which was created when we build our React app. Finally, we hit
`glob!` to upload it.

If we now return to the homescreen of our ship, we'll see our tile displayed, and we can open our app by clicking on it:

![tiles screenshot](https://m.tinnus-napbus.xyz/pub/tiles.png)

## Publishing

The last thing we need to do is publish our app, so other users can install it
from our ship. To do that, we just run the following command in the dojo:

```
:treaty|publish %journal
```

## Resources

- [App publishing/distribution documentation](/docs/userspace/dist/dist) -
  Documentation covering third party desk composition, publishing and
  distribution.

- [Glob documentation](/docs/userspace/dist/glob) - Comprehensive documentation
  of handling front-end files.

- [Desk publishing guide](/docs/userspace/dist/guide) - A step-by-step guide to
  creating and publishing a desk.
