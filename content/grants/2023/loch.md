+++

title = "%loch"
date = "2023-02-23"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Core Dev"]

[extra]
image = ""
description = "A Hardware Control Vane"
reward = "7 Stars"
assignee = ["~mopfel-winrux"]
champion = ["~lagrev-nocfep, ~rovnys-ricfer"]
grant_id = "P0244"
completed = false
canceled = false

+++

# Introduction
This is a grant for a new vane called %loch. This will act as a hardware control vane providing an interface between Arvo and POSIX's IOCTL interface; enabling communication with various devices ranging from cryptographic hardware keys and dongles, embedded devices speaking on common communication interfaces (UART, SPI, I2C, etc), and IoT connected devices. POSIX-compliant host OSs provide access to these devices via file handles and through the ioctl system call. The runtime side of %loch acts as a hardware abstraction layer, which the Urbit/Hoon side complements by exposing an interface for the various expected communication types to devices

How %loch will work is best explained with the following usecase:

I have a receipt printer that communicates through UART communication. I want it to print out any %rumors I recieve.

This usecase will act as an end to end test of the entire system (described below) and allow incremental experimentation until the final product.

This grant is split into N parts

1. Creation of the vane (%loch and loch.c)
2. UART communication library (/lib/uart.hoon, /mar/*)
3. Gall agent (%receipt)
4. Documentation and Tutorial

# Vane
The Urbit/Hoon vane exposes an interface for registering and communicating with an external device using the host OS's systemcalls such as IOCTL. The runtime will have to be passed a list of device registrations @tas and a unix file location (e.g. [%uart '/dev/ttyUSB0'] for a uart device at ttyUSB0). When urbit is booted the runtime will pass this list of @tas to the vane to register the available devices. If a device's status changes the runtime will notify the vane of it through this same method.

%loch will also have a list of gall agents which are subscribed to the list of devices and will notify them with changes to it.

%loch's formal inteface is still under design but work flushing it out will fall under this grant.


# UART communication library
Having the %loch vane is nice but useless without "device drivers". A design decision was made to keep Arvo agnostic to different wire based communication protocols (UART, SPI, I2C, etc.). This also keeps vere agnostic to the exact communcation protocol. This design decision was made as to not flood vere with different libraries for these protocols (there is also some liscensing issues that this side steps, GPL is glitter).

The consequences of this means that device drivers will need to be written in hoon. The driver will live in userspace and act as middleware between a gall agent and loch.

A good basic driver to write is a UART (serial) driver.

The driver will need to do the following:

Define the IOCTL commands needed to read and write the UART attributes
Define UART marks that can convert between a UART settings struct and a noun
This can be as simple as a core with different settings as arms
Define a serialization arm that takes a noun and properly serializes it (useful for writes)
Define a deserialization arm that takes a noun and properly deserializes it (useful for reads)
Defines a read arm that handles the process of reading N bytes and unpacks it
Defines a write arm that handles the process of writing a noun to the device
This driver will act as an example driver that an application can use to talk to a UART device using loch.


# Gall Agent
Once the vane and library is tested work will begin on implementing a gall agent that subscribes to the %rumors app by ~paldev. The app will begin by subscribing to device notifications from %loch. It will then allow the user to pick which device they want to talk to (device metadata is outside the scope of this proposal). It will register itself to the device on %loch and set it up with the correct settings (baudrate, parity etc.). It will subscribe to %rumors and on recieving one it will send the correct command for the printer to output it.

The Agent will include a simple web interface that will allow the user to

Pick the device
Start subscribing to rumors
Stop subscribing to rumors


# Documentation and Tutorial
Documentation of how the vane works is vital to the succuss of it. The benefit of having a working app alongside the vane is to show users how to use the vane. The resulting communication library and gall agent will be written into a tutorial that should allow anyone to write a gall agent that can speak UART.

The library will also act as a template to expand %loch to other devices.


# Milestones

## Milestone 1: Vane
Payment: 3 Stars

This milestone includes a working vane that we can "bitbang" commands to talk to an arbitrary IOCTL device.


## Milestone 2: UART Library
Payment: 2 stars

This milestone is complete when a user can execute simple read/write across a UART wire without any "bitbanging"


## Milestone 3: Gall Agent
Payment: 1 star

This milestone is complete when a user can install the app and have the printer print its rumors


## Milestone 4: Documentation and Tutorial
Payment: 1 star

This milestone is complete with the delivery of a documentation and tutorial package.





Additional Documents can be found:

https://github.com/Native-Planet/documents/tree/main/proposal/loch 
