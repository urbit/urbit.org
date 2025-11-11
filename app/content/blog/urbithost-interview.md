+++
title = "An Interview with UrbitHost"
date = "2021-08-19"
description = "Interview with the founder of UrbitHost ~lavlyn-litmeg"
[extra]
author = "Matt"
ship = "~tirwyd-sarmes"
image = "https://media.urbit.org/site/posts/essays/nasa-star-cluster.jpg"
+++

![](https://media.urbit.org/site/posts/essays/nasa-star-cluster.jpg)

**An Interview with UrbitHost**

Urbit has been making great strides to become accessible to those who are non-technical. Port enables a user to launch their Urbit ID from their personal computer without any knowledge of the command line. However, you only have access while you are running Port, which means you can&#39;t do things like check your DMs while on the move.

Hosting your Urbit means that your Urbit is always on and available. All that is required to access the network is visiting a URL and logging in.That means you can access Urbit from your phone, laptop, or any device with a browser.

The downside is that running your own server can be a complex and difficult process. Third-party hosting allows an expert to do that work for you. The hosting provider gets paid, and you get 24/7 access to your ship.

[UrbitHost](https://urbithost.com) is one of the latest [hosting providers](https://subject.network/planet-sales/) to enter the market. As of now, it is one of the fastest and easiest ways onto the network. You pay the fee, and you get sent a link that you use to access Landscape. It&#39;s that easy.

At least, it&#39;s that easy for the end user. For the guy running the operations, ~lavlyn-litmeg, it can be quite a complex operation. I sat down with him to find out about what it&#39;s like being a commercial developer on Urbit. We also talked about technology, the developer ecosystem, and the future of Urbit.

If you want to get in touch you can reach him at ~lavlyn-litmeg, the ~sardys/uh group, or [urbithost.com](https://urbithost.com).

---

**Tell us a bit about yourself and your history with Urbit?**

I&#39;m a software engineer who is currently working at one of the larger crypto currency companies. My history with Urbit goes back quite a long time. I saw one of those early demos by Curtis where he had two dojos running, sending messages back and forth, and I thought it looked interesting. Since then, I often checked in on the project, but I stayed at the sidelines because it felt not quite ready; there were constant breaches and so on. What kept me close by was that I believed in the vision of Urbit.

I think the open internet only has a future if people retain control of their digital identities, which means that, in addition to a cryptographic identity, they need to be able to keep control over their data. This not only includes their social graph, but they also must be able to run computations on that data. Urbit checks all those boxes. The people behind Urbit and all the other contributors have been steadily marching towards these goals with incredible stamina. I&#39;m inspired by that. And, since the release of OS1, Urbit is very much usable, and I find myself spending more and more time on it instead of other corners of the internet.

**Why did you decide to work on hosting rather than another Urbit project? If you weren&#39;t working on UrbitHost what would you be working on within the Urbit ecosystem?**

I want my non-tech friends to be able to join Urbit. Most people I know can&#39;t be bothered with executing a blockchain transaction, many feel uncomfortable installing an app they don&#39;t understand, and almost all would shy away from the command line. For the vast majority of people, getting onto Urbit must be as easy as signing up for Gmail or Twitter, otherwise they won&#39;t come.

I thought about how I could contribute to Urbit and decided that now is a good time to build a hosting provider. It&#39;s still early, but a non-technical person can actually spend time on the network and be productive. I think we are just now seeing a shift where we need community builders as much as we need engineers working on the internals of Urbit. It is important that those community builders have no barrier to entry for themselves or their communities.

That is why ease of access has been my goal from the beginning. I wanted the site to be fully automated, meaning someone could sign up and be on Urbit within minutes. It was also important to me that users be able to choose their own Urbit ID. As far as I know, there was no offering like that yet, so I decided to build it—but I know that others are working on this too.

If I was working on something else, it would be Urbit apps. We&#39;re waiting for the new release for it to be easier to distribute and access apps; there are a few tools I would really like to see. But other than that, I would like to spend more time community building.

**Can you tell us about how you&#39;re implementing UrbitHost? You beat Tlon to the punch of having immediate hosted access to the Urbit network -- what&#39;re you doing differently? How will your implementation change when programmatic access becomes available via Khan (the new vane to replace Herb)?**

UrbitHost runs on Kubernetes, which is a tool to orchestrate containers. What that means, concretely, is that each ship runs inside a Docker container, and Kubernetes makes sure that each container is running and has enough resources. For example, if a server goes down, Kubernetes will automatically move the ships that were on that server to a new server that is available. No data is lost and there should be very little down-time.

People think Kubernetes should only be used for services that can be scaled horizontally, meaning there are multiple instances running of the same services. Scaling like this is obviously not an option for Urbit, because a ship must only run as a single instance. But in the last few years, Kubernetes has added many features to run single and stable instances of a container, for example a database. UrbitHost is making use of these features—permanent volumes, stateful sets, and so on—to provide a high-availability hosting for Urbit. It also scales well. I surmise, we could host thousands of ships, we would only have to add compute nodes.

As for beating Tlon, I&#39;m not sure if it is a fair comparison. UrbitHost, as it is currently, is a minimal viable product. I tried to realize a simple goal: automated hosting. Tlon is hosting many more planets, not to speak of all the stars and galaxies that make up the network. As far as I can tell, Tlon and UrbitHost are doing things quite similarly. For example, I knew that Tlon is also hosting on Kubernetes, which gave me much more confidence that we could do it too.

UrbitHost&#39;s programmatic interaction with hosted ships is quite minimal once it is booted. We use airlock to retrieve the access code and do a few more maintenance things, and we are using it for some upcoming features like automatic S3 configuration. But from what I can tell, Khan looks like a really important step forward, because interacting with the hosted ships via airlock is one of the most brittle areas, and I&#39;m looking forward to making it more robust once Khan is out.

**What is most needed within the Urbit ecosystem — any particular apps or services? Which projects are you most excited about?**

The ability to publish content directly from a planet to the regular internet would be cool. I would really love to see some bigger blogs being hosted on Urbit. The basic idea would be this: everyone can read the blog, but to join the conversation one would have to join Urbit and the group associated with that blog. Of course, a planet could publish other content too, possibly a mix of free and premium content. Either way, it would pull a lot of people into the gravity well of Urbit.

Publishing could also be a good value proposition for Urbit hosting providers. If public content is hosted on a ship, then all the profit from new customers who are brought to the provider could somehow be split between the host and content producer. What is nice, though, is that a content producer can take his Urbit-native community anywhere, anytime, without disrupting the community much. The portability of Urbit at every level would really shine here as communities grow.

There are incredible projects happening on every front. The Bitcoin integration is very exciting, it is being realized in a truly Urbit-native way and could prove to be a great catalyst for the ecosystem. However, as a hosting provider, the constant lower-level improvements are exciting too.

**What will be the effect of two upcoming changes to Urbit:**

1. **Built in software distribution and management**
2. **Layer 2 and the new &quot;Khan&quot; vane**

**For #1, how would you pitch developers on the benefits of building on Urbit?**

**With regard to #2, I think there is about to be an explosion of hosting providers. Will this unleash an Eternal September effect or does Urbit&#39;s &quot;walled garden&quot; style of communication make it more resilient? Urbit is not a single silo like Facebook, after all.**

I think that once software distribution is as simple and easy as the iOS app store it will be a watershed moment for Urbit. Put bluntly, it will give users something to do on Urbit besides chat. There are several interesting apps out there already, but they are not easy to discover and install.

Developers want reach. The most important pitch to developers will be that on Urbit they have access to a substantial audience. I remember developing for the iPhone in the early days. Objective-C was really a tough pill to swallow, but because the platform was interesting and promised to reach a large audience, I kept going with it. I think Urbit is an interesting platform for the various reasons already mentioned. But learning to develop for Urbit is really a time investment—I myself am still a novice Hoon developer —and for it to be worth it, there has to be a clear pay-off. For some, this is making system-level contributions, but for most it will be having that app show up in some centrally visible place and seeing people engage with it. Once this exists, it will be much easier to pitch Urbit to developers.

The layer 2 solution which will make spawning planets much cheaper is an important next step, especially for hosting providers. Layer 2 will help us immensely because spawning and keying planets is very expensive right now, and it puts a damper on how much we are actively pursuing growth.

If new hosting providers come online, it will not necessarily mean a huge influx of users. In my experience, building a provider is hard and takes time to mature. However, I would love to see fast user growth.

I honestly don&#39;t think having our own Urbit Eternal September would be that bad. I would just see it as growing pains. If we enter a time of sustained growth and rapid user onboarding, the fact that some Urbit groups will get overwhelmed with all the new people will be a small price to pay. The current setup, with a few central groups that act like hubs and discovery points—for example, the fantastic Urbit Index—would have to change. People would need to be funneled into their own Urbit universes that might not overlap much with other areas on Urbit. The nice thing is that all this is accounted for in the Urbit infrastructure.

If a certain hosting provider ends up bringing thousands upon thousands of users to Urbit, like AOL did back then with Usenet, then it will be the provider&#39;s responsibility to onboard those users sensibly and not just dump them on the existing groups. In other words, providers, in my opinion, also have a community building responsibility. Of course, this does not mean that providers should be overbearing parents, allowing only this or that, but simply that they should have sensible defaults that don&#39;t overwhelm or destroy the network.

**What is the role of commercial providers in the open-source ecosystem?**

Commercial providers will be incredibly important to make Urbit succeed. I think if Urbit attracts a large number of users, many, if not most, will run their ship via a hosting provider. It is the easiest way to get started.

However, using a hosting provider to get onto Urbit might at first seem antithetical to the spirit of the project. If someone is trying to get away from mega-corporations, why would they go right back to another company and give them their data?

Well, because it&#39;s a completely different relationship. The relationship between us, the provider, and you, the customer, is transparently straight forward. You are not the product. We have a more traditional provider-customer relationship where we just do the dev ops work. It is in our interest to keep your data private and keep your ship running. We give you an Urbit ID, which you can keep forever, and host your ship as long as you wish. When you want to leave, you can download your pier and Urbit ID and use it with a different provider or on your own computer in minutes. On the other hand, you cannot leave Facebook and run your profile off of your laptop. Basically, we cannot count on customer lock-in, we must provide good and honest service. Again, the portability promise of Urbit is essential here and ensures that we are on an equal footing.

**Once the Urbit payment ecosystem gets built out more, would you consider accepting payments over the Urbit network?**

Of course. Having an Urbit-native economy would be a key marker of success, and I would love to participate in it. Moreover, we are planning to offer a Bitcoin node to our customers soon.

**Are you coming to Assembly 2021?**

Yes. At least, I&#39;m planning to! I would love to meet all the people behind Urbit in real life.

**I know you are a Christopher Alexander fan, how has he influenced your work?**

I&#39;ve been interested in Christopher Alexander for quite a long time. When I realized that many of the people building Urbit are also inspired by him, I understood why much of the Urbit vibe resonated with me. Critics of Urbit either focus on the technical details or on Curtis Yarvin&#39;s writings, sometimes conflating the two. That&#39;s fine and perhaps a valid point to start, but what they don&#39;t understand is that so many other ideas and ideals have since become driving forces behind the project. This is at least what I observe as an outsider.

Alexander&#39;s ideas are all about how to build beautiful houses. He wants us to inhabit places that feel life-giving, places that make us more fully human. The same should be asked of the technology we use. So much of the current internet is the equivalent of a fluorescent-lit cubicle, a brutalist government building, or a flashy central square. It might be interesting to travel through these places, but they do not make good homes.

To explore what makes a building beautiful, Alexander had to wade into metaphysics, because he wanted to give a much more objective account of how beauty is present in physical artifacts, which led him to treat beauty as a universal. I think to build more meaningful technology we need to do the same. We do not have a good metaphysics of technology, and this is something I&#39;m really interested in.

**Give me a brief summary about your personal philosophy of technology. Do all tools fall under the umbrella of &quot;technology&quot;? Or do some tools hit an inflection point where they acquire radically different characteristics (compare a shovel and a computer)? It seems to me that the philosophy of technology often boils down to trying to define what &quot;technology&quot; actually is. What do you make of all this?**

Yeah, I definitely think there is an inflection point once technology becomes digital, but I believe there is something all technology has in common. My approach here is classical. Artifacts have to be distinguished from living things because human made things have their origin outside themselves, meaning they are manufactured (in Aristotelian terms, and stated somewhat simplistically, artifacts have an efficient cause outside themselves, whereas biological things have an innate efficient cause). We are often tempted to think of living organisms simply as elaborate self-replicating machines, but that is putting the cart before the horse. We should rather look to the world of living things to be inspired to build our artifacts.

The question of inspiration becomes even more pressing when discussing modern technology, and you put your finger on it with the inflection point. There is no tradition to fall back on when we are building digital technologies. Someone like Christopher Alexander, who is working on architecture, has thousands of years of architecture to look at. He can read the past and see what worked and what did not. On the other hand, when we build things like Urbit, we must look for inspiration in other places because there is no corpus of, say, thousands of years of constructing digital social networks where we can simply choose the best parts. So far, we have mostly bad examples, how not to do it. And considering how new the internet is, most of it is still a blank slate. So while I&#39;m definitely interested in the ontology of technology, I think it is an even more pressing question to learn the principles of the living world around us in order to build digital places that feel organic and life-giving.

**Thanks for chatting!**

See you on the network!
