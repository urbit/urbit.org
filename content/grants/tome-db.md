+++
title = "tomeDB: simple data storage for app developers."
date = "2022-03-25"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev: Other" ]

[extra]
image = ""
description = "tomeDB is a javascript library and a gall agent. The javascript library implements data contracts defined by a gall agent so frontend developers can store any key-value pairs, logs, feeds, or files."
reward = "$55,000 in WSTR"
assignee = ""
id = ""
completed = false
work_request_link = ""
+++

For product development to move faster, we need a way to store arbitrary data that has resource permissions and a standard API.

## Overview
tomeDB is a javascript library and a gall agent. The javascript library implements data contracts defined by a gall agent so frontend developers can store any key-value pairs, logs, feeds, or files.

The current `@urbit/api` library does not achieve this goal as it is too tied to Landscape.

There are two portions of this project:
- `@urbit/tome-db`: a javascript library that implements the `%tome-api` pokes and scries. These pokes and scries follow a standard format.
- tome gall agents: the main gall agent that handles the `@urbit/tome-db` requests, checks permissions, and relays data calls from the various store agents. Access controls are handled in `%tome-api`

![tome-diagram](https://lomder-librun.sfo3.digitaloceanspaces.com/tome.png)

## Technical

### `@urbit/tome-db`
An implementation of the tome for connecting from javascript. When a developer initializes a tome instance in javascript, the expectation is that all access-controls are handled by the lib. There should be a way from javascript to define a new store, pass permission options, and be able to interface with each store type.

**Example**: 

```javascript
const appPreferencesStore = await tomedb.kv('app.preferences', {permission: 'our'});
appPreferencesStore.set('theme', 'dark');
```

### Gall agents

#### `%tome-api`
A gall agent that handles the javascript lib requests and manages permissions.

##### store agents
There are three storage types that can be initialized through `%tome-api`, these handle all updates to subscribers through a common permission system. 

- `%tome-kv` (key-value): used for storing app data, configuration data, settings, etc.
- `%tome-log`: an immutable log (append-only). Good for message queues, revision logs, etc. 
- `%tome-feed`: a mutable log where entries can be added or removed. Can be used for feeds, chats, blog posts, etc. 
- `%tome-blob`: stores metadata and hashes for IPFS files. 

#### key-value
A simple key-value store.
- set
- get
- remove
- all: returns all key-value pairs
- clear: clears the entire store of all key-value pairs.

#### log 
An append-only log.
- add: inserts an entry to the log
- get: retrieves a single log entry 
- window: retrieves a list of entries by index. By default retrieves the most recent.

#### feed 
A mutable log.
- add: inserts an entry to the log
- get: retrieves a single log entry 
- revise: adds a revision to a log that has already been added.
- remove: deletes an entry from the log
- window: retrieves a list of entries by index. By default retrieves the most recent.

#### blob 
- Stores a file in IPFS and stores the hash and metadata in a simple hoon store. It should also handle caching files on the client so they only are loaded once, unless the hash changes.
- store: sends file to IPFS via client and stores hash in %tome-blob agent
- edit: updates file metadata
- delete: deletes file from IPFS and metadata record from %tome-blob store.

#### Permissions
- open: anyone can watch a store
- invited: only a list of invited @p's can watch a store
- group: all group members can watch a store
- our: only `our.bowl` can access the data.

## Milestones

### Milestone 1 - Key-value store - 30,000 WSTR

For this milestone to be complete, there needs to be:
- `%tome-api`: implements the api layer for handling requests from the UI and pokes/watches from other ships. Also, this should implement permissions.
- `%tome-kv`: an agent that stores the key-value pairs. Should not need to know about permissions. Can only be accessed by host ship. `%tome-api` does all of the permission checking and subscriber management.
- `@urbit/tome-db/kv`: implements the `%tome-kv` functionality in the javascript library to allow UI developers to easily store strings, objects, arrays, etc. against a key.

### Milestone 2 - Log and feed stores - 15,000 WSTR

For this milestone to be complete, there needs to be:
- `%tome-log`: an immutable log (append-only). Good for message queues, revision logs, etc. 
- `%tome-feed`:a mutable log where entries can be added or removed. Can be used for feeds, chats, blog posts, etc. 
- `@urbit/tome-db/log`: implements the `%tome-log` functionality in the javascript library.
- `@urbit/tome-db/feed`: implements the `%tome-log` functionality in the javascript library.

The log and feed implementation will be fairly similar, which is why they are bundled together.

### Milestone 3 - Blob store - 10,000 WSTR

For this milestone to be complete, there needs to be:
- `%tome-api`: implements the api layer for handling requests from the UI and pokes/watches from other ships. Also, this should implement permissions.
- `%tome-blob`: a simple agent that stores IPFS metadata. 
- `@urbit/tome-db/blob`: implements the `%tome-blob` functionality in the javascript library. Does the actual uploading of a file to IPFS, which then communicates to the tome backend, storing the metadata and hash.

## Requirements
- At least three years of professional programming experience
- Demonstrable experience with writing Gall agents
- Coordinate with Holium on designs, frontend, and agents

## Reward
$55,000 WSTR if all 3 milestones are completed.