+++
title = "Contributor Spotlight: ~nordus-mocwyl"
date = "2025-12-16"
description = "A conversation with ~nordus-mocwyl on independent music, Urbit, and direct charity"
# aliases = []

[extra]
# author = ""
ship = "~sarlev-sarsen"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_QA+mastyr-bottec_Social.png"
# imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_QA+mastyr-bottec_Social.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_QA+mastyr-bottec_Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags = ["spotlight", "userspace", "community"]
+++

> **\~sarlev:** What drew you into the idea that we needed to throw away and rewrite the entire network computing stack?

**\~nordus-mocwyl:** I love this question, but I don't have a great answer for it, because I didn't even conceive of that part of the idea space until after getting into Urbit. Because I'm a musician, not a computer science graduate or anything like that, I didn't have any preconceived notions about the technical stack that we use every day. Urbit introduced me to the idea itself, and from there learned much more about the technical underpinnings of computing.

> **\~sarlev:** What drew you to Urbit in general, then?

**~nordus-mocwyl:** What drew me to Urbit was my own personal research for how musicians can be independent, or at least as independent as possible. It comes from the perspective of a [~dalten](https://dalten.org) kind of sovereignty thing as I just want musicians to own all of their career. I was looking into this because when I was in music school as the 'roadmap' at the time was to get a band, play live shows, make a demo, send it to record labels, and then hope you make it big. It was the whole world of trying to get radio plays and musicians getting taken advantage of by the record labels. It was a big problem.

But it was right at the tail end of my being in college for music when YouTube became more of a thing.

Through all this it became clear to me that the internet can make the life of an independent musician actually work. Not just the 1% that can make it big, but all the little musicians whose fans want to see more of them and, more importantly, want to see them succeed. So I was really interested in the question "how does YouTube allow musicians to stay independent?" And then when Patreon came out, I thought, "oh, this is perfect!" But that sent me down the rabbit hole looking for more independence. I learned how to make a website, how to make a podcast, and that's when I got my hands dirty with computer stuff.

I think sometime after I realized how powerful having a website is, I started to figure out that even having something like SquareSpace was a walled garden and endless subscription payments. So when I found Urbit and learned I could actually run my own personal server, I realized this is really the actual ultimate thing the musician can do and be everything for themselves. That was a big unlock.

> **\~sarlev:** It sounds like musicians are trapped in this cookie cutter, you know, mold... Maybe you could even say, only shooting stars break the mold... sorry, I'll show myself out for that reference. What parts of Urbit as a system do you feel have offered you that sovereignty in practice? What do you think, for a musician, or a small creator, can positively impact their life?

**\~nordus-mocwyl:** If there's going to be a theme to this interview, it's that I'm just going to try to keep it simple wherever I can. What is the bare minimum you need to be able to do on the internet to operate as a full internet citizen? [In one of my videos](https://www.youtube.com/watch?v=BnkxVwm99xQ) I tried to really figure out what the networked computing equivalent of a driver's license is. The things without which you just can't operate in the digital world around you. Take serving files for example; if you want to be an internet citizen you need to be able to do this. Expanding out from just files, you need to be able to serve and have control over your website—not pay Squarespace or whatever—but then for musicians, it is steps beyond that in their distribution, their groups with gated access, and payment rails. It's really not that much, but it is such a nightmare when you wake up to the fact that so much of this is controlled by others. But it should be simple.

I just want to make it easy for the long tail of musicians who aren't trying to go triple platinum, but who think to themselves, "I just want to make music and it would be great if I had direct connections with my audience."

> **\~sarlev:** You had a unique path into programming, going to music school, but then going and learning Hoon and making your own independent software. It sounds like this all came out of a desire to have deep independence; do you feel that yearning exists for a lot of other musicians but they don't know it is a thread worth pulling on? Why aren't 40,000 musicians on Urbit who are all making their own websites or community groups?

**\~nordus-mocwyl:** Yeah, it's kind of a bummer because Urbit does have a history of attracting bands. You can listen to the band [Endpoint on Justin Murphy's podcast](https://youtu.be/sdXnzta2BpQ). They learned about `~littel-wolfur`'s Discord connector and setting up a free Oracle Cloud server. One of the members was setting up as many of those instances as possible for his followers to get onto Tlon's Groups app and created the tunnel between that and Discord. They were super stoked about it, but I think the promises didn't really become real for them.

> **\~sarlev:** What else do you want to be able to do with your personal server? You've said, "hey, I want my group, I want to be able to serve a website, serve files, and take payments there." Where do you see it going from there?

**\~nordus-mocwyl:** That's really it. That's 100% it. It's a very small scope.

> **\~sarlev:** You've mentioned Hawk. It's one of those things that you have really picked up and run with. What have you seen it do for you?

**~nordus-mocwyl:** I think Hawk does a really good job of being a gateway drug. It starts by giving you a very functional website builder, but it can definitely do more than that too. As I mentioned, I built the whole guitar course in Hawk, but that definitely took a bit of trailblazing. I don't think it would take much—maybe a really well-done walkthrough—to make that capability much more accessible. Something where you ramp people up from the bare bones to the much more complex. You could start simple: open up your Hawk and write plain text. Then a little markdown. Then your HTML. Then `%sail`. And beyond that you could do components in the namespace and plug those into your `%sail` and Udon and all this stuff.

There is so much that Hawk can do that I'm getting a bit carried away, but I think there is a really gentle ramp-up that is possible. It just needs the breadcrumbs to be laid there. Regardless, I think there's just no better tool in my mind than Hawk for making a website.

It does have its limitations, though. For example, I can't currently serve my videos directly from my Urbit. To work around this, I embed from YouTube, and since it's already the channel I use for finding students, it's not the end of the world. But with `vere64` I should be able to put everything right on my Urbit, which will feel good. I'll have to find out what load that's going to have on my server, because people have pretty high expectations these days. Like, when people send you links from Google Drive to watch a video, it's pretty miserable.

> **\~sarlev:** Yeah, that will be an open question for sure.

**~nordus-mocwyl:** YouTube has totally conditioned me to click on something and have it play before the pause button has loaded and is clickable. Which is both annoying and really impressive all at once.

> **\~sarlev:** The pause button loading after the video has started is one of these little examples of how Google's incentives about what they want you to do inform the things that work well versus the things that don't work well. They don't really want you to pause the video. They want you to watch the video. This feels like a little peek into some of how building on Urbit is fundamentally different. Where in the legacy computing world do you struggle with these fundamental or systemic issues that are just wholly not a concern with Urbit?

**~nordus-mocwyl:** This comes back to answering the question you were going to ask about what drew me to Urbit and why we need to throw everything out and rewrite the entire networked computing stack. For me, the way I understand this comes from when people were excited about desktop computers: They were excited about not just getting on the internet and consuming everything, but *serving* the internet. A big part of it was that everyone was able to add files to the internet and then other people could pull those files from the internet in a peer-to-peer manner. And when you realize the reason AWS exists is because running your own server is just a pain in the ass, you realize it is necessary to rewrite the stack so an average person can just have a server where they can do their humble little things. I want to send my baby pictures right to my mom's computer, and that's it. I just want my computer to have the baby pictures, and then when her computer is ready, she can download them onto her computer.

The consequence of it being such a big headache that no sane person can do it is that you give away the actually important and valuable aspect of being a part of the internet, and you outsource it. You don't realize how powerful it is until it's too late. And when you do, it's because you look at Facebook, Google, Microsoft, Apple, and Amazon and see that giving them this powerful part of having a computer on the internet ended up centralizing all this power and money.

I don't want a middleman, or anybody searching through the pixels and all that. And it's not even a privacy thing; it's just from a sanity, direct connection perspective. I want to be in a computer world that acts like actual reality, not this really unfortunate thing that we've set up. So yeah, we have to rewrite it so we can reclaim that serving part of our computers.

> **\~sarlev:** Once you know this dynamic exists, it's almost that Urbit is this infohazard that starts to propagate back into the rest of your computing experience. As a musician who wanted to hold on to his independence, I'm curious how this experience or realization has changed your relationship with computers?

**~nordus-mocwyl:** You know, to answer this, I'll actually stray a little bit away from the whole serving files theme that I've been hitting on, because the biggest thing that interacting with Urbit did to change my computing experience is I just get what the zeros and ones are about now! Learning Hoon and then learning Nock helped me understand Assembly. It helped me understand what computation is. That's something I just never understood. Now I understand backend stuff, and even having a passing understanding of Nock gives you the sensation that you could understand it all the way down. For the particular part of the computer-user spectrum that I inhabit, that's really satisfying.

There's very little in the world that you can actually understand all the way down. Getting the ability to believe that I could understand the computer all the way through is unbelievable.

With the legacy world and building a website, the stack just keeps going and going. You think about learning HTML and CSS for a web page, then you have to understand the browser, and then applications sitting on top of an Apple computer. Now you've got to understand the Apple computer and all the Assembly code at the bottom and the x86 stuff, and then it's all the textbooks from computer science graduates. For me, that's a "Just no. Absolutely not. Hell no."

In contrast, with Urbit, you learn Nock, you learn Hoon and Gall agents and then Hawk. It's pretty manageable.

> **\~sarlev:** Are there other places in the legacy computing world where you struggled with systemic issues that are wholly not a concern in Urbit? Is it mostly just this simplicity layer that's been beneficial to you?

**~nordus-mocwyl:** In the legacy world, one of my biggest issues is that you just don't know, "Who am I talking to?" It's such a problem that people almost don't even see it as a problem. IP addresses tell you literally nothing about who is talking to you. Because of how we ping everything, an IP address does not mean a computer. And yet, that was the idea, right? "Here's the computer and here's kind of my identity," but it became the equivalent of my identity being my physical address. What if I move, or if I'm in Minnesota at some point? It just doesn't work.

With Urbit, somebody shows up, they easily prove who they are, and you get to tell them, "Oh, great. I'm glad you're here. I'm serving these things, and you have access to them." Or, "Oh, shoot. You're that guy. Well, forget you. I'm not taking any packages from you." That's a really big deal.

This actually touches on one of my problems with Hawk right now. It's really a two-part problem: First, I need everybody on Urbit, and then I need Hawk to be able to say, "Only this set of ships can get into the guitar course."

Actually, one of the things the Tlon Messenger app has that I really want is robust groups and roles. I just want easy access to it. I want my Hawk to be able to go and ask groups, "Hey, you have the guitar course group; everybody who has the `paid` role—they get access."

As far as my opinion of how we should do it, I'm a huge shrubbery guy. I think it's a mistake that we're not paying `~hastuc-dibtux` to make a vane for shrubbery. Because the truth is, really, a lot of the great stuff in Urbit is in [Clay](https://docs.urbit.org/build-on-urbit/core-academy/ca10).

Clay does what I want. Clay serves files, Clay does access control, and Clay does revision control, which I haven't talked about, but Hawk doesn't do that. You'll overwrite your data in Hawk.

I think it's a shame that Clay has become less of a file system and more of a Hoon builder. My opinion is really that we need to have a namespace file system pretty much identical to Clay, but make it shrubbery—where things can talk to each other and the state of apps are just spilled out into the namespace.

> **\~sarlev:** You've done a video series too, a debrief or maybe even you might want to call it a postmortem, on Gall... It's fun to talk to people about their different opinions on Urbit's userspace and application model. Some people are in the camp of, "Oh, it's great. We just need to, you know, change these few things." Other people are, "Well, actually, I just want Clay. Clay is mostly what I want." There's obviously the "Shrubbery as meta category for things that are not in current existence but that I want to exist that make composability easy or whatever else." What does the step forward look like to you?

**~nordus-mocwyl:** You are bringing the heat. I do think it is just taking shrubbery seriously. Hawk is the best example of taking the ideas of shrubbery seriously. `~migrev-dolseg` fused the browser with a shrubbery of sorts, and it's a killer app! It's really, really good. Now we just have to make it "More Urbit"—we need to get it closer to the kernel.

> **\~sarlev:** What is Hawk missing currently that it would get from being closer to the kernel running in its own vane?

**~nordus-mocwyl:** One of the kind of silly ones is just revision control. Clay already has it. I'm sure Hawk could do it, but should you rewrite stuff that Clay does into a Gall app? Probably not. After revision control—it's funny because this is 100% the topic I've been thinking about the past week—is being able to share something across the network, especially sync something across the network. Hawk can't do that. Clay syncs across the network just fine. I would love for my guitar course to be on somebody else's Hawk and then when I make a change it just updates.

> **\~sarlev:** Naturally, userspace will continue to evolve as people kind of have different demands on it, yourself included. Let's talk more about that—I'm sure the audience is on the edge of their chairs learning there's a musician that became a Hoon developer and is building things—What are you working on?

**~nordus-mocwyl:** I've been working on this guitar course, "Beyond Beginner Guitar." It's not in its final form, but it's a totally consumable first start. The course is completely on Hawk. Although, because of the limitations we've talked about, it's not exactly what it needs to be yet.

Of course, for anyone wanting to deep dive into how I constructed it, or what I want to do next, they can read my [Building Beyond Beginner Guitar](./building-beyond-beginner-guitar.md) article where I dive into more detail. But basically, I am balancing this tension between making it easier for somebody who is not on Urbit—they never need to hear the word "Urbit"—to pay and get into the course versus the fact that I want to go more and more fully Urbit-native with it.

The other thing that I am doing is aiming to make the growth of the guitar course also be a charity fundraiser. For anyone that knows me or has [watched my videos](https://www.youtube.com/watch?v=YXjeroXnltg&list=PLKYUncyTxhJPp-qJd46TSijnRBlk7kD9P), I just love [GiveDirectly](https://www.givedirectly.org/). And so I'm thinking every time I make an improvement, I can raise the price, and then that difference goes to charity.

> **\~sarlev:** I'm kind of curious to hear a little bit more about that. I've followed your work over the years and it seems like charity, and GiveDirectly specifically, is always a big part of your work. How did you get into that?

**~nordus-mocwyl:** Right. I guess it's good to talk about since it's kind of out of nowhere. You know what it is? I was trying to think through what musicians need, and I ended up landing on something like universal basic income. And that musicians are sort of this interesting kind of "canary in the coal mine."

You just can't pay a musician to go do what they're going to want to do. And so I think the world wants—or should want—musicians to just go and make music, but it has this kind of disconnect from economics.

I always thought of musicians as the counterargument for people thinking a UBI means that everybody would just be on the dole and literally sit around and do nothing. Because for us musicians, making music is compulsory—you don't have a choice in the matter.

And so I was kind of in that mindspace when Patreon came onto the scene.
I saw Patreon as democratized UBI. It's like "let's just do it ourselves," "Okay, you do your thing and I'll give you $9 a month." Basically, this idea that people will have their budget for music and art, and will divvy it up among the people they like. And this gets you something like Kevin Kelly's [Thousand True Fans](https://kk.org/thetechnium/1000-true-fans/). I saw that, and I had that vision for all my musician friends.

And when I thought about it, well, I think you should also be doing good too, right? The end result is not just a musician that never has to think about money again. I think people are going to feel better about giving money freely to musicians if, at the same time, we're also taking the same concept of UBI and then uplifting the poorest in the world. And so yeah, I had an inkling that there should be a coupling with charity. And that charity could really use a "market force person" to do some advertising and kind of champion them by doing the overhead stuff that charities aren't allowed to pay for, like marketing.

So I chose GiveDirectly because I kept asking myself, "What kind of charity do I actually believe in?" and GiveDirectly was what I came back to over and over.

> **\~sarlev:** The last question I like to ask in these conversations is, "If you weren't working on Urbit, what would you be doing instead?"

**~nordus-mocwyl:** The first thing that popped into my mind is "Oh gosh, if I hadn't heard the word Urbit, I would be doing construction."

But I think a more realistic answer is that [Beyond Beginner Guitar](https://howmbase.com/give) is a guitar course that I've wanted to make for a long time. So I probably would have built it and put it on Skillshare or something like that. I would maybe have figured it out, but I think if I didn't find Urbit, my general outlook on computing, computers and the internet would just be totally blackpilled.

I would just be bummed out about the direction of technology. I probably still would have been excited about DeFi, but now I'm kind of bummed out about it. I probably would have gotten excited about AI, but now I'm just kind of bummed out about that, too. Urbit is the thing that I got excited about, and it's still bright. It's still a resounding "Yes, we need that!" And I'm not bummed out about it.
