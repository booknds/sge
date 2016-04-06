import test from 'ava';
import createContact from './contact';
import { getProp } from '../utils/helpers';

let contact;

test.beforeEach(() => {
  contact = createContact();
});

test('contact should be able to set but not get a name', t => {
  contact.name = 'Wade Wilson';
  const prop = contact.props.find(getProp('name'));

  t.true(prop.value === 'Wade Wilson');
  t.throws(contact.name);
});

test('contact should be able to set, but not get a url ', t => {
  contact.url = 'deadpool.com';
  const prop = contact.props.find(getProp('url'));

  t.true(prop.value === 'deadpool.com');
  t.throws(contact.url);

  contact.url = '';
  t.true(prop.value === null);
});

test('contact should be able to set but not get a email', t => {
  contact.email = 'deadpool@chimichangas.com';
  const prop = contact.props.find(getProp('email'));

  t.true(prop.value === 'deadpool@chimichangas.com');
  t.throws(contact.email);
});

test('contact property values should be set to null if passed in a faley value', t => {
  contact.name = '';
  contact.url = '';
  contact.email = '';

  t.true(contact.props.every(prop => prop.value === null));
});

test('contact should validate if its properties are valid', t => {
  contact.name = 'Wade Wilson';
  t.true(contact.isValid);

  contact.name = '';
  t.true(contact.isValid);
});
