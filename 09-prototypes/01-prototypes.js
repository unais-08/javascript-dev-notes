/**
 * File: 01-prototypes.js
 * Description: Comprehensive tutorial on JavaScript Prototypes, explaining prototypal
 * inheritance, the prototype chain, the role of '__proto__', 'prototype',
 * and 'new', and how ES6 Classes fit into this model.
 * Date: 2025-05-21
 */

// =========================================================================
// 1. Introduction: What is a Prototype?
// =========================================================================

/**
 * **What is a Prototype?**
 * -   In JavaScript, every object has a **prototype**. A prototype is simply another object
 * that the original object "inherits" properties and methods from.
 * -   This mechanism is known as **Prototypal Inheritance**. Instead of classes inheriting
 * from other classes (like in classical object-oriented languages), objects inherit
 * directly from other objects.
 * -   When you try to access a property or method on an object, and that property/method
 * is not found directly on the object, JavaScript will look up its prototype. If it's
 * still not found, it will look up the prototype's prototype, and so on. This forms the
 * **Prototype Chain**.
 * -   The primary purpose of prototypes is to enable inheritance and share common properties
 * and methods among multiple instances of an object, saving memory and promoting code reuse.
 */

// =========================================================================
// 2. The Prototype Chain
// =========================================================================

/**
 * **The Prototype Chain:**
 * -   Every object has an internal slot `[[Prototype]]` (exposed via `__proto__` in browsers,
 * or accessed via `Object.getPrototypeOf()`).
 * -   When a property or method is accessed on an object, the JavaScript engine performs
 * a lookup:
 * 1.  It first checks if the property/method exists directly on the object itself.
 * 2.  If not found, it looks up the object's `[[Prototype]]` (its immediate prototype).
 * 3.  If still not found, it continues up the prototype chain, checking the prototype's
 * prototype, and so on.
 * 4.  This lookup continues until the property is found or the end of the chain is reached.
 * -   The end of almost every prototype chain is `Object.prototype`, which itself has `null` as its prototype.
 */

// Example 2.1: Simple Prototype Chain
const animal = {
  eats: true,
  walk: function () {
    console.log("2.1 Animal walks.");
  },
};

const rabbit = {
  jumps: true,
  __proto__: animal, // rabbit inherits from animal
};

const longEar = {
  earLength: 10,
  __proto__: rabbit, // longEar inherits from rabbit
};

console.log("2.1 Rabbit eats?", rabbit.eats); // true (inherited from animal)
rabbit.walk(); // Animal walks. (inherited from animal)
console.log("2.1 LongEar jumps?", longEar.jumps); // true (inherited from rabbit)
longEar.walk(); // Animal walks. (inherited from animal, via rabbit)

// Accessing properties directly on the object takes precedence
rabbit.eats = false;
console.log("2.1 Rabbit eats (after direct assignment)?", rabbit.eats); // false
console.log("2.1 Animal eats?", animal.eats); // true (animal's property is unchanged)

// =========================================================================
// 3. `__proto__` vs. `prototype` (The Crucial Distinction)
// =========================================================================

/**
 * **`__proto__` vs. `prototype`:**
 * -   This is one of the most common points of confusion in JavaScript.
 *
 * **3.1. `__proto__` (dunder proto):**
 * -   This is a non-standard (but widely supported) property that points to the
 * **actual prototype object** of an instance.
 * -   It's the actual link in the prototype chain.
 * -   It's generally discouraged to directly use `__proto__` for setting prototypes
 * in production code due to performance implications and standardization.
 * -   Use `Object.getPrototypeOf()` to *get* an object's prototype.
 * -   Use `Object.setPrototypeOf()` to *set* an object's prototype (also generally
 * discouraged for performance reasons; prefer `Object.create()` or `new`).
 *
 * **3.2. `prototype` (on functions):**
 * -   This property exists **only on functions** (specifically, constructor functions).
 * -   It's a special object that will be set as the `[[Prototype]]` (`__proto__`)
 * of any *new objects created by that constructor function* when used with the `new` keyword.
 * -   It defines the properties and methods that will be inherited by instances created by that constructor.
 */

