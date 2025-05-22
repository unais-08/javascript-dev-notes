/**
 * File: 01-error-handling.js
 * Description: A comprehensive and professional guide to error handling in JavaScript,
 * covering various error types, the Error object, synchronous and asynchronous error
 * management, custom errors, global handlers, and best practices.
 * Date: 2025-05-22
 */

// =========================================================================
// 1. Introduction: The Importance of Robust Error Handling
// =========================================================================

/**
 * **Introduction:**
 * -   Error handling is a critical aspect of building robust, reliable, and user-friendly
 * JavaScript applications. Unhandled errors can crash applications, lead to unexpected
 * behavior, and provide a poor user experience.
 * -   Effective error handling involves anticipating potential issues, gracefully
 * recovering from them, and providing meaningful feedback or logging.
 * -   JavaScript provides a powerful set of mechanisms to detect, report, and manage errors.
 */

// =========================================================================
// 2. Types of Errors in JavaScript
// =========================================================================

/**
 * **JavaScript Errors can generally be categorized into:**
 *
 * 2.1. **Syntax Errors:**
 * -   Occur during the parsing phase of the code. The JavaScript engine cannot
 * understand the code due to incorrect syntax.
 * -   These errors prevent the script from executing at all.
 * -   Example: Missing parentheses, misspelled keywords.
 *
 * 2.2. **Runtime Errors (Execution Errors):**
 * -   Occur during the execution of the code. The syntax is correct, but something
 * goes wrong during runtime.
 * -   These are the errors you primarily handle with `try...catch`.
 * -   Examples:
 * -   `ReferenceError`: Trying to access an undeclared variable.
 * -   `TypeError`: Performing an operation on a value of an inappropriate type (e.g., calling a non-function).
 * -   `RangeError`: A number is outside its valid range.
 * -   `URIError`: Malformed URI encoding.
 * -   `EvalError`: Issues with `eval()` (rarely used).
 *
 * 2.3. **Logical Errors:**
 * -   The most insidious type of error. The code runs without crashing, but it
 * produces incorrect or unexpected results.
 * -   These are not caught by `try...catch` and require thorough testing and debugging.
 * -   Example: Incorrect mathematical formula, wrong conditional logic.
 */

// Example 2.1: Syntax Error (will prevent script execution if uncommented)
// const myObject = { key: "value" // Missing closing brace }

// Example 2.2: Runtime Error (TypeError)
// console.log(null.length); // Cannot read properties of null (reading 'length')

// Example 2.3: Logical Error
function add(a, b) {
  return a - b; // Logical error: should be a + b
}
// console.log(add(5, 3)); // Output: 2 (expected 8) - No error thrown, just wrong result

// =========================================================================
// 3. The `Error` Object
// =========================================================================

/**
 * **The `Error` Object:**
 * -   When a runtime error occurs or is explicitly thrown, JavaScript creates an `Error` object.
 * -   This object contains information about the error.
 * -   **Common Properties:**
 * -   `name`: The type of error (e.g., 'TypeError', 'ReferenceError', 'Error').
 * -   `message`: A human-readable description of the error.
 * -   `stack`: (Non-standard but widely supported) A string representing the call stack
 * at the time the error was thrown, useful for debugging.
 */

// Example 3.1: Creating and inspecting an Error object
try {
  throw new Error("Something went wrong!");
} catch (error) {
  console.log("\n--- 3. The Error Object Example ---");
  console.error("Error Name:", error.name); // Output: Error
  console.error("Error Message:", error.message); // Output: Something went wrong!
  console.error("Error Stack:", error.stack); // Output: Stack trace
}

// =========================================================================
// 4. Synchronous Error Handling: `try...catch`
// =========================================================================

/**
 * **`try...catch` Statement:**
 * -   The fundamental block for handling synchronous runtime errors.
 * -   **`try` block:** Contains the code that might throw an error.
 * -   **`catch` block:** Contains the code that executes if an error is thrown
 * within the `try` block. It receives the `Error` object as an argument.
 * -   Errors thrown *outside* the `try` block or *after* an asynchronous operation
 * initiated within `try` will *not* be caught by that `catch` block.
 */

// Example 4.1: Basic try...catch
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed."); // Explicitly throw an error
  }
  return a / b;
}

