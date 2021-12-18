+++
title = "8. Subscriptions"
weight = 40
template = "doc.html"
+++

In this lesson we're going to look at subscriptions. Subscriptions are probably
the most complicated part of writing agents, so there's a fair bit to cover.
Before we get into the nitty-gritty details, we'll give a brief overview of
Gall's subscription mechanics.

The basic unit of subscriptions is the _path_. An agent will typically define a
number of subscription paths in its `on-watch` arm, and other agents (local or
remote) can subscribe to those paths. The agent will then send out updates
called `%fact`s on one or more of its paths, and _all_ subscribers of those
paths will receive them. An agent cannot send out updates to specific
subscribers, it can only target its paths. An agent can kick subscribers from
its paths, and subscribers can unsubscribe from any paths.

The subscription paths an agent defines can be simple and fixed like
`/foo/bar/baz`. They can also be dynamic, containing data of a particular atom
aura encoded in certain elements of the path. These paths can therefore be as
simple or complex as you need for your particular application.

Note it's not strictly necessary to define subscription paths explicitly. As
long as the arm doesn't crash, the subscription will succeed. In practice,
however, it's nearly always appropriate to define them explicitly and crash on
unrecognized paths.

For a deeper explanation of subscription mechanics in Arvo, you can refer to
Arvo's [Subscriptions](/docs/arvo/concepts/subscriptions) section.

## Incoming subscriptions

Subscription requests from other entities arrive in your agent's `on-watch` arm.
The `on-watch` arm takes the `path` to which they're subscribing, and produces a
`(quip card _this)`:

```hoon
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ...
```

Your agent's subscription paths would be defined in this arm, typically in a
wutlus (`?+`) expression or similar:

```hoon
?+    path  (on-watch:def path)
    [%updates ~]
  ......
  ......
    [%blah %blah ~]
  ......
  ......
    [%foo @ ~]
  =/  when=@da  (slav %da i.t.path)
  ......
  ......
    [%bar %baz *]
  ?+  t.t.path  (on-watch:def path)
    ~              .....
    [%abc %def ~]  .....
    [%blah ~]      .....
  ==
==
```

Subscription paths can be simple and fixed like the first two examples above:
`/updates` and `/blah/blah`. They can also contain "wildcard" elements, with an
atom of a particular aura encoded in an element of the `path`, as in the `[%foo @ ~]` example. The type pattern matcher is quite limited, so we just specify
such variable elements as `@`, and then decode them with something like `(slav %da i.t.path)` (for a `@da`), as in the example. The incoming `path` in this
example would look like `/foo/~2021.11.14..13.30.39..6b17`. For more information
on decoding atoms in strings, see the [Strings
Guide](/docs/hoon/guides/strings#decoding-from-text).

In the last case of `[%bar baz *]`, we're allowing a variable number of elements
in the path. First we check it's `/foo/bar/...something...`, and then we check
what the "something" is in another wutlus expression and handle it
appropriately. In this case, it could be `/foo/bar`, `/foo/bar/abc/def`, or
`/foo/bar/blah`. You could of course also have "wildcard" elements here too, so
there's not really a limit to the complexity of your subscription paths, or the
data that might be encoded therein.

Permissions can be checked as described in the previous lesson, comparing the
source `@p` of the request in `src.bowl` to `our.bowl` or any other logic you
find appropriate.

If a permission check fails, the path is not valid, or any other reason you want
to reject the subscription request, your agent can simply crash. The behavior
here is the same as with `on-poke` - Gall will send a `%watch-ack` card in
response, which is either an ack (positive acknowledgement) or a nack (negative
acknowledgement). The `(unit tang)` in the `%watch-ack` will be null if
processing succeeded, and non-null if it crashed, with a stack trace in the
`tang`. Like with `poke-ack`s, you don't need to explicitly send a
`%watch-ack` - Gall will do it automatically.

As well as sending a `%watch-ack`, Gall will also record the subscription in the
`sup` field of the `bowl`, if it succeeded. Then, when you send updates out to
subscribers of the `path` in question, the new subscriber will begin receiving
them as well.

Updates to subscribers would usually be sent from other arms, but there's one
special case for `on-watch` which is very useful. Normally updates can only be
sent to all subscribers of a particular path - you can't target a specific
subscriber. There's one exception to this: In `on-watch`, when there's a new
subscription, you can send a `%fact` back with an empty `(list path)`, and it'll
only go to the new subscriber. This is most useful when you want to give the
subscriber some initial state, which you otherwise couldn't do without sending
it to everyone. It might look something like this:

```hoon
:_  this
:~  [%give %fact ~ %todo-update !>(`update:todo`initial+tasks)]
==
```

## Sending updates to subscribers

Once your agent has subscribers, it's easy to send them out updates. All you
need to do is produce `card`s with `%fact`s in them:

```hoon
:_  this
:~  [%give %fact ~[/some/path /another/path] %some-mark !>('some data')]
    [%give %fact ~[/some/path] %some-mark !>('more data')]
    ....
==
```

The `(list path)` in the `%fact` specifies which subscription `path`s the
`%fact` should be sent on. All subscribers of all `path`s specified will receive
the `%fact`. Any agent arm which produces a `(quip card _this)` can send
`%fact`s to subscribers. Most often they will be produced in the `on-poke` arm,
since new data will often be added in `poke`s.

## Kicking subscribers

To kick a subscriber, you just send a `%kick` `card`:

```hoon
[%give %kick ~[/some/path] `~sampel-palnet]
```

The `(list path)` specifies which subscription `path`s the ship should be kicked
from, and the `(unit ship)` specifies which ship to kick. The `(unit ship)` can also be null, like so:

```hoon
[%give %kick ~[/some/path] ~]
```

In this case, all subscribers to the specified `path`s will be kicked.

Note that `%kick`s are not exclusively sent by the agent itself - Gall itself
can also kick subscribers under certain network conditions. Because of this,
`%kick`s are not assumed to be intentional, and the usual behavior is for a
kicked agent to try and resubscribe. Therefore, if you want to disallow a
particular subscriber, your agent's `on-watch` arm should reject further
subscription requests from them - your agent should not just `%kick` them and
call it a day.

## Outgoing subscriptions

Now that we've covered incoming subscriptions, we'll look at the other side of
it: Subscribing to other agents. This is done by `%pass`ing the target agent a
`%watch` task in a `card`:

```hoon
[%pass /some/wire %agent [~some-ship %some-agent] %watch /some/path]
```

If your agent's subscription request is successful, updates will come in to your
agent's `on-agent` arm on the `wire` specified (`/some/wire` in this example).
The `wire` can be anything you like - its purpose is for your agent to figure
out which subscription the updates came from. The `[ship term]` pair specifies the
ship and agent you're trying to subscribe to, and the final `path` (`/some/path`
in this example) is the path you want to subscribe to - a `path` the target
agent has defined in its `on-watch` arm.

Gall will deliver the `card` to the target agent and call that agent's
`on-watch` arm, which will process the request [as described
above](#incoming-subscription-requests), accept or reject it, and send back
either a positive or negative `%watch-ack`. The `%watch-ack` will come back in
to your agent's `on-agent` arm in a `sign`, along with the `wire` you specified
(`/some/wire` in this example). Recall in the lesson on pokes, the `on-agent`
arm starts with:

```hoon
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  .....
```

The `sign` will be of the following format:

```hoon
[%watch-ack p=(unit tang)]
```

How you want to handle the `%watch-ack` really depends on the particular agent.
In the simplest case, you can just pass it to the `on-agent` arm of
`default-agent`, which will just accept it and do nothing apart from printing
the error in the `%watch-ack` `tang` if it's a nack. You shouldn't have your
agent crash on a `%watch-ack` - even if it's a nack your agent should process it
successfully. If you wanted to apply some additional logic on receipt of the
`%watch-ack`, you'd typically first test the `wire`, then test whether it's a
`%watch-ack`, then test whether it's an ack or a nack and do whatever's
appropriate:

```hoon
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire  (on-watch:def wire sign)
      [%expected %wire ~]
    ?+    -.sign  (on-watch:def wire sign)
        %watch-ack
      ?~  p.sign
        ...(do something if ack)...
      ...(do something if nack)...
  ......
