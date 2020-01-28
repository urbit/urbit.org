+++
title = "Using Bridge"
template = "page_indiced.html"
description = "How to use Bridge to interact with Azimuth and manage your Urbit ID."
weight = 1
aliases = ["/docs/getting-started/using-bridge/"]
+++

[Bridge](https://github.com/urbit/bridge) is the application we built for interacting with [Azimuth](https://azimuth.network), the Urbit PKI, and managing your Urbit ID. Importantly, Bridge also allows you to generate a keyfile that you will need to boot your ship so that it can use the Arvo network.

This guide assumes that you have an Urbit ID, or that you have found someone to send an Urbit ID to your Ethereum address and are looking to claim it.

### Hosted Bridge

To connect to Bridge, go to [https://bridge.urbit.org](https://bridge.urbit.org) into your browser, and enter your identity's credentials in the appropriate fields. If you were invited to claim an Urbit ID, it's very likely that you received an email that would direct you to Bridge, and you can simply follow the hyperlink in that email.

Once you arrive, proceed through the steps presented. You'll eventually arrive at a page with a few choices: `Invite`, `Admin`, and `Boot Arvo`. `Admin` is the only option that you're interested in right now; click on it. On the `Admin` page, click the `Download Arvo Keyfile` button. Once you have downloaded the keyfile, you can exit Bridge and proceed to [install the Urbit binary](@/using/install.md).

### Local Bridge

Alternatively, Bridge can be run locally. It's more complicated, but we recommend this option for managing sufficiently valuable assets, such as several stars or more. To install local Bridge, navigate to the [release page on GitHub](https://github.com/urbit/bridge/releases/). Download the `.zip` file of the latest version. After you download it, follow the instructions below.

To use Bridge:

- Unzip the .zip file that you downloaded (bridge-$version.zip).
- Open up your command line interface (Terminal on OSX, Command Prompt on Windows).
- Navigate to the bridge-$version directory, where $version is the appropriate version number.
- Run this command: `python3 -m http.server 5000 --bind 127.0.0.1.`

You can then use the Bridge app by navigating to `http://localhost:5000` in your internet browser.

### Log in

Once the program is running in your browser, go through the steps presented according to the type of wallet you have. You’ll be presented with a few login options. A notable option is Urbit Master Ticket. This is for those who used our Wallet Generator software. If you bought points from an Urbit sale and then used the Wallet Generator, your networking keys will be set for you. All other login options will require you to set your own networking keys.

Note: Bridge allows you to both make reads and writes to the Ethereum blockchain. Writing to the blockchain, such as changing your networking keys, will incur a transaction cost that will require you to have some ETH in the address you log in with.

### Accept your transfer

If you were given points by Tlon you likely already fully own them. But if someone else sent you a point, then you will first need to use Bridge to accept that transfer.

After you access your Ethereum address, if a point was sent to that address, you'll come to a page that has an `Incoming Transfers` header, under which is a graphic. Click the `Details ->` link under that graphic.

Now you'll be on the management page of your point. The transfer isn't completed yet, so click `Accept incoming transfer`. Then check both boxes and and click their associated `Sign Transaction` and `Send Transaction` buttons.

If you already own a point, click on the `Details ->` under your sigil in the `Your Points` section.

### Set your networking keys

If you just accepted a point, you'll be returned to your point screen. Notice that that links and buttons are now clickable. You now own this point!

Click the link that says `Set network keys`. The field presented in the resulting page expects a 32-byte hexadecimal string. If it's filled already, no action is required. If it is empty, you will need to generate such a string. You can generate this data any way you please, but in the terminal on MacOS or Linux, you can write

```sh
hexdump -n 32 -e '4/4 "%08X"' /dev/random
```

and use the result.

It should be noted that setting your network keys is an event on the Ethereum network and will therefore cost a trivial, but non-zero, amount of [gas](https://github.com/ethereum/wiki/wiki/Design-Rationale#gas-and-fees) to complete.

### Generate your keyfile

From the detail page associated with your point, click the `Generate Arvo Keyfile` link and you'll be taken to a page with a field titled `Network seed`. This field should already be filled in, and should match the hexadecimal string that you entered in the previous step. If it's not filled in or does not match, fill it in with the correct string.
Click `Generate ->`, which will download a keyfile onto your machine.

With that keyfile in hand, you can now exit Bridge and continue to the guide to [install the Urbit binary](@/using/install.md).
