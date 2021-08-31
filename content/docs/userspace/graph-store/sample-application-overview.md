+++
title = "Sample Application: Library"
weight = 4
sort_by = "weight"
template = "doc.html"
insert_anchor_links = "right"
+++



Library is a sample social media application in which you can create a collection of books, called a library, which can contain any number of books. 
You can share individual collections per-ship. The creator of the collection has de-facto admin powers; he is the only one who can add or remove books to/from the library, 
remove the library itself, and add comments or remove anyone's comments. Guest ships may request access to specific libraries, which if granted, 
allows them to request any book from the library.

Using this application, you can:

-   Create libraries, where a library is a collection of books
-   Add and remove books from a library, if you are the owner
-   Allow others to view your library based on various permissioning schemes (policies)
-   Add and remove comments from a library, if you are the owner or were granted access

## Prerequisites

This overview is a companion document to the *Library* application, and assumes you are familiar with `%graph-store`. Before continuing, **you must familiarize yourself with the sample application**, which can be found [here](https://github.com/ynx0/library). See the [detailed usage guide](https://github.com/ynx0/library/blob/master/README.md) for download and installation instructions.


## Project Structure

Here is the directory structure of our app.
```
├── app
│   └── library-proxy.hoon
├── lib
│   └── library.hoon
├── mar
│   ├── graph
│   │   └── validator
│   │       └── library.hoon
│   └── library
│       ├── action.hoon
│       ├── command.hoon
│       └── response.hoon
├── sur
│   └── library.hoon
└── install.sh
```

- The main code of the application lives in [`app/library-proxy.hoon`](https://github.com/ynx0/library/blob/master/app/library-proxy.hoon). This contains the gall agent which proxies the `%graph-store` updates between ships.

- [`lib/library.hoon`](https://github.com/ynx0/library/blob/master/lib/library.hoon) contains miscellaneous helper arms which the proxy uses extensively. It mainly contains arms that construct different `%graph-store` updates various actions that a user performed.

- The `mar/library` folder contains the definitions of the pokes that `%library-proxy` uses.

- Contained in [`mar/graph/validator/library.hoon`](https://github.com/ynx0/library/blob/master/mar/graph/validator/library.hoon) is the definition of the validation logic that `%graph-store` uses to enforce the schema of the library applications graph data.

- [`sur/library.hoon`](https://github.com/ynx0/library/blob/master/sur/library.hoon) contains all the various type definitions used by `%library-store`.

- [`install.sh`](https://github.com/ynx0/library/blob/master/install.sh) is a script that automates copying the source files into a ship's pier / home desk.


## Implementation Summary

The project contains a custom `%graph-store` validator tht specifies the application's schema and a custom gall agent, called `%library-proxy`, which sends `%graph-store` updates between the host ship and subscribers.
The gall agent also generates `%graph-store` updates based on commands and actions that a user issues. Commands can only be issued to a proxy by the ship owner, 
while actions can be issued by any ship, but may fail based on permissions. A host ship's `%library-proxy` talks to the subscriber ship's `%library-proxy` through the normal gall app channels (pokes/peeks) 
to send them any updates that have taken place on the library graph. It is the host's responsibility to forward all relevant updates to subscribers 
(kept track of in a data structure defined [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/sur/library.hoon#L14-L15)),
while subscribers must only trust graph updates that it receives from the owner of that resource.

Here are the proxy's responsibilities:

-   **Application-specific API** - presents an interface for a user to interact with both his/her own library proxy and others' by directly defining and implementing a user-facing API as pokes and scries, 
    as opposed to forcing the user to deal with the graph-store API directly. The `command`/`action`/`response` poke types are defined [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/sur/library.hoon#L17-L42),
    while the scries are defined [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L132).
-   **Graph store update creation** - creates the appropriate graph update for a given user-facing action
-   **Graph store update proxying** - handles the networking and subscription logic required to send graph store updates between host and subscriber
-   **Access control** - allows or denies ships access to libraries, checks for proper permissions before processing a `command` or `action`

## Interaction with `%graph-store`

There are a couple of ways that our application uses and interacts with `%graph-store`.
Firstly, the app subscribes to `%graph-store` in `+on-init` on path `/updates`, meaning it will be notified of every single `graph-update` that occurs on the local ship. (*Recall the type of `graph-update`, defined [here](https://github.com/urbit/urbit/blob/ceed4b78d068d7cb70350b3cd04e7525df1c7e2d/pkg/arvo/sur/graph-store.hoon#L29), the reference for which can be found [here](https://urbit.org/docs/userspace/graph-store/data-structure-overview/#update-part-1)*). We also define a validator for our application that `%graph-store` uses for every *Library* graph. Since `%graph-store` registers all validators under the path `%/graph/validator/<name of app>/hoon`, we don't have to do anything special to register our validator. We just need to correctly name our file, and provide an `+graph-indexed-post` arm which should perform all schema validation.

### Synchronizing Graphs Between Ships

An owner is responsible for forwarding any updates to clients. Whenever the `%library-proxy` gall agent receives an update from it's local `%graph-store`, it checks to see whether it's for a graph it owns or not. If it's not, we skip sending out updates since we don't own the resource\*. If it is, then we generate cards to poke each subscriber with that same `graph-update`. This logic occurs within the agent's `+on-watch` arm, with the logic residing in the `handle-outgoing-graph-update` arm, found [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L345).

On the receiving end, since we know that we are not the source of the `graph-update`, we handle the update in the `handle-incoming-graph-store` helper arm, which makes sure to only process and forward graph store updates to local graph store that are sent by the owner, and no one else. Once it passes this permissions check, it is poked into the local graph like any other graph-update.

\**One could imagine a gossip style protocol where the data is like a fact so it doesn't matter where it came from, but in this app the library host is defined as the source of truth.*

## Data Model

There are two main application-side data structures that we define.
The first type is [`book`](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/sur/library.hoon#L4-L9) which contains a title and an isbn.
The second type is a [`comment`](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/sur/library.hoon#L3), which is just a simple string of text,
meant to represent a comment on any given book.

### Representing Data using `%graph-store`

The data types we defined for our application do not fit within `%graph-store` out of the box. `%graph-store` doesn't allow arbitrarily typed data in a node's content field, so we create an ad-hoc representation that we can cleanly convert to and from our own data types and `%graph-store` types. 

Here is the conversion code: [(link)](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/lib/library.hoon#L12-L19)

```
++  make-meta-contents
  |=  [=book:library]
  ^-  (list content)
  ~[[%text title.book] [%text isbn.book]]
++  make-comment-contents
  |=  [comment-text=comment:library]
  ^-  (list content)
  ~[[%text comment-text]]
```

Each arm takes in either a `book` or a `comment`, our application specific data type, and spits out a `(list content)`, which is the type that a `node` uses to store its content.

### Organizing Data within `%graph-store`

We define 3 core structures:

-   **Library** - The fundamental data structure. A library is a graph that contains books
-   **Book** - A data structure that contains an entry of a given book's metadata (i.e. title and isbn) and any comments associated with it. It is represented by a top-level node within a library graph
-   **Comment** - A node that represents a user's comment on a given book. Represented as a child node of a book's comment container node.

We then define the layout of the data as follows:

* Library
    - Book
        + Metadata Revision Container
            * Specific Metadata Revision
        + Comments Container
            * Specific Comment

Every graph created with the `%graph-validator-library` is a *Library* graph, and thus it has the following characteristics:

-   Every Library graph represents a library, or a collection of books
-   Every top level node in a library represents a book and all related contents
-   Within a book there are always two structural nodes: a container node for metadata revisions, and a container node that holds all comments, modeling a comments section

To make things more concrete, let's look at an example of an actual graph.

(*For the sake of clarity, we have replaced each index with its representation in its original aura in following output.*)

```
[ p=[entity=~zod name=%library1]
    q
  [   p
    { [ key=~2021.6.27..14.18.57..b3dc
          val
        [   post
          [ %.y
              p
            [ author=~zod
              index=~[~2021.6.27..14.18.57..b3dc]
              time-sent=~2021.6.27..14.18.57..b3dc
              contents=~
              hash=~
              signatures={}
            ]
          ]
            children
          [ %graph
              p
            { [ key=%comments
                  val
                [   post
                  [ %.y
                      p
                    [ author=~zod
                      index=~[~2021.6.27..14.18.57..b3dc %comments]
                      time-sent=~2021.6.27..14.18.57..b3dc
                      contents=~
                      hash=~
                      signatures={}
                    ]
                  ]
                  children
                  [ %graph
                  	  p
                  	{ [ key=~2021.6.27..14.20.00.b5fc
                          val
                        [   post
                          [ %.y
                              p
                            [ author=~pub
                              index=~[~2021.6.27..14.18.57..b3dc %meta ~2021.6.27..14.20.00.b5fc]
                              time-sent=~2021.6.27..14.20.00.b5fc
                              contents=~[[%text text='dune is pretty good']]
                              hash=~
                              signatures={}
                            ]
                          ]
                          children=[%empty ~]
                        ]
                      ]
                  	}
                  ]
                ]
              ]
              [ key=%meta
                  val
                [   post
                  [ %.y
                      p
                    [ author=~zod
                      index=~[~2021.6.27..14.18.57..b3dc %meta]
                      time-sent=~2021.6.27..14.18.57..b3dc
                      contents=~
                      hash=~
                      signatures={}
                    ]
                  ]
                    children
                  [ %graph
                      p
                    { [ key=2
                          val
                        [   post
                          [ %.y
                              p
                            [ author=~zod
                              index=~[~2021.6.27..14.18.57..b3dc %meta 1]
                              time-sent=~2021.6.27..14.18.58..a4ed
                              contents=~[[%text text='Dune'] [%text text='0441172717']]
                              hash=~
                              signatures={}
                            ]
                          ]
                          children=[%empty ~]
                        ]
                      ]
                      [ key=1
                          val
                        [   post
                          [ %.y
                              p
                            [ author=~zod
                              index=~[~2021.6.27..14.18.57..b3dc %meta 1]
                              time-sent=~2021.6.27..14.18.57..b3dc
                              contents=~[[%text text='Dune......'] [%text text='0444444444']]
                              hash=~
                              signatures={}
                            ]
                          ]
                          children=[%empty ~]
                        ]
                      ]
                    }
                  ]
                ]
              ]
            }
          ]
        ]
      ]
    }
    q=[~ %graph-validator-library]
  ]
]
```

![](https://lh5.googleusercontent.com/UTCnXumWvuPpFtduxgzmxIR_vhn9N3SylJ9h-MoUjYWiCT4AZo4BXY1mWceu0iHcJjesWoBDzMVO9QYWbnqtsGWa4nt4GlIRAtiC2zSXLkDUEttTmlMDLS7XRZ7ZhJyEayaMMl2r)

* The above graph represents a library that has a single book, whose metadata is stored under the `%meta` revision container. The metadata associated with this specific book entry is currently with title: `"Dune"` and isbn `"0441172717"`. 
  The reason we have a revision container for the book metadata is so that in case someone makes an error, they may correct it. A potential frontend could then simply show the most recent version.
* Each comment is simply a node under a book's `%comment` node with a single `%text` content.
  We skipped revision containers for comments to keep schema simple, but you could imagine duplicating the same logic for comments as well.
* Every book node has an index the datetime of when it was created.
* Each structural node in a book has a constant index fragment, either `%meta` for the metadata revision container node,
  or `%comments` for the comments container node.
* Every comment has an index of the datetime of when it was posted.
* The metadata revisions are a single incrementing number starting from 1, so the initial metadata has a revision count of `1`, and a subsequent edit has a revision count of `2`, and so on.

### Schema Enforcement

Recall that when using `%graph-store`, all data that is to be added to a graph passes through our [custom validator](https://github.com/ynx0/library/blob/master/mar/graph/validator/library.hoon).
Take a moment to read through it and cross-check your understanding with the following summary.

**Validator logic summary**

-   None of the structural nodes require data, so we simply assert that their contents are empty
-   For a *Specific Comment Node*, a post with an index matching the structure `[@ %comments @ ~]`, we assert that `contents` only contains a single `%text` content.
    This choice is arbitrary but meant to keep the application simple and so that a potential frontend does not have to do complex rendering.
-   For a *Specific Metadata Revision*, a post with index matching the structure `[@ %meta @ ~]`, we first ensure that it's contents only contain two `%text` content instances.
    We then use two helper arms `+is-title-valid` and `+is-isbn-valid` to validate the two values. For us, any title value is accepted, while only strings with length 10 or 13 are valid ISBNs.
   (We don't do any true ISBN validation for simplicity's sake)

## Access Control

### Rules

There are explicit access control rules called `policy`s, (defined [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/sur/library.hoon#L45-L49))
which are set by the user per-library at the time of creation (stored [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L179)).
These specify who can or cannot gain access to a library.

Here's what `policy` looks like:
```
+$  policy
  $%  [%open ~]                      ::  any ship is allowed
      [%children ~]                  ::  any children (i.e. moons) are allowed
      [%whitelist ships=(set ship)]  ::  any ships in the provided set are allowed
  ==
```

There are also implicit rules, defined as follows:

For any given library that one owns,
- An owner can:
    + add a top level book node to any library
    + add a metadata revision to any book
    + add or remove any comment on any book
- A reader, that is, a another ship granted access to the library, can:
    + add a comment to any book that they have requested
    + remove any comment that they are the author of

Implicitly, all readers are given permission to get any book when granted access to the library.

### Implementation

- `policies` is a `(map @tas policy)`. That is, a map between the names of libraries that we own and what policy should be enforced on each one and is a part of the agent state (shown [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L13)).

- The `+is-allowed` arm, (found [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/lib/library.hoon#L21))
  implements each `policy`'s behavior, and is reproduced below.
  ```
  ++  is-allowed
    |=  [requester=ship host=ship =policy:library]
    ^-  ?
    ?:  =(requester host)  :: host is always allowed
      %.y
    ?-  -.policy
        %open       %.y
        %children   (team:title host requester)
        %whitelist  (~(has in ships.policy) requester)
    ==
  ```
  Given the host ship of a resource and the policy to be enforced for a resource, `+is-allowed` returns a boolean for whether or not a requesting ship should be  allowed access to that resource.


- `+is-allowed` is used in `+on-watch` [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L113), where it only allows a ship to subscribe to a library if it passes the permissions check.
- It is also used [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L299) and [here](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L310), so that when a ship wants to know about what libraries and books exist, only data they are allowed to see gets revealed to them.
- Some of the more ad-hoc/implicit permission rules are implemented at the following locations: [[1](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L318) [2](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L48) [3](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L256) [4](https://github.com/ynx0/library/blob/9104145bb24e8ec949a5e9685139665b07161dd6/app/library-proxy.hoon#L299)]

## Alternative Methods

There are a number of architectural decisions made in our application that may not be suitable for other projects.
Many decisions made such as the definition of the schema, the user-facing and inter-proxy API, and the permissioning model could be done differently.
For instance, many decisions in the schema and thus the validator were made to keep the schema simple. One could imagine allowing any content type and amount,
while right now it is restricted to a single text content, and stricter validation of or a custom for the ISBN.
The subscription model is also just one way to handle subscriptions and by no means the only one.
The permissioning scheme was also implemented relatively simple; it has some limitations, like the fact that you cannot change the permissions after creating the a library, or the fact that there are only 3 policy types.

### Comparison between `%library-proxy` and `%graph-push-hook`

`%library-proxy` performs the functions of both `%graph-push-hook` and `%graph-pull-hook`.
`%graph-pull-hook` is responsible for asking other `%graph-push-hook`s for graph data 
by trying to initiate a subscription on the host ship's `%graph-push-hook`, which the host only allows if they have permissions.
When it succeeds, `%graph-push-hook` then sends out all `graph-updates` to those subscribers who need to hear about it.
`%graph-pull-hook` then merges in graph updates it hears into the local `%graph-store`.
So far, all the functionality is in line with `%library-proxy`.

The two main places where the hooks differ is in their choice of permissioning model and subscription model.
To know whether a person is allowed to access a resource, pull hook uses checks to see whether they are a member of a group, while `%library-proxy` uses its own policy type.
For subscriptions, the hooks do it per-resource, (i.e. one subscription path per resource, many ships subscribe to that),
while library proxy incorporates both the resource and the ship in its path, making the subscription model per-resource per-ship.

In general, if your application's use case does not fall neatly with the permissioning and subscription model used by the hooks, you'll need to make your own proxy agent.
Otherwise, you will likely want to use the existing hooks and save yourself the trouble of reimplementing all of the functionality that they offer.
