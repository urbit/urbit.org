+++
title = "Magic"
date = 2016-05-16
description = "A thought-experiment to explain the Urbit user experience."
aliases = ["/posts/essays/magic"]
[extra]
author = "Curtis Yarvin"
ship = "~sorreg-namtyv"
+++
![](https://media.urbit.org/site/blog-7.jpg)

It's easy to get too obsessed with Urbit's alien technology.  We
didn't build Urbit for its tech.  We built it for people to use.

It's also hard to understand the power of Urbit, because it's
still quite immature.  Unless you understand it already, it's
just a weird OS that doesn't work all that well.

And this OS is supposedly designed as a new kind of product: a
personal server.  What is a personal server?  If you had one,
you'd know.  Since you don't, you don't.  So both your problem
and our solution are totally unclear.

One way to understand Urbit is to forget the technology totally.
Instead, let's build the same product out of magic.  Technology
is hard and imperfect and slow.  Magic is easy and perfect and
fast.  Why not use it?  At least for a demo?

## Magic step one: total integration.

Make a list of all the cloud apps which have your personal data.
OK, just imagine making a list.  OK, use magic.

By magic, we make some giant company buy all these apps.  It
could be any of them, but let's say it's Facebook.  Facebook buys
_all the apps_.  As of now, _all your cloud computing happens in
your Facebook profile_.

Your Facebook is now your Dropbox and your Evernote and your
Wordpress and your Gmail.  And it's not just Web apps; all your
servers move to Facebook.  Your Nest talks to a Facebook server.
Your iPhone talks to Facebook instead of iCloud.  Your Fitbit
records your heart rate in a Facebook log.  Your Facebook
manages your finances and pays your bills.  Got bitcoin?
Facebook is your wallet.  Shop online?  Check out the Facebook
Store -- it sells everything!

In short, you can just lock your browser to `facebook.com`.  The
Web is dead.  Or more precisely, it's an obsolete protocol which
you use to log in to Facebook.

Does this sound creepy?  Sure.  It's incredibly creepy.  But look
on the bright side: it's also incredibly convenient.  (And
incredibly secure, at least with a 2-factor key.)

For the first time ever, _all your data is in one place_.  For
example, the engineers at Facebook, who are awesome, would never
leave Dropbox, Instagram and iCloud as three separate things.
You don't need an "integration" between them.  Your profile is
one thing: you.  Your entire digital life.

(In fact, if you're a geek and have Unix boxes, your Facebook is
magically integrated with Unix.  You can just open your laptop
and type `ls /photos/2016/May/` -- as if your digital life was a
chip in a box in your backpack, not redundant servers in multiple
secure data centers.)

Imagine we all lived in hotels, all the time, even in just one
city.  Imagine you don't even have one room with a long-term
lease.  You sleep in one pod Mondays, another on Tuesdays...
then, someone offers you a home.  Your own house.  With your own
furniture, your own books in your own bookcases...

## Magic step two: free your data.

The good news is, you get your own house.  The bad news is, it's
in North Korea.

Having your whole life owned by Facebook is still creepy.  Or so
most people would think.  It's not actually clear that it's more
creepy to be owned by one corporation, than nine corporations.
But it _feels_ creepier.

By magic, Facebook cares.  So it decides to free you.  Actually,
Facebook's business is owning you.  So freedom will destroy its
business.  But magically, Facebook doesn't mind.

Right now, the software behind your Facebook experience is a
million lines of Facebook goo.  It solves your problems and shows
your ads and does whatever the heck it wants with your data.
(Not that it's "your" data.  It's Facebook's data, about you.)

Without changing the functionality of your Facebook experience,
Facebook replaces every component of this goo with an "agent."
(You have about as many agents as you used to have apps.)  If you
don't care about being free, you won't notice the change.  If you
do care, everything changes.

One, you don't have to run Facebook's agents.  You can replace
them with anyone else's software, free or paid.  Agents upgrade
themselves automatically, but you are never locked in; you can
always switch agents and/or vendors without damaging your data.

Don't like your email UI?  Change it.  Don't like to see ads?
You no longer see any ads -- why would someone use an agent that
showed them ads?  Ick.  Unless it's something ridiculously
specialized, an agent is either free software or costs $3.99.

Two, agents _act as you_.  Facebook is no longer the Panopticon.
It is not a giant mainframe where all the code can access all the
data.  An agent can use as much of your own data as you give it;
it cannot use anyone else's data.  At least not without asking.

When anyone can write an agent, only code can be law.  Privacy is
no longer enforced by the informal decisions of Facebook product
managers.  It must be enforced by formal security policies.

This might constrict the services Facebook can offer, but only a
little.  Since privacy is a human universal, apps that don't
respect it (for instance, image face tagging) feel weird.  A
service like this can't be broken up into personal agents; it
still requires a Big Data mainframe somewhere.  But it's okay;
the agents can still talk to it.

For the most part, Big Data (everyone's) has become little data
(yours).  You no longer have a Facebook profile -- a fancy UI
backed by a million lines of Facebook goo on one big mainframe.
Now what you have is a Facebook _server_: a real computer.  Or at
least, a virtual computer (which is much more reliable than any
one physical computer).

Is this computer hard to manage?  You have the same basic job as
someone who owns an iPhone: deciding what software to run.  If
you skip this job, your iPhone or your Facebook is still pretty
useful.  You also need to decide what data to keep.  An iPhone
has finite, free storage; the cloud has infinite, non-free
storage.  You still want a warning when your server gets fat.
But at least it keeps working.

## Magic step three: free your server.

This agent-oriented Facebook can't show you ads.  But this is not
actually a huge business problem.  Since Facebook owns everyone's
life, it has the mother of all monopoly lockins.  It can just
bill you $9.99 a month for running your Facebook server.  This is
a great deal, for you and for Facebook.

But you're still a slave, Neo.  A Facebook server still isn't a
personal server.  Monopolies suck.

Magic works, so Facebook feels guilty.  It goes all the way
toward freeing you, and ruins its own business.

Now, your server is just a big file whose format is precisely
defined.  You can move it to any hosting service, or even run it
on a home PC.  Since hosting is now a commodity, it costs almost
nothing and has zero profit margin.  It may even come bundled
with your Internet service.

Every data center is owned by the local government.  If you have
data to hide from the authorities, compute at home.  Most people
don't have anything to hide and should run in the cloud, because
the cloud works better.  But using the _same platform_ as those
who do have something to hide creates "herd immunity".  You don't
have to choose between a secure platform with no network effect,
and a non-secure platform that everyone else uses.

## Magic step four: free your name.

Freeing your server also means freeing your identity.  It's no
longer true that Facebook decides who you are.  Facebook just
wrote the algorithm.  Your server contains cryptographic secrets
that control your identity.  If your identity was a bitcoin, your
server would be a giant bitcoin wallet.

The bad news: lose the file, lose the identity.  The good news:
your server is genuinely personal now.  It's yours in every way.
It's so personal that if you destroy it, it's gone.

Facebook doesn't even keep its power to create new servers.  The
"real name" policy has done great things to control spam, because
spam always depends on disposable accounts.  But it implies a
central authority.

Instead, Facebook borrows an idea from bitcoin and just limits
the number of identities.  If you need one, you have to buy one.
They don't cost that much; just enough to deter spammers.

(Is your real name still linked to your identity?  Maybe, maybe
not.  There's a role for name validation, but not everyone needs
to have a real name, and not everyone else needs to know it.  A
dissident, or anyone who wants to speak out and let the words
speak for themselves, might want a second anonymous identity.
But sock puppets remain evil -- two names for the same person
should not interact in the same place.)

## Magic step five: call it Urbit.

And, with magic, we've succeeded in turning Facebook into Urbit.
Technically, Urbit is pretty close to magic, but there is no way
it's going to happen this way.  See the [roadmap](../roadmap) for how it
actually happens.
