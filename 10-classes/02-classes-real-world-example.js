/**
 * File: 02-classes-real-world-examples.js
 * Description: Demonstrates real-world applications of JavaScript ES6 Classes,
 * showcasing inheritance, static methods, getters/setters, and practical scenarios.
 * Author: AI Assistant
 * Date: 2025-05-20
 */

// =========================================================================
// 1. Introduction: Classes in Action
// =========================================================================

/**
 * **Classes in Action:**
 * -   JavaScript classes are not just theoretical constructs; they are widely used
 * in modern web development to structure applications, manage state, and define
 * complex behaviors.
 * -   This document provides several practical, real-world examples to illustrate
 * how classes are applied in common scenarios.
 * -   These examples will cover inheritance, static methods, getters/setters,
 * and basic object-oriented design principles.
 */

// =========================================================================
// 2. Example: E-commerce Product Management (Inheritance)
// =========================================================================

/**
 * **Scenario:** Building a system to manage different types of products in an e-commerce store.
 * -   We'll create a base `Product` class and then extend it for specific product types
 * like `Book` and `Electronics`.
 * -   This demonstrates how inheritance allows child classes to reuse properties and methods
 * from a parent class while adding their own unique characteristics.
 */

// Base Class: Product
class Product {
  constructor(name, price, sku) {
    this.name = name;
    this.price = price;
    this.sku = sku; // Stock Keeping Unit
  }

  displayInfo() {
    console.log(
      `2. Product: ${this.name} | Price: $${this.price.toFixed(2)} | SKU: ${
        this.sku
      }`
    );
  }

  getPriceWithTax(taxRate = 0.08) {
    return this.price * (1 + taxRate);
  }
}

// Child Class: Book (inherits from Product)
class Book extends Product {
  constructor(name, price, sku, author, isbn) {
    super(name, price, sku); // Call parent Product's constructor
    this.author = author;
    this.isbn = isbn;
  }

  // Override the displayInfo method to add book-specific details
  displayInfo() {
    super.displayInfo(); // Call the parent's displayInfo
    console.log(`   Author: ${this.author} | ISBN: ${this.isbn}`);
  }

  getAuthorInfo() {
    return `Author of "${this.name}" is ${this.author}.`;
  }
}

// Child Class: Electronics (inherits from Product)
class Electronics extends Product {
  constructor(name, price, sku, brand, warrantyYears) {
    super(name, price, sku); // Call parent Product's constructor
    this.brand = brand;
    this.warrantyYears = warrantyYears;
  }

  getWarrantyInfo() {
    return `${this.name} (${this.brand}) comes with a ${this.warrantyYears}-year warranty.`;
  }

  // Add a new method specific to Electronics
  powerOn() {
    console.log(`2. Powering on the ${this.name}...`);
  }
}

// Creating instances
console.log("--- 2. E-commerce Product Management ---");
const laptop = new Electronics("Laptop Pro", 1200.0, "ELC001", "TechBrand", 2);
const novel = new Book(
  "The Great Adventure",
  15.99,
  "BOK001",
  "Jane Writer",
  "978-1234567890"
);
const headphones = new Product("Wireless Headphones", 99.5, "AUD001"); // Using base Product class

laptop.displayInfo();
console.log(laptop.getWarrantyInfo());
laptop.powerOn();

novel.displayInfo();
console.log(novel.getAuthorInfo());

headphones.displayInfo();
console.log(`Price with tax: $${headphones.getPriceWithTax().toFixed(2)}`);

// =========================================================================
// 3. Example: User Authentication Service (Static Methods & Private Fields)
// =========================================================================

/**
 * **Scenario:** Implementing a simple user authentication service.
 * -   This demonstrates the use of `static` methods for utility functions that
 * belong to the class itself (not individual user instances).
 * -   It also shows how to use private class fields (`#`) for true encapsulation
 * of sensitive data like user passwords.
 */

class AuthService {
  // Private static property to simulate a user database
  static #users = []; // Array to store registered user objects

  /**
   * Private static method for generating a simple user ID.
   * @returns {number} A unique user ID.
   */
  static #generateUserId() {
    return AuthService.#users.length > 0
      ? Math.max(...AuthService.#users.map((u) => u.id)) + 1
      : 1;
  }

  /**
   * Registers a new user.
   * This is a static method as it operates on the class's user data, not a specific instance.
   * @param {string} username - The desired username.
   * @param {string} password - The desired password.
   * @returns {object} An object indicating success or failure.
   */
  static registerUser(username, password) {
    if (!username || !password) {
      return { success: false, message: "Username and password are required." };
    }
    if (AuthService.#users.some((user) => user.username === username)) {
      return { success: false, message: "Username already exists." };
    }

    const newUser = {
      id: AuthService.#generateUserId(),
      username: username,
      password: password, // Store password as a regular property (for demonstration only)
    };
    AuthService.#users.push(newUser);
    console.log(`3. User '${username}' registered successfully.`);
    return { success: true, message: "Registration successful." };
  }

