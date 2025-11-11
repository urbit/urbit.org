+++
title = "Urbit master ticket wallets"
description = "Master ticket wallets are an easy and secure way for managing ownership of your Urbit ID"
tags = ["ethereum", "wallet", "azimuth"]
lastest-update ="<some-arvo-hash>"
image = ""
imageDark = ""
references = [
    { title = "Bridge", link = "https://bridge.urbit.org", description = "Manage your Urbit ID with master tickets" },
    { title = "Technical documentation", link = "https://docs.urbit.org/user-manual/id/hd-wallet", description = "Learn about HD wallet architecture and security" }
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

Urbit IDs are digital identities that are truly yours, rather than issued by MEGACORPs which can revoke them at any time. This is achieved by enabling self-custody of the cryptographic secrets which control the blockchain's record of your Urbit ID's ownership characteristics. 

Sometimes referred to as a 'brainwallet', a 'master ticket' wallet is a specifically designed mechanism for remembering and deriving cryptographic secrets. By holding your Urbit ID in a master ticket wallet you are able to securely shard different permissions relating to your digital identity. For more technical detail on how this works, and recommendations for securely managing master ticket wallet secrets, check out [the HD Wallet](https://docs.urbit.org/user-manual/id/hd-wallet) documentation.

Master tickets are just one way to store the cryptographic keys for your Urbit ID, other options include standard software wallets (such as MetaMask, or Rabby), hardware wallets (such as Trezor or Ledger), or even a multi-signature wallet (such as Gnosis Safe). We recommend choosing the method that you are most familiar with, and which is well supported by the interfaces you regularly use to interface with the blockchain (such as [Bridge](https://bridge.urbit.org)).
