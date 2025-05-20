/**
 * File: 02-promise-producer-consumer.js
 * Description:  Explains the producer and consumer aspects of JavaScript Promises,
 * including how Promises are created (producer) and how their results are
 * handled (consumer).  Builds upon 01-introduction-to-promises.js and provides
 * more in-depth examples.
 * Date: 2025-05-20
 */

// =========================================================================
// 1. Promises: Producers and Consumers
// =========================================================================

/**
 * **Promises: Producers and Consumers**
 * -   In the context of Promises, there are two key roles:
 * -   **Producer:** The code that creates the Promise.  The producer is responsible for
 * initiating the asynchronous operation and eventually calling `resolve()` or `reject()`.
 * -   **Consumer:** The code that uses the Promise. The consumer uses the `then()`, `catch()`,
 * and `finally()` methods to handle the Promise's resolved value or rejection reason.
 * -   It's helpful to think of a Promise as a communication channel between the producer
 * and the consumer.  The producer sets up the asynchronous operation and signals its
 * completion (success or failure), and the consumer reacts to that signal.
 */

// =========================================================================
// 2. Promise Producers: Creating Promises
// =========================================================================

/**
 * **Promise Producers:**
 * -   Promises are created using the `Promise` constructor.
 * -   The code within the `Promise` constructor's executor function acts as the producer.
 * -   The producer initiates the asynchronous operation and controls when the Promise
 * is resolved or rejected.
 */

// Example 1:  A Promise-producing function (simulated file read)
function readFileAsync(filename) {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous file read operation
    setTimeout(() => {
      const fileContent = `Content of ${filename}`; // Simulate successful read
      const error = null; // Simulate no error

      if (!error) {
        resolve(fileContent); // Resolve with the file content
      } else {
        reject(error); // Reject with the error
      }
    }, 1000);
  });
}

// Example 2:  A Promise-producing function (simulated API call with error handling)
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        const userData = {
          id: userId,
          name: "John Doe",
          email: "john.doe@example.com",
        };
        resolve(userData);
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1500);
  });
}

// =========================================================================
// 3. Promise Consumers: Handling Results
// =========================================================================

/**
 * **Promise Consumers:**
 * -   The code that uses a Promise to get its eventual result (or handle its error) is the consumer.
 * -   Consumers use the `then()`, `catch()`, and `finally()` methods to handle the Promise's outcome.
 */

// Example 3: Consuming the Promise from readFileAsync
readFileAsync("myFile.txt")
  .then((content) => {
    console.log("1. File content:", content); // Handle success
  })
  .catch((error) => {
    console.error("1. Error reading file:", error); // Handle error
  });

// Example 4: Consuming the Promise from fetchUserData
fetchUserData(101)
  .then((user) => {
    console.log("2. User Data:", user);
  })
  .catch((error) => {
    console.error("2. Error fetching user data:", error.message);
  });

fetchUserData(-5)
  .then((user) => {
    console.log("2b. User Data:", user);
  })
  .catch((error) => {
    console.error("2b. Error fetching user data:", error.message); // This will be called.
  });

// =========================================================================
// 4.  Chaining Producers and Consumers
// =========================================================================
/**
 * **Chaining Producers and Consumers**
 * -  Promises are designed to be chained.  A function can return a promise, and the next function
 * in the chain can consume the result of that promise.  This allows for complex asynchronous
 * workflows to be built in a readable and maintainable way.
 */

//Simulate login and get user data.
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
// Example 5: Chaining Promises (login and get profile)
loginUser("unais", "12345")
  .then((loginResult) => {
    // Consumer of loginUser
    console.log("3. Login successful:", loginResult.message);
    // Producer: returns a new promise
    return getUserProfile(loginResult.userId); // Chain to getUserProfile
  })
  .then((profileResult) => {
    // Consumer of getUserProfile
    console.log("3. User profile:", profileResult.profile);
  })
  .catch((error) => {
    // Error handler for *both* loginUser and getUserProfile
    console.error("3. Error:", error.message);
  })
  .finally(() => {
    console.log("3. Operation completed...");
  });
