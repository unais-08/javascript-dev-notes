// Closure :Function bundled with its lexical environment is known as a closure. Whenever function is returned, even if its vanished in execution context but still it remembers the reference it was pointing to. Its not just that function alone it returns but the entire closure and that's where it becomes interesting.
/**
 * File: closure.js
 * Description: Deep dive tutorial on JavaScript closures, explaining their concept,
 * how they work, common use cases, and potential pitfalls.
 * Author: Unais Shaikh
 * Date: 2025-05-18
 */

// ============================
// 1. What is a Closure?
// ============================
/**
 * **Closure: A Function Bundled with its Lexical Environment (Elaborated)**
 *
 * Your definition: "Function bundled with its lexical environment is known as a closure. Whenever
 * function is returned, even if its vanished in execution context but still it remembers the
 * reference it was pointing to. Its not just that function alone it returns but the entire
 * closure and that's where it becomes interesting."
 *
 * Let's break this down and expand on each part:
 *
 * **1. "Function bundled with its lexical environment is known as a closure."**
 * - **Function:** This is the inner function that is defined within another (outer) function. It's the entity that forms the closure.
 * - **Lexical Environment:** This is the crucial part. When a function is created, it doesn't just exist in isolation. It has a reference to its surrounding environment – the environment where it was *defined*, not necessarily where it's *executed*. This environment includes:
 * - Variables declared in its own scope (parameters and local variables).
 * - References to the lexical environments of its outer (parent) functions. This chain continues up to the global environment.
 * - **Bundled:** The inner function "remembers" or "closes over" the variables in its lexical environment. This "bundling" happens at the time the inner function is created.
 *
 * **2. "Whenever function is returned, even if its vanished in execution context but still it remembers the reference it was pointing to."**
 * - **Execution Context Vanished:** When an outer function completes its execution, its execution context is popped off the call stack. Typically, the local variables created within that context would be garbage collected.
 * - **Remembers the Reference:** However, if the inner function (which has a closure over the outer function's variables) is returned and held onto by a variable in the outer scope (or passed around), that inner function *retains* access to the outer function's variables. It's like the inner function carries a backpack containing references to the variables of its birth environment.
 * - **Not Just the Function Alone:** This is a key insight. When you return an inner function, you're not just returning a piece of code. You're returning the code *along with* the preserved environment (the closure) that its definition relied upon.
 *
 * **3. "Its not just that function alone it returns but the entire closure and that's where it becomes interesting."**
 * - **The Entire Closure:** This emphasizes that the returned function has access to the *entire* scope chain it had access to when it was defined. This includes variables from the outer function's scope, the scope of any grandparent functions, and the global scope.
 * - **Where it Becomes Interesting:** This is where the power and utility of closures lie. They enable:
 * - **Data Hiding and Encapsulation:** By keeping variables within the scope of the outer function and only exposing the inner function, you can create private-like data that cannot be directly accessed or modified from the outside. (Think of the `createCounter` example).
 * - **Maintaining State:** Closures allow inner functions to "remember" and operate on variables from their outer scope across multiple invocations, even after the outer function has finished.
 * - **Creating Factories:** Outer functions can act as factories, creating inner functions with pre-configured environments (e.g., the `outerFunction` example that creates a greeting function).
 * - **Asynchronous Operations:** Callbacks in `setTimeout`, event listeners, and Promises often form closures, allowing them to access variables from the scope where they were defined, even when executed much later.
 *
 * **Analogy:** Imagine a traveler (the inner function) who is given a map (the lexical environment) of the town (the outer function's scope) where they were born. Even after they leave that town and travel far away (the outer function finishes execution), they still have that map and can remember the important locations (variables) from their hometown.
 *
 * **Interview Perspective:** When discussing closures in an interview, it's crucial to go beyond the basic definition. Emphasize the role of the lexical environment, the persistence of access after the outer function's execution, and the practical implications for data privacy, state management, and asynchronous programming. Being able to provide clear examples is also essential.
 */

/**
 * ####################OR####################
 * **Closure:**
 * - Definition: A closure is the ability of a function to "remember" and access variables from its
 * lexical scope (the scope in which the function was defined), even when the function is executed
 * outside of that original scope.
 * - Key Concept: When an inner function is defined within an outer function, the inner function has
 * access to the outer function's variables (including parameters). This access persists even after
 * the outer function has finished executing.
 * - Interview Perspective: Understanding closures is crucial for demonstrating a deep grasp of
 * JavaScript's scope and memory management. Be prepared to explain the "why" and "how" behind
 * closures and provide practical examples.
 */

// Example 1: Basic Closure
function outerFunction(outerVar) {
  /**
   * This inner function forms a closure over 'outerVar'.
   * @param {string} innerVar - A variable local to the inner function.
   */
  function innerFunction(innerVar) {
    console.log("Closure Example 1:", outerVar, innerVar);
  }
  return innerFunction; // The outer function returns the inner function.
}

const myInnerFunc = outerFunction("Hello from outer"); // outerFunction has finished executing
myInnerFunc("World from inner"); // However, myInnerFunc still has access to 'outerVar'.
// Output: Closure Example 1: Hello from outer World from inner

// ============================
// 2. How Closures Work (Lexical Environment)
// ============================

