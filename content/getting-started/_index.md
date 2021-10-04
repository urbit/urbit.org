+++
title = "Getting Started"
weight = 1
description = "How to install Urbit."
page_template = "page_indiced.html"
template = "getting-started/index.html"
+++

If you use Mac or Linux and just want to jump in, you can download **Port** and install it to run Urbit for you and get going right away. You can also set up Urbit using the command line.

If you run Windows, or just want to give it a shot without worrying about the gritty bits, you may want to consider a [hosting provider](/getting-started/planet#hosting-providers), though Windows instructions are provided [for power users](/getting-started/cli).

### Get Port {#port}

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

If you'd like to have more direct control over the Urbit virtual machine, or are setting up Urbit on a cloud droplet, try [installation using the command line](/getting-started/cli).

### Next steps

If you haven't already done so, we recommend spending 10 minutes or so reading
[Understanding Urbit](/understanding-urbit) to get acquainted with the project.
Then once you've been become acquainted with your ship and explored the network
for awhile, consider checking out the [User's Manual](/using) which provides
guidance and reference material for operating your ship, as well as explanations
for Urbit concepts everyone should eventually learn.
