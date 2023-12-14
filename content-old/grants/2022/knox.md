+++

title = "Knox"
date = "2022-11-01"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "A vault for web2 passwords with a browser extension and easy to use client interface, bringing the features you would expect from a first class password manager to Urbit"
reward = "4 stars"
assignee = ["~wordel-sitnec", "~radbus-tactyl"]
champion = ["~haddef-sigwen"]
grant_id = "P0185"
completed = true
canceled = false
link = "~wordel-sitnec/knox"

+++

# The Problem

Everyone here basically agrees - the internet is broken, the megacorps are predators, Urbit solves this, etc. etc. What Urbit doesn't solve in the immediate term is the entrenchment of web2 services from which many of us are not yet able (whether ready or not) to eject. Some solutions tangential to this space have already been developed, most notably dcSpark's Urbit Visor. Waiting for the services we still rely on to adopt log in with Urbit may be a pipe dream, and their eventual extinction is not imminent enough. Many of us still need an email address and a password to log in to pay our utilities, and we'll speak for many more in saying we wish Urbit could handle this for us.

Enter Knox.

# The Purpose

Knox is a vault for your web2 passwords. With it running on one's ship, a user can generate strong passwords, easily cycle passwords, autofill login forms with the correct credentials, trivially grab an arbitrary password with a command, and manage all of this with an easy-to-use client interface. It does everything you expect a first class password manager (BitWarden, LastPass) to do, but it lives on your urbit.

As of this writing, the basic architecture for such an app is assumed to be 1) a Gall agent, 2) a browser interface, and 3) a chromium extension. We intend to leverage the urbit visor/command launcher for some maximally convenient features, such as quick-grabbing an arbitrary password with a well-formed scry or quickly generating a password. Much of this functionality will be extended into the Knox extension as well.

Technical details/best practices for many aspects of this project will require some research. Most notable examples include best practice for storing passwords and for transferring passwords over http/https.

# Components

The entirety of the app includes at least the three discreet components named above, namely 1) the Gall agent, 2) the web client, and 3) the chromium extension.

1. Gall Agent
The Gall agent's primary role is storing passwords and assisting with password generation. Due to the current state of app  permissions and security concerns, the passwords will be stored encrypted at rest, requiring a secret supplied client side to be legible. This client-side password could be whatever kind of password the user would like, but the user would be prompted somewhere in the UI that says something to the effect of "strong passwords are highly recommended". The set of passwords will be stored in Clay so the info isn't lost forever if the agent crashes. As far as password generation, the Gall agent will provide entropy for the client to use for randomness.

2. Web Client
The web client will probably end up being the least important, or at least the least used, part of the app, but given the current skills of the team, it will be tackled simultaneously with the Gall agent and before the extension. The web client will serve a sort of dual purpose, both helping with beginning development of the Gall agent and as proof of concept for accessing/using the data stored. As mentioned above, the secret supplied client-side is how the data stored in Gall becomes legible. In addition to the features already described, there will of course be use cases where a web client may be preferable to a slimmer extension UX, like finding a particular password, checking for duplicates, easier account management, etc. As of this writing, the web client stack is React and Tailwind.

3. Chromium Extension
The extension is what ties everything together, elevating the UX to being on par with other password managers and making password management on Urbit a seamless and secure experience. Research into this part of the project is underway, but leveraging dcSpark's visor and using their developer guides for building extensions that interact with visor would afford many shortcuts.

# Milestones and Compensation
## Milestone 1 - MVP and %docs - January 2023
**Payment: 2 stars**
- Through the web client, user can -
    - view all saved entries (website, username, password)
    - generate a new password
    - save a new entry
    - edit an entry (change username/password)
    - delete an entry
- Full documentation for features so far in %docs
- MVP implementation requires a relatively slim agent set up, and more sophisticated password generation/functionality could come in future releases

## Milestone 2 - Chromium Extension and Backups - March 2023
**Payment: 2 stars**
- Stand alone extension - brings all the functionality of client to extension
    - Primary extension feature is auto-populating username/password fields if on known website
- Backup management via %peat (or other compatible app) integration. This could include storing/backing up other sensitive/valuable agent state, such as a user's gorae.
- Export - easily get some report of all existing/selected accounts/passwords. Good for having a physical backup (think crypto wallet seed phrases), preparation for risky software/hardware tinkering, etc

## Future Considerations*
- After delivering on the first two milestones, future work could be done on expanding the scope of Knox into more sophisticated use cases, such as crypto wallet seed phrase storage, storage of offline passwords/pins, etc. Some of this work could be implemented during milestone 2 if time allows.
- Expansion of app scope could also warrant a more sophisticated UI, with folder-like sorting options
- Due to less certain status about dcSpark's continued development in Urbit space, featires that requires the visor extension/command launcher have been moved from specific milestone objectives into this separate future considerations category. The visor extension affords many useful features, but development based explicitly on visor integration is at the mercy of its long term stability. Knox features based on visor integration include:
- Through the command launcher, user can -
   - generate a new password
   - get the password for an arbitraty website with a poke

## About Us

- ~radbus-tactyl - Currently I am a student studying Maths and Economics, I discovered Urbit early last year and have been learning more about the network and it's components. I was one of the HSL finishers with Hoon being my first programming language and am currently working through ASL. I am eager to contribute to the Urbit ecosystem in any way that I can and think developing an app that provides a useful and convenient function for Urbit users is the best way to get started while creating something valuable.

- ~wordel-sitnec - My day job is a software engineer for a big company you’ve heard of. I am relatively new to development in general, with most of my experience being in the frontend React app realm. I discovered Urbit coming up on two years ago, and have since been working on developing the skills to exit to Mars completely, building the software necessary if someone else hasn’t already. This would be my first serious foray into hoon development, having gone though Hoon School and App School asynchronously and diving into many other dev tools as they have become available, including dcSpark’s authenticate with urbit ID and their urbit visor/command launcher. I am eager to contribute to the Urbit ecosystem, and think development of an app I myself want to use (that others will hopefully also find useful) is the perfect way to up my chops while providing value for the community.