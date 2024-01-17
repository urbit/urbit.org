+++

title = "Smart light bulb app"
date = "2022-10-27"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "A smart light bulb app for controlling the ambiance in your home"
reward = "4 stars"
assignee = ["~pilwyc-fastec", "~larryx-woldyr"]
champion = ["~simfur-ritwed"]
grant_id = "P0199"
completed = true
canceled = false
link = ""

+++

# Smart light bulb app for Urbit

## Summary 
Urbit’s strong identity system with a focus on privacy and local control points to potential use in the smart home. To show a proof-of-concept for smart home control by Urbit we should build out a basic integration for a smart light bulb. In this prototype a bulb can show current state and be controlled from a standard [Gall app](https://urbit.org/docs/arvo/gall/gall) accessible as a tile from the user’s [Landscape](https://urbit.org/blog/landscape-a-portrait) home screen. The full history and logging of the bulb will be collected to provoke consideration of what should be controlled and tracked by the people living in the smart home. This will inspire people to think of the potential utility of Urbit in the smart home, inspire non-Urbit users to think of Urbit in non-community driven scenarios, and be a small step forward in understanding the affordances for Urbit in the home.

## Scope
After completing the initial [Communal Computing for Urbit grant](https://urbit.org/grants/communal-computing) (and [release of the whitepaper](https://pilwyc-fastec-public.s3.us-west-2.amazonaws.com/Communal-Computing-for-Urbit-whitepaper.pdf)) we learned a lot about the expectations and problems Urbit users have with current smart home technologies. This includes the use of their identity, 3rd party data sharing, and maintenance.

Smart light bulb integrations will be considered for those that have publicly available, HTTP-based APIs. The first integration will be with the [Philips Hue](https://developers.meethue.com/develop/hue-api-v2/getting-started/). There is a [developer program with documentation](https://developers.meethue.com/develop/get-started-2/).

It should ideally be architected in such a way to allow for additional smart light bulb manufacturers that support HTTP-based integration to be added by other developers outside of the grant. Also, it should allow for integration of other device types with additional work to adopt their state and control capabilities longer term but not required in the delivery of this grant.

This would require an app tile that would display basic device state and a more expansive app to control the state of the devices. If this is not possible technically or proves to be too much work we could consider only including current state and interactivity in future work.

When opened the app would show the following:

1. Current, single smart light bulb that is configured - if nothing is configured a link to do so
2. Ability to control the current on/off state and brightness - hue adjustment will be a stretch goal
3. Link to history and logging - this will include changes in configuration, on/off, etc. 
4. Ability to manage devices: replacing current device, removing current devices, change configuration of current device

Anything that is found to be not possible during spiking and development will require a conversation of an appropriate tradeoff, functionality being [stubbed](https://en.wikipedia.org/wiki/Method_stub) or removed depending on the impact of testing the concept.

All smart light bulb providers require some type of specialized identity to be integrated (e.g. Philips Hue requires a Philips login) and will be linked with the Urbit ship’s planet. For this prototype we will use a moon since this seems like the most likely way a n Urbit device would be controlled and managed by a planet. All connected moons and comets will have the ability to control the connected light bulbs. However, they will not be able to configure new devices or remove them.

During the implementation a decision should be made about how much we can obfuscate the specifics of each lightbulb manufacturer's identity system and developer keys. In the worst case, we will require the Urbit user to register as a developer to get their own keys. In the best case, we hope that they can log in via some bridge to a SSO for the lightbulb’s service. There will need to be some investigation into whether this should be inside the Gall app or part of a module outside of Urbit to handle the special cases of login for each provider. 

The reference design that will be created will then be shared via open source for other developers to consider how to integrate other smart light bulbs and smart home devices. What we learn from the development of this reference app and use will provide the foundation for another grant to evolve the smart home offering for Urbit.

# Stages
The proposal will be broken into the following key stages:

## Technology spiking - in progress
Investigation into Philip Hue’s developer program, APIs, and capabilities. This is already in progress.

Some key questions that need to be answered:

* Are there any complications of using a moon as the identity to control the smart light bulb?
* Will we be able to do all of this in a React front end and Hoon or do we need to create something outside of Urbit to handle state?
* What will the setup experience be like for people? Do they need to get their own developer key?
* How will this work for Tlon (or other provider) hosted planets? Or does this require a local Urbit instance on the same home network?

## Design of home app
UI/UX for the display of state and control of the smart light bulbs. This would be part of the “[self-sovereign WeChat](https://messari.io/article/look-to-the-stars-navigating-the-urbit?referrer=author:mihai-grigore#:~:text=Imagine%20an%20extensible,existing%20computing%20platforms.)” where lightbulb control is integrated with Urbit’s Landscape application UX schema. Some prototyping and limited user testing should be performed based on an initial design.

For the first version we will only display an app icon (such as the Urbit smart home logo) rather than provide interactive functionality. If possible the Landscape icon will be replaced with functionality but will be a stretch goal for the grant proposal.

And the following interactions from the full app:

1. See a more spacious (full screen) display of the current lightbulb state.
2. Ability to toggle light bulbs, control brightness and hue (stretch goal) if it is available for that lightbulb.
3. Access to history of change in state, configuration, etc. 
4. Configure light bulbs by removing, replacing, and removing them from the app.
5. Control identities (moons for this prototype) which have permissions over given access accounts on the device/manufacturer side.

The ship (and its planet’s identity) will be linked with the identities required by the HTTP API for each lightbulb manufacturer. Moons will also gain access to the lightbulbs control but would ideally limit the configuration of new/current light bulbs. 

## Implementation
Building the reference implementation based on the design and any updates from the initial user testing. The ability to add new lightbulb “providers” and potential extensibility to different smart home devices should be considered when implementing the app.

## Testing
Beta program for Urbit users with smart light bulbs to try out and report issues which includes some qualitative interviews on their use. A user research interview guide will be created for this phase. All interviews will include problem questions (e.g. is this the right problem to solve in the smart home), usability (e.g. how does this app work for them), and future interest (e.g. how would this work in your home). 

## Publishing
Open source publishing of the reference design and implementation via Github. This will include blogging from the Urbit blog, podcast discussions, and any other appropriate announcements.

# Why are we the right people for the job
~pilwyc-fastec completed the first Communal Computing for Urbit grant and has continued to grow the community focused on Urbit smart homes.

~larryx-woldyr is a software engineer in the aerospace industry interested in sovereign computing and composable software.  He wants to explore opportunities in IoT and learn more about what Urbit has to offer.

# Milestones and Compensation
## Milestone 1 - 2 stars
* Technology spiking - October 31st, 2022
* Design of home app - November 15th, 2022
* Implementation - December 15th, 2022
## Milestone 2 - 2 stars
* Testing - January 6th, 2023
* Publishing - January 15th, 2023

# Funding
4 stars to be split evenly between ~larryx-woldyr and ~pilwyc-fastec upon distribution of the app.
