const programmingLanguage = {
    js: 'javaScript',
    cpp: 'c++',
    java: 'java',
    py: 'python'
}

for (const key in programmingLanguage) {
    console.log(key, " ", programmingLanguage[key]);
}

const lang = ['js', 'py', 'cpp'];
for (const key in lang) {
    console.log(lang[key]);
}