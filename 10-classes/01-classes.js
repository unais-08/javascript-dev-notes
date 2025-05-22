/**
 * File: 01-classes.js
 * Description: A beginner-friendly tutorial on JavaScript ES6 Classes.
 * Explains what classes are, how to create them, instantiate objects,
 * use methods, implement inheritance, and understand their role as
 * syntactic sugar over prototypes.
 * Date: 2025-05-22
 */

// =========================================================================
// 1. What are Classes? (The Blueprint Analogy)
// =========================================================================

/**
 * **What are Classes?**
 * -   In JavaScript (since ES6), a `class` is a special type of function that provides
 * a cleaner and more structured way to create objects.
 * -   Think of a class as a **blueprint** or a **template** for creating objects.
 * -   Just like a blueprint for a house defines its rooms, windows, and doors,
 * a class defines the properties (data) and methods (actions) that objects
 * created from that class will have.
 * -   **Important:** Classes are NOT a new way of doing object-oriented programming
 * in JavaScript. They are "syntactic sugar" over JavaScript's existing
 * **prototypal inheritance** model. This means they provide a nicer, more familiar
 * syntax, but internally, they still use prototypes.
 */

// =========================================================================
// 2. Basic Class Syntax: Defining a Class
// =========================================================================

/**
 * **Basic Class Syntax:**
 * -   You define a class using the `class` keyword, followed by the class name.
 * -   Class names typically start with an uppercase letter (e.g., `Person`, `Car`).
 * -   Inside the class, you define:
 * -   A `constructor` method: This is a special method that gets called
 * automatically when you create a new object from the class. It's
 * where you initialize the object's properties.
 * -   Other methods: These are functions that define the actions the objects
 * can perform.
 */

// Example 1: Defining a simple Person class
class Person {
  /**
   * The constructor method is called when a new Person object is created.
   * It takes 'name' and 'age' as arguments and assigns them as properties
   * to the new object (using 'this').
   * @param {string} name - The name of the person.
   * @param {number} age - The age of the person.
   */
  constructor(name, age) {
    this.name = name; // 'this' refers to the new object being created
    this.age = age;
  }

  /**
   * A method to greet the person.
   * This method will be available on all instances of the Person class.
   */
  greet() {
    console.log(
      `1. Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }

  /**
   * A method to celebrate a birthday.
   */
  celebrateBirthday() {
    this.age++;
    console.log(`1. Happy birthday, ${this.name}! You are now ${this.age}.`);
  }
}

// =========================================================================
// 3. Creating Objects (Instances) from a Class
// =========================================================================

/**
 * **Creating Instances:**
 * -   To create a new object (an "instance") from a class, you use the `new` keyword
 * followed by the class name and any arguments for the constructor.
 * -   This process is called "instantiation."
 */

// Example 2: Creating instances of the Person class
const alice = new Person("Alice", 30); // Calls the constructor
const bob = new Person("Bob", 25); // Calls the constructor again

console.log("2. Alice object:", alice); // Output: Person { name: 'Alice', age: 30 }
console.log("2. Bob object:", bob); // Output: Person { name: 'Bob', age: 25 }

// Using the methods on the instances
alice.greet(); // Output: Hello, my name is Alice and I am 30 years old.
bob.celebrateBirthday(); // Output: Happy birthday, Bob! You are now 26.

// Check if an object is an instance of a class
console.log("2. Is Alice a Person?", alice instanceof Person); // Output: true

// =========================================================================
// 4. Class Inheritance: Extending Classes
// =========================================================================

/**
 * **Class Inheritance:**
 * -   Classes allow you to create new classes based on existing ones. This is called
 * "inheritance."
 * -   The `extends` keyword is used to create a child class that inherits from a parent class.
 * -   The `super()` keyword is used inside the child class's constructor to call the
 * parent class's constructor. This is essential to initialize properties defined in the parent.
 * -   Child classes inherit all properties and methods from their parent class.
 * -   They can also add their own new properties/methods or override (redefine) parent methods.
 */

// Example 3: Creating a Student class that extends Person
class Student extends Person {
  /**
   * Constructor for the Student class.
   * @param {string} name - The name of the student.
   * @param {number} age - The age of the student.
   * @param {string} studentId - The student's ID.
   */
  constructor(name, age, studentId) {
    super(name, age); // Call the parent (Person) constructor to initialize name and age
    this.studentId = studentId; // Add a new property specific to Student
  }

  /**
   * A method specific to Student.
   */
  study() {
    console.log(`3. ${this.name} (ID: ${this.studentId}) is studying.`);
  }

  /**
   * Override the parent's greet method (optional).
   */
  greet() {
    console.log(
      `3. Hi, I'm ${this.name}, a student with ID ${this.studentId}.`
    );
  }
}

