import test from 'ava';
import Operation from './operation';
import { getProperty } from '../utils/helpers';

// ----------------------------------------------
// Set up Tests
// ----------------------------------------------
let operation;

test.beforeEach(() => {
  operation = Operation();
});

// ----------------------------------------------
// Tests
// ----------------------------------------------
test('add / remove elements from tags array', t => {
  operation.addTagElement('Billy');
  t.true(getProperty(operation.getAllProps(), 'tags').value.indexOf('Billy') > -1);

  operation.removeTagElement('Billy');
  t.true(getProperty(operation.getAllProps(), 'tags').value.indexOf('Billy') === -1);
});

test('add / remove elements from consumes array', t => {
  operation.addConsumesElement('Jason');
  t.true(getProperty(operation.getAllProps(), 'consumes').value.indexOf('Jason') > -1);

  operation.removeConsumesElement('Jason');
  t.true(getProperty(operation.getAllProps(), 'consumes').value.indexOf('Jason') === -1);
});

test('add / remove elements from produces array', t => {
  operation.addProducesElement('Kimberly');
  t.true(getProperty(operation.getAllProps(), 'produces').value.indexOf('Kimberly') > -1);

  operation.removeProducesElement('Kimberly');
  t.true(getProperty(operation.getAllProps(), 'produces').value.indexOf('Kimberly') === -1);
});

test('add / remove elements from schemes array', t => {
  operation.addSchemesElement('Tommy');
  t.true(getProperty(operation.getAllProps(), 'schemes').value.indexOf('Tommy') > -1);

  operation.removeSchemesElement('Tommy');
  t.true(getProperty(operation.getAllProps(), 'schemes').value.indexOf('Tommy') === -1);
});

test('responses object is required to not be empty for an operation object to be valid', t => {
  t.false(operation.isValid());

  const responsesProperty = getProperty(operation.getAllProps(), 'responses').value;
  responsesProperty.addResponse('201');
  const response = getProperty(responsesProperty.getAllProps(), '201').value;
  response.setDescription('some thing awesome');
  t.true(operation.isValid());
});

test('parameters can only have one body parameter', t => {
  operation.addParametersElement({ type: 'parameter', objectData: { name: 'hi', in: 'body' } });
  const parameter = getProperty(operation.getAllProps(), 'parameters').value[0];
  parameter.addObjectProp('schema');
  const schema = getProperty(parameter.getAllProps(), 'schema').value;
  schema.setType('string');
  t.true(parameter.isValid());

  operation.addParametersElement({ type: 'parameter', objectData: { name: 'Zack', in: 'body' } });
  t.false(getProperty(operation.getAllProps(), 'parameters').isValid());
});
