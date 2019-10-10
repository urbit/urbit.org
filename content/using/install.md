+++
title = "Install + Setup"
weight = 1
description = "How to install Urbit."
template = "page_indiced.html"
aliases = ["/docs/getting-started/"]
+++

Urbit is not yet ready for everyday users -- but if you're technically inclined or generally intrepid, feel free to try it out. It's a good place to explore.

In order to get going on the network, you'll need an [Urbit ID](#id). To try the live network out with a disposable identity, you can always [create a comet](@/using/operations/creating-a-comet.md).

## Getting an Urbit ID {#id}

For an introduction to Urbit IDs and the address space more generally, see [Urbit ID](@/understanding-urbit/urbit-id.md) in [Understanding Urbit](@/understanding-urbit/_index.md).

While Tlon does not currently sell or distribute Urbit IDs, there are still a few ways to get your own Urbit ID:

- Getting an invitation from a friend
- Purchasing an Urbit ID from a third party, such as [urbit.live](https://urbit.live) or [OpenSea](https://opensea.io).

Tlon occasionally selects candidates to distribute invitations, and users operating galaxies and stars can spawn and distribute a finite number of stars and planets, respectively.

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
curl -O https://bootstrap.urbit.org/urbit-darwin-v0.8.2.tgz
tar xzf urbit-darwin-v0.8.2.tgz
./urbit
```

### Linux (64-bit)

We also provide static binaries for 64-bit Linux distributions (Ubuntu, Debian, Fedora, Arch, etc.). You can get the latest stable release similarly:

```sh
curl -O https://bootstrap.urbit.org/urbit-linux64-v0.8.2.tgz
tar xzf urbit-linux64-v0.8.2.tgz
./urbit
```

To access your Urbit via HTTP on port 80 on Ubuntu, you may need to run the following:

```sh
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' /path/to/urbit
```

### Compile from source

If you want to compile from source, see the [instructions on GitHub](https://github.com/urbit/urbit#development).

### About swap space

If you're running Urbit in the cloud on a small instance, you may need to additionally configure swap space. If you're not, you can safely ignore this section.

Urbit wants to map 2GB of memory when it boots up. It won’t necessarily use all this memory, it just wants to see it. On a normal modern PC or Mac, or on a large cloud virtual machine, this is not an issue. On some small cloud virtual machines (Amazon or Digital Ocean) the default memory configuration is smaller than this, and you need to manually configure a swapfile.

Digital Ocean has a post on adding swap [here](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04). For Amazon there’s a StackOverflow thread [here](https://stackoverflow.com/questions/17173972/how-do-you-add-swap-to-an-ec2-instance).