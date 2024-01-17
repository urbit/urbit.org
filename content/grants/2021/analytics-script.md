+++
title = "Analytics Script"
date = "2021-05-11"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Write a generator that exports chat data into a CSV."
reward = "1 star"
assignee = ["~hosted-fornet"]
completed = true
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0015&prefill_Grant+Name=Analytics%20Script"
+++

## Overview

In order to understand the growth of the network, it's important that we be able to measure the amount of activity within groups at any given point. Your task is to build an open-source script (a [generator](https://urbit.org/docs/tutorials/hoon/hoon-school/generators/)) that exports group activity into a format that can be analyzed.

## Implementation

The generator will read data from `graph-store` (and other requisite agents) and extract it into a CSV file.

### Output

The output of the generator is a CSV file with the following format: `timestamp,ship,group,channel,channel-type,content`. Each row of data represents a single post of some type; either a chat message, notebook post, or collection post.

The result of running the CSV should output the clay path to the file.

### Inputs

The generator should accept a few parameters:

- `path` (required): path to write the CSV to.
- `from` (required): absolute date (`@da`) from which data should be pulled.
- `to` (optional): absolute date (`@da`) up until which point data should be pulled. Default is the current time.
- `groups` (optional): list of groups to read data from. Default is to pull data from all groups that the running ship is a member of.
- `content` (optional): boolean of whether or not to include content in the CSV. Defaults to `false`.

## Requirements & Resources

- The Urbit Foundation will connect you with Tlon engineers for 1:1 support, should you need it
- Code should be submitted as a pull request against https://github.com/urbit/urbit
- The generator shall be called `crunch` (we're open to better ideas)

## Milestones

### Work is complete

1 stars
The generator is submitted as a pull request to the Urbit repository, reviewed, and merged.
