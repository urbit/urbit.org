+++
title = "Urbit <-> IRC Bridge"
date = "2021-05-13"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Tool" ]

[extra]
image = ""
description = "Create a bot that that will relay messages between Urbit chatrooms and IRC rooms, allowing users to communicate on a singular platform."
reward = "1 star"
assignee = ["~fitnub-basbud"]
id = ""
completed = true
canceled = false
link = ""
+++

What:

I would like to create a chat bot written in Python that will allow users to bridge current IRC chatrooms to an Urbit chatroom. Ideally I will work together with ~nartes-fasrum to integrate this project into the current matrix<->urbit bridge project proposal. That way there will be a one stop shop for having a single bot instance connecting and relaying from multiple types of servers.

How:

Using the Python IRC and Quinnat packages to integrate these components. Quinnat is an Urbit chatbot framework built ontop of Urlock. Configparser to parse a config file that contains information about the Urbit instance as well as IRC server and channels to listen to.

Why:

I'm quite intrigued by the architecture of Urbit, and believe it has the potential to replace current services we are all reliant on today. In order to ease transition I'd like to create a bot that will bridge the current technology of IRC chat. Creating this bot will allow users to centralize their communication on Urbit and forgoes the need to connect to the IRC server. This eases the burden that we all face on a regular basis when utilizing multiple chatting platforms.

User scenario:

Jerry has been moving most of his communication to Urbit with his friends that have adopted the platform. Jerry is torn between an IRC server that some of his good friends that haven't adopted the program still regularly frequent. Jerry can easily configure this bot as a bridge between the IRC server and Urbit. By following the uncomplicated documentation All Jerry needs to do is modify the configuration file and run the python program. Now Jerry is happy because he can stay in contact with his IRC friends without dividing his attention between two servers.

Limitations

The bot in it's first form will probably require a 1-1 mapping for listening channels. That way it will keep the conversations organized. That format makes the most sense to me with the current format of the chat.

Qualifications:

I have a Bachelors in Cyber Security and took multiple Computer Science courses at community college. I am also currently working as a Junior Software Developer utilizing mainly C and Python. I'm also good friends and went to college with well known community member and aesthetics extraordinaire, ~nartes-fasrum, who has inspired me to spend time contributing to the Urbit community.

## Milestones

### Bot Complete

1 star
Bot complete and available for deployment
