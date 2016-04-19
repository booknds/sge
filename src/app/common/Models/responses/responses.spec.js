import test from 'ava';
import Responses from './responses';
import { getProperty } from '../utils/helpers';
// ----------------------------------------------
// Set up Tests
// ----------------------------------------------
let responses;

test.beforeEach(() => {
  responses = Responses();
});

// ----------------------------------------------
// Tests
// ----------------------------------------------
test('add a response object to the responses object', t => {
  const responseList = responses.getAllProps();
  t.true(responseList.length === 0);
  responses.addResponse('201');

  t.true(responses.getAllProps().length === 1);
  t.deepEqual(getProperty(responses.getAllProps(), '201').value
    .getAllProps()
    .map(prop => prop.getKey()), ['description', 'schema', 'headers', 'examples']);
});

test('remove a response object from the responses object', t => {
  responses.addResponse('201');

  t.notThrows(() => responses.removeResponse('201'));
  t.true(responses.getAllProps().length === 0);
});

test('correctly swaggerify responses objects', t => {
  responses.addResponse('200');
  getProperty(responses.getAllProps(), '200').value.setDescription('a description!');

  t.deepEqual(responses.swaggerify(), { 200: { description: 'a description!' } });
});
