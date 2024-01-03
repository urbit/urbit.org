+++
title = "vita"
shortcode = "~nodmyn-dosrux/vita"
license = "MIT"
image = "https://bwyl.nyc3.digitaloceanspaces.com/vita%2Fvita.png"
bgColor = "#F2F2F2"
developer = "Assembly Capital"
website = "https://github.com/assemblycapital/vita"
description = "monitor your app distributions"
+++

### Keep track of your app distributions

To get downloads, `:vita` periodically scrys %cs /subs for each desk and caches the results.

`:vita` accepts foreign pokes attesting to activity on a desk.
`/lib/vita-client.hoon` helps any agent send vita activity pokes.
It sends a maximum of one poke per day, and allows users to opt-in / opt-out depending on developer preference.

Read full documentation on the [Github repository](https://github.com/assemblycapital/vita).