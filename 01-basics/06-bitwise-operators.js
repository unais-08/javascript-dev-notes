/**
 * File: 06-bitwise-operators.js
 * Description:Demonstrating bitwise operations on 32-bit signed integers in JavaScript
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

let a = 5; // Binary: 00000000000000000000000000000101
let b = 3; // Binary: 00000000000000000000000000000011

// Bitwise AND (&): 1 only if both bits are 1
console.log("a & b =", a & b); // 1  (binary: 0001)

// Bitwise OR (|): 1 if at least one bit is 1
console.log("a | b =", a | b); // 7  (binary: 0111)

// Bitwise XOR (^): 1 if bits are different
console.log("a ^ b =", a ^ b); // 6  (binary: 0110)

// Bitwise NOT (~): Inverts all bits, returns two's complement (-(x + 1))
console.log("~a =", ~a); // -6 (because ~5 === -(5 + 1))

// -----------------------------------------------------

// Left Shift (<<): Shift bits left, fills right with 0s (multiplies by 2^n)
let x = 5;
console.log("x << 1 =", x << 1); // 10 (5 * 2)
console.log("x << 2 =", x << 2); // 20 (5 * 4)

// -----------------------------------------------------

// Right Shift (>>): Shift bits right, keeps sign bit (divides by 2^n rounding down)
let y = 10;
console.log("y >> 1 =", y >> 1); // 5  (10 / 2)
console.log("y >> 2 =", y >> 2); // 2  (10 / 4)

// -----------------------------------------------------

// Unsigned Right Shift (>>>): Shift bits right, fills left with 0s (no sign preservation)
// Negative numbers become large positive numbers
let z = -5;
console.log("z >>> 1 =", z >>> 1);
// 2147483645 (unsigned shift converts signed negative number to large positive)
