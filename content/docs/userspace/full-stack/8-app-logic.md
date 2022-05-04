+++
title = "8. React app logic"
weight = 8
template = "doc.html"
+++

With the basic things setup, we can now go over the logic of our app. We'll just
focus on functions that are related to ship communications using the `Urbit`
object we previously setup, and ignore UI components and other helper functions.

## State

In the previous section we just mentioned the connection `status` field of our
state. Here's the full state of our App:

```js
state = {
  entries: [], // list of journal entries for display
  drafts: {}, // edits which haven't been submitted yet
  newDraft: {}, // new entry which hasn't been submitted yet
  results: [], // search results
  searchStart: null, // search query start date
  searchEnd: null, // search query end date
  resultStart: null, // search results start date
  resultEnd: null, // search results end date
  searchTime: null, // time of last search
  latestUpdate: null, // most recent update we've received
  entryToDelete: null, // deletion target for confirmation modal
  status: null, // connection status (con, try, err)
  errorCount: 0, // number of errors so far
  errors: new Map(), // list of error messages for display
};
```

We'll see how these are used subsequently.

## Initialize

The first thing our app does is call `init()`:

```js
init = () => {
  this.getEntries().then(
    (result) => {
      this.handleUpdate(result);
      this.setState({ latestUpdate: result.time });
      this.subscribe();
    },
    (err) => {
      this.setErrorMsg("Connection failed");
      this.setState({ status: "err" });
    }
  );
};
```

This function just calls `getEntries()` to retrieve the initial list of journal
entries then, if that succeeded, it calls `subscribe()` to subscribe for new
updates. If the initial entry retrieval failed, we set the connection `status`
and save an error message in the `errors` map. We'll look at what we do with
errors later.

## Getting entries

