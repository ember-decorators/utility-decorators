import { module, test } from 'qunit';
import { proto, merged } from 'utility-decorators';

module('Unit | @merged');

test('merges class properties on instance properly', function(assert) {
  class Foo {
    baz = { prop1: 123 };
  }

  class Bar extends Foo {
    @merged baz = { prop2: 456 };
  }

  let foo = new Foo();
  let bar = new Bar();

  let anotherBar = new Bar();
  anotherBar.baz.prop3 = 789;

  assert.ok(foo.hasOwnProperty('baz'), 'props exist on superclass instance');
  assert.deepEqual(foo.baz, { prop1: 123 }, 'superclass props are correct');

  assert.ok(bar.hasOwnProperty('baz'), 'props exist on subclass instance');
  assert.deepEqual(bar.baz, { prop1: 123, prop2: 456 }, 'subclass props are correct');

  assert.deepEqual(anotherBar.baz, { prop1: 123, prop2: 456, prop3: 789}, 'each instance has its own state');
});

test('works correctly with @proto decorator', function(assert) {
  class Foo {
    @proto baz = { prop1: 123 };
  }

  class Bar extends Foo {
    @proto @merged baz = { prop2: 456 };
  }

  let foo = new Foo();
  let bar = new Bar();

  assert.ok(Object.getPrototypeOf(foo).hasOwnProperty('baz'), 'props exist on superclass prototype');
  assert.deepEqual(foo.baz, { prop1: 123 }, 'superclass props are correct');

  assert.ok(Object.getPrototypeOf(bar).hasOwnProperty('baz'), 'props exist on subclass prototype');
  assert.deepEqual(bar.baz, { prop1: 123, prop2: 456 }, 'subclass props are correct');
});
