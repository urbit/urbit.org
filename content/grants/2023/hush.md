+++

title = "Hoon Userspace Standard Hardware Grab Bag"
date = "2023-08-28"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Other"]

[extra]
image = ""
description = "Complete a set of userspace libraries."
reward = "1–4 stars"
assignee = []
champion = ["~lagrev-nocfep"]
grant_id = ""
completed = false
canceled = false
work_request_link = ""

+++

## Overview

The internal Urbit standard library, as contained in hoon.hoon and zuse.hoon, has largely been architected for building Hoon itself. This means that one of the highest-leverage software development efforts we can make is to produce a middleware userspace standard library that does everything a “normie” dev would want, with names such a dev would choose or guess. We can improve the non-core developer experience by defining and producing a set of standard libraries with intuitive names and interfaces. A userspace standard library will provide similar affordances to those available in common languages with larger user bases.

We commission a set of userspace libraries patterned after Python, Ruby, and similar language platforms.  Each library needs to include the following elements:

1. Developer API with legible arm names.  For instance, `++is-upper` is used as the Hoon analogue of Python’s `isupper()`.    
2. Documentation of all arms in Markdown.
3. A battery of unit tests which confirm essential behavior and expected errors.

For an example of what the documentation and code should look like, please refer to [https://github.com/sigilante/string](https://github.com/sigilante/string).

To claim this bounty, complete a set of tools below.  This bounty can be claimed multiple times for different sets.

### Set 1:  1 Star

- `/lib/csv` full CSV/TSV processing including intelligent quote handling; should produce `(list (list @))`, based on [https://docs.python.org/3/library/csv.html](https://docs.python.org/3/library/csv.html); should unify and supersede existing multifarious CSV tooling.

- `/lib/file`, combining Python’s `pathlib`, `glob`, `filecmp`, `os.path` materials; use [https://github.com/sigilante/diff](https://github.com/sigilante/diff) as well

### Set 2:  1 star

- `/lib/textwrap` (alternatively, added directly into `/lib/string`), based on [https://docs.python.org/3/library/textwrap.html](https://docs.python.org/3/library/textwrap.html)

- `/lib/datetime` for ISO and custom date/time format output and parsing (can be based on [https://github.com/sigilante/chronos](https://github.com/sigilante/chronos) or started from scratch; prefer `/lib/regex` as the base parsing tool and work in `tape`s), based on [https://docs.python.org/3/library/datetime.html](https://docs.python.org/3/library/datetime.html)

### Set 3:  4 stars

- `/lib/curses`, TUI materials based on `libcurses` and `/lib/etui` (by ~paldev)

### Set 4:  4 stars

- `/lib/html`, a library to convert standard HTML back to Sail (and convenience wrappers for Sail→HTML)

- `/lib/htmlfind`, a Beautiful Soup (`bs4`) style parsing and search library (open to better names; prefer `/lib/regex` for parsing)

- `/lib/markdown`, a compliant Markdown parser (keeping in mind references and that Markdown is a strict superset of HTML)

### Set 5:  2 stars

- `/lib/vector`, C++ `std::vector`-style templating

- `/lib/list`, convenient list operations (`enumerate`, `zip`, `product`, `zip2`, etc.)

- `/lib/iterator`, general iterator type (see ~rovnys-ricfer’s example in the [gist](https://gist.github.com/sigilante/1047a1a43ccaf195d093c08e8e16d7f6))

- Namespace parser components in `/sys/hoon`

The general specification for each of these is typically modeled on comparable libraries from other platforms, and your product should result in similar capabilities to the extent these make sense in Urbit.  Ask ~lagrev-nocfep for details as you plan the work.
