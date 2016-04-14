import test from 'ava';
import createContact from './contact';
import { getProperty } from '../utils/helpers';

let contact;

test.beforeEach(() => {
  contact = createContact();
});

test('contact should be able to set but not get a name', t => {
  contact.setProperty('name', 'Wade Wilson');
  const prop = getProperty(contact.getAllProps(), 'name');

  t.true(prop.value === 'Wade Wilson');
  t.throws(contact.name);
});

test('contact should be able to set, but not get a url ', t => {
  contact.setProperty('url', 'deadpool.com');
  const prop = getProperty(contact.getAllProps(), 'url');

  t.true(prop.value === 'deadpool.com');
  t.throws(contact.url);

  contact.setProperty('url', '');
  t.true(typeof prop.value === 'undefined');
});

test('contact should be able to set but not get a email', t => {
  contact.setProperty('email', 'deadpool@chimichangas.com');
  const prop = getProperty(contact.getAllProps(), 'email');

  t.true(prop.value === 'deadpool@chimichangas.com');
  t.throws(contact.email);
});

test('contact property values should be set to null if passed in a faley value', t => {
  contact.setProperty('name', '');
  contact.setProperty('url', '');
  contact.setProperty('email', '');

  t.true(contact.getAllProps().every(prop => typeof prop.value === 'undefined'));
});

test('contact should validate if its properties are valid', t => {
  contact.setProperty('name', 'Wade Wilson');
  t.true(contact.isValid());

  contact.setProperty('name', '');
  t.true(contact.isValid());
});
