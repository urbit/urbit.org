+++

title = "Seamless QR Login"
date = "2022-09-13"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Implementation of the state-of-the-art, battle-tested user experience for logging into your urbit"
reward = "2 stars"
assignee = ["~mirtyl-wacdec"]
champion = ["~fabnev-hinmur"]
grant_id = "P0186"
completed = true
canceled = false
link = "~hoster-dozzod-sortug/qr-login"
deliverable = "~sortug/gate"

+++

# %qr-login: Secure, seamless login for Urbit

### Let's make joining Urbit easier
The first boot story of Urbit has improved much recent years, but it still requires technical skill. An Urbit user has to acquire an Urbit ID, which requires knowledge of the Ethereum ecosystem, and then has to find a good hosting setup to run the Urbit runtime, which also generally requires technical skill with Unix computers.

But even if ID acquisition and hosting aren't an issue, say you are using a paid hosting service, or a friend took care of booting your ship for you. When you first visit your Urbit frontend, either the Grid web interface, or the EScape mobile app, you are greeted with a login screen asking for the `+code` login password, or even the ship's URL (in the case of EScape). You have to repeat that for every new device or browser that you use.

This is not an ideal UX for the vast majority of users. Mainstream mobile apps such as Signal handle first login much more seamlessly; after registration is done, further logins are done via QR code. The app produces a QR code, you scan it, and that's it. That's the state-of-the-art, battle-tested user experience for modern applications. And we are bringing this to Urbit.

%qr-login will make it easier for newcomers to use Urbit, and will greatly enhance the user experience of the future native applications, desktop and mobile, that Urbit deserves.

### User stories
- A user will be able to login to Urbit just by scanning a QR code, no user input required, not even copy-pasting.
- A user will be able, if using a device without a camera, to receive a URL link and login to an Urbit ship instantly by clicking on it, again without any user action required.
- A hosting provider would be able to send a QR code or a URL link to a user, and have the user access his Urbit apps with a simple camera scan or click of a link. 

### Grantee
~sortug, represented by ~mirtyl-wacdec

### Milestones

#### Milestone 1
%qr-login implemented and fully functional. Merge ready PR for the [Uqbar official mobile template](https://github.com/uqbar-dao/urbit-mobile-app-template)
ETA: Before Assembly 2022
Payment: 2 stars.
