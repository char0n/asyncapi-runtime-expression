# asyncapi-runtime-expression

[Runtime Expressions](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#runtimeExpression) allow values to be defined based on information that will be available within the message.
This mechanism is used by [Correlation ID Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#correlationIdObject) of [AsyncAPI specification](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md).

`asyncapi-runtime-expression` is a **parser** and **validator** for AsyncAPI Runtime Expressions. It supports
Runtime Expressions defined in following AsyncAPI specification versions:

- [AsynCAPI 2.0.0](https://www.asyncapi.com/docs/reference/specification/v2.0.0#runtimeExpression)
- [AsynCAPI 2.1.0](https://www.asyncapi.com/docs/reference/specification/v2.1.0#runtimeExpression)
- [AsyncAPI 2.2.0](https://www.asyncapi.com/docs/reference/specification/v2.2.0#runtimeExpressionn)
- [AsyncAPI 2.3.0](https://www.asyncapi.com/docs/reference/specification/v2.3.0#runtimeExpression)
- [AsyncAPI 2.4.0](https://www.asyncapi.com/docs/reference/specification/v2.4.0#runtimeExpression)
- [AsyncAPI 2.5.0](https://www.asyncapi.com/docs/reference/specification/v2.5.0#runtimeExpression)
- [AsyncAPI 2.6.0](https://www.asyncapi.com/docs/reference/specification/v2.6.0#runtimeExpression)

## Table of Contents

- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Parsing](#parsing)
    - [Validation](#validation)
    - [Grammar](#grammar)
- [More about AsyncAPI runtime expressions](#more-about-asyncapi-runtime-expressions)
- [License](#license)
- [Software Bill Of Materials (SBOM)](#software-bill-of-materials-sbom)


## Getting started

### Installation

You can install `asyncapi-runtime-expression` using `npm`:

```sh
 $ npm install asyncapi-runtime-expression
```

Given that `asyncapi-runtime-expression` is a [pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
you can also install it directly from GitHub.

```sh
 $ npm install github:char0n/asyncapi-runtime-expression
```

### Usage

`asyncapi-runtime-expression` currently supports **parsing** and **validation**.
Both parser and validator are based on a superset of [ABNF](https://www.rfc-editor.org/rfc/rfc5234) ([SABNF](https://cs.github.com/ldthomas/apg-js2/blob/master/SABNF.md))
and use [apg-js](https://github.com/ldthomas/apg-js) parser generator.

#### Parsing

Parsing a Runtime Expression is as simple as importing the **parse** function
and calling it.

```js
import { parse } from 'asyncapi-runtime-expression';

const parseResult = parse('$message.payload#/user/id');
```

**parseResult** variable has the following shape:

```
{
  result: {
    success: true,
    state: 101,
    length: 22,
    matched: 22,
    maxMatched: 22,
    maxTreeDepth: 14,
    nodeHits: 152,
    inputLength: 22,
    subBegin: 0,
    subEnd: 22,
    subLength: 22
  },
  ast: exportsAst {
    callbacks: [
      expression: [Function: expression],
      source: [Function: source],
      'payload-reference': [Function: payloadReference],
      fragment': [Function: fragment],
      'reference-token': [Function: referenceToken],
    ],
    astObject: 'astObject',
    init: [Function: init],
    ruleDefined: [Function: ruleDefined],
    udtDefined: [Function: udtDefined],
    down: [Function: down],
    up: [Function: up],
    translate: [Function: translate],
    setLength: [Function: setLength],
    getLength: [Function: getLength],
    toXml: [Function: toSml],
    phrases: [Function: phrases]
  }
}
```

###### Interpreting AST as list of entries

```js
import { parse } from 'asyncapi-runtime-expression';

const parseResult = parse('$message.payload#/user/id');
const parts = [];

parseResult.ast.translate(parts);
```

After running the above code, **parts** variable has the following shape:

```js
[
  ['expression', '$message.payload#/user/id'],
  ['source', 'payload#/user/id'],
  ['payload-reference', 'payload#/user/id'],
  ['fragment', '/user/id'],
  ['reference-token', 'user'],
  ['reference-token', 'id']
]
```

###### Interpreting AST as XML

```js
import { parse } from 'asyncapi-runtime-expression';

const parseResult = parse('$message.payload#/user/id');
const xml = parseResult.ast.toXml();
```

After running the above code, **xml** variable has the following content:

```xml
<?xml version="1.0" encoding="utf-8"?>
<root nodes="6" characters="25">
  <!-- input string, decimal integer character codes -->
  36,109,101,115,115,97,103,101,46,112,97,121,108,111,97,100,35,47,117,115,101,114,47,105,100
  <node name="expression" index="0" length="25">
    36,109,101,115,115,97,103,101,46,112,97,121,108,111,97,100,35,47,117,115,101,114,47,105,100
    <node name="source" index="9" length="16">
      112,97,121,108,111,97,100,35,47,117,115,101,114,47,105,100
      <node name="payload-reference" index="9" length="16">
        112,97,121,108,111,97,100,35,47,117,115,101,114,47,105,100
        <node name="fragment" index="17" length="8">
          47,117,115,101,114,47,105,100
          <node name="reference-token" index="18" length="4">
            117,115,101,114
          </node><!-- name="reference-token" -->
          <node name="reference-token" index="23" length="2">
            105,100
          </node><!-- name="reference-token" -->
        </node><!-- name="fragment" -->
      </node><!-- name="payload-reference" -->
    </node><!-- name="source" -->
  </node><!-- name="expression" -->
</root>
```

> NOTE: AST can also be traversed in classical way using [depth first traversal](https://www.tutorialspoint.com/data_structures_algorithms/depth_first_traversal.htm). For more information about this option please refer to [apg-js](https://github.com/ldthomas/apg-js) and [apg-js-examples](https://github.com/ldthomas/apg-js-examples).

#### Validation

Validating a Runtime Expression is as simple as importing the **test** function
and calling it.

```js
import { test } from 'asyncapi-runtime-expression';

test('$message.payload#/user/id'); // => true
test('nonsensical string'); // => false
```

#### Grammar

New grammar instance can be created in following way:

```js
import { Grammar } from 'asyncapi-runtime-expression';

const grammar = new Grammar();
```

To obtain original ABNF (SABNF) grammar as a string:

```js
import { Grammar } from 'asyncapi-runtime-expression';

const grammar = new Grammar();

grammar.toString();
// or
String(grammar);
```

## More about AsyncAPI runtime expressions

The runtime expression is defined by the following [ABNF](https://tools.ietf.org/html/rfc5234) syntax

```abnf
expression = ( "$message" "." source )
source = ( header-reference | payload-reference )
header-reference = "header" ["#" fragment]
payload-reference = "payload" ["#" fragment]
fragment = a JSON Pointer [RFC 6901](https://tools.ietf.org/html/rfc6901)
```



The table below provides examples of runtime expressions and examples of their use in a value:

##### Examples

Source Location | Example expression  | Notes
---|:---|:---|
Message Header Property | `$message.header#/MQMD/CorrelId` | Correlation ID is set using the `CorrelId` value from the `MQMD` header.
Message Payload Property | `$message.payload#/messageId` | Correlation ID is set using the `messageId` value from the message payload.

Runtime expressions preserve the type of the referenced value.

## License

`asyncapi-runtime-expression` is licensed under [Apache 2.0 license](https://github.com/char0n/asyncapi-runtime-expression/blob/main/LICENSE).
`asyncapi-runtime-expression` comes with an explicit [NOTICE](https://github.com/char0n/asyncapi-runtime-expression/blob/main/NOTICE) file
containing additional legal notices and information.

## Software Bill Of Materials (SBOM)

Software Bill Of materials is available in [sbom.spdx.yaml](https://github.com/char0n/asyncapi-runtime-expression/blob/main/sbom.spdx.yaml) using [SPDX](https://spdx.dev/) language.
