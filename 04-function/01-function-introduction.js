/**
 * File: 01-functions-introduction.js
 * Description: In-depth tutorial on JavaScript functions, covering declarations, expressions,
 * hoisting, arrow functions, IIFEs, parameters, scope, closures, and best practices.
 * Author: Unais Shaikh
 * Date: 2025-05-18
 */

// ============================
// 1. Function Declaration (Function Statement)
// ============================
/**
 * **Function Declaration (Function Statement):**
 * - Syntax: `function functionName(parameters) { // function body }`
 * - Key Characteristic: **Hoisted.** The entire function definition is moved to the top of the scope during the compilation phase. This means you can call the function before its actual declaration in the code.
 * - Naming: Requires a function name.
 * - Use Cases: General-purpose functions that need to be accessible throughout a scope.
 * - Interview Perspective: Demonstrates a fundamental way of defining functions in JavaScript and understanding of hoisting. Be ready to explain how hoisting affects execution order.
 */
/**
 * Adds two numbers and returns the result.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of a and b.
 */
function add(a, b) {
  return a + b;
}

console.log("Function Declaration (add):", add(5, 3)); // Output: 8

// ============================
// 2. Function Expression
// ============================

/**
 * **Function Expression:**
 * - Syntax: `const variableName = function(parameters) { // function body };` (can be anonymous or named)
 * - Key Characteristic: **Not hoisted (only the variable declaration is hoisted).** You cannot call a function expression before it is assigned to a variable.
 * - Naming: Can be anonymous (as in the `multiply` example) or have a name (named function expression, as in `factorial`). Named function expressions are useful for recursion and debugging.
 * - Use Cases: Assigning functions to variables, passing functions as arguments to other functions (callbacks), creating closures.
 * - Interview Perspective: Highlights the concept of treating functions as values (first-class citizens) in JavaScript. Crucial for understanding callbacks, higher-order functions, and the behavior of variables with function assignments during hoisting. Be prepared to contrast its hoisting behavior with function declarations.
 */
/**
 * Multiplies two numbers and returns the result.
 * @param {number} x - The first number.
 * @param {number} y - The second number.
 * @returns {number} The product of x and y.
 */
const multiply = function (x, y) {
  return x * y;
};

console.log("Function Expression (multiply):", multiply(4, 6)); // Output: 24

// Named function expression (useful for debugging and recursion)
const factorial = function fact(n) {
  if (n <= 1) {
    return 1;
  }
  return n * fact(n - 1);
};

console.log("Named Function Expression (factorial):", factorial(5)); // Output: 120

// ============================
// 3. Hoisting
// ============================

// Function declarations are hoisted, meaning you can call them before they appear in the code.
console.log("Hoisting (declaredFunction):", declaredFunction(10)); // Output: 10

function declaredFunction(num) {
  return num;
}

// Function expressions are not hoisted (or rather, the variable is hoisted but the function assignment isn't).
// console.log("Hoisting (expressionFunction):", expressionFunction(5)); // This would cause a TypeError

const expressionFunction = function (val) {
  return val * 2;
};

console.log(
  "Hoisting (expressionFunction - after declaration):",
  expressionFunction(5)
); // Output: 10

// ============================
// 4. Arrow Functions (ES6)
// ============================

// Concise syntax for function expressions
const subtract = (a, b) => a - b;
console.log("Arrow Function (subtract):", subtract(10, 4)); // Output: 6

// Single parameter, parentheses can be omitted
const square = (num) => num * num;
console.log("Arrow Function (square):", square(7)); // Output: 49

// No parameters require empty parentheses
const greet = () => "Hello from arrow function!";
console.log("Arrow Function (greet):", greet()); // Output: Hello from arrow function!

// Implicit return (when the function body is a single expression)
const cube = (num) => num ** 3;
console.log("Arrow Function (cube):", cube(3)); // Output: 27

// Explicit return (when the function body has multiple statements, use curly braces and 'return')
const power = (base, exp) => {
  let result = 1;
  for (let i = 0; i < exp; i++) {
    result *= base;
  }
  return result;
};
console.log("Arrow Function (power):", power(2, 5)); // Output: 32

// Lexical 'this' binding: Arrow functions do not have their own 'this' context.
// They inherit 'this' from the surrounding scope.

function Counter() {
  this.count = 10;
  setTimeout(() => {
    this.count++;
    console.log("Arrow function 'this' in setTimeout:", this.count); // 'this' refers to the Counter instance
  }, 100);
}
const myCounter = new Counter();

function RegularCounter() {
  this.count = 0;
  setTimeout(
    function () {
      // In non-strict mode, 'this' here would refer to the global object (window in browsers).
      // In strict mode, 'this' would be undefined.
      console.log("Regular function 'this' in setTimeout:", this);
    }.bind(this),
    200
  ); // Need to bind 'this' to access the Counter instance
}
const myRegularCounter = new RegularCounter();

// ============================
// 5. Immediately Invoked Function Expressions (IIFEs)
// ============================

// A function expression that is executed immediately after it is created.
// Used to create private scopes and avoid variable collisions.

(function () {
  const privateVar = "I am private";
  console.log("IIFE:", privateVar); // Output: I am private
})();

// Trying to access privateVar outside the IIFE will result in an error.
// console.log(privateVar); // ReferenceError: privateVar is not defined

// Another common syntax for IIFEs
(() => {
  const anotherPrivateVar = "Another private variable";
  console.log("IIFE (arrow function):", anotherPrivateVar); // Output: Another private variable
})();

// IIFE with parameters
((name) => {
  console.log("IIFE with parameter:", `Hello, ${name}!`); // Output: Hello, World!
})("World");

// IIFE returning a value
const resultFromIIFE = (function () {
  return "Result from IIFE";
})();

console.log("Result from IIFE:", resultFromIIFE); // Output: Result from IIFE

// ============================
// 6. Function Parameters
// ============================

// Default parameters (ES6)
function greetPerson(name = "Guest") {
  console.log(`Hello, ${name}!`);
}
greetPerson("Alice"); // Output: Hello, Alice!
greetPerson(); // Output: Hello, Guest!

// Rest parameters (ES6) - allows a function to accept an indefinite number of arguments as an array.
function sumAll(...numbers) {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}
console.log("Rest parameters (sumAll):", sumAll(1, 2, 3, 4, 5)); // Output: 15

// Arguments object (available in non-arrow functions) - array-like object containing all arguments passed to the function.
function logArguments() {
  console.log("Arguments object:", arguments);
  for (let i = 0; i < arguments.length; i++) {
    console.log(`Argument ${i}:`, arguments[i]);
  }
}
logArguments("apple", 10, true);
// Output:
// Arguments object: [Arguments] { '0': 'apple', '1': 10, '2': true }
// Argument 0: apple
// Argument 1: 10
// Argument 2: true

// Spread syntax in function calls - expands an iterable into individual arguments.
const values = [100, 200, 300];
function display(a, b, c) {
  console.log("Display:", a, b, c);
}
display(...values); // Output: Display: 100 200 300

// Destructuring parameters (ES6)
function printPoint({ x, y }) {
  console.log(`Point - X: ${x}, Y: ${y}`);
}
const point = { x: 5, y: 10 };
printPoint(point); // Output: Point - X: 5, Y: 10

function printArray([first, second]) {
  console.log(`Array elements: First - ${first}, Second - ${second}`);
}
const data = [1000, 2000];
printArray(data); // Output: Array elements: First - 1000, Second - 2000

// ============================
// 7. Return Values
// ============================

// Functions can return any data type, including primitives, objects, and other functions.

function createGreeter(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const helloGreeter = createGreeter("Hello");
console.log("Function returning a function:", helloGreeter("Bob")); // Output: Hello, Bob!

function getObject() {
  return { message: "Returning an object" };
}
console.log("Function returning an object:", getObject().message); // Output: Returning an object

// If a function doesn't explicitly return a value, it implicitly returns 'undefined'.
function doSomething() {
  // No return statement
}
console.log("Function with no explicit return:", doSomething()); // Output: undefined

// ============================
// 8. Function Scope
// ============================

// Variables declared inside a function have local scope and are only accessible within that function.

function myFunctionScope() {
  const localVariable = "I am local";
  console.log("Inside function:", localVariable); // Output: Inside function: I am local
}
myFunctionScope();

// console.log("Outside function:", localVariable); // ReferenceError: localVariable is not defined

// Block scope (introduced with 'let' and 'const' in ES6) also applies within functions.
function blockScopeExample(condition) {
  if (condition) {
    let blockScopedVar = "I am block scoped";
    console.log("Inside if block:", blockScopedVar); // Output: Inside if block: I am block scoped (if condition is true)
  }
  // console.log("Outside if block:", blockScopedVar); // ReferenceError: blockScopedVar is not defined
}
blockScopeExample(true);

// ============================
// 9. Closures
// ============================

// A closure is the ability of a function to "remember" and access variables from its lexical scope,
// even after the outer function has finished executing.

function outerFunction(outerVar) {
  return function innerFunction(innerVar) {
    console.log("Closure:", outerVar, innerVar);
  };
}

const myInnerFunc = outerFunction("Hello from outer");
myInnerFunc("World from inner"); // Output: Closure: Hello from outer World from inner

// Another example of closure
function createCounter() {
  let count = 0;
  return {
    increment: function () {
      count++;
    },
    decrement: function () {
      count--;
    },
    getCount: function () {
      return count;
    },
  };
}

const counterA = createCounter();
counterA.increment();
counterA.increment();
console.log("Closure (counterA):", counterA.getCount()); // Output: 2

const counterB = createCounter();
counterB.decrement();
console.log("Closure (counterB):", counterB.getCount()); // Output: -1

// ============================
// 10. Best Practices for Functions
// ============================

// - Keep functions small and focused on a single task.
// - Give functions descriptive names that indicate their purpose.
// - Use meaningful parameter names.
// - Avoid side effects (modifying variables outside the function's scope) where possible for more predictable code.
// - Use arrow functions for concise syntax and lexical 'this' binding where appropriate.
// - Use IIFEs to create private scopes and avoid naming conflicts.
// - Leverage default and rest parameters for more flexible function design.
// - Be mindful of hoisting and its implications, especially with function expressions.
// - Understand closures and how they can be used to create encapsulated data and behavior.

// End of deep-dive tutorial on JavaScript Functions
