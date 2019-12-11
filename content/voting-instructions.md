+++
title = "Voting Instructions"
template = "page_indiced.html"
[extra]
hidetitle = "true"
+++

## Arvo Stability Vote

As a galaxy owner, you have the opportunity to participate in one of the first votes conducted on the Azimuth network – a vote on whether Tlon has designated Arvo as stable, the second component in the [roadmap](https://github.com/urbit/azimuth/blob/master/proposals/0xcb1f81e42b5e75f000f94fc71a3ea70cab4bfc6f236b91e717f1b9516e5596b5.txt) embedded in Azimuth.

You can read more about this milestone [here](/blog/stable-arvo/).

Below are instructions on how to support this document proposal.

## Vote using Bridge

- Log into [Bridge](https://bridge.urbit.org) with your Voting Proxy (you can use your Ownership Key as well, but that is probably harder to access)
- If you're presented with a list of assets, click on your galaxy.
- On the asset's overview screen, click Senate.
- The page will show a list of the documents that have previously achieved majority, as well as currently open polls. Tlon's latest proposal has the hash of `0x00000000000000000000000000000000000000000000000000000000000000a0`.
- For more information on the text of this proposal, see [here](https://github.com/urbit/azimuth/pull/24).
- Click "support" or "reject" under the hash, then "generate & sign transaction", then "send transaction", to vote on the proposal.
- If this proposal achieves majority support, you can see the result by coming back to this page.

## Vote using Etherscan (or other explorers)

- Read the document being proposed [here](https://github.com/urbit/azimuth/pull/24).
- If you're going to use Etherscan, you need to have Metamask installed and authenticate with either your Voting Proxy or your Ownership Key.
- Create and sign a transaction using your Galaxy Ownership or Voting Proxy on the [Polls contract](https://etherscan.io/address/0x7fecab617c868bb5996d99d95200d2fa708218e4#writeContract) in castDocumentVote with your galaxy number, the document hash from the above document (`0x00000000000000000000000000000000000000000000000000000000000000a0`) and vote as "true" for yes and "false" for no.
- Submit the transaction.

## Verify that this proposal has passed

- The Polls contract is [here](https://etherscan.io/dapp/0x7fecab617c868bb5996d99d95200d2fa708218e4#readContract). Input the hash (`0x00000000000000000000000000000000000000000000000000000000000000a0`) into "documentHasAchievedMajority." If this returns "true," it means the proposal was passed by the galactic senate.
- If desired, you can verify the above is in fact the real Polls contract by checking "polls" [here](https://etherscan.io/dapp/ecliptic.eth#readContract).
