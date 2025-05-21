/**
 * File: 01-call-apply-bind.js
 * Description: Comprehensive guide to JavaScript's call(), apply(), and bind() methods.
 * Explains their purpose, syntax, and practical applications in controlling the 'this'
 * keyword's context.
 * Date: 2025-05-21
 */

// =========================================================================
// 1. Introduction: Controlling 'this' in JavaScript
// =========================================================================

/**
 * **Introduction:**
 * -   In JavaScript, the `this` keyword is a powerful but often misunderstood concept.
 * Its value (the "context") is determined dynamically based on how a function is called.
 * -   `call()`, `apply()`, and `bind()` are three essential methods available on all
 * JavaScript functions (`Function.prototype` methods).
 * -   They provide explicit control over the `this` binding of a function, allowing you
 * to set the context manually, and also to pass arguments to the function.
 * -   Mastering these methods is crucial for advanced JavaScript development, especially
 * when dealing with object-oriented patterns, callbacks, and event handling.
 */

// =========================================================================
// 2. Brief Review: The 'this' Keyword
// =========================================================================

/**
 * **The 'this' Keyword (Quick Recap):**
 * -   The value of `this` depends entirely on *how* the function is invoked.
 * -   **Global Context:** In the global scope (non-strict mode), `this` refers to the global object (`window` in browsers, `global` in Node.js). In strict mode, it's `undefined`.
 * -   **Method Invocation:** When a function is called as a method of an object, `this` refers to that object.
 * -   **Function Invocation (Standalone):** In non-strict mode, `this` refers to the global object. In strict mode, `this` is `undefined`.
 * -   **Constructor Invocation:** When a function is called with `new`, `this` refers to the newly created instance.
 * -   **Arrow Functions:** Arrow functions do not have their own `this` binding; they lexically inherit `this` from their enclosing scope. This is a key difference from regular functions.
 */

// Example of 'this' behavior
const obj = {
  name: "MyObject",
  greet: function () {
    console.log("2.1 'this' in method:", this.name); // 'this' is obj
  },
  arrowGreet: () => {
    console.log("2.2 'this' in arrow function:", this); // 'this' is global/window (lexical)
  },
};
obj.greet();
obj.arrowGreet(); // In browser, this would be Window; in Node, it's {} or global.

function simpleFunc() {
  console.log("2.3 'this' in simple function (non-strict):", this); // Global/Window
}
simpleFunc();

// =========================================================================
// 3. The `call()` Method
// =========================================================================

/**
 * **`Function.prototype.call()`:**
 * -   **Purpose:** Invokes a function with a specified `this` context and arguments provided
 * individually.
 * -   **Syntax:** `func.call(thisArg, arg1, arg2, ...)`
 * -   **`thisArg`:** The value to be provided as the `this` keyword for the `func` function.
 * If `thisArg` is `null` or `undefined`, `this` will default to the global object (in non-strict mode).
 * -   **`arg1, arg2, ...`:** Arguments to be passed to the `func` function, provided as a comma-separated list.
 * -   **Execution:** `call()` executes the function *immediately*.
 * -   **Return Value:** The result of the invoked function.
 *
 * **Use Cases:**
 * -   Borrowing methods from other objects.
 * -   Invoking a function with a specific `this` context when arguments are known individually.
 */

// Example 3.1: Basic usage of call()
const person = {
  fullName: function (city, country) {
    return this.firstName + " " + this.lastName + ", " + city + ", " + country;
  },
};

const person1 = {
  firstName: "John",
  lastName: "Doe",
};

const person2 = {
  firstName: "Jane",
  lastName: "Smith",
};

// Call person.fullName with person1 as 'this'
console.log("3.1 Using call() with individual arguments:");
console.log(person.fullName.call(person1, "Oslo", "Norway")); // Output: John Doe, Oslo, Norway
// Call person.fullName with person2 as 'this'
console.log(person.fullName.call(person2, "London", "UK")); // Output: Jane Smith, London, UK

// Example 3.2: Borrowing a method (e.g., Array.prototype.slice)
const args = Array.prototype.slice.call(arguments); // Common pattern to convert arguments object to array
// Note: In modern JS, Array.from(arguments) or rest parameters are preferred.

function logArguments() {
  const argsArray = Array.prototype.slice.call(arguments);
  console.log("3.2 Arguments as Array (using call):", argsArray);
}
logArguments(1, "hello", true); // Output: [1, "hello", true]

// =========================================================================
// 4. The `apply()` Method
// =========================================================================

/**
 * **`Function.prototype.apply()`:**
 * -   **Purpose:** Invokes a function with a specified `this` context and arguments provided
 * as an array (or an array-like object).
 * -   **Syntax:** `func.apply(thisArg, [argsArray])`
 * -   **`thisArg`:** Same as in `call()`.
 * -   **`argsArray`:** An array or an array-like object containing the arguments to be passed
 * to the `func` function.
 * -   **Execution:** `apply()` executes the function *immediately*.
 * -   **Return Value:** The result of the invoked function.
 *
 * **Key Difference from `call()`:** The way arguments are passed. `call()` takes individual arguments,
 * while `apply()` takes an array of arguments.
 *
 * **Use Cases:**
 * -   When arguments are already in an array or need to be dynamically collected into an array.
 * -   Finding max/min in an array (e.g., `Math.max.apply(null, array)`).
 */

