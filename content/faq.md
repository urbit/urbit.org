+++
title = "FAQ"
template = "page_indiced.html"
[extra]
hidetitle = "true"
+++

## Urbit

### What is Urbit? {#what-is-urbit}

Urbit reimagines the internet as a peer-to-peer network designed to stay that way. Previous attempts to "decentralize" the internet have only attempted to solve certain corners of the problem. Urbit proposes that only a new stack, built from the ground-up as a tightly integrated system, can realize a great user experience for people using a peer-to-peer web.

Combining a deterministic operating system (Urbit OS / Arvo) and a secure, global identity layer (Urbit ID / Azimuth), the Urbit project has created something that’s never existed before: an encrypted peer-to-peer network where you can be sure that messages are never tampered with or surveilled, and where strangers on that network can be trusted by default.

The connected world anticipated by Urbit is a much friendlier one, much like the early Internet, where collegial discussion and collaboration was the norm. Problems that are unsolvable without large-scale political centralization in our current internet – data breaches, spam, fake reviews, malware-spreading, harassment – become tractable when individuals control their computing again. You have one login for everything. You own and control all of your software and all of your data by default. Software is designed around the friendships, families, communities, and organizations you're already apart of – not the other way around.  

### How secure is Urbit right now? {#how-secure-is-urbit}

Urbit ID / Azimuth, Urbit's identity layer, is live on the Ethereum blockchain and has been audited by Open Zeppelin, Blockchain at Berkeley and Bloctrax. [We run a bug bounty program](https://hackerone.com/tlon) on HackerOne.

Urbit OS / Arvo is still an early beta. Arvo is safe to play with, but it’s not yet a place to store or share private information. Urbit's cryptographic protocols have not been professionally audited, and the OS itself doesn't provide protection from attackers on the network — although we haven't seen any yet.

### How can I contribute to Urbit? {#contribute}