console.log("\n--- 4. Synchronous Error Handling: try...catch ---");
try {
  let result = divide(10, 2);
  console.log("Result of division (success):", result); // Output: 5

  result = divide(10, 0); // This will throw an error
  console.log("This line will not be executed.");
} catch (error) {
  console.error("Caught an error:", error.message); // Output: Caught an error: Division by zero is not allowed.
}

// Example 4.2: Catching built-in errors
try {
  const data = JSON.parse("{ invalid json"); // This throws a SyntaxError
  console.log(data);
} catch (error) {
  console.error("Caught JSON parsing error:", error.name, error.message); // Output: SyntaxError: Unexpected token i in JSON at position 2
}

// =========================================================================
// 5. The `finally` Block
// =========================================================================

/**
 * **`try...catch...finally`:**
 * -   The `finally` block is optional and executes *unconditionally* after the
 * `try` and `catch` blocks have finished, regardless of whether an error occurred
 * or was caught.
 * -   It's ideal for cleanup operations (e.g., closing file handles, releasing resources,
 * hiding loading indicators).
 */

// Example 5.1: Using finally for cleanup
function performOperation(shouldSucceed) {
  console.log("\n--- 5. The finally Block Example ---");
  let resource = "Resource opened."; // Simulate opening a resource
  try {
    console.log(resource);
    if (!shouldSucceed) {
      throw new Error("Operation failed!");
    }
    console.log("Operation successful.");
  } catch (error) {
    console.error("Error caught in operation:", error.message);
  } finally {
    resource = "Resource closed."; // Cleanup
    console.log(resource);
  }
}

performOperation(true); // Success path
performOperation(false); // Failure path

// =========================================================================
// 6. Error Handling in Asynchronous Code
// =========================================================================

/**
 * **Asynchronous Error Handling:**
 * -   `try...catch` *does not* directly catch errors from asynchronous operations
 * that resolve/reject *after* the `try...catch` block has completed its synchronous execution.
 * -   Special mechanisms are needed for asynchronous errors.
 */

// -------------------------------------------------------------------------
// 6.1. Callbacks (Error-First Callback Pattern)
// -------------------------------------------------------------------------

/**
 * -   The common pattern for callbacks is to pass `error` as the first argument
 * to the callback function. If `error` is `null` or `undefined`, the operation succeeded.
 */

// Example 6.1.1: Asynchronous operation with error-first callback
function fetchDataAsync(url, callback) {
  setTimeout(() => {
    if (url === "data.json") {
      callback(null, { id: 1, content: "Fetched data" }); // Success: error is null
    } else {
      callback(new Error("Failed to fetch data from " + url)); // Failure: error is an Error object
    }
  }, 500);
}

console.log("\n--- 6.1. Callbacks (Error-First Pattern) ---");
fetchDataAsync("data.json", (error, data) => {
  if (error) {
    console.error("Callback Error:", error.message);
  } else {
    console.log("Callback Data:", data); // Output: Callback Data: { id: 1, content: 'Fetched data' }
  }
});

fetchDataAsync("invalid.json", (error, data) => {
  if (error) {
    console.error("Callback Error:", error.message); // Output: Callback Error: Failed to fetch data from invalid.json
  } else {
    console.log("Callback Data:", data);
  }
});

// -------------------------------------------------------------------------
// 6.2. Promises (`.catch()`)
// -------------------------------------------------------------------------

/**
 * -   Promises provide a much cleaner way to handle asynchronous errors using the
 * `.catch()` method (which is syntactic sugar for `then(null, onRejected)`).
 * -   A Promise chain will propagate a rejection down until a `.catch()` handler is found.
 */

// Example 6.2.1: Promises with .catch()
function asyncPromiseOperation(value, shouldSucceed = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(`Operation successful with: ${value}`);
      } else {
        reject(new Error(`Operation failed for: ${value}`));
      }
    }, 300);
  });
}

console.log("\n--- 6.2. Promises (.catch()) ---");
asyncPromiseOperation("Task A", true)
  .then((result) => console.log("Promise Success:", result))
  .catch((error) => console.error("Promise Error:", error.message)); // This won't be called for success

asyncPromiseOperation("Task B", false)
  .then((result) => console.log("Promise Success:", result)) // This won't be called for failure
  .catch((error) => console.error("Promise Error:", error.message)); // Output: Promise Error: Operation failed for: Task B

