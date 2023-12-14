+++
title = "Ethereum ABI Parser"
date = "2020-03-09"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev", "Arvo" ]

[extra]
image = ""
description = "Create a Gall app that takes the bytecode for a contract ABI."
reward = "2 stars"
assignee = ["xiphiness"]
id = "1241532070"
completed = false
canceled = true
link = ""
+++

### Background

The Contract Application Binary Interface (ABI) is the standard way to interact with contracts in the Ethereum ecosystem, both from outside the blockchain and for contract-to-contract interaction. Data is encoded according to its type, as described in this specification. The encoding is not self-describing and thus requires a schema in order to decode.

###Bounty Description

Create a Gall app that can output the byte code for a contract ABI.

#### Gall application:

- Parse ABI into valid byte code

##### User interface:

- Allow for a user to upload arbitrary ABI
- Create a form field based on the ABI
- Parse user input into appropriate data types
- Return bytecode

### Resources:

- [ABI Spec](https://solidity.readthedocs.io/en/v0.5.3/abi-spec.html)

### Contribution Guidelines:

- Do not begin work until your request to claim this bounty is accepted.
- Email your work to grants@urbit.org.
- Submit your work as a pull request on to the [urbit/urbit github repository](https://github.com/urbit/urbit).
- When applying to work on the bounty, tell us a little about yourself and some projects you’ve worked on in the past.
- You have 90 days from the time of approval to complete this bounty.

## Milestones

### PR is merged

2 stars
Your code is accepted and merged.
