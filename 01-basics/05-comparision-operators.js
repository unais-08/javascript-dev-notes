/**
 * File: 05-comparison-operator.js
 * Description: Demonstrates JavaScript comparison and equality operators, including type coercion, strict equality, and edge cases with null and undefined.
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// 1. Basic Comparison Operators
const greater = 5 > 3; // true
const less = 2 < 4; // true
const equal = 4 == "4"; // true (loose equality, type coercion)
const notEqual = 4 != "5"; // true

console.log("1. Basic Comparisons:");
console.log("5 > 3:", greater);
console.log("2 < 4:", less);
console.log("4 == '4':", equal);
console.log("4 != '5':", notEqual);

// 2. Boolean Result
let isBigger = 10 > 6;
console.log("\n2. Boolean Result:");
console.log("10 > 6:", isBigger); // true

// 3. String Comparisons (Lexicographical Order)
console.log("\n3. String Comparisons:");
console.log("'Z' > 'A':", "Z" > "A"); // true
console.log("'Glow' > 'Glee':", "Glow" > "Glee"); // true
console.log("'Bee' > 'Be':", "Bee" > "Be"); // true

// 4. Comparisons with Different Types (Type Coercion)
console.log("\n4. Different Types:");
console.log("'2' > 1:", "2" > 1); // true
console.log("'01' == 1:", "01" == 1); // true
console.log("true == 1:", true == 1); // true
console.log("false == 0:", false == 0); // true

// 5. Funny Case: String vs Number vs Boolean
let numZero = 0;
let strZero = "0";

console.log("\n5. Funny Coercion Cases:");
console.log("Boolean(0):", Boolean(numZero)); // false
console.log("Boolean('0'):", Boolean(strZero)); // true
console.log("0 == '0':", numZero == strZero); // true

// 6. Strict Equality (No Type Conversion)
console.log("\n6. Strict Equality:");
console.log("0 === false:", 0 === false); // false
console.log("'' === false:", "" === false); // false

// 7. Strict Non-Equality
console.log("\n7. Strict Non-Equality:");
console.log("5 !== '5':", 5 !== "5"); // true

// 8. null and undefined with strict equality
console.log("\n8. null and undefined (Strict):");
console.log("null === undefined:", null === undefined); // false

// 9. null and undefined with loose equality
console.log("\n9. null and undefined (Loose):");
console.log("null == undefined:", null == undefined); // true

// 10. Comparison with null
console.log("\n10. Comparison with null:");
console.log("null > 0:", null > 0); // false
console.log("null == 0:", null == 0); // false
console.log("null >= 0:", null >= 0); // true

// 11. Comparison with undefined
console.log("\n11. Comparison with undefined:");
console.log("undefined > 0:", undefined > 0); // false
console.log("undefined < 0:", undefined < 0); // false
console.log("undefined == 0:", undefined == 0); // false

// ---------------------------------------------------
// 12. Good Practice: Avoid <, >, == with null/undefined!
// ---------------------------------------------------
let maybeNull = null;
if (maybeNull === null) {
  console.log("\n12. Good Practice: Detected null explicitly!");
}
