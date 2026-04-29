# Common Commands

Essential commands for using Urbit

Learn the basic dojo commands and operations you'll need to manage your ship, install applications, and interact with the network.

## Get access code

A secret code for remote access to your instance of Urbit OS

```
+code
```

Your `+code` is used for access to your urbit, generally via web interfaces and mobile clients. Some application providers call it a "luscode", while others call it an "access code". It is an eight-syllable phenome, like `~ropnys-batwyd-nossyt-mapwet`. Not to be confused with a master-ticket.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/shell#code) — details on using your `+code`

## Directly contact another urbit

Urbit's most basic messaging protocol can send a quick hi in the dojo

```
|hi ~zod 'optional message'
```

Running `|hi` is Urbits most basic p2p messaging affordance and offers a quick and reliable way to see if you have a direct connection to a peer. If you are connecting to a ship for the first time you may get a message in the dojo like `~zod is your neighbor`.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#hi) — Running `|hi` will ping a ship with an optional message

## Add and remove applications

3rd-party software distribution enables any urbit node to distribute software to the network, these commands help you manage your installed apps.

```
|install ~dister-hoster %some-app
```

If you know the name of the app, and the `@p` of the ship distributing it, `|install` is the most direct way to get new apps. You can also visit `<your-domain>/apps/landscape` and click the `Get Apps` button to discover apps. 

```
|nuke %some-app, =desk &
```

Running `|nuke` will destroy, or 'nuke', all the state relating to that application. **This is an irreversible action**, so ensure you know you want to delete any related data. It is effectively a factory reset of that application, but it can have unintended consequences if done haphazardly.


```
|uninstall %some-app
```

The `|uninstall` command is slightly unintuitive. Typically you might expect that it wipes any app data, similar to `|nuke`, but technically it archives app data and stops all microservices, or 'agents', relating to the app. It is possible to recover this state by reinstalling the app.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#install) — Technical Documentation on urbit dojo commands relating to adding and removing applications from your ship

## Check application info and status

Running `+vats` will output the state of your apps and related metadata that can help with troubleshooting

```
+vats %some-app
```

The `+vats` command can be run without any arguments and will print out the metadata of all the apps, or '[desks](https://docs.urbit.org/urbit-os/kernel/clay/filesystem#desks)', currently on your ship. If you provide the name of `%some-app`, it will print out only the metadata for that app. Particularly helpful elements of this data include:
- `%cz hash` - helpful to know what version of an app you are on, developers or support will often ask for this info to figure out if you are encountering a known issue.
- `app status` - helpful to know if the app is `suspended` or `running`, which may impact intended functionality
- `publishing ship` - desks of the same name can be distributed by different ships, and may offer different functionality, e.g ~ridlyd might distribute a version of `%gora` that is cross-compatible with `%gora` from ~talwet, but which offers a different front end client.
- `pending updates` - Will let you know if there is an issue getting updates due to kernel version incompatibility

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#vats) — Technical Doccumentation on understanding the metadata and status around your applications

## Update Commands For Your Urbit

Your urbit is generally auto-updating, but in the event of an incompatible application or a kernel update that would conflict with existing apps, you may need to decide which software to run

```
|bump
```

Occasionally, you will have an app on your ship that has not been updated by it's developer in some time, and an inbound kernel upgrade will conflict with this existing application. Running `|bump` will apply the kernel update and suspend any incompatible desks in the process.

```
|ota ~sampel
```

Another common reason for not getting commands can come from having a derelict sponsor, or otherwise having a poor connection with your 'Over The Air' (OTA) update provider. You can chose an alternative provider for your kernel updates by running `|ota` and providing the `@p` of a valid ota provider as an argument. You can get OTAs from any ship, but by default you get them from your networking sponsor.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#bump) — Key commands for keeping your urbit up to date

## Start and stop applications on your urbit

Control application lifecycles with dojo commands

```
|start %some-app %some-agent
```

Use `|start` to manually start a specific agent on a desk, defining first the desk name and then the agent name 

```
|suspend %some-app
```

Alternatively, you can `|suspend` to stop all agents on a desk. 

