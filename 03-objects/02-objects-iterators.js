/**
 * File: 02-object-iteration.js
 * Description:  Comprehensive guide to iterating and looping through JavaScript objects,
 * covering various methods, their nuances, and best practices.
 * Author: Unais Shaikh
 * Date: 2025-05-19
 */

// =========================================================================
// 1. Introduction to Object Iteration
// =========================================================================

/**
 * **Object Iteration:**
 * -  Objects in JavaScript are collections of key-value pairs.
 * -  Unlike arrays, objects are not inherently ordered.  The order of properties
 * might appear consistent in some engines, but it's not guaranteed by the ECMAScript
 * specification prior to ES2015.  ES2015 introduced a defined order for property
 * enumeration (insertion order for integer indices, then creation order for other string keys).
 * -  Therefore, iterating through an object involves accessing its properties
 * (keys) and their corresponding values.
 * -  JavaScript provides several ways to iterate through object properties, each with
 * its own characteristics and use cases.
 */

// =========================================================================
// 2. The `for...in` Loop: Traditional Object Iteration
// =========================================================================

/**
 * **The `for...in` Loop:**
 * -  The `for...in` loop is the traditional way to iterate over the enumerable properties
 * of an object.
 * -  It iterates over the *keys* (property names) of the object.
 * -  It traverses all enumerable properties, including those inherited from the prototype chain.
 *
 * **Syntax:**
 * ```javascript
 * for (const key in object) {
 * // Code to execute for each property
 * // key: the name of the property (string)
 * // object[key]: the value of the property
 * }
 * ```
 *
 * **Important Notes:**
 * -  It's generally recommended to use `hasOwnProperty()` to filter out inherited properties
 * when you only want to iterate over the object's own properties.
 * -  The order of enumeration is not guaranteed across all JavaScript engines for older versions,
 * but ES2015 and later maintain property insertion order for string keys, and numeric indices are ordered.
 */

// Example 1: Iterating over object properties with for...in
const myObject = { a: 1, b: 2, c: 3, d: 4 };

console.log("1. Iterating with for...in:");
for (const key in myObject) {
  console.log(`  ${key}: ${myObject[key]}`);
}

// Example 2: Using for...in with hasOwnProperty()
const myObject2 = { a: 1, b: 2, c: 3, d: 4 };
// Add a property to the prototype to demonstrate inheritance
Object.prototype.inheritedProperty = 5;

console.log("2. Iterating with for...in and hasOwnProperty():");
for (const key in myObject2) {
  if (myObject2.hasOwnProperty(key)) {
    console.log(`  ${key}: ${myObject2[key]}`);
  }
}
delete Object.prototype.inheritedProperty; //clean up

// =========================================================================
// 3. Object.keys(), Object.values(), and Object.entries(): Modern Iteration
// =========================================================================

/**
 * **Object.keys(), Object.values(), Object.entries():**
 * -  These static methods provide more modern and often preferred ways to iterate over object properties.
 * -  They return arrays, which can then be iterated using standard array iteration methods
 * (e.g., `for...of`, `forEach()`, `map()`, etc.).
 * -  They only iterate over the object's own enumerable properties (not inherited ones).
 *
 * **3.1. Object.keys(obj):**
 * -  Returns an array of the object's property names (keys).
 *
 * **3.2. Object.values(obj):**
 * -  Returns an array of the object's property values.
 *
 * **3.3. Object.entries(obj):**
 * -  Returns an array of key-value pairs, where each pair is represented as a two-element array `[key, value]`.
 */

const myObject3 = { a: 1, b: 2, c: 3 };

// Example 3: Iterating with Object.keys() and for...of
console.log("3.1 Iterating with Object.keys() and for...of:");
for (const key of Object.keys(myObject3)) {
  console.log(`  ${key}: ${myObject3[key]}`);
}

// Example 4: Iterating with Object.values() and forEach()
console.log("3.2 Iterating with Object.values() and forEach():");
Object.values(myObject3).forEach((value) => {
  console.log(`  Value: ${value}`);
});

