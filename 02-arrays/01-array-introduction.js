/**
 * File: 01-array-introduction.js
 * Description: Deep dive tutorial on JavaScript arrays including declaration, methods, iteration, multidimensional arrays, and best practices.
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// ============================
// 1. Array Declaration and Initialization
// ============================

// Basic array using literal syntax
const fruits = ["apple", "banana", "cherry"];

// Using Array constructor (generally avoid for clarity)
const numbers = new Array(1, 2, 3, 4);
const emptySlots = new Array(3); // Creates [empty × 3]

// Using Array.of() - always returns an array of given arguments
const arrFromOf = Array.of(5); // [5]
console.log(arrFromOf);

// Using Array.from() - converts iterable or array-like object to array
const str = "hello";
const arrFromStr = Array.from(str); // ['h', 'e', 'l', 'l', 'o']

// ============================
// 2. Arrays are Objects
// ============================

const mixedArray = [1, "string", true];
// Internally treated like:
// { 0: 1, 1: "string", 2: true, length: 3 }
console.log(mixedArray["0"]); // 1
console.log(typeof mixedArray); // 'object'

// ============================
// 3. Accessing and Modifying Elements
// ============================

const scores = [10, 20, 30];
console.log(scores[1]); // 20
scores[2] = 99; // Modify value at index 2

// ============================
// 4. Length Property and Sparse Arrays
// ============================

const sparse = [1, 2];
sparse[5] = 10;
console.log(sparse); // [1, 2, <3 empty items>, 10]
console.log(sparse.length); // 6

// Changing length manually truncates the array
sparse.length = 2;
console.log(sparse); // [1, 2]

// ============================
// 5. Common Array Methods
// ============================

const items = [1, 2, 3];
items.push(4); // Adds to end: [1, 2, 3, 4]
items.pop(); // Removes from end: [1, 2, 3]
items.unshift(0); // Adds to start: [0, 1, 2, 3]
items.shift(); // Removes from start: [1, 2, 3]

// Splice - add/remove elements in the middle
items.splice(1, 1, 99); // [1, 99, 3] (remove 1 item at index 1, insert 99)

// Slice - returns shallow copy of part of the array
const sliced = items.slice(0, 2); // [1, 99]

// ============================
// 6. Iteration Techniques
// ============================

const nums = [1, 2, 3];

// Traditional for loop
for (let i = 0; i < nums.length; i++) {
  console.log("For loop:", nums[i]);
}

// For...of loop
for (const val of nums) {
  console.log("For...of:", val);
}

// forEach method
nums.forEach((val, index) => {
  console.log(`forEach - Index ${index}:`, val);
});

// map - returns new array with transformed elements
const doubled = nums.map((x) => x * 2); // [2, 4, 6]

// filter - keeps elements that match condition
const evens = nums.filter((x) => x % 2 === 0); // [2]

// reduce - accumulate values into single result
const sum = nums.reduce((acc, cur) => acc + cur, 0); // 6

// ============================
// 7. Multidimensional Arrays
// ============================

const matrix = [
  [1, 2],
  [3, 4],
];

console.log(matrix[1][0]); // 3

// ============================
// 8. Type Checking and Safety
// ============================

console.log(Array.isArray(matrix)); // true

// Prevent mutation (shallow freeze)
const frozen = Object.freeze([1, 2, 3]);
// frozen.push(4); // Throws TypeError in strict mode

// ============================
// 9. Performance Tips
// ============================

// Avoid creating holes in arrays (sparse arrays)
const holey = [];
holey[1000] = "bad"; // Slower access, array internally becomes dictionary

// Prefer push/pop over shift/unshift for performance
const perfArr = [1, 2, 3];
perfArr.push(4); // Fast
perfArr.pop(); // Fast
perfArr.unshift(0); // Slower, shifts all elements
perfArr.shift(); // Slower

// ============================
// 10. Summary and Best Practices
// ============================

// - Use array literals [] instead of new Array()
// - Avoid sparse arrays and holes for performance and predictability
// - Prefer push/pop for modifying ends of arrays
// - Use Array methods (map, filter, reduce) for clear, functional code
// - Use Object.freeze() or spread operator to avoid unwanted mutation
// - Always check if value is an array using Array.isArray()

// End of deep-dive tutorial on JavaScript Arrays
