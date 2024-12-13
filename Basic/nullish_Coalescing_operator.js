// Nullish Coalescing Operator (??)
// The nullish coalescing operator returns the right-hand operand when the left-hand operand is null or undefined.

// Basic Example
let userName = null;
let defaultName = "Guest";
let finalName = userName ?? defaultName;
console.log(finalName); // Output: Guest (userName is null, so defaultName is used)

// Non-null Example
userName = "Unais";
finalName = userName ?? defaultName;
console.log(finalName); // Output: Unais (userName is not null or undefined)

// Nested Nullish Coalescing
let firstChoice = null;
let secondChoice = undefined;
let thirdChoice = "Fallback";
let selectedChoice = firstChoice ?? secondChoice ?? thirdChoice;
console.log(selectedChoice); // Output: Fallback

// Difference Between ?? and ||
let score = 0;
let validScore = score || 10; // || treats 0 as falsy
console.log(validScore); // Output: 10

validScore = score ?? 10; // ?? treats only null or undefined as nullish
console.log(validScore); // Output: 0

// Practical Example: Default Function Parameters
function greetUser(name) {
  name = name ?? "Anonymous";
  console.log(`Hello, ${name}!`);
}

greetUser("Unais"); // Output: Hello, Unais!
greetUser(null); // Output: Hello, Anonymous!
greetUser(undefined); // Output: Hello, Anonymous!
