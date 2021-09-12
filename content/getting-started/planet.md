+++
title = "Setting up your urbit"
weight = 1
description = "Getting started with a permanent Urbit identity."
+++

A planet is a permanent Urbit identity. Like all Urbit identities, they can never be taken away from you. Unlike comets which are free, planets are designed for use well into the future. If you're not yet familiar with the Urbit network, please follow the [Getting Started guide](/getting-started/), which will explain the basics and walk you through using a free identity. This guide explains the next steps.

### Purchase a planet {#purchase}

There are a few ways to get your own planet:

- Getting an invitation from a friend (or stranger).
- Purchasing a planet, including hosting, from a [hosting provider](#hosting-providers) such as [geturbitid.com](https://www.geturbitid.com/).
- Manually setting up and hosting a planet purchased from a third party such as [urbit.live](https://urbit.live), [OpenSea](https://opensea.io), [planet.market](https://planet.market/), [urbit.me](https://urbit.me), [urth systems](https://urth.systems/), or [Urbit Marketplace](https://urbitmarketplace.com/).

Note that when you buy a planet, you should ensure with the provider that your parent star is operating. If you need to escape a non-operational star, see [Escaping A Sponsor](/using/id/using-bridge#escaping-your-sponsor).

### Hosting Providers {#hosting-providers}

Hosting providers will often sell you a planet and run it for you. This option is very simple but will probably cost a regular fee.

Urbit is designed to be portable. This means that if you sign up for hosting now but later want to leave your hosting provider and run your Urbit yourself, you should be able to work with them to obtain all of your data and boot your planet back up without losing anything.

Using hosting does mean that you're trusting your provider with your data, but so long as you have your planet, you'll always own your identity.

Current hosting providers are:

- [escape pod store](https://www.escapepod.store/)
- [Third Earth](https://third.earth/)
- [Tlon Corporation](https://tlon.io)
- [UrbitHost](https://urbithost.com)

### Choose to run your planet on your computer or on a cloud service

Urbit must run on an existing computer somewhere. Most users run their planet on their personal computer, but we recommend eventually using a cloud service (Digital Ocean, Linode, etc) because it allows your planet to be accessed from anywhere on multiple devices. Hosting your planet in the cloud also allows it to always be online and ready for automatic updates. You are welcome to run from your personal computer and switch to the cloud later...all without losing any data!

There is a guide for [hosting your planet on DigitalOcean](/using/running/hosting) and [hosting your planet on Linode](https://jeremytunnell.com/2021/01/09/how-to-install-urbit-on-a-linode-vps), but any cloud hosting service should work.

### Get your keyfile {#keyfile}

If you received an email invite to Urbit, the master ticket should be a .pdf file in the passport folder inside the archive that you downloaded. **If you bought your planet or someone sent you one you probably do not have a master ticket, and you probably don't need one. Do not issue a new master ticket unless you are sure you need to.**

1. Connect to [Bridge](https://bridge.urbit.org). (Bridge is like an Urbit wallet)
2. Enter the name of your planet and the associated master ticket if you have one. Click the "Metamask, Mnemonic, Hardware Wallet..." button if you don't have a master ticket.
3. Once you're logged in, click the "OS" option.
4. Click the "Download Arvo Keyfile" button. If this is grayed out, click on "Reset Networking Keys", then click on "Reset Networking Keys" on the following page, validate the transaction using your wallet, and then click "Send Trasaction". Once the transaction is complete, the "Download Arvo Keyfile" button should be available for you to press. You should receive a `.key` file that contains the secret needed to boot your planet. Hold onto this file.

### Run the boot command {#the-dojo}

For other ships on the network to communicate with your ship, the computer it's
running on needs to be able to receive inbound UDP traffic. Therefore, it's
important when running your ship locally to use the `-p ames_port` flag (replace
`ames_port` with a public port number from 49152 to 65535) to specify on which
port you'll receive UDP traffic, and to forward inbound UDP traffic arriving at
your router on that port to your computer.

Navigate to your `urbit` directory. Open your keyfile (it is just a text file)
and copy the key inside. Paste it into the following command, except with
`ames_port` replaced with a public port number, and `sampel-palnet` replaced by
the name of your planet. **Do not include the tilde in your planet name.**

```sh
./urbit -p ames_port -w sampel-palnet -G rAnDoMkEy
```

Or you can copy the keyfile into the current directory and run:

```sh
./urbit -p ames_port -w sampel-palnet -k ./my-planet.key
```

Either command will create a directory called `sampel-palnet/` and begin booting your planet. It may take a few minutes.

When your planet is finished booting, you will see `~sampel-palnet:dojo>` (Dojo: the Urbit command line).

To log into [Landscape](/docs/glossary/landscape), check out the directions [here](/getting-started/#using-landscape).

To shut down your planet, use `Ctrl-D`.

To start your planet up again, run the following from your `urbit` directory, with `ames_port` replaced with the public port number you used when first booting your ship.

```sh
./urbit -p ames_port sampel-palnet
```

Note that `sampel-palnet/` is the path of a folder, which we just created in your `urbit` directory. This folder is called your planet's **pier**, and it holds all of your data.

Never boot multiple instances of your planet at the same time. You can prevent this from happening on accident by only ever keeping a single copy of your pier.

**Important:** once a key has been used to boot a planet onto the network, it cannot be used to boot that planet again later - doing so will cause communication problems with other planets. For this reason you should **delete the keyfile from your machine once your planet has booted successfully**. If you do use the same key twice, you'll need to reset your planet to restore its functionality.

Delete the keyfile with the command below:

```sh
rm ./my-planet.key
```

## Setup {#setup}

The first thing you generally want to do with a new planet is to **mount** it. A planet being mounted means that it can be seen by Linux, allowing files to be shared between it and your planet. To mount your planet, type `|mount %` at the Dojo prompt.

```
|mount %
>=
```

The `>=` output means that a command was successful. Now you can see your planet's files in its directory.

To understand what happened with this command, read more about Urbit’s filesystem (called “clay”) [here](/docs/arvo/clay/clay).

## Updating {#updating}

By default, planets have a sponsor — a star that provides updates and routing services. To see who you receive updates from, enter `|ota` in the dojo. You will see something like this:

```
~sampel-palnet:dojo> |ota
OTAs enabled from %kids on ~dopzod
use |ota %disable or |ota ~sponsor %kids to reset it
> |ota
>=
```

If for some reason your sponsor (in this case, `~dopzod`) is not responding, read instructions on [escaping your sponsor](/using/id/using-bridge#escaping-your-sponsor).

## Next Steps

Now that you’re up and running, take some time to deepen your understanding by checking out some of our other guides:

- [Host your Ship in the Cloud](/using/running/hosting): Follow this guide to set your ship up to run as a cloud server, accessible from anywhere.
- [Read the Operations Manual](/using/os/getting-started): Become an expert pilot by learning to use your ship.
- [Learn to Develop on Urbit](/docs/development/develop): Learn how to contribute to or develop on Urbit.
