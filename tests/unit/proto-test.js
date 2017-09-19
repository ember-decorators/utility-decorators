import { module, test } from 'qunit';
import { proto } from 'utility-decorators';

module('Unit | @proto');

test('adds property to class prototype', function(assert) {
  class Foo {
    @proto bar = 123;
  }

  let foo = new Foo();

  assert.notOk(foo.hasOwnProperty('bar'), 'property is not added to the instance');
  assert.ok(Object.getPrototypeOf(foo).hasOwnProperty('bar'), 'property is added to the prototype');
  assert.equal(foo.bar, 123, 'property has the correct value');
});
