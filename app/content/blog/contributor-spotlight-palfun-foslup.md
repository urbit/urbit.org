+++

title = "Contributor Spotlight: ~palfun-foslup"
date = "2026-03-17"
description = "A conversation with ~palfun-foslup on Gall, userspace, and making simple software"
summary = "Tlon engineer ~palfun-foslup discusses building Gall apps like %pals and %rumors, why user-owned servers lower the barrier for peer-to-peer software, and what Gall 2026 aims to deliver with userspace compatibility and permissions."
# aliases = []

[extra]
# author = ""
ship = "~sarlev-sarsen"
image = ""
imageCard = ""
# imageIndex = ""
# imageDark = ""
# imageCardDark = ""
# imageIndexDark = ""
tags = ["spotlight", "gall", "userspace", "security"]
search_terms = [
    "contributor spotlight",
    "palfun foslup",
    "gall 2026",
    "userspace permissions",
    "userspace compatibility",
    "tlon messenger",
    "pals app",
    "rumors app",
    "peer to peer software",
    "personal server",
    "urbit security",
    "vere64"
]
+++

> **\~sarlev:** What drew you into the idea that we needed to throw away and rewrite the entire network computing stack?

**\~palfun-foslup:** I'm not even sure that was the idea that pulled me in. It was more like, "This thing is weird - let's look at the weird thing." Then you see the old blog posts say, "Imagine a world where client-server architecture is dead because everyone is their own server." What are the implications of that? What does that look like? You want this world, but how do you get there? You can't get there if a server isn't trivial to run and maintain.

I did a short stint in enterprise software, mostly insurance companies, and it was always "there's a server in the basement, don't look at it. There's another server one floor up, don't look at that either." Higher up there was something you could program against if you're super careful. It has a certain scale and a responsibility that pushes you towards that mode of development, but that's not sustainable.

Especially if you're just some guy and you want technology to work for you, it's the "I want to send a file to my friend" scenario. Now you have to set up a server, worry about permission control, figure out how your friend gets through your router. You get to the point where you just say, "I'll bike over with a USB stick." There's a bunch of things about computers we just take for granted. It was really interesting to see a world presented where all of this stuff was different. What if you start with simplicity as the principle and build the model from there - how does that affect the whole thing?

> **\~sarlev:** What part of the system do you think will change how people interact with their computers?

**\~palfun-foslup:** I'm not convinced it's possible to radically change how people interact with their computers, at least not out of the gate. If you want to give Urbit to the masses, it's, "Here's this thing that's more or less what you're used to, except it has this cool sticker on it." Then you start doing crazy things and ease them into it. Like boiling the frog.

> **\~sarlev:** You're working on Tlon Messenger, which seems to be going along this "boil the frog" strategy for its products. I use it every day, it feels normal. It totally works as a messenger app. What's the first small step that eases people into the new paradigm?

**\~palfun-foslup:** There are a bunch of angles you can take. The direction of the step doesn't matter as much as taking the step. We've experimented with personal AI assistants you control, and different custom channel modes. Channels that only accept pictures, channels that are only open for a time slot. Another thing we're looking at is public profile pages - your chat app is also a web page, you can share it, and people can get into the chat from there.

Chat apps blur the lines between what is a chat app and what is other software. You open WhatsApp or Telegram and it's groups, channels, voice chats, video calling, communities. Someone once asked me, "Do you think Urbit has enough chat apps?" Even if we don't, you don't want to build one because the scope keeps expanding. But that nature lends itself to tacking on cool, unique features. In Tlon's case, in Urbit's case, there's a lot we can give you by virtue of the thing being yours - the data is all there and it's backed by a full computer.

> **\~sarlev:** How does the "simple, durable, yours" idea shape how you think about Urbit?

**\~palfun-foslup:** The durability is tied into the yoursness. It's your personal server in your house; you know where it is. If you put your data there, you know the data isn't disappearing. People don't really have shelves for digital stuff. Having a computer you've laid out for putting things in feels yours, and because it's yours you know that as long as you don't touch it and don't enable auto-updates, [it stays inert and stable](https://dubroy.com/blog/cold-blooded-software/). Urbit takes that to the extreme - it's your one computer, and all the data that passes through is yours by system design.

