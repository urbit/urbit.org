+++

title = "Urwasm — Phase I"
date = "2023-08-30"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Core"]

[extra]
image = ""
description = "WebAssembly Interpreter in Nock — Augment Urbit with the ability to run WASM code."
reward = "20 Stars"
assignee = ["~dozreg-toplud"]
champion = ["~rovnys-ricfer"]
grant_id = "B0299"
completed = true
canceled = false

+++

Urbit's machine code, Nock, is not a straightforward compilation target for existing programming languages, and its performance is still quite poor compared to native code.  In the past few years, a rich environment of software systems has arisen around WebAssembly (WASM), since it has near-native performance, can run in web browsers, can be effectively sandboxed, and has an LLVM backend that allows many common languages to be compiled to it.

This project aims to augment Urbit with the ability to run WASM code.  The basic approach is to write a WASM interpreter in Hoon -- Urbit's standard programming language that compiles to Nock -- then "jet" that interpreter with a faster interpreter written in C (or possibly Rust), which will be run instead of the Hoon code in any Urbit runtimes that include the WASM interpreter jet.  This should allow Urbit to run third-party code safely at near-native speed.

In the short term, being able to run WASM inside Urbit will let programmers use familiar languages to write Urbit apps that run inside Urbit's VM alongside apps written in Hoon.  There are also opportunities to use WASM in other ways in Urbit, including as a language for Urbit to use to specify third-party jets and as a language for specifying the behavior of the I/O drivers in Urbit's runtime.  Using WASM in I/O drivers could in turn allow hot-reloading of I/O drivers without shutting down the Urbit, and it would give code inside Urbit more control over the driver behavior.

Some thorny issues in operationalizing this will likely include ensuring determinism for floating-point operations and ensuring that there are no jet mismatches between the interpreter state that a jet stores and the state of the interpreter defined in Hoon.  This is necessary for correctness in the case where a WASM program needs to be partially run, then suspended (such as when it calls an external function and needs to wait for the result), if that suspension is longer than momentary, which forces a noun representation of the state to be materialized.

After a WASM interpreter has been operationalized and deployed to the live network, more speculative extensions could be added.  Those are listed as an optional last phase.

This is a large project, but its fruits could be correspondingly substantial.

## Milestones

The main project will be broken up into three phases: Hoon Implementation, Basic Jetting, and Operationalization.  The first phase implements a naive but complete WASM interpreter in Hoon.  The second phase, basic jetting, will add corresponding code in the runtime that can be run instead of the Hoon code to improve performance.  The operationalization phase will involve benchmarking to bring this implementation up to rough speed parity with other systems.  It will also involve making some potentially difficult decisions about floating point determinism and how to turn a WASM VM state into a noun in case the computation needs to be suspended and stored somewhere in Arvo's state.

After these three main phases are done, further work can be done to extend Urbit's WASM system in various ways.  This is listed in Phase 4: Extension.

The 20 Star reward is for completion of Phase 1. Funding will be made available for funding later phases based on successful completion of the first phase.

### Phase 1: Hoon Implementation

In this phase, use existing Hoon implementations of arithmetic and printing functions.  This includes floating point, which is jetted in Vere by GNU softfloat to ensure determinism.

#### Phase 1, Part 1: Examples

+ Parse and interpret this simple text-format example.with a trivial `main()` function.
  ```C
  int main() {
    return 42;
  }
  ```

  ```
  (module
    (table 0 anyfunc)
    (memory $0 1)
    (export "memory" (memory $0))
    (export "main" (func $main))
    (func $main (; 0 ;) (result i32)
      (i32.const 42)
    )
  )
  ```
+ Parse and interpret this module with a call to an external "puts" function, which could be implemented as a Hoon hint-based `~&` print.
  ```C
  int main() {
    const char *foo = "Hello, World!";
    printf("%s\n", foo);
    return 42;
  }
  ```

  ```
  (module
    (type $FUNCSIG$ii (func (param i32) (result i32)))
    (import "env" "puts" (func $puts (param i32) (result i32)))
    (table 0 anyfunc)
    (memory $0 1)
    (data (i32.const 16) "Hello, World!\00")
    (export "memory" (memory $0))
    (export "main" (func $main))
    (func $main (; 1 ;) (result i32)
      (drop
        (call $puts
          (i32.const 16)
        )
      )
      (i32.const 42)
    )
  )
  ```
