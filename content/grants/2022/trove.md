+++
title = "Trove: group file drive"
date = "2022-11-08"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "A shared file drive allowing the upload of files to an S3 bucket or IPFS and the ability to organize the file links in folders."
reward = "4 stars ($8k bonus if done by December 12, 2022)"
assignee = ["Quartus"]
grant_id = "B0164"
champion = ["Holium"]
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0164&prefill_Grant+Name=Trove"
+++

## Rationale

Having the ability to upload files to a personal or shared file drive is foundational to any operating system. Being that Urbit cannot (as of now) store large files, Trove will leverage third party storage solutions. Groups should be able to add files, manage folder hierarchy, view files and folders, and search for files.

## Overview

`trove`: A shared file drive allowing the upload of files to an S3 bucket or IPFS and the ability to organize the file links in folders.

## User stories

1. As a user, I want to view my files in my trove.
2. As a user, I want to add files to my trove.
3. As a user, I want to reorganize files in my trove.
4. As a user, I want to delete files from my trove.
5. As a user, I want to view previews of common image formats JPG, PNG, WebP, GIF
6. As a group member, I want to view my group's trove.
7. As a group admin, I want to manage permissions for adding files, adding folders, moving folders, and deleting files and folders.

## Architecture

The backend agent should store chronicles per group (or space) path (i.e. ~lomder-librun/my-group).

The backend agent should work alongside a client library to store metadata associated with a file hosting in S3 or IPFS. There would likely be two maps to manage. One being a map of file-url to metadata. The second being the folder structure and which files are in each folder.

The client library will do the uploading to S3 or IPFS and forward the metadata to the backend agent upon success.

## Permissions

Roles are as follows:

- member
- admin
- moderator

A group admin should be able to set roles for the following **actions**:

- add-file
- edit-file-metadata
- move-file
- delete-file
- add-folder
- edit-folder-metadata
- move-folder
- delete-folder

A set of roles will be mapped to each action as below:

- add-file: {member, admin}
- delete-folder: {admin, moderator}

Holium will work with the developer(s) to provide frontend support, but the team working on this bounty will be responsible for frontend implementation.

## Milestone 1: 4 stars ($4k bonus if done by December 12, 2022)

- Have a working file explorer app that can find files, transfer files, and drag and drop.

- Have recursive, per-folder, forced-nesting, permission sets for the operations described in **Permissions** above.

- Produce material contributions towards a frontend library to assist developers in integrating with Holium Spaces. **(Additional $4k bonus)**

For the milestone to be completed, the app must be approved by Holium and it must be hosted for distribution on Holium's app star (as well as your own if desired).

## Future work

- File tagging w/ lexicon data
- Drag and drop uploading
- Publicly permission folders and files to share with others and link file drives between groups.
- Hooking into the Realm Oracle for quickly searching for files

## Worker Requirements

- Prefer two developers
- At least one years of professional programming experience
- Experience with full-stack development, including JS and some server-side language
- Graduated from Hoon school