// Example 6.2.2: Promise Chaining and Error Propagation
asyncPromiseOperation("Step 1", true)
  .then((result1) => {
    console.log("Chain Step 1:", result1);
    return asyncPromiseOperation("Step 2", false); // This will reject
  })
  .then((result2) => {
    console.log("Chain Step 2:", result2); // This will be skipped
  })
  .catch((error) => {
    console.error("Chain Error Caught:", error.message); // Catches rejection from Step 2
  })
  .finally(() => {
    console.log("Promise chain finished.");
  });

// -------------------------------------------------------------------------
// 6.3. Async/Await (`try...catch` with `await`)
// -------------------------------------------------------------------------

/**
 * -   `async/await` allows you to use traditional `try...catch` blocks for asynchronous
 * operations, making the code look and feel synchronous.
 * -   The `await` keyword pauses the execution of the `async` function until the Promise
 * settles. If the Promise rejects, `await` throws an error that can be caught by `try...catch`.
 */

// Example 6.3.1: Async/Await with try...catch
async function performAsyncOperationWithAwait(shouldSucceed) {
  console.log("\n--- 6.3. Async/Await (try...catch) ---");
  try {
    console.log("Starting async/await task...");
    const result = await asyncPromiseOperation(
      "Data from Await",
      shouldSucceed
    ); // Await a Promise
    console.log("Async/Await Success:", result);
  } catch (error) {
    console.error("Async/Await Error Caught:", error.message);
  } finally {
    console.log("Async/Await task finished.");
  }
}

performAsyncOperationWithAwait(true); // Success path
performAsyncOperationWithAwait(false); // Failure path

// =========================================================================
// 7. Custom Error Types
// =========================================================================

/**
 * **Custom Error Types:**
 * -   You can create your own custom error classes by extending the built-in `Error` class.
 * -   This allows you to create more specific and semantically meaningful errors,
 * making error identification and handling easier.
 * -   Custom errors are useful for distinguishing between different types of application-specific
 * problems.
 */

// Example 7.1: Creating a Custom Error
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message); // Call parent Error constructor
    this.name = "NetworkError"; // Set the error name
    this.statusCode = statusCode;
    // Capture stack trace (important for custom errors)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkError);
    }
  }
}

class ValidationError extends Error {
  constructor(message, fields) {
    super(message);
    this.name = "ValidationError";
    this.fields = fields; // Specific data about validation failures
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

// Example 7.2: Using Custom Errors
function processUserData(data) {
  if (!data || !data.username || !data.email) {
    throw new ValidationError("Missing required fields", ["username", "email"]);
  }
  if (data.username.length < 3) {
    throw new ValidationError("Username too short", ["username"]);
  }
  // Simulate a network call
  const isOnline = Math.random() > 0.5; // Simulate network status
  if (!isOnline) {
    throw new NetworkError("Failed to connect to user service", 503);
  }
  return `User ${data.username} processed.`;
}

console.log("\n--- 7. Custom Error Types Example ---");
try {
  processUserData({ username: "un", email: "test@example.com" }); // Will throw ValidationError
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Validation Error:", error.message, "Fields:", error.fields);
  } else if (error instanceof NetworkError) {
    console.error("Network Error:", error.message, "Status:", error.statusCode);
  } else {
    console.error("Generic Error:", error.message);
  }
}

try {
  processUserData({ username: "validUser", email: "test@example.com" }); // Might throw NetworkError
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Validation Error:", error.message, "Fields:", error.fields);
  } else if (error instanceof NetworkError) {
    console.error("Network Error:", error.message, "Status:", error.statusCode);
  } else {
    console.error("Generic Error:", error.message);
  }
}

// =========================================================================
// 8. Global Error Handling
// =========================================================================

/**
 * **Global Error Handling:**
 * -   For errors that are *not caught* by any `try...catch` block, global handlers can
 * prevent the application from crashing and allow for logging or reporting.
 *
 * 8.1. **Browser Environment (`window.onerror`)**
 * -   Catches uncaught synchronous errors and errors from scripts.
 * -   `window.onerror = function(message, source, lineno, colno, error)`
 *
 * 8.2. **Node.js Environment (`process.on('uncaughtException')`)**
 * -   Catches uncaught synchronous errors.
 * -   **Warning:** This is a last resort. It's generally not recommended to continue
 * application execution after `uncaughtException` as the application state might be
 * corrupted. Best used for logging and then gracefully shutting down.
 *
 * 8.3. **Unhandled Promise Rejections (`unhandledrejection`)**
 * -   Crucial for catching Promises that reject but don't have a `.catch()` handler.
 * -   **Browser:** `window.addEventListener('unhandledrejection', event => { ... })`
 * -   **Node.js:** `process.on('unhandledRejection', (reason, promise) => { ... })`
 */

