/**
 * File: 01-object-introduction.js
 * Description: Deep dive into JavaScript objects, covering creation, manipulation,
 * properties, methods, and modern ES6+ features.  Designed for clarity,
 * maintainability, and future reference.
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// =========================================================================
// 1. Object Creation: Literal Syntax
// =========================================================================

/**
 * **Object Literal Syntax:**
 * - The most common and concise way to create JavaScript objects.
 * - Uses curly braces `{}` to define an object.
 * - Properties are defined as key-value pairs, separated by commas.
 * - Keys can be strings (quoted or unquoted), numbers, or symbols.
 * - Values can be any valid JavaScript data type (primitives, objects, functions).
 *
 * **Example:**
 * Creating a user profile object with various properties.
 */
const userProfile = {
  name: "Unais Shaikh",
  age: 22,
  isStudent: true,
  interests: ["coding", "reading", "football"],
  address: {
    city: "Mumbai",
    state: "Maharashtra",
  },
};

console.log("1. User Profile (Object Literal):", userProfile);

// =========================================================================
// 2. Accessing Properties: Dot Notation and Bracket Notation
// =========================================================================

/**
 * **Accessing Properties:**
 * - JavaScript provides two primary ways to access object properties:
 *
 * 2.1. **Dot Notation:**
 * - Uses a dot (`.`) followed by the property name.
 * - More concise and preferred when the property name is a valid JavaScript identifier
 * (i.e., no spaces, special characters, or starting with a number).
 *
 * 2.2. **Bracket Notation:**
 * - Uses square brackets `[]` and a string representing the property name.
 * - Essential when property names are not valid identifiers (e.g., contain spaces)
 * or when you need to use a variable to access the property.
 *
 * **Examples:**
 */
console.log("2.1 Name (Dot Notation):", userProfile.name);
console.log("2.2 City (Bracket Notation):", userProfile.address["city"]);
console.log("2.3 City (Nested Bracket Notation):", userProfile["address"]["city"]);

// Accessing with a variable key:
const keyToAccess = "age";
console.log("2.4 Age (Variable Key):", userProfile[keyToAccess]);

// =========================================================================
// 3. Adding and Modifying Properties
// =========================================================================

/**
 * **Adding and Modifying Properties:**
 * - JavaScript objects are dynamic, meaning you can easily add, modify, and delete properties
 * after the object has been created.
 */

// 3.1 Adding new properties:
userProfile.email = "unais@example.com";      // Dot notation
userProfile["phoneNumber"] = "9876543210"; // Bracket notation

console.log("3.1 Updated Profile (Added Properties):", userProfile);

// 3.2 Updating existing properties:
userProfile.age = 23;             // Dot notation
userProfile.address.city = "Pune"; // Dot notation for nested object

console.log("3.2 Updated Profile (Modified Properties):", userProfile);

// =========================================================================
// 4. Deleting Properties: The `delete` Operator
// =========================================================================

/**
 * **Deleting Properties:**
 * - The `delete` operator removes a property from an object.
 * - It returns `true` if the deletion was successful (or if the property didn't exist)
 * and `false` if the property could not be deleted (e.g., if it's a non-configurable
 * property of the object).
 */
delete userProfile.isStudent;
console.log("4. Profile After Deleting 'isStudent':", userProfile);

// =========================================================================
// 5. Checking for Property Existence
// =========================================================================

/**
 * **Checking Property Existence:**
 * - There are two common ways to check if a property exists in an object:
 *
 * 5.1. **`in` Operator:**
 * - Returns `true` if the specified property is in the object or its prototype chain.
 *
 * 5.2. **`hasOwnProperty()` Method:**
 * - A method of the `Object.prototype` that returns `true` if the object has a
 * property with the specified name as a direct property of that object;
 * returns `false` if the property is inherited.
 */
console.log("5.1 Has 'email' property? (in):", "email" in userProfile);
console.log("5.2 Has 'isStudent' property? (hasOwnProperty):", userProfile.hasOwnProperty("isStudent"));

// =========================================================================
// 6. Iterating Over Properties: The `for...in` Loop
// =========================================================================

/**
 * **Iterating with `for...in`:**
 * - The `for...in` loop iterates over the enumerable properties of an object.
 * - It loops through the property names (keys) of the object.
 * - It also traverses the prototype chain
 * - Use `Object.keys()`, `Object.values()`, and `Object.entries()` for more direct control
 * over iteration in modern JavaScript.
 */
console.log("6. Iterating with for...in:");
for (let key in userProfile) {
  if (userProfile.hasOwnProperty(key)) { // Best practice: Check if it's a direct property
    console.log(`  ${key}: ${userProfile[key]}`);
  }
}

// =========================================================================
// 7. Object Methods: Functions Within Objects
// =========================================================================

/**
 * **Object Methods:**
 * - When a function is a property of an object, it's called a "method."
 * - Methods allow you to define behavior that is associated with an object.
 * - The `this` keyword inside a method refers to the object on which the method is called.
 */
const calculator = {
  a: 5,
  b: 3,
  /**
   * Adds the values of properties 'a' and 'b'.
   * @returns {number} The sum of 'a' and 'b'.
   */
  add: function () {
    return this.a + this.b;
  },
  /**
   * Multiplies the values of properties 'a' and 'b'.
   * @returns {number} The product of 'a' and 'b'.
   */
  multiply() { // Shorthand method syntax (ES6)
    return this.a * this.b;
  },
};

