/**
 * File: 01-modules-import-export.js
 * Description: A professional and detailed guide to JavaScript Modules,
 * covering the 'import' and 'export' statements, their various forms,
 * module resolution, and best practices for structuring modern JavaScript applications.
 * Date: 2025-05-22
 */

// =========================================================================
// 1. Introduction: The Need for Modules
// =========================================================================

/**
 * **Introduction to JavaScript Modules:**
 * -   Before ES6 (ECMAScript 2015), JavaScript lacked a native module system.
 * Developers relied on patterns like IIFEs (Immediately Invoked Function Expressions)
 * or third-party solutions (CommonJS for Node.js, AMD for browsers) to organize code.
 * -   **Modules** provide a way to:
 * -   **Organize Code:** Break down large applications into smaller, manageable, and reusable files.
 * -   **Encapsulate:** Keep variables and functions private to a module by default, preventing global scope pollution.
 * -   **Share Functionality:** Explicitly expose (export) parts of a module that other modules can use (import).
 * -   **Manage Dependencies:** Clearly define what a module needs from other modules.
 * -   ES6 introduced a standardized module system using `import` and `export` keywords,
 * which is now universally supported in modern browsers and Node.js.
 */

// =========================================================================
// 2. The `export` Keyword: Making Code Available
// =========================================================================

/**
 * **The `export` Keyword:**
 * -   The `export` keyword is used to make variables, functions, classes, or objects
 * defined in a module available for use in other modules.
 * -   There are two main types of exports: **Named Exports** and **Default Exports**.
 */

// -------------------------------------------------------------------------
// 2.1. Named Exports
// -------------------------------------------------------------------------

/**
 * **2.1. Named Exports:**
 * -   Used to export multiple values from a module.
 * -   Each exported item is identified by its name.
 * -   When importing, you must use the exact same name (or an alias).
 * -   Syntax: `export const name = value;` or `export { name1, name2 };`
 */

// Example 2.1.1: Exporting individual declarations
export const PI = 3.14159; // Exporting a constant

export function add(a, b) {
  // Exporting a function
  return a + b;
}

export class Calculator {
  // Exporting a class
  constructor() {
    this.result = 0;
  }
  add(num) {
    this.result += num;
  }
  subtract(num) {
    this.result -= num;
  }
}

// Example 2.1.2: Exporting a list of existing declarations (at the end of the file)
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
export { multiply, subtract };

// Example 2.1.3: Exporting with an alias
const divideOperation = (a, b) => a / b;
export { divideOperation as divide }; // Export 'divideOperation' as 'divide'

// -------------------------------------------------------------------------
// 2.2. Default Exports
// -------------------------------------------------------------------------

/**
 * **2.2. Default Exports:**
 * -   A module can have **only one default export**.
 * -   It's often used when a module's primary purpose is to export a single entity
 * (e.g., a main class, a utility function, or a configuration object).
 * -   When importing a default export, you can give it any name you like.
 * -   Syntax: `export default expression;`
 */

// Example 2.2.1: Exporting a default function
function Logger(message) {
  console.log(`[LOG]: ${message}`);
}
export default Logger;

// Example 2.2.2: Exporting a default class (common pattern)
// export default class UserProfile {
//   constructor(name, email) {
//     this.name = name;
//     this.email = email;
//   }
//   getInfo() {
//     return `${this.name} (${this.email})`;
//   }
// }

// You cannot have two default exports in the same file.
// export default const MY_CONSTANT = 100; // Syntax Error!

// =========================================================================
// 3. The `import` Keyword: Using Exported Code
// =========================================================================

/**
 * **The `import` Keyword:**
 * -   The `import` keyword is used to bring exported functionality from one module
 * into the current module.
 * -   The path to the module (the "module specifier") can be:
 * -   **Relative Path:** `./myModule.js`, `../utils/helpers.js`
 * -   **Absolute Path (from root):** `/src/components/Button.js` (less common)
 * -   **Bare Specifier:** `react`, `lodash` (for npm packages, resolved by module bundlers/Node.js)
 */