// Creating an instance of the Student class
const charlie = new Student("Charlie", 20, "S12345");

charlie.greet(); // Output: Hi, I'm Charlie, a student with ID S12345. (Overridden method)
charlie.study(); // Output: Charlie (ID: S12345) is studying. (New method)
charlie.celebrateBirthday(); // Output: Happy birthday, Charlie! You are now 21. (Inherited method)

console.log("3. Is Charlie a Student?", charlie instanceof Student); // Output: true
console.log("3. Is Charlie a Person?", charlie instanceof Person); // Output: true (due to inheritance)

// =========================================================================
// 5. Static Methods: Class-Level Methods
// =========================================================================

/**
 * **Static Methods:**
 * -   Static methods belong to the class itself, not to instances of the class.
 * -   They are defined using the `static` keyword.
 * -   You call them directly on the class name, not on an object instance.
 * -   They are often used for utility functions that don't depend on specific
 * instance data.
 */

// Example 4: Static method in a MathUtility class
class MathUtility {
  /**
   * A static method to add two numbers.
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number} The sum of a and b.
   */
  static add(a, b) {
    return a + b;
  }

  /**
   * A static method to get a random number within a range.
   * @param {number} min - The minimum value.
   * @param {number} max - The maximum value.
   * @returns {number} A random number between min and max.
   */
  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

console.log("4. Sum using static method:", MathUtility.add(10, 5)); // Output: 15
console.log("4. Random number:", MathUtility.getRandomNumber(1, 10)); // Output: (a random number between 1 and 10)

// const calculator = new MathUtility();
// calculator.add(1, 2); // This would cause an error: calculator.add is not a function

// =========================================================================
// 6. Getters and Setters: Controlling Property Access
// =========================================================================

/**
 * **Getters and Setters:**
 * -   Getters and setters are special methods that allow you to control how
 * object properties are accessed (`get`) and modified (`set`).
 * -   They are defined using the `get` and `set` keywords.
 * -   They look like properties when accessed, but they are actually functions.
 * -   Useful for validation, computed properties, or side effects when a property is accessed/modified.
 */

// Example 5: Using getters and setters
class Temperature {
  constructor(celsius) {
    this._celsius = celsius; // Use a convention (e.g., underscore) for the actual private-like property
  }

  /**
   * Getter for Celsius temperature.
   * @returns {number} The temperature in Celsius.
   */
  get celsius() {
    return this._celsius;
  }

  /**
   * Setter for Celsius temperature.
   * Performs validation before setting.
   * @param {number} newCelsius - The new temperature in Celsius.
   */
  set celsius(newCelsius) {
    if (typeof newCelsius === "number") {
      this._celsius = newCelsius;
      console.log(`5. Celsius updated to: ${newCelsius}`);
    } else {
      console.warn("5. Invalid temperature. Celsius must be a number.");
    }
  }

  /**
   * Getter for Fahrenheit temperature (computed property).
   * @returns {number} The temperature in Fahrenheit.
   */
  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  }

  /**
   * Setter for Fahrenheit temperature.
   * Converts Fahrenheit to Celsius before setting.
   * @param {number} newFahrenheit - The new temperature in Fahrenheit.
   */
  set fahrenheit(newFahrenheit) {
    if (typeof newFahrenheit === "number") {
      this._celsius = ((newFahrenheit - 32) * 5) / 9;
      console.log(`5. Fahrenheit updated to: ${newFahrenheit}`);
    } else {
      console.warn("5. Invalid temperature. Fahrenheit must be a number.");
    }
  }
}

