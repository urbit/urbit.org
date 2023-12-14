+++
title = "Cloud hosting"
weight = 4
description = "How to host your ship in the cloud so you can access it from any device"
tag = "selfhost"
+++

The goal of this guide is to have clear and easy to follow best practices for
deploying an Urbit node to a server you control in the cloud. Deploying in the
cloud allows you to access your Urbit from any device.

Most Urbit users start out running their ship locally on one machine in order to
play with it, but this means when your machine is offline your Urbit node is
offline too (and can't get updates). You can also only access your Urbit from
that one machine.

This guide uses Digital Ocean as the cloud provider, but others can be used. If
using another provider, the setup script provided and other server configuration
instructions may need to be modified or done manually.

## 1. Create a Droplet

Create an account on [Digital Ocean](https://digitalocean.com). Once you make an
account, choose "Deploy a virtual machine".

You should see the page below where you can create your Droplet, aka Virtual Machine:

![do screenshot](https://media.urbit.org/operators/manual/running/hosting/do-screenshot.png)

Fill out the options like so:

#### Image

Ubuntu 22.04 x64

#### Plan

- Shared CPU: Basic
- CPU options: Regular with SSD
- 2GB / 1 CPU ($12/mo)

You can choose a more powerful option if you'd like but the $12 option should be
sufficient. Note Urbit needs 2GB of memory; it's possible to choose a cheaper
option and run it with less memory by using swap but it will impact performance.

#### Add block storage

The $12 plan includes 50GB which should be sufficient for quite some time, so
you can skip this.

#### Datacenter region

Choose the region closest to you.

#### VPC Network

Leave this as default.

#### Authentication

In the "Authentication" field, select "SSH keys" and hit "New SSH Key". Run the
following command in the terminal on your local machine, replacing
`riclen-tinlyr` with the name of your ship (sans the leading `~`):

```bash {% copy=true %}
SHIP="riclen-tinlyr" bash -c 'ssh-keygen -q -N "" -C $SHIP -f ~/.ssh/$SHIP && cat ~/.ssh/$SHIP.pub'
```

It should spit out a long string of letters and numbers beginning with `ssh-rsa`
and ending with your ship name. Copy the whole thing and paste it into the "SSH
key content" field on Digital Ocean. In the "Name" field, enter your ship name.

#### Additional options

Click "+Advanced Options" check the box for "Add Initialization scripts (free)" and paste the script below into the field provided. This
will automatically configure the server and install necessary software.

```bash {% copy=true %}
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
useradd -s /bin/bash -d /home/urbit -m -G sudo urbit
passwd -d urbit
echo "urbit ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# configure ssh keys for user
mkdir -p /home/urbit/.ssh
chmod 700 /home/urbit/.ssh
cp /root/.ssh/authorized_keys /home/urbit/.ssh/authorized_keys
chmod 600 /home/urbit/.ssh/authorized_keys
chown -R urbit:urbit /home/urbit/.ssh

# configure sshd
mkdir -p /etc/ssh/sshd_config.d
cat > /etc/ssh/sshd_config.d/override.conf <<EOF
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
EOF

# fetch and extract urbit binary
curl -L https://urbit.org/install/linux-x86_64/latest | tar xzk --transform='s/.*/urbit/g' -C /home/urbit/
chown urbit:urbit /home/urbit/urbit

# install tmux
apt -y update
apt install -y tmux

# reboot
systemctl reboot
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

## 2. Prepare for upload

{% callout %}

**Note**

This step is necessary if you already have a ship running locally and want to
move it to the cloud. If you don't, you can skip this step.

{% /callout %}

In the Dojo, use either `"CTRL + D"` or `|exit` to shut down your ship.

Archive your pier by running `tar cvzf riclen-tinlyr.tar.gz ~/path/to/your/pier`
(substitute your own ship name and pier location).

## 3. Connect to the server

To make connecting simple, you can add an alias to `~/.ssh/config` on your local
machine. Open `~/.ssh/config` in an editor (you may need to create it if the
file doesn't exist), and add the following to the bottom of the file (replacing
the ship name with your own and the IP address with that of your droplet):

``` {% copy=true %}
Host riclen-tinlyr
  HostName 161.35.148.247
  User urbit
  IdentityFile ~/.ssh/riclen-tinlyr
  IdentitiesOnly yes
```

{% tabs %}

{% tab label="If you have an existing pier" %}


Copy the archived pier to the server with the following (substituting your ship
name and Host):

```bash {% copy=true %}
scp riclen-tinlyr.tar.gz riclen-tinlyr:
```

It may take a while to upload if your pier is large and/or your internet is
slow.

{% /tab %}

{% tab label="If you have a key file" %}

If you have obtained a planet and want to boot it for the first time, you'll
need to upload its key file to the server. These instructions assume you've
received an invite. If you've got a planet by another method, you can also login
to [Bridge](https://bridge.urbit.org) and download the key file from there.

If you've received a planet invite via email or a claim link like
`https://bridge.urbit.org/#labfur-batteg-dapnex-binsup-riclen-tinlyr`, open it
in a browser and you should see a page like the following:

![claim planet screenshot](https://media.urbit.org/operators/manual/running/hosting/claim-planet.png)

If you hit "Claim", it'll bring you here:

![download passport
screenshot](https://media.urbit.org/operators/manual/running/hosting/download-passport.png)

Hit "Download Backup (Passport)" and it'll have you download a file named like
`riclen-tinlyr-passport.zip`.

Unzip the file with:

```bash {% copy=true %}
unzip ~/path/to/download/folder/riclen-tinlyr-passport.zip
```

It'll create a folder called `riclen-tinlyr-passport` which will contain three files:

- `riclen-tinlyr-1.key`
- `riclen-tinlyr-Management Proxy.png`
- `riclen-tinlyr-Master Ticket.png`

You can physically print out the two `.png` files and store them in a safe and
secure location. Importantly, you should ensure the *master ticket* (which will
look something like `~tarnes-pilryd-dassed-sogsul`) is securely and safely
stored. If anyone gains access to the master ticket they'll have ownership and
control of your Urbit ID, and if you lose it you'll irreversibly lose ownership
and control of your Urbit ID.

The next screen on the claim page will ask you to re-enter the master ticket to
ensure you've recorded it accurately, and then the claim process is complete.
Once you've securely, physically backed up the master ticket and the `.png`
passports, it's a good idea to delete the `riclen-tinlyr-passport.zip` file and
the two `.png` files, so if someone gains access to your computer, your Urbit ID
will be safe.

This will leave only the `riclen-tinlyr-1.key` file. The key file contains your
planet's private keys, which are necessary to boot it up for the first time.
You'll need to copy that file to the server with the following command (again,
replacing `riclen-tinlyr` with your own ship and Host):

```bash {% copy=true %}
scp riclen-tinlyr-passport/riclen-tinlyr-1.key riclen-tinlyr:
```

Note: you should keep the `riclen-tinlyr-1.key` until you've completed this
guide and your ship is booted to be sure it was copied successfully, but
afterwards you should also delete that file for security.

{% /tab %}

{% /tabs %}

Once you've either uploaded your pier or uploaded your key file as the case may
be, you can connect to your server:

```bash {% copy=true %}
ssh riclen-tinlyr
```
You'll be taken to the shell on your server.

## 5. Boot your ship

{% tabs %}

{% tab label="If you have an existing pier" %}

In the previous section you ssh'd into the server. In the same ssh session,
extract the pier archive you previously uploaded, then delete the archive:

```bash {% copy=true %}
tar xvzf riclen-tinlyr.tar.gz && rm riclen-tinlyr.tar.gz
```

You'll now have a folder called `riclen-tinlyr`, which is your pier. Urbit is
best run in a tmux or screen session so it's easy to keep it running when
you disconnect. In this case we'll use tmux, which has already been installed
by the setup script.

Run tmux:

```bash {% copy=true %}
tmux
```

You should now be in tmux. First, dock your ship:

```bash {% copy=true %}
./urbit dock riclen-tinlyr
```

That will copy the `urbit` runtime inside the pier, so you can now delete the
separate binary:

```bash {% copy=true %}
rm urbit
```

{% /tab %}

{% tab label="If you have a key file" %}

In the previous section you ssh'd into the server. In the same ssh session,
start tmux:

```bash {% copy=true}
tmux
```

You should now be in tmux. Boot a new ship with the following command,
specifying the ship name and key file, as well as the Ames port that was
previously opened in the firewall by the setup script:

```bash {% copy=true %}
./urbit -w riclen-tinlyr -k riclen-tinlyr-1.key -p 34543
```

It may take several minutes to boot the new ship. Eventually, it'll take you to
the Dojo (Urbit's shell) and show a prompt like `~riclen-tinlyr:dojo>`. Once
booted, shut the ship down again by typing `|exit` in the Dojo. After it quits,
it should print something like "docked successfully", which means the binary has
been copied inside the pier. This means you can delete the separate binary:

```bash {% copy=true %}
rm urbit
```

The key file is only needed when you first boot the ship, so it's good practice
to delete it after first boot:

```bash {% copy=true %}
rm riclen-tinlyr-1.key
```

{% /tab %}

{% /tabs %}

Run the following to allow the runtime to bind ports 80 and 443:

```bash {% copy=true %}
sudo setcap 'cap_net_bind_service=+ep' riclen-tinlyr/.run
```

Now you can start your ship up with the following:

```bash {% copy=true %}
./riclen-tinlyr/.run -p 34543
```

After a few moments it'll show the Dojo prompt like `~riclen-tinlyr:dojo>`.

## 6. Get a domain

To make accessing the web interface convenient, you should request an
`arvo.network` domain name. To do so, run the following command in the Dojo,
replacing the IP address with your droplet's:

``` {% copy=true %}
-dns-address [%if .161.35.148.247]
```

This will request a subdomain of your ship like `riclen-tinlyr.arvo.network`.

The domain should be registered almost instantly, but sometimes it takes a while
for it to propagate to other DNS servers. You might therefore see the following:

```
> -dns-address [%if .161.35.148.247]
dns: request for DNS sent to ~deg
dns: awaiting response from ~deg
http: fail (13, 504): unknown node or service
http: fail (14, 504): unknown node or service
http: fail (15, 504): unknown node or service
http: fail (16, 504): unknown node or service
http: fail (17, 504): unknown node or service
dns: unable to access via riclen-tinlyr.arvo.network
XX confirm port 80
XX check via nslookup
0
```

If that happens, wait five or ten minutes and then try again. You should
eventually see:

```
> -dns-address [%if .161.35.148.247]
dns: request for DNS sent to ~deg
dns: awaiting response from ~deg
[%key iter=0 width=2.047]
[%key iter=1 width=2.047]
[%key iter=2 width=2.047]
[%key iter=3 width=2.047]
acme: requesting an https certificate for riclen-tinlyr.arvo.network
dns: confirmed access via riclen-tinlyr.arvo.network
0
acme: received https certificate for riclen-tinlyr.arvo.network
http: restarting servers to apply configuration
http: web interface live on https://localhost:443
http: web interface live on http://localhost:80
http: loopback live on http://localhost:12321
```

That means the domain has been registered and an SSL certificate has been
installed, so you can access the web interface securely with HTTPS.

## 7. Log in to Landscape

In order to login to the web interface, you need to get the web login code. Run
the following in the Dojo:

``` {% copy=true %}
+code
```

It'll spit out something like `ropnys-batwyd-nossyt-mapwet`. That's your web
login code, you can copy that and save it in a password manager or similar. Note
that the web login code is separate from the master ticket.

The server configuration should now be complete, and you can access Landscape in
the browser. Navigate to the domain you configured previously, in this case
`riclen-tinlyr.arvo.network`. You should see the Landscape login screen:

![landscape login screen](https://media.urbit.org/operators/manual/running/hosting/landscape-login.png)

Enter the web login code and you'll be taken to your ship's homescreen. Your
ship is now running in the cloud, and you can access it from any device by
visiting its URL.

## 8. Disconnect

You can now disconnect from the tmux session by hitting `CTRL+b d` (that is, you
hit `CTRL+b`, release it, and then hit `d`). You'll be taken back to the
ordinary shell, but the ship will still be running in the background. If you
want to get back to the Dojo again, you can reattach the tmux session with:

```bash {% copy=true %}
tmux a
```

Finally, you can disconnect from the ssh session completely by hitting `CTRL+d`.

## 9. Cleanup

If you booted a new ship by uploading a key file, it's a good idea to now delete
the key file on your local machine.

If you uploaded an existing pier, you should delete the old copy of both the
pier directory and the `.tar.gz` archive on your local machine. You might be
tempted to keep one of these as a backup, but note that **you must never again
boot the old copy on the live network**. Doing so will create unfixable
networking problems and require you to perform a factory reset through Bridge,
wiping your ship's data. We therefore don't recommend you keep duplicates of
your pier lying around.


## Next steps

- Kep your Urbit runtime up-to-date to take advantage of the latest Landscape and Application over-the-air updates.  See [Step #5 in the CLI guide](/getting-started/cli#5-runtime-upgrades) to update your runtime.

- Learn how to [get around your
urbit](/getting-started/getting-around).
