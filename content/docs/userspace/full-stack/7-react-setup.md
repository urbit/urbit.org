+++
title = "7. React app setup"
weight = 7
template = "doc.html"
+++

Now that we have a basic idea of how Eyre works, we can begin working on our
React app front-end.

## Create React app

Node.js must be installed, and can be downloaded from their
[website](https://nodejs.org/en/download). With that installed, we'll have the
`npm` package manager available. The first thing we'll do is globally install
the `create-react-app` package with the following command:

```sh
npm install -g create-react-app
```

Once installed, we can use it to create a new `journal-ui` directory and setup a
new React app in it with the following command:

```sh
create-react-app journal-ui
```

We can then open our new directory:

```sh
cd journal-ui
```

Its contents should look something like this:

```
journal-ui
├── node_modules
├── package.json
├── package-lock.json
├── public
├── README.md
└── src
```

## Install `http-api`

Inside our React app directory, let's install the `@urbit/http-api` NPM package:

```sh
npm i @urbit/http-api
```

We also install a handful of other packages for the UI components (`bootstrap react-bootstrap react-textarea-autosize date-fns react-bottom-scroll-listener react-day-picker`), but that's not important to our purposes here.

## Additional tweaks

Our front-end will be served directly from the ship by the `%docket` app, where
a user will open it by clicking on its homescreen tile. Docket serves such
front-ends with a base URL path of `/apps/[desk]/`, so in our case it will be
`/apps/journal`. In order for our app to be built with correct resource paths,
we must add the following line to `package.json`:

```json
"homepage": "/apps/journal/",
```

Our app also needs to know the name of the ship it's being served from in order
to talk with it. The `%docket` agent serves a small file for this purpose at
`[host]/session.js`. This file is very simple and just contains:

```js
window.ship = "sampel-palnet";
```

`sampel-palnet` will of course be replaced by the actual name of the ship. We
include this script by adding the following line to the `&lt;head>` section of
`public/index.html`:

```
<script src="/session.js"></script>
```

## Basic API setup

With everything now setup, we can begin work on the app itself. In this case
we'll just edit the existing `App.js` file in the `/src` directory. The first thing is to import the `Urbit` class from `@urbit/http-api`:

```js
import Urbit from "@urbit/http-api";
```

We also need to import a few other things, mostly relating to UI components (but
these aren't important for our purposes here):

```js
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-day-picker/lib/style.css";
import TextareaAutosize from "react-textarea-autosize";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";
import DayPickerInput from "react-day-picker/DayPickerInput";
import endOfDay from "date-fns/endOfDay";
import startOfDay from "date-fns/startOfDay";
import { BottomScrollListener } from "react-bottom-scroll-listener";
```

Inside the existing `App` class:

```js
class App extends Component {
```

...we'll clear out the existing demo code and start adding ours. The first thing
is to define our app's state. We'll look at most of the state entries in the
next section. For now, we'll just consider `status`.

```js
state = {
  // .....
  status: null,
  // .....
};
```

Next, we'll setup the `Urbit` API object in `componentDidMount`. We could do
this outside the `App` class since we're adding it to `window`, but we'll do it
this way so it's all in one place:

```js
componentDidMount() {
  window.urbit = new Urbit("");
  window.urbit.ship = window.ship;
  window.urbit.onOpen = () => this.setState({status: "con"});
  window.urbit.onRetry = () => this.setState({status: "try"});
  window.urbit.onError = (err) => this.setState({status: "err"});
  this.init();
};
```

The first thing we do is create a new instance of the `Urbit` class we imported
from `@urbit/http-api`, and save it to `window.urbit`. The `Urbit` class
constructor takes three arguments: `url`, `desk` and `code`, of which only `url`
is mandatory.

- `url` is the URL of the ship we want to talk to. Since our React app will be
  served by the ship, we can just leave it as an empty `""` string and let
  `Urbit` use root-relative paths.
- `desk` is only necessary if we want to run threads through Eyre, and since
  we're not going to do that, we can exclude it.
- `code` is the web login code for authentication, but since the user will
  already have logged in, we can also exclude that.

Therefore, we call the class contructor with just the empty `url` string:

```js
window.urbit = new Urbit("");
```

Next, we need to set the ship name in our `Urbit` instance. Eyre requires the
ship name be specified in all requests, so if we don't set it, Eyre will reject
all the messages we send. We previously included `session.js` which sets
`window.ship` to the ship name, so we just set `window.urbit.ship` as that:

```js
window.urbit.ship = window.ship;
```

Next, we set three callbacks: `onOpen`, `onRetry`, and `onError`. These
callbacks are fired when the state of our channel connection changes:

- `onOpen` is called when a connection is established.
- `onRetry` is called when a channel connection has been interrupted (such as by
  network issues) and the `Urbit` object is trying to reconnect. Reconnection
  will be attempted up to three times: immediately, after 750ms, and after
  3000ms.
- `onError` is called with an `Error` message once all retries have failed, or
  otherwise when a fatal error occurs.

We'll look at how we handle these cases in the next section. For now, we'll just
set the `status` entry in the state to either `"con"`, `"try"`, or `"err"` as
the case may be. Note that it's not mandatory to set these callbacks, but
leaving connection problems unhandled is usually a bad idea.

The last thing we do is call:

```js
this.init();
```

This function will fetch initial entries and subscribe for updates. We'll look
at it in the next section.

## Resources

- [HTTP API Guide](/docs/userspace/http-api-guide) - Reference documentation for
  `@urbit/http-api`.

- [React app source
  code](https://github.com/urbit/docs-examples/tree/main/journal-app/ui) - The
  source code for the Journal app UI.

- [`@urbit/http-api` source
  code](https://github.com/urbit/urbit/tree/master/pkg/npm/http-api) - The
  source code for the `@urbit/http-api` NPM package.
