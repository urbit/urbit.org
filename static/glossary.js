var glossary = [
  // runes
  {
    "name": "dot",
    "symbol": ".",
    "usage": "Nock",
    "link": "/docs/reference/hoon-expressions/rune/dot/",
    "desc": "Runes used for carrying out Nock operations in Hoon."
  },
  {
    "name": "dotket",
    "symbol": ".^",
    "usage": "Nock",
    "link": "/docs/reference/hoon-expressions/rune/dot/#dotket",
    "desc": "<code>[%dtkt p=spec q=hoon]</code>: load from the Arvo namespace with a fake Nock instruction: 'Nock <code>12</code>''."
  },
  {
    "name": "dotlus",
    "symbol": ".+",
    "usage": "Nock",
    "link": "/docs/reference/hoon-expressions/rune/dot/#dotlus",
    "desc": "<code>[%dtls p=hoon]</code>: increment an atom with Nock <code>4</code>."
  },
  {
    "name": "dottar",
    "symbol": ".*",
    "usage": "Nock",
    "link": "/docs/reference/hoon-expressions/rune/dot/#dottar",
    "desc": "<code>[%dttr p=hoon q=hoon]</code>: evaluate with Nock <code>2</code>."
  },
  {
    "name": "dottis",
    "symbol": ".=",
    "usage": "Nock",
    "link": "/docs/reference/hoon-expressions/rune/dot/#dottis",
    "desc": "<code>[%dtts p=hoon q=hoon]</code>: test for equality with Nock <code>5</code>."
  },
  {
    "name": "dotwut",
    "symbol": ".?",
    "usage": "Nock",
    "link": "/docs/reference/hoon-expressions/rune/dot/#dotwut",
    "desc": "<code>[%dtwt p=hoon]</code>: test for cell or atom with Nock <code>3</code>."
  },
  {
    "name": "zap",
    "symbol": "!",
    "usage": "wild",
    "link": "/docs/reference/hoon-expressions/rune/zap/",
    "desc": "Wildcard category. Expressions that don't fit anywhere else go here."
  },
  {
    "name": "zapgar",
    "symbol": "!>",
    "usage": "wild",
    "link": "/docs/reference/hoon-expressions/rune/zap/#zapgar",
    "desc": "<code>[%zpgr p=hoon]</code>: wrap a noun in its type."
  },
  {
    "name": "zapgal",
    "symbol": "!<",
    "usage": "wild",
    "link": "/docs/reference/hoon-expressions/rune/zap/#zapgal",
    "desc": "<code>[%zpld p=spec q=hoon]</code>: extracts typed value from a vase."
  },
  {
    "name": "zapcol",
    "symbol": "!:",
    "usage": "wild",
    "link": "/docs/reference/hoon-expressions/rune/zap/#zapcol",
    "desc": "<code>[%dbug p=hoon]</code>: turn on stack trace"
  },
  {
    "name": "zapdot",
    "symbol": "!.",
    "usage": "wild",
    "link": "/docs/reference/hoon-expressions/rune/zap/#zapdot",
    "desc": "Turn off stack trace for a subexpression <code>p</code>"
  },
  {
    "name": "zaptis",
    "symbol": "!=",
    "usage": "wild",
    "link": "/docs/reference/hoon-expressions/rune/zap/#zaptis",
    "desc": "<code>[%zpts p=hoon]</code>: make the Nock formula for a Hoon expression."
  },
  {
    "name": "zapwut",
    "symbol": "!?",
    "usage": "wild",
    "link": "/docs/reference/hoon-expressions/rune/zap/#zapwut",
    "desc": "<code>[%zpwt p=@ q=hoon]</code>: restrict Hoon version."
  },
  {
    "name": "zapzap",
    "symbol": "!!",
    "usage": "wild",
    "link": "/docs/reference/hoon-expressions/rune/zap/#zapzap",
    "desc": "<code>[%zpzp ~]</code>: crash."
  },
  {
    "name": "tis",
    "symbol": "=",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/",
    "desc": "Runes used to modify the subject."
  },
  {
    "name": "tisgar",
    "symbol": "=>",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tisgar",
    "desc": "<code>[%tsgr p=hoon q=hoon]</code>: compose two expressions."
  },
  {
    "name": "tisbar",
    "symbol": "=|",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tisbar",
    "desc": "<code>[%tsbr p=spec q=hoon]</code>: combine a default type value with the subject."
  },
  {
    "name": "tiscol",
    "symbol": "=:",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tiscol",
    "desc": "<code>[%tscl p=(list (pair wing hoon)) q=hoon]</code>: change multiple legs in the subject."
  },
  {
    "name": "tiscom",
    "symbol": "=,",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tiscom",
    "desc": "<code>[%tscm p=hoon q=hoon]</code>: expose namespace"
  },
  {
    "name": "tisdot",
    "symbol": "=.",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tisdot",
    "desc": "<code>[%tsdt p=wing q=hoon r=hoon]</code>: change one leg in the subject."
  },
  {
    "name": "tishep",
    "symbol": "=-",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tishep",
    "desc": "<code>[%tshp p=hoon q=hoon]</code>: combine a new noun with the subject, inverted."
  },
  {
    "name": "tisket",
    "symbol": "=^",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tisket",
    "desc": "<code>[%tskt p=skin q=wing r=hoon s=hoon]</code>: pin the head of a pair; change"
  },
  {
    "name": "tisgal",
    "symbol": "=<",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tisgal",
    "desc": "<code>[%tsgl p=hoon q=hoon]</code>: compose two expressions, inverted."
  },
  {
    "name": "tislus",
    "symbol": "=+",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tislus",
    "desc": "<code>[%tsls p=hoon q=hoon]</code>: combine a new noun with the subject."
  },
  {
    "name": "tismic",
    "symbol": "=;",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tismic",
    "desc": "<code>[%tssm p=skin q=hoon r=hoon]</code>: combine a named noun with the subject, possibly with type annotation; inverted order."
  },
  {
    "name": "tisfas",
    "symbol": "=/",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tisfas",
    "desc": "<code>[%tsfs p=skin q=hoon r=hoon]</code>: combine a named noun with the subject, possibly with type annotation."
  },
  {
    "name": "tissig",
    "symbol": "=~",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tissig",
    "desc": "<code>[%tssg p=(list hoon)]</code>: compose many expressions."
  },
  {
    "name": "tistar",
    "symbol": "=*",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tistar",
    "desc": "<code>[%tstr p=term q=hoon r=hoon]</code>: define an alias."
  },
  {
    "name": "tiswut",
    "symbol": "=?",
    "usage": "Subject Modification",
    "link": "/docs/reference/hoon-expressions/rune/tis/#tiswut",
    "desc": "<code>[$tswt p=wing q=hoon r=hoon s=hoon]</code>: conditionally change one leg in the subject."
  },
  {
    "name": "wut",
    "symbol": "?",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/",
    "desc": "Runes used for branching on conditionals."
  },
  {
    "name": "wutgar",
    "symbol": "?>",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutgar",
    "desc": "<code>[%wtbn p=hoon q=hoon]</code>: positive assertion."
  },
  {
    "name": "wutbar",
    "symbol": "?|",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutbar",
    "desc": "<code>[%wtbr p=(list hoon)]</code>: logical OR."
  },
  {
    "name": "wutcol",
    "symbol": "?:",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutcol",
    "desc": "<code>[%wtcl p=hoon q=hoon r=hoon]</code>: branch on a boolean test."
  },
  {
    "name": "wutdot",
    "symbol": "?.",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutdot",
    "desc": "<code>[%wtdt p=hoon q=hoon r=hoon]</code>: branch on a boolean test, inverted."
  },
  {
    "name": "wuthep",
    "symbol": "?-",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wuthep",
    "desc": "<code>[%wthp p=wing q=(list (pair spec value))]</code>: switch against a union, with no default."
  },
  {
    "name": "wutket",
    "symbol": "?^",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutket",
    "desc": "<code>[%wtkt p=wing q=hoon r=hoon]</code>: branch on whether a wing"
  },
  {
    "name": "wutgal",
    "symbol": "?<",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutgal",
    "desc": "<code>[%wtgl p=hoon q=hoon]</code>: negative assertion."
  },
  {
    "name": "wutlus",
    "symbol": "?+",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutlus",
    "desc": "<code>[%wtls p=wing q=hoon r=(list (pair spec hoon))]</code>: switch against"
  },
  {
    "name": "wutpam",
    "symbol": "?&",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutpam",
    "desc": "<code>[%wtpd p=(list hoon)]</code>: logical AND."
  },
  {
    "name": "wutsig",
    "symbol": "?~",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutsig",
    "desc": "<code>[%wtsg p=wing q=hoon r=hoon]</code>: branch on whether a wing of the subject is null."
  },
  {
    "name": "wuttis",
    "symbol": "?=",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wuttis",
    "desc": "<code>[%wtts p=spec q=wing]</code>: test pattern match."
  },
  {
    "name": "wutpat",
    "symbol": "?@",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutpat",
    "desc": "<code>[%wtpt p=wing q=hoon r=hoon]</code>: branch on whether a wing of the subject is an atom."
  },
  {
    "name": "wutzap",
    "symbol": "?!",
    "usage": "Conditionals",
    "link": "/docs/reference/hoon-expressions/rune/wut/#wutzap",
    "desc": "<code>[%wtzp p=hoon]</code>: logical NOT."
  },
  {
    "name": "bar",
    "symbol": "|",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/",
    "desc": "Runes used to produce cores."
  },
  {
    "name": "barbuc",
    "symbol": "|$",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#barbuc",
    "desc": "Declare a wet gate mold builder."
  },
  {
    "name": "barcab",
    "symbol": "|_",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#barcab",
    "desc": "Produce a **door** (a core with a sample)."
  },
  {
    "name": "barcen",
    "symbol": "|%",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#barcen",
    "desc": "Produce a core, <code>[battery payload]</code>."
  },
  {
    "name": "barcol",
    "symbol": "|:",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#barcol",
    "desc": "Produce a gate with a custom sample."
  },
  {
    "name": "bardot",
    "symbol": "|.",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#bardot",
    "desc": "Produce a trap (a core with one arm <code>$</code>)."
  },
  {
    "name": "barhep",
    "symbol": "|-",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#barhep",
    "desc": "Produce a trap (a core with one arm <code>$</code>) and evaluate it."
  },
  {
    "name": "barket",
    "symbol": "|^",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#barket",
    "desc": "Produce a core whose battery includes a <code>$</code> arm and compute the latter."
  },
  {
    "name": "barsig",
    "symbol": "|~",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#barsig",
    "desc": "Produce an iron gate."
  },
  {
    "name": "bartar",
    "symbol": "|*",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#bartar",
    "desc": "Produce a wet gate (one-armed core with sample)."
  },
  {
    "name": "bartis",
    "symbol": "|=",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#bartis",
    "desc": "Produce a gate (a one-armed core with a sample)."
  },
  {
    "name": "barpat",
    "symbol": "|@",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#barpat",
    "desc": "Produce a 'wet' core <code>[battery payload]</code>."
  },
  {
    "name": "barwut",
    "symbol": "|?",
    "usage": "Cores",
    "link": "/docs/reference/hoon-expressions/rune/bar/#barwut",
    "desc": "Produce a lead trap."
  },
  {
    "name": "lus",
    "symbol": "+",
    "usage": "Arms",
    "link": "/docs/reference/hoon-expressions/rune/lus/",
    "desc": "Runes used to define arms in a core."
  },
  {
    "name": "lusbar",
    "symbol": "+|",
    "usage": "Arms",
    "link": "/docs/reference/hoon-expressions/rune/lus/#lusbar",
    "desc": "Chapter label."
  },
  {
    "name": "lusbuc",
    "symbol": "+$",
    "usage": "Arms",
    "link": "/docs/reference/hoon-expressions/rune/lus/#lusbuc",
    "desc": "Produce a structure arm (type definition)."
  },
  {
    "name": "luslus",
    "symbol": "++",
    "usage": "Arms",
    "link": "/docs/reference/hoon-expressions/rune/lus/#luslus",
    "desc": "Produce a normal arm."
  },
  {
    "name": "lustar",
    "symbol": "+*",
    "usage": "Arms",
    "link": "/docs/reference/hoon-expressions/rune/lus/#lustar",
    "desc": "Produce a type constructor arm."
  },
  {
    "name": "col",
    "symbol": ":",
    "usage": "Cells",
    "link": "/docs/reference/hoon-expressions/rune/col/",
    "desc": "Runes used to produce cells, which are pairs of nouns."
  },
  {
    "name": "colcab",
    "symbol": ":_",
    "usage": "Cells",
    "link": "/docs/reference/hoon-expressions/rune/col/#colcab",
    "desc": "<code>[%clcb p=hoon q=hoon]</code>; construct a cell, inverted."
  },
  {
    "name": "colcol",
    "symbol": "::",
    "usage": "Cells",
    "link": "/docs/reference/hoon-expressions/rune/col/#colcol",
    "desc": "Code comment."
  },
  {
    "name": "colhep",
    "symbol": ":-",
    "usage": "Cells",
    "link": "/docs/reference/hoon-expressions/rune/col/#colhep",
    "desc": "<code>[%clhp p=hoon q=hoon]</code>: construct a cell (2-tuple)."
  },
  {
    "name": "colket",
    "symbol": ":^",
    "usage": "Cells",
    "link": "/docs/reference/hoon-expressions/rune/col/#colket",
    "desc": "<code>[%clkt p=hoon q=hoon r=hoon s=hoon]</code>: construct a quadruple (4-tuple)."
  },
  {
    "name": "collus",
    "symbol": ":+",
    "usage": "Cells",
    "link": "/docs/reference/hoon-expressions/rune/col/#collus",
    "desc": "<code>[%clls p=hoon q=hoon r=hoon]</code>: construct a triple (3-tuple)."
  },
  {
    "name": "colsig",
    "symbol": ":~",
    "usage": "Cells",
    "link": "/docs/reference/hoon-expressions/rune/col/#colsig",
    "desc": "<code>[%clsg p=(list hoon)]</code>: construct a null-terminated list."
  },
  {
    "name": "coltar",
    "symbol": ":*",
    "usage": "Cells",
    "link": "/docs/reference/hoon-expressions/rune/col/#coltar",
    "desc": "<code>[%cltr p=(list hoon)]</code>: construct an n-tuple."
  },
  {
    "name": "cen",
    "symbol": "%",
    "usage": "Calls",
    "link": "/docs/reference/hoon-expressions/rune/cen/",
    "desc": "Runes used for making function calls in Hoon."
  },
  {
    "name": "cencab",
    "symbol": "%_",
    "usage": "Calls",
    "link": "/docs/reference/hoon-expressions/rune/cen/#cencab",
    "desc": "Resolve a wing with changes, preserving type."
  },
  {
    "name": "cencol",
    "symbol": "%:",
    "usage": "Calls",
    "link": "/docs/reference/hoon-expressions/rune/cen/#cencol",
    "desc": "Call a gate with many arguments."
  },
  {
    "name": "cendot",
    "symbol": "%.",
    "usage": "Calls",
    "link": "/docs/reference/hoon-expressions/rune/cen/#cendot",
    "desc": "Call a gate (function), inverted."
  },
  {
    "name": "cenhep",
    "symbol": "%-",
    "usage": "Calls",
    "link": "/docs/reference/hoon-expressions/rune/cen/#cenhep",
    "desc": "Call a gate (function)."
  },
  {
    "name": "cenket",
    "symbol": "%^",
    "usage": "Calls",
    "link": "/docs/reference/hoon-expressions/rune/cen/#cenket",
    "desc": "Call gate with triple sample."
  },
  {
    "name": "cenlus",
    "symbol": "%+",
    "usage": "Calls",
    "link": "/docs/reference/hoon-expressions/rune/cen/#cenlus",
    "desc": "Call gate with a cell sample."
  },
  {
    "name": "censig",
    "symbol": "%~",
    "usage": "Calls",
    "link": "/docs/reference/hoon-expressions/rune/cen/#censig",
    "desc": "Evaluate an arm in a door."
  },
  {
    "name": "centar",
    "symbol": "%*",
    "usage": "Calls",
    "link": "/docs/reference/hoon-expressions/rune/cen/#centar",
    "desc": "Evaluate an expression, then resolve a wing with changes."
  },
  {
    "name": "centis",
    "symbol": "%=",
    "usage": "Calls",
    "link": "/docs/reference/hoon-expressions/rune/cen/#centis",
    "desc": "Resolve a wing with changes."
  },
  {
    "name": "ket",
    "symbol": "^",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/",
    "desc": "Runes that let us adjust types without violating type constraints."
  },
  {
    "name": "ketbar",
    "symbol": "^|",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/#ketbar",
    "desc": "<code>[%ktbr p=hoon]</code>: convert a gold core to an iron core (contravariant)."
  },
  {
    "name": "ketcol",
    "symbol": "^:",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/#ketcol",
    "desc": "<code>[%ktcl p=spec]</code>: 'factory' gate for type <code>p</code>."
  },
  {
    "name": "ketdot",
    "symbol": "^.",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/#ketdot",
    "desc": "<code>[%ktdt p=hoon q=hoon]</code>: typecast on value produced by passing <code>q</code> to <code>p</code>."
  },
  {
    "name": "kethep",
    "symbol": "^-",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/#kethep",
    "desc": "<code>[%kthp p=spec q=hoon]</code>: typecast by explicit type label."
  },
  {
    "name": "ketlus",
    "symbol": "^+",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/#ketlus",
    "desc": "<code>[%ktls p=hoon q=hoon]</code>: typecast by inferred type."
  },
  {
    "name": "ketpam",
    "symbol": "^&",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/#ketpam",
    "desc": "<code>[%ktpd p=hoon]</code>: convert a core to a zinc core (covariant)."
  },
  {
    "name": "ketsig",
    "symbol": "^~",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/#ketsig",
    "desc": "<code>[%ktsg p=hoon]</code>: fold constant at compile time."
  },
  {
    "name": "kettar",
    "symbol": "^*",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/#kettar",
    "desc": "<code>[%kttr p=spec]</code>: Produce example type value."
  },
  {
    "name": "kettis",
    "symbol": "^=",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/#kettis",
    "desc": "<code>[%ktts p=skin q=hoon]</code>: Bind name to a value."
  },
  {
    "name": "ketwut",
    "symbol": "^?",
    "usage": "Casts",
    "link": "/docs/reference/hoon-expressions/rune/ket/#ketwut",
    "desc": "<code>[%ktwt p=hoon]</code>: convert any core to a lead core (bivariant)."
  },
  {
    "name": "buc",
    "symbol": "$",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/",
    "desc": "Runes used for defining custom types."
  },
  {
    "name": "buccab",
    "symbol": "$_",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#buccab",
    "desc": "<code>[%bscb p=hoon]</code>: structure that normalizes to an example."
  },
  {
    "name": "buccen",
    "symbol": "$%",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#buccen",
    "desc": "<code>[%bscn p=(list spec)]</code>: structure which recognizes a union tagged by head atom."
  },
  {
    "name": "buccol",
    "symbol": "$:",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#buccol",
    "desc": "<code>[%bscl p=(list spec)]</code>: form a cell type."
  },
  {
    "name": "bucgal",
    "symbol": "$<",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#bucgal",
    "desc": "<code>[%bsld p=spec q=spec]</code>: restrict a mold by excluding some given mold."
  },
  {
    "name": "bucgar",
    "symbol": "$>",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#bucgar",
    "desc": "<code>[%bshp p=spec q=spec]</code>: filter a mold to obtain a new mold."
  },
  {
    "name": "buchep",
    "symbol": "$-",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#buchep",
    "desc": "<code>[%bshp p=spec q=spec]</code>: structure that normalizes to an example gate."
  },
  {
    "name": "bucket",
    "symbol": "$^",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#bucket",
    "desc": "<code>[%bskt p=spec q=spec]</code>: structure which normalizes a union tagged by head depth (cell)."
  },
  {
    "name": "bucsig",
    "symbol": "$~",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#bucsig",
    "desc": "<code>[%bssg p=hoon q=spec]</code>: define a custom type default value"
  },
  {
    "name": "bucpam",
    "symbol": "$&",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#bucpam",
    "desc": "<code>[%bspd p=spec q=hoon]</code>: repair a value of a tagged union type"
  },
  {
    "name": "bucpat",
    "symbol": "$@",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#bucpat",
    "desc": "<code>[%bsvt p=spec q=spec]</code>: structure which normalizes a union tagged by head depth (atom)."
  },
  {
    "name": "buctis",
    "symbol": "$=",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#buctis",
    "desc": "<code>[%bsts p=skin q=spec]</code>: structure which wraps a face around another structure."
  },
  {
    "name": "bucwut",
    "symbol": "$?",
    "usage": "Structures",
    "link": "/docs/reference/hoon-expressions/rune/buc/#bucwut",
    "desc": "<code>[%bswt p=(list spec)]</code>: form a type from a union of other types."
  },
  {
    "name": "mic",
    "symbol": ";",
    "usage": "Make",
    "link": "/docs/reference/hoon-expressions/rune/mic/",
    "desc": "Miscellaneous useful macros."
  },
  {
    "name": "miccol",
    "symbol": ";:",
    "usage": "Make",
    "link": "/docs/reference/hoon-expressions/rune/mic/#miccol",
    "desc": "<code>[%mccl p=hoon q=(list hoon)]</code>: call a binary function as an n-ary function."
  },
  {
    "name": "miclus",
    "symbol": ";+",
    "usage": "Make",
    "link": "/docs/reference/hoon-expressions/rune/mic/#miclus",
    "desc": "make a single XML node (Sail)"
  },
  {
    "name": "micmic",
    "symbol": ";;",
    "usage": "Make",
    "link": "/docs/reference/hoon-expressions/rune/mic/#micmic",
    "desc": "<code>[%mcmc p=spec q=hoon]</code>: normalize with a mold, asserting fixpoint."
  },
  {
    "name": "micfas",
    "symbol": ";/",
    "usage": "Make",
    "link": "/docs/reference/hoon-expressions/rune/mic/#micfas",
    "desc": "<code>[%mcnt p=hoon]</code>: tape as XML element."
  },
  {
    "name": "micsig",
    "symbol": ";~",
    "usage": "Make",
    "link": "/docs/reference/hoon-expressions/rune/mic/#micsig",
    "desc": "<code>[%mcsg p=hoon q=(list hoon)]</code>: glue a pipeline together with a"
  },
  {
    "name": "mictar",
    "symbol": ";*",
    "usage": "Make",
    "link": "/docs/reference/hoon-expressions/rune/mic/#mictar",
    "desc": "Make a list of XML nodes from complex Hoon expression (Sail)."
  },
  {
    "name": "mictis",
    "symbol": ";=",
    "usage": "Make",
    "link": "/docs/reference/hoon-expressions/rune/mic/#mictis",
    "desc": "Make a list of XML nodes (Sail)."
  },
  {
    "name": "sig",
    "symbol": "~",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/",
    "desc": "Runes that use Nock <code>11</code> to pass non-semantic info to the interpreter."
  },
  {
    "name": "siggar",
    "symbol": "~>",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#siggar",
    "desc": "<code>[%sgbn p=$@(term [p=term q=hoon]) q=hoon]</code>: raw hint, applied"
  },
  {
    "name": "sigbar",
    "symbol": "~|",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#sigbar",
    "desc": "<code>[%sgbr p=hoon q=hoon]</code>: tracing printf."
  },
  {
    "name": "sigbuc",
    "symbol": "~$",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#sigbuc",
    "desc": "<code>[%sgbs p=term q=hoon]</code>: profiling hit counter."
  },
  {
    "name": "sigcab",
    "symbol": "~_",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#sigcab",
    "desc": "<code>[%sgcb p=hoon q=hoon]</code>: user-formatted tracing printf."
  },
  {
    "name": "sigcen",
    "symbol": "~%",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#sigcen",
    "desc": "<code>[%sgcn p=term q=wing r=(list [term hoon]) s=hoon]</code>: jet registration."
  },
  {
    "name": "siggal",
    "symbol": "~<",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#siggal",
    "desc": "<code>[%sgld p=$@(term [p=term q=hoon]) q=hoon]</code>: raw hint, applied to product."
  },
  {
    "name": "siglus",
    "symbol": "~+",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#siglus",
    "desc": "<code>[%sgls p=hoon]</code>: cache a computation."
  },
  {
    "name": "sigfas",
    "symbol": "~/",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#sigfas",
    "desc": "<code>[%sgnt p=term q=hoon]</code>: jet registration for gate with"
  },
  {
    "name": "sigpam",
    "symbol": "~&",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#sigpam",
    "desc": "<code>[%sgpd p=hoon q=hoon]</code>: debugging printf."
  },
  {
    "name": "sigtis",
    "symbol": "~=",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#sigtis",
    "desc": "<code>[%sgts p=hoon q=hoon]</code>: detect duplicate."
  },
  {
    "name": "sigwut",
    "symbol": "~?",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#sigwut",
    "desc": "<code>[%sgwt p=hoon q=hoon r=hoon]</code>: conditional debug printf."
  },
  {
    "name": "sigzap",
    "symbol": "~!",
    "usage": "Hints",
    "link": "/docs/reference/hoon-expressions/rune/sig/#sigzap",
    "desc": "<code>[%sgzp p=hoon q=hoon]</code>: print type on compilation fail."
  },
  {
    "name": "terminators",
    "symbol": "--,",
    "usage": "Terminators",
    "link": "/docs/reference/hoon-expressions/rune/terminators/",
    "desc": "Runes used to terminate expressions."
  },
  {
    "name": "hephep",
    "symbol": "--",
    "usage": "Terminators",
    "link": "/docs/reference/hoon-expressions/rune/terminators/#hephep",
    "desc": "The <code>--</code> rune is used to indicate the end of a core expression."
  },
  {
    "name": "tistis",
    "symbol": "==",
    "usage": "Terminators",
    "link": "/docs/reference/hoon-expressions/rune/terminators/#tistis",
    "desc": "The <code>==</code> rune is used to indicate the end of a 'jogging' or 'running' series of Hoon expressions."
  },
  {
    "name": "fas",
    "symbol": "/",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#ford-runes",
    "desc": "Runes specific to Ford, not considered to be Hoon runes."
  },
  {
    "name": "faslus",
    "symbol": "/+",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#faslus",
    "desc": "Ford rune. Import from <code>lib/</code>"
  },
  {
    "name": "fashep",
    "symbol": "/-",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fashep",
    "desc": "Ford rune. Import from <code>sur/</code>"
  },
  {
    "name": "fassig",
    "symbol": "/~",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fassig",
    "desc": "Ford rune. Twig by hand."
  },
  {
    "name": "fasfas",
    "symbol": "//",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fasfas",
    "desc": "Ford rune. Include a file by relative path."
  },
  {
    "name": "fastis",
    "symbol": "/=",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fastis",
    "desc": "Ford rune. Wrap a face around an included horn."
  },
  {
    "name": "fascol",
    "symbol": "/:",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fascol",
    "desc": "Ford rune. Evaluate at path, and <code>/mark/</code> at current path"
  },
  {
    "name": "faszap",
    "symbol": "/!",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#faszap",
    "desc": "Ford rune. <code>/!mark/</code> evaluates as Hoon, then passes through mark."
  },
  {
    "name": "faspam",
    "symbol": "/&",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#faspam",
    "desc": "Ford rune. Pass through a series of marks."
  },
  {
    "name": "fasbar",
    "symbol": "/|",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fasbar",
    "desc": "Ford rune. Short-circuiting 'or' "
  },
  {
    "name": "fascab",
    "symbol": "/_",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fascab",
    "desc": "Ford rune. Runs horns on files in the current directory."
  },
  {
    "name": "fasmic",
    "symbol": "/;",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fasmic",
    "desc": "Ford rune. Operate on."
  },
  {
    "name": "fascom",
    "symbol": "/,",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fascom",
    "desc": "Ford rune. Switch by path."
  },
  {
    "name": "fasdot",
    "symbol": "/.",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fasdot",
    "desc": "Ford rune. Produces a list from a sequence of horns."
  },
  {
    "name": "fasket",
    "symbol": "/^",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fasket",
    "desc": "Ford rune. Casts the result of a horn to a mold."
  },
  {
    "name": "fashax",
    "symbol": "/#",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fashax",
    "desc": "Ford rune. Inserts a dependency hash."
  },
  {
    "name": "fasbuc",
    "symbol": "/$",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fasbuc",
    "desc": "Ford rune. Process extra arguments."
  },
  {
    "name": "fascen",
    "symbol": "/%",
    "usage": "Ford",
    "link": "/docs/tutorials/arvo/ford/#fascen",
    "desc": "Ford rune. Propagate extra arguments into renderers."
  }, 
  // glossary starts here
  {
    "name": "ames",
    "symbol": "",
    "usage": "Arvo",
    "link": "/docs/glossary/ames/",
    "desc": "The name of the Urbit network and the vane that communicates over it."
  },
  {
    "name": "aqua",
    "symbol": "",
    "usage": "Arvo",
    "link": "/docs/glossary/aqua/",
    "desc": "A virtualization tool whose primary purpose is testing and development."
  },
  {
    "name": "arm",
    "symbol": "",
    "usage": "arm",
    "link": "/docs/glossary/arm/",
    "desc": "A Hoon expression encoded as a noun. Part of a core."
  },
  {
    "name": "arvo",
    "symbol": "",
    "usage": "Arvo",
    "link": "/docs/glossary/arvo/",
    "desc": "The Urbit operating system and kernel."
  },
  {
    "name": "atom",
    "symbol": "",
    "usage": "hoon-nock",
    "link": "/docs/glossary/atom/",
    "desc": "The most basic data type in Hoon and Nock, a non-negative integer of any size."
  },
  {
    "name": "azimuth",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/azimuth/",
    "desc": "Urbit's identity layer, built as a suite of smart contracts on the Ethereum blockchain."
  },
  {
    "name": "behn",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/behn/",
    "desc": "Timing vane of Arvo. Allows for applications to schedule events."
  },
  {
    "name": "battery",
    "symbol": "",
    "usage": "battery",
    "link": "/docs/glossary/battery/",
    "desc": "A collection of Hoon expressions stored at the head of a core."
  },
  {
    "name": "bridge",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/bridge/",
    "desc": "A client made for interacting with Azimuth."
  },
  {
    "name": "censure",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/censure/",
    "desc": "Allows stars and galaxies to assign negative reputation information to other points of equal or lower rank."
  },
  {
    "name": "ceremony",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/ceremony/",
    "desc": "The event that transferred custody of Azimuth identities from a centralized ledger to the Ethereum blockchain."
  },
  {
    "name": "chat",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/chat/",
    "desc": "An application that handles communication between ships."
  },
  {
    "name": "claims",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/claims/",
    "desc": "Allows Urbit identities to make publicly visible assertions about their owner."
  },
  {
    "name": "clay",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/clay/",
    "desc": "The filesystem and typed revision-control vane of Arvo."
  },
  {
    "name": "comet",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/comet/",
    "desc": "A type of ship on the Urbit network."
  },
  {
    "name": "core",
    "symbol": "",
    "usage": "core",
    "link": "/docs/glossary/core/",
    "desc": "A cell of battery and payload."
  },
  {
    "name": "delegated sending",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/delegated-sending/",
    "desc": "A method by which a star can distribute planets, assigning them to a delegated planet."
  },
  {
    "name": "desk",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/desk/",
    "desc": "A revision-controlled branch of the Clay filesystem."
  },
  {
    "name": "dill",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/dill/",
    "desc": "The terminal-driver vane of Arvo."
  },
  {
    "name": "document vote",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/docvote/",
    "desc": "A voting action taken by the Galactic Senate over Azimuth."
  },
  {
    "name": "door",
    "symbol": "",
    "usage": "door",
    "link": "/docs/glossary/door/",
    "desc": "A core the payload of which is a cell of sample and context."
  },
  {
    "name": "ecliptic",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/ecliptic/",
    "desc": "A contract that sets the rules for what is and is not possible on Azimuth."
  },
  {
    "name": "event log",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/eventlog/",
    "desc": "A totally ordered list of every single Arvo event a ship has undergone. A ship's state is a pure function of its event log."
  },
  {
    "name": "eyre",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/eyre/",
    "desc": "The web-server vane of Arvo. Handles all HTTP messages."
  },
  {
    "name": "ford",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/ford/",
    "desc": "The build-system vane of Arvo."
  },
  {
    "name": "galaxy",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/galaxy/",
    "desc": "8-bit Urbit addresses, sitting at the top of the identity hierarchy, that vote on network changes and act as infrastructural nodes."
  },
  {
    "name": "gall",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/gall/",
    "desc": "The application-management vane of Arvo. Userspace applications are stopped, started, and sandboxed by Gall."
  },
  {
    "name": "gate",
    "symbol": "",
    "usage": "gate",
    "link": "/docs/glossary/gate/",
    "desc": "A core with one arm named $. The Hoon equivalent of a function."
  },
  {
    "name": "hall",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/hall/",
    "desc": "The former messaging protocol for Arvo, no longer in use."
  },
  {
    "name": "hd wallet",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/hdwallet",
    "desc": "A system of related Ethereum addresses that store and manage an Urbit identity, each a proxy with different permissions over its management."
  },
  {
    "name": "hoon",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/hoon/",
    "desc": "A strict, higher-order typed functional programming language that compiles to Nock."
  },
  {
    "name": "invite tree",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/invitetree/",
    "desc": "The state stored by the delegated sending contract, recording who gave a planet to whom under a specific star."
  },
  {
    "name": "jacque",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/jacque/",
    "desc": "A Nock interpreter written in Java, in active development as a worker process for Vere."
  },
  {
    "name": "keyfile",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/keyfile/",
    "desc": "A piece of information used to associate a ship with an Urbit identity."
  },
  {
    "name": "landscape",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/landscape/",
    "desc": "A front-end user interface for Urbit."
  },
  {
    "name": "mark",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/mark/",
    "desc": "A file type in the Clay filesystem."
  },
  {
    "name": "modulo",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/modulo/",
    "desc": "The name of the home screen interface for Urbit within Landscape."
  },
  {
    "name": "moon",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/moon/",
    "desc": "A kind of ship on the Arvo network, issued by planets."
  },
  {
    "name": "nock",
    "symbol": "",
    "usage": "hoon-nock",
    "link": "/docs/glossary/nock/",
    "desc": "A purely functional typeless programming language, and Urbit's lowest-level language."
  },
  {
    "name": "noun",
    "symbol": "",
    "usage": "hoon-nock",
    "link": "/docs/glossary/noun/",
    "desc": "An atom or a cell. The basic data structure in Nock."
  },
  {
    "name": "OTA",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/ota-updates/",
    "desc": "Ships have the ability to upgrade themselves over the air. They receive updates from a sponsor star or galaxy."
  },
  {
    "name": "payload",
    "symbol": "",
    "usage": "payload",
    "link": "/docs/glossary/payload/",
    "desc": "The set of data needed to run computations in a core."
  },
  {
    "name": "pH",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/ph/",
    "desc": "A Gall app that is a framework for fleet testing using Aqua."
  },
  {
    "name": "pill",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/pill/",
    "desc": "A bootstrap sequence to launch an Urbit ship for the first time."
  },
  {
    "name": "planet",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/planet/",
    "desc": "An Urbit identity at the bottom of the identity hierarchy. Issued by stars."
  },
  {
    "name": "proxies",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/proxies/",
    "desc": "Ethereum addresses in the Urbit HD Wallet that have limited powers."
  },
    
  {
    "name": "replay",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/replay/",
    "desc": "How Vere computes the state of a ship's Arvo instance from an event log."
  },
  {
    "name": "sail",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/sailudon",
    "desc": "A domain specific language for Hoon. Expresses XML data structures to render webpages."
  },
  {
    "name": "trap",
    "symbol": "",
    "usage": "trap",
    "link": "/docs/glossary/trap/",
    "desc": "A core with one arm named $ and no sample."
  },
  {
    "name": "udon",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/sailudon",
    "desc": "A domain specific language for Hoon. Similar to Markdown."
  },
  {
    "name": "senate",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/senate/",
    "desc": "The body of all galaxies that govern Azimuth by majority vote."
  },
  {
    "name": "ship",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/ship/",
    "desc": "An instance of an Urbit computer that is a peer on the network."
  },
  {
    "name": "arvo.network",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/shiparvonetwork/",
    "desc": "A way to connect to a ship via HTTP, using DNS lookup."
  },
  {
    "name": "star",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/star/",
    "desc": "An Urbit identity sitting between stars and galaxies in the identity hierarchy. Infrastructural nodes for child planets."
  },
  {
    "name": "sync",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/sync/",
    "desc": "<code>|sync</code> sets up synchronization between two Clay desks."
  },
  {
    "name": "talk",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/talk/",
    "desc": "Urbit's first user application, sending messages between ships. No longer used, and replaced by Chat."
  },
  {
    "name": "vane",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/vane/",
    "desc": "An Arvo kernel module that performs essential system operations."
  },
  {
    "name": "vere",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/vere/",
    "desc": "The Nock runtime environment and Urbit virtual machine, running on Unix."
  },
  {
    "name": "vote",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/voting/",
    "desc": "Voting is a power available to galaxies in their capacities as members of the Galactic Senate."
  },
  {
    "name": "wallet generator",
    "symbol": "",
    "usage": "azimuth",
    "link": "/docs/glossary/wallet-generator/",
    "desc": "Generates an Urbit HD wallet."
  },
  {
    "name": "iris",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/iris/",
    "desc": "The server-side HTTP vane of Arvo. Its client-facing counterpart is Eyre."
  },
  {
    "name": "jael",
    "symbol": "",
    "usage": "arvo",
    "link": "/docs/glossary/jael/",
    "desc": "Security and encryption vane of Arvo."
  }, //standard library
  {
    "name": "Primitive parser engine",
    "symbol": "ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Absolute value",
    "symbol": "abs:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#abs-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Absolute value (signed integer)",
    "symbol": "abs:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#abs-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Compiler alias",
    "symbol": "abel",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#abel",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse space",
    "symbol": "ace",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#ace",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add",
    "symbol": "add",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#add",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add (floating point)",
    "symbol": "add:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#add-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add (with exact/rounded flag)",
    "symbol": "add:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#add-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Prepend to list",
    "symbol": "add:ja",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2j/#add-ja",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add (double-precision float)",
    "symbol": "add:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#add-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add (half-precision float)",
    "symbol": "add:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#add-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add (single-precision float)",
    "symbol": "add:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#add-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add (quad-precision float)",
    "symbol": "add:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#add-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Top-level atom parser engine",
    "symbol": "ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse alphabetic characters",
    "symbol": "alf",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#alf",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Logical AND (map and wet gate)",
    "symbol": "all:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#all-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Logical AND (set and wet gate)",
    "symbol": "all:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#all-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse alphanumeric characters",
    "symbol": "aln",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#aln",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse alphanumeric characters and -",
    "symbol": "alp",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#alp",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Logical OR (map and wet gate)",
    "symbol": "any:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#any-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Logical OR (set and gate)",
    "symbol": "any:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#any-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Alphabetical order",
    "symbol": "aor",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2f/#aor",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse 0 or rule",
    "symbol": "ape:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#ape-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Check correctness (map)",
    "symbol": "apt:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#apt-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Check correctness (set)",
    "symbol": "apt:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#apt-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "'Type' of atom",
    "symbol": "aura",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#aura",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Nock axis",
    "symbol": "axis",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#axis",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Balance queue",
    "symbol": "bal:to",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2k/#bal-to",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse | (bar)",
    "symbol": "bar",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#bar",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse \\ (bas)",
    "symbol": "bas",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#bas",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Base type",
    "symbol": "base",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#base",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parser modifier (LSB-ordered list as atom of base)",
    "symbol": "bass",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#bass",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parses binary number",
    "symbol": "bay:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#bay-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Boolean",
    "symbol": "bean",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#bean",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Tape builder",
    "symbol": "beer",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#beer",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "XML interpolation cases",
    "symbol": "beet",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#beet",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Conditional composer",
    "symbol": "bend",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4e/#bend",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse hep and lus axis syntax",
    "symbol": "bet",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#bet",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Binary exponent",
    "symbol": "bex",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#bex",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Converts from fn to @r",
    "symbol": "bif:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#bif-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Bifurcate map",
    "symbol": "bif:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#bif-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Bifurcate set",
    "symbol": "bif:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#bif-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unit as argument",
    "symbol": "biff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#biff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Binary to atom",
    "symbol": "bin",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#bin",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Non-unit function to unit, producing unit",
    "symbol": "bind",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#bind",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse IPv6",
    "symbol": "bip:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#bip-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "fn to @r with rounding",
    "symbol": "bit:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#bit-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "fn to double-precision binary float",
    "symbol": "bit:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#bit-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "fn to half-precision float",
    "symbol": "bit:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#bit-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "fn to single-precision float",
    "symbol": "bit:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#bit-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "fn to quad-precision float",
    "symbol": "bit:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#bit-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse hex pair",
    "symbol": "bix:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#bix-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse odor-atom pair",
    "symbol": "bisk:so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#bisk-so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Blocksize",
    "symbol": "bloq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#bloq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Replace null",
    "symbol": "bond",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#bond",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parser modifier: LSB",
    "symbol": "boss",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#boss",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Group unit values into pair",
    "symbol": "both",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#both",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse $ (buc)",
    "symbol": "buc",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#buc",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse binary digit",
    "symbol": "but",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#but",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse _ (cab)",
    "symbol": "cab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#cab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Assemble",
    "symbol": "can",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#can",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Tree head",
    "symbol": "cap",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1b/#cap",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "To lowercase",
    "symbol": "cass",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#cass",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Concatenate",
    "symbol": "cat",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#cat",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse % (cen)",
    "symbol": "cen",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#cen",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Days in a century",
    "symbol": "cet:yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#cet-yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Character",
    "symbol": "char",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#char",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Jet hint information",
    "symbol": "chum",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#chum",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Octal digit",
    "symbol": "cit",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#cit",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Apply function to two units",
    "symbol": "clap",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#clap",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Compare (signed integer)",
    "symbol": "cmp:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#cmp-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Literal rendering engine",
    "symbol": "co",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4k/#co",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Tuple of core information",
    "symbol": "coil",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#coil",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Noun-literal syntax cases",
    "symbol": "coin",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#coin",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse : (col)",
    "symbol": "col",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#col",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Replace with constant",
    "symbol": "cold",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#cold",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse , (com)",
    "symbol": "com",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#com",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Arbitrary compose",
    "symbol": "comp",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4e/#comp",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Binary OR",
    "symbol": "con",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2d/#con",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Apply gate",
    "symbol": "cook",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#cook",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "UTF-8 text",
    "symbol": "cord",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#cord",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Compose forward",
    "symbol": "cork",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#cork",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Compose backward",
    "symbol": "corl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#corl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Tape to cord",
    "symbol": "crip",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#crip",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse @da, @dr, @p, @t",
    "symbol": "crub:so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#crub-so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unpack atom to noun",
    "symbol": "cue",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2p/#cue",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Right-curry a gate",
    "symbol": "curr",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#curr",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Curry left a gate",
    "symbol": "cury",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#cury",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "To uppercase",
    "symbol": "cuss",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#cuss",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Slice",
    "symbol": "cut",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#cut",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render decimal",
    "symbol": "d:ne",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#d-ne",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Point in time",
    "symbol": "date",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#date",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Seconds in day",
    "symbol": "day:yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#day-yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Decrement",
    "symbol": "dec",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#dec",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Difference (map)",
    "symbol": "def:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#def-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Delete (map)",
    "symbol": "del:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#del-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Delete (set)",
    "symbol": "del:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#del-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Delete (jug)",
    "symbol": "del:ju",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2j/#del-ju",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Decimal to atom",
    "symbol": "dem",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#dem",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse decmal with dots",
    "symbol": "dem:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#dem-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Denormalizes (floating point)",
    "symbol": "den:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#den-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Difference as patch (map)",
    "symbol": "dep:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#dep-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Maximum depth (queue)",
    "symbol": "dep:to",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2k/#dep-to",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Difference between atoms (modular basis)",
    "symbol": "dif:fe",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#dif-fe",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Subtraction (modular base)",
    "symbol": "dif:fo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#dif-fo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Difference (set)",
    "symbol": "dif:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#dif-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Subtraction (signed integer)",
    "symbol": "dif:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#dif-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Address of key (map)",
    "symbol": "dig:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#dig-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Address of a in set",
    "symbol": "dig:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#dig-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse decimal number",
    "symbol": "dim:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#dim-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Aura-atom pair",
    "symbol": "dime",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#dime",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "din:re",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4c/#din-re",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Binary AND (atoms)",
    "symbol": "dis",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2d/#dis",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Decimal digit",
    "symbol": "dit",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#dit",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Divide",
    "symbol": "div",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#div",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Divide (IEEE float)",
    "symbol": "div:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#div-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Divide (signed and unsigned integer cell)",
    "symbol": "div:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#div-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Double precision float",
    "symbol": "div:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#div-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Divide (half-precision float)",
    "symbol": "div:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#div-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Divide (single-precision float)",
    "symbol": "div:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#div-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Divide (quad-precision float)",
    "symbol": "div:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#div-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Optional gap",
    "symbol": "dog",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#dog",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "@p separator",
    "symbol": "doh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#doh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse double quote",
    "symbol": "doq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#doq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Numeric order",
    "symbol": "dor",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2f/#dor",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse period",
    "symbol": "dot",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#dot",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "@r to decimal float",
    "symbol": "drg:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#drg-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Get printable decimal (signed and unsigned integer cell)",
    "symbol": "drg:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#drg-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "@rd to decimal float",
    "symbol": "drg:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#drg-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "@rh to decimal float",
    "symbol": "drg:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#drg-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "@rs to decimal float",
    "symbol": "drg:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#drg-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "@rq to decimal float",
    "symbol": "drg:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#drg-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unit to list",
    "symbol": "drop",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#drop",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Modulus (signed integer)",
    "symbol": "dul:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#dul-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse decimal with leading zero",
    "symbol": "dum:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#dum-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "-- to ~",
    "symbol": "dun",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#dun",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "== to ~",
    "symbol": "duz",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#duz",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Divide (with remainder)",
    "symbol": "dvr",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#dvr",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Exact add",
    "symbol": "ead:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#ead-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold of fork between two types",
    "symbol": "each",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#each",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Always parse",
    "symbol": "easy",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#easy",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parsing location metadata",
    "symbol": "edge",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#edge",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Extended Euclidean algorithm",
    "symbol": "egcd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#egcd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Minimum exponent",
    "symbol": "emn:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#emn-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Exact multiply",
    "symbol": "emu:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#emu-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Maximum exponent",
    "symbol": "emx:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#emx-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Tail",
    "symbol": "end",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#end",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Equals (IEEE float)",
    "symbol": "equ:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#equ-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Equals (signed and unsigned integer cell)",
    "symbol": "equ:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#equ-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Equals (double-precision float)",
    "symbol": "equ:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#equ-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Equals (half-precision float)",
    "symbol": "equ:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#equ-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Equals (single-precision float)",
    "symbol": "equ:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#equ-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Equals (quad-precision float)",
    "symbol": "equ:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#equ-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Leap-year period",
    "symbol": "era:yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#era-yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Get exponent (IEEE float)",
    "symbol": "exp:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#exp-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Exponent (modular base)",
    "symbol": "exp:fo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#exp-fo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Exponent (@rd)",
    "symbol": "exp:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#exp-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Exponent (half-precision float)",
    "symbol": "exp:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#exp-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Exponent (@rs)",
    "symbol": "exp:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#exp-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Exponent (quad-precision float)",
    "symbol": "exp:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#exp-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Never parse",
    "symbol": "fail",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4e/#fail",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Give unit a default value",
    "symbol": "fall",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#fall",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "All indices in list",
    "symbol": "fand",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#fand",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse / (fas)",
    "symbol": "fas",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#fas",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Modulo bloq",
    "symbol": "fe",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#fe",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse @p",
    "symbol": "fed:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#fed-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Conceal structure v2",
    "symbol": "feen:ob",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#feen-ob",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Restore structure v2",
    "symbol": "fend:ob",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#fend-ob",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Feistel-like cipher",
    "symbol": "fice:ob",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#fice-ob",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Fill bloqstream",
    "symbol": "fil",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#fil",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "First index in list",
    "symbol": "find",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#find",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Fit on one line test",
    "symbol": "fit:re",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4c/#fit-re",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Flip sign",
    "symbol": "fli:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#fli-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Reverse list",
    "symbol": "flop",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#flop",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Fused multiply-add (IEEE float)",
    "symbol": "fma:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#fma-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Fused multiply-add",
    "symbol": "fma:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#fma-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Fused multiply-add (@rd)",
    "symbol": "fma:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#fma-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Fused multiply-add (half-precision float)",
    "symbol": "fma:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#fma-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Fused multiply-add (single-precision float)",
    "symbol": "fma:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#fma-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Fused multiply-add (quad-precision float)",
    "symbol": "fma:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#fma-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "FNV scrambler",
    "symbol": "fnv",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2e/#fnv",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Modulo prime",
    "symbol": "fo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#fo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Cases of arms by variance model",
    "symbol": "foot",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#foot",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "@rs to @rh",
    "symbol": "fos:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#fos-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Divide (modular base)",
    "symbol": "fra:fo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#fra-fo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Divide (signed integer)",
    "symbol": "fra:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#fra-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse to end",
    "symbol": "full",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#full",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add to tape",
    "symbol": "funk",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#funk",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "New line or ''",
    "symbol": "gah",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#gah",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse < (gal)",
    "symbol": "gal",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#gal",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Plural whitespace",
    "symbol": "gap",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#gap",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "End of line",
    "symbol": "gaq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#gaq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse > (gar)",
    "symbol": "gar",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#gar",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Concatenate (map)",
    "symbol": "gas:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#gas-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Concatenate (set)",
    "symbol": "gas:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#gas-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Push list into queue",
    "symbol": "gas:to",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2k/#gas-to",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Function",
    "symbol": "gate",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#gate",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Classic whitespace",
    "symbol": "gaw",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#gaw",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Optional gap",
    "symbol": "gay",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#gay",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Grab unit value",
    "symbol": "get:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#get-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Grab value by key",
    "symbol": "get:ja",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2j/#get-ja",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Retrieve set",
    "symbol": "get:ju",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2j/#get-ju",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Head-tail pair",
    "symbol": "get:to",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2k/#get-to",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Skip delimiter",
    "symbol": "glue",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4e/#glue",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse long numbers",
    "symbol": "gon",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#gon",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Hash order",
    "symbol": "gor",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2f/#gor",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Assert for value (map)",
    "symbol": "got:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#got-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Decimal float to @r",
    "symbol": "grd:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#grd-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Decimal to float",
    "symbol": "grd:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#grd-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Decimal float to @rd",
    "symbol": "grd:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#grd-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Decimal float to @rh",
    "symbol": "grd:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#grd-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Decimal float to @rs",
    "symbol": "grd:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#grd-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Decimal float to @rq",
    "symbol": "grd:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#grd-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than / equal",
    "symbol": "gte",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#gte",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than / equal (IEEE float)",
    "symbol": "gte:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gte-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than / equal (producing flag)",
    "symbol": "gte:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gte-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than / equal (double-precision float)",
    "symbol": "gte:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gte-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than / equal (half-precision float)",
    "symbol": "gte:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gte-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than / equal (single-precision float)",
    "symbol": "gte:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gte-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than / equal (quad-precision float)",
    "symbol": "gte:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gte-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than",
    "symbol": "gth",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#gth",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than (IEEE float)",
    "symbol": "gth:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gth-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than (producing flag)",
    "symbol": "gth:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gth-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than (double-precision float)",
    "symbol": "gth:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gth-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than (half-precision float)",
    "symbol": "gth:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gth-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than (single-precision float)",
    "symbol": "gth:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gth-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Greater than (quad-precision float)",
    "symbol": "gth:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#gth-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Axis syntax < or >",
    "symbol": "gul",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#gul",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "List from range",
    "symbol": "gulf",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#gulf",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parsing line and column",
    "symbol": "hair",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#hair",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Force remold",
    "symbol": "hard",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#hard",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Key existence check (map)",
    "symbol": "has:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#has-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Key existence check (set)",
    "symbol": "has:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#has-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Check contents (jug)",
    "symbol": "has:ju",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2j/#has-ju",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse # (hax)",
    "symbol": "hax",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#hax",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Get head of cell",
    "symbol": "head",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#head",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Place-based apply",
    "symbol": "here",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#here",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse - (hep)",
    "symbol": "hep",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#hep",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Hexadecimal to atom",
    "symbol": "hex",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#hex",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse hexadecimal number",
    "symbol": "hex:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#hex-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse phonetic pair",
    "symbol": "hif:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#hif-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse single uppercase letter",
    "symbol": "hig",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#hig",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse single hexadecimal digit",
    "symbol": "hit",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#hit",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Homogenize list",
    "symbol": "homo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#homo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Horizontal hash order",
    "symbol": "hor",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2f/#hor",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Seconds in hour",
    "symbol": "hor:yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#hor-yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse two phonetic pairs",
    "symbol": "huf:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#huf-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse 8 phonetic bytes",
    "symbol": "hyf:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#hyf-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Integer binary logarithm",
    "symbol": "ibl:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#ibl-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Infix",
    "symbol": "ifix",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#ifix",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse suffix",
    "symbol": "ind:po",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4a/#ind-po",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse prefix",
    "symbol": "ins:po",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4a/#ins-po",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Intersection (map)",
    "symbol": "int:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#int-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Intersection (set)",
    "symbol": "int:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#int-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Inverse order of modular field",
    "symbol": "inv:fe",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#inv-fe",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Inverse",
    "symbol": "inv:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#inv-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Inverse (signed modulus)",
    "symbol": "inv:fo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#inv-fo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Indentation block",
    "symbol": "iny",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#iny",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Jar engine",
    "symbol": "ja",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2j/#ja",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Pack noun to atom",
    "symbol": "jam",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2p/#jam",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator (jar)",
    "symbol": "jar",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2o/#jar",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Maximum 64-bit timestamp",
    "symbol": "jes:yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#jes-yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Match a cord",
    "symbol": "jest",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#jest",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add separator between list elements",
    "symbol": "join",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#join",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Jug operations",
    "symbol": "ju",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2j/#ju",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator (jug)",
    "symbol": "jug",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2o/#jug",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Match a single character",
    "symbol": "just",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#just",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse { (kel)",
    "symbol": "kel",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#kel",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse } (ker)",
    "symbol": "ker",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#ker",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse ^ (ket)",
    "symbol": "ket",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#ket",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Recursive parsers",
    "symbol": "knee",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#knee",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Atom type of ASCII characters",
    "symbol": "knot",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#knot",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Further trace",
    "symbol": "last",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4d/#last",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Construct list from null-terminated noun",
    "symbol": "le:nl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2m/#le-nl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "List length",
    "symbol": "lent",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#lent",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Logical AND on list",
    "symbol": "levy",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#levy",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Maximum",
    "symbol": "lfe:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lfe-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Largest normal float",
    "symbol": "lfn:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lfn-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Logical OR on list",
    "symbol": "lien",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#lien",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Curried bind",
    "symbol": "lift",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#lift",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Generic edge",
    "symbol": "like",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#like",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Reference into subject by name/axis",
    "symbol": "limb",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#limb",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Construct list from null-terminated tuple",
    "symbol": "limo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#limo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "line",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#line",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse IPv4 address",
    "symbol": "lip:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#lip-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold constructor (list)",
    "symbol": "list",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#list",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator (face on mold)",
    "symbol": "lone",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#lone",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Leg order",
    "symbol": "lor",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2f/#lor",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse lowercase letter",
    "symbol": "low",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#low",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Left-shift",
    "symbol": "lsh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#lsh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than / equal (atom)",
    "symbol": "lte",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#lte",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than / equal (IEEE float)",
    "symbol": "lte:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lte-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than / equal (producing flag)",
    "symbol": "lte:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lte-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than / equal (double-precision float)",
    "symbol": "lte:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lte-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than / equal (half-precision float)",
    "symbol": "lte:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lte-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than / equal (single-precision float)",
    "symbol": "lte:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lte-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than / equal (quad-precision float)",
    "symbol": "lte:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lte-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than (atom)",
    "symbol": "lth",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#lth",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than (IEEE float)",
    "symbol": "lth:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lth-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than (signed and unsigned integer cell)",
    "symbol": "lth:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lth-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than (double-precision float)",
    "symbol": "lth:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lth-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than (half-precision float)",
    "symbol": "lth:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lth-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than (single-precision float)",
    "symbol": "lth:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lth-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Less than (quad-precision float)",
    "symbol": "lth:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lth-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Central rounding mechanism",
    "symbol": "lug:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#lug-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse + (lus)",
    "symbol": "lus",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#lus",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Detect new line",
    "symbol": "lust",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4d/#lust",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse unless",
    "symbol": "less",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4e/#less",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "List from raw noun",
    "symbol": "ly",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2m/#ly",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Initialize ff (rd core)",
    "symbol": "ma:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#ma-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Initialize ff (rh core)",
    "symbol": "ma:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#ma-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Initialize ff (rs core)",
    "symbol": "ma:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#ma-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Initialize ff (rq core)",
    "symbol": "ma:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#ma-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Nock subject to unit",
    "symbol": "mack",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4n/#mack",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Map from list",
    "symbol": "malt",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2l/#malt",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator (map)",
    "symbol": "map",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2o/#map",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Assert and add (map)",
    "symbol": "mar:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#mar-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Address within head/tail",
    "symbol": "mas",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1b/#mas",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Match character",
    "symbol": "mask",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#mask",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Length-encode",
    "symbol": "mat",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2p/#mat",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Choose",
    "symbol": "mate",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#mate",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Maximum",
    "symbol": "max",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#max",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Minimum exponent of ff",
    "symbol": "me:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#me-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Crash and printf",
    "symbol": "mean",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#mean",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse hexabyte",
    "symbol": "mes",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#mes",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Escape special characters",
    "symbol": "mesc",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#mesc",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Measure",
    "symbol": "met",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#met",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "metl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#metl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Minimum (atom)",
    "symbol": "min",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#min",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mock (virtual Nock) interpreter",
    "symbol": "mink",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4n/#mink",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Seconds in minute",
    "symbol": "mit:yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#mit-yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Binary XOR (atom)",
    "symbol": "mix",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2d/#mix",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Compute formula on subject with hint",
    "symbol": "mock",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4n/#mock",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Modulus (atom)",
    "symbol": "mod",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#mod",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Days in month",
    "symbol": "moh:yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#moh-yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Map from pair list",
    "symbol": "molt",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2l/#molt",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Slam gate with sample",
    "symbol": "mong",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4n/#mong",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Intelligently render crash annotation",
    "symbol": "mook",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4n/#mook",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse list with delimiter",
    "symbol": "more",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#more",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse list of at least one match",
    "symbol": "most",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#most",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Days in months of leap-year",
    "symbol": "moy:yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#moy-yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Core used to scramble 16-bit atoms",
    "symbol": "mu",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#mu",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "FNV-1a scrambler",
    "symbol": "mug",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2e/#mug",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Standard MurmurHash3",
    "symbol": "muk",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2e/#muk",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Multiply (atom)",
    "symbol": "mul",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#mul",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Multiply (IEEE float)",
    "symbol": "mul:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#mul-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Multiply (signed and unsigned integer cell)",
    "symbol": "mul:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#mul-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Multiply (double-precision float)",
    "symbol": "mul:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#mul-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Multiply (quad-precision float)",
    "symbol": "mul:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#mul-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Multiply (single-precision float)",
    "symbol": "mul:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#mul-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Multiply (quad-precision float)",
    "symbol": "mul:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#mul-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Typed virtual",
    "symbol": "mule",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4n/#mule",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Untyped virtual",
    "symbol": "mute",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4n/#mute",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "31-bit MurmurHash3 scrambler",
    "symbol": "mum",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2e/#mum",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Maybe transform",
    "symbol": "murn",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#murn",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Map from raw noun",
    "symbol": "my",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2m/#my",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Construct map from null-terminated noun",
    "symbol": "my:nl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2m/#my-nl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Location, remainder of parsed text",
    "symbol": "nail",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#nail",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Remove head of queue",
    "symbol": "nap:to",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2k/#nap-to",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Digit rendering engine",
    "symbol": "ne",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#ne",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Require float",
    "symbol": "ned:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#ned-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unwrap unit",
    "symbol": "need",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#need",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Flip endianness",
    "symbol": "net:fe",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#net-fe",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Atom to @s",
    "symbol": "new:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#new-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Consume character",
    "symbol": "next",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#next",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Remove root of queue",
    "symbol": "nip:to",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2k/#nip-to",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse letters and -",
    "symbol": "nix",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#nix",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Noun to container operations",
    "symbol": "nl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2m/#nl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Virtual machine (see Nock)",
    "symbol": "nock",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#nock",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Binary NOT (atom)",
    "symbol": "not",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2d/#not",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "noun",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#noun",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Top-level coin parser",
    "symbol": "nuck:so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#nuck-so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse numeric character",
    "symbol": "nud",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#nud",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "null",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#null",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse coin literal with escapes",
    "symbol": "nusk:so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#nusk-so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Reversible scrambling v2",
    "symbol": "ob",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#ob",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Container arm for SHA-256 powered RNG",
    "symbol": "og",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#og",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Sign and absolute value",
    "symbol": "old:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#old-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Remove from list",
    "symbol": "oust",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#oust",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Maximum integer value",
    "symbol": "out:fe",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#out-fe",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Initialize fl from ff core",
    "symbol": "pa:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#pa-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold of pair of types",
    "symbol": "pair",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#pair",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse & (pam)",
    "symbol": "pam",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#pam",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse @ (pat)",
    "symbol": "pat",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#pat",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Filesystem path",
    "symbol": "path",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#path",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Address within address",
    "symbol": "peg",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1b/#peg",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse ( (pel)",
    "symbol": "pel",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#pel",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse ) (per)",
    "symbol": "per",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#per",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parses dime/tiple without standard prefixes",
    "symbol": "perd:so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#perd-so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse <=5 in base 32",
    "symbol": "pev:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#pev-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse <= 5 in base 64",
    "symbol": "pew:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#pew-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Discard first rule",
    "symbol": "pfix",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4e/#pfix",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parsing range",
    "symbol": "pint",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#pint",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse 5 digits in base 32",
    "symbol": "piv:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#piv-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse 5 digits in base 64",
    "symbol": "piw:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#piw-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse to tuple",
    "symbol": "plug",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4e/#plug",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "List of at least one match",
    "symbol": "plus",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#plus",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Phonetic base",
    "symbol": "po",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4a/#po",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator of faceless list",
    "symbol": "pole",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#pole",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "port",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#port",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse options",
    "symbol": "pose",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4e/#pose",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Computes a to the power of b",
    "symbol": "pow",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2g/#pow",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Force precision of 2 or greater (floating point)",
    "symbol": "prc:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#prc-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse any printable character",
    "symbol": "prn",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#prn",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Multiplies b and c modulo a",
    "symbol": "pro:fo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#pro-fo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Multiply to signed integer",
    "symbol": "pro:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#pro-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add key-value pair (map)",
    "symbol": "put:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#put-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Put b in a (set)",
    "symbol": "put:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#put-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add key-set pair (jar)",
    "symbol": "put:ju",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2j/#put-ju",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Insert into queue",
    "symbol": "put:to",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2k/#put-to",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Seconds in 4 years",
    "symbol": "qad:yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#qad-yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse <=4 binary digits",
    "symbol": "qeb:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#qeb-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator (queue)",
    "symbol": "qeu",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2o/#qeu",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse <=4 hexadecimal digits",
    "symbol": "qex:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#qex-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse 4 binary digits",
    "symbol": "qib:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#qib-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse character to cord atom",
    "symbol": "qit",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#qit",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse 4 hexadecimal digits",
    "symbol": "qix:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#qix-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator (tuple of list and type)",
    "symbol": "quip",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#quip",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse cord",
    "symbol": "qut",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#qut",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "r:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#r-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Random in range",
    "symbol": "rad:og",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#rad-og",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Random continuation",
    "symbol": "rads:og",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#rads-og",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Key list",
    "symbol": "raku:ob",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#raku-ob",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Flatten tank to tape",
    "symbol": "ram:re",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4c/#ram-re",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Assemble non-zero",
    "symbol": "rap",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#rap",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse or crash",
    "symbol": "rash",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4g/#rash",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Various roundings (floating point)",
    "symbol": "rau:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#rau-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Random bits",
    "symbol": "raw:og",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#raw-og",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Random bits continuation",
    "symbol": "raws:og",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#raws-og",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Pretty-printing engine (tank)",
    "symbol": "re",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4c/#re",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Prepend and render atom as tape",
    "symbol": "rear:co",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4k/#rear-co",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Replicate (list)",
    "symbol": "reap",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#reap",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Right fold (list)",
    "symbol": "reel",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#reel",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Remainder (signed integer)",
    "symbol": "rem:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#rem-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render coin lot as tape",
    "symbol": "rend:co",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4k/#rend-co",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render coin lot as span",
    "symbol": "rent:co",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4k/#rent-co",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Assemble single",
    "symbol": "rep",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#rep",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Replace by product (map)",
    "symbol": "rep:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#rep-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Accumulate elements (set)",
    "symbol": "rep:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#rep-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "rf:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#rf-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Replace values with accumulator (map)",
    "symbol": "rib:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#rib-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Wrap tape in / (tank)",
    "symbol": "rig:re",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4c/#rig-re",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Disassemble",
    "symbol": "rip",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#rip",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "rn:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#rn-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Roll left",
    "symbol": "rol:fe",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#rol-fe",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Left fold (list)",
    "symbol": "roll",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#roll",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Roll right",
    "symbol": "ror:fe",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#ror-fe",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Round to nearest float with 113-bit significand",
    "symbol": "rou:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#rou-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse dime float",
    "symbol": "royl:so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#royl-so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "royl-cell:so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#royl-cell-so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Right-shift",
    "symbol": "rsh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#rsh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "rt:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#rt-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "rta:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#rta-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "rtam:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#rtam-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Length-decode",
    "symbol": "rub",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2p/#rub",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "rub:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#rub-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "rud:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#rud-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parsing rule (match this with _)",
    "symbol": "rule",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#rule",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "rum:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#rum-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Transform values (map)",
    "symbol": "run:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#run-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Apply gate to set",
    "symbol": "run:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#run-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Reverse single Feistel-like",
    "symbol": "rund:ob",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#rund-ob",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Prepend n times",
    "symbol": "runt",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#runt",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "rup:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#rup-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse or null",
    "symbol": "rush",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4g/#rush",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse tape or null",
    "symbol": "rust",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4g/#rust",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Transform nodes (map)",
    "symbol": "rut:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#rut-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "ruv:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#ruv-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "rux:at",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#rux-at",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Reverse Feistel-like cipher",
    "symbol": "rynd:ob",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#rynd-ob",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Identity (produces same value)",
    "symbol": "same",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#same",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Signed integer to @r",
    "symbol": "san:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#san-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Signed integer to float",
    "symbol": "san:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#san-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unsigned integer to @rd",
    "symbol": "san:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#san-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Signed integer to @rh",
    "symbol": "san:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#san-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Signed integer to @rs",
    "symbol": "san:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#san-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Signed integer to @rq",
    "symbol": "san:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#san-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Soft-cast by odor",
    "symbol": "sand",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#sand",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Check odor validity",
    "symbol": "sane",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#sane",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Sign bit",
    "symbol": "sb:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sb-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Prefix (produce front of list)",
    "symbol": "scag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#scag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse tape or crash",
    "symbol": "scan",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4g/#scan",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render dime as cord",
    "symbol": "scot",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4m/#scot",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render dime as tape",
    "symbol": "scow",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4m/#scow",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Convert from IEEE float to fn",
    "symbol": "sea:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sea-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Convert from double-precision binary float to fn",
    "symbol": "sea:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sea-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Convert from half-precision float to fn",
    "symbol": "sea:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sea-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Convert from single-precision float to fn",
    "symbol": "sea:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sea-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Convert from quad-precision float to fn",
    "symbol": "sea:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sea-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Conditional cook",
    "symbol": "sear",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#sear",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse 1",
    "symbol": "seb:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#seb-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse non-zero decimal digit",
    "symbol": "sed:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#sed-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse [ (sel)",
    "symbol": "sel",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#sel",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse ; (sem)",
    "symbol": "sem",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#sem",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse ] (ser)",
    "symbol": "ser",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#ser",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator (set)",
    "symbol": "set",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2o/#set",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse non-zero base 32 digit",
    "symbol": "sev:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#sev-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse non-zero base 64 digit",
    "symbol": "sew:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#sew-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse nonzero hexadecimal digit",
    "symbol": "sex:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#sex-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Discard second rule",
    "symbol": "sfix",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4e/#sfix",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Double SHA-256",
    "symbol": "shad",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#shad",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Half SHA-256",
    "symbol": "shaf",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#shaf",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "SHA-512 with length",
    "symbol": "shal",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#shal",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "128-bit noun hash",
    "symbol": "sham",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#sham",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "SHA-1",
    "symbol": "shan",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#shan",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Salted hash",
    "symbol": "shas",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#shas",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Hash to nbits",
    "symbol": "shaw",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#shaw",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "SHA-256",
    "symbol": "shax",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#shax",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "SHA-256 with length",
    "symbol": "shay",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#shay",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "SHA-512",
    "symbol": "shaz",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3d/#shaz",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "shep",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4c/#shep",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Shift power",
    "symbol": "shf:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#shf-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Match character within range",
    "symbol": "shim",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#shim",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "shop",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4c/#shop",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "show",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4c/#show",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Signed integer",
    "symbol": "si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Construct set from null-terminated noun",
    "symbol": "si:nl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2m/#si-nl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse binary digit",
    "symbol": "sib:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#sib-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse decimal digit",
    "symbol": "sid:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#sid-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse ~ (sig)",
    "symbol": "sig",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#sig",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce sign of IEEE float",
    "symbol": "sig:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sig-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce sign of @rd",
    "symbol": "sig:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sig-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce sign of half-precision float",
    "symbol": "sig:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sig-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce sign of @rs",
    "symbol": "sig:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sig-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce sign of quad-precision float",
    "symbol": "sig:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sig-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce set from list",
    "symbol": "silt",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2l/#silt",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "First and second",
    "symbol": "simu",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4e/#simu",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Enforce modulo",
    "symbol": "sit:fe",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#sit-fe",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce remainder of b modulo a",
    "symbol": "sit:fo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#sit-fo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse a base 32 digit",
    "symbol": "siv:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#siv-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse a base 64 digit",
    "symbol": "siw:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#siw-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse a hexadecimal digit",
    "symbol": "six:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#six-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Separate list into two lists from slammed elments",
    "symbol": "skid",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#skid",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce list of elements from boolean gate",
    "symbol": "skim",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#skim",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce list of elements failing boolean gate",
    "symbol": "skip",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#skip",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce all elements from index in list",
    "symbol": "slag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#slag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Curried slaw",
    "symbol": "slat",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4m/#slat",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Demand: parse cord with input odor",
    "symbol": "slav",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4m/#slav",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse cord to input odor",
    "symbol": "slaw",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4m/#slaw",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse cord to coin",
    "symbol": "slay",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4m/#slay",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Deify printf",
    "symbol": "slog",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#slog",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Use gate to parse delimited list",
    "symbol": "slug",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#slug",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render path as tank",
    "symbol": "smyt",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4m/#smyt",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce element at specific index (list)",
    "symbol": "snag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#snag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce element from list at specific null-terminated noun",
    "symbol": "snag:nl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2m/#snag-nl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Append noun to list",
    "symbol": "snoc",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#snoc",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Coin parser engine",
    "symbol": "so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Maybe remold",
    "symbol": "soft",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#soft",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Wrap value in unit",
    "symbol": "some",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2a/#some",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse ' (soq)",
    "symbol": "soq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#soq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Quicksort (list)",
    "symbol": "sort",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#sort",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse base 32 letter",
    "symbol": "sov:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#sov-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse base 64 letter/symbol",
    "symbol": "sow:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#sow-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse hexadecimal letter",
    "symbol": "sox:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#sox-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse triple single-quote",
    "symbol": "soz",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#soz",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "ASCII atom",
    "symbol": "span",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#span",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render path as cord",
    "symbol": "spat",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4m/#spat",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce smallest denormalized float",
    "symbol": "spd:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#spd-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Gate to list (with state)",
    "symbol": "spin",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#spin",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce smallest normal float",
    "symbol": "spn:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#spn-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Stack trace line",
    "symbol": "spot",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#spot",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render path as tape",
    "symbol": "spud",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4m/#spud",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Gate to list (with state)",
    "symbol": "spun",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#spun",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Compute square root with remainder",
    "symbol": "sqt",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2g/#sqt",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce square root of IEEE float",
    "symbol": "sqt:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sqt-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce square root from signed and unsigned integer cell",
    "symbol": "sqt:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sqt-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce square root of double-precision float",
    "symbol": "sqt:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sqt-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce square root of half-precision float",
    "symbol": "sqt:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sqt-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce square root of single-precision float",
    "symbol": "sqt:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sqt-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce square root of quad-precision float",
    "symbol": "sqt:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sqt-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse cord to path",
    "symbol": "stab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4m/#stab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add label",
    "symbol": "stag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#stag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce list of matches",
    "symbol": "star",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#star",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add faces to range-parser pairs in list",
    "symbol": "stet",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#stet",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Switch by first",
    "symbol": "stew",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#stew",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse repeatedly",
    "symbol": "stir",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#stir",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse several times",
    "symbol": "stun",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4f/#stun",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Subtract",
    "symbol": "sub",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1a/#sub",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Subtract from IEEE float",
    "symbol": "sub:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sub-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Subtract from signed and unsigned integer cells",
    "symbol": "sub:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sub-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Subtract from double-precision float",
    "symbol": "sub:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sub-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Subtract from half-precision float",
    "symbol": "sub:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sub-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Subtract from single-precision float",
    "symbol": "sub:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sub-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Subtract from quad-precision float",
    "symbol": "sub:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sub-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Sum two numbers in modular field",
    "symbol": "sum:fe",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#sum-fe",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Modular sum",
    "symbol": "sum:fo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#sum-fo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Addition (signed integer)",
    "symbol": "sum:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#sum-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unsigned integer to IEEE float",
    "symbol": "sun:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sun-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unsigned integer to float",
    "symbol": "sun:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sun-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unsigned integer to double-precision float",
    "symbol": "sun:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sun-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unsigned integer to half-precision float",
    "symbol": "sun:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sun-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unsigned integer to single-precision float",
    "symbol": "sun:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sun-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unsigned integer to quad-precision float",
    "symbol": "sun:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#sun-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "@u to @s",
    "symbol": "sun:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#sun-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Infix (list)",
    "symbol": "swag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#swag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Reverse block order",
    "symbol": "swp",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#swp",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Switch rounding mode of floating point",
    "symbol": "swr:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#swr-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce set from null-terminated noun",
    "symbol": "sy",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2m/#sy",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Term",
    "symbol": "sym",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#sym",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Get sign",
    "symbol": "syn:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#syn-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Sign test",
    "symbol": "syn:si",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3a/#syn-si",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Get tail of cell",
    "symbol": "tail",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#tail",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Queue to list",
    "symbol": "tap:to",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2k/#tap-to",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse * (tar)",
    "symbol": "tar",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#tar",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Generic print structure",
    "symbol": "tang",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#tang",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Pretty-printing structure",
    "symbol": "tank",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#tank",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Listify pairs",
    "symbol": "tap:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#tap-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Flatten set into list",
    "symbol": "tap:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#tap-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "List of characters",
    "symbol": "tape",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#tape",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parsed time",
    "symbol": "tarp",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#tarp",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse signed dime",
    "symbol": "tash:so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#tash-so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse ` (tec)",
    "symbol": "tec",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#tec",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse decimal number with <= 3 digits",
    "symbol": "ted:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#ted-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "UTF-8 length",
    "symbol": "teff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#teff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Reverse Feistel-like cipher",
    "symbol": "teil:ob",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#teil-ob",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Hoon constant",
    "symbol": "term",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#term",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Test for equality",
    "symbol": "test",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2n/#test",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse 3 decimal digits",
    "symbol": "tid:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#tid-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "(Undocumented)",
    "symbol": "tiki",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#tiki",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse 3 lowercase letters",
    "symbol": "til:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#til-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Leading phonetic byte",
    "symbol": "tip:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#tip-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Trailing phonetic syllable",
    "symbol": "tiq:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#tiq-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse = (tis)",
    "symbol": "tis",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#tis",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Queue operations",
    "symbol": "to",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2k/#to",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Fetch suffix",
    "symbol": "tod:po",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4a/#tod-po",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Tree of faces",
    "symbol": "toga",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#toga",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Round IEEE float to nearest signed integer",
    "symbol": "toi:ff",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#toi-ff",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Round float to nearest signed integer",
    "symbol": "toi:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#toi-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Round double-precision float to nearest signed integer",
    "symbol": "toi:rd",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#toi-rd",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Round half-precision float to nearest signed integer",
    "symbol": "toi:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#toi-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Round single-precision float to nearest signed integer",
    "symbol": "toi:rs",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#toi-rs",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Round quad-precision float to nearest signed integer",
    "symbol": "toi:rq",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#toi-rq",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Round unsigned and signed integer to float",
    "symbol": "toj:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#toj-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Nock result (error report)",
    "symbol": "tone",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#tone",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Nock result (stack trace)",
    "symbol": "toon",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#toon",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce head of queue",
    "symbol": "top:to",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2k/#top-to",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Fetch prefix",
    "symbol": "tos:po",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4a/#tos-po",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Convert half-precision float to single-precision float",
    "symbol": "tos:rh",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#tos-rh",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Core with one arm $",
    "symbol": "trap",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#trap",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator (tree)",
    "symbol": "tree",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#tree",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator (tuple of three types)",
    "symbol": "trel",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#trel",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Tape split",
    "symbol": "trim",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#trim",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Cord to tape",
    "symbol": "trip",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#trip",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "UTF-8 to UTF-32 tape",
    "symbol": "tuba",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#tuba",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "UTF-32 to UTF-8 tape",
    "symbol": "tufa",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#tufa",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "XML template tree",
    "symbol": "tuna",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#tuna",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "UTF-32 to UTF-8 text",
    "symbol": "tuft",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#tuft",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "UTF-8 to UTF-32 cord",
    "symbol": "turf",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#turf",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Gate to list",
    "symbol": "turn",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#turn",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "List of expressions",
    "symbol": "tusk",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#tusk",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse coins without ~ prefix",
    "symbol": "twid:so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#twid-so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "List of 'maybe' hoons",
    "symbol": "tyke",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#tyke",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Pointer for type",
    "symbol": "typo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#typo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "List, term hoon",
    "symbol": "tyre",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#tyre",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Reversible scrambling",
    "symbol": "un",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#un",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Union (map between keys of two lists)",
    "symbol": "uni:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#uni-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Change representation to odd",
    "symbol": "uni:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#uni-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Union (sets)",
    "symbol": "uni:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#uni-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Mold generator (maybe)",
    "symbol": "unit",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/1c/#unit",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Turn (with key) (map)",
    "symbol": "urn:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#urn-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse span characters",
    "symbol": "urs:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#urs-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse non-_ span",
    "symbol": "urt:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#urt-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render base 32",
    "symbol": "v:ne",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#v-ne",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Typed data",
    "symbol": "vase",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#vase",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Axis syntax parser",
    "symbol": "ven",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#ven",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Convert during reboot",
    "symbol": "vise",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#vise",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse base 64 digit",
    "symbol": "vit",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#vit",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse base 32 digit with dot separators",
    "symbol": "viz:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#viz-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Vertical order",
    "symbol": "vor",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2f/#vor",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse bas, soq, or bix",
    "symbol": "voy:ab",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#voy-ab",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Comments to null",
    "symbol": "vul",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4i/#vul",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse base 32 string",
    "symbol": "vum:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#vum-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render base 64 digit",
    "symbol": "w:ne",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#w-ne",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Coin format encode",
    "symbol": "wack",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#wack",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "List of cords",
    "symbol": "wain",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#wain",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "List of list of characters",
    "symbol": "wall",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2q/#wall",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Concatenate two lists",
    "symbol": "weld",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#weld",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Concatenate null-terminated nouns",
    "symbol": "weld:nl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2m/#weld-nl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Perfect concatenate (lists)",
    "symbol": "welp",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#welp",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Coin format decode",
    "symbol": "wick",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#wick",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "win - render tape",
    "symbol": "wig:re",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4c/#wig-re",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render at indent",
    "symbol": "win:re",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4c/#win-re",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Address in subject",
    "symbol": "wing",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4o/#wing",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse base 64 number",
    "symbol": "wiz:ag",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#wiz-ag",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Unescape cord",
    "symbol": "woad",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#woad",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Escape cord",
    "symbol": "wood",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4b/#wood",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Product from edge",
    "symbol": "wonk",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3g/#wonk",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Restore structure",
    "symbol": "wred:un",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#wred-un",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Conceal structure",
    "symbol": "wren:un",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#wren-un",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse ? (wut)",
    "symbol": "wut",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#wut",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce depth of tree map",
    "symbol": "wyt:by",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2i/#wyt-by",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce number of elements in set",
    "symbol": "wyt:in",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2h/#wyt-in",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Render hexadecimal digit as atom of ASCII byte value",
    "symbol": "x:ne",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#x-ne",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Binary logarithm",
    "symbol": "xeb",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2c/#xeb",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Expand signed and unsigned integer cell",
    "symbol": "xpd:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#xpd-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Time since beginning of time",
    "symbol": "yall",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#yall",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Days since beginning of time",
    "symbol": "yawn",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#yawn",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Date to @d",
    "symbol": "year",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#year",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Tarp from atomic date",
    "symbol": "yell",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#yell",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Determine if leap-week",
    "symbol": "yelp",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#yelp",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Seconds in year",
    "symbol": "yer:yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#yer-yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Time constants core",
    "symbol": "yo",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#yo",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Date from atomic date",
    "symbol": "yore",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#yore",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Daily time to time atom",
    "symbol": "yule",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3c/#yule",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Look up in 255 sub box",
    "symbol": "zaft:un",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#zaft-un",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Add bottom into top",
    "symbol": "zag:mu",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#zag-mu",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse ! (zap)",
    "symbol": "zap",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4h/#zap",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Reverse look up in 255 sub box",
    "symbol": "zart:un",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#zart-un",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Produce zero as float",
    "symbol": "zer:fl",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3b/#zer-fl",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Subtract bottom from top",
    "symbol": "zig:mu",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#zig-mu",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Turn lists into single list by promoting elements from sublists",
    "symbol": "zing",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/2b/#zing",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Concatenate into atom",
    "symbol": "zug:mu",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4j/#zug-mu",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Parse prefixed dimes from IP, loobean, or floating point",
    "symbol": "zust:so",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/4l/#zust-so",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Lookup byte in 256 sub box",
    "symbol": "zyft:un",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#zyft-un",
    "desc": "Used in the Hoon standard library."
  }, {
    "name": "Reverse lookup byte in 256 sub box",
    "symbol": "zyrt:un",
    "usage": "stdlib",
    "link": "https://urbit.org/docs/reference/library/3f/#zyrt-un",
    "desc": "Used in the Hoon standard library."
  }
]
