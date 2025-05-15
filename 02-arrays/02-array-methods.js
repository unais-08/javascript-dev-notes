/**
 * File: 02-array-method.js
 * Description: JavaScript Array Methods Explained with Examples
 * Author: Unais Shaikh
 * Date: 2025-05-15
 */

// ============================
// Setup: Sample Array
// ============================

const programmingLanguages = [
  "JavaScript",
  "Python",
  "C++",
  "Java",
  "Go",
  "Rust",
];

console.log("Original:", programmingLanguages);

// ============================
// 1️⃣ slice() - Returns a shallow copy of a portion of an array
// ============================

const popularLanguages = programmingLanguages.slice(0, 3); // First 3 languages
console.log("Popular Languages (slice):", popularLanguages);

// ============================
// 2️⃣ splice() - Changes the content of an array by removing/replacing elements
// ============================

const updatedLanguages = [...programmingLanguages]; // Copy to avoid mutation
updatedLanguages.splice(2, 1, "TypeScript"); // Replace 'C++' with 'TypeScript'
console.log("Updated (splice):", updatedLanguages);

// ============================
// 3️⃣ push() - Adds elements to the end
// ============================

programmingLanguages.push("Kotlin");
console.log("After push:", programmingLanguages);

// ============================
// 4️⃣ pop() - Removes the last element
// ============================

const lastRemoved = programmingLanguages.pop();
console.log("After pop:", programmingLanguages);
console.log("Popped item:", lastRemoved);

// ============================
// 5️⃣ unshift() - Adds elements to the beginning
// ============================

programmingLanguages.unshift("Swift");
console.log("After unshift:", programmingLanguages);

// ============================
// 6️⃣ shift() - Removes the first element
// ============================

const firstRemoved = programmingLanguages.shift();
console.log("After shift:", programmingLanguages);
console.log("Shifted item:", firstRemoved);

// ============================
// 7️⃣ indexOf() - Finds the index of an element
// ============================

const index = programmingLanguages.indexOf("Java");
console.log("Index of Java:", index);

// ============================
// 8️⃣ includes() - Checks if an item exists
// ============================

const hasRust = programmingLanguages.includes("Rust");
console.log("Contains Rust:", hasRust);

// ============================
// 9️⃣ join() - Joins all elements into a string
// ============================

const joinedString = programmingLanguages.join(", ");
console.log("Joined as string:", joinedString);

// ============================
// 🔟 reverse() - Reverses the array in place (non-destructive here)
// ============================

const reversed = [...programmingLanguages].reverse();
console.log("Reversed order:", reversed);

// ============================
// 1️⃣1️⃣ sort() - Sorts elements alphabetically (mutates original)
// ============================

const sortedLanguages = [...programmingLanguages].sort();
console.log("Sorted:", sortedLanguages);

// ============================
// 1️⃣2️⃣ filter() - Returns elements that match a condition
// ============================

const shortNames = programmingLanguages.filter((lang) => lang.length <= 4);
console.log("Short names (≤ 4 letters):", shortNames);

// ============================
// 1️⃣3️⃣ map() - Transforms elements and returns a new array
// ============================

const upperCaseLanguages = programmingLanguages.map((lang) =>
  lang.toUpperCase()
);
console.log("Uppercase:", upperCaseLanguages);

// ============================
// 1️⃣4️⃣ forEach() - Executes a function for each element (no return)
// ============================

console.log("Languages list:");
programmingLanguages.forEach((lang, index) => {
  console.log(`${index + 1}. ${lang}`);
});

// ============================
// 1️⃣5️⃣ find() - Finds the first element that matches a condition
// ============================

const langWithJ = programmingLanguages.find((lang) => lang.startsWith("J"));
console.log("Language starting with J:", langWithJ);

// ============================
// 1️⃣6️⃣ every() - Checks if all elements meet a condition
// ============================

const allAreStrings = programmingLanguages.every(
  (lang) => typeof lang === "string"
);
console.log("All are strings:", allAreStrings);

// ============================
// 1️⃣7️⃣ some() - Checks if at least one element meets a condition
// ============================

const containsCSharp = programmingLanguages.some((lang) => lang === "C#");
console.log("Contains C#?", containsCSharp);

// ============================
// End of Demo
// ============================