![entries screenshot](https://media.urbit.org/docs/userspace/full-stack-guide/entries.png)

The `getEntries` function scries our `%journal` agent for up to 10 entries
before the oldest we currently have. We call this initially, and then each time
the user scrolls to the bottom of the list.

```js
getEntries = async () => {
  const { entries: e } = this.state;
  const before = e.length === 0 ? Date.now() : e[e.length - 1].id;
  const max = 10;
  const path = `/entries/before/${before}/${max}`;
  return window.urbit.scry({
    app: "journal",
    path: path,
  });
};
```

The scry is done with the `Urbit.scry` method. This function takes two arguments
in an object:

- `app` - the agent to scry.
- `path` - the scry path. Note the `care` is not included - all scries through
  Eyre are `%x` scries.

The `Urbit.scry` method only allows JSON results, but note that scries done via
direct GET requests allow other marks too.

The `Urbit.scry` method returns a Promise which will contain an HTTP error
message if the scry failed. We handle it with a `.then` expression back in the
function that called it, either [`init()`](#initialize) or `moreEntries()`. If
the Promise is successfuly, the results are passed to the
[`handleUpdate`](#updates) function which appends the new entries to the
existing ones in state.

## Subscription

A subscription to the `/updates` path of our `%journal` agent is opened with our
`subscribe()` function:

```js
subscribe = () => {
  try {
    window.urbit.subscribe({
      app: "journal",
      path: "/updates",
      event: this.handleUpdate,
      err: () => this.setErrorMsg("Subscription rejected"),
      quit: () => this.setErrorMsg("Kicked from subscription"),
    });
  } catch {
    this.setErrorMsg("Subscription failed");
  }
};
```

We use the `Urbit.subscribe` method for this, which takes five arguments in an
object:

- `app` - the target agent.
- `path` - the `%watch` path we're subscribing to.
- `event` - a function to handle each fact the agent sends out. We call our
  `handleUpdate` function, which we'll describe below.
- `err` - a function to call if the subscription request is rejected (nacked).
  We just display an error in this case.
- `quit` - a function to call if we get kicked from the subscription. We also
  just display an error in this case.

Note that the `Urbit.subscribe` method returns a subscription ID number. Since
we only have one subscription in our app which we never close, we don't bother
to record it. If your app has multiple subscriptions to manage, you may wish to
keep track of these IDs in your app's state.

## Updates

This `handleUpdate` function handles all updates we receive. It's called
whenever an event comes in for our subscription, and it's also called with the
results of [`getEntries`](#getting-entries) and [`getUpdates`](#error-handling)
(described later).

It's a bit complex, but basically it just checks whether the JSON object is
`add`, `edit`, `delete`, or `entries`, and then updates the state appropriately.
The object it's receiving is just the `$update` structure converted to JSON by
the mark conversion functions we wrote previously.

```js
handleUpdate = (upd) => {
  const { entries, drafts, results, latestUpdate } = this.state;
  if (upd.time !== latestUpdate) {
    if ("entries" in upd) {
      this.setState({ entries: entries.concat(upd.entries) });
    } else if ("add" in upd) {
      const { time, add } = upd;
      const eInd = this.spot(add.id, entries);
      const rInd = this.spot(add.id, results);
      const toE =
        entries.length === 0 || add.id > entries[entries.length - 1].id;
      const toR = this.inSearch(add.id, time);
      toE && entries.splice(eInd, 0, add);
      toR && results.splice(rInd, 0, add);
      this.setState({
        ...(toE && { entries: entries }),
        ...(toR && { results: results }),
        latestUpdate: time,
      });
    } else if ("edit" in upd) {
      const { time, edit } = upd;
      const eInd = entries.findIndex((e) => e.id === edit.id);
      const rInd = results.findIndex((e) => e.id === edit.id);
      const toE = eInd !== -1;
      const toR = rInd !== -1 && this.inSearch(edit.id, time);
      if (toE) entries[eInd] = edit;
      if (toR) results[rInd] = edit;
      (toE || toR) && delete drafts[edit.id];
      this.setState({
        ...(toE && { entries: entries }),
        ...(toR && { results: results }),
        ...((toE || toR) && { drafts: drafts }),
        latestUpdate: time,
      });
    } else if ("del" in upd) {
      const { time, del } = upd;
      const eInd = entries.findIndex((e) => e.id === del.id);
      const rInd = results.findIndex((e) => e.id === del.id);
      const toE = eInd !== -1;
      const toR = this.inSearch(del.id, time) && rInd !== -1;
      toE && entries.splice(eInd, 1);
      toR && results.splice(rInd, 1);
      (toE || toR) && delete drafts[del.id];
      this.setState({
        ...(toE && { entries: entries }),
        ...(toR && { results: results }),
        ...((toE || toR) && { drafts: drafts }),
        latestUpdate: time,
      });
    }
  }
};
```

## Add, edit, delete

![add screenshot](https://media.urbit.org/docs/userspace/full-stack-guide/add.png)

When a user writes a new journal entry and hits submit, the `submitNew` function
is called. It uses the `Urbit.poke` method to poke our `%journal` agent.

```js
submitNew = (id, txt) => {
  window.urbit.poke({
    app: "journal",
    mark: "journal-action",
    json: { add: { id: id, txt: txt } },
    onSuccess: () => this.setState({ newDraft: {} }),
    onError: () => this.setErrorMsg("New entry rejected"),
  });
};
```

The `Urbit.poke` method takes five arguments:

- `app` is the agent to poke.
- `mark` is the mark of the data we're sending. We specify `"journal-action"`,
  so Eyre will use the `/mar/journal/action.hoon` mark we created to convert it
  to a `$action` structure with a `%journal-action` mark before it's delivered
  to our agent.
- `json` is the actual data we're poking our agent with. In this case it's the
  JSON form of the `%add` `$action`.
- `onSuccess` is a callback that fires if we get a positive ack in response. In
  this case we just clear the draft.
- `onError` is a callback that fires if we get a negative ack (nack) in
  response, meaning the poke failed. In this case we just set an error message
  to be displayed.

`onSuccess` and `onError` are optional, but it's usually desirable to handle
these cases.

The `delete` and `submitEdit` functions are similar to `submitNew`, but for the
`%del` and `%edit` actions rather than `%add`:

![edit screenshot](https://media.urbit.org/docs/userspace/full-stack-guide/edit.png)

```js
submitEdit = (id, txt) => {
  if (txt !== null) {
    window.urbit.poke({
      app: "journal",
      mark: "journal-action",
      json: { edit: { id: id, txt: txt } },
      onError: () => this.setErrorMsg("Edit rejected"),
    });
  } else this.cancelEdit(id);
};
```

![delete screenshot](https://media.urbit.org/docs/userspace/full-stack-guide/delete.png)

```js
delete = (id) => {
  window.urbit.poke({
    app: "journal",
    mark: "journal-action",
    json: {"del": {"id": id}},
    onError: ()=>this.setErrorMsg("Deletion rejected")
  })
  this.setState({rmModalShow: false, entryToDelete: null})
};
```

Note that whether we're adding, editing or deleting entries, we update our state
when we receive the update back on the `/updates` subscription, not when we poke
our agent.

## Search

![search screenshot](https://media.urbit.org/docs/userspace/full-stack-guide/search.png)

When searching for entries between two dates, the `getSearch` function is
called, which uses the `Urbit.scry` method to scry for the results in a similar
fashion to [`getEntries`](#getting-entries), but using the
`/x/entries/between/[start]/[end]` endpoint.

```js
getSearch = async () => {
  const { searchStart: ss, searchEnd: se, latestUpdate: lu } = this.state;
  if (lu !== null && ss !== null && se !== null) {
    let start = ss.getTime();
    let end = se.getTime();
    if (start < 0) start = 0;
    if (end < 0) end = 0;
    const path = `/entries/between/${start}/${end}`;
    window.urbit
      .scry({
        app: "journal",
        path: path,
      })
      .then(
        (result) => {
          this.setState({
            searchTime: result.time,
            searchStart: null,
            searchEnd: null,
            resultStart: ss,
            resultEnd: se,
            results: result.entries,
          });
        },
        (err) => {
          this.setErrorMsg("Search failed");
        }
      );
  } else {
    lu !== null && this.setErrorMsg("Searh failed");
  }
};
```

## Error handling

When the channel connection is interrupted, the `Urbit` object will begin trying to reconnect. On each attempt, it sets the connection `status` to `"try"`, as we specified for the `onRetry` callback. When this is set, a "reconnecting" message is displayed at the bottom of the screen:

![reconnecting screenshot](https://media.urbit.org/docs/userspace/full-stack-guide/reconnecting.png)

If all three reconnection attempts fail, the `onError` callback is fired and we replace the "reconnecting" message with a "reconnect" button:

![reconnect screenshot](https://media.urbit.org/docs/userspace/full-stack-guide/reconnect.png)

When clicked, the following function is called:

```js
reconnect = () => {
  window.urbit.reset();
  const latest = this.state.latestUpdate;
  if (latest === null) {
    this.init();
  } else {
    this.getUpdates().then(
      (result) => {
        result.logs.map((e) => this.handleUpdate(e));
        this.subscribe();
      },
      (err) => {
        this.setErrorMsg("Connection failed");
        this.setState({ status: "err" });
      }
    );
  }
};
```

Our `reconnect()` function first calls the `Urbit.reset` method. This closes the
channel connection, wipes event counts and subscriptions, and generates a new
channel ID. We could have tried reconnecting without resetting the connection,
but we don't know whether the channel still exists. We could time how long the
connection has been down and estimate whether it still exists, but it's easier
to just start fresh in this case.

Since we've reset the channel, we don't know if we've missed any updates. Rather
than having to refresh our whole state, we can use the `getUpdates()` function
to get any missing update:

```js
getUpdates = async () => {
  const { latestUpdate: latest } = this.state;
  const since = latest === null ? Date.now() : latest;
  const path = `/updates/since/${since}`;
  return window.urbit.scry({
    app: "journal",
    path: path,
  });
};
```

This function uses the `Urbit.scry` method to scry the
`/x/updates/since/[since]` path, querying the update `$log` for entries more
recent than `latestUpdate`, which is always set to the last logged action we
received. The `getUpdates` function returns a Promise to the `reconnect`
function above which called it. The `reconnect` function handles it in a `.then`
expression, where the success case passes each update retrieved to the
[`handleUpdate`](#updates) function, updating our state.

Lastly, as well as handling channel connection errors, we also handle errors
such as poke nacks or failed scries by printing error messages added to the
`error` map by the `setErrorMsg` function. You could of course handle nacks,
kicks, scry failures, etc differently than just printing an error, it depends on
the needs of your app.

![search failed screenshot](https://media.urbit.org/docs/userspace/full-stack-guide/search-failed.png)

## Resources

- [HTTP API Guide](/docs/userspace/http-api-guide) - Reference documentation for
  `@urbit/http-api`.

- [React app source
  code](https://github.com/urbit/docs-examples/tree/main/journal-app/ui) - The
  source code for the Journal app UI.

- [`@urbit/http-api` source
  code](https://github.com/urbit/urbit/tree/master/pkg/npm/http-api) - The
  source code for the `@urbit/http-api` NPM package.
