import { module, test } from 'qunit';
import { proto, concatenated } from 'utility-decorators';

module('Unit | @concatenated');

test('concatenates class properties on instance properly', function(assert) {
  class Foo {
    baz = [123];
  }

  class Bar extends Foo {
    @concatenated baz = [456];
  }

  let foo = new Foo();
  let bar = new Bar();

  let anotherBar = new Bar();
  anotherBar.baz.push(789);

  assert.ok(foo.hasOwnProperty('baz'), 'props exist on superclass instance');
  assert.deepEqual(foo.baz, [123], 'superclass props are correct');

  assert.ok(bar.hasOwnProperty('baz'), 'props exist on subclass instance');
  assert.deepEqual(bar.baz, [123, 456], 'subclass props are correct');

  assert.deepEqual(anotherBar.baz, [123, 456, 789], 'each instance has its own state');
});

test('works correctly with @proto decorator', function(assert) {
  class Foo {
    @proto baz = [123];
  }

  class Bar extends Foo {
    @proto @concatenated baz = [456];
  }

  let foo = new Foo();
  let bar = new Bar();

  assert.ok(Object.getPrototypeOf(foo).hasOwnProperty('baz'), 'props exist on superclass prototype');
  assert.deepEqual(foo.baz, [123], 'superclass props are correct');

  assert.ok(Object.getPrototypeOf(bar).hasOwnProperty('baz'), 'props exist on subclass prototype');
  assert.deepEqual(bar.baz, [123, 456], 'subclass props are correct');
});
