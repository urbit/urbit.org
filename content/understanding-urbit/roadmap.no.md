+++
title = "Veikart: OS 1 -> OS N"
description = "Kjerneideene som Urbit er bygget rundt"
weight = 4
[extra]
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
+++

# Veikart: Landscape 1 → 3

La oss snakke om hvor vi vil at Urbit skal gå, og hvordan vi kommer dit.

Vi jobber med å bygge Urbit ID + Urbit OS til en erstatning på menneskelig skala for den industrielle programvarestakken som driver våre sentraliserte apper og tjenester i dag. Med tiden vil vi at Urbit skal være like robust som Unix og internettprotokollpakken som dagens stack hviler på. Vi ser frem til en fremtid der Urbit er et standardisert, lite bemerkelsesverdig, allestedsnærværende databehandlings grunnlag som brukes og eies av alle.

Vi startet med å bygge en prototype for hvordan dette fremtidige fundamentet skulle se ut. Vi brukte de første årene hovedsakelig på systemets arkitektur – men en ny plattform trenger en klar use-case, en måte å få den i bruk. Dette er det vi har bygget det siste året eller så. Det heter Landscape.

Landscape er et fleksibelt verktøy for å kommunisere og samarbeide med venner som kjører på toppen av Urbit OS.

Landscape lar deg bringe en gruppe mennesker sammen for å kommunisere, samarbeide og gjøre forretninger. Tenk på det som en kombinasjon av 'produktivitetsprogramvare' og 'sosiale nettverk'. Landscape er å samle en gruppe mennesker for å dele et sett med ‘moduler’, eller ting å gjøre, og tilpasse et miljø for at gruppen skal holde kontakten. For en fullstendig oversikt, se [grensesnittdelen](https://urbit.org/understanding-urbit/interface/).

Å samle mange forskjellige ting på ett sted er noe bare en generell plattform som Urbit kan gjøre, og det er akkurat det vi ønsker som et alternativ til sentralisert programvare.

Når Urbit modnes, vil nok andre fullverdige digitale miljøer dukke opp – men Landscape er appen vi trenger hvis vi ønsker å bevege oss bort fra verdenen av MEGACORP-programvaren og inn i et sikkert, distraksjonsfritt nettverk.

<br>

![Landscape](https://storage.googleapis.com/media.urbit.org/tlon/landscape.jpg)

Today, we pour all of our focus into making Landscape a comfortable place for digital communities to call home, starting with our own. This effort forces us to mature the entire stack, from the interpreter to the interface. 

Let’s walk through the next few phases of Landscape to get a sense of where we are and where we’re headed.

<br>

![The current state of Landscape/OS1](https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-3.png)

### Today: Landscape OS 1.N

We built OS 1 for ourselves, because we wanted to use a communication tool that we can trust and put our system to work for real. 

Today we use OS 1 every day to chat, write, and share links. It’s a calm, minimalist tool that gets us one step away from the ads, tracking, distraction and disruption of mainstream software. (We won’t get into the details of OS 1 here, but you can check out [this post](https://urbit.org/blog/introducing-os1/) for a walkthrough. You’re also welcome to try [booting a node yourself](https://urbit.org/getting-started/).)

The first version of OS 1 shipped in March and we’ve been improving it continuously ever since. OS 1 now runs on a much faster, more reliable Urbit OS kernel and network. The interface itself has been cleaned up and made vastly more efficient. If we weren’t so busy, we would have called it OS 1.12 by now. 

Our initial goal was just to get ourselves living on Urbit everyday. We achieved that, and managed to see quite a few other communities pop up along the way. We made enormous progress, but our system isn’t refined or reliable enough. It also still needs a thorough security audit (which we’re already working on).

OS 1 was a huge step forward. Let’s talk about what’s next.

<br>

![A speculative interface for Landscape S2](https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-4.png)

## Late 2020: Landscape S2

**It’s weird to have both ‘Urbit OS’ and a client called ‘OS 1’. After OS 1 we’re going to move to a different naming scheme for Landscape—starting with Landscape S2.**

OS 1 is nice, but it’s only usable by explorers, tinkerers, and hobbyists. It’s rough around the edges. You have to *want* to use Urbit as much as we do.

Landscape S2 is much more comfortable. Landscape S2 has a polished, groups-oriented interface, a much more robust data storage format, significant gains in performance and memory management, and a much more reliable way to migrate your data.

Most importantly, Landscape S2 has a completely redesigned invitation and onboarding process that will arrive in tandem with a [hosting service](https://tlon.io) from Tlon. (Last we heard there are a few others working on Urbit hosting as well—we’ll link to them as soon as they’re ready.)

This means you can easily invite a friend from within Landscape and have them up and running in a few minutes without ever leaving a browser. Every conventional app does this already, of course, but none of them can offer the simplicity and clarity of running on Urbit OS. 

We know that getting onto the network can be difficult for less technical users. Everyone currently has to run and care for their own node. With easy onboarding we can use Landscape to start building the communities that never really felt at home on these conventional, one-size-fits-all platforms: the-contemporary-monastery, music-in-the-age-of-COVID, and so on.

We’re planning to share the hosted version of S2 with a few small communities to test it out and put it through the paces. If you’re curious, [let us know](https://tlon.io).

<br>

![A speculative payments interface](https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-roadmap-4.jpg)

## Early 2021: Landscape S3

Landscape S3 will be a tool for communicating and working together that we can enthusiastically invite others to use. 

A native desktop and mobile app, Landscape S3 will be supported by at least one host (Tlon) for easy inviting and onboarding that can support urbit-to-urbit crypto payments. With the addition of basic commerce, Landscape S3 will be a comprehensive environment for communities to make their own.

Perhaps most importantly, Landscape 3 will be backed by a fully audited networking protocol. We’re in the process of auditing our networking now and, once complete, we can be confident that communication over Urbit is secure. 

Landscape inherits the benefits of Urbit itself: simplicity, durability, and a real sense of ownership. These come out of the box, from the beginning, but supporting a fully-featured interface makes a lot of demands of a new stack. By Landscape 3 our interface and infrastructure will have matured to the point that it can be confidently held up against alternatives.

<br>

![A landscape](https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-roadmap-5.jpg)

## 2021 and beyond

Our goal with Landscape is to give communities the tools they deserve to customize their digital environments. By Landscape S3, our interface and infrastructure will truly support this.

But Landscape in early 2021 will likely still only come with a few modules out of the box. Our major next step during 2021 is to make it easy for anyone to add their own modules and for developers to build and publish their own. Enabling third-party development will really enable Urbit-centric communities to tailor their own software. 


We can’t cover everything about Landscape in a short post, nor about how the community works or evolves what we do. If you’re curious to learn more, try [booting a node](https://urbit.org/getting-started/) and joining the Urbit Community group where most of us hang out. That’s where we hang out most of the time, but you can also find us working in public on [GitHub](https://github.com/urbit) and on the [urbit-dev](https://groups.google.com/a/urbit.org/g/dev) mailing list.

For now, let’s move on to who builds this thing and where it came from.
