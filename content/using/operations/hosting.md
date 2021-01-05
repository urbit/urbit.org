+++
title = "Hosting Your Ship In The Cloud"
description = "How to host your ship in the cloud so you can access it from any device."
template = "page_indiced.html"
weight = 2
[extra]
hidetitle = "true"
+++

## Hosting Your Ship In The Cloud
The goal of this guide is to have clear and easy to follow best practices for deploying an Urbit node to a server you control in the cloud. Deploying in the cloud allows you to access your Urbit from any device.

Most Urbit users start out running their ship locally on one machine in order to play with it, but this means when <<<<<<< do-ufw-https
87
 
 - Next we'll configure ufw to allow connections via ssh and to allow Urbit to use the standard web ports when the firewall is enabled.
88
 
   ```
89
 
   $ sudo ufw allow OpenSSH
90
 
   $ sudo ufw allow www
91
 
   
92
 
=======your machine is offline your Urbit node is offline too (and can't get updates). You can also only access your Urbit from that one machine.

This guide uses Digital Ocean as the cloud provider, but others can be used. 

## Create a Digital Ocean droplet
 - Create an account on [Digital Ocean][Digital Ocean].
 - Create a droplet with the following settings:
 - **Image**: Ubuntu 20.04 x64
 - **Plan**: 4GB RAM
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

## Getting your own domain
Your own domain will make accessing your Urbit a lot easier (it'll also allow you to secure things with a Let's Encrypt cert). Domains are relatively inexpensive and since this guide is about best practices it's a required step. 

There are a lot of domain name registrars you can use, this guide suggests [gandi.net][Gandi]. From there you can search for and register a domain that you like.

## Configuring your domain for your Digital Ocean droplet
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
 - - It can take 12-24 hours for this change to propagate.
 - Now that you've updated the DNS records you can add the domain to your droplet.
 - - Back on the DO site, click Networking from the left panel and then enter the domain you registered.
 - Click on that domain and add an A record that directs to the IP of your droplet (found on your droplet's page).

## Creating your non-root user
With our domain in place we're now ready to actually log into the box and start to configure the server itself.
 - Since we don't yet have a user we'll need to log in as root:
   ```
   $ ssh root@your_server_ip
   ```
 - If you set a passphrase on your ssh key, you'll be asked for it. If not, you should automatically be logged in.
 - Create a new user, in our example we'll use *sammy* (to match the DO docs), but you should use your own username: 
   ```
   # adduser sammy
   ```
 - Enter a strong password for your user. The questions `adduser` asks you don't matter, hit enter to skip them.
 - Give your new user sudo access: 
   ```
   # usermod -aG sudo sammy
   ```
 - Next we need to enable external access to our new user by moving the ssh key over from root (and setting proper permissions on it).
 - Be careful to note the **lack of trailing slash** in the command below after `/.ssh`:
   ```
   # rsync --archive --chown=sammy:sammy ~/.ssh /home/sammy
   ```
 - Test this connection with `ssh sammy@your_server_ip` from your local machine in a new terminal window.
 - To test that your domain is working try `ssh sammy@your_domain` from a new terminal on your local machine.
 - You should now be able to use this user going forward with `sudo` when necessary.

## Setting up a basic firewall
Continuing to follow the DO docs we're going to configure the ufw firewall.
 - The below command shows us the applications available to be easily configured with firewall rules by ufw.
   ```
   $ sudo ufw app list
   ```
   
 - Next we'll configure ufw to allow connections via ssh and to allow Urbit to use the standard web port when the firewall is enabled,
 as well as opening a port that we'll later specify for your urbit to use to communicate directly with other ships.
   ```
   $ sudo ufw allow OpenSSH
   $ sudo ufw allow www
   $ sudo ufw allow https
   $ sudo ufw allow 34543/udp
   ```
 Note that you can choose any port in place of 34543 for Ames. Just be sure to pass the same port via the `-p` option when starting your ship.
   
 - Next we'll turn on the firewall.
   ```
   $ sudo ufw enable
   ```
 - To see the current firewall status use the following.
   ```
   $ sudo ufw status
   ```

## Installing Urbit
Finally we're ready to install Urbit on your very own server. This part is actually pretty easy, if you haven't installed Urbit locally then the instructions are the exact same as the ones in the Urbit [install doc](@/using/install.md). If you have a local ship already, we're going to install Urbit on the server and then send your local ship up.
 - **WARN**: Since Urbit is p2p you don't want to ever run two copies of your ship simultaneously. This is because other nodes that interact with each of your copies will be confused by which one is the most up to date. If you end up accidentally doing this you'll have to do a 'personal breach' described in the [guide to breaches](@/docs/tutorials/guide-to-breaches.md) to fix things.
 - The first thing you're going to want to do is shut down your local ship, either with control-d or `|exit` in dojo.
 - Next we're going to install Urbit on the server and permit it to bind to the web ports:
   ```
   $ ssh your_user@your_domain
   $ mkdir urbit
   $ cd urbit
   $ wget --content-disposition https://urbit.org/install/linux64/latest
   $ tar zxf ./linux64.tgz --strip=1
   $ sudo setcap 'cap_net_bind_service=+ep' urbit
   ```
 - Now we're going to tar up your local ship and send it to your server, from your local machine's urbit directory:
   ```
   $ tar -zcvf <ship_dir_name>.tar.gz <ship_dir_name>
   $ scp <ship_dir_name>.tar.gz  your_user@your_domain:urbit
   ```
 - Back on your server let's untar your ship and start it up with the Ames port we allowed through the firewall:
   ```
   $ ssh your_user@your_domain
   $ cd urbit
   $ tar -zxvf <ship_dir_name>.tar.gz
   $ ./urbit -p 34543 <ship_dir_name>
   ```
 - Now we run a few commands in Dojo to request a Let’s Encrypt cert for your
   domain. Replace `tld` with whatever your top-level domain is e.g. `com` in
   `example.com`. `your_subdomain` is optional and that part of the command
   should be omitted if you are not using it):
   ```
   ~sampel-palnet:dojo> |start %acme
   ~sampel-palnet:dojo> :acme &path /tld/your_domain/your_subdomain
   ```
 - Your ship should now be sailing on the digital ocean. Check `https://your_subdomain.your_domain.tld`, if everything is working properly you should see a login page.
 - Log in with the code from `+code` in dojo like normal and you should see all of your applications.

