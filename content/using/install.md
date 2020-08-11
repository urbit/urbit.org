+++
title = "Install + Setup"
weight = 1
description = "How to install Urbit."
template = "page_indiced.html"
aliases = ["/docs/getting-started/"]
+++

Urbit is not yet ready for everyday users — but if you're technically inclined or generally intrepid, feel free to try it out. It's a good place to explore.

In order to get going on the network, you'll need an [Urbit ID](#id). To try the live network out with a disposable identity, you can always [create a comet](@/using/operations/creating-a-comet.md).

## Overview

There are two major components of the Urbit ecosystem: **Urbit OS** and **Urbit ID**.

The the Urbit peer-to-peer (p2p) network is composed of instances of Urbit OS -- callled **ships** -- that are virtual machines that run on any Unix platform.

Urbit works as a p2p network where others fail because ships are associated with persistent and scarce identities that we refer to as Urbit IDs. The Urbit ID registry is deployed on the Ethereum blockchain, and individual IDs exist as non-fungible ([ERC-721](https://eips.ethereum.org/EIPS/eip-721)) tokens in that cryptographic ecosystem that chain. While Urbit ID is the essential crytopgraphic foundation to the functioning of the Urbit network, it has uses far beyond that. It can be used as general-purpose identity infrastructure for any other project.

On the network, Urbit IDs function as network addresses, represented by pronounceable names like `~padmyn-pasnux`. There are a few kinds of Urbit ID, but ones meant for typical users are called **planets**. Anyone who has a planet can be thought of as a full "citizen" of the Urbit network. But to run your ship on the network, you need to start it with a piece of cryptographic information from its Urbit ID. This guide walk you through getting onto Urbit with an ID.

But sometimes a user might not want a persistent identity for whatever reason. In that case, they can use Urbit without an Urbit ID by using something called called a **comet**. Comets can be spun up at will and for free. They are good for bots and for people who are new to Urbit and want to check out the network, but they aren't good for building a reputation as a friendly and responsible peer. If you want to jump right in with a comet, check out [this](#comet) section.

### Stars and Galaxies

In addition to comets and planets, two other types of ships are **stars** and **galaxies**. Together these can be referred to as "supernodes," because they perform essential infrastructural roles for Urbit OS network and for Urbit ID.

On the Urbit ID side galaxies, galaxies are at the top of the ID hierarchy, with 256 in existence. Each galaxy can distribute 256 stars, and each star can distribute 65,536 planets. So any given planet ultimately came from a specific star, which itself came from a specific galaxy.

On the Urbit OS side, stars help route packets, kind of like an ISP. And galaxies are like DNS root servers or ICANN members. The difference is that Urbit IDs are owned cryptographically by many different people and accrue reputation independently.

If you're trying to get your star or galaxy set up, skip to [this section](#supernode).

## Comet: Install and Setup {#comet}

Eager to try out the Urbit network? A comet is the fastest way to get started.

### Installing Urbit

The Urbit binary runs on a Unix-like operating system – Ubuntu, Fedora, or macOS, for example.

We have different installation instructions for different platforms. To install and run Urbit OS, and its binary, run the commands that are listed for your operating system.

Once you've followed the appropriate install instructions, you can check if everything went right by running the `./urbit` command. Installation was successful if you get a block of output that begins with the line below:

```
Urbit: a personal server operating function
```

### macOS

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.8-darwin.tgz
tar xzf urbit-v0.10.8-darwin.tgz
cd urbit-v0.10.8-darwin
./urbit
```

### Linux (64-bit)

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.8-linux64.tgz
tar xzf urbit-v0.10.8-linux64.tgz
cd urbit-v0.10.8-linux64
./urbit
```

To access your Urbit via HTTP on port 80 on Ubuntu, you may need to run the following:

```sh
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' /path/to/urbit
```
(Where `urbit` is the urbit executable downloaded with `curl` prior)

### Windows

> Please note that this method of installing Urbit is experimental, and we may not be able to assist you if you encounter issues related to WSL 2. These instructions have been tested and verified for WSL 2 + Ubuntu 18.04 LTS.

Urbit cannot run on Windows itself, but there is a convenient way to run a Linux distro using the [Windows Subsystem for Linux 2](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) on Windows 10. For Urbit to work, it is necessary to [install WSL 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) and not just WSL.

Once WSL 2 is installed, open a Linux terminal in Windows and then follow the Linux installation instructions above. For performance reasons, do not install Urbit in the mounted Windows volume, but install it in the Linux file system. For example, in your home directory, by typing `cd ~`.

### Booting Your Comet

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

Welcome to your comet! Let's try our first command in the Dojo, the Urbit OS command line and Hoon REPL, to get oriented.

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

### Using Landscape

Landscape is the Urbit web interface, and it's the best way to interact with your ship. Chrome and Brave are the recommended browsers for using Landscape. To get onto Landscape:

1. Start your ship. In the boot messages, look for a line that says something like `http: live (insecure, public) on 80`. The number given is the port that your ship is using.
2.  If the port given is 80, simply type `localhost` into your browser's address bar. If the given port is a different number, such as `8080`, you would type `localhost:8080`. You'll be met with a login prompt.
3. Type `+code` into your comet's Dojo. Copy-paste the returned code into the field asking for it in the browser page.
4. You're in! Now you can explore apps such as Chat for messages, Publish for blogging, and Weather.

### Join a Chat

Now that you're on landscape, let's join the Urbit Community chat, a great place for newcomers to ask questions.

Click that `Chat` type on your Landscape home page, and then click the `Join Chat` column. Then, enter `~bitbet-bolbel/urbit-community` into the field and press the `Join Chat` button.

You can send and receive messages here, just like any other chatroom.

### Make a Note

Navigate back to your Landscape homepage. Typing `localhost` (or the correct equivalent) into your search bar does the trick.

Then click the `Publish` tile. Fill the fields as appropriate to make a new Notebook and invite anyone you want to be able to read it as a subscriber. A Notebook can be treated like a blogs, or a public list of notes. One you have made a Notebook, you can start posting entries to it. Navigate back to it at any time by clicking the tile.

## Planet Setup {#planet}

If you have a planet, you have a full and persistent peer on the Urbit network.

### Getting Urbit ID

Tlon doesn't currently sell or distribute Urbit IDs, but there are a few ways to get your own:

- Getting an invitation from a friend
- Purchasing an Urbit ID from a third party, such as [urbit.live](https://urbit.live), [OpenSea](https://opensea.io), [planet.market](https://planet.market/), or [Urbit Marketplace](https://urbitmarketplace.com/).

Tlon occasionally selects candidates to distribute invitations, and users operating galaxies and stars can spawn and distribute a finite number of stars and planets, respectively.

### Using your Urbit ID {#id}

If you have an Urbit ID, you'll use the [Bridge](https://bridge.urbit.org) client to get your ship's *keyfile* before you can [boot your ship](#booting-your-ship).  Your keyfile is a cryptographic secret that allows your Urbit instance to authenticate itself on the network, so you can't boot your planet without it. Your keyfile is deterministically derived from your other cryptographic secrets.

### The Urbit ID Wallet

Your Urbit ID is actually yours. As long as you control its cryptographic secrets, nobody can take it away from you. That's why it's important to know a little bit about the cryptographic architecture of Urbit secrets.

Urbit ID secrets operate as a system of separate but hierarchically realted Ethereum key-pairs. For any given ID, this system of key-pairs is referred to as a **Hierarchical Deterministic (HD) Wallet**. the Urbit HD wallet. Each of these Ethereum addresses have different powers over the same identity, from setting networking keys for communicating in the Urbit network to transferring ownership of identities. Important elements of the HD wallet:

- **Master Ticket**: The "password" at the top of the hierarchy that determines the ownership. All other secrets are derived from this. If the rest of the wallet is lost or compromised, the master ticket can rederive everything. You'll log into Bridge with this. Always keep your master ticket extremely safe.

- **Management Proxy**: Derived from the master ticket. Can perform non-ownership related operations such as configuring Urbit OS networking keys.

- **Keyfile**: Derived from the management proxy. Used as crytographic proof that your Urbit ship it is who it says it is. You use it to start up your ship for the first time.

### Getting Your Keyfile {#keyfile}

As mentioned previously, there are a few ways to acquire a planet. All methods, however, should result in you receiving at least one secret, such as a **master ticket**. If you received an email invite to Urbit, the master ticket should a `.pdf` the passport folder that you downloaded.

1. To connect to Bridge, go to https://bridge.urbit.org.
2. Enter the name of your planet and the associated master ticket in the appropriate fields. If you received your secret is in another form, such as a dictionary mnemonic, click the `Metamask, Mnemonic, Hardware Wallet...` button for alternate login methods.
3. Once you're logged in, click the `OS` option.
4. In resulting page, click the `Download Arvo Keyfile` button. You should receive a `.key` file that contains the secret needed to boot your ship. Hold on to this file.

## Installation

There are two supported ways of running an Urbit ship: using a [cloud service](#cloud), or running it [locally on your own machine](#local). We recommend using a cloud service for Urbit because, because it it's more reliable than running it locally and allows your ship to be easily access from anywhere. Using a cloud service costs money and has a more involved setup process, but it's more convenient to use than a local install.

A cloud service that we like is DigitalOcean, so we give instructions for running Urbit on that service.

### Option A: DigitalOcean {#cloud}

DigitalOcean, a cloud hosting platform, is a good option for hosting an Urbit ship.

#### Registration

Navigate to https://www.digitalocean.com/ and sign up with your email address. You'll need to add a credit cart or a PayPal to start an account. The final part of the registration process involves choosing what we're trying to get online. Simply choose "Ubuntu server." You'll be asked to create a special password for your "Droplet"; remember it. It's different from your DO account password, and it's used to access your Droplet remotely.

The default resources you'll be given with your Droplet is 1 GB of memory, 1 CPU, and 25 GB of storage for 5 USD per month. It must be noted that Urbit ships require at least 2GB of memory to be present, so you'll either need to upgrade your DO Droplet or set up swap space.

#### Resizing Your Droplet  

If you're willing to spend a little bit of extra money, this is the easiest method for getting your Urbit online and running smoothly.

An Urbit instance needs 2GB of memory available -- it doesn't need to use all of it, it just needs know that it's there. This memory is in addition to anything that the operating system and other processes require.

1. On the sidebar, click `Droplets`.
2. There should one option with a name that looks like `ubuntu-s-1vcpu-1gb-nyc1-01`. Click on the the `More`, and on the resulting dropdown menu click `Resize Droplet`.
3. On the resize page there is an `On` button for your Droplet. Click it off.
4. Make sure the `CPU and RAM only` category is selected. Then scroll down and select the option that provides 3 GB of memory. This will bump your fee to 15 a months
5. Turn your Droplet back on.

Now you can continue onto installing the Urbit software on your Droplet.

#### Setting Up Swap Space

If you've set up a Droplet to have more than 2 GB of memory, skip this section.

Alternatively, if you don't want to pay the extra money, you can configure swap space to run on a smaller DO instance. Digital Ocean has a post on adding swap [here](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04) that will walk you through the process. Once you've completed, you can continue to installing Urbit on your Droplet.

#### Installing Urbit On Your Droplet

Let's access your Droplet by using SSH, which is a secure protocol for using a remote computer.

1. Find your Droplet's IP address on your DigitalOcean account. It will be under the `Droplets` option on the `Manage` sidebar. Copy the IP address and keep it handy.
2. Open you local computer's terminal. Then run the SSH command, which has the syntax `ssh root@1.2.3.4`, where `1.2.3.4` is the IP address that you copied. Your Droplet's default name is `root`, but this can be changed.
3. You'll be prompted with a password. Enter the one that you set earlier. If you see a block of messages beginning with something like `Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-66-generic x86_64)` and ending with something like `root@ubuntu-s-1pvcu-1gb-nyc1-01:`, you're in!

Now that you're inside your Droplet, you'll want to install the Urbit binary. Run the following commands:

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.8-linux64.tgz
tar xzf urbit-v0.10.8-linux64.tgz
cd urbit-v0.10.8-linux64
./urbit
```

If you see a block of messages beginning with `Urbit: a personal server operating function`, then you've successfully installed the Urbit software, and it's time to copy your keyfile that from your local machine, the one that ends in `.key` that you got from the [Getting Your Keyfile](#keyfile) instructions. Open it with a text editor and keep it handy so you can copy it. Then return to the terminal window that's running your Droplet.

Now, on your Droplet, you'll want to use a Linux functionality called Scree. Screen is used to create virtual terminals (windows) to run persistent processes in the same remote session, so we don't have to close those processes whenever we want to do other things on our Droplet. This makes Screen perfect for running a remote Urbit ship.

To start Screen, enter

```
screen
```

You'll be met with some copyright information. Hit enter or return to move past this info. Once you're inside Screen, you use `Ctrl-a` to tell it that you're about to enter a command. Screen is controlled through keyboard shortcuts. Here are some useful ones to be run inside a Screen:

- To create a new Screen window, enter `Ctrl-a` and then `c`.
- To exit a Screen window and go back to your regular Droplet terminal ("Detach" it), enter `Ctrl-a` and then `d`.
- To see all Screen shortcuts, enter `Ctrl-a` and then `?`.

There are a few useful Screen commands that can be run from your regular Droplet terminal.

- To see all running Screen windows, enter `screen -ls`. This is useful if you're not sure if you're inside a Screen window; if you are, it will show a window as "Attached". (Note that you'll only ever need one screen for the purposes of hosting an Urbit remotely)
- To return to the Screen window that you made ("Attach" it), enter `screen -r`.
- To delete *all* Screen windows, enter `killall screen`.

Now, let's put this information to use to boot your Urbit ship in a Screen window.

1. Enter `cd urbit-v0.10.8-linux64` to change your directory to the folder containing the Urbit binary.
2. Enter `screen -ls`. If you get anything but a message like `No Sockets found in /run/screen/S-root.`, run `killall screen` to wipe the slate clean.
3. Enter `screen` and skip past the information. You're in an attached Screen window now; enter `screen -ls` to verify this.
4. Open your keyfile on your local machine and copy the contents. On the Screen in your Droplet, enter `./urbit -w sampel-palnet -G rAnDoMkEy`, where `rAnDoMkEy` is the copied contents of the keyfile.

Your ship should be booting, and displaying a series of boot messages starting with `urbit 0.10.8`. A directory called `sampel-palnet/` and begin building your ship. It may take a few minutes.

When your ship is finished booting, you will see either the `~sampel-palnet:dojo>` or `~sampel-palnet:chat-cli/` prompt. If you're seeing `:chat-cli` press `Ctrl-x` to switch into Dojo. At that point, you should permanently erase your keyfile from your machine.

To shut down your ship, use `Ctrl-d`. Since you're running, you won't have much reason to do this often, since you should always have it running in your Droplet. More frequently you'll want to use `Ctrl-a` and then `d` to go back to your Droplet's command line while keeping your planet running on a detached Screen. Then, to return to your ship, run `screen -r`.

If you need to shut down your ship, start it up again by running `./urbit sampel-palnet/` from the directory where your Urbit binary is saved. Note that in this usage, `sampel-palnet/` is the path of a folder, which by default is located in the same folder as the Urbit binary. This folder is called your ship's **pier**.

Never boot multiple instances of your ship at the same time. You can prevent this from happening accidently by only ever keeping a single copy of your pier.

Now you're ready to explore the network and make your ship easily accessible from a remote browser. Jump to the [System Administration](#admin) section to do so.

### Option B: Local Installation {#local}

You can run an Urbit on your laptop, your desktop, or an old tower in your closet. There are fewer steps than installing it on a cloud service, but it won't be as slick of an experience in the long run.

The Urbit binary runs on a Unix-like operating system. We have different installation instructions for different platforms. To install and run Urbit OS, the Urbit OS and its binary, run the commands that are listed for your operating system.

Once you've followed the appropriate install instructions, you can check if everything went right by running the `./urbit` command. Installation was successful if you get a block of output that begins with the line below:

```
Urbit: a personal server operating function
```

#### macOS

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.8-darwin.tgz
tar xzf urbit-v0.10.8-darwin.tgz
cd urbit-v0.10.8-darwin
./urbit
```

#### Linux (64-bit)

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.8-linux64.tgz
tar xzf urbit-v0.10.8-linux64.tgz
cd urbit-v0.10.8-linux64
./urbit
```

To access your Urbit via HTTP on port 80 on Ubuntu, you may need to run the following:

```sh
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' /path/to/urbit
```
(Where `urbit` is the urbit executable downloaded with `curl` prior)

#### Windows

Please note that this method of installing Urbit is more experimental, and we may not be able to assist you if you encounter issues related to WSL 2, but these instructions have been tested and verified for WSL 2 + Ubuntu 18.04 LTS.

Urbit cannot run on Windows itself, but there is a convenient way to run a Linux distro using the [Windows Subsystem for Linux 2](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux), an initiative by Microsoft to bring Linux to Windows 10. For Urbit to work, it is necessary to [install WSL 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) and not just WSL, since version 2 uses virtualization and the real Linux kernel under the hood.

Once WSL 2 is installed, open a Linux terminal in Windows and then follow the Linux installation instructions above. For performance reasons, do not install Urbit in the mounted Windows volume, but install it in the Linux file system. For example, in your home directory, by typing `cd ~`.

### Booting Your Ship Locally

Now the rubber meets the road. You'll be booting your ship with the keyfile that you downloaded from Bridge [earlier in this document](#id).

Note that this section is only for booting a ship that uses the live Urbit network.

#### Step 1: Find Your Urbit ID

This will look something like `~lodleb-ritrul`. You can see the name of your Urbit ID when you log into your wallet using the [Bridge client](#id).

#### Step 2: Find the path to your keyfile

Find the absolute path to the keyfile that you downloaded from Bridge. Copy it.

#### Step 3: Run the boot command

If you are not already within the directory you installed above, enter it by running `cd urbit-v0.10.8-darwin` (for Mac) or `cd urbit-v0.10.8-linux64` (for Linux) from where you ran the install commands. It contains your Urbit binary, and your ship will be installed here as well.

For other ships on the network to communicate with your ship, the computer it's running on needs to be able to receive inbound UDP traffic.  Therefore, it's important when running your ship locally to use the `-p ames_port` flag (replace `ames_port` with a public port number from 49152 to 65535) to specify on which port you'll receive UDP traffic, and to forward inbound UDP traffic arriving at your router on that port to your computer.

Once you're inside, run the command below, except with `ames_port` replaced with a public port number, `sampel-palnet` replaced by the name of your
Urbit identity, and `path/to/my-planet.key` replaced with the path to your keyfile:

```sh
./urbit -p ames_port -w sampel-palnet -k path/to/my-planet.key
```

Or, if you'd prefer to copy your key in, you can run:

```sh
./urbit -p ames_port -w sampel-palnet -G rAnDoMkEy
```

Either command will create a directory called `sampel-palnet/` and begin building your ship. It may take a few minutes.

When your ship is finished booting, you will see either the `~sampel-palnet:dojo>` or `~sampel-palnet:chat-cli/` prompt. If you're seeing `:chat-cli` press `Ctrl-x` to switch into Dojo. At that point, you should permanently erase your keyfile from your machine.

To shut down your ship, use `Ctrl-d`. To start your ship up again, run `./urbit -p ames_port sampel-palnet/` from the directory where your Urbit binary is saved, and with `ames_port` replaced with the public port number you used when first booting your ship. Note that in this usage, `sampel-palnet/` is the path of a folder, which by default is located in the same folder as the Urbit binary. This folder is called your ship's **pier**, and you can put it wherever you like.

Never boot multiple instances of your ship at the same time. You can prevent this from happening on accident by only ever keeping a single copy of your pier.

## System Administration {#admin}

Welcome to your ship. Let's start exploring.

### The Dojo

Let's try our first command in the Dojo, the Urbit OS command line and Hoon REPL, to get oriented.

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

### Setting Up DNS {#dns}

Landscape is the Urbit web interface, and it's the best way to interact with your ship. Chrome and Brave are the recommended browsers for using Landscape. The best way to access Landscape is to set DNS proxying, so that you can access your ship easily from a web browser on any computer.

1. Start your ship. In the boot messages, look for a line that says something like `http: live (insecure, public) on 80`. The number given is the port that your ship is using.
2.  If the port given is 80, simply type `localhost` into your browser's address bar. If the given port is a different number, such as `8080`, you would type `localhost:8080`. Alternatively, you access landscape by navigating to `sampel-palnet.arvo.network` into your URL bar, where `sampel-palnet` is the name of your ship, without the `~`. You will need to [set up DNS proxying](@/using/operations/using-your-ship.md#dns-proxying) to use this option. To do so, simply run this command in your ship's Dojo: `> -dns-address &dns-address [%if .1.2.3.4]`, where `.1.2.3.4` is the IP address.
3. Type `+code` into your ship's Dojo. Copy-paste the returned code into the field asking for it in the browser page.
4. You're in! Now you can explore apps such as Chat for messages, Publish for blogging, and Weather.

### Joining the community

Once you are in Landscape we recommend joining the Urbit Community group. You will need to obtain an invite, which can be had by first joining the `~/~dopzod/urbit-help` chat channel and asking for an invitation from there. This is most likely to succeed quickly during standard US West Coast working hours. Once you have the invite you can accept it by navigating to your Groups by clicking on All Groups in the upper left hand corner of Landscape, then Manage All Groups, and in there you should see an invitation. From this interface you can join the various Chat, Publish, and Link instances contained in the group.

You can join `~/~dopzod/urbit-help` from either Landscape or chat-cli. To join from Landscape first click on the Messaging tile on the home screen. Then press Join Chat in the upper left corner and enter `~/~dopzod/urbit-help` into the prompt and press Join Chat. To join from chat-cli, first make sure your console has been switched from Dojo to the `:chat-cli` application by pressing `Ctrl-x`. The prompt will display `~sampel-palnet:chat-cli` if in the correct mode. Then type `;join ~/~dopzod/urbit-help` and press Enter.

### Updating to the latest binary

Most updates to Urbit are downloaded and applied automatically as OTA (Over the Air) updates. Occasionally it would be infeasible to distribute an update this way, and a new `urbit` binary is released. This is announced in the [urbit-dev](https://groups.google.com/a/urbit.org/forum/#!forum/dev) Google Group when it occurs (as are all OTA updates). To update to the latest binary, follow the same process outlined above to download and extract it into a new folder. (the binary linked on this page will always be the latest). Then run it as before with `./urbit path/to/sampel-palnet/`.

### Breaches

An important concept on the Urbit network is that of continuity. Continuity refers to how ships remember the order of their own network messages and the network messages of others -- these messages are numbered, starting from zero. A breach is when ships on the network agree to forget about this sequence and treat one or more ships like they are brand new.

There are two kinds of breaches: personal breaches and network breaches.

A personal breach can fix many problems with your ship, but should be used as a last resort. A network breach happens when there's a major software update and you must download a new binary.

For details on breaching, please read the [Guide to Breaches](@/docs/tutorials/guide-to-breaches.md) documentation.

### Reporting Bugs

If you find a bug, please report it as an Issue at https://github.com/urbit/urbit/issues/new/choose. Give as much detail as possible with your bug report so the engineer team can fix it.

## Running a Supernode

Setting up and running a star or galaxy is a little bit different from setting up and running a planet.

### Getting a Star or Galaxy

Stars are valuable cryptographic assets. They can be bought in one of two ways.

- Transacting privately with a star owner.
- Buying a star on a marketplace like [OpenSea](https://opensea.io/collection/urbit-id)

Galaxies are rare and extremely valuable, meaning that there is no liquid market for them. If you want to buy a galaxy, you'll have to find an individual galaxy owner and transact with them.

### A Note Regarding Security

As mentioned before, stars are valuable. You are solely responsible for safeguarding your seeds and secret keys, and arming yourself with the computer-security knowledge that is attendant upon that safeguarding. You act at your own risk in reliance upon the contents of the manual. In no way is the Tlon Corporation responsible for the actions, decisions, or other behavior taken or not taken by you in reliance upon this manual.

It’s a good idea to store your keys redundantly; for example, on both a USB stick and a piece of paper in the safe, in case one of those methods fails. If you deem a key to be valuable enough, you can shard it into thirds and store each third in secure, geographically distributed locations. Consider these storage media options:

- Printing the secret on a piece of paper. However, paper wallets are vulnerable to various forms of physical damage, such as rot, water damage, smoke, or fire. Laminating the paper can mitigates some of these risks, but the lamination can potentially trap moisture. Make sure that you trust the printer: some have memory and network connections.
- Storing the secret on a brand-new USB stick or hardware wallet (such as a Ledger) that is never connected to a networked machine.
- Engraving the secret on a strip of stainless steel. This medium is resistant to both water damage and fire damage.


### Getting a Star's Keyfile

1. To connect to Bridge, go to https://bridge.urbit.org.
2. Enter the name of your star and the associated master ticket in the appropriate fields. If you received your secret is in another form, such as a dictionary mnemonic, click the `Metamask, Mnemonic, Hardware Wallet...` button for alternate login methods.
3. Once you're logged in, click the `OS` option.
4. In resulting page, click the `Download Arvo Keyfile` button. You should receive a `.key` file that contains the secret needed to boot your ship. Hold on to this file.

### Star: Setup And Install

Because of their need for near-perfect uptime Stars should use cloud services. We like to use DigitalOcean (DO), and our instructions here support that service.

Navigate to https://www.digitalocean.com/ and sign up. You'll need to add a credit cart or a PayPal to start an account. The final part of the registration process involves choosing what we're trying to get online. Simply choose "Ubuntu server." You'll be asked to create a special password for your "Droplet"; remember it. It's different from your DO account password, and it's used to access your Droplet remotely.

The default resources you'll be given with your Droplet is 1 GB of memory, 1 CPU, and 25 GB of storage for 5 USD per month. It must be noted that Urbit ships require at least 2GB of memory to be present, so you'll either need to upgrade your DO Droplet.

#### Resizing Your Droplet  

An Urbit instance needs 2GB of memory available -- it doesn't need to use all of it, it just needs know that it's there. This memory is in addition to anything that the operating system and other processes require.

1. On the sidebar, click `Droplets`.
2. There should one option with a name that looks like `ubuntu-s-1vcpu-1gb-nyc1-01`. Click on the the `More`, and on the resulting dropdown menu click `Resize Droplet`.
3. On the resize page there is an `On` button for your Droplet. Click it off.
4. Make sure the `CPU and RAM only` category is selected. Then scroll down and select the option that provides 3 GB of memory. This will bump your fee to 15 a months
5. Turn your Droplet back on.

Now you can continue onto installing the Urbit software on your Droplet.

#### Installing Urbit On Your Droplet

Let's access your Droplet by using SSH, which is a secure protocol for using a remote computer.

1. Find your Droplet's IP address on your DigitalOcean account. It will be under the `Droplets` option on the `Manage` sidebar. Copy the IP address and keep it handy.
2. Open you local computer's terminal. Then run the SSH command, which has the syntax `ssh root@1.2.3.4`, where `1.2.3.4` is the IP address that you copied. Your Droplet's default name is `root`, but this can be changed.
3. You'll be prompted with a password. Enter the one that you set earlier. If you see a block of messages beginning with something like `Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-66-generic x86_64)` and ending with something like `root@ubuntu-s-1pvcu-1gb-nyc1-01:`, you're in!

Now that you're inside your Droplet, you'll want to install the Urbit binary. Run the following commands:

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.8-linux64.tgz
tar xzf urbit-v0.10.8-linux64.tgz
cd urbit-v0.10.8-linux64
./urbit
```

If you see a block of messages beginning with `Urbit: a personal server operating function`, then you've successfully installed the Urbit software, and it's time to copy your keyfile that from your local machine, the one that ends in `.key` that you got from the [Getting Your Keyfile](#keyfile) instructions. Open it with a text editor and keep it handy so you can copy it. Then return to the terminal window that's running your Droplet.

Now, on your Droplet, you'll want to use a Linux functionality called Scree. Screen is used to create virtual terminals (windows) to run persistent processes in the same remote session, so we don't have to close those processes whenever we want to do other things on our Droplet. This makes Screen perfect for running a remote Urbit ship.

To start Screen, enter

```
screen
```

You'll be met with some copyright information. Hit enter or return to move past this info. Once you're inside Screen, you use `Ctrl-a` to tell it that you're about to enter a command. Screen is controlled through keyboard shortcuts. Here are some useful ones to be run inside a Screen:

- To create a new Screen window, enter `Ctrl-a` and then `c`.
- To exit a Screen window and go back to your regular Droplet terminal ("Detach" it), enter `Ctrl-a` and then `d`.
- To see all Screen shortcuts, enter `Ctrl-a` and then `?`.

There are a few useful Screen commands that can be run from your regular Droplet terminal.

- To see all running Screen windows, enter `screen -ls`. This is useful if you're not sure if you're inside a Screen window; if you are, it will show a window as "Attached". (Note that you'll only ever need one screen for the purposes of hosting an Urbit remotely)
- To return to the Screen window that you made ("Attach" it), enter `screen -r`.
- To delete *all* Screen windows, enter `killall screen`.

Now, let's put this information to use to boot your Urbit ship in a Screen window.

1. Enter `cd urbit-v0.10.8-linux64` to change your directory to the folder containing the Urbit binary.
2. Enter `screen -ls`. If you get anything but a message like `No Sockets found in /run/screen/S-root.`, run `killall screen` to wipe the slate clean.
3. Enter `screen` and skip past the information. You're in an attached Screen window now; enter `screen -ls` to verify this.
4. Open your keyfile on your local machine and copy the contents. On the Screen in your Droplet, enter `./urbit -w sampel -G rAnDoMkEy`, where `rAnDoMkEy` is the copied contents of the keyfile.

Your ship should be booting, and displaying a series of boot messages starting with `urbit 0.10.8`. A directory called `sampel/` and begin building your ship. It may take a few minutes.

When your ship is finished booting, you will see either the `~sampel:dojo>` or `~sampel:chat-cli/` prompt. If you're seeing `:chat-cli` press `Ctrl-x` to switch into Dojo. At that point, you should permanently erase your keyfile from your machine.

To shut down your ship, use `Ctrl-d`. Since you're running, you won't have much reason to do this often, since you should always have it running in your Droplet. More frequently you'll want to use `Ctrl-a` and then `d` to go back to your Droplet's command line while keeping your planet running on a detached Screen. Then, to return to your ship, run `screen -r`.

If you need to shut down your ship, start it up again by running `./urbit sampel` from the directory where your Urbit binary is saved. Note that in this usage, `sampel/` is the path of a folder, which by default is located in the same folder as the Urbit binary. This folder is called your ship's **pier**.

Never boot multiple instances of your ship at the same time. You can prevent this from happening accidently by only ever keeping a single copy of your pier.

#### Maintaining a Star

Being an infrastructure node, a star has certain responsibilities to the Urbit network.

By default, your star accepts software updates from its galaxy and routes them to its planets. You can use this mechanism to push custom software to your planets. Keep in mind that planets expect functional, non-breaking software updates, and generally want to be able to communicate with planets that are sponsored by other stars.

To ensure new planets can connect to your ship, users are expected to participate in network-wide breaches by updating to the latest Urbit version, deleting (or archiving) your pier, and then booting your ship using the new binary. If you don’t participate, you won’t be able to communicate with anyone on the network who has updated to the new era.

Network-wide breaches are distinct from personal breaches, wherein an individual ship cycles its personal network keys using bridge.

See our [Guide to Breaches](@/docs/tutorials/guide-to-breaches.md) for more information and for instructions on breaching.

### Running a Galaxy

A galaxy is at the top of the hierarchy in terms of importance. Thus, if you're interested in running one, please contact support@urbit.org, and we will give you personalized assistance in getting set up.
