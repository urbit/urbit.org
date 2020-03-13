+++
title = "Bridge Troubleshooting"
template = "page_indiced.html"
description = "Troubleshooting Bridge if you are running into errors"
weight = 5
+++

### Canvas Issues

Bridge uses an HTML element called canvas to create your wallets. Unfortunately malicious websites can use canvas to identify and track users. As a result, some browsers and anti-tracking extensions can interfere with Bridge's ability to generate wallets. 

If there are no instructions for your browser, or the instructions don't work, please file a ticket on the [issue tracker](https://github.com/urbit/bridge/issues)

#### Brave Users

To fix canvas issues on Brave:

- Click on the Brave logo on the right edge of your URL bar
- Click `Advanced View`
- Set the bottom dropdown to `Cross-site device recognition blocked`
- Click on Retry in Bridge

The warning box should disappear.

#### Firefox Users

To fix canvas issues on Brave:

- Click on the icon of an image in your URL bar, to the left of
   `https://bridge.urbit.org`
- Click `Allow Data access`
- Click on Retry in Bridge

The warning box should disappear.

