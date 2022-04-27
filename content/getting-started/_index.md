+++
title = "Getting started with Urbit"
weight = 0
description = "How to install Urbit."
page_template = "page_indiced.html"
template = "getting-started/index.html"
+++

Nothing about building a new OS from scratch has been easy. Or creating an identity system that adequately replaces the
IP address.

Getting on Urbit isn't always easy, either. The onboarding process hasn't been optimized by product managers in search
of maximal profit. There's no checkbox for your interests—you have to discover them yourself.

But we like to think this hard work is exactly what makes Urbit special. **Consider yourself warned.**

Why should you keep going? Urbit is a new computing stack based on you owning your networks, identity, and data. It's
well on its way to becoming your Final Computer.

- **As a user**, you can explore the people, community, and sheer novelty of the Urbit ecosystem while owning your
  entire experience. Your data, your messages, your apps.
- **As a developer**, you can now build apps, a protocol for a whole suite of apps, or an entire online subculture, and
  distribute your work directly to your users' operating systems. No middlemen, no MEGACORPs, and no lock-in.

Someone once said, "All the smart people I know disappear into Urbit." If you're smart, you will too — not just
installing and running Urbit, but taking the first step toward deploying your Final Computer.

## Launch into Urbit

Choose how you want to disappear into Urbit.

<div id="launch-type" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <a class="type block !p-8 bg-wall-100 rounded-xl hover:bg-wall-200 hover:opacity-100" href="#easy-steps">

### Easy

Deploy Urbit on your local system

- Zero cost to you
- Setup in minutes using a desktop GUI

- Not a permanent way to use Urbit

  </a>
  <a class="type block p-8 bg-wall-100 rounded-xl hover:bg-wall-200 hover:opacity-100" href="#fun-steps">

### Fun

Deploy Urbit on a cloud/VPS provider

- Self-host and own your data
- Portable identity and data accessible from anywhere

- Requires investment in planet (one-time) and cloud service (monthly)
- Requires Linux proficiency

  </a>
  <a class="type block p-8 bg-wall-100 rounded-xl hover:bg-wall-200 hover:opacity-100" href="#hosted-steps">

### Hosted

Deploy Urbit on a managed service

- Streamlined setup for ownership and identity
- No technical proficiency required

- Need to trust your provider
- Requires monthly investment

  </a>
</div>