There's also a divergence between normal users and the mythical user-developer. If you're brave enough to crack the hood and look inside, the system is approximately understandable. It's legible. You can look at the thing and see what it is, and the behavior is there in plain text. That enables power users to understand it deeply, make changes, and extend it. That kind of maintenance gives you durability that's basically unparalleled, and it only works because the system is simple.

> **\~sarlev:** If someone actually wants to understand their computer, how realistic is that?

**\~palfun-foslup:** You still have to do the work. You need to read Hoon and learn the concepts. If the desire isn't there, it doesn't matter how smart someone is. But if the desire is there, you can do it.

> **\~sarlev:** I like to imagine a physical manifestation of an Urbit structure, something in the far-off future of mind-chip interfaces, that gives a plumber or carpenter - the true shape rotators - a manifest item that they can understand intuitively. Something as simple as a Kelvin Zero Urbit seems like the thing to make that possible. Does that feel like a utopia or a dystopia?

**\~palfun-foslup:** That mode can exist next to other modes that are more desirable to me personally. It's not utopia versus dystopia. Idealizing about that stuff is an interesting exercise and it certainly came up in the early blog posts, but in practice it's wicked far off and not really meaningful to the current situation beyond the fact that simplicity sets you up for it.

> **\~sarlev:** Where did you struggle with legacy computing problems that feel less painful in Urbit, even in the state that it is today?

**\~palfun-foslup:** The general peer-to-peer stuff. If you're a hobbyist and you develop some piece of software that requires online storage, you don't want to pay a thousand bucks a month for an expensive server. The user should just run the thing themselves. But then you write peer-to-peer software and you're dealing with complicated networking, encryption over the wire, peer discovery, routing, different versions of software communicating.

In Urbit everyone already has their computer. The developer writes the software and pushes it out; people run it themselves. They need to know who they want to talk to, but they don't need to worry about routing or encryption - the networking stack takes care of it. You still need guardrails and agreed-upon data shapes, but it lowers the barrier to entry for custom communication software. [People have done this in the legacy stack](https://www.robinsloan.com/notes/home-cooked-app/): make something for your friend group, ship it in an app store beta channel, it never gets out to the broader world because of the structural limitations, but the five people who it's for run it and it works. That's the ideal mode of development, and Urbit enables that.

> **\~sarlev:** Right, so this is sort of the contrast between the size of software for something like Tlon Messenger and smaller little things you might build for you and your friends. You're the developer behind the much beloved `%pals` and `%rumors` apps, which are great examples of simplicity becoming more widely adopted. How did those evolve?

**\~palfun-foslup:** `%pals` and `%rumors` are funny examples of this. With `%pals` I had the good fortune of releasing it right when software distribution came out. Before that I was already working on app ideas where you need peer discovery, like for peer-to-peer file sharing. How do you discover content? You need peers.

You don't know who your peers are, but you know where your friends are. So I thought, what if I make an app for tracking your friends and other applications can pull your friends from that? `%pals` was intended as infrastructure for developers. Users get a friend list, and developers can leverage it to bootstrap their peer-to-peer apps. I made it as simple as possible, pushed it out, and now everyone who installs third-party software generally also installs `%pals` because so many things use it as a way to pull in that friend list for their own use cases.

`%rumors` came from a different direction. I wasn't trying to develop `%rumors`; I was trying to develop a generic library for gossiping data with those peers from your `%pals` friend list. I needed to test it, so I made a quick demo app for short text snippets, called it something funny, put some cute styling on it. It blew up overnight because it was anonymous message sharing and a straight feed of everything your network gives you. It was totally intended as a toy, and nobody was leaking state secrets or anything, but people started pulling it apart to see how anonymous it actually was. In short, someone realized the hop counter leaked the origin, so I added a mode where you can ask a friend to send a message on your behalf, and suddenly everyone had plausible deniability.

