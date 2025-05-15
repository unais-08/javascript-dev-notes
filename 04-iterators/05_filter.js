const coursePrice = [100, 299, 499, 999, 399]

const price = coursePrice.filter((item) => item > 500)
// const price = coursePrice.filter((item) => {
//     return item > 500
// })

const newCoursePrice = [];
coursePrice.forEach((item) => {
    if (item < 500) { newCoursePrice.push(item) }
})
console.log(price);
console.log(newCoursePrice);