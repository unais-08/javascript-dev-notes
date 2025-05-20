/**
 * File: asynchronous-javascript-callback-hell.js
 * Description:  Explains the execution order of asynchronous JavaScript code
 * involving nested callbacks (Callback Hell).
 * Date: 2025-05-20
 */

// =========================================================================
// 1. Code Overview
// =========================================================================

/**
 * **Code Description:**
 * The code simulates a series of asynchronous operations using `setTimeout` and nested
 * callbacks.  It demonstrates a scenario where multiple asynchronous functions are
 * dependent on each other, leading to a nested structure.
 *
 * The functions and their intended actions are:
 * -   `fetchData()`: Simulates fetching data (e.g., from a server) after a 1-second delay.
 * -   `processData()`: Processes the fetched data and calls `welcomeToDashboard()`.
 * -   `welcomeToDashboard()`: Simulates displaying a dashboard and calls `showDiscount()`.
 * -   `showDiscount()`: Simulates showing discount and calls `addToCart()`.
 * -   `addToCart()`:Simulates adding item to cart and calls `payment()`.
 * -   `payment()`:Simulates payment.
 *
 * The execution starts with a call to `fetchData()`, and the subsequent functions are
 * called within the callbacks of the preceding functions, creating a nested structure.
 */

// =========================================================================
// 2. Code Breakdown with Execution Order
// =========================================================================

// Step 1: Fetch Data
function fetchData(callback) {
  setTimeout(() => {
    const data = { message: "Data fetched!" };
    callback(data, function () {
      // Anonymous function is the callback for processData
      welcomeToDashboard(function () {
        // Anonymous function is the callback for welcomeToDashboard
        showDiscount(function () {
          // Anonymous function is the callback for showDiscount
          addToCart(payment); // payment is the callback for addToCart
        });
      });
    });
  }, 1000); // Simulate 1-second delay
}

// Step 2: Process Data
function processData(result, cb) {
  console.log("3. Data received:", result); // Executed after 1 second
  cb(); // Call welcomeToDashboard (passed as argument to fetchData)
}

// Step 3: Show Dashboard
function welcomeToDashboard(cb) {
  console.log("4. Welcome to dashboard"); // Executed after processData
  cb();
}
// Step 4: Show Discount
function showDiscount(cb) {
  console.log("5. 50% Discount only for you"); // Executed after welcomeToDashboard
  cb();
}

// Step 5: Add to Cart
function addToCart(cb) {
  console.log("6. Item added to cart"); // Executed after showDiscount
  cb();
}

// Step 6: Payment
function payment() {
  console.log("7. Item payment"); // Executed after addToCart
}

// Execution Starts
console.log("1. Fetching data..."); // Executed immediately
fetchData(processData); // Start the asynchronous operation
console.log("2. Continuing execution..."); // Executed immediately

// =========================================================================
// 3. Detailed Explanation of Execution Order
// =========================================================================

/**
 * **Execution Order:**
 * 1.  `console.log("1. Fetching data...")` is executed immediately.
 * 2.  `fetchData(processData)` is called.  The `setTimeout` function schedules the anonymous function
 * (which calls `callback` i.e., `processData`) to be executed after 1000ms (1 second).
 * 3.  `console.log("2. Continuing execution...")` is executed immediately.
 * 4.  After 1 second, the `setTimeout` callback is executed.
 * 5.  `processData` is called with the data: `{ message: "Data fetched!" }`.
 * 6.  `console.log("3. Data received: ...")` inside `processData` is executed.
 * 7.  `processData` calls the anonymous callback function (which was passed in `fetchData`).
 * 8.  `welcomeToDashboard` is called.
 * 9.  `console.log("4. Welcome to dashboard")` inside `welcomeToDashboard` is executed.
 * 10. `welcomeToDashboard` calls the anonymous callback function (which was passed in `processData`).
 * 11. `showDiscount` is called.
 * 12. `console.log("5. 50% Discount only for you")` inside `showDiscount` is executed.
 * 13. `showDiscount` calls the anonymous callback function (which was passed in `welcomeToDashboard`).
 * 14. `addToCart` is called.
 * 15. `console.log("6. Item added to cart")` inside `addToCart` is executed.
 * 16. `addToCart` calls the `payment` function.
 * 17. `console.log("7. Item payment")` inside `payment` is executed.
 *
 * **Output:**
 * ```
 * 1. Fetching data...
 * 2. Continuing execution...
 * 3. Data received: { message: "Data fetched!" }
 * 4. Welcome to dashboard
 * 5. 50% Discount only for you
 * 6. Item added to cart
 * 7. Item payment
 * ```
 *
 * **Key Points:**
 * -   The initial synchronous code (`console.log` calls) executes first.
 * -   The asynchronous `setTimeout` operation delays the execution of its callback.
 * -   The nested callbacks create a chain of asynchronous operations, where each function
 * depends on the completion of the previous one.
 * -   This nested structure is a classic example of "Callback Hell," making the code harder to
 * read and maintain as the nesting increases.
 */