I made that stuff for myself. I try to keep firm about it - "I built this for myself; you can demand whatever you want but you're not getting it." But sometimes the public comes with good ideas and good criticisms, and in those cases I might go and do it.

> **\~sarlev:** So both `%rumors` and `%pals` are Gall apps, as is Tlon Messenger's backend, and there are some Gall improvements underway here in 2026. What's going on there, and how might it be influenced by the last few years of userspace development?

**\~palfun-foslup:** I can share a little. I'm not going to take the bait - we're not talking about Shrubbery here. But that whole arc and all the work that spun off it makes it clear that there's appetite for different models of userspace and different ways of developing. But if we jump straight into that, all the software we just talked about - `%pals`, `%rumors`, the Tlon app, etc. - won't work anymore because it's not compatible with the new model.

We've had the feeling for a while that we must draw from [the principled stance that Linux takes](https://linuxreviews.org/WE_DO_NOT_BREAK_USERSPACE): we can do whatever we want to the kernel, the only thing we can't do is break userspace. They have a commitment to compatibility, to things continuing to run into the future. We want that, or something close to it, for Urbit's userspace.

So that's one big prong: delivering a promise that userspace software can keep running indefinitely, in the way that the old blog posts promised.

The concession we give ourselves is that we can break userspace one last time to achieve this. That's a natural place to pull in one other big thing userspace is missing: userspace permissions. Right now any application running on your ship has root access to everything. It can read everything, write everything, replace your whole system with whatever it wants. While that's the case, Urbit is nothing more than a toy.

We had an effort to implement userspace permissions in 2022-2023, but we were forced to consider it pure theater in the absence of identical permissioning in the HTTP layer. This time, we're tackling both, no theater needed.

80% of the permissions work will be on the user perspective: make it presentable, describe permissions in an understandable way, hide the gory details but let power users see them anyway if they want.

We're bundling those two prongs into what we've codenamed "Gall 2026." Naturally it will release before the end of the year. Pinky swear.

> **\~sarlev:** Once Gall 2026 ships, what's on your radar next?

**\~palfun-foslup:** I'm very hesitant to answer. Part of me wants to say I want to reform logging and terminal output. I hope that by the time I'm done with this I just have it specced out and can hand that off to someone. There's interesting overlap with the LLM stuff too because reading output from your Urbit is kind of rough, and it shouldn't be.

> **\~sarlev:** Does hoovering up your own data matter more in an AI world?

**\~palfun-foslup:** I've always had this particular vision. I browse the web and visit all kinds of web pages and read all kinds of things, see pictures, and I try to find it later. I don't know what it's called, or where it is. But what if I could just keep all of the web pages, all of the pictures, every single byte that comes over the wire. If you just keep it, maybe one day you could search it. You have to put time on your side. Start tracking your data today even if it isn't useful, and when it becomes useful you're the guy with a whole lifetime of data behind you.

> **\~sarlev:** One man's archivist is another man's digital hoarder, right? What kinds of apps become viable once userspace permissions and Vere64 land?

**\~palfun-foslup:** The big obvious one is wallets for crypto and other high-value keys. Maybe you do password managers, secret storage, photo albums, because now you can actually lock that down. Vere64 is on the way. Big data storage isn't the end-all-be-all, but you unlock a lot once you're no longer thinking, "I've got to stay within my two, no four, no eight, maybe sixteen gigabytes."

People like to say, "I would build this, if only such and such." Cut out the such and such and build the thing. Leave a placeholder or do it in a hacky way. That's what I did for the torrent tracker back in the day: I didn't want to store the torrent files because they were a little big, so I stored magnet links. It was fine.

> **\~sarlev:** If you weren't working on Urbit, what would you be doing instead?

**\~palfun-foslup:** I don't know. I don't want to say nothing else is worth working on. If you go touch grass you realize there's plenty worth working on. But it's hard to imagine doing something else with computers besides Urbit. There's interesting stuff out there, but nothing that tops this. If I can't find anything remotely as interesting, maybe I should go into a different discipline altogether - take up woodworking or something.
