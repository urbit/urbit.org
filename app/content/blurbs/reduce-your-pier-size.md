+++
title = "Reduce your pier size"
description = "Compress and clean up your urbit's disk usage"
tags = ["dojo", "runtime"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation (Vere)", link = "https://docs.urbit.org/user-manual/running/vere", description = "Runtime disk management" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

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
