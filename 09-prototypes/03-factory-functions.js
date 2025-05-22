/**
 * File: 04-factory-functions.js
 * Description: Comprehensive tutorial on JavaScript Factory Functions, explaining their
 * definition, creation, benefits, and comparison to constructor functions/ES6 Classes.
 * Date: 2025-05-22
 */

// =========================================================================
// 1. Introduction: What is a Factory Function?
// =========================================================================

/**
 * **Factory Function:**
 * -   A factory function is a function that **returns an object**.
 * -   It's a simple and powerful pattern for creating objects in JavaScript.
 * -   Unlike constructor functions or ES6 Classes, factory functions do **not**
 * require the `new` keyword to create instances.
 * -   They are called "factories" because they "manufacture" or "produce" objects.
 * -   Factory functions leverage JavaScript's ability to treat functions as
 * first-class citizens and its flexible object literal syntax.
 */

// =========================================================================
// 2. Creating a Basic Factory Function
// =========================================================================

/**
 * **Creating a Basic Factory Function:**
 * -   Define a regular JavaScript function.
 * -   Inside the function, create and return an object literal.
 * -   The object can have properties and methods.
 */

// Example 1: Basic user factory
function createUser(name, age) {
  return {
    name: name,
    age: age,
    greet: function () {
      console.log(
        `1. Hello, my name is ${this.name} and I'm ${this.age} years old.`
      );
    },
  };
}

const user1 = createUser("Alice", 30);
const user2 = createUser("Bob", 25);

user1.greet(); // Output: Hello, my name is Alice and I'm 30 years old.
user2.greet(); // Output: Hello, my name is Bob and I'm 25 years old.

console.log("1. Type of user1:", typeof user1); // Output: object
console.log("1. user1 instanceof createUser:", user1 instanceof createUser); // Output: false (not a constructor)

// =========================================================================
// 3. Benefits of Using Factory Functions
// =========================================================================

/**
 * **Benefits of Factory Functions:**
 *
 * 3.1. **No `new` Keyword:**
 * -   Simplifies object creation syntax. You just call the function like any other.
 * -   Avoids potential pitfalls and confusion associated with the `this` keyword
 * when `new` is accidentally omitted from constructor calls.
 *
 * 3.2. **Encapsulation and Private Members (via Closures):**
 * -   Factory functions can easily create private variables and methods using closures.
 * -   Variables declared within the factory function's scope are not directly
 * accessible from the outside, but can be accessed by methods defined within
 * the returned object.
 *
 * 3.3. **Flexibility and Composition:**
 * -   Easier to compose objects by mixing in behaviors from multiple sources.
 * -   Can return different types of objects based on input parameters or conditions.
 *
 * 3.4. **No `this` Binding Issues (for internal methods):**
 * -   Methods defined within the returned object can directly access variables
 * from the factory function's scope, avoiding `this` binding issues common
 * with traditional methods in callbacks.
 */

// Example 2: Encapsulation with closures in a factory function
function createCounter() {
  let count = 0; // Private variable (closed over)

  return {
    increment: function () {
      count++;
      console.log("2. Counter incremented to:", count);
    },
    decrement: function () {
      count--;
      console.log("2. Counter decremented to:", count);
    },
    getCount: function () {
      return count;
    },
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1.increment(); // Output: Counter incremented to: 1
counter1.increment(); // Output: Counter incremented to: 2
counter2.decrement(); // Output: Counter decremented to: -1

console.log("2. Counter 1 value:", counter1.getCount()); // Output: 2
console.log("2. Counter 2 value:", counter2.getCount()); // Output: -1

// console.log(counter1.count); // Output: undefined (count is private)

// Example 3: Flexible object creation / Composition
function createPerson(name) {
  return { name };
}

function canWalk({ name }) {
  // Mixin for walking behavior
  return {
    walk: () => console.log(`${name} is walking.`),
  };
}

function canSwim({ name }) {
  // Mixin for swimming behavior
  return {
    swim: () => console.log(`${name} is swimming.`),
  };
}

function createSwimmer(name) {
  const person = createPerson(name);
  return { ...person, ...canWalk(person), ...canSwim(person) }; // Compose behaviors
}

const swimmer = createSwimmer("Michael");
swimmer.walk(); // Output: Michael is walking.
swimmer.swim(); // Output: Michael is swimming.
console.log("3. Swimmer name:", swimmer.name); // Output: Michael

// =========================================================================
// 4. Factory Functions vs. Constructor Functions / ES6 Classes
// =========================================================================

/**
 * **Comparison:**
 *
 * | Feature            | Factory Functions             | Constructor Functions / ES6 Classes |
 * | :----------------- | :---------------------------- | :---------------------------------- |
 * | **`new` keyword** | Not required                  | **Required** (for `new` binding)    |
 * | **`this` keyword** | No `this` binding issues (methods directly access closed-over variables) | `this` is dynamically bound (requires careful handling, e.g., `bind`, arrow functions) |
 * | **`instanceof`** | Does not work (no prototype chain link to constructor) | Works (checks prototype chain)      |
 * | **Prototypes** | Each object gets its own copy of methods (unless explicitly shared) | Methods are shared via the prototype chain (memory efficient) |
 * | **Privacy** | Easy via closures             | Traditionally harder (relies on conventions or private class fields) |
 * | **Inheritance** | Achieved via composition/mixins | Achieved via prototypal inheritance (`extends`) |
 *
 * **When to Choose:**
 * -   **Factory Functions:**
 * -   When you want simple object creation without `new`.
 * -   When you need strong privacy for internal state.
 * -   When you prefer composition over inheritance for sharing behavior.
 * -   When you are dealing with a small number of instances or don't have extreme memory constraints.
 * -   **Constructor Functions / ES6 Classes:**
 * -   When you need to leverage prototypal inheritance for shared methods across many instances (memory efficiency).
 * -   When you need to use `instanceof` for type checking.
 * -   When you prefer a more traditional, class-like syntax for object-oriented programming.
 */

// Example 4: Constructor Function for comparison
function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function () {
  console.log(`4. ${this.name} barks!`);
};

const dog1 = new Dog("Buddy");
dog1.bark(); // Output: Buddy barks!
console.log("4. dog1 instanceof Dog:", dog1 instanceof Dog); // Output: true

// Example 5: ES6 Class for comparison
class Cat {
  constructor(name) {
    this.name = name;
  }
  meow() {
    console.log(`4. ${this.name} meows!`);
  }
}

const cat1 = new Cat("Whiskers");
cat1.meow(); // Output: Whiskers meows!
console.log("4. cat1 instanceof Cat:", cat1 instanceof Cat); // Output: true

// =========================================================================
// 5. Conclusion
// =========================================================================

/**
 * **Conclusion:**
 * Factory functions offer a flexible, simple, and powerful way to create objects in JavaScript.
 * They excel at providing strong encapsulation through closures and promoting composition
 * over traditional inheritance. While ES6 Classes provide a familiar syntax for prototypal
 * inheritance, factory functions remain a valuable pattern, especially when `new`-less
 * object creation, private state, and flexible object composition are priorities.
 */
