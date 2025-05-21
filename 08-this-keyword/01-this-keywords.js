/**
 * File: 01-this-keyword.js
 * Description: Comprehensive guide to the 'this' keyword in JavaScript.
 * Explains its dynamic nature and the various rules that determine its value
 * in different execution contexts.
 * Date: 2025-05-21
 */

// =========================================================================
// 1. Introduction: The Dynamic 'this' Keyword
// =========================================================================

/**
 * **Introduction:**
 * -   The `this` keyword in JavaScript is a special identifier that refers to the
 * "context" in which a function is executed.
 * -   Unlike many other languages where `this` (or `self`) is statically bound
 * to an instance of a class, in JavaScript, the value of `this` is **dynamic**.
 * -   Its value is determined entirely by *how* a function is called (its invocation context),
 * not where it is defined (with the exception of arrow functions).
 * -   Understanding the rules of `this` binding is crucial for writing correct
 * and predictable JavaScript code, especially when dealing with objects, methods,
 * event handlers, and callbacks.
 */

// =========================================================================
// 2. The Five Rules of 'this' Binding
// =========================================================================

/**
 * **The 'this' keyword's value is determined by one of five primary rules:**
 * 1.  Default Binding (Global Context)
 * 2.  Implicit Binding (Method Invocation)
 * 3.  Explicit Binding (using call(), apply(), bind())
 * 4.  New Binding (Constructor Invocation)
 * 5.  Lexical Binding (Arrow Functions)
 */

// -------------------------------------------------------------------------
// 2.1. Default Binding (Global Context / Standalone Function Invocation)
// -------------------------------------------------------------------------

/**
 * **Rule 1: Default Binding**
 * -   When a function is called as a standalone function (not as a method of an object,
 * not with `new`, and not explicitly bound), `this` defaults to the global object.
 * -   In web browsers, the global object is `window`.
 * -   In Node.js, the global object is `global` (or `this` refers to an empty object `{}` in the global scope of a module).
 * -   **Strict Mode (`"use strict"`):** In strict mode, if a function is called with default binding,
 * `this` will be `undefined` instead of the global object. This helps prevent accidental global variable creation.
 */

/**
 * In non-strict mode if this keyword refers to null or undefined
 * then it is substitute with global object(window in browser ,{} in nodejs)
 *
 */

// Example 2.1.1: Global Context (Non-strict mode)
console.log("2.1.1 Global 'this' (non-strict):", this); // In browser: Window; In Node.js: {} (module scope)

// Example 2.1.2: Standalone Function (Non-strict mode)
function showDefaultThis() {
  console.log("2.1.2 Default 'this' (non-strict function):", this);
}
showDefaultThis(); // In browser: Window; In Node.js: Global object

// Example 2.1.3: Standalone Function (Strict mode)
function showStrictDefaultThis() {
  "use strict";
  console.log("2.1.3 Default 'this' (strict function):", this);
}
showStrictDefaultThis(); // Output: undefined

// -------------------------------------------------------------------------
// 2.2. Implicit Binding (Method Invocation)
// -------------------------------------------------------------------------

/**
 * **Rule 2: Implicit Binding**
 * -   When a function is called as a method of an object (i.e., `object.method()`),
 * `this` refers to the object that "owns" the method at the time of the call.
 * -   The object immediately to the left of the dot (`.`) at the call site determines `this`.
 */

// Example 2.2.1: Basic Method Invocation
const car = {
  brand: "Toyota",
  model: "Camry",
  displayInfo: function () {
    console.log(`2.2.1 Car: ${this.brand} ${this.model}`);
  },
};
car.displayInfo(); // Output: Car: Toyota Camry ('this' is 'car' object)

// Example 2.2.2: Nested Objects
const company = {
  name: "TechCorp",
  department: {
    name: "Engineering",
    printDeptName: function () {
      console.log(`2.2.2 Department: ${this.name} at ${company.name}`);
    },
  },
};
company.department.printDeptName(); // Output: Department: Engineering at TechCorp ('this' is 'department' object)

