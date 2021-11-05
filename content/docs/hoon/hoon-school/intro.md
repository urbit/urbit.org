+++
title = "1.1 Introduction"
weight = 1
template = "doc.html"
aliases = ["/docs/learn/hoon/hoon-tutorial/setup/"]
+++

This series is designed to teach you Hoon without assuming you have an extensive
programming background. In fact, you should be able to follow much of it even if
you have no programming experience at all, though of course experience helps. We
strongly encourage you to try out all the examples of each lesson. These lessons
are meant for the beginner, but they aren't meant to be skimmed. Each lesson
falls into one of two categories: **readings**, which are prose-heavy
explanations of Hoon fundamentals, and **walkthroughs**, which are line-by-line
explanations of example programs. Walkthroughs are found between readings,
offering a practical implementation of the concepts taught in the reading
before.

If you're curious about why Urbit is written in this new language, we recommend
reading the [Hoon overview](/docs/hoon/overview) that covers the high-level
design decisions behind the language.

Chapter 1 introduces and explains the fundamental concepts you need in order to
understand Hoon's semantics.

Hoon is a "subject-oriented" programming language — every expression of
Hoon is evaluated relative to a **subject**. The subject is a piece of data that
represents the environment, or the context, of an expression. After reading
Chapter 1 you should understand what the subject is and how to refer to its
various parts. In this chapter you'll also learn about
**[cores](/docs/glossary/core/)**, which are an important data structure in
Hoon. Once you get the hang of [cores](/docs/glossary/core/) you'll be able to
write your own functions in Hoon.

Chapter 2 covers the type system, writing basic apps, and the workings of the
Arvo kernel.

## Environment Setup

Before beginning, you'll need to get a development ship running and configure an
appropriate editor. See the [Environment Setup](/docs/development/environment)
guide for details.

## Getting started

Once you've created your development ship, let's try a basic command. Type `(add 2 2)` at the prompt and hit return. Your screen now shows:

```
fake: ~zod
ames: czar: ~zod on 31337 (localhost only)
http: live (insecure, public) on 80
http: live (insecure, loopback) on 12321
> (add 2 2)
4
~zod:dojo>
```

You just used a function from the Hoon standard library, `add`. Next, quit Urbit
with `ctrl-d`:

```
> (add 2 2)
4
~zod:dojo>
$
```

Your ship isn't running anymore and you're back at your computer's normal
terminal prompt. If your ship is `~zod`, then you can restart the ship by
typing:

```sh
urbit zod
```

## Another Noun

You've already used a standard library function to produce one value, in the
Dojo. Now that your ship is running again, let's try another. Enter the number
`17`.

We won't show the `~zod:dojo> ` prompt from here on out. We'll just show the
echoed command along with its result.

You'll see:

```
> 17
17
```

You asked Dojo to evaluate `17` and it echoed the number back at you. This value
is a "noun". We'll talk more about [nouns](/docs/glossary/noun/) in [Lesson
1.2](/docs/hoon/hoon-school/nouns), but first let's write a very basic program.

## Generators

Generators are the most straightforward way to write Hoon programs. They are a
concept in Arvo, and involve saving Hoon code in a `.hoon` text file. While they
aren't strictly part of the Hoon language, we'll be dealing with generators
throughout this tutorial.

The simplest type of generator is the **naked generator**. All naked generators
are `gates`: functions that take an argument and produce an output. To create a
generator, all you need to do is write a `gate`, save it in a `.hoon` file, and
add it to the `/gen` directory of a desk on your ship.

To be able to add files easily, you'll need to mount a desk to the Unix
filesystem. We'll use the `%base` desk throughout Hoon School since we're using
a fake ship, but note a different one would be more suitable on a live ship. To
mount `%base`, just run `|mount %base` in the dojo. If you look in your
[pier](/docs/glossary/pier), you should now see a `base` folder. Once you've added
the `.hoon` file in `base/gen`, you'll need to run `|commit %base` in the dojo
so the new file is recognised by your ship. To run a generator named
`mygen.hoon`, you would type `+mygen <argument>` in your ship's dojo. If you
added it to a desk other than `%base`, you can run `+desk!mygen <argument>`
where `desk` is the desk you put it in.

If this doesn't make sense yet, that's okay. In the [next
lesson](/docs/hoon/hoon-school/list-of-numbers), we will walk you through an
example `gate` that is run as a generator.
