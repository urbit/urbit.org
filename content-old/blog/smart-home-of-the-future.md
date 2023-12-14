+++
title = "The Smart Home of the Future"
date = "2022-08-04"
description = "Homes are getting smarter. A smart home is no longer just a collection of smart devices but a superorganism of data-collecting objects. These people and devices who use and inhabit these homes form a complex socio-technical system. What is the future of the smart home and how will Urbit fit into it?"
[extra]
author = ""
ship = "~pilwyc-fastec"
image = "https://storage.googleapis.com/media.urbit.org/blog/484f30d6e2d5aa86840a662a8b57bdd5.jpg"
+++

![The Smart Home of the Future](https://storage.googleapis.com/media.urbit.org/blog/484f30d6e2d5aa86840a662a8b57bdd5.jpg)

During the last couple months I’ve worked on learning what makes smart homes tick for Urbit users through a [grant by the Urbit Foundation](https://urbit.org/grants/communal-computing). What I’ve found (and [published in the final whitepaper](https://pilwyc-fastec-public.s3.us-west-2.amazonaws.com/Communal-Computing-for-Urbit-whitepaper.pdf)) is that people have a complicated relationship with the technologies in their homes while the number of devices are continuously increasing. 

It is further complexified by the fact that for every additional person in the household there is an expanding total number of interactions because of connections individuals form as groups. For example, I may generate one type of data sitting in a room by myself listening to music and a very different set of data sitting with my whole household watching a video together (while also browsing our own personal devices). 

The relationships you have with everyone that lives and visits your home (even the people that are not supposed to be there) are how we start to define our identity inside those spaces. 

During the study, I also learned about some important distinctions of Urbit's identity and (current lack of) digital reputation compared to other computing platforms. 

[Lunar Urbit and the Internet of Things](https://urbit.org/blog/iot) brings up key questions about the perfect paradigm for computing in the Urbit smart home. In that post [~datnut-pollen](https://urbit.org/ids/~datnut-pollen) articulates a problem with smart home devices:


> The Internet of Things is much maligned by technologists as a privacy, security, and maintenance nightmare. These products usually depend on phoning home to perform their service, which is inevitably a funnel by which personal data is harvested, an attack surface for hackers to gain access to your home network, and a single point of failure which may render the device useless, all in one!

There are a range of needs and preferences regarding a person’s identity, the data they create in the home, and how data would be used. About half of the people thought of themselves as a singular online identity and had fewer concerns with sharing their data with 3rd parties. The other half of people that saw themselves segmented into different identities (e.g. home vs. work vs. online) were concerned with all of the data being sent to 3rd parties from their smart home.

This is likely because people’s identities are split based on the relationships they have in their lives. This is related to how they consider what is a violation of privacy based on how their information is used. A framework in the practice of privacy is [Contextual Integrity](https://en.wikipedia.org/wiki/Contextual_integrity) first proposed by Helen Nissenbaum in [Privacy In Context: Technology, Policy, and the Integrity of Social Life](https://www.amazon.com/Privacy-Context-Technology-Policy-Integrity/dp/0804752370). It outlines a model that is based on norms and expectations by people of how they control the flow of their data rather than a false dichotomy of private vs. public. Mismatches between where a person expects their data to go and where it actually goes causes privacy violations. For more ways this is linked to the Urbit privacy models see the [white paper](https://pilwyc-fastec-public.s3.us-west-2.amazonaws.com/Communal-Computing-for-Urbit-whitepaper.pdf). 

Through these interviews I also found that Urbit’s identity doesn’t, by default, include strong reputational considerations for people. It started in  an early conversation I had with [~wolref-podlex](https://urbit.org/ids/~wolref-podlex) about how communal computing would make sense in the Urbit world of strong identity and was confirmed through the discussions we had. The only information that shows up in Urbit communities today are your ID and sigil. Your reputation is then built in every human’s head based on the interactions they have with you through the community. This is a departure from what many technology platforms do today by encoding reputation in stars, likes, and other reputational markers.

Lack of reputation legibility is valuable because “snapping to” a set of reputations doesn’t account for all of the different identities that form through the relationships you have. This is especially true for households where there are multiple people or multiple generations. It isn’t so much that they need to be illegible but that having anything other than a human decide what is appropriate will lead to incorrect assessments. 

In a recent post [Soulbinding Like a State](https://subconscious.substack.com/p/soulbinding-like-a-state), Gordon Brander makes some important points on how the requirement to be legible with identity systems is hazardous for people, especially at the scale of the internet. Client-server models that have proliferated with smart home technologies require that identities need to be legible to the 3rd party services. This is because we are mistaking the need for access with evaluations of those people. Confusing those creates circumstances that will overconstrain the possibilities of a people with the needs of the system.

An Urbit smart home could deliver a more realistic identity model, communal experiences, and match the expectations of privacy by letting people relate as humans rather than identities or accounts. It doesn’t stop with only people physically in the household. Households can be joined across space and time. Think about those households intermediated by technology like a shared photo stream that shows up in two different household’s picture frames.

For Urbit to be a better part of the home it needs to continue to focus on access through its peer-to-peer network rather than creating complex schemes for the person’s reputation. The reputation within a household is through the interpretations of those that are there in the household. There are many different relational identities like being a parent, a spouse, part of a parent-teacher association, table-top gaming group, and a backyard BBQ crew which is all part of your identity. The norms of how people deal with each other in the home will evolve over time including what should be shared within that context. Who is allowed in a room or not is something set by the expectations of norms that are negotiated between people. This includes photos that should be shown (or not) on the shared picture frame. 

[Stewart Brand](https://en.wikipedia.org/wiki/Stewart_Brand)’s book [How Buildings Learn](https://en.wikipedia.org/wiki/How_Buildings_Learn) points to how building are in a constant state of flux: 

> A building is not something you finish. A building is something you start.

We should assume that when we add technologies to the household with connected devices this isn’t any different. How we build these devices to respect the privacy, identity, and relationships of people will be key.

The next step is to take this work forward and show how the Urbit platform could be used for smart home control. Due to the way the most smart home devices are built today we won’t be able to completely stop the sharing of data in the home with 3rd parties but we can somewhat obfuscate a person’s identity behind their Urbit identity that the device maker won’t understand. In my next [grant proposal](https://pilwyc-fastec-public.s3.us-west-2.amazonaws.com/Communal-Computing-for-Urbit-whitepaper.pdf#page=11&zoom=100,96,96) we will be looking to build a prototype of Gall app to control the most commonly used smart home device: the smart light bulb. 

The future of Urbit in the smart home will depend on its ability to integrate with many different device manufacturers. As these devices are installed, upgraded, and generally maintained they need to persist the identities of people in the home and configuration over time whereas most today require a relogin. The people in the home should maintain control over the systems automatically and perpetually rather than having to keep reasserting it through password resets. When they decide to leave the home they should be able to easily transfer that ownership to the next occupant like they would a set of keys.

Another quote by Stewart Brand on buildings:

> All buildings are predictions. All predictions are wrong.

Our guesses as to what the people in a smart home of the future needs will be incorrect. What we can do is start to build around the doctrine of Urbit focused on personal data ownership, simplified identity, and leaving reputation to humans.

The future of computing in the home will be one that is ubiquitous, contextual, and communal. Urbit needs to embrace the strong identity it already has without forcing legible reputational systems that are meant to be all-encompassing. The ownership over data and what happens to an Urbit ship will be a huge benefit when considering the growing distrust in 3rd party, client-server architectures. Urbit has a real opportunity to provide the home of the future with a platform for computing that let’s people be themselves and feel their home’s data, like their home, is really theirs.

–

*[~pilwyc-fastec](https://urbit.org/ids/~pilwyc-fastec) is a smart home pragmatist and Urbit enthusiast. While he enjoys the chaos of children using smart home devices he wishes it didn’t wreck his music recommendations so much. He can be found in the [Communal Computing for Urbit community](https://pilwyc-fastec.tlon.network/apps/landscape/~landscape/ship/~pilwyc-fastec/communal-computing-for-urbit/resource/chat/ship/~pilwyc-fastec/discussion-7484) if you want to get in touch.*
