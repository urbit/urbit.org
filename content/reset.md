+++
title = "~2020.12 Network Reset"
template = "page_indiced.html"
+++

## TL;DR

*Last updated ~2020.1.14*

A network reset happened on ~2020.12.8 — you may need to take action.

Unlike past resets, this one comes with a tool to export and reimport all of your data so that you don't lose anything; we call it `flagday`. Details on its usage can be found below.

*If you are self-hosting your ship, following these instructions is mandatory in order to communicate with the rest of the network.*

## When was the last network reset?

On Tuesday, ~2020.12.8.

## How do I get updates about what's going on throughout the process?

We'll be adding new information to this document as soon as there's anything to share. Updates will be broadcasted via Twitter [here](https://twitter.com/zodisok/) as well.

## What is a "network reset"?

A network reset occurs when we need to change the Ames networking protocol number in order to reset the network’s state. When we change the protocol number, it will essentially create a new network. This change in continuity is why we refer to it as a "reset". In the past, this has required users to take some action in order to get on the new network, but this time we've provided tooling to make it seamless.

## Why does the network need to reset?

A network reset occurs when:
- A change must be made to all ships on the network simultaneously
- A change must be made to the Ames networking protocol
- Substantial changes must be made to Arvo and Vere simultaneously

In this reset, we are including changes that will allow us to make these changes in the future without resetting the network.

## Do I need to perform a personal breach?

No. A network reset subsumes all personal breaches, so please don’t also perform a personal breach.

## What can I expect?

If you are using a self-hosted ship, you need to affirmatively perform the reset using the instructions below. If you are using hosting, your ship will process the reset automatically.

## Do I need to do anything with Bridge/Ethereum?

There are no Ethereum transactions necessary for this reset.

## I’m self-hosted—what do I need to do?

You are still in the old era. First you need to ensure that you are on the
correct base hash - run `+trouble` in dojo and check that the following line
is displayed.
```
[%base-hash [0v1f.lbtqc.5o909.qqja6.17dgp.m8gde.bmiqc.fa97p.8jer8.msu43.5rf36]]
```
If `%base-hash` is different, you need to download the correct OTA from `~fet`,
a galaxy that Tlon has left running in the old era specifically for this
purpose. Enter `|ota ~fet %kids` into dojo and wait until the OTA update is
complete. Now you are ready to proceed.

**Simply use the `flagday` tool that we have provided**. It will perform all the
relevant actions on your behalf, as well as exporting and reimporting your data.

To use `flagday`, run the following:

```shell
curl https://bootstrap.urbit.org/flagday.sh > flagday.sh; chmod 755 ./flagday.sh; ./flagday.sh PIER_DIRECTORY
```

Alternatively, you can perform the migration manually (see below).

## Can I perform the migration manually?

Yes, by following these steps (note that these steps **will not** back up your data as is the case with `flagday`):

1. Download your [keyfile from Bridge](https://urbit.org/using/install/#keyfile).
2. Shut down your ship.
3. [Archive and move your old pier](https://urbit.org/using/operations/using-your-ship/#moving-your-pier) (this is the directory that contains your urbit event log).
4. [Download the latest version](@/using/install.md#macos-and-linux) of the urbit binary.
5. [Boot your ship with the new keyfile](https://urbit.org/using/install/#boot-your-planet).

## I’m hosted by Tlon, or someone else—what do I need to do?

Users hosted by Tlon will not need to take any action. We’re handling everything on our end. If you’re hosted by another provider, you should contact that provider for instructions.

## What happens to my data?

We’ve written a tool called `flagday` that will allow you to easily export your ship’s Landscape data. This includes your subscriptions and any content such as Collections, Notebooks and Chats that are on your ship. This data can then be seamlessly imported into a new ship.

## What is unique about this reset?

This reset will include Arvo/Vere Version Negotiation. This will allow us to ship updates to Vere and Arvo separately without worrying about an incompatibility on ships. For example, if you are running Vere 1.0 and an OTA of Arvo goes out that requires Vere 2.0, your ship will simply drop the update and notify you that you need to update your binary in order to receive the next update. When you update your binary is up to you.

## Will there be more network resets?

We are optimistic that this will be our last reset, as all future updates to the network can be distributed as OTA (over-the-air) updates, possibly accompanied by a notification to update a binary version.

## What happens if I don’t follow these instructions?

Your Urbit will fall out of communication with the rest of the Urbit network which has performed the reset. This means that updates (OTAs) will no longer process and you won’t be able to communicate with anyone else on the network.

## How do I get help if I need it?

If you're in a tight spot or confused, reach out to us at support@urbit.org.

## What's a 'breach'?

We often call events like this a 'breach' since we "breach" the continuity of Urbit's network protocol. This language has no relationship to security. If anything, it's more like a "hard fork" of the network.
