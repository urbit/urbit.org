+++

title = "UrWasm Phase II"
date = "2024-03-14"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Core"]

[extra]
image = ""
description = "WebAssembly Interpreter in Nock — Phase II"
reward = "16 Stars"
assignee = ["~dozreg-toplud"]
champion = ["~rovnys-ricfer"]
grant_id = "P0372"
completed = false
canceled = false

+++

This is the updated roadmap for the Urwasm Project ([phase I](https://urbit.org/grants/wasm-nock)).

WebAssembly is a low-level language for a portable virtual machine. Wasm is designed to be a compilation target for a variety of programming languages and its design is hardware independent and relatively simple, making its support ubiquitous in modern browsers. Its simple design made it a perfect first candidate for a first emulator of an conventional computational system on a novel functional computer: Urbit. This is phase II of the UrWasm (_Urbit Wasm_) project.

Full specification available [here](https://gist.github.com/Quodss/a1aaa81941e61707843a75d45d901ea0).

## Milestones
1. Lia execution in Hoon (1-2 months)
      - Lia-to-Wasm compiler
      - Wasm binary encoder
      - Lia interpreter as a jet target 

    _Reward: 6 Stars_
2. Jet development and determinism enforcement (1 month) 
      - Lia runtime in C
      - Floating point determinism in C
      - Wasm validation in Hoon, Lia validation in Hoon and C

    _Reward: 4 Stars_
3. Operationalization: (1-2 months) 
    - Lia state caching
    - Unit tests
    - Lia text format specification and lexer
    
    _Reward: 6 Stars_

