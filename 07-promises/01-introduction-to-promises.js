/**
 * File: 01-introduction-to-promises.js
 * Description:  Introduces JavaScript Promises, covering their basic concepts,
 * creation, states, and usage for handling asynchronous operations.
 * Date: 2025-05-20
 */

// =========================================================================
// 1. What is a Promise?
// =========================================================================

/**
 * **Promise:**
 * -   A Promise is an object that represents the eventual completion (or failure) of an
 * asynchronous operation and its resulting value.
 * -   It provides a more structured and organized way to handle asynchronous code compared to callbacks.
 * -   A Promise can be in one of three states:
 * -   **Pending:** The initial state; the operation has not yet completed.
 * -   **Fulfilled (Resolved):** The operation completed successfully, and the Promise has a value.
 * -   **Rejected:** The operation failed, and the Promise has a reason (an error).
 */

// =========================================================================
// 2. Creating a Promise
// =========================================================================

/**
 * **Creating a Promise:**
 * -   Promises are created using the `Promise` constructor.
 * -   The constructor takes a function called the "executor" as an argument.
 * -   The executor function takes two arguments: `resolve` and `reject`, which are themselves functions.
 * -   Inside the executor, you perform the asynchronous operation.
 * -   If the operation is successful, you call `resolve(value)` to change the Promise's state to fulfilled
 * and pass the result value.
 * -   If the operation fails, you call `reject(reason)` to change the Promise's state to rejected
 * and pass the error reason.
 */

// Example 1: Creating a Promise that simulates fetching data
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true; // Simulate success or failure
    if (success) {
      const data = { message: "Data fetched successfully!" };
      resolve(data); // Resolve the Promise with the data
    } else {
      const error = new Error("Failed to fetch data!");
      reject(error); // Reject the Promise with the error
    }
  }, 1000); // Simulate a 1-second delay
});

// =========================================================================
// 3. Promise States and Values
// =========================================================================

/**
 * **Promise States and Values:**
 * -   A Promise starts in the **pending** state.
 * -   When the asynchronous operation completes:
 * -   If successful, the `resolve()` function is called, the Promise transitions to the
 * **fulfilled** state, and the Promise's value becomes the value passed to `resolve()`.
 * -   If unsuccessful, the `reject()` function is called, the Promise transitions to the
 * **rejected** state, and the Promise's reason becomes the value passed to `reject()`.
 */

// =========================================================================
// 4. Consuming a Promise: then(), catch(), and finally()
// =========================================================================

/**
 * **Consuming a Promise:**
 * -   Promises provide methods to handle their resolved or rejected states:
 *
 * -   **then(onFulfilled, onRejected):**
 * -   The primary method for handling a Promise's outcome.
 * -   It takes two optional callback functions as arguments:
 * -   `onFulfilled`:  Called when the Promise is fulfilled.  It receives the resolved value
 * as an argument.
 * -   `onRejected`: Called when the Promise is rejected. It receives the rejection reason
 * as an argument.
 * -   Returns a new Promise.
 *
 * -   **catch(onRejected):**
 * -   A shorthand for `then(null, onRejected)`.
 * -   Specifically handles rejections.
 * -   Returns a new Promise.
 *
 * -  **finally(onFinally):**
 * -   Introduced in ES2018.
 * -    Called when the Promise is either fulfilled or rejected.
 * -    Useful for cleanup operations (e.g., hiding a loading indicator).
 * -    Does not receive any arguments and does not change the Promise's state or value.
 * -   Returns a new Promise that is resolved with the same value as the original Promise if it is
 * successfully resolved, or rejected with the same reason as the original Promise if it is rejected.
 */

// Example 2: Consuming the Promise from Example 1
myPromise
  .then((data) => {
    console.log("2. Promise fulfilled:", data); // Handle the resolved value
  })
  .catch((error) => {
    console.error("2. Promise rejected:", error); // Handle the rejection reason
  })
  .finally(() => {
    console.log("2. Promise finished (finally)"); // выполняется в любом случае
  });

// =========================================================================
// 5. Chaining Promises
// =========================================================================
/**
 * **Chaining Promises:**
 * -  `then()`, `catch()`, and `finally()` methods return new promises, allowing you to chain
 * asynchronous operations in a sequence.
 * -  This is crucial for avoiding callback hell and writing cleaner, more readable asynchronous code.
 * -  The value returned from a `then()` or `catch()` handler becomes the resolution value
 * of the Promise returned by that `then()` or `catch()` call.
 */
// Example 3: Chaining Promises
function asyncOperation(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value * 2);
    }, 500);
  });
}

asyncOperation(5)
  .then((result) => {
    console.log("3. Result 1:", result); // Output: 10
    return asyncOperation(result); // Chain another async operation
  })
  .then((result2) => {
    console.log("3. Result 2:", result2); // Output: 20
  })
  .catch((error) => {
    console.error("3. Error:", error);
  });
