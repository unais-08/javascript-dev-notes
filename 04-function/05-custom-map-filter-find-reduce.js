/**
 * File: custom-array-methods.js
 * Description: Implementation of custom versions of common JavaScript array methods:
 * map, filter, find, and reduce.  This tutorial explains how these methods
 * work internally and how to create your own versions.
 * Author: Unais
 * Date: 2025-05-20
 */

// =========================================================================
// 1. Custom map() Implementation
// =========================================================================

/**
 * **Custom map() Function:**
 * -   Creates a new array by applying a provided callback function to each
 * element of the original array.
 * -   Mimics the behavior of the built-in `Array.prototype.map()` method.
 * -   This function takes an array and a callback as input.
 * -   It iterates through the array, applies the callback to each element,
 * and pushes the result into a new array.
 * -   It returns the new array containing the transformed elements.
 *
 * **Parameters:**
 * -   `inputArray`: The array to iterate over.
 * -   `callback`:  A function to call for each element in the array.
 * -   `element`: The current element being processed.
 * -   `index`: The index of the current element.
 * -   `array`:  The array `map()` was called upon.
 *
 * **Returns:**
 * -   A new array with the results of applying the callback to each element.
 */
function customMap(inputArray, callback) {
  const newArray = []; // Array to store transformed elements

  // Iterate over each element in the input array
  for (let index = 0; index < inputArray.length; index++) {
    const currentElement = inputArray[index]; // Get the current element
    const transformedValue = callback(currentElement, index, inputArray); // Apply the callback
    newArray.push(transformedValue); // Add the transformed value to the new array
  }

  return newArray; // Return the new array
}

// Example 1: Using customMap() to add 1 to each mark
const marks = [90, 71, 91, 69, 80];
console.log("1. Original marks:", marks);
const incrementedMarks = customMap(marks, (mark) => mark + 1);
console.log("   Incremented marks (customMap):", incrementedMarks);
// Output:
//   Original marks: [ 90, 71, 91, 69, 80 ]
//   Incremented marks (customMap): [ 91, 72, 92, 70, 81 ]

// =========================================================================
// 2. Custom filter() Implementation
// =========================================================================

/**
 * **Custom filter() Function:**
 * -   Creates a new array containing only the elements from the original array
 * that satisfy a condition specified by a provided callback function.
 * -   Mimics the behavior of the built-in `Array.prototype.filter()` method.
 * -   This function takes an array and a callback as input.
 * -   It iterates through the array, applies the callback (which should return
 * a boolean) to each element, and includes the element in the new array
 * if the callback returns `true`.
 * -   It returns the new array containing the filtered elements.
 *
 * **Parameters:**
 * -   `inputArray`: The array to filter.
 * -   `callback`:  A function to test each element in the array.
 * -   `element`: The current element being processed.
 * -   `index`: The index of the current element.
 * -   `array`:  The array `filter()` was called upon.
 *
 * **Returns:**
 * -   A new array with the elements that pass the test.
 */
function customFilter(inputArray, callback) {
  const filteredArray = []; // Array to store filtered elements

  // Iterate over each element in the input array
  for (let index = 0; index < inputArray.length; index++) {
    const currentElement = inputArray[index]; // Get the current element
    const shouldInclude = callback(currentElement, index, inputArray); // Apply the callback
    if (shouldInclude) {
      // If the callback returns true, include the element
      filteredArray.push(currentElement);
    }
  }

  return filteredArray; // Return the new array
}

// Example 2: Using customFilter() to get marks below 70
const lowMarks = customFilter(marks, function (mark) {
  return mark < 70;
});
console.log("2. Original marks:", marks);
console.log("   Low marks (customFilter):", lowMarks);
// Output:
//   Original marks: [ 90, 71, 91, 69, 80 ]
//   Low marks (customFilter): [ 69 ]

// Example 3: Using customFilter() to find marks equal to 91
const ninetyOneMarks = customFilter(marks, function (mark) {
  return mark === 91;
});
console.log("   Marks equal to 91 (customFilter):", ninetyOneMarks);
// Output:
//   Marks equal to 91 (customFilter): [ 91 ]

