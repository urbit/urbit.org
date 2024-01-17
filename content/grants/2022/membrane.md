+++
title = "Membrane" 
date = "2022-06-02"
[taxonomies] 
grant_type = ["Proposal"]
grant_category = ["App Dev"]
[extra] 
image = ""
description = "Martian native spreadsheets"
reward = "5 stars"
assignee = ["~tiller-tolbus"]
champion = ["~sarlev-sarsen"]
grant_id = "P0138"
completed = false
canceled = false
link = "~tiller-tolbus/membrane"
deliverable = "~tiller-tolbus/membrane"
+++

# Intro

Urbit is an OS, and any good OS needs a spreadsheet program. 

Like in many other domains, the native affordances of Urbit make it a promising platform in which to handle spreadsheet documents. The identity system allows for easy filesharing and collaboration, and Clay is an ideal environment for storing revisions to refer back to at later date. In addition, Hoon's text-parsing and virtualization affordances make it a promising environment for customizable spreadsheet functions. 

A fully fleshed out version of a spreadsheet app on the Urbit platform would be a powerful business logic machine capable of performing most of the tasks necessary to a small business without the need for sophisticated app development, with federated networking capabilities to handle complex interactions between multiple small businesses. Any spreadsheet, and the logic therein, could be transformed into a permissioned API as secure as Urbit itself, and serve as the database backbone for any number of applications.

This proposal an attempt to lay the foundation for future development by producing a useful tool with the core necessary features of an Urbit-native spreadsheet, in order to accomodate Urbit-native businesses in greater capacity and to provide a concrete basis for what a "Google Sheets killer" app on Urbit should look like.

# Timeline

## Milestone 0: Proof of Concept

Expected Completion: Finished

Payment: None

Our demo has shipped and can be found at `~mister-master-tiller-tolbus/cell`. It is a one-spreadsheet app that can sync its spreadsheet to the user's ship. This represents the first footsteps of spreadsheets on Mars. It is a proof of concept that we can make a spreadsheet application on Urbit.

## Milestone 1

Expected Completion: September 2022

Payment: 2 stars

*  I can create spreadsheets through `Membrane` that are saved to my ship's filesystem through Clay and revision controlled therein.
*  I can view a selection of all of the spreadsheets I have access to from the homepage.
*  I can view the homepage as a list or a grid and sort spreadsheets by title, tags, or date modified.
*  I can give my spreadsheets a title, and a list of metadata tags.
*  I can customize the appearance of cells within my sheets by changing the format of the text or the color of the background.
*  I can perform basic arithmetic by referencing other cells, such as `=(A1+B2)`. Basic arithmetic includes addition, subtraction, multiplication, division, and tests for equality.
*  I can insert rows and columns into my spreadsheet by right-clicking on the column or row header.
*  I can share my spreadsheets with my pals. This sends them an invite where they can accept my spreadsheet and create a local copy of it on their ship.

## Milestone 2

Expected Completion: May 2023

Payment: 3 stars

* I can organize my spreadsheets into folders that are visible from my homepage.
* I can view an edit history of the sheet I'm working on and revert back to an arbitrary date.
* I can use any formula from the [Formula.JS](https://formulajs.info/) library to reference other cells within my sheet, and have those formulas automatically update when their referenced cells change.
* I can select a group of consecutive cells and copy-paste them into another group of consecutive cells.
* I can search my spreadsheet, or a selection within my spreadsheet, for a pattern of characters, and perform find/replace within my search.
* I can select a group of cells matching a pattern such as `A1 = 1, A2 = 2, A3 = 3...` and drag so that the following cells follow the pattern, ex. `A4 = 4, A5 = 5...`.
* I can export my spreadsheets to CSV format and download them onto my Terran computer.
* I can import CSV spreadsheets from my Terran computer onto Membrane.
* When receiving a spreadsheet over the network that conflicts with the path of an existing spreadsheet, I can view the changes made to my local copy and decide which changes, if any, to overwrite my local copy with.
* I can read about the features of `Membrane` by looking at its page in the `Documentation` app.
* My spreadsheets expose an API that can be accessed by third-party front-ends, as well as other Urbit apps. All pokes and scries are documented in the `Documentation` app. This API contains, at minimum, the following operations:
  * Create an empty spreadsheet
  * Delete a spreadsheet
  * Rename a spreadsheet
  * Change the location of a spreadsheet in the Clay filesystem
  * Add or remove tags to a spreadsheet
  * Change the access level of a user in a spreadsheet
  * Retrieve an entire spreadsheet in JSON
  * Replace an entire spreadsheet with a new spreadsheet from JSON
  * Retrieve a list of subfolders or spreadsheets within a given directory
  * Modify the value and/or metadata of a cell
  * Retrieve the value and metadata of a cell in JSON
  * Retrieve an entire row of cells in JSON
  * Retrieve an entire column of cells in JSON
  * Batch a series of changes to be entered sequentially

# The Future of Spreadsheets on Urbit

In the future, we'd like to see the following things implemented on `Membrane` to make it the killer app it should be. Upon completion of this project, we will construct a new grant proposals to implement the following feature:

* Evaluation of spreadsheet formulas in Hoon rather than in the browser, with fields updating automatically in the background upon interaction with the API from third party clients.

# Our Team

Our team is a two-man cohort of `~tiller-tolbus` and `~randes-losrep`. Our duo currently works by splitting the front-end and back-end considerations evenly. In simple terms, `~tiller-tolbus` works on Martian code, while `~randes-losrep` works on Terran code. 

As we are both remaining pseudonymous to whatever degree possible, we have developed a demo app showcasing our ability to write and distribute apps on Urbit.
``
