+++
title = "Bitcoin Wallet"
+++

The latest Urbit release includes a native Bitcoin wallet. Please read the following security recommendations and disclaimers carefully. Urbit.org cannot recover any lost keys.

### Instructions

Run `|start %btc-wallet` in the dojo. After refreshing Landscape you should see an orange bitcoin tile in the first row. Clicking on it will prompt a two-step process:

1. Enter a provider who is connected to a full-node (such as `~zod`). The provider will maintain a synced Bitcoin ledger, index your public addresses to determine your balance, and process your transactions.

2. The next step is to provide an extended public key (or xpub). Providing your xpub allows the Bitcoin Wallet to automatically generate new public addresses (called _child public keys_—you can learn more about this [here](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)) when bitcoin is sent to your ship. To provide an xpub you can either enter your master ticket (which can be downloaded from [Bridge](https://bridge.urbit.org)), or directly import your xpub (such as from a hardware wallet like [Ledger](https://support.ledger.com/hc/en-us/articles/360011069619-Extended-public-key) or [Trezor](<https://wiki.trezor.io/User_manual:Displaying_account_public_key_(XPUB)>)).

Clicking on the Landscape tile will take you to the Bitcoin Wallet application, where you can view your balance and send bitcoin. All that you'll need to do is enter the recipient's Urbit ID (if they have configured the wallet using the above steps) or a Bitcoin address.

If you are interested in [being a provider](https://subject.network/posts/btc-wallet-config/#connecting-a-provider-to-a-full-node) or [running a bitcoin full node](https://subject.network/posts/pi-fullnode-urbit/#bitcoind) on the Urbit network please check out `~sitful-hatred`’s excellent tutorials.

### Verify

You should verify your version of this Bitcoin wallet. To do so, follow the instructions in the README in our [Github](https://github.com/urbit/urbit/blob/master/pkg/btc-wallet/README) repo.

Instructions reproduced here:

To verify your version of the bitcoin wallet, run the following command in the dojo:
`> +btc-wallet-check`
It should return with the following hash:
`0v9t022.n8kv1.5emkt.s2p9i.hvsa9`

### Disclaimer Statement

The Urbit Bitcoin Wallet and its related components are experimental pieces of software. You are free to review the open-source code before using:

- [Wallet](https://github.com/urbit/urbit/tree/master/pkg/btc-wallet)
- [Full Node Provider Agents](https://github.com/timlucmiptev/btc-agents)

No guarantees are made about the security of this software. It may contain vulnerabilities that could lead to loss of funds. This wallet software has not had a formal security audit.

You can read about the security audit for Urbit's networking protocol in this [post](https://urbit.org/blog/security-audit/). This audit does not encompass the wallet, except to the extent that the wallet operates on Urbit's networking architecture.

If you decide to use this wallet, please store responsible amounts of Bitcoin, and use best security practices. The developers of this software cannot help you recover your keys / funds, if lost.

### License

With the exception of its external dependencies, this software is a component of Urbit, and is released under Urbit's MIT License, reproduced below.  [View Original](https://raw.githubusercontent.com/urbit/urbit/master/LICENSE.txt)

The MIT License (MIT)

Copyright (c) 2015 Urbit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
