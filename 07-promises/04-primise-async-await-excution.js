/**
 * File: 04-promises-vs-async-await.js
 * Description: Detailed comparison of Promise chaining (.then()) and async/await,
 * focusing on their execution models, underlying mechanisms (Event Loop, Microtask Queue),
 * and ideal use cases in JavaScript.
 * Date: 2025-05-21
 */

// =========================================================================
// 1. Introduction: Two Faces of Asynchronous Control
// =========================================================================

/**
 * **Promises (.then()) vs. Async/Await:**
 * -   Both Promises with `.then()` chaining and `async/await` are powerful tools
 * for managing asynchronous operations in JavaScript, providing a cleaner
 * alternative to Callback Hell.
 * -   While `async/await` is syntactic sugar built on top of Promises, they offer
 * different approaches to structuring and executing asynchronous code, impacting
 * readability, error handling, and perceived control flow.
 * -   Understanding their nuances is key to writing efficient and maintainable
 * asynchronous JavaScript.
 */

// =========================================================================
// 2. Promises with `.then()` Chaining: Callback Registration
// =========================================================================

/**
 * **Promises with `.then()`:**
 * -   This is the foundational way to handle asynchronous operations using Promises.
 * -   When you call `.then()` on a Promise, you are essentially **registering a callback function**
 * that will be executed *later* when the Promise resolves.
 * -   The execution flow does *not* pause at the `.then()` call. Instead, the code
 * immediately proceeds to the next line after `.then()`.
 * -   Chaining multiple `.then()` calls creates a sequence where each `.then()`
 * returns a new Promise, allowing the next `.then()` to be called when the
 * previous one resolves.
 */

// Example 1: Promise chaining with .then()
function simulateAsyncOperation(value, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`1. Operation completed: ${value}`);
      resolve(value + " processed");
    }, delay);
  });
}

console.log("1. Program Start (Promise .then())");

simulateAsyncOperation("Data A", 1000)
  .then((result1) => {
    console.log("1. First .then() callback:", result1);
    return simulateAsyncOperation("Data B", 500); // Returns a new Promise
  })
  .then((result2) => {
    console.log("1. Second .then() callback:", result2);
    return "Final result from .then() chain"; // This value resolves the next Promise
  })
  .then((finalResult) => {
    console.log("1. Final .then() result:", finalResult);
  })
  .catch((error) => {
    console.error("1. Error in .then() chain:", error.message);
  });

console.log(
  "1. Program End (Promise .then()) - Synchronous code continues immediately."
);

/**
 * **Execution Flow with `.then()` (Contexts & Queues):**
 * 1.  **Call Stack:**
 * * `console.log("Program Start...")` is executed.
 * * `simulateAsyncOperation("Data A", 1000)` is called. Its `setTimeout` schedules a task.
 * * The Promise returned by `simulateAsyncOperation` is immediately returned.
 * * `.then()` is called on this Promise, registering its `onFulfilled` callback. This callback is *not* put on the Call Stack yet.
 * * `console.log("Program End...")` is executed.
 * 2.  **Web APIs / Node.js APIs:** The `setTimeout` timer for "Data A" runs in the background.
 * 3.  **Macrotask Queue:** After 1000ms, the `setTimeout` callback (which resolves the Promise) is moved to the Macrotask Queue.
 * 4.  **Event Loop:**
 * * When the Call Stack is empty, the Event Loop checks the Macrotask Queue.
 * * It finds the `setTimeout` callback, pushes it to the Call Stack.
 * * This callback resolves the Promise, which then pushes the `onFulfilled` callback (from the first `.then()`) to the **Microtask Queue**.
 * 5.  **Microtask Queue:**
 * * The Event Loop prioritizes the Microtask Queue. After the current Macrotask (the `setTimeout` callback) finishes and the Call Stack is empty, the Event Loop processes all tasks in the Microtask Queue.
 * * The first `.then()` callback (`result1 => { ... }`) is moved from Microtask Queue to Call Stack and executed.
 * * Inside this callback, `simulateAsyncOperation("Data B", 500)` is called, scheduling another `setTimeout`.
 * * The Promise returned by `simulateAsyncOperation` is returned, and the second `.then()` callback is registered and pushed to the Microtask Queue.
 * * This cycle (Macrotask resolves Promise -> Microtask executed -> potentially new Macrotask/Microtask) continues until all Promises in the chain settle.
 */

