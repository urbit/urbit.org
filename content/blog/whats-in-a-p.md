+++
title = "What's In A @p?"
date = 2021-06-01
description = "An exploration of urbit's identity system"
aliases = ["/posts/essays/whats-in-a-p", "/posts/whats-in-a-p"]
[extra]
author = "~monted-tallex"
ship = "~monted-tallex"
image = "https://lycr.gs/img/pyramid.png" 
+++
![](https://lycr.gs/img/pyramid.png)

You may have heard that every urbit ID is a number. What does this mean,
exactly? How does a number get translated into a name like `~monted-tallex`?
While we're at it, what's a spawning hierarchy?

Let's have a look at some of the details.


### Address classes

Urbit's total address space is 128 bits in width. We'll start by having a look
at what exactly this bit-width refers to. We'll represent binary numbers in the
format `0b1100.1100`, separating the number into 4-bit segments.

When we write a number in binary, we need to represent at least the number of
bits that make up the number - we can't write `0b1010` (the decimal number 10)
in any fewer than 4 bits. Sometimes, however, we want to write more bits in
order to keep the numbers we work with at a specific width; for example we
could write the same number 10 as an eight-bit number by writing `0b0000.1010`,
for example.

In urbit's address space, we are usually concerned with the width of a number
when we write it without any leading zeros. 

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
be a comet. Anything wider than 128 bits is not a valid urbit ID.


### Address class nesting

Now that we've seen how individual IDs are assigned into classes, let's have a
look at how they are arranged into a hierarchy. For this section onward, we'll
use hex notation (e.g. `0xff.00ff`) instead of binary notation.

In general, the wider classes are considered to "nest" under the narrower
classes, according to the value of the ID's low half. That is, a star is a child
of the galaxy whose 8 bits match the star's low 8 bits, and a planet is a child
of the star whose 16 bits match the planet's low 16 bits.


#### Some nesting examples

The star `0xcb97` is nested under the galaxy `0x97` because the star's low byte
is equal to the galaxy's byte.

The planet `0x2a94.17bd` is nested under the star `0x17bd` because the planet's
two low bytes are equal to the star's two bytes.

The moon `0xc16d.187b.15f2.47fb` is nested under the planet `0x15f2.47fb`.

An exception to this is comets - rather than nesting under moons, they are
considered to be nested under the star which matches their low two bytes.


#### Galaxy planets, star moons

Notably, if the planet's low 16 bits are themselves only 8 bits "wide" (i.e. all
of the first 8 bits of the low 16 are zero) then the planet's parent is the
galaxy that matches these 8 bits. Such "galaxy planets" are valid urbit IDs, but
spawning them is not currently supported by Azimuth.

Similarly, a moon (64 bits wide) nests under the ID given by the low 32 bits
of the moon. Much like galaxy planets, both stars and galaxies can also spawn
moons.

This hierarchy is used for spawning and for a ship's default source for updates
(OTAs). A given ID can be spawned by its parent, and will be subscribed to its
parent for updates when first booted.

Here again, comets are an exception. A comet is not spawned by any other ID -
each comet is created by hashing a public key, so any public key can be hashed
to create a comet. 


### @p

Now that we've covered the numbers behind an urbit ID and how they nest, let's
have a look at how they get translated into pronounceable names.

Values in urbit's "phonemic base" - known as `@p` - are comprised of sequences
of one or more three-letter syllables. You may have noticed that syllables are
only ever the first in a pair or the second in a pair; these are "prefix" and
"suffix" syllables respectively. Each set of syllables contains 256 entries, and
these are mapped directly to 8-bit values (i.e. bytes). An integer is translated
into `@p` by taking its low byte and looking up the corresponding suffix
syllable, then taking the next byte and looking up the corresponding prefix
syllable. This is repeated, with hyphens for separation, until the whole integer
has been consumed. 

Let's take `0x200f` as an example (this ID is 2 bytes wide, so we can expect it
to be a star).

We start with `0x0f` (the low byte), which we look up in the suffix table. 0x0f
is 15 in decimal, but because there is also a syllable for "zero" we need to use
the 16th suffix syllable, which is "sun".

Next is the second-lowest byte, 0x20 (or 32 in decimal). We look this up in the
prefix table - the 33rd prefix is "hol".

So putting these together in order from high to low, we get "hol" and "sun".
Pairing them up and adding a tilde at the beginning, we get ~holsun. If we try
this conversion in the dojo, by running <code>&#96;@p&#96;0x200f</code>, we do
indeed get ~holsun.


### Name obfuscation

Now let's take `0x010b.200f` as another example (this ID is 4 bytes wide so we
expect it to be a planet. Additionally as the last two bytes match the ones we
used to get ~holsun above, we expect it to be a child of that star).

As before, we start with `0x0f`, which is the suffix "sun" and `0x20`, which is
the prefix "hol".

Then the third-lowest byte, 0x0b (11 in decimal), gets looked up in the suffix
table. The 12th suffix is "dur".

Finally the highest byte is 0x01, which from the prefix table is "mar".

Putting these together from high to low, we get "mar", "dur", "hol", "sun".
Separating each pair with a hyphen and prepending a tilde, we get
`~mardur-holsun`. But if we try <code>&#96;@p&#96;0x010b.200f</code> in the
dojo, we don't get `~mardur-holsun` - instead we get `~sicryc-ragpeg`. What's
going on here?

The answer is that in order to avoid every planet on the network being visibly
associated with its parent star, planet names are scrambled. The details of the
scrambling aren't important here, but we can see the original phonemic name of a
planet by casting it to `@q` instead of `@p`: running
<code>&#96;@q&#96;~sicryc-ragpeg</code> in the dojo gives us `.~mardur-holsun`,
which reflects our expectation that this planet is a child of `~holsun`.


### Conclusion

We've seen some details of the way urbit IDs are translated from a number to a
name, and how they are organised into a hierarchy for the purposes of spawning
and network organisation.

Hopefully this has been informative. Feel free to catch me on the network if
you have any questions!