/**
 * **Lexical Environment:**
 * - Explanation: When a function is created, it has a link to its surrounding lexical environment.
 * This environment holds the variables that were in scope where the function was defined.
 * - Closure Mechanism: When the outer function returns the inner function, the inner function retains
 * a reference to the outer function's lexical environment (the "closure"). This allows the inner
 * function to access those variables later, even if the outer function's execution context has been popped off the call stack.
 * - Interview Perspective: Mentioning "lexical environment" demonstrates a more technical understanding
 * of how closures are implemented in JavaScript engines.
 */

// Example 2: Closure with Counter
function createCounter() {
  let count = 0; // 'count' is in the lexical environment of the returned functions.

  return {
    /**
     * Increments the counter.
     */
    increment: function () {
      count++;
    },
    /**
     * Decrements the counter.
     */
    decrement: function () {
      count--;
    },
    /**
     * Gets the current value of the counter.
     * @returns {number} The current count.
     */
    getCount: function () {
      return count;
    },
  };
}

const counterA = createCounter();
counterA.increment();
counterA.increment();
console.log("Closure Example 2 (counterA):", counterA.getCount()); // Output: 2

const counterB = createCounter();
counterB.decrement();
console.log("Closure Example 2 (counterB):", counterB.getCount()); // Output: -1

// Each counter has its own independent 'count' variable due to the closure.

// ============================
// 3. Common Use Cases of Closures
// ============================

/**
 * **Use Cases:**
 * - Data Encapsulation and Privacy: Closures can be used to create private variables, as demonstrated
 * in the `createCounter` example. The 'count' variable is not directly accessible from outside
 * the returned object's methods.
 * - Maintaining State: As seen with the counter, closures allow functions to maintain state across
 * multiple invocations.
 * - Creating Function Factories: Functions that return other functions, often with some pre-configured
 * behavior (like `outerFunction` in Example 1).
 * - Implementing Callbacks: When a function is passed as an argument to another function, the callback
 * often forms a closure over variables in its defining scope.
 * - Currying and Partial Application: Techniques that involve creating new functions by pre-filling
 * some of the arguments of an original function often rely on closures.
 * - Module Pattern (older approach): Used to create modular and organized JavaScript code by encapsulating
 * variables and functions within a closure.
 * - Interview Perspective: Be ready to provide examples of these use cases to illustrate the practical
 * benefits of closures in JavaScript development.
 */

// Example 3: Closure with Callback (setTimeout)
function delayedGreeting(message, delay) {
  setTimeout(function () {
    console.log("Closure Example 3 (setTimeout):", message); // This anonymous function closes over 'message'.
  }, delay);
  console.log("setTimeout scheduled.");
}

delayedGreeting("Hello after 2 seconds!", 2000);
// Output (after 2 seconds): Closure Example 3 (setTimeout): Hello after 2 seconds!

// ============================
// 4. Potential Pitfalls of Closures
// ============================

/**
 * **Pitfalls:**
 * - Memory Leaks: If closures inadvertently hold references to large objects or DOM elements that are
 * no longer needed, it can prevent them from being garbage collected, leading to memory leaks. Be
 * mindful of what variables your closures are referencing.
 * - Performance Overhead: Creating closures can have a slight performance overhead compared to simpler
 * functions, as the JavaScript engine needs to manage the captured variables. However, this is
 * usually not a significant concern in most applications unless closures are created excessively
 * in performance-critical sections.
 * - Accidental Binding: In loops, if you're not careful with closures, you might accidentally bind to
 * the same variable instance, leading to unexpected behavior (common issue with `var` in older JS).
 * - Interview Perspective: Showing awareness of potential issues demonstrates a more mature understanding
 * of closures and their implications. Be prepared to discuss how to avoid these pitfalls.
 */

// Example 4: The Loop and Closure Problem (common with 'var' - fixed with 'let' and block scope)
function loopWithClosuresVar() {
  for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
      console.log("Closure Example 4 (var):", i); // All will output 4 due to closure over the same 'i' variable.
    }, i * 100);
  }
}
// loopWithClosuresVar();
// Output (after delays): Closure Example 4 (var): 4
//                         Closure Example 4 (var): 4
//                         Closure Example 4 (var): 4

function loopWithClosuresLet() {
  for (let i = 1; i <= 3; i++) {
    setTimeout(function () {
      console.log("Closure Example 5 (let):", i); // Each closure has its own 'i' due to block scope.
    }, i * 100);
  }
}
// loopWithClosuresLet();
// Output (after delays): Closure Example 5 (let): 1
//                         Closure Example 5 (let): 2
//                         Closure Example 5 (let): 3

//solution to loopWithClosuresVar() without using let keyword

function clousureExample() {
  for (var i = 0; i <= 5; i++) {
    function avoidSameRefForIVariable(x) {
      setTimeout(function () {
        console.log("Value of i: ", x);
      }, x * 1000);
    }
    avoidSameRefForIVariable(i);
  }
  console.log("From line no: 5");
}

clousureExample();

// ============================
// 5. Summary of Closures
// ============================

/**
 * **Summary:**
 * - Closures are a powerful feature in JavaScript that enable inner functions to retain access to
 * their outer function's scope even after the outer function has finished executing.
 * - They are fundamental to many JavaScript patterns, including data encapsulation, state management,
 * and creating more flexible and reusable code.
 * - Understanding closures is essential for writing effective and efficient JavaScript and for
 * succeeding in JavaScript interviews.
 */

// End of deep-dive tutorial on JavaScript Closures
