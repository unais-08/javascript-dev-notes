const superHeroes = ["Ironman", "Captain America", "Thor", "Hulk", "Loki"];
superHeroes.forEach((item, idx, arr) => {
    console.log(item);
    // console.log(idx,arr);
})

const programmingLang = [
    {
        name: 'javascript',
        file: 'js',
        year: 1994
    },
    {
        name: 'C++',
        file: 'cpp',
        year: 1983
    },
    {
        name: 'java',
        file: 'java',
        year: 1992
    },

]

programmingLang.forEach((item)=>{
    console.log(`The ${item.name} is invent in year ${item.year}`)
})
