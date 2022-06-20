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

- Create an account on [Digital Ocean][digital ocean].
- Once you make an account, choose "Deploy a virtual machine"

![](https://luna-orb.nyc3.digitaloceanspaces.com/cloud_s01.png)

- You should see the page below where you can create your Droplet, aka Virtual Machine:

![](https://luna-orb.nyc3.digitaloceanspaces.com/Screen%20Shot%202022-05-15%20at%2012.11.43%20PM.png)

- Create a droplet with the following settings:
- **Image**: Ubuntu 20.04 x64
- **Plan**
  - Shared CPU Basic
  - CPU options: Regular with SSD
  - 2GB RAM ($10/mo)\*
- **Add block storage**: Skip
- **Datacenter Region**: Choose the region closest to you.
- **VPC Network**: No VPC
- **Additional Options**: None
- **Authentication**: SSH keys, add a New SSH Key following the instructions DO gives you.
- **How many Droplets**: 1
- **Choose a hostname**: This will be the hostname of the box you ssh into (can be whatever you want, I used my Urbit planet name).
- **Add tags**: None
- **Project**: It'll select your default.
- **Backups**: Optional (it costs a little extra, but I have it enabled for peace of mind).

\*Note on storage plan: 2GB is what you should get as a standard user to save a little money. With 2GB, however, you will have to spend a few minutes setting up [https://www.digitalocean.com/community/tutorial_collections/how-to-add-swap-space][swap space]. If you’re a power user and expect to use more storage right away, you can get a 4GB plan.

Right now, Urbit does not have log truncation, though that is the plan for the future. Until then, if you run out of storage you’ll have to purchase more. This is unlikely unless you’re a power user

## Setting up a basic firewall

Continuing to follow the Digital Ocean docs we're going to configure the UFW firewall for your server via the command line.

UFW, aka "Uncomplicated Firewall" is a program for managing a netfilter firewall, and it is designed to be easy to use. In order to install UFW, you'll follow these steps:

- First, find your server's IP address in digital ocean:

![](https://luna-orb.nyc3.digitaloceanspaces.com/cloud_s02.jpg)

Then, inside your terminal, copy/paste the following code and run it by hitting enter.

```
$ ssh root@your_server_ip
$ [[NEED TO ADD INSTALL INSTRUCTIONS]]
```

- The below command shows us the applications available to be easily configured with firewall rules by UFW.

```
 $ sudo ufw app list
```

- Next we'll configure ufw to allow connections via ssh and to allow Urbit to use the standard web port when the firewall is enabled, as well as opening a port that we'll later specify for your urbit to use to communicate directly with other ships.

```
 $ sudo ufw allow OpenSSH
 $ sudo ufw allow www
 $ sudo ufw allow https
 $ sudo ufw allow 34543/udp
```

Note that you can choose any port in place of 34543 for Ames, this one is the standard option. You’ll also see this number referred to as a pier later on in this guide. Just be sure to pass the same port via the **-p** option when starting your ship.

- Next, we'll turn on the firewall:

```
 $ sudo ufw enable
```

- To see the current firewall status, use this command:

```
 $ sudo ufw status
```

## Installing Urbit

Finally we're ready to install Urbit on your very own server. This part is actually pretty easy, if you haven't installed Urbit locally then the instructions are the exact same as the ones in the Urbit [install doc](/getting-started/). If you have a local ship already, we're going to install Urbit on the server and then send your local ship up.

**The first thing you’re going to want to do is install Urbit and permit it to bind to the web ports**

```
$ ssh your_user@your_domain
$ mkdir urbit
$ cd urbit
$ wget --content-disposition https://urbit.org/install/linux64/latest
$ tar zxf ./linux64.tgz --strip=1
$ sudo setcap 'cap_net_bind_service=+ep' urbit
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

## Set Up Swap

**While you wait for your ship to upload, you can set up Swap.**

Check out this Digital Ocean article about [how to add swap space on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-20-04).

- Things to note:
  - Urbit needs _all_ 2 gigs to operate
  - If things start moving very slow after using your planet for some time, you can add additional disk space to your plan on digital ocean.

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

## DNS Setup

Now that your planet has been uploaded to your droplet in digital ocean & urbit is booted in your server, you’ll want to proceed with DNS setup in order to get a domain. You’ll want to proceed with this as soon as possible in order to encrypt your Urbit.

We have a system that lets you request a domain name for your ship in the form of `ship.arvo.network`, where `ship` is your ship's name minus the `~`. This allows users to access their ships remotely using Landscape, our graphical web interface. Stars and planets follow the same DNS request process, and galaxies have their own requirements. Moons and comets are not supported.

For a planet or star's DNS request to be made and fulfilled, they must be hosting their ship someplace with a public IP address, and its HTTP server must be listening on port 80. You have a public IP address because of your droplet.

Follow the steps from the “Accessing your planet later” section to get into your dojo if you aren’t already there. Then, to initiate a DNS request, run the following thread in your ship's dojo, passing the IP address as an argument with .0.0.0.0 (@if) syntax. For example:

```
dns-address [%if .1.2.3.4] // (e.g. [%if .131.930.211.000]
```

The `%dns-address` thread, running locally, will make an HTTP request to that IP address on port 80 to confirm that it is itself available at that IP and port. If that fails, you'll receive a `couldn't access ship on port 80` message in the terminal; this request will retry a few times. If the self-check is successful, the request is relayed to `~zod`, and you'll receive a message saying, `request for DNS sent to ~zod`. Once `~zod` has acknowledged receipt of the request, the `%dns-address` thread will print a terminal message saying `awaiting response from ~zod`.

The request will make take a little time to be fulfilled, but eventually the `ship.arvo.network`
 DNS record will be set to the given IP address. Once that's set up, `~zod` will be notified and `~zod` will, in turn, notify your ship. That ship will now try to verify that it can reach itself on `ship.arvo.network` over port 80. If it can't, it'll send a message saying, `unable to access via ship.arvo.network`. If it can, it will configure itself with that domain and say `confirmed access via ship.arvo.network`.

Now, you should see your planet trying to request DNS Setup in your terminal. This may take a while, and you can check to see if it worked by typing your domain name into your browser’s address bar: “ravmel-ropdyl.arvo.network”.

In order to send dm’s & continue to use your ship while your planet is awaiting DNS setup, you can connect to your ship remotely in Port. With Port freshly installed, you can hit See More Optionson the home screen and then Access remote ship. It should bring up this screen:

![](https://luna-orb.nyc3.digitaloceanspaces.com/port-remote-ship.png)

**Tip:** If you need to close your terminal during the DNS request, you can follow the steps in “Accessing your planet later” to get back to your screen session & your planet’s dojo.

### Let's Encrypt Cert

To make things more secure, you’ll want to run a Let’s Encrypt cert for your domain. (Note: if you have an alternative domain besides “your_planet.arvo.network”, you can replace ”com” with whatever your top-level domain is e.g. com in example.com.)

```
~ravmel-ropdyl:dojo> |start %acme
~ravmel-ropdyl:dojo> :acme &path /network/arvo/ravmel-ropdyl
```

Note: “your_subdomain” is optional and that part of the command should be omitted if you are not using it.

## Optional Steps

### Getting your own domain

Your own domain will make accessing your Urbit a lot easier (it'll also allow you to secure things with a Let's Encrypt cert). Domains are relatively inexpensive and since this guide is about best practices it's a required step.

There are a lot of domain name registrars you can use, this guide suggests **[gandi.net](https://www.gandi.net/)**. From there you can search for and register a domain that you like.

### Configuring your domain for your Digital Ocean Droplet

Once you've registered your domain you'll need to configure it to use Digital Ocean for DNS. The following steps are done on the Gandi website.

- Click Domain on the left panel
- Click the domain you're going to use for Urbit
- Click "Gandi's LiveDNS" under Nameservers in the Domain configuration section of the overview page
- Click Change
- Click External
- Add the Digital Ocean nameservers:
  - `ns1.digitalocean.com`
  - `ns2.digitalocean.com`
  - `ns3.digitalocean.com`
- Save the change.
- It can take 12-24 hours for this change to propagate.
- Now that you've updated the DNS records you can add the domain to your droplet.
- Back on the DO site, click Networking from the left panel and then enter the domain you registered.
- Click on that domain and add an A record that directs to the IP of your droplet (found on your droplet's page).

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
