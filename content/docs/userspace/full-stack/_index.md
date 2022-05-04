+++
title = "Full-Stack Walkthrough"
weight = 10
sort_by = "weight"
template = "sections/docs/chapters.html"
insert_anchor_links = "right"
+++

#### [1. Introduction](/docs/userspace/gall-2/1-intro)

An overview of the guide and table of contents.

#### [2. Types](/docs/userspace/gall-2/2-types)

Creating the `/sur` structure file for our `%journal` agent.

#### [3. Agent](/docs/userspace/gall-2/3-agent)

Creating the `%journal` agent itself.

#### [4. JSON](/docs/userspace/gall-2/5-json)

Writing a library to convert between our agent's marks and JSON. This lets our
React front-end poke our agent, and our agent send updates back to it.

#### [5. Marks](/docs/userspace/gall-2/4-marks)

Creating the mark files for the pokes our agent takes and updates it sends out.

#### [6. Eyre](/docs/userspace/gall-2/6-eyre)

A brief overview of how the webserver vane Eyre works.

#### [7. React App Setup](/docs/userspace/gall-2/7-react-setup)

Creating a new React app, installing the required packages, and setting up some
basic things for our front-end.

#### [8. React App Logic](/docs/userspace/gall-2/8-http-api)

Analysing the core logic of our React app, with particular focus on using
methods of the `Urbit` class from `@urbit/http-api` to communicate with our
agent.

#### [9. Desk and Glob](/docs/userspace/gall-2/9-web-scries)

Building and "globbing" our front-end, and putting together a desk for
distribution.

#### [10. Summary](/docs/userspace/gall-2/10-final)

Some final comments and additional resources.
