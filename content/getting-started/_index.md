+++
title = "Getting Started"
weight = 1
description = "How to install Urbit."
page_template = "page_indiced.html"
template = "getting-started/index.html"
+++

If you use Mac or Linux and just want to jump in, you can download **Port** and install it to run Urbit for you and get going right away. You can also set up Urbit using the command line.

If you run Windows, or just want to give it a shot without worrying about the gritty bits, you may want to consider a [hosting provider](@/getting-started/planet.md#hosting-providers), though Windows instructions are provided [for power users](@/getting-started/cli.md).

### Get Port {#port}

**Port** is a desktop GUI application that allows you to spin up, access, and manage your Urbit ships without any knowledge of the command line or Urbit binary.

<div id="port-os" class="os mv3">
  <input type="radio" id="port-macos" name="port-os" checked>
  <label for="port-macos">MacOS</label>
  <div class="tab">
    <p>To install <strong>Port</strong> on MacOS simply download and open the <code>.dmg</code> file.</p>
    <a href="https://github.com/arthyn/port/releases/latest/download/Port.dmg" class="dib ph3 ba b--gray3 br2">
      Download Port
      <svg class="dib ml1" viewBox="0 0 842 1000" width="13.5" height="14" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M702 960c-54.2 52.6-114 44.4-171 19.6-60.6-25.3-116-26.9-180 0-79.7 34.4-122 24.4-170-19.6-271-279-231-704 77-720 74.7 4 127 41.3 171 44.4 65.4-13.3 128-51.4 198-46.4 84.1 6.8 147 40 189 99.7-173 104-132 332 26.9 396-31.8 83.5-72.6 166-141 227zM423 237C414.9 113 515.4 11 631 1c15.9 143-130 250-208 236z"/></svg>
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
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    cursor: pointer;
  }
  .os label:last-of-type {
    border-right-width: 1px;
  }
  .os input[type="radio"] {
    display: none;
  }
  .os .tab {
    display: none;
    border: 1px solid;
    padding: 1rem;
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
  }
  .os input[type='radio']:checked + label + .tab {
    display: block;
}
</style>

If you'd like to have more direct control over the Urbit virtual machine, or are setting up Urbit on a cloud droplet, try [installation using the command line](@/getting-started/cli.md).