+++
title = "coturn Operator Guide"
description = "Instructions for running a coturn server on your star."
weight = 4
template = "doc.html"
+++

To make voice and video calls through urbit we use a protocol called WebRTC which allows ships to connect directly to each other. Most times one or both ships are behind NATs and firewalls and often they are unable to connect. To get around this, instead of connecting directly to each other the ships can all connect to a TURN server (Transversal Using Relays around NATs) which will relay all the data between all the participants. Since this is relaying a bunch of data there are no free TURN servers on the internet. Thus a nice service that a star can provide is to run a TURN server and allow it's sponsored planets to use it. This guide will show you how to set one up.

The server you want to run is called [coturn](https://github.com/coturn/coturn).

coturn requires a server to run on, a domain, and a certificate. It can run on the same machine as your star or a separate machine. 

## Getting a server, domain, and certificate

If you need a server or domain follow the [Cloud Hosting guide](https://urbit.org/using/running/hosting) until the section 'Installing Urbit.' Stop there since you don't need to install urbit on the coturn machine. Follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-acquire-a-let-s-encrypt-certificate-using-dns-validation-with-certbot-dns-digitalocean-on-ubuntu-20-04) to install certbot and use it to aquire a certificate. 

Note the instructions below assume an Ubuntu server. If your server runs a different distribution, you may need to substitute `apt-get` and `ufw` with your distro's package manager and firewall.

## Installing docker 

We will install docker and run the coturn docker container with our own certificate and configuration file.

Install Docker with these commands taken from [this guide](https://docs.docker.com/engine/install/ubuntu/#installation-methods):

```
$ sudo apt-get update
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
$ sudo mkdir -p /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

Verify that Docker is installed correctly with this command:
```
$ sudo docker run hello-world
```
## Configure firewall to open up coturn ports
Coturn requires ports 3478 and 5349 to talk to it plus ports 49152-65535 to relay data. (I know this is a ton of ports but it IS a relay server).

```
$ sudo ufw allow 3478
$ sudo ufw allow 5349
$ sudo ufw allow 49152:65535/udp
```

Turn on the firewall:
```
$ sudo ufw enable 
```

- Check the status
``` 
$ sudo ufw status
```

## Install coturn 
- First create a directory for it

```
$ mkdir ~/coturn
```

- Copy your cert into the directory so coturn can use it. 

```
$ mkdir ~/coturn/certs
$ sudo cp /etc/letsencrypt/live/<YOUR-DOMAIN>/cert.pem /etc/letsencrypt/live/<YOUR-DOMAIN>/privkey.pem ~/coturn/certs
```

- Generate a secret which will be shared by both coturn and the uturn gall agent.

```
$ sudo apt install pwgen
$ pwgen -s 64 1
```

The output of the pwgen command is your secret. Anyone with it can access your coturn server so keep it safe.

- Create a config file
```
$ touch ~/coturn/coturn.conf
$ nano ~/coturn/coturn.conf
```

- Copy these contents into your coturn.conf
```
# STUN server port is 3478 for UDP and TCP, and 5349 for TLS.
# Allow connection on the UDP port 3478
listening-port=3478
# and 5349 for TLS (secure)
tls-listening-port=5349

# Require authentication
fingerprint
use-auth-secret
static-auth-secret=<YOUR SECRET YOU GENERATED>

server-name=<YOUR DOMAIN>
realm=<YOUR DOMAIN>

total-quota=100
stale-nonce=600

# Path to the SSL certificate and private key.
cert=/coturn/certs/cert.pem
pkey=/coturn/certs/privkey.pem

# Specify the allowed OpenSSL cipher list for TLS/DTLS connections
cipher-list="ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384"
```

- Make sure to put the secret you generated into the static-auth-secret line.
- Make sure the paths to your certificate are correct. 
- Make sure to set realm and domain to your domain (ie zod.net)

- Run coturn
```
$ sudo docker run -d --network=host \
  -v ~/coturn:/coturn \
  instrumentisto/coturn -c /coturn/turnserver.conf
```

## Test that coturn is working
First you need to generate credentials for it using this python program. The credentials are created with a username, which can be anything, a TTL, which is how long they last, and the secret you put in the config file earlier. 

```
$ touch coturn.py
$ nano coturn.py
```

- Copy this into coturn.py and replace SECRET with your secret. The user doesn't matter at all (it's only used to match connections with users in the logs) so just leave it as user1.

```
import hashlib
import hmac
import base64
from time import time

user = 'user1'
secret = b'SECRET'

ttl = 24 * 3600 # Time to live
timestamp = int(time()) + ttl
username = str(timestamp) + ':' + user
dig = hmac.new(secret, bytes(username, 'latin-1'), hashlib.sha1).digest()
password = base64.b64encode(dig).decode()

print('username: %s' % username)
print('password: %s' % password)
```

- Now run it to generate credentials
```
$ python coturn.py
```

This will spit out a username and password.

- Go to https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/
- Remove the existing google stun server in the list.
- Add a server called `turn:your-domain` (ie turn:turn.zod.net)
- Copy the username and password generated by the python script into the fields.
- Click Gather Candidates. If you see component type 'rtp relay' in the list then it worked.

## Configure uturn 
- Now you should go to your ship (either your star or a moon) and poke uturn with the URL and secret of your turn server. Make sure to begin the URL with 'turn:' and put in your secret. 

```
> :uturn &set-server-config [%server url='turn:turn.zod.net' secret='mysecret']
```