  /**
   * Logs in a user.
   * This is also a static method.
   * @param {string} username - The username to log in.
   * @param {string} password - The password for the user.
   * @returns {object} An object indicating success, with user ID if successful.
   */
  static loginUser(username, password) {
    const user = AuthService.#users.find((u) => u.username === username);
    if (user && user.password === password) {
      // Compare password property
      console.log(`3. User '${username}' logged in successfully.`);
      return { success: true, userId: user.id, message: "Login successful." };
    } else {
      console.log(`3. Login failed for '${username}'.`);
      return { success: false, message: "Invalid username or password." };
    }
  }

  /**
   * Gets all registered users (for demonstration/admin purposes).
   * @returns {Array} A list of registered users (without private passwords).
   */
  static getAllUsers() {
    // Return a copy to prevent external modification of the internal array
    return AuthService.#users.map((user) => ({
      id: user.id,
      username: user.username,
    }));
  }
}

// Using the AuthService
console.log("\n--- 3. User Authentication Service ---");
AuthService.registerUser("alice_user", "pass123");
AuthService.registerUser("bob_user", "securepwd");
AuthService.registerUser("alice_user", "anotherpass"); // Fails: username exists

AuthService.loginUser("alice_user", "pass123"); // Success
AuthService.loginUser("bob_user", "wrongpwd"); // Failure
AuthService.loginUser("charlie_user", "anypass"); // Failure: user not found

console.log("3. Registered Users:", AuthService.getAllUsers());
// console.log(AuthService.#users); // Error: Private field '#users' must be declared in an enclosing class

// =========================================================================
// 4. Example: Simple Game Character (Getters/Setters)
// =========================================================================

/**
 * **Scenario:** Creating a basic game character with health and attack capabilities.
 * -   This example demonstrates using getters and setters to control access to
 * properties like `health`, allowing for validation or computed values.
 */

class GameCharacter {
  constructor(name, initialHealth, attackPower) {
    this.name = name;
    this.#health = initialHealth; // Private field for health
    this.attackPower = attackPower;
  }

  // Private field for health
  #health;

  /**
   * Getter for character's current health.
   * @returns {number} The current health.
   */
  get health() {
    return this.#health;
  }

  /**
   * Setter for character's health.
   * Includes validation to ensure health doesn't go below 0.
   * @param {number} newHealth - The new health value.
   */
  set health(newHealth) {
    if (typeof newHealth === "number" && newHealth >= 0) {
      this.#health = newHealth;
      console.log(`4. ${this.name}'s health updated to ${this.#health}.`);
    } else if (newHealth < 0) {
      this.#health = 0; // Health cannot be negative
      console.log(`4. ${this.name}'s health dropped to 0.`);
    } else {
      console.warn("4. Invalid health value provided.");
    }
  }

  takeDamage(amount) {
    if (amount > 0) {
      this.health -= amount; // Uses the setter
      if (this.health <= 0) {
        console.log(`4. ${this.name} has been defeated!`);
      }
    }
  }

  attack(targetCharacter) {
    console.log(
      `4. ${this.name} attacks ${targetCharacter.name} for ${this.attackPower} damage!`
    );
    targetCharacter.takeDamage(this.attackPower);
  }
}

// Creating game characters
console.log("\n--- 4. Simple Game Character ---");
const hero = new GameCharacter("Hero", 100, 15);
const goblin = new GameCharacter("Goblin", 50, 8);

console.log(`${hero.name} Health: ${hero.health}`);
console.log(`${goblin.name} Health: ${goblin.health}`);

hero.attack(goblin); // Hero attacks Goblin
goblin.attack(hero); // Goblin attacks Hero

console.log(`${hero.name} Health: ${hero.health}`);
console.log(`${goblin.name} Health: ${goblin.health}`);

hero.attack(goblin); // Hero attacks Goblin again
hero.attack(goblin); // Hero attacks Goblin one more time
console.log(`${goblin.name} Health: ${goblin.health}`); // Goblin should be defeated

// Try to set invalid health
hero.health = -10; // Will be set to 0
hero.health = "invalid"; // Will warn

// =========================================================================
// 5. Conclusion: The Versatility of Classes
// =========================================================================

/**
 * **Conclusion:**
 * These real-world examples demonstrate the versatility and power of JavaScript classes.
 * They provide a clear and organized way to:
 * -   Define blueprints for objects with shared properties and behaviors.
 * -   Implement inheritance to create specialized versions of objects.
 * -   Encapsulate data using private fields.
 * -   Control property access and validation with getters and setters.
 * -   Provide utility functions at the class level using static methods.
 * By leveraging these features, you can build more robust, scalable, and maintainable
 * JavaScript applications.
 */