## Leaving your Urbit running in a Screen session
Finally, to leave your Urbit running after you disconnect we can leave it in a Screen session. This is just a way to leave applications running in the background and then reconnect to them later. Alternatively, the same can be done with tmux. 
 - First start with your ship stopped, then run the following:
   ```
   $ screen -S urbit
   ```
 - This will start a screen session, we can now start up the Urbit ship from the `urbit` directory in this session:
   ```
   $ ./urbit <ship_dir_name>
   ```
 - Then we can disconnect from the screen session and leave the ship running with `control-a d`
 - To get back into the screen session:
   ```
   $ screen -r
   ```
- There are more screen commands for interacting with sessions that are easy to find on the internet.

## Links and Misc.
A lot of the above documentation comes from combining existing resources.

On iOS you can save a website to your homescreen as an icon. If you do this for your Urbit domain it's a little like having it as an app.

 - For the docs that made up this guide see the following links.
   - [Digital Ocean Initial Setup][DO Initial Setup]
   - [Digital Ocean DNS][DO DNS]
   - [Digital Ocean Nginx Installation][DO Nginx Install]
   - [Digital Ocean Nginx Config][DO Nginx Config]
   - [Digital Ocean SSL Cert Setup][DO SSL Config]
   - [Urbit Install Docs](@/using/install.md)
   - [Urbit Basic Cloud Install][Urbit Basic Cloud Install]

 [Gandi]: https://www.gandi.net/
 [Digital Ocean]: https://www.digitalocean.com/
 [DO DNS]: https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars
 [DO Nginx Install]: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
 [DO Nginx Config]: https://www.digitalocean.com/community/tutorials/how-to-deploy-a-go-web-application-using-nginx-on-ubuntu-18-04
 [DO SSL Config]: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04
 [Urbit Basic Cloud Install]: https://medium.com/@urbitlive/hello-world-urbit-edition-install-boot-and-run-your-urbit-planet-on-a-10-cloud-server-b9579745b9a8
 [DO Initial Setup]: https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
 [Blog Github]: https://github.com/zalberico/zalberico.github.io

