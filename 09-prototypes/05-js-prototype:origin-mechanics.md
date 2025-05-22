# JavaScript Prototypes: Origin & Mechanics

This document provides a deep dive into the fundamental origins and behind-the-scenes mechanics of JavaScript's prototypal inheritance, explaining how prototypes are created, linked, and utilized by built-in constructors like `Array` and `Object`.

## 1\. The Genesis: `Object.prototype` and `null`

The entire prototype system in JavaScript has a starting point: `Object.prototype`.

- **The Ultimate Ancestor:** `Object.prototype` is a special, built-in object that serves as the ultimate ancestor for almost all objects in JavaScript. It's the highest point in most prototype chains.

- **Built-in Methods:** It contains common, fundamental methods that nearly all objects need, such as `toString()`, `hasOwnProperty()`, `isPrototypeOf()`, `valueOf()`, etc. These methods are inherited by default.

- **The End of the Line:** `Object.prototype` itself has `null` as its prototype. This is the **only** object in the standard JavaScript environment whose `[[Prototype]]` (its internal link to its prototype) is `null`. This `null` signifies the end of the prototype chain. When the JavaScript engine traverses the chain during property lookup and reaches `null`, it knows there are no more prototypes to check.

**Conceptual Diagram:**

```
[Object.prototype]  ───►  null
  (Base object)

```

## 2\. How Prototypes are Created and Attached (Behind the Scenes)

Prototypes aren't "created" in a single, uniform way in your JavaScript code. Instead, they are _assigned_ or _linked_ when new objects are created, based on the method of object creation. The JavaScript engine handles these links internally.

### 2.1. Object Literals (`{}`)

- **Creation:** When you create an object using the literal syntax (`{}`), you are essentially creating a new, plain JavaScript object.

- **Attachment:** The JavaScript engine automatically sets the `[[Prototype]]` of this new object to `Object.prototype`. This means your plain object immediately inherits all the methods from `Object.prototype`.

**Conceptual Flow:**

```
let obj = {};
// Internally: obj.[[Prototype]] = Object.prototype;

```

**Diagram:**

```
obj  ───►  Object.prototype  ───►  null

```

### 2.2. `new Object()`

- **Creation:** Calling `new Object()` explicitly uses the built-in `Object` constructor function.

- **Attachment:** The `new` keyword's mechanism (detailed below) ensures that the `[[Prototype]]` of the newly created object is set to `Object.prototype`. This behaves identically to object literals in terms of prototype linkage for plain objects.

**Conceptual Flow:**

```
let obj = new Object();
// Internally: obj.[[Prototype]] = Object.prototype;

```

### 2.3. Constructor Functions (`function MyConstructor() {}` with `new`)

This is where the `prototype` _property_ on functions becomes crucial.

- **Constructor Function Definition:** When you define a regular function (e.g., `function Person() {}`), this function automatically gets a `prototype` property. This `prototype` property is an object, and its `[[Prototype]]` is initially `Object.prototype`.

  - `Person.prototype` is just a plain object by default.

  - `Person.prototype.[[Prototype]]` is `Object.prototype`.

- **The `new` Keyword's Role (The 4 Steps):** When you call a constructor function with `new` (e.g., `new Person()`):

  1.  A **new, empty object** is created in memory.

  2.  The `[[Prototype]]` of this **newly created object** is set to the `prototype` property of the constructor function (`Person.prototype` in this case). **This is how the link is established.**

  3.  The constructor function (`Person`) is executed, with `this` bound to the newly created object. This allows properties to be added directly to the instance (e.g., `this.name = name;`).

  4.  The newly created object (bound to `this`) is returned, unless the constructor explicitly returns a different object.

**Conceptual Flow:**

```js
function Person(name) {
  this.name = name;
}
// Behind the scenes when Person is defined:
// Person.prototype = { constructor: Person, __proto__: Object.prototype };

const alice = new Person("Alice");
// When 'new Person("Alice")' is called:
// 1. newObject = {};
// 2. newObject.[[Prototype]] = Person.prototype;  // Link established here!
// 3. Person.call(newObject, "Alice"); // 'this.name = "Alice"' adds 'name' to newObject
// 4. return newObject;
```

**Diagram:**

```
alice (instance) ───► Person.prototype ───► Object.prototype ───► null

```

### 2.4. `Object.create()`

- **Creation:** `Object.create(protoObject)` creates a new object.

- **Attachment:** The `[[Prototype]]` of the _new object_ is directly set to `protoObject`. This is the most explicit way to set an object's prototype.

**Conceptual Flow:**

```
const myProto = { sharedMethod: () => console.log("Shared!") };
const instance = Object.create(myProto);
// Internally: instance.[[Prototype]] = myProto;

```

**Diagram:**

```
instance ───► myProto ───► Object.prototype ───► null

```

### 2.5. ES6 Classes (`class MyClass {}`)

- **Creation:** `class` syntax is syntactic sugar. When you define a class, the engine internally creates a constructor function and manages its `prototype` property.

- **Attachment:**

  - Methods defined directly in the `class` body are placed on the constructor's `prototype` (e.g., `MyClass.prototype.myMethod = function() {}`).

  - When you use `extends`, the engine sets up the prototype chain between the `prototype` objects of the parent and child classes (e.g., `ChildClass.prototype.[[Prototype]] = ParentClass.prototype`).

**Conceptual Flow:**

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}
// Internally:
// function Animal(name) { this.name = name; }
// Animal.prototype.speak = function() { ... };
// Animal.prototype.__proto__ = Object.prototype;

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  bark() {
    console.log("Woof!");
  }
}
// Internally:
// function Dog(name) { Animal.call(this, name); }
// Dog.prototype.bark = function() { ... };
// Dog.prototype.__proto__ = Animal.prototype; // This is the 'extends' magic
```

**Diagram:**

```
myDog (instance) ───► Dog.prototype ───► Animal.prototype ───► Object.prototype ───► null

