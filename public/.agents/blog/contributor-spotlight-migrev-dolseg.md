---
title: "Contributor Spotlight: ~migrev-dolseg"
source_kind: "blog"
canonical_url: "/blog/contributor-spotlight-migrev-dolseg"
human_md_url: "/blog/contributor-spotlight-migrev-dolseg.md"
agent_mode: "fallback"
dependencies:
  - "/blog/precepts.md"
related_pages:
  - "/blog.md"
  - "/blog/precepts.md"
  - "/blog/contributor-spotlight-migrev-dolseg.md"
---

Human-oriented content: /blog/contributor-spotlight-migrev-dolseg.md

# Contributor Spotlight: ~migrev-dolseg

A conversation with ~migrev-dolseg on personal computing, Kelvin 0, %hawk, reactive interfaces, and LLM-native software

- Date: 2026-09-01
- Author: ~sarlev-sarsen

> **\~sarlev:** What first drew you into the idea that we needed to throw away and rewrite the entire networked computing stack?

**\~migrev-dolseg:** I think it took me a really long time to believe that was true, but I was interested in Urbit regardless. I had gotten really into Emacs and ricing my system. I had this desire for a feeling of unification: one environment that I controlled, understood, and could customize, where I had a sense of ownership over my data.

But I was also in a phase of my life where I was trying to become a blogger. I was interested in web design, and a lot of what I was doing was trying to publish on the internet. I kept having a hard time squaring that circle with Emacs. It was a great environment for my personal data, but it didn't let me do the main thing I wanted to do with computers, which was communicate and share things with people—and ultimately build a reputation and a career. You can have the world's coolest Emacs setup, but that doesn't actually get you anywhere.

When I found out about Urbit, my initial goal was to make Emacs for Urbit. The more I looked into it, the more I thought, okay, this actually does have the shape of something that could solve the problem of using computers in a way that feels like me. It feels personal. I have control over it. But I could also imagine one day having a bank app or my text messages on it. It seemed capable of solving the problem of owning my digital life.

> **\~sarlev:** What was the arc from wanting Emacs on Urbit to the work you've done since?

**\~migrev-dolseg:** I bought a star at the tippity-top of the market. I think I paid something like $10,000 for it. I had the NFT fervor, got really into it, and basically became one of the cult members. I was listening to the podcasts and watching the YouTube videos.

Then there was a hackathon, and I thought I would try to build something for it. I had this idea of Emacs on Urbit, and the hackathon was a good opportunity to learn a little Hoon. I built a text editor called `%eyas`. An eyas is a four-letter word for a baby hawk. I had this idea that one day the project would grow into a computing system with the same goal as Emacs.

> **\~sarlev:** As you pursued that idea of “Emacs with your friends,” what became your favorite part of Urbit?

**\~migrev-dolseg:** I really liked `%sail`. Hoon was funky and took me a few months to learn, but I came from the frontend world. I had built a lot of websites and was very familiar with HTML. I started building little static websites and found `%sail` to be a very elegant HTML templating language—probably the best HTML templating language I had ever used, and there are a lot of them.

It seeded the idea in my head that you could have a system that was all in one language. The useful part isn't just hypothetical. The idea, at least at the time, was that you could make a system small enough for a single person to understand the whole thing.

When I imagine a system like that, it is obviously going to be in one language. There will be one way of doing things, and it will all fit together and feel cohesive. Urbit was pointing at all of those things. Kelvin 0 is basically saying, “We're going to have a lot of strong opinions, and we're going to standardize on them for the sake of unification.” If Urbit reaches Kelvin 0 and it isn't perfect, okay—but at least it is standardized. That's better than what we have now.

> **\~sarlev:** Urbit is sometimes described as a forever computer. How does the idea of Kelvin 0 affect the way you think about your digital life?

**\~migrev-dolseg:** I'm fascinated that it is even possible to do something like Kelvin 0. It's a unique philosophical idea: you can have a system defined in pure math. The point of the Vere–Arvo distinction is that Vere handles everything that necessarily has to change as humans progress in their knowledge of computers. The Arvo side is defined in terms of its own axioms.

I fell in love with the idea that, inside that little system of axioms, you could have a system that is yours. You use it as part of your mindscape, and it stays with you for the rest of your life.

I don't think people give enough thought to the fact that, when they use a Gmail account as their digital identity, they're making an implicit statement that Google should be around for the rest of their life. It isn't as though we're going to get rid of digital communication in fifty years. I liked thinking about systems that could last for a really long time, and the ideas lined up.

Once I started putting more of my daily life inside Urbit, I got the same satisfying feeling that people get from Obsidian and Emacs. It's your place. You control it, and you know it isn't going to come out from underneath you at any moment.

