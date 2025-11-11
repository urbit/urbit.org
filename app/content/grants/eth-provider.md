+++
title = "eth-provider: Decentralized Ethereum access for Urbit"
date = "2022-03-04"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Eth-provider is a Gall agent that allows Urbit users to configure their Ethereum connection."
reward = "3 stars"
assignee = ["~pontus-fadpun"]
grant_id = "B0117"
completed = true
work_request_link="https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0142&prefill_Grant+Name=Ethereum%20Provider"
+++

## Background

A common criticism of the Ethereum ecosystem is the reliance on centralized services such as Infura. Currently all Urbit ships communicate to Ethereum through the Tlon Infura endpoint at eth-mainnet.urbit.org, serving approximately 600k requests per day. This is a practical choice, but Urbit provides the building blocks for a more decentralized solution.

## Bounty Description

The end goal of this bounty is to build a Gall agent called the eth-provider that allows a ship to configure their ethereum connection. The default behavior of the eth-provider is to use the current tlon Infura endpoint, but it can also be configured to use a different URL. More interestingly, it should also have the capability to be configured as a provider or a client.

A provider allows other ships, explicitly allowed through a whitelist, to connect their ethereum calls to the provider. A client is the opposite, connecting to another ship to receive ethereum responses. These modes allow us to leverage the Urbit identity system to provide for more fine-grained and robust access control than on the old Internet.

A star is a natural fit to run a provider, so in addition to the whitelist there should be a configuration option to allow the kids of the ship to connect.

The user of the eth-provider should not need to care how it is configured, the pokes should return the same data whether the eth-provider is configured to local, provider or client mode.

Building the eth-provider is simplified by the extensive Ethereum JSON RPC capabilities in /lib/ethereum and /lib/ethio. Integrating the eth-provider with the existing urbit codebase may require implementing a thread like /lib/ethio that calls the eth-provider.

## Resources

[/lib/ethereum](https://github.com/urbit/urbit/blob/master/pkg/base-dev/lib/ethereum.hoon)

[/lib/ethio](https://github.com/urbit/urbit/blob/master/pkg/base-dev/lib/ethio.hoon)

## Project Requirements

- Ships can poke the eth-provider with ethereum rpc calls and receive ethereum rpc responses.
- Ships can configure the eth-provider as local, provider or client.
  - If configured as local, you can configure a custom ethereum url or use the default tlon Infura endpoint.
  - If configured as a provider, you can whitelist other ships that can connect to the provider as clients. There should also be an option to allow all kids of the ship to connect.
  - If configured as a client, the eth-provider will forward the ethereum rpc calls to the provider.
- The user of the eth-provider should not need to care how it is configured, the pokes and responses should be identical for any configuration
- The final milestone of this bounty is to integrate the urbit codebase to use the eth-provider. These include /app/eth-watcher and /app/eth-sender.

## Architecture Diagram

![](https://urbit-foundation.s3.us-east-2.amazonaws.com/eth-provider-architecture.svg)

## Milestones

### Eth-provider Gall agent

Payment: 2 Stars
A completed eth-provider Gall agent that satifsfies the project requirements above.

### Urbit codebase integration

Payment: 1 Star
All Ethereum RPC calls in the urbit codebase have been migrated to use eth-provider instead of the direct Infura connection. This milestone is completed when a PR against the [urbit](https://github.com/urbit/urbit) repository has been merged.
