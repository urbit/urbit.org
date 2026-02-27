+++
title = "Olif and Urbit IDs"
date = "2026-02-26"
description = "An Olfactive rendering of Urbit Address Space"
# aliases = []

[extra]
# author = ""
ship = "~litneb-maltyp"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+QA+litneb-maltyp/Blog_QA+litneb-maltyp_Social.png"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Olif+and+Urbit+ID/Blog_Olif+and+Urbit+IDs_Text_Social.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Olif+and+Urbit+ID/Blog_Olif+and+Urbit+IDs_Text_Banner.png"
# imageDark = ""
# imageCardDark = ""
# imageIndexDark = ""
tags = ["spotlight", "identity", "design"]
+++

My introduction to Urbit came through its identity system. In particular,  [sigils](./creating-sigils) and `@p` names. Each Urbit ID is fundamentally a large number, but the system derives two practical representations from it. A `@p` is a pronounceable name generated from a phonetic base. The number is mapped to a selection from 512 predefined three-letter syllables or phonemes (256 prefixes and 256 suffixes). This produces a readable string like `~sampel-palnet` for a planet. The sigil is generated in parallel as a visual shape assembled from a fixed set of foundational glyphs. Each glyph corresponds directly to one of those syllables. The mapping is fully deterministic. The same address always produces the same `@p` and sigil. This keeps the core components simple and consistent across billions of possible IDs.

What stood out to me was how offering both a verbal name (`@p`) and a visual glyph (sigil) together creates a deeper attribute of individuality or character for each address. Neither rendering alone fully captures it, but their combination makes the abstract shape or name feel more distinct and recognizable. This idea, that providing multiple complementary renderings of the same underlying identity adds meaningful expression, became an important takeaway for me and got my wheels turning about exploring and extending Urbit IDs into other domains.

