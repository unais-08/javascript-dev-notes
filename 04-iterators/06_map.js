const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const hold = number.map((item) => {
    return item + 10
})


const multimap = number
    .map((item) => item + 1)
    .map((item) => item * 10)
    .filter((item) => item <= 50)

console.log(multimap)