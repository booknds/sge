import test from 'ava';
import Response from './response';

// ----------------------------------------------
// Set up Tests
// ----------------------------------------------
let response;

test.beforeEach(() => {
  response = Response();
});

// ----------------------------------------------
// Tests
// ----------------------------------------------
test('description is required for response to be valid', t => {
  t.false(response.isValid());
  response.setDescription('something');
  t.true(response.isValid());
});
