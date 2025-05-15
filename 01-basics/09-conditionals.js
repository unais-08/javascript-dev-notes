/**
 * File: 09-conditionals.js
 * Description: Demonstrates JavaScript conditionals including if, else if, else, and ternary operators with examples.
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// Example 1: Simple if statement
let year = prompt(
  "In which year was ECMAScript-2015 specification published?",
  ""
);

if (year == 2015) {
  console.log("That's correct!");
  console.log("You're so smart!");
}

// Example 2: Boolean conversion and falsy/truthy values
if (0) {
  // falsy
  console.log("This will not run");
}

if (1) {
  // truthy
  console.log("This will run");
}

// Example 3: Using a pre-evaluated boolean
let cond = year == 2015;
if (cond) {
  console.log("Condition is true");
}

// Example 4: if..else
year = prompt(
  "In which year was the ECMAScript-2015 specification published?",
  ""
);

if (year == 2015) {
  console.log("You guessed it right!");
} else {
  console.log("How can you be so wrong?");
}

// Example 5: else if
year = prompt(
  "In which year was the ECMAScript-2015 specification published?",
  ""
);

if (year < 2015) {
  console.log("Too early...");
} else if (year > 2015) {
  console.log("Too late");
} else {
  console.log("Exactly!");
}

// Example 6: Conditional (ternary) operator
let age = prompt("How old are you?", "");
let accessAllowed = age > 18 ? true : false;
console.log(accessAllowed);

// Even shorter version
accessAllowed = age > 18;
console.log(accessAllowed);

// Example 7: Multiple '?'
age = prompt("age?", 18);

let message =
  age < 3
    ? "Hi, baby!"
    : age < 18
    ? "Hello!"
    : age < 100
    ? "Greetings!"
    : "What an unusual age!";

console.log(message);

// Equivalent using if..else
if (age < 3) {
  message = "Hi, baby!";
} else if (age < 18) {
  message = "Hello!";
} else if (age < 100) {
  message = "Greetings!";
} else {
  message = "What an unusual age!";
}

console.log(message);

// Example 8: Non-traditional use of '?'
// Not recommended — less readable than if..else
let company = prompt("Which company created JavaScript?", "");

company == "Netscape" ? console.log("Right!") : console.log("Wrong.");

// Recommended: Use if..else instead
if (company == "Netscape") {
  console.log("Right!");
} else {
  console.log("Wrong.");
}
