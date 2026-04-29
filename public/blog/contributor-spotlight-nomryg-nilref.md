# Contributor Spotlight: ~nomryg-nilref

A conversation with ~nomryg-nilref on beautiful lost causes, forever software, and Obelisk

- Date: 2026-04-14
- Author: ~sarlev-sarsen

![Hero image of ~nomryg-nilreg sigil art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_QA_nomryg-nilref/Blog_QA+nomryg-nilref_Hero.png)

> **\~sarlev:** What was the first thing that drew you into the idea that we needed to throw away and rewrite the entire network computing stack?

**\~nomryg-nilref:** I’ve had this strange urge ever since I got involved in technology--I’m not someone who investigates every bleeding-edge thing that comes along--but when I see one that looks beautiful, that matters to me. Beauty plays a role here. Most of us know it when we see it, even if it’s hard to define.

So the concept of rewriting the entire computing stack from scratch for sovereign computing made immediate sense to me. Pieces of it had already been floating around in my mind, and `~sorreg-namtyv` had brought the whole thing together.

I’ve got a history of getting drawn into beautiful lost causes in tech. My first was the [Amiga](https://grokipedia.com/page/Amiga) computer. When I read about it, I thought, “Of course this is the way.” It was mostly vaporware when I first encountered it, but I got one a year later and kept using it for a long time. Some of the free software around it included the original Vim, though before that I’d already gotten roped into another text editor, Uedit, which was a programmable editor, so I have never actually learned Vim.

Later, in 2010, the next thing that really caught my interest was functional programming—specifically F#. It felt like the future. I didn’t have to keep the call stack in my head in the same way anymore, and that was a huge relief. Once I understood type systems better, I realized that type systems plus functional programming were really something special.

Then I got introduced to `~sorreg-namtyv` the night he was being canceled in real time on social media. I was watching Twitter and Hacker News as it happened, and it was deeply disturbing to me that someone could get canceled from a technical event for political reasons. I didn’t even know what Urbit was until about a year later, when I saw his [LambdaConf talk](https://www.youtube.com/watch?v=bTisf4oxIFo). Then I found out Tlon was in San Francisco, so I started going to their meetups, and just lurked for a long time.

 I finally got on a comet around 2021, and got a ship about a year later.

> **\~sarlev:** Urbit is trying to build computers and software that last. What does a forever computer mean to you?

**\~nomryg-nilref:** It kind of means everything. That was my idea back in the Amiga days. I wanted personalized software. I wanted it to act the way I wanted it to act. I wanted it to be an extension of my thoughts.

I had all sorts of half-baked ideas about how a computer could become an extension of me, but I never fully fleshed them out. `~sorreg-namtyv` went a very long way toward doing that, and the philosophy resonates with basically everyone who’s interested in the Urbit project. We all have some sense of where we want to go. We know where Kelvin 0 is. We want software that doesn’t expire, doesn’t break every time there’s a new update, and doesn’t get abandoned.

Abandoned software is still something the Urbit Foundation needs to work on, but I think we’re getting better there.

> **\~sarlev:** Even if software gets abandoned, the goal is that it doesn’t die. You can’t force people to keep maintaining things, but maybe you can make it so the software still keeps working for the people who rely on it.

**\~nomryg-nilref:** Yeah, and I think there’s some tension around that in the Urbit community. There’s the idea that everything must be entirely sovereign, and that bleeds over into anarcho-capitalism and pure libertarianism, both of which I think are failed programs.

Personally, since almost everybody is developing with very permissive licenses, I’d like to see the Foundation get a little more involved in keeping backups around—especially for projects it funded, but maybe also for others that are critical. Keep secondary mirrors. Keep a copy of the source code just to have it.
mag
Some ultra-libertarian people would say that’s not sovereign computing anymore because now you’ve introduced a central point of failure. I look at it as a central point of backup.

> **\~sarlev:** You’d seen a lot of these pieces already—functional programming, type systems, distributed systems. How did your relationship with computers change once you found Urbit and saw them pulled together?

**\~nomryg-nilref:** Totally. It completely shifted me away from ever being interested in enterprise computing again. Urbit may eventually produce software that can be used in the enterprise, sure, but it’s not enterprise-first. Enterprise use would just be a side effect.

I haven’t lost interest in F#. I still think it’s a beautiful programming language. I just haven’t programmed in it because it’s tied to the .NET stack, and that doesn’t really interest me anymore.

That leads into one of my harebrained ideas: are programming languages even relevant anymore in the age of agent-assisted coding? I’m not sure. I still think it’s important for humans to be able to read the code, so I don’t think languages are going away. But Hoon, as the only language we can really program Urbit in, has a lot of limitations. I appreciate it, and I think it’s beautiful in some ways, but it also has real limitations—even for agent-assisted coding. In my experience, agents have about as hard a time with Hoon as humans do.

So I’ve wondered whether it’s possible to have another programming language for Urbit. My pitch is porting F# over to Urbit. It brings a lot that Urbit could really use, and it’s a good fit because it’s an OCaml-ish language. There’s a full technical spec. The compiler is highly documented. A lot of the .NET-specific material could be stripped away, and the final compilation target could become Nock.

What F# would bring to the party is a structure that can inline other languages, type providers, and eventually a path toward formal methods through F*. With all the agent-assisted coding going on in the world, I think the need for provable code is only going to grow.

> **\~sarlev:** You make an interesting point about the need for provable code... In legacy computing, what systemic problems felt fundamental there but feel much less painful on the Urbit side?

**\~nomryg-nilref:** Software distribution, first of all. And the build system—how could I forget that? That may be the best thing about programming in Hoon. The build system just works, and it’s dead simple. A build system should be dead simple. Everywhere else, it is far from dead simple.

So despite the difficulty of getting Hoon right—for both humans and agents—that part of computing on Urbit is a huge advantage.

> **\~sarlev:** Urbit is still a living project. A lot has been solved, but there’s more to do. What system improvements are you most looking forward to?

**\~nomryg-nilref:** I’m most looking forward to getting my project, Obelisk, out the door. I'm targeting to have the beta live by the end of the month.

If you know what SQL is in relational databases, Obelisk is a relational database for Urbit-native computing that fixes some of the lingering compromises in SQL. SQL got rushed out the door in the 1970s on machines that could barely handle the workload of a relational database, so it had to make all sorts of compromises.

Obelisk fixes some of those. For one thing, results are proper sets of data, unlike what goes on in SQL. Another issue is the whole problem of nulls, which people who use SQL every day have learned to live with even though they’re actually fundamental logical problems. The urQL dialect of SQL in Obelisk emphasizes composeability through enforced use of Common Table Expressions and a new SCALARS clause where otherwise in standard SQL you could inline SQL expressions. I think this makes your query language much more readable and easier to reason about.

Another big thing Obelisk brings is time travel. All states of your data still exist. If you changed the database yesterday, that doesn’t mean the prior state is gone. You can query what it looked like at any point in time. That eliminates a lot of the overhead you otherwise need around audits: when did the database change, how did it change, can we go back to what it looked like before.

> **\~sarlev:** How do you imagine people using it? Is it one database for everything, or something else?

**\~nomryg-nilref:** Not a single database. I envision a different database for every app, but all of them living on the same database server. That means you can mash up data between different apps because it all lives on the same server, and eventually you could join data across ships as well.

I’ve got a fairly extensive security model mostly spec’d out in my head and partly on paper, but to begin with it’ll only be available on the same ship. Only apps on your ship will be able to access the server.

> **\~sarlev:** Given how deep the relational model can get, do you think people will need a lot of database expertise to use Obelisk well?

**\~nomryg-nilref:** That’s where agent-assisted coding is going to help us. It isn’t trivial to really understand SQL or the relational model. It’s easy enough to learn some basics, but once you want to do sophisticated things, you have to truly understand it.

Now we have agents. One of the first things I’d like to see with Obelisk—and hopefully other people will help here—is agent-assisted Obelisk programming. You should be able to say, “Agent, keep this data for me,” or “Show me this data,” and have it do the right thing. The prompt will need to be somewhat more complex than that, but hopefully not much more.

I don’t want to fall into the trap of expecting everybody else to know relational algebra, set theory, and first-order predicate calculus just because those things are second nature to me after decades of dealing with them.

> **\~sarlev:** Once the beta is out, what’s next on your radar?

**\~nomryg-nilref:** Kind of all of the above. I want to touch grass more, for sure. But I’ve also got a couple of directions in mind for Obelisk, and it depends on community reaction and feedback from the Core Guild.

The most important thing is getting version 1.0 out. The main things still missing are views, grouping, `group by`, `order by`, and related features. The [roadmap is published](https://github.com/jackfoxy/obelisk/blob/master/roadmap.md) and I recently updated it, so I know what’s required for version one.

And then there’s testing. I’ve written a lot of tests, but tests are the burnout part of the work. They make this kind of project a slog sometimes, even though agents have helped a lot. I know someone is going to find bugs; I just don’t know which bugs yet.

There’s also been interest in making Obelisk a [vane](https://docs.urbit.org/build-on-urbit/core-academy/ca11#vane), and I think it probably should be one. Whether that becomes the next step depends a lot on community and core guild feedback.

> **\~sarlev:** A personal database that all my apps can interface with does sound like a core part of the personal server idea.

**\~nomryg-nilref:** Yeah. `~sorreg-namtyv` already came up with the name of what the vane should be: `%codd`, after E.F. Codd, who basically invented relational algebra and was the driving force behind SQL, even if he didn’t have much say in how SQL itself got developed. We'll have to see how it plays with the `%clay` naming conflict, but technically speaking it should be doable.

In my [Urbit Systems Technical Journal article](https://urbitsystems.tech/article/v03-i01/obelisk-reinventing-sql-for-modern-computing) I pay a bit of homage to E.F. Codd. He figured all this stuff out. It’s actually simple, or at least it can be understood by ordinary people, even if he explained it in very technical terms.

> **\~sarlev:** If you weren’t working on Urbit, what would you be doing instead?

**\~nomryg-nilref:** I’d probably be touching grass more.

But the brainworm is deep enough in me that I feel like I’m doing this to glorify God. If we don’t have a future with Urbit—which appears to be the only serious sovereign-computing project—we’re going to be serfs to the regime, literally.
