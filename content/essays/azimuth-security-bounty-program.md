+++
title = "Azimuth Security Bounty Program"
date = 2019-07-22
description = "Inviting you (and your friends) to help us make Azimuth as secure as possible."
aliases = ["/posts/essays/azimuth-security-bounty-program"]
[extra]
author = "Anthony Arroyo"
ship = "~poldec-tonteg"
+++

![](https://media.urbit.org/site/posts/essays/azimuth-security-bounty-program-1.jpg)

Since launching [Azimuth](https://urbit.org/posts/azimuth-is-on-chain/), we’ve been running a private bounty program with [HackerOne](https://hackerone.com/). We’re now taking the program public and inviting you (and your friends) to help us make Azimuth as secure as possible.

[Go here](https://hackerone.com/tlon) to see the live program on HackerOne.

## What is Azimuth again?

Azimuth is [the Urbit public key infrastructure](https://urbit.org/posts/azimuth-is-on-chain/). It’s a set of Ethereum smart contracts that allow for cryptographic ownership and management of Urbit identities. It also provides a governance mechanism whereby galaxy owners are able to propose and vote on improvements.

People already [use Azimuth](https://github.com/urbit/bridge) to boot Arvo ships, spawn stars and planets for others and transfer points. But Azimuth is a general identity system, with great potential to be used beyond Arvo: there are primitives for reputation, payments and securing communication channels.

## Security program details

We had the Azimuth contracts audited by [Open Zeppelin](https://openzeppelin.org/), [Blockchain at Berkeley](https://blockchain.berkeley.edu/) and [Bloctrax](https://www.bloctrax.com/), but we don’t want to take any chances. We’re hoping that the HackerOne program will help us get more eyes on the contracts, identify vulnerabilities and get out in front of any problems. You can find more information about the program at [our page](https://hackerone.com/tlon) on HackerOne.

We’re interested in any vulnerability in the Azimuth contracts that would allow an attacker to either seize other user’s points, impersonate points or that would result in the platform becoming unusable.

The program page has links and instructions on how to set up a development version of Bridge and point it at either the Ropsten deployment of the contracts or at a local network to play with the contracts and look for vulnerabilities.

## Arvo is out of scope for now

We’re intentionally focusing our security efforts on Azimuth for now. Since Azimuth serves as our PKI layer, it’s the most crucial for the time being: it’s the source of truth for who owns what. We don’t want to have even a shred of a doubt that these cryptographic properties are secure.

Of course, we’re working toward a future where you have a computer connected to this Azimuth point, and the computer has to be as secure as its identity. To achieve this, we have some more hard work to do on Arvo and our interpreter, Vere. When the time comes, we’ll also reach out for help testing vulnerabilities throughout the entire stack.
