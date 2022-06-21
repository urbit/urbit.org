+++
title = "Cloud Hosting"
description = "How to host your ship in the cloud so you can access it from any device."
template = "doc.html"
weight = 2
[extra]
hidetitle = "true"
+++

The goal of this guide is to have clear and easy to follow best practices for deploying an Urbit node to a server you control in the cloud. Deploying in the cloud allows you to access your Urbit from any device.

Most Urbit users start out running their ship locally on one machine in order to play with it, but this means when your machine is offline your Urbit node is offline too (and can't get updates). You can also only access your Urbit from that one machine.

This guide uses Digital Ocean as the cloud provider, but others can be used.

## Create a Digital Ocean droplet

Create an account on [Digital Ocean][digital ocean]. Once you make an account, choose "Deploy a virtual machine".

![](https://luna-orb.nyc3.digitaloceanspaces.com/cloud_s01.png)

You should see the page below where you can create your Droplet, aka Virtual Machine:

![](https://luna-orb.nyc3.digitaloceanspaces.com/Screen%20Shot%202022-05-15%20at%2012.11.43%20PM.png)

Fill out the options like so:

#### Image

Ubuntu 20.04 (LTS) x64

#### Plan

- Shared CPU Basic
- CPU options: Regular with SSD
- 2GB / 1 CPU ($10/mo)

You can choose a beefier option if you'd like but the $10 option should be sufficient.

#### Add block storage

The $10 plan includes 50GB which should be sufficient for quite some time, so
you can skip this.

#### Datacenter region

Choose the region closest to you.

#### VPC Network

Leave this as default.

#### Authentication

In the "Authentication" field, select "SSH keys" and hit "New SSH Key". Run the
following command in your terminal, replacing `riclen-tinlyr` with the name of
your ship (sans the leading `~`):

```bash
SHIP="riclen-tinlyr" bash -c 'ssh-keygen -q -N "" -C $SHIP -f ~/.ssh/$SHIP && cat ~/.ssh/$SHIP.pub'
```

It should spit out a long string of letters and numbers beginning with
`ssh-rsa` and ending with your ship name. Copy the whole thing and paste it
into the "SSH key content" field on DO. In the "Name" field, enter your ship
name.

#### Additional options

Click "User data" and paste the script below into the field provided. This
will automatically configure the server and install necessary software.

```bash
#!/bin/bash

# configure swap
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo "/swapfile swap swap defaults 0 0" >> /etc/fstab

# setup firewall
ufw allow OpenSSH
ufw allow www
ufw allow https
ufw allow 34543/udp
ufw enable

# create and configure user
useradd -s /bin/bash -d /home/pilot -m -G sudo pilot
passwd -d pilot
echo "pilot ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# configure ssh keys for user
mkdir /home/pilot/.ssh
chmod 700 /home/pilot/.ssh
cp /root/.ssh/authorized_keys /home/pilot/.ssh/authorized_keys
chown -R pilot:pilot /home/pilot/.ssh
chmod 600 /home/pilot/.ssh/authorized_keys

# fetch and extract urbit binary
wget -P /home/pilot --content-disposition https://urbit.org/install/linux64/latest 
tar xzf /home/pilot/linux64.tgz --strip=1 -C /home/pilot
rm /home/pilot/linux64.tgz
chown pilot:pilot /home/pilot/urbit

# install necessary packages
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt -y update
apt install -y caddy tmux
```

#### How many Droplets?

1

#### Choose a hostname

This will be the name the server calls itself locally, you can put in whatever
you want. Your planet name is a good choice.

#### Add tags

Leave empty.

#### Select project

Leave as the default.

#### Create Droplet

Hit this button to create the droplet.

## Get domain

To access your ship easily from any device, it's necessary to have a domain
name. You can either buy one from a domain registrar like
[gandi.net](https://www.gandi.net/), [Namecheap](https://www.namecheap.com),
etc, or you can get a free subdomain from a site like
[freedns.afraid.org](https://freedns.afraid.org/).

In this guide, we'll walk through the second free option, but if you'd prefer
your own, you just need to add an A Record pointing to your droplet's public IP
address.

Go to [freedns.afraid.org](https://freedns.afraid.org/) and sign up. Once done,
log in and select the "Subdomains" option in the menu on the left. Choose to
add a new one, and you'll be presented with a screen like so:

![afraid.org subdomain add](https://m.tinnus-napbus.xyz/pub/2022.6.21..11.56.52-afraid-domain-add.png)

You can put anything in the "Subdomain" field, but typically you'd put your
planet name. You can choose whichever domain option you'd like. In the
"Destination" field, you'll need to put the public IP address of your droplet,
which you can get from the dashboard on Digital Ocean.

Once you hit "Save", the configuration is complete:

![afraid.org subdomain created](https://m.tinnus-napbus.xyz/pub/2022.6.21..11.56.52-afraid-domain-done.png)

## SSH into droplet

To make connecting simple, we can add an alias to `~/.ssh/config`. Open
`~/.ssh/config` in an editor (you may need to create it if the file doesn't
exist), and add the following to the bottom of the file (replacing the ship name
and IP address with your own):

```
Host riclen-tinlyr
  HostName 161.35.148.247
  User pilot
  IdentityFile ~/.ssh/riclen-tinlyr
  IdentitiesOnly yes
```

Once that's saved, connect to the droplet:

```bash
ssh riclen-tinlyr
```

You'll be asked to accept the fingerprint, and then you'll be taken to the
droplet's shell. In order to complete the domain name setup, you need to edit the
config file of the `caddy` reverse-proxy web-server. Run the following two commands
in the droplet's shell (replacing the domain with the one you chose previously):

```bash
echo -e "riclen-tinlyr.crabdance.com \n  reverse_proxy 127.0.0.1:8080" | sudo tee /etc/caddy/Caddyfile > /dev/null
sudo systemctl restart caddy
```

### What to do if your planet is currently hosted locally

If your planet is already running on [https://urbit.org/using/running/port][port] from your local machine, follow these steps to get it ready to deploy to your cloud-hosted server.

- **WARNING**: Since Urbit is p2p you don't want to ever run two copies of your
  ship simultaneously. This is because other nodes that interact with each of
  your copies will be confused by which one is the most up to date. This means you can’t host it locally and in the cloud at the same time, so you’ll have to shut down the version of your ship running locally. If you end up accidentally booting two copies of your ship (in this instance, one in port and one in the cloud) you'll have to do a 'factory reset' described in the [guide to resets](/using/id/guide-to-resets) to fix things.

- First, shut down your local ship. You can do this easily in Port, or you can do it in the dojo.

  - In port, first click `"Home"` in the bottom left corner of the home page.
    ![](https://luna-orb.nyc3.digitaloceanspaces.com/Screen%20Shot%202022-06-19%20at%208.28.20%20PM.png)
  - Then, click `"Manage"` next to the planet you want to upload to the cloud.
    ![](https://luna-orb.nyc3.digitaloceanspaces.com/cloud_s04.jpg)
  - Finally, click `"Export"`, and make note of the location in which you export your zipped planet so that you can use it in the next step.
    ![](https://luna-orb.nyc3.digitaloceanspaces.com/cloud_s03.jpg)

- In dojo: use either `"CTRL + D"` or `|exit`.

- Now we're going to send your ship to your server, from your local machine's urbit directory:
  ```
  $ scp <ship_dir_name>.tar.gz  your_user@your_domain:urbit
  ```
- Next, install “unzip” in your urbit directory so that you can upload your planet to your server:

  ```
  $ cd urbit
  $ apt install unzip
  ```

- Back on your server let's unzip your ship and start it up with the Ames port we allowed through the firewall:

  ```
  $ ssh your_user@your_domain
  $ cd urbit
  $ unzip<ship_dir_name>.zip
  $ ./urbit -p 34543 <ship_dir_name>
  ```

  Note: “-p 34543” is your pier aka port, mentioned in the “Setting up a Basic Firewall” section above. Make sure to use the same number as you used earlier.

- Please note that because log truncation hasn’t been released yet, this step could take a while to complete. If you’ve been running your planet for a while without breaching it, you’ll have a large amount of data to upload. In order to continue through the guide you’ll have to wait for your planet to upload to your server completely.
  - Do not close your terminal during this time and leave your computer plugged in to a charger. To give you a time estimate, I had my ship running for 2 years and it took about 30 minutes to upload.
  - If you accidentally close your terminal and end the process, you’ll have to start over again.

## 

## Botting Your Ship

Once your planet is uploaded to the server, type in the following to get into your local urbit directory. Skip this step if you are proceeding immediately from the previous section and haven’t closed your terminal session in the first window.

```
$ cd urbit
$ ssh your_user@your_domain (e.g. root@131.930.211.000)
```

You should see something like this pop up in your terminal:
![](https://luna-orb.nyc3.digitaloceanspaces.com/Screen%20Shot%202022-05-15%20at%203.01.47%20PM.png)

This is information about your virtual server. You can see your storage usage, swap usage, etc, and it will also tell you if you need to install any security updates.

Once you’re inside your server, you should see this as the terminal prompt. You see your planet’s name here because this is what you used as your droplet’s project name in digital ocean:

```
your_user@ravmel-ropdyl:~#
```

From here, you need to get into your server's urbit directory:

```
your_user@ravmel-rpodyl:~# cd urbit
```

Once there, you’ll boot your ship for the first time. You’ll use your host name from digital ocean, which should be the same as your host name in the prompt.

```
your_user@ravmel-ropdyl:~/urbit# ./urbit your_hostname
```

WARNING: This last step should be used only when booting your ship for the first time. If you reboot your ship, you’ll have to reset it, as we mentioned above. [insert link to resetting your ship instructions]. The “./urbit” command is what would reboot your ship.

## Logging in to Landscape

Your ship should now be sailing on the digital ocean. To check to see if your ship is ready, you can type your IP address into your web browser’s address bar (e.g. 131.930.211.000). If everything is working properly you should see a login page.

![](https://luna-orb.nyc3.digitaloceanspaces.com/Screen%20Shot%202022-05-12%20at%205.25.25%20PM.png)

### Getting your access key

In your ship’s dojo, use the following command to generate your login code.

```
~ravmel-ropdyl:dojo> +code
```

This will generate an access key so that you can log in to landscape.

## Leaving your Urbit running in a Screen session

Finally, to leave your Urbit running after you disconnect we can leave it in a Screen session. This is just a way to leave applications running in the background and then reconnect to them later. For example, this is how you can use fun apps like [https://apps.apple.com/my/app/escape-by-uqbar/id1610194217][escape] on your phone. Alternatively, the same can be done with tmux.

1. If you have proceeded through all the steps above, your ship will still be running and you’ll need to stop your ship. You can then skip to step 4.

```
~ravmel-ropdyl:dojo> // press & hold "CTRL + D"
```

2. If you are coming back and need to start a new terminal session, remember that you’ll need to SSH into your virtual server to proceed:

```
$ cd urbit
$ ssh your_user@your_domain (e.g. root@131.930.211.000)
```

3. Next, once you’re in Urbit in your virtual server, type in this command to get to Urbit:

```
your_user@your_domain $ cd urbit
```

4. Run the following command to set up a screen session:

```
$ screen -S urbit
```

5. We can now boot up the Urbit ship from the urbit directory in this session:

```
$ ./urbit <ship_dir_name>
```

- Now, disconnect from the screen session and leave the ship running by typing “CTRL + A + D” in the terminal.

- There are more screen commands for interacting with sessions that are easy to find on the internet.

To get back into the screen session, follow the steps in the next section.

### Accessing your planet later

In order to get back to your screen session in the virtual server later on without rebooting your ship, follow these steps from a new terminal window:

```
$ cd urbit
$ ssh your_user@your_domain
```

Once your server reconnects, type in the `“screen -r”` command to reattach your screen session:

```
your_user@ravmel-ropdyl:~/urbit# screen -r
```

Now, you should see your planet’s dojo in the command prompt.

Don’t forget to disconnect from the screen session and leave the ship running by typing `“CTRL + A + D”` in the terminal.

## Links and Misc.

A lot of the above documentation comes from combining existing resources.

On iOS you can save a website to your homescreen as an icon. If you do this for your Urbit domain it's a little like having it as an app.

- For the docs that made up this guide see the following links.
  - [Digital Ocean Initial Setup][do initial setup]
  - [Digital Ocean DNS][do dns]
  - [Digital Ocean Nginx Installation][do nginx install]
  - [Digital Ocean Nginx Config][do nginx config]
  - [Digital Ocean SSL Cert Setup][do ssl config]
  - [Urbit Install Docs](/getting-started/)
  - [Urbit Basic Cloud Install][urbit basic cloud install]

[gandi]: https://www.gandi.net/
[digital ocean]: https://www.digitalocean.com/
[do dns]: https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars
[do nginx install]: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
[do nginx config]: https://www.digitalocean.com/community/tutorials/how-to-deploy-a-go-web-application-using-nginx-on-ubuntu-18-04
[do ssl config]: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04
[urbit basic cloud install]: https://medium.com/@urbitlive/hello-world-urbit-edition-install-boot-and-run-your-urbit-planet-on-a-10-cloud-server-b9579745b9a8
[do initial setup]: https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
[blog github]: https://github.com/zalberico/zalberico.github.io

If you plan to use Nginx as a reverse proxy for your Urbit, it is important that you include the following settings in your configuration in order to allow the Landscape web client to properly communicate with your Urbit:
`chunked_transfer_encoding off; proxy_buffering off; proxy_cache off;`
