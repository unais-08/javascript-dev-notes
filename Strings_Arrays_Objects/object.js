/**
 * JavaScript Objects: A comprehensive guide with examples
 *
 * JavaScript objects are key-value pairs used to store data. An object can contain any data type,
 * including functions, arrays, and other objects.
 */

/**
 * 1. Object Literal Syntax
 * The most common way to create an object is using object literal syntax.
 */

const person = {
  firstName: "John", // Property: key-value pair
  lastName: "Doe",
  age: 30,
  fullName: function () {
    // Method: function as a property
    return this.firstName + " " + this.lastName;
  },
};

console.log(person.firstName); // Accessing properties using dot notation
console.log(person["lastName"]); // Accessing properties using bracket notation
console.log(person.fullName()); // Accessing methods

/**
 * 2. Object Constructor Syntax
 * Objects can also be created using the `new Object()` constructor.
 */

const car = new Object(); // Creates an empty object
car.make = "Toyota";
car.model = "Corolla";
car.year = 2020;

console.log(car.make); // "Toyota"

/**
 * 3. Accessing Object Properties
 * Properties of an object can be accessed in two ways:
 * - Dot notation: object.property
 * - Bracket notation: object["property"]
 */

const employee = {
  name: "Alice",
  position: "Developer",
  skills: ["JavaScript", "React", "Node.js"],
};

console.log(employee.name); // "Alice"
console.log(employee["skills"]); // ["JavaScript", "React", "Node.js"]

/**
 * 4. Adding/Modifying Object Properties
 * You can add new properties or modify existing ones using both dot and bracket notation.
 */

// Adding a new property
employee.salary = 50000;
console.log(employee.salary); // 50000

// Modifying an existing property
employee.position = "Senior Developer";
console.log(employee.position); // "Senior Developer"

/**
 * 5. Deleting Object Properties
 * Use the `delete` operator to remove a property from an object.
 */

delete employee.salary;
console.log(employee.salary); // undefined

/**
 * 6. Nested Objects
 * Objects can be nested inside other objects, allowing for complex structures.
 */

const company = {
  name: "TechCorp",
  location: {
    city: "San Francisco",
    country: "USA",
  },
  employees: 120,
};

console.log(company.location.city); // "San Francisco"
console.log(company["location"]["country"]); // "USA"

/**
 * 7. Object Methods
 * Functions that are properties of objects are called methods.
 */

const book = {
  title: "JavaScript Guide",
  author: "John Smith",
  getDetails: function () {
    return this.title + " by " + this.author;
  },
};

console.log(book.getDetails()); // "JavaScript Guide by John Smith"

/**
 * 8. `this` Keyword in Objects
 * The `this` keyword refers to the object it is called from.
 * Inside a method, `this` refers to the object itself.
 */

const personDetails = {
  name: "Bob",
  age: 25,
  greet: function () {
    return `Hello, my name is ${this.name} and I'm ${this.age} years old.`;
  },
};

console.log(personDetails.greet()); // "Hello, my name is Bob and I'm 25 years old."

/**
 * 9. Object Destructuring
 * Object destructuring allows you to extract properties from objects and assign them to variables.
 */

const user = {
  id: 1,
  username: "jsuser",
  email: "user@example.com",
};

const { id, username, email } = user; // Destructuring assignment

console.log(id); // 1
console.log(username); // "jsuser"
console.log(email); // "user@example.com"

/**
 * 10. Object.assign() - Cloning and Merging Objects
 * The `Object.assign()` method is used to copy all properties from one or more source objects to a target object.
 */

// Cloning an object
const original = { name: "Chris", age: 28 };
const clone = Object.assign({}, original);

console.log(clone); // { name: "Chris", age: 28 }

// Merging objects
const additionalInfo = { city: "New York", country: "USA" };
const merged = Object.assign({}, original, additionalInfo);

console.log(merged); // { name: "Chris", age: 28, city: "New York", country: "USA" }

/**
 * 11. Object.keys(), Object.values(), Object.entries()
 * These methods allow you to work with an object's keys, values, and entries (key-value pairs).
 */

// Object.keys() - Returns an array of object property names
console.log(Object.keys(person)); // ["firstName", "lastName", "age", "fullName"]

// Object.values() - Returns an array of object property values
console.log(Object.values(person)); // ["John", "Doe", 30, [Function: fullName]]

// Object.entries() - Returns an array of key-value pairs (arrays)
console.log(Object.entries(person)); // [["firstName", "John"], ["lastName", "Doe"], ["age", 30], ["fullName", [Function: fullName]]]

/**
 * 12. Object.freeze() - Making Objects Immutable
 * The `Object.freeze()` method prevents any modification to the object.
 */

const immutableObject = Object.freeze({ name: "Eve" });
immutableObject.name = "Adam"; // This will not work
console.log(immutableObject.name); // "Eve"

/**
 * 13. Object.create() - Creating Objects from Prototypes
 * The `Object.create()` method creates a new object with the specified prototype object and properties.
 */

const prototypeObject = {
  greet: function () {
    return `Hello from ${this.name}`;
  },
};

const newObject = Object.create(prototypeObject);
newObject.name = "Alice";
console.log(newObject.greet()); // "Hello from Alice"

/**
 * 14. The Prototype Chain
 * Every object in JavaScript has an internal link to another object called its prototype.
 * The prototype object is where JavaScript looks for properties and methods that are not present in the object itself.
 */

console.log(newObject.toString()); // "Hello from Alice"
console.log(newObject.hasOwnProperty("name")); // true
console.log(newObject.hasOwnProperty("greet")); // false (Inherited from prototype)

/**
 * Conclusion:
 * JavaScript objects are incredibly powerful, allowing you to model complex data structures.
 * Whether you're working with simple objects, creating methods, or using more advanced concepts like prototypes and immutability,
 * mastering objects is essential for becoming proficient in JavaScript.
 */
