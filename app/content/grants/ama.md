+++

title = "%AMA"
date = "2024-04-28"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = ""
reward = "1 Star"
assignee = ["~nospur-sontud"]
champion = ["~tamlut-modnys"]
grant_id = "P0342"
completed = true
canceled = false

+++

## Urbit %ama - Ask Me Anything
Host your own AMA board where users can ask you questions. Display answered questions on your board. Share your AMA page with friends! 

## Why Me?
I'm the author of 4 urbit apps simplenotes, yurbit, friend-adder3 and foes. I love Urbit. I think publicly hosted apps are the way to drive demand for personal servers, because they can attract users on the clear web and provide fun value!

## Deliverables

### Milestone 1 - 1 star (Expected end of April)

Backend Technical Description:
- The app will be built in %sail and be publicly viewable
- Single page dynamic app
- Sail components for each dynamic UI element
- The http requests will be served and handled raw via Eyre 
- Eyre will poke http requests into the agent 
- The http handler will decode the requests 
- The action handler will handle the decoded requests, update state and return 


Frontend Description:
- Header with user profile image, name and description
- Inbox and edit header buttons appear for hosts of the ama ship
- Color transitioning gradient background. 
- A container for displaying for answered questions with each question and answer separated with a color-changing gradient line to match background.  
- Ask-question container with textarea that expands upon focus
- "Send!" button that appears when content is entered in the textarea
- Inbox containing lists of received questions and with a dynamic textarea for answering them
- A hosted on urbit, sign up with (redhorizon) box on the right corner

