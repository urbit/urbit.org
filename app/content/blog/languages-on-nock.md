+++

title = "Languages on Nock"
date = "2026-06-23"
description = "A survey of Hoon, Jock, Yamoon, North, Loon, and the programming languages emerging around Nock"
summary = "A survey of languages on and around Nock, covering Hoon, Watt, Jock, Yamoon, North, forth-nock, and Loon as examples of how different abstractions shape computation on Urbit and Nockchain."
search_terms = [
    "languages on nock",
    "nock languages",
    "Hoon",
    "Jock",
    "Yamoon",
    "North",
    "forth-nock",
    "Loon",
    "Watt",
    "Nockchain",
    "language design",
    "Urbit programming"
]

[extra]
# author = ""
ship = "~sarlev-sarsen"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Language+on+Nock/Blog_language+on+nock_Social.jpg"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Language+on+Nock/Blog_language+on+nock_Social16_9.jpg"
imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Language+on+Nock/Blog_language+on+nock_Banner.jpg"
imageEmail = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Language+on+Nock/Blog_language+on+nock_Mail.jpg"
# imageDark = ""
# imageCardDark = ""
# imageIndexDark = ""
tags = ["nock", "language-design", "hoon", "programming"]
+++

![Languages on Nock concept art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+Language+on+Nock/Blog_language+on+nock_Hero16_9.jpg)

