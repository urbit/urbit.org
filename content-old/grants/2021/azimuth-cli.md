+++
title = "Azimuth CLI"
date = "2021-09-20"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev: Other"]
[extra]
image = ""
description = "Bridge for the command line"
reward = "3 stars"
assignee = ["~lavlyn-litmeg"]
grant_id = "P0064"
completed = true
canceled = false
link = ""
+++

## Azimuth CLI

The azimuth-cli is "Bridge for the command line." It should allow ship owners and operators to do the same things that they can in Bridge but via the command line, and in batch mode. For example, it should be possible to batch-spawn 10 planets from a star, or transfer ownership of several stars or planets with one command.

## Background

Azimuth is a set of Ethereum smart contracts that handle most things related to Urbit ID. The primary way of interacting with Azimuth, right now, is via Bridge, a dApp. However, hosting providers and people who run stars frequently need to automate their interactions with Azimuth, but there is currently not an easy way to do that.

There is the excellent azimuth-js library that makes most bridge functions available as a JavaScript API, but it still requires substantial effort to automate things. Additionally, not all the features available in Bridge are currently accessible via npm package, requiring quite a bit of reverse engineering.

Finally, with the upcoming Layer 2 (L2) solution, the need and desire to automate batch operations will likely increase.

## Goals

1. Implement a CLI that supports the most important Azimuth and Eliptic operations, such as list points, spawn points, set network keys, set proxy addresses, and transfer ownership.
2. Improve the current Urbit ID related JS projects, such as azimuth-js, and urbit-key-generation.
3. Support the new L2 solution.
4. Since most operations will require the private key or master ticket, there needs to be a way to keep them secure.
5. Design the CLI in such a way that it is safe to script operations. E.g., there is little risk of spawning too many planets.

## Design

### Node.JS CLI

The CLI will be implemented in Node.js because most libraries that the project relies on are in JavaScript themselves.

The CLI will initially support the following commands:

- List: list points that an address controls; list child points of a point; list unspawned points
- Spawn: spawn a certain amount of child points from a parent. This can be provided as a list of patps or just a spawn count that will select points randomly from the unspawned list.
- Network Keys: Set the Arvo network keys
- Management Proxy: Set the management proxy of ships
- Spawn Proxy: Set the spawn proxy of ships
- Transfer: Transfer either to another address or to master tickets.
- Accept transfers: Accept incoming transfers on a certain address.
- Report: Generate an easy to use and easy to import CSV report of the current directory. E.g., a list of ship names, owner address, spawn cost in ETH and USD, and so on.

### Idempotent Commands

All commands that modify on-chain state should be able to run idempotently. That is, it should be safe to repeatedly call a command with a certain set of arguments. For example, calling the CLI multiple times to spawn 10 planets, should only spawn 10 planets exactly, even if it fails intermittently. This will make it possible to use the CLI to script and automate actions much more easily.

To achieve this, each command should always operate in a working directory. Things like master tickets, network seeds, Ethereum transaction receipts are saved in this directory to ensure that all operations are deterministic once the relevant files have been created. For example, if the CLI is used to set the network keys, the program first generates a random seed (or uses the seed from an existing master ticket) and then saves that seed to the working directory. It then tries to set the network key for one or more points on Elliptic. If the Ethereum transaction fails (e.g., because of too high gas prices) then the command can just be rerun making sure that it eventually succeeds, trying until the on-chain key matches what is saved in the working directory.

### Libraries

The CLI will make use of several existing Urbit libraries, such as azimuth-js, urbit-ob, and urbit-key- generation. But there is also some code in the current bridge application that is needed, for example, the functions to generate the Arvo key file. Ideally, all code making use of cryptography should live upstream, in an Urbit org owned repository. Hence part of this grant is to make PRs for some of the existing libraries and push relevant code upstream. Of course, talking to the relevant owners and developers first.

Some of the functions that the CLI needs can be made into its own library too, conceivably allowing developers to build on the functionality of the CLI for their own projects.

### Security and Vetting

Once the CLI is completed, it should be vetted by Tlon and then be taken under the Urbit org GitHub account. Many of the CLI operations will have access to the private keys of valuable Urbit address space. Hence the CLI repository is a likely target for someone trying to inject malicious code. The repository being owned by Urbit or Tlon should mitigate some of that.

