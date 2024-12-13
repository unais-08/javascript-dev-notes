// Example demonstrating both Rest and Spread operators

// --- REST OPERATOR ---
// The rest operator collects remaining arguments into a single variable

// 1. Using Rest in a Function
function calculateSum(...numbers) {
  // 'numbers' is an array that collects all arguments passed
  return numbers.reduce((sum, num) => sum + num, 0);
}

console.log("Sum:", calculateSum(10, 20, 30, 40)); // Output: Sum: 100

// 2. Using Rest in Array Destructuring
const fruits = ["apple", "banana", "cherry", "date"];
const [firstFruit, ...remainingFruits] = fruits;
// 'firstFruit' gets the first element, 'remainingFruits' collects the rest

console.log("First Fruit:", firstFruit); // Output: First Fruit: apple
console.log("Remaining Fruits:", remainingFruits); // Output: Remaining Fruits: [ 'banana', 'cherry', 'date' ]

// 3. Using Rest in Object Destructuring
const user = { id: 1, name: "John", age: 30, city: "New York" };
const { name, ...otherDetails } = user;
// 'name' gets the name property, 'otherDetails' collects the rest of the properties

console.log("Name:", name); // Output: Name: John
console.log("Other Details:", otherDetails); // Output: Other Details: { id: 1, age: 30, city: 'New York' }

// --- SPREAD OPERATOR ---
// The spread operator expands an array or object into individual elements

// 4. Using Spread with Arrays
const vegetables = ["carrot", "spinach", "potato"];
const allFood = [...fruits, ...vegetables];
// '...fruits' and '...vegetables' spread their elements into 'allFood'

console.log("All Food:", allFood); // Output: All Food: [ 'apple', 'banana', 'cherry', 'date', 'carrot', 'spinach', 'potato' ]

// 5. Using Spread to Copy an Array
const fruitsCopy = [...fruits]; // Creates a shallow copy of the 'fruits' array
console.log("Fruits Copy:", fruitsCopy); // Output: Fruits Copy: [ 'apple', 'banana', 'cherry', 'date' ]

// 6. Using Spread with Objects
const updatedUser = { ...user, age: 35, country: "USA" };
// '...user' spreads the properties of 'user' into 'updatedUser'
// Overwrites 'age' and adds a new property 'country'

console.log("Updated User:", updatedUser);
// Output: Updated User: { id: 1, name: 'John', age: 35, city: 'New York', country: 'USA' }

// 7. Using Spread in Function Calls
const numbers = [10, 20, 30, 40];
console.log("Max Number:", Math.max(...numbers)); // Spreads 'numbers' array as individual arguments
// Output: Max Number: 40

// Conclusion:
// - Rest operator collects multiple elements into an array or object.
// - Spread operator expands an array or object into individual elements.