// Example 2.2.3: Implicitly Lost 'this' (Common Pitfall)
const printCarInfo = car.displayInfo; // Function reference is copied
printCarInfo(); // Output: Car: undefined undefined (Default binding applies, 'this' is global/window)

// -------------------------------------------------------------------------
// 2.3. Explicit Binding (call(), apply(), bind())
// -------------------------------------------------------------------------

/**
 * **Rule 3: Explicit Binding**
 * -   You can explicitly set the value of `this` using the `call()`, `apply()`, or `bind()` methods.
 * -   These methods are available on all function prototypes.
 * -   They override the default and implicit binding rules.
 *
 * -   **`call(thisArg, arg1, arg2, ...)`:** Invokes the function immediately with `thisArg` as `this` and arguments passed individually.
 * -   **`apply(thisArg, [argsArray])`:** Invokes the function immediately with `thisArg` as `this` and arguments passed as an array.
 * -   **`bind(thisArg, arg1, arg2, ...)`:** Returns a *new function* with `this` permanently bound to `thisArg` (and optionally pre-filled arguments). The function is not executed immediately.
 */

// Example 2.3.1: Using call()
function greetPerson(greeting) {
  console.log(`2.3.1 ${greeting}, ${this.name}!`);
}
const personA = { name: "Alice" };
greetPerson.call(personA, "Hello"); // Output: Hello, Alice! ('this' is 'personA')

// Example 2.3.2: Using apply()
function sumNumbers(a, b, c) {
  console.log(`2.3.2 Sum: ${this.prefix} ${a + b + c}`);
}
const context = { prefix: "Total:" };
sumNumbers.apply(context, [10, 20, 30]); // Output: Sum: Total: 60 ('this' is 'context')

// Example 2.3.3: Using bind()
const userProfile = {
  username: "devUser",
  logUsername: function () {
    console.log(`2.3.3 Username: ${this.username}`);
  },
};
// Bind 'this' to userProfile, then use in a delayed call
const boundLogUsername = userProfile.logUsername.bind(userProfile);
setTimeout(boundLogUsername, 500); // Output (after 500ms): Username: devUser

// -------------------------------------------------------------------------
// 2.4. New Binding (Constructor Invocation)
// -------------------------------------------------------------------------

/**
 * **Rule 4: New Binding**
 * -   When a function is invoked with the `new` keyword (acting as a constructor),
 * a brand new empty object is created, and `this` inside the constructor function
 * refers to this newly created object.
 * -   The `new` keyword performs four steps:
 * 1.  Creates a new empty object.
 * 2.  Sets the new object's prototype to the constructor function's prototype.
 * 3.  Binds `this` to the new object inside the constructor function.
 * 4.  Returns the new object (unless the constructor explicitly returns another object).
 */

// Example 2.4.1: Constructor Function
function Person(name, age) {
  this.name = name; // 'this' refers to the new object
  this.age = age;
  console.log(`2.4.1 New Person created: ${this.name}`);
}
const p1 = new Person("Bob", 30); // Output: New Person created: Bob
console.log("2.4.1 Person object:", p1.name, p1.age); // Output: Bob 30

// -------------------------------------------------------------------------
// 2.5. Lexical Binding (Arrow Functions)
// -------------------------------------------------------------------------

/**
 * **Rule 5: Lexical Binding (Arrow Functions)**
 * -   Arrow functions (`=>`) do **not** have their own `this` binding.
 * -   Instead, they lexically inherit `this` from their immediately enclosing
 * (parent) scope at the time they are *defined*.
 * -   This means `call()`, `apply()`, and `bind()` have **no effect** on `this`
 * when used with arrow functions. Their `this` context is permanently set.
 * -   This behavior is often desirable for callbacks, as it avoids the need to
 * explicitly bind `this`.
 */

