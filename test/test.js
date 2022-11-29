import { assert } from 'chai';

import { test } from '../src/index.js'

describe('test', function () {
  it('should detect expression', function () {
    assert.isTrue(test('$message.payload#/user/id'));
    assert.isTrue(test('$message.payload#/messageId'));
    assert.isTrue(test('$message.header#/correlationId'));
    assert.isTrue(test('$message.header#/MQMD/CorrelId'));
  });

  it('should not detect expression', function () {
    assert.isFalse(test(''));
    assert.isFalse(test('1'));
    assert.isFalse(test('nonsensical string'));
    assert.isFalse(test('inside$message.payload#/user/idstring'));
    assert.isFalse(test('inside $message.payload#/user/id string'));
    assert.isFalse(test(1));
    assert.isFalse(test(null));
    assert.isFalse(test(undefined));
  });
});