// Example 4.1: Basic usage of apply()
const person3 = {
  firstName: "Peter",
  lastName: "Jones",
};

// Call person.fullName with person3 as 'this', passing arguments as an array
console.log("4.1 Using apply() with arguments array:");
console.log(person.fullName.apply(person3, ["Paris", "France"])); // Output: Peter Jones, Paris, France

// Example 4.2: Using apply() with Math.max (classic use case)
const numbers = [10, 20, 5, 30, 15];
// Math.max normally takes individual arguments: Math.max(10, 20, 5)
// Using apply allows it to work with an array
const maxNumber = Math.max.apply(null, numbers); // 'null' for thisArg as Math.max doesn't use 'this'
console.log("4.2 Max number (using apply):", maxNumber); // Output: 30

// =========================================================================
// 5. The `bind()` Method
// =========================================================================

/**
 * **`Function.prototype.bind()`:**
 * -   **Purpose:** Returns a **new function** (a "bound function") with a specified `this` context
 * and optionally, initial arguments (partial application). The original function is *not* immediately invoked.
 * -   **Syntax:** `func.bind(thisArg, arg1, arg2, ...)`
 * -   **`thisArg`:** The value to be provided as the `this` keyword for the new bound function.
 * -   **`arg1, arg2, ...`:** Arguments to be pre-filled (curried) for the new bound function. These arguments
 * will precede any arguments passed when the bound function is actually called.
 * -   **Execution:** `bind()` does *not* execute the function immediately. It returns a new function.
 * -   **Return Value:** A new, bound function.
 *
 * **Key Difference from `call()`/`apply()`:** `bind()` creates a new function that you can execute later,
 * whereas `call()` and `apply()` execute the function immediately.
 *
 * **Use Cases:**
 * -   **Preserving `this` context in callbacks:** Especially in event handlers or `setTimeout` where `this` might otherwise be lost.
 * -   **Partial function application (currying):** Creating new functions with some arguments pre-set.
 */

// Example 5.1: Preserving 'this' in a callback (e.g., setTimeout)
const user = {
  name: "Alice",
  greet: function () {
    console.log("5.1 Hello, " + this.name);
  },
};

// If we just do setTimeout(user.greet, 100): 'this' inside greet would be global/window
setTimeout(user.greet.bind(user), 100); // Binds 'this' of greet to 'user' object
// Output (after 100ms): Hello, Alice

// Example 5.2: Preserving 'this' in an event listener (conceptual)
// const button = document.getElementById('myButton');
// button.addEventListener('click', user.greet.bind(user));

// Example 5.3: Partial function application (currying)
function multiply(a, b) {
  return a * b;
}

const multiplyByFive = multiply.bind(null, 5); // 'null' for thisArg, 5 is pre-filled 'a'
console.log("5.3 Partial application (multiplyByFive):", multiplyByFive(10)); // Output: 50 (5 * 10)

const multiplyByTen = multiply.bind(null, 10);
console.log("5.3 Partial application (multiplyByTen):", multiplyByTen(7)); // Output: 70 (10 * 7)

// =========================================================================
// 6. Comparison: call(), apply(), and bind()
// =========================================================================

/**
 * **Comparison Table:**
 * | Feature            | `call()`                               | `apply()`                               | `bind()`                                   |
 * | :----------------- | :------------------------------------- | :-------------------------------------- | :----------------------------------------- |
 * | **Execution** | Immediate                              | Immediate                               | Returns a new function (not immediate)     |
 * | **Arguments** | Passed individually (comma-separated)  | Passed as an array (or array-like)      | Passed individually (comma-separated)      |
 * | **Return Value** | Result of the invoked function         | Result of the invoked function          | A new, bound function                      |
 * | **Primary Use** | Explicit `this` binding, method borrowing | Explicit `this` binding, dynamic arguments | Preserving `this` in callbacks, currying |
 */

// =========================================================================
// 7. Common Pitfalls and Best Practices
// =========================================================================

/**
 * **7.1. Arrow Functions and `this`:**
 * -   Arrow functions do not have their own `this` binding. They inherit `this` lexically
 * from their enclosing scope.
 * -   Therefore, `call()`, `apply()`, and `bind()` have no effect on `this` when used
 * with arrow functions. Their `this` context is permanently set by their definition scope.
 */
const arrowFunc = () => {
  console.log("7.1 'this' in arrow function (bound attempt):", this);
};
arrowFunc.call({ name: "Attempted Bind" }); // 'this' will still be global/window (or outer lexical scope)

/**
 * **7.2. When to Use Which Method:**
 * -   Use `call()`: When you need to execute a function immediately with a specific `this` context and you have the arguments as individual values.
 * -   Use `apply()`: When you need to execute a function immediately with a specific `this` context and you have the arguments already in an array (or array-like object).
 * -   Use `bind()`: When you need to create a *new function* with a permanently bound `this` context (and optionally pre-filled arguments) that will be executed later, typically as a callback or event handler.
 */

// =========================================================================
// 8. Conclusion
// =========================================================================

/**
 * **Conclusion:**
 * `call()`, `apply()`, and `bind()` are powerful tools in JavaScript's functional toolkit.
 * They provide granular control over the `this` keyword, enabling flexible function invocation,
 * method borrowing, and reliable context preservation in asynchronous and event-driven programming.
 * A clear understanding of these methods is fundamental for writing robust and predictable JavaScript code.
 */
