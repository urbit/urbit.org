+++
title = "Getting Started"
weight = 0
description = "How to install Urbit."
page_template = "page_indiced.html"
template = "getting-started/index.html"
+++

Don't know what Urbit is? Spend ten minutes or so reading our page on
[Understanding Urbit](/understanding-urbit/).

If you want to jump right in and try out Urbit with a free, disposible ID called a **Comet**, you can download the desktop app [**Port**](#port). Once installed, start it up and hit the `Start without an ID` button. It'll take a few minutes to spin up the new Comet, then click `Launch Ship into Urbit` and you'll be at the login screen. Click on `Copy Access Key` at the bottom-left, paste it into the `Access Key` field, and hit `Continue`. You'll now be at your ship's home screen and ready to explore Urbit. You can also have a look at the [Next Steps](#next-steps) section below to help you get going.

If you want to get a permanent Urbit ID called a **Planet**, have a look at the [Get a planet](#get-a-planet) section below.

If you have a **Planet** and want some help getting it up and running the first time, see the [Setting up your urbit](/getting-started/planet) guide.

If you want to use a **Planet** without worrying about the gritty bits, you may want to consider a [hosting provider](#hosting-providers).

If you're technically proficient and would like greater control over the Urbit virtual machine than is possible with [Port](#port), or are setting up Urbit on a cloud droplet, try [installation using the command line](/getting-started/cli).

## Get Port {#port}

**Port** is a desktop GUI application that allows you to spin up, access, and manage your Urbit ships without any knowledge of the command line or Urbit binary.

<div id="port-os" class="os mv3">
  <input type="radio" id="port-macos" name="port-os" checked>
  <label for="port-macos">MacOS</label>
  <div class="tab">
    <p>To install <strong>Port</strong> on MacOS simply download and open the <code>.dmg</code> file.</p>
    <a href="https://github.com/urbit/port/releases/latest/download/Port.dmg" class="badge-sm bg-green-400 text-white" style="width: 12rem;">
      Download Port
    </a>
  </div>

  <input type="radio" id="port-linux" name="port-os">
  <label for="port-linux">Linux</label>
  <div class="tab">

We use `snap` so that **Port** can stay updated automatically. If you already have `snap` installed, simply run:

```sh
sudo snap install port
```

Or to install `snap` for your distribution, snapcraft provides [installation instructions](https://snapcraft.io/docs/installing-snapd).

  </div>

  <input type="radio" id="port-windows" name="port-os">
  <label for="port-windows">Windows</label>
  <div class="tab">
    <p>To install <strong>Port</strong> on Windows simply download and open the <code>.exe</code> file.</p>
    <a href="https://github.com/urbit/port/releases/latest/download/PortSetup.exe" class="badge-sm bg-green-400 text-white" style="width: 12rem;">
      Download Port
    </a>
    <p><small>
    Note: The Windows version is newly released and is not yet code signed so you will have to click through a prompt warning you about running it. If you simply click <code>more info</code> -> <code>run anyway</code> it will run.
    </small></p>
  </div>
</div>

<style>
  .os {
    display: flex;
    flex-wrap: wrap;
  }
  .os label {
    order: -1;
    padding: .5rem;
    min-width: 70px;
    text-align: center;
    cursor: pointer;
  }
  .os input[type="radio"] {
    display: none;
  }
  .os .tab {
    display: none;
    margin-top: 1rem;
    width: 100%;
    max-width: 100%;
  }
  .os .tab p:first-child {
    margin-top: 0;
  }
  .os .tab p:last-child {
    margin-bottom: 0;
  }
  .os input[type='radio']:checked + label {
    font-weight: bold;
    background-color: rgba(244,243,241,1);
    border-radius: 0.5em;
  }
  .os input[type='radio']:checked + label + .tab {
    display: block;
}
</style>

## Get a planet

There are a few ways to get your own planet:

- Getting an invitation from a friend (or stranger).
- Purchasing a planet, including hosting, from a [hosting provider](#hosting-providers).
- Manually setting up and hosting a planet purchased from a third party such as [azimuth.shop](https://azimuth.shop/), [urbit.live](https://urbit.live), [urbit.me](https://urbit.me), [Urbitex](https://urbitex.io), [Urbit Marketplace](https://urbitmarketplace.com/), or [Wexpert Systems](https://wexpert.systems).

## Hosting Providers {#hosting-providers}

Hosting providers will often sell you a planet and run it for you. This option is very simple but will probably cost a regular fee.

Urbit is designed to be portable. This means that if you sign up for hosting now but later want to leave your hosting provider and run your Urbit yourself, you should be able to work with them to obtain all of your data and boot your planet back up without losing anything.

Using hosting does mean that you're trusting your provider with your data, but so long as you have your planet, you'll always own your identity.

Current hosting providers are:

- [escape pod store](https://www.escapepod.store/)
- [Third Earth](https://third.earth/)
- [Tlon Corporation](https://tlon.io)
- [UrbitHost](https://urbithost.com)

## Next steps

Once you've got your ship up and running, you might like to join the official Urbit Community group and say hello. Just click on the `Groups` app and it will open Urbit's communications suite. In Groups, hit `Join Group` and enter `~bitbet-bolbel/urbit-community`. Once joined, a new tile for the group will appear on the Groups home screen. Open that, click on the `General` channel in the sidebar, and hit `Join Channel`. It'll take a couple of minutes to download the chat history, then you'll be able to post a message.

If you haven't already done so, we recommend spending a few minutes reading
[Understanding Urbit](/understanding-urbit) to get acquainted with the project.
Then once you've been become acquainted with your ship and explored the network
for awhile, consider checking out the [User's Manual](/using) which provides
guidance and reference material for operating your ship, as well as explanations
for Urbit concepts everyone should eventually learn.
