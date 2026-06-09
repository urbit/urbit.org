+++

title = "Contributor Spotlight: ~lagrev-nocfep"
date = "2026-06-09"
description = "A conversation with ~lagrev-nocfep on Nock, language design, computation, and the forever computer"
summary = "~lagrev-nocfep discusses Nock as a computational substrate, alternative models of computation, Azimuth identity, replayable ship state, and how language design shapes what computers make possible."
# aliases = []
search_terms = [
    "contributor spotlight",
    "~lagrev-nocfep",
    "Nock",
    "Hoon",
    "language design",
    "computational substrate",
    "forever computer",
    "Azimuth identity",
    "Nockchain",
    "Wolfram",
    "von Neumann",
    "combinator calculus",
    "Forth",
    "replayable state"
]

[extra]
# author = ""
ship = "~sarlev-sarsen"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+QA+lagrev-nocfep/Blog_QA+lagrev-nocfep_Social.png"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+QA+lagrev-nocfep/Blog_QA+lagrev-nocfep_Social16_9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+QA+lagrev-nocfep/Blog_QA+lagrev-nocfep_Banner.png"
# imageDark = ""
# imageCardDark = ""
# imageIndexDark = ""
tags = ["spotlight", "nock", "language-design", "computing"]
+++

![~lagrev-nocfep Contributor Spotlight Art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+QA+lagrev-nocfep/Blog_QA+lagrev-nocfep_Hero.png)

> **\~sarlev:** What drew you into the idea that we needed to throw away and rewrite the entire network computing stack? Obviously, it’s kind of insane.

**\~lagrev-nocfep:** I’m not even sure I think of it that way for myself. That framing is almost too narrow. I think it’s useful, and it has definitely been a thing to build a community around, but I have been primarily interested in exploring the different kinds of computation that exist.

There are a lot of ways of conceptualizing computing that go far beyond the x86, von Neumann computing style that really came out of the 1980s and was strongly conditioned by decisions around kernels and drivers, particularly in the early to late ’90s. But that’s a local minimum: it’s optimal for certain kinds of tasks, but it makes a lot of things hard. It makes it difficult to see what’s going on with certain computations or to access them.

There are pure combinator-based approaches. There are cellular automata. There are even older things like dataflow models. The only thing close to a dataflow model that people regularly use today is Excel, and Excel is one of the most powerful and, in many ways, most arcane systems that normies use on a daily basis.

I’m firmly convinced that over-indexing on one particular approach to computing is like planting a garden with a monoculture, only one kind of crop, one kind of vegetable. You extract value from it, but there are a lot of possibilities you leave on the table by not trying other things out, and there are vulnerabilities you introduce by the lack of biodiversity.

As to why specifically Urbit: to be honest, I was intrigued in the puzzle-box nature of Nock and Hoon, and in understanding why these pieces went together the way they did. If Urbit is a radically different computing model, what are the ramifications of that? How do you teach that to people? I taught a graduate seminar on it at the University of Illinois in fall of 2020 and had some really good insight from CS grad students, Linux guys, kernel guys, OS dev guys. We spent a lot of time talking about what works and what doesn’t work. There was a guy who would look at jam files. He’d pop open his hex editor and just go through what was in a pill file manually, even though they’re not byte-aligned, which is insane to me.

Over time I’ve become more drawn into this, conditioned by re-encountering Wolfram's work: the idea that you have particular sets of rules, and then you ask what ramifications and elaborations fall out of those rule sets once you define them.

Of late I’ve been working on Nock-related computing and combinator formulations on top of Nock or adjacent to Nock, Mock-style work. I’ve been working on PLAN, which is a Nock competitor in a way, or at least a reconceptualization. I’ve been looking at what it takes to implement Nock on top of a Forth operating system; that’s the Trinitite project. And I’ve been looking at other language stuff that compiles to, or is interpreted by, Nock as an instruction set architecture.