// -------------------------------------------------------------------------
// 3.1. Importing Named Exports
// -------------------------------------------------------------------------

/**
 * **3.1. Importing Named Exports:**
 * -   You must use curly braces `{}` and the exact names of the exported items.
 */

// Example 3.1.1: Importing named exports from './my-math-module.js' (conceptual)
// Assume 'my-math-module.js' contains exports from section 2.1
/*
import { PI, add, Calculator, multiply, divide } from './my-math-module.js';

console.log(PI); // 3.14159
console.log(add(2, 3)); // 5
const calc = new Calculator();
calc.add(10);
console.log(calc.result); // 10
console.log(multiply(4, 5)); // 20
console.log(divide(10, 2)); // 5
*/

// Example 3.1.2: Importing with an alias
/*
import { add as sumNumbers } from './my-math-module.js';
console.log(sumNumbers(5, 5)); // 10
*/

// -------------------------------------------------------------------------
// 3.2. Importing Default Exports
// -------------------------------------------------------------------------

/**
 * **3.2. Importing Default Exports:**
 * -   You do *not* use curly braces.
 * -   You can give the imported default export any name you want.
 */

// Example 3.2.1: Importing a default export from './my-logger-module.js' (conceptual)
// Assume 'my-logger-module.js' contains export default Logger;
/*
import myLogger from './my-logger-module.js'; // 'myLogger' is just a chosen name
myLogger("This is a default exported logger.");
*/

// -------------------------------------------------------------------------
// 3.3. Importing Both Named and Default Exports
// -------------------------------------------------------------------------

/**
 * **3.3. Importing Both:**
 * -   You can import both the default and named exports from the same module
 * in a single `import` statement.
 */

// Example 3.3.1: Importing both from a single module (conceptual)
// Assume 'my-mixed-module.js' has a default export and named exports
/*
// my-mixed-module.js
export const VERSION = '1.0';
export function processData(data) { return data.toUpperCase(); }
export default class DataHandler { // Default export
  handle(data) { return processData(data); }
}

// In another file:
import DataHandler, { VERSION, processData } from './my-mixed-module.js';

const handler = new DataHandler();
console.log(handler.handle("hello")); // HELLO
console.log(VERSION); // 1.0
console.log(processData("world")); // WORLD
*/

// -------------------------------------------------------------------------
// 3.4. Importing All Named Exports (`* as`)
// -------------------------------------------------------------------------

/**
 * **3.4. Importing All Named Exports (`import * as name`)**
 * -   Imports all named exports from a module into a single object.
 * -   The default export (if any) will be available as a property named `default` on this object.
 */

// Example 3.4.1: Importing all named exports (conceptual)
/*
import * as MathUtils from './my-math-module.js';

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.add(10, 20)); // 30
const calc = new MathUtils.Calculator();
calc.add(5);
console.log(calc.result); // 5
*/

// -------------------------------------------------------------------------
// 3.5. Side-Effect Imports
// -------------------------------------------------------------------------

/**
 * **3.5. Side-Effect Imports:**
 * -   Used when a module doesn't export anything, but you want its code to run
 * (e.g., polyfills, global configurations, or registering event listeners).
 * -   The module's code is executed when it's imported.
 */

// Example 3.5.1: Side-effect import (conceptual)
// Assume 'init-app.js' contains: console.log("App initialized!");
/*
import './init-app.js'; // Just runs the code in init-app.js
*/

// -------------------------------------------------------------------------
// 3.6. Dynamic Imports (`import()`)
// -------------------------------------------------------------------------

/**
 * **3.6. Dynamic Imports (`import()`)**
 * -   Allows you to load modules asynchronously and conditionally at runtime.
 * -   Returns a Promise that resolves to the module object.
 * -   Useful for code splitting (loading only necessary parts of an app) or
 * loading modules based on user interaction.
 */

// Example 3.6.1: Dynamic import (conceptual)
/*
const loadModuleButton = document.getElementById('loadModule');
loadModuleButton.addEventListener('click', async () => {
  try {
    // Dynamically import the module when the button is clicked
    const module = await import('./heavy-utility.js');
    console.log("Dynamically loaded module:", module);
    module.doSomethingHeavy();
  } catch (error) {
    console.error("Failed to load module:", error);
  }
});
*/

