+++
title = "Matrices in Hoon"
date = "2020-02-20"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Core" ]

[extra]
image = ""
description = "Add array types to Hoon."
reward = "5 stars"
assignee = ["~lagrev-nocfep"]
id = "611660914"
completed = true
link = ""
+++

### Background

Hoon currently does not have vector or array types.

### Bounty Description

You must:

- Define a Hoon data structure for n-dimensional arrays
- Spec out Hoon type signatures for basic array functions, with an informal but coherent plan for jetting
- Implement basic array functions
- Write corresponding jets

You approach could follow one of many paradigms, but below are some good ideas:

- BLAS-style matrix math
- Tensorflow
- Futhark

Any paradigm is acceptable as long as it results in code whose performance is at least close to on-par with NumPy.

### Resources

- [The NumPy documentation](https://docs.scipy.org/doc/)
- [BLAS](http://www.netlib.org/blas/)
- [Tensorflow](https://www.tensorflow.org/js/guide/tensors_operations)
- [Futhark](https://futhark-lang.org/examples/arrays.html)

### Contribution Guidelines

- Do not begin work until your request to claim this bounty is accepted.
- Submit your code as a PR to the [urbit Github repo](https://github.com/urbit/urbit)
- You have 180 days from the time of approval to complete this bounty.

## Milestones

### Your PR is merged

5 stars
Your PR is accepted and merged.