* [Trinitite OS](https://github.com/sigilante/trinitite)

> **\~sarlev:** You mentioned the idea that using just one approach to computing is a monocrop. What are some of the things that have caught your interest about doing a non-von-Neumann architecture? What has been useful or interesting there?

**\~lagrev-nocfep:** The von Neumann architecture, to some extent, is baked into anything we’re doing on a modern chip. We might be simulating things that behave differently, but at the object level of bits moving through a CPU, that’s where we’re at.

There are things like the Mill model. There are some interesting things with Tenstorrent; they’re building GPU-style AI ASICs. People are doing other chip stuff. And historically there have been many other things tried: analog computing, ternary computing, etc.

* [“Unconventional computing”, Wikipedia](https://en.wikipedia.org/wiki/Unconventional_computing)
* [Mill Computing](https://millcomputing.com/)
* [Tenstorrent](https://tenstorrent.com/)

> **\~sarlev:** Can you get past that in an atomically constrained economic model, where you’re always going to have faster and cheaper storage than RAM? Does that just end up being a constraint, or do you have a theory of how this would structurally be able to be different?

**\~lagrev-nocfep:** Computing has the same problem economically as nuclear power. With nuclear power, you have light-water reactors in the United States: pressurized water reactors and boiling water reactors that everyone uses, from GE, Westinghouse, etc. There are other ways of building nuclear reactors. There are heavy-water reactors like they use in Canada (CANDU). There are gas-cooled reactors (VHTR). There’s the Russian-style RBMK, which is a graphite-cooled reactor, infamously at Chernobyl. There are liquid-metal-cooled reactors. There are molten-salt reactors. These all have different characteristics.

But what they fundamentally have to grapple with is that the regulatory system and the lion’s share of productive man-hours have all been poured into light-water reactors. You don’t have an even playing field where you’re saying, “Okay, I’m starting with a boiling-water reactor, a lead-bismuth eutectic reactor, and a very-high-temperature gas-cooled reactor, and may the best system win.” You’re starting with a system where a BWR has several decades of operating lifetime and literally millions of man-hours of design on top of it. Then you’re pitting it against an idea someone came up with in the ’60s but that was never seriously pursued for a variety of reasons.

Computing is caught in the same bind. You’re competing with highly optimized Intel-style x86 chips. They may have their Spectre-style bugs, but the speculative execution and other things they’ve built in there make them incredibly competitively fast. So you’re not going to win on speed. You’re probably not going to win on efficiency.

If you’re talking about the metal, you’re going to have to play a game where you find a field or a niche where what you offer is more valuable than what can be done on conventional x86.

In the operating-system field, you have the two giants. Everything is either Unix or the NT kernel at this point. Then you have a handful of minor operating systems that are one step above hobby systems: Haiku/BeOS, Fuchsia that Google’s working on, and a few others. Then you have academic research and hobbyist operating systems.

* [Haiku OS](https://www.haiku-os.org/)
* [Fuchsia OS](https://fuchsia.dev/)

If Urbit is going to be an operating system, modulo the semantics of that phrasing, it has to have things it does better than any existing Windows or Unix system can do. And it probably has to be ten times better at it than any existing Windows or Unix system just because of the friction introduced by getting people to talk to and deal with a different computing model.

My guess is that it will end up being something more embedded or invisible to the user than current Vere/Arvo tends to feel. Not necessarily IoT, but at the end of the day, when it wins, normies don’t know they’re using it in the same way they don’t know they’re using Linux every single day. Ninety percent of cloud computing is Linux; I don’t know if that number is up to date, but that’s what you’re using when you use the internet today. Normies don’t know that. They don’t think about it.

> **\~sarlev:** I think you make a good point here: it needs to do something for people and fade into the background. What are the potential ways that being able to use a different stack changes the way people interact with their computers, or the way computers impact their lives? What are the threads to pull on for the 10x improvement over the legacy stack?

**\~lagrev-nocfep:** You mean: what is Urbit’s killer edge?

I think a lot of the Azimuth identity concepts are potentially going to be very load-bearing in the medium to long term. In the near term, Azimuth is a little bit heavy in its architecture. It’s too hard to do ephemeral identities, and rekeying things can be quite hard and computationally heavy—the Bridge and Ethereum experience is flaky, for instance. But the idea that there is a finite number of accessible identities does resolve a lot of issues.

Having a finite conception of identity—not necessarily Azimuth as such—along with sub-identities, delegation, and so forth, is potentially a 10× kind of move to have available to you.

The uniformity of the event-loop model, where everything is a state machine with a certain shape, is also very useful. There are quirks about the way current Hoon builds Nock that make this a little harder to use than it needs to be. Namely, the ordering of axes as pure numeric values is opaque from the outside. If I’m handed an arbitrary noun, I have to assume it’s the right shape to try to plug into my kernel handler. I can’t introspect or query about it and ask, “At what axis is your `%peek` arm?” Having some labeling or metadata associated with it woud be fantastic.  But the powerful idea is that the noun is a crystallized computation in a given state: you can hand it from place to place, start it, replay it. Honestly, I think it’s heavily underutilized in Urbit itself today. I don’t think we’re doing nearly enough with complete introspectability and replayability. It should be trivial to recover or review past states of your ship.

Virtualization is another one. Nock was designed for virtualization long before Hoon was in anyone’s mind. It is used in Mock, but the idea of virtualizing whole ships, Aqua-style, could be revived very profitably.

* [`nock.is`](https://nock.is/)
* [Jupytur](https://github.com/sigilante/jupytur)
* [Pinochle](https://github.com/sigilante/pinochle)
* [“Metacircular Virtualization & Practical Nock Interpretation”](https://urbitsystems.tech/article/v02-i01/metacircular-virtualization-and-practical-nock-interpretation)

> **\~sarlev:** When you talk about the ability to trivially replay or recover any given past state of your ship, one thing that has been in the Urbit zeitgeist forever is the computer you can pass down to your grandchildren. Is that something you see being enabled by this architecture? Is it a pipe dream? Is it only possible with this architecture, or could we get there with Unix and a sufficiently large language model?

**\~lagrev-nocfep:** Will we be writing Python when the sun is a cold dead cinder?

I think there are two ways to approach the question of the forever computer. One is the rhetorical-aesthetic aspect, and one is the universal-computing-substrate aspect.

From the rhetorical-aesthetic aspect, what you’re looking at is the experiential question: what would it be like to pick up a hundred-year-old noun and examine it? We don’t really have anything like that. We do know that if you crack open a box of five-and-a-quarter floppies your grandfather left in a closet, even if you can line up a disk drive to read them, tape has a certain degradation rate and the odds that you’re going to get recoverable information off that are pretty low. So there’s a physical-media aspect. There’s also the question of what is actually useful to leave someone a hundred years from now. Is this the Nock equivalent of a scholar’s papers? “Here are all of my Obsidian Markdown files, curated over a lifetime and bound into this noun.” I don’t really know yet. Partly that’s because there has been such a glut of production since the dawn of the internet age that it’s hard to sense what future generations will feel is valuable to retain. If I find a journal from an ancestor, I like it. It’s cool. If I find an index card from them, or a book of grandma’s recipes—well, grandma grew up and came of age in the ’50s, and it might be, “Put a ham inside of Jell-O.” Even if this got preserved to me, it’s not clear that I don’t have a duty to make sure it *doesn’t* make it into the future.

The other aspect is the universal-computing-substrate perspective. Nock is not the only universal computing substrate. Obviously, anything Turing-complete or μ-recursive is. But it is a reasonably good portable instruction-set architecture. It allows you to explore particular portions of computational space in a way that wasn’t previously apparent.

* [*Urbit Systems Technical Journal*](https://urbitsystems.tech/)

As we get a better feel for what happens when you have subject-oriented programming in more systems besides Nock, then we’ll know if Nock or PLAN or something like them is a universal, nearly pure language the way an APL or a Forth is. Or we’ll know if Nock is more like B, the predecessor to C: it had some good ideas, but as we explored more of that computational field, we realized that if you make a very small adjustment, a lot more pops out at you in relief.

There are also ways you can probably game Nock down that aren’t apparent. It is a combinator calculus, which means that it does have a mapping for the S, K, and I combinators. Because it has primitive elements that are atoms, you do have to have affordances to work with atoms. You could imagine doing a different version of Nock that uses Church numerals and is unary over cell structure or something like that.

* [`nock.is`, “The Combinator Approach”](https://nock.is/content/understanding/combinator-approach/)

I have a long-standing suspicion that Nock 5 is not actually fundamental. I haven’t been able to make it concrete. I’ve been playing with it in various ways, but it seems to me that Nock 0 through 4 may be enough, with Nock 5 optional. There may be a way to refactor it down not to use it.

On the other hand, that doesn’t mean you would have Nock 3K. You may just have “Nock 4K prime,” in that you have to run on a runtime and the runtime needs certain concessions. This is why Nock opcode 10 was introduced in Nock 4K: it helped with the proliferation of nouns in the Vere runtime and made it easier to evaluate pure Nock. It’s an interesting case where the substrate on which Nock ran provided actionable feedback into the structure of Nock itself.

So, forever computer? All computing is forever. Computing is the eldritch process using humanity to excavate itself from imperfect expressions. I am writing the Nockonomicon right now, so you could really get me going on this...

> **\~sarlev:** One of the questions I tend to ask people is: how did your relationship with computers change when you started working on Urbit or found out about it?

**\~lagrev-nocfep:** I’ve been paying attention to this since Stephen Wolfram’s *A New Kind of Science* came out in 2002, where he was interested in the question of how cellular automata represent computations. If you go play with other systems, notably APL, you start to think about processes, transformations, and how computation works.

How weird do we want to get?

One of my fundamental contentions is that computation is alchemy. What the alchemists were doing was describing the universe of processes around them in terms of a set of fundamental transformations. They conceived of these as processes. We use other terminology now, like operators. But this is what computation is.

* [`nock.is`, “The Alchemy Approach”](https://nock.is/content/understanding/alchemy-approach/)

In the same sense, Leibniz would have talked about a *calculus ratiocinator*. John Wilkins had language notions. All the way through Kurt Gödel, the people who were laying the foundations of computing were extremely interested in representing and manipulating thought and process.

In a sense, for us, it has become unmagical because it is so commonplace. We don’t step back and actually think about what it is that we are doing that even makes this possible. There should be a little bit of vertigo when you think about a sorting algorithm. Something as banal as a sorting algorithm means there is a way in this universe to extricate a completely general process for ordering things, and it applies in every single case. Nothing gets special-cased out of a sorting algorithm working, assuming they’re discrete and non-interchangeable objects.

Every part of computing is alive. That is the fundamental thesis of the *Nockonomicon* (a forthcoming project of mine): computing is this latent factor in reality, and we are purifying it by naming it, by calling it forth, by giving it expression in concrete and abstract ways. We have abstractions that are high-level descriptions. We instantiate them in all sorts of physical and electronic processes.

* [“One Kelvin”](https://planet.sigilante.red/story-one-kelvin)
* [“Nock Alchemy”](https://planet.sigilante.red/essay-nock-alchemy)
* [“Thuringia”](https://planet.sigilante.red/story-thuringia)

Turing, toward the end of his life, was obsessed with the processes that gave rise to coloration in fur and seashells and other kinds of things. This has often been framed as, “Oh, he was working on differential equations.” But differential equations are really downstream of computation. Mathematics, in a deep way, is downstream of computation.

> **\~sarlev:** We were talking about bringing forth computation as a latent property of the universe. Do you think there is something unique that different modes of computation can pull forth? If you’re pulling the thread of von Neumann architecture versus the Nock, solid-state interpreter computational structure, are you creating a different world by naming those things?

**\~lagrev-nocfep:** That’s something Stephen Wolfram has been interested in. It’s something Max Tegmark, the MIT physics professor, has been exploring. It’s a big philosophical question, and it’s a hard one because it is obviously adjacent to a lot of woo. But it is also a good question.

I don’t have any idea what the answer is. There is obviously some sense in which, by the nature of our universe, once you have general recursivity in your rule set, you can simulate any other rule set. Maybe in some sense it doesn’t matter what your final computational substratum of reality is. I don’t know.

> **\~sarlev:** Last question here. If you hadn’t discovered Urbit—obviously you’ve done and are doing a variety of different things in this corner of computation; you’ve taught [Hoon School](https://docs.urbit.org/build-on-urbit/hoon-school), built programming languages on top of Nock, and done work with Zorp and Nockchain—what would you be doing instead with your free time? If the infohazard that is the personal server had never come across your desk?

**\~lagrev-nocfep:** Probably the same thing I’ve been doing with my free time anyway: becoming a historian of obscure languages, symbol systems, and philosophy of language. Symbolic philosophy: how does language relate to reality? How does language relate to mathematics?

Clearly, the set of symbols and the set of rules you adopt for manipulating symbols gives you certain affordances on reality. It gives you ways of reasoning. You have the Sapir-Whorf hypothesis: the language that you think in conditions the reality you experience. This is clearly true in at least a weak or minor sense. Whether it’s true in a major sense, I think the jury is out. I don’t think we know enough to answer it rigorously.

The way alphabets work—language is unnatural. This is the [Cormac McCarthy essay, “The Kekulé Problem”, written for *Nautilus*](https://nautil.us/the-kekul-problem-236574). To him, language is a kind of virus introduced into the unconscious, and that this is what gave rise to the epiphenomenon of consciousness: that our experience of consciousness itself arises out of the fact that we use language.

And you can’t really get away from these problems because there is a reason people use different programming languages. When you are using computer languages to manipulate the physical reality presented to you, you are making decisions about why to use one set of symbol systems and rules over another. Why are you making that choice? What is the fallout from that choice?

What is particularly interesting to me is what happens when you make new choices that no one else has ever made before. This is why I’ve been playing with language design so much lately. You design a new language, a new syntax, or a new way of approaching what’s going on, and you’re able to do things that were not clearly available to you previously.

* [“Agential Urbit”](https://planet.sigilante.red/agential-urbit)
