var runes = [
    {
      "name": "dot",
      "symbol": ".",
      "usage": "Nock",
      "link": "/docs/reference/hoon-expressions/rune/dot.md",
      "desc": "Runes used for carrying out Nock operations in Hoon."
    },
    {
      "name": "dotket",
      "symbol": ".^",
      "usage": "Nock",
      "link": "/docs/reference/hoon-expressions/rune/dot.md#dotket",
      "desc": "<code>[%dtkt p=spec q=hoon]</code>: load from the Arvo namespace with a fake Nock instruction: 'Nock <code>12</code>''."
    },
    {
      "name": "dotlus",
      "symbol": ".+",
      "usage": "Nock",
      "link": "/docs/reference/hoon-expressions/rune/dot.md#dotlus",
      "desc": "<code>[%dtls p=hoon]</code>: increment an atom with Nock <code>4</code>."
    },
    {
      "name": "dottar",
      "symbol": ".*",
      "usage": "Nock",
      "link": "/docs/reference/hoon-expressions/rune/dot.md#dottar",
      "desc": "<code>[%dttr p=hoon q=hoon]</code>: evaluate with Nock <code>2</code>."
    },
    {
      "name": "dottis",
      "symbol": ".=",
      "usage": "Nock",
      "link": "/docs/reference/hoon-expressions/rune/dot.md#dottis",
      "desc": "<code>[%dtts p=hoon q=hoon]</code>: test for equality with Nock <code>5</code>."
    },
    {
      "name": "dotwut",
      "symbol": ".?",
      "usage": "Nock",
      "link": "/docs/reference/hoon-expressions/rune/dot.md#dotwut",
      "desc": "<code>[%dtwt p=hoon]</code>: test for cell or atom with Nock <code>3</code>."
    },
    {
      "name": "zap",
      "symbol": "!",
      "usage": "wild",
      "link": "/docs/reference/hoon-expressions/rune/zap.md",
      "desc": "Wildcard category. Expressions that don't fit anywhere else go here."
    },
    {
      "name": "zapban",
      "symbol": "!>",
      "usage": "wild",
      "link": "/docs/reference/hoon-expressions/rune/zap.md#zapban",
      "desc": "<code>[%zpgr p=hoon]</code>: wrap a noun in its type."
    },
    {
      "name": "zapcol",
      "symbol": "!:",
      "usage": "wild",
      "link": "/docs/reference/hoon-expressions/rune/zap.md#zapcol",
      "desc": "<code>[%dbug p=hoon]</code>: turn on stack trace"
    },
    {
      "name": "zapdot",
      "symbol": "!.",
      "usage": "wild",
      "link": "/docs/reference/hoon-expressions/rune/zap.md#zapdot",
      "desc": "Turn off stack trace for a subexpression <code>p</code>"
    },
    {
      "name": "zaptis",
      "symbol": "!=",
      "usage": "wild",
      "link": "/docs/reference/hoon-expressions/rune/zap.md#zaptis",
      "desc": "<code>[%zpts p=hoon]</code>: make the Nock formula for a Hoon expression."
    },
    {
      "name": "zapwut",
      "symbol": "!?",
      "usage": "wild",
      "link": "/docs/reference/hoon-expressions/rune/zap.md#zapwut",
      "desc": "<code>[%zpwt p=@ q=hoon]</code>: restrict Hoon version."
    },
    {
      "name": "zapzap",
      "symbol": "!!",
      "usage": "wild",
      "link": "/docs/reference/hoon-expressions/rune/zap.md#zapzap",
      "desc": "<code>[%zpzp ~]</code>: crash."
    },
    {
      "name": "tis",
      "symbol": "=",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md",
      "desc": "Runes used to modify the subject."
    },
    {
      "name": "tisban",
      "symbol": "=>",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tisban",
      "desc": "<code>[%tsgr p=hoon q=hoon]</code>: compose two expressions."
    },
    {
      "name": "tisbar",
      "symbol": "=|",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tisbar",
      "desc": "<code>[%tsbr p=spec q=hoon]</code>: combine a default type value with the subject."
    },
    {
      "name": "tiscol",
      "symbol": "=:",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tiscol",
      "desc": "<code>[%tscl p=(list (pair wing hoon)) q=hoon]</code>: change multiple legs in the subject."
    },
    {
      "name": "tiscom",
      "symbol": "=,",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tiscom",
      "desc": "<code>[%tscm p=hoon q=hoon]</code>: expose namespace"
    },
    {
      "name": "tisdot",
      "symbol": "=.",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tisdot",
      "desc": "<code>[%tsdt p=wing q=hoon r=hoon]</code>: change one leg in the subject."
    },
    {
      "name": "tishep",
      "symbol": "=-",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tishep",
      "desc": "<code>[%tshp p=hoon q=hoon]</code>: combine a new noun with the subject, inverted."
    },
    {
      "name": "tisket",
      "symbol": "=^",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tisket",
      "desc": "<code>[%tskt p=skin q=wing r=hoon s=hoon]</code>: pin the head of a pair; change"
    },
    {
      "name": "tisled",
      "symbol": "=<",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tisled",
      "desc": "<code>[%tsgl p=hoon q=hoon]</code>: compose two expressions, inverted."
    },
    {
      "name": "tislus",
      "symbol": "=+",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tislus",
      "desc": "<code>[%tsls p=hoon q=hoon]</code>: combine a new noun with the subject."
    },
    {
      "name": "tismic",
      "symbol": "=;",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tismic",
      "desc": "<code>[%tssm p=skin q=hoon r=hoon]</code>: combine a named noun with the subject, possibly with type annotation; inverted order."
    },
    {
      "name": "tisfas",
      "symbol": "=/",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tisfas",
      "desc": "<code>[%tsfs p=skin q=hoon r=hoon]</code>: combine a named noun with the subject, possibly with type annotation."
    },
    {
      "name": "tissig",
      "symbol": "=~",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tissig",
      "desc": "<code>[%tssg p=(list hoon)]</code>: compose many expressions."
    },
    {
      "name": "tistar",
      "symbol": "=*",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tistar",
      "desc": "<code>[%tstr p=term q=hoon r=hoon]</code>: define an alias."
    },
    {
      "name": "tiswut",
      "symbol": "=?",
      "usage": "Subject Modification",
      "link": "/docs/reference/hoon-expressions/rune/tis.md#tiswut",
      "desc": "<code>[$tswt p=wing q=hoon r=hoon s=hoon]</code>: conditionally change one leg in the subject."
    },
    {
      "name": "wut",
      "symbol": "?",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md",
      "desc": "Runes used for branching on conditionals."
    },
    {
      "name": "wutban",
      "symbol": "?>",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutban",
      "desc": "<code>[%wtbn p=hoon q=hoon]</code>: positive assertion."
    },
    {
      "name": "wutbar",
      "symbol": "?|",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutbar",
      "desc": "<code>[%wtbr p=(list hoon)]</code>: logical OR."
    },
    {
      "name": "wutcol",
      "symbol": "?:",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutcol",
      "desc": "<code>[%wtcl p=hoon q=hoon r=hoon]</code>: branch on a boolean test."
    },
    {
      "name": "wutdot",
      "symbol": "?.",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutdot",
      "desc": "<code>[%wtdt p=hoon q=hoon r=hoon]</code>: branch on a boolean test, inverted."
    },
    {
      "name": "wuthep",
      "symbol": "?-",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wuthep",
      "desc": "<code>[%wthp p=wing q=(list (pair spec value))]</code>: switch against a union, with no default."
    },
    {
      "name": "wutket",
      "symbol": "?^",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutket",
      "desc": "<code>[%wtkt p=wing q=hoon r=hoon]</code>: branch on whether a wing"
    },
    {
      "name": "wutled",
      "symbol": "?<",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutled",
      "desc": "<code>[%wtgl p=hoon q=hoon]</code>: negative assertion."
    },
    {
      "name": "wutlus",
      "symbol": "?+",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutlus",
      "desc": "<code>[%wtls p=wing q=hoon r=(list (pair spec hoon))]</code>: switch against"
    },
    {
      "name": "wutpad",
      "symbol": "?&",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutpad",
      "desc": "<code>[%wtpd p=(list hoon)]</code>: logical AND."
    },
    {
      "name": "wutsig",
      "symbol": "?~",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutsig",
      "desc": "<code>[%wtsg p=wing q=hoon r=hoon]</code>: branch on whether a wing of the subject is null."
    },
    {
      "name": "wuttis",
      "symbol": "?=",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wuttis",
      "desc": "<code>[%wtts p=spec q=wing]</code>: test pattern match."
    },
    {
      "name": "wutvat",
      "symbol": "?@",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutvat",
      "desc": "<code>[%wtpt p=wing q=hoon r=hoon]</code>: branch on whether a wing of the subject is an atom."
    },
    {
      "name": "wutzaps",
      "symbol": "?!",
      "usage": "Conditionals",
      "link": "/docs/reference/hoon-expressions/rune/wut.md#wutzaps",
      "desc": "<code>[%wtzp p=hoon]</code>: logical NOT."
    },
    {
      "name": "bar",
      "symbol": "|",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md",
      "desc": "Runes used to produce cores."
    },
    {
      "name": "barcab",
      "symbol": "|_",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#barcab",
      "desc": "Produce a **door** (a core with a sample)."
    },
    {
      "name": "barcen",
      "symbol": "|%",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#barcen",
      "desc": "Produce a core, <code>[battery payload]</code>."
    },
    {
      "name": "barcol",
      "symbol": "|:",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#barcol",
      "desc": "Produce a gate with a custom sample."
    },
    {
      "name": "bardot",
      "symbol": "|.",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#bardot",
      "desc": "Produce a trap (a core with one arm <code>$</code>)."
    },
    {
      "name": "barhep",
      "symbol": "|-",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#barhep",
      "desc": "Produce a trap (a core with one arm <code>$</code>) and evaluate it."
    },
    {
      "name": "barket",
      "symbol": "|^",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#barket",
      "desc": "Produce a core whose battery includes a <code>$</code> arm and compute the latter."
    },
    {
      "name": "barsig",
      "symbol": "|~",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#barsig",
      "desc": "Produce an iron gate."
    },
    {
      "name": "bartar",
      "symbol": "|*",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#bartar",
      "desc": "Produce a wet gate (one-armed core with sample)."
    },
    {
      "name": "bartis",
      "symbol": "|=",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#bartis",
      "desc": "Produce a gate (a one-armed core with a sample)."
    },
    {
      "name": "barvat",
      "symbol": "|@",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#barvat",
      "desc": "Produce a 'wet' core <code>[battery payload]</code>."
    },
    {
      "name": "barwut",
      "symbol": "|?",
      "usage": "Cores",
      "link": "/docs/reference/hoon-expressions/rune/bar.md#barwut",
      "desc": "Produce a lead trap."
    },
    {
      "name": "lus",
      "symbol": "+",
      "usage": "Arms",
      "link": "/docs/reference/hoon-expressions/rune/lus.md",
      "desc": "Runes used to define arms in a core."
    },
    {
      "name": "lusbar",
      "symbol": "+|",
      "usage": "Arms",
      "link": "/docs/reference/hoon-expressions/rune/lus.md#lusbar",
      "desc": "Chapter label."
    },
    {
      "name": "lusbuc",
      "symbol": "+$",
      "usage": "Arms",
      "link": "/docs/reference/hoon-expressions/rune/lus.md#lusbuc",
      "desc": "Produce a structure arm (type definition)."
    },
    {
      "name": "luslus",
      "symbol": "++",
      "usage": "Arms",
      "link": "/docs/reference/hoon-expressions/rune/lus.md#luslus",
      "desc": "Produce a normal arm."
    },
    {
      "name": "lustar",
      "symbol": "+*",
      "usage": "Arms",
      "link": "/docs/reference/hoon-expressions/rune/lus.md#lustar",
      "desc": "Produce a type constructor arm."
    },
    {
      "name": "col",
      "symbol": ":",
      "usage": "Cells",
      "link": "/docs/reference/hoon-expressions/rune/col.md",
      "desc": "Runes used to produce cells, which are pairs of nouns."
    },
    {
      "name": "colcab",
      "symbol": ":_",
      "usage": "Cells",
      "link": "/docs/reference/hoon-expressions/rune/col.md#colcab",
      "desc": "<code>[%clcb p=hoon q=hoon]</code>; construct a cell, inverted."
    },
    {
      "name": "colcol",
      "symbol": "::",
      "usage": "Cells",
      "link": "/docs/reference/hoon-expressions/rune/col.md#colcol",
      "desc": "Code comment."
    },
    {
      "name": "colhep",
      "symbol": ":-",
      "usage": "Cells",
      "link": "/docs/reference/hoon-expressions/rune/col.md#colhep",
      "desc": "<code>[%clhp p=hoon q=hoon]</code>: construct a cell (2-tuple)."
    },
    {
      "name": "colket",
      "symbol": ":^",
      "usage": "Cells",
      "link": "/docs/reference/hoon-expressions/rune/col.md#colket",
      "desc": "<code>[%clkt p=hoon q=hoon r=hoon s=hoon]</code>: construct a quadruple (4-tuple)."
    },
    {
      "name": "collus",
      "symbol": ":+",
      "usage": "Cells",
      "link": "/docs/reference/hoon-expressions/rune/col.md#collus",
      "desc": "<code>[%clls p=hoon q=hoon r=hoon]</code>: construct a triple (3-tuple)."
    },
    {
      "name": "colsig",
      "symbol": ":~",
      "usage": "Cells",
      "link": "/docs/reference/hoon-expressions/rune/col.md#colsig",
      "desc": "<code>[%clsg p=(list hoon)]</code>: construct a null-terminated list."
    },
    {
      "name": "coltar",
      "symbol": ":*",
      "usage": "Cells",
      "link": "/docs/reference/hoon-expressions/rune/col.md#coltar",
      "desc": "<code>[%cltr p=(list hoon)]</code>: construct an n-tuple."
    },
    {
      "name": "cen",
      "symbol": "%",
      "usage": "Calls",
      "link": "/docs/reference/hoon-expressions/rune/cen.md",
      "desc": "Runes used for making function calls in Hoon."
    },
    {
      "name": "cencab",
      "symbol": "%_",
      "usage": "Calls",
      "link": "/docs/reference/hoon-expressions/rune/cen.md#cencab",
      "desc": "Resolve a wing with changes, preserving type."
    },
    {
      "name": "cencol",
      "symbol": "%:",
      "usage": "Calls",
      "link": "/docs/reference/hoon-expressions/rune/cen.md#cencol",
      "desc": "Call a gate with many arguments."
    },
    {
      "name": "cendot",
      "symbol": "%.",
      "usage": "Calls",
      "link": "/docs/reference/hoon-expressions/rune/cen.md#cendot",
      "desc": "Call a gate (function), inverted."
    },
    {
      "name": "cenhep",
      "symbol": "%-",
      "usage": "Calls",
      "link": "/docs/reference/hoon-expressions/rune/cen.md#cenhep",
      "desc": "Call a gate (function)."
    },
    {
      "name": "cenket",
      "symbol": "%^",
      "usage": "Calls",
      "link": "/docs/reference/hoon-expressions/rune/cen.md#cenket",
      "desc": "Call gate with triple sample."
    },
    {
      "name": "cenlus",
      "symbol": "%+",
      "usage": "Calls",
      "link": "/docs/reference/hoon-expressions/rune/cen.md#cenlus",
      "desc": "Call gate with a cell sample."
    },
    {
      "name": "censig",
      "symbol": "%~",
      "usage": "Calls",
      "link": "/docs/reference/hoon-expressions/rune/cen.md#censig",
      "desc": "Evaluate an arm in a door."
    },
    {
      "name": "centar",
      "symbol": "%*",
      "usage": "Calls",
      "link": "/docs/reference/hoon-expressions/rune/cen.md#centar",
      "desc": "Evaluate an expression, then resolve a wing with changes."
    },
    {
      "name": "centis",
      "symbol": "%=",
      "usage": "Calls",
      "link": "/docs/reference/hoon-expressions/rune/cen.md#centis",
      "desc": "Resolve a wing with changes."
    },
    {
      "name": "ket",
      "symbol": "^",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md",
      "desc": "Runes that let us adjust types without violating type constraints."
    },
    {
      "name": "ketbar",
      "symbol": "^|",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md#ketbar",
      "desc": "<code>[%ktbr p=hoon]</code>: convert a gold core to an iron core (contravariant)."
    },
    {
      "name": "ketcol",
      "symbol": "^:",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md#ketcol",
      "desc": "<code>[%ktcl p=spec]</code>: 'factory' gate for type <code>p</code>."
    },
    {
      "name": "ketdot",
      "symbol": "^.",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md#ketdot",
      "desc": "<code>[%ktdt p=hoon q=hoon]</code>: typecast on value produced by passing <code>q</code> to <code>p</code>."
    },
    {
      "name": "kethep",
      "symbol": "^-",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md#kethep",
      "desc": "<code>[%kthp p=spec q=hoon]</code>: typecast by explicit type label."
    },
    {
      "name": "ketlus",
      "symbol": "^+",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md#ketlus",
      "desc": "<code>[%ktls p=hoon q=hoon]</code>: typecast by inferred type."
    },
    {
      "name": "ketpad",
      "symbol": "^&",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md#ketpad",
      "desc": "<code>[%ktpd p=hoon]</code>: convert a core to a zinc core (covariant)."
    },
    {
      "name": "ketsig",
      "symbol": "^~",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md#ketsig",
      "desc": "<code>[%ktsg p=hoon]</code>: fold constant at compile time."
    },
    {
      "name": "kettar",
      "symbol": "^*",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md#kettar",
      "desc": "<code>[%kttr p=spec]</code>: Produce example type value."
    },
    {
      "name": "kettis",
      "symbol": "^=",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md#kettis",
      "desc": "<code>[%ktts p=skin q=hoon]</code>: Bind name to a value."
    },
    {
      "name": "ketwut",
      "symbol": "^?",
      "usage": "Casts",
      "link": "/docs/reference/hoon-expressions/rune/ket.md#ketwut",
      "desc": "<code>[%ktwt p=hoon]</code>: convert any core to a lead core (bivariant)."
    },
    {
      "name": "buc",
      "symbol": "$",
      "usage": "Structures",
      "link": "/docs/reference/hoon-expressions/rune/buc.md",
      "desc": "Runes used for defining custom types."
    },
    {
      "name": "buccab",
      "symbol": "$_",
      "usage": "Structures",
      "link": "/docs/reference/hoon-expressions/rune/buc.md#buccab",
      "desc": "<code>[%bscb p=hoon]</code>: structure that normalizes to an example."
    },
    {
      "name": "buccen",
      "symbol": "$%",
      "usage": "Structures",
      "link": "/docs/reference/hoon-expressions/rune/buc.md#buccen",
      "desc": "<code>[%bscn p=(list spec)]</code>: structure which recognizes a union tagged by head atom."
    },
    {
      "name": "buccol",
      "symbol": "$:",
      "usage": "Structures",
      "link": "/docs/reference/hoon-expressions/rune/buc.md#buccol",
      "desc": "<code>[%bscl p=(list spec)]</code>: form a cell type."
    },
    {
      "name": "buchep",
      "symbol": "$-",
      "usage": "Structures",
      "link": "/docs/reference/hoon-expressions/rune/buc.md#buchep",
      "desc": "<code>[%bshp p=spec q=spec]</code>: structure that normalizes to an example gate."
    },
    {
      "name": "bucket",
      "symbol": "$^",
      "usage": "Structures",
      "link": "/docs/reference/hoon-expressions/rune/buc.md#bucket",
      "desc": "<code>[%bskt p=spec q=spec]</code>: structure which normalizes a union tagged by head depth (cell)."
    },
    {
      "name": "bucsig",
      "symbol": "$~",
      "usage": "Structures",
      "link": "/docs/reference/hoon-expressions/rune/buc.md#bucsig",
      "desc": "<code>[%bssg p=hoon q=spec]</code>: define a custom type default value"
    },
    {
      "name": "bucvat",
      "symbol": "$@",
      "usage": "Structures",
      "link": "/docs/reference/hoon-expressions/rune/buc.md#bucvat",
      "desc": "<code>[%bsvt p=spec q=spec]</code>: structure which normalizes a union tagged by head depth (atom)."
    },
    {
      "name": "buctis",
      "symbol": "$=",
      "usage": "Structures",
      "link": "/docs/reference/hoon-expressions/rune/buc.md#buctis",
      "desc": "<code>[%bsts p=skin q=spec]</code>: structure which wraps a face around another structure."
    },
    {
      "name": "bucwut",
      "symbol": "$?",
      "usage": "Structures",
      "link": "/docs/reference/hoon-expressions/rune/buc.md#bucwut",
      "desc": "<code>[%bswt p=(list spec)]</code>: form a type from a union of other types."
    },
    {
      "name": "mic",
      "symbol": ";",
      "usage": "Make",
      "link": "/docs/reference/hoon-expressions/rune/mic.md",
      "desc": "Miscellaneous useful macros."
    },
    {
      "name": "miccol",
      "symbol": ";:",
      "usage": "Make",
      "link": "/docs/reference/hoon-expressions/rune/mic.md#miccol",
      "desc": "<code>[%mccl p=hoon q=(list hoon)]</code>: call a binary function as an n-ary function."
    },
    {
      "name": "miclus",
      "symbol": ";+",
      "usage": "Make",
      "link": "/docs/reference/hoon-expressions/rune/mic.md#miclus",
      "desc": "make a single XML node (Sail)"
    },
    {
      "name": "micmic",
      "symbol": ";;",
      "usage": "Make",
      "link": "/docs/reference/hoon-expressions/rune/mic.md#micmic",
      "desc": "<code>[%mcmc p=spec q=hoon]</code>: normalize with a mold, asserting fixpoint."
    },
    {
      "name": "micfas",
      "symbol": ";/",
      "usage": "Make",
      "link": "/docs/reference/hoon-expressions/rune/mic.md#micfas",
      "desc": "<code>[%mcnt p=hoon]</code>: tape as XML element."
    },
    {
      "name": "micsig",
      "symbol": ";~",
      "usage": "Make",
      "link": "/docs/reference/hoon-expressions/rune/mic.md#micsig",
      "desc": "<code>[%mcsg p=hoon q=(list hoon)]</code>: glue a pipeline together with a"
    },
    {
      "name": "mictar",
      "symbol": ";*",
      "usage": "Make",
      "link": "/docs/reference/hoon-expressions/rune/mic.md#mictar",
      "desc": "Make a list of XML nodes from complex Hoon expression (Sail)."
    },
    {
      "name": "mictis",
      "symbol": ";=",
      "usage": "Make",
      "link": "/docs/reference/hoon-expressions/rune/mic.md#mictis",
      "desc": "Make a list of XML nodes (Sail)."
    },
    {
      "name": "sig",
      "symbol": "~",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md",
      "desc": "Runes that use Nock <code>11</code> to pass non-semantic info to the interpreter."
    },
    {
      "name": "sigban",
      "symbol": "~>",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#sigban",
      "desc": "<code>[%sgbn p=$@(term [p=term q=hoon]) q=hoon]</code>: raw hint, applied"
    },
    {
      "name": "sigbar",
      "symbol": "~|",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#sigbar",
      "desc": "<code>[%sgbr p=hoon q=hoon]</code>: tracing printf."
    },
    {
      "name": "sigbuc",
      "symbol": "~$",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#sigbuc",
      "desc": "<code>[%sgbs p=term q=hoon]</code>: profiling hit counter."
    },
    {
      "name": "sigcab",
      "symbol": "~_",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#sigcab",
      "desc": "<code>[%sgcb p=hoon q=hoon]</code>: user-formatted tracing printf."
    },
    {
      "name": "sigcen",
      "symbol": "~%",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#sigcen",
      "desc": "<code>[%sgcn p=term q=wing r=(list [term hoon]) s=hoon]</code>: jet registration."
    },
    {
      "name": "sigled",
      "symbol": "~<",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#sigled",
      "desc": "<code>[%sgld p=$@(term [p=term q=hoon]) q=hoon]</code>: raw hint, applied to product."
    },
    {
      "name": "siglus",
      "symbol": "~+",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#siglus",
      "desc": "<code>[%sgls p=hoon]</code>: cache a computation."
    },
    {
      "name": "signet",
      "symbol": "~/",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#signet",
      "desc": "<code>[%sgnt p=term q=hoon]</code>: jet registration for gate with"
    },
    {
      "name": "sigpad",
      "symbol": "~&",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#sigpad",
      "desc": "<code>[%sgpd p=hoon q=hoon]</code>: debugging printf."
    },
    {
      "name": "sigtis",
      "symbol": "~=",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#sigtis",
      "desc": "<code>[%sgts p=hoon q=hoon]</code>: detect duplicate."
    },
    {
      "name": "sigwut",
      "symbol": "~?",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#sigwut",
      "desc": "<code>[%sgwt p=hoon q=hoon r=hoon]</code>: conditional debug printf."
    },
    {
      "name": "sigzap",
      "symbol": "~!",
      "usage": "Hints",
      "link": "/docs/reference/hoon-expressions/rune/sig.md#sigzap",
      "desc": "<code>[%sgzp p=hoon q=hoon]</code>: print type on compilation fail."
    },
    {
      "name": "terminators",
      "symbol": "--,",
      "usage": "Terminators",
      "link": "/docs/reference/hoon-expressions/rune/terminators.md",
      "desc": "Runes used to terminate expressions."
    },
    {
      "name": "hephep",
      "symbol": "--",
      "usage": "Terminators",
      "link": "/docs/reference/hoon-expressions/rune/terminators.md#hephep",
      "desc": "The <code>--</code> rune is used to indicate the end of a core expression."
    },
    {
      "name": "tistis",
      "symbol": "==",
      "usage": "Terminators",
      "link": "/docs/reference/hoon-expressions/rune/terminators.md#tistis",
      "desc": "The <code>==</code> rune is used to indicate the end of a 'jogging' or 'running' series of Hoon expressions."
    }
  ]