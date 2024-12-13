// Function to display a new language by appending it to the list
const displayLang = (langName) => {
  const ul = document.querySelector(".list"); // Get the list element
  const li = document.createElement("li"); // Create a new li element
  li.textContent = langName; // Set the text content directly
  ul.appendChild(li); // Append the new li to the list
};

// Adding languages to the list
displayLang("JavaScript");
displayLang("C++");
displayLang("Java");
displayLang("Data Structure And Algorithms");
displayLang("GoLang");

// Edit - Replace the last item in the list with "TypeScript"
const lastLi = document.querySelector(".list li:last-child"); // Get the last li
if (lastLi) {
  // Ensure there's at least one li in the list
  const newLi = document.createElement("li"); // Create new li element
  newLi.textContent = "TypeScript"; // Set its text content
  lastLi.replaceWith(newLi); // Replace the last li with the new one
}

// Remove the last item from the list
const lastItem = document.querySelector(".list li:last-child"); // Get the last li
if (lastItem) {
  // Ensure there's at least one li in the list
  lastItem.remove(); // Remove the last li from the list
}
