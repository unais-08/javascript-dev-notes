/**
 * File: 04-cons-func.js
 * Description: Comprehensive tutorial on JavaScript Constructor Functions, explaining
 * their definition, creation with the 'new' keyword, role in prototypal inheritance,
 * and comparison to factory functions and ES6 Classes.
 * Date: 2025-05-22
 */

// =========================================================================
// 1. Introduction: What is a Constructor Function?
// =========================================================================

/**
 * **Constructor Function:**
 * -   A constructor function is a regular JavaScript function that is designed
 * to create new objects (instances) when invoked with the `new` keyword.
 * -   It serves as a blueprint for creating multiple similar objects.
 * -   It's a traditional way to implement object-oriented programming patterns
 * before the introduction of ES6 Classes.
 * -   By convention, constructor functions are named with an initial uppercase letter
 * (e.g., `Person`, `Car`), to distinguish them from regular functions.
 */

// =========================================================================
// 2. Creating a Constructor Function and Using the `new` Keyword
// =========================================================================

/**
 * **Creating a Constructor Function:**
 * -   Define a regular function.
 * -   Inside the function, use the `this` keyword to assign properties to the
 * new object that will be created.
 * -   Do not explicitly `return` a value (unless you want to return a different object).
 *
 * **The `new` Keyword:**
 * -   The `new` keyword is essential when calling a constructor function. It performs
 * four crucial steps:
 * 1.  A new, empty JavaScript object is created.
 * 2.  The `[[Prototype]]` (or `__proto__`) of this new object is set to the
 * `prototype` property of the constructor function. This establishes the
 * prototypal inheritance link.
 * 3.  The constructor function is executed with `this` bound to the newly created object.
 * This allows the constructor to add "own" properties to the new instance.
 * 4.  If the constructor function does not explicitly return an object, `this`
 * (the newly created object) is implicitly returned.
 */

// Example 1: Basic Person constructor function
function Person(name, age) {
  // 'this' refers to the new object being created by 'new'
  this.name = name;
  this.age = age;
  // Methods can be defined here, but it's less memory efficient (see next section)
  // this.greet = function() {
  //   console.log(`1. Hello, my name is ${this.name}.`);
  // };
}

// Creating instances using 'new'
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

console.log("1. Person 1:", person1); // Person { name: 'Alice', age: 30 }
console.log("1. Person 2:", person2); // Person { name: 'Bob', age: 25 }

// Checking type and instance
console.log("1. Type of person1:", typeof person1); // Output: object
console.log("1. person1 instanceof Person:", person1 instanceof Person); // Output: true

// =========================================================================
// 3. Adding Methods to the Prototype for Efficiency
// =========================================================================

/**
 * **Methods on the Prototype:**
 * -   Defining methods directly inside the constructor function (e.g., `this.greet = function() { ... }`)
 * creates a *new copy* of that method for every instance. This is inefficient for memory.
 * -   The best practice is to add methods to the constructor function's `prototype` object.
 * -   Methods added to `Constructor.prototype` are shared among all instances,
 * leveraging prototypal inheritance and saving memory.
 */

// Example 2: Adding methods to the prototype
function Animal(species) {
  this.species = species;
}

// Add a method to the Animal's prototype
Animal.prototype.makeSound = function () {
  console.log(`2. The ${this.species} makes a sound.`);
};

Animal.prototype.eat = function (food) {
  console.log(`2. The ${this.species} is eating ${food}.`);
};

const dog = new Animal("dog");
const cat = new Animal("cat");

dog.makeSound(); // Output: The dog makes a sound.
cat.makeSound(); // Output: The cat makes a sound.
dog.eat("bones"); // Output: The dog is eating bones.

// Verify that methods are shared via prototype
console.log(
  "2. dog.makeSound === cat.makeSound:",
  dog.makeSound === cat.makeSound
); // Output: true
console.log(
  "2. dog.__proto__ === Animal.prototype:",
  dog.__proto__ === Animal.prototype
); // Output: true

// =========================================================================
// 4. Constructor Functions and Inheritance (Pre-ES6)
// =========================================================================

/**
 * **Inheritance with Constructor Functions (Pre-ES6):**
 * -   Before ES6 Classes, inheritance was set up manually by manipulating the prototype chain.
 * -   This typically involved:
 * 1.  Calling the parent constructor using `call()` or `apply()` to inherit properties.
 * 2.  Setting the child constructor's prototype to an object created from the parent's prototype.
 */

// Example 3: Inheritance with constructor functions
function Vehicle(make) {
  this.make = make;
}
Vehicle.prototype.getMake = function () {
  return this.make;
};

function Car(make, model) {
  Vehicle.call(this, make); // 1. Inherit properties from Vehicle
  this.model = model;
}

// 2. Inherit methods from Vehicle (set up prototype chain)
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car; // Correctly set the constructor reference

Car.prototype.getModel = function () {
  return this.model;
};

const myCar = new Car("Ford", "Mustang");
console.log("3. Car make:", myCar.getMake()); // Output: Ford (inherited)
console.log("3. Car model:", myCar.getModel()); // Output: Mustang (own method)
console.log("3. myCar instanceof Car:", myCar instanceof Car); // Output: true
console.log("3. myCar instanceof Vehicle:", myCar instanceof Vehicle); // Output: true

// =========================================================================
// 5. Constructor Functions vs. Factory Functions vs. ES6 Classes
// =========================================================================

/**
 * **Comparison (Revisited):**
 * -   **Constructor Functions:** The traditional way to create objects and implement
 * prototypal inheritance. Requires `new` and careful `this` management.
 * -   **Factory Functions:** Simple functions that return objects. Do not use `new`.
 * Excellent for privacy via closures and composition. Methods are typically copied
 * per instance unless explicitly shared.
 * -   **ES6 Classes:** Syntactic sugar over constructor functions and prototypal inheritance.
 * Provides a cleaner, more familiar class-like syntax for object creation and inheritance,
 * but still uses prototypes under the hood.
 *
 * **When to Choose:**
 * -   **Constructor Functions:** Useful for understanding the underlying prototypal
 * model, but often superseded by ES6 Classes for modern code due to better syntax.
 * -   **Factory Functions:** When you need strong privacy, flexible object composition,
 * or want to avoid the `new` keyword and `this` binding complexities.
 * -   **ES6 Classes:** The preferred modern syntax for defining object blueprints
 * and implementing prototypal inheritance in a clean, readable way.
 */

// Example 4: ES6 Class equivalent for comparison
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  displayPrice() {
    console.log(`4. ${this.name} costs $${this.price}`);
  }
}

const laptop = new Product("Laptop", 1200);
laptop.displayPrice(); // Output: Laptop costs $1200
console.log("4. laptop instanceof Product:", laptop instanceof Product); // Output: true

// =========================================================================
// 6. Conclusion
// =========================================================================

/**
 * **Conclusion:**
 * Constructor functions are a foundational concept in JavaScript's object-oriented
 * paradigm, providing a mechanism to create multiple instances of objects and
 * leverage prototypal inheritance. While ES6 Classes offer a more modern and
 * convenient syntax, understanding constructor functions is key to grasping
 * JavaScript's core object model and how inheritance truly works under the hood.
 */
