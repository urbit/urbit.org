+++
title = "Machine Learning and Numerical Computing"
date = "2024-05-05"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Tool"]

[extra]
image = ""
description = "Enable numerical computing and machine learning on Urbit."
reward = "5-20 stars"
assignee = [""]
champion = ["~lagrev-nocfep"]
grant_id = "B0348"
completed = false
canceled = false
+++

~lagrev-nocfep and ~mopfel-winrux have been hard at work implementing numerical computing on Urbit. The end goal that they are driving towards is Urbit-native machine learning. They seek a qualified grantee to assist with this project.

Currently, they have completed significant work on the following:

-  [lib/math](https://github.com/urbit/numerics/tree/main/libmath) enables mathematical functions for single atoms, from `add`, `sub`,`mul`, up to more complex functions such as `exp`, `sin`, `cos`, `log`, and so on.
-  [Lagoon](https://github.com/urbit/numerics/tree/main/lagoon) (Linear AlGebra in hOON) enables matrix mathematics in the vein of BLAS or LAPACK (like NumPy's pure matrix operations).
- [Saloon](https://github.com/urbit/numerics/tree/main/saloon)  (Scientific ALgorithms in hOON) enables complex mathematical functions over matrices.
- [Maroon](https://github.com/urbit/numerics/blob/main/maroon)  (MAchine LeaRning in hOON) implements machine learning algorithms as a sidecar to Urbit. Primarily, this is an interpretation of the Tinygrad framework.

However, much work remains to be done. Areas of work include:

- Implementing a complex number type and associated algorithms.
- Implementing a rational number type and associated algorithms.
- Implement a stack based on posit numbers (an alternative to floating point) for Lagoon/Saloon.
- Finish implementing fixed-precision numbers.
- Write deterministic jets for Saloon (in C)
- Implement APL or other numerics languages on top of Lagoon/Saloon.
- Completing various needed tasks in the above 4 libraries.

There are many opportunities here and high rewards for the motivated and capable grantee. Help us make Urbit-native machine learning a reality. Reach out to us at grants@urbit.org if you're curious.