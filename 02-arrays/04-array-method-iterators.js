/**
 * File: 05-array-methods-deep-dive.js
 * Description: Deep dive tutorial on essential JavaScript array methods:
 * forEach, map, filter, find, and reduce.  Explains their purpose,
 * syntax, usage, and differences.
 * Author: AI Assistant
 * Date: 2025-05-19
 */

// ============================
// 1. Array.prototype.forEach()
// ============================

/**
 * **Array.prototype.forEach()**
 * - Executes a provided function once for each element in the array.
 * - It's a higher-order function that takes a callback function as an argument.
 * - **Does not** create a new array; it simply iterates over the existing one.
 * - Returns `undefined`.
 * - Use Cases: Iterating over an array to perform an action on each element
 * (e.g., logging, updating DOM, triggering side effects).
 *
 * **Syntax:**
 * array.forEach(callback(element, index, array), thisArg);
 *
 * - `callback`:  The function to execute for each element.
 * - `element`:  The current element being processed in the array.
 * - `index` (optional): The index of the current element.
 * - `array` (optional): The array `forEach()` was called on.
 * - `thisArg` (optional):  A value to use as `this` when executing the callback.
 */

// Example 1: Using forEach to log each element
const colors = ["red", "green", "blue"];
colors.forEach(function (color) {
  console.log(color);
});
// Output:
// red
// green
// blue

// Example 2: forEach with index
colors.forEach((color, index) => {
  console.log(`Color at index ${index}: ${color}`);
});
// Output:
// Color at index 0: red
// Color at index 1: green
// Color at index 2: blue

// ============================
// 2. Array.prototype.map()
// ============================

/**
 * **Array.prototype.map()**
 * - Creates a **new array** populated with the results of calling a provided
 * function on every element in the calling array.
 * - It's a higher-order function.
 * - Does not modify the original array.
 * - Returns a **new array** of the same length as the original.
 * - Use Cases: Transforming the elements of an array (e.g., converting strings
 * to uppercase, doubling numbers, extracting properties from objects).
 *
 * **Syntax:**
 * array.map(callback(element, index, array), thisArg);
 *
 * - Parameters are the same as for `forEach()`.
 */

// Example 3: Using map to double numbers
const numbers = [1, 2, 3];
const doubledNumbers = numbers.map(function (number) {
  return number * 2;
});
console.log(doubledNumbers); // Output: [2, 4, 6]
console.log(numbers); // Output: [1, 2, 3] (original array is unchanged)

// Example 4: Using map to extract names from an array of objects
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const names = users.map((user) => user.name);
console.log(names); // Output: ["Alice", "Bob", "Charlie"]

// ============================
// 3. Array.prototype.filter()
// ============================

/**
 * **Array.prototype.filter()**
 * - Creates a **new array** containing all elements from the original array
 * that pass the test implemented by the provided function.
 * - It's a higher-order function.
 * - Does not modify the original array.
 * - Returns a **new array** that may be shorter than the original.
 * - Use Cases: Selecting elements from an array based on a condition
 * (e.g., filtering even numbers, finding users with a specific role).
 *
 * **Syntax:**
 * array.filter(callback(element, index, array), thisArg);
 *
 * - Parameters are the same as for `forEach()`.  The callback should return
 * a boolean value:
 * -  `true`:  The element is included in the new array.
 * -  `false`: The element is excluded.
 */

// Example 5: Using filter to get even numbers
const numbers2 = [1, 2, 3, 4, 5, 6];
const evenNumbers2 = numbers2.filter((number) => number % 2 === 0);
console.log(evenNumbers2); // Output: [2, 4, 6]
console.log(numbers2); // Output: [1, 2, 3, 4, 5, 6] (original array unchanged)

// Example 6: Using filter to find users with a specific role
const users2 = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "admin" },
];
const admins = users2.filter((user) => user.role === "admin");
console.log(admins);
// Output:
// [
//   { id: 1, name: "Alice", role: "admin" },
//   { id: 3, name: "Charlie", role: "admin" },
// ]

// ============================
// 4. Array.prototype.find()
// ============================

/**
 * **Array.prototype.find()**
 * - Returns the **value** of the **first** element in the array that satisfies the
 * provided testing function.  Otherwise, it returns `undefined`.
 * - It's a higher-order function.
 * - Does not modify the original array.
 * - Returns a single value (or undefined).
 * - Use Cases: Finding the first element in an array that matches a condition
 * (e.g., finding a user by ID).
 *
 * **Syntax:**
 * array.find(callback(element, index, array), thisArg);
 *
 * - Parameters are the same as for `forEach()`. The callback should return a boolean.
 */

// Example 7: Using find to find a user by ID
const users3 = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const userWithId2 = users3.find((user) => user.id === 2);
console.log(userWithId2); // Output: { id: 2, name: "Bob" }

const userWithId4 = users3.find((user) => user.id === 4);
console.log(userWithId4); // Output: undefined

// ============================
// 5. Array.prototype.reduce()
// ============================

/**
 * **Array.prototype.reduce()**
 * - Executes a reducer function (provided by you) on each element of the array,
 * resulting in a single output value.
 * - It's a higher-order function.
 * - Does not modify the original array.
 * - Returns a single value.
 * - Use Cases:  "Reducing" an array to a single value (e.g., calculating the sum
 * of elements, concatenating strings, grouping objects).
 *
 * **Syntax:**
 * array.reduce(callback(accumulator, currentValue, index, array), initialValue);
 *
 * - `callback`:  The reducer function.
 * - `accumulator`: The accumulated value previously returned in the last invocation
 * of the callback—or `initialValue`, if supplied.
 * - `currentValue`: The current element being processed in the array.
 * - `index` (optional): The index of the current element.
 * - `array` (optional): The array `reduce()` was called on.
 * - `initialValue` (optional):  A value to use as the first argument to the first
 * call of the callback. If not provided, the first element of the array is used
 * as the initial accumulator, and the iteration starts from the second element.
 */

// Example 8: Using reduce to calculate the sum of numbers
const numbers3 = [1, 2, 3, 4];
const sum2 = numbers3.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(sum2); // Output: 10

// Example 9: Using reduce to concatenate strings
const words = ["Hello", " ", "World", "!"];
const greeting = words.reduce((acc, word) => acc + word, "");
console.log(greeting); // Output: "Hello World!"

// Example 10: Using reduce to group objects by a property
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
];
const groupedByAge = people.reduce((acc, person) => {
  const key = person.age;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(person);
  return acc;
}, {});
console.log(groupedByAge);
/* Output:
{
  "25": [
    { name: "Alice", age: 25 },
    { name: "Charlie", age: 25 }
  ],
  "30": [
    { name: "Bob", age: 30 }
  ]
}
*/