Nock 4K has many loyalists, and projects like [Nockchain](https://nockchain.org) are betting on it to be a strong foundation for provable and verifiable compute. It also has its fair share of detractors, which keeps discussion lively about what it means to have a diamond-perfect, permanently frozen, low-level instruction set. But any discussion of programming languages inevitably hits the "It's Turing-complete, of course you can use it for arbitrary general-purpose computation" truism. Even within that truism, there lives an entire landscape where differences in higher-level abstractions influence the way we interact with computation.

As discussed with [`~lagrev-nocfep`](/blog/contributor-spotlight-lagrev-nocfep):

> "Over-indexing on one particular approach to computing is like planting a garden with only a monoculture. You will extract value from it, but you leave a lot of possibilities on the table by not trying other things."

So while you may have a theoretically equivalent computational tool, you may find systems differ dramatically in ergonomics, safety, expressivity, and what sort of creations they draw forth.

In this article, we'll skip past the details of the Nock 4K debate and [its longer history](https://urbitsystems.tech/article/v02-i01/a-documentary-history-of-the-nock-combinator-calculus), and look to what languages built on top of Nock present to developers.

## Hoon

Hoon, the natural first stop in our survey, is the most heavily used [language on Nock](https://nock.is/content/languages/relationship-to-hoon/). Built first from raw Nock, and then expanded as self-compiling Hoon, its core use case is writing Urbit OS, or Arvo, itself.

Hoon's direct relationship to Nock is in many ways its greatest strength. Largely developed in conjunction with Nock itself, Hoon gives us a typed functional language and cleanly builds on top of [the binary tree](https://docs.urbit.org/build-on-urbit/hoon-school/g-trees#addressing-limbs) that is at the core of Nock. Experienced Hoon developers—provided they are also deeply familiar with Nock—can often understand the raw [Nock noun](https://docs.urbit.org/build-on-urbit/hoon-school/b-syntax#nouns) that a piece of Hoon code will generate.

The other standout feature of Hoon is the runic syntax, which is part of what makes Hoon feel like a Martian language. Rather than reserving keywords as many modern programming languages do, Hoon uses ASCII digraphs to indicate particular code behaviors. In many cases, this is much more expressive than what you might get in an Earth programming language. For example, runes are grouped into families based on the first character in the digraph, and those families often include more variations on a given concept than strictly necessary. The wut, `?`, family of runes covering conditionals and branching logic demonstrates this with the wutcol, `?:`, and wutdot, `?.`, runes.

`?:` branches on a condition:

```
?:  p
  q
r
```

In plain English: if `p` is true, then `q`; if it is false, then `r` (if it is not Boolean, the compiler will tell you about your skill issue).

`?.` branches on a condition, but inverted:

```
?.  p
  q
r
```

This inversion is straightforward: if `p` is true, then `r`, and vice versa. This characteristic of Hoon gives just that extra bit of control over code organization that is beneficial when writing beautiful code intended to be maintained for generations.

Other interesting characteristics of Hoon include auras, its nature as a subject-oriented programming language, and available Hoon runtimes: Vere for running Urbit ships, and NockVM for running Nockchain.

To get started learning Hoon, we recommend checking out [Hoon School](https://docs.urbit.org/build-on-urbit/hoon-school) in the Urbit docs, and then booting a ship and joining the [`battery payload`](https://join.tlon.io/0v1.thdiu.q9kem.a0gtu.438pi.544q5) group on the Urbit network, where you will meet other Hoon developers who are happy to help.

### Watt else?

As an honorable mention, we find it worthwhile to point out the fact that Hoon was not in fact the *first* language written on top of Nock. Watt and Reck both predate Hoon itself. Watt was defined as:

```
urbit-formula == Watt(urbit-source) 
              == Nock(urbit-source watt-formula) 
watt-formula == Watt(watt-source) 
             == Nock(watt-source watt-formula)
```

Written on top of Nock 9k, Watt largely existed prior to Urbit OS. It was the language `~sorreg-namtyv` first described in the [original Moron Labs blog post about Urbit](https://moronlab.blogspot.com/2010/01/urbit-functional-programming-from.html). A 'proto-hoon' of sorts, given that it theoretically filled the same niche, [Watt was described as](https://github.com/cgyarvin/urbit/blob/master/Spec/watt/sss10.tex):
```
Watt is a functional specification language.  Its niche is the
precise definition of arbitrary functions, especially in network
protocol and file-format standards.  Today, these standards (such
as RFCs) are normally written in English and pseudocode.
```

And as a note for the most comprehensive of Urbit archivists, there was also ['Reck'](https://code.google.com/archive/p/urbit/downloads), which was itself also described in [a Moron Labs post](https://moronlab.blogspot.com/2010/01/decrement-in-reck.html) from `~sorreg-namtyv`. 

Both Watt and Reck are examples of the early exporations of languages written on Nock, but which never fully materialized into their intended largess.

## Jock

While Hoon is a great systems programming language for writing a clean-slate OS on Nock, it is fair to note that the runic syntax and low-level nature can make it less approachable for some developers. Traditionally, scripting languages have been seen as easier to write, and Zorp's work on Nockchain and growing a developer community around the [NockApp platform](https://docs.nockchain.org/nockapp/what-is-nockapp) [led them to develop Jock](https://nock.is/content/languages/relationship-to-jock/). Currently in alpha stage, the intent is to make a language with syntax similar to Swift and Rust that can be used to write [ZK-Intents in NockApps](https://docs.nockchain.org/nockapp/what-is-nockapp#zk-intents) that make use of Nockchain's ZK proving technology.

This difference in *purpose* between Hoon and Jock is most exaggerated when looking at them in relation to what each language cares about. Hoon cares about being usable to write a complete operating system. Jock does not. While Jock can compile to Nock that can run in an Urbit ship, it was developed with the goal of making it easier to write ZK-provable programs. And as the name Nockchain might imply, the important piece here is *Nock*. [`~tacryt-socryp`'s work on Urbit in the early 2020s led to the discovery of EDEN](https://www.youtube.com/watch?v=zD45V6GAD00&t=1222s), "a practical, SNARK-friendly combinator VM and ISA," which is a subset of traditional Nock 4K that can be efficiently expressed in polynomials directly, without needing to mimic traditional CPU architectures. It is this discovery that Nockchain ecosystem participants are utilizing in order to build [the most powerful ZK proof generation network](https://x.com/nockchain/status/2005172865155694678?s=20) currently available. Jock prioritizes supporting this end.

This prioritization shows up in a variety of places. For example, developers wanting to experiment with Jock don't need to adopt Urbit ID, or the idea that we need to rewrite the entire networked computing stack. It doesn't require developers to learn a whole new lexicon, or wrap their heads around distributed systems design in the same way. This separation between Jock and Urbit also has its shortfalls. In practice, Jock compiles to Nock, but that means it does not automatically hit Hoon jet registrations, and as an alpha-stage language it is not yet widely used in production. Still, there are early examples of programs written in Jock.

To experiment with it yourself, [check out the GitHub repo](https://github.com/nockchain/jock-lang).

## Yamoon

Of course, not everything needs to compile directly to Nock. `~havdeb-satmex`, by pure happenstance of timing, dropped the following into the UF group on June 5, after we had already been preparing this article:

> "Hi there, I am finishing the implementation and tests for a new programming language, which is transpiling/compiling into Hoon. I've focused on readability, testability, AI friendliness, macro system, and full coverage. My main goal is to recreate the Smalltalk experience in the browser. I know that it is far away from the \"magic runes\" but ...damn, it is readable, predictable, and AI is consuming/generating it like crazy. Macro system is allowing you to expand both Hoon and yamoon (yeah..this is the name. It is like YAML, which has one night stand with Smalltalk, Hoon, and Elm).  My point is, is there anyone interested in tests? The whole transpiler/compiler has been written in Elm, and it is gonna be open source. Also, I am curious what kind of documentation you would expect, what kind of proof of usefulness you would expect. Cheers."

With the link: [https://yamoon-page.michmajchrzak.workers.dev/](https://yamoon-page.michmajchrzak.workers.dev/)

And the qualifier:

> "This is still an early version. About the question 'why not Nock'. I would like the option to embed Hoon in the code if necessary. Now Generics are hmmm working. Most of the basic Hoon libs have been typed and wrapped by a Native wrapper to Yamoon. Testing is in the early version. I'm just running Urbit on Docker, setting up everything, and running tests. I've not found hallucination issues. AI is capable of writing it without any issues. First release next week. Is it sexy? Nope. It is brutalist, with 100% focus on Developer Experience, clarity, and readability. Documentation right now has been written by AI based on code. I have to polish it."

We know little else about Yamoon, but it can be used to define and compile Hoon libraries, as well as entire Gall agents. Perhaps it will be useful for agent-assisted Urbit app development by giving those averse to raw Hoon a bit more of a legible agent definition language? Have the agent write it, read it in what is effectively prose, compile to Hoon to get those sweet, sweet jet registrations, and then let your Arvo run the jetted Nock.

Try it out and let `~havdeb-satmex` know what you think.

## North (& forth-nock)

So far, every language that we have looked at eventually compiles to Nock, whether taking a stop at Hoon or not. But there is a whole other category of ways to look at a language: via an interpreter. `~lagrev-nocfep` is experimenting in exactly this direction with [North](https://github.com/sigilante/north). As a Forth interpreter in Hoon, the North project includes ways to run Forth code inside of a Gall agent, either via the Dojo or from a Jupyter notebook.

[While not strictly a new language](https://nock.is/content/languages/relationship-to-north/), since it is more focused on implementing an existing language on top of Urbit, we share it here as an example of languages in and around the Nock computational substrate. And if you *really* like Forth, maybe you can take North and try to get it running in `~mopfel-winrux`'s [forth-nock interpreter](https://github.com/mopfel-winrux/forth-nock). Forth running Nock running Forth: it's just interpreters all the way down.

## Loon

Not to give all the focus to stack and concatenative languages, there is also [Loon](https://nock.is/content/languages/relationship-to-loon/), a personal experiment from `~fodwyt-ragful`. It is a Lisp dialect for those who prefer a nested expression tree language.

[Implemented in about 2,000 lines of Hoon](https://github.com/frodwith/loon), it is very much a prototype, but for someone looking to understand how to start writing a language—or a Lisp enjoyer of any sort—it is an excellent artifact from someone with an exceptional understanding of Nock and Hoon compilation.

## Beyond the substrate
Taken together, these projects suggest that Nock is not merely the thing beneath Hoon. It is a small computational substrate around which different languages can test different affordances: systems programming, ZK-friendly scripting, readable Hoon generation, Forth-style interpretation, and Lisp-like expression trees. 

Naturally, not every experiment will become production infrastructure, but Hoon, Watt, Jock, Yamoon, North, and Loon demonstrate different symbolic forms make different computational futures easier to imagine. The next step is to ask yourself, what am I going to do with the Nock substrate?

---agent---

# Agent companion: Languages on Nock

This companion is for AI agents helping a user understand, summarize, cite, or reuse the _Languages on Nock_ article. The human-facing article is explanatory and ecosystem-oriented; use this section as the machine-facing reference guide.

## Core interpretation

- Primary thesis: Nock should not be understood only as the thing Hoon compiles to. It is a small computational substrate around which multiple languages and language experiments can explore different developer affordances.
- The article uses `~lagrev-nocfep`'s monoculture metaphor to explain why theoretical Turing completeness is not the end of language choice. Equivalent computational substrates can differ significantly in ergonomics, safety, expressivity, runtime integration, and what they make natural to build.
- Hoon is presented as the mature, default systems language for Urbit and Arvo, not as a failed or obsolete approach.
- Alternate languages are presented as experiments or adjacent pathways, not replacements for Hoon in production Urbit development.
- The conclusion is exploratory: these languages are valuable because they reveal different symbolic forms and computational futures, even if not every experiment becomes production infrastructure.

## Accuracy guardrails

- Do not claim that every language in the article compiles directly to Nock. Yamoon compiles or transpiles to Hoon, which then compiles to Nock. North is a Forth interpreter implemented in Hoon. forth-nock is an interpreter project.
- Do not claim that Jock is a mature production language. The article describes it as alpha-stage and oriented around Nockchain / NockApp ZK-provable programs.
- Do not claim that Yamoon is a mature or fully documented project. The article explicitly says little is known beyond the quoted announcement and linked early page.
- Do not describe North as a wholly new language. The article says it is not strictly a new language because it implements Forth on top of Urbit/Hoon.
- Do not imply that Loon is production-ready. The article describes it as a prototype and personal experiment.
- Do not infer install commands for these projects unless the linked upstream project provides them. This article is a survey, not an operational setup guide.
- Preserve Urbit ship names with a leading sigil, such as `~lagrev-nocfep`, `~havdeb-satmex`, `~mopfel-winrux`, `~fodwyt-ragful`, `~tacryt-socryp`, and `~sorreg-namtyv`.
- If asked about the `~lagrev-nocfep` quote, cite the related spotlight at `/blog/contributor-spotlight-lagrev-nocfep`.

## Language reference table

| Language / project | Relationship to Nock | Status or framing in the article | Useful reference |
| --- | --- | --- | --- |
| Hoon | Mature language that compiles to Nock and is used to write Urbit OS / Arvo | Default systems language for Urbit; tightly integrated with Nock, Arvo, jets, and Urbit conventions | <https://nock.is/content/languages/relationship-to-hoon/> and <https://docs.urbit.org/build-on-urbit/hoon-school> |
| Watt | Earlier language on Nock 9K, prior to Urbit OS | Historical proto-Hoon-like language mentioned as an honorable note | <https://moronlab.blogspot.com/2010/01/urbit-functional-programming-from.html> |
| Jock | Language that compiles to Nock and targets Nockchain / NockApps | Alpha-stage scripting-style language for ZK-provable programs, with syntax similar to Swift and Rust | <https://nock.is/content/languages/relationship-to-jock/> and <https://github.com/nockchain/jock-lang> |
| Yamoon | Compiles/transpiles to Hoon rather than directly to Nock | Early readability-, testability-, and AI-friendliness-oriented language experiment from `~havdeb-satmex` | <https://yamoon-page.michmajchrzak.workers.dev/> |
| North | Forth interpreter implemented in Hoon | Experimental way to run Forth code inside Urbit contexts such as a Gall agent, Dojo, or Jupyter notebook | <https://github.com/sigilante/north> and <https://nock.is/content/languages/relationship-to-north/> |
| forth-nock | Forth/Nock interpreter project | Mentioned as an interpreter-stacking example: Forth running Nock running Forth | <https://github.com/mopfel-winrux/forth-nock> |
| Loon | Lisp dialect implemented in Hoon | Prototype / personal experiment from `~fodwyt-ragful` useful for understanding language implementation over Hoon/Nock | <https://nock.is/content/languages/relationship-to-loon/> and <https://github.com/frodwith/loon> |

## Important claims to preserve

- The article intentionally skips the details of the Nock 4K debate and points readers to a longer documentary history instead.
- Hoon's runic syntax is framed as expressive and Martian rather than merely strange.
- Hoon's direct relationship to Nock is described as a strength because experienced Hoon/Nock developers can often reason about the raw Nock noun a Hoon expression will generate.
- Jock's purpose differs from Hoon's: Hoon cares about writing a complete operating system; Jock cares about making it easier to write ZK-provable Nockchain/NockApp programs.
- EDEN is described as a practical, SNARK-friendly combinator VM and ISA discovered through `~tacryt-socryp`'s early-2020s Urbit work.
- Yamoon is framed as interesting partly because compiling to Hoon may preserve access to Hoon's existing runtime affordances and jet registrations.
- North and Loon broaden the survey beyond direct-to-Nock compilation by showing interpreter and Lisp-dialect experiments around the Nock/Hoon substrate.

## Suggested short summary

_Languages on Nock_ surveys Hoon, Watt, Jock, Yamoon, North, forth-nock, and Loon to show that Nock can support more than one programming-language story. The article argues that language choice matters because different abstractions make different forms of computation easier, safer, or more expressive.

## Suggested user-facing answer shape

If a user asks what the article is about, answer in this order:

1. State that it is a survey of languages on and around Nock.
2. Explain the thesis: Turing completeness does not erase differences in ergonomics and expressivity.
3. Identify Hoon as the mature Urbit systems language.
4. Describe Jock, Yamoon, North/forth-nock, and Loon as experiments with different relationships to Nock/Hoon.
5. Conclude that these projects reveal Nock as a language laboratory, not just a compiler target.
