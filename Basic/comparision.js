// JavaScript Comparison Examples

// Comparing null with numbers using relational operators
// Note: When comparing null with relational operators, the behavior can be counter-intuitive.
console.log(null > 0); // Output: false (null is not greater than 0)
console.log(null < 0); // Output: false (null is not less than 0)
console.log(null >= 0); // Output: true (null is loosely considered equal to 0 when using >=)

// Comparing strings with numbers using equality operators
// Loose equality (==) converts the operands to the same type before comparison.
console.log("2" == 2); // Output: true ("2" is coerced to 2)

// Strict equality (===) checks both value and type without coercion.
console.log("2" === 2); // Output: false (different types: string vs number)

// Additional Examples of Comparisons

// Loose vs Strict Equality
console.log(0 == false); // Output: true (0 is coerced to false)
console.log(0 === false); // Output: false (different types: number vs boolean)

// Comparing undefined and null
console.log(undefined == null); // Output: true (loosely equal)
console.log(undefined === null); // Output: false (different types)

// Relational Comparisons with Strings
console.log("apple" > "banana"); // Output: false (lexicographical comparison)
console.log("10" < "2"); // Output: true (compares as strings, not numbers)

// Comparing NaN
console.log(NaN == NaN); // Output: false (NaN is not equal to anything, including itself)
console.log(Number.isNaN(NaN)); // Output: true (use Number.isNaN to check for NaN)

// Mixed Type Comparisons
console.log(true == 1); // Output: true (true is coerced to 1)
console.log(false == 0); // Output: true (false is coerced to 0)
console.log(true === 1); // Output: false (different types)

// Relational Comparisons with Coercion
console.log("5" > 3); // Output: true ("5" is coerced to number)
console.log("abc" < 5); // Output: false ("abc" cannot be converted to number)

// Comparing objects
const obj1 = { value: 10 };
const obj2 = { value: 10 };
console.log(obj1 == obj2); // Output: false (different references)
console.log(obj1 === obj2); // Output: false (different references)

const obj3 = obj1;
console.log(obj1 == obj3); // Output: true (same reference)
console.log(obj1 === obj3); // Output: true (same reference)
