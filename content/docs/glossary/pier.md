+++
title = "Pier"
template = "doc.html"
[extra]
category = "arvo"
+++

A **pier** is the directory which contains the state of an Urbit
[ship](/docs/glossary/ship). It is automatically created in the current
directory when booting a ship for the first time.

Your pier should be kept safe - if it's deleted, you will need to perform a
[factory reset](/docs/glossary/reset) in order to inform the rest of the network
that your ship's state has been lost.

Note that a backup should usually _not_ be taken of your pier as a means of
keeping it safe - once the ship is run on the network, the backup will be
outdated and running from it will necessitate a factory reset. A running ship
automatically backs up its own state within the pier directory for recovery
purposes, so as long as the pier is preserved, recovery from most problems is
possible.

### Further Reading

- [Event Log](/docs/glossary/eventlog): The main important content of the pier directory.
- [Guide to Factory Resets](/using/id/guide-to-resets): Instructions on
  performing a factory reset.
- [Ship Troubleshooting](/using/os/ship-troubleshooting): General instructions on getting your ship to work, which includes network connectivity issues.
