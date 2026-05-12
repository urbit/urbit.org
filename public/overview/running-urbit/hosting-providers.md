# Hosting Providers

Explore hosting options for your Urbit

If you don't want to self-host your urbit, you can also look to 3rd-party providers who offer managed Urbit hosting. These services handle the technical aspects of running your ship while you get the benefit of an easily accessible and reliably networked Urbit node.

## Tlon hosting services

Tlon Corporation is the preeminent hosting provider which provides free and seamless onboarding to the Urbit network

Tlon Corporation offers free and seamless hosting for your urbit with a specific care taken to have a smooth onboarding experience to Tlon Messenger, Urbit's most widely used application.

If you are looking to get on the network and have Tlon host your urbit ship, rather than [self-hosting it yourself](/overview/running-urbit/run-urbit-os), but don't know anyone already on the network, follow [this link](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17) to join the Urbit Foundation's public group on Tlon Messenger. Introduce yourself and someone will gladly show you around.

Presently, onboarding to Tlon and using their hosting will assign you a [Layer 2](https://docs.urbit.org/urbit-id/l2) planet controlled by a [master ticket](https://docs.urbit.org/user-manual/id/hd-wallet) which Tlon will co-custody with you. You can access this master ticket in your dashboard (under 'Settings > Reveal Master Ticket'), but it is important to note they can access it as well. Tlon will give you full custody of your identity upon request, although as a host they do need to have your [management proxy](https://docs.urbit.org/user-manual/id/proxies) in order to properly run your ship. Changing your keys without coordination with Tlon may result in service disruption, so we recommend emailing them at support@tlon.io if you want to take full ownership of your Urbit ID. 

If you are already on Tlon Messenger, you can invite your friends by creating an invite and sharing it to them via either QR code or a copied URL and they will be prompted to their mobile app store to download the mobile client and create an account and claim a free Layer 2 Urbit ID.

### References

- [Quickstart](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17) — Get started in a few clicks with Tlon Hosting
- [Tlon Corporation](https://tlon.io) — Learn more about Tlon's hosting services

## Why use a hosting provider?

Urbit is a personal server, yet there are still service providers who will host it for you

Urbit is intended to be 'your personal server'. Your own always-on, networked computer that is so simple it is as easy to run as caring for a cactus. If this is true, why are there companies that provide hosting as a service? Presently it is for two core reasons:

1. Urbit is still being built. Running it on your own isn't *quite* as easy as caring for a cactus, *yet*. In our experience, it is still a task for a quasi-technical user, but it is easier than self-hosting just about any other self-sovereign computing process (e.g. running a Mattermost instance or a Nostr relay). That said, if you can run one urbit for yourself, it's trivially easy to run a few more for your friends (especially using something like [Groundseg](https://manual.groundseg.app/)). But hosting providers generally make the invite and onboarding process easier, and will handle maintenance and customer support as well.
2. Frankly, not everyone cares about owning their own data or identity, but networks effects matter. Unique to Urbit is it's ability to fully cater to both the hyper-privacy aware, and the totally aloof. Imagine if you could have a Facebook account, but which wasn't under the control of Meta. Your grandmother can have her easily accessed farmville account and 'pay' for it with her attention being sold to advertisers, while you get to keep your experience free from the attention economy. All while getting to be full participants in the same network.

We intend Urbit to be for everyone, and so while the current experience is focused towards developers and power users, hosting providers are a key element in the journey to bring Urbit to everyone.

### References

- [Tlon Corporation](https://tlon.io) — Explore Tlon Corporations hosted Urbit solutions

## Shortfalls of hosting providers

Hosting providers are designed to be scalable, not bespoke, operations.

Hosting providers are a great solution for handling running and maintained large numbers of urbit ships at scale, and it is thanks to urbit's unique design that running your operating system as a hosted node doesn't mean your are forever trapped in MEGACORP's datacenter. But there are some considerations to having a hosting provider run your urbit for you that are worth considering.

Primarily, your urbit communicates over an end-to-end encrypted network (Ames), but because it is a full logical computer that runs as a process on the host machine, it cannot be 'encrypted at rest'. Yes, if your urbit was turned off it's pier could be encrypted before being put into storage, but *while running it must be unencrypted*. This means the an untrustworthy or otherwise compromised host could look at your data and computation. Now, urbit isn't designed as an *anonymous* computer network, and it isn't good for doing things that you wouldn't want your grandma to know you were doing (don't do crimes, kids), but it is worth noting that hosts *could* see your data *if they wanted to* (or if someone else forced them to).

Secondarily, because hosts operate at scale they are more likely to have more narrow ways to interact with your urbit. When self-hosting your urbit, you are in control (and responsible for) figuring out how to set up networking, chosing a domain name and DNS configurations, and accessing the underlying unix process (i.e. over `ssh`). Hosts will tend towards focusing on providing smooth and reliable access to your Urbit's web interface, for a smooth consumer experience. This is great for your average end user, but some power users or developers may find it more limiting than they desire.

## Urbit ID incentives for hosts

Cryptographic ownership of Urbit ID helps enforce honest operation of Urbit OS by hosting providers

In the world of MEGACORP SaaS services, you are wholly subject to the whims of your service provider. They chose what version of the software you run, who you can connect with, and whether or not you even exist. As in, if you have an identity in the first place. With Urbit, the paradigm shifts and a better solution to the principal-agent problem presents itself. In separating out ownership and control of both the Urbit OS and Urbit ID, it becomes easy to place the locus of control back in the hands of the user. 

This shift modifies the relationship between hosting provider and user in a few ways:
- The user cryptographically owns their identity. At any moment, the user can declare to the entire rest of the network, "That instance of Urbit OS claiming to be me, *is not me!*"
- The user can then spin up a new instance of Urbit OS with a verifiable claim of "This is truly me" and override the claims of a malevolent host
- Because the user always owns their identity, a hosting provider cannot 'unperson' their users (and silence any dissent about the quality of their service in the process)

All of this means that there is a stronger incentive for a hosting provider to behave as a honest actor, serving the interests of their users as the principal in the relationship, rather than bending towards extractive behavior. Pair this with the portable nature of Urbit OS and watch as the incentives that turn basically every piece of modern software into tools of surveillance capitalism or the attention economy fade away and your computing experience feels like it is *yours* again.

### References

- [Bridge](https://bridge.urbit.org) — Manage your Urbit ID via bridge, independent of your hosting provider
