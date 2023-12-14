+++

title = "Hoon based Markdown Library"
date = "2022-05-10"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Other"]

[extra]
image = ""
description = "CommonMark-based Library for Hoon Markdown"
reward = "3 stars"
assignee = ["~tirrel"]
champion = ["~tacryt-socryp"]
grant_id = "P0141"
completed = false
canceled = false
link = ""

+++

Rationale
Urbit has had a long confused history with markdown. It had a commonmark parser in the past, which was scrapped because it was jetted in a way that did not match the hoon code. The hoon compiler itself has an alternate reality version of markdown that implements some but not all markdown features, and has alternate syntaxes for some of the features. Landscape uses markdown in JS but adds its own custom features on top, and is invoked in a way that splits text input into different graph-store content types and then stiches them together for the final rendering.

Markdown has the status of a basic utility, and so it should just exist as a hoon library in the Urbit ecosystem. Since it is pulled in many directions by different goals to implement different variations, it should be written in way thats extensible.

Implementation
We plan to steal the approach used by [mdast](https://github.com/syntax-tree/mdast) of having a standard core AST that can be extended. We will write the mdast AST as a hoon type, write parsers for it `$-(@t mdast)`, and then write renderers for it `$-(mdast manx)`. It should be possible to reuse much of the hoon-variant markdown parser.

Commonmark will be the default standard targeted, but as a stretch goal we also plan to implement the extensions that Landscape uses, since we have use of the same facilities that Landscape provides. Extensions to the AST and renderer can be written in a fairly straightfoward way by writing new parsers and ASTs that wrap the basic ones:
```
    +$  landscape-md-ast
    $%  mdast
    [%mention @p]
    [%urbit-link @t]
    ==
    ::
    ++  landscape-md-renderer
    |=  ast=landscape-md-ast
    ^-  manx
    ?+  -.ast  (mdast-renderer ast)
    %mention     !!
    %urbit-link  !!
    ==
```
Writing extensions to the parser will be a little bit trickier, and I haven't settled on an approach yet, but I'm leaning toward a system that has a list of parsers that are tried in order, which can then be modified to insert custom parsers.

Testing is relatively easy to do in a comprehensive way, since the commonmark people have created a test suite of over 600 unit tests that can be output as json and straightforwardly read into a test harness that we will write https://github.com/commonmark/commonmark-spec

Milestones and Compensation
June 2022 - 3 stars - completion of comprehensive testing against commonmark spec and publication of library, parsers, and renderers.