// Example 5: Iterating with Object.entries() and destructuring
console.log("3.3 Iterating with Object.entries() and destructuring:");
for (const [key, value] of Object.entries(myObject3)) {
  console.log(`  ${key}: ${value}`);
}

// =========================================================================
// 4. Using Iterators and the `for...of` Loop with Objects
// =========================================================================

/**
 * **Iterators and the `for...of` Loop:**
 * -  The `for...of` loop is designed to iterate over iterable objects.
 * -  Standard JavaScript objects are *not* iterable by default.
 * -  However, you can make an object iterable by implementing the **Iterable Protocol**
 * (defining a `Symbol.iterator` method).
 * -  This allows you to use the `for...of` loop with your custom objects.
 */

// Example 6: Making an object iterable and using for...of
const myIterableObject = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function* () {
    // Generator function as the iterator
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        yield [key, this[key]]; // Yield key-value pairs
      }
    }
  },
};

console.log("4. Iterating with a custom iterator and for...of:");
for (const [key, value] of myIterableObject) {
  console.log(`  ${key}: ${value}`);
}

// =========================================================================
// 5. Choosing the Right Method
// =========================================================================

/**
 * **Choosing the Right Method:**
 * -  The best way to iterate through an object depends on your specific needs:
 *
 * -  **`for...in`:**
 * -   Use when you need to iterate over all enumerable properties (including those from the prototype chain), but remember to use `hasOwnProperty()` to filter if needed.
 * -   Less commonly used in modern JavaScript for simple object iteration.
 * -   **`Object.keys()`:**
 * -   Use when you need an array of the object's keys and want to iterate over them.
 * -   Often used with `for...of` or array methods like `forEach()`.
 * -   **`Object.values()`:**
 * -   Use when you need an array of the object's values and want to iterate over them.
 * -   Useful when you only care about the values and not the keys.
 * -   **`Object.entries()`:**
 * -   Use when you need an array of key-value pairs and want to access both keys and values during iteration.
 * -   Provides the most comprehensive way to iterate.
 * -   Excellent for use with `for...of` and destructuring.
 * -   **Custom Iterators:**
 * -  Use when you need fine-grained control over the iteration process or when you're working with custom data structures.
 */

// =========================================================================
// 6. Iteration Order
// =========================================================================
/**
 * **Iteration Order**
 * -  The order in which properties are iterated over has evolved in JavaScript:
 * -   **Pre-ES2015:** The order of property enumeration was not guaranteed across different JavaScript engines.
 * -   **ES2015 and later:**
 * -   Integer-indexed properties (array indices) are iterated in ascending numeric order.
 * -   String properties are iterated in the order in which they were added to the object.
 * -   Symbol properties are iterated in the order in which they were added.
 * -   `Object.getOwnPropertyNames()` returns an array of all properties, both enumerable and non-enumerable, of an object. The order of the returned array is: first, the numeric keys in ascending order, then the string keys in the order of their insertion, and lastly the Symbol keys in the order of their insertion.
 */

// =========================================================================
// 7. Prototype Chain and Iteration
// =========================================================================

/**
 * **Prototype Chain and Iteration:**
 * -  JavaScript objects inherit properties from their prototypes.
 * -  The `for...in` loop traverses the entire prototype chain, meaning it iterates over inherited properties as well.
 * -  `Object.keys()`, `Object.values()`, and `Object.entries()` only iterate over the object's own properties; they do not include inherited properties.
 * -  When using `for...in`, it's often necessary to use `hasOwnProperty()` to filter out inherited properties and only process the object's own properties.
 */

function MyObject(a, b) {
  this.a = a;
  this.b = b;
}

MyObject.prototype.inheritedProp = "inherited";

const instance = new MyObject(1, 2);

console.log("Prototype chain example");
for (let key in instance) {
  console.log(key, instance[key]); // a, 1, b, 2, inheritedProp, "inherited"
}

for (let key of Object.keys(instance)) {
  console.log(key, instance[key]); // a 1, b 2
}
