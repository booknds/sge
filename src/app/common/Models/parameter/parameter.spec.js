import test from 'ava';
import createParameter from './parameter.js';

test.todo(`schema should be a property if 'in' === 'body'`);
test.todo(`'name' and 'in' properties are required`);
test.todo(`'schema is not a property if 'in' !== 'body', other properties are`);
test.todo(`'type property is required if 'in' === 'body'`);
test.todo(`'items' object is required if 'type === 'array'`);

