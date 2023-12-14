+++
title = "basket"
shortcode = "~nodmyn-dosrux/basket"
license = "MIT"
image = "https://bwyl.nyc3.digitaloceanspaces.com/basket/basket.png"
bgColor = "#F2F2F2"
developer = "Assembly Capital"
website = "https://github.com/bacwyls/basket"
description = "show off your meme collection"
+++


### Basket is a simple db of tagged images

The frontend displays the most recent image in the full window,
so it can be used to add some personal style to an urbit desktop environment.

In addition to being a personal db, basket is an experimental app on top of the 'rooms' primitive in [Realm](https://twitter.com/HoliumCorp).

Members of a room have temporary write-access to each others basket db.
The frontend makes it ergonomic and fun to share / collaboritively create this data.

In theory (at scale), this creates a kind of decentralized giphy.

The images you know about are the images your friends have shared with you.
It gamifies the creation of rich, human curated image metadata.
One obvious use case for this is keeping track of memes.

To export the full dataset you can GET `http://yoururbitship.com/~/scry/basket/images.json`
Then you might want to use a python script to actually download the images to local storage.

Eventually, it would be nice to have a simple way to export and share the dataset.

Read full documentation on the [Github repository](https://github.com/bacwyls/basket).
