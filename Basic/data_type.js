"use strict"; // Treat all JS code as newer version

// Type Conversion Examples

let score = "22";
// Example of type conversion from string to number
console.log(typeof score); // Output: string

let scoreInNumber = Number(score);
console.log(typeof scoreInNumber); // Output: number

const gameScore = 22;
console.log(typeof gameScore); // Output: number

// Example of type conversion from boolean to string
let boolean = true;
let variable = String(boolean);
console.log(typeof variable); // Output: string

// String Concatenation Examples
let string_1 = "unais";
let string_2 = " shaikh";
let string_3 = string_1 + string_2;
console.log(string_3); // Output: "unais shaikh"

// Implicit Type Coercion in JavaScript
console.log("1" + 2); // Output: "12" (number 2 is coerced to a string)
console.log(1 + "2"); // Output: "12" (number 1 is coerced to a string)
console.log(1 + "2" + 2 + 2); // Output: "1222" (all numbers are coerced to strings in sequence)
console.log(1 + 2 + "2"); // Output: "32" (1 + 2 is calculated first, then coerced to string)