const temp = new Temperature(25); // Initial Celsius
console.log("5. Initial Celsius:", temp.celsius); // Accessing getter
console.log("5. Initial Fahrenheit:", temp.fahrenheit); // Accessing computed getter

temp.celsius = 30; // Using setter
console.log("5. New Celsius:", temp.celsius);

temp.fahrenheit = 68; // Using setter (converts to Celsius internally)
console.log("5. Celsius after Fahrenheit set:", temp.celsius);

temp.celsius = "abc"; // Invalid input, setter warns
console.log("5. Celsius after invalid set:", temp.celsius);

// =========================================================================
// 7. Private Class Fields (Modern JavaScript - ES2022)
// =========================================================================

/**
 * **Private Class Fields (`#` prefix):**
 * -   Introduced in ES2022, private class fields provide true encapsulation
 * for class properties.
 * -   They are prefixed with a `#` (hash) symbol.
 * -   Private fields can only be accessed from inside the class itself.
 * -   This offers a robust way to define truly private state, unlike the
 * underscore convention (`_property`), which is just a hint.
 */

// Example 6: Private class fields
class BankAccount {
  #balance; // Private field

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`6. Deposited ${amount}. New balance: ${this.#balance}`);
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`6. Withdrew ${amount}. New balance: ${this.#balance}`);
    } else {
      console.log("6. Insufficient funds or invalid amount.");
    }
  }

  getBalance() {
    return this.#balance; // Accessible from inside the class
  }
}

const myAccount = new BankAccount(100);
myAccount.deposit(50); // Output: Deposited 50. New balance: 150
myAccount.withdraw(30); // Output: Withdrew 30. New balance: 120

// console.log(myAccount.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class
console.log("6. Current balance (via getter):", myAccount.getBalance()); // Output: 120

// =========================================================================
// 8. Classes as Syntactic Sugar (Revisited)
// =========================================================================

/**
 * **Classes as Syntactic Sugar:**
 * -   It's important to reiterate that ES6 `class` syntax is **syntactic sugar**
 * over JavaScript's existing **prototypal inheritance** and **constructor functions**.
 * -   This means that under the hood, the JavaScript engine still uses prototypes
 * and constructor functions to implement classes.
 * -   `class` provides a more familiar and readable syntax for developers, especially
 * those coming from other object-oriented languages.
 * -   Understanding this underlying mechanism helps in debugging and truly grasping
 * JavaScript's unique object model.
 */

// =========================================================================
// 9. Best Practices for Classes
// =========================================================================

/**
 * **Best Practices:**
 * -   **Use `new`:** Always use the `new` keyword when creating instances from a class.
 * -   **Capitalize Class Names:** Follow the convention of starting class names with an uppercase letter.
 * -   **Place Methods on Class Body:** Define methods directly inside the class body; they will automatically be placed on the prototype.
 * -   **Use `super()` in Child Constructors:** Always call `super()` in a child class's constructor before using `this`.
 * -   **Consider Private Fields:** For true encapsulation, use private class fields (`#`).
 * -   **Prefer Classes for Inheritance:** For class-like inheritance, ES6 Classes are the most readable and maintainable approach.
 * -   **Balance with Factory Functions:** For simpler object creation or when strong private state and composition are priorities, factory functions might still be a good alternative.
 */

// =========================================================================
// 10. Conclusion
// =========================================================================

/**
 * **Conclusion:**
 * JavaScript ES6 Classes provide a powerful, clean, and intuitive way to structure
 * object-oriented code. By understanding their syntax, how to create instances,
 * implement inheritance, and leverage features like static methods and getters/setters,
 * you can write more organized and maintainable applications. Remembering that they
 * are syntactic sugar over prototypes will deepen your understanding of JavaScript's
 * unique object model.
 */
