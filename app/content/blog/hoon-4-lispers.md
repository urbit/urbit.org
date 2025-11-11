+++
title = "A Perspective on Lisp and Hoon"
date = "2023-06-15"
description = "Lisp is an éminence grise of programming.  How does Hoon compare?"

[extra]
author = "N E Davis"
ship = "~lagrev-nocfep"
image = "https://engineering.stanford.edu/sites/default/files/styles/card_1900x950/public/images/news/john_mccarthy.jpeg?h=3751da6c&itok=6tPSih53"
+++

![John McCarthy, inventor of Lisp, at Stanford.](https://engineering.stanford.edu/sites/default/files/styles/card_1900x950/public/images/news/john_mccarthy.jpeg?h=3751da6c&itok=6tPSih53)

> In the beginning, von Neumann created the machine.  And the machine was with rigorous form and code, and no compiler yet moved upon the face of the tubes.  And the evening and the morning were the first day.
>
> And John Backus said, Let there be FORTRAN, and there was Fortran.  And Fortran ruled over the assembly.
>
> And John McCarthy saw the lambda calculus, that it was very good.  And McCarthy made the LISP and divided the programmers who were for the array from the programmers who were for the list.
>
> And the Fortran and the Lisp were the second day.  And God set them in the firmament to give light upon the earth.

Two great temperaments of programming language design span these poles:  Fortran as the engineer of assembler-first hard-nosed array coding and Lisp as the math professor running down to the machine room waving papers.  While they have ceded some to the practicalities of the other over time, each is a trope of a particular computing paradigm.  In this article, we will examine the Lisp pole in light of Urbit's development language, Hoon.

Hoon is a statically typed functional programming language that is designed to be safe, efficient, and expressive.  Hoon has a unique syntax relying heavily on symbolic expressions (using “runes”) rather than traditional keywords and operators.  Hoon's underlying execution language, Nock, has been described as a “pico-Lisp“, making reference to its nature as a cell-based combinator calculus.  Both languages (Nock and Hoon) follow very much in the philosophical steps of Lisp but seek to improve the genre.

Lisp is known for its powerful macro system, which allows developers to write code that generates more code at compile time, and for its powerful `eval` function; while Hoon provides a flexible metaprogramming system that allows developers to manipulate code at compile time and hot-swap code at runtime.

This article will contrast classical Lisp syntax and assumptions with Hoon's design.  As Lisp is a family of languages rather than a single implementation, I will strive to make generally applicable statements or qualify the discussion—I welcome nuance in your responses about the different major Lisp dialects.

Hoon's characteristic structure has arisen from these overarching design principles:

1. Hoon must compile to Nock, and benefits from reflecting Nock's calculational worldview.
2. Hoon must be capable of live upgrades; that is, conscious brain surgery on itself.
3. Hoon should grow organically based on actual developer usage patterns.

Our investigation of Lisp and Hoon will compare their syntax, their metaprogramming affordances, and their underlying philosophies.


##  Syntax

Hoon has many commonalities with Lisp and its most common calling convention is sugared to appear like Lisp.  The conventions of Nock differ—e.g. using `[]` brackets instead of `()` parentheses—and Nock does not have non-numeric tokens or names.  Hoon serves as a more human-friendly syntax which mediates common expressions and structures much as C overlays assembly language.  For practical purposes, we never need to write Nock code by hand, and so while Nock informs Hoon's design choices, we don't need to understand any Nock to talk about Hoon.

Both Lisp and Hoon are homoiconic, meaning that code and data are directly represented the same way:  Lisp code is represented as Lisp data structures, and Hoon code is represented as Hoon data structures.  Homoiconicity means that code can be manipulated and transformed as data at runtime.  While the most compelling investigation in this article focuses on metaprogramming, we need to start with a comparative syntax and grammar so we understand how code and data are represented.

Before all of that, let us compare a simple program implemented in both Lisp and Hoon.  Both programming languages are species of functional languages for which expressions result in values, but they handle side effects differently:  in Hoon side effects are strictly impossible (although a runtime workaround permits I/O and necessary effects), while in Lisp side effects are permitted (although opinions on their use vary).  We will therefore not use a trivial “Hello World” example.  Instead we will calculate the arithmetic mean of a set of numbers of known size.

```scheme
(define (mean a)
  (if (null? a)
  	0
  	(/ (apply + a) (length a))))
```

```hoon
::  Common (sugared) form
++  mean
  |=  a=(list @ud)
  ?~  a  0
  (div (roll a add) (lent a))

::  Rune (unsugared) form
++  mean
  |=  a=(list @ud)
  ?~  a  0
  %+  div
    %-  roll  [a add]
  %-  lent  a
```

The Scheme code has the advantage that it reads almost English-like as one works through the logic, but implicitly relies on familiarity with the `if`/`then`/`else` structure and function application using `()` (on which more soon).

The Hoon code uses the `%` function application runes (differentiated by number of arguments) to apply the function calls.  With syntactic sugar, this looks similar to the Lisp call, with `++roll` instead of `apply` and `++lent` instead of `length`.

Throughout I will use code examples for Lisp taken from [Rosetta Code](https://rosettacode.org/wiki/Category:Scheme).  I will select or compose Hoon examples to be structurally similar to the Lisp code in order to facilitate comparison.  I will also avoid sugar syntax that would obscure the structure of the Hoon code; in some cases this will make it slightly less readable than its equivalent in practice.

### Syntax in Lisp

#### Types

Lisp types are dynamic, checked at runtime rather than on compilation.  Since everything is an object, some assumptions can be made about manipulation and behavior.  Most Lisp dialects share these types:

- Numbers, including integers and floating-point numbers.
- Characters.
- Strings, as a sequence of characters.
- Lists, as a sequence of objects (including lists).
- Symbols, names used to refer to a function, variable, or other object.
- Arrays, a fixed-size multidimensional indexed object collection.

Lisp code, being dynamically typed, is inclined to try a value and see if it works in a given context.  However, some restrictions can be made, such as an argument type declaration on a function:

```lisp
(defun add-two-integers (x y)
  (declare (type integer x y))
  (+ x y))
```

Lisp types are to some extent (justly) influenced by the underlying platform architecture:  Lisp is generally compiled directly to machine code (like a C program), with the notable exception of [Clojure](https://clojure.org/reference/lisps) which runs on the Java Virtual Machine.

#### Operators, Functions, Macros, and Thunks

Lisp syntax is characterized by its use of nested lists, called S-expressions (symbolic expressions), which consist of parentheses enclosing atoms or other S-expressions. The basic structure of an S-expression is an operator (or function) followed by its arguments, all enclosed in parentheses. For example, the following S-expression performs a simple arithmetic operation:

```lisp
(+ 1 2 3)
```

Lisp uses prefix notation, where the operator comes before the operands, and parentheses are used to group expressions.  The S-expression is evaluated from left to right (in most Lisps save Scheme), with the operator being applied to its arguments.

Operators in Lisp operate on values of different basic types.  Lisp dialects vary in their particular base types, but typically include numbers, strings, booleans, and so forth.  The core data type is the list, of course (LISP is for LISt Processing).  Since Lisp biases towards list processing, many operators are comfortable receiving an arbitrary number of values as inputs, as in the code sample above.

In Lisp, [`cons`](https://en.wikipedia.org/wiki/Cons) describes the procedure to construct a pair of objects.  This seemingly modest capability is fundamental to how Lisp builds lists—and since everything is a list, `cons` has consequences.  One fundamental convention is the `cons` cell, which consists of two other Lisp objects and is how lists are actually constructed.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Cons-cells.svg/450px-Cons-cells.svg.png)

Lisp operations are built either as functions or as macros.  Functions produce results directly from their inputs.  Macros by contrast are basically function-building functions, and produce expressions that can be evaluated with inputs to get a result.

A Lisp function is created using `defun`:

```lisp
> (defun square (x) (* x x))
SQUARE

> (square 2)
4
```

(Lisp dialects tend to not be case-sensitive.)

Lisp functions are first-class objects and can be manipulated and passed like values of basic types as well.

Before we can look at macros, we need to consider Lisp's notion of evaluation and in particular deferred evaluation.  For Lisp, an expression can be marked as a literal value rather than evaluated to produce a result.  The quote `'` symbol is used to mark expressions for prevented evaluation:

```lisp
'(1 2 3)  	; evaluates to the list (1 2 3)
'foo      	; evaluates to the symbol FOO
(1 5)     	; evaluates to the list (1 5)
'(1 (+ 2 3))  ; evaluates to the list (1 (+ 2 3))
```

Backtic or backquote `` ` `` allows you to switch an expression in and out of evaluation mode, along with `,` to mark evaluated components for splicing back into the unevaluated expression.

```lisp
`(1 2 3)   	; evaluates to the list (1 2 3)
`foo       	; evaluates to the symbol FOO
`(1 ,(+ 2 3))  ; evaluates to the list (1 5)
```

A Lisp macro is essentially a compile-time function.

```lisp
> (defmacro square (x)
   "Returns the square of the input value."
   `(* ,x ,x))

> (square 2)
4
```

(The `` ` `` notation constructs the expression with values spliced in by `,`.)

A deferred evaluation, called a thunk, is a closure that inherits its lexical environment but is deferred for later computation.  Thunks enable lazy code evaluation and separate the computation’s definition from its execution.

```lisp
(defun create-thunk (function &rest arguments)
  (lambda () (apply function arguments)))

(defun invoke-thunk (thunk)
  (funcall thunk))

;; Creating a thunk that calculates the factorial of a number
(defvar factorial-thunk (create-thunk #'(lambda () (factorial 5))))

;; Invoking the thunk to get the result
(print (invoke-thunk factorial-thunk))  ; Output: 120
```

In this code example, `create-thunk` accepts a function and returns a thunk created using a lambda function to encapsulate the computation.  `invoke-thunk` is used to invoke the thunk to get the actual result.  The actual application creates a deferred factorial implementation and then finally invokes it.  Without the last line, the actual calculation would never be executed.

As Paul Graham wrote, “The unusual thing about Lisp-- in fact, the defining quality of Lisp-- is that it can be written in itself.”  A Lisp program is an S-expression, and in principle we can run the equation the other way:  certain S-expressions are valid Lisp programs.  Although uncommon in practice due to code safety issues, the `eval` function is illustrative of Lisps’ ability to evaluate a Lisp expression that is represented as a data structure.  It takes a single argument, which is a Lisp expression, and returns the value of that expression.  Lisp programs can in principle generate new code—or modify existing code—and evaluate it on the fly, since code is data.

```lisp
(defvar x 10)
(defvar y 20)
(defvar z '(+ x y))

(eval z)
```

Besides explicitly named functions and macros, Lisp frequently employs lambda expressions to produce functions on demand at the point of use.

```lisp
> ((lambda (x y) (+ x y)) 5 10)
15
```

Naturally, we have not covered all of Lisp, but the above should motivate how Hoon differs from Lisp.  Furthermore, Lisp is really a family of languages, so there is a fair amount of variation in specifics.

- [Paul Graham, _On Lisp_](http://www.paulgraham.com/onlisptext.html)

### Syntax in Hoon

#### Types

Hoon compiles to Nock and runs on a Nock virtual machine interpreter.  Nock knows only about nouns, that is to say either simple unsigned integers or pairs of other nouns.

> To be exact, a noun is an S-expression, except that classic S-expressions have multiple atom types ("S" is for "symbol"). Since Nock is designed to be used with a higher-level type system (such as Hoon's), it does not need low-level types. An atom is just an unsigned integer of any size.


One of the biggest differences between Hoon and Lisp lies in their respective type systems:  Hoon is statically typed while Lisp is dynamically typed.  Furthermore, since Hoon compiles to Nock, ultimately every value, expression, and program in Hoon results in a noun (an atom or unsigned integer, or a cell or pair of nouns).  (The compiler may make this process slightly opaque, but it is deterministic.)  Types, if values are known, must match or nest properly at compile time.

Hoon implements types as a metadata layer over bare Nock numbers and atoms.  (The implementation details do not concern us but can be seen using the `!,` zapcom rune, which produces the abstract syntax tree of an expression.)  Hoon atom types include various numeric types (signed and unsigned, hexadecimal, binary, etc.); address space identifiers (such as ~zod); IP addresses; UTF-8 text; and floating-point values, [among many others](https://developers.urbit.org/blog/literals).  As these are interpretations laid over the bare integer, it is trivial to convert among them, a convenience like C affords.

```hoon
::  raw unsigned decimal integer
> 123
123

::  hexadecimal integer
> `@ux`123
0x7b

::  UTF-8 text
> `@t`123
'{'

::  relative datetime (a small fraction of a second)
> `@dr`123
~s0..0000.0000.0000.007b

::  address mnemonic (ship name)
> `@p`123
~rux

::  IPv4 address
> `@if`123
.0.0.0.123

::  IPv6 address
> `@is`123
.0.0.0.0.0.0.0.7b
```

A cell is a pair of two nouns, and of course many compound types exist, including lists (a null-terminated series of cells).  A file path in Urbit is, for instance, a list of resource names (a `path`).  A manipulable text string is a list of single bytes for characters (a `tape`).  Maps (associative arrays), sets, and other containers round out the basic data structure types, but more complex types such as HTTP headers and app metadata are available.  Even app actions have an associated type so that the set of actions is enumerable and validated.  Here, for instance, are some cryptographic types from the standard library:

```hoon
+$  jacobian   [x=@ y=@ z=@]                	::  jacobian point   	 
+$  point  	[x=@ y=@]                    	::  curve point
+$  domain  
  $:  p=@                                   	::  prime modulo
  	a=@                                   	::  y^2=x^3+ax+b
  	b=@                                   	::    
  	g=point                               	::  base point
  	n=@                                   	::  prime order of g
  ==
```

Hoon expressions are ultimately binary trees of cells and atoms—Hoon is homoiconic and so code is directly represented as a data structure which can be interpreted as a value as well.  This facilitates Hoon's ability to upgrade itself in place, as we will see.

Hoon commonly implements types structurally via _molds_, or functions which coerce to type or crash.  A mold is a way of asserting known type information over a value, typically at compile time, in a way that allows for data transformation and data validation.  This leads to some interesting cases such as the difference between a null-terminated tuple and a true list, which some functions require.

```hoon
> ~[1 2 3]
[1 2 3 ~]

> `(list @)`~[1 2 3]
~[1 2 3]

> (snag 2 ~[1 2 3])
mull-grow
-need.[i=@ud t=%~]
-have.%~
nest-fail
dojo: hoon expression failed

> (snag 2 `(list @)`~[1 2 3])
3
```

Hoon implements a unique character literal syntax for every single atom type, allowing any value to be unambiguously interpreted by the parser per the developer's intent.  You can see this somewhat in evidence in this comparison chart:

| Type | Lisp Type | Hoon Type |
| --- | --- | --- |
| (Unsigned) integer | `1` | `1` |
| Signed integer | `-1`, `1` | `-1`, `--1` |
| Symbol | `x` | `%x` |
| Real/FP | `1.5` | `.1.5` |
| Character | `#\c` | `'c'` |
| Text | `"Hello"` | `'Hello'` (as atom); `"Hello"` (as list) |
| Rational | `2/3` | (no Hoon equivalent) |
| Address | (no Lisp equivalent) | `~sampel-palnet` |

Much of Hoon's practical power derives from how it represents and manipulates nouns as data and as code.

> The type of type is just a normal datatype in Hoon, and a lot of the system manipulates types.  In particular, the `!>` rune, when applied to a piece of data, uses compile-time type reflection to produce something called a "vase": a pair of type and data, similar to a `Data.Dynamic` in Haskell, or a limited form of a dependent pair.  Since the Arvo kernel does a lot of dynamic compilation, it uses vases to implement something akin to a dynamically typed language using Hoon.  This allows for type-safe dynamic program loading, program execution, and data migration.  (Ted Blackman ~rovnys-ricfer, [“Why Hoon”](https://urbit.org/blog/why-hoon))

A `vase` in Hoon is a cell of type and value.  Typically `vase`s are produced with the `!>` zapgar rune.  We use `vase`s to carry type information where otherwise it may be lost, such as in transmission over the wire to another Urbit instance.

```hoon
> !>('hello')
[#t/@t q=478.560.413.032]

> !>([5 10])  
[#t/[@ud @ud] q=[5 10]]

> !>(`(list @)`~[1 2 3])
[#t/it(@) q=[1 2 3 0]]

> !>(`(list @)`~)
[#t/it(@) q=0]
```

A `vase` can be used at runtime to resolve a value from a dynamic context into an executable Hoon expression, and this is commonly done with web-based input, for instance, where insufficient information will be available at compile time to resolve the type correctly.

#### Expressions

Nock explicitly consists of binary trees, since any Nock structure or program consists entirely of atoms (bare values) and cells (pairs of nouns).

![](https://storage.googleapis.com/media.urbit.org/docs/userspace/hoon-school/binary-tree.png)

Expressions are oriented around runes, which act as operators to join or manipulate expressions.  To construct a cell of two values like `1` and `2`, one uses the `:-` colhep rune.  (Hoon cells implement what we call an “implicit `cons`”, meaning that two nouns composed together are simply unified in a shared binary tree.)

```
  :-
 /  \
1    2
```

To invoke a function named `add`, one can provide a `%-` cenhep rune with the function name and the arguments.

```
   %-
  /  \
add   :-
     /  \
    1    2
```

We write this Hoon expression one of two ways, either separated by whitespace or using parentheses:

```
> %-  add  :-  1  2
3

> %-(add :-(1 2))
3
```

Hoon employs “sugar syntax” for many common code patterns to make them easier to write and (sometimes) to read.  Since Hoon had the advantage of knowing about Lisp's syntax beforehand, the standard invocation syntax in Hoon (formally a `%` rune) uses the irregular `()`-based syntax like Lisp.  In this case, we could instead write the Lisp-like expression:

```hoon
> (add 1 2)
3
```

which results in basically the same expression once the parser is done.

(Although Hoon ultimately compiles to Nock, it is more natural in some ways to approach the syntax of a program as an array of $n$-ary trees, where each “slot” in an expression can have zero, one, or many children.  Zero children refers to a tree address containing a terminal value like a symbol or an integer.)

Rune syntax is Hoon's answer to the Lisp proliferation of parentheses—by restricting expressions to a definite number of children, Hoon avoids needing to explicitly terminate most expressions.  In some ways, runes are an ASCII-based equivalent of APL's  symbolic character operators.

```apl
life ← {⊃1 ⍵ ∨.∧ 3 4 = +/ +⌿ ¯1 0 1 ∘.⊖ ¯1 0 1 ⌽¨ ⊂⍵}
```

Rather than permit polymorphic language statements, Hoon requires each rune to be extremely tightly defined.  While many statements may be functionally equivalent to an `if` or a `cond` statement, for instance, Hoon allows the developer to select a particular expressive rune if desired.

- `?:` typical `if`/`then`/`else` branch
- `?=` branch on type
- `?@` branch if atom
- `?^` branch if cell
- `?+` switch on type with default
- `?-` switch on type without default
- `?~` branch if null

The next examples explore an interesting difference between Lisp `cond` and Hoon `?+` wutlus swtich statements:  Hoon switches over _types_ not _values_, and `term` symbols as constants are instances of self-matching types.)

```scheme
(define (weather f)
   (cond ((> f 80) 'too-hot)
     	((> f 60) 'nice)
     	((< f 35) 'too-cold)
     	(else 'typical-midwest)))
```

```hoon
|%
++  weather
  |=  f=@ud
  ?:  (gth f 80)  %too-hot
  ?:  (gth f 60)  %nice
  ?:  (lth f 35)  %too-cold
  %typical-midwest
++  symbol-to-message
  |=  msg=term
  ?+    msg  'Typical Midwest'
      %too-hot
    'Too hot outside'
      %nice
    'Nice outside'
      %too-cold
    'Too cold here'
  ==
--
```

Lisp expects a program to be a running series of expressions, naturally composed together as a list.  Hoon, in contrast, expects everything to be an evaluable expression (no implicit `progn`, for instance):  thus, series of expressions must be composed together, e.g. using `=>` tisgar to concatenate two expressions.

This code example defines an expression and immediately evaluates another expression against it:

```hoon
=>  [a=1 b=2 c=3]
::
b
```

Hoon code is compiled to Nock, but it is not a simple macro over Nock—multiple Hoon expressions could result in an identical Nock expression, and the same Hoon expression evaluated against different subjects could result in different Nock expressions.  Hoon code is parsed to an abstract syntax tree first, which includes type metadata, then compiled into the appropriate Nock statement.  Here we use the `!,` zapcom rune to turn a Hoon expression into its AST, then `!=` zaptis to compile a Hoon expression to Nock.

```hoon
> !,(*hoon `@ux`+(1))
[ %ktls
  p=[%sand p=%ux q=0]
  q=[%ktls p=[%sand p=%$ q=0] q=[%dtls p=[%sand p=%ud q=1]]]
]

> !=(`@ux`+(1))
[4 1 1]
```

Hoon has much more syntactic sugar than Lisp.  Not only is the Lisp-like `()` execution convention sugar for `%:` cencol to invoke a function, there are in fact many ways to evaluate code expressions.  Consider, for instance:

| Rune | Usage |
|---|---|
| `%-` | Evaluate a function against a single noun. |
| `%+` | Evaluate a function against a cell (pair of nouns). |
| `%^` | Evaluate a function against a trio of nouns. |
| `%:` | Evaluate a function with many arguments ($n$-ary, unspecified number of nouns). |
| `%~` | Evaluate a higher-order function to produce a function. |

This gives a Hoon developer an extreme amount of flexibility in constructing and laying out code expressions.  In fact, many Hoon programs read as a hybrid of imperative code and functional code, since the ability to lay out intent line-by-line feels rather like C.

Hoon conventions and sugar syntax have evolved organically as core developers discovered or invented useful design patterns and appropriately concise syntax.

#### Functions (Gates) and Cores

The most important structural concept in Hoon is the core, which organizes code into a binary tree of `[code data]`, or as we call it in Hoon, `[battery payload]`.  Since cores have a standard structure, this means that many kinds of direct manipulations (metaprogramming) are possible, such as altering the input arguments to a function or manipulating the code variance model.  Cores play a role in Hoon similar to that of objects in many other languages.

Any function (“gate” in Hoon parlance) is a core, whose `battery` is the compiled Nock code and whose `payload` includes its view of the system, including the standard library, and its input arguments.  The `|=` bartis rune is most commonly used to make a gate:

```hoon
::  Select the larger of two values ("max").
|=  [a=@ b=@]
?:  (gth a b)
  a
b
```

The gate definition rune `|=` bartis has two children, a specification of the expected input and the expression.  When invoked, the values of the specification (or "sample") are provided to the expression, which then evaluates to return a noun.

One quirk of Hoon is that since everything is an address (or “axis”) in a binary tree, you can access anything in your scope (“subject”) through its axis.  Most commonly you attach a face to a value (like a gate), but you don't have to.  At any point, to refer to the previous statement, you can invoke the head of the tree, `-`; to wit,

```hoon
> =/  a  5
  -
a=5
```

The name `a` is also attached to the value and can be used to identify the value.  (To the Hoon parser there is no real difference; this is a programmer quality-of-life affordance.)

```hoon
> =/  a  5
  a
5
```

Thus faces (names) are attached to gates (functions) within a particular scope or context, such as a `|%` core.  Each core defines a collection of values and gates (collectively termed “arms”) which occupy a shared scope.  For example, the following library demonstrates a few floating-point operations in Hoon.  Each function can see the parent subject (including `hoon.hoon` and some other cores) as well as its neighboring arms (such as `++pow-n` called by `++exp`).

```hoon
|%
::  Factorial, x!
++  factorial
  |=  x=@rs
  =/  t=@rs  .1
  |-  ^-  @rs
  ?:  =(x .1)  t
  $(x (sub:rs x .1), t (mul:rs t x))
::  Absolute value, |x|
++  absolute
  |=  x=@rs
  ?:  (gth:rs x .0)  x
  (sub:rs .0 x)
::  Exponential function, exp(x)
++  exp
  |=  x=@rs
  =/  rtol  .1e-5
  =/  p   .1
  =/  po  .-1
  =/  i   .1
  |-  ^-  @rs
  ?:  (lth:rs (absolute (sub:rs po p)) rtol)  p
  $(i (add:rs i .1), p (add:rs p (div:rs (pow-n x i) (factorial i))), po p)
::  Power, restricted to integeres only, x**n
++  pow-n
  |=  [x=@rs n=@rs]
  ?:  =(n .0)  .1
  =/  p  x
  |-  ^-  @rs
  ?:  (lth:rs n .2)  p
  $(n (sub:rs n .1), p (mul:rs p x))
--
```

Ultimately, however, the faces resolve back to an axis and the code is composed by the compiler into a Hoon syntax tree and thence to Nock for the runtime interpreter.

The nature of cores derives from Nock and is key to understanding how Hoon works.  All nontrivial structures in Hoon are cores.  For instance, even a gate is a regular `|%` core, with `|=` expanding to `|%`.  The following code snippets are identical to the Hoon compiler after parsing.

```hoon
::  increment a number by two
|=  p=@ud
+(+(p))
```

```hoon
::  increment a number by two
=+  ^~(*p=@ud)
|%
++  $
  +(+(p))
--
```

Although Lisp's `'` quoting has no direct equivalent in Hoon, there are a couple of structures that can provide a similar effect.  The most important of these is the `|.` trap, which defines an expression to be evaluated at a later time—Hoon’s equivalent of Lisp’s thunk.  For instance, traps are used when testing code that _should_ fail, as the expression can be defined and deferred until the test framework is ready to process it.

```hoon
> =foo |.((add 1 41))

> -:foo
[8 [9 36 0 2.047] 9 2 10 [6 [7 [0 3] 1 1] 7 [0 3] 1 41] 0 2]

> (foo)
42
```

(To understand the second entry, recall that code is the in head of the core—here, we see the Nock code for the operation defined in the `|.` trap.)

[Wet gates](https://developers.urbit.org/guides/core/hoon-school/R-metals) present the most macro-like feature in Hoon.  A regular function, or “dry gate” (as above), receives an argument (the sample); the type system tries to cast the sample to the type specified by the gate, and fails if not possible.  Wet gates instead defer type evaluation and instead attempt to use the sample (or arguments) directly in the expression.  This produces a parametric polymorphism.  (This comes close to dynamic typing, but type is still checked at compile time.)  Wet gates are commonly used as gate-building gates, such as mold-producing gates like `++list`.

Consider a function like `++turn` which transforms each element of a list.

```hoon
> `tape`(turn ~[77 97 114 115] @t)
"Mars"
```

To use `++turn`, we need a list and a transformation function.  The type of the list we produce depends on the type of the list and the type of the transformation function. The actual gate `++turn` should work to transform each element of the list for on any function and any list, so long as the function's argument is the list item.

Wet gates are therefore used when incoming type information is not well known and needs to be preserved. This includes parsing, building, and structuring arbitrary nouns. (Beyond Lisp analogues, you can think of C++'s templates and operator overloading, and Haskell's typeclasses.)

This example compares the Lisp deferred factorial thunk with an equivalent Hoon trap.  (Hoon includes `++factorial` since it is not part of the standard library.)

```scheme
(defun create-thunk (function &rest arguments)
  (lambda () (apply function arguments)))

(defun invoke-thunk (thunk)
  (funcall thunk))

;; Creating a thunk that calculates the factorial of a number
(defvar factorial-thunk (create-thunk #'(lambda () (factorial 5))))

;; Invoking the thunk to get the result
(print (invoke-thunk factorial-thunk))  ; Output: 120
```

```hoon
=>
|%
++  factorial
  |=  n=@ud
  |-
  ?:  =(n 1)  1
  %+  mul  n
  %=  $
    n  (dec n)
  ==
++  factorial-5
  |.  (factorial 5)
--
(factorial-5)
```

### Subject-Oriented Programming

Urbit programming employs a paradigm deriving from the nature of Nock (_a fortiori_ Hoon), subject-oriented programming.  Every expression of Hoon is evaluated relative to its subject, a piece of data that represents the environment, or the context, of an expression.

The subject refers to the parent binary tree of an expression, more or less, and serves as state, lexical scope, environment, and function argument.  (We can be precise about the definition in all cases—e.g. the subject of a gate in a core is the core itself—but don't need to for this essay.)  Lisp supports variable scope and global variables, such that any part of the program can access a particular binding.  Hoon's subject-oriented programming model naturally provides its equivalent of scope:  all code is evaluated against a subject and name bindings proceed by depth-first match (with permitted skips to prevent unwanted masking).

> Subject orientation in Nock and Hoon stems partly from minimalism (there's just one subject, which serves as state, lexical scope, environment, and function argument), partly from a desire to simplify compilation (the type of the subject is a full specification of the compile-time environment for a source file), and partly in order to give the language a more imperative feel.
>
> Everything about a scope, including name bindings, aliases, and docstrings, is stored in the subject's type. This allows Hoon's compilation discipline to be similarly minimal: the compiler is a function from subject type and Hoon source to product type and compiled Nock. Running this Nock against a value of the subject type produces a vase of the result. It's hard to imagine a more streamlined formalism for compilation.  (Ted Blackman ~rovnys-ricfer, [“Why Hoon”](https://urbit.org/blog/why-hoon))

The subject is typically the core in which an expression is evaluated, but can be more narrowly defined; consider, for instance, our example from above:

```hoon
=>  [a=1 b=2 c=3]
::
b
```

A slightly different program fails:

```hoon
=>  [a=1 b=2 c=3]
::
(add a b)
```

because the `++add` gate is not defined in the subject against which the expression is evaluated, the first statement.

### Comparative Examples

#### Find in List

```scheme
(define index-of
  (lambda (needle haystack)
	(let ((tail (member needle haystack)))
  	(if tail
      	(- (length haystack) (length tail))
      	(throw 'needle-missing)))))
```

```hoon
::  Produces the index of the first occurrence of nedl in hstk
::  as the unit of an atom.
++  find
  |=  [nedl=(list) hstk=(list)]
  =|  i=@ud
  |-   ^-  (unit @ud)
  =+  [n=nedl h=hstk]
  |-
  ?:  |(?=(~ n) ?=(~ h))
 	~
  ?:  =(i.n i.h)
	?~  t.n
  	`i
	$(n t.n, h t.h)
  ^$(i +(i), hstk +.hstk)
```

#### Filter a List

```scheme
(define filter
  (lambda (fn lst)
	(let iter ((lst lst) (result '()))
  	(if (null? lst)
     	(reverse result)
     	(let ((item (car lst))
           	(rest (cdr lst)))
       	(if (fn item)
           	(iter rest (cons item result))
           	(iter rest result)))))))
```

```hoon
::  Cycle through the members of a list a, passing them to a gate b
::  and produce a list of all of the members that produce TRUE.
++  skim
  |*  [a=(list) b=$-(* ?)]
  |-
  ^+  a
  ?~  a  ~
  ?:((b i.a) [i.a $(a t.a)] $(a t.a))
```

- Several examples in the above section were drawn from [UW's CSE 341 course notes](https://courses.cs.washington.edu/courses/cse341/03wi/scheme/basics.html) and from [Rosetta Code](https://rosettacode.org/).


##  Metaprogramming

A Lisp program is really a list, or a list of lists (nested as much as necessary).  While this can be interpreted as an $n$-ary tree, tree structure is not the preferred structural metaphor.  A Hoon program is a noun, or equivalently a binary tree.  Every component of it is directly addressable and thus in principle reflective.  Both languages are homoiconic, with code and data representations being the same.  What are the consequences of homoiconicity?

### Metaprogramming in Lisp

Metaprogramming is the practice of writing code that manipulates other code at either compile-time or runtime.  In Lisp, metaprogramming is a core feature of the language, and it allows developers to create programs that are incredibly powerful and flexible.  Lisp's metaprogramming capabilities are primarily built on two features:  macros and syntax manipulation.

Macros in Lisp are a way to define new language constructs that are more expressive and more powerful than those provided by the language itself.  When a Lisp program is compiled or interpreted, macros are expanded into regular Lisp code, allowing the macro to generate new code based on its input arguments.  Since Lisp code is represented as data, it can be manipulated using the same functions and operators used to manipulate other data structures.

For instance, Lisp macros could allow you flexibility in expressing a common operation.  Imagine you're working on a project that requires a lot of complex math calculations. Rather than writing out each calculation manually, you could define a macro that takes an expression in infix notation (e.g. `2 + 3 * 4`), and transforms it into a Lisp expression that can be evaluated directly.  Thus you could compose math expressions in a more human-natural way without having to worry about details of Lisp syntax.

Lisp can also manipulate its own syntax.  This is sometimes done through the use of reader macros, which operate at the level of the Lisp reader, which is responsible for converting textual input into Lisp expressions.  Reader macros can be used to extend the syntax of Lisp, allowing developers to define new conventions or domain-specific languages for specific types of data or operations.  Beyond reader macros, Lisp can permit the developer to change the parser (and as long as the result is a Lisp expression, the interpreter or compiler will be fine with this).  Top-level functions can be replaced or modified (“advised”).  Symbol macros can change source code.

Lisp's `'` quote and the `eval` statement allow single expressions to be inhibited or evaluated at will, which is incredibly useful when dealing with symbols that may not be defined yet or in the composition of macros.

In addition to macros and syntax manipulation, Lisp dialects typically provide a number of other features that make metaprogramming easier, such as the ability to inspect and modify the runtime environment, and the ability to create or redefine functions and classes at runtime.

### Metaprogramming in Hoon

While Hoon explicitly avoids macros and domain-specific language specializations, there are many aspects of Hoon which allow or exploit code reflection and manipulation.

In practice, Hoon is intended as a systems programming language for the Urbit Nock VM.  Hoon's metaprogramming has as a consequence mainly focused on aspects of core manipulation (such as code building and wet gates) and on live code upgrades (what I'll call hot-swapping code).  Hoon eschews macros and in particular has a philosophical stance against domain-specific languages (DSLs).  (There are some exceptions, notably Sail, Hoon's XML/HTML syntax; and JSON reparsing.)

Hoon has the ability to parse arbitrary text strings (typically files) into executable ASTs and Nock.  Symbols can be directly converted to and from regular text strings.

As the programming language for a “hundred-year computer”, Hoon needs the ability to hot-swap code at runtime.  Elements of cores can be removed or replaced.  (Really, Hoon code is immutable:  the system is actually making a copy with a specified change.)  Every app and even the OS itself can define a state transition function and upgrade along a deterministic pathway.

Hoon is in principle extremely reflective as it simply compiles to a Nock noun.  Since everything is a stationary tree, it is straightforward to manipulate any object.  There are no magic binary blobs or opaque data types:  if you have a file handle or an Ethereum block or a websocket connection object, it is a tree and you can work with it directly.  (Cf. [“Why Hoon”](https://urbit.org/blog/why-hoon).)  Obtaining—or changing—details about gate sample or core behavior becomes a routine part of the Hoon developer’s toolkit.  Given such regularity, it would be desirable to expose further capabilities of code reflection and introspection explicitly for the interpreter and IDE.

One of the most common design patterns in Hoon is that of the higher-order function, or what Hoon calls “gate-building gates”.  These are gates (functions) that produce gates (functions).  For instance, as Hoon is statically typed a list must have an associated element type at compile time.  `++list` is a gate builder that produces a type gate, which can then be applied to the actual values:

```hoon
list                     	:: gate builder
(list cord)              	:: gate for list of cords (strings)
`(list cord)`~['a' 'b' 'c']  :: list type applied to value
```

Hoon represents a “hyperlambda” with respect to anonymous function creation:  one very often defines gates at their point of use, particularly when operating on each member of a list or set.  Similar to Lisp's frequent use of `lambda`, the one-time-use function is available at the point of call as an anonymous gate.  (More generally, every gate is anonymous and we have to attach a name to it as a search path, but that's a bit out of scope here.)

```scheme
((lambda (x1 x2)
     	(* (- x1 x2) (- x1 x2)))
 2 -5)
```

```hoon
%-  |=  [x1=@ x2=@]
	(pro:si (dif:si x1 x2) (dif:si x1 x2))
[--2 -5]
```

Like Lisp, Hoon yields a lot of power to the user–developer.  One could implement a fairly regular Lisp on top of Hoon with very few changes—and perhaps even implement a pure-Hoon discipline yielding a statically-typed Lisp à la TypeScript from JavaScript.

- [~tacryt-socryp, “Hick, a more traditional Lisp than Hoon”](https://gist.github.com/tacryt-socryp/b08dc66b7bcc760e914c4db5c9fd7ba7)


##  Philosophy

Hoon's focus on atoms, static typing, and symbolic expressions make it a highly expressive and efficient language for building applications on the Urbit platform, while Lisp's flexible syntax and macro system make it a popular choice for a wide range of programming tasks.

Lisp has evolved greatly since John McCarthy's founding.  Like Unix, a complicated family tree has finally settled down into a few strong contenders:  Scheme, Common Lisp, Clojure, Racket.

Lisp has tended to be fractious:  as many have noted, and [Mark Tarver eloquently expressed](http://web.archive.org/web/20080803193859/http://www.lambdassociates.org/blog/bipolar.htm), the Lisp platform appeals to idiosyncratic visions for completist platforms.  There's a looseness in the community's coherence as a result.

For a few reasons, the Urbit community has managed to avoid such splintering (the [Urbit Classic joke](http://urbit-classic.org/) aside).  With a single sponsoring organization, first Tlon Corporation and since 2022 the Urbit Foundation, to steward the ecosystem and a philosophical commitment to protocol-as-platform, Urbit should avoid partition into competing bazaars.

Urbit's governing philosophy as a technical program is laid out in the [Precepts](https://urbit.org/blog/precepts).  A sampling:

> A.13. If you don't completely understand your code and the semantics of all the code it depends on, your code is wrong.

> A.16. Explicit state is better than implicit state.

> A.20. One hundred lines of simplicity is better than twenty lines of complexity.

> D.3. Not being qualified to solve a problem is no reason not to solve it.

There is significant overlap here with the ideals of the Lisp developer community present.  Scheme like Hoon aims at minimalism and ample use of lambda expressions.  [Clojure](https://www.clojure.org/about/rationale) aims at strengthening Lisp by building it on a modern platform (the JVM); it would agree with Urbit's disdain for nondeterminism:  “pervasive, unmoderated mutation simply has to go”.  Racket was designed for production systems and to some extent with a hope to unify parts of the developer stack.

In many ways, Hoon is more Lisp-y than Lisp:  that is, it represents a point more polar towards the telos of Lisp than any extant Lisp.  By shedding the skin of lists and focusing on binary trees, Urbit achieves a deeper conceptual unification within itself.	Hoon doesn't properly supersede Lisp—it requires running on a particular VM architecture, for instance—but Hoon's focus on typing, the nature of Hoon's binary-tree homoiconicity, and its employment of pure functional concepts make it a strong new tool for those to whom Lisp already appeals.

Hoon goes farther than Lisp, however.  Hoon is an accessible and practical, if unconventional, tool for simplifying the developer stack, ultimately to a single language.  Ultimately, Urbit is a technical project to encode human digital freedom into the very protocol we use—with Hoon its nose-to-tail _lingua franca_.  Hoon carries the torch that Lisp kindled into a new user-oriented future.

To close, I quote Urbit Foundation CTO Ted Blackman on why Urbit follows its particular design discipline:

> The promise of Urbit lies in its reimagination of the digital world using components that are as constrained and limited as possible. By adhering firmly to principle and doubling down on minimalism at every turn, we get an OS that provides far stronger guarantees than Unix with a thousand times less code. Given the complexity of modern software, this is what's required to put personal computing back into the hands of people.  (Ted Blackman ~rovnys-ricfer, [“Why Hoon”](https://urbit.org/blog/why-hoon))
