+++
title = "Create Vane Documentation"
date = 2021-03-01
[taxonomies]
grant_type = ["bounties"]
grant_category = ["Documentation"]
[extra]
image = ""
description = "Create vane documentation for clay, eyer, iris, jael, and behn"
reward = 5
assignee = "~tinnus-napbus"
id = ""
completed = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0025&prefill_Grant+Name=Create%20vane%20Documentation"
+++

## Overview

Creating and maintaining great documentation is an ongoing challenge for any project, ours included. The importance of documentation for Urbit is greater than most projects though, since so much of what we're doing is entirely novel.

This grant will have you work within the Urbit Foundation and Tlon to improve/create select portions of our documentation over the course of three months (April, May and June).

## Scope

The goal over these three months is to more fully document Arvo's vanes. At present, the documentation is sporadic: some vanes have good TODO:[explanation-style] () documentation, others have good TODO:[API References] ()—some even have both. In the case of `eyre` and `clay`, which are arguably two of the most important vanes, we have neither—the explanations are outdated and overly technical, and the API reference is missing, incomplete, and outdated.

Your task is to fill in the blanks and provide complete documentation that leaves the reader with an understanding of *how to use the vanes.* Understanding *how they work* is of secondary importance, so:

- Explanations should be high level and light-to-free of code. The explanation should also serve to provide an overview of what kinds of capabilities the vane has in the first place.
- API reference for each vane should be complete
- Usage guides for common tasks would be very helpful

Here's a sketch of what's probably needed for each vane in order of priority:

### 1) [clay](https://urbit.org/docs/arvo/clay/clay)

The clay documentation is generally out of date, and the explanations are overly geared at describing how the internals work over what the interface is and what you can do with it. Some of the explanatory material is actually pretty good (like the [Architecture](https://urbit.org/docs/arvo/clay/architecture/) doc), but much of it is too dense.

For clay we want:

* Proper API Reference documentation
* Guides for common tasks and capabilities
* Updated explanations of the key concepts and capabilities that [avoid becoming overly technical](https://urbit.org/docs/arvo/clay/local-reads/)

A contributor (~sovmep-ripsum) has recently been doing a lot of work on Clay and has offered to give you some direction on this, which will be helpful coming from the perspective of someone who's recently had to learn clay. He also wrote up some [notes](https://docs.google.com/document/d/10b5oC_Jcdq7Ex4iwf0mRjquEfolmUQvbs5YFJulsXa0/edit?ts=606cddf2) which you can use.

### 2) [eyre](https://urbit.org/docs/arvo/eyre/eyre/)

The eyre documentation is completely out of date and needs to be rewritten, particularly where the explanation is concerned. Fortunately, you're not starting from scratch with the API documentation, for which there's an [open PR](https://github.com/urbit/docs/pull/981) that needs to be brought through to completion.

For eyre we want:

* Complete API Reference documentation
* Guides for common tasks and capabilities
* Explanations of key concepts and capabilities

### 3) [iris](https://urbit.org/docs/arvo/iris/)

Iris has no explanation whatsoever, but does have an API reference. 

For iris we want:

* Explanations of key concepts and capabilities
* Guides for common tasks and capabilities

### 4) [jael](https://urbit.org/docs/arvo/jael)

Jael has no explanation whatsoever, but does have an API reference. 

For jael we want:

* Explanations of key concepts and capabilities
* Guides for common tasks and capabilities

### 5) [behn](https://urbit.org/docs/arvo/behn/behn/), [dill](https://urbit.org/docs/arvo/dill/dill), [ames](https://urbit.org/docs/arvo/ames/ames)

These vanes already have either minimal but viable explanations (behn, dill) or very good explanations (ames). They've all also got API Reference docs. None of them have usage guides that demonstrate how to work with the APIs though.

Adding more documentation to these vanes is lowest priority, but if you have ideas for contribution they'd be welcome. 

## Requirements/Resources

Work should be submitted as pull requests against the [docs](https://github.com/urbit/docs) repository, and is to be considered complete upon review and merge.

You'll work with the Director of urbit.org and the Tlon docs team regularly, and should expect to meet weekly or biweekly to check in and share progress. Access to Tlon's infrastructure engineers will be provided for whenever you have technical questions. 

## Compensation

We're targeting a three month period to complete the above, but may seek to extend the engagement. During this time, compensation is as follows:

* One star for completion of clay docs
* One star for completion of eyre docs
* One star for completion of iris and jael docs
* One star upon completion of all of the above docs
* One additional star awarded at the director's discretion for exemplary work
