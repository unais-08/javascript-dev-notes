// JavaScript String Methods Documentation

// 1. charAt(index): Returns the character at the specified index.
const exampleCharAt = "Hello";
console.log(exampleCharAt.charAt(0)); // Output: "H"

// 2. charCodeAt(index): Returns the Unicode value of the character at the specified index.
const exampleCharCodeAt = "A";
console.log(exampleCharCodeAt.charCodeAt(0)); // Output: 65

// 3. concat(...strings): Combines two or more strings.
const exampleConcat1 = "Hello";
const exampleConcat2 = "World";
console.log(exampleConcat1.concat(" ", exampleConcat2)); // Output: "Hello World"
console.log(exampleConcat1.concat(" xyz ", exampleConcat2, " abc ")); // Output: "Hello World"

// 4. includes(searchValue, start): Checks if a string contains the given substring.
const exampleIncludes = "JavaScript";
console.log(exampleIncludes.includes("Script")); // Output: true

// 5. indexOf(searchValue, start): Finds the first occurrence of the substring.
const exampleIndexOf = "JavaScript";
console.log(exampleIndexOf.indexOf("S")); // Output: 4

// 6. lastIndexOf(searchValue, start): Finds the last occurrence of the substring.
const exampleLastIndexOf = "JavaScript is fun. JavaScript is powerful.";
console.log(exampleLastIndexOf.lastIndexOf("JavaScript")); // Output: 21

// 7. slice(start, end): Extracts a section of a string.
const exampleSlice = "JavaScript";
console.log(exampleSlice.slice(0, 4)); // Output: "Java"

// 8. substring(start, end): Similar to slice, but no negative indices.
const exampleSubstring = "JavaScript";
console.log(exampleSubstring.substring(0, 4)); // Output: "Java"

// 9. toLowerCase() and toUpperCase(): Converts string case.
const exampleCase = "JavaScript";
console.log(exampleCase.toLowerCase()); // Output: "javascript"
console.log(exampleCase.toUpperCase()); // Output: "JAVASCRIPT"

// 10. trim(): Removes whitespace from both ends of a string.
const exampleTrim = "   Hello   ";
console.log(exampleTrim.trim()); // Output: "Hello"

// 11. split(separator, limit): Splits a string into an array of substrings.
const exampleSplit = "a,b,c,d";
console.log(exampleSplit.split(",")); // Output: ["a", "b", "c", "d"]

// 12. replace(searchValue, replaceValue): Replaces the first match.
const exampleReplace = "Hello World";
console.log(exampleReplace.replace("World", "JavaScript")); // Output: "Hello JavaScript"

// 13. replaceAll(searchValue, replaceValue): Replaces all matches.
const exampleReplaceAll = "aabbcc";
console.log(exampleReplaceAll.replaceAll("a", "z")); // Output: "zzbbcc"

// 14. match(regex): Matches a string against a regex.
const exampleMatch = "JavaScript123";
console.log(exampleMatch.match(/\d+/)); // Output: ["123"]

// 15. startsWith(searchString, position): Checks if a string starts with the substring.
const exampleStartsWith = "JavaScript";
console.log(exampleStartsWith.startsWith("Java")); // Output: true

// 16. endsWith(searchString, length): Checks if a string ends with the substring.
const exampleEndsWith = "JavaScript";
console.log(exampleEndsWith.endsWith("Script")); // Output: true

// 17. repeat(count): Repeats a string specified times.
const exampleRepeat = "Hi";
console.log(exampleRepeat.repeat(3)); // Output: "HiHiHi"

// 18. Template Literals: Allow embedding variables and expressions using backticks.
const name = "Unais";
const greeting = `Hello, ${name}!`;
console.log(greeting); // Output: "Hello, Unais!"
