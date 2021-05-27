+++
title = "Bitcoin Wallet Disclaimers"
+++



The latest Urbit release includes a native Bitcoin wallet. Please read the following security recommendations and disclaimers carefully. Urbit.org cannot recover any lost keys.



### Verify

You should verify your version of this Bitcoin wallet. To do so, follow the instructions in the README in our [Github](https://github.com/urbit/urbit/blob/master/pkg/bitcoin-wallet/README.md) repo. 

Instructions reproduced here: 

To verify your version of the bitcoin wallet, run the following command in the dojo:
`> +btc-wallet-check`
It should return with the following hash:
`0v9t022.n8kv1.5emkt.s2p9i.hvsa9`


### Statement

The Urbit Bitcoin Wallet and its related components are experimental pieces of software. You are free to review the open-source code before using: 
- [Wallet](https://github.com/urbit/urbit/blob/master/pkg/bitcoin-wallet/README.md) 
- [Full Node Provider Agents](https://github.com/timlucmiptev/btc-agents)

No guarantees are made about the security of this software. It may contain vulnerabilities that could lead to loss of funds. This wallet software has not had a formal security security audit. 

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
