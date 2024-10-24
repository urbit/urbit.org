+++

title = "EAuth Quality of Life Improvements"
date = "2024-10-20"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Core"]

[extra]
image = ""
description = "Upgrade EAuth behavior."
reward = "3 Stars"
assignee = [""]
champion = ["~lagrev-nocfep"]
grant_id = "B0399"
completed = false
canceled = false

+++

## EAuth Azimuth Support

The current EAuth framework permits the Eyre vane to treat an arbitrary client session as either a comet, if unauthenticated, or else a real Azimuth point.  This enables Arvo to function as a personal server for centralized applications.  It accomplishes this on the client side by redirecting
On the server side, EAuth associates the authenticating session with the appropriate signed messages received from a running Arvo instance.

EAuth has served as an admirable proof of concept, and several websites such as the [USTJ Forum](https://journal.urbitsystems.tech/forum) utilize it as a primary login mechanism.  However, several quality-of-life upgrades have been shown to be desirable, including:

1. The logic for detecting the appropriate authentication endpoint can be improved.  Most of the time it works well, but it can sometimes get lost.
2. The responsiveness of EAuth can be improved; sometimes an initially-authenticating client session can lag for several minutes or simply time out.
3. EAuth should support Azimuth-only login.  Today, a running Arvo instance is necessary to authenticate the session and associate all messages with that point.  A more general Azimuth login for ship owners could function in several ways; the simplest is perhaps to take the session logic of [UrbitDraw](https://urbitdraw.com) and the [USTJ Forum](https://journal.urbitsystems.tech/forum), which requires a lot of special-cased handling due to the two authentication mechanisms, and move such logic into Eyre itself.  This could involve changing the data associated with a request to support an attested point as well as an actual (client comet) point.

This work will make Eyre's EAuth mechanism much more attractive to potential Urbit developers and simplify the mechanisms that current programs need to authenticate an Azimuth point.  Completion includes updated documentation for EAuth, which may be prepared in collaboration with a UF developer.

Resources:

- [EAuth docs](https://docs.urbit.org/system/kernel/eyre/guides/eauth)

Reward:  3 Stars