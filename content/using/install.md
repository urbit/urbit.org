+++
title = "Install + Setup"
weight = 1
description = "How to install Urbit."
template = "page_indiced.html"
aliases = ["/docs/getting-started/"]
+++

Urbit is not yet ready for everyday users — but if you're technically inclined or generally intrepid, feel free to try it out. It's a good place to explore.

In order to get going on the network, you'll need an [Urbit ID](#id). To try the live network out with a disposable identity, you can always [create a comet](@/using/operations/creating-a-comet.md).

## Getting an Urbit ID {#id}

For an introduction to Urbit IDs and the address space more generally, see [Urbit ID](@/understanding-urbit/urbit-id.md) in [Understanding Urbit](@/understanding-urbit/_index.md).

While Tlon does not currently sell or distribute Urbit IDs, there are still a few ways to get your own Urbit ID:

- Getting an invitation from a friend
- Purchasing an Urbit ID from a third party, such as [urbit.live](https://urbit.live), [OpenSea](https://opensea.io), [planet.market](https://planet.market/), or [Urbit Marketplace](https://urbitmarketplace.com/).

Tlon occasionally selects candidates to distribute invitations, and users operating galaxies and stars can spawn and distribute a finite number of stars and planets, respectively.

## Using your Urbit ID

If you have an Urbit ID, you'll use [Bridge](https://bridge.urbit.org) to get your ship's keyfile before you can [boot your ship](#booting-your-ship). For more information on how to use Bridge, see [Using Bridge](@/using/operations/using-bridge.md).

## Install Urbit {#urbit}

The Urbit binary runs nicely on a Unix-like operating system – Ubuntu, Fedora, or macOS, for example. If you're using Windows, you'll need to get one of the aforementioned systems. But first, some terminology:

- `vere` or `urbit`: the interpreter that runs when you run a command like `./urbit` in your command line
- `arvo`: the deterministic OS that lives in a directory whose name matches your Urbit ID, i.e. `~famreb-todmec` lives in `/famreb-todmec`

We have different installation instructions for different platforms. To install and run Arvo, the Urbit operating system, and its binary, run the commands that are listed for your operating system.

You can check your Arvo installation on any platform by running the `./urbit` command. Installation was successful if you get a block of output that begins with the line below:

```
Urbit: a personal server operating function
```

### macOS

We provide static binaries for macOS. You can grab the latest stable release as follows:

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.4-darwin.tgz
tar xzf urbit-v0.10.4-darwin.tgz
cd urbit-v0.10.4-darwin
./urbit
```

### Linux (64-bit)

We also provide static binaries for 64-bit Linux distributions (Ubuntu, Debian, Fedora, Arch, etc.). You can get the latest stable release similarly:

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.4-linux64.tgz
tar xzf urbit-v0.10.4-linux64.tgz
cd urbit-v0.10.4-linux64
./urbit
```

To access your Urbit via HTTP on port 80 on Ubuntu, you may need to run the following:

```sh
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' /path/to/urbit
```
(Where `urbit` is the urbit executable downloaded with `curl` prior)

### Compile from source

If you want to compile from source, see the [instructions on GitHub](https://github.com/urbit/urbit#development).

### About swap space

If you're running Urbit in the cloud on a small instance, you may need to additionally configure swap space. If you're not, you can safely ignore this section.

Urbit wants to map 2GB of memory when it boots up. It won’t necessarily use all this memory, it just wants to see it. On a normal modern PC or Mac, or on a large cloud virtual machine, this is not an issue. On some small cloud virtual machines (Amazon or Digital Ocean) the default memory configuration is smaller than this, and you need to manually configure a swapfile.

Digital Ocean has a post on adding swap [here](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04). For Amazon there’s a StackOverflow thread [here](https://stackoverflow.com/questions/17173972/how-do-you-add-swap-to-an-ec2-instance).

## Booting your ship {#booting-your-ship}

Now the rubber meets the road. You'll be booting your ship with the keyfile that you [downloaded from Bridge](@/using/operations/using-bridge.md).

Note that this section is only for booting a ship that uses the live Arvo network. If you just want to create an unnetworked ship for development purposes, read [this guide](@/using/develop.md#creating-a-development-ship) instead.

### Step 1: Find Your Urbit ID

This will look something like `~lodleb-ritrul`. You can see the name of your Urbit ID when you log into your wallet using the Bridge client.

### Step 2: Find the path to your keyfile

Find the absolute path to the keyfile that you downloaded from Bridge. Copy it.

### Step 3: Run the boot command

Type `cd` in your terminal to return to your home directory. If you want to store your ship somewhere besides your home directory, change the terminal's working directory to the desired directory.

Run the command below, except with `sampel-palnet` replaced by the name of your
Urbit identity, and `path/to/my-planet.key` replaced with the path to your keyfile:

```sh
./urbit -w sampel-palnet -k path/to/my-planet.key
```

Or, if you'd prefer to copy your key in, you can run:

```sh
./urbit -w sampel-palnet -G rAnDoMkEy
```

Either command will create a directory called `sampel-palnet/` and begin building your ship. It may take a few minutes.

When your ship is finished booting, you will see the `~sampel-palnet:dojo>` prompt. At that point, you should permanently erase your keyfile from your machine.

## The Dojo

Welcome to your ship! Let's try our first command in the Dojo, the Arvo command line and Hoon REPL, to get oriented.

Type `(add 2 2)` into the Dojo. You should see the following:

```
~sampel-palnet:dojo> (add 2 2)
```

When you press Enter, you should see this:

```
> (add 2 2)
4
```

Good, your Dojo is working correctly. Now let's run our first useful command in the Dojo. The first thing you generally want to do with a new ship is to **mount** it. A ship being mounted means that it has a presence on your Unix filesystem, so the files can be copied manipulated between Unix and your ship. To mount you ship, type `|mount %` at the Dojo prompt.

```
|mount %
>=
```

The `>=` output means that a command was successful. Now you can see your ship's files in its Unix directory.

### Using Landscape

Landscape is the Urbit web interface, and it's the best way to interact with your ship. Chrome and Brave are the recommended browsers for using Landscape. To get onto Landscape:

1. Start your ship. In the boot messages, look for a line that says something like `http: live (insecure, public) on 80`. The number given is the port that your ship is using.
2.  If the port given is 80, simply type `localhost` into your browser's address bar. If the given port is a different number, such as `8080`, you would type `localhost:8080`. Alternatively, you access landscape by navigating to `ship.arvo.network` into your URL bar, where `sampel-palnet` is the name of your ship, without the `~`. You will need to [set up DNS proxying](@/using/operations/using-your-ship.md#dns-proxying) to use this option.
3. Type `+code` into your ship's Dojo. Copy-paste the returned code into the field asking for it in the browser page.
4. You're in! Now you can explore apps such as Chat for messages, Publish for blogging, and Weather.