// =========================================================================
// 3. Async/Await: Sequential-Looking Asynchronous Code
// =========================================================================

/**
 * **Async/Await:**
 * -   `async` functions are functions that always return a Promise.
 * -   The `await` keyword can *only* be used inside an `async` function.
 * -   When `await` is encountered, it **pauses the execution of the *current `async` function***
 * until the awaited Promise settles.
 * -   If the awaited Promise resolves, `await` "unwraps" its value and execution continues
 * from the next line within the `async` function.
 * -   If the awaited Promise rejects, `await` throws an error, which can be caught
 * using a standard `try...catch` block.
 * -   This makes asynchronous code look and feel much more like synchronous code,
 * improving readability, especially for sequential operations.
 */

// Example 2: Async/await equivalent
async function performSequentialOperations() {
  console.log("2. Starting async/await operations...");
  try {
    const result1 = await simulateAsyncOperation("Data X", 1000); // Pauses here
    console.log("2. After first await:", result1);

    const result2 = await simulateAsyncOperation("Data Y", 500); // Pauses here
    console.log("2. After second await:", result2);

    console.log("2. All async operations completed.");
    return "Final result from async/await";
  } catch (error) {
    console.error("2. Caught error in async/await:", error.message);
    throw error; // Re-throw if further handling is needed
  } finally {
    console.log("2. Async/await block finished (finally).");
  }
}

console.log("2. Program Start (Async/Await)");
performSequentialOperations()
  .then((finalMessage) => {
    console.log("2. Final message from async/await function:", finalMessage);
  })
  .catch((err) => {
    console.error("2. Error handled outside async function:", err.message);
  });
console.log(
  "2. Program End (Async/Await) - Synchronous code continues immediately."
);

/**
 * **Execution Flow with `async/await` (Contexts & Queues):**
 * 1.  **Call Stack:**
 * * `console.log("Program Start...")` is executed.
 * * `performSequentialOperations()` is called. It's an `async` function, so it immediately returns a Promise.
 * * `console.log("Starting async/await operations...")` inside `performSequentialOperations` is executed.
 * * `simulateAsyncOperation("Data X", 1000)` is called. It returns a Promise.
 * * **`await` is encountered:** The `async` function `performSequentialOperations` is *paused*. The JavaScript engine effectively "yields" control. The *rest of the `async` function* (the code after `await`) is wrapped into a continuation, which is then scheduled to run when the awaited Promise resolves. This continuation is placed into the **Microtask Queue**.
 * * The Call Stack unwinds, and `console.log("Program End...")` is executed.
 * 2.  **Web APIs / Node.js APIs:** The `setTimeout` timer for "Data X" runs.
 * 3.  **Macrotask Queue:** After 1000ms, the `setTimeout` callback (which resolves the Promise for "Data X") is moved to the Macrotask Queue.
 * 4.  **Event Loop:**
 * * When the Call Stack is empty, the Event Loop checks the Macrotask Queue.
 * * It finds the `setTimeout` callback, pushes it to the Call Stack.
 * * This callback resolves the Promise. This resolution triggers the continuation of `performSequentialOperations` (which was placed in the Microtask Queue).
 * 5.  **Microtask Queue:**
 * * The Event Loop prioritizes the Microtask Queue. After the current Macrotask finishes, the Event Loop processes the continuation of `performSequentialOperations` from the Microtask Queue.
 * * The `performSequentialOperations` function *resumes* execution on the Call Stack from where it left off (after the first `await`).
 * * `console.log("After first await...")` is executed.
 * * `simulateAsyncOperation("Data Y", 500)` is called, returning another Promise.
 * * **`await` is encountered again:** `performSequentialOperations` pauses again, and its *remaining continuation* is pushed to the Microtask Queue.
 * * This process repeats until the `async` function completes, at which point its final `return` value resolves the Promise that `performSequentialOperations` initially returned.
 */