```

## 3\. Built-in Constructors (`Array`, `Function`, etc.)

You correctly asked how `Array` and `Function` constructors fit in.

- **Native Implementation:** The built-in constructors like `Array`, `Object`, `Function`, `String`, `Number`, `Boolean`, `Date`, `RegExp`, etc., are **not implemented in JavaScript itself**. They are part of the JavaScript engine's core, written in lower-level languages (like C++ in V8).

- **Exposed as Constructor Functions:** However, they are _exposed_ to the JavaScript environment as constructor functions that **behave exactly like** custom constructor functions you would write.

- **Populated Prototypes:** The engine automatically populates their `prototype` properties with all the standard methods:

  - `Array.prototype` gets `map`, `filter`, `forEach`, `push`, `pop`, etc.

  - `Function.prototype` gets `call`, `apply`, `bind`.

  - `String.prototype` gets `length`, `toUpperCase`, `substring`, etc.

- **Instance Creation:**

  - When you use `new Array()` or `new Function()`, the `new` keyword's steps apply, linking the instance to `Array.prototype` or `Function.prototype`.

  - When you use literal syntax (`[]` for arrays, `{}` for objects, `function() {}` for functions), the engine implicitly performs the necessary steps to create the object and link its `[[Prototype]]` to the correct built-in prototype.

**Conceptual Example:**

```js
// This is how it *conceptually* works, not literal JS code in the engine:
// Array.prototype = {
//   map: function() { /* ... */ },
//   filter: function() { /* ... */ },
//   // ... many other methods
//   __proto__: Object.prototype // Array.prototype itself inherits from Object.prototype
// };

const myArray = [1, 2, 3]; // Internally: new Array(1, 2, 3)
// myArray.__proto__ === Array.prototype; // true
myArray.map((x) => x * 2); // map is found on Array.prototype

// Function.prototype = {
//   call: function() { /* ... */ },
//   apply: function() { /* ... */ },
//   bind: function() { /* ... */ },
//   __proto__: Object.prototype // Function.prototype itself inherits from Object.prototype
// };

function myFunc() {}
// myFunc.__proto__ === Function.prototype; // true
myFunc.call(this, arg); // call is found on Function.prototype
```

## 4\. Summary of Prototype Attachment

| Object Creation Method | How `[[Prototype]]` is Set **This** is a short summary of the document.

**Suggestions:**

- Consider exploring how these methods are used in combination with other array methods for more complex data transformations.

- Experiment with different callback functions to see various results.

```
**Explanation of the Code:**

* **`customMap(inputArray, callback)`:**
    * It initializes an empty array `newArray`.
    * It then loops through each `currentElement` in the `inputArray` using its `index`.
    * For each `currentElement`, it calls the `callback` function, passing the `currentElement`, its `index`, and the `inputArray` itself (just like the built-in `map`).
    * The `transformedValue` returned by the `callback` is pushed into `newArray`.
    * Finally, `newArray` (containing all the transformed elements) is returned.

* **`customFilter(inputArray, callback)`:**
    * It initializes an empty array `filteredArray`.
    * It loops through each `currentElement` in the `inputArray`.
    * For each `currentElement`, it calls the `callback` function. The `callback` is expected to return a boolean (`true` if the element should be kept, `false` otherwise).
    * If `shouldInclude` (the result of the callback) is `true`, the `currentElement` is pushed into `filteredArray`.
    * Finally, `filteredArray` (containing only the elements that passed the test) is returned.

* **`customFind(inputArray, callback)`:**
    * It iterates through each `currentElement` in the `inputArray`.
    * For each `currentElement`, it calls the `callback` function. The `callback` is expected to return a boolean.
    * If `satisfiesCondition` (the result of the callback) is `true`, it immediately `return`s that `currentElement`. This means it stops iterating as soon as the first match is found.
    * If the loop completes without any element satisfying the condition, it returns `undefined` (because the `for` loop finishes and the function implicitly returns `undefined` if no `return currentElement` is hit).

* **`customReduce(callback, initialValue)`:**
    * This one is slightly more complex because `reduce` can be called with or without an `initialValue`.
    * `accumulator`: Stores the accumulated result. It's initialized with `initialValue` if provided.
    * `startIndex`: Determines where the loop should begin.
    * **Handling `initialValue`:**
        * If `initialValue` is `undefined` (meaning it wasn't provided by the caller):
            * It first checks if the array is empty. If so, it throws a `TypeError`, mimicking the built-in `reduce` behavior.
            * The `accumulator` is set to the *first element* of the array (`this[0]`).
            * The `startIndex` is set to `1`, so the loop starts from the *second element*.
        * If `initialValue` *is* provided, the `accumulator` is set to it, and `startIndex` remains `0`.
    * **Iteration:** The loop iterates from `startIndex` to the end of the array.
    * `this.hasOwnProperty(index)`: This check is important for sparse arrays (arrays with "holes") to ensure we only process actual elements.
    * Inside the loop, the `callback` is executed with the `accumulator`, `currentValue`, `index`, and the `array` itself (`this`). The result of the `callback` becomes the new `accumulator`.
    * Finally, the `accumulator` holds the single, reduced value and is returned.
* **`Array.prototype.customReduce = customReduce;`:** This line is crucial. It attaches your `customReduce` function directly to the `Array.prototype` object. This makes `customReduce` available as a method on *all* array instances, just like `map` or `filter`.

This structure provides a professional, easy-to-understand, and revisable document for your custom array methods.

```
