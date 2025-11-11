+++
title = "Self-custody your Urbit ID"
description = "As a cryptographic asset, there are many ways to control and secure your Urbit ID"
tags = ["wallet", "ledger", "trezor", "metamask", "urbit-id"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/id/hd-wallet#security-tier-1-cold-storage", description = "Learn about different wants to store your cryptographic keys" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

'Self-custody' is the idea that you should be the only one that knows and controls your cryptographic assets by being the one in control of the wallet which holds your cryptographic secrets (e.g. the seed phrase, or private key). In this paradigm, the responsibility for keeping cryptographic assets safe rests fully with the party that owns them, **you**. The nature of decentralization is such that there is generally no authority that has the power to restore any lost or stolen wallet. 

Nobody can force you to follow good security practices. At most, they can give you recommendations. Urbit IDs have accompanying security realities that must be taken seriously, so remember: if critical items, such as your ownership key, are lost or compromised, your assets are likely gone forever.

There are a few common methods of self-custody that Urbit users follow. Using more common methods increase the likelyhood that a specific interaction pattern is well supported, but if you are an advanced cryptocurrency user, using your own techniques is always an option as well. If all of this is too daunting for you, using a [Hosting Provider](/overview/running-urbit/hosting-providers) is an option and they will generally support easy co-custody of your Urbit ID, until you are ready to take your sovereignty into your own hands.

## Urbit HD / master ticket wallets
Urbit's default wallet option is the master ticket wallet. It was specifically designed for interacting with the different permissions and 'proxies' that control your urbit identity. By default this is a 'paper wallet', and is what you will be given if your urbit planet was generated via Bridge's default invite creation flow for Layer 2 identities. 

It is important to note that, while master ticket wallets are generally held as 'paper wallets', in order to use them you will need to enter your secret into [Bridge](https://bridge.urbit.org) in order to take ownership or management actions, so it should not be considered a 'cold wallet' in the same way as many paper wallets are used in the cryptocurrency world. Please also ensure that you confirm the domain, `https://bridge.urbit.org` so as to keep your assets secure when taking action requiring your cryptographic secrets.

Master ticket wallets offer an off-the-self solution for Urbit users who focus their crypto asset interactions purely on Urbit identities.

## Software Wallets
Because Urbit ID is a cryptographic asset controlled by your secret, you can use any number of 'crypto wallets' for holding your identity. A few common options include: [MetaMask](https://metamask.io/), [Brave Wallet](https://brave.com/wallet/), and [Rabby Wallet](https://brave.com/wallet/).

The main thing for securing an Azimuth-based identity is your wallet needs to support the Ethereum blockchain. 

Software wallets offer a nice balance of portability and flexibility, making them a common choice for Urbit users who also interact with other blockchain functionalities outside of Urbit. They are also a common interface for connecting a hardware wallet to an Azimuth interface, such as Bridge or Etherscan.

## Hardware Wallets
While Urbit's planet-level identities are not wildly expensive, there are some good reasons for stepping up your security practices to the use of a hardware wallet. Primarily: 
1. You are storing star- or galaxy-level identities. These are much more financially valuable assets and it is advisable to have more strict security practices around them.
2. You have built a lasting bond with, or even a highly credible reputation around, your Urbit ID. While inital costs of your Urbit ID are likely somewhere between free and $20, as you use your urbit and create relationships and reputational value, you may realize that it is increasingly valuable to you. In the same way that you may take steps to protect yourself from identity-theft in the analog world, so too might you chose that storing your Urbit ID in a hardware wallet is a good step to protecting yourself from identity-theft in cyberspace as well.

The two main options for hardware wallets used by Urbiters are [Ledger](https://www.ledger.com/) and [Trezor](https://trezor.io/).
