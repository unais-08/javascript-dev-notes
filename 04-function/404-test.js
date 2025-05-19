// const url = "https://jsonplaceholder.typicode.com/users";
// fetch(url)
//   .then((resp) => resp.json())
//   .then((data) => console.log(data));

// async function fetchTask(url) {
//   const resp = await fetch(url);
//   const data = await resp.json();
//   console.log("from async/await --->\n", data);
// }

// await fetchTask(url);

// for (let i = 0; i < 10; i++) {
//   console.log(i);
// }

const radius = [1, 2, 3, 4, 5];

function area(radius) {
  return Math.PI * radius * radius;
}
function circumference(radius) {
  return Math.PI * radius;
}
function diameter(radius) {
  return 2 * radius;
}

function calculate(arr, cb) {
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    ans.push(cb(arr[i]));
  }
  return ans;
}

console.log(calculate(radius, area));
console.log(calculate(radius, circumference));
console.log(calculate(radius, diameter));
