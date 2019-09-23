var runes = [
    {
      "name": "dot",
      "symbol": ".",
      "usage": "Nock",
      "link": "/docs/hoon/hoon-expressions/rune/dot/",
      "desc": "Runes used for carrying out Nock operations in Hoon."
    },
    {
      "name": "dotket",
      "symbol": ".^",
      "usage": "Nock",
      "link": "/docs/hoon/hoon-expressions/rune/dot/#dotket",
      "desc": "<code>[%dtkt p=spec q=hoon]</code>: load from the Arvo namespace with a fake Nock instruction: 'Nock <code>12</code>''."
    },
    {
      "name": "dotlus",
      "symbol": ".+",
      "usage": "Nock",
      "link": "/docs/hoon/hoon-expressions/rune/dot/#dotlus",
      "desc": "<code>[%dtls p=hoon]</code>: increment an atom with Nock <code>4</code>."
    },
    {
      "name": "dottar",
      "symbol": ".*",
      "usage": "Nock",
      "link": "/docs/hoon/hoon-expressions/rune/dot/#dottar",
      "desc": "<code>[%dttr p=hoon q=hoon]</code>: evaluate with Nock <code>2</code>."
    },
    {
      "name": "dottis",
      "symbol": ".=",
      "usage": "Nock",
      "link": "/docs/hoon/hoon-expressions/rune/dot/#dottis",
      "desc": "<code>[%dtts p=hoon q=hoon]</code>: test for equality with Nock <code>5</code>."
    },
    {
      "name": "dotwut",
      "symbol": ".?",
      "usage": "Nock",
      "link": "/docs/hoon/hoon-expressions/rune/dot/#dotwut",
      "desc": "<code>[%dtwt p=hoon]</code>: test for cell or atom with Nock <code>3</code>."
    },
    {
      "name": "zap",
      "symbol": "!",
      "usage": "wild",
      "link": "/docs/hoon/hoon-expressions/rune/zap/",
      "desc": "Wildcard category. Expressions that don't fit anywhere else go here."
    },
    {
      "name": "zapgar",
      "symbol": "!>",
      "usage": "wild",
      "link": "/docs/hoon/hoon-expressions/rune/zap/#zapgar",
      "desc": "<code>[%zpgr p=hoon]</code>: wrap a noun in its type."
    },
    {
      "name": "zapcol",
      "symbol": "!:",
      "usage": "wild",
      "link": "/docs/hoon/hoon-expressions/rune/zap/#zapcol",
      "desc": "<code>[%dbug p=hoon]</code>: turn on stack trace"
    },
    {
      "name": "zapdot",
      "symbol": "!.",
      "usage": "wild",
      "link": "/docs/hoon/hoon-expressions/rune/zap/#zapdot",
      "desc": "Turn off stack trace for a subexpression <code>p</code>"
    },
    {
      "name": "zaptis",
      "symbol": "!=",
      "usage": "wild",
      "link": "/docs/hoon/hoon-expressions/rune/zap/#zaptis",
      "desc": "<code>[%zpts p=hoon]</code>: make the Nock formula for a Hoon expression."
    },
    {
      "name": "zapwut",
      "symbol": "!?",
      "usage": "wild",
      "link": "/docs/hoon/hoon-expressions/rune/zap/#zapwut",
      "desc": "<code>[%zpwt p=@ q=hoon]</code>: restrict Hoon version."
    },
    {
      "name": "zapzap",
      "symbol": "!!",
      "usage": "wild",
      "link": "/docs/hoon/hoon-expressions/rune/zap/#zapzap",
      "desc": "<code>[%zpzp ~]</code>: crash."
    },
    {
      "name": "tis",
      "symbol": "=",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/",
      "desc": "Runes used to modify the subject."
    },
    {
      "name": "tisgar",
      "symbol": "=>",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tisgar",
      "desc": "<code>[%tsgr p=hoon q=hoon]</code>: compose two expressions."
    },
    {
      "name": "tisbar",
      "symbol": "=|",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tisbar",
      "desc": "<code>[%tsbr p=spec q=hoon]</code>: combine a default type value with the subject."
    },
    {
      "name": "tiscol",
      "symbol": "=:",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tiscol",
      "desc": "<code>[%tscl p=(list (pair wing hoon)) q=hoon]</code>: change multiple legs in the subject."
    },
    {
      "name": "tiscom",
      "symbol": "=,",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tiscom",
      "desc": "<code>[%tscm p=hoon q=hoon]</code>: expose namespace"
    },
    {
      "name": "tisdot",
      "symbol": "=.",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tisdot",
      "desc": "<code>[%tsdt p=wing q=hoon r=hoon]</code>: change one leg in the subject."
    },
    {
      "name": "tishep",
      "symbol": "=-",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tishep",
      "desc": "<code>[%tshp p=hoon q=hoon]</code>: combine a new noun with the subject, inverted."
    },
    {
      "name": "tisket",
      "symbol": "=^",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tisket",
      "desc": "<code>[%tskt p=skin q=wing r=hoon s=hoon]</code>: pin the head of a pair; change"
    },
    {
      "name": "tisgal",
      "symbol": "=<",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tisgal",
      "desc": "<code>[%tsgl p=hoon q=hoon]</code>: compose two expressions, inverted."
    },
    {
      "name": "tislus",
      "symbol": "=+",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tislus",
      "desc": "<code>[%tsls p=hoon q=hoon]</code>: combine a new noun with the subject."
    },
    {
      "name": "tismic",
      "symbol": "=;",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tismic",
      "desc": "<code>[%tssm p=skin q=hoon r=hoon]</code>: combine a named noun with the subject, possibly with type annotation; inverted order."
    },
    {
      "name": "tisfas",
      "symbol": "=/",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tisfas",
      "desc": "<code>[%tsfs p=skin q=hoon r=hoon]</code>: combine a named noun with the subject, possibly with type annotation."
    },
    {
      "name": "tissig",
      "symbol": "=~",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tissig",
      "desc": "<code>[%tssg p=(list hoon)]</code>: compose many expressions."
    },
    {
      "name": "tistar",
      "symbol": "=*",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tistar",
      "desc": "<code>[%tstr p=term q=hoon r=hoon]</code>: define an alias."
    },
    {
      "name": "tiswut",
      "symbol": "=?",
      "usage": "Subject Modification",
      "link": "/docs/hoon/hoon-expressions/rune/tis/#tiswut",
      "desc": "<code>[$tswt p=wing q=hoon r=hoon s=hoon]</code>: conditionally change one leg in the subject."
    },
    {
      "name": "wut",
      "symbol": "?",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/",
      "desc": "Runes used for branching on conditionals."
    },
    {
      "name": "wutgar",
      "symbol": "?>",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutgar",
      "desc": "<code>[%wtbn p=hoon q=hoon]</code>: positive assertion."
    },
    {
      "name": "wutbar",
      "symbol": "?|",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutbar",
      "desc": "<code>[%wtbr p=(list hoon)]</code>: logical OR."
    },
    {
      "name": "wutcol",
      "symbol": "?:",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutcol",
      "desc": "<code>[%wtcl p=hoon q=hoon r=hoon]</code>: branch on a boolean test."
    },
    {
      "name": "wutdot",
      "symbol": "?.",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutdot",
      "desc": "<code>[%wtdt p=hoon q=hoon r=hoon]</code>: branch on a boolean test, inverted."
    },
    {
      "name": "wuthep",
      "symbol": "?-",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wuthep",
      "desc": "<code>[%wthp p=wing q=(list (pair spec value))]</code>: switch against a union, with no default."
    },
    {
      "name": "wutket",
      "symbol": "?^",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutket",
      "desc": "<code>[%wtkt p=wing q=hoon r=hoon]</code>: branch on whether a wing"
    },
    {
      "name": "wutgal",
      "symbol": "?<",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutgal",
      "desc": "<code>[%wtgl p=hoon q=hoon]</code>: negative assertion."
    },
    {
      "name": "wutlus",
      "symbol": "?+",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutlus",
      "desc": "<code>[%wtls p=wing q=hoon r=(list (pair spec hoon))]</code>: switch against"
    },
    {
      "name": "wutpad",
      "symbol": "?&",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutpad",
      "desc": "<code>[%wtpd p=(list hoon)]</code>: logical AND."
    },
    {
      "name": "wutsig",
      "symbol": "?~",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutsig",
      "desc": "<code>[%wtsg p=wing q=hoon r=hoon]</code>: branch on whether a wing of the subject is null."
    },
    {
      "name": "wuttis",
      "symbol": "?=",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wuttis",
      "desc": "<code>[%wtts p=spec q=wing]</code>: test pattern match."
    },
    {
      "name": "wutvat",
      "symbol": "?@",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutvat",
      "desc": "<code>[%wtpt p=wing q=hoon r=hoon]</code>: branch on whether a wing of the subject is an atom."
    },
    {
      "name": "wutzap",
      "symbol": "?!",
      "usage": "Conditionals",
      "link": "/docs/hoon/hoon-expressions/rune/wut/#wutzap",
      "desc": "<code>[%wtzp p=hoon]</code>: logical NOT."
    },
    {
      "name": "bar",
      "symbol": "|",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/",
      "desc": "Runes used to produce cores."
    },
    {
      "name": "barcab",
      "symbol": "|_",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#barcab",
      "desc": "Produce a **door** (a core with a sample)."
    },
    {
      "name": "barcen",
      "symbol": "|%",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#barcen",
      "desc": "Produce a core, <code>[battery payload]</code>."
    },
    {
      "name": "barcol",
      "symbol": "|:",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#barcol",
      "desc": "Produce a gate with a custom sample."
    },
    {
      "name": "bardot",
      "symbol": "|.",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#bardot",
      "desc": "Produce a trap (a core with one arm <code>$</code>)."
    },
    {
      "name": "barhep",
      "symbol": "|-",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#barhep",
      "desc": "Produce a trap (a core with one arm <code>$</code>) and evaluate it."
    },
    {
      "name": "barket",
      "symbol": "|^",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#barket",
      "desc": "Produce a core whose battery includes a <code>$</code> arm and compute the latter."
    },
    {
      "name": "barsig",
      "symbol": "|~",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#barsig",
      "desc": "Produce an iron gate."
    },
    {
      "name": "bartar",
      "symbol": "|*",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#bartar",
      "desc": "Produce a wet gate (one-armed core with sample)."
    },
    {
      "name": "bartis",
      "symbol": "|=",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#bartis",
      "desc": "Produce a gate (a one-armed core with a sample)."
    },
    {
      "name": "barvat",
      "symbol": "|@",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#barvat",
      "desc": "Produce a 'wet' core <code>[battery payload]</code>."
    },
    {
      "name": "barwut",
      "symbol": "|?",
      "usage": "Cores",
      "link": "/docs/hoon/hoon-expressions/rune/bar/#barwut",
      "desc": "Produce a lead trap."
    },
    {
      "name": "lus",
      "symbol": "+",
      "usage": "Arms",
      "link": "/docs/hoon/hoon-expressions/rune/lus/",
      "desc": "Runes used to define arms in a core."
    },
    {
      "name": "lusbar",
      "symbol": "+|",
      "usage": "Arms",
      "link": "/docs/hoon/hoon-expressions/rune/lus/#lusbar",
      "desc": "Chapter label."
    },
    {
      "name": "lusbuc",
      "symbol": "+$",
      "usage": "Arms",
      "link": "/docs/hoon/hoon-expressions/rune/lus/#lusbuc",
      "desc": "Produce a structure arm (type definition)."
    },
    {
      "name": "luslus",
      "symbol": "++",
      "usage": "Arms",
      "link": "/docs/hoon/hoon-expressions/rune/lus/#luslus",
      "desc": "Produce a normal arm."
    },
    {
      "name": "lustar",
      "symbol": "+*",
      "usage": "Arms",
      "link": "/docs/hoon/hoon-expressions/rune/lus/#lustar",
      "desc": "Produce a type constructor arm."
    },
    {
      "name": "col",
      "symbol": ":",
      "usage": "Cells",
      "link": "/docs/hoon/hoon-expressions/rune/col/",
      "desc": "Runes used to produce cells, which are pairs of nouns."
    },
    {
      "name": "colcab",
      "symbol": ":_",
      "usage": "Cells",
      "link": "/docs/hoon/hoon-expressions/rune/col/#colcab",
      "desc": "<code>[%clcb p=hoon q=hoon]</code>; construct a cell, inverted."
    },
    {
      "name": "colcol",
      "symbol": "::",
      "usage": "Cells",
      "link": "/docs/hoon/hoon-expressions/rune/col/#colcol",
      "desc": "Code comment."
    },
    {
      "name": "colhep",
      "symbol": ":-",
      "usage": "Cells",
      "link": "/docs/hoon/hoon-expressions/rune/col/#colhep",
      "desc": "<code>[%clhp p=hoon q=hoon]</code>: construct a cell (2-tuple)."
    },
    {
      "name": "colket",
      "symbol": ":^",
      "usage": "Cells",
      "link": "/docs/hoon/hoon-expressions/rune/col/#colket",
      "desc": "<code>[%clkt p=hoon q=hoon r=hoon s=hoon]</code>: construct a quadruple (4-tuple)."
    },
    {
      "name": "collus",
      "symbol": ":+",
      "usage": "Cells",
      "link": "/docs/hoon/hoon-expressions/rune/col/#collus",
      "desc": "<code>[%clls p=hoon q=hoon r=hoon]</code>: construct a triple (3-tuple)."
    },
    {
      "name": "colsig",
      "symbol": ":~",
      "usage": "Cells",
      "link": "/docs/hoon/hoon-expressions/rune/col/#colsig",
      "desc": "<code>[%clsg p=(list hoon)]</code>: construct a null-terminated list."
    },
    {
      "name": "coltar",
      "symbol": ":*",
      "usage": "Cells",
      "link": "/docs/hoon/hoon-expressions/rune/col/#coltar",
      "desc": "<code>[%cltr p=(list hoon)]</code>: construct an n-tuple."
    },
    {
      "name": "cen",
      "symbol": "%",
      "usage": "Calls",
      "link": "/docs/hoon/hoon-expressions/rune/cen/",
      "desc": "Runes used for making function calls in Hoon."
    },
    {
      "name": "cencab",
      "symbol": "%_",
      "usage": "Calls",
      "link": "/docs/hoon/hoon-expressions/rune/cen/#cencab",
      "desc": "Resolve a wing with changes, preserving type."
    },
    {
      "name": "cencol",
      "symbol": "%:",
      "usage": "Calls",
      "link": "/docs/hoon/hoon-expressions/rune/cen/#cencol",
      "desc": "Call a gate with many arguments."
    },
    {
      "name": "cendot",
      "symbol": "%.",
      "usage": "Calls",
      "link": "/docs/hoon/hoon-expressions/rune/cen/#cendot",
      "desc": "Call a gate (function), inverted."
    },
    {
      "name": "cenhep",
      "symbol": "%-",
      "usage": "Calls",
      "link": "/docs/hoon/hoon-expressions/rune/cen/#cenhep",
      "desc": "Call a gate (function)."
    },
    {
      "name": "cenket",
      "symbol": "%^",
      "usage": "Calls",
      "link": "/docs/hoon/hoon-expressions/rune/cen/#cenket",
      "desc": "Call gate with triple sample."
    },
    {
      "name": "cenlus",
      "symbol": "%+",
      "usage": "Calls",
      "link": "/docs/hoon/hoon-expressions/rune/cen/#cenlus",
      "desc": "Call gate with a cell sample."
    },
    {
      "name": "censig",
      "symbol": "%~",
      "usage": "Calls",
      "link": "/docs/hoon/hoon-expressions/rune/cen/#censig",
      "desc": "Evaluate an arm in a door."
    },
    {
      "name": "centar",
      "symbol": "%*",
      "usage": "Calls",
      "link": "/docs/hoon/hoon-expressions/rune/cen/#centar",
      "desc": "Evaluate an expression, then resolve a wing with changes."
    },
    {
      "name": "centis",
      "symbol": "%=",
      "usage": "Calls",
      "link": "/docs/hoon/hoon-expressions/rune/cen/#centis",
      "desc": "Resolve a wing with changes."
    },
    {
      "name": "ket",
      "symbol": "^",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/",
      "desc": "Runes that let us adjust types without violating type constraints."
    },
    {
      "name": "ketbar",
      "symbol": "^|",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/#ketbar",
      "desc": "<code>[%ktbr p=hoon]</code>: convert a gold core to an iron core (contravariant)."
    },
    {
      "name": "ketcol",
      "symbol": "^:",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/#ketcol",
      "desc": "<code>[%ktcl p=spec]</code>: 'factory' gate for type <code>p</code>."
    },
    {
      "name": "ketdot",
      "symbol": "^.",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/#ketdot",
      "desc": "<code>[%ktdt p=hoon q=hoon]</code>: typecast on value produced by passing <code>q</code> to <code>p</code>."
    },
    {
      "name": "kethep",
      "symbol": "^-",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/#kethep",
      "desc": "<code>[%kthp p=spec q=hoon]</code>: typecast by explicit type label."
    },
    {
      "name": "ketlus",
      "symbol": "^+",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/#ketlus",
      "desc": "<code>[%ktls p=hoon q=hoon]</code>: typecast by inferred type."
    },
    {
      "name": "ketpad",
      "symbol": "^&",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/#ketpad",
      "desc": "<code>[%ktpd p=hoon]</code>: convert a core to a zinc core (covariant)."
    },
    {
      "name": "ketsig",
      "symbol": "^~",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/#ketsig",
      "desc": "<code>[%ktsg p=hoon]</code>: fold constant at compile time."
    },
    {
      "name": "kettar",
      "symbol": "^*",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/#kettar",
      "desc": "<code>[%kttr p=spec]</code>: Produce example type value."
    },
    {
      "name": "kettis",
      "symbol": "^=",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/#kettis",
      "desc": "<code>[%ktts p=skin q=hoon]</code>: Bind name to a value."
    },
    {
      "name": "ketwut",
      "symbol": "^?",
      "usage": "Casts",
      "link": "/docs/hoon/hoon-expressions/rune/ket/#ketwut",
      "desc": "<code>[%ktwt p=hoon]</code>: convert any core to a lead core (bivariant)."
    },
    {
      "name": "buc",
      "symbol": "$",
      "usage": "Structures",
      "link": "/docs/hoon/hoon-expressions/rune/buc/",
      "desc": "Runes used for defining custom types."
    },
    {
      "name": "buccab",
      "symbol": "$_",
      "usage": "Structures",
      "link": "/docs/hoon/hoon-expressions/rune/buc/#buccab",
      "desc": "<code>[%bscb p=hoon]</code>: structure that normalizes to an example."
    },
    {
      "name": "buccen",
      "symbol": "$%",
      "usage": "Structures",
      "link": "/docs/hoon/hoon-expressions/rune/buc/#buccen",
      "desc": "<code>[%bscn p=(list spec)]</code>: structure which recognizes a union tagged by head atom."
    },
    {
      "name": "buccol",
      "symbol": "$:",
      "usage": "Structures",
      "link": "/docs/hoon/hoon-expressions/rune/buc/#buccol",
      "desc": "<code>[%bscl p=(list spec)]</code>: form a cell type."
    },
    {
      "name": "buchep",
      "symbol": "$-",
      "usage": "Structures",
      "link": "/docs/hoon/hoon-expressions/rune/buc/#buchep",
      "desc": "<code>[%bshp p=spec q=spec]</code>: structure that normalizes to an example gate."
    },
    {
      "name": "bucket",
      "symbol": "$^",
      "usage": "Structures",
      "link": "/docs/hoon/hoon-expressions/rune/buc/#bucket",
      "desc": "<code>[%bskt p=spec q=spec]</code>: structure which normalizes a union tagged by head depth (cell)."
    },
    {
      "name": "bucsig",
      "symbol": "$~",
      "usage": "Structures",
      "link": "/docs/hoon/hoon-expressions/rune/buc/#bucsig",
      "desc": "<code>[%bssg p=hoon q=spec]</code>: define a custom type default value"
    },
    {
      "name": "bucvat",
      "symbol": "$@",
      "usage": "Structures",
      "link": "/docs/hoon/hoon-expressions/rune/buc/#bucvat",
      "desc": "<code>[%bsvt p=spec q=spec]</code>: structure which normalizes a union tagged by head depth (atom)."
    },
    {
      "name": "buctis",
      "symbol": "$=",
      "usage": "Structures",
      "link": "/docs/hoon/hoon-expressions/rune/buc/#buctis",
      "desc": "<code>[%bsts p=skin q=spec]</code>: structure which wraps a face around another structure."
    },
    {
      "name": "bucwut",
      "symbol": "$?",
      "usage": "Structures",
      "link": "/docs/hoon/hoon-expressions/rune/buc/#bucwut",
      "desc": "<code>[%bswt p=(list spec)]</code>: form a type from a union of other types."
    },
    {
      "name": "mic",
      "symbol": ";",
      "usage": "Make",
      "link": "/docs/hoon/hoon-expressions/rune/mic/",
      "desc": "Miscellaneous useful macros."
    },
    {
      "name": "miccol",
      "symbol": ";:",
      "usage": "Make",
      "link": "/docs/hoon/hoon-expressions/rune/mic/#miccol",
      "desc": "<code>[%mccl p=hoon q=(list hoon)]</code>: call a binary function as an n-ary function."
    },
    {
      "name": "miclus",
      "symbol": ";+",
      "usage": "Make",
      "link": "/docs/hoon/hoon-expressions/rune/mic/#miclus",
      "desc": "make a single XML node (Sail)"
    },
    {
      "name": "micmic",
      "symbol": ";;",
      "usage": "Make",
      "link": "/docs/hoon/hoon-expressions/rune/mic/#micmic",
      "desc": "<code>[%mcmc p=spec q=hoon]</code>: normalize with a mold, asserting fixpoint."
    },
    {
      "name": "micfas",
      "symbol": ";/",
      "usage": "Make",
      "link": "/docs/hoon/hoon-expressions/rune/mic/#micfas",
      "desc": "<code>[%mcnt p=hoon]</code>: tape as XML element."
    },
    {
      "name": "micsig",
      "symbol": ";~",
      "usage": "Make",
      "link": "/docs/hoon/hoon-expressions/rune/mic/#micsig",
      "desc": "<code>[%mcsg p=hoon q=(list hoon)]</code>: glue a pipeline together with a"
    },
    {
      "name": "mictar",
      "symbol": ";*",
      "usage": "Make",
      "link": "/docs/hoon/hoon-expressions/rune/mic/#mictar",
      "desc": "Make a list of XML nodes from complex Hoon expression (Sail)."
    },
    {
      "name": "mictis",
      "symbol": ";=",
      "usage": "Make",
      "link": "/docs/hoon/hoon-expressions/rune/mic/#mictis",
      "desc": "Make a list of XML nodes (Sail)."
    },
    {
      "name": "sig",
      "symbol": "~",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/",
      "desc": "Runes that use Nock <code>11</code> to pass non-semantic info to the interpreter."
    },
    {
      "name": "siggar",
      "symbol": "~>",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#siggar",
      "desc": "<code>[%sgbn p=$@(term [p=term q=hoon]) q=hoon]</code>: raw hint, applied"
    },
    {
      "name": "sigbar",
      "symbol": "~|",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#sigbar",
      "desc": "<code>[%sgbr p=hoon q=hoon]</code>: tracing printf."
    },
    {
      "name": "sigbuc",
      "symbol": "~$",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#sigbuc",
      "desc": "<code>[%sgbs p=term q=hoon]</code>: profiling hit counter."
    },
    {
      "name": "sigcab",
      "symbol": "~_",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#sigcab",
      "desc": "<code>[%sgcb p=hoon q=hoon]</code>: user-formatted tracing printf."
    },
    {
      "name": "sigcen",
      "symbol": "~%",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#sigcen",
      "desc": "<code>[%sgcn p=term q=wing r=(list [term hoon]) s=hoon]</code>: jet registration."
    },
    {
      "name": "siggal",
      "symbol": "~<",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#siggal",
      "desc": "<code>[%sgld p=$@(term [p=term q=hoon]) q=hoon]</code>: raw hint, applied to product."
    },
    {
      "name": "siglus",
      "symbol": "~+",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#siglus",
      "desc": "<code>[%sgls p=hoon]</code>: cache a computation."
    },
    {
      "name": "signet",
      "symbol": "~/",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#signet",
      "desc": "<code>[%sgnt p=term q=hoon]</code>: jet registration for gate with"
    },
    {
      "name": "sigpad",
      "symbol": "~&",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#sigpad",
      "desc": "<code>[%sgpd p=hoon q=hoon]</code>: debugging printf."
    },
    {
      "name": "sigtis",
      "symbol": "~=",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#sigtis",
      "desc": "<code>[%sgts p=hoon q=hoon]</code>: detect duplicate."
    },
    {
      "name": "sigwut",
      "symbol": "~?",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#sigwut",
      "desc": "<code>[%sgwt p=hoon q=hoon r=hoon]</code>: conditional debug printf."
    },
    {
      "name": "sigzap",
      "symbol": "~!",
      "usage": "Hints",
      "link": "/docs/hoon/hoon-expressions/rune/sig/#sigzap",
      "desc": "<code>[%sgzp p=hoon q=hoon]</code>: print type on compilation fail."
    },
    {
      "name": "terminators",
      "symbol": "--,",
      "usage": "Terminators",
      "link": "/docs/hoon/hoon-expressions/rune/terminators/",
      "desc": "Runes used to terminate expressions."
    },
    {
      "name": "hephep",
      "symbol": "--",
      "usage": "Terminators",
      "link": "/docs/hoon/hoon-expressions/rune/terminators/#hephep",
      "desc": "The <code>--</code> rune is used to indicate the end of a core expression."
    },
    {
      "name": "tistis",
      "symbol": "==",
      "usage": "Terminators",
      "link": "/docs/hoon/hoon-expressions/rune/terminators/#tistis",
      "desc": "The <code>==</code> rune is used to indicate the end of a 'jogging' or 'running' series of Hoon expressions."
    }
  ]