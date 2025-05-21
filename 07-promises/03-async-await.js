/**
 * File: 03-async-await.js
 * Description: Comprehensive tutorial on async/await for handling JavaScript Promises.
 * Explains how async/await simplifies asynchronous code, improves readability,
 * and manages error handling.
 * Date: 2025-05-21
 */

// =========================================================================
// 1. Introduction to Async/Await
// =========================================================================

/**
 * **Async/Await:**
 * -   `async` and `await` are modern JavaScript keywords (ES2017) that provide a
 * more concise and readable way to work with asynchronous code.
 * -   They are essentially **syntactic sugar** built on top of Promises. This means
 * that behind the scenes, `async/await` functions still use Promises.
 * -   Their primary goal is to make asynchronous code look and behave more like
 * synchronous code, significantly improving readability and maintainability,
 * especially when dealing with sequential asynchronous operations.
 * -   They help to avoid "Callback Hell" and complex Promise chaining.
 */

// =========================================================================
// 2. The `async` Keyword
// =========================================================================

/**
 * **The `async` Keyword:**
 * -   The `async` keyword is used to define an asynchronous function.
 * -   An `async` function always returns a Promise.
 * -   If an `async` function returns a non-Promise value, JavaScript automatically
 * wraps that value in a resolved Promise.
 * -   If an `async` function throws an error, JavaScript automatically wraps that
 * error in a rejected Promise.
 */

// Example 1: Async function returning a value
async function greetAsync(name) {
  return `Hello, ${name}!`; // This value will be wrapped in a resolved Promise
}

greetAsync("Alice").then((message) => {
  console.log("1. Async function resolved:", message); // Output: Hello, Alice!
});

// Example 2: Async function throwing an error
async function throwErrorAsync() {
  throw new Error("Something went wrong in async function!"); // This error will be wrapped in a rejected Promise
}

throwErrorAsync().catch((error) => {
  console.error("1. Async function rejected:", error.message); // Output: Something went wrong in async function!
});

// =========================================================================
// 3. The `await` Keyword
// =========================================================================

/**
 * **The `await` Keyword:**
 * -   The `await` keyword can **only be used inside an `async` function**.
 * -   It pauses the execution of the `async` function until the Promise it's waiting for
 * settles (either resolves or rejects).
 * -   If the Promise resolves, `await` returns the resolved value.
 * -   If the Promise rejects, `await` throws the error, which can then be caught using a `try...catch` block.
 */

// Example 3: Using await inside an async function
function simulateFetch(data, delay = 1000, shouldSucceed = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(data);
      } else {
        reject(new Error("Simulated fetch error!"));
      }
    }, delay);
  });
}

async function performAsyncTask() {
  console.log("2. Starting async task...");
  const result1 = await simulateFetch("First data", 500); // Pauses here for 500ms
  console.log("2. Received:", result1);

  const result2 = await simulateFetch("Second data", 300); // Pauses here for 300ms
  console.log("2. Received:", result2);

  return "Async task completed!";
}

performAsyncTask().then((finalMessage) => {
  console.log("2. Final message:", finalMessage);
});

// =========================================================================
// 4. Error Handling with `try...catch`
// =========================================================================

/**
 * **Error Handling with `try...catch`:**
 * -   One of the biggest advantages of `async/await` is simplified error handling.
 * -   Errors (rejections) from `await`ed Promises can be caught using standard
 * `try...catch` blocks, just like synchronous errors.
 * -   This makes error management much more intuitive and avoids the nested `.catch()`
 * blocks often seen in complex Promise chains.
 */

// Example 4: Error handling in async/await
async function performAsyncTaskWithError() {
  try {
    console.log("3. Starting async task with potential error...");
    const result1 = await simulateFetch("Data A", 500);
    console.log("3. Received:", result1);

    // This will cause a rejection
    const result2 = await simulateFetch("Data B", 300, false);
    console.log("3. This line will not be reached:", result2); // This line is skipped if error occurs
  } catch (error) {
    console.error("3. Caught an error:", error.message); // The error is caught here
  } finally {
    console.log("3. Async task with error finished (finally).");
  }
}

performAsyncTaskWithError();

// =========================================================================
// 5. Practical Example: Login and Fetch Profile (Revisiting `02-promise-producer-consumer.js`)
// =========================================================================

/**
 * **Practical Example: Login and Fetch Profile**
 * -   Let's revisit the login and user profile fetching scenario from
 * `02-promise-producer-consumer.js` and implement it using `async/await`.
 * -   Notice how the code flow becomes much more linear and readable.
 */

