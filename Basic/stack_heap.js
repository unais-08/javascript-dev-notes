"use strict"; // Enforces strict mode for better coding practices

// Stack and Heap Memory Concepts in JavaScript

// Primitive Data Types (Stored in Stack)
let email = "abcd123@gmail.com";
let username = email; // Copies the value of email to username (pass by value)

console.log(email); // Output: abcd123@gmail.com
console.log(username); // Output: abcd123@gmail.com

username = "xyz123@gmail.com"; // Changing username doesn't affect email
console.log(email); // Output: abcd123@gmail.com
console.log(username); // Output: xyz123@gmail.com

// Reference Data Types (Stored in Heap)
let myObj = {
  name: "xyz",
  age: 20,
  country: "India",
};

// myObj_2 references the same memory location as myObj
let myObj_2 = myObj;

console.log(myObj_2.name); // Output: xyz
console.log(myObj.name); // Output: xyz

myObj_2.name = "John Doe"; // Changing myObj_2 also changes myObj since they share the same reference
console.log(myObj_2.name); // Output: John Doe
console.log(myObj.name); // Output: John Doe

// Demonstrating Independent Objects
let objA = {
  value: 42,
};
let objB = { ...objA }; // Creates a shallow copy of objA

console.log(objA.value); // Output: 42
console.log(objB.value); // Output: 42

objB.value = 100; // Changing objB does not affect objA
console.log(objA.value); // Output: 42
console.log(objB.value); // Output: 100

// Function Behavior with Primitive and Reference Types
function modifyPrimitive(primitiveValue) {
  primitiveValue = primitiveValue * 2;
  console.log("Inside function (primitive):", primitiveValue); // Output: 20
}

let num = 10;
modifyPrimitive(num);
console.log("Outside function (primitive):", num); // Output: 10

function modifyObject(obj) {
  obj.value = obj.value * 2;
  console.log("Inside function (object):", obj.value); // Output: 20
}

let referenceObj = { value: 10 };
modifyObject(referenceObj);
console.log("Outside function (object):", referenceObj.value); // Output: 20

// Avoiding Unintended Changes to References
let originalObj = { key: "original" };
let copyObj = JSON.parse(JSON.stringify(originalObj)); // Deep copy using JSON methods

copyObj.key = "modified";
console.log(originalObj.key); // Output: original
console.log(copyObj.key); // Output: modified
