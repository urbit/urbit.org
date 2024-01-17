+++

title = "JSON re/parser building suite"
date = "2023-02-23"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Other"]

[extra]
image = ""
description = "JSON re/parser building suite"
reward = "2 Stars"
assignee = ["~litlep-nibbyt"]
champion = ["~lagrev-nocfep"]
grant_id = "P0245"
completed = true
canceled = false

+++

# Overview

A set of three generators which will automate a majority of the work involved in writing parsers to and from JSON. One generator will convert a noun directly to its JSON representation, one generator will produce an example hoon parser given an example input JSON, and one generator that will produce an example hoon parser given a JSON schema.



# Motivation

JSON is the most widely used format for HTTP payloads. Urbit apps which talk to existing web services must send and receive requests formatted in JSON. Additionally, apps with Javascript frontends use the Urbit HTTP API to facilitate communication between the frontend and Urbit. 



A set of generators which can automate a majority of the work involved in writing parsers to and from JSON would accelerate the pace of app development.



# Implementation

For the noun to JSON direction, the conversion would be direct: given any input noun, the generator would produce the corresponding JSON.  `~rovnys-ricfer` has completed most of a noun to json encoder. The code can be found [here](https://gist.github.com/belisarius222/d22b39ac0fece6e0680db5d60c6595c6). When complete, it will be able to take a noun and its AST and convert it to a json representation. We have identified missing encodings inside of en-dime for the following auras: `%s, %rq, %rh, %rd, %rs, %ub, %uc, %ux, %uv, %uw`. Part of this bounty will involve implementing the json encoding for the missing auras.



For the JSON to noun direction, we will implement two generators, one which accepts an example JSON and another which accepts a JSON schema. Both generators will output a cord containing an example hoon parser for the input JSON. The expectation is that the user will use this parser as a starting point for their own. The generators will produce a structurally correct parser for the target JSON. The user may have to modify the parsing rules inside each entry to get their desired result, but the structure of the parser must be correct.



To illustrate how we expect these generators to be used, we provide an example below:



Given an example json:

```

[ ~[ %o

    p

    { [p='id' q=[%s p='1234']]

      [p='name' q=[%s p='James']]

      [p='contact_number' q=[%n p='4132549899']]

    }

  ]

]

```



Or a schema:



```

{

    "$schema":"http://json-schema.org/draft-04/schema#",

    "title":"User",

    "description":"A user request json",

    "type":"object",

    "properties":{

    "id":{

    "description":"The unique identifier for a user",

    "type":"integer"

    },

    "name":{

    "description":"Name of the user",

    "type":"string"

    },

    "contact_number":{

        "type":"number"

    }

  },

  "required":[

       "id",

    "name",

    "contact_number"

  ]

}

```



The generator will produce this piece of hoon code as a cord:



```

++ req-parser-ot

%- ot:dejs-soft:format

:~ [%id so:dejs:format]

[%name so:dejs:format]

[%contact_number no:dejs:format]

==

```





# Deliverable(s)

1 Generator which can directly convert from noun to JSON.

1 Generator that can produce an example hoon parser given an example input JSON.

1 Generator that can produce an example hoon parser given a JSON schema.



# Compensation

2 Stars upon completion of the grant.
