/**
 * File: 03-slice-vs-splice.js
 * Description: JavaScript Array Methods - slice() vs splice() explained with examples
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// ============================
// slice()
// - Non-destructive: does NOT change the original array
// - Syntax: array.slice(startIndex, endIndex)
//   * startIndex: where to start (inclusive)
//   * endIndex: where to end (exclusive)
// ============================

const fruits1 = ["apple", "banana", "cherry", "date"];

// Example: slice from index 1 to 3 (3 is not included)
const sliced = fruits1.slice(1, 3);
console.log("sliced:", sliced); // ['banana', 'cherry']
console.log("original:", fruits1); // ['apple', 'banana', 'cherry', 'date'] – remains unchanged

// ============================
// splice()
// - Destructive: changes the original array
// - Syntax: array.splice(startIndex, deleteCount, item1, item2, ...)
//   * startIndex: index to start modifying
//   * deleteCount: number of elements to remove
//   * item1, item2, ...: optional items to add
// ============================

const fruits2 = ["apple", "banana", "cherry", "date"];

// Example 1: Remove 2 elements starting from index 1
fruits2.splice(1, 2); // removes 'banana' and 'cherry'
console.log("after removal:", fruits2); // ['apple', 'date']

// Example 2: Add elements at a specific position
fruits2.splice(1, 0, "banana", "cherry"); // insert at index 1
console.log("after insertion:", fruits2); // ['apple', 'banana', 'cherry', 'date']

// Example 3: Replace 1 element at index 1
fruits2.splice(1, 1, "blueberry"); // replaces 'banana' with 'blueberry'
console.log("after replacement:", fruits2); // ['apple', 'blueberry', 'cherry', 'date']

// ============================
// Summary
// ============================
// slice() -> Returns a new array, does NOT modify the original
// splice() -> Modifies the original array by removing/replacing/adding elements

const languages = ["C++", "JS", "Python", "Java"];
languages.splice(2, 1, "Ruby");
console.log("languages after splice:", languages); // ['C++', 'JS', 'Ruby', 'Java']
