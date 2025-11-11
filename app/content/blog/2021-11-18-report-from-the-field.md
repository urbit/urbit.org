+++
title = "Report from the field: Assembly 2021"
date = "2021-11-18"
description = "The system builds the community and the community builds the system."
[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
image = "https://storage.googleapis.com/media.urbit.org/site/posts/essays/galen-at-assembly.JPG"
+++

![Galen at Assembly](https://storage.googleapis.com/media.urbit.org/site/posts/essays/galen-at-assembly.JPG)

Before Assembly I committed to write a ‘recap’ post for everyone who couldn’t make it. Originally I figured this post would be an opportunity to walk through the list of things that we shipped and showed off in Austin. But it turns out that the most important thing about Assembly was simply the way it felt to be there.

I’m not sure it’s possible to really do the feeling in the room justice, but I’m going to try. Then I’ll get into the announcements and happenings for those of you who couldn’t make it.

But first, a quick note:

We ran Assembly under the [Chatham House rule](https://en.wikipedia.org/wiki/Chatham_House_Rule). Basically, you can talk about what happens at Assembly—but you can’t name anyone.

I’ve run many of our Urbit events this way because I think it puts people at ease. Everyone in the room can just relax, connect with one another, and hang out without worrying about being named on the internet.

I’ll try to abide by the Chatham rule in this post which is why no one is named specifically.

![secret society shirt](https://storage.googleapis.com/media.urbit.org/site/posts/essays/secret-society-shirt.JPG)

New world energy -

In the months leading up to Assembly we were totally focussed on using the event as a release date for a bunch of different lines of work. Coming out of that sprint, we didn’t really know what to expect. We wanted to make sure Urbit was ready for people to build on and that everything we were going to ship worked well. What we didn’t realize was just how emphatically people are *ready to build*.

When I got up on stage on Friday night to welcome everyone I was really impressed by the room itself. It was packed with people who looked excited and motivated. The room just looked amazing. There were so many different kinds of people staring back at me. Some who I recognized from the earliest days of the project, and lots I had never seen before. I’ve been at my share of Urbit events, but this was something totally different.

We didn’t have much scheduled during Assembly. Most of the time was unstructured to allow for freeform discussion, sunbathing on the lawn, and gathering at picnic tables. The panels that we did schedule will go down in history. Panelists discussed questions about creators, escaping reward systems, and the role of DAOs from governance to governments. There was hard money with a computer on it, Moloch shoes, community members grabbing the mic, and a talk written two hours before it was delivered about the relationship between centralization and decentralization when it comes to UX that blew our minds.

I spent the weekend of Assembly in almost constant conversation with people building Urbit hardware, experimenting with different kinds of Urbit software, and thinking about incredible things like a Nock chip. I talked to the lead architect of a CPU from the 90s, a former senior US government official, an editor of a well-known literary magazine, the inventor of a new display technology, musicians whose work I already admired, a fragrance designer, writers, and, of course, lots of engineers and designers from many different backgrounds. Data scientists, systems hackers, language nerds, someone running a successful currency. I watched these people get projects off the ground, start raising money, plan the future of Urbit hosting companies, and plan new features for Landscape. I saw a last-minute warehouse party come together that kept people talking well into the early hours of the morning.

Where did these people come from? All over the place. They have this incredible *new world energy*. They understand immediately, intuitively that Urbit has the potential to be a foundation for the society they want to live in. I’ve never seen anything like it.

This energy seems to have come from the very practical work we do day-to-day: building Urbit, refining it, making it easier to use. The crowd at Assembly was somehow brought together by Urbit itself. It’s insanely exciting. It makes working on Urbit feel even more like a form of definite optimism. The system builds the community and the community builds the system.

![Use only beautiful computers](https://storage.googleapis.com/media.urbit.org/site/posts/essays/use-only-computers.JPG)

Urbit is ready to be built upon -

Sometime in early 2021 we realized that there were many lines of work converging on a single theme: ‘Urbit is ready to be built upon’. This is the spirit we wanted to bring to Assembly, and it was very much in the room in Austin. Some of that feeling is still lingering on the network. I think it comes from some very concrete improvements that have been made to the system.

We’ve always wanted Urbit to be maintained by a self-sustaining ecosystem and, early this year, we could see what needed to be done to really let others begin doing so. There were four parallel projects that came together to hit this milestone: Software distribution, star.market, developer and operator guides, and the Foundation roadmap. We talked about all of these things in the Assembly keynote (which you can watch [here](https://www.youtube.com/watch?v=ywj36TUtbS4)), but let’s touch on them one by one.

Software distribution

The most important thing that we shipped just before Assembly is the ability to actually package and distribute software over Urbit itself. It’s now possible for someone to build an app, package it up, and share it with a friend directly over the network.

For their friend, the experience is incredibly nice. You can simply send someone a link and they can install the app and run it themselves, on their own urbit, right away. The whole thing is peer-to-peer, of course. There’s no app store, no vetting process. It’s networked software like it’s supposed to be: people computing together freely.

We’ve been saying for years that we want people to build on top of Urbit and we always meant it. Now it’s possible in a way it never has been before. To check it out, watch [this segment](https://www.youtube.com/watch?v=MA8sqFi8Bd8) from Assembly.

Software distribution can get better in _a lot_ of ways, and we’re continuing to work on it. But it’s live, and people are experimenting with it already. There’s Chess, there’s Pokur, there are video calls (although they’re still a little buggy). Everyone seems to love ‘pals’ and ‘zone’—but you’ll have to get on the network to check those out.

star.market

We’ve always used the address space to fund our work as one of the primary Urbit developers. As Urbit has become more useful, and address space has become more expensive, it’s more and more difficult for others to do this. The community saw the need for developers to easily use their granted address space to fund their work and a higher resolution for the Foundation to fund contributions to Urbit.

This is what [star.market](https://star.market/) and the WSTR project are for. WSTR is an ERC-20 token that is backed 1:1 by ERC-721 Urbit stars. Unlike a star, a WSTR token can be fractionally divided, allowing for a broader distribution of ownership of Urbit. WSTR was built by the community over the past couple of months with no involvement from Tlon. Tlon did, eventually, help to put together star.market—the interface for interacting with the WSTR contracts safely and securely.

I’ve come to think that WSTR can be a powerful tool for funding new Urbit projects. I’m excited to see what both our early community of developers and operators can do with it, as well as the nascent Urbit Foundation.

Guides

As we make it easier for developers to build software, operators to participate in the economy, and communities to make Urbit their home, we need to improve our documentation. We always like to do things bottom-up: the product work comes first. Well, the product is now live.
To this end we recently launched:

[operators.urbit.org](https://operators.urbit.org/) collects all of the information about participating in the Urbit economy, running infrastructure nodes, and participating in governance in one place.

[developers.urbit.org](https://developers.urbit.org/) has an overhauled program for learning about Urbit as a system and beginning to develop on top of it.

[network.urbit.org](https://network.urbit.org/) allows anyone to explore the network. View galaxy transfers or how many planets a star has spawned.

We’ve got a lot more planned in this area of work in the coming months, and these three sites are a great start.

Urbit Foundation

Over these past few years we’ve operated the Urbit Foundation as a ‘protocol’ inside of Tlon. Our goal has been to develop that protocol to the point that it’s refined, working, and can run on its own outside of Tlon.

Josh has done an exceptional job running the foundation protocol at Tlon over the last year or so. He and I have been working closely together on everything that Tlon builds, while also coordinating our community of contributors. I’m very excited that the Foundation, with Josh as its Director, is now separating from Tlon as a fully independent entity focussed on supporting the ecosystem.

Assembly was the perfect moment to begin formally separating out the Foundation and, as of a week ago, it is an independent entity. We’ve thought long and hard about how to make the Foundation an enduring, stable organization. Josh will be the first Executive Director but, ultimately, the Senate of Galaxies will elect the Board. This will keep the Foundation accountable to the network as a whole and I’m optimistic it can work well.

If you’re on the network, you can read more about the Foundation in ~wolref-podlex/foundation.

Assembly 2022 -

I had more than a few enthusiastic people come up to me at Assembly and ask what we were planning for Assembly 2022. I have absolutely no idea, of course. We poured all our energy into making Assembly 2021 a success.

Given what I saw in Austin, I’m pretty confident that next year we’ll be in completely new territory. The goal of this project has always been to build a completely new digital world. And now, it seems to be building itself.
