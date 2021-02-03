+++
title = "Install + Setup"
weight = 1
description = "How to install Urbit."
template = "page_indiced.html"
aliases = ["/docs/getting-started/"]
+++

This guide covers how to install and set up your own planet, but installation for a star is exactly the same. You will first install the Urbit binary, then you will either boot a comet or a planet.  It's not too difficult, but if you would prefer to have someone run your urbit for you, consider a [hosting provider](#hosting-providers).


## Installing Urbit

You'll want the Urbit binary installed first.

### Windows

> Please note that this method of installing Urbit is experimental, and we may not be able to assist you if you encounter issues related to WSL 2.

Urbit cannot run on Windows itself, but there is a convenient way to run Linux using the [Windows Subsystem for Linux 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) on Windows 10. Install the Windows Subsystem for Linux 2 and open a Linux terminal in Windows, then follow the Linux installation instructions below. These instructions have been tested and verified for WSL 2 + Ubuntu 18.04 LTS, as demonstrated in `~sitful-hatred`'s step-by-step setup guide [here](https://subject.network/posts/urbit-wsl2/).

For performance reasons, do not install Urbit in the mounted Windows volume, but install it in the Linux file system. For example, in your home directory, which can be navigated to by entering `cd ~`.

### macOS

```sh
mkdir urbit
cd urbit
curl -JLO https://urbit.org/install/mac/latest
tar zxvf ./darwin.tgz --strip=1
./urbit

```
### Linux
```sh
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

Now, you either want to boot either a comet or a planet.

If you just want to try Urbit out, you can use a comet. They disposable, free identities, that are good for people who are new to Urbit and want to check out the network, but they aren't good for building a reputation as a friendly and responsible resident. Their long names (example: `~dasres-ragnep-lislyt-ribpyl--mosnyx-bisdem-nidful-marzod`) make them difficult to remember—and some communities ban comets to prevent spam—but they're still a good way to see what Urbit is about before buying your own planet.

To start with a comet, continue below. For planet instructions, see further below.

## Booting a comet

To boot a comet, go into the command line and run the following command from the `urbit` directory you created during [Urbit installation](#installing-urbit):

```sh
./urbit -c mycomet
```

Since your identity on the network is not verified, it may take up to an hour to generate your comet. As it boots, it will spit out a bunch of boot messages and create a directory called `mycomet`. Toward the end of the boot process, you'll see something like:

```
ames: on localhost, UDP 31337.
http: live (insecure, public) on 8080
http: live ("secure", public) on 8443
http: live (insecure, loopback) on 12321
~sampel_marzod:dojo>
```

When your planet is finished booting, you will see either the `~sampel_marzod:dojo>` or `~sampel_marzod:chat-cli/` prompt. If you see `:chat-cli`, press `Ctrl-X` to switch into Dojo (the Urbit command line).

To exit Urbit, use `Ctrl-D` or enter `|exit` into Dojo.

To start your planet up again, run the following from your `urbit` directory (note the lack of `-c` argument):

```sh
./urbit mycomet
```

### Updating your comet

The Urbit binary comes with a somewhat recent release of the Urbit OS, but ships can update automatically ("over the air"), so new binaries aren't necessary every time it's updated. Planets have automatic updates enabled by default, but this is not the case for comets. Many comets are used only once and thrown away, so it would be wasteful to update every single comet as soon as it boots. If you plan to use your comet for more than a quick test, you'll probably want to ensure you're running the latest version of the OS.

You can enable updates for your comet by typing `|ota (sein:title our now our) %kids` into Dojo and pressing Enter.

```
> |ota (sein:title our now our) %kids
>=
```

If you want to make sure you'll get updates, you can check by typing `|ota` with no arguments:

```
~sampel_marzod:dojo> |ota
OTAs enabled from %kids on ~marzod
use |ota %disable or |ota ~sponsor %kids to reset it
> |ota
>=
```

Now that you’re up and running, skip ahead to the Setup guide.

## Booting a planet

There are two options for getting started with a planet. You can purchase one on your own and run Urbit yourself, or you can purchase a planet and hosting services through a [hosting provider](#hosting-providers).


### Purchase a planet

There are a few ways to get your own planet:

- Getting an invitation from a friend.
- Purchasing a planet, including hosting, from a [hosting provider](#hosting-providers) such as [geturbitid.com](https://www.geturbitid.com/).
- Manually setting up and hosting an planet purchased from a third party such as [urbit.live](https://urbit.live), [OpenSea](https://opensea.io), [planet.market](https://planet.market/), [urbit.me](https://urbit.me), [urth systems](https://urth.systems/), or [Urbit Marketplace](https://urbitmarketplace.com/).

Note that when you buy a planet, you should ensure with the provider that your parent star is operating. If you need to escape a non-operational star, see [Escaping A Sponsor](@/using/operations/using-your-planet.md#escape).

### Hosting Providers {#hosting-providers}

Hosting providers will often sell you a planet and run it for you. This option is very simple but will probably cost a regular fee.

Urbit is designed to be portable. This means that if you sign up for hosting now but later want to leave your hosting provider and run your Urbit yourself, you should be able to work with them to obtain all of your data and boot your planet back up without losing anything.

Using hosting does mean that you're trusting your provider with your data, but so long as you have your planet, you'll always own your identity.

Current hosting providers are:

- [Tlon Corporation](https://tlon.io): Tlon is the creator of Landscape and is primarily responsible for the creation and maintenance of the Urbit project itself.
- [Get an Urbit ID](https://www.geturbitid.com/): Get an Urbit ID was the first hosting provider and is run by a member of the Urbit community.


### Choose to run your planet on your computer or on a cloud service

Urbit must run on an existing computer somewhere.  Most users run their planet on their personal computer, but we recommend eventually using a cloud service (Digital Ocean, Linode, etc) because it allows your planet to be accessed from anywhere on multiple devices. Hosting your planet in the cloud also allows it to always be online and ready for automatic updates. You are welcome to run from your personal computer and switch to the cloud later...all without losing any data!

There is a guide for [hosting your planet on DigitalOcean](@/using/operations/hosting.md) and [hosting your planet on Linode](https://jeremytunnell.com/2021/01/09/how-to-install-urbit-on-a-linode-vps), but any cloud hosting service should work.

### Get your keyfile {#keyfile}

If you received an email invite to Urbit, the master ticket should be a .pdf file in the passport folder inside the archive that you downloaded. **If you bought your planet or someone sent you one you probably do not have a master ticket.**

1. Connect to [Bridge](https://bridge.urbit.org). (Bridge is like an Urbit wallet)
2. Enter the name of your planet and the associated master ticket if you have one. Click the "Metamask, Mnemonic, Hardware Wallet..." button if you don't have a master ticket.
3. Once you're logged in, click the "OS" option.
4. Click the "Download Arvo Keyfile" button. If this is grayed out, click on "Reset Networking Keys", then click on "Reset Networking Keys" on the following page, validate the transaction using your wallet, and then click "Send Trasaction". Once the transaction is complete, the "Download Arvo Keyfile" button should be available for you to press. You should receive a `.key` file that contains the secret needed to boot your planet. Hold onto this file.

### Run the boot command

Navigate to your `urbit` directory.

Open your keyfile (it is just a text file) and copy the key inside.  Paste it into the following command, with `sampel-palnet` replaced by the name of your
planet.

```sh
./urbit -w sampel-palnet -G rAnDoMkEy
```

Or you can copy the keyfile into the current directory and run:

```sh
./urbit -w sampel-palnet -k ./my-planet.key
```

Either command will create a directory called `sampel-palnet/` and begin building your planet. It may take a few minutes.

When your planet is finished booting, you will see either the `~sampel-palnet:dojo>` or `~sampel-palnet:chat-cli/` prompt. If you're seeing `:chat-cli` press `Ctrl-X` to switch into Dojo (the Urbit command line).

Get your password to log into landscape (the Urbit web interface) by typing:

```sh
+code
```

To shut down your planet, use `Ctrl-D`.

To start your planet up again, run the following from your `urbit` directory.

```sh
./urbit sampel-palnet
```

Note that `sampel-palnet/` is the path of a folder, which we just created in your `urbit` directory. This folder is called your planet's **pier**, and it holds all of your data.

Never boot multiple instances of your planet at the same time. You can prevent this from happening on accident by only ever keeping a single copy of your pier.

**Important:** once a key has been used to boot a planet onto the network, it cannot be used to boot that planet again later - doing so will cause communication problems with other planets. For this reason you should **delete the keyfile from your machine once your planet has booted successfully**. If you do use the same key twice, you'll need to reset your planet to restore its functionality.

Delete the keyfile with the command below:

```sh
rm ./my-planet.key
```

## Setup

The first thing you generally want to do with a new planet is to **mount** it. A planet being mounted means that it can be seen by Linux, allowing files to be shared between it and your planet. To mount your planet, type `|mount %` at the Dojo prompt.

```
|mount %
>=
```

The `>=` output means that a command was successful. Now you can see your planet's files in its directory.

To understand what happened with this command, read more about Urbit’s filesystem (called “clay”) [here](@/docs/tutorials/arvo/clay.md).

### Using Landscape

Landscape is the Urbit web interface, and it's the best way to interact with your planet. To access Landscape:

1. Start your planet. In the boot messages, look for a line that says something like `http: live (insecure, public) on 80`. The number given is the port that your planet is using.
2.  If the port given is 80, simply type `localhost` into your browser's address bar. If the given port is a different number, such as `8080`, you would type `localhost:8080`. You'll be met with a login prompt.
3. Type your password you got from running `+code` above.
4. You're in! Now you can explore apps such as Chat, Publish, and more.

### Join a group

Now that you're on Landscape, join the Urbit Community, a great place for newcomers to ask questions.

Click the 'Groups' button on your Landscape home page, and then click the `Join Group` column. Then, enter `~bitbet-bolbel/urbit-community` into the field and press the `Join Group` button.

From the Urbit Community group you can join a variety of chatrooms, notebooks, and collections.

## Next Steps

Now that you’re up and running, take some time to deepen your understanding by checking out some of our other guides:

- [Host your Ship in the Cloud](@/using/operations/hosting.md): Follow this guide to set your ship up to run as a cloud server, accessible from anywhere.
- [Read the Operations Manual](@/using/operations/using-your-ship.md): Become an expert pilot by learning to use your ship.
- [Learn to Develop on Urbit](@/using/develop.md): Learn how to contribute to or develop on Urbit.