// Example 3.1: `__proto__` on instances, `prototype` on functions
function Person(name) {
  this.name = name;
}

// Person.prototype is an object that will be the prototype of instances created by 'new Person()'
Person.prototype.greet = function () {
  console.log(`3.1 Hello, my name is ${this.name}`);
};

const alice = new Person("Alice"); // 'alice' is an instance
const bob = new Person("Bob"); // 'bob' is another instance

console.log(
  "3.1 Alice's __proto__ === Person.prototype?",
  alice.__proto__ === Person.prototype
); // true
console.log(
  "3.1 Bob's __proto__ === Person.prototype?",
  bob.__proto__ === Person.prototype
); // true

alice.greet(); // Hello, my name is Alice (greet is inherited from Person.prototype)
bob.greet(); // Hello, my name is Bob

// Accessing a property directly on the instance (shadowing)
alice.greet = function () {
  console.log(`3.1 Alice says: Hi, I'm ${this.name}!`);
};
alice.greet(); // Alice says: Hi, I'm Alice! (shadows the prototype's greet)
bob.greet(); // Hello, my name is Bob (bob's greet is still from prototype)

// =========================================================================
// 4. `Object.prototype`: The Top of the Chain
// =========================================================================

/**
 * **`Object.prototype`:**
 * -   This is the ultimate prototype object in JavaScript.
 * -   Almost all objects in JavaScript (except those created with `Object.create(null)`)
 * directly or indirectly inherit from `Object.prototype`.
 * -   It contains common methods like `toString()`, `hasOwnProperty()`, `isPrototypeOf()`, etc.
 * -   Its `[[Prototype]]` is `null`, marking the end of the prototype chain.
 */

// Example 4.1: Demonstrating Object.prototype
const myPlainObject = {};
console.log(
  "4.1 myPlainObject's prototype:",
  Object.getPrototypeOf(myPlainObject)
); // [Object: null prototype] {} (Object.prototype)
console.log(
  "4.1 myPlainObject's prototype's prototype:",
  Object.getPrototypeOf(Object.getPrototypeOf(myPlainObject))
); // null

console.log("4.1 myPlainObject.toString():", myPlainObject.toString()); // [object Object] (inherited)
console.log(
  "4.1 myPlainObject.hasOwnProperty('foo'):",
  myPlainObject.hasOwnProperty("foo")
); // false (inherited)

// =========================================================================
// 5. The `new` Keyword and Constructor Functions
// =========================================================================

/**
 * **The `new` Keyword:**
 * -   When a function is invoked with the `new` keyword, it acts as a **constructor function**.
 * -   The `new` keyword performs four crucial steps:
 * 1.  A new, empty JavaScript object is created.
 * 2.  The `[[Prototype]]` (`__proto__`) of this new object is set to the `prototype` property of the constructor function.
 * 3.  The constructor function is called with `this` bound to the newly created object.
 * 4.  If the constructor function does not explicitly return an object, `this` (the new object) is returned.
 */

// Example 5.1: Constructor function in action
function Car(make, model) {
  this.make = make;
  this.model = model;
}

Car.prototype.drive = function () {
  console.log(`5.1 Driving the ${this.make} ${this.model}.`);
};

const myCar = new Car("Honda", "Civic");
console.log("5.1 My Car:", myCar); // Car { make: 'Honda', model: 'Civic' }
myCar.drive(); // Driving the Honda Civic.

console.log(
  "5.1 myCar.__proto__ === Car.prototype?",
  myCar.__proto__ === Car.prototype
); // true

// =========================================================================
// 6. `Object.create()`: Direct Prototype Creation
// =========================================================================

/**
 * **`Object.create(proto, propertiesObject)`:**
 * -   This method creates a new object, using an existing object as the prototype of the newly created object.
 * -   It provides a more direct way to set up prototypal inheritance without involving constructor functions.
 * -   `proto`: The object which should be the prototype of the newly created object. Can be `null`.
 * -   `propertiesObject` (optional): An object whose enumerable own properties specify property descriptors to be added to the new object.
 */

