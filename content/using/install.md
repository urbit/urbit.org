+++
title = "Install + Setup"
weight = 1
description = "How to install Urbit."
template = "page_indiced.html"
aliases = ["/docs/getting-started/"]
+++

Urbit is not yet ready for everyday users — but if you're technically inclined or generally intrepid, feel free to try it out. It's a good place to explore.

In order to get going on the network, you'll need an [Urbit ID](#id). To try the live network out with a disposable identity, you can always [create a comet](@/using/operations/creating-a-comet.md).

## Urbit ID: An Overview {#id}

Urbit works as a peer-to-peer network where others fail because peers -- called **ships** -- are all associated with persistent and scarce identities that we refer to as **Urbit ID**. The Urbit ID registry is deployed on the Ethereum blockchain, and individual IDs exist as non-fungible tokens in that cryptographic ecosystem that chain.

Urbit IDs function as network addresses, represented by pronounceable names like `~padmyn-pasnux`. There are a few kinds of Urbit ID, but ones meant for typical users are called **planets**. Anyone who has a planet can be thought of as a full "citizen" of the Urbit network.

But sometimes a user might not want a persistent identity for whatever reason. In that case, they can use Urbit without an Urbit ID by using something called called a **comet**. Comets can be spun up at will and for free. They are good for bots and for people who are new to Urbit and want to check out the network.

For a more in-depth explanation of Urbit ID and the address space more generally, see the [Urbit ID](@/understanding-urbit/urbit-id.md) essay in [Understanding Urbit](@/understanding-urbit/_index.md).

Tlon doesn't currently sell or distribute Urbit IDs, but there are a few ways to get your own:

