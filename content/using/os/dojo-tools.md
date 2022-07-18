+++
title = "Dojo Tools"
weight = 9
template = "doc.html"
+++

## Desks, apps and updates

### `+agents`

Print out the status of Gall agents on a desk.

Agents may either be `archived` or `running`. Nuked or unstarted agents which
are not on the manifest are omitted.

#### Arguments

```
desk
```

#### Example

```
> +agents %garden
status: running   %hark-system-hook
status: running   %treaty
status: running   %docket
status: running   %settings-store
status: running   %hark-store
```

---

### `|bump`

Try to apply a kernel update.

If `%zuse`'s kelvin version has decreased, try to apply the update. If any desks
are incompatible with the new `%zuse` version, the update will fail. The update
can be forced with the optional `force` argument, in which case incompatible
desks will be `|suspend`ed. The `set` of desks to omit (and therefore suspend)
can also be explicitly specified with the optional `except` argument.

#### Arguments

All optional:

```
, =force ?, =except (set desk)
```

#### Examples

Try to apply update, failing if blocked by any desks:

```
|bump
```

Force the update, suspending incompatible desks:

```
|bump, =force &
```

Apply kernel update, omitting and suspending the specified desks:

```
|bump, =except (silt ~[%bitcoin %webterm])
```

---

### `|install`

Install a desk, starting its agents and listening for updates.

If it's a remote desk we don't already have, it will be fetched. The agents
started will be those specified in the `desk.bill` manifest. If it has a docket
file, its tile will be added to the homescreen and its glob fetched. If we
already have the desk, the source for updates will be switched to the ship
specified.

It takes a `ship` and `desk` as its mandatory arguments. The desk may be
installed with a different name specified in the optional `local` argument.

#### Arguments

```
ship desk, =local desk
```

#### Examples

```
|install ~zod %bitcoin
```

```
|install our %webterm
```

```
|install ~zod %bitcoin, =local %foo
```

---

### `|nuke`

Shut down an agent and permanently delete its state.

The default behaviour is to shut down the specified Gall agent and discard its
state, similar to the now-deprecated `|fade` generator. **Note this irreversibly
wipes the app's state**. Additionally, if the optional `desk` argument is `%.y`,
it takes a desk rather than an agent name and nukes every agent on the specified
desk.

#### Arguments

```
@tas, =desk ?
```

#### Examples

Nuke a single agent:

```
|nuke %btc-wallet
```

Nuke every agent on a desk:

```
|nuke %bitcoin, =desk &
```

---

### `|ota`

Set the source of updates for the `%base` desk (the kernel and core apps) to the
specified ship. Automatic updates will be enabled, and any new updates available
will be fetched and installed.

#### Arguments

```
ship
```

#### Examples

`|ota ~marzod` is equivalent to `|install ~marzod %kids, =local %base`.

---

### `|pause`

Pause updates on a desk.

The specified desk will stop tracking updates from its upstream source.

#### Arguments

```
desk
```

#### Examples

```
|pause %bitcoin
```

---

### `|rein`

Adjust the state of a desk.

This allows you to stop and start agents on a desk, regardless of whether
they're on the manifest. Stopped agents have their states archived. It can also
suspend and revive the whole desk with the optional `liv` argument.

#### Arguments

```
desk (list [? dude:gall]), =liv ?
```

#### Examples

Start an agent:

```
|rein %bitcoin [& %btc-provider]
```

Stop an agent, archiving its state:

```
|rein %bitcoin [| %btc-wallet]
```

Stop one agent, start another:

```
|rein %bitcoin [| %btc-wallet] [& %btc-provider]
```

Suspend a desk:

```
|rein %bitcoin, =liv |
```

Revive a desk:

```
|rein %bitcoin
```

---

### `|resume`

Resume updates on a desk.

