+++
title = "Middleware Tools" 
date = "2022-09-25"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Dev: Tool"]

[extra]
image = ""
description = "Build middleware tooling for interfacing between arbitrary agents"
reward = "1 star"
mentor = ["~wicrum-wicrun"]
assignee = ["~litlep-nibbyt"]
grant_id = "A0193"
completed = true
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0193&prefill_Grant+Name=Middleware%20Apprenticeship"
+++

## Bolt Middleware Apprenticeship
At Assembly 2022, Quartus CTO ~wicrum-wicrun gave a presentation on agent transformers, and how this is currently the necessary pattern to implement middleware in Gall. Now, we are pleased to announce an opportunity to work with ~wicrum-wicrun as an apprentice in developing a whitelisting middleware. While it is possible, today, on the network to `%ruin` ships you don't want to talk to, or to hard-code exceptions to pokes based on ship IDs, there is no good no-code, non-permanent way whereby one ship can authorize or disallow pokes from any arbitrary group of other ships.

Enter the Whitelist Middleware (Bolt). The Whitelist Middleware Apprenticeship will provide Agent Transformer (an `$-(agent:gall agent:gall)` library) experience in a real world usecase. The whitelist middleware will add to the growing list of Agent Transforms in use on the network (following on Keep and Bank which Quartus described and released in connection to Assembly 2022). Experience with Middleware like Bank or Bolt informs apprentices about the nature of Gall agents and the limitations of middleware software in its current configuration. The Apprentice will be asked to consider many elements of the current Gall configuration. Additionally, the apprentice will be required to investigate points where an agent transformer like Bolt might interfere with the underlying agent (subscriptions, pokes, arvo gifts) and make affordances to ensure that service is only interrupted based on the blacklist/whitelist.

## Expectations of the Mentor

### Work Style
Quartus is committed to providing the apprentice with weekly 1 hour meetings to review code and discuss next steps. Depending on the apprentice's timezone, Quartus can provide additional support during apprentice's working hours via DM on Urbit (or videoconference if appropriate).

Prior to submission of the work for payment, Quartus will do a full code review for style and completeness, with the apprentice. Submitted code must adhere to the [style guide](https://developers.urbit.org/reference/hoon/style) ***except*** where code-elegance demonstrably surpasses form.

### Learning Outcomes
Experience with Middleware like Keep or Bolt informs apprentices about the nature of Gall agents and the limitations of middleware software in its current configuration. The Apprentice will be asked to consider many elements of the current Gall configuration, to understand points where an agent transformer like Bolt might interfere with the underlying agent (subscriptions, pokes, arvo gifts) and make affordances to ensure that service is only interrupted based on the blacklist/whitelist.

After completion the apprentice will be well-equipped to create their own middleware according to patterns established by Quartus.

## Expectations of the Grantee
It is recommended that any candidates have either created at least one previous Gall agent or significant previous experience with programming.

### Time Commitment
Quartus expects Bolt to take roughly 20 hours. At a minimum of 10 hours per week, Quartus expects the engagement to take roughly 2 full weeks of work.

## User Stories:
1. As a user, I can transform my agent with a whitelisting library (Bolt)
2. When my agent is bolted, I can turn on and off Bolt's functionality
3. When my agent is bolted, I can poke it to instruct it as to whether I want to establish a blacklist or a whitelist (only stop, only allow, respectively)
4. When my agent is bolted, and Bolt is turned on, I can poke it with a set of ships which I wish to ban or admit.
5. When my agent has been instructed, it will either ban (blacklist) or allow-only (whitelist) the set of ships which I have suggested.
6. When my agent is bolted and instructed, I can change its instruction by removing or adding ships to the set currently being blocked/admitted.
7. When I turn off Bolt, I am still able to use the underlying agent.
8. If I receive an update to my underlying agent, likely resulting in the removal of my transformer (unless distributed by the manufacturer complete with the transformer), I am notified to retransform my agent.

## Milestones & Compensation
The expected duration of the apprenticeship is one month. Upon successful completion of the apprenticeship, grantee will be awarded 1 Star.
