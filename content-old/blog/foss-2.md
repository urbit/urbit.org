+++
title = "Urbit's Open Source Culture, Part II"
date = "2023-06-13"
description = "How will Urbit continue to foster its innovative open source software culture?"

[extra]
author = "N E Davis"
ship = "~lagrev-nocfep"
image = "https://spacecenter.org/wp-content/uploads/2023/02/img-apollo-mission-control-3.jpg"
+++

![](https://spacecenter.org/wp-content/uploads/2023/02/img-apollo-mission-control-3.jpg)

> God watches over fools, drunks, and the United States of America. (Otto von Bismarck, apocryphal)

In our last installment, we considered how Urbit has grown its own robust open source culture. Now we look to the future: what will it take for Urbit to succeed, not only as an exemplary open source project but as a computing platform that delivers on its promise?

Part of what makes an open source culture vibe is remix culture, the ability to rework the source material to produce novel components or manifestations. Urbit has the raw materials for this in spades, memetically and technically. It is up to us to keep these tools in our developers’ and enthusiasts’ hands.

The default answer, which isn't terrible, is that Urbit should keep doing what it's done to get this far:

1. Urbit should continue to prioritize decentralized development.
2. Urbit should lean into ownership-based incentives. Indeed, this is the most effective lever that the Urbit Foundation has.
3. Urbit should maintain the developer's republic. Core developers should rub shoulders with first-time Hooners.
4. Urbit should continue to ship source with code, since that is how code is actually distributed. The means of open source software are _necessarily in the user's hands_ with Martian software.

There are some areas in which we hope to improve. Our documentation continues to expand, as do our educational offerings. We have a mandate to use the Urbit Foundation’s endowment of stars to produce the mature Urbit.

What else should we have an eye to in the near future? There’s always more to do, but by prioritizing the items on this short list we would continue to elaborate our open source bona fides as a community and a steering foundation.

1. **Code accessibility should be a priority.** Any computer language falls on the spectrum between machine legibility (the pole of machine code and assembly language) and human legibility (the pole of [Scratch](https://scratch.mit.edu/). All code must walk this line.

	Hoon has had a reputation for being a language of dense expressions, which we believe is now being cleared by sunshine. However, Hoon's extensive sugar syntax and irregular expressiveness can make it challenging for those relatively new to Hoon to decipher programs. We can support their learning and entry into the ecosystem by defining a subset of Hoon syntax that we adhere to in all of the docs and some of the userspace code. Even if there is a "better" way to write it, we should prefer this restricted discipline in those cases. Let's call this subset "Hoon Prime." Hoon Prime will not always be the most concise Hoon code, and it will likely fail to maintain certain well-established preferences, like heavier expressions going to the bottom, but it should encourage developers to produce generators and agents from `%base`-distributed models as quickly as possible.

	Hoon Prime should also adopt a standard of literate programming. Several example files already display such a self-documenting nature:

	- [`simple.hoon` for solid-state subscriptions](https://github.com/wicrum-wicrun/sss/blob/master/urbit/app/simple.hoon)
	- [`deco.hoon` for doccords](https://github.com/urbit/urbit/blob/develop/pkg/arvo/lib/deco.hoon)
	- [`pals.hoon`](https://github.com/Fang-/suite/blob/master/app/pals.hoon)
	- [`rudder.hoon` for serving websites](https://github.com/Fang-/suite/blob/master/lib/rudder.hoon)

	Our userspace code accessibility model should allow contributors from widely different skill levels to interact. We need to surface and document code patterns as cleanly as possible in the code we distribute. We need to include comments and unit tests so people can see how and why code works like it does.
    
	Code accessibility cannot be an afterthought. We need to upgrade as much code as possible to A standards [per the style guide](https://developers.urbit.org/reference/hoon/style#grading).

2. We need to improve the developer experience. Part of this involves better coding support, and part of this involves better debugging support.

	To promote better coding, we should continue to develop IDE integrations like the Hoon Language Server. We've had some significant wins here, but rust never sleeps. We should also continue to produce userspace and middleware support libraries. We need to pay attention to how developer preferences are manifesting in their workflows and tooling.

	Better error messaging and debugging support, perhaps even a framework for line-by-line code execution, would be invaluable. Upgrading Dojo and generator support is an easy win. Any tool friction is a sin and we need to track this and think about how to improve use.

3. We need our open source culture to continue to develop in the sunlight. We need to highlight and communicate user stories for developer tools, new and old. We need to share these from inside of companies in the ecosystem. I'm not going to call for “best practices”—it's too early and that's too corporate—but tacit knowledge and horizontal skill transfer need to be encouraged through active pair programming and utilization of build parties and the like.

    We need to expose how bugs occur, propagate, and are corrected. The core development team has committed to public [postmortems](https://github.com/urbit/urbit/issues/6583) when things go wrong.

4. Ultimately, Urbit has to stay playful. Urbit makes programming, even systems programming, a lot of fun. Fun is open-ended and surprising. It allows for whimsy in code and product.

Our developer onboarding and open source culture should be a model for the entire open source world. This is neither impossible nor impractical—we've made huge strides in legibility, and we're sailing with the wind.