console.log("7.1 Calculator Add:", calculator.add());
console.log("7.2 Calculator Multiply:", calculator.multiply());

// =========================================================================
// 8. The `this` Keyword: Context within Methods
// =========================================================================

/**
 * **The `this` Keyword:**
 * - In a method, `this` refers to the object that "owns" the method
 * (the object on which the method is called).
 * - It allows methods to access and manipulate the object's properties.
 */
const person = {
  firstName: "Ali",
  lastName: "Khan",
  /**
   * Gets the full name of the person.
   * @returns {string} The full name (first name and last name).
   */
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log("8. Person Full Name:", person.getFullName());

// =========================================================================
// 9. Nested Objects: Organizing Data Hierarchically
// =========================================================================

/**
 * **Nested Objects:**
 * - Objects can contain other objects as properties, allowing you to structure data
 * in a hierarchical manner.
 * - This is useful for representing complex relationships and data structures.
 */
const library = {
  name: "City Library",
  books: [
    {
      title: "JavaScript Basics",
      author: { firstName: "John", lastName: "Doe" },
      year: 2020,
    },
    {
      title: "Advanced React",
      author: { firstName: "Jane", lastName: "Smith" },
      year: 2023,
    },
  ],
};

console.log("9. First Book Author First Name:", library.books[0].author.firstName);

// =========================================================================
// 10. Object Destructuring: Extracting Values with Ease
// =========================================================================

/**
 * **Object Destructuring (ES6):**
 * - A concise way to extract values from object properties and assign them to variables.
 * - You specify the properties you want to extract within curly braces `{}`.
 * - If a property name matches a variable name, the value is assigned to that variable.
 */
const { name: userName, age, email = "no-email@provided.com" } = userProfile; //alias and default value
console.log("10. Destructured values:", userName, age, email);

// =========================================================================
// 11. Shorthand Property Names (ES6): Concise Syntax
// =========================================================================

/**
 * **Shorthand Property Names (ES6):**
 * - If a variable name is the same as the property name you want to use in an object,
 * you can use a shorthand syntax.
 */
const city = "Bangalore";
const country = "India";

const locationInfo = { city, country }; // Shorthand
console.log("11. Location Info (Shorthand):", locationInfo);

// =========================================================================
// 12. Dynamic Property Keys: Computed Property Names (ES6)
// =========================================================================

/**
 * **Dynamic Property Keys (Computed Property Names - ES6):**
 * - You can use expressions within square brackets `[]` to use the result of an
 * expression as a property key.
 * - This allows you to create object properties with keys that are determined at runtime.
 */
const dynamicKey = "favoriteLanguage";
const developer = {
  name: "Sara",
  [dynamicKey]: "JavaScript", // Computed property name
};

console.log("12. Developer (Dynamic Key):", developer);

// =========================================================================
// 13. Immutability: Preventing Object Modification
// =========================================================================

/**
 * **Object.freeze():**
 * - The `Object.freeze()` method freezes an object.  A frozen object can no longer be changed.
 * - Freezing an object prevents new properties from being added, existing properties from
 * being removed, and the values of existing properties from being changed.
 * - It makes an object immutable (shallowly).
 * - Returns the frozen object.
 */
const constants = {
  PI: 3.14159,
};
Object.freeze(constants);
constants.PI = 3; // No effect in strict mode, ignored in sloppy mode
console.log("13. Frozen Object:", constants);

// =========================================================================
// 14. Retrieving Object Information: Keys, Values, and Entries
// =========================================================================

/**
 * **Object.keys(), Object.values(), Object.entries():**
 * - These static methods provide convenient ways to retrieve information about an object's
 * properties:
 *
 * 14.1. **Object.keys():**
 * - Returns an array containing the names of the object's enumerable properties.
 *
 * 14.2. **Object.values():**
 * - Returns an array containing the values of the object's enumerable properties.
 *
 * 14.3. **Object.entries():**
 * - Returns an array of key-value pairs, where each pair is represented as a
 * two-element array `[key, value]`.
 */
console.log("14.1 Keys:", Object.keys(userProfile));
console.log("14.2 Values:", Object.values(userProfile));
console.log("14.3 Entries:", Object.entries(userProfile));

// =========================================================================
// 15. Merging Objects: Combining Properties
// =========================================================================

/**
  * **Merging Objects:**
  * -  Often, you need to combine the properties of multiple objects into a single object.
  * -  There are two common ways to achieve this:
  *
  * 15.1  **Spread Syntax (...):**
  * -   The spread syntax allows an iterable (like an array or object) to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.
  * -   When used with objects, it creates a shallow copy of the object's properties.
  *
  * 15.2  **Object.assign():**
  * -   The `Object.assign()` method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.
  * -   The target object is the first parameter.
  * -   Subsequent parameters are the source objects.
  *
  * **Important Considerations:**
  * -  Both spread syntax and `Object.assign()` perform a **shallow** merge.
  * -  If a property exists in multiple source objects, the value from the last source object will overwrite previous values.
  */
const defaultSettings = {
  theme: "light",
  notifications: true,
};

const userSettings = {
  theme: "dark",
  fontSize: "16px",
};

// 15.1 Merging with spread operator
const finalSettingsSpread = { ...defaultSettings, ...userSettings };
console.log("15.1 Merged (Spread):", finalSettingsSpread);

// 15.2 Merging with Object.assign()
const finalSettingsAssign = Object.assign({}, defaultSettings, userSettings);
console.log("15.2 Merged (Object.assign):", finalSettingsAssign);