// Example 8.1 (Browser - conceptual, run in browser console)
/*
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global caught synchronous error:', message, source, lineno, colno);
  // Send error to a logging service
  return true; // Return true to prevent default browser error handling (e.g., logging to console)
};

// Simulate an uncaught synchronous error
// nonExistentFunction();
*/

// Example 8.2 (Node.js - conceptual, run in Node.js environment)
/*
process.on('uncaughtException', (err) => {
  console.error('Node.js: Uncaught synchronous exception:', err.message);
  // Log the error, then gracefully exit
  process.exit(1); // Exit with a failure code
});

// Simulate an uncaught synchronous error in Node.js
// throw new Error("This is an uncaught sync error in Node.js!");
*/

// Example 8.3 (Unhandled Promise Rejection)
console.log("\n--- 8.3. Unhandled Promise Rejection Example ---");

// Attach global unhandled rejection handler (conceptual, run in browser or Node.js)
// In a browser:
/*
window.addEventListener('unhandledrejection', (event) => {
  console.error('Global caught unhandled Promise rejection:', event.reason);
  // event.promise is the Promise that was rejected
});
*/
// In Node.js:
/*
process.on('unhandledRejection', (reason, promise) => {
  console.error('Node.js: Unhandled Promise Rejection at:', promise, 'reason:', reason);
  // Log the error, potentially send to monitoring
});
*/

// Simulate an unhandled promise rejection
Promise.reject(new Error("This promise was rejected but not caught!"));
// This error will be caught by the global unhandledrejection handler
// after the current microtask queue is empty.

// =========================================================================
// 9. Best Practices for Error Handling
// =========================================================================

/**
 * **Best Practices:**
 *
 * 9.1. **Throw Errors for Exceptional Conditions:**
 * -   Only throw errors when something truly exceptional and unrecoverable happens
 * that prevents the function from completing its intended purpose.
 * -   Don't use errors for normal control flow (e.g., returning `false` for validation failure).
 *
 * 9.2. **Catch Errors at the Appropriate Level:**
 * -   Catch errors where you can meaningfully handle them, recover, or provide feedback.
 * -   Avoid "swallowing" errors (catching them and doing nothing), as this hides problems.
 * -   Propagate errors up the call stack if a function cannot fully handle them.
 *
 * 9.3. **Use `async/await` with `try...catch` for Asynchronous Code:**
 * -   This is the most readable and maintainable pattern for sequential async operations.
 *
 * 9.4. **Handle Promise Rejections:**
 * -   Always add a `.catch()` to your Promise chains or `try...catch` to your `async/await` blocks.
 * -   If you have a Promise that you don't intend to handle immediately, consider
 * adding a dummy `.catch(() => {})` or logging to prevent unhandled rejection warnings.
 *
 * 9.5. **Log Errors:**
 * -   Always log errors to the console (for development) and to a centralized logging
 * service (for production) for monitoring and debugging.
 *
 * 9.6. **Provide User Feedback:**
 * -   For client-side applications, display user-friendly error messages instead of raw technical errors.
 *
 * 9.7. **Graceful Degradation:**
 * -   Design your application to degrade gracefully when errors occur, rather than crashing entirely.
 *
 * 9.8. **Use Custom Errors:**
 * -   For application-specific errors, create custom error classes to provide more context
 * and enable specific handling.
 */

// =========================================================================
// 10. Conclusion
// =========================================================================

/**
 * **Conclusion:**
 * Effective error handling is a cornerstone of professional JavaScript development.
 * By understanding the different types of errors, mastering `try...catch` for synchronous
 * code, and utilizing Promises and `async/await` for asynchronous operations,
 * developers can build resilient applications. Implementing custom error types and
 * global error handlers further enhances the ability to diagnose, manage, and
 * recover from unexpected situations, leading to a more stable and user-friendly experience.
 */
