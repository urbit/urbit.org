+++
title = "Setting up your urbit"
weight = 2
description = "Getting started with a permanent Urbit identity."
+++

A planet is a permanent Urbit identity. Like all Urbit identities, they can
never be taken away from you. Unlike comets which are free, planets are designed
for use well into the future. If you're not yet familiar with the Urbit network
and are looking to try it out with a free Comet, are looking to purchase a
planet, or are looking for an easy hosting solution, see the [Getting Started
guide](/getting-started/) instead. This guide is for those who have already
obtained a planet and want to get it running for the first time.

## Step 1: Keyfile {#keyfile}

The Urbit runtime needs a planet's keyfile in order to boot it up for the first
time. The keyfile contains the private cryptographic keys necessary for a planet
to sign messages it sends and decrypt messages it receives. These keys are
separate from either your Master Ticket (if applicable) or the Ethereum keys
used to manage your Urbit ID. The method to obtain your planet's keyfile differs
slightly, depending on whether you're on a Master Ticket or use an alternative
custody method like a Metamask wallet, hardware wallet, etc.

### Master Ticket

A Master Ticket is like a paper wallet for your planet. From the planet name and
Master Ticket password, [Bridge](https://bridge.urbit.org) can derive everything
necessary to manage your Urbit ID, such as Ethereum addresses, networking keys,
and so on.

If you received an email invite to Urbit or were otherwise given an invite URL
and claimed your planet that way, you'll likely be on a Master Ticket. To get
the keyfile, you can look in the `.zip` file you downloaded when claiming your
planet - it'll be named `sampel-palnet-1.key` (except with your planet rather
than `sampel-palnet`).

