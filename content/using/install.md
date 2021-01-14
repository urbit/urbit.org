+++
title = "Install + Setup"
weight = 1
description = "How to install Urbit."
template = "page_indiced.html"
aliases = ["/docs/getting-started/"]
+++

This guide covers how to set up and install your own Urbit. Running Urbit on your own is somewhat technical, so if you're not technically inclined you may want to consider a [hosting provider](#hosting-providers).

## Overview 

There are two major components of the Urbit ecosystem: **Urbit OS** and **Urbit ID**.

The Urbit peer-to-peer (P2P) network is composed of instances of Urbit OS — also called **ships** — that run as virtual machines on any Unix platform. The Urbit ID registry is deployed on the Ethereum blockchain, and individual IDs exist as non-fungible ([ERC-721](https://eips.ethereum.org/EIPS/eip-721)) tokens. On the network, Urbit IDs function as network addresses, represented by pronounceable names like `~padmyn-pasnux`.

As we'll explain, there are a few types of Urbit ID, but everyday users tend to use **planets**, as full citizens of the network.

Two other types of ships are **stars** and **galaxies**. Together these perform essential infrastructural roles for the Urbit network. Each galaxy can distribute 256 stars, and each star can distribute 65,536 planets. So any given planet ultimately came from a specific star, which itself came from a specific galaxy. On the Urbit OS side, stars help route packets; galaxies are more like DNS root servers or ICANN members. The difference with Urbit in the analogy is that Urbit IDs are owned cryptographically by individuals, collectives, and companies alike, and accrue reputation independently.

If you just want to try Urbit out, there are also free IDs called **comets**. They are good for bots and people who are new to Urbit and want to check out the network, but they aren't good for building a reputation as a friendly and responsible peer. Their long names make them difficult to remember—and some communities ban comets to prevent spam—but they're still a good way to see what Urbit is about before buying your own planet.

To start with a comet, continue below. For planet instructions, see [further below](#boot-your-planet). For star or galaxy instructions, see [this section](#supernode).

## Installing Urbit

Regardless of your Urbit ID, you'll want the Urbit binary installed first. The Urbit binary runs on a Unix-like operating system – Ubuntu, Fedora, or macOS, for example.

### macOS and Linux

```sh
#macOS:
mkdir urbit
cd urbit
curl -JLO https://urbit.org/install/mac/latest
tar zxvf ./darwin.tgz --strip=1
./urbit

#Linux:
mkdir urbit
cd urbit
wget --content-disposition https://urbit.org/install/linux64/latest
tar zxvf ./linux64.tgz --strip=1
./urbit
```

Once you've followed the appropriate install instructions, you can check if everything went right by running the `./urbit` command. Installation was successful if you get a block of output that begins with the line below:

```
Urbit: a personal server operating function
```

To access your Urbit via HTTP on port 80 on Ubuntu, you may need to run the following:
```sh
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' /path/to/urbit
```
(Where `urbit` is the urbit executable downloaded with `wget` prior)

### Windows

> Please note that this method of installing Urbit is experimental, and we may not be able to assist you if you encounter issues related to WSL 2.

Urbit cannot run on Windows itself, but there is a convenient way to run a Linux distro using the [Windows Subsystem for Linux 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) on Windows 10. Install the Windows Subsystem for Linux 2 and open a Linux terminal in Windows, then follow the Linux installation instructions above. These instructions have been tested and verified for WSL 2 + Ubuntu 18.04 LTS, as demonstrated in `~sitful-hatred`'s step-by-step setup guide [here](https://subject.network/posts/urbit-wsl2/).

For performance reasons, do not install Urbit in the mounted Windows volume, but install it in the Linux file system. For example, in your home directory, which can be navigated to by entering `cd ~`.

## Setting up a comet {#comet}

**Comets** are 128-bit or 16 syllable Urbit IDs, that look like:

`~dasres-ragnep-lislyt-ribpyl--mosnyx-bisdem-nidful-marzod`

Comets are disposable, free identities that can be used to quickly join the network and try things out.

### Booting a comet

To boot a comet, go into the command line and run the following command from the `urbit` directory you created during [Urbit installation](#installing-urbit):

```sh
./urbit -c mycomet
```

Since your identity on the network is not verified, it may take up to an hour to generate your comet. As it boots, will spin out a bunch of boot messages and create a directory called `mycomet`. Toward the end of the boot process, you'll see something like:

```
ames: on localhost, UDP 31337.
http: live (insecure, public) on 8080
http: live ("secure", public) on 8443
http: live (insecure, loopback) on 12321
~sampel_marzod:dojo>
```

When your ship is finished booting, you will see either the `~sampel_marzod:dojo>` or `~sampel_marzod:chat-cli/` prompt. If you see `:chat-cli`, press `Ctrl-X` to switch into Dojo.

To exit Urbit, use `Ctrl-D` or enter `|exit` into Dojo.

To start your ship up again, run the following from your `urbit` directory (note the lack of `-c` argument):

```sh
./urbit mycomet
```

### The Dojo

Let's try our first command in the Dojo, the Urbit OS command line and Hoon REPL, to get oriented.

Type `(add 2 2)` into the Dojo. You should see the following:

```
~sampel_marzod:dojo> (add 2 2)
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

Landscape is the Urbit web interface, and it's the best way to interact with your ship. To access Landscape:

1. Start your ship. In the boot messages, look for a line that says something like `http: live (insecure, public) on 80`. The number given is the port that your ship is using.
2.  If the port given is 80, simply type `localhost` into your browser's address bar. If the given port is a different number, such as `8080`, you would type `localhost:8080`. You'll be met with a login prompt.
3. Type `+code` into your comet's Dojo. Copy-paste the returned code into the field asking for it in the browser page.
4. You're in! Now you can explore apps such as Chat, Publish, and more.

### Join a group

Now that you're on Landscape, join the Urbit Community, a great place for newcomers to ask questions.

Click the 'Groups' button on your Landscape home page, and then click the `Join Group` column. Then, enter `~bitbet-bolbel/urbit-community` into the field and press the `Join Group` button.

From the Urbit Community group you can join a variety of chatrooms, notebooks, and collections.

## Setting up a planet {#id}

There are two options for getting started with a planet. You can purchase an Urbit ID on your own and run Urbit yourself, or you can purchase a planet and hosting services through a [hosting provider](#hosting-providers).

### Acquire an Urbit ID

There are a few ways to get an Urbit ID:

- Getting an invitation from a friend.
- Purchasing an Urbit ID, including hosting, from a [hosting provider](#hosting-providers) such as [geturbitid.com](https://www.geturbitid.com/).
- Manually setting up and hosting an Urbit ID purchased from a third party such as [urbit.live](https://urbit.live), [OpenSea](https://opensea.io), [planet.market](https://planet.market/), [urbit.me](https://urbit.me), [urth systems](https://urth.systems/), or [Urbit Marketplace](https://urbitmarketplace.com/).

Note that when you buy a planet, you should ensure with the provider that the star is operating. If you already have a planet and need to escape a non-operational star, see [Escaping A Sponsor](@/using/operations/using-your-ship.md#escape).

### Hosting Providers {#hosting-providers}

Hosting providers will often sell you a planet and run your ship for you in a data center. This simplifies the process of setting up and maintaining your Urbit, but the service will probably cost a regular fee.

Urbit is designed to be portable. This means that if you sign up for hosting now but later want to cease service and run your Urbit yourself, you should be able to work with your hosting provider to obtain all of your data and boot your ship back up without losing anything.

Utilizing hosting does mean that you're trusting your provider with your data, but so long as you have an Urbit ID, you'll always own your identity.

Current hosting providers are:

- [Tlon Corporation](https://tlon.io): Tlon is the creator of Landscape and is primarily responsible for the creation and maintenance of the Urbit project itself.
- [Get an Urbit ID](https://www.geturbitid.com/): Get an Urbit ID was the first hosting provider and is run by a member of the Urbit community.

### About your Urbit ID wallet

Your Urbit ID is yours. As long as you control its cryptographic secrets, nobody can take it away from you. That's why it's important to know a little bit about the cryptographic architecture of Urbit secrets.

Urbit ID secrets operate as a system of separate but hierarchically related Ethereum key-pairs. For any given ID, this system of key-pairs is referred to as a **Hierarchical Deterministic (HD) Wallet**. the Urbit HD wallet. Each of these Ethereum addresses have different powers over the same identity, from setting networking keys for communicating in the Urbit network to transferring ownership of identities. Important elements of the HD wallet:

- **Master Ticket**: The "password" at the top of the hierarchy that determines the ownership. All other secrets are derived from this. If the rest of the wallet is lost or compromised, the master ticket can derive everything. You'll log into Bridge with this. Always keep your master ticket extremely safe.

- **Management Proxy**: Derived from the master ticket. Can perform non-ownership related operations such as configuring Urbit OS networking keys.

- **Keyfile**: Derived from the management proxy. Used as cryptographic proof that your Urbit ship is who it says it is. You use it to start up your ship for the first time.

### Get your keyfile {#keyfile}

As mentioned previously, there are a few ways to acquire a planet. All methods,
however, should result in you receiving at least one secret, such as a **master
ticket**. If you received an email invite to Urbit, the master ticket should be
a `.pdf` file in the passport folder inside the archive that you downloaded.

1. Connect to [Bridge](https://bridge.urbit.org).
2. Enter the name of your planet and the associated master ticket in the appropriate fields. Click the "Metamask, Mnemonic, Hardware Wallet..." button for alternate login methods if you don't have a master ticket.
3. Once you're logged in, click the "OS" option.
4. In resulting page, click the "Download Arvo Keyfile" button. You should
   receive a `.key` file that contains the secret needed to boot your ship. Hold
   onto this file. This may be grayed out if you are not using a master ticket.
   If so, click on "Reset Networking Keys", then click on "Reset Networking Keys" on
   the following page, validate the transaction using your wallet, and then
   click Send Trasaction. Once the transaction is complete, the "Download Arvo
   Keyfile" button should be available for you to press.

### Choose to host or run your ship locally

There are two supported ways of running an Urbit ship: using a cloud service, or running it locally on your own machine. Most users run things locally at first, but we recommend eventually using a cloud service for Urbit because it allows your ship to be accessed from anywhere on multiple devices. Hosting your ship in the cloud also allows it to always be online and ready for OTA updates. It's technically possible to run your Urbit ship on a home server, but ISPs often restrict this to business plans and opening up your home network to the internet can be unsafe if done improperly.

We have a guide for [hosting your ship on DigitalOcean](@/using/operations/hosting.md) which we've found works well, but any cloud hosting service should work.

### Boot your planet

You'll be booting your ship with the keyfile that you downloaded from Bridge.

#### Step 1: Find the path to your keyfile

Find the absolute path to the keyfile that you downloaded from Bridge. Copy it.

#### Step 2: Run the boot command

Enter your `urbit` directory.

Once you're inside, run the command below, except with `sampel-palnet` replaced by the name of your
Urbit identity, and `path/to/my-planet.key` replaced with the path to your keyfile:

```sh
./urbit -w sampel-palnet -k path/to/my-planet.key
```

Or, if you'd prefer to copy-paste your key, you can run:

```sh
./urbit -w sampel-palnet -G rAnDoMkEy
```

Either command will create a directory called `sampel-palnet/` and begin building your ship. It may take a few minutes.

When your ship is finished booting, you will see either the `~sampel-palnet:dojo>` or `~sampel-palnet:chat-cli/` prompt. If you're seeing `:chat-cli` press `Ctrl-X` to switch into Dojo.

To shut down your ship, use `Ctrl-D`. To start your ship up again, run the following from your `urbit` directory:

```sh
./urbit sampel-palnet
```

Note that `sampel-palnet/` is the path of a folder, which we just created in your `urbit` directory. This folder is called your ship's **pier**.

Never boot multiple instances of your ship at the same time. You can prevent this from happening on accident by only ever keeping a single copy of your pier.

**Important:** once a key has been used to boot a ship onto the network, it cannot be used to boot that ship again later - doing so will cause communication problems with other ships. For this reason you should **delete the keyfile from your machine once your ship has booted successfully**. If you do use the same key twice, you'll need to conduct a [personal breach](#breaches) to restore your ship to full functionality).

Delete the keyfile with the command below:

```sh
rm path/to/my-planet.key
```

### Updating to the latest binary {#updating}

Most updates to Urbit are downloaded and applied automatically as OTA (Over the Air) updates. Occasionally it would be infeasible to distribute an update this way, and a new `urbit` binary is released. This is announced in the [urbit-dev](https://groups.google.com/a/urbit.org/forum/#!forum/dev) Google Group when it occurs (as are all OTA updates).

To update to the latest binary, download and extract it to replace your existing one. Then run it as before.

First shut down your ship, by running the following in dojo (or with `Ctrl-D`).
```
|exit
```

Next download and extract the most recent binary from inside your `urbit` directory:
```sh
#macOS:
curl -JLO https://urbit.org/install/mac/latest
tar zxvf ./darwin.tgz --strip=1

#Linux:
wget --content-disposition https://urbit.org/install/linux64/latest
tar zxvf ./linux64.tgz --strip=1
```

**NOTE**: Do not delete the directory named after your ship. Your ship itself can be reused, only the binary needs to be changed. This is why we have the directory structure configured as an `urbit` directory that contains your ship and your binary. This structure makes it easy to swap in new binaries.

Start up your ship with the new binary from your `urbit` directory:
```sh
./urbit sampel-palnet
```

Then you're good to go!

### Breaches {#breaches}

An important concept on the Urbit network is that of continuity. Continuity refers to how ships remember the order of their own network messages and the network messages of others — these messages are numbered, starting from zero. A breach is when ships on the network agree to forget about this sequence and treat one or more ships like they are brand new.

There are two kinds of breaches: personal breaches and network breaches.

A personal breach can fix many problems with your ship, but should be used as a last resort. A network breach happens when there's a major software update and you must download a new binary.

For details on breaching, please read the [Guide to Breaches](@/docs/tutorials/guide-to-breaches.md) documentation.

## Running a star or galaxy {#supernode}

Setting up and running a star or galaxy is a little bit different from setting up and running a planet.

### Getting a star or galaxy

Stars are valuable cryptographic assets. They can be bought in one of two ways.

- Transacting privately with a star owner.
- Buying a star on a marketplace like [OpenSea](https://opensea.io/collection/urbit-id)

Galaxies are rare and extremely valuable, meaning that there is no liquid market for them. If you want to buy a galaxy, you'll have to find an individual galaxy owner and transact with them.

### A note on security

As mentioned before, stars are valuable. You are solely responsible for safeguarding your seeds and secret keys, and arming yourself with the computer-security knowledge that is attendant upon that safeguarding. You act at your own risk in reliance upon the contents of the manual. In no way is the Tlon Corporation responsible for the actions, decisions, or other behavior taken or not taken by you in reliance upon this manual.

It’s a good idea to store your keys redundantly in case one method fails. If you deem a key to be valuable enough, you can shard it into thirds and store each third in secure, geographically distributed locations. Consider these storage media options:

- Storing the secret on a hardware wallet that is never connected to a networked machine.
- There are products that let you store the key on steel. This medium is resistant to both water damage and fire damage.

### Getting a star's keyfile

1. Connect to [Bridge](https://bridge.urbit.org).
2. Enter the name of your star and the associated master ticket in the appropriate fields. Click the "Metamask, Mnemonic, Hardware Wallet..." button for alternate login methods if you don't have a master ticket.
3. Once you're logged in, click the "OS" option.
4. In resulting page, click the "Download Arvo Keyfile" button. You should receive a `.key` file that contains the secret needed to boot your ship. Hold onto this file.

### Boot your star

Because of their need for near-perfect uptime Stars should be hosted on cloud services. We have a guide for [hosting on DigitalOcean](@/using/operations/hosting.md), but any cloud provider should work.

Being an infrastructure node, a star has certain responsibilities to the Urbit network.

By default, your star accepts software updates from its galaxy and routes them to its planets. You can use this mechanism to push custom software to your planets. Keep in mind that planets expect functional, non-breaking software updates, and generally want to be able to communicate with planets that are sponsored by other stars.

To ensure new planets can connect to your ship, users are expected to participate in network-wide breaches by updating to the latest Urbit version, deleting (or archiving) your pier, and then booting your ship using the new binary. If you don’t participate, you won’t be able to communicate with anyone on the network who has updated to the new era.

Network-wide breaches are distinct from personal breaches, wherein an individual ship cycles its personal network keys using bridge.

See our [Guide to Breaches](@/docs/tutorials/guide-to-breaches.md) for more information and for instructions on breaching.

### Running a galaxy

A galaxy is at the top of the hierarchy in terms of importance. Thus, if you're interested in running one, please contact support@urbit.org, and we will give you personalized assistance in getting set up.