```
|pause %some-app
```
The `|pause` command prevents a desk from receiving updates from the app distributor. This can be helpful for freezing an app from receiving any undesired changes. Take that, MEGACORP SaaS.

```
|revive %some-app
```

Running `|revive` restarts previously suspended agents for a given desk.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#start) — Application control commands

## Checking and fixing Azimuth state

Monitor and repair your PKI state synchronization

```
+azimuth/block
```

Check which Ethereum block your ship has processed with `+azimuth/block`. This can be helpful to compare against other sources, e.g. [Etherscan](https://etherscan.io), to ensure that your ship understands the current height of the ethereum blockchain and any attendent Azimuth state.

```
-azimuth-load
```

If your Azimuth state is out of sync, use `-azimuth-load` to refetch a snapshot and catch you up to the current state of the Azimuth.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#azimuthblock) — Azimuth state management commands

## Check and reduce memory usage

Monitor and optimize your urbit's memory consumption

Both the urbit dojo and the Vere runtime are capable of handling commands for managing your urbit's memory consumption and loom size. 

Use `|mass` or `./urbit mass` to print a memory report showing where your loom space is allocated. Run `|meld` (or `./urbit meld`) to deduplicate memory—this can reduce usage by up to 50% but takes time. For faster compression with smaller gains, use `|pack`. These operations help keep your ship running smoothly, especially on resource-constrained systems.

**From dojo:**
```
|mass
```

```
|meld
```

```
|pack
```

**From runtime (ship offline):**
```
./urbit mass /path/to/pier
```

```
./urbit meld /path/to/pier
```

```
./urbit pack /path/to/pier
```

These can also be run from a 'docked' pier, using the following syntax:
```
./path/to/pier/.run <command>
```

### References

- [Technical Documentation (Dojo)](https://docs.urbit.org/user-manual/os/dojo-tools#mass) — Memory management from dojo
- [Technical Documentation (Vere)](https://docs.urbit.org/user-manual/running/vere#meld-1) — Memory management from runtime

## Create a moon identity

Spawn subordinate identities tied to your planet

```
|moon
```

Azimuth-based identities can use `|moon` to generate a new moon identity, linked to it's parent identity. The command returns a keyfile you'll use to boot the moon.

```
|moon-breach ~sampel-sampel-palnet
```

If your moon gets into a bad state, `|moon-breach` performs a factory reset. 

```
|moon-cycle-keys ~sampel-sampel-palnet
```

The `|moon-cycle-keys` command updates your moon's cryptographic keys—useful for security or recovery purposes.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#moon) — Moon management commands

## Check your current sponsor

Understanding your networking sponsor can help with troubleshooting connectivity issues

```
+sponsor
```

This command will print out the `@p` of your ship's current sponsor. This is helpful for troubleshooting connectivity issues, as if there is a ship in your sponsorship hierarchy that is offline, it can result in difficulty finding new network piers. You can also check the [Network Explorer](https://network.urbit.org) to retrieve this information, but it is important to note that because Urbit is a distributed system, it is possible that your ship has a different understanding of it's sponsorship chain, particularly if you just executed onchain identity management actions, e.g. changing your sponsor in [Bridge](https://bridge.urbit.org).

## Shut down your urbit

Gracefully stop your urbit instance

**From dojo:**
```
|exit
```
Or press `Ctrl-D`

Use `|exit` or `Ctrl-D` to gracefully shut down your running urbit. While you should try to shut down gracefully to ensure your urbit's state is properly persisted, one of Urbit's affordances as a 'solid state interpreter' means that it technically has no internal conception of being on or off. It's state is a pure function of it's input events, and those need to be recorded before an atomic update of your state. So while an elegant shutdown is ideal, incidents such as power loss are straightforward to recover from.

### References

- [Technical Documentation (Dojo)](https://docs.urbit.org/user-manual/os/dojo-tools#exit) — Shutdown from dojo
- [Technical Documentation (Vere)](https://docs.urbit.org/user-manual/running/vere) — Runtime shutdown options

## Restart up your urbit after initial boot

Restarting your urbit after intial boot is straightforward and doesn't require additional cryptographic secrets

```
./urbit /path/to/pier
```

You can start your urbit by running `./urbit` followed by your pier name (e.g., `./urbit sampel-palnet`). 

```
./path/to/pier/.run
```

That said, typically after first boot in modern runtimes, your ship should have auto-'docked' (put a copy of the runtime in it's own pier), such that you can use `./path/to/pier/.run` to restart. This can also take any of your regular runtime arguments, like `meld` or `--loom 32`.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/running/vere) — Vere runtime commands and options

## Docking your urbit

Install a specific runtime version into your pier

Typically, when using modern versions of the Vere runtime, if you have ever elegantly shut down your Urbit, it should have gon through an auto-'docking' process. If trying to start your urbit using `./path/to/pier/.run` doesn't work, try manually docking:
```
./urbit dock /path/to/pier
```

The `dock` command copies the current vere runtime binary into your pier. This makes your pier self-contained with a specific runtime version, which is useful for version pinning or ensuring your urbit can run independently of system-level vere installations.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/running/vere) — Vere runtime management

## Select available loom size

Configure memory allocation for your urbit

```
./urbit --loom 32 /path/to/pier
```

The loom is your urbit's memory space. Use the `--loom` flag with a power-of-two exponent: `30` for 1GB, `31` for 2GB (default), `32` for 4GB, or `33` for 8GB. Larger looms allow for more apps and data but will consume more available RAM. Choose based on your available system resources and usage needs.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/running/vere) — Loom configuration options

## Reduce your pier size

Compress and clean up your urbit's disk usage

While your urbit's *state* needs to fit in the available loom, your pier also includes the event log for your ship, which includes every piece of data that has ever been sent to your ship. This is an 'append-only' ledger, but in practice holding on to every event you've ever been sent is often unnecessary and unwieldy. The Vere runtime has tools for creating checkpoints and truncating this event log. **You must shut down your ship before truncating your event log**.

To create a new 'epoch', a discrete event log segment, you can use `roll`:
```
./urbit roll /path/to/pier
```

and you should see an output that ends with something like `disk: created epoch 5886`.

After creating a new epoch, you can use `chop` to delete old epochs:

```
./urbit chop /path/to/pier
```

This will discard all but the two latest epochs. If you have only two epochs, it will do nothing. If you have never run chop before, this can significantly reduce the size of your pier on your host OS. Ships used for many years can be reduced from 100s of GBs to <10GB.

### References

- [Technical Documentation (Vere)](https://docs.urbit.org/user-manual/running/vere) — Runtime disk management

## Get the Urbit runtime

Download the runtime binary for your host platform

The quickest way to get the runtime is with the guided installer below. It defaults to a basic install, but you can also choose a specific architecture and download location if you want more control.

```sh
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

If you'd rather fetch the runtime binary directly, use the tab for your platform.

### Options

#### macOS (M-series)

Open a terminal and run:

```sh
curl -L https://urbit.org/install/macos-aarch64/latest | tar xzk -s '/.*/urbit/'
```

#### macOS (Intel)

Open a terminal and run:

```sh
curl -L https://urbit.org/install/macos-x86_64/latest | tar xzk -s '/.*/urbit/'
```

#### Linux (x86_64)

Open a terminal and run:

```sh
curl -L https://urbit.org/install/linux-x86_64/latest | tar xzk --transform='s/.*/urbit/g'
```

#### Linux (aarch64)

Open a terminal and run:

```sh
curl -L https://urbit.org/install/linux-aarch64/latest | tar xzk --transform='s/.*/urbit/g'
```

### References

- [CLI Setup Guide](https://docs.urbit.org/get-on-urbit#get-the-urbit-runtime) — Official guide to downloading the runtime and booting your first ship.

### Next step

- [Read the full CLI guide](https://docs.urbit.org/get-on-urbit) — Learn how to get the runtime, boot a ship, and log into Landscape.

## Update your urbit runtime

Keep your vere binary up to date

```
./urbit next /path/to/pier
```

Use `./urbit next` to automatically check for and install the latest vere runtime for your pier. Regular runtime updates ensure you have the latest performance improvements, bug fixes, and networking affordances.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/running/vere#next) — Runtime update commands