// =========================================================================
// 3. Custom find() Implementation
// =========================================================================
/**
 * **Custom find() Function:**
 * - Returns the first element in the provided array that satisfies the provided
 * testing function. If no elements in the array satisfy the testing function,
 * undefined is returned.
 * - Mimics the behavior of the built-in `Array.prototype.find()` method.
 * - It takes an array and a callback as input.
 * - It iterates through the array, applies the callback (which should return a boolean)
 * to each element, and returns the first element for which the callback returns `true`.
 * - If no element satisfies the condition, it returns `undefined`.
 *
 * **Parameters:**
 * - `inputArray`: The array to search.
 * - `callback`: A function to test each element in the array.
 * - `element`: The current element being processed.
 * - `index`: The index of the current element.
 * - `array`: The array find() was called on.
 *
 * **Returns:**
 * - The first element in the array that satisfies the testing function, otherwise undefined.
 */
function customFind(inputArray, callback) {
  for (let index = 0; index < inputArray.length; index++) {
    const currentElement = inputArray[index];
    const satisfiesCondition = callback(currentElement, index, inputArray);
    if (satisfiesCondition) {
      return currentElement; // Return the first matching element
    }
  }
  return undefined; // Return undefined if no element matches
}
// Example 4: Using customFind to find the first mark greater than 80
const firstHighMark = customFind(marks, (mark) => mark > 80);
console.log("4.  First mark greater than 80 (customFind):", firstHighMark); // Output: 90

const noMatch = customFind(marks, (mark) => mark > 100);
console.log("4. No match (customFind):", noMatch); // Output: undefined

// =========================================================================
// 4. Custom reduce() Implementation
// =========================================================================

/**
 * **Custom reduce() Function:**
 * -   Applies a function against an accumulator and each element in the array
 * (from left to right) to reduce it to a single value.
 * -   Mimics the behavior of the built-in `Array.prototype.reduce()` method.
 * -   It takes a callback function and an optional initial value as input.
 * -   It iterates through the array (starting from the first element if no
 * initial value is provided, or from the second element otherwise),
 * applying the callback function to the accumulator and the current element.
 * -   It returns the final accumulated value.
 *
 * **Parameters:**
 * -   `callback`: A function to execute on each element in the array.
 * -   `accumulator`: The accumulated value previously returned in the last
 * invocation of the callback, or initialValue, if supplied.
 * -   `currentValue`: The current element being processed in the array.
 * -   `index`: The index of the current element.
 * -   `array`: The array reduce() was called upon.
 * -   `initialValue` (optional):  A value to use as the first argument to the
 * first call of the callback. If no initialValue is supplied, the first
 * element in the array will be used as the initial accumulator.
 *
 * **Returns:**
 * -   The single value that results from the reduction.
 */
function customReduce(callback, initialValue) {
  let accumulator = initialValue; // Initialize the accumulator
  let startIndex = 0; // Index to start iteration

  // If initialValue is not provided, use the first element as the initial accumulator
  if (accumulator === undefined) {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = this[0]; // First element becomes accumulator
    startIndex = 1; // Start from the second element
  }

  // Iterate over the array, starting from startIndex
  for (let index = startIndex; index < this.length; index++) {
    if (this.hasOwnProperty(index)) {
      const currentValue = this[index];
      accumulator = callback(accumulator, currentValue, index, this); // Apply callback
    }
  }

  return accumulator; // Return the final accumulated value
}

// Attach customReduce to the Array prototype to make it available on all arrays
Array.prototype.customReduce = customReduce;

// Example 5: Using customReduce() to calculate the sum of the marks
const sumOfMarks = marks.customReduce(
  (accumulator, mark) => accumulator + mark,
  0
);
console.log("5.  Sum of marks (customReduce):", sumOfMarks); // Output: 401

// Example 6: Using customReduce() to find the maximum mark
const maxMark = marks.customReduce(
  (accumulator, mark) => Math.max(accumulator, mark),
  -Infinity
);
console.log("6. Maximum mark (customReduce):", maxMark); // Output: 91
