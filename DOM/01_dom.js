// DOM Element Selectors

// Selecting Elements by ID (getElementById)
const heading = document.getElementById("heading"); // Selects an element with ID "heading"
heading.style.color = "purple"; // Changes the text color to purple

const list = document.getElementById("list"); // Selects an element with ID "list"
list.style.backgroundColor = "purple"; // Changes the background color to purple

// Selecting Elements by Class Name (getElementsByClassName)
const listItems = document.getElementsByClassName("list-item"); // Returns a collection of elements with the class "list-item"

// Selecting Elements by Tag Name (getElementsByTagName)
const liTags = document.getElementsByTagName("li"); // Returns a collection of all <li> elements

// Selecting Elements by Name (getElementsByName)
// Note: "name" is an attribute, not a tag
const liByName = document.getElementsByName("li"); // Returns a collection of elements with the "name" attribute set to "li"

// Modern Selectors (querySelector and querySelectorAll)
const headingQuery = document.querySelector("#heading"); // Selects the first element matching the CSS selector "#heading"
headingQuery.style.color = "red"; // Changes the text color to red

// Query Selector for Multiple Elements (querySelectorAll)
let colors = ["red", "green", "yellow", "purple", "pink", "black", "white"];
const liQueryAll = document.querySelectorAll(".list-item"); // Selects all elements with the class "list-item"

// Apply random colors and text to each selected element
liQueryAll.forEach((liItem) => {
  let randomColorIndex = Math.floor(Math.random() * colors.length); // Generates a random index
  liItem.style.color = colors[randomColorIndex]; // Assigns a random color from the array
  liItem.innerHTML = "Shaikh Unais"; // Sets the inner HTML content to "Shaikh Unais"
});
