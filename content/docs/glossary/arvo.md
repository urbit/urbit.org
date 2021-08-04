+++ title = "Arvo" template = "doc.html" +++

**Arvo** is the Urbit operating system and kernel. Arvo's state is a pure
function of its [event log](/docs/glossary/eventlog), and it serves as the Urbit
event manager. It contains [vanes](/docs/glossary/vane), which are kernel
modules that perform essential system operations.

Arvo being purely functional means that the state of the operating system at a given moment is completely determined by the sequence of events in the event log. In other words, the state of an Arvo instance is given by a lifecycle function
```
L: History ➜ State
```
where `History` consists of the set of all possible sequences of events in an Arvo event log.

Arvo coordinates and reloads vanes. It can be thought of as a traffic-director. Any vane needs to go through Arvo before reaching another vane. Events and their effects happen like so:
```
Unix event -> Vere -> Arvo -> vane -> Arvo
```
Here, [Vere](/docs/glossary/vere) is the virtual machine running Urbit.

Arvo is located in `/home/sys/arvo.hoon` within your urbit.

Arvo vanes include [Ames](/docs/glossary/ames) for networking,
[Behn](/docs/glossary/behn) for timing, [Clay](/docs/glossary/clay) for
filesystem and typed revision control, [Dill](/docs/glossary/dill) for terminal
driving, [Eyre](/docs/glossary/eyre) for web services,
[Ford](/docs/glossary/ford) for building, and [Gall](/docs/glossary/gall) for
application management.

Vanes and other programs for Arvo are written in [Hoon](/docs/glossary/hoon).

A ship creates its own copy of Arvo via a bootstrap sequence known as a
[Pill](/docs/glossary/pill).

### Further Reading

- [The Arvo tutorial](/docs/arvo/overview): An in-depth technical guide to Arvo
  and its vanes.
- [The Technical Overview](/docs/system-overview/): An overview of all of Urbit.
