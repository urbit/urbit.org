+++
title = "Command line install"
weight = 4
description = "Installation instructions for power users."
+++

If you're a power user, you can run the Urbit virtual machine directly using the command line. Choose the code for your operating system and run the commands in your terminal.

<div id="os" class="os">
  <input type="radio" id="macos" name="os" checked>
  <label for="macos">MacOS</label>
  <div class="tab">

```bash
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

```shell
mkdir ~/urbit
cd ~/urbit
wget --content-disposition https://urbit.org/install/linux64/latest
tar zxvf ./linux64.tgz --strip=1
~/urbit/urbit
```

Linux users may need to run this command in another terminal window to access your Urbit on port 80:

```shell
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' ~/urbit/urbit
```

</div>

  <input type="radio" id="windows" name="os">
  <label for="windows">Windows</label>
  <div class="tab">

```winbatch
mkdir %USERPROFILE%\urbit
cd %USERPROFILE%\urbit
curl -JLO https://urbit.org/install/windows/latest
tar zxvf .\windows.tgz --strip=1
%USERPROFILE%\urbit\urbit
```

> Windows 10 build 17063 and later includes the familiar `curl` and `tar` command-line tools.

</div>
</div>

If successful, you will see a block of output beginning with the line:

```
Urbit: a personal server operating function
```

### Booting a free identity {#comet}

There are two parts to Urbit: an **ID** and an **Operating System**.

You have just installed the Operating System on your computer.

The **ID** is similar to a username and password on another site. The difference is that the public part (the username) is verified by thousands of people around the world while only you hold the key (the password) to that ID.

There are five kinds of Urbit IDs but to get started you only need to know about two: we call them **planets** and **comets**.

---

**Planets** are scarce (this prevents spamming, among other things) and usually require a price to acquire. This is the recommended way to run Urbit, but it's a bit more involved.

A planet name looks like `~sampel-palnet`.

[Follow this guide](/getting-started/planet) if you have already acquired a planet.

[Find a planet to purchase](/getting-started#get-a-planet)

---

**Comets** are practically unlimited and free to acquire. At present, these are a great way to try out the network for free.

A comet name looks like `~dasres-ragnep-lislyt-ribpyl--mosnyx-bisdem-nidful-marzod`.

[Read more about Urbit ID here](/understanding-urbit/urbit-id)

---

To boot a comet, go into the command line and run the following command from the `urbit` directory you created during [Urbit installation](#os).

```sh
~/urbit/urbit -c mycomet
```

It may take a while to load the comet (probably only take a few minutes, but it could take longer). This comes along with it being free. When it's done you'll some messages ending like this:

```
ames: live on 31337
http: web interface live on http://localhost:8080
http: loopback live on http://localhost:12321
~sampel_marzod:dojo>
```

When your comet is finished booting, you will see `~sampel_marzod:dojo>` (Dojo: the Urbit command line).

To exit Urbit, use `Ctrl-D` or enter `|exit` into Dojo.

To start your comet up again, run the following from your `urbit` directory (note the lack of `-c` argument):

```sh
~/urbit/urbit mycomet
```

### Using the web interface

Urbit is an entirely new computer, so by default it drops you into the "dojo," which is its terminal. Like your current computer, it can be used to do just about anything if you know the right commands. You only need to know one command for now.

At the moment, the most common way to use Urbit is by launching apps like Groups (a communications suite) from the web interface homescreen. The web interface allows you to use your ship without touching the terminal. You just need to get the password, or `code`, from the terminal.

1. With your Urbit running, look for a line that says something like `http: web interface live on http://localhost:8080`. The number given is the port that your ship is using. It will most likely be 80 or 8080, but we're just making sure.
2. If the port given is `80`, simply type `localhost` into your browser's address bar. If the given port is a different number, such as `8080`, you would type `localhost:8080`. You'll be met with a login prompt.
3. In the window where you found the port number, type `+code` and press return. Copy-paste the code that appears into the "Access Key" field in the browser, and press continue.
4. Once in, take a look around and try launching an app like Groups.

## Next Steps

### Updating your comet {#updating}

Urbit comes with a recent release of the Urbit OS, but automatic updates of the `%base` desk (which contains the kernel of the OS) are not enabled by default for Comets. Many comets are used only once and thrown away, so it would be wasteful to update every single comet as soon as it boots. If you plan to use your comet for more than a quick test, you'll probably want to ensure you're running the latest version of the OS.

You can enable updates for your comet by typing `|install (sein:title our now our) %kids, =local %base` into Dojo and pressing Enter.

```
> |install (sein:title our now our) %kids, =local %base
>=
kiln: activated install into %base from [~samzod %kids]
kiln: downloading update for %base from [~samzod %kids]
```

### Read More about the Dojo {#the-dojo}

The dojo is Urbit's command line. You can use it to control your ship, or to execute arbitrary code. Check out the links below for more information.

- [Basic Operations](/using/os/getting-started)
- [Basic Hoon](/docs/tutorials/hoon/hoon-school/setup)
- [Glossary Entry](/docs/glossary/dojo)

### Purchase a Permanent Identity {#boot-your-planet}

You can continue using this comet indefinitely. There are currently few differences between using a comet-level identity and a planet-level one. However, some groups will not allow comets entry in order to maintain a certain level of quality, and changes may be made in the future that further devalue comets. They will always, however, be able to access the basic functions of the network.

A comet also comes with a long and fairly unmemorable name whereas a planet has a short name and a "sigil" (avatar) associated with it that makes it more identifiable on the network. You may notice all this within the first few minutes of using Urbit.

[For details of how to purchase a planet, visit this page](/getting-started#get-a-planet).

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
