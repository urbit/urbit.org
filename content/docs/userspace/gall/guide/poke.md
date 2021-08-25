+++
title = "Talk to Ships: poke, watch, and marks"
weight = 4
template = "doc.html"
+++

eack in the [App Structure lesson](/docs/userspace/gall/guide/arms), we said
that the `+on-poke` and `+on-watch` arms listen for input/calls. We're going to
use them both to do that in this lesson, as well as work with the `+on-agent`
and `+on-leave` arms that handle responses from those calls.

Both `+on-poke` and `+on-watch` allow outside processes on the same ship or other
ships to call your ship. The difference is that poke is for "one-time" calls,
and watch is for subscriptions.

By the end of this lesson, you should feel very comfortable making calls and
subscriptions across ships and processes.

## Example Code for the Lesson
For this lesson, we will be using two fake ships to demonstrate communication
between them. Make a fake `~zod` and a fake `~timluc`, mount them, and copy all
code below to both of them.

After the code is copied, start our Gall agent on each with `|start %poketime`

* to `/app/`
  - [poketime.hoon](https://github.com/timlucmiptev/gall-guide/blob/master/example-code/app/poketime.hoon)
* to `/sur/`
  - [poketime.hoon](https://github.com/timlucmiptev/gall-guide/blob/master/example-code/sur/poketime.hoon)
* to `/mar/poketime/`
  - [action.hoon](https://github.com/timlucmiptev/gall-guide/blob/master/example-code/mar/poketime/action.hoon)

## Preamble

### The `=^` idiom
One frequent pattern with pokes and watches is having a helper function modify
the state, and also return some cards as actions. `=^` is a very convenient
rune that we'll use here and that you'll see in a lot of Gall code.

`=^` takes 3 children:
1. a new face (call it `p`)
2. a wing in the subject (call it `q`)
3. some Hoon to run that returns a cell
4. more Hoon

it assigns the head of (3)'s result to `p` and the tail to `q`. Then it runs the
Hoon in (4), with `p` and the modified `q` in the subject.

This pattern comes in really handy when you want to combine getting a result
and updating your subject to some new state. In the case of `+on-poke` and
`+on-watch`, the "result" is a list of `card`s, and the new state is our agent's
state.

### Typical Form of `=^`
Notice below that the `state` of `this` will be updated by `some-action-handler`.
```hoon
::  ... initial code of on-poke or on-watch
=^  cards  state  (some-action-handler:helper-core !<(action-type vase))
[cards this]
```

### `+` syntax
This is easiest to demonstrate with examples:
```
> noun+[1 %hello]
[%noun 1 %hello]
> =a "yo"
> txt+a
[%txt "yo"]
```
The thing before `+` gets turned into a `@tas`, and the thing after is
interpreted normally. This is a handy shortcut we'll sometimes use with custom
action types later, since if we have a type like `[%increase-counter step=@ud]`
we can write things like `increase-counter+20` and have it interpret as
`[%increase-counter 20]`.

## poke: One-Time Call
Sending a poke to a Gall agent is easy; you can do it directly from the dojo.
Let's poke our app and examine what happens.

### Poke Basics
```
> :poketime %print-state
::  you'll see the state variable and the bowl printed
```
We've used this syntax a lot in prior lessons, and it's time to walk through how it works.

`+on-poke` is a gate:
```hoon
++  on-poke
  |=  [=mark =vase]
  ...
```

When you type `:poketime %print-state` in the dojo, it sends a `poke` to the
agent `%poketime`. `+on-poke` expects a `mark` and a `vase`. You can read more
about these in [Gall Types](/docs/userspace/gall/guide/appendix/gall_types),
but a `mark` is a `@tas` representing a Ford mark as we saw in the [prior
lesson](/docs/userspace/gall/guide/ford), and a vase is the data structure
created by running `!>(some-data)`. Its head is a type, and its tail is a noun.

There are two formats you can type at the dojo after `:agent-name` (`:poketime`
in our case) to directly poke an agent with some data:
```
::  pokes with mark %noun and [%some-tas optional-data] inside the vase
> :poketime [%some-tas optional-data]
::
::  note the '&' instead of '%'
::  mymark MUST be a mark in /mar
::  renders required data using mymark, passes mymark as the mark parameter
::  puts required-data inside the vase
> :poketime &mymark required-data
```

There is also some dojo-specific syntax for running a generator and poking an
agent with its output rather than typing out the data directly:

```
:: poke %myagent with the output of the generator located at /gen/mygen/hoon
> :myagent +mygen [generator-arguments]
::
:: poke %myagent with the output of the generator located at /gen/myagent/mygen/hoon
:: i.e. the generator in the sub-directory of /gen with the same name as the agent
> :myagent|mygen [generator-arguments]
::
:: in both cases, if it's a naked generator, the agent will be poked with a %noun mark
:: if it's a %say generator, the agent will be poked with the generator's output mark
:: note that unlike the &somemark syntax, the %say generator's output mark can be anything
:: ...it needn't exist in /mar
```

Returning to our original example, `:poketime %print-state` pokes our agent with
a mark of `%noun`. In line 39 we switch on the mark, and see it's a noun. Then
we switch on `q.vase`, i.e. the value inside the vase. It's `%print-state`, so
we run that code, which prints the `state` and `bowl`.

### Poking from an Agent
Now we're going to send a poke directly from our agent. We'll poke ourselves, but, as you'll see, we can send pokes to any agent on any ship.
```
::  at the dojo, run:
> :poketime %poke-self

::  output:
>   "got poked from ~zod with val: 2"
>>  "successful %poke-ack"
```
Three things happened here, and we'll look at them both in detail
1. We sent an outgoing poke to ourselves.
2. We handled the poke to ourselves.
3. We got back a `%poke-ack` confirming the poke was received.

#### Sending a Poke to an Agent

When we run `:poketime %poke-self` from the dojo, Gall receives that message,
and calls our `+on-poke` arm with parameters `%noun` as the mark and
`%poke-self` inside the vase. In line 39 we switch on the mark--in this case
it's a `%noun`. Then in line 41 we switch on the value inside the vase; here
it's `%poke-self`, so we do a check with `team:title` to make sure the poke
source is us or one of our moons, and then we return the card below:
```hoon
::  type: [%pass path %agent [ship agent-name] task]
::  task will usually be %poke, %leave, or %watch
::  when task starts with %poke, its format is [%poke cage]
::  a cage is a [mark vase] tuple, so we give the %noun mark, and then use !> to put our data in the vase
[%pass /pokepath %agent [~zod %poketime] %poke %noun !>([%receive-poke 2])]
```

(You can look at the [Gall
Types](/docs/userspace/gall/guide/appendix/gall_types) appendix to see full
details on `card` format).

That poke is processed by Gall and sent to us. Note that there is *nothing*
special about sending it to ourselves--we could have written any ship name and
agent name in the card, as long as they accept pokes.

#### Handling an Incoming Poke
Gall passes the above poke to us again, and again the mark is `%noun`. This time
`q.vase` is `[%receive-poke 2]`, so that matches `[%receive-poke @]`, and we
print that we got poked along with the tail of `q.vase`.

#### Ack'ing the Poke

When you send a `%poke` or `%watch`, your agent also gets a `%poke-ack` or
`%watch-ack` back when it's received. Responses to calls to agents are always
sent by Gall to the `+on-agent` arm, which is a gate of form:
```hoon
::  wire is a path; sign starts with %poke-ack, %watch-ack, %kick, or %fact
|=  [=wire =sign:agent:gall] 
```
`wire` is a path that is used mainly for `watch` and subscriptions. We set it as
`/poke-wire` here, but we could have used anything. Usually you won't need or
want to handle the `%poke-ack`--this is just for demonstration of all the
possibilities.

It's considered best practice to switch first on the wire, and then on the sign
(see [here in B3 for discussion](/docs/development/precepts)).
So we switch on the wire, match `[%pokepath ~]`, and then match when the head of
`sign` is `%poke-ack`.

## Custom Marks for Poke

In the above, we moved with `%noun`. This is convenient for local CLI
development, and it is helpful to include debugging prints to poke here.
However, in general, you will want to explicitly define the types of pokes that
can be done to your app by using custom types and marks.

Let's say we want to make an action type that can have 7 types of actions. It
can increase our current counter, poke another instance of our agent, poke us,
subscribe to updates to that counter, unsubscribe from those updates, or kick a
subscriber. To do this, we'll want to make both a custom mark and a custom type.
In fact, we already did that in our example code, so let's look at those two
files:

* `/sur/poketime.hoon`
* `/mar/poketime/action.hoon`

In `poketime.hoon`, we define a tagged union that has those 7 possibilities:
```hoon
+$  action
  $%  [%increase-counter step=@ud]   ::  how big an increase to do
      [%poke-remote target=ship]     ::  the target ship on which to poke %poketime
      [%poke-self target=ship]       ::  poke your own ship (poking others will crash)
      [%subscribe host=ship]         ::  which ship to send the %poketime subscribe message to
      [%leave host=ship]             ::  which ship's %poketime subscription to leave
      [%kick paths=(list path) subscriber=ship]  ::kick a subscriber out of paths
      [%bad-path host=ship]          ::  subscribe on a non-existent path to show what happens
```

And now, in order to send a custom mark called `poketime-action`, we created
`mar/poketime/action` ([recall that in the last lesson we saw that "-" is
treated as a sub-directory](/docs/userspace/gall/guide/ford)):

```hoon
/-  poketime
|_  act=action:poketime
++  grab
  |%
  ++  noun  action:poketime
  --
++  grow
  |%
  ++  noun  act
  --
++  grad  %noun
--
```

Our `+grab` here just handles nouns, and converts them to the `action` type in
`sur/poketime.hoon`. `+grow` converts the mark into another mark, like `noun`.
`+grad` handles diffs, between two marks of our type, here we delegate to the
`%noun` mark. Notice that we use Ford to import that `sur` library.

So with that all in hand, we can see our custom mark in action! All we have to
do is use `&` before the name of our custom mark, and the dojo will treat it as
a custom mark, and try to render the following value from noun to it. Try out
the following commands at the dojo from `~zod`:

```
::  using our '+' syntax from the intro
> :poketime &poketime-action poke-remote+~timluc
::  you'll see a successful poke-ack locally, and a message on ~timluc

> :poketime &poketime-action poke-self+~zod
::  this will work

> :poketime &poketime-action [%poke-self ~timluc]
::  this will fail with a "poke failed" error
::  this is because the %poke-self case uses ?>  (team:title our.bowl src.bowl) to block outside ships

> :poketime &poketime-action increase-counter+7
> :poketime %print-state
::  you'll see that the counter went up by 7, and that wex and sup in bowl are empty

> :poketime &poketime-action [%subscribe ~timluc]
> :poketime %print-subs
::  you'll see that the wex element of bowl now has a value where before it was empty

> :poketime &poketime-action [%leave ~timluc]
> :poketime %print-subs
::  you'll see that wex is empty again
```

Processing custom marks is very straightforward. In `+on-poke`, where we used
`?+` to switch on mark, we just add a case for `%poketime-action`. Because the
Gall agent type has to be fully general, it can't know what type of data our
particular app will pass to `+on-poke`.

This is why we use vases: now that we've rendered our data with the
`%poketime-action` mark, we know the vase contains a value of type
`action:poketime` and so we can use `!<(action:poketime vase)` to get it out of
the vase as an `action`. We then pass it to the `+handle-action` gate in our
helper core, and use `=^` as described in the Preamble of this lesson to capture
the return head as `cards`, and tail as the value to update our `state` with.

`+handle-action` itself is very simple. We can use `?-` to switch because we know
all possible values for the head of the incoming `action`. For
`%increase-counter`, we just add the `step` to the current counter value in the
state and return the state. For the `%subscribe`/`%leave` cases, we keep the
state and return cards whose contents we'll explain in the next section.

## How Subscriptions Work in Gall
Now we move from pokes, which are one-time calls, to subscriptions.

Gall tracks incoming and outgoing subscriptions, and stores them in the `bowl`
of an agent:
* `wex` - outgoing subscriptions (uses `wire`)
* `sup` - incoming subscriptions (uses `path`)

### wire vs path
`wex` holds a `wire` that is used to receive acknowledgement of subscriptions,
receive subscription facts/updates, and also to leave a subscription.

`sup` holds a `path` that is used to send out updates to all subscribers on the
`path` and also to kick unwanted subscribers off the `path`.

- wire is for subscription metadata (acks, leaving)
- path is for the "content" of the subscription (sending out updates, kicking)

### Subscription Workflow
* subscription requests are created with `%pass` cards
* subscriptions requests contain
  - `wire` to listen for ack on, listen for updates, and to leave if desired
  - `path` that the host will send updates or kicks on
* subscriptions can be unilaterally terminated at any time
  - subscribers do it with `%leave` `%pass` cards on the `wire`
  - hosts do it with `%kick` `%give` cards on the `path`, or with `%kick` signs
    at the time of receiving the subscription
  
### New Subscription Dataflow
* subscription request card is sent and received in `+on-watch` by the host
* Gall adds the subscription to `wex` in the subscriber
* Gall adds the subscription to `sup` in the host, calls `+on-watch`, and sends a
  `%watch-ack` back to the subscriber
* the subscriber receives the `%watch-ack` in `+on-agent`
* Gall sets `acked` to `%.y` in `wex` of the subscriber

### End Subscription Dataflow
* subscriber sends a `%leave` card
* Gall removes the subscription from `wex` in subscriber
* Gall receives the `%leave` notification in the host
* Gall removes the subscription from `sup` in host
* `+on-leave` is called

## Subscription Examples
We'll now look at examples of all parts of the workflow above.

### Example 1: Subscribe to Another Ship's `%poketime`
In `~zod`, run the following:
```
> :poketime &poketime-action [%subscribe ~timluc]
```
Which creates a poke of mark `poketime-action` that is matched in
`+handle-action` of the helper core. This generates a card:
```hoon
[%pass /counter(scot %p host.action) %agent [host.action %poketime] %watch /counter]
::  [%pass path note]
::  path is the wire
::  note is [%agent [=ship name=term] =task]
::  task is [%watch =path]
```
Ship `~timluc` receives this `%pass` in its `+on-watch`, where we match on the
`path` (`[%counter ~]` in this case). Notice that all we do is print a message
confirming we got the subscription. **Gall handles the actual subscription
management for us.**

We can see `~timluc`'s current subscriptions by running `:poketime %print-subs`.
We see there a value in `sup` (incoming subscriptions) that contains `~zod` and
the `/counter` path.

If you go back to `~zod` and run `:poketime %print-subs`, you'll see a value in
`wex` (outgoing subs) something like:
```
[wex={[p=[wire=/counter/~timluc ship=~timluc term=%poketime] q=[acked=%.y path=/counter]]} sup={}]
```
We have an `acked` value of `%.y`, and the rest of the subscription info as well.

### Example 2: Getting Subscription Updates
So now `~zod`'s `%poketime` is subscribed to the `/counter` path on `~timluc`'s
`%poketime`. Let's trigger an update message on that path.

In `~timluc`, run:
```
> :poketime &poketime-action [%increase-counter 29]
```
On `~zod`, you should see a message that `counter val on ~timluc is 29`. In `handle-action` on `~timluc`, we matched `%increase-counter`, and added `step.action` to its current value. Then we returned a `%give` card, which is how you return values to subscribers. 

Our `gift` was `[%give %fact ~[/counter] [%atom !>(counter.state)]]`, which
sends a `cage` to a list of paths (just the `/counter` path in this case).

`cage` is a pair of `[mark vase]`, and we gave a mark of `%atom` while putting
the updated `counter` atom into the vase using `!>`.

Where does `~zod` listen for updates? Same place as for acks: in `+on-agent`, on
the wire we passed when `~zod` subscribed. We match the wire, and then check
that its sign is a `%fact`. If it is, we cast the value from the vase, and then
print it.

### Example 3: Leaving a Subscription
Now let's leave the sub from Example 1. From `~zod`:
```
> :poketime &poketime-action [%leave ~timluc]
```
On `~timluc`, you'll see `"got counter leave request from ~zod"`.

The `%leave` branch in `handle-action` returns the card:
```
[%pass /counter/(scot %p host.action) %agent [host.action %poketime] %leave ~]
```
This `%pass` card uses the same wire we subscribed on earlier, passes a `host.action` of `~timluc` and an app `%poketime`, and then adds the `%leave` task at the end.

`~timluc` doesn't have to handle this in any way: note that our `+on-leave`
function simply prints a message. Agents aren't responsible for removing
subscriptions; Gall does that for them. `+on-leave` is simply there if you need
to do any cleanup--often it isn't implemented.

You can run `:poketime %print-subs` on either ship to verify that the sub maps
are now empty.

### Example 4: Kicking a Subscriber from the Host
Let's subscribe one more time from `~zod` to `~timluc`:
```
> :poketime &poketime-action [%subscribe ~timluc]
```
And then in `~timluc`, run:
```
> :poketime &poketime-action [%kick ~[/counter] ~zod]
```
Now if you do `:poketime %print-state` in either ship, you'll see there are no longer any subscriptions.

We use the `[%give %kick paths.action `subscriber.action]` card here, which lets
you kick off any subscriber ships on a list of paths you specify. If you pass an
empty list of paths (`~`), it kicks the subscriber ship from all paths it is
subscribed to on you.

Note that `+on-leave` is *not* called here on `~zod`.

### Example 5: Subscribe on a Non-Existent Path
On `~zod`, run:
```
> :poketime &poketime-action [%bad-path ~timluc]
```

You'll see an error like `/~timluc/home/0/lib/default-agent/hoon:<[25 3].[25
5]>` saying that there was a `"unexpected subscription to %poketime on path
/bad-path"`. This is because instead of `/counter`, which has a matching case
in `+on-watch`, we passed `/bad-path` as the path. It has no matching case, so
the `default-agent` implementation of `+on-watch` is called, which throws an
error for unmatched paths.

## Odds and Ends

### Multiple Subscriptions
You *can* have multiple subscriptions from one ship to one path on a host. The
subscriptions just have to have different wires. That is, `~zod` can have to
`~timluc` for app `%poketime`:
* one sub on wire `/wire1` and path `/counter`
* another sub on wire `/wire2` and path `/counter`

Both wires would receive updates in this case. A `%kick` from `~timluc` on the
`/counter` path would kick both subscriptions.

### %fact or %kick Nuances

`%fact` and `%kick` take `(list path)` and `(unit ship)` arguments, which means
those arguments can either have values or be `~`. See below:

```hoon
[%fact paths=(list path) =cage]

[%kick paths=(list path) ship=(unit ship)]
```

That `~` behaves differently in `+on-watch` vs other contexts.
#### in `+on-watch`
* `%fact` uses `~` to mean "send to the ship whose subscription triggered this
  `+on-watch`".
* `%kick` uses `~` to mean "the path that was subscribed to" and "the ship that
  subscribed", respectively

#### anywhere else
* `%fact` isn't allowed to use `~` -- you're not allowed to say "send to all
  paths subscribed to me"
* `%kick` uses `~` to mean "all paths" and "all ships", respectively

## poke & watch Best Practices Summary
Poking and subscribing have a lot of combinations and variants, and we've played
around with them in this chapter. However, not everything that can be done is
worth doing, so here are some simple guidelines for writing programs:

* Switch first on wire and then on sign, since you could have multiple wires,
  each handling `%fact`s etc.
* Use `%noun` pokes only for simple debugging purposes
* Create a custom type and mark for your app's actions
* Gall handles most of the ceremony around subscribing and unsubscribing. Write
  new logic as your program needs it, but let the default handlers do the rest
  for `+on-watch`, `+on-agent`, and `+on-leave`.
* To figure out what a subscription does, search the source file for any `[%give
  %fact ...]` lines, since that's where it will send information out on various
  paths.

### Only Allow Own `poke`s
You'll see lines like this in the top of most `+on-poke`s:
```hoon
?>  (team:title [our src]:bowl)
```

This checks that the poker is either our own ship or one of its moons. We didn't
use it in this lesson, because we wanted to demonstrate poking from other ships,
but this is best practice for agents that don't want to expose all their poking
functionality to outsiders.

## Bonus Knowledge

When you see lines like this to run at the dojo they ought to make a lot more
sense now. Gall all the way down.
```
:file-server &file-server-action [%serve-dir /example-path /app/example %.y]
```

## Exercises

### Code Reading
1. [app/chat-store](https://github.com/urbit/urbit/blob/b0d252fa7633ba030c555f690594d85c0d59b36f/pkg/arvo/app/chat-store.hoon)
  - Which `path`s does it allow subscriptions on?
  - Do any of those paths take "parameters"?
  - Do any of the paths return data immediately? Which ones, and which data?
  - What does the `/mailbox` path do?
  - Where in the program does it send messages to subscribers? (*hint* search
    for `%give`)
2. [/app/group-store.hoon](https://github.com/urbit/urbit/blob/b0d252fa7633ba030c555f690594d85c0d59b36f/pkg/arvo/app/group-store.hoon)
  - In `on-load`, what happens to subscribers on the upgrade from `%0` to `%1`?
  - What does `[%pass / %agent [our.bowl dap.bowl] %poke %noun
    !>(%perm-upgrade)]` do?
3. [app/chat-hook.hoon](https://github.com/urbit/urbit/blob/b0d252fa7633ba030c555f690594d85c0d59b36f/pkg/arvo/app/chat-hook.hoon)
In `+on-agent`, `%watch-ack` is handled. What is it doing on a `%watch-ack`,
roughly?

### `picky` App
Now that we know the basics of pokes, we can write the skeleton for our chat
admin application `picky`. Feel free to use
`https://github.com/timlucmiptev/gall-guide/blob/master/example-code/app/skeleton.hoon` as a quick starting
point.

* Create an `action` tagged union in a `sur` file, and give it tagged unions for
  all the poke actions you want your backend to handle.
* In the same `sur` file, define any types you will need for your `state`, and
  create the `on-init`/`on-load`/`on-save` arms in the `app` file.
* Make a custom mark file for your `action` type.
* Handle each case of the custom mark in your `+on-poke` (can just be debug
  prints for now).
* Decide on `noun` pokes that you'll want in development (if any) and write
  their skeletons.