+ Parse and interpret this factorial module.
  ```C
  int factorial(int n) {
    int i;
    int fact = 1;

    for (i = 1; i <= n; ++i) {
      fact *= i;
    }

    return fact;
  }

  int main() {
    return factorial(12);
  }
  ```

  ```
  (module
   (table 0 anyfunc)
   (memory $0 1)
   (export "memory" (memory $0))
   (export "factorial" (func $factorial))
   (export "main" (func $main))
   (func $factorial (; 0 ;) (param $0 i32) (result i32)
    (local $1 i32)
    (local $2 i32)
    (set_local $2
     (i32.const 1)
    )
    (block $label$0
     (br_if $label$0
      (i32.lt_s
       (get_local $0)
       (i32.const 1)
      )
     )
     (set_local $1
      (i32.const 0)
     )
     (set_local $2
      (i32.const 1)
     )
     (loop $label$1
      (set_local $2
       (i32.mul
        (get_local $2)
        (tee_local $1
         (i32.add
          (get_local $1)
          (i32.const 1)
         )
        )
       )
      )
      (br_if $label$1
       (i32.ne
        (get_local $0)
        (get_local $1)
       )
      )
     )
    )
    (get_local $2)
   )
   (func $main (; 1 ;) (result i32)
    (call $factorial
     (i32.const 12)
    )
   )
  )
  ```
+ Parse and interpret the text-format examples from https://github.com/mdn/webassembly-examples/tree/main/understanding-text-format.
+ Parse and interpret the text-format examples from https://github.com/mdn/webassembly-examples/tree/main/js-api-examples.

#### Phase 1, Part 2: Completeness

+ Parse WASM's binary format (`.wasm`), in addition to the text format (`.wat`)
+ Implement the rest of the WASM specification:
  + Values
    + Bytes
    + Integers
    + Floating-Point
    + Vectors
    + Names
  + Types
    + Number Types
    + Vector Types
    + Reference Types
    + Value Types
    + Result Types
    + Function Types
    + Limits
    + Memory Types
    + Table Types
    + Global Types
    + External Types
  + Instructions
    + Numeric Instructions
    + Vector Instructions
    + Reference Instructions
    + Parametric Instructions
    + Variable Instructions
    + Table Instructions
    + Memory Instructions
    + Control Instructions
    + Expressions
  + Modules
    + Indices
    + Types
    + Functions
    + Tables
    + Memories
    + Globals
    + Element Segments
    + Data Segments
    + Start Function
    + Exports
    + Imports

### Phase 2: Basic Jetting

+ Write a basic top-level jet for interpreting WASM.  This could call into an existing WASM interpreter, or it could be a bespoke C implementation.  The jetted function should take as its input binary-format WASM code that has a C-style `main()` function, call that function, and return the output as a Nock noun.  The initial version does not need to be able to handle suspension.  The initial jet should use softfloat instead of hardware floating point, to ensure deterministic execution.
+ Implement suspension in the jet.  This means it can interpret WASM whose `main()` function calls into an external function that the Hoon runtime can't complete immediately, such as an asynchronous I/O call.  Instead of simply returning the value, the interpreter function needs to be able to return a pair of the external function call and the suspended WASM VM state.  The function call will be a pair of the function name and its arguments.  Another jetted function must be written to resume computation by injecting the result of the function call into the WASM VM state and resuming interpretation.

### Phase 3: Operationalization

+ Ensure determinism, including floating-point details
+ Validate WASM code before running it
+ Basic benchmarking and optimization

### Phase 4: Extension

+ Use WASM to run third-party jets in Vere or Ares
+ Rewrite Vere I/O drivers in WASM
  + Load I/O driver WASM code from Arvo
+ Implement WASI (the WASM system interface) in Urbit 
+ Implement Urbit-specific standard runtime environments for WASM that can be run as an Urbit Spider thread or Gall agent.
+ Compile Vere to WASM, then jet the Nock WASM interpreter metacircularly

