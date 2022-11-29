import AST from 'apg-js/src/apg-lib/ast.js';
import Parser from 'apg-js/src/apg-lib/parser.js';

import Grammar from '../runtime-expression.cjs';
import expressionCallback from './callbacks/expression.js';
import sourceCallback from './callbacks/source.js';
import headerReferenceCallback from './callbacks/header-reference.js';
import payloadReferenceCallback from './callbacks/payload-reference.js';
import fragmentCallback from './callbacks/fragment.js';
import referenceTokenCallback from './callbacks/reference-token.js';


const grammar = new Grammar();

const parse = (str) => {
  const parser = new Parser();

  parser.ast = new AST();
  parser.ast.callbacks.expression = expressionCallback;
  parser.ast.callbacks.source = sourceCallback;
  parser.ast.callbacks['header-reference'] = headerReferenceCallback;
  parser.ast.callbacks['payload-reference'] = payloadReferenceCallback;
  parser.ast.callbacks.fragment = fragmentCallback;
  parser.ast.callbacks['reference-token'] = referenceTokenCallback;

  const result = parser.parse(grammar, 'expression', str);

  return { result, ast: parser.ast };
}

export default parse;