<style>
  .type h3 {
    margin-bottom: 0.5rem;
  }
  .type > p {
    font-size: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .type ul {
    margin-top: 1rem;
    margin-bottom: 0rem;
  }
  .type li {
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
  .type li p {
    font-size: 0.925rem;
  }
</style>

## Easy {#easy-steps}

### Get Port

Port is a desktop GUI application that allows you to spin up, access, and manage your Urbit ships without any knowledge
of the command line or Urbit binary.

Port isn't considered a permanent way to run Urbit, but you can start with it now and migrate your data to a VPS/cloud
provider later using scp.

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

### Launch a comet without an Urbit ID

Start Port and hit the **Start without an ID** button. It'll take a few minutes to spin up the new comet. Once that's
finished, click **Launch Ship into Urbit** and you'll be at the login screen.

> Want to combine the simplicity of Port with a permanent Urbit ID?
>
> If you already have a planet, first get your keyfile using the steps below. Start Port, click the **Boot a fresh ID**
> option. Give your ship a name, and in the **Shipname** field, enter your planet name, like `~sampel-palnet`. For the
> **Key File** field, browse to the keyfile, select it, and hit **Continue**. Port will boot your Urbit in a few
> minutes!

### Log in

Within Port, click on **Copy Access Key**, paste it into the **Access Key** field, and hit **Continue**. You'll now be
at your ship's home screen and ready to explore Urbit.

Jump ahead to the [getting around your Urbit](#get-around-your-urbit) section for more.

## Fun {#fun-steps}

### Get yourself a planet

Here's some of the hard fun work we talked about earlier. While you can purchase a planet, we recommend asking for one.
Find someone who can give you a planet and make your case! That's the spirit of Urbit, after all — novel and esoteric.

- Ask for one on Twitter! Start with [@urbit](https://twitter.com/urbit) and explore from there.
- Go back to the instructions for launching a [temporary comet with Port](#easy-steps), get yourself onto the network,
  find a group, and start conversations with people with planets to spare.

An invitation to claim your planet comes in one of two forms. The first is an email invitation with an Urbit ID and a
Master Ticket. The second, only recently made available through our [Layer 2 (L2)
solution](/getting-started/layer-2-for-planets), is an activation code or a link to activate on Bridge.

### Use Bridge to get your keyfile

Now that you have your planet, you can create your keyfile (`sample-palnet.key`), which is the cryptographic signature
required to encrypt and decrypt messages on Urbit's P2P network.

If you don't already have your keyfile — a common situation for those receiving a L2 planet in particular — you can
download one from [Bridge](https://bridge.urbit.org/).

Login to Bridge and choose the **Master Ticket** option. Enter the name of your newly-acquired planet and the Master
Ticket password. Click the **ID** box near the bottom of the page, then the** Download Passport** button to download a
`.zip` file (named `sampel-palnet-passport.zip`), which contains your keyfile.

**[screenshot of the ID section on Bridge, once you've authenticated, with the Download Passport button visible]**

Unzip the passport to access your keyfile and the Master Ticket secret, which you should store somewhere secure. You'll
use your keyfile in the next step.

### Install Urbit via the command line

These fun instructions assume you have access to a **remote Linux system** running at a **VPS or cloud provider** of
your choice. If you want to run Urbit locally, whether on Linux, macOS, or Windows, you can adapt the [command line
install instructions](/getting-started/cli) for your base OS to what you'll find below.

You may also want to see the [cloud hosting guide](/using/running/hosting) for additional details like setting your
domain name and establishing a firewall, but for now, we'll focus on getting you set up as soon as possible.

Download Urbit with the following:

```
mkdir ~/urbit
cd ~/urbit
wget --content-disposition https://urbit.org/install/linux64/latest
tar zxvf ./linux64.tgz --strip=1
```

Next, transfer your `keyfile.key` to your server using scp or an FTP client, then move it to the `~/urbit` directory you
created in the last step.

Now you can run Urbit for the first time. Run the below command, replacing `ames_port` with a public port number between
`49152` to `65535`, `sampel-palnet` with the name of your planet, and `sampel-palnet.key` with the name of your keyfile.

```
./urbit -p ames_port -w sampel-palnet -k ./sampel-palnet.key
```

Arvo, the Urbit OS, now creates a directory called `sampel-palnet/` and begins booting your planet and establishing
connections with the P2P network. When that's finished, you'll see Dojo, the Urbit command line:

```
~sampel-palnet:dojo>
```

Welcome to Urbit! You can skip ahead to [log in](#fun-log-in), or stick around for some tips.

### The aforementioned tips

Check out the [cloud hosting guide](/using/running/hosting) for tips on improving the environment for Urbit, with a
particular focus on establishing your domain name and using SSL for encryption.

Shut down your planet by typing `Ctrl+D` into Dojo.

To boot your planet up again, run the following command, once again replacing `ames_port` with the port you used
previously, and now referencing your planet's folder.

```
./urbit -p ames_port sampel-palnet
```

Your planet's folder, `sampel-palnet/`, is called your **pier**, and it holds all your data. If you want to migrate your
data from one system to another, you must bring your pier.

You should also delete your keyfile from your remote system to prevent yourself from using the same key twice, which
will cause communication problems with other planets.

```
rm ./my-planet.key
```

### Log in {#fun-log-in}

First, use your browser to navigate to the URL+port where your ship is running. This could be an IP address or a
fully-qualified domain name, depending on how you set yours up.

Instead of a static password, Urbit uses an Access Key, which is given by your ship itself.

Open up the Urbit CLI again if it's not still running, and enter `+code`. The output is your Access Key, which you need
to copy and paste into your browser. Click **Continue** to finish authentication and log in.

Jump ahead to the [getting around your Urbit](#get-around-your-urbit) section for more.

## Hosted {#hosted-steps}

Hosting providers can sell you a planet and manage the hosting for you for a regular fee. We recommend [Urbit
Host](https://urbithost.com/) (not directly affiliated with Urbit) for quickly acquiring a planet and the hosting
required to make your Urbit experience accessible from anywhere.

Two important points about hosting providers:

- Because the provider has access to the resources that run your Urbit experience, you must trust them with your data.
- Urbit has portable data, so you should be able to work with a hosting provider to download all your data and boot up
  elsewhere if you choose to migrate or start self-hosting.

### Log in

The exact steps for logging into your Urbit will depend on your hosting provider's infrastructure and the flow they've
developed. If you have questions about logging into your hosted Urbit ship, contact their support.

Check out the next section for more.

## Get around your Urbit

After you've logged into your Urbit for the first time, you're officially an Urbiter! You've unlocked the entire Urbit
network with your newly-minted ID — the key to your new digital life.

**SCREENSHOT**

You'll see your Home and a few pre-installed applications: Terminal, Groups, and Bitcoin. More on them in a moment.

Above those are buttons to view **System Preferences** and **Help and Support** and check out notifications for
newly-installed or recently-updated applications, respectively. The search bar helps you surface applications you
already have installed, or discover developers and applications across the Urbit network.

You'll likely want to focus on finding and joining new communities, which you can do with the **Groups** app, which is
sometimes referred to as Landscape. Click on the box to open the application.

## Join a few groups with fellow Urbiters

No two people will ever have the same experience on Urbit. That depends entirely on who you find and where they invite
you to join them. But we can set you down a good path.

With Groups open, you'll see three boxes for **My Channels**, your local weather, and a stylized clock. You can dig into
those later, but let's focus on joining new communities, which is likely one of the reasons you wanted to try out Urbit
in the first place.

Click on **Join Group**, and in that modal, enter `~bitbet-bolbel/urbit-community` — the official Urbit community. You
can either automatically join all channels by clicking the Join all channels checkbox, or leave it blank and hit Join
Group right away. Your Urbit will connect to the P2P network and download information about the group, like a list of
all its participants. When that's finished, click **View Group**.

You're now looking at a single group and all of its channels. If you didn't choose to join all channels right away,
click on an individual channel and then **Join Channel**, which immediately opens the feed of latest messages.

Here are a few more useful groups to join:

- `~wolref-podlex/foundation`: The official community for the Urbit Foundation, which is one of the organizations behind
  Urbit's development. There are channels around pitching Urbit to others, applying for grants, planning meetups, and
  much more.
- `~rondev/group-discovery`: A group for finding other groups.
- `~middev/the-forge`: A group for sharing, discussing, discovering new Urbit applications.
- `~hocwyn-tipwex/uqbar-event-horizon`: A community around [Uqbar](https://uqbar.network/), a company creating
  applications and experiences on top of Urbit — notably EScape, which is an alternative to the default Groups
  application for joining communities and messaging with other Urbiters.

## Get more Urbit apps

Groups are great, but Urbit goes way deeper with apps that are developed specifically for Urbit and use P2P networking
for everything.

We'll use Canvas — a collaborative app for creating pixel art with others — as an example to show the process.

Head back to your Urbit's home — the URL you used to log in and view your preinstalled apps. From there, click on the
search bar and enter `~dister-norsyr-torryn/canvas`. Click on the first result, which shows you details about the
developer, the license, a website for more information, and when the app was last updated.

Click **Get App**, then **Get "Canvas"** to continue. Your Urbit gets to work, and once installation is finished, click
**Open App** to see it in action.

Some popular apps to get things moving:

- **EScape** / `~dister-fabnev-hinmur/escape`: An alternative UI to the core groups, communities, and messaging
  capabilities in Urbit.
- **Studio** / `~tirrel/studio`: Tools for making money on the Urbit network.
- **Wrdu** / `~magped-magped-rabsef-bicrym/wrdu`: A Wordle clone.
- **cliff** / `~paldev/cliff`: An filesystem explorer for your ship.

Don't forget [awesome-urbit](https://github.com/urbit/awesome-urbit) on GitHub. Some of the applications there require
more manual setup, but they're all Urbit-first.

## Get help

If you need help getting around Urbit, the best place to go is the official Urbit community:
`~bitbet-bolbel/urbit-community`. Those in the Help channel are willing to troubleshoot or provide links to resources to
help you get out of a jam.

That community isn't for every support request, however. If your question involves an app, you're better served reaching
out to the developer — for example, if you have an issue with EScape's notifications feature, reach out to Uqbar in
`~hocwyn-tipwex/uqbar-event-horizon`.

If you're having trouble with your planet or the hosting provider that's running your ship, try their support, as
they'll have more context and resources to help solve your issue.

And if you can't get through this guide and launch into Urbit, you may have luck with the [urbit live
community](https://t.me/UrbitLiveGroup) on Telegram.

## What's next?

You made it! You did the work and now have your Final Computer.

What you do with it is up to you. Where you go from here is up to you. No two experiences on Urbit will be the same, so
we encourage you to follow your own. Explore. Discover! Get lost and find the people who make you feel like you're not
lost any more.

Still need some bumpers to guide you along the way?

**Learn more about using Urbit**: Check out the [User's Manual](/using).

**Get updates about Urbit**:
[Subscribe](https://urbit.us11.list-manage.com/subscribe/post?u=972a03db9e0c6c25bb58de8c8&id=be143888d2) to the
Urbit Newsletter for new blog posts and events from one of the primary organizations responsible for Urbit development.

**Join an event or meetup**: Many of the organizations and people behind Urbit host virtual and in-person events on a
regular basis — check out the latest on our [Events feed](/events).

**Learn how to build on Urbit**: If you're the kind of person who wants to build applications directly for discerning
communities with built-in identity and networking primitives, or even jump into the Urbit kernel's core, we have the
most phenomenally-comprehensive information to get you started.

- Read the [Development Docs](/docs).
- Check out the development-driven [Getting Started guide](/docs/development/develop).
- Join [Hoon School Live (HSL)](https://hooniversity.org/), the cohort-driven course that teaches you Hoon, with the
  goal of getting you comfortable writing generators, working with core concepts, using the standard library, and
  distributing code using desks.
