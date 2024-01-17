+++
title = "Urbit HTTP Interface — Java Edition"
date = "2020-10-19"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Core Dev" ]

[extra]
image = ""
description = "This proposal seeks to implement an HTTP interface to an Urbit instance in Java, and also seeks to build various related tooling."
reward = "3 stars"
assignee = ["~sipfyn-pidmex"]
id = "288224550"
completed = false
canceled = true
link = ""
+++

# Urbit Interface — Java Edition

This proposal seeks to create an API to interact with an Urbit ship over HTTP written in Java.

One benefit of a Java implementation would be that any JVM languages (Clojure, Kotlin, etc.) that support the use of Java libraries can also make use of it.

## Outline

This comprises three parts:

1. **Basic HTTP Interface** - Responsible for sending and receiving JSON to/from an Urbit ship

2. **Graph Store Interface** - Interface to the `graph-store` Urbit API on top of the HTTP Interface

3. **Additional Agent Interfaces** - Interface to the `group-store` and `metadata-store` Gall agents

In addition, we will seek to document the code throughout the evolution of the proposal, providing READMEs along the way.

## Plan

1. Study existing implementations and documentation
2. Create smallest initial working product for each milestone
3. Test it out with more experienced Urbit developers
4. Finalize and write documentation

Qualifications:

I'm qualified to implement this because I am experienced with Java. I have used Java for 3+ years, written robotics code using Java, and have experience using the Gradle build system.

My github profile is at https://github.com/ynx0, where I have written software projects in other languages, such as a parser/interpreter combo for a fantasy assembly language.

## Milestones

### Basic HTTP Interface

1 stars
Implementation of the HTTP Interface responsible for sending and receiving JSON to/from an Urbit ship

### Graph Store Interface

1 stars
Implementation of the interface to `graph-store`, which sits on top of the HTTP Interface

### Additional Agent Interfaces

1 stars
Implementation of the `group-store` and `metadata-store` Gall agents
