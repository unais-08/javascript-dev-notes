// Array of names, colors, and corresponding class names
const names = ["unais", "kashif", "rehan", "ubaid", "danish", "anas"];
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const classNames = ["unais", "kashif", "rehan", "ubaid", "danish", "anas"];

// Function to create and append new elements dynamically
const createElements = () => {
  // Loop through names and generate div elements
  for (let i = 0; i < names.length; i++) {
    const div = document.createElement("div");

    // Set class and ID for each div
    div.className = classNames[i];
    div.id = "ctn"; // You can modify this ID to be unique if needed
    div.style.backgroundColor = colors[i]; // Set background color based on the colors array
    div.style.padding = "1rem";
    div.setAttribute("color", "purple"); // This seems unused, consider removing if unnecessary

    // Set the inner HTML to display the person's name
    div.innerHTML = `Dom Manipulation with JavaScript by ${names[i]}`;

    // Additional styling
    div.style.textTransform = "uppercase";
    div.style.color = "black";
    div.style.margin = "1rem";

    // Append the div to the document body
    document.body.appendChild(div);
  }
};

// Call the function to generate the elements
createElements();

// Example of accessing a sibling element
for (let i = 0; i < names.length - 1; i++) {
  const currentDiv = document.querySelector(`.${classNames[i]}`);
  // Accessing next sibling div, make sure it's not null
  const nextDiv = currentDiv.nextElementSibling;
  if (nextDiv) {
    // Perform some action with the nextDiv if needed
    console.log(nextDiv);
  }
}

// Create a button element and append it inside the 'kashif' div
const button = document.createElement("button");
button.innerHTML = "Click here";

// Find the 'kashif' div and append the button
const kashifDiv = document.querySelector(".kashif");
if (kashifDiv) {
  kashifDiv.appendChild(button);
}

// Logging the button element to verify the operation
console.log(button);