// Example 6.1: Creating an object with a specific prototype
const vehicle = {
  wheels: 4,
  start: function () {
    console.log("6.1 Vehicle started.");
  },
};

const bike = Object.create(vehicle); // 'bike' now has 'vehicle' as its prototype
bike.engine = "250cc";
console.log("6.1 Bike has wheels?", bike.wheels); // 4 (inherited)
bike.start(); // Vehicle started. (inherited)
console.log("6.1 Bike engine:", bike.engine); // 250cc (own property)

console.log("6.1 bike.__proto__ === vehicle?", bike.__proto__ === vehicle); // true

// Example 6.2: Creating an object with null prototype
const emptyObject = Object.create(null);
console.log("6.2 Empty Object:", emptyObject); // {} (no inherited properties like toString)
// console.log(emptyObject.toString()); // TypeError: emptyObject.toString is not a function

// =========================================================================
// 7. `instanceof` Operator and `isPrototypeOf()`
// =========================================================================

/**
 * **`instanceof` Operator:**
 * -   Checks if an object is an instance of a particular constructor function.
 * -   It tests whether the `prototype` property of a constructor appears anywhere
 * in the prototype chain of an object.
 * -   **Syntax:** `object instanceof Constructor`
 *
 * **`isPrototypeOf()` Method:**
 * -   Checks if an object exists in another object's prototype chain.
 * -   **Syntax:** `PrototypeObject.isPrototypeOf(object)`
 */

// Example 7.1: instanceof
function Animal() {}
function Dog() {}
Dog.prototype = Object.create(Animal.prototype); // Dog inherits from Animal

const myDog = new Dog();
console.log("7.1 myDog instanceof Dog?", myDog instanceof Dog); // true
console.log("7.1 myDog instanceof Animal?", myDog instanceof Animal); // true
console.log("7.1 myDog instanceof Object?", myDog instanceof Object); // true

// Example 7.2: isPrototypeOf()
console.log(
  "7.2 Animal.prototype.isPrototypeOf(myDog)?",
  Animal.prototype.isPrototypeOf(myDog)
); // true
console.log(
  "7.2 Dog.prototype.isPrototypeOf(myDog)?",
  Dog.prototype.isPrototypeOf(myDog)
); // true
console.log(
  "7.2 Object.prototype.isPrototypeOf(myDog)?",
  Object.prototype.isPrototypeOf(myDog)
); // true

// =========================================================================
// 8. `hasOwnProperty()`: Own vs. Inherited Properties
// =========================================================================

/**
 * **`Object.prototype.hasOwnProperty(prop)`:**
 * -   Returns a boolean indicating whether the object has the specified property
 * as its *own* (direct) property, as opposed to inheriting it from the prototype chain.
 * -   This is crucial when iterating with `for...in` or when you need to distinguish
 * between properties defined directly on the object and those inherited.
 */

// Example 8.1: hasOwnProperty()
const base = { baseProp: "I am from base" };
const derived = Object.create(base);
derived.ownProp = "I am my own";

console.log(
  "8.1 derived.hasOwnProperty('ownProp')?",
  derived.hasOwnProperty("ownProp")
); // true
console.log(
  "8.1 derived.hasOwnProperty('baseProp')?",
  derived.hasOwnProperty("baseProp")
); // false (inherited)
console.log("8.1 'baseProp' in derived?", "baseProp" in derived); // true (checks prototype chain)

// =========================================================================
// 9. Prototypal Inheritance vs. Classical Inheritance (Brief)
// =========================================================================

