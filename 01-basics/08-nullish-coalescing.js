/**
 * File: 08-nullish-coalescing.js
 * Description: Demonstrates the usage of JavaScript's nullish coalescing operator (??) with examples, differences from ||, precedence, and best practices.
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// =============================
// Nullish Coalescing Operator (??)
// =============================

// This operator is used to return the first value that is NOT null or undefined.
// Syntax: a ?? b --> returns a if it's not null/undefined, otherwise returns b

// Example 1: Using ?? with undefined
let user;
console.log(user ?? "Anonymous"); // Output: "Anonymous" (because user is undefined)

// Example 2: Using ?? with a defined value
user = "John";
console.log(user ?? "Anonymous"); // Output: "John"

// Example 3: Chain of ?? operators
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

console.log(firstName ?? lastName ?? nickName ?? "Anonymous"); // Output: "Supercoder"

// =============================
// Comparison with || (OR) Operator
// =============================

// || returns the first *truthy* value
// ?? returns the first *defined* value (not null/undefined)

let height = 0;
console.log(height || 100); // Output: 100 (0 is falsy)
console.log(height ?? 100); // Output: 0   (0 is not null/undefined)

// This shows why ?? is useful when 0, '', or false are valid values we want to keep

// =============================
// Precedence
// =============================

// ?? has low precedence, so parentheses are needed in expressions

let h = null;
let w = null;

// Correct usage with parentheses
let area = (h ?? 100) * (w ?? 50);
console.log(area); // Output: 5000

// Incorrect usage without parentheses (would lead to confusion or errors)
// let area = h ?? 100 * w ?? 50; // This is interpreted as: h ?? (100 * w) ?? 50

// =============================
// Mixing ?? with && or ||
// =============================

// JavaScript throws a syntax error when ?? is used with || or && without parentheses

// let x = 1 && 2 ?? 3; // Syntax Error

// Correct usage with parentheses
let x = (1 && 2) ?? 3;
console.log(x); // Output: 2

// =============================
// Summary
// =============================

// Use ?? when you want to provide a fallback only for null or undefined
// It's very useful for assigning default values

let inputHeight = null;
let finalHeight = inputHeight ?? 100;
console.log(finalHeight); // Output: 100

// Not affected by other falsy values like 0, '', false etc.
let inputWidth = 0;
let finalWidth = inputWidth ?? 50;
console.log(finalWidth); // Output: 0
