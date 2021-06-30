+++
title = "How-To Guide for Raspberry Pi"
description = "How to run Urbit on a Raspberry Pi."
template = "doc.html"
weight = 3
[extra]
hidetitle = "true"
+++

## Introduction
This how-to guide will walk you through setting up your own planet on a Raspberry Pi 4 in a cooling case with an optimally configured SATA SSD connected via the USB 3 port. Urbit will run great, and you’ll have enough integrated high-speed storage to run other Urbit-related applications on the same device in the future if you wish (e.g. a Bitcoin full node, Lightning node, etc).

## Components
Don’t attempt to run Urbit on anything less powerful than a Raspberry Pi 4. And never run Urbit on a microSD card or on a drive plugged into a USB 2 port. Performance will be suboptimal.

The components and configuration in this how-to guide have been thoroughly tested and selected for ideal performance.

**Component checklist:**

- [Western Digital Blue 1TB M.2 SATA SSD](https://www.amazon.com/Blue-NAND-1TB-SSD-WDS100T2B0B/dp/B073SB2MXT/)
- [Argon ONE M.2 Case for Raspberry Pi 4](https://www.argon40.com/argon-one-m-2-case-for-raspberry-pi-4.html)
- [Argon ONE Pi 4 Power Supply](https://www.argon40.com/argon-one-power-supply-for-raspberry-pi-4.html)
- [Raspberry Pi 4 8GB - board only (https://www.canakit.com/raspberry-pi-4-8gb.html)
- [microSD card pre-installed with NOOBS - 64GB(https://www.canakit.com/raspberry-pi-sd-card-noobs.html)

Total cost will be about $250.

## Assembling the Hardware

Follow the instructions included with the Argon case and assemble it, adding your Raspberry Pi 4 motherboard, your unformatted 1TB M.2 SATA SSD and your microSD card that has been loaded with [NOOBS](https://www.raspberrypi.org/downloads/%20NOOBS/).  

Screenshots from the Argon manual are included below for your convenience.

- https://i.gyazo.com/a9e5cc7969d46b2b122847541d6076c0.jpg
- https://i.gyazo.com/e4fc630fa4f24957d22bace76be05554.jpg
- https://i.gyazo.com/8882b82fdd51ffb08f290faef88a30ff.jpg
- https://i.gyazo.com/09638586f05ceb98fbafe180f9052271.jpg
- https://i.gyazo.com/4d4799a18a5ed26b988ade5c639d5e0b.jpg
- https://i.gyazo.com/13fa0c9c95510df36664144458e06ab8.jpg
- https://i.gyazo.com/5481a414e570404aed6c8ec6510cdfac.jpg
- https://i.gyazo.com/97309a012a17787918730d8a7a5bf3f7.jpg
- https://i.gyazo.com/e5e4b3635fbcb7a22a44aec9bac180b6.jpg
- https://i.gyazo.com/05efc9bb01243a190e4e70bbb7f44498.jpg
- https://i.gyazo.com/6058cd144da304c50a6603fd799cb01f.jpg

## Installing Raspberry Pi OS and Argon Scripts

Follow the NOOBS instructions when your Raspberry Pi boots up and install the latest version of Raspberry Pi OS on the microSD card.

Follow the Argon ONE instructions and install the power button & fan control script.

Screenshots from the Argon manual are included below for your convenience.

- https://i.gyazo.com/1cd4992f77e16b9fffd4aac595e71a06.jpg
- https://i.gyazo.com/bdaf623330b03b902a10f288887de1f2.jpg
- https://i.gyazo.com/14478ae7fead4e30263afb72a0c1eb2c.jpg
- https://i.gyazo.com/62f40996b489e2066da775615b483226.jpg

## Configuring the SATA SSD

The easiest way to use the SATA SSD is as an additional drive running alongside a bootable microSD card. Run `lsblk` in a terminal to confirm the SSD exists (sda) but is unmounted and currently unusable.

- https://i.gyazo.com/1f689b3ecc0784e357d4a77e7034a8bc.png

We’re going to partition and format the SSD so it can be mounted and usable. A simple way to do this is to use `gparted`.  It’s not included in Raspberry Pi OS, so we’ll have to install it.

Install `gparted`:

```
$ sudo apt-get install gparted
```

Next, run `gparted`.

```
$ gparted
```

`gparted`’s UI will appear on the Raspberry Pi desktop. Select the SSD `/dev/sda` from the drop-down device list.

- https://i.gyazo.com/506cc5a26be502a3cfc02d6b46bd215b.png
- https://i.gyazo.com/db9d0751c357503d405e9cff44dc9418.png

Go to `Device > Create Partition Table` and choose `gpt`. Apply the changes.

- https://i.gyazo.com/0f23af646ff2cbd6a3ce9bae1366eb66.png
- https://i.gyazo.com/78b5fa90a112583cf97d3a23f10adcb4.png

Create one `ext4` partition that spans the entire drive.

- https://i.gyazo.com/c7fc91e2d4365abc20d9f7460115adc2.png
- https://i.gyazo.com/75a6e42f1437e0adbfe9d39a9b619920.png

Click `Apply All Operations` to create the new partition and format the SSD as `ext4`.

- https://i.gyazo.com/6434ade294bffbaeeb698f797f3e3ebe.png

The SSD is now properly partitioned and formatted as `ext4`.
- https://i.gyazo.com/ed76d501f44a9e976943ac0299c7e154.png

Reboot the Raspberry Pi 4. The SSD will be automatically mounted under the directory ``/media/pi/[UUID]``.

NOTE: The UUID is unique and automatically generated for you when you set up your SSD. You can see the UUID by running `lsblk`.

- https://i.gyazo.com/89115c26f692d7bfc85c524d75f2870d.png

Run `sudo chmod 777` on your SSD UUID directory so anything can write data to it.

- https://i.gyazo.com/cf0b86c3f3c7dd8f2080583dbfea9341.png

**NOTE:** That green highlight color is normal. In Raspberry Pi OS, it means a directory is other-writable.

## Testing MicroSD and SATA SSD Speeds

It’s useful to use `ioping` to monitor I/O latency on your drives to confirm they are running properly. The `ioping` reports disk latency in a similar way `ping` reports network latency.

**NOTE:** You can [explore the other features of ioping](https://www.cyberciti.biz/faq/linux-freebsd-openbsd-macosx-find-disk-io-latency-with-ioping), but be careful. It’s a powerful tool and can scramble drives if improperly used.

Here are examples of `ioping` tests you can run for both your microSD and SATA SSD.

First, `cd` to your home directory ``~`` located on your microSD card so you can test the latency and speed of the microSD card. Run the following commands to test:

```
pi@argon-one:~ $ ioping -DR -w 5 . | tail -n 1
min/avg/max/mdev = 325.8 us / 367.8 us / 8.09 ms / 114.7 us

pi@argon-one:~ $ ioping -DRL -w 5 . | tail -n 2 | head -n 1
generated 779 requests in 5.00 s, 194.8 MiB, 155 iops, 38.9 MiB/s
```

Next, `cd`  to your SSD’s UUID directory so you can test the latency and speed of the SATA SSD. Run the following commands to test:

```
pi@argon-one:/media/pi/[your-UUID] $ ioping -DR -w 5 . | tail -n 1
min/avg/max/mdev = 165.7 us / 175.6 us / 1.27 ms / 14.6 us

pi@argon-one:/media/pi/[your-UUID] $ ioping -DRL -w 5 . | tail -n 2 | head -n 1
generated 4.47 k requests in 5.00 s, 1.09 GiB, 894 iops, 223.6 MiB/s
```

If you see similar results as above, then all is well.

## Configuring TRIM timer and Confirming UASP

It's always a good idea to have [TRIM](https://en.wikipedia.org/wiki/Trim_(computing)) active on an SSD because it will keep writes fast and prevent premature wear from write amplification. The M.2 adapter board and SATA SSD you just installed support TRIM, and you can confirm it by running:

```
pi@argon-one:~ $ sudo fstrim -v /
/: 13.1 GiB (14027571200 bytes) trimmed
```

The exact numbers will differ on your setup. The point is you will see a successful “trimmed” result.

Now change the timer to run more often and enable it:

```
pi@argon-one:~ $ sudo sed -i 's/weekly/daily/' /lib/systemd/system/fstrim.timer
pi@argon-one:~ $ sudo systemctl enable fstrim.timer
```

TRIM is now active and automatically running to keep your SSD happy and healthy.

[UASP](https://en.wikipedia.org/wiki/USB_Attached_SCSI) allows for faster read/write data speeds to and from storage devices connected by USB 3. [Here’s a deep dive into UASP and the RaspberryPi](https://www.jeffgeerling.com/blog/2020/uasp-makes-raspberry-pi-4-disk-io-50-faster) if you’d like to learn more.

You can confirm that your SSD and adapter board supports UASP by running `lsusb -t`

- https://i.gyazo.com/a326792348ee6e305638bb1ffd9978a7.png

In the above example, the device reports `Driver=uas` which means all is well.

## Installing Urbit and Booting your Ship

**IMPORTANT: Never install Urbit on a microSD card!**

Urbit reads and writes a lot to the drive, and the microSD card is far too slow to handle it efficiently. Yes, Urbit will run on a microSD card, but the performance will be terrible.

To put things into perspective, the microSD card reader on the Raspberry Pi 4 has a theoretical maximum data transfer rate of **50 MB/s**. The SATA SSD connected to the USB 3.0 port as specified and configured in this how-to guide can handle data transfer rates up to **500 MB/s**.

Next you’ll be installing Urbit on the SATA SSD. Go to your ``/media/pi/[UUID]`` directory and create an `urbit` directory where you’ll be installing Urbit. Follow ~botter-nidnul’s [Steps to Urbit on Raspberry Pi](https://botter-nidnul.github.io/Steps_to_Urbit_on_Raspberry_Pi.html) and install the AArch64 Urbit Static Binaries on your SATA SSD.

Urbit is now installed and ready to go! Boot your ship and [read these planet instructions](https://urbit.org/getting-started/planet/) for more details.

## More Help

The “smol computers” Urbit group at ``~dasfeb/smol-computers`` is a friendly community of hardware hackers exploring the future of Urbit and Bitcoin on small computing devices like RaspberryPi, NanoPi, Android and ARM. Just post your questions in chat and someone will be happy to give you a hand.

![smol computers](https://i.gyazo.com/cc6ba88c61a2734fcecda4e34fb0b8dd.gif)
