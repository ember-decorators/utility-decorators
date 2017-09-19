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
  desc.value = desc.initializer();
  desc.initializer = undefined; // unset the initializer
  return desc;
}
