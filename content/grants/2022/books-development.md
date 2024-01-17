+++
title = "Books feature development"
date = "2022-10-04"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Books is an application for managing your crypto wallets, transactions, and counterparties. It allows you to add your wallet and others' wallets, track balances and transactions, and add private annotations to all of the above."
reward = "2 stars"
assignee = ["~nismut-tamwep"]
champion = ["~dinleb-rambep"]
grant_id = "B0189"
completed = false
link = ""
deliverable = "~doller-doller-dozzod-dalten/books"
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0189&prefill_Grant+Name=Books%20Feature%20Development"
+++

[Books](https://urbit.org/grants/books) is an application for managing your crypto wallets, transactions, and counterparties. It allows you to add your wallet and other people’s, track balances and transactions, and add private annotations to all of the above.


# Overview

Books was developed by Quartus and has is currently distributed from [~dister-dozzod-dalten](web+urbitgraph://~dister-dozzod-dalten/books). The Foundation has found internal use for Books and has decided to fund continued development for some key features.

## Features in scope

- Rolodex entries should support multiple public addresses.
- Transactions in the ledger should automatically be associated with known counterparties from the rolodex. The associations should happen even for transactions that happened before the rolodex entry was created.
- Books should recognize transactions involving Urbit stars.
- Books should be able to display balances.
- Books should issue notifications on incoming transactions.

## Implementation Notes

Books is distributed as a desk that contains `/app/books` and a frontend written in Vue. This bounty will require modifying the Urbit backend and the Vue frontend.

The source code for Books lives at https://github.com/dalten-collective/books.

## Milestones and Compensation
The applicant will receive 2 stars on completion of all the features in scope.