Moreover, the tool should try to integrate with some of the hardware wallets so that the transactions of CLI operations can be signed from an external wallet. Another option would be to load the private keys from a key chain, such as the MacOS key chain.
Nonetheless, if someone wants to fully automate operations with the CLI then the private key needs to be provided via command line argument or environment variable. This will have to be made clear via documentation, and users need to be made aware of the dangers.

### Ethereum Gas Fees

There should be an option to define the maximum gas fees for a command or operation. Or even provide something like a percentage of the 10 day moving average of gas fees. A CLI user can then script an operation and schedule the script to run, say, every hour. Since the operations are idempotent this will be safe to do. The script will then run every hour until the gas prices are low enough or affordable and will then succeed. This will be very helpful when doing larger batch operation, such as spawning several planets and keying them, because the Ethereum gas fees can vary by a factor of 10.

### Layer 2

The CLI should work with both the current Azimuth contracts and the new Layer 2 solution.

### CSV Reports

Since this tool will be used by power users, who want to import the data into different systems or keep track of cost, there should also be a CLI command that converts the raw data in a working directory to an easy consumable CSV report. This report should contain a list of p and patp, addresses (ownership, management, etc.), master tickets, Ethereum transaction costs, timestamps, and so on.

## About Me (~lavlyn-litmeg)

I am the maker of [UrbitHost](https://urbithost.com/). In the process of building that provider, I have already written many Node.js scripts that do approximately what this specification proposes. There are almost no unknowns, here, except, perhaps, the Layer 2 solution. To write this CLI, I would have essentially do a complete rewrite of all the scripts that I have developed over time, but it is very likely that I will be able to accomplish most tasks outline here.

As someone who is running a hosting provider, I will be major user of the CLI as an automation tool myself. Consequently, I will likely maintain this project in the foreseeable future and will also be able to help people with support requests.

## Milestones

### Milestone 1 - First Working Version of the CLI

Expected Completion: 2 months

Payment: 2 stars

The first milestone is to create the whole CLI framework and implement the first set of commands.

Deliverables:

- Node.JS project and CLI framework (based on yargs)
- Deployable npm package
- Work directory framework
- Extract relevant code from Bridge, for the time being, copied to the CLI repo
- Master ticket and Arvo key generation
- List command
- Spawn command
- Network Key command
- Management Proxy command
- Transfer command
- Document the project
- Document usage, give usage examples

### Milestone 2 - Vetting and Second Phase of CLI

Expected Completion: 1 month

Payment: 1 star

Having a working tool now, the question will be what parts to merge upstream. Also figure out what parts or projects should be taken under the Urbit umbrella (assuming people start using the CLI).

Deliverables:

- Merge high risk code (e.g., anything related to cryptography) upstream to Urbit org repositories, focusing on making as many CLI functions also usable as a library.
- Possibly move the CLI project under the Urbit org
- Ethereum Gas handling and configuration, allowing the automation of on chain transactions at a low cost.
- Report generation command.

### Milestone 3 - Layer 2 Support

Expected Completion: 2 months

Payment: 2 stars

As soon as the Layer 2 solution is released, the CLI should also support actions on that layer. With rollups, address owners are likely to do larger batch operations. The CLI will be a good tool for that.

Deliverables:

- Move points that are on Azimuth to L2, or move just the spawn proxy of stars.
- Connect to a Roller instead of an ETH node
- Spawn points on L2
- Set Network Keys on L2
- Set Proxies on L2
- Transfer points on L2

### Milestone 4 - Additional Features

Expected Completion: 1 month

Payment: 1 star

Adding a set of features that will make the CLI much more usable and secure

Deliverables:

- Hardware Wallet support (signing transactions on the wallet not using the web3 lib)
- Retrieving private keys from key-chains, at least MacOS or Linux
- More point list/search functionality
- Search for unspawned planets (for example, by English language worlds, like Venetia, or custom strings)
- Query Azimuth (and L2) for ship state: is it spawned, is it keyed, etc. (this is helpful to check if, say, a galaxy is likely to be alive when buying a star).
- Utils (p to patp)
