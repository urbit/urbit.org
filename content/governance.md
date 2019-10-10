+++
title = "Governance"
[extra]
hidetitle = "true"
+++

Our goal is to design Urbit simply, such that as many decisions as possible are made by the architecture of the system itself – that is, code should be law whenever possible. Code can’t anticipate every eventuality, however, and so the system design must include mechanisms that allow decisions to be made outside of the code.

Within Urbit, this form of governance is conducted by two groups: the senate of galaxies, and the body of core developers. The senate of galaxies is empowered to make changes to the solidity contracts which define Azimuth, Urbit’s PKI, by majority vote. This process is defined by the contracts themselves.

An owner of a galaxy (or a delegate) can propose a new iteration of the contract logic. The proposal can then be voted on for a period of thirty days. Once that period is over, if at least a quarter of the galaxies has voted, and the majority is in favor, the old logic contract will hand over the reigns to the new one.

In a similar process, document hashes can be proposed. While their off-chain documents can't be "technically enforced", this mechanism is useful for the Senate to record more abstract decisions.

For off-chain process around proposals, as suggested by core developers, please see [senate.md](https://github.com/urbit/azimuth/blob/master/senate.md).

The group of core developers manages Urbit’s [GitHub repository](https://github.com/urbit/), which controls Arvo, Urbit’s operating system. Changes and upgrades are decided upon by consensus. 

You can participate in the governance of the senate by acquiring a galaxy. If you would like to be involved with the governance of Arvo, check out our [developer guide](@/using/develop.md) to learn how you can contribute to core development. 


