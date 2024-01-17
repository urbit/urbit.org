+++

title = "LTO and PGO in Vere"
date = "2023-07-06"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Core Dev"]

[extra]
image = ""
description = "Link-time optimization and profile-guided optimization in vere"
reward = "3 Stars"
assignee = ["~fighet-parnet"]
champion = ["~rovnys-ricfer"]
grant_id = "P0280"
completed = false
canceled = false

+++

# Description
Currently, vere doesn't take advantage of a few key compiler optimizations which would allow for better code generation. 

# Milestones

## Milestone 1

Firstly, since c3, noun, vere, etc. are all separate translation units, and link-time optimization (LTO) is not used (as with dependencies), inlining of key functions cannot be done by the compiler (such as noun leaf functions) which would allow for code size and speed increases.

Currently, LTO does not work with vere's third-party dependencies, as certain semantics are broken in urbit's startup code, for a reason currently unknown to me. I put forth a first milestone of getting LTO working on as large a subset of the codebase as possible (investigating and attempting to remedy if code doesn't work with it enabled) and integrating it correctly into bazel, the build system. I think this would take about a month of work given that I'll be working on it part time, and I think that it will be worth a star, because I have reason to believe that we could be seeing a 50% reduction in code size of the binary with an improvement on the order of ~10% in the execution speed.

This deliverable would take the form of (a) patch(es) to vere which would enable LTO and fix the current bugs.

Firefox 5-15% improvement thanks to LTO: https://glandium.org/blog/?p=3888

**Timeline: ~1 month**

**Reward: 1 Star**

## Milestone 2

Secondly, profile-guided optimization (PGO) is not currently done with vere. Enabling PGO is more involved than LTO, and I think it would take me two or three months to complete, and be worth two stars (involves writing a suite of reproducible and realistic performance tests, getting a build pipeline which will run and profile vere working, and doing so for two compilers). PGO requires multiple compilation passes, where an instrumented build is done, and a suite of performance tests are run to give GCC (or LLVM) profile data of a realistic workload in the binary. Once this is done, a second compilation pass is done where GCC and LLVM have much more information on "hot" pathes and branch predictions and can make many more intelligent decisions than otherwise. On similarly large projects, PGO has yielded up to 20% performance improvements. 

As mentioned earlier, this deliverable would consist of writing a suite of reproducible and realistic performance tests, getting a build pipeline which will run and profile vere working, and doing so for two compilers.

**Timeline: ~2-3 months**

**Reward: 2 Stars**

20% gain in LLVM compilation time according to llvm:

https://llvm.org/docs/HowToBuildWithPGO.html 

10-16% improvement in rust compilation time:

https://blog.rust-lang.org/inside-rust/2020/11/11/exploring-pgo-for-the-rust-compiler.html

5-15% improvement in chrome on various metrics, 10% faster page load time:

https://blog.chromium.org/2020/08/chrome-just-got-faster-with-profile.html

# Compensation

Reward: 3 Stars
