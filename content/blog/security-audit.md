+++
title = "Ames Security Audit and the Future of the Protocol"
description = "Ames’ design has unparalleled potential to deter, mitigate, and recover from attacks, since every packet is authenticated and encrypted and backed by a stable, decentralized PKI."
date = 2020-12-18
[extra]
author = "Ted Blackman + Anthony Arroyo"
ship = "~rovnys-ricfer + ~poldec-tonteg"
image = "https://storage.googleapis.com/media.urbit.org/site/posts/essays/20201218-audit.png"
+++

<br>

![audit](https://storage.googleapis.com/media.urbit.org/site/posts/essays/20201218-audit.png)

<br>

The security firm Leviathan has now finished their initial audit of the security of Urbit's Ames network protocol. In addition to their review of Ames, we also asked them to identify any other issues in order to help guide further development.

I'm pleased to report they confirmed the cryptographic soundness of the protocol, namely that "a ship must have possession of their own valid Urbit key in order to authenticate as that ship and to send valid Ames messages. Additionally, no other ship except the two communicating may be able to decrypt or modify messages during transport."

This means Ames uses cryptography in a mathematically sound manner that protects your privacy, keeps your secrets secret, and ensures nobody else will be able to impersonate you on the network.  Since this was an architectural audit, it’s possible there are still vulnerabilities in the runtime implementation.  Until the runtime has been hardened, Tlon continues to recommend against storing valuables in your ship.

Aside from a couple of minor issues that have already been resolved, there are three general classes of problem highlighted in their report that future work will need to address:

+ Forward secrecy
+ Protection against denial of service attacks
+ Enforcement of social boundaries

Ames’ design allows for versioning of the protocol, which means that the proposed changes below can be deployed as over-the-air updates as they become more pressing concerns. This feature gives us confidence that we can address future security issues as they arise.

We will need to improve all of these over the next couple of years, as independent lines of work.  As the network grows: better forward secrecy will decrease the damage from a key getting compromised; resistance against denial of service attacks will make the Urbit network resilient to increasingly determined saboteurs; and stricter enforcement of social boundaries will let Urbit’s social networks remain safe and friendly despite potentially increasingly large numbers of bad actors and increasingly complex app ecosystems.

## Forward Secrecy

A protocol is said to have forward secrecy if compromising a key used in a recent message doesn’t also compromise all previous messages.  Similarly, a protocol is said to have backward secrecy -- also called future secrecy -- if compromising a key used in a previous message fails to compromise all future messages.  Ames has some degree of both, but more would be better, to decrease the damage an attacker could inflict by compromising a key.

As it stands, an Urbit user can change their Ames keys whenever they want, by conducting an Ethereum transaction to update the Ames public key listed in the Azimuth contract, which implements Urbit’s PKI on Ethereum.  Compromise of one Ames private key does not compromise earlier or later keys, so this has both forward and backward secrecy.  The main drawback is that Ethereum transactions can be expensive, so key rotation is likely to be infrequent, and an attacker might be able to gain access to a long stretch of time by compromising a single key.

Various key rotation “ratchet” schemes could be added to Ames to establish varying degrees of forward and backward secrecy, and other kinds of cryptographic protections beyond basic soundness, such as break-in recovery.

Right now, changing a key through Azimuth is a manual process.  It could be automated, possibly as one of a suite of services that an Urbit Provider will offer.  Unfortunately,  each key rotation costs the user money, so automating rotation could get prohibitively expensive. 
Existing protocols, such as the Signal app's encrypted messaging protocol, the Noise protocol framework, and the Wireguard VPN protocol, use ephemeral Diffie-Hellman key exchange and KDF chaining to achieve forward and backward secrecy and self-healing.  

Ames could be upgraded to use one of these existing ratchet algorithms, or we might create an Urbit-specific variant optimized for the Urbit network.  This is work that should be done, but fortunately it will not require any novel research or drastic changes to Ames’s architecture.

While Urbit’s cryptographic protections don’t yet match those of Signal or a few other privacy-focused apps, Ames is cryptographically sound, and since Urbit updates itself over-the-air and is backed by a stable, decentralized PKI, I’m confident that the level of sophistication of Urbit’s cryptography has the potential to be world-class with just a bit more work.

## Denial of Service

A denial of service (DoS) attack against an Urbit ship is an attempt to overwhelm it remotely by sending it network data in such a way as to interfere with the ship’s ability to communicate with other ships or process other events -- usually by hogging its resources (computational power, memory, or bandwidth) until normal operation slows down or ceases entirely.  Since the promise of Urbit is that everyone can run their own server, that server needs to be able to defend itself against DoS attacks.  This is in fact one of the main impediments to running your own server in the modern world.

Right now, Urbit has no protection.  Soon, it will need to at least be able to resist a simple attack carried out by an individual.  Eventually, it should be able to resist a determined Distributed Denial of Service (“DDoS”) attack, which is more difficult.

There are two categories of DoS attacks in Urbit: authenticated and unauthenticated.  An authenticated attack requires access to a ship's private key to construct valid Ames packets intended to overwhelm a target.  All authenticated attacks will be handled primarily through enforcement of social boundaries, as discussed in the next section.

An unauthenticated DoS attack constructs packets that eventually fail to authenticate and decrypt but still overwhelm the target by causing it to waste resources (CPU, memory, disk, bandwidth) in such a way that it can't keep up with legitimate communications.

An unauthenticated DoS attack relies on the lack of Sybil resistance of IP networks: it's possible to generate new IP addresses rapidly, and a determined attacker might also be able to spoof its sender IP address.  This is best considered an IP-layer attack that must be handled mostly at the IP layer itself, by maintaining state about which IP addresses can be trusted and which can't, determined empirically and heuristically by the Urbit runtime.  The best any higher-level protocol, such as Ames or TCP, can do is make it as cheap as possible for a DoS target to reject a bad packet.

The overall strategy that Ames can take, as a protocol layering over the IP protocol, is to add an authentication procedure to each packet that can quickly identify bad packets, which an implementation will then use to mark that IP address as suspect and to refrain from adding the sender IP to a list of known-good IPs.

Currently, Ames handles this by attempting to decrypt a message and rejecting the message on failure. This may be a more costly solution than other methods, such as attaching a signature or a MAC to each message.  The way to mitigate unauthenticated attacks is to make bad packets fail faster by augmenting each packet with a signature or MAC to each packet, since those are faster to validate than encryption.

So far, we have identified three approaches that could be taken here.  Of these three, Leviathan recommended the end-to-end HMAC solution, since that would not impose additional CPU requirements on packet-relay nodes, such as stars. 

+ Sign each packet, and any relay or final recipient could validate the signature
+ Wrap each packet in an HMAC, validated by the final receiver
+ Wrap each packet in a HMAC for each hop in a relay chain; each relay would validate and strip the previous HMAC and add a new one for the next hop

Any of these solutions would be attempts to increase the rate at which the network could discard invalid packets, with different tradeoffs.  I'll back up a bit to provide some context, and then I'll compare the approaches. 

In any DoS solution, a planet will want to block or throttle IPs that have been sending it packets that fail to authenticate and decrypt.  Ideally, a star will help protect planets for whom it’s relaying, too. Many different arrangements among galaxy,  star, and planet are imaginable here, from an open policy to a policy wherein each packet has to come from a known-good IP. This sort of paranoid, closed-off arrangement might still not be enough to withstand a determined DDoS, but it's difficult for me to imagine doing better than that without launching Urbit-specific ISPs. Ames packets are cryptographically authenticated, so an Urbit ISP would actually be feasible.

This brings us back to the three possible ways of mitigating DoS from within the Ames protocol.   They all involve adding a piece of authenticating information to each packet that can be verified more quickly than waiting for the cyphertext to fail to decrypt — Ames's symmetric encryption is authenticated, so it's not a cryptographic soundness issue, but the performance impact of trying to decrypt could be significant enough to make it hard to prevent a DoS.

As-is, an Ames packet is basically `[protocol-version checksum sndr rcvr (nullable origin) cyphertext]` (visit [this PR](https://github.com/urbit/urbit/pull/4051#issue-530369627) for a full specification). Let’s walk through the construction of the packet and how it can be upgraded to offer different DOS mitigations.

### DoS Mitigation Approach 1: Signature

The first approach to DoS protection would be to add a signature to the packet.  The signature would cover everything except the checksum and the origin, since those need to be swapped out by relays.  The signature would probably obviate the need for the (20-bit) checksum, although we could also leave it in there if we can't figure out what else to do with those header bits.

#### Advantages of a signature over other approaches

- It can be validated by anyone on the network.  Relays would not need to modify it.  This might also give it symmetry with the upcoming remote scry protocol, which might also sign every packet.  I'm not quite sure this is an important property, actually, but it might theoretically make launching an Urbit ISP or internet backbone easier one day.
- It would be signed directly by the key listed on Ethereum, not something that might get ratcheted at some point for better forward secrecy — this could eventually lower the rate at which intermediate validators need their key caches invalidated, although this is a bit of a theoretical concern.

#### Disadvantages of a signature over other approaches

- Generating and validating a signature is significantly slower than generating and validating an HMAC.
- An ECDSA signature is 64 bytes, which is ~6% of a packet payload.  As far as I can tell, it can't be compressed.
- Since the signature could be validated by anyone, it doesn't attest to a specific communication channel, so it might not help as much with IP filtering.

### DoS Mitigation Approach 2: End-to-End HMAC

The second approach would be to use an HMAC instead of a signature, validated by the eventual receiver.  This HMAC would also cover everything except the mug and origin.  I'm calling this the "end-to-end HMAC" design.  An HMAC requires a shared secret, for which we could use the same symmetric key that Ames uses.

#### Advantages of end-to-end HMAC

- It's simple in some sense; relays don't need to do anything cryptographic.
- HMACs are much faster to create and validate than signatures.
- HMACs, since they're hashes, can be truncated arbitrarily and still maintain some security — to find hash collisions, you'd still have to guess what packet||shared-secret would hash to; it would just be a smaller search space.  Since Ames's encryption already guarantees authentication and we'd just be using this as a performance optimization, I suspect we could get away with using one that's significantly smaller than a signature — I'm not sure how small, but if 4 bytes would be enough in practice, that would take up less than 0.5% of the space in a packet.

#### Disadvantages of end-to-end HMAC

- Only the recipient can validate.  This means the authentication couldn't be used by relays to discard invalid packets.  The recipient could provide back-pressure out-of-band to a relay to ask the relay to discard packets from an IP with an invalid HMAC, but this is indirect and might need to filter backward through multiple relays to work properly.

### DoS Mitigation Approach 3: Point-to-Point HMAC

The third approach, which is what I would build unless convinced otherwise, is what I'm calling "point-to-point HMAC".  This design would include a different HMAC for each hop in a relay chain, instead of (or maybe in addition to) including one end-to-end HMAC.

We have a couple different options for how to construct the shared secret for each hop.  I would intuitively construct it using a Diffie-Hellman of my private signing key and your public signing key — the "networking keys" on Ethereum include a currently unused signing key in addition to the encryption key that Ames uses.  This way even if we add more forward secrecy to Ames, changing the symmetric key used for encryption, relays wouldn't have to have their caches invalidated as often; the state required to perform relaying wouldn't be as tied to the state required to receive a message.

#### Advantages of point-to-point HMAC

- A star could perform some validation on every packet it's asked to relay.  This makes it more difficult for an attacker to route a ton of packets to a planet through a star, or even through many relays.  Signatures also have this property, but they're slower to verify.  This approach and the signature approach, but not the end-to-end HMACs, force an attacker to use an (at least partially) authenticated attack in order to use a relay as a way to get to a planet.
- A planet could quickly validate that a relayed packet actually came from its star, not an attacker who's managed to spoof the star's IP address.

#### Disadvantages of point-to-point HMAC

- Not everyone on the network can validate a packet, unlike a signature.
- Each relay needs to validate and strip off the previous HMAC and create a new one before sending it.  This should be quite fast, since an HMAC is just a hash, but it's still some CPU, and potentially creates an imbalance where an attacker could induce the relay to spend more CPU in validation than the attacker spent in constructing the packets.
- By itself, it doesn't validate the cyphertext in an end-to-end way.  I suspect we might want to include both a per-route HMAC and an end-to-end one, especially if we use truncated HMACs — although per-route might be enough on its own, since if the receiver fails to validate a bunch of packets whose HMACs were validated by the relay, the receiver can ask the relay to block that whole Urbit address regardless of IP, so it shouldn't be possible to sustain that kind of attack for long.

#### An Aside About Cryptographic Performance

I'm not sure exactly how much faster HMAC is.  According to DJB (https://ed25519.cr.yp.to/ed25519-20110705.pdf), an ECDSA signature can be created in around 30 microseconds and verified in around 100 microseconds.  This source (https://www.jacksondunstan.com/articles/3206) suggests about 21 microseconds for HMAC-SHA256, so about a 1.5x improvement in generation speed and 5x in validation speed.  We should verify these numbers for ourselves before making a decision.

### DoS Protection Strategy and Timeline

Tlon is not currently pursuing adding any of the extra cryptographic authentication on Ames packets described above.  Since this is ultimately a performance issue, there are other more pressing performance issues that we could improve upon before decryption will become the limiting factor in how many packets can be processed by a ship.  We will revisit this authentication performance question once some of the low-hanging fruit has been done, perhaps roughly a year from now.

Since the audit, we’ve already improved the Ames packet format to allow faster parsing, faster validation of basic fields, and faster relaying; in the future, increases in performance of Nock execution and inter-process communication between Urbit's I/O process and Nock worker would allow Urbit to absorb somewhat more punishment before service can be effectively denied.

## Enforcement of Social Boundaries

While Urbit needs to rely largely on its runtime to mitigate unauthenticated attacks, any attack conducted from an Urbit ship needs to be handled inside Arvo itself, not just by IP filtering in the runtime.  Just like in any DoS, an attacker ship might try to induce you to use too much memory, CPU, or disk space in order to sabotage normal operation.  An authenticated attack is harder to define than an unauthenticated attack, because it depends on what social relationship the attacker and target have, and it involves valid, authenticated Ames packets; once discovered, though, it’s easier to mitigate, because it can use Urbit’s permanent identity system to enforce social consequences, i.e. stop listening to that Urbit address and possibly encourage others to do so as well.

There are a couple of different kinds of authenticated attack: attempts to exploit vulnerabilities in the Nock worker (the interpreter, allocator, and jets) by causing particular Nock code to run, and attempts to induce the target to exhaust various computational resources.

Protecting against attempts to break out of the sandbox and hijack or otherwise interfere with the Unix process running Nock will require a process of hardening, fuzzing, and likely further security audits specifically evaluating the security of that boundary.  This is largely out of scope of the Ames protocol itself, which was the subject of this audit.

This leaves us with the latter case: resource exhaustion attacks.  A peer could try to get my ship to use too much RAM, disk, CPU, or bandwidth by sending it valid Ames packets.  This represents a social problem: a person on the network is trying to interfere with me.  It's what's known in blockchain circles as an "attributable fault": once the attack is detected, it's trivial to determine the identity of the culprit.  

Once the attacker’s Urbit address is known,  Urbit will fall back on the Sybil resistance of its identity system: there are a finite number of identities, each of which costs some money.  Because Urbit identities are relatively permanent, they can be blocked permanently.  As long as the expected value of an authenticated attack is less than the cost of the identity, the attacks won't happen very much — they'll cost money to sustain, instead of being self-perpetuating.  

Attacks like this are best thought of as attempts to violate social boundaries.  I don't want you using up too many of my resources; that's a social boundary, and an attempt to force my ship to spend its resources on your behalf constitutes a violation of this boundary.  The strategy for mitigating these attacks is to impose social and, indirectly, economic consequences on the perpetrators.  The main social consequence is other ships refusing to communicate with you anymore.

Some of this mitigation will take place in the Arvo kernel, and some will need to be application-specific.  To protect the system from attackers, the kernel needs to be able  to free space (Urbit is a single-level store, so there's no distinction between disk and RAM from Arvo's perspective) taken up by unfinished messages sent by peers.  This can be done by allowing an application to ask Ames to delete partially received messages from a peer, generally replacing the received packets with an intent to nack (negative acknowledgment) to indicate that the transaction the peer wanted me to perform has been rejected.

Applications should also be able to set resource usage policies that the Arvo kernel will enforce.  For example, a chat application should configure Ames to reject any chat messages larger than, say, two hundred kilobytes.  A file-sharing application would need a much larger per-message limit (ideally no per-message limit), but it might need to place a cap on its bandwidth usage to make sure lower-latency communications aren't swamped by a large file transfer.  This kernel/application interface starts to resemble a permissioning or capabilities system, and it could be built as part of the crucial larger project of providing for configurable application permissions.

To close the loop on enforcing social boundaries, reputation information should be shared across ships.  This will likely be done by building one or more applications that share statistics and block operations.  Some forms of reputation are likely to be globally shared, whereas others are likely to be multipolar, i.e. some people like you and some don’t.  Generally, the lower the layer of the attack, the more global the reputation effect will be; the higher the layer, the more multipolar.  An attempt to spam the network with millions of malicious packets will cause most people not to want to talk to you; sending me a movie I found mediocre is probably not even information worth sharing with anyone else.


## Conclusion

Ames’ design has unparalleled potential to deter, mitigate, and recover from attacks, since every packet is authenticated and encrypted and backed by a stable, decentralized PKI.  It feels good to have our design for encryption and authentication be confirmed by a third party as cryptographically sound, and we know more or less what we need to build to reach the full security potential of the platform, including the steps outlined here.
