/**
 * File: asynchronous-javascript.js
 * Description: Deep dive into asynchronous JavaScript, covering callbacks, callback hell,
 * the event loop, and execution order.
 * Date: 2025-05-20
 */

// =========================================================================
// 1. Introduction to Asynchronous JavaScript
// =========================================================================

/**
 * **Asynchronous JavaScript:**
 * -   JavaScript is a single-threaded language, meaning it executes code sequentially, one
 * line at a time.
 * -   However, certain operations (e.g., network requests, file I/O, timers) can take
 * a significant amount of time to complete.
 * -   If JavaScript were to wait for these operations to finish before executing
 * the next line of code, it would lead to blocking and unresponsiveness.
 * -   Asynchronous programming allows JavaScript to perform these long-running
 * operations without blocking the main thread, ensuring a smoother user experience.
 */

// =========================================================================
// 2. Callbacks: Handling Asynchronous Operations
// =========================================================================

/**
 * **Callbacks:**
 * -   A callback function is a function that is passed as an argument to another
 * function (a higher-order function).
 * -   The callback function is typically executed *after* the higher-order function
 * has completed its asynchronous operation.
 * -   Callbacks are a fundamental mechanism for handling asynchronicity in JavaScript.
 */

// Example 1: Asynchronous operation with setTimeout and a callback
function fetchData(callback) {
  setTimeout(() => {
    const data = { message: "Data fetched!" };
    callback(data); // Execute the callback with the fetched data
  }, 1000); // Simulate a 1-second delay (e.g., network request)
}

function processData(result) {
  console.log("1. Data received:", result);
}

console.log("1. Fetching data...");
fetchData(processData); // processData is the callback
console.log("1. Continuing execution..."); // This line executes *before* the callback

// Output (order may vary due to asynchronicity):
// 1. Fetching data...
// 1. Continuing execution...
// 1. Data received: { message: "Data fetched!" }
// =========================================================================
// 3. Callback Hell (Pyramid of Doom)
// =========================================================================

/**
 * **Callback Hell (Pyramid of Doom):**
 * -   Occurs when multiple nested asynchronous operations are chained together using
 * callbacks, leading to deeply nested and difficult-to-manage code.
 * -   Makes the code hard to read, understand, and maintain.
 * -   Error handling becomes complex with deeply nested callbacks.
 */

// Example 2: Callback hell scenario (nested setTimeout calls)
function doAsyncTask1(callback) {
  setTimeout(() => {
    console.log("2. Async Task 1 completed");
    callback("Result 1");
  }, 500);
}

function doAsyncTask2(dataFrom1, callback) {
  setTimeout(() => {
    console.log("2. Async Task 2 completed with:", dataFrom1);
    callback("Result 2");
  }, 500);
}

function doAsyncTask3(dataFrom2, callback) {
  setTimeout(() => {
    console.log("2. Async Task 3 completed with:", dataFrom2);
    callback("Result 3");
  }, 500);
}

doAsyncTask1(function (result1) {
  doAsyncTask2(result1, function (result2) {
    doAsyncTask3(result2, function (result3) {
      console.log("2. Final result:", result3);
    });
  });
});
/*
Output:
2. Async Task 1 completed
2. Async Task 2 completed with: Result 1
2. Async Task 3 completed with: Result 2
2. Final result: Result 3
*/

// =========================================================================
// 4. The Event Loop: How Asynchronicity Works
// =========================================================================

/**
 * **The Event Loop:**
 * -   JavaScript uses an event loop to manage asynchronous operations.
 * -   The event loop continuously monitors the call stack and the task queue.
 * -   **Call Stack:** Where synchronous code is executed.
 * -  **Task Queue (Callback Queue):** Holds the callbacks of completed asynchronous operations
 * -   When the call stack is empty, the event loop takes the first task (callback)
 * from the task queue and pushes it onto the call stack for execution.
 * -   This mechanism allows JavaScript to be non-blocking.
 */

// =========================================================================
// 5. Execution Order in Asynchronous Code
// =========================================================================

/**
 * **Execution Order:**
 * -   Asynchronous operations do not execute immediately. Their callbacks are
 * placed in the task queue and executed later by the event loop.
 * -   This leads to a different execution order than purely synchronous code.
 */

// Example 3:  Illustrating asynchronous execution order
console.log("3. Start");

setTimeout(() => {
  console.log("3. Timeout callback executed");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise resolved");
});

console.log("3. End");

/*
Output:
3. Start
3. End
3. Promise resolved
3. Timeout callback executed
*/

/**
 * **Explanation of Output:**
 * 1.  "Start" and "End" are logged first because they are synchronous.
 * 2.  The setTimeout callback is placed in the task queue, but it waits for the
 * call stack to be empty.
 * 3.  The Promise's then() handler is also asynchronous and gets added to microtask queue.
 * 4.  Microtask queue has higher priority than macrotask queue (setTimeout, setInterval).
 * 5.  Therefore,  "Promise resolved" is logged before "Timeout callback executed".
 */
