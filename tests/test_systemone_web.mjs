import test from 'node:test';
import assert from 'node:assert/strict';
import {makeRequest} from '../examples/systemone/logic.mjs';

test('builds a request from manually entered JSON state and questions', () => {
  assert.deepEqual(makeRequest('"hello"', '{"q":{"type":"noul","instructions":"Is it a greeting?"}}'), {
    state: 'hello',
    questions: {q: {type: 'noul', instructions: 'Is it a greeting?'}},
  });
  assert.deepEqual(makeRequest('{"text":"hello"}', '{"q":{}}').state, {text: 'hello'});
});

test('rejects invalid JSON and empty or non-object questions', () => {
  assert.throws(() => makeRequest('{', '{}'), /state/);
  assert.throws(() => makeRequest('"hello"', '{'), /questions/);
  for (const questions of ['null', '[]', '"question"', '{}']) {
    assert.throws(() => makeRequest('"hello"', questions), /questions/);
  }
});
