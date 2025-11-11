+++
title = "Login with Urbit ID"
date = "2021-04-26"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = 'One of the killer pieces of missing functionality in the ecosystem is to seamlessly "login" to Urbit web apps at the click of a button.'
reward = "7 stars"
assignee = ["dcSpark"]
id = ""
completed = true
canceled = false
link = ""
+++

As of today, one of the killer pieces of missing functionality for Urbit is the ability for users to seamlessly "login" to websites/web apps thereby exposing the full functionality of their Urbit ship safely at the single click of a button. Even though airlock libraries are currently available, users must either go through a complicated and time consuming process setting up a web app locally or constantly run around copy and pasting their ship url & +code into random sites testing both their patience and luck hoping that none of the sites steal their private data or act maliciously otherwise.

This is clearly unsustainable and the ecosystem needs a solution in the near-term for users to experience and understand that Urbit is so much more than just Landscape, while providing developers a trivial way to embed Urbit support within their web apps. The Login With Urbit extension fulfills this exact role.

The Login With Urbit browser extension acts as a ship connection credential store, firewall, and messaging channel between web apps and your Urbit ship. In other words, it provides the needed infrastructure to develop secure Urbit Web Apps (UWAs) with standardized and clean UX for end users.

Within the extension users will be able to add "accounts" which map onto ship connection credentials (url, +code, @p). Thanks to browser extensions being sandboxed, storing these credentials encrypted within the extension provides quick-access in a safe manner locked behind a password. Whenever the user wishes to access the credentials after they have added an account (for connecting to the Urbit ship via airlock or for sharing the credentials directly with an external trusted application like Landscape), they are simply decrypted at that moment and do not remain stored in clear text after that. Thus users will simply add their credentials once and thenceforth get to enjoy an account-like experience within their web browser for Urbit Web Apps. (Furthermore adding multiple accounts will also be supported, thereby allowing multi-ship operators, infrastructure providers, or even families to take advantage of a smooth and secure password-based login experience just like they are already used to.)

The Login With Urbit extension will also offer a full-fledged API for web apps to interact with your Urbit ship. This API will effectively wrap both the connection credential store and the Urbit airlock library together with a single permissioned interface. This can then be used to build all kinds of UWAs, from simple use cases such as adding Urbit identity support to existing web apps, all the way to creating first-class Urbit Web Apps which integrate directly with your Urbit ship as a mechanism for storage, identity, networking, computation, and more.

The permission system completes the extension by acting as a user-directed firewall which isolates your ship from the dangers of the wild west of the web. This is another one of the key missing links within the Urbit app ecosystem which will allow for real world use cases such as enterprise to begin taking a more serious look at Urbit (where data security is vital). Rather than giving web apps full access and risking serious data leaks and more, users will instead allow them to obtain specific permissions which get saved and enforced by the extension. Unless the user explicitly permits it, web apps will not even be able to acquire the user's @p, let alone do anything sketchy.

Over time as the Urbit app ecosystem matures together with the exposed airlock functionality, this permission system can likewise advance. It will start off with simple permissions such as "Allow Web App X to scry any application", to eventually very fine-grained "Allow Web App X to scry graph-store for resource A and resource B". The current scope of this grant proposal is the former, but the long-term goal is to keep building out the exposed API to support the latter and thereby provide the ideal missing permission system for user-facing Urbit apps in general.

Thinking forward into the near future, the Login With Urbit extension also opens up many doors. One could even imagine full stack Urbit apps installed in a single click, wherein the web app interface asks for permission to connect to the user's ship which then automatically syncs a desk from another ship which contains the hoon-related components. This would be a seamless experience for the user, and would allow for them to merely confirm permissions once via the Login With Urbit extension and have everything done for them securely behind the scenes.

Other examples of Urbit Web Apps that can be powered by the Login With Urbit extension include:

- Urbit Ship Operator Dashboard (GUI control panel that exposes internal data & functionality for troubleshooting ships)
- Collaborative Document Editing App (Aka Google Docs, but powered by your Urbit ship)
- Urbit Powered Social Media Websites (Decentralized Twitter/Facebook/… where you own your data and connections within your ship, with a simple 1-click login as expected by every day users)
- Crypto Urbit Web dApps (Urbit Web Apps which also directly integrate with cryptocurrency dApps via web wallets such as Metamask, thereby using Urbit as the computation/identity/messaging layer tied together into the latest and greatest Blockchain dApps; opening up potential as of yet unseen)
- DAO Hubs (DAOs can have first class support for decentralized off-chain messaging for communication between members, off-chain voting, and more without relying on centralized servers as a breaking point. Because Urbit NFTs are on Ethereum, if DAO participants have their Urbit NFT in the same wallet as their governance tokens, the integration can be 100% seamless)
- Urbit App Store (a registry which visually displays available apps with an "install" button that syncs a desk from another ship)
- Hoon Example Registry (a registry for the dev community to share hoon generators/galls apps they can easily install to test, read the source, and learn from)
- And more!

The Login With Urbit extension will be a standardized interface for the creation of Urbit Web Apps that offer a seamless and unified UX experience while tackling the user-facing permission problem so that devs will not have to reinvent the wheel every time. There are countless pieces of low-hanging fruit which can be built off of this project past what has already been discussed, and as such we consider this to be a key piece of infrastructure that will increase the pace of growth for the Urbit ecosystem as a whole.

## Milestones

### Bootstrap & Messaging Channels

2 STARS Payout
Estimated Date: 06/15/2021

Setting up the core extension structure, implementing communication layer between extension and Urbit ship, and implementing communication layer between extension and webpages.

### Encrypted Accounts

1 STAR
Estimated Date: 06/30/2021

Implement encrypted accounts/credential store in the extension. Users add accounts by providing their ship url & +code and choose an encryption password.

### Injected Urbit API

1 STAR
Estimated Date: 07/09/2021

Implement injection of a core Urbit API for web apps which enables acquiring ship url, ship +code, ship @p, issue pokes/scrys/threads, and creating subscriptions.

### Permission System

2 STARS
Estimated Date: 07/31/2021

Build out the first version of the permission system which also exposes user facing UX which displays permission requests via extension pop-up (Metamask-like) and allows users to remove permissions.

### Polishing Off The User Interface

1 STAR
Estimated Date: 08/11/2021

Give the extension interface a major revamp from merely being dev-usable to well polished and offering new users a great experience.