Previous projects had already experimented with alternative visual interpretations, such as [emoji](https://x.com/everyemblemish) or [coat-of-arms](https://x.com/urbitarms) based mappings. I have a background in fragrance development and manufacturing and naturally wondered how a system could be built to extend address rendering into the sense of smell.

That exploration gave birth to Olif: a project that translates any Urbit address into a unique fragrance. By mapping address space to defined, accessible scent combinations, Olif extends Urbit's philosophy of human-meaningful identity into a new sensory dimension.

# What is an Olif?
An Olif is an olfactive rendering of an Urbit address, an olfactory counterpart to the verbal `@p` and visual sigil, transforming any Urbit ID into a unique, smellable identity.

The core idea is to map the entire Urbit address space to distinct combinations of accessible, well-defined fragrant materials. Just as sigils and `@p` names make abstract addresses feel personal and memorable through sight and sound, an Olif does the same through scent. However, unlike words or images, fragrances require a physical substrate to be experienced. To address this, Olif includes the necessary infrastructure for real-world delivery: physical products (such as alcohol-based spray perfumes) tied to specific addresses that are made available through both online portals and select in-person retail points and events.

To keep the project truly decentralized and accessible, the entire system is open source. The Olif formulas (ingredient lists with CAS# references and percentages), material library, rendering methodology, and address-space mappings are publicly available on [GitHub](https://github.com/Olif-ID). 

An Olif also requires some redundant rendering of address space to help convey the unique characteristics of smell. Without physical access to an Olif's fragrant parts it becomes impractical to share a simple character representation of, for instance, the material list. In addition, each Olif can benefit from a visual representation and potentially a multi-sentence description of the scent notes.

### List of Olif renderings:

- Physical fragrant ingredient mixture
- Ingredient list 1-16 CAS# and their relative percentages
- Multi-sentence, fragrance note description
- Visual/graph of the ingredients and their participation in the formula
- Address Space Rendering Map.


![Olif renderings](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Olif+and+Urbit+ID/Olif+Renderings.jpg)



# Methodology
## 1. Creating the Library
Before mapping fragrant materials to Urbit address space we established 4 guidelines pertaining to fragrance and the construction of a material library:
  

- Establish a library with wide ranging representation of various odor categories   
- Limit the material library to be manageable for an enthusiast (~100 pcs)   
- Only use fragrant materials that can be regularly acquired (insist upon CAS#)   
- Only use fragrant materials that have safety documentation

  
Using these guidelines we created a material library of 96 ingredients divided into 16 odor groups. Our odor groups were prepared using two properties. First, organization by similar olfactive properties; second, agreeability with neighboring odor group ingredients.

| Odor Group | Materials                                        |
|------------|:-------------------------------------------------|
| Wood       |  Virginia Cedarwood, Anthamber, Patchouli, Hinoki, Sanderol, Okoumal | 
| Citrus     |  Bergamot, Lemon, Sweet Orange, Petitgrain, Bitter Yuzu, Pink Grapefruit |
| Herbal     |  Lavandin, Juniper Berry, Spanish Sage, Rosemary, Myrcene, Carene 3 Delta |
| Floral     |  Phenyl Ethyl Alcohol, Geraniol, Rose Absolute, Cyclamen Aldehyde, PADMA, Florhydral |
| Earth      |  Geosmin, Herbal Pyrane, Clearwood, Evernyl, Summer Savory, Borneol |
| Spice      |  Eugenol, Frankincense, Cardamom, Black Pepper, Coffee, Cassia |
| Terpene    |  PO Cedarwood, Balsam Fir Needle, Siberian Fir Needle, Isobornyl Acetate, Black Pine, Cypress |
| Musk       |  Romandolide, Ethylene Brassylate, Isoambrettolide, Galaxolide, Ambroxan, Cetalox |
| Vanilla    |  Vanillin, Beeswax Absolute, Coumarin, Heliotropine, Labdanum, Methyl Liatone |
| Narcotic   |  Jasmin Sambac, Neroli, Magnolia, Hedione, Ylang Ylang, MA/Triplal Shiff Base |
| Resin      |  Tonka, Olibanum, Palo Santo, Myrrh, Elemi, Copaiba Blasam |
| Menthol    |  Myrtle, Laurel, Helichrysum, Peppermint, Eucalyptus, Tea Tree |
| Fruit      |  Fructone, Firascone, Respberry Ketone, Gamma Octalactone, Gamma Decalactone, Aldehyde C-16 |
| Green      |  Triplal, Galbanum, Gardenol, Stemone, Cis-3 Hexonol, Violet Leaf Absolute |
| Smoke      |  Cypriol, Vetiver, Safraeline, Birch Tar, Amyris, Tobacco Leaf |
| Aquatic    |  Tropional, Calone, Floralozone, Dihydromyrcenol, melonal, vetival |

## 2. Mapping Library to Primitives
Now that we have a library to build from, we begin with the same method used for `@p` and Sigil rendering by assigning unique material combinations to the 512 namespace primitives (Examples of namespace primitives are phones for `@p`s or glyphs for sigils).

### **Namespace Primitives**
- 256 Suffixes (Galaxies)
- 256 Prefixes (Stars, Planets, Moons, Comets)

To recreate all 512 Namespace Primitives using our library, we evenly distribute the 16 odor groups across them all, creating 16 suffixes and 16 prefixes for every odor group. With 96 total materials divided into 16 odor groups, every odor group has 6 materials used to create the 32 namespace primitives.
To apply the 6 materials to each odor group's set of 32 primitives, we create 3 categories of mixture.

### **Pures**
- 4 suffixes per odor group
- These mixtures are 100% of 1 material
- Pures utilize 4 of the 6 allotted materials and best represent the odor group they are in and have the least amount of usage restrictions

### **Hearts**
- 12 suffixes per odor group
- These mixtures use two materials at ratios between 1:1 and 4:1
- Hearts utilize between 4 and 6 of the 6 allotted materials

### **Modifiers**
- 16 Prefixes per odor group
- These mixtures use two materials at ratios between 5:1 and 50:1
- Modifiers serve as a home for materials with qualities that prevent them from use in large concentration

To find out which **materials** should be made available to each category of **mixture** we used two properties, **Usage limitation** and **Relative Susbstantivity**.

### **Usage limitation** 
Usage Limitation is a property derived from IFRA restrictions on the quantities of fragrant materials used in consumer products. These restictions refer to specific cielings of usage (by percentage) in a final use product. To calculate our usage limitation we set a maximum **fragrance load** of 20% which allows for Eau De Parfum concentration of fine fragrances.

### **Relative substantivity**
Relative substantivity is a subjective property given to each material that imparts a level of power and reception by the nose. This number creates a posture amoungst its peer materials. The number 1 is a baseline and is assigned to the material Virginia Cedarwood (CAS# 8000-27-9). Materials are given an RS score logarithmically in comparison to the baseline when smelling. Ex: If something smells "twice as much" in power, it's assigned a 2. If something smells "half as much" in power, it's assigned a 0.5.

## 3. Building complex address space with Olif primitives
Now that all namespace primitives have been assigned materials and unique percentages, we create a system for combining the primitives with one another to form higher level addresses. One constraint we deal with in fragrance is a lack of ordinal dimension. `@p`'s and sigils have the advantage of placing their primitives in sequence with one another to help distinguish identity and maintain a unique rendering.

To accomplish some sense of ordinal dimension in an Olif, we apply weighted percentages to primitives when adding them together, for example:

**Galaxy**: `~aaa`\
aaa: 100%\

**Star**: `~aaabbb`\
aaa: 66.6%\
bbb: 33.3%\

**Planet**: `~aaabbb-cccddd`\
aaa: 50%\
bbb: 25%\
ccc: 12.5%\
ddd: 12.5%\

# The current state of Olif
Development on Olif began in late 2022 with funding from an Urbit Foundation grant, and the core milestones, including the rendering system, formula library, web-based portal, and initial physical product samples were completed by the end of 2023.

Since launch, the project has sustained it's activity. Hundreds of physical Olifs have been hand-compounded and sold, reaching both dedicated members of the Urbit community and newcomers who first encountered Urbit through fragrance. The scents have proven to be an effective, sensory introduction to the network, sparking curiosity about ownership of digital identity and sovereign computing.

In recognition of its innovative fusion of decentralized identity and olfactive art, The project received the Septimus Piesse Award for Exceptional Vision from the Art and Olfaction Awards, given to projects that demonstrate imagination in how scent is conceived, developed, or presented.

The project remains active today. The [official Olif website](https://urbit.fragrance.services) continues to let any user input their Urbit ID and instantly explore its corresponding fragrance profile, ingredients, and character. Physical Olifs are still available for in-person purchase at Maak Lab in Portland, Oregon along with custom Native Planet Callisto devices for self-hosting. 

![Olif in-store](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Olif+and+Urbit+ID/Olif_In-store.jpg)
