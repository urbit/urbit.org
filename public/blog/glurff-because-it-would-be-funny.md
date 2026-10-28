# Glurff, because it would be funny

Enter Glurff, a pixel-art world built on Noltbook, through a one-click guest moon or by installing it on your own Urbit ship.

- Date: 2026-10-27
- Author: ~sarlev-sarsen

![Glurff pixel-art world](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Glurff/Blog_Glurff_Hero.jpg)

> “You can have calm computing when you’re dead or the war is over. Until then—violently silly computing.”
>
> — `~disden-talhes`

The history of Urbit has many faces. Chief among them are “calm computing” and the idea that “Urbit is for everyone.” But when everyone includes `~disden-talhes` and a fleet of Claude agents, what then? How can calmness be guaranteed?

Arguably, the answer is: it cannot. You can now `|install ~nolset %glurff`. Even if you cannot do that, you can use one-click onboarding to enter a virtualized moon running inside another urbit and experience maximal silliness.

If doing patently insane things with your urbit scares you, turn around. Return to Tlon’s `%groups` and continue on the happy path. But if your curiosity continues unabated after that warning, read on. We will take you through each piece of the answer outlined above.

## A world of his own

As he described in his [contributor spotlight](/blog/contributor-spotlight-disden-talhes), `~disden-talhes`’s view of Urbit composability is simple—if contrarian in a sea of contrarians:

> Composability requires rules, and rules require a ruler.

Making rules and laws eventually makes composability harder. But the fear of creating a ball of mud can keep anyone from adding water to the system, leaving behind a desert of sand. Nothing can be scooped together. Infinite composability is infinitely incongruent; a worldview must be presented by a prime observer.

This view is what birthed `%noltbook`, and from it, `%glurff`: a visual, spatial interface on top of `%noltbook`. Together, they form an Urbit application environment that follows `~disden-talhes`’s rules—and into which he invites anyone interested in his view of Urbit.

## Getting started

There are two ways to engage with the experience `~disden-talhes` aims to offer: ephemerally, as a virtualized moon, or on a dedicated Urbit ship.

Want the most straightforward taste of the `%glurff` universe? Go to [Glurff.com](https://glurff.com), pass the CAPTCHA, and you will find yourself dropped into a moon identity—currently with kitten-themed avatars and nicknames—that you can use to explore.

Once you’re inside, head to the library chat and write `Argumentum ad baculum`.

Or, if you are already running your own urbit—or want to run a dedicated moon for the experiment—you can install both apps over the network:

```hoon
|install ~nolset %noltbook
|install ~nolset %glurff
```

`%glurff` treats `%noltbook` as a dependency. If you install Glurff without Noltbook, the Glurff interface will prompt you to install it. Once both are installed, you can click their respective tiles in Landscape to visit each interface.

## Noltbook as a worldview

An application like [Talon](https://talon.nisfeb.com) adopts Tlon’s worldview of a group-chat protocol, using `%groups` as its foundation. `%noltbook` presents a notably different worldview of what it means to be a “minimum viable chat app.”

For example, `~disden-talhes` insists that a chat must be forkable: capable of being taken and reconstituted with a different owner and different participants. Chats must also be capable of sending apps inside the conversation. `%doomur`, for example, can be played within a `%noltbook` chat. Other chats are gossiped across peers, with no centralized or canonical state.

## Glurff as an interface

While `%noltbook` instantiates a worldview about what it means to be a chat app, it is not the only possible way to interact with that worldview.

In the spirit of treating a chat as an interface to things traditionally considered out of scope—and taking artistic license to the point of absurdity—`%glurff` places a skeuomorphic interface on top of `%noltbook`’s proclaimed worldview. Inspired by apps like Gather Town and `%turf`, `%glurff` presents a 2D pixel-art scene on top of the `%glurff` group note in `%noltbook`.

Instead of clicking around a chat interface to play games or share files, you navigate an avatar through a 2D space and interact with the group’s different functions. Want to watch a movie with your friends? Go into the amphitheater and see what is playing on the wide screen. Want to play `%doomur`? Head to the game room and click the TV to get started. If you do not have `%doomur` installed, Glurff will prompt you to approve its installation from `~nolset`. Want to open a video call with a peer? Walk up and start talking.

In a world of AI-agent-enabled software, we expect to see much more of this “worldview versus interface” dynamic. Any multiplayer software needs agreed-upon protocols across identity, networking, data structures, and APIs. Individual users can then extend and customize the interfaces that adapt that worldview to their specific tastes.

Blockchains were the first to figure this out, using immutable and permissionless smart contracts as a coordination mechanism for consensus and composability. But protocols that do not need double-spend protection can use opt-in coordination with persistent, pseudonymous identities as a lower-cost path to collaboration and multiplayer software.

That’s Urbit.

## Silliness as a beneficial experience

In `~disden-talhes`’s pursuit of doing things “because they are funny,” he has relieved himself of many traditional Urbit constraints around permanence and self-sovereignty. You can install `%glurff` on an urbit of your own and use it to full effect. It runs on Urbit’s live network like any other Urbit software.

But the point is to have fun: to experience a worldview through an interface rather than maximize self-sovereign computing. Self-hosting Urbit OS and maintaining custody of an Urbit ID are not dependencies that matter for this first experience. That opens the door to two additional elements of the `%glurff` project.

The prime example is [Glurff.com](https://glurff.com): one-click onboarding to “Urbit: Glurff Edition.” You do not need a master ticket. You do not need to own an Urbit ID. You do not need to run an urbit. Click the button and enter `%glurff`. It is quick, painless, and entirely accessible through a web browser.

The second element enables the first. Glurff.com moons are virtualized ships running in `%theseus` through a modified [Vere runtime](https://github.com/urbit/vere). The ephemeral `%glurff` identities can be booted, rotated, and disposed of from within Urbit. They share a single thread in Vere, which constrains the number of virtualized ships you might want to run in one host ship, but they also benefit from Vere’s noun deduplication and very fast initial boot times.

Glurff users do not necessarily need all the affordances of self-hosting or data sovereignty. Simplifying that layer to minimize friction creates a happy path into `%glurff`—and into the fun of computing on Urbit.