If you have misplaced that `.key` file, you can also download it from
[Bridge](https://bridge.urbit.org). First, login to Bridge with your planet name
and Master Ticket password. Once in, click on `OS` and then `Download Arvo Keyfile`.

### Other methods

If you bought your planet from a third party such as
[OpenSea](https://opensea.io), [urbit.live](#https://urbit.live), or another
[third party](/getting-started#get-a-planet), or otherwise if someone
transferred the planet to an Ethereum address you own, you will probably not be
on a Master Ticket. This is perfectly fine and you don't need to transfer your
planet to a Master Ticket if you don't want to. The one small difference,
though, is that Bridge will not have automatically derived your keyfile.
Instead, you'll need to login to [Bridge](https://bridge.urbit.org) and perform
a transaction to set your Networking keys.

When you visit [Bridge](https://bridge.urbit.org), you'll need to select the
login option that says `Metamask, Mnemonic, Hardware Wallet...`, and it will
have a list of options:

- `Metamask` - If your planet is owned by your Metamask wallet, select this. It
  may prompt you to login to Metamask, then it will ask you to sign the `Bridge Authentication Token`. Once signed, you'll be logged into Bridge.

- `Ledger` and `Trezor` - If your planet is owned by one of these hardware
  wallets, select the appropriate one and follow its connection process.

- `WalletConnect` - If your planet is owned by a wallet which supports the
  WalletConnect protocol, select this and either scan the QR code or select one
  of the desktop options.

- `Mnemonic`, `Ethereum Private Key` and `Ethereum Keystore` - If your planet is
  owned by another Ethereum wallet which does not support WalletConnect, you can
  still login with one of these. `Mnemonic` lets you paste in the BIP39 mnemonic
  seed phrase (a series of random words) for your wallet. `Ethereum Private Key`, as the name suggests, lets you paste in the private key of the Ethereum
  address which owns your planet. `Ethereum Keystore` lets you upload an
  Ethereum keystore file and specify its password for decryption.

<small>Note: Bridge runs purely in your local browser, it does not transfer any
secrets across the network or store any secrets on a remote server. If you'd
prefer though, it's also possible to run the Bridge software locally (though
it's a little more more complicated), see the [Readme in the Bridge Github
repo](https://github.com/urbit/bridge) for details.</small>

If you've been transferred a planet and not yet accepted it, you'll need to do
that first (you can skip this bit if you've already done it). Having logged in
with one of the methods described above, you'll see see an `Incoming Transfer`
request. Click `Accept`, then click `Generate & Sign Transaction` (This will
require some ETH for transaction fees). Once the transaction's complete, click
on `return`.

Now that you're logged in to Bridge and have your planet, you can set the
networking keys. From the main screen for your planet, hit `OS` and then
`Initialize Networking Keys`. If the planet has never been spawned before, you
can leave `Breach Continuity` unchecked. Send the transaction (this will require
some ETH for transaction fees). Once complete, you can click `Download Arvo Keyfile` and save the `.key` file on your computer.

## Step 2: Install

Urbit must run on an existing computer somewhere. Some users run their planet on
their personal computer, but we recommend eventually using a cloud service
(Digital Ocean, Linode, etc) because it allows your planet to be accessed from
anywhere on multiple devices. Hosting your planet in the cloud also allows it to
always be online and ready for automatic updates. You are welcome to run from
your personal computer and switch to the cloud later...all without losing any
data!

### Port

Port is an Urbit GUI application available for MacOS, Linux and Windows. This
option is much easier but runs locally rather than in the cloud. Note that if
you have your planet in the cloud, Port can also be used as a client to connect
to your planet's web interface. [You can download Port
here](/getting-started#port).

### Command line

Running Urbit from the command line is suitable for either a cloud installation
or a local installation. If you're comfortable with the command line and would
like greater control over the Urbit virtual machine, this is the right option.
The Urbit runtime is available for Linux, MacOS and Windows.
Additionally, there are guides for [hosting your planet on
DigitalOcean](/using/running/hosting) and [hosting your planet on Linode
(external
link)](https://jeremytunnell.com/2021/01/09/how-to-install-urbit-on-a-linode-vps),
though most other cloud providers should be fine as well. [See here for download
and installation instructions](/getting-started/cli).

## Step 3: Boot

### Port

If you've decided to use Port, booting is very simple. Just start up Port and select `Boot a fresh ID`. Then, give your ship a name in the `Name` field - this is just for convenience, a label used locally by Port to identify your planet. In the `Shipname` field, just enter your planet name like `~sampel-palnet`. Lastly, for the `Key File`, you can browse to the keyfile you downloaded in [Step 2](#keyfile), select it, and hit `Continue`. It'll take a few minutes to boot up your ship, and then you should be good to go.

**Important:** once a key has been used to boot a planet onto the network, it
cannot be used to boot that planet again later - doing so will cause
communication problems with other planets. For this reason you should **delete
the keyfile from your machine once your planet has booted successfully**. If you
do use the same key twice, you'll need to reset your planet to restore its
functionality.

### Command line

For other ships on the network to communicate with your ship, the computer it's
running on needs to be able to receive inbound UDP traffic. Therefore, it's
important when running your ship locally to use the `-p ames_port` flag (replace
`ames_port` with a public port number from 49152 to 65535) to specify on which
port you'll receive UDP traffic, and to forward inbound UDP traffic arriving at
your router on that port to your computer.

Navigate to your `urbit` directory. Open your keyfile (it is just a text file)
and copy the key inside to the clipboard. Paste it into the following command,
except with `ames_port` replaced with a public port number, and `sampel-palnet`
replaced by the name of your planet. **Do not include the tilde in your planet
name.**

```sh
./urbit -p ames_port -w sampel-palnet -G rAnDoMkEy
```

Or you can copy the keyfile into the current directory and run:

```sh
./urbit -p ames_port -w sampel-palnet -k ./my-planet.key
```

Either command will create a directory called `sampel-palnet/` and begin booting
your planet. It may take a few minutes.

When your planet is finished booting, you will see `~sampel-palnet:dojo>` (Dojo:
the Urbit command line).

To log into [Landscape](/docs/glossary/landscape), check out the directions
[here](/getting-started/#using-landscape).

To shut down your planet, use `Ctrl-D`.

To start your planet up again, run the following from your `urbit` directory,
with `ames_port` replaced with the public port number you used when first
booting your ship.

```sh
./urbit -p ames_port sampel-palnet
```

Note that `sampel-palnet/` is the path of a folder, which we just created in
your `urbit` directory. This folder is called your planet's **pier**, and it
holds all of your data.

Never boot multiple instances of your planet at the same time. You can prevent
this from happening on accident by only ever keeping a single copy of your pier.

**Important:** once a key has been used to boot a planet onto the network, it
cannot be used to boot that planet again later - doing so will cause
communication problems with other planets. For this reason you should **delete
the keyfile from your machine once your planet has booted successfully**. If you
do use the same key twice, you'll need to reset your planet to restore its
functionality.

Delete the keyfile with the command below:

```sh
rm ./my-planet.key
```

## Next Steps

Once you've got your ship up and running, you might like to join the official Urbit Community group and say hello. Just click on the `Groups` app and it will open Urbit's communications suite. In Groups, hit `Join Group` and enter `~bitbet-bolbel/urbit-community`. Once joined, a new tile for the group will appear on the Groups home screen. Open that, click on the `General` channel in the sidebar, and hit `Join Channel`. It'll take a couple of minutes to download the chat history, then you'll be able to post a message.

If you haven't already done so, we recommend spending a few minutes reading
[Understanding Urbit](/understanding-urbit) to get acquainted with the project.
Then once you've been become acquainted with your ship and explored the network
for awhile, consider checking out the [User's Manual](/using) which provides
guidance and reference material for operating your ship, as well as explanations
for Urbit concepts everyone should eventually learn.

If you're interested in developing on Urbit, check out:

- [Learn to Develop on Urbit](/docs/development/develop): Learn how to
  contribute to or develop on Urbit.