// =========================================================================
// 4. Key Differences in Execution & Use Cases
// =========================================================================

/**
 * **4.1. Control Flow & Readability:**
 * -   **`.then()`:** Represents a more "functional" style. You register callbacks, and the flow jumps between different callback functions. Can lead to nested structures (though less severe than Callback Hell with proper chaining).
 * -   **`async/await`:** Represents a more "imperative" or "synchronous-looking" style. The code reads top-to-bottom, making sequential asynchronous operations much easier to follow and reason about.
 *
 * **4.2. Error Handling:**
 * -   **`.then()`:** Errors are caught by a `.catch()` method anywhere in the chain. If an error occurs, it propagates down the chain until a `.catch()` is found.
 * -   **`async/await`:** Errors from `await`ed Promises are thrown like synchronous errors and can be caught using standard `try...catch` blocks, which is familiar and intuitive.
 *
 * **4.3. Underlying Mechanism:**
 * -   Crucially, both are built on Promises and interact with the **Event Loop** and **Microtask Queue** in similar ways for scheduling. `async/await` doesn't introduce a new fundamental asynchronous mechanism; it provides a more convenient syntax.
 * -   Every `await` effectively creates a "pause point" where the `async` function yields control, and its continuation is scheduled as a microtask.
 *
 * **4.4. Use Cases & Recommendations:**
 * -   **Prefer `async/await` for sequential asynchronous operations:** When one operation clearly depends on the result of the previous one, `async/await` makes the code significantly cleaner and more readable.
 * -   **Use `Promise.all()` (with `await`) for concurrent operations:** When you need to run multiple independent Promises in parallel and wait for all of them to complete, `Promise.all()` combined with `await` is the most efficient and readable approach.
 * -   **`then()` chaining is still valid:** For simpler, single-step asynchronous operations or when you prefer a more functional approach, `.then()` chaining is perfectly acceptable. It's also necessary when you don't have an `async` function context (e.g., at the top level of older scripts, or when working with libraries that only expose Promises).
 * -   **Avoid mixing excessively:** While possible, mixing `.then()` and `await` heavily within the same logical block can sometimes reduce clarity. Choose the pattern that best fits the specific asynchronous flow.
 */

// =========================================================================
// 5. Advanced Considerations: Microtasks vs. Macrotasks
// =========================================================================

/**
 * **Microtasks vs. Macrotasks:**
 * -   **Macrotasks (Tasks):** Include callbacks from `setTimeout`, `setInterval`, I/O operations, UI rendering. The Event Loop processes one Macrotask at a time. After a Macrotask completes, the Event Loop checks the Microtask Queue.
 * -   **Microtasks:** Include callbacks from `Promise.then()`, `Promise.catch()`, `Promise.finally()`, `queueMicrotask()`, and the continuations of `async/await` functions after an `await`. The Event Loop processes *all* Microtasks in the Microtask Queue *before* moving to the next Macrotask.
 * -   This priority ensures that Promise-based operations (including `async/await` continuations) are executed more quickly and deterministically than `setTimeout` callbacks, which can be important for consistent state updates.
 */

// Example 3: Microtask vs. Macrotask Priority
console.log("3. Global Start");

setTimeout(() => console.log("3. Macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3. Microtask (Promise.then)"));

(async () => {
  console.log("3. Async function start");
  await Promise.resolve(); // Await resolves immediately, continuation goes to Microtask Queue
  console.log("3. Async function after await (Microtask)");
})();

console.log("3. Global End");

/*
Expected Output (Illustrates Microtask priority):
3. Global Start
3. Async function start
3. Global End
3. Microtask (Promise.then)
3. Async function after await (Microtask)
3. Macrotask (setTimeout)
*/