- Getting an invitation from a friend
- Purchasing an Urbit ID from a third party, such as [urbit.live](https://urbit.live), [OpenSea](https://opensea.io), [planet.market](https://planet.market/), or [Urbit Marketplace](https://urbitmarketplace.com/).

Tlon occasionally selects candidates to distribute invitations, and users operating galaxies and stars can spawn and distribute a finite number of stars and planets, respectively.

## Using your Urbit ID

If you have an Urbit ID, you'll use the [Bridge](https://bridge.urbit.org) client to get your ship's *keyfile* before you can [boot your ship](#booting-your-ship).  Your keyfile is a cryptographic secret that allows your Urbit instance to authenticate itself on the network, so you can't boot your planet without it. Your keyfile is deterministically derived from your other cryptographic secrets.

### The Urbit ID Wallet

Your Urbit ID is actually yours. As long as you control the cryptographic secrets, nobody can take it away from you. That's why it's important to know a little bit.

Urbit ID secrets operate as a system of separate but hierarchically realted Ethereum key-pairs. For any given ID, this system of key-pairs is referred to as a **Hierarchical Deterministic (HD) Wallet**. the Urbit HD wallet. Each of these Ethereum addresses have different powers over the same identity, from setting networking keys for communicating in the Arvo network to transferring ownership of identities. Important elements of the HD wallet:

- **Master Ticket**: The "password" at the top of the hierarchy that determines the ownership. All other secrets are derived from this. If the rest of the wallet is lost or compromised, the master ticket can rederive everything. You'll log into Bridge with this. Always keep your master ticket extremely safe.

- **Management Proxy**: Derived from the master ticket. Can perform non-ownership related operations such as configuring Arvo networking keys.

- **Keyfile**: Derived from the management proxy. Used as crytopgraphic proof that your Urbit ship it is who it says it is. You use it to start up your ship for the first time.

### Getting Your Keyfile

As mentioned previously, there are a few ways to acquire a planet. All methods, however, should result in you receiving at least one secret, such as a **master ticket**. If you received an email invite to Urbit, the master ticket should a `.pdf` the passport folder that you downloaded.

1. To connect to Bridge, go to https://bridge.urbit.org.
2. Enter the name of you planet and the associated master ticket in the appropriate fields. If you received your secret is in another form, such as a dictionary mnemonic, click the `Metamask, Mnemonic, Hardware Wallet...` button for alternate login methods.
3. Once you're logged in, click the `OS` option.
4. In resulting page, click the `Download Arvo Keyfile` button. You should receive a `.key` file that contains the secret needed to boot your ship. Hold on to this file.

## Install Urbit {#urbit}

The Urbit binary runs on a Unix-like operating system – Ubuntu, Fedora, or macOS, for example. If you're using Windows, you'll need to get one of the aforementioned systems. But first, some terminology:

We have different installation instructions for different platforms. To install and run Arvo, the Urbit operating system, and its binary, run the commands that are listed for your operating system.

Once you've followed the appropriate install instructions, you can check if everythign went right by running the `./urbit` command. Installation was successful if you get a block of output that begins with the line below:

```
Urbit: a personal server operating function
```

### macOS

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.7-darwin.tgz
tar xzf urbit-v0.10.7-darwin.tgz
cd urbit-v0.10.7-darwin
./urbit
```

### Linux (64-bit)

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.7-linux64.tgz
tar xzf urbit-v0.10.7-linux64.tgz
cd urbit-v0.10.7-linux64
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

If you're running Urbit in the cloud on a small instance, you may need to additionally configure swap space. If you're not, you can ignore this section.

Urbit wants to map 2GB of memory when it boots up. It won’t necessarily use all this memory, it just wants to see it. On a normal modern PC or Mac, or on a large cloud virtual machine, this is not an issue. On some small cloud virtual machines (Amazon or Digital Ocean) the default memory configuration is smaller than this, and you need to manually configure a swapfile.

Digital Ocean has a post on adding swap [here](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04). For Amazon there’s a StackOverflow thread [here](https://stackoverflow.com/questions/17173972/how-do-you-add-swap-to-an-ec2-instance).

## Booting your ship {#booting-your-ship}

Now the rubber meets the road. You'll be booting your ship with the keyfile that you downloaded from Bridge [earlier in this document](#id).

Note that this section is only for booting a ship that uses the live Arvo network. If you just want to create an unnetworked ship for development purposes, read [this guide](@/using/develop.md#creating-a-development-ship) instead.

### Step 1: Find Your Urbit ID

This will look something like `~lodleb-ritrul`. You can see the name of your Urbit ID when you log into your wallet using the Bridge client.

### Step 2: Find the path to your keyfile

Find the absolute path to the keyfile that you downloaded from Bridge. Copy it.

### Step 3: Run the boot command

If you are not already within the directory you installed above, enter it by running `cd urbit-v0.10.7-darwin` (for Mac) or `cd urbit-v0.10.7-linux64` (for Linux) from where you ran the install commands. It contains your Urbit binary, and your ship will be installed here as well.

Once you're inside, run the command below, except with `sampel-palnet` replaced by the name of your
Urbit identity, and `path/to/my-planet.key` replaced with the path to your keyfile:

```sh
./urbit -w sampel-palnet -k path/to/my-planet.key
```

Or, if you'd prefer to copy your key in, you can run:

```sh
./urbit -w sampel-palnet -G rAnDoMkEy
```

Either command will create a directory called `sampel-palnet/` and begin building your ship. It may take a few minutes.

When your ship is finished booting, you will see either the `~sampel-palnet:dojo>` or `~sampel-palnet:chat-cli/` prompt. If you're seeing `:chat-cli` press `Ctrl-x` to switch into Dojo. At that point, you should permanently erase your keyfile from your machine.

To shut down your ship, use `Ctrl-d`.

To start your ship up again, run `./urbit sampel-palnet/` from the directory
where your Urbit binary is saved. Note that in this usage,
`sampel-palnet/` is the path of a folder, which by default is located in the same folder as
the Urbit binary. This folder is called your ship's **pier**, and you
can put it wherever you like.

Never boot multiple instances of your ship at the same time. You can prevent
this from happening on accident by only ever keeping a single copy of your pier.

### Updating to the latest binary

Most updates to Urbit are downloaded and applied automatically as OTA (Over the
Air) updates. Occasionally it would be infeasible to distribute an update this
way, and a new `urbit` binary is released. This is announced in the [urbit-dev](https://groups.google.com/a/urbit.org/forum/#!forum/dev)
Google Group when it occurs (as are all OTA updates). To update to the latest binary, follow
the same process outlined [above](#urbit) to download and extract it into a new folder
(the binary linked on this page will always be the latest). Then run it as
before with `./urbit path/to/sampel-palnet/`.

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

Good, your Dojo is working correctly. Now let's run our first useful command in the Dojo. The first thing you generally want to do with a new ship is to **mount** it. A ship being mounted means that it has a presence on your Unix filesystem, allowing files to be shared between Unix and your ship. To mount your ship, type `|mount %` at the Dojo prompt.

```
|mount %
>=
```

The `>=` output means that a command was successful. Now you can see your ship's files in its Unix directory.

## Using Landscape

Landscape is the Urbit web interface, and it's the best way to interact with your ship. Chrome and Brave are the recommended browsers for using Landscape. To get onto Landscape:

1. Start your ship. In the boot messages, look for a line that says something like `http: live (insecure, public) on 80`. The number given is the port that your ship is using.
2.  If the port given is 80, simply type `localhost` into your browser's address bar. If the given port is a different number, such as `8080`, you would type `localhost:8080`. Alternatively, you access landscape by navigating to `sampel-palnet.arvo.network` into your URL bar, where `sampel-palnet` is the name of your ship, without the `~`. You will need to [set up DNS proxying](@/using/operations/using-your-ship.md#dns-proxying) to use this option. To do so, simply run this command in your ship's Dojo: `> -dns-address &dns-address [%if .1.2.3.4]`, where `.1.2.3.4` is the IP address.
3. Type `+code` into your ship's Dojo. Copy-paste the returned code into the field asking for it in the browser page.
4. You're in! Now you can explore apps such as Chat for messages, Publish for blogging, and Weather.

### Joining the community

Once you are in Landscape we recommend joining the Urbit Community group. You
will need to obtain an invite, which can be had by first joining
the `~/~dopzod/urbit-help` chat channel and asking for an invitation from there.
This is most likely to succeed quickly during standard US West Coast working hours.
Once you have the invite you can accept it by navigating to your Groups by
clicking on All Groups in the upper left hand corner of Landscape, then Manage
All Groups, and in there you should see an invitation. From this interface you
can join the various Chat, Publish, and Link instances contained in the group.

You can join `~/~dopzod/urbit-help` from either Landscape or chat-cli. To join from
Landscape first click on the Messaging tile on the home screen. Then press Join Chat
in the upper left corner and enter `~/~dopzod/urbit-help` into the prompt and
press Join Chat. To join from chat-cli, first make sure your console has been switched from Dojo to the `:chat-cli` application by pressing `Ctrl-x`. The prompt will display `~sampel-palnet:chat-cli` if in the correct mode. Then type `;join ~/~dopzod/urbit-help` and press Enter.
