+++
title = "Urbit Speech Recognition"
date = "2021-08-10"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev: Other"]
[extra]
image = ""
description = "Bring Automatic Speech Recognition to Urbit"
reward = "2 stars"
assignee = ["~hosted-fornet"]
grant_id = "P0040"
completed = true
canceled = false
link = ""
+++

## UrSR: Automatic Speech Recognition (ASR) for Urbit.

The company I work for, [Mod9 Technologies](https://mod9.com), has just released v1 of a product we call the [ASR Engine](https://hub.docker.com/r/mod9/asr). The Engine is a TCP server that takes JSON options and speech audio as input, and returns JSON-formatted transcripts as output.

Briefly, I want to build a Gall app, similar to the [Bitcoin Provider](https://urbit.org/grants/bitcoin-full-node-provider-and-wallet) or [LFS](https://urbit.org/grants/urbit-lfs-filehosting) projects, to provide ASR for ships on the Urbit network. I will also build a wrapper for the Engine (likely in Python or Golang) to intermediate between an Urbit airlock and the Engine (since Urbit doesn't speak TCP). To showcase the backend, I will build a proof-of-concept demo frontend, to stream audio from a client's microphone to the Gall app. Once the demo frontend has received transcripts in response, it will poke a graph on the client ship to post the transcripts to a chat there. As such, the backend along with the demo frontend could be used as a crude voice note-taking app on Urbit, where notes are stored in a chat graph.

I am imagining the final backend of this project to be a functional, but somewhat minimal, UrSR implementation. A client should be able to send properly formatted streaming audio and receive back a set of JSON-formatted transcripts. Ideally, I want to distribute the Terran portion as a Docker image, to allow providers to easily set up the ASR backend.

## Design Details

The Gall app will:

1. Accept pokes from some set of ships (perhaps using a whitelist).

2. Communicate with a Py/Golang wrapper for the ASR Engine (send options, audio; receive JSON transcripts; either directly or via a thread).

3. Relay JSON transcripts back to the requester (either directly or via a thread).

The Py/Golang wrapper for the ASR Engine will:

1. Communicate with the Gall app (receive options, audio [via HTTP?]; send JSON transcripts [via pub/sub?]).

2. Communicate with the ASR Engine (send options, audio; receive JSON transcripts [via TCP]).

The frontend demo will:

1. Have a field to input UrSR Provider @p.

2. Have a field to input a chat to dump transcripts to.

3. Have a button to start sending audio from microphone.

4. May directly display transcripts received from UrSR Provider.

I've attached a crude diagram outlining the architecture I am imagining. There are some unknowns because of my lack of knowledge, e.g., I'm not sure exactly how the Py/Golang middleman will talk to Urbit; my best guess (Urbit sends with HTTP and receives with pub/sub) is written in provisionally.

The hope is that this project will enable a wide variety of apps and frontends to have easy access to ASR. These apps and frontends would replace the demo frontend, I, in the attached diagram.

An important caveat that comes along with this proposal is related to the Mod9 ASR Engine licensing. It is not free or open source (e.g. see the [trial license](https://dev.mod9.io/licensing). The standard, non-trial license has not yet been made public. It is my understanding that the intent is to license roughly as follows. A licensee will be required to track and submit ~quarterly reports to Mod9 of the duration they have transcribed with the Engine in that time. If the duration transcribed is below some threshold (say, x hours per month), then the license is effectively free (say, $1/year). If above that threshold, then the terms are likely to be some cost per minute (e.g., Google Cloud Speech charges some fraction of a cent per minute transcribe -- Mod9 would be [somewhat cheaper](https://cloud.google.com/speech-to-text/pricing)).

My expectation is that usage of ASR on the Urbit network will remain low for some time such that providers should be within the "free" tier of pricing for the Engine. Hopefully, demand increases due to the development of applications using ASR. Then, my hope is that either the supply of ASR providers increases, and that a fee market develops, perhaps enabled by future work on lightning-on-Urbit, so that ASR providers are able to profitably provide ASR (or at least allay the costs of the license and CPU cycles).

## About Me

My education is in chemistry and physics. For the past year or so I've been working as a backend engineer at a small SF Bay Area startup whose main focus is ASR, also known as Speech To Text (STT). In that time I've contributed infrastructure, ML, and fundamental ASR projects to the company.

In addition, I've recently been working on an [Urbit apprenticeship](https://github.com/hosted-fornet/crunch) under the supervision of ~timluc-miptev.

## Milestones

### Milestone 1: Complete Backend Development

Estimated completion date: 30 Sep 2021

Payment: 1 Star

### Milestone 2: Complete Frontend Demo

Estimated completion date: 15 October 2021

Payment: 1 Star