// Simulate login API (Promise Producer)
function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "unais" && password === "12345") {
        resolve({ success: true, userId: 101, message: "Login successful" });
      } else {
        reject({ success: false, message: "Invalid credentials" });
      }
    }, 1500);
  });
}

// Simulate fetching user profile (Promise Producer)
function getUserProfile(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 101) {
        resolve({
          success: true,
          profile: { name: "Unais Shaikh", age: 22, role: "SDE Intern" },
        });
      } else {
        reject({ success: false, message: "User not found" });
      }
    }, 1000);
  });
}

// Example 5: Implementing login and profile fetch using async/await
async function performLoginAndFetchProfile(username, password) {
  try {
    console.log(`4. Attempting login for ${username}...`);
    const loginResult = await loginUser(username, password); // Await login Promise
    console.log("4. Login successful:", loginResult.message);

    console.log(`4. Fetching profile for userId: ${loginResult.userId}...`);
    const profileResult = await getUserProfile(loginResult.userId); // Await profile Promise
    console.log("4. User profile:", profileResult.profile);

    return profileResult.profile; // Return the final result
  } catch (error) {
    console.error("4. Operation failed:", error.message);
    throw error; // Re-throw the error for external handling if needed
  } finally {
    console.log("4. Login and profile operation completed.");
  }
}

// Call the async function for success scenario
performLoginAndFetchProfile("unais", "12345");

// Call the async function for failure scenario
performLoginAndFetchProfile("invalid", "password").catch(() => {
  console.log("4. Handled failed login externally.");
});

// =========================================================================
// 6. Concurrency with `Promise.all()` in Async/Await
// =========================================================================

/**
 * **Concurrency with `Promise.all()`:**
 * -   While `await` makes asynchronous operations sequential, sometimes you need
 * to run multiple independent Promises concurrently (in parallel) to save time.
 * -   `Promise.all()` is used for this. It takes an array of Promises and returns
 * a single Promise that resolves when all of the input Promises have resolved,
 * or rejects as soon as any of the input Promises reject.
 * -   You can `await` `Promise.all()` to wait for all parallel operations to complete.
 */

// Example 6: Fetching multiple resources concurrently
async function fetchMultipleResources() {
  try {
    console.log("5. Fetching multiple resources concurrently...");
    const [data1, data2, data3] = await Promise.all([
      simulateFetch("Resource A", 800),
      simulateFetch("Resource B", 400),
      simulateFetch("Resource C", 600),
    ]);

    console.log("5. All resources fetched:");
    console.log("   -", data1);
    console.log("   -", data2);
    console.log("   -", data3);
  } catch (error) {
    console.error("5. Error fetching resources concurrently:", error.message);
  } finally {
    console.log("5. Concurrent fetch operation completed.");
  }
}

fetchMultipleResources();

// =========================================================================
// 7. Top-Level `await` (ES2022)
// =========================================================================

/**
 * **Top-Level `await` (ES2022):**
 * -   Previously, `await` could only be used inside an `async` function.
 * -   With ES2022, `await` can now be used at the top level of a JavaScript module.
 * -   This means you don't need to wrap your top-level `await` calls in an
 * `async IIFE` (Immediately Invoked Function Expression) in modern environments.
 * -   Note: This feature is only available in modules. For regular scripts, you might
 * still need an `async IIFE` or to wrap your code in an `async` function.
 */

// Example 7: Top-level await (conceptual - requires module environment)
// console.log("6. Top-level await (conceptual)");
// const finalData = await simulateFetch("Top-level data", 200);
// console.log("6. Received top-level data:", finalData);

// If not in a module (older environments), you'd use an async IIFE:
(async () => {
  try {
    console.log("6. Top-level await (via async IIFE):");
    const initData = await simulateFetch("Initial config", 100);
    console.log("6. Initial config loaded:", initData);
  } catch (error) {
    console.error("6. Error in async IIFE:", error.message);
  }
})();

// =========================================================================
// 8. Best Practices for Async/Await
// =========================================================================

/**
 * **Best Practices:**
 * -   **Always use `try...catch`:** Wrap `await` calls in `try...catch` blocks to handle rejections gracefully.
 * -   **Handle errors at appropriate levels:** Decide where to catch and handle errors (e.g., within the `async` function, or let them propagate).
 * -   **Use `Promise.all()` for concurrency:** When you have multiple independent asynchronous operations, run them in parallel with `Promise.all()` to improve performance.
 * -   **Avoid `async` functions that don't use `await`:** If an `async` function doesn't use `await`, it might be unnecessarily returning a Promise.
 * -   **Be mindful of blocking:** While `await` makes code look synchronous, remember it's still asynchronous. Don't block the main thread with excessively long synchronous operations inside an `async` function.
 */