```

The `on-agent` arm produces a `(quip card _this)`, so you can produce new
`card`s and update your agent's state, as appropriate.

One further thing to note with subscriptions is that you can subscribe multiple
times to the same `path` on the same ship and agent, as long as the `wire` is
unique. If the ship, agent, `path` and `wire` are all the same as an existing
subscription, Gall will not allow the request to be sent, and instead fail with
an error message fed into the `on-fail` arm of your agent.

## Receiving updates

Assuming the `%watch` succeeded, your agent will now begin receiving any
`%fact`s the other agent publishes on the `path` to which you've subscribed. These
`%fact`s will also come in to your agent's `on-agent` arm in a `sign`, just like
the initial `%watch-ack`. The `%fact` `sign` will have the following format:

```hoon
[%fact =cage]
```

You would typically handle such `%fact`s in the following manner: Test the
`wire`, test whether the `sign` is a `%fact`, test the `mark` in the `cage`,
extract the data from the `vase` in the `cage`, and apply your logic. Again, routing on `wire` before `sign` is one of the [Precepts](/docs/development/precepts#specifics). For example:

```hoon
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire  (on-watch:def wire sign)
      [%expected %wire ~]
    ?+    -.sign  (on-watch:def wire sign)
        %fact
      ?+    p.cage.sign  (on-watch:def wire sign)
          %expected-mark
        =/  foo  !<(expected-type q.cage.sign)
        .....
  ......
```

Note that Gall will not allow `sign`s to come into `on-agent` unsolicited, so
you don't necessarily need to include permission logic in this arm.

The `on-agent` arm produces a `(quip card _this)`, so you can produce new
`card`s and update your agent's state, as appropriate.

## Getting kicked

For whatever reason, the agent you're `%watch`ing might want to kick your agent
from a `path` to which it's suscribed, ending your subscription and ceasing to
send your agent `%fact`s. To do this, it will send your agent a `%kick` card [as
described above](#kicking-subscribers). The `%kick` will come in to your agent's
`on-agent` arm in a `sign`, like `%watch-ack`s and `%fact`s do. The `%kick`
`sign` will have the following format:

```hoon
[%kick ~]
```

Since the `%kick` itself contains no information, you'll need to consider the
`wire` it comes in on to know what it pertains to. As explained previously,
`%kick`s aren't always intentional - sometimes Gall will kick subscribers due to
network issues. Your `on-agent` arm therefore has no way to know whether the
other agent actually intended to kick it. This means _your agent should almost
always try to resubscribe if it gets kicked_. Then, if the resubscribe `%watch`
request is rejected with a negative `%watch-ack`, you can conclude that it was
intentional and give up. The logic would look something like this:

```hoon
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire  (on-agent:def wire sign)
      [%some %wire ~]
    ?+    -.sign  (on-agent:def wire sign)
        %kick
      :_  this
      :~  [%pass /some/wire %agent [src.bowl dap.bowl] %watch /some/path]
      ==
  .......
```

## Leaving a subscription

Eventually you may wish to unsubscribe from a `path` in another agent and stop
receiving updates. This is done by `%pass`ing a `%leave` task to the agent in
question:

```hoon
[%pass /some/wire %agent [~some-ship %some-agent] %leave ~]
```

The subcription to be ended is determined by the combination of the `wire`, ship
and agent, so the `%leave` task itself always just has `~` at the end.

## Example

Here we're going to give a pretty well fleshed out example. It will demonstrate
both inbound and outbound subscriptions, most of the concepts we've discussed
here, as well as some from the previous lesson - `/sur` files, `mark` files, and
permission checks.

In previous lessons we've only dealt with things on a local ship - this example
will demonstrate messages being sent over the network.

The example will be composed of two separate agents - a publisher called
`/app/todo.hoon` and a subscriber called `/app/todo-watcher.hoon`, which will
live on separate ships. It will be a very rudimentary To-Do app - to-do tasks
will be poked into the publisher and sent out to the subscriber as `%fact`s,
which will just print them to the dojo. It will have its types defined in
`/sur/todo.hoon`, and it will have a couple of `mark` files for pokes and
updates: `/mar/todo/action.hoon` and `/mar/todo/update.hoon`.

Before we get into trying it out, we'll first walk through the `/sur` file, mark
files, and each agent.

### Types and marks

#### `/sur/todo.hoon`

```hoon
|%
+$  id  @
+$  name  @t
+$  task  [=name done=?]
+$  tasks  (map id task)
+$  who  @p
+$  friends  (set who)
+$  action
  $%  [%add =name]
      [%del =id]
      [%toggle =id]
      [%rename =id =name]
      [%allow =who]
      [%kick =who]
  ==
+$  update
  $%  [%add =id =name]
      [%del =id]
      [%toggle =id]
      [%rename =id =name]
      [%initial =tasks]
  ==
