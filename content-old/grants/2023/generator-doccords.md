+++
title = "Doccord Compliant Comments in all Generators"
date = "2023-01-31"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Core Dev"]

[extra]
image = ""
assignee = ["~napnyl-nortuc"]
description = "Adapt the comments in the default generators to take advantage of the new doccord features."
reward = "1 star"
grant_id = "B0231"
completed = false
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0231&prefill_Grant+Name=Doccord%20Compliant%20Comments%20for%20All%20Generators"
+++

## Overview

The base desk comes with a variety of generators and threads that are useful for debugging and development. Documentation and usage guidance for these is scattered between inline comments (accessible via the `+help` generator) and [operators.urbit.org](https://operators.urbit.org/manual/os/dojo-tools) We propose to take advantage of the [newly released doccords](https://groups.google.com/a/urbit.org/g/dev/c/iqT0wgbFkPA) feature to consolidate the documentation and provide an introduction to the doccords utility for users.

## Implementation

For every "dojo tool" covered in [the docs](https://github.com/urbit/operators.urbit.org/blob/master/content/manual/os/dojo-tools.md), move the documentation into the source code in accordance with the doccord [style guide](https://github.com/urbit/urbit/blob/develop/pkg/arvo/lib/deco.hoon).

Rewrite the `+help` generator to display the relevant doccords. 

Currently you need to do the following to see inline doccords.

```
=file -build-file %/path/to/file/hoon
# file
```

This should be improved to be:

```
+help %example-generator
> formatted comments
```

## Payment

1 Star
