+++
title = "Precepts: Discussion"
date = "2020-03-17"
description = "The precepts aren’t arguments. We discuss and justify them here."

[extra]
author = "Philip Monk"
ship = "~wicdev-wisryt"
image = "https://media.urbit.org/site/posts/essays/discuss-01.jpg"
+++

![](https://media.urbit.org/site/posts/essays/discuss-01.jpg)

The precepts aren’t arguments. We will discuss and justify them here. We don't expect to convince you this is exactly the right set of precepts, but we hope to convince you that this is a coherent set of precepts that might lead to something very interesting.

We will address these in the same categories presented above:

- A: General Design. Principles of engineering that apply in a great
  many situations. Any piece of code will exhibit at least a few of
  these.

- B: Specific Design. principles of engineering that apply in a few
  specific situations. What these lack in general applicability they
  make up in specific guidance.

- C: Attitude. Good code is the result of people approaching the act of
  engineering with the right attitude.

- D: Theory. The eternal tension between theory and practice must not
  simply be acknowledged but dealt with.

- E: Text Style. Code form matters.

- F: Real Software. Not all software matters. Any software which
  wouldn't exist on Mars isn't real.

![](https://media.urbit.org/site/posts/essays/discuss-02.jpg)

### A: General Design

These are principles of engineering that apply in a great many
situations. Any significant piece of code will exhibit at least a few
of these.

### Simplicity

> A20: One hundred lines of simplicity is better than twenty lines of
> complexity.

> A21: Prefer mechanical simplicity to mathematical simplicity.

At Urbit's root is a strong opinion on what constitutes simplicity. We take a semi-subjective view of simplicity. Specifically, we say that the sort of simplicity that matters is the sort that makes it easy to reason about stuff. We call this "mechanical simplicity".

A competing view of simplicity says that it can be measured objectively by metrics such as the number of moving parts, the number of kinds of moving parts, the orthogonality of concepts, or cyclomatic complexity. We believe these are important metrics because they are good approximations of mechanical simplicity, but they don't tell the whole story.

In acoustics, we use decibels of sound pressure to measure objective volume of sound. However, the Fletcher-Munson curves (equal-loudness contours) describe how loud sounds are perceived to be relative to their frequency. For example, a 75 dB sound at 4kHz sounds equally loud to a 90 dB sound at 10 kHz, even though the latter is over 20 times the sound pressure.

Similarly, some sorts of complexity are much easier for humans to deal with than others. For example, humans are much better at learning languages compared to even simple mathematics. Even those who are "good at math" are objectively much better at languages, in terms of how much complexity they can absorb. Humans are also built to understand some
social dynamics and structures, even very complex and nuanced ones, without even consciously knowing the rules to them.

Some examples of things that are objectively quite simple but subjectively hard for people to learn:

- Pointers. Once you've properly learned them, it becomes hard to
  sympathize with your past self that found them difficult, but in
  practice these are a stumbling block for many people. Some think
  they're a "weed-out" concept, meaning they're just a good litmus test
  to see if you're the type of person who can learn how to program.
  Even if that's the case, it's still meaningful that they're effective
  in that.

- Recursion. Same as above. Notably, `while` loops do not evoke the
  same reactions in people.

- Monads. A little more complicated than the above, but objectively not
  that complicated. Certainly much less complicated than the C++
  standard library, but for some reason many people fail to learn monads
  after giving it an honest attempt, while that's rarely the case for
  the C++ standard library.

- Math in general. The ideas in mathematics are generally pretty clean
  and small, which is why once you've learned a concept, it seems
  obvious in retrospect. The C++ standard library doesn't look much
  more obvious in retrospect than it does on first glance.

- Any language that induces a moment where you exclaim to yourself,
  "This is true programming! Everyone should program this way, it's so
  obviously better!". People say that often about Lisp, Haskell,
  Prolog, and Smalltalk. Nobody ever said that about C, Java,
  Javascript, or Python. And yet, which ones are easier to learn?
  Which ones are used in real life?

I've emphasized learning here, but the same principles apply to using a
tool after you've learned it.

When evaluating simplicity, presumption should be on the side of "what
everybody does when they have a choice" instead of "what's
mathematically simpler". Being mathematically simple is a point in your
favor, but the burden of proof still falls on you to argue that it will
be simpler to learn and use.

Adherence to this precept is difficult because you have to decide
whether an objectively simpler construction is in fact better. This
gives a framework for deciding the question.

> A19: Dualities must be faced head-on and analyzed differently at
> different layers.

A crucial point is that the question of simplicity depends on the facts
and circumstances of the case. In deeper layers of the system,
mathematical simplicity tends to pay greater dividends. If the features
of the base layer are not orthogonal, the interactions between them will
only grow more complex as you rise in the stack. If the base layer has
many moving parts, the number of moving parts can only increase as you
rise in the stack.

This isn't the only duality that depends on the layer of the stack.
The most important layering of the stack is between "systems" and
"applications", where "applications" are those pieces of code on which
no other application depends. Many answers that are correct in system
code are incorrect in application code, and vice versa. These precepts
are an attempt to describe principles that apply at all areas of code,
but they're much more important to follow in system code.

> A22: The Law of Leaky Abstractions is a lie; abstract airtightly.

The Law of Leaky Abstractions says that all non-trivial abstractions are
leaky. This is the sort of statement that most engineers will accept
immediately and most mathematicians would dismiss out-of-hand. In
mathematics, if an abstraction leaks, it's not simply an imperfect
abstraction, it's completely wrong and should be thrown away. So they
manage to create perfect abstractions. They don't always abstract what
you wanted to abstract, but at least they're perfect.

If mathematicians can do that, there's no reason programmers shouldn't
be able to do it as well. Sure, programmers have to deal with some
performance considerations that mathematicians can elide, but that's
rarely the reason abstractions leak. They leak most often because the
creators are lazy or sloppy. If your abstraction leaks, find a way to
either plug the leak or reframe the abstraction to incorporate the
"leak" in a coherent way. It's not a leak if it's part of the spec. I
call this "turning leaks into decorative fountains".

### Conceptual clarity

> A6: Represent your data as closely as possible to the essential
> structure of the problem.

There are times when you need to represent your data in an unnatural
format for performance reasons, but this is rare. When possible, keep
the structure and location of your data in as natural of a manner as
possible. For example, if a function can produce an integer or an
error, don't produce a negative number to indicate an error — use an
explicit tagged union.

An important part of this is to fit your data types to your data
skin-tightly. If your data types permit states that you intend to be
impossible, this is suboptimal. There are degrees of this (if you need
a number between 0 and 1000, a uint32 is probably fine even though it's
suboptimal), but it's important to strive for it.

As an example, if your program can't respond to requests until it
completes an initialization process to fill in some of its state, it's
tempting to make nullable all the parts of its state that are filled in
during the initialization process, then just check whether they're
nullable when you use them. This creates a complex set of representable
states of partial initialization, and any bugs in that area will be
difficult to track down. A better option is to create a "larval" stage
of your program that performs the initialization. If requests come in
during this larval stage, queue them up until it's done. When it finishes
initialization, it metamorphizes into the full program, where all the
fields in its state are not nullable. Then run through its queue of
pending requests. This more closely resembles the essential structure
of the problem.

> A8: When mating different paradigms, build one cleanly on top of the
> other.
>
> A9: Never misuse an abstraction.

An abstraction provides a set of tools to solve a problem. Use them in
the intended way. If this is awkward, consider that this may be the
wrong abstraction to use. If the impedance mismatch is large between the
paradigm that your program uses and the paradigm that you're mating it
with, consider building an explicit layer whose sole purpose is to
convert between the paradigms (see B5).

### Correctness

> A10: Correctness is more important than performance.
>
> A12: Correctness is more important than optimality.

Sometimes you devise a solution which is fast but slightly incorrect.
This is rarely a good idea. Especially at lower layers of the system,
incorrectness expands as it bubbles up.

Other times, you devise a solution which is correct, but you could
probably make it cheaper without sacrificing correctness. Sometimes
that's worth doing, other times it's not.

Finally, in some cases you find a solution that's "optimal"
performance-wise or simplicity-wise, but it doesn't quite handle every
situation correctly. Maybe in the real world there are genuine
exceptions, and the code is much faster or simpler if you don't handle
those exceptions. In these cases, it's more important to handle every
case correctly than to "snap" to the nearest elegant formulation.

> A11: Be simple and uncompromising in defining what's correct; go crazy
> with optimizations.

Nock is a great example of this. It contains the character of the
virtual machine, but its asymptotics are bad. Add jets to fix the
asymptotics.

Another example is the ACID nature of Arvo. Arvo is a pure
function f(logs) of its event log, so formally Arvo is just a
function run against an event log. A naive implementation has
very bad asymptotics; processing each new event is O(n) in the
number of historical events. Choose the function g(state,log)
such that f(logs ++ log) = g(f(logs),log). Then, as long as you
keep the state in memory, processing each new event is constant in
the number of previous events. This still requires O(n) restart
from disk, but you can also periodically (and non-blockingly)
write a checkpoint of the state to disk, so that restart from disk
is only linear in the number of events since the last checkpoint.

This pretty much says it all. Define what's correct in as simple of
terms as possible — this will make it easier to implement and reason
about. Then don't compromise on it.

> A13: If you don't completely understand your code and the semantics of
> all the code it depends on, your code is wrong.

It's impossible to build correct code on a foundation that you're unsure
of. This is different than the problem of building something with
strong guarantees on top of something with weak guarantees — for
example, delivery guarantees on top of an unreliable transport protocol.
In that case, you are sure of the underlying system, it's just that what
you're sure of is that you can't rely on it delivering packets in order
or at all. So, you formalize what you _are_ sure of, which is that it
will eventually get your packets through if you keep sending them
forever. And that's something you can build on.

This is another reason it's important to have simple and accurate
correctness claims. When somebody else relies on your code, they
will need to know what exactly you claim to provide. If you're
accurate, then they don't have to understand your code, only your
guarantees.

> A14: Deterministic beats heuristic.

Heuristics make it hard to give precise safety guarantees, so you should
only use them when you don't guarantee much.

> A17: Referential transparency is honesty and stability.

A claim of referential transparency is a very strong guarantee, so it's
very useful for any code built on top of it. That code doesn't need to
know anything about how you produce the value because it can't
negatively affect the rest of the system, and it's free to cache
indefinitely.

> A18: Responsibilities should be clearly separated.

A program should be responsible for its own guarantees, though it must
rely on other programs to maintain their guarantees. You should avoid
guarantees that unduly couple separate programs. Any guarantee that
references state in more than one program is suspect.

### State management

> A1: Data is better than code
>
> A15: Stateless is better than stateful.
>
> A16: Explicit state is better than implicit state.

Data is better than code, but code is better than state. If you must have state, state that is data is better than state that is code.

There are many reasons for this. The most basic one is that humans are better at dealing with nouns than verbs. This is true to such an extent that we subconsciously convert statements of the form "so-and-so does such-and-such" to "so-and-so is a such-and-such-er". It's more challenging to view someone as a composition of their internal motivations such that they'll act in a particular way. It's much easier to see them as simply "friend" or "enemy" or "socialist" or "evil capitalist".

Socially, the verb -> noun simplification is often problematic because it doesn't communicate the whole picture as accurately. It's an approximation that fails to capture important nuances. And that's because any nontrivial verb can't be understood in terms of a simple noun.

However, the practical implications of this insight are different in code. Socially, people are who they are, so the best we can do is learn to understand them better. In code, though, we have a
powerful tool: convert the verbs to actual nouns. We can take advantage of our innate ability to reason about nouns and use that to make code that can more easily be reasoned about.

Another way of looking at this is that data is easy to reason about. Code is hard to reason about, because it's much larger. Function types are known as "exponential types" because the number of possible functions between sets of size `m` and `n` is `n^m`. If there's global state of size `s`, this is even worse: `n^(m*s)`. The halting problem says that it's impossible in general to even determine if a piece of code will finish without running it.

A final way of seeing this is that it's easier to reason about things that don't change. Data doesn't change, so it's a stable foundation. Pure code changes based on its arguments. Impure code changes based on its arguments and state. Impure code that uses code stored in its state
nests this whole complexity within itself.

You can't, in general, update code in any way other than replacing it wholesale. This is not true of data, where to upgrade you just need a function from the old data type to the new data type.

Sending code over the wire is problematic, because it's either very large or depends directly on what the other person has on their local ship. If you depend on what's on their ship and you're wrong, you may get the wrong result. So you explicitly require certain dependencies, at certain versions, ... this way lies dependency hell. There are ways to tame this, but if you just used data in the first place, those problems wouldn't exist.

Of course, we can't always use data, precisely because it's smaller than code. And there are occasionally times when we could use either, but the code is actually easier to reason about than the data. All else equal, data > code > state of data > state of code.

A note on laziness: lazily defined data occupies a middle ground. It's harder to reason about than strict data, but you get a lot more guarantees with it. It's probably not worth using as your basic substrate, but it makes some things easy to reason about.

### CQRS/pubsub

> A2: Everything should be CQRS.
>
> A3: (Almost) Everything should be pubsub.
>
> A4: A subscriber shouldn't affect a publisher.
>
> A5: Communication between nodes should be communication between
> independent actors.

Fred Brooks pointed out that when you add people to an organization with `n` people, the number of interpersonal connections goes up with `n^2`. This is true of binary interpersonal connections, but if you allow groups of any subset of the people, then the number of total groups goes up with `2^n`.

The same is true of entities in a program. A program must speak to many other programs about many things. Occasionally it can treat all others the same, so that the number of things it needs to say is constant in `n`. Sometimes it needs to say something different to each person, making it linear in `n`. Other times, it has a set of things it can speak about, say `m`. Pubsub lets the complexity grow with `m` instead of `n`. This lets the total communications grow with `m * n` instead of `n^2`.

It's generally good to have more structure in how you communicate with other entities. If all you have is `send-message`, then you force each entity to define their norms around when messages are to be sent, and how to associate one message with another (eg a request to a response). This also gives the underlying system no visibility into the conversations.

In CQRS+pubsub, we get a number of useful guarantees to help us structure our conversations. We know that a command will have no response other than exactly one positive or negative acknowledgment. We know that to request any data, we must have an active subscription, and
we know that a subscription may be canceled at any time. We know that a subscriber's failure to process a subscription update can't break the publisher. We know that after the initial subscription update, any subscriber to a path will get the same updates as anyone else on that
path.

The underlying system can keep track of subscriptions, and can even cancel them automatically in certain circumstances (eg if the subscriber is on another ship and has stopped responding). This is like the nouns and verbs discussion above. Subscriptions are nouns, so we can reason about them better, and so can the underlying system. "Send a message" is a verb, so we have few guarantees about it.

From Dijkstra's "Go To Statement Considered Harmful", which may as well have been written about unstructured event passing:

> My second remark is that our intellectual powers are rather geared to
> master static relations and that our powers to visualize processes
> evolving in time are relatively poorly developed. For that reason we
> should do (as wise programmers aware of our limitations) our utmost to
> shorten the conceptual gap between the static program and the dynamic
> process, to make the correspondence between the program (spread out in
> text space) and the process (spread out in time) as trivial as
> possible.

In our case, we make the programs of both the publisher and subscriber simpler by writing in terms of well-known constructs like "subscribe" and "push subscription update". You need to know much less about your counterparty.

> A7: A client's representation of data should be as close as possible
> to that of the server.

This is a natural architecture given pubsub, but it's also worth pursuing in its own right. This blurs the distinction between client and server, which makes the client more full-featured.

It reduces communication to syncing, which means offline-mode is just a special case of sync latency, and all the local features are still usable.

It also tends to reduce centralization, since you're already used to operating on your own, and you have all the data required to do so. The "server" becomes a commodity, easily moved when desired. Git is a good example of this — central git servers are common, but they're also a commodity, so you're never locked into a particular hosting provider. This is possible because the data structures are exactly the same on the client as on the server.

> A23: Some cliches are repeated because they are true; others must be
> repeated because they are not.

Computer security is an industry built on cliches. An example of the first is "your security is only as strong as your weakest link."

An example of the second is "security through obscurity is ineffective". Security through obscurity is in fact the most effective form of security — if nobody cares about you, you will never be hacked. The problem is that you must remain obscure for it to work, and that's hard to explain to people in a precise way. It's effective at protecting precisely when there is nothing worth protecting. So, it's better (for them, their companies, and their users) to tell them a lie.

However, it's important for whoever's coming up with the cliches to understand the specifics of how they're untruthful. Some of these very precepts may fall under the category of "literally untrue but more useful than the truth".

![](https://media.urbit.org/site/posts/essays/discuss-03.jpg)

## B: Specific Design

There are some principles that aren't obviously better than the alternatives, but if you use them consistently you avoid a lot of issues. These are all examples of this.

> B1: Always ack a dupe; never ack an ack.
>
> It's okay to ack a nack as long as you never nack a nack.

This is a simple rule, and if you follow it you get various guarantees for free. For example, sending a message will always cause up to a constant number of additional messages to be sent by direct or indirect causality (other than application-level code), so you never have to worry about accidentally causing a loop.

Additionally, acking an ack can never take you from imperfect to perfect reliability. Urbit isn't big on heuristics for stuff that's visible to userspace (A14), so don't even go down that road.

Following this rule greatly reduces the architecture space for networks. This is very helpful in finding a good architecture.

> B2: Never construct or deconstruct a duct.

A duct is akin to a first-class call stack. Don't deconstruct that for the same reasons you shouldn't read your own call stack. If you read your own call stack, and do different things based on that, it breaks a lot of assumptions we have about messages. For example, we assume that a vane will handle a task the same way regardless if the initial IO event was a keystroke or a timer. Don't break that.

Similarly, don't construct these by hand. This would be like inserting other functions into your own call stack and then returning to them. Powerful, yes, but pretty much always a bad idea because it breaks our assumptions.

> B3: Route on wire before sign, never sign before wire.

When we send a message to another vane or app, we send it on a wire. When we get a response to that message, we should care first about the wire it was sent on.

It's tempting to shortcut that and route based on the type of response. Maybe you only call to `%iris` once in your app, so you feel like you can just route directly on that. But it doesn't scale, because that dimension is orthogonal to the true dimension you care about — which request this response corresponds to. This is essentially a violation of A6.

> B4: Only go from statically typed to dynamically typed if you must.

Consider the set `U` of all possible programs. Then consider "the program you want to write" to be a set `S` of programs that differ only in aspects you don't care about. For example, maybe one takes a little more time and one takes a little more memory, and maybe you don't care about that. This set has a generating "specification" — any program that meets that specification is in the set.

A type system or testing suite can guarantee that a program is in another set `T`. Obviously, both `S` and `T` are in `U`. Hopefully the intersection of `S` and `T` is non-empty — that is the set of programs which typecheck and meet your spec.

A perfect static type system can guarantee `T` is a subset of `S` — if it typechecks, then it works. Obviously, if you let `T := {}` (ie no program typechecks), then this is vacuously true. So you want `T` to be as large as possible while still being a subset of `S` — as many programs as possible typecheck without them being incorrect. But it can't make `T == S` — there will always be some programs that do the correct thing in practice, but the type checker can't prove that.

Dually, a perfect testing suite can guarantee that `S` is a subset of `T` — no correct program fails the tests. This is vacuously true if you have no tests, for then `T = U`. So you want `T` to be as small as possible while still being a superset of `S` — you don't want to reject valid programs if you can help it. But you can't make `T == S` — there will always be some programs that are invalid but pass your typechecks (at least, if your program requires a Turing machine).

(It is possible to create a static type system that has `S` subset `T` property described above for a testing suite — see Erlang's Dialyzerand [related work](http://user.it.uu.se/~tobiasl/publications/contracts.pdf).)

A dynamic type system tells you neither of these ahead of time. Instead, you end up with type errors at runtime. Errors at runtime must be handled at runtime, when the programmer is not present. Errors at compile time are handled at compile time, when the programmer is present.

There's a hybrid, which is "static type checks at run time". In other words, you load the code and run the type checks at run time. This is better than pure dynamic checking because as long as the code compiles, you get the guarantees of a static type system. But the later in the process that the code is compiled, or the more it's changed before compiling, the less guarantee you have that the type checker will pass. If a static type checker gives an error at a time when the programmer is not present (because it's run at runtime), that's worse than a dynamic type system — at least that would give it a chance of executing correctly!

> B5: Anything with business logic speaks one paradigm; anything that
> translates paradigms has no business logic.

Translating between paradigms with significant impedance mismatch is usually convoluted code. The state machines are often hard to see, and it tends to be quite cluttered.

You want your business logic to be as clean and short as possible. This way the interesting algorithms are laid bare.

> B6: Functionally enforced semantic rules are better security primitives
> than memory access restrictions.

Memory access restrictions are blunt tools. Blunt tools are nice in simple systems, and if all you have is nails, then a hammer is perfect. But in practice you punch all sorts of holes in these restrictions, because you need more granularity and flexibility.

Better to define rules in a more powerful language. This allows you to follow A6 and A8. It also lets you use all the correctness tools, like type systems, that you've developed for the rest of your code.

![](https://media.urbit.org/site/posts/essays/discuss-04.jpg)

### C: Attitude

Good code is the result of people approaching the act of engineering with the right attitude.

> C1: Code courageously.

If you avoid changing a section of code for fear of awakening the
demons therein, you are living in fear. If you stay in the
comfortable confines of the small section of the code you wrote or
know well, you will never write legendary code. All code was
written by humans and can be mastered by humans.

It's natural to feel fear of code; however, you must act as though
you are able to master and change any part of it. To code
courageously is to walk into any abyss, bring light, and make it
right.

The unix/internet stack is a giant ball of mud. It's so big that when you're standing on it, it looks like a bog, and it's not clear that there is a bottom to it. You know there must be, but it doesn't matter because you learned long ago that the best solution is to not dig too deep. Build a strong structure by spreading out your weight and using strong construction materials. If there's something useful deep in the mud, it's probably not worth diving in to pull it out. That's dangerous and prone to failure, and you know many people who have gotten stuck down there.

This is an appropriate reaction to the unix/internet stack. It's also self-perpetuating. The bog is filled — even _composed_ of — countless predecessors who did that same thing. If you ever find yourself on solid ground, protect that with your life. Learn how it works and how to use it well. Then build a strong structure on top of that. Don't let it decompose into a layer of mud.

Urbit is small enough that, while there's definitely some construction-related dirt and muck covering it, the solid metallic core is not very deep — not more than waist deep in most places. The feeling of always being in contact with the bottom is very different than flailing about in a bog.

This property is worth fighting for. It's the whole reason Urbit was written. New Urbit programmers are instinctively distrustful of anything below them and code defensively and fearfully. They must learn that it's all drastically simpler and more legible than they're used to. It's still hard, but you can actually make progress. To do so, you have to stand up straight, so you can get a firm footing on the ground. Keep your chin up and your shoulders back, and adopt the posture of a conqueror. When something doesn't work right, don't retreat into your shell of safety and control — fix it. The forces of chaos are always lurking, but their victory isn't inevitable. It's all on the line, so code with abandon.

> C2: No time for lazy people.

If there's clearly a right way to do something and a wrong way, do
it the right way. Coding requires incredible discipline. Always
follow conventions, and fire anyone who won't. Anything that can
be solved by discipline is not a real problem.

> "To him who knows to do good and does not do it, to him it is
> sin."

Preserving the property of solid ground requires perpetual discipline. Once lost, it's often impossible to reacquire. Don't compromise your standards.

Call people out when they're being lazy. And when someone calls you out, recognize it and fix it. Sometimes it's just a question on a code review — "why did you do it this way?" Upon reflection, you determine that you did it that way because you couldn't be bothered to do it right. Maybe that was a reasonable choice at the time you were coding so you wouldn't be distracted, but if it's been called out in a code review, now's the time to fix it, not make excuses.

> C3: When a smart person makes an obviously stupid suggestion, before
> responding take a full 60 seconds to envision how you would implement
> it and what the effects would be.

Once you've determined that someone understands a situation well, if they earnestly make a suggestion that you haven't thought of, or that you immediately dismissed as impractical, stop and consciously consider it. This is one of the best ways of countering the natural echo chamber
of your own mind.

This is also one of the best ways to build stuff correctly. Very often, you will be tempted to cut a corner, and someone will point out that it should be done correctly. You should consider why you immediately rejected it. Was it because you were afraid of the relevant piece of code? If so, you should learn more about that code to determine if it's actually a good idea. Did you reject it because you felt it would distract you from working on what you thought was more important?
Consider carefully whether this particular piece of technical debt is worth taking on. It's worth 60 seconds of thinking about how you could solve it correctly right now — often it would be quite easy to do correctly and you'd be paying interest on the incorrectness for a long time.

![](https://media.urbit.org/site/posts/essays/discuss-05.jpg)

### D: Theory

The eternal tension between theory and practice must not simply be acknowledged, but dealt with.

> D1: Academia is a succubus.

The results from academia are useful to take advantage of, but the process of academia is a deadly sin for a project as ambitious as Urbit.

Academia usually gets the right answer, but it's slow, and it often cycles through a large number of wrong answers before it gets to the right one. It's also unconcerned with many things that a real project must consider. For example, it's generally more concerned with mathematical simplicity than mechanical simplicity, contradicting A21.

> D3: Not being qualified to solve a problem is no reason not to solve it.
>
> D4: The best way to get the right answer is to try it the wrong way.
>
> D6: Everyone must regularly alternate between theory and practice.

One common failure mode for academia is to get bogged down in optimally solving a particular part of a problem such that it fails to solve the whole problem.

There's a sense of "if I don't know how to do it, I must discover the correct answer before I can do it". This will get you the right answer if it terminates, which is the sort of algorithm mathematicians like. Engineers like algorithms that do in fact terminate.

The fastest way to build a good system is to build it as well as you know how, then iterate on it. You have to be disciplined about actually iterating over time as you learn about the problem, but often the way to learn more about the problem is to move beyond it and work on adjacent
problems. Hindsight is 20/20, so get the problem in your rearview mirror as fast as possible. Then while you're driving somewhere else, you'll see what you should have done. Then turn around and go do it. This only works if you or someone else is willing to go back and fix it
(C2).

> D2: Never fear math.

You can spend years working on a problem that you're able to solve in a few days with the right theoretical grounding. There's no excuse for being ignorant of theory; or rather, being ignorant of theory is an excuse to learn it.

Many engineers fear theory the same way they fear a complex piece of code deep in the stack (C1). But they shouldn't, because theory is rarely muddy. The same characteristics that make theory impractical also make it clean and learnable. It's also pretty permanent, so a one-time investment will pay dividends for a long time.

Of course, if you look deep down, you may find laziness is what's keeping you from learning theory. If that's the case, you need to decide how much you want to design good software. Because there's no room for laziness (C2).

> D5: Practice tells you that things are good or bad; theory tells you why.

You can never tell whether a system is good or bad without using it (see discussion on A21). Theory has great explanatory power, but only limited exploratory power. The best it can do is point out areas of the idea maze you haven't explored and suggest correlations between
objective properties and your subjective judgment of the quality of the system.

However, that explanatory power is indeed powerful, and the exploratory suggestions are often able to break you out of a rut (attractor basin). Respect the tension.

![](https://media.urbit.org/site/posts/essays/discuss-06.jpg)

### E: Text Style

Code form matters. Code that is hard to read is hard to maintain. Code that is inconsistently formatted is hard to read, but consistency isn't the end of the story. Some formats are simply hard to read.

Formatting also isn't the end of the story. Naming and commenting conventions are even more important to clarity. The human brain is quite good at taking stuff that's in an unexpected form and interpreting it.

This is why the diversity of accents and handwriting rarely causes issues, while the diversity of languages requires specialized translators. For someone used to typing on a QWERTY keyboard, it takes some time to get used to typing on a Dvorak keyboard because you have to rewrite your muscle memory. But it's nothing like how hard it is to learn another language. Russian script is roughly as different from English script as Russian grammar is from English's, but it's drastically easier to learn to read, handwrite, and type Cyrillic than it is to learn Russian grammar.

So, uniformity of style is good, but it's not sufficient. The style must be readily readable and writable.

### Formatting

> E1: No code should extend beyond 80 characters, most within 55.

Very wide code is unreadable. Even before you get to the readability threshold, it's useful to keep your code relatively narrow. Too narrow of code, on the other hand, results in too tall of code. What these two have in common is that they make it hard to navigate the code.

Code navigability is the ability to find the part of the code you're looking for. This has several inputs:

- how far away is what you're looking for?
- how many distinct places in the code can you have on screen?
- how much code can you have on screen?
- how fast can you recognize that you're in the correct place?

Some of these are strongly affected by workflows. We can't force a developer to have an effective workflow, but we can support those who do. If your workflow is deficient in one of these areas, consider improving it.

One of the primary inputs to code navigability is how much of it you can have on your screen. Code that is too wide limits the number of columns of code. Some people keep only one column on their screen, so they don't see a problem with long lines of code. The most efficient navigation is to already be there (i.e. to only have to move your eyes). If you only have one column of code open, you can only be in one place, which eliminates the best form of navigation.

Dually, code that is too narrow limits the number of lines you can have on a screen (this isn't a separate precept simply because we've never had to tell someone to write _wider_ code). This suggests there is some happy medium. This is dependent on the language, but in Hoon we've
found that up to 55 columns is a pretty good number for most code. However, there are plenty of legitimate reasons to go a bit longer than that. 70 columns is rare, but not surprising. There is essentially never a reason to extend beyond 80 columns.

> E2: Tabs aren't real.

Code is a text file, and text files are WYSIWYG. The reader should view the file exactly the same as the author wrote it. This is a low-overhead way of avoiding editor-dependence in code, which is as bad as browser-dependence in javascript. Sure, tabs aren't as big a deal as the hell that front-end devs have to deal with, but there's no reason to give an inch to the forces of platform-dependence.

Some argue in favor of "customization". Customization is inconsistency.
There can be good reason for inconsistency in some areas, but not in
code formatting, which is such an intensely communicative action.

> E3: A text file is a series of lines, each ending with a newline

      character.

There are several competing definitions of text files, but most commonly-used software uses this one. It's simple and consistent.

Its disadvantage relative to "a text files is a series of characters, possibly including newlines" is that there are some arrangements of characters that are not valid text files (ie non-empty and not ending in a newline). However, some series of characters were already not valid
in a text file — eg those including control characters or other nonrepresentable characters.

In return, we get the advantage that we can treat a text file as having a more complex and useful structure — a list of lists of characters, rather than simply a list of characters.

These are theoretical concerns — the real answer is that it's the way it's always been done, and deviating from that without a good reason is asking for trouble.

### Names and comments

> E4: One block comment is better than interleaved comments on every line.

Interleaved comments are easy to write because you can just paraphrase the code. This is also why they're generally useless. In the micro, code should always be immediately understandable. In the macro, it's often helpful to give context as to the purpose or constraints of the function. Sometimes it's good to even give the algorithm line-by-line in pseudocode, but mixing the pseudocode with the real code obfuscates both.

> E5: Don't name anything you don't have to.

> E6: If it's the same thing, give it the same name.

It is often said that there are two hard things in computer science: cache invalidation and naming things. This is a good aphorism. As often, someone will respond with "There are two hard things in CS: cache invalidation, naming things, and off-by-one errors". This is a weak
joke because off-by-one errors are not hard at all. They're mostly a matter of discipline, and there's a couple of conventions that help. If you're looping on a zero-indexed variable, use `i < num_loops`. If you're looping on a one-indexed variable, use `i <= num_loops`.

However, cache invalidation and naming things are genuinely hard because they must be solved ad hoc. There is no one-size-fits-all cache invalidation strategy, and possibly there never will be. Similar for naming. So you must actually comprehend and work within each individual
context.

You shouldn't solve hard problems if you don't need to, so don't name anything you don't have to. Giving unique names to things is tiring, and it reduces readability. A consistent pattern for naming things makes it easy to keep track of what is what and reduces the number of
decisions you must make.

Examples:

- If the only difference between three things is that they're not the
  same, consider naming them `thing-1`, `thing-2`, and `thing-3`.

- Use agglutinative morphology. If `a` is to `b` as `c` is to `d`, then
  find an affix which describes this distinction (say `-suf`) and rename
  them to `a`, `a-suf`, `c`, and `c-suf`.

- A corollary of the above is that if one variable represents the "same"
  thing with a different type, that type should be the morpheme added.
  For example, if `a-set` is a set, then `~(tap in a)` should be called
  `a-list`.

- Don't abbreviate (E8) — everyone abbreviates differently, and bits are
  cheap. If it takes you a long time to type the name, consider (1)
  finding a more succinct name (good any time you can do it), (2)
  becoming a faster typer, or (3) learning autocomplete tools, such as
  snippets.

- Especially don't abbreviate or otherwise change the word when adding
  affixes. Inflectional morphology is bad in such an ad hoc context as
  code.

> E7: Humans are good at memorizing.

We're really good at memorizing sets of things, like runes. We're also good at inferring structure from patterns. We're bad at memorizing structure in apparently unrelated names, though, and once we see a pattern, we assume it's densely populated.

So don't be afraid to use new names for new concepts. If concepts are siblings, they needn't necessarily have a direct connection in their name, but if they're hierarchical, then something should suggest that. This can be syntactic or semantic.

![](https://media.urbit.org/site/posts/essays/discuss-07.jpg)

### F: Real Software

Not all software matters. Or at least, not all software comes within
the scope of "Urbit". Urbit cares about "Martian software".

> F9: Timeless software is good software.

There's different sorts of software. A lot of software is inherently ephemeral, and can really only be run in one place. A SAAS company runs bespoke software on a particular set of servers, and that software has no future. It will never be run on anyone else's servers, and it will eventually stop being run even there. It won't even have any direct descendents. It's a genetic dead end.

However, not all software is this way. Urbit is interested in software that can live forever. This is what we call "real" software.

This is the most important passage in all that has ever been written
about Urbit:

> What is Martian code actually like? There are two possibilities.
>
> One: since Earth code is fifty years old, and Martian code is fifty
> million years old, Martian code has been evolving into a big ball of mud
> for a million times longer than Earth software. (And two million times
> longer than Windows.)
>
> This hypothesis strikes me as possible, but implausible. Since the _big
> ball of mud_ expands indefinitely, Martian code would therefore be so
> large and horrible that, despite its underground installed base, the
> server room bulged into space like a termite mound, intercepting
> low-flying asteroids and stinking up the solar system all the way to
> Pluto. Our latest space telescopes would surely have detected this
> abominable structure - if not, in fact, collided with it.
>
> Two: therefore, at some point in Martian history, some abject fsck of a
> Martian code-monkey must have said: _fsck_ this entire fscking ball of
> mud. For _lo_, its defects cannot be summarized; for they exceed the
> global supply of bullet points; for numerous as the fishes in the sea,
> like the fishes in the sea they fsck, making more little fscking fishes.
> For lo, it is _fscked_, and a big ball of mud. And there is only one thing
> to do with it: _obliterate_ the trunk, _fire_ the developers, and hire a
> whole new fscking _army_ of Martian code-monkeys to rewrite the _entire
> fscking thing_.
>
> This is such an obvious and essential response to the _big ball of mud_
> pattern that, despite the fact that we know nothing about Mars, we can
> deduce that it must have happened on Mars. Probably several times.
> Probably several hundred. For each of these attempts but the last, of
> course, the result was either (a) abject failure, (b) another _big ball
> of mud_, or (c) both.
>
> But the last, by definition, succeeded. This is the crucial inference we
> can draw about Mars: since the Martians had 50 million years to try, in
> the end they must have succeeded. The result: Martian code, as we know
> it today. Not enormous and horrible — _tiny and diamond-perfect_.
> Moreover, because it is tiny and diamond-perfect, it is perfectly stable
> and never changes or decays. It neither is a _big ball of mud_, nor tends
> to become one. It has achieved its final, permanent and excellent state.

We don't know that Urbit will achieve this final form, but Urbit is an attempt to make progress in that direction. Any software that isn't a candidate for "tiny and diamond-perfect" is either a prototype or scaffolding.

Here's some characteristics of real software:

> F1: If it's not deterministic, it isn't real.

If you do the same thing twice, your computer should react the same way. This is comforting. This is also what makes it easy to reason about and use effectively. If you're not sure what your computer will do, you'll be afraid of it and act defensively toward it. This inevitably leads to a big ball of mud.

Diamonds are extremely hard, and they wear very slowly. A diamond surface will support you every time; a mud surface will shift out from under you exactly when you put weight on it.

> F2: If it's centralized, it isn't real.

Code that depends on a central authority or has a single point of failure is fundamentally brittle. No authority lasts forever, no company lasts forever, no server lasts forever. Under certain
circumstances, bones and the like can be preserved for a long time — but not alive. The remains of buildings sometimes last for thousands of years, but the cities are gone.

The only things that last forever in their useful form are big hunks of rock (like the pyramids at Giza) and ideas, through writing and transcription. So, if you depend on the sun existing, this is
acceptable. If you depend on a piece of source code to be kept forever, copied and re-copied, you're fine. If you depend on a 20-year-old company existing and being easily accessible, this is brittle.

Another way to look at this is to say that anything that wouldn't work on a spaceship is architecturally flawed. Maybe it requires many sequential round-trips to a central server because it doesn't have all the relevant information. See discussion of A7.

> F3: If it's owned by someone else, it isn't yours.
>
> F4: If it's managed by someone else and you can't change who that is, it
> isn't yours.
>
> F5: If it's not yours, it isn't permanent.
>
> F6: If it's not permanent, it isn't real.

Nobody is as aligned with your values as you are. If you don't control the software, then you can't guarantee you'll always have access to it. Whoever does control the software may destroy it, move away, or simply revoke your access to it.

Control has some nuance. If it's physically controlled by a company and you can't get your data and the software that makes it useful, you definitely don't have control. If you have physical control of it, you do have control. But if you're hosting the data and software on a commodity cloud server, you still mostly have control of it. Your privacy has been reduced, sure. However, as long as you keep regular backups of the data and software, if the hosting provider disappears you just need to find another host, or host it yourself. Any particular host is likely to disappear, but the situation where _every_ host disappears and you can't even host it yourself is much less likely. Brands are mortal, commodities are not.

Some branded hosts allow you to download a zip file of your data. This gives you a little more control over your data, but it's much closer to "no control" than "total control". This is because your online world is data plus code, and without the code that makes it useful, data is only good for scrapbooking. The scrapbook will remind you of the good old days, but you won't be able to live them again.

> F16: Sovereignty necessitates understanding.

Not everyone cares to understand the software they're using. But if you want to compute sovereignly, you must understand what your computer is doing. If it regularly surprises you, you're not in control of it. You must tame it. The current paradigm is a wild monster which cannot be tamed by mere humans — only megacorporations even attempt to do so, and it's always temporary. So, your software needs to be simple enough that it can be understood.

> F10: System modules should be designed to be frozen permanently;
> conversely, Urbit consists of that system software which admits of a
> Kelvin version.

"Kelvin versioning" is a versioning scheme where your current version is a natural number, and new versions count down. Once you hit version 0, no more changes should be necessary.

This is the opposite of the usual way of developing software, where there is no defined endpoint. This paradigm suggests that you're building something specific. Most current software builds higher and higher in a vain attempt to reach the heavens, until all available effort is expended just to keep this tower from falling over. Kelvin versioned software cuts away until you reach a strong bedrock. Not every piece of software should have a Kelvin version, but infrastructure should.

> F11: The two procedures for achieving timelessness are distillation and
> generalization.

When building a timeless system, you start by building whatever you need to make it work. Then as you continue on, you may find some of the features are no longer necessary. Often, they're only needed when you're using them for user-facing work, but you've already moved on to building user-facing stuff somewhere else. You don't need the niceties anymore, so you should remove them.

Other times, you find that you want something similar to a feature you already have, but not exactly the same. When this happens often enough with the same feature, you may discover what is the essential nature of the feature and what are simply ornaments of the original use of the feature. Then, you can generalize the feature so that each of the desired use cases is well served.

> F13: That which cannot be Kelvin-versioned should update fluidly and
> automatically.

Not everything should be Kelvin versioned. Much user-facing code is in a continual process of discovery, and it must react to changing userbases and their needs. These should update without user interaction. You should be able to turn off your ship for years at a time, then turn it back on. After a few minutes or hours of catching up, you should be ready to go.

This means you need upgrade paths to be permanent, and they must not lose information. Anything that stops being able to upgrade is not permanent, since it will succumb to bit rot.

> F14: Humans are interactive and temporal; technology is permanent and
> exhaustive.

This is why the software humans touch directly should not be Kelvin
versioned but the infrastructure that makes it work should be.

> F7: The way it is isn't always the way it ought to be.

You should presume that there's a good reason for why things are done a certain way because what works best tends to win in a market in the long term, but markets are rarely efficient. Markets become more efficient over time, if they become more liquid, and as they become larger. Software is young, the cost of switching technologies is often large, and the space of software paradigms yet to be explored dwarfs those we've exhausted. So don't be surprised if you find ways to improve the situation drastically.

> F8: The way it ought to be isn't always the way it is.

On the other hand, sometimes the elegant solution just isn't right. The ultimate test of the quality of software is whether it's useful to humans. Humans don't fit nice equations, so the timeless truths of mathematics are often mismatched with human convenience. Never sacrifice real utility for the sake of making the code more elegant.

> F12: Standardization is better than perfection.

Coordination problems are some of the most difficult. When given a choice between compatibility and improvement, carefully consider whether the problem solved by the improvement is weightier than the problem caused by the incompatibility.

> F15: Communities are autonomous.

This is both a positive statement and a normative one. Communities are in fact a thing separate from their platform, but sometimes changes in the platform can kill them. That's bad. It's slightly different from freedom of association, since that's a freedom that applies to individuals, not the communities themselves.

Communities are the basic building blocks of society. We are each a member of some number of communities, and most power is held by these communities. Some communities coincide with family ties, some with common goals, beliefs, or interests. Some may be freely joined by just showing up — others are nearly impossible to join without having been born into them.

Throughout civilization society has had many forms. Governments have ranged from police states to feudal societies to democracies to informal tribes of people. In each of these, the fundamental unit is the community. Humans don't live on their own, and they don't live in one
universal society. They are a part of some communities and not of others.

Technology shouldn't force us into a single global community. Discoverability isn't an unmitigated good. Most communities should be closed off from each other — that's what makes them a community. This allows them to develop their own ideas and norms. These bleed into
other communities and may spread if they provide some benefit.

Many technologies today combine us into a single community, or at least a single set of norms. If many communities are hosted by a single entity, there will be pressure from some of those communities toward the entity to pressure other communities to follow certain of their norms.
This crosstalk isn't all bad, but there must be an equilibrium. All too often the lines between the communities are so permeable as to be inconsequential. In this case, the communities will converge in a single large community, at the cost of the memetic diversity of the original communities.

Technology should mirror human interaction, and humans interact in communities.
