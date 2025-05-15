/**
 * File: 02-type-conversion.js
 * Description: Demonstrates JavaScript primitive type conversions — String, Number, and Boolean.
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// ✅ JavaScript Primitive Type Conversion — String, Number & Boolean

// --------------------------------------------------
// 1. String Conversion
// Converts values to string using String(value)

let value = true;
console.log("Before String Conversion:", typeof value); // boolean
value = String(value); // "true"
console.log("After String Conversion:", typeof value); // string
console.log("Value is:", value); // "true"

// More examples:
console.log(String(123)); // "123"
console.log(String(null)); // "null"
console.log(String(undefined)); // "undefined"

// --------------------------------------------------
// 2. Numeric Conversion
// Converts values to numbers using Number(value) or implicitly

console.log("6" / "2"); // 3 (strings converted to numbers)

let str = "123";
let num = Number(str);
console.log("Type of num:", typeof num); // number
console.log("Value of num:", num); // 123

// When conversion fails:
let wrong = Number("abc");
console.log("Invalid Number:", wrong); // NaN

// Numeric conversion rules:
console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0

console.log(Number("   456   ")); // 456 (spaces ignored)
console.log(Number("789z")); // NaN (invalid number)
console.log(Number("")); // 0 (empty string)

// --------------------------------------------------
// 3. Boolean Conversion
// Converts values to boolean using Boolean(value) or implicitly in conditions

console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean("hello")); // true
console.log(Boolean("")); // false

// Non-empty strings are truthy:
console.log(Boolean("0")); // true
console.log(Boolean(" ")); // true (space is non-empty)

// Boolean falsy values summary:
console.log(Boolean(0)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean("")); // false

// Everything else is truthy:
console.log(Boolean("hi")); // true
console.log(Boolean(42)); // true
console.log(Boolean([])); // true
console.log(Boolean({})); // true (objects always truthy)

// --------------------------------------------------
// 🧠 Summary
// --------------------------------------------------
/*
✔ String conversion: String(value)
✔ Number conversion: Number(value)
✔ Boolean conversion: Boolean(value)

⚠️ Watch out:
- Number(undefined) → NaN
- Boolean("0") and Boolean(" ") → true (non-empty strings)

Note: Object conversions are NOT covered here, handled separately.
*/
