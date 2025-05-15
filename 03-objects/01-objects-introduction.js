// ==============================================
/**
 * File: 01-object-introduction.js
 * Description: JavaScript Objects – Essential Concepts
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// ==============================================

// 1. Object creation using object literal syntax
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

console.log("User Profile:", userProfile);

// 2. Accessing object properties
console.log("Name:", userProfile.name); // Dot notation
console.log("City:", userProfile.address["city"]); // Bracket notation
console.log("City (bracket):", userProfile["address"]["city"]); // Bracket with keys

// Access using variable keys
const keyToAccess = "age";
console.log("Age (via variable):", userProfile[keyToAccess]);

// 3. Adding new properties
userProfile.email = "unais@example.com";
userProfile["phoneNumber"] = "9876543210";

console.log("Updated Profile:", userProfile);

// 4. Updating existing properties
userProfile.age = 23;
userProfile.address.city = "Pune";

// 5. Deleting properties
delete userProfile.isStudent;
console.log("After deleting isStudent:", userProfile);

// 6. Checking if a property exists
console.log("Has email?", "email" in userProfile); // true
console.log("Has isStudent?", userProfile.hasOwnProperty("isStudent")); // false

// 7. Looping through object properties using for...in
console.log("Looping through properties:");
for (let key in userProfile) {
  console.log(`${key}: ${userProfile[key]}`);
}

// 8. Object methods (functions inside objects)
const calculator = {
  a: 5,
  b: 3,
  add: function () {
    return this.a + this.b;
  },
  multiply() {
    return this.a * this.b;
  },
};

console.log("Add:", calculator.add());
console.log("Multiply:", calculator.multiply());

// 9. Understanding `this` keyword
const person = {
  firstName: "Ali",
  lastName: "Khan",
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log("Full Name:", person.getFullName());

// 10. Nested objects and accessing deeply nested properties
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

console.log("First Book Author:", library.books[0].author.firstName);

// 11. Object destructuring
const { name, age, email } = userProfile;
console.log("Destructured values:", name, age, email);

// 12. Shorthand property names
const city = "Bangalore";
const country = "India";

const locationInfo = { city, country }; // shorthand syntax
console.log("Location Info:", locationInfo);

// 13. Dynamic property keys
const dynamicKey = "favoriteLanguage";
const developer = {
  name: "Sara",
  [dynamicKey]: "JavaScript",
};

console.log("Developer:", developer);

// 14. Object.freeze() - makes object immutable
const constants = {
  PI: 3.14159,
};
Object.freeze(constants);
constants.PI = 3; // No effect
console.log("Frozen Object:", constants);

// 15. Object.keys(), Object.values(), Object.entries()
console.log("Keys:", Object.keys(userProfile));
console.log("Values:", Object.values(userProfile));
console.log("Entries:", Object.entries(userProfile));

// 16. Merging objects using spread operator
const defaultSettings = {
  theme: "light",
  notifications: true,
};

const userSettings = {
  theme: "dark",
  fontSize: "16px",
};

const finalSettings = { ...defaultSettings, ...userSettings };
console.log("Merged With spread operator :", finalSettings);

// 17. Using Object.assign() to merge
const merged = Object.assign({}, defaultSettings, userSettings);
console.log("Merged with Object.assign:", merged);
