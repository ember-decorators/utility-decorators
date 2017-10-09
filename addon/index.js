/**
 * Decorator which adds a field to the prototype of a class.
 *
 * ```js
 * class Foo {
 *   @proto bar = 123;
 * }
 *
 * let foo = new Foo();
 * console.log(foo.hasOwnProperty('bar')); // 'false'
 * console.log(Object.getPrototypeOf(foo).hasOwnProperty('bar')); // 'true'
 * ```
 */
export function proto(target, key, desc) {
  desc.value = desc.initializer.call(target);
  desc.initializer = undefined; // unset the initializer
  return desc;
}

/**
 * Decorator which merges the value of the class field with the value
 * of the field on the superclass.
 *
 * ```js
 * class Foo {
 *   baz = { prop1: 123 };
 * }
 *
 * class Bar extends Foo {
 *   @merged baz = { prop2: 456 };
 * }
 *
 * let bar = new Bar();
 * console.log(bar.baz); // { prop1: 123, prop2: 456 }
 * ```
 */
export function merged(target, key, desc) {
  const specifiedInitializer = desc.initializer;

  desc.initializer = function() {
    const merged = {};
    const originalValues = this[key];
    const valuesToMerge = specifiedInitializer();

    return Object.assign(merged, originalValues, valuesToMerge);
  }

  return desc;
}

/**
 * Decorator which concatenates the value of the class field with the value
 * of the field on the superclass.
 *
 * ```js
 * class Foo {
 *   baz = [123];
 * }
 *
 * class Bar extends Foo {
 *   @concatenated baz = [456];
 * }
 *
 * let bar = new Bar();
 * console.log(bar.baz); // [123, 456]
 * ```
 */
export function concatenated(target, key, desc) {
  const specifiedInitializer = desc.initializer;

  desc.initializer = function() {
    const valuesToConcat = specifiedInitializer();

    return (this[key] || []).concat(valuesToConcat);
  }

  return desc;
}