// Example 2.5.1: Arrow function inheriting 'this' from method scope
const game = {
  title: "Space Invaders",
  players: ["Player1", "Player2"],
  startGame: function () {
    console.log(`2.5.1 Game: ${this.title}`); // 'this' is 'game'
    this.players.forEach((player) => {
      // Arrow function's 'this' inherits from 'startGame' method's 'this' (which is 'game')
      console.log(`2.5.1 ${this.title} - Player: ${player}`);
    });
  },
};
game.startGame();
/* Output:
2.5.1 Game: Space Invaders
2.5.1 Space Invaders - Player: Player1
2.5.1 Space Invaders - Player: Player2
*/

// Example 2.5.2: Arrow function's 'this' cannot be bound
const myArrowFunc = () => {
  console.log("2.5.2 Arrow func 'this' (attempted bind):", this);
};
myArrowFunc.call({ name: "Attempted Context" }); // 'this' will still be global/window (or outer lexical scope)

// =========================================================================
// 3. 'this' Priority Order
// =========================================================================

/**
 * **'this' Binding Priority (from highest to lowest):**
 * 1.  **New Binding:** If `new` is used.
 * 2.  **Explicit Binding:** If `call()`, `apply()`, or `bind()` are used.
 * 3.  **Implicit Binding:** If the function is called as a method of an object.
 * 4.  **Default Binding:** If none of the above apply (standalone function call).
 * 5.  **Lexical Binding:** Arrow functions override all other rules; their `this` is fixed lexically.
 */

// =========================================================================
// 4. Common Pitfalls and Best Practices
// =========================================================================

/**
 * **4.1. Losing `this` Context:**
 * -   The most common pitfall is when a method is passed as a callback or assigned to a variable,
 * causing its `this` context to be lost (it reverts to default binding).
 * -   Solutions: Use `bind()`, arrow functions, or wrap in an anonymous function.
 */
const button = {
  text: "Click Me",
  onClick: function () {
    console.log(`4.1 Button text: ${this.text}`);
  },
};
// Problem: 'this' will be global/window, not 'button'
// setTimeout(button.onClick, 1000);

// Solution 1: bind()
setTimeout(button.onClick.bind(button), 1000); // Output (after 1s): Button text: Click Me

// Solution 2: Arrow function (if onClick were an arrow function, or wrapping it)
setTimeout(() => button.onClick(), 1500); // Output (after 1.5s): Button text: Click Me

/**
 * **4.2. Avoid Over-reliance on Default Binding:**
 * -   In modern JavaScript, relying on `this` defaulting to the global object is generally
 * discouraged, especially in strict mode where it becomes `undefined`.
 * -   Always be explicit about the context or use patterns that naturally handle `this` (like arrow functions for callbacks).
 */

// =========================================================================
// 5. Conclusion
// =========================================================================

/**
 * **Conclusion:**
 * The `this` keyword is a cornerstone of JavaScript's flexible function invocation model.
 * By understanding the five primary binding rules (Default, Implicit, Explicit, New, and Lexical),
 * developers can confidently predict and control the context of their functions, leading to
 * more robust, readable, and maintainable JavaScript applications.
 *    -----CONCLUSION FROM VIDEO TUT FROM AKSHAY SAINI (this keyword video) -----
 *  1. "this" in global scope always points to the globalObject (globalObject depends on javascript runtime env)
 *  2. "this" in a function depends on 2 things
 *  a. strict / non strict mode (in strict mode, "this" is undefined, in non strict mode, "this substitution" takes place and "this" points to globalObject)
 *  b. how the function is being invoked (if we invoke the function using the global object in strict mode, then "this" will point to that globalObject)
 *  3. "this" in a method always points to the object that is used to invoke the method.
 *  4. call, apply & bind are used to share a method with another object (hence the "this" keyword reference would also change accordingly)
 *  5. "this" inside arrow function refers to the enclosing lexical context
 *  6. "this" in DOM points to the HTML element itself on which it is being used
 */
