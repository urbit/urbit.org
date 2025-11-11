+++
title = "Pin the Face that Launches a Thousand Ships"
date = "2023-04-07"
description = "A guest post by ~nospex-larsut"
[extra]
image = "https://storage.googleapis.com/media.urbit.org/blog/6a0120a85dcdae970b016766c94c14970b-800wi.jpg"
author = ""
ship = "~nospex-larsut"
+++
_The original article can be found [here](https://nospex-larsut.arvo.network/blog/whyhoon) using [%blog](https://urbit.org/applications/~hanrut-sillet-dachus-tiprel/blog)._

![](https://storage.googleapis.com/media.urbit.org/blog/6a0120a85dcdae970b016766c94c14970b-800wi.jpg)

## Pin the Face that Launches a Thousand Ships[^1] ##
_A short piece addressing some of the standard hesitations to learning Hoon, considered in light of all of the recent exciting network activity._

### Setting The Table ### 
One can draw many distinctions between the Urbit apps that were available this time last year and those released thus far in 2023, but the most important of these may be that the former were apps noticed and used almost exclusively by users already on Urbit, where the latter - notably Pongo, Realm, Tirell Studio, Groups 2, Portal, etc - are apps that are _creating Urbit users_.   

Prior to the start of 2023, the superficial, yet incomplete, take was something to the effect that much of Urbit’s appeal was largely an affinity with the ideas and principles surrounding the project.  

People who found their way to Urbit latched on to philosophical entry points, among them values such as calm computing, decentralized/privacy/data-ownership maximalism, or aspirations of replacing a generations-deep legacy computing system that entrenched an ethos of doing things fundamentally inefficiently & incorrectly, in ways that not only hobbled the potential of the internet, but resulted in outright harm to its users through establishing platform models and incentives that consciously sought to manipulate the behavior of those users in countless subtle and not-so-subtle ways.  

Urbit was a nexus, collecting people from disparate backgrounds & disciplines to something like a spiritual oasis, yes, though one seemingly situated a million miles from anywhere familiar to the outside world; its appeal was more a function of the shared ethos of the community and a shared sense of its potential rather than the existence of new & immediately useful alternatives for day-to-day compute tasks.  

The energy of Assembly '22 was palpaple; it almost seemed that widespread adoption was around the corner.  Inevitably, some of the post-Assembly ‘22 buzz seemed to fizzle as the ensuing months went by; many ships launched during that time went dormant, wondering if the potential hinted at would materialize; the shallow criticisn/meme for getting on to Urbit became, “I’m here… um, now what.”

This whole time though, the project was simultaneously also an incredibly busy construction site.

Remarkably short-lived, “I’m here… um, now what?’ is unraveling with the realization that this universe has always been accelerating, and this new wave of apps establishes a very visible & powerful reference point for truly appreciating that acceleration and the distance traveled; after what seemed like a brief post-Assembly fizzle, the network is again kinetic and crackling with energy, but in reality it was never slowing down.

The latest generation of apps marks an important shift in the trajectory of Urbit adoption. Much of this is possible thanks to the proliferation of hosting options - whether [Native Planet’s](https://nativeplanet.io/) self-hosted solutions or through turnkey models - which collectively have vastly streamlined the Urbit onboarding process such that getting on the network is no longer the equivalent of scaling a forbidding & remote mountain peak, arriving at the threshold of a silent monastery, heaving its heavy door ajar to find it seemingly abandoned only a thin sliver of light to illuminate your path, nobody there to acknowledge your arrival much less offer a tour.  The thrill of having finally gotten there dampened by the increasing sense that all of its life is subterranean and the real journey is just beginning.[^2]  

Single-click onboarding and preloaded apps & groups may not seem like a lot for newcomers, but these things have increased tremendously the ability to get on Urbit compared to just six months ago.

And just as a selection of competing hosting providers expanded the number of possible onramps, this new crop of Urbit apps likewise provides a complimentary function as entry points - hidden doors to Urbit embedded in the Apple/Android app stores - in ways that Urbit apps never enjoyed previously, all helping to further reduce the friction of onboarding by orders of magnitude.  A user searching for a Telegram alternative stumbles across Pongo; new eyes find Urbit without ever intentionally seeking it out.  

The animating ideas behind the project, I think, remain as alive as ever - Urbit does not need to jockey to become the ‘current thing’ if it can much more efficiently become the undercurrent thing; without having to waste a single breath converting users at the margin on the necessity or virtue of recreating the web in a decentralized & privacy-oriented manner, new users are able to become advocates for apps that provide practical utility for day-to-day compute, creative, and communication needs - but that also happen to be built on such infrastructure.   The yew tree doesn’t propagate itself by trying to convince the bird that it is desirable that there be more yew trees in the world, it just wraps its seed in a tasty & nutritious berry and lets the bird carry it off.

Compelling apps, built on continually-improving and innovative infrastructure & development tooling is one piece of the adoption curve.  These things bring users, who bring perspectives, feedback, ideas, wants, and needs. It brings their attention to earn it. If they are spending time on Urbit apps, they will also be exposed to whatever else is being shared on Urbit through those apps – what will catch their attention that maybe they are not seeing elsewhere? Suffice to say this is all basically network effects 101, so on to the question of learning Hoon.

### Some Grains of Salt ###
Perhaps that was a lot of table-setting to get to the original inspiration of this piece, in which I wish to present some arguments to the standard objections or concerns that seem to arise for people thinking of learning Hoon.  My aim is not to twist any arms or legs, but only to offer some considerations for those on the fence.  Hopefully the preceding bit of history at least reveals some shred of the potential opportunities for Hooners (and other creatives - we absolutely need those as well).

But first the grain of salt with which you should take the following:  
I currently Hoon at something approximating a tenth-grade level. I am by no means a natural born developer, nor am I moving towards a dynamic career switch to full-time Urbit dev.  Not by any stretch of the imagination.  While I am interested in continuing to learn Hoon for a variety of reasons, none are likely to reverberate very far beyond my own ship.  

My Hoon education began in the summer/fall ’22 cohort of Hoon School Live.  In my early 40’s, I walked into it slightly intimidated by its reputation, and with a personal technical background not much deeper than writing Excel formulas, a little Python, and building simple websites (like, 20 years ago).  At the moment, I am much better at reading it than writing it, but thanks to HSL & ASL (and everyone involved with those efforts), it does make sense to me.  

So despite not exactly practicing what all I am about to preach, the foregoing, combined with having talked to enough people on the fence about learning Hoon, I feel somewhat qualified to at least offer some perspective for those considering the question.  

### The Standard Hesitations ###
The following hesitancies seem to be the recurring ones, and we’ll take them one at a time, although they share a significant degree of overlap.
<ol>
<li> But I already know languages x, y, z, etc and can build things with them now.</li>
<li> I hear Hoon is very difficult / weird / etc.</li>
<li> Urbit’s future is uncertain; investing in learning Hoon seems risky.</li>
<li> I don’t see many immediate jobs for Hoon devs.</li>
</ol>

__Hesitancy 1: But I _already know_ languages x, y, z, etc and can build things with them _now_.__

A valid contention in that one has invested in skills they are eager to put to use or continue to use.  But can you build what you want to build - and where you want to build it?  And what is the cost in terms of personal satisfaction to working on something which doesn’t truly excite you?  

There is something of the sunk-cost fallacy is at work here.  It is not always a bad impulse, and opportunity costs are very real.  But if there is something compelling about Urbit - and the fact that one is at least seriously considering learning Hoon suggests this is the case -  and one is willing to view their existing proficiency in some other language as a demonstration of their capability to learn any programming language, then existing knowledge should not act as a barrier to pursuing new knowledge, particularly if there is a suspicion that working on Urbit may afford more intellectually stimulating and enjoyable opportunities.

Consider also that a person working on things that truly animate them, despite maybe being relatively less experienced in the language, nonetheless has much more room to grow in a smaller pool where they may create closer connections, have more access to the perspectives of experienced devs, and get noticed for their contributions faster than those that may exist for a person working on things they are decidedly less passionate about amidst a pool of thousands. 

Yet another upside of working in Urbit is the sheer amount of projects yet to be built (not all require Hoon, btw); projects that may be intriguing to a developer but which already exist in some other language/product have yet to be built on here, and there is a need for them.  The amount of still low-hanging fruit and infrastructure work remaining to be done, let alone potential app and utilities, is substantial, and this is a community that generally speaking, respects anybody who can come in and start contributing with minimal direction or permission.

And is time spent learning Hoon really time spent not building things?  Are you not building skills, reputation, friendships, problem-solving skills, camaraderie - building a better self - throughout the learning process?  One can easily present the argument that the cost in this regard is much less than it may seem at first glance.

Since one can only try to subjectively weigh the opportunities open to them with their current skills against the nebulous costs of _not_ pursuing something that has piqued their interest, the dilemma often cannot but remain unanswered until one takes the steps to find out; until then, it remains a persistent, nagging 'what if'?.  It may take several months to feel really comfortable writing Hoon, but there is a relatively low cost to spending a few weeks to dive in and see if one has an aptitude or affinity for it.

__Hesitancy 2:  Hoon is difficult and/or weird.__

Recognizing that there are a lot of runes, and that Hoon is odd compared to other languages, 

- learning just a handful[^3] of them along with the basic families (create cores with | runes, call functions with % runes, conditionals statements are built with ? runes, etc)  will get one well on their way. </li> 
- if Hoon is not your first language, you have already demonstrated a capacity for becoming comfortable working within a framework of structure and syntax that was, relative to your previous inexperience, alien and weird. And while there are additional wrinkles in dealing with a functional language, the majority of CS concepts remain relevant and are transferable.

And if Hoon is your first language, it is all uncharted territory anyway and not having anything to compare it to means one is essentially in the same situation as in learning any new language, and in that respect it mirrors almost any endeavor to grasp new modes of problem-solving under a unique set of conditions and constraints. Even if you do not stick with Hoon, the new perspectives in problem-solving experience are valuable, and most of the fundamental concepts will be transferable to other languages.

You might also consider how to use Hoon’s reputation for difficulty to your advantage from the standpoint that, if you are firmly convinced that it is or will be unduly difficult, then that should yield a much deeper satisfaction after proving you are in fact capable of learning it.  

And from a more opportunistic standpoint, realize that others who allow this reputation to dissuade them create outsized opportunities for those who are willing to learn it.  One can very usefully calibrate expectations here to use the reputation to provide some cover - if it really is that hard, iit is ok to not get it at first, and you can succeed where others gave up or failed to even try.

Speaking from my own experience, the sheer amount of terminology was somewhat overwhelming at first, and this was true of both HSL & ASL (more so the latter, IMO).  Many of the names seem arbitrary, but like anything, making it familiar is largely a function of effort.  

Recognize that Hoon's unique syntax and functional paradigm are integral to its design and purpose. Instead of trying to force parallels between Hoon and other languages or concepts you already know, just immerse yourself in it with an open mind and willingness to grasp its distinct features and the reasoning behind them.
 
<div class="polaroid">
  <img src="https://storage.googleapis.com/media.urbit.org/docs/userspace/hoon-school/binary-tree-bottom-row-full.png" alt="Tree">
  <div class="container">

  <p>See - it's easy!</p>
  </div>
</div>

__Hesitancy 3:  Urbit’s future is uncertain; investing in learning Hoon seems risky.__

Much of the table-setting for this piece was an attempt to frame the potential opportunity for devs of any level.  Keeping things in perspective, Urbit is just about to hit [3,000 active ships](https://twitter.com/urbitfoundation/status/1637931937351491584).  There are several reasons why recent activity may be much more indicative of even greater future growth than one might assume from looking at the chart: 
<ul>
<li>a. Maybe very obviously, the growth of the last three months is not simply a 1:1 reflection of the work of the last three months, but of the many preceding years of core development that made a significant increase in percentage terms within a very short interval possible. The stage is set for much faster growth.</li>
<li>b. Previously mentioned, but all these threads are interconnected in that, the more eyes on Urbit, the more ideas, talent and additional users will be introduced to, and recognize the depth, of the opportunity here.  A steadily stabilizing building environment (thanks to a)) that attracts and can support more users should continue to build momentum. </li>
</ul>

Remaining sober about reality, 3,000 users is not exactly a ton in web 2 terms; for Urbit, it is simultaneously very many and very little.  But with better apps providing more reasons to be on Urbit, working in unison with better UX and onboarding, those users have more reason to stay engaged with Urbit once they are on, which means anything an aspiring Hooner or creator can think of to give them compelling reasons to make them even more engaged is an opportunity.  

Deliberately twisting the fomo screws a little, it is as true for learning Hoon as it is of anything else that the more widely adopted a platform or language becomes, the safer a bet it will be in terms of stability and longevity.  With the accretion of that stability however, the window for realizing the benefits of gaining early experience and exposure in a less-crowded space diminishes accordingly as the sense of perceived riskiness in staking ground there decreases.   Like any investment, uncertaintly about the future carries the gift of a difficult to quantity but very real species of camaraderie, credibility, and respect that is only available to those willing to get involved at early stages, and which is  lost as the project starts to look increasingly like a 'sure thing.' Hard to value, but weigh that aspect when considering if one should begin learning now or wait until things look ‘slightly more certain’ - what is the bar for this certainty?  What is ‘certain enough’? 

Urbit, by (beautiful) design, is a very low-time preference project in some respects, but it is growing quickly.  And the longer you’ve been watching Urbit grow, the more perspective you have of how much can happen in a very short time.  

When there are 10,000, 100,000 active ships it will be a trip in itself to remember that you started learning Hoon back when there were "only" 3,000, and contributed in maybe some non-trivial way to attract some quantity of new ones by building something you were excited about building.

__Hesitancy 4:  I don’t see many immediate jobs for Hoon devs.__

_Not yet you don’t_.  Much of the response to Objection 3 is also relevant here.  

The pool of Urbit companies is not fixed.  It is not an insurmountable obstacle to start up a small-scale dev shop with a handful of talented devs.  
Money flowing into Urbit is being reported with increasing frequency, and this is only the incoming money that you _hear about_.  As Urbit grows, money will chase money, bringing more jobs and more opportunities.  For better, or worse, of course, money changes things - more money will necessarily mean more discipline, more focus on shipping product, etc.  But not having money changes things too.  Money comes here in no small part because it sees the energy and intensity with which this community has been building out Urbit - regardless of whether money was flowing in or out of it - it attracted devs because the project itself was an ambitious worthwhile good in itself.  

There is much opportunity here for bright, motivated developers willing to make the effort to learn.  One only has to bump the total current dev headcounts up against the growing momentum of the project to see the opportunity, whether it be in core projects, apps, or novel pairings with creators to determine ways to distribute and produce content on Urbit.  The speed of deployment on Urbit compared to other projects and relative exposure to other platforms affords a significant advantage to motivated, talented people in terms of visibility - when an app gets published on Urbit, everyone sees it.  

### Wrapping Up ###
Hopefully the above provides some perspetive on reframing some of the standard hesitancies.  None of them are irrational.  However, if none of the above sways you, ask what projects or features might materialize on Urbit that would make you wish you started learning Hoon a year ago (which, in the grand scheme, would make you a reasonably well-experienced Hooner) and then consider that you could wait for that thing to materialize, or play an active part in making it a reality that will attract many other users to the network, along with making others feel like they should have started learning Hoon a year ago.

And if the Hoon question is indeed a recurrent & nagging one, attempt to replace it with the question, “two months from now (approximately the duration of an HSL cohort), would I rather have tried learning Hoon and discovered that I don’t like it and be done with the question, or still be sitting here wondering if I should learn Hoon?”      

The resources for learning Hoon are growing:<br>
● [Hoon School Live](https://developers.urbit.org/courses/hsl)<br>
● [App School Live](https://developers.urbit.org/courses/asl) <br>
● [App Workshop Live](https://developers.urbit.org/courses/awl) <br>
● An upcoming [Core Dev course](https://developers.urbit.org/courses/csl)<br>
● The growing corpus of [documentation](https://developers.urbit.org/reference/hoon/overview)<br>
● And of course the most valuable resource of all is all the people on the network who are willing to answer questions and help one learn. Find them in the Hacker House.
<p>

If something about Urbit is drawing you toward it, if the project resonates with you in a way that other things in tech do not - if you are truly intrigued by it and want to be here - it is reasonable to assert that the process of learning Hoon is not simply a tax with questionable upside, but a productive process in and of itself; that the very process of learning it will embed you deeper into a space you want to be in.

So learn Hoon.  Not only is it fun, but as an Urbiter, it is something of a cultural heritage, and the conduit between reality and whatever your endless imagination conceives Urbit’s potential to be - space here is wide open, and any of today’s aspiring Hooners has the potential to pin the face that launches a thousand ships.

----------------
[^1]: To 'pin a face' is to declare a variable in Hoon.
[^2]: Maybe some slight dramatization; this aspect also made it fun for those not in need of immediate gratification.
[^3]: [See 'Rune Utilization in Hoon'](https://developers.urbit.org/blog/rune-frequency-202212)