> **\~sarlev:** Some people hesitate to put more of their digital lives on their ships because of storage or performance concerns. Which limits are real, and which are overstated?

**\~migrev-dolseg:** Performance is less of an issue than people make it out to be. The first version of `%hawk` that I published was incredibly slow, and I blamed the system for that. In reality, I just wasn't that good of a developer. I didn't understand Urbit deeply enough to work with the system instead of against it.

I was doing crazy things like recompiling pages every time you saved. I didn't know how to use some of Hoon's deeper structures, such as polymorphic cores. That takes a long time to learn and to actually use. I came from the frontend world, so I didn't know much about Haskell-style types. You have to figure it out the slow way.

I got a lot of use out of the Urbit [“Precepts”](https://urbit.org/blog/precepts) essay. It's almost like a collection of little riddles. It doesn't explain or justify the principles; it just states things like “Everything should be CQRS” and “(Almost) everything should be pubsub.” It's up to you as the reader to understand why those things are true within the system. CQRS, for example, probably took me three years to really understand. Then you learn it and think, oh yeah, that actually makes sense.

> **\~sarlev:** What is CQRS, and why does it matter in Urbit?

**\~migrev-dolseg:** It means Command Query Responsibility Segregation. When you request data, that request can't change anything on the publisher's side. You split queries that read data from commands that write data.

That lets you change the system from being read-based to being dependency-based. In a SQL database, if you want to perform a join, you do it at the time of the read. In Urbit, reads come from a static global namespace and all the mutation happens when you insert data into the system. You insert data, the dependencies flow from there to update everything eagerly, and the reads are stateless—or at least that's how it is supposed to work.

> **\~sarlev:** How do these precepts actually play out? Or, said another way, which systemic problems from legacy web development become painless when you build on Urbit?

**\~migrev-dolseg:** Authentication. When I built little websites and tried to monetize them, I had to implement OAuth flows or deal with passwords and cookies. The first version of `%hawk` used EAuth, which lets other people log in to your server with their Urbit identity. As the application developer, you are simply passed that identity. You don't have to think about the authentication piece at all. A whole third of the complexity of Web 2 development disappears immediately.

The other piece is that you don't have a database. You have state that you modify directly. You don't have to serialize it and send queries into some database. That's another third of the SaaS world that disappears.

This goes back to Kelvin 0. You end up with a system where, if you squint, you can see a shape that is so close to the problem you're solving that you can imagine it never changing. You're seeing the essential problem rather than dealing with all the superfluous problems of getting data in and out of the system.

> **\~sarlev:** What remaining pain points are you trying to remove?

**\~migrev-dolseg:** For a long time, one was reactive UIs. I still didn't understand CQRS, and I was building my UIs around a request–response pattern. When data changed on the server, the user had to click a refresh button to update the screen.

We never really had a good or official system for building reactive interfaces in Hoon. There was [a project called `%mast`](https://github.com/urbit/mast) that almost got there, but it got wrapped up in some organizational failures--meaning, work on it stopped--and it still had research left to do. We didn't have a solution for basically two years.

Recently, I have essentially solved it. You can now write UIs completely in Hoon that handle the interaction between the browser and your server. The server defines the markup and how to convert its data into a `%manx`; the connections, streaming, and other interactions are handled for you.

> **\~sarlev:** Is that the latest evolution of `%hawk`? What changed between `%hawk-500` and `%hawk-499`?

**\~migrev-dolseg:** I was able to make the new version a better rendering environment. I accepted what `%hawk` actually is: a website builder.

`%hawk` came out of the fall of Neo. In my mind, I thought I was going to make a little bit of Shrubbery. `%hawk` was my attempt to build something tree-shaped and reactive. It was kind of reactive and tree-shaped, but what it really was—and what it was really good at—was building websites.

I kept chasing the idea of putting data into it and making it more cohesive within the system. Eventually, it just didn't work. I had to reattack the problem and make `%hawk` the best website builder you can make on Urbit: handle the rendering piece and do it really well, but make it work with any data source on your ship. It can work with Gall apps. It can work with Obelisk. It can work with whatever reactive database system comes up in the future—[Grubbery](https://github.com/gwbtc/grubbery), perhaps. The goal is to make the process of building reactive UIs as seamless as possible.

> **\~sarlev:** Urbit is a small, unified system, but most people will never understand all of its code. How does this play out in a world of LLMs?

**\~migrev-dolseg:** I think Urbit has a clear shot at becoming the next LLM harness. People say the models will get better, but at least right now the real improvements will come from better harnesses that use tokens more efficiently.

Urbit's claim is that we can define a coherent system with the fewest possible tokens. There just aren't that many symbols inside 200,000 lines of code. If you get it small enough, you can stick the whole system in the context window.

That's especially useful when thinking about local LLMs. You can run a kind-of-okay LLM on your laptop, but you're not going to have it control your screen because that takes too many tokens. If you make a conceptually smaller system, you need fewer AI tokens to do useful things inside it.

Urbit is statically typed, small, and unified enough that you can make a good application in a single file. `%hawk`'s highest aspiration was to make the most powerful one-file programs in the world. My thought was that LLMs would become really good at writing a single file. All the context is right there, it has a defined shape, and the LLM is basically filling it in.

The environment provides so many facilities. Authentication, persistence, and all the other things every app needs are abstracted away, so the core logic can fit in a single file. An LLM can make that with very few tokens.

> **\~sarlev:** How much LLM-assisted development can move onto Urbit, and what kinds of software most belong there?

**\~migrev-dolseg:** Developer tools that use LLMs will, to some extent, always be outside the system. We'll have a Claude Code harness helping us write a GitHub repository. I think we're far away from moving the development of Urbit onto Urbit.

But we can put much more of our digital lives on Urbit than we currently do. LLMs are making everyone realize that software itself doesn't really have a moat. Anybody can replace your to-do-list app. The only moat left is in the things that require groups of people to reach consensus—in other words, protocols.

Protocols are still a moat. You can build a protocol that extracts value, and it will be sticky because it is hard to leave a protocol once you're in it, especially if you're getting value from it. LLMs destroy the other moats. What's going to win is the place where it is easiest to make good protocols that extract value in ways that help the system grow.

One thing `~ravmel-ropdyl` used to say is that Gall agents are not apps; Gall agents are protocols. A Gall agent defines a protocol: how do you share data between peers in a way that keeps everybody moving in lockstep and lets you upgrade them for the next hundred years?

Urbit has thought about this question much more deeply than everybody else. You can look at almost any decentralized social project and find that it isn't actually decentralized. It may not be on X's server, but it is still on somebody's server. It doesn't solve the problem.

The short answer is social applications. That's the part that can move onto Urbit in an interesting way, rather than merely saying, “I can run a to-do list on it.” It's the same problem I had with Emacs all over again: you get the personal computing environment you want, then discover that you need it to network with your friends.

> **\~sarlev:** So you've shipped `%hawk-499`. What are you working on next?

**\~migrev-dolseg:** I have some nice LLM-harness work for `%hawk-499`. From any app, you can open an overlay with a chat window. The LLM will help you write the endpoints, so you can vibe-code them.

I also want to make some changes to `%twig` and get it to be less buggy than it currently is. I let an LLM run loose on `%twig` and it busted some stuff, so sorry about that, everybody.

Now that `%hawk` is a good answer to “How do you build interfaces on Urbit?”, I'm moving on to the question of what the data looks like. How do we build a good reactive data store?

> **\~sarlev:** `%hawk-500` bundled an answer to the data question into `%manx`. How has your thinking evolved through `%oxal` and your newer work?

**\~migrev-dolseg:** With `%hawk-500`, I wanted the system to have the property that every piece of data was visual. You could go to a path and see it. I was already working in the browser, so I went with `%manx`. I liked that shape because the browser already knows how to render it.

If you force the user to put all their data into that shape, the system ends up being very small and there is no hidden data. There is no state in the system that the user cannot see. The problem, of course, is that `%manx` is dynamically typed. You lose a lot of Urbit's good properties and have to constantly serialize and deserialize everything. People warned me about this, and I was too stubborn to listen. I thought I was smarter than them, but I wasn't.

`%oxal` was a reattack where I chased the idea of a tree-shaped spreadsheet. You have a tree of data, and pieces of data can depend on other data and update reactively. Because the other shapes we care about are also tree-shaped, you could have one data source that acts as the reactive database for everything on your Urbit. You can do efficient mirroring.

It was much better than `%hawk-500` at storing data, but it was still basically dynamically typed. I built a schema system to make it statically typed, but then the schema became a new way of defining types in Urbit. It separated things and felt ugly. It was a whole new type system, and that just wasn't correct. I'm back at the drawing board now, but I have some good prototypes.

> **\~sarlev:** If you weren't working on Urbit, what would you be doing instead?

**\~migrev-dolseg:** Oh gosh. Not software. I'm tangentially interested in plants. I think plants are cool. But I've made a rule for myself that if Urbit sinks, I'm going to get a normal-person job. I'd probably be a forest guide or a spin instructor—something where I'm not static all day.

I hate computers. If this doesn't work out, then the whole computing industry was a failure and there's no point. Let's go back.
