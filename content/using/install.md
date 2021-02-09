+++
title = "Getting Started"
weight = 1
description = "How to install Urbit."
template = "page_indiced.html"
aliases = ["/docs/getting-started/"]
+++

The price of using other platforms is your data and its security. There's a reason they're free to use.

The price of using Urbit is your own responsibility — you must run it yourself (or pay someone to run it for you).

It's easy and it keeps getting easier.

There are currently two ways to run Urbit:

If you use Mac or Linux and are not afraid of a few terminal commands, we recommend you run it yourself. That is the aim of this guide.

If you run Windows or just want to give it a shot without worrying about the gritty bits, you may want to consider a [hosting provider](/using/planet#hosting-providers).

## Installing Urbit {#macos-and-linux}

Choose the code for your operating system and run the commands in your terminal.

<div id="os">
  <input type="radio" id="macos" name="os" checked>
  <label for="macos">MacOS</label>
  <div class="tab">

```sh
mkdir ~/urbit
cd ~/urbit
curl -JLO https://urbit.org/install/mac/latest
tar zxvf ./darwin.tgz --strip=1
~/urbit/urbit
```
  </div>

  <input type="radio" id="linux" name="os">
  <label for="linux">Linux</label>
  <div class="tab">

```sh
mkdir ~/urbit
cd ~/urbit
wget --content-disposition https://urbit.org/install/linux64/latest
tar zxvf ./linux64.tgz --strip=1
~/urbit/urbit
```

Linux users may need to run this command in another terminal window to access your Urbit on port 80:

```sh
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' ~/urbit/urbit
```
</div>

  <input type="radio" id="windows" name="os">
  <label for="windows">Windows</label>
  <div class="tab">

> Please note that this method of installing Urbit is experimental, and we may not be able to assist you if you encounter issues related to WSL 2.

Urbit cannot run on Windows itself, but there is a convenient way to run Linux using the [Windows Subsystem for Linux 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) on Windows 10. Install the Windows Subsystem for Linux 2 and open a Linux terminal in Windows, then follow the Linux installation instructions below. These instructions have been tested and verified for WSL 2 + Ubuntu 18.04 LTS, as demonstrated in `~sitful-hatred`'s step-by-step setup guide [here](https://subject.network/posts/urbit-wsl2/).

For performance reasons, do not install Urbit in the mounted Windows volume, but install it in the Linux file system. For example, in your home directory, which can be navigated to by entering `cd ~`.
</div>
</div>

<style>
  #os {
    display: flex;
    flex-wrap: wrap;
  }
  #os label {
    order: -1;
    padding: .5rem;
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    cursor: pointer;
  }
  #os label[for=windows] {
    border-right-width: 1px;
  }
  #os input[type="radio"] {
    display: none;
  }
  #os .tab {
    display: none;
    border: 1px solid;
    padding: 1rem;
    max-width: 100%;
  }
  #os input[type='radio']:checked + label {
    font-weight: bold;
  }
  #os input[type='radio']:checked + label + .tab {
    display: block;
}
</style>

If successful, you will see a block of output beginning with the line:

```
Urbit: a personal server operating function
```

## Booting a Free Identity {#comet}

There are two parts to Urbit: an **ID** and an **Operating System**.

You have just installed the Operating System on your computer.

The **ID** is similar to a username and password on another site. The difference is that the public part (the username) is verified by thousands of people around the world while only you hold the key (the password) to that ID.

There are five kinds of Urbit IDs but to get started you only need to know about two: we call them **planets** and **comets**.

***

**Planets** are scarce (this prevents spamming, among other things) and usually require a price to acquire. As plans for Urbit come to fruition, most people will use these.

A planet name looks like `~sampel-palnet`.

[Follow this guide](/using/planet) if you have already acquired a planet.

[Find a planet to purchase](/using/planet#purchase)

***

**Comets** are practically unlimited and free to acquire. At present, these are a great way to try out the network for free.

A comet name looks like `~dasres-ragnep-lislyt-ribpyl--mosnyx-bisdem-nidful-marzod`.

[Read more about Urbit ID here](/understanding-urbit/urbit-id)


***

To boot a comet, go into the command line and run the following command from the `urbit` directory you created during [Urbit installation](#installing-urbit):

```sh
~/urbit/urbit -c mycomet
```

It may take a while to load the comet. This comes along with it being free. It won't take more than an hour, but will probably only take a few minutes. When it's done you'll some messages ending like this:

```
ames: on localhost, UDP 31337.
http: live (insecure, public) on 8080
http: live ("secure", public) on 8443
http: live (insecure, loopback) on 12321
~sampel_marzod:dojo>
```

When your comet is finished booting, you will see `~sampel_marzod:dojo>` (Dojo: the Urbit command line).

To exit Urbit, use `Ctrl-D` or enter `|exit` into Dojo.

To start your comet up again, run the following from your `urbit` directory (note the lack of `-c` argument):

```sh
~/urbit/urbit mycomet
```

## Using Landscape

Urbit is an entirely new computer, so by default it drops you into the "dojo," which is its terminal. Like your current computer, it can be used to do just about anything if you know the right commands. You only need to know one command for now.

At the moment, the most common way to use Urbit is through a web app named Landscape, which comes with Urbit. It runs in your browser and provides an interface to Urbit without using the terminal. You need to get the password, or `code`.

1. With your Urbit running, look for a line that says something like `http: live (insecure, public) on 80`. The number given is the port that your ship is using. It will probably be 80, but we're just making sure. (Don't worry about the "insecure, public" part — that just means you can access it from your own web browser. It doesn't give anyone else access.)
2.  If the port given is `80`, simply type `localhost` into your browser's address bar. If the given port is a different number, such as `8080`, you would type `localhost:8080`. You'll be met with a login prompt.
3. In the window where you found the port number, type `+code` and press return. Copy-paste the code that appears into the "Access Key" field in the browser, and press continue.
4. Once in, take a look around and read the instructions on screen. If you ever get logged out, follow these instructions again.

## Next Steps

### Updating your comet {#updating}

The Urbit binary comes with a somewhat recent release of the Urbit OS, but ships can update automatically ("over the air"), so new binaries aren't necessary every time it's updated. Planets have automatic updates enabled by default, but this is not the case for comets. Many comets are used only once and thrown away, so it would be wasteful to update every single comet as soon as it boots. If you plan to use your comet for more than a quick test, you'll probably want to ensure you're running the latest version of the OS.

You can enable updates for your comet by typing `|ota (sein:title our now our) %kids` into Dojo and pressing Enter.

```
> |ota (sein:title our now our) %kids
>=
```

If you want to make sure you'll get updates, you can check by typing `|ota` with no arguments:

```
~sampel_marzod:dojo> |ota
OTAs enabled from %kids on ~marzod
use |ota %disable or |ota ~sponsor %kids to reset it
> |ota
>=
```

### Purchase a Permanent Identity {#planet}

You can continue using this comet indefinitely. There are currently few differences between using a comet-level identity and a planet-level one. However, some groups will not allow comets entry in order to maintain a certain level of quality, and changes may be made in the future that further devalue comets. They will always, however, be able to access the basic functions of the network. A comet also comes with a long and fairly unmemorable name whereas a planet has a short name and a "sigil" (avatar) associated with it that makes it more identifiable on the network. You may notice all this within the first few minutes of using Urbit.

[To read instructions on how to purchase and use a planet, visit this page](/using/planet).