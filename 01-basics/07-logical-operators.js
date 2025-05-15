/**
 * File: 07-logical-operators.js
 * Description: Demonstrates JavaScript logical operators (OR, AND, NOT) with examples and explanations.
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// Logical OR (||) Operator
// The OR operator checks if at least one of the operands is truthy. If it finds a truthy value, it returns it, otherwise, it returns the last value.
console.log(true || true); // true
console.log(false || true); // true
console.log(true || false); // true
console.log(false || false); // false

// Example using non-boolean values
if (1 || 0) {
  console.log("truthy!"); // 1 is truthy, so this will run
}

// Using OR in a real-world scenario to check if office is open
let hour = 9;
if (hour < 10 || hour > 18) {
  console.log("The office is closed."); // This will show if hour is either less than 10 or greater than 18
}

let isWeekend = true;
if (hour < 10 || hour > 18 || isWeekend) {
  console.log("The office is closed."); // The office is closed because it is the weekend
}

// OR || finds the first truthy value
console.log(1 || 0); // 1 (1 is truthy, so it stops here)
console.log(null || 1); // 1 (1 is the first truthy value)
console.log(null || 0 || 1); // 1 (the first truthy value)
console.log(undefined || null || 0); // 0 (no truthy values, so returns the last value)

// Using OR to select the first non-falsy value from multiple variables
let firstName = "";
let lastName = "";
let nickName = "SuperCoder";
console.log(firstName || lastName || nickName || "Anonymous"); // SuperCoder

// Short-circuit evaluation: If the first value is truthy, the second value is not evaluated
true || console.log("not printed"); // This won't print because OR stops at the first truthy value
false || console.log("printed"); // This will print because OR moves to the second value

// Logical AND (&&) Operator
// The AND operator returns true only if both operands are truthy. If any operand is falsy, it returns that operand.
console.log(true && true); // true
console.log(false && true); // false
console.log(true && false); // false
console.log(false && false); // false

// Example using AND with multiple conditions
let hour2 = 12;
let minute = 30;
if (hour2 == 12 && minute == 30) {
  console.log("The time is 12:30"); // This will print as both conditions are true
}

// Evaluating multiple values using AND
console.log(1 && 0); // 0 (The first falsy value is returned)
console.log(1 && 5); // 5 (The second value is returned because the first is truthy)
console.log(null && 5); // null (null is falsy, so it is returned)
console.log(0 && "no matter what"); // 0 (0 is falsy, so it is returned)

console.log(1 && 2 && null && 3); // null (The first falsy value is returned)
console.log(1 && 2 && 3); // 3 (All values are truthy, so the last value is returned)

// AND && has higher precedence than OR ||
let a = true,
  b = false,
  c = true;
console.log((a && b) || c); // true (because (a && b) is false, so false || true)

// NOT (!) Operator
// The NOT operator inverts the truthiness of a value.
console.log(!true); // false
console.log(!0); // true (0 is falsy, so it is inverted to true)
console.log(!!"non-empty string"); // true (double NOT converts it to a boolean)
console.log(!!null); // false (double NOT converts it to a boolean)

console.log(Boolean("non-empty string")); // true (alternative to !!)
console.log(Boolean(null)); // false (alternative to !!)

// NOT has the highest precedence among all logical operators
let result = !false && true; // NOT executes first, so this is equivalent to true && true which is true
console.log(result);

// Example of NOT with an assignment
let isLoggedIn = false;
!isLoggedIn && console.log("You need to log in!"); // This will log the message because isLoggedIn is falsy

// Summary:
// - The "OR" operator (||) returns the first truthy value or the last value if no truthy value is found.
// - The "AND" operator (&&) returns the first falsy value or the last value if all values are truthy.
// - The "NOT" operator (!) inverts the truthiness of a value. A double NOT (!!) can be used to convert any value to a boolean.