We encourage outside contributors to become a part of the project. The best way to do this is to check out [Urbit](https://github.com/urbit) on Github, look at the pinned repositories, and check out our [Contributing](https://urbit.org/docs/getting-started/contributing/) guide. After you've gotten familiar with the system, feel free to open issues and make pull requests.

### Who is building Urbit? {#who-builds-urbit}

[Tlon](https://tlon.io), a San Francisco-based company, is the primary developer of Urbit, along with [various independent developers](https://github.com/urbit/urbit/graphs/contributors) and [urbit.live](https://urbit.live).

## Objections to Urbit

### Who is Curtis? {#who-is-curtis}

Urbit started back in 2002, as Curtis Yarvin’s personal project. Curtis developed the original prototype for Urbit and, separately, also wrote a blog on history and politics under the pen name ‘Mencius Moldbug’.

In early 2019, Curtis left the Urbit project and gave all of his voting interest (both as address space and voting shares in the company) back to Tlon. He retains a non-voting, minority interest in both the address space and the company — but is not involved in the day to day development or operations.

Curtis laid the foundation for Urbit by delivering its first prototype, but it has been refined and (almost entirely) rewritten by a community of developers since 2013. No one working on Urbit today had anything to do with Curtis’ writing. For the most part, we couldn’t be less interested in it.

The community of people who build Urbit have widely varied ways of thinking and looking at the world. But they all share two things: the desire to build neutral infrastructure for all people and to think from first principles about hard problems. We welcome spirited debate and disagreement as a primary tool for refining our work. Successful infrastructure, we think, serves all people — no matter what their background, culture or worldview.

### Why aren't there more planets? {#more-planets}

Urbit is designed to be as simple as possible. The sponsorship tree for Urbit ID simply expands by squaring the size of the last tier. That is, there are <span class="mono">2<sup>8</sup> (256)</span> galaxies, <span class="mono">(2<sup>8</sup>)<sup>2</sup> = 2<sup>16</sup> (~65K)</span> stars, <span class="mono">(2<sup>16</sup>)<sup>2</sup> = 2<sup>32</sup> (~4B)</span> planets. There are <span class="mono">2<sup>64</sup></span> moons — but moons are tethered to their planet, unlike stars and planets.

This pattern exists because it’s a simple way to enforce the scarcity of addresses and build a friendly network. When a tier of the address space begins to be populated, we start populating the next tier down. When Urbit nears the limit of <span class="mono">2<sup>32</sup> (4B)</span> planets, we’ll figure out a way to populate the <span class="mono">2<sup>64</sup></span> moons. The galaxies that govern the Urbit ID contracts can always vote to upgrade them — and we expect that they will.

(For more background on why Urbit ID is the way it is, read [this](/understanding-urbit/urbit-id/).)

The problem with populating the moons now is that <span class="mono">2<sup>64</sup></span> is a *really, really big* number. We’ll need some way of differentiating between humans and their devices (to prevent devices turning into rogue botnets). But that’s a hard problem, and we prefer to start with the simplest possible solution before solving hard problems. The current scheme works. And once we need to update it, we’ll figure it out.

It’s also worth noting that, while there are almost 8B people on Earth, there are almost certainly not 8B internet users. Facebook has about 2.5B users, Apple has about 1B. Urbit has a long way to go before we get close to <span class="mono">2<sup>32</sup></span>.

### Why do you use Ethereum? {#why-eth}

As of 2019, Ethereum is the most widely deployed, most secure and best documented general purpose blockchain. Using Ethereum is a practical engineering choice. It’s the best way to bootstrap real cryptographic ownership. We’re not specifically interested in Ethereum one way or the other.

One day we’d really like the Urbit ID registry to be hosted on Urbit OS itself. But the first challenge is getting Urbit OS to be completely secure.

### Why is Hoon so weird? {#why-hoon}

There are things about Urbit that are weird by design, and some that are weird because we haven’t gotten around to cleaning them up. Hoon, for the most part, is weird by design. There are a few things we’d like to clean up.

The runes are, once you get the hang of them, pretty nice. Your mileage may vary, of course, but many talented engineers have spent many, many hours writing Hoon. It’s a simple, practical, language. But the learning curve can be a bit high.

The standard library and naming is something we’ve discussed changing, and it could happen. It’s definitely up for debate whether or not the four-letter naming convention works well. The vanes (kernel modules) have largely moved away from this convention.

The right way to think about Hoon is as the ‘C of Urbit’. It’s a bare bones language that gets you pretty close to Nock. Eventually, we’ll probably implement more expressive languages that compile to Urbit. But for now, satisfy your curiosity and [sign up for Hoon School](/hoonschool/).

### What is the point of Nock? {#why-nock}

The primary technical reason we can’t run our own computers already is that they don’t all compute the same way. Nock solves this problem. It provides a single computing foundation for the whole network. It’s also deterministic — which is an important feature for anything you’re going to put sensitive data into.

It’s true that Nock, without jets, is slow. With the ability to call out to a native function, it’s not so bad. We’ve been working on a new Nock interpreter for Grall Truffle that’s about 10x faster than the current one — so we’re not all that worried about performance for the time being.

### Can I really host my Urbit with someone else? {#why-hosting}

As a rule, anyone that has physical access to your computer owns you. They can steal your secrets and read its contents. There’s no way around that. We can’t prevent anyone hosting your Urbit from inspecting it — but we think it’s much nicer to host an Urbit than to run a web service for two reasons:

One, you own your Urbit ID with a key that you never have to give your host. Your host only gets an operating key, and you can always revoke that key remotely. So, you might lose your data but it’s up to you to take good care of your identity.

Two, your Urbit runs inside a VM. There’s a very clear line over which a host should never step: your event log. This is not unlike the way that cloud hosting works today. Netflix is hosted on AWS — one of their biggest competitors. Luckily, the AWS terms of service protects Netflix from a legal standpoint.

At the end of the day, if you’re really worried about security, it’s quite easy to host Urbit yourself. This means that people who care a lot about privacy can still get the same usability as those who want the convenience of hosting.

## Urbit ID

### What is Urbit ID? {#what-is-urbit-id}

Urbit ID is a general-purpose PKI ("public key infrastructure") that Urbit uses as an identity system. This system is implemented as a suite of smart contracts on the Ethereum blockchain, and it determines which Ethereum addresses own which Urbit planets, stars, or galaxies. In Urbit OS, a single identity is called a "ship," whereas in Urbit ID, a single identity is just an "identity."

### What are stars, galaxies, and planets? {#stars-galaxies-planets}

Urbit IDs come in three classes: galaxies, stars, and planets. The length of an identity’s name will tell you its class. Galaxies are 8-bit and have names like `~mul`. Galaxies issue 16-bit stars (`~dacmul`), which can themselves issue 32-bit planets (`~laptel-holfur`).

Planets are intended for everyday use by individuals, and there are 4.3 billion of them (2 to the 32nd power). Stars and galaxies, on the other hand, are meant to act as network infrastructure: on the Urbit OS network they provide routing and are responsible for distributing software updates.

### What is Azimuth? {#what-is-azimuth}

Azimuth is what we call the set of Ethereum contracts that make up Urbit ID. It's also kind of a [cool astronomical concept](https://en.wikipedia.org/wiki/Azimuth).

### How many planets, stars, and galaxies are active? {#how-many-planets-stars-galaxies}

The raw data on most Urbit ID / Azimuth events that have occurred can be found [on the Azimuth website](https://azimuth.network/stats/events.txt). We’re currently working on generalized tooling for viewing these events.

You can also inspect and execute functions in the [azimuth.eth](https://etherscan.io/address/azimuth.eth#code) contract on Etherscan.

### What are comets and moons? {#comets-moons}

In addition to the three classes of identities mentioned above, there are two other kinds of Urbit ships that are _not_ registered in the Urbit ID / Azimuth contracts.

Moons are 64 bits, issued by planets, and have names like `~doznec-salfun-naptul-habrys`. Moons are meant for connected devices: phones, desktops, smart TVs, digital thermostats, and other IoT devices. Moons are subordinated to their parent planet.

Comets are 128 bits and have no parents. They can be launched by anyone. They are temporary, disposable identities. Being disposable and essentially unlimited, they will likely not be trusted by default by others on the Urbit OS network, though you shouldn't have any problem until the network grows much larger. They have long, hard-to-memorize names, like `~racmus-mollen-fallyt-linpex--watres-sibbur-modlux-rinmex`.

### What is a `@p`? Why is my username generated for me? {#what-is-patp}

A `@p` (pronounced *pat-pee*) is a name like `~zod` or `~lodleb-ritrul` composed of pronounceable, three-letter phonemic elements like `zod`, `lod`, `leb`, `rit` and `rul`. Shorter names, such as `~zod` and `~marzod`, are assigned to ships with special duties on the Arvo network stars and galaxies, respectively. Longer names like `~palfun-foslup` are identities for typical users.

These names map directly to a corresponding number in the Urbit ID address space. Galaxies occupy the 8-bit address space, so any galaxy is actually a number between zero and 255. Stars occupy the 16-bit address space, and planets occupy the 32-bit address space.

### Can I change my `@p`? {#change-my-patp}

Nope. There is a 1:1 mapping between name and identity. Think of your `@p` sort of like a phone number. It's just a random synthetic name that doesn't leak any personal information about you.

### How do I get an identity? {#get-an-identity}

The easiest way is to find a friend who can give you one. They're out there — just ask around.

Or, if you must, try an ERC-721 (NFT) exchange (Google or Twitter should help you with this). This will probably involve a purchase and a transfer to an Ethereum address that you own. We recommend using [Bridge](https://github.com/urbit/bridge/releases) to access the address that the identity is transferred to.

If you don't want to use Bridge, a tool like [Etherscan](https://etherscan.io) will allow you to execute functions in the [ecliptic.eth](https://etherscan.io/address/ecliptic.eth#code) contract.

### How do I transfer an identity to someone else? {#transfer-identity}

Access the Ethereum address that holds the identity you wish to transfer via [Bridge](https://github.com/urbit/bridge/releases).

### What is the best way to access my Urbit ID? {#access-azimuth}

We recommended using [Bridge](https://github.com/urbit/bridge/releases) for all Urbit ID-related operations. It’s great for managing your identities, as well as for viewing information about identities you don’t own.

Be careful about using hosted versions of Bridge not hosted on urbit.org. Since Bridge touches your private keys, it can also steal them.

## Urbit HD Wallet

### What is the Urbit HD Wallet? {#urbit-hd-wallet}

The Urbit Hierarchical Deterministic (HD) Wallet is a custom Ethereum wallet based on BIP39 and BIP44 – the same underlying technology used by wallet providers like Ledger, Trezor, Metamask, and MyEtherWallet. You can think of the Urbit HD wallet as a wallet of wallets, which lets you keep a single passphrase for all of your Urbit ID keys. Urbit ID uses multiple keys with different capabilities – a bit like permissions – so that you can keep the more valuable keys in cold storage while keeping less valuable keys, used in day-to-day operation, more easily accessible. If you're only operating a planet, you shouldn't have to worry about this: you can simply think of your "master ticket" as the password to your Urbit ID. If you're operating a star or galaxy, the Urbit HD Wallet allows you to implement a multi-tier key custody scheme.

If you're interested, you can read the spec here: [Urbit HD Wallet Spec (UP 8)](https://github.com/urbit/proposals/blob/master/008-urbit-hd-wallet.md).

### What is a master ticket? {#master-ticket}

The "master ticket" is the entropy seed from which your other Urbit ID keys are derived. It should be treated like a master password: **you should never share it with anyone, and you must store it very securely (see our practices below).** This ticket is used to derive the Ethereum wallet that holds your ownership keys, your Urbit OS key – used to boot your Urbit – and the other keys associated with your identity. You’ll have a ticket if you used the Urbit Wallet Generator or claimed a ship on our hosted version of Bridge.

If you're operating a planet, you can use your master ticket to authenticate with Bridge.

### What is an ownership address? {#ownership-address}

An ownership address is an Ethereum address that owns one or more of your Urbit IDs. The Urbit Wallet Generator creates one Urbit HD Wallet and associated addresses for each of your identities. Using the ownership key associated with your ownership address, you can transfer identities to other people, meaning that it’s very important to store securely.

### What are proxies? {#proxies}

Proxies are seeds derived from your master ticket used to generate sub-wallets, which are in turn used to generate keys that have the ability to execute different Urbit ID functions associated with your Urbit identity. Proxies generally have more restricted capabilities than your ownership seed. These capabilities include: spawning child identities, voting, and setting networking keys.

- Transfer proxy: Can transfer your identity to another Ethereum address.
- Spawn Proxy: For stars and galaxies only. Can create new child identities.
- Management Proxy: Can configure or set networking keys and conduct sponsorship related operations.
- Voting Proxy: Galaxies only. Galaxies are the part of the galactic senate, which means they can cast votes on new proposals including changes to the "Ecliptic" contract, which defines the operations of Azimuth.

### What are seeds? {#seeds}

All Ethereum key-pairs in the Urbit wallet system, including proxies, are produced by 128-bit cryptographically random values called seeds. These seeds are the equivalent of the BIP39 mnemonic of an Ethereum wallet. These seeds are yours alone. An ownership key pair is derived from an ownership seed, and likewise the various proxy key pairs, are generated from their respective proxy seeds.

For detailed information, see the [Urbit HD Wallet Spec (UP 8)](https://github.com/urbit/proposals/blob/master/008-urbit-hd-wallet.md).

### What does it mean to “set public keys”? {#set-public-keys}

This means registering the public keys of your identity's encryption and authentication key pairs (together known as "networking keys") with Urbit ID / Azimuth, so that others can discover them. The corresponding private keys can then be used to, for example, run a ship on the Urbit OS network.

You want to reset these keys if they are compromised, or if your ship has sunk. This is of little practical significance today, but resetting your networking keys resets your relationship with other ships on the network.

### What do I do if I want to own multiple identities? {#multiple-points}

We recommend using different HD Wallets for each identity. You are able to assign any number of identities to a single Ethereum address, however, since they are just ERC-721 tokens.

### How should I take care of my Urbit HD Wallet? {#custody}

Urbit IDs have accompanying security realities that must be taken seriously. Cryptographic assets are unique among things of value, because all of the responsibility for keeping those assets safe rests with the party that owns them.

The nature of decentralization is such that there is no authority that has the power to restore any lost or stolen wallet. Neither can anyone force you to follow good security practices. At most, they can give you recommendations. **Remember:** if critical items, such as your ownership key, are lost or compromised, your assets are likely gone forever.

Below we list some good practices for storing keys, strictest first. Higher-value assets should be secured with stricter measures.

#### Security Tier 1: Cold Storage*

Cold storage refers to any method in which secrets are stored in a way that is not accessible to any network. Cold-stored keys should only ever be generated offline.

Cold storage media options:
- Printing the secret on a piece of paper. However, paper wallets are vulnerable to various forms of physical damage, such as rot, water damage, smoke, or fire. Laminating the paper can mitigate some of these risks, but the lamination can potentially trap moisture. Make sure that you trust the printer: some have memory and network connections.
- Storing the secret on a brand-new USB stick or hard drive that has never been connected to a networked machine.
- Storing the secret on a hardware wallet like Ledger or Trezor.
- Engraving the secret on a strip of stainless steel. This medium is resistant to both water and fire damage.

Places to store your cold-storage media:

- A hidden safe in your home
- A safe-deposit box at a bank

It’s a good idea to store your keys redundantly; for example, on both a USB stick and a piece of paper in the safe, in case one of those methods fails. If you deem a key to be valuable enough, you can **shard** it into thirds (or other splits) and store each third in secure, geographically distributed locations. Urbit HD wallets for galaxies automatically provide a 3-way sharded master ticket.

#### Security Tier 2: Hardware Wallet or Paper Wallet

A hardware wallet is a digital storage device that’s purpose-built to store cryptographic secrets. They are unaffected by typical key-stealing malware, and have built-in security mechanisms that other digital devices lack. Do research and make sure that you are buying an authentic device manufactured by trustworthy, technically competent security experts with a good reputation. Trezor and Ledger are two popular brands of hardware wallets.

A "paper wallet" is a physical medium printed or engraved with a secret. These are resistent to network attacks, but have the downside that the secret must be entered into a computer by hand, exposing the user to attacks from malware and evesdroppers.

#### Security Tier 3: On Your Computer

This tier includes any method where secrets are stored on an everyday computing platform. Some such methods are:

- Encrypted PDFs containing a secret on your desktop’s drive
- Storing secrets on a cloud account protected by multi-factor authentication
- Storing secrets in a password manager

This method is risky for a number of reasons. Networked computers can contain malware. Computers that see common use are also prone to crashes and data loss. Storing secrets on cloud accounts mitigates the risk of data destruction, but it exposes a much larger attack surface to malicious actors.

For all of these reasons, make sure that you only use Tier 3 methods for the storage of low-value secrets.

### I have a galaxy or star with lockup conditions. How does this work? {#lockup-conditions}

There are two kinds of release schemes for locked up assets: linear and conditional.

In either scheme, you start out being able to take one star out of lockup, regardless of the terms set around the lockup as a whole. This way, you get to participate with a star right away. Become useful! Go do something cool!

If your lockup involved a galaxy, all of its stars will be locked up, but you will have immediate, lock-free control of the galaxy. You will likely need it to use that star.

Note that the "releasing" of stars just means that they become available for you to claim. They don't automatically get transferred to you, you have to withdraw them from the appropriate lockup contract.

Linear release is the simplest, and does exactly what it sounds like. Your stars will be released linearly over a period of time. Most commonly, this is a period of four years. If you have four stars in lockup, that means you will be able to withdraw one star per year. In many cases, there is also an initial windup period, which has to pass before the linear releasing begins. Usually, this is one year. Since Azimuth launched in January 2019, this means the linear release will begin in January 2020.

Conditional release is a bit more complicated. If your stars are in conditional lockup, they're likely divided over three so-called tranches. Each of these unlocks only after a unique condition is met. Since it's difficult to verify things about the real world using smart contracts, we instead have the Galactic Senate verify that they've been met. Once the Senate marks a condition for a tranche as cleared, it starts releasing linearly over the period of a year.

## Urbit OS

### What is Urbit OS? {#what-is-arvo}

Urbit OS, also called Arvo, is our functional and deterministic software stack. Arvo is written in Hoon, our purely functional programming language, which compiles to Nock, a compact bytecode language.

Instances of Urbit OS / Arvo, called 'ships', communicate as peers on what we refer to as “the Urbit OS network.” Using Urbit ID, Urbit OS ships can prove their identities to one another.

### What is unique about Urbit OS / Arvo? {#what-is-unique-about-arvo}

Arvo is quite different from other operating systems in many ways, but notably because it's completely deterministic. Processing in the system happens in a unique way: when an event happens, a transition function takes that event and the old state of Arvo, and then produces an effect and a new state of Arvo. To visualize:

`[event, old state] -> [effects, new state]`

All events are logged to disk, so you can always restore the system to a previous point in time.

### How is Urbit OS / Arvo connected to Ethereum? {#arvo-ethereum}

When an Arvo ship (instance) is started for the first time, you must use a "keyfile" containing the private keys for your identity's networking keys. Urbit ID uses the Ethereum blockchain as its decentralized ledger.

See our [Getting Started](@/using/install.md) guide to learn how to get your ship onto the Urbit OS / Arvo network.

### Will the Urbit OS network survive if Ethereum dies? {#if-ethereum-dies}

Yes. It would be annoying, but Urbit ID / Azimuth could be ported to another decentralized ledger. Or hosted on Urbit OS / Arvo itself.

### How do I install Urbit OS? {#install-urbit-os}

Check out our guides [here](@/using/install.md).

### How do I use Urbit OS? {#use-urbit-os}

The [Using](@/using/operations/_index.md) section of the documentation will help you out.

### How do over-the-air updates work? {#over-the-air-updates}

Your sponsor, a star or galaxy that your ship is connected to, may send you new source code for your system. When you receive new source code from your sponsor, your system recompiles itself using that code, performs any necessary data migrations, and keeps running. Ideally this happens seamlessly without the user even noticing, although there is sometimes a slowdown while rebuilding the system from source.

### What is Landscape? {#what-is-landscape}

Landscape is an experimental Urbit OS web interface that includes social functions such as chat and publishing. You can access Landscape by navigating to `http://localhost:PORT`, where PORT is typically 80, 8080, or 8081 (check your boot messages).

### I have an Urbit ID, now what? {#now-what}

Follow our guide on how to boot a ship [here](@/using/install.md).  

Get on the [mailing list](/../#mc_embed_signup). Learn [Hoon](@/docs/hoon/_index.md). Sign up for [Hoon School](@/hoonschool.md). [Make stuff](@/using/install.md).


## Urbit Grants

### What are the different types of grants? {#grants-1}

There are three ways to receive a grant of stars for your contribution to the Urbit ecosystem.
- You can submit a **Proposal** if you’re interested in working on a project of your own creation for a number of stars that you pitch.
- You can apply to claim a **Bounty.** Bounties are requests for work created by Tlon that are claimable by the public, with a predetermined number of stars as the reward.
- The **Gifts** program, which is Tlon’s informal way of rewarding contributions that don’t fall into the above categories. There is no way to apply for a gift.

### How do I get a gift? {#grants-2}

Make useful and substantial contributions to Urbit. These can be contributions to the project itself, or they can be outside tools that aren’t part of the Urbit codebase. There’s no formal system for determining who gets a gift; it’s at the discretion of employees at Tlon. Nothing is guaranteed, but you can get an idea for what kinds of contributions results in gifts by looking at the [gifts history.](https://grants.urbit.org/history)

### How often are gifts awarded? {#grants-3}

Gifts are awarded semiannually.

### Do gifts follow a set size? {#grants-31}

Gifts do follow a structure. A gift can be in one of three categories of sizes: Gold, Silver, or Bronze. Gold gifts award the most stars, Bronze gifts award the least. These categories don't correspond to a set number of stars being awarded. That number will likely change as the project matures and star values increase. That's why you see many more stars being awarded as the earliest gifts in the [history section.](https://grants.urbit.org/history)

### What happens if a user does not complete a proposal but meets some milestones? {#grants-4}

You must complete the proposal to be guaranteed to receive the star grant. Partial star payouts can be negotiated for incomplete work, but such payouts are at the discretion of Tlon.

However, either party may terminate a proposal on seven days’ written notice. In such a scenario, you may be paid pro rata for any portion of the proposal that has been completed.

### Do I have to pay taxes on stars? {#grant-5}

Yes. If you are American, we need your W-9 before we can pay you your stars. If you’re not an American, you don’t need to get us any forms, but you do need to personally follow the relevant tax laws in your jurisdiction. In the United States, stars are considered to be income.

### Can I create a bounty? {#grants-6}

No. Bounties are only created by Tlon, but we draw inspiration for bounties from various sources, including the community. If you want to pitch a project, use the Proposals system.

### How are proposals approved? {#grants-7}

The manager of the Grants program approves them after consulting with the relevant members of the engineering team. This proposal can be accepted, rejected, or accepted with changes by Tlon. The proposal’s star payout can also be adjusted.

### If I win a proposal, do I have an exclusive claim on the project? {#grants-8}

You have a claim to the reward of the project as long as milestones are met to the satisfaction of Tlon. However, Tlon may allow another developer to work on the same project in parallel, for a separate reward.

### Will milestones be embedded in a smart contract? {#grants-9}

No.

### Does reputation play a role in the assessment of grants? {#grants-10}

Yes. We consider this to be a feature.

### I completed a proposal. When will I receive payment? {#grants-11}

We will pay you within a 30-day window.

### Can I see the proposals of others that have been accepted? {#grants-12}

Yes. Check out our [proposals page.](https://grants.urbit.org/proposals)

### How do I safely store my stars? {#grants-13}

We recommend storing each star in its own Ethereum wallet. The private keys to these wallets should be stored on physical media that is not connected to a networked computer. Redundancies don’t hurt!

### Can I delegate a bounty or proposal to someone else? {#grants-14}

No. Not unless explicitly authorized by Tlon.

### Do I need to sign a contract? {#grants-15}

After you are approved to work on a bounty or a proposal, you will be sent a contract that you'll need to sign. You don't need to sign a contract to receive a gift, though.

Here are a few important points from the bounty and proposal contracts:

- **Intellectual property:** You agree to commit all intellectual property you create in connection with the relevant bounty or proposal. You agree that you won’t incorporate any IP that is licensed in a conflicting way.

- **No conflicts:** You agree that you are not subject to any restrictions that would interfere with your ability to complete the bounty or proposal.

- **No employment relationship:** You agree that being approved for the grant or bounty does not imply any employment relationship with Tlon.

- **Termination:** Either party (you or Tlon) can terminate the agreement on seven days' written notice. If that happens, you may be compensated *pro rata* for the amount of work you've completed, but this compensation is at the sole discretion of Tlon.   

- **Governing law:** The agreement is governed by the laws of the State of California.

Note that these paraphrased points are just for summarization purposes. The language in contract that you receive and sign is the only source of authority for the grant agreement.