Start tracking previously [`|pause`](#pause)d updates from a desk's upstream
source.

#### Arguments

```
desk
```

#### Examples

```
|resume %bitcoin
```

---

### `|revive`

Revive all agents on a desk, migrating archived states.

All agents specified in `desk.bill` which are suspended will be restarted. If
updates to the agents have occurred since their states were archived, they'll be
migrated with the state transition functions in the agent. This generator does
the same thing as selecting "Resume App" from the app tile's hamburger menu.

#### Arguments

```
desk
```

#### Examples

```
|revive %bitcoin
```

---

### `|suspend`

Shut down all agents on a desk, archiving their states.

The tile in the homescreen (if it has one) will turn gray and say "Suspended" in
the top-left corner. This generator does the same thing as selecting "Suspend"
from an app tile's hamburger menu.

#### Arguments

```
desk
```

#### Examples

```
|suspend %bitcoin
```

---

### `|uninstall`

Uninstall a desk, suspending its agents and ignoring updates.

The specified desk will be retained in Clay, but its agents will all be stopped
and have their states archived like [`|suspend`](#suspend). This is the reverse
of [`|install`](#install).

Note that this will not remove the tile or glob from the homescreen, so if the
desk has a tile it should be uninstalled with the "Remove App" button in the
tile's hamburger menu.

#### Arguments

```
desk
```

#### Examples

```
|uninstall %bitcoin
```

---

### `+vat`

Print out the status of a single installed desk.

Desks in Clay which aren't installed will be omitted. See the related
[`+vats`](#vats) command for details of the individual status fields.

#### Arguments

`desk`

#### Examples

```
> +vat %base
%base
  /sys/kelvin:      [%zuse 418]
  base hash:        ~
  %cz hash:         0v2.r1lbp.i9jr2.hosbi.rvg16.pqe7u.i3hnp.j7k27.9jsgv.8k7rp.oi98q
  app status:       running
  force on:         ~
  force off:        ~
  publishing ship:  ~
  updates:          local
  source ship:      ~
  source desk:      ~
  source aeon:      ~
  pending updates:  ~
::
```

---

### `+vats`

Print out the status of each installed desk.

Desks in Clay which aren't installed will be omitted. Also see the related
[`+vat`](#vat) command, which prints the status of a single desk rather than all
desks.

Fields:

- `/sys/kelvin` - The version of `%zuse` the desk is compatible with.
- `base hash` - The merge base (common ancestor) between the desk and its upstream source.
- `%cz hash` - The hash of the desk.
- `app status` - May be `suspended` or `running`.
- `force on` - The set of agents on the desk which have been manually started
  despite not being on the `desk.bill` manifest.
- `force off` - The set of agents on the desk which have been manually stopped
  despite being on the `desk.bill` manifest.
- `publishing ship` - The original publisher if the source ship is republishing
  the desk.
- `updates` - May be `local`, `tracking` or `paused`. Local means it will
  receive updates via commits on the local ship. Tracking means it will receive
  updates from the `source ship`. Paused means it will not receive updates.
- `source desk` - The desk on the `source ship`.
- `source aeon` - The revision number of the desk on the `source ship`.
- `pending updates` - Updates waiting to be applied due to incompatibility.

#### Arguments

None.

#### Examples

```
> +vats
%base
  /sys/kelvin:      [%zuse 418]
  base hash:        ~
  %cz hash:         0v6.2nqmu.oqm24.ighl6.n0gp9.s8res.feql1.dl8ap.isli3.jk0hu.acrd2
  app status:       running
  force on:         ~
  force off:        ~
  publishing ship:  ~
  updates:          tracking
  source ship:      ~zod
  source desk:      %base
  source aeon:      3
  pending updates:  ~
::
%garden
  /sys/kelvin:      [%zuse 418]
  base hash:        ~
  %cz hash:         0v1e.2h7hs.elq3g.1sdt7.qfga6.ganga.7p95j.aog44.8p5fe.kpr6v.7ai82
  app status:       running
  force on:         ~
  force off:        ~
  publishing ship:  ~
  updates:          tracking
  source ship:      ~zod
  source desk:      %garden
  source aeon:      3
  pending updates:  ~
```

---
