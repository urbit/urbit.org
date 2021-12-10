+++
title = "Factory Reset"
template = "doc.html"
[extra]
category = "arvo"
+++

Continuity on the [Ames](/docs/glossary/ames) network occasionally needs to be
broken in order to correct a networking error. These infrequent events are known
as **factory resets**, which causes an individual ship to forget its network
message history and restores it to the state in which you booted it for the
first time.

Factory resets are always initiated by the user, frequently in response to a
connectivity error. The easiest way to do this is with [Bridge](/docs/glossary/bridge).
The option to perform a factory reset is given when changing the networking keys,
and when transferring the Urbit ID to a new ownership address.

Historically, there were also "network resets", which happened when a major
Arvo revision that could not be implemented via an [OTA update](/docs/glossary/ota-updates)
occured. Network resets were effectively factory resetting every ship on the network
at once. The most recent network reset occurred in December 2020, and we expect
it to be the final one.

Factory resets used to be called "breaches", and you may still see this language
used in some places. The notion is identical, only the name differs.

### Further Reading

- [Guide to Factory Resets](/using/id/guide-to-resets): A more in-depth
  explanation of factory resets, including how to perform one.
- [Ship Troubleshooting](/using/os/ship-troubleshooting): General instructions on getting your ship to work, which includes network connectivity issues.
