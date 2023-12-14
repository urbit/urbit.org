+++
title = "Gora: QR Edition" 
date = "2022-09-25"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "App Dev"]

[extra]
image = ""
description = "Extend Gora with QR-code generation and scanning for sending and recieving gorae"
reward = "1 star"
mentor = ["~rabsef-bicrym"]
assignee = ["~soctun-ridsyr"]
grant_id = "A0192"
completed = false
canceled = false
link = ""
deliverable = "~dalten/gora"
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0192&prefill_Grant+Name=Gora%20Apprenticeship"
+++

# Gora QR Edition - Updating Urbit's Premier Sticker Software

The Gora QR Edition Apprenticeship is a userspace application apprenticeship focused on experiential learning in Earth-to-Mars communication (web interfacing) using [sail](https://developers.urbit.org/guides/additional/sail) (urbit's XML markdown language) and [rudder](https://github.com/Fang-/suite/blob/master/lib/rudder.hoon) (urbit's leading library for raw http-request handling), as well as airlock through the [urbit/http-api npm library](https://www.npmjs.com/package/@urbit/http-api).

## Apprentice Expectations
Apprentice is familiar with Urbit and Gora. Apprentice has some familiarity with hoon, and ideally has a functional understanding of gall applications. Apprentices with an understanding of encoding data in QR codes preferred. 

## Team

The Gora QR Edition apprentice will work with the Quartus Team and ~rabsef-bicrym (Gora's creator) directly. The apprentice and Quartus team will participate in an initial "kick-off" call to talk through the user stories and the expected implementation, and will proceed with weekly or biweekly (at the apprentice's preference or need) meetings with ~rabsef-bicrym thereafter.

## Deliverable

Production-ready pull request to the [gora repo](https://github.com/dalten-collective/gora) and [vue-front-end repo](https://github.com/dalten-collective/gora-frontend) updating both Vue and Sail versions to allow for QR-code generation and scanning to give/receive a gora, as described in the user stories, below.

## User Stories

* As a Gora Issuer (host)
    * For Gorae that I host, which are either stakable or standard, which (if standard) are not at or beyond their max # of hodlers, I am able to:
        * Generate a one-time-use QR code in the application which, when scanned by another gora user, would request the gora for which I have generated the code;
        * Receive pokes from external ships who have scanned that QR code, containing the information of the QR code;
        * Decipher and validate the incoming, poked, QR code information;
        * and, where appropriate, provide the gora to the ship requesting it via the QR code.
    * I am able to complete these behaviors in both the Vue and Sail implementations of Gora.
* As a Gora Requester (hodler)
    * In my gora application, I can request a gora by scanning a QR code (amongst other methods).
    * When I scan a QR code, I automatically poke the host ship of the gora who's code I have scanned, with the information of the QR code for validation.
    * I am able to complete these behaviors in both the Vue and Sail implementations of Gora.

## Implementation Notes

We are amenable to suggestions of strategies from our apprentice as to the nature of the implementation of this feature, particularly in the Front-End presentation. We have a suggestion for the general implementation details on the backend, but are nonetheless open to input:

- Gora will get a state upgrade to include a `(jug gora-id nonce)`
- Each time a QR code is generated, a nonce will be randomly generated, checked to be unique against the `(set nonce)

## Schedule & Compensation

The Gora QR Edition apprenticeship should take no longer than 3 months, but is likely executable within a month. The apprentice will recieve 1 star upon successful completion of the apprenticeship.
