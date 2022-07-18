+++
title = "HD Wallet (Master Ticket)"
weight = 11
template = "doc.html"
+++

This document explains what the [Urbit HD wallet](/docs/glossary/hdwallet) is
and how to use it.

### What is the Urbit HD Wallet? {% #urbit-hd-wallet %}

The [Urbit Hierarchical Deterministic (HD) Wallet](/docs/glossary/hdwallet) is a
custom Ethereum wallet based on BIP39 and BIP44 – the same underlying technology
used by wallet providers like Ledger, Trezor, Metamask, and MyEtherWallet. You
can think of the Urbit HD wallet as a wallet of wallets, which lets you keep a
single passphrase for all of your Urbit ID keys. Urbit ID uses multiple keys
with different capabilities – a bit like permissions – so that you can keep the
more valuable keys in cold storage while keeping less valuable keys, used in
day-to-day operation, more easily accessible. If you're only operating a planet,
you shouldn't have to worry about this: you can simply think of your "master
ticket" as the password to your Urbit ID. If you're operating a star or galaxy,
the Urbit HD Wallet allows you to implement a multi-tier key custody scheme.

If you're interested, you can read the spec here: [Urbit HD Wallet Spec (UP 8)](https://github.com/urbit/proposals/blob/master/008-urbit-hd-wallet).

### What is a master ticket? {% #master-ticket %}

The "master ticket" is the cryptographic seed from which your other Urbit ID keys are
derived. It should be treated like a master password: **you should never share
it with anyone, and you must store it very securely (see our practices below).**
This ticket is used to derive the Ethereum wallet that holds your ownership
keys, your [Urbit OS](#what-is-arvo) key – used to boot your Urbit – and the
other keys associated with your identity. You’ll have a master ticket if you
used the Urbit Wallet Generator or claimed a [ship](/docs/glossary/ship) on our
hosted version of Bridge.

If you're operating a planet, you can use your master ticket to authenticate
with Bridge.

### What is an ownership address? {% #ownership-address %}

An ownership address is an Ethereum address that owns one or more of your Urbit
IDs. The Urbit Wallet Generator creates one [Urbit HD
Wallet](/docs/glossary/hdwallet) and associated addresses for each of your
identities. Using the ownership key associated with your ownership address, you
can transfer identities to other people, meaning that it’s very important to
store securely.

### What are proxies? {% #proxies %}

See [Proxies](/using/id/proxies).

### What are seeds? {% #seeds %}

All Ethereum key-pairs in the Urbit wallet system, including
[proxies](/docs/glossary/proxies), are produced by 128-bit cryptographically
random values called seeds. These seeds are the equivalent of the BIP39 mnemonic
of an Ethereum wallet and are yours alone. An ownership key pair is derived from
an ownership seed and, likewise, the various proxy key pairs are generated from
their respective proxy seeds.

For detailed information see the [Urbit HD Wallet Spec (UP 8)](https://github.com/urbit/proposals/blob/master/008-urbit-hd-wallet).

### What does it mean to “set public keys”? {% #set-public-keys %}

This means registering the public keys of your identity's encryption and
authentication key pairs (together known as "networking keys") with Urbit ID /
[Azimuth](/docs/glossary/azimuth), so that others can discover them. The
corresponding private keys can then be used to, for example, run a
[ship](/docs/glossary/ship) on the [Urbit OS](#what-is-arvo) network.

You want to reset these keys if they are compromised, or if your ship has sunk.
This is of little practical significance today, but resetting your networking
keys resets your relationship with other ships on the network.

### What do I do if I want to own multiple identities? {% #multiple-points %}

We recommend using a different HD Wallet for each identity. You are able to
assign any number of identities to a single Ethereum address, however, since
they are just ERC-721 tokens.

### How should I take care of my Urbit HD Wallet? {% #custody %}

Urbit IDs have accompanying security realities that must be taken seriously. The
responsibility for keeping cryptographic assets safe rests fully with the party
that owns them.

The nature of decentralization is such that there is generally no authority that
has the power to restore any lost or stolen wallet. The exception to this is
[social recovery wallets](https://vitalik.ca/general/2021/01/11/recovery.html).
The HD wallet does not yet support social recovery, but it is possible to
utilize it with another wallet such as [Argent](https://www.argent.xyz/).

Nobody can force you to follow good security practices. At most, they
can give you recommendations. **Remember:** if critical items, such as your
ownership key, are lost or compromised, your assets are likely gone forever.

Below we list some good practices for storing keys, strictest first.
Higher-value assets should be secured with stricter measures.

#### Security Tier 1: Cold storage

Cold storage refers to any method in which secrets are stored in a way that is
not accessible to any network. Cold-stored keys should only ever be generated
offline.

Cold storage media options:

- Printing the secret on a piece of paper. However, paper wallets are vulnerable
  to various forms of physical damage, such as rot, water damage, smoke, or
  fire. Laminating the paper can mitigate some of these risks, but the
  lamination can potentially trap moisture. Make sure that you trust the
  printer; some have memory and network connections.
- Storing the secret on a brand-new USB stick or hard drive that has never been
  connected to a networked machine.
- Storing the secret on a hardware wallet like Ledger or Trezor.
- Engraving the secret on a strip of stainless steel. This medium is resistant
  to both water and fire damage.

Places to store your cold-storage media:

- A hidden safe in your home
- A safe-deposit box at a bank

It’s a good idea to store your keys redundantly; for example, on both a USB
stick and a piece of paper in the safe, in case one of those methods fails. If
you deem a key to be valuable enough, you can **shard** it into thirds (or other
splits) and store each third in secure, geographically distributed locations.
Urbit HD wallets for galaxies automatically provide a 3-way sharded master
ticket.

#### Security Tier 2: Hardware wallet or paper wallet

A hardware wallet is a digital storage device that’s purpose-built to store
cryptographic secrets. They are unaffected by typical key-stealing malware and
have built-in security mechanisms that other digital devices lack. Do your
research and make sure that you are buying an authentic device manufactured by
trustworthy, technically competent security experts with a good reputation.
Trezor and Ledger are two popular brands of hardware wallets.

A "paper wallet" is a physical medium printed or engraved with a secret. These
are resistent to network attacks, but the downside is that the secret must be
entered into a computer by hand, exposing the user to attacks from malware and
eavesdroppers.

#### Security Tier 3: On your computer

This tier includes any method where secrets are stored on an everyday computing
platform. Some such methods are:

- Encrypted PDFs containing a secret on your desktop’s drive
- Storing secrets on a cloud account protected by multi-factor authentication
- Storing secrets in a password manager

This method is risky for a number of reasons. Networked computers can contain
malware. Computers that see common use are also prone to crashes and data loss.
Storing secrets on cloud accounts mitigates the risk of data destruction, but it
exposes a much larger attack surface to malicious actors.

For all of these reasons, if you use Tier 3 methods, use them only for the
storage of low-value secrets.
