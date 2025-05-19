/**
 * File: 04-higher-order-functions.js
 * Description: Deep dive tutorial on JavaScript higher-order functions, their definition,
 * usage, examples, and relationship to functional programming.
 * Author: AI Assistant
 * Date: 2025-05-19
 */

// ============================
// 1. What are Higher-Order Functions?
// ============================

/**
 * **Higher-Order Function (HOF):**
 * - A higher-order function is a function that operates on other functions.
 * - It can do one or both of the following:
 * 1.  Take one or more functions as arguments.
 * 2.  Return a function as its result.
 * - HOFs are a powerful concept in JavaScript and are closely related to functional programming.
 * - They enable you to write more abstract, reusable, and flexible code.
 */

// ============================
// 2. Functions as First-Class Citizens
// ============================

/**
 * **First-Class Functions:**
 * - In JavaScript, functions are considered "first-class citizens."
 * - This means that functions are treated like any other value. They can be:
 * -  Assigned to variables.
 * -  Passed as arguments to other functions.
 * -  Returned as values from other functions.
 * -  Stored in data structures (like arrays or objects).
 * - This ability is what makes higher-order functions possible.
 */

// Example 1: Assigning a function to a variable
const myFunction = function () {
  console.log("Hello!");
};

myFunction(); // Calling the function through the variable

// ============================
// 3. Higher-Order Functions in Action
// ============================

// 3.1. Taking a Function as an Argument

/**
 * Example 2: A HOF that takes a function as an argument
 * - The 'callback' parameter is expected to be a function.
 */
function callTwice(callback) {
  callback();
  callback();
}

function sayHello() {
  console.log("Hello!");
}

callTwice(sayHello); // Passing sayHello as an argument
// Output:
// Hello!
// Hello!

// 3.2. Returning a Function

/**
 * Example 3: A HOF that returns a function
 * - createMultiplier returns a new function.
 */
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2); // double is now a function
const triple = createMultiplier(3); // triple is also a function

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15

// 3.3. Common Built-in HOFs in JavaScript

/**
 * JavaScript provides several built-in HOFs that are extremely useful:
 * -  Array.prototype.map():  Transforms each element in an array using a provided function,
 * returning a new array.
 * -  Array.prototype.filter(): Creates a new array with elements that satisfy a condition
 * provided by a function.
 * -  Array.prototype.reduce():  Reduces an array to a single value (e.g., sum, product) by
 * applying a function to each element.
 * -  Array.prototype.forEach(): Executes a provided function once for each array element.
 * -  setTimeout() and setInterval():  While technically part of the browser API (or Node.js),
 * they are often used with callbacks and can be considered HOFs in practice.
 */

// Example 4: Using Array.map() (a HOF)
const numbers = [1, 2, 3];
const squaredNumbers = numbers.map(function (num) {
  return num * num;
});
console.log(squaredNumbers); // Output: [4, 4, 9]

// Example 5: Using Array.filter() (a HOF)
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // Output: [2]

// Example 6: Using Array.reduce() (a HOF)
const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(sum); // Output: 6

// ============================
// 4. Higher-Order Functions and Functional Programming
// ============================

/**
 * **Functional Programming (FP):**
 * - A programming paradigm that emphasizes the use of functions and avoids changing state
 * and mutable data.
 * - Key principles of FP include:
 * -  Pure Functions: Functions that always produce the same output for the same input
 * and have no side effects (they don't modify anything outside their scope).
 * -  Immutability: Data should not be changed after it's created.  Instead, new data
 * structures are created with the desired changes.
 * -  First-Class Functions:  As discussed earlier, the ability to treat functions as
 * values.
 * -  Composition: Building complex operations by combining simpler functions.
 * - Higher-order functions are a cornerstone of functional programming.  They enable
 * the creation of more flexible and composable code, facilitating patterns like map,
 * filter, and reduce.
 */

// Example 7: Function Composition (combining functions)
function add(a, b) {
  return a + b;
}

function multiplyByTwo(x) {
  return x * 2;
}

function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
}

const addAndDouble = compose(multiplyByTwo, add); // compose returns a new function

console.log(addAndDouble(3, 4)); // Output: 14  (3 + 4 = 7, then 7 * 2 = 14)

// ============================
// 5. Benefits of Higher-Order Functions
// ============================
/**
 * - **Abstraction:** HOFs allow you to abstract away common patterns, making your code more concise
 * and easier to understand.
 * - **Reusability:** HOFs can be reused with different functions to perform a variety of tasks.
 * - **Composability:** HOFs can be combined to create more complex operations from simpler ones.
 * - **Declarative Style:** HOFs often lead to a more declarative style of programming, where you
 * describe *what* you want to do rather than *how* to do it.
 */