/**
 * **Prototypal Inheritance vs. Classical Inheritance:**
 * -   **Classical Inheritance (e.g., Java, C++):** Based on classes (blueprints) that define
 * properties and methods. Instances are created from classes. Classes inherit from other classes.
 * -   **Prototypal Inheritance (JavaScript):** Based on objects inheriting directly from other objects.
 * There are no "classes" in the traditional sense (though ES6 `class` syntax is syntactic sugar over prototypes).
 * Objects are created from other objects (prototypes).
 * -   JavaScript's model is often described as "delegation" or "behavior sharing" rather than strict "class-based" inheritance.
 */

// =========================================================================
// 10. ES6 Classes: Syntactic Sugar for Prototypes
// =========================================================================

/**
 * **ES6 Classes (`class` keyword):**
 * -   Introduced in ECMAScript 2015 (ES6), the `class` keyword provides a cleaner, more
 * familiar syntax for creating objects and dealing with inheritance.
 * -   **Crucially, `class` syntax is purely syntactic sugar over JavaScript's existing
 * prototype-based inheritance model.** It does not introduce a new object-oriented model.
 * -   Under the hood, `class` declarations still use constructor functions and prototypes.
 */

// Example 10.1: Class syntax equivalent to constructor function + prototype
class AnimalClass {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`10.1 ${this.name} makes a sound.`);
  }
}

class DogClass extends AnimalClass {
  constructor(name, breed) {
    super(name); // Calls AnimalClass constructor
    this.breed = breed;
  }
  bark() {
    console.log(`10.1 ${this.name} (${this.breed}) barks!`);
  }
}

const myAnimal = new AnimalClass("Leo");
myAnimal.speak(); // Leo makes a sound.

const myDog2 = new DogClass("Buddy", "Golden Retriever");
myDog2.speak(); // Buddy makes a sound. (inherited)
myDog2.bark(); // Buddy (Golden Retriever) barks! (own method)

console.log("10.1 myDog instanceof DogClass?", myDog2 instanceof DogClass); // true
console.log(
  "10.1 myDog instanceof AnimalClass?",
  myDog2 instanceof AnimalClass
); // true

// Behind the scenes:
// DogClass.prototype.__proto__ === AnimalClass.prototype
// myDog.__proto__ === DogClass.prototype

// =========================================================================
// 11. Best Practices and Common Pitfalls
// =========================================================================

/**
 * **11.1. Modifying `Object.prototype`:**
 * -   **NEVER** directly modify `Object.prototype` unless you absolutely know what you're doing
 * and have a very specific reason (e.g., polyfilling for older environments).
 * -   Modifying `Object.prototype` adds properties to *every* object in JavaScript, which can
 * lead to unexpected behavior, conflicts with libraries, and security vulnerabilities.
 *
 * **11.2. Direct `__proto__` Manipulation:**
 * -   Avoid using `__proto__` directly for setting prototypes (`obj.__proto__ = anotherObj`).
 * -   It's generally slower and less performant than `Object.create()` or using `new` with constructor functions/classes.
 * -   Use `Object.getPrototypeOf()` for reading.
 *
 * **11.3. Shadowing Properties:**
 * -   Be aware that assigning a property directly to an object will "shadow" (hide) a property
 * with the same name higher up in the prototype chain. The inherited property is not changed.
 *
 * **11.4. Performance:**
 * -   While prototype chains are efficient, excessively long chains can lead to minor performance
 * overhead during property lookups. In most applications, this is not a concern.
 *
 * **11.5. Use ES6 Classes:**
 * -   For new code, prefer ES6 `class` syntax for defining object blueprints and inheritance.
 * It provides a clearer, more readable, and more maintainable way to work with JavaScript's
 * prototypal inheritance.
 */

// =========================================================================
// 12. Conclusion
// =========================================================================

/**
 * **Conclusion:**
 * Prototypes are the fundamental mechanism behind inheritance in JavaScript. By understanding
 * the prototype chain, the distinction between `__proto__` and `prototype`, and how `new`
 * and `Object.create()` manipulate this chain, you gain a deep understanding of JavaScript's
 * object model. ES6 Classes offer a modern, syntactical sugar over this powerful prototypal
 * foundation, making object-oriented patterns more accessible and readable.
 */
