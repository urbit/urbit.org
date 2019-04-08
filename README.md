# urbit.org

## Test and Develop in Arvo

This guide assumes [Arvo has been installed](https://urbit.org/docs/getting-started/#arvo).

> Note: installing Arvo and the step below to use the Arvo repo are *not* the same thing.

1. Make sure that all of the necessary submodules (docs) are up to date by running `git submodule init` and then `git submodule update --recursive --remote` in this repo

2. Clone the [Arvo repo](https://github.com/urbit/arvo) `git clone git@github.com:urbit/arvo.git` and use [this branch](https://github.com/urbit/arvo/tree/static-site-dev) `cd arvo && git co -b static-site-dev origin/static-site-dev`. It has a few different renderers and marks for svgs, images, etc

3. Make a [fakezod](https://urbit.org/docs/getting-started/#using-a-fake-ship-) using the Arvo branch. Use the command `urbit -F zod -A <path/to/arvo/repo> -sc zod -S`

4. If you've successfully booted your Urbit you should see the Dojo prompt: `~zod:dojo>`, if instead you see: `~zod:talk[]` type `ctrl-x` to switch to the Dojo prompt

5. In the running fakezod, mount the filesystem by running `|mount %`

6. On a different terminal run `./scripts/topier <path/to/pier>` from this directory to copy the pertinent files to your pier (the pier is the `zod` directory created in step 3)

7. Go to your pier directory `cd <path/to/pier` and view the contents of `.http.ports`. Navigate to localhost at the port labeled `insecure public` e.g. visit `localhost:8080` to see the rendered urbit.org if you see `8080 insecure public`

## Build

A [build script](https://github.com/urbit/urbit.org/blob/master/scripts/build) is provided in the `scripts` directory, or you can follow these instructions:

1. Copy all content into your ship `./scripts/topier <path/to/pier>`
2. Delete docs `rm -rf </path/to/pier>/home/web/docs`
3. Run `|static` in dojo to render full site - docs
4. Copy rendered content into `dist` directory in this repo `cp -r </path/to/pier>/.urb/put/web dist && cp -r static-site/js dist`
5. Copy all content into your ship `./scripts/topier <path/to/pier>`
6. Delete posts `rm -rf </path/to/pier>/home/web/posts`
7. Run `|static` in dojo to render docs
8. Copy rendered docs into `dist` directory in this repo `cp -r </path/to/pier>/.urb/put/web/docs dist`
9. Test by running `cd dist && python -m SimpleHTTPServer`
10. See urbit.org at `localhost:8000`
