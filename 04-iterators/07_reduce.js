//used in shopping cart summation and in product cart

const number = [1, 2, 3];

const printreduce= number.reduce((iter,currval)=>{
    return iter+currval;
},0)

console.log(printreduce);