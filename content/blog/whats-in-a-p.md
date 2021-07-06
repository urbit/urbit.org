+++
title = "What's in a @p?"
date = 2021-06-01
description = "An exploration of Urbit's identity system"
aliases = ["/posts/essays/whats-in-a-p", "/posts/whats-in-a-p"]
[extra]
author = "~monted-tallex"
ship = "~monted-tallex"
image = "https://media.urbit.org/site/posts/essays/pyramid.png" 
+++
![](https://media.urbit.org/site/posts/essays/pyramid.png) 


Most things on the internet are reducible to numbers. When you visit a website, say google.com, you’re really visiting an IP address (like 127.0.0.1). Rather than memorizing a string of numbers, it’s far easier to remember a name, so the internet relies on URLs instead of IP addresses.Similarly, on Urbit, every Urbit ID is both a phonetic name and a number. My ship name, ~monted-tallex, is actually translated to a numerical address, “2884352”, when we interact on Urbit.

In this post, I’ll discuss the relationship between Urbit identities and their address numbers.  How exactly does a number get translated into a name like ~monted-tallex? While we're at it, what's a spawning hierarchy?

Although this post is meant for beginners, I recommend reading this [broad overview of the Urbit ID system](https://urbit.org/understanding-urbit/urbit-id/).

Let’s start by taking a look at the different classes these address numbers fall into. The actual address number can tell us whether we’re looking at a galaxy, star, planet, etc. The address can also tell us the relationship between two entities. Note, an Urbit address is also called an Azimuth point, but in this article we’ll stick to address. 


### Address Classes and Bit Width

Urbit's total address space is 128 bits in width. A [bit](https://en.wikipedia.org/wiki/Bit) is a digit, either “0” or “1”. In this article, we’ll represent binary numbers in the form `0b1100.1100` – a prefix, “0b”, followed by two four-bit segments (for eight total bits). 

It takes at least four bits (`0b1010`) to write the decimal number `10` in binary. Sometimes we want to write more bits in order to keep the numbers we work with at a specific width; for example we could write the same number `10` as an eight-bit number by writing `0b0000.1010`, for example.

In Urbit's address space, we are usually concerned with the width of a number when we write it without any leading zeros. 

|Bit width | Address class | Number of addresses
--- | --- | ---
|8 or fewer|galaxy|256|
|between 9 and 16|star|65.280
|between 17 and 32|planet|4.294.901.760
|between 33 and 64|moon|18.446.744.069.414.584.320
|between 65 and 128|comet|_lots_ (3.4x10³⁸)

Let's look at some examples, from 32-bit numbers:

`0b0000.0000.0000.0000.0000.0000.0000.0001` - truncating the leading zeros
leaves us with `0b1`. As this is one bit wide, it fits into "8 or fewer bits",
and we call this number a galaxy.

`0b0000.0000.0000.0000.0000.0000.1000.0001` - truncating the leading zeros
leaves us with `0b1000.0001`. This is eight bits wide, and so is also a galaxy.

`0b0000.0000.0000.0000.0000.0001.1000.0001` - truncating the leading zeros
leaves us with `0b1.1000.0001`. This is nine bits wide, and so is a star.

`0b0000.0000.0000.0000.0100.0001.1000.0001` - truncating the leading zeros
leaves us with `0b100.0001.1000.0001`. This is fifteen bits wide - another
star.

`0b0000.0100.0100.0000.0100.0001.1000.0001` - truncating the leading zeros
leaves us with `0b100.0100.0000.0100.0001.1000.0001`. This is twenty-seven bits
wide - a planet.

If we went wider than 32 bits, we'd have a moon. Wider than 64 bits and it would
be a comet. Anything wider than 128 bits is not a valid Urbit identity.


### Address Class Nesting

Now that we've seen how individual IDs are assigned into classes, let's have a look at how they are arranged into a hierarchy. From this section onward, we'll use [hexadecimal notation](https://en.wikipedia.org/wiki/Hexadecimal) (e.g. `0xff.00ff`) instead of binary notation. The decimal number `10` is written as `0b1010` in binary and as `0xA` in hexadecimal - just look at how compact this notation is! We can express 8 bits (a “[byte](https://en.wikipedia.org/wiki/Byte)”) in just two characters of hexadecimal. Once again, we are using programming prefixes to show which notation we are using – for hexadecimal the prefix is `0x`.

In general, the wider classes are considered to "nest" under the narrower classes, according to the value of the address' last digits (or “low” bits). That is, a star is a child of the galaxy whose 8 bits match the star's low 8 bits, and a planet is a child of the star whose 16 bits match the planet's low 16 bits.


#### Some Examples of Nesting

The star `0xcb97` is nested under the galaxy `0x97` because the star's low byte is equal to the galaxy's byte.

The planet `0x2a94.17bd` is nested under the star `0x17bd` because the planet's two low bytes are equal to the star's two bytes.

The moon `0xc16d.187b.15f2.47fb` is nested under the planet `0x15f2.47fb`.

An exception to this is comets - rather than nesting under moons, they are considered to be nested under the star which matches their low two bytes.


#### Galaxy-planets & star-moons

Notably, if the planet's low 16 bits are themselves only 8 bits "wide" (i.e. all of the first 8 bits of the low 16 are zero) then the planet's parent is the galaxy that matches these 8 bits. Such "galaxy planets" are valid Urbit IDs, but spawning them is [not currently supported by Azimuth](https://github.com/urbit/azimuth/issues/7).

Similarly, a moon (64 bits wide) nests under the address given by the low 32 bits of the moon. Much like galaxy planets, both stars and galaxies can also spawn moons.

This hierarchy is used for spawning and for a ship's default source for over-the-air updates (OTAs). An ID is spawned by its parent and will be subscribed to its parents for updated when first booted.

Here again, comets are an exception. A comet is not spawned by any other ID—each comet is created by hashing a public key, so any public key can be hashed to create a comet. 


### @p

Now that we've covered the numbers behind any Urbit ID and how they nest, let's have a look at how they get translated into pronounceable names like ~monted-tallex.

A phonemic name is known as a `@p` ([pronounced “pat-pee”](https://urbit.org/docs/hoon/hoon-school/hoon-syntax/#reading-hoon-aloud)) and is composed of one or more three-letter syllables. These syllables are paired and each pair is separated by a hyphen. 
 You may have noticed that there are “prefix” and “suffix” syllables of which there are 256 entries for each. Each set of syllables contains 256 entries because they are mapped directly to 8-bit values (2^8 = 256). An integer is translated into `@p` by taking its lowest byte and looking up the corresponding suffix syllable, then taking the next byte and looking up the corresponding prefix syllable. This is repeated, with hyphens for separation, until the whole integer has been consumed. 

Let's take `0x200f` as an example (this ID is 2 bytes wide, so we can expect it to be a star).

We start with `0x0f` (the low byte), which we look up in the suffix table. 0x0f is 15 in decimal but since this was designed by programmers counting starts at 0. So we need to use the 16th suffix syllable, which is `sun`.

Next is the second-lowest byte, `0x20` (or 32 in decimal). We look this up in the prefix table - the 33rd prefix is `hol`.

So putting these together in order from high to low, we get `hol` and `sun`. Pairing them up and adding a tilde at the beginning, we get `~holsun`. If we try this conversion in the dojo, by running <code>&#96;@p&#96;0x200f</code>, we do indeed get `~holsun`.


The above chart (courtesy of ~nodreb-borrus) shows the 256 possible suffixes. The first 256 addresses (galaxies) all have @ps which are a suffix. ![]https://media.urbit.org/site/posts/essays/nodreb-borrus-suffix-chart.png


### Name Obfuscation

Now let's take `0x010b.200f` as another example (this ID is 4 bytes wide so we expect it to be a planet. Additionally as the last two bytes match the ones we used to get `~holsun` above, we expect it to be a child of that star).

As before, we start with `0x0f`, which is the suffix `sun` and `0x20`, which is the prefix `hol`.

Then the third-lowest byte, `0x0b` (11 in decimal), gets looked up in the suffix table. The 12th suffix is `dur`.

Finally the highest byte is `0x01`, which from the prefix table is `mar`.

Putting these together from high to low, we get `mar`, `dur`, `hol`, `sun`. Separating each pair with a hyphen and prepending a tilde, we get `~mardur-holsun`. But if we try <code>&#96;@p&#96;0x010b.200f</code> in the dojo, we don't get `~mardur-holsun`— instead we get `~sicryc-ragpeg`. What's going on here?

The answer is that in order to avoid every planet on the network being visibly associated with its parent star, planet names are scrambled. The details of the scrambling aren't important here, but we can see the original phonemic name of a planet by casting it to `@q` instead of `@p`: running <code>&#96;@q&#96;~sicryc-ragpeg</code> in the dojo gives us `~mardur-holsun`, which reflects our expectation that this planet is a child of `~holsun`.


### More on Naming

We've seen some details of the way Urbit IDs are translated from a number to a name, and how they are organized into a hierarchy for the purposes of spawning and network organization. [Naming things can be hard](https://en.wikipedia.org/wiki/Zooko%27s_triangle) in the world of computing but, once a sufficient naming scheme is developed, it can do all sorts of things (like send bitcoin transactions to an @p without ever touching a bitcoin address).

For another description of names on Urbit check out [urbit.live’s excellent introduction](https://blog.urbit.live/an-intro-to-urbit-names/) and this [answer on Stack Overflow](https://stackoverflow.com/questions/38139453/how-are-urbit-phonetic-names-encoded/38175707#38175707). Finally, [this post](https://urbit.org/blog/creating-sigils/) digs into the relationship between names and sigils, the unique visual symbol for every Urbit address.

Hopefully this has explained some aspects of Urbit names and addresses. Feel free to catch me on the network if you have questions or want to talk about this more!
