+++

title = "Treesitter Hoon Parser"
date = "2023-05-11"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Core Dev"]

[extra]
image = ""
description = "Create a better hoon parser with Treesitter"
reward = "2 Stars"
assignee = ["~hosweg-silpur"]
champion = ["~poldec-tonteg"]
grant_id = "P0263"
completed = true
canceled = false

+++

# Summary

Tree-sitter is a fast parser that supports smarter syntax highlighting that makes use of the syntax tree.

# Background

Current syntax-highlighters are based off complicated regex that are overly complicated and inaccurate. Tree-sitter parses the whole document and creates an abstract syntax tree (AST) which can then be used to correctly highlight syntax.

The current syntax highlighters available for hoon are:

- **Hoon-lsp**: Decent, but due to being a semantic highlighter it naively highlights using regex matches. As an example it does not know the difference between `!=(a)` and `!=(a 1)`. (The first is the `zaptis` rune taking `a` as a sample, the second is `!` applied to an equality check between `a` and `1`)

- **Hoon.vim/hoon-mode.el**(emacs package): This is also a regex matcher and suffers from the same problems above.

In conclusion, creating a tree-sitter parser will allow for superior Hoon highlighting to be used in more code-editors.


# Milestones and Compensation 
## Milestone 1: Writing the grammar

**Estimated Completion**: Completed

**Payment**: 1 star

 - Write a tree-sitter grammar that parses Hoon
 - Create unit tests for each syntax component (runes, irregular syntax, mold, strings...)


## Milestone 2: Code editor Integration

**Estimated Completion**: May 2023

**Payment**: 1 star

Integrate the tree-sitter parser with various code-editors.

Desktop editors:
 - VScode
 - Emacs
 - Neovim
 - Atom
Online editors:
 - Monaco
 - Codemirror

# Future Work

- GitHub Gist alternative on Urbit
- Online IDE with `%pyro` sandbox
- Collaborative Hoon code-editing with CRDTs
