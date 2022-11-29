import {assert} from 'chai';

import {parse} from '../src/index.js'

describe('parse', function () {
  context('given valid source string', function () {
    context('$message.payload#/user/id', function () {
      specify.only('should parse and translate', function () {
        const parseResult = parse('$message.payload#/user/id');

        const parts = [];
        parseResult.ast.translate(parts);

        console.log(parseResult.ast.toXml());

        assert.isTrue(parseResult.result.success);
        assert.deepEqual(parts, [
          ['expression', '$message.payload#/user/id'],
          ['source', 'payload#/user/id'],
          ['payload-reference', 'payload#/user/id'],
          ['fragment', '/user/id'],
          ['reference-token', 'user'],
          ['reference-token', 'id']
        ]);
      });
    });

    context('$message.payload#/messageId', function () {
      specify('should parse and translate', function () {
        const parseResult = parse('$message.payload#/messageId');

        const parts = [];
        parseResult.ast.translate(parts);

        assert.isTrue(parseResult.result.success);
        assert.deepEqual(parts, [
          ['expression', '$message.payload#/messageId'],
          ['source', 'payload#/messageId'],
          ['payload-reference', 'payload#/messageId'],
          ['fragment', '/messageId'],
          ['reference-token', 'messageId'],
        ]);
      });
    });

    context('$message.header#/correlationId', function () {
      specify('should parse and translate', function () {
        const parseResult = parse('$message.header#/correlationId');

        const parts = [];
        parseResult.ast.translate(parts);

        assert.isTrue(parseResult.result.success);
        assert.deepEqual(parts, [
          ['expression', '$message.header#/correlationId'],
          ['source', 'header#/correlationId'],
          ['header-reference', 'header#/correlationId'],
          ['fragment', '/correlationId'],
          ['reference-token', 'correlationId'],
        ]);
      });
    });

    context('$message.header#/MQMD/CorrelId', function () {
      specify('should parse and translate', function () {
        const parseResult = parse('$message.header#/MQMD/CorrelId');

        const parts = [];
        parseResult.ast.translate(parts);

        assert.isTrue(parseResult.result.success);
        assert.deepEqual(parts, [
          ['expression', '$message.header#/MQMD/CorrelId'],
          ['source', 'header#/MQMD/CorrelId'],
          ['header-reference', 'header#/MQMD/CorrelId'],
          ['fragment', '/MQMD/CorrelId'],
          ['reference-token', 'MQMD'],
          ['reference-token', 'CorrelId'],
        ]);
      });
    });
  });

  context('given invalid source string', function () {
    context('empty string', function () {
      specify('should fail parsing', function () {
        const parseResult = parse('');

        const parts = [];
        parseResult.ast.translate(parts);

        assert.isFalse(parseResult.result.success);
        assert.lengthOf(parts, 0);
      });
    });

    context('1', function () {
      specify('should fail parsing', function () {
        const parseResult = parse('1');

        const parts = [];
        parseResult.ast.translate(parts);

        assert.isFalse(parseResult.result.success);
        assert.lengthOf(parts, 0);
      });
    });

    context('nonsensical string', function () {
      specify('should fail parsing', function () {
        const parseResult = parse('nonsensical string');

        const parts = [];
        parseResult.ast.translate(parts);

        assert.isFalse(parseResult.result.success);
        assert.lengthOf(parts, 0);
      });
    });
  });

  context('given non-string input', function () {
    specify('should throw error', function () {
      assert.throws(() => parse(1), Error);
      assert.throws(() => parse(null), Error);
      assert.throws(() => parse(undefined), Error);
    });
  });
});
