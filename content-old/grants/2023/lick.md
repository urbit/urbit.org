+++

title = "%lick"
date = "2023-02-23"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Core Dev"]

[extra]
image = ""
description = "An Earth Communication Vane"
reward = "7 Stars"
assignee = ["~mopfel-winrux"]
champion = ["~lagrev-nocfep, ~rovnys-ricfer"]
grant_id = "P0244"
completed = false
canceled = false

+++

# Introduction
This is a grant for a new vane called %lick. This will act as a way for `Gall` agents to open and close a communication port to Earth processes; enabling communication with various devices and processes  ranging from cryptographic hardware keys and dongles, embedded devices speaking on common communication interfaces (UART, SPI, I2C, etc), and IoT connected devices. 

How %lick will work is best explained with the following usecase:

I have a receipt printer that communicates through UART communication. I want it to print out any %rumors I recieve.

This usecase will act as an end to end test of the entire system (described below) and allow incremental experimentation until the final product.

This grant is split into 4 parts

1. Creation of the vane (%lick and lick.c)
2. Gall agent (%receipt)
3. Earth process which communicates with lick's port and the receipt printer
4. Documentation and Tutorial

# Vane
The Arvo vane exposes an interface for opening and communicating with a host device through Unix IPC ports. `%lick` extends `%galls` pokes to Earth based processes.

An agent will be able to `%spin` up a port (type `path`) and `vere` will create it in the piers `.urb/dev` folder. An agent will also be able to `%shut` this port. When an Earth process connects to the IPC port `vere` will send a `%soak` to the `duct` that opened the port. The soak will have the `mark` `%connect`. When the Earth process disconnects `vere` will send a `%soak` with a `%disconnect` `mark`. Whenever an earth process is connected the `gall` agent will be able to `%spit` a noun with the structure `[=mark =noun]`. The `gall` agent should also be able to receive a `%soak` with a similar noun structure. 

Data being transfered along the IPC port will be `jam`med nouns.


# Gall Agent
Once the vane and library is tested work will begin on implementing a gall agent that subscribes to the %rumors app by ~paldev. The app will begin by `%spin`ing a port. When an earth process connects to the port it will subscribe to %rumors and on recieving one it will send the correct command for the printer to output it.

# Earth Process

The Earth process will connect to a given IPC port and wait for a `%print` mark with a `@ta`. It will use `vere`'s eval function to `cue` the noun from the port and parse the hoon pretty printer to correctly print the message.

This will be fine for a receipt printer but future work will have to be done to implement a noun library in a given language. 

# Documentation and Tutorial
Documentation of how the vane works is vital to the succuss of it. The benefit of having a working app alongside the vane is to show users how to use the vane. The resulting gall agent and earth process will be written into a tutorial that should allow anyone to replicate this work.


# Milestones

## Milestone 1: Vane
Payment: 3 Stars

This milestone includes a working vane that we can send nouns back and forth too.


## Milestone 2: Gall Agent
Payment: 2 stars

This milestone is complete when a user can install `%receipt` and have it print rumors.

## Milestone 3: Earth Process
Payment: 1 star

This milestone is complete when a user can install the app and have the printer print its rumors


## Milestone 4: Documentation and Tutorial
Payment: 1 star

This milestone is complete with the delivery of a documentation and tutorial package.

