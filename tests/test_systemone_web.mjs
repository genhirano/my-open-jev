import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {makeRequest} from '../examples/systemone/logic.mjs';

test('page starts with the curl example ready to send without editing', () => {
  const html = readFileSync(new URL('../examples/systemone/index.html', import.meta.url), 'utf8');
  const state = html.match(/<textarea id="state"[^>]*>([\s\S]*?)<\/textarea>/)[1];
  const questions = html.match(/<textarea id="questions"[^>]*>([\s\S]*?)<\/textarea>/)[1];
  const example = JSON.parse(readFileSync(new URL('../configs/example-request.json', import.meta.url), 'utf8'));
  assert.deepEqual(makeRequest(state, questions), example);
  assert.match(html, /id="endpoint"[^>]*value="\/v1\/systemone"/);
});

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
