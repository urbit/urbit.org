+++

title = "Modernize Urbit React Developer Documentation"
date = "2023-02-23"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Other"]

[extra]
image = ""
description = "Modernize Urbit React Developer Documentation"
reward = "1 Star"
assignee = ["~sidnym-ladrut"]
champion = ["~lagrev-nocfep"]
grant_id = "P0242"
completed = true
canceled = false

+++

## Rationale ##



The front-end React examples provided in Urbit's developer documentation (i.e. the ["Chat Lightning Tutorial"][ex-1] and ["App School II: Full-Stack"][ex-2] pages) use legacy, class-based React patterns that have largely been phased out over the past few years in favor of [modern, hook-based React style][re-hook]. These examples should be refactored to use this modern style to improve the developer onboarding experience (as increasing amounts of [React learning materials use hooks][re-tut]) and future-proof the material presented (as the official React documentation eventually migrates to [primarily present the modern style][re-docs]).



## Overview ##



The content for the Urbit React examples is split across two repositories:



1. [urbit/doc-examples][git-ex]: Contains the source code for the React examples.

2. [urbit/developers.urbit.org][git-org]: Contains the web-hosted documentation for the React examples, which can be viewed at [developers.urbit.org](developers.urbit.org).



Within these repositories, the content associated with the following examples needs to be updated to the modern React style:



1. ["Chat Lightning Tutorial"][ex-1]: Will require edits primarily in the source references, particularly those in the ["Additional commentary" section][ex-1-edit].

2. ["App School II: Full-Stack"][ex-2]: Will require nearly a full rewrite, though many source references will look similar.



## Features in scope ##



- Refactor the ["Chat" example][git-chat-src] to replace React classes with React hooks wherever possible.

- Refactor the ["Journal" example][git-jour-src] to replace React classes with React hooks wherever possible.

- Revise the ["Chat Lightning Tutorial"][git-chat-doc] documentation to update source references and add commentary to any new and nontrivial references.

- Rework the ["App School II: Full-Stack"][git-jour-doc] documentation to explain the flow and key operations (i.e. peeks, pokes, and subscriptions) of the refactored React "Journal" code.



## Implementation Notes ##



The refactored React examples will take architectural inspiration and library

cues from popular React applications in the Urbit ecosystem (e.g. [`%landscape`][git-landscape] and [`%sphinx`][git-sphinx]) to further improve their utility for learning developers.



## Milestones and Compensation ##



The grantee will receive 1 star upon fulfillment of this grant.





[git-ex]: https://github.com/urbit/docs-examples

[git-org]: https://github.com/urbit/developers.urbit.org

[git-chat-src]: https://github.com/urbit/docs-examples/blob/main/chat-app/react-frontend/src/App.jsx

[git-chat-doc]: https://github.com/urbit/developers.urbit.org/blob/main/content/guides/quickstart/chat-guide.md

[git-jour-src]: https://github.com/urbit/docs-examples/blob/main/journal-app/ui/src/App.js

[git-jour-doc]: https://github.com/urbit/developers.urbit.org/blob/main/content/guides/core/app-school-full-stack/7-app-logic.md

[git-landscape]: https://github.com/tloncorp/landscape-apps

[git-sphinx]: https://github.com/arthyn/sphinx



[re-hook]: https://reactjs.org/blog/2019/02/06/react-v16.8.0.html

[re-tut]: https://beta.reactjs.org/learn/tutorial-tic-tac-toe

[re-docs]: https://beta.reactjs.org/



[ex-1]: https://developers.urbit.org/guides/quickstart/chat-guide

[ex-1-edit]: https://developers.urbit.org/guides/quickstart/chat-guide#additional-commentary

[ex-2]: https://developers.urbit.org/guides/core/app-school-full-stack/7-app-logic

[ex-2-get]: https://developers.urbit.org/guides/core/app-school-full-stack/7-app-logic#getting-entries

[ex-2-sub]: https://developers.urbit.org/guides/core/app-school-full-stack/7-app-logic#subscription

[ex-2-add]: https://developers.urbit.org/guides/core/app-school-full-stack/7-app-logic#add-edit-delete
