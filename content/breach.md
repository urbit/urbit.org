+++
title = "~2020.12 Network Breach"
template = "page_indiced.html"
+++

## TL;DR

*Last updated ~2020.12.6*

A network breach is coming up on Tuesday, ~2020.12.8.

Unlike past breaches, this one comes with a tool to export and reimport all of your data so that you don't lose anything; we call it `flagday` (details below).

This document will be kept up-to-date throughout the process, and updates will be issued via Twitter [here](https://twitter.com/tloncorporation/).

*If you are self-hosting your ship, following these instructions is mandatory in order to communicate with the rest of the network.*

## When is the next breach?

The target date is Tuesday December 8th.

## How do I get updates about what's going on throughout the process?

We'll be adding new information to this document as soon as there's anything to share. Updates will be broadcasted via Twitter [here](https://twitter.com/tloncorporation/) as well.

## What is a “network breach”?

A network breach occurs when we need to change the Ames networking protocol number in order to reset the network’s state. When we change the protocol number, it will essentially create a new network. This rupture in continuity is why we refer to it as a “breach”. In the past, this has required users to take some action in order to get on the new network, but we are striving to make this as painless and loss-free as possible.

## Why does the network need to breach?

A network breach occurs when:
- A change must be made to all ships on the network simultaneously
- A change must be made to the Ames networking protocol
- Substantial changes must be made to Arvo and Vere simultaneously

In this breach, we are including changes that will allow us to make these changes in the future without breaching the network.

## Do I need to perform a personal breach?

No. A network breach subsumes all personal breaches, so please don’t also perform a personal breach.

## What can I expect?

If you are using a self-hosted ship, you need to affirmatively perform the breach using the instructions below. If you are using hosting, your ship will process the breach automatically.

In either case, the breach will render your ship unavailable for roughly one hour.

## Do I need to do anything with Bridge/Ethereum?

There are no Ethereum transactions necessary for this breach.

## I’m self-hosted—what do I need to do?

**Simply use the `flagday` tool that we have provided**. It will perform all the relevant actions on your behalf, as well as exporting and reimporting your data. You can find the `flagday` script [here](https://gist.github.com/philipcmonk/8e3d095b9545069237c759cd9aad32c2). Usage instructions are provided in the comments at the top of the file. **It's not necessary to run `flagday` until after the breach**. It's safe to try it out now to get comfortable with the process if you want, but you'll have to run it again after the breach.

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

## What is unique about this breach?

This breach will include Arvo/Vere Version Negotiation. This will allow us to ship updates to Vere and Arvo separately without worrying about an incompatibility on ships. For example, if you are running Vere 1.0 and an OTA of Arvo goes out that requires Vere 2.0, your ship will simply drop the update and notify you that you need to update your binary in order to receive the next update. When you update your binary is up to you.

## Will there be more network breaches?

We are optimistic that this will be our last breach, as all future updates to the network can be distributed as OTA (over-the-air) updates, possibly accompanied by a notification to update a binary version.

## What happens if I don’t breach?

Your Urbit will fall out of communication with the rest of the Urbit network which has performed the breach. This means that updates (OTAs) will no longer process and you won’t be able to communicate with anyone else on the network.

## How do I get help if I need it?

If you're in a tight spot or confused, reach out to us at support@urbit.org.
