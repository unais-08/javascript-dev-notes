/**
 * File: 03-callbacks.js
 * Description: Deep dive tutorial on JavaScript callbacks, explaining their purpose,
 * usage, different types, and best practices.
 * Author: AI Assistant
 * Date: 2025-05-19
 */

// ============================
// 1. What is a Callback?
// ============================

/**
 * **Callback Function:**
 * - A callback function is a function that is passed as an argument to another function.
 * - The "calling" function is often referred to as the "higher-order function."
 * - The callback function is typically executed *after* the higher-order function has completed
 * its primary task.
 * - Callbacks are fundamental to handling asynchronous operations in JavaScript.
 * - They allow you to defer the execution of a function until a specific event has occurred
 * or a certain condition has been met.
 *
 * **Analogy:**
 * Imagine you go to a restaurant and order a dish. You give the waiter your order
 * (the callback function), and you tell him, "Please bring this to me *when* it's
 * ready." The waiter (the higher-order function) takes your order, the kitchen
 * prepares it, and *then* the waiter brings the dish to your table (executes the
 * callback). You don't wait at the counter; you do other things.
 */

// Example 1: Simple Synchronous Callback
function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback(); // Execute the callback function
}

function sayGoodbye() {
  console.log("Goodbye!");
}

greet("Alice", sayGoodbye); // Passing sayGoodbye as a callback
// Output:
// Hello, Alice!
// Goodbye!

// ============================
// 2. Why Use Callbacks? (Handling Asynchronicity)
// ============================

/**
 * **Why Callbacks?**
 * - JavaScript is single-threaded, meaning it executes code sequentially, one line at a time.
 * - Asynchronous operations (e.g., fetching data from a server, reading a file, waiting for a timer)
 * can take time to complete.
 * - If JavaScript waited for these operations to finish before moving on, it would lead to
 * blocking(block the thread) and unresponsiveness (the user interface would freeze).
 * - Callbacks provide a way to handle these asynchronous operations without blocking the
 * main thread.
 * - They allow the program to continue executing other code while waiting for the
 * asynchronous operation to complete.  When the operation is done, the callback is
 * executed.
 */

// Example 2: Asynchronous Callback with setTimeout
function fetchData(callback) {
  setTimeout(() => {
    const data = { message: "Data fetched successfully!" };
    callback(data); // Execute the callback with the fetched data
  }, 1000); // Simulate a 1-second delay (e.g., network request)
}

function processData(result) {
  console.log("Data received:", result);
}

console.log("Fetching data...");
fetchData(processData); // processData will be called *after* the delay
console.log("Continuing with other tasks...");

// Output (order may vary due to asynchronicity):
// Fetching data...
// Continuing with other tasks...
// Data received: { message: "Data fetched successfully!" }

