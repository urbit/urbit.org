+++
title = "Proxies"
weight = 8
template = "doc.html"
+++

Proxy addresses allow you to execute non-ownership related actions like spawning
child identities, voting, and setting networking keys without jeopardizing the
keys you've designated with ownership rights. Setting proxy rights is optional,
but it is recommended for on-chain actions you will execute more frequently.

Setting proxies is a good security practice. For instance, you might keep your
ownership address in cold storage, while your management proxy is kept in Metamask.

The [Urbit HD Wallet](/docs/glossary/hdwallet) automatically sets proxies for
your Urbit ID.

### Types of proxies

There are three main types of proxy: management, spawn, and voting. Their
capabilities are detailed in the following. In addition, each proxy is able to
transfer itself to another address - e.g. the management proxy can set a new
address to be the management proxy.

- **Management proxy**

  Can configure or set Arvo networking keys,
  [factory reset](/docs/using/id/guide-to-resets), and conduct sponsorship related
  operations. Planets, stars, and galaxies may all set a management proxy.

- **Spawn proxy**

  For stars and galaxies only. Can create new child identities.

- **Voting proxy**

  Galaxies only. Galaxies are the part of the [Galactic
  Senate](/docs/glossary/senate), and this means they can cast votes on new
  proposals including changes to Ecliptic.

### Transfer proxy

There is also a fourth proxy called the transfer proxy which is considered to be
of a different sort than the other three, since it generally only set on a
temporary basis to make ownership transfer less mistake-prone, and cleared once
ownership has finished.

The address holding the transfer proxy may transfer ownership of the ID to the
address of the transfer proxy. This is used to make transferring a two-step
process: using the ownership address to set the transfer proxy, and then using
the transfer proxy to complete the transaction. It is possible to transfer
ownership as a one-step process, but this is risky and not recommended. Bridge
does not natively support one-step transfers, you must use an advanced tool like
[`%claz`](/docs/azimuth/advanced-azimuth-tools) to manually generate such a
transaction.
