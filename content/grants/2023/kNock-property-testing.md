+++

title = "kNock and Property Tests"
date = "2023-04-11"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Core Dev"]

[extra]
image = ""
description = "Executable Semantics of Nock in the K Framework, universal testing and verification"
reward = "7 Stars"
assignee = ["Runtime Verification, Inc."]
champion = ["~rovnys-ricfer"]
grant_id = "P0255"
completed = false
canceled = false

+++

# Property Testing for Hoon 

Hoon currently supports pure unit tests. The tests have no entropy and no inputs. This is of course useful. But functional languages have a history of using QuickCheck and similar frameworks for even more powerful tests. Property testing allows testing across a large input space. It relies on writing more general tests, where the programmer specifies properties of their program which should always hold, regardless of input. A typical example is, after writing a sort function, that the resulting list has the same length as the input list, that it is in fact sorted, and that sorting it again causes no changes. This should hold for any input list, and a QuickCheck-like framework will feed many, many different types of lists to the test to find ways it could break.

Apart from a test runner, QuickCheck-like frameworks also require an intelligent and modular input builder. For simple and common inputs – atoms, lists of atoms, and other simple data structures – the input builder should a) be able to generate inputs without any programmer effort, b) try progressively more interesting inputs, such as [], [0], [0 0], [1 0], [0 0 1] etc: starting small and going higher, and c) be able to shrink inputs from a failure: if the list [0 2 2 4 3] fails to sort correctly due to the algorithm picking the middle element as pivot in odd length list and discarding elements identical to the pivot, the shrinking should be able to try progressively smaller inputs until it finds something like [2 2 2] as an example.

## Future uses

The combination of kNock (https://github.com/runtimeverification/knock) and a property testing library means it's possible to move directly from testing to formal verification. This concept is even mentioned in the original QuickCheck paper (https://www.cs.tufts.edu/~nr/cs257/archive/john-hughes/quick.pdf) (Section 5.2). Runtime Verification has also developed a similar tool for Ethereum smart contracts, using the combination of an existing property testing library and a formal verification framework.

In 2022, Runtime Verification developed KEVM-Foundry. Foundry is a testing framework for Solidity: property tests are written in Solidity, compiled to EVM and executed in a fast implementation of the EVM written in Rust. This setup, with property tests written in the same language as the program being tested, allows us to leverage our K semantics (https://kframework.org/) of that language for proving. Property tests – which take randomized inputs and assert properties of programs using those inputs – can be seen as formal program specifications with symbolic inputs. In the case of KEVM-Foundry, we can run the tests directly in K with symbolic inputs.

Anecdotally, this has lead to higher quality code – formally specifying your code tends to have that effect – while also making formal verification a more tractable proportion: the human verifier can write correct specifications faster – working in Solidity is easier than writing K specifications directly and being able to fuzz the specifications means trivial specification errors are caught much faster. The same framework can also be used to quickly create execution traces built with the summarizer: simply assert something impossible and set the prover off trying to prove it, exploring all possible branches.

More info and demos: https://www.youtube.com/live/staXNgpBjEI?feature=share&t=10820

# Deliverables

We build, in Hoon, a property testing library. This could be added to the existing -test thread, by inspecting whether a test is a gate, and if so, generate a random sample for it; or the library could be added as a new thread. Reusing the existing thread and having the types of tests co-exist likely makes for the best user experience, compared to having different types of files for different types of tests. The suggested invocation (assuming it is baked into the -test thread) is:

`> -test <path> <entropy> ~`

For example:

`> -test /=landscape=/tests eny ~`

The explicit passing of entropy means a failing test is easy to replay with the exact same command (the printout of results will contain the entropy used). If no entropy is passed, 0 is used as entropy.

A property test is nothing more than a regular test which is a gate. Running it means generating a sample to the gate. Optionally, a test can have a generator which is responsible for generating its sample: this is necessary, for example, in order to generate arbitrarily large data structures such as trees. It's also useful in order to generate random values more intelligently than the default generator, which can help exercise edge cases. For example, Mitgaard found a 20 year old bug in the data structure Patricia trees by tweaking QuickCheck inputs to hit on otherwise extremely unlikely edge cases (https://janmidtgaard.dk/papers/Midtgaard%3aTFP17.pdf). There are several possible designs for generating arbitrary data -- using arms in the test with names starting in "gen-", specifying them along with the gate for the tests, etc. Which implementation is both easy to use in the default case and powerful in the hands of a power user is something that will require some interaction and community discussion.

## Deliverables for property testing in Hoon

Implement basic property testing: the user should be able to write a test arm as a gate using the existing test primitives (such as expect-eq, expect-fail), and the test runner should create random samples and repeatedly slam the gate.
Implement custom sample generation: the user should be able to specify a gate which produces custom inputs based on given entropy.
Implement sample re-generation, allowing the test to put restricting assumptions on the input. For example, an [@ud @ud] sample testing (sub a b) might require (lte b a), and the user should be able to specify this, rejecting any samples which don’t conform, reporting that inputs were discarded without the test failing.
Implement sample shrinking, trying to create the smallest possible failure example.
Write documentation for the urbit.org website.
Write an example property test suite, showing off the various capabilities of the test framework, for some relevant core functionality from the Hoon standard library.

# Timeline and Compensation

Timeline: 1-2 Months

Reward: 7 Stars

# Who we are

Runtime Verification, Inc. is a specialist in formal verification, auditing and security products for smart contracts and blockchains. We are the main developers and supporters of the K Framework which we are constantly optimizing and extending.

Rikard Hjort (~bithex-topnym) is an auditor and verification engineer at Runtime Verification. He’s an MSc in Computer Science from Chalmers University of Technology, the creator of kNock, a Hoon School finisher, and the host of the Urbit Berlin meetups.
