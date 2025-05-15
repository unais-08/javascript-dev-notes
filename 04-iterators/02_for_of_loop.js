//Array object specific loops
const superHeroes = ["Ironman", "Captain America", "Thor", "Hulk", "Loki"];
for (const superHero of superHeroes) {
    // console.log(superHero);
}

//Map
const countriesAcronyms = new Map();
countriesAcronyms.set('in', "India");
countriesAcronyms.set('usa', "America");
countriesAcronyms.set('uk', "Englan");


for (const [short, full] of countriesAcronyms) {
    console.log(short, ":", full);
}