// =========================================================================
// 4. Module Resolution
// =========================================================================

/**
 * **Module Resolution:**
 * -   When you use an `import` statement, the JavaScript environment (browser or Node.js)
 * needs to figure out where the module file is located.
 * -   **Browsers:**
 * -   Require full paths (relative or absolute) for local files.
 * -   Often rely on bundlers (Webpack, Rollup, Vite) to handle bare specifiers (`import 'react'`).
 * -   Require the `type="module"` attribute on the `<script>` tag for module files:
 * `<script type="module" src="./main.js"></script>`
 * -   **Node.js:**
 * -   Supports both CommonJS (`require`) and ES Modules (`import`/`export`).
 * -   Resolves bare specifiers by looking in `node_modules`.
 * -   Requires files to end with `.mjs` or for `package.json` to have `"type": "module"` for ES Modules.
 */

// =========================================================================
// 5. Best Practices for Modules
// =========================================================================

/**
 * **Best Practices:**
 *
 * 5.1. **Consistency:**
 * -   Choose a consistent style for exports (e.g., prefer named exports for most utilities,
 * default for a single primary entity per file).
 *
 * 5.2. **Clarity in Naming:**
 * -   Use descriptive names for your modules and exports.
 * -   When importing default exports, choose a clear local name.
 *
 * 5.3. **Avoid Circular Dependencies:**
 * -   Be careful not to create situations where Module A imports Module B, and Module B
 * imports Module A. This can lead to undefined values or runtime errors.
 * -   Refactor code to break these cycles.
 *
 * 5.4. **Barrel Files (`index.js`):**
 * -   For larger components or feature directories, use an `index.js` file to re-export
 * multiple named exports from sub-modules. This simplifies imports for consumers.
 *
 * Example:
 * // components/Button/index.js
 * export { default as Button } from './Button.jsx';
 * export { default as ButtonGroup } from './ButtonGroup.jsx';
 *
 * // In another file:
 * import { Button, ButtonGroup } from '../components/Button'; // Cleaner import path
 *
 * 5.5. **Minimize Exports:**
 * -   Only export what is absolutely necessary. Keep internal logic encapsulated within the module.
 *
 * 5.6. **Default Export for Single Responsibility:**
 * -   If a file primarily provides one main thing (e.g., a React component, an Express router,
 * a utility class), a default export is often appropriate.
 *
 * 5.7. **Named Exports for Utilities/Constants:**
 * -   For collections of utility functions, constants, or helper classes, named exports are usually better.
 */

// =========================================================================
// 6. Comparison to CommonJS (Node.js)
// =========================================================================

/**
 * **CommonJS vs. ES Modules:**
 * -   **CommonJS (`require`/`module.exports`):** The traditional module system in Node.js.
 * -   **Synchronous:** Modules are loaded synchronously.
 * -   **Dynamic:** `require()` can be called anywhere in the code.
 * -   **Copies:** Exports are copies of values at the time of export.
 *
 * -   **ES Modules (`import`/`export`):** The standardized JavaScript module system.
 * -   **Asynchronous (potentially):** Designed for asynchronous loading (especially in browsers, dynamic imports).
 * -   **Static:** `import` statements are hoisted and processed at parse time.
 * -   **Live Bindings:** Exports are live bindings to the original values. If the exported value changes in the source module, the imported value updates.
 *
 * Modern Node.js supports both, but ES Modules are the future of JavaScript modules.
 */

// =========================================================================
// 7. Conclusion
// =========================================================================

/**
 * **Conclusion:**
 * JavaScript modules (`import` and `export`) are fundamental to modern web development.
 * They enable developers to write organized, maintainable, and scalable applications
 * by promoting encapsulation, reusability, and clear dependency management.
 * Mastering the various forms of `import` and `export` and adhering to best practices
 * is essential for building professional-grade JavaScript projects.
 */
