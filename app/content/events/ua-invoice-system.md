+++
title = "Invoice system"
date = "2021-05-26"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "A system to request and record payments made and received."
reward = "1 star"
mentor = ["~timluc-miptev"]
assignee = [""]
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0020&prefill_Grant+Name=Invoice%20system"
+++

A system to request and record payments made and received. Currently, Urbit ships can send payments to each other via Bitcoin, record who made the payment, and verify its presence. However, there is no system to link those payments to records of what they were for.

This invoice system will be needed in Urbit at some point, and so this project has potential to be extended as a grants project in the future if an initial version works well.

### User Stories

As a user, I can:

- specify on-Urbit payment methods from which I will make or receive payments
- request a specific payment amount from another user, specifying the method(s) that can be used for payment
- tell a user that you've made a payment, with reference to some receipt that they can verify.
- receive payments with app and time metadata

As another application on a user's Urbit I can:

- generate invoices to be sent to other users
- query the invoice store to see which payments have been made for me