--
```

This file defines most of the types for the agents. The list of to-do tasks will
be stored in the state of the publisher agent as the `tasks` type, a `(map id task)`, where a `task` is a `[=name done=?]`. The set of ships allowed to
subscribe will be stored in `friends`, a `(set @p)`, also in the publisher's
state. After that, there are the head-tagged unions of accepted poke `action`s
and `update`s for subscribers.

#### `/mar/todo/action.hoon`

```hoon
/-  todo
|_  =action:todo
++  grab
  |%
  ++  noun  action:todo
  --
++  grow
  |%
  ++  noun  action
  --
++  grad  %noun
--
```

This is a very simple mark file for the `action` type.

#### `/mar/todo/update.hoon`

```hoon
/-  todo
|_  =update:todo
++  grab
  |%
  ++  noun  update:todo
  --
++  grow
  |%
  ++  noun  update
  --
++  grad  %noun
--
```

This is a very simple mark file for the `update` type.

### Publisher

#### `/app/todo.hoon`

```hoon
/-  todo
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 =friends:todo =tasks:todo]
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
::
++  on-init
  ^-  (quip card _this)
  `this
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
  ?>  =(src.bowl our.bowl)
  ?+    mark  (on-poke:def mark vase)
      %todo-action
    =^  cards  state
      (handle-poke !<(action:todo vase))
    [cards this]
  ==
  ++  handle-poke
    |=  =action:todo
    ^-  (quip card _state)
    ?-    -.action
        %add
      ?:  (~(has by tasks) now.bowl)
        $(now.bowl (add now.bowl ~s0..0001))
      :_  state(tasks (~(put by tasks) now.bowl [name.action %.n]))
      :~  :*  %give  %fact  ~[/updates]  %todo-update
              !>(`update:todo`[%add now.bowl name.action])
          ==
      ==
    ::
        %del
      :_  state(tasks (~(del by tasks) id.action))
      :~  :*  %give  %fact  ~[/updates]  %todo-update
              !>(`update:todo`action)
          ==
      ==
    ::
        %toggle
      :-  :~  :*  %give  %fact  ~[/updates]  %todo-update
              !>(`update:todo`action)
          ==  ==
      %=  state
        tasks  %+  ~(jab by tasks)
                 id.action
               |=(=task:todo task(done !done.task))
      ==
    ::
        %rename
      :-  :~  :*  %give  %fact  ~[/updates]  %todo-update
              !>(`update:todo`action)
          ==  ==
      %=  state
        tasks  %+  ~(jab by tasks)
                 id.action
               |=(=task:todo task(name name.action))
      ==
        %allow
      `state(friends (~(put in friends) who.action))
    ::
        %kick
      :_  state(friends (~(del in friends) who.action))
      :~  [%give %kick ~[/updates] `who.action]
      ==
    ==
  --
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:def path)
      [%updates ~]
    ?>  (~(has in friends) src.bowl)
    :_  this
    :~  [%give %fact ~ %todo-update !>(`update:todo`initial+tasks)]
    ==
  ==
::
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
```

This is the publisher agent, `todo.hoon`. The bulk of its logic is in its
`on-poke` arm, where it handles the various possible actions like `%add`ing a
task, `%toggle`ing its "done" state, `%rename`ing a task, and so on. It also has
a couple of `action`s for `%allow`ing and `%kick`ing subscribers.

Most of these cases both update the state of the agent, as well as producing
`%fact` cards to send out to subscribers with the new data.

You'll notice it only allows these pokes from the local ship, and enforces this
in `on-poke` with:

```hoon
?>  =(src.bowl our.bowl)
```

Additionally, you might notice the `%add` case in `handle-poke` begins with the
following:

```hoon
?:  (~(has by tasks) now.bowl)
  $(now.bowl (add now.bowl ~s0..0001))
```

Back in lesson two, we mentioned that the bowl is only repopulated when there's
a new Arvo event, so simultaneous messages from a local agent or web client
would be processed with the same bowl. Since we're using `now.bowl` for the task
ID, this means multiple `%add` actions could collide. To handle this case, we
check if there's already an entry in the `tasks` map with the current date-time,
and if there is, we increase the time by a fraction of a second and try again.

Let's now look at `on-watch`:

```hoon
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:def path)
      [%updates ~]
    ?>  (~(has in friends) src.bowl)
    :_  this
    :~  [%give %fact ~ %todo-update !>(`update:todo`initial+tasks)]
    ==
  ==
```

When `on-watch` gets a subscription request, it checks whether the requesting
ship is in the `friends` set, and crashes if it is not. If they're in `friends`,
it produces a `%fact` card with a null `(list path)`, which means it goes only
to the new subscriber. This `%fact` contains the entire `tasks` map as it
currently exists, getting the new subscriber up to date.

### Subscriber

#### `/app/todo-watcher.hoon`

```hoon
/-  todo
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 ~]
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
::
++  on-init
  ^-  (quip card _this)
  `this
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  =(src.bowl our.bowl)
  ?+    mark  (on-poke:def mark vase)
      %noun
    =/  action  !<(?([%sub @p] [%unsub @p]) vase)
    ?-    -.action
        %sub
      :_  this
      :~  [%pass /todos %agent [+.action %todo] %watch /updates]
      ==
        %unsub
      :_  this
      :~  [%pass /todos %agent [+.action %todo] %leave ~]
      ==
    ==
  ==
::
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire  (on-agent:def wire sign)
      [%todos ~]
    ?+    -.sign  (on-agent:def wire sign)
        %watch-ack
      ?~  p.sign
        ((slog '%todo-watcher: Subscribe succeeded!' ~) `this)
      ((slog '%todo-watcher: Subscribe failed!' ~) `this)
    ::
        %kick
      %-  (slog '%todo-watcher: Got kick, resubscribing...' ~)
      :_  this
      :~  [%pass /todos %agent [src.bowl %todo] %watch /updates]
      ==
    ::
        %fact
      ?+    p.cage.sign  (on-agent:def wire sign)
          %todo-update
        ~&  !<(update:todo q.cage.sign)
        `this
      ==
    ==
  ==
::
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
```

This is the subscriber agent. Since it's just for demonstrative purposes, it has
no state and just prints the updates it receives. In practice it would keep the
`tasks` map it receives in its own state, and then update it as it receives new
`%fact`s.

The `on-poke` arm is fairly simple - it accepts two pokes, to either `[%sub ~some-ship]` or `[%unsub ~some-ship]`.

The `on-agent` arm will print whether a subscription request succeeded or
failed, as well as printing a message when it gets kicked. When it receives a
`%fact` from the publisher agent, it will just print it to the terminal with a
`~&` expression.

### Trying it out

We're going to try this between two different ships. The first ship will be the
usual fakezod. We'll add both `mark` files, the `/sur` file, and the `todo.hoon`
agent to the `%base` desk of our fakezod, putting them in the following
directories:

```
base
├── app
│   └── todo.hoon
├── mar
│   └── todo
│       ├── action.hoon
│       └── update.hoon
└── sur
    └── todo.hoon
```

In `~zod`'s dojo, we can `|commit %base`, and then start the `%todo` agent:

```
|rein %base [& %todo]
```

Now we need to spin up another fake ship. We'll use `~nut` in this example:

```
urbit -F nut
```

Once it's booted, we can `|mount %base` and then add just the `update.hoon` mark
file, the `/sur` file, and the `todo-watcher.hoon` agent like so:

```
base
├── app
│   └── todo-watcher.hoon
├── mar
│   └── todo
│       └── update.hoon
└── sur
    └── todo.hoon
```

On `~nut` we can then `|commit %base`, and start the `%todo-watcher` agent:

```
|rein %base [& %todo-watcher]
```

Now, on `~nut`, let's try subscribing:

```
> :todo-watcher [%sub ~zod]
>=
%todo-watcher: Subscribe failed!
```

Our `%todo-watcher` agent tried, but received a negative `%watch-ack` from
`%todo`, because we haven't yet added `~nut` to the `friends` set of allowed
ships. Let's now remedy that on `~zod`:

```
> :todo &todo-action [%allow ~nut]
>=
```

Let's also add a couple of to-do tasks, on `~zod`:

```
> :todo &todo-action [%add 'foo']
>=
> :todo &todo-action [%add 'bar']
>=
```

If we now check its state with `+dbug`, we'll see they're in the `tasks` map,
and `~nut` will also now be in the `friends` set:

```
>   [ %0
  friends={~nut}
    tasks
  { [ p=170.141.184.505.349.079.206.522.766.950.035.095.552
      q=[name='foo' done=%.n]
    ]
    [ p=170.141.184.505.349.079.278.538.984.166.386.565.120
      q=[name='bar' done=%.n]
    ]
  }
]
> :todo +dbug
>=
```

Let's now try subscribing again on `~nut`:

```
> :todo-watcher [%sub ~zod]
>=
%todo-watcher: Subscribe succeeded!
[ %initial
    tasks
  { [ p=170.141.184.505.349.079.206.522.766.950.035.095.552
      q=[name='foo' done=%.n]
    ]
    [ p=170.141.184.505.349.079.278.538.984.166.386.565.120
      q=[name='bar' done=%.n]
    ]
  }
]
```

As you can see, this time it's worked, and we've immediately received the
initial `tasks` map.

Now, let's try adding another task on `~zod`:

```
> :todo &todo-action [%add 'baz']
>=
```

On `~nut`, we'll see it has received the `%fact` with the new task in it:

```
[ %add
  id=170.141.184.505.349.082.779.030.192.959.445.270.528
  name='baz'
]
```

Let's try toggle its done state on `~zod`:

```
> :todo &todo-action [%toggle 170.141.184.505.349.082.779.030.192.959.445.270.528]
>=
```

`~nut` will again get the `%fact`:

```
[ %toggle
  id=170.141.184.505.349.082.779.030.192.959.445.270.528
]
```

Recall that incoming subscriptions are stored in `sup.bowl`, and outgoing
subscriptions are stored in `wex.bowl`. Let's have a look at the incoming
subscription on `~zod`:

```
>   [ path=/updates
  from=~nut
  duct=~[/gall/sys/req/~nut/todo /ames/bone/~nut/1 //ames]
]
> :todo +dbug [%incoming %ship ~nut]
>=
```

On `~nut`, let's look at the outgoing subscription:

```
>   [wire=/todos agnt=[~zod %todo] path=/updates ackd=%.y]
> :todo-watcher +dbug [%outgoing %ship ~zod]
>=
```

Now on `~zod`, let's try kicking `~nut` and removing it from our `friends` set:

```
> :todo &todo-action [%kick ~nut]
>=
```

On `~nut`, we'll see it got the `%kick`, tried resubscribing automatically, but
was rejected because `~nut` is no longer in `friends`:

```
%todo-watcher: Got kick, resubscribing...
%todo-watcher: Subscribe failed!
```

## Summary

- Incoming subscription requests arrive in an agent's `on-watch` arm.
- An agent will define various subscription `path`s in its `on-watch` arm, which
  others can subscribe to.
- Gall will automatically produce a negative `%watch-ack` if `on-watch` crashed,
  and a positive one if it was successful.
- Incoming subscribers are recorded in the `sup` field of the `bowl`.
- `on-watch` can produce a `%fact` with a null `(list path)` which will go only
  to the new subscriber.
- Updates are sent to subscribers in `%fact` cards, and contain a `cage` with a
  `mark` and some data in a `vase`.
- `%fact`s are sent to all subscribers of the paths specified in the `(list path)`.
- A subscriber can be kicked from subscription paths with a `%kick` card
  specifying the ship in the `(unit ship)`. All subscribers of the specified
  paths will be kicked if the `(unit ship)` is null.
- An outgoing subscription can be initiated with a `%watch` card.
- The `%watch-ack` will come back in to the subscriber's `on-agent` arm as a
  `sign`, and may be positive or negative, depending on whether the `(unit tang)` is null.
- `%kick`s will also arrive in the subscriber's `on-agent` arm as a `sign`.
  Since kicks may not be intentional, the subscriber should attempt to
  resubscribe and only give up if the subsequent `%watch-ack` is negative.
- `%fact`s will also arrive in the subscriber's `on-agent` arm.
- All such `sign`s that arrive in `on-agent` will also have a `wire`.
- The `wire` for subscription updates to arrive on is specified in the initial
  `%watch` card.
- A subscriber can unsubscribe by passing a `%leave` card on the original
  `wire`.

## Exercises

- Have a look at the [Strings Guide](/docs/hoon/guides/strings) if you're not
  already familiar with decoding/encoding atoms in strings.
- Try running through the [example](#example) yourself, if you've not done so
  already.
- Try modifying `%todo-watcher` to recording the data it receives in its state,
  rather than simply printing it to the terminal.
- If you'd like, try going back to [lesson
  6](/docs/userspace/gall-guide/6-pokes) (on pokes) and modifying the agents
  with an appropriate permission system, and also try running them on separate
  ships.
