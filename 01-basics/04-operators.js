/**
 * File: 04-operators.js
 * Description: Demonstrates basic JavaScript operators including unary, binary, arithmetic, assignment, increment/decrement, and operator precedence.
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// === Unary and Binary Operators ===
// Unary operator: works with one operand
let value = 5;
let negatedValue = -value; // Unary negation: reverses the sign
console.log(negatedValue); // Output: -5

// Binary operator: works with two operands
let a = 10;
let b = 3;
let difference = a - b; // Binary subtraction
console.log(difference); // Output: 7

// === Arithmetic Operators ===
let sum = 4 + 6; // Addition
let product = 3 * 5; // Multiplication
let quotient = 10 / 2; // Division
let remainder = 10 % 3; // Remainder after division
let power = 2 ** 3; // Exponentiation (2^3 = 8)
console.log(sum, product, quotient, remainder, power);

// === Exponentiation with Fractions ===
let squareRoot = 9 ** (1 / 2); // √9 = 3
let cubeRoot = 27 ** (1 / 3); // ∛27 = 3
console.log(squareRoot, cubeRoot);

// === String Concatenation with + ===
let part1 = "Hello, ";
let part2 = "world!";
let message = part1 + part2;
console.log(message); // Output: "Hello, world!"

// Mixed string and number concatenation
console.log("1" + 2); // "12"
console.log(2 + "1"); // "21"
console.log(2 + 2 + "1"); // 4 + '1' => "41"
console.log("1" + 2 + 2); // '1' + 2 => "12", then + 2 => "122"

// === Other arithmetic operators convert strings to numbers ===
console.log("6" - "2"); // 4
console.log("6" / "2"); // 3

// === Unary Plus for Type Conversion ===
let strNum1 = "4";
let strNum2 = "5";
let total = +strNum1 + +strNum2; // Converts to numbers before addition
console.log(total); // 9

// Equivalent using Number()
console.log(Number(strNum1) + Number(strNum2)); // 9

// === Operator Precedence ===
let result = 1 + 2 * 3; // Multiplication happens first
console.log(result); // 7

let customOrder = (1 + 2) * 3; // Parentheses change the order
console.log(customOrder); // 9

// === Assignment as an Operator ===
let assignedValue = 10 + 5;
let resultWithAssignment = (assignedValue = 20);
console.log(resultWithAssignment); // 20

// Assignment used in an expression
let x = 2;
let y = 3 - (x = 5); // x gets 5, y = 3 - 5 = -2
console.log(x, y); // 5 -2

// === Chained Assignment ===
let alpha, beta, gamma;
alpha = beta = gamma = 10 + 5;
console.log(alpha, beta, gamma); // 15 15 15

// === Modify-in-place Operators ===
let count = 2;
count += 5; // count = count + 5 => 7
count *= 2; // count = count * 2 => 14
console.log(count); // 14

// Modify-in-place with expression on the right
let modValue = 3;
modValue *= 2 + 3; // modValue = 3 * (2 + 3) = 15
console.log(modValue); // 15

// === Increment and Decrement ===
let votes = 10;
votes++; // Postfix increment
++votes; // Prefix increment
console.log(votes); // 12

votes--; // Postfix decrement
--votes; // Prefix decrement
console.log(votes); // 10

// === Prefix vs Postfix Difference ===
let score = 5;
let prefixResult = ++score; // score = 6, prefixResult = 6
console.log(prefixResult); // 6

score = 5;
let postfixResult = score++; // postfixResult = 5, then score = 6
console.log(postfixResult); // 5
console.log(score); // 6

// === Usage in Expressions ===
let bonus = 2;
console.log(2 * ++bonus); // bonus becomes 3, result is 6

bonus = 2;
console.log(2 * bonus++); // result is 4 (bonus is 2 before increment)
console.log(bonus); // bonus is now 3
