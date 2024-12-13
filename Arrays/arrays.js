// Array Creation

// Using Array constructor (not recommended for empty arrays)
let emptyArray = new Array();
let fruits = new Array("Apple", "Banana", "Cherry");
console.log(fruits); // ["Apple", "Banana", "Cherry"]

// Array literal syntax (recommended)
let vegetables = ["Carrot", "Potato", "Cucumber"];
console.log(vegetables); // ["Carrot", "Potato", "Cucumber"]

// Array Methods

// 1. push() - Adds elements to the end of an array
let animals = ["Dog", "Cat"];
animals.push("Elephant", "Lion"); // Adds more animals to the array
console.log(animals); // ["Dog", "Cat", "Elephant", "Lion"]

// 2. pop() - Removes the last element from the array
let numbers = [1, 2, 3, 4];
let lastNumber = numbers.pop();
console.log(lastNumber); // 4
console.log(numbers); // [1, 2, 3]

// 3. shift() - Removes the first element of the array
let students = ["Alice", "Bob", "Charlie"];
let firstStudent = students.shift();
console.log(firstStudent); // "Alice"
console.log(students); // ["Bob", "Charlie"]

// 4. unshift() - Adds elements to the beginning of an array
let colors = ["Red", "Green"];
colors.unshift("Blue", "Yellow"); // Adds more colors to the beginning
console.log(colors); // ["Blue", "Yellow", "Red", "Green"]

// 5. forEach() - Executes a function once for each element
let numbersForEach = [1, 2, 3, 4];
numbersForEach.forEach(function (num, index) {
  console.log(`Index: ${index}, Value: ${num}`);
});
// Output:
// Index: 0, Value: 1
// Index: 1, Value: 2
// Index: 2, Value: 3
// Index: 3, Value: 4

// 6. map() - Creates a new array with the results of calling a function on every element
let prices = [100, 200, 300];
let discountPrices = prices.map((price) => price * 0.9); // Applying 10% discount
console.log(discountPrices); // [90, 180, 270]

// 7. filter() - Creates a new array with all elements that pass a test
let ages = [18, 22, 16, 30, 17];
let adults = ages.filter((age) => age >= 18); // Filtering adults
console.log(adults); // [18, 22, 30]

// 8. reduce() - Applies a function to accumulate a value
let numbersReduce = [1, 2, 3, 4];
let sum = numbersReduce.reduce((acc, num) => acc + num, 0); // Sum of all elements
console.log(sum); // 10

// 9. some() - Checks if at least one element satisfies the condition
let numbersSome = [1, 2, 3, 4];
let hasEven = numbersSome.some((num) => num % 2 === 0); // Check if there's any even number
console.log(hasEven); // true

// 10. every() - Checks if all elements satisfy the condition
let numbersEvery = [2, 4, 6, 8];
let allEven = numbersEvery.every((num) => num % 2 === 0); // Check if all numbers are even
console.log(allEven); // true

// 11. concat() - Combines two or more arrays into one
let array1 = ["A", "B", "C"];
let array2 = ["D", "E"];
let combined = array1.concat(array2);
console.log(combined); // ["A", "B", "C", "D", "E"]

// 12. slice() - Returns a shallow copy of a portion of an array
let numbersSlice = [10, 20, 30, 40, 50];
let slicedNumbers = numbersSlice.slice(1, 4); // Slice elements from index 1 to 3
console.log(slicedNumbers); // [20, 30, 40]

// 13. splice() - Adds/removes elements at a specific index
let fruitsSplice = ["Apple", "Banana", "Orange"];
fruitsSplice.splice(1, 1, "Pineapple", "Mango"); // Remove 1 item at index 1, add two fruits
console.log(fruitsSplice); // ["Apple", "Pineapple", "Mango", "Orange"]

// 14. indexOf() - Returns the first index of the specified element
let fruitsIndexOf = ["Apple", "Banana", "Orange"];
let index = fruitsIndexOf.indexOf("Banana");
console.log(index); // 1

// 15. includes() - Checks if the array contains a specified element
let fruitsIncludes = ["Apple", "Banana", "Orange"];
let hasBanana = fruitsIncludes.includes("Banana");
console.log(hasBanana); // true

// 16. sort() - Sorts the elements of the array
let numbersSort = [5, 2, 8, 1, 3];
numbersSort.sort((a, b) => a - b); // Sorting numbers in ascending order
console.log(numbersSort); // [1, 2, 3, 5, 8]

// 17. reverse() - Reverses the order of the elements in the array
let numbersReverse = [1, 2, 3, 4, 5];
numbersReverse.reverse();
console.log(numbersReverse); // [5, 4, 3, 2, 1]

// 18. join() - Joins all array elements into a string
let words = ["Hello", "World"];
let sentence = words.join(" "); // Joining words with a space
console.log(sentence); // "Hello World"

// 19. toString() - Converts the array to a string representation
let fruitsToString = ["Apple", "Banana", "Orange"];
let fruitString = fruitsToString.toString();
console.log(fruitString); // "Apple,Banana,Orange"

// 20. copyWithin() - Shallow copies a portion of an array
let arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3); // Copy elements from index 3 to the beginning
console.log(arr); // [4, 5, 3, 4, 5]

// 21. from() - Creates a new array from an array-like or iterable object
let str = "hello";
let arrFromStr = Array.from(str); // Converting a string to an array of characters
console.log(arrFromStr); // ['h', 'e', 'l', 'l', 'o']

// 22. fill() - Fills all elements in an array with a specific value
let numbersFill = [1, 2, 3, 4];
numbersFill.fill(0, 2); // Fill zeros starting from index 2
console.log(numbersFill); // [1, 2, 0, 0]
