+++
title = "HTTP API Guide"
weight = 4
template = "doc.html"
+++

[Eyre] is the web-server [vane] (kernel module) of [Arvo], an Urbit ship's
kernel and operating system. In this guide, we'll look at interacting with a
ship through Eyre's web API using the [@urbit/http-api] Javascript module.

## Background

Before we dig into the details of Eyre's API, we'll first give a quick run-down
of some concepts in Arvo. Eyre's API is a fairly thin overlay on some of Arvo's
internal systems, so there's some basic things to understand.

### Clay

[Clay] is the filesystem vane. It's typed, and it's revision-controlled in a
similar way to git. Clay is comprised of a number of [desk]s, which are a bit
like git repositories. Each app on your ship's home screen corresponds to a desk
in Clay. That desk contains the source code and resources for that app.

#### Marks

Most of Clay's workings aren't relevant to front-end development, but there's
one important concept to understand: [mark]s. Clay is a typed filesystem, and
marks are the filetypes. There's a mark for `.hoon` files, a mark for `.txt`
files, and so on. The mark specifies the hoon datatype for those files, and it
also specifies conversion methods between different marks. Marks aren't just
used for files saved in Clay, but also for data that goes to and from the web
through Eyre.

When you send a [poke](#pokes) or run a [thread](#threads) through Eyre, it will
look at the mark specified (for example `graph-action-3`, `settings-event`, etc)
and use the corresponding mark file in the desk to convert the given JSON to
that datatype before passing it to the target [agent](#gall-agents) or thread.
The same conversion will happen in reverse for responses.

Note that Eyre makes a best effort attempt to convert data to and from JSON. If
the marks in question do not contain appropriate JSON conversion functions, it
will fail. Not all [scry endpoints](#scry-endpoints), [subscription
paths](#subscriptions), pokes, etc, are intended to be used from a front-end, so
not all use marks which can be converted to and from JSON (the `noun` mark for
example). If documentation is available for the agent or thread in question, it
should note in some fashion whether it can take or produce JSON. The majority of
things you'll want to interact with through Eyre will work with JSON.

### Gall agents

An _agent_ is a userspace application managed by the [Gall] vane. A desk may
contain multiple agents that do different things. The Groups app, for example,
has `graph-store`, `group-store`, `contact-store`, and others in its desk.
Agents are the main thing you'll interact with through Eyre. They have a simple
interface with three main parts:

| Interface     | Description                                                                                                                                                                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pokes         | One-off message to an agent. Pokes often represent actions, commands, requests, etc.                                                                                                                                                                            |
| Subscriptions | An agent may have a number of different paths to which you may subscribe. If a subscription request is accepted, you'll continue to receive update/events the agent sends out on that path until you either cancel the subscription or are kicked by the agent. |
| Scries        | Scries are one-off requests for data. Like subscriptions, they are organized by path. Scry requests will be fulfilled immediately. Scries are "read-only", they cannot alter the state of an agent.                                                             |

#### Pokes

Pokes are single, stand-alone messages to agents. Pokes are how you send data
and requests to agents. Agents will send back either a positive acknowledgement
(ack) or a negative acknowledgement (nack). The agent can't send actual data
back in the acks. If they have any response to give back, it will be sent out to
subscribers on a subscription path instead.

The pokes an agent accepts will be defined in the `on-poke` section of its
source in the desk's `/app` directory, and typically in its type definition file
in the `/sur` directory too. If the agent has documentation, the data structures
and marks of its pokes should be listed there.

`http-api` includes a `poke` function which allows you to perform pokes through
Eyre, and is [detailed below](#poke).

#### Subscriptions

Agents define subscription paths which you can subscribe to through Eyre. A path
might be simple and fixed like `/foo/bar`, or it might have variable elements
where you can specify a date, ship, or what have you. Each agent will define its
subscription paths in the `on-watch` section of its source, and if it has
documentation the paths should also be listed there.

You can subscribe by sending a watch request to the agent with the desired path
specifed. The agent will apply some logic (such as checking permissions) to the
request and then ack or nack it. If acked, you'll be subscribed and begin
receiving any updates the agent sends out on that path. What you'll receive on a
given path depends entirely on the agent.

Agents can kick subscribers, and you can also unsubscribe at any time.

`http-api` includes a `subscribe` function which allows you to perform pokes through
Eyre, and is [detailed below](#subscribe).

#### Scry Endpoints

Pokes and subscriptions can modify the state of the agent. A third kind of
interaction called a _scry_ does not - it simply retrieves data from the agent
without any side-effects. Agents can define _scry endpoints_ which (like
subscriptions) are paths. A scry to one of these endpoints will retrieve some
data (as determined by the agent's design) from the agent's state. Like
subscription paths, scry paths can be simple like `/foo/bar` or contain variable
elements. Unlike subscriptions, a scry is a one-off request and the data will
come back immediately.

Scry endpoints are defined in the `on-peek` section of an agent's source, and
will likely be listed in the agent's documentation if it has any. Scry endpoints
will often be written with a leading letter like `/x/foo/bar`. All scries
through Eyre are `x` scries, so that letter (called a `care`) needn't be
specified.

`http-api` includes a `scry` function which allows you to perform scries through
Eyre, and is [detailed below](#scry).

### Threads

A thread is a monadic function in Arvo that takes arguments and produces a
result. Threads are conceptually similar to Javascript promises - they can
perform a series of asynchronous I/O operations and may succeed or fail. Threads
are often used to handle complex I/O operations for agents. Threads live in the
`/ted` directory of a desk.

`http-api` includes a `thread` function which allows you to run threads through
Eyre, and is [detailed below](#thread).

## `http-api` basics

The `http-api` module provides convenient functions to interact with a ship
through Eyre. In this section we'll discuss the basics of how it works.

### Importing the module

The `http-api` module is available in npm as `@urbit/http-api`, and can be
installed with:

```
npm i @urbit/http-api
```

Once installed, you can import it into your app with:

```
import Urbit from '@urbit/http-api';
```

Note that the examples in this guide are simple HTML documents with vanilla
Javascript in `&lt;script>` tags, so they use [unpkg.com](https://unpkg.com) to
import `@urbit/http-api`. This is not typical, and is just done here for
purposes of simplicity.

### `Urbit`

All functionality is contained within the `Urbit` class. There are two ways to
instantiate it, depending on whether your web app is served directly from the
ship or whether it's served externally. The reason for the difference is that
you require a session cookie to talk to the ship. If your app is served from the
ship, the user will already have a cookie. If it's not, they'll need to
authenticate, which is [detailed separately below](#authentication).

In the case of a front-end served from the ship, the `Urbit` class contains a `constructor` which takes three arguments:

| Argument | Type     | Description                                                                                                                                                                                                                         | Example                                   |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `url`    | `string` | The host of the ship without the protocol. This is mandatory but would typically be left blank as requests will still work if they're root-relative paths.                                                                          | `"example.com"`, `"localhost:8080"`, `""` |
| `code`   | `string` | The web login code of the ship. You'll typically use this constructor when it's served directly from the ship and therefore you'll already have a session cookie, so this field is optional and is typically omitted or left empty. | `""`, `"lidlut-tabwed-pillex-ridrup"`     |
| `desk`   | `string` | The desk on which you want to run threads. This field is optional and is only used if you want to run threads, no other function uses it. If you're not running threads, you can omit it or leave it empty.                         | `"landscape"`, `""`                       |

To create an `Urbit` instance, you can simply do:

```javascript
const api = new Urbit("");
```

If you want to specify a desk, you can do:

```javascript
const api = new Urbit("", "", "landscape");
```

### `/session.js`

Most functions of the `Urbit` class need to know the ship name or they will
fail. This is given explicitly with the external authentication method [detailed
below](#authentication), but not when using the `Urbit` constructor in a web app
served directly from the ship. Rather than having the user manually enter it,
Urbit ships serve a JS library at `/session.js` that contains the following:

```javascript
window.ship = "zod";
```

`"zod"` will be replaced with the actual name of the ship in question. You can
include this file like:

```
<script src="/session.js"></script>
```

Then you need to set the `ship` field in the `Urbit` object. You would typically
do it immediately after instantiating it:

```javascript
const api = new Urbit("");
api.ship = window.ship;
```

### Channels

With the exception of scries and threads, all communication with Eyre happens
through its channel system.

The `Urbit` object will generate a random channel ID that looks like
`1646295453-e1bdfd`, and use a path of `/~/channel/1646295453-e1bdfd` for
channel communications. Pokes will and subscription requests will be sent to
that channel. Responses and subscription updates will be sent out to you on that
channel too.

Eyre sends out updates and responses on an [SSE] (Server Sent Event) stream for
the channel. The `Urbit` object handles this internally with an `eventSource`
object, but you won't deal with it directly. Eyre requires all events it sends
out be acknowledged by the client, and will eventually close the channel if
enough unacknowledged events accumulate. The `Urbit` object handles event
acknowledgement automatically, so you don't need to worry about this.

Eyre automatically creates a channel when a poke or subscription request is
first sent to `/~/channel/[a new channel ID]`. If your web app is served
external to the ship and you use the `authenticate` function [described
below](#authentication), the function will automatically send a poke and open
the channel. If your web app is served directly from the ship and you use
`Urbit` class constructor, it won't open the channel right away. Instead, the
channel will be opened whenever you first send a poke or subscription request.

### Connection state

`Urbit` class includes three optional callbacks that fire when the SSE
connection state changes:

| Callback        | Description                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `Urbit.onOpen`  | Called when an SSE channel connection is successfully established.                                                        |
| `Urbit.onRetry` | This is called whenever a reconnection attempt is made due to an interruption, for example if there are network problems. |
| `Urbit.onError` | This is called when there is an unrecoverable error, for example after enough reconnection attemps have failed.           |

As mentioned in the previous section, typically a channel will be opened and an
SSE connection established after you first poke the ship or make a subscription
request. If successful, whatever function you provided to `onOpen` will be
called. If at some point the connection is interrupted, a reconnection attempt will be made three times:

1. Instantly.
2. 750ms after the first.
3. 3000ms after the second.

Each attempt will call the function you provided to `onRetry`, if any. If all
three reconnection attempts failed, or if a fatal error occurred, the function
you provided `onError` will be called with an `Error` object containing an error
message as its argument.

How you use these (if you do at all) is up to you and depends on the nature of
your app. If you want to try reconnecting when `onError` fires, note that Eyre
will delete a channel if it's had no messages from the client in the last 12
hours. The timeout is reset whenever it receives a message, including the acks
that are automatically sent by the `Urbit` object in response to subscription
updates.

If you don't want to account for the possibility of the channel having been
deleted in your app's logic, you can also just call the [`reset()`](#reset)
function before you try reconnecting and consequently open a brand new channel.

### Authentication

**If your front-end is served directly from the Urbit ship, this step can be
skipped.** If your web app is served externally to the ship, you must
authenticate and obtain a session cookie before commencing communications with
the ship.

The `Urbit` class in `http-api` includes an `authenticate` function which does
the following:

1. Login to the user's ship with their `code` and obtain a session cookie.
2. Generate a random channel ID for the connection.
3. Poke the user's ship and print "opening airlock" in the dojo to initialize
   the channel.

The `authenticate` function takes four arguments in an object: `ship`, `url`,
`code` and `verbose`:

| Argument  | Type      | Description                                                                            | Example                           |
| --------- | --------- | -------------------------------------------------------------------------------------- | --------------------------------- |
| `ship`    | `string`  | The ship ID (`@p`) without the leading `~`.                                            | `"sampel-palnet"` or `"zod"`      |
| `url`     | `string`  | The base URL for the ship without the protocol.                                        | `localhost:8080` or `example.com` |
| `code`    | `string`  | The user's web login code.                                                             | `"lidlut-tabwed-pillex-ridrup"`   |
| `verbose` | `boolean` | Whether to log details to the console. This field is optional and defaults to `false`. | `true`                            |

This function returns a promise that if successful, produces an `Urbit` object
which can then be used for communications with the ship.

**Note:** An Urbit ship will deny CORS requests from external URLs by default.
In order to allow CORS for an external web app, the user will need to run the
following in the dojo (replacing `https://example.com` with the address in
question):

```
|cors-approve 'https://example.com'
```

#### Example

Here's a simple example that will run `authenticate` for a fakezod when the
_Connect_ button is pressed:

```
<html>
  <head>
    <script src="https://unpkg.com/@urbit/http-api"></script>
  </head>
  <body>
    <button id="start" type="button" onClick="connect()" >Connect</button>
  </body>
  <script>
    async function connect() {
      window.api = await UrbitHttpApi.Urbit.authenticate({
          ship: "zod",
          url: "localhost:8080",
          code: "lidlut-tabwed-pillex-ridrup",
          verbose: true
      });
      document.body.innerHTML = "Connected!";
    };
  </script>
</html>
```

`window.api` can then be used for further communications.

## Functions

The various functions you can use in the `Urbit` object are described below.

### Poke

For poking a ship, the `Urbit` class in `http-api` includes a `poke` function.
The `poke` function takes six arguments in a object:

| Argument    | Type        | Description                                                                                                                  | Example                 |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `app`       | `string`    | The Gall agent to poke.                                                                                                      | `"graph-store"`         |
| `mark`      | `string`    | The mark of the data to poke the agent with.                                                                                 | `"graph-update-3"`      |
| `json`      | any JSON    | The data to poke the agent with.                                                                                             | `{foo: "bar", baz: 42}` |
| `ship`      | `string`    | The Urbit ID (`@p`) of the ship without the `~`. This may be ommitted if it's already been set for the whole `Urbit` object. | `"sampel-palnet"`       |
| `onSuccess` | A function. | This is called if the poke succeeded (the ship ack'd the poke).                                                              | `someFunction`          |
| `onError`   | A function. | This is called if the poke failed (the ship nack'd the poke).                                                                | `anotherFunction`       |

#### Example

This example lets you "hi" your ship with a given message, which will be printed
in the terminal. It pokes the `hood` agent (the system agent) with a `helm-hi`
mark. The `json` argument just contains the message in a string. If for some
reason the `hood` agent rejects the poke, "Poke failed!" will be displayed on
the page.

```
<html>
  <head>
    <script src="https://unpkg.com/@urbit/http-api"></script>
    <script src="/session.js"></script>
  </head>
  <body>
    <input id="msg" type="text" placeholder="Message for ship" />
    <button id="submit" type="button" onClick="doPoke()" >Submit</button>
    <p id="err"></p>
  </body>
  <script>
    document.getElementById("msg")
      .addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          document.getElementById("submit").click();
        }
      })
    const api = new UrbitHttpApi.Urbit("");
    api.ship = window.ship;
    function doPoke() {
      const msg = document.getElementById("msg").value;
      api.poke({
        app: "hood",
        mark: "helm-hi",
        json: msg,
        onSuccess: success,
        onError: error
      });
    }
    function success() {
      document.getElementById("msg").value = "";
      document.getElementById("err").innerHTML = "";
    }
    function error() {
      document.getElementById("msg").value = "";
      document.getElementById("err").innerHTML = "Poke failed!";
    }
  </script>
</html>
```

### Subscribe and Unsubscribe {#subscribe}

For subscribing to a particular path in an agent, the `Urbit` class in `http-api` includes a `subscribe` function.
The `subscribe` function takes six arguments in a object:

| Argument | Type        | Description                                                                                                                      | Example              |
| -------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `app`    | `string`    | The Gall agent to which you'll subscribe.                                                                                        | `"graph-store"`      |
| `path`   | `string`    | The subscription path.                                                                                                           | `"/updates"`         |
| `ship`   | `string`    | The Urbit ID (`@p`) of the ship without the `~`. This may be ommitted if it's already been set for the whole `Urbit` object.     | `"sampel-palnet"`    |
| `err`    | A function. | This is called if the subscription request fails.                                                                                | `someFunction`       |
| `event`  | A function. | This is the function to handle each update you receive for this subscription. The function's argument is the update's JSON data. | `anotherFunction`    |
| `quit`   | A function. | This is called if you are kicked from the subscription.                                                                          | `yetAnotherFunction` |

The `subscribe` function returns a subscription ID, which is just a number. This
ID can be used to unsubscribe down the line.

If the subscription request is successful, you'll continue to receive updates
until you either unsubscribe or are kicked by the agent. You may subscribe to
multiple different agents and subscription paths by calling the `subscribe`
function for each one.

If you wish to unsubscribe from a particular subscription, the `Urbit` class in
`http-api` includes an `unsubscribe` function. This function just takes a single
argument: the subscription ID number of an existing subscription. Once
unsubscribed, you'll stop receiving updates for the specified subscription.

#### Example

This example will, upon clicking the "Subscribe" button, subscribe to the
`/updates` path of the `graph-store` agent, and print the raw JSON of each
update it receives. You can test it by doing something like posting a message in
a chat. You can also unsubscribe by clicking the "Unsubscribe" button.

```
<html>
  <head>
    <script src="https://unpkg.com/@urbit/http-api"></script>
    <script src="/session.js"></script>
  </head>
  <body>
    <button id="toggle" type="button" onClick="doSub()" >Subscribe</button>
    <pre id="event"></pre>
  </body>
  <script>
    const api = new UrbitHttpApi.Urbit("");
    api.ship = window.ship;
    const toggle = document.getElementById("toggle");
    const event = document.getElementById("event");
    function doSub() {
      window.id = api.subscribe({
        app: "graph-store",
        path: "/updates",
        event: printEvent,
        quit: doSub,
        err: subFail
      });
      toggle.innerHTML = "Unsubscribe";
      toggle.onclick = doUnsub;
      event.innerHTML = "Awaiting event";
    };
    function doUnsub() {
      api.unsubscribe(window.id);
      toggle.innerHTML = "Subscribe";
      toggle.onclick = doSub;
      event.innerHTML = "Subscription closed";
    };
    function printEvent(update) {
      event.innerHTML = JSON.stringify(update, null, 2);
    };
    function subFail() {
      event.innerHTML = "Subscription failed!";
    };
  </script>
</html>
```

### Subscribe Once

The `subscribeOnce` function in the `Urbit` class of `http-api` is a variation
on the ordinary [`subscribe`](#subscribe) function. Rather than keeping the
subscription going and receiving an arbitrary number of updates, instead it
waits to receive a single update and then closes the subscription. This is
useful if, for example, you send a poke and just want a response to that one
poke.

The `subscribeOnce` function also takes an optional `timeout` argument, which
specifies the number of milliseconds to wait for an update before closing the
subscription. If omitted, `subscribeOnce` will wait indefinitely.

`subscribeOnce` takes three arguments (these can't be in an object like most
other `Urbit` functions):

| Argument  | Type     | Description                                                                                                              | Example         |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `app`     | `string` | The Gall agent to which you'll subscribe.                                                                                | `"graph-store"` |
| `path`    | `string` | The subscription path.                                                                                                   | `"/updates"`    |
| `timeout` | `number` | The number of milliseconds to wait for an update before closing the subscription. If omitted, it will wait indefinitely. | `5000`          |

`subscribeOnce` returns a Promise. If successful, the Promise produces the JSON
data of the update it received. If it failed due to either timing out or getting
kicked from the subscription, it will return an error message of either
`"timeout"` or `"quit"`.

#### Example

Here's a variation on the ordinary [subscribe](#subscribe) function. Rather than
printing every `graph-store` update it receives, it will instead just print the
first one it receives and close the subscription. Additionally, it sets a five
second timeout, and prints an error message if it times out.

```
<html>
  <head>
    <script src="https://unpkg.com/@urbit/http-api"></script>
    <script src="/session.js"></script>
  </head>
  <body>
    <button type="button" onClick="doSub()" >Subscribe Once</button>
    <pre id="event"></pre>
  </body>
  <script>
    const api = new UrbitHttpApi.Urbit("");
    api.ship = window.ship;
    const event = document.getElementById("event");
    function doSub() {
      event.innerHTML = "";
      api.subscribeOnce("graph-store","/updates",5000)
        .then(printEvent, noEvent);
    };
    function printEvent(update) {
      event.innerHTML = JSON.stringify(update, null, 2);
    };
    function noEvent(error) {
      event.innerHTML = error;
    };
  </script>
</html>
```

### Scries

To scry agents on the ship, the `Urbit` class in `http-api` includes a `scry` function.
The `scry` function takes two arguments in a object:

| Argument | Type     | Description                        | Example         |
| -------- | -------- | ---------------------------------- | --------------- |
| `app`    | `string` | The agent to scry.                 | `"graph-store"` |
| `path`   | `string` | The path to scry, sans the `care`. | `"/keys"`       |

The `scry` function returns a promise that, if successful, contains the
requested data as JSON. If the scry failed, for example due to a non-existent
scry endpoint, connection problem, or mark conversion failure, the promise will
fail.

#### Example

Upon pressing the "Scry Graphs" button, this example will scry the `graph-store`
agent's `/keys` endpoint for the list of graphs, and print the resulting JSON
data.

```
<html>
  <head>
    <script src="https://unpkg.com/@urbit/http-api"></script>
    <script src="/session.js"></script>
  </head>
  <body>
    <button id="scry" type="button" onClick="doScry()" >Scry Graphs</button>
    <pre id="result"></pre>
  </body>
  <script>
    const api = new UrbitHttpApi.Urbit("");
    api.ship = window.ship;
    async function doScry() {
      var groups = await api.scry({app: "graph-store", path: "/keys"});
      document.getElementById("result")
        .innerHTML = JSON.stringify(groups, null, 2);
    }
  </script>
</html>
```

### Thread

To run a thread, the `Urbit` class in `http-api` includes a `thread` function.
The `thread` function takes five arguments in an object:

| Argument     | Type     | Description                                                                                                   | Example                 |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `inputMark`  | `string` | The mark to convert your JSON data to before giving it to the thread as its argument.                         | `"graph-view-action"`   |
| `outputMark` | `string` | The result of the thread should be converted to this mark before being converted to JSON and returned to you. | `"tang"`                |
| `threadName` | `string` | The name of the thread to run.                                                                                | `"graph-eval"`          |
| `body`       | any JSON | The data to give to the thread as its argument.                                                               | `{foo: "bar", baz: 42}` |
| `desk`       | `string` | The desk in which the thread resides. This may be ommitted if previously set for the whole `Urbit` object.    | `"landscape"`           |

The `thread` function will produce a promise that, if successful, contains the
JSON result of the thread. If the thread failed, a connection error occurred, or
mark conversion failed, the promise will fail.

#### Example

This example takes a hoon expression (such as `(add 1 1)`), evalutes it with the
`graph-eval` thread in the `landscape` desk, and prints the result.

```
<html>
  <head>
    <script src="https://unpkg.com/@urbit/http-api"></script>
    <script src="/session.js"></script>
  </head>
  <body>
    <input id="hoon" type="text" placeholder="Hoon to evaluate" />
    <button id="submit" type="button" onClick="runThread()" >Submit</button>
    <pre id="expr"></pre>
    <pre id="result"></pre>
  </body>
  <script>
    document.getElementById("hoon")
      .addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          document.getElementById("submit").click();
        }
      });
    const hoon = document.getElementById("hoon");
    const expr = document.getElementById("expr");
    const result = document.getElementById("result");
    const desk = "landscape";
    const api = new UrbitHttpApi.Urbit("", "", desk);
    api.ship = window.ship;
    async function runThread() {
      const threadResult = await api.thread({
        inputMark: "graph-view-action",
        outputMark: "tang",
        threadName: "graph-eval",
        body: {eval: hoon.value}
      });
      result.innerHTML = threadResult[0].join("\n");
      expr.innerHTML = hoon.value;
      hoon.value = "";
    };
  </script>
</html>
```

### Delete Channel

Rather than just closing individual subscriptions, the entire channel can be
closed with the `delete` function in the `Urbit` class of `http-api`. The
function takes no arguments, and can be called like `api.cancel()` (replacing
`api` with whatever you've named the `Urbit` object you previously instantiated).
When a channel is closed, all subscriptions will be cancelled and all pending
updates will be discarded.

### Reset

An existing instance of `http-api`'s `Urbit` class can be reset with its
`reset` function. This function takes no arguments, and can be called like
`api.reset()` (replacing `api` with whatever you've named the `Urbit` object you
previously instantiated). When called, the channel will be closed and all
subscriptions cancelled. Additionally, all outstanding outbound pokes will be
discarded and a fresh channel ID will be generated.

## Further reading

- [Eyre External API Reference][eyre-ext-ref] - Lower-level documentation of
  Eyre's external API.
- [Eyre Guide][eyre-guide] - Lower-level examples of using Eyre's external API
  with `curl`.
- [`http-api` on Github][http-api-src] - The source code for `@urbit/http-api`.

## Examples

Here are some examples which make use of `@urbit/http-api` that might be useful
as a reference:

- [Bitcoin Wallet](https://github.com/urbit/urbit/tree/master/pkg/btc-wallet)
- [Web Terminal](https://github.com/urbit/urbit/tree/master/pkg/interface/webterm)
- [UrChatFM](https://github.com/urbit/urbit-webrtc/tree/master/urchatfm)

[eyre-ext-ref]: /docs/arvo/eyre/external-api-ref
[eyre-guide]: /docs/arvo/eyre/guide
[http-api-src]: https://github.com/urbit/urbit/tree/master/pkg/npm/http-api
[eyre]: /docs/glossary/eyre
[vane]: /docs/glossary/vane
[arvo]: /docs/glossary/arvo
[hoon]: /docs/glossary/hoon
[gall]: /docs/glossary/gall
[clay]: /docs/glossary/clay
[desk]: /docs/glossary/desk
[mark]: /docs/glossary/mark
[sse]: https://html.spec.whatwg.org/#server-sent-events
[@urbit/http-api]: https://github.com/urbit/urbit/tree/master/pkg/npm/http-api
