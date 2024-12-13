"use strict"; // Enforces strict mode for better coding practices

// Working with Numbers in JavaScript

const score = 100;
const balance = new Number(1000); // Using Number object

console.log(score); // Output: 100
console.log(typeof score); // Output: number
console.log(balance); // Output: [Number: 1000]
console.log(typeof balance); // Output: object

// Converting Number to String and Splitting into an Array
let convertToArray = balance.toString().split("");
console.log(convertToArray); // Output: ['1', '0', '0', '0']

// Iterating Through Array Elements
for (let i = 0; i < convertToArray.length; i++) {
  console.log(convertToArray[i]);
}

// Formatting Numbers as Locale-Specific Strings
let bankBalance = 100000000;
console.log(bankBalance.toLocaleString("en-IN")); // Output: 10,00,00,000 (Indian number system)

// Using Math Object for Mathematical Operations

console.log(Math.abs(-3)); // Output: 3 (absolute value)
console.log(Math.round(4.3)); // Output: 4 (rounds to nearest integer)
console.log(Math.round(4.9)); // Output: 5
console.log(Math.ceil(4.1)); // Output: 5 (rounds up to nearest integer)
console.log(Math.ceil(4.9)); // Output: 5
console.log(Math.floor(4.1)); // Output: 4 (rounds down to nearest integer)
console.log(Math.floor(4.9)); // Output: 4

// Generating Random Numbers
let generateRandom = Math.random();
console.log(generateRandom); // Output: A random number between 0 and 1

// Generating Random Integers Between a Range (min and max)
let min = 10;
let max = 20;
let randomInRange = Math.floor(generateRandom * (max - min + 1)) + min;
console.log(randomInRange); // Output: Random number between 10 and 20

// Additional Examples with Math Object
console.log(Math.pow(2, 3)); // Output: 8 (2 raised to the power of 3)
console.log(Math.sqrt(16)); // Output: 4 (square root of 16)
console.log(Math.max(10, 20, 30)); // Output: 30 (maximum value)
console.log(Math.min(10, 20, 30)); // Output: 10 (minimum value)

// Using Math.PI
console.log(Math.PI); // Output: 3.141592653589793 (value of PI)

// Calculating Area of a Circle Using Math.PI
let radius = 5;
let areaOfCircle = Math.PI * Math.pow(radius, 2);
console.log(areaOfCircle); // Output: 78.53981633974483 (area of circle with radius 5)
