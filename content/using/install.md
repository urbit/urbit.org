+++
title = "Install + Setup"
weight = 1
description = "How to install Urbit."
template = "page_indiced.html"
aliases = ["/docs/getting-started/"]
+++

Urbit is not yet ready for everyday users — but if you're technically inclined or generally intrepid, feel free to try it out. It's a good place to explore.

There are two types of "ships" (Urbit instances) that typical person to use Urbit with: a **comet**, or a **planet**. Comets are disposable identities that anyone can make for free, making them simpler boot with, so we'll start with instructions on using one of those. Then, we'll continue onto instructions on using a planet.

If you know that you want to use a planet, a more permanent identity that requires an Urbit ID, follow the [installation instructions below](#urbit), and then skip to the section on [getting an Urbit ID](#id).

## Table of Contents

- [Install Urbit](#Urbit)
- [Booting a comet](#comet)
- [Using an Urbit ID](#id)
- [Using the web interface](#landscape)


## Install the Urbit Software {#urbit}

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

### Windows

Please note that this method of installing Urbit is more experimental, and we may not be able to assist you if you encounter issues related to WSL 2, but these instructions have been tested and verified for WSL 2 + Ubuntu 18.04 LTS.

Urbit cannot run on Windows itself, but there is a convenient way to run a Linux distro using the [Windows Subsystem for Linux 2](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux), an initiative by Microsoft to bring Linux to Windows 10. For Urbit to work, it is necessary to [install WSL 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) and not just WSL, since version 2 uses virtualization and the real Linux kernel under the hood. Currently, WSL 2 is only available if you have signed up for the Windows Insider Program (the ‘Slow’ ring is sufficient), but this will change soon as WSL 2 is scheduled for general release in 2020.

Once WSL 2 is installed, open a Linux terminal in Windows and then follow the Linux installation instructions above. For performance reasons, do not install Urbit in the mounted Windows volume, but install it in the Linux file system. For example, in your home directory, by typing `cd ~`.

The latest version of WSL 2 also supports port forwarding, so you should be able to open Chrome on Windows and browse to port 80 on localhost (or port 8080).

### Compile from source

If you want to compile from source, see the [instructions on GitHub](https://github.com/urbit/urbit#development).

### About swap space

If you're running Urbit in the cloud on a small instance, you may need to additionally configure swap space. If you're not, you can safely ignore this section.

Urbit wants to map 2GB of memory when it boots up. It won’t necessarily use all this memory, it just wants to see it. On a normal modern PC or Mac, or on a large cloud virtual machine, this is not an issue. On some small cloud virtual machines (Amazon or Digital Ocean) the default memory configuration is smaller than this, and you need to manually configure a swapfile.

Digital Ocean has a post on adding swap [here](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04). For Amazon there’s a StackOverflow thread [here](https://stackoverflow.com/questions/17173972/how-do-you-add-swap-to-an-ec2-instance).

## Booting a comet {#comet}

Now you're ready to actually put the Urbit software to use.

To boot a new comet, go into the command line and run the following command from the directory that was created during Urbit installation:

```sh
$ ./urbit -c mycomet
```

This will take a few minutes to an hour, and will spin out a bunch of boot messages. It will also create a directory called `mycomet` in the Unix directory that you ran the command from.

Toward the end of the boot process, you'll see something like:

```
ames: on localhost, UDP 31337.
http: live (insecure, public) on 8080
http: live ("secure", public) on 8443
http: live (insecure, loopback) on 12321
~sampel_commet:dojo>
```

When your ship is finished booting, you will see either the `~sampel_commet:dojo>` or `~sampel_commet:chat-cli/` prompt. If you're seeing `:chat-cli` press `Ctrl-x` to switch into Dojo. At that point, you should permanently erase your keyfile from your machine.

To exit Urbit, use `Ctrl-d`. To start your ship up again, run  `./urbit mycomet` from the directory that you first booted from. Now let's do some basic commands from inside your ship.

### The Dojo

Welcome to your ship! Let's try our first command in the Dojo, the Arvo command line and Hoon REPL, to get oriented.

Type `(add 2 2)` into the Dojo. You should see the following:

```
~sampel_commet:dojo> (add 2 2)
```

When you press Enter, you should see this:

```
> (add 2 2)
4
```

Good, your Dojo is working correctly. Now let's run our first useful command in the Dojo. The first thing you generally want to do with a new ship is to **mount** it. A ship being mounted means that it has a presence on your Unix filesystem, allowing files to be shared between Unix and your ship. To mount your ship, type `|mount %` at the Dojo prompt.

```
|mount %
>=
```

The `>=` output means that a command was successful. Now you can see your ship's files in its Unix directory.

## Using an Urbit ID {#id}

For an introduction to Urbit IDs and the address space more generally, see [Urbit ID](@/understanding-urbit/urbit-id.md) in [Understanding Urbit](@/understanding-urbit/_index.md).

While Tlon does not currently sell or distribute Urbit IDs, there are still a few ways to get your own Urbit ID:

- Getting an invitation from a friend
- Purchasing an Urbit ID from a third party, such as [urbit.live](https://urbit.live), [OpenSea](https://opensea.io), [planet.market](https://planet.market/), or [Urbit Marketplace](https://urbitmarketplace.com/).

Tlon occasionally selects candidates to distribute invitations, and users operating galaxies and stars can spawn and distribute a finite number of stars and planets, respectively.

### Using your Urbit ID

If you have an Urbit ID, you'll use [Bridge](https://bridge.urbit.org) to get your ship's keyfile before you can [boot your planet](#booting-your-ship). For more information on how to use Bridge, see [Using Bridge](@/using/operations/using-bridge.md).


### Booting your planet {#booting-your-ship}

Now it's time to boot your planet with the keyfile that you [downloaded from Bridge](@/using/operations/using-bridge.md).

Note that this section is only for booting a ship that uses the live Arvo network. If you just want to create an unnetworked ship for development purposes, read [this guide](@/using/develop.md#creating-a-development-ship) instead.

#### Step 1: Find Your Urbit ID

This will look something like `~lodleb-ritrul`. You can see the name of your Urbit ID when you log into your wallet using the Bridge client.

#### Step 2: Find the path to your keyfile

Find the absolute path to the keyfile that you downloaded from Bridge. Copy it.

#### Step 3: Run the boot command

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

Then you're in! Basic instructions on using your ship are the same as those found in the [booting a comet](#comet) section. Now that you have a planet, you can use our web interface, Landscape.

## Using the Web Interface (#landscape)

Landscape is the Urbit web interface, and it's the best way to interact with your planet. Chrome and Brave are the recommended browsers for using Landscape. To get onto Landscape:

1. Start your ship. In the boot messages, look for a line that says something like `http: live (insecure, public) on 80`. The number given is the port that your ship is using.
2.  If the port given is 80, simply type `localhost` into your browser's address bar. If the given port is a different number, such as `8080`, you would type `localhost:8080`. Alternatively, you access landscape by navigating to `ship.arvo.network` into your URL bar, where `sampel-palnet` is the name of your ship, without the `~`. You will need to [set up DNS proxying](@/using/operations/using-your-ship.md#dns-proxying) to use this option.
3. Type `+code` into your ship's Dojo. Copy-paste the returned code into the field asking for it in the browser page. Alternatively, you can find your ship's code by logging into [Bridge][https://bridge.urbit.org].
4. You're in! Now you can explore apps such as Chat for messages, Publish for blogging, and Weather.

### Joining the community

Once you are in Landscape we recommend joining the Urbit Community group. You will need to obtain an invite, which can be had by first joining the `~/~dopzod/urbit-help` chat channel and asking for an invitation from there. This is most likely to succeed quickly during standard US West Coast working hours. Once you have the invite you can accept it by navigating to your Groups by clicking on All Groups in the upper left hand corner of Landscape, then Manage All Groups, and in there you should see an invitation. From this interface you can join the various Chat, Publish, and Link instances contained in the group.

You can join `~/~dopzod/urbit-help` from either Landscape or dojo. To join from
Landscape first click on the Messaging tile on the home screen. Then press Join Chat
in the upper left corner and enter `~/~dopzod/urbit-help` into the prompt and
press Join Chat. To join from dojo, enter `;join ~/~dopzod/urbit-help` into dojo
and press enter.
