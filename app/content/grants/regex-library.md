+++
title = "Regular Expressions Library" 
date = "2022-06-13"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Core" ]

[extra]
image = ""
description = "Implement a regular expressions library in Hoon"
reward = "3 stars"
mentor = ["~lagrev-nocfep"]
assignee = ["~macrep-racdec"]
grant_id = "B0149"
completed = true
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0177&prefill_Grant+Name=Regular%20Expressions%20Library"
+++

# Regular Expression Library

## Overview

Regular expressions provide a formal way of matching and validating text structure using a powerful, well-established syntax.

While the Hoon standard library provides powerful parsing primitives, these are strongly geared towards parsing Hoon itself. Many developers expect text parsing to be “as simple as” constructing a regular expression and using it to ingest or parse a single token from a given string, or to validate the structure of a string.

## Project Requirements

We would like a library which supports a variety of regular expression operations; at minimum:

1. String search (single matching and multiple matching)
2. String parsing and tokenization
3. Validation of a string
4. Crash on failure-to-parse
5. Parse all and mark invalid segments

The library should be built on top of the Hoon parser primitives as much as is feasible, but some rules will likely need to be introduced or perhaps recomposed.

Regular expression (hereafter “regex”) rules vary slightly across implementations; here we will hew to the POSIX-standard Extended Regular Expression (ERE) syntax (GNU `grep -E`). In case of insufficient specification below, check ERE first.

Supported metacharacters should include:

| Metacharacter | Description                                                           |
| :-----------: | :-------------------------------------------------------------------- |
|      `^`      | Match starting position in string (line).                             |
|      `.`      | Match any single character.                                           |
|     `[ ]`     | Match a single character within the brackets.                         |
|    `[^ ]`     | Match a single character not within the brackets.                     |
|      `$`      | Match ending position in string (line).                               |
|     `( )`     | Group series to single element.                                       |
|     `\n`      | Match *n*th marked subexpression matched.                             |
|      `*`      | Match the preceding element zero or more times.                       |
|    `{m,n}`    | Match the preceding element at least _m_ and not more than _n_ times. |
|      `?`      | Match the preceding element zero or one time.                         |
|      `+`      | Match the preceding element one or more times.                        |
|      `\|`     | Allow choice in matching expressions before or after the operator.    |

Supported character classes should include:

- `[:ascii:]` corresponds to `0x0-0x7f`.
- `[:alnum:]` corresponds to `A-Za-z0-9`.
- `[:alpha:]` corresponds to `A-Za-z`.
- `[:blank:]` corresponds to space ` ` and tab `\t`.
- `[:cntrl:]` corresponds to `0x0-0x1f0x7f`.
- `[:digit:]` corresponds to `0-9`.
- `[:graph:]` corresponds to visible characters.
- `[:lower:]` corresponds to `a-z`.
- `[:print:]` corresponds to visible characters plus space ` `.
- `[:punct:]` corresponds to `[]!"#$%&'()*+,./:;<=>?@\^_{|}~-]` (including \` tic).
- `[:space:]` corresponds to whitespace characters ` \t\r\n\v\f`.
- `[:upper:]` corresponds to `A-Z`.
- `[:xdigit:]` corresponds to hexadecimal digits `A-Fa-f0-9`.

Perl-style character classes should include:

- `\w` represents alphanumeric characters plus `_` cab.
- `\W` represents non-word characters.
- `\b` represents word boundaries.
- `\B` represents non-word boundaries.
- `\d` represents digits, `[:digit:]`.
- `\D` represents non-digits.
- `\s` represents whitespace characters, `[:space:]`.
- `\S` represents non-whitespace characters.

A meta-character sequence such as the Oracle `(?i)` should support ignoring case. The `(?!...)...` meta-characters should match the say that if the first pattern is not present, then accept the second pattern.

You may implement according to any of the common algorithms: DFA, NFA, or backtracking. Backtracking is preferred since it will better facilitate backreferences and other regex features.

A Hoonish way to handle a regular expression would be to ingest a string, convert it to a tagged AST, and then allow that to be exported as text as appropriate. You have some flexibility in determining what the internal representation should look like; the JSON representation is a sound basis.

The completed library will also include a full test suite for verifying library tool behavior. (We strongly encourage a test-driven development pattern which encourages you to compose such a test suite _first_.)

## Future Work

Possible extensions which may result from this work include:

1. Perl-Compatible Regular Expressions, as both powerful direct library implementation and using PCRE as the basis for jetting regular expressions.
2. Unicode support, which is nonstandard but has good exemplars in some other language standard libraries.
3. Jetting the regex library, which will require integration into the Hoon standard library as this affects the runtime binary.

## Worker Requirements

- At least two years’ experience programming, including prior experience using regular expressions.
- Experience with Hoon development, such as finishing Hoon School in any format.

Candidates that demonstrate the desire and ability to continue working on this project (see [Future Work](https://urbit.org/grants/regex#future-work)) will be given priority.

## Timeline

If completed within two months of acceptance, the reward is three stars.

If completed within four months of acceptance, the reward is two stars.
