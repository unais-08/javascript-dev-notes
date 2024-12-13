// Working with Dates in JavaScript

let myDate = new Date();

console.log(myDate); // Logs the full date and time in the local timezone
console.log(myDate.toDateString()); // Outputs the date in a human-readable format (e.g., "Fri Dec 13 2024")
console.log(myDate.toString()); // Outputs the full date and time as a string (e.g., "Fri Dec 13 2024 15:30:00 GMT+0530 (IST)")
console.log(myDate.toISOString()); // Outputs the date and time in ISO 8601 format (e.g., "2024-12-13T10:00:00.000Z")
console.log(myDate.toLocaleDateString()); // Outputs the date in the local format (e.g., "13/12/2024" in en-IN locale)
console.log(myDate.toLocaleString()); // Outputs the date and time in the local format (e.g., "13/12/2024, 3:30:00 PM")
console.log(myDate.toJSON()); // Outputs the date in ISO format, similar to toISOString()
console.log(myDate.toUTCString().toString().slice(4, 17).trim()); // Outputs the UTC date in a readable format (e.g., "13 Dec 2024")
console.log(myDate.toTimeString()); // Outputs the time and timezone (e.g., "15:30:00 GMT+0530 (India Standard Time)")
