+++
title = "Urbit React Cookbook"
date = "2021-04-09"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Provide concrete examples of React UI driven by @urbit/http-api to quickly start building on top of Urbit"
reward = "3 stars"
assignee = ["~witfyl-ravped"]
id = "1312404336"
completed = true
canceled = false
link = ""
+++

The React Cookbook will create a single source of best practices for Urbit development in React through a series of simple examples. The guide will focus on implementing the new @urbit/http-api library to interface with custom Gall apps as well as common calls to backend foundations, particularly graph-store.

The goal is to demonstrate the ease with which React can be used for the frontend of Urbit applications. While these tools are publicly available there isn’t a single source of concrete examples demonstrating their implementation. A common result is that developers spend a lot of time reading through Landscape code to reverse engineer the calls they want to make.

Surfacing the contact points between @urbit/http-api and Hoon reveals the simple mechanics of creating frontend applications that leverage Urbit’s abilities. Work on this proposal has already proved helpful by exposing bugs in @urbit/http-api when removed from its context in Landscape. Fixing these bugs has helped streamline the process of interacting with Hoon directly from React.

The first deliverable is a simple application demonstrating basic subscriptions, pokes, and threads to create groups, chats, add/remove users, and send and receive messages directly from a React interface. In doing so it teaches the fundamental skills required to build on top of Urbit as well as familiarizing the reader with the API’s structure, thereby helping them understand how to make other calls and leverage other data types the library offers. The second deliverable will be an example app that utilizes other social functions such as notebooks and collections.

The first two apps will be very simple and each contained in a single file to keep basic documentation in one place. As such, there will be opportunities for additional instructions such as setting up a React environment, a deeper dive into Hooks, and leveraging things like functional components and Context Provider to help with larger, more complex apps. The third deliverable is aimed to cover these points and address supplementary needs that Tlon identifies while reviewing the first two examples.

This guide is robust enough for a JavaScript beginner and of course more advanced developers can read from a more general perspective to grok the structure of these development techniques. While this serves Urbit by making it easy for general web developers to start building on Urbit without having to write Hoon, ideologically this guide is aligned and written with Hoon developers in mind.

## Milestones

### First Example App: Groups and Channels

1 stars
Covering Subscriptions, Pokes, Threads, and Scries to create groups/channels, manage members, and send messages. Delivered as a merged PR into the urbit.org documentation.

### Second Example App: Advanced Functions

1 stars
Notebooks, Collections, and advanced functions not covered in the first app such as parsing mentions and code snippets from channels. Delivered as a merged PR into the urbit.org documentation.

### Breakout Lessons

1 stars
React topics for more complex apps i.e. Context Provider and advanced Hooks. Adding examples Tlon would like to see documented. Delivered as a merged PR into the urbit.org documentation.
