+++
title = "Guide to Breaches"
weight = 40
template = "doc.html"
+++

An important concept on the [Ames](@/docs/arvo/ames/ames.md) network is that of continuity. Continuity refers to how ships remember the order of their own network messages and the network messages of others -- these messages are numbered, starting from zero. A _breach_ is when ships on the network agree to forget about this sequence and treat one or more ships like they are brand new.

There are two kinds of breaches: (personal) **breaches** and **network breaches**.

## Breaches

Ships on the Ames network sometimes need to reset their continuity. A breach is
when an individual ship announces to the network: "I forgot who I am, let's
start over from scratch." That is, it clears its own event log and sends an
announcement to the network, asking all ships that have communicated with it to
reset its networking information in their state. This makes it as though the
ship was just started for the first time again, since everyone on the network
has forgotten about it.

Breaches often fix connectivity issues, but should only be used as a last
resort. Before performing a breach, look at alternative fixes in the [Ship
Troubleshooting](../ship-troubleshooting) guide. Also reach out for help in the
Help channel in the Urbit Community group `~bitbet-bolbel/urbit-community`, or,
failing that, in the `#ship-starting-support` channel in our [Discord
server](https://discord.gg/n9xhMdz) to see if there is another option.
Connectivity issues are typically related to a bug, and you may be able to help
us fix it by emailing us at `support@urbit.org`.

There are two separate sequences of actions you need to take in order to breach.
One flow is for when you wish to keep Ethereum ownership address of the ship the
same, and the other is for when you are transferring the ship to a new Ethereum
ownership address. We make the emphasis about the Ethereum _ownership_ address
as changing your [proxies](@/docs/glossary/proxies.md) does not require a
breach.

If you will be keeping your ship at the same Ethereum ownership address and
would like to perform a breach, follow the steps below.

- Go to [bridge.urbit.org](https://bridge.urbit.org) and log into your identity.
- Click on `OS: Urbit OS Settings` at the bottom, then click `Reset Networking Keys`.
- Check the `Breach Continuity` box. Click `Reset Networking Keys`, and then click `Send Transaction` and wait for the progress bar to appear.
- Download your new keyfile following these instructions: [Generate your
  keyfile](@/using/id/using-bridge.md#generate-your-keyfile).
- Delete or archive your old [pier](@/docs/glossary/pier.md).
- Proceed to [boot your ship](@/getting-started/cli.md#boot-your-planet) with the new keyfile.
- Delete your keyfile after successfully booting.
- Rejoin your favorite chat channels and subscriptions.

If you are transferring a ship to a new Ethereum ownership address you will have the
choice as to whether or not you want to breach. This is to cover the case when
you are transferring to another address you own. The process here is slightly different.

- Go to [bridge.urbit.org](https://bridge.urbit.org) and log into your identity.
- Click on `ID: Identity and security settings` at the bottom, then click
  `Transfer this point`.
- Enter the new Ethereum address you would like to transfer ownership to. Click
  `Generate & Sign Transaction`, then click `Send Transaction` and wait for the
  progress bar to complete.
- Logout of your current session in Bridge by clicking `Logout` at the top, and
  then login to your new ownership address.
- From here, following the directions on how to [Accept your
  transfer](@/using/id/using-bridge.md#accept-your-transfer), [Set your
  networking keys](@/using/id/using-bridge.md#set-your-networking-keys),
  and [Generate your
  keyfile](@/using/id/using-bridge.md#generate-your-keyfile). The option
  whether or not to breach is in the Accept your Transfer step.
- Delete or archive your old [pier](@/docs/glossary/pier.md).
- Proceed to [boot your ship](@/getting-started/cli.md#boot-your-planet) with the new keyfile.
- Delete your keyfile after successfully booting.
- Rejoin your favorite chat channels and subscriptions.

## Network Breaches

Network breaches were events where all ships on the network were required to
update to a new continuity era. Network breaches happened when an Arvo update
was released that could not be implemented via an [OTA
update](@/docs/glossary/ota-updates.md). The continuity era is given by an
integer in Ames that is incremented when the network breaches. Only ships with
the same such value are able to communicate with one another. The most recent
network breach occurred in December 2020, and we expect it to have been the final one.

If another network breach does occur, we will provide accompanying documentation
on what to do to transfer your ship and all of its data to the new era.
