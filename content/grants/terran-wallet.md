+++
title = "Terran Wallet: a local wallet store / transaction manager"
date = "2022-03-25"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Terran Wallet is a desktop app that stores private keys for various blockchains (Etherum in V1), can be sent transaction requests from your Urbit ship, and on your local machine you can execute transactions."
reward = "$75,000 in WSTR"
assignee = ""
id = ""
completed = false
work_request_link = ""
+++

## Rationale
We need a way to sign transactions in Urbit, but we don't want our keys on remote servers. To solve this, we need a desktop app that can be installed, store crypto wallet keys, and sign transactions that are correlated to our Urbit ID.

## Overview
Terran Wallet is a desktop app that stores private keys for various blockchains (Etherum in V1), can be sent transaction requests from your Urbit ship, and on your local machine via the desktop app, you can execute transactions. 

The workflow goes like this:
- Download the Terran Wallet app. 
- Spawn a moon from your planet
- The desktop app prompts you to enter: 
  - moon-name
  - private-key
- The Terran Wallet app boots a moon.
- On your ship, you download the Terran Relay app / agent.
- It shows you have a moon connected.

Once you have this configured, you could add wallet addresses to the desktop app and the private keys would never be stored on your ship. When you trigger a transaction via your planet, it is relayed to the moon, which prompts you via the desktop app with details of the transaction. You can then execute the transaction. 

To limit the scope for the first version, this bounty is only to support Ethereum transactions, but you could easily add more (Bitcoin, Cardano, etc) in later releases. Perhaps the integration with other chains would be something to consider in mapping out the architecture.

Eventually, it would make sense to integrate hardware wallet signing, but for V1, we will simply use a secured wallet store on the local machine. 

## User stories
As a user I want to:
- have a list of my wallets that are securely stored on my device.
- be able to view metadata about my wallets
- be prompted to sign transactions that occur within Urbit (sending money to a friend, buying an NFT for access, etc.)
- be able to password protect my wallet store
- have transactions initiated by my Urbit ship notify and prompt the desktop app to execute a transaction.

## Requirements
- At least three years of professional programming experience
- Demonstrable experience with writing Gall agents
- Familiar with HD wallets, Bitcoin, Eth, etc
- Coordinate with Holium on designs, desktop app, and agents

This project may require two developers, one working on the Terran relay app / agent and the other working on the Electron-based Terran Wallet desktop app.

Holium is willing to work with the developer(s) to provide frontend help.

## Reward
$75,000 WSTR (team of two)