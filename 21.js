const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

let food = []
let allAllergens = {}
let allIngredients = {}

for (let d of data) {
    let tokens = d.split('(contains ')
    let curr = {}
    curr.ingredients = tokens[0].trim().split(' ')
    curr.allergens = tokens[1].trim().replace(/\)/g, '').replace(/,/g, '').split(' ')
    food.push(curr)
    for (let a of curr.allergens)
        allAllergens[a] = true
    for (let i of curr.ingredients)
        allIngredients[i] = true
}

let wordIsAllergen = {}
for (let a of Object.keys(allAllergens)) {
    let hasAllergen = food.filter((f) => f.allergens.includes(a))
    let allWords = {}
    for (let f of hasAllergen)
        for (let w of f.ingredients)
            allWords[w] = true
    for (let w of Object.keys(allWords)) {
        let found = true
        for (let f of hasAllergen) {
            if (!f.ingredients.includes(w)) {
                found = false
                break
            }
        }
        if (found) {
            if (!wordIsAllergen.hasOwnProperty(w))
                wordIsAllergen[w] = {}
            wordIsAllergen[w][a] = true
        }
    }
}

console.log(wordIsAllergen)
let notAllergen = 0
for (let f of food) {
    for (let i of f.ingredients)
        if (!Object.keys(wordIsAllergen).includes(i))
            notAllergen++
}

console.log('Not allergen', notAllergen) // 2614

console.log(wordIsAllergen)

/*
qhvz: { eggs: true }
kbcpn: { fish: true }
fzsl: { nuts: true }
mjzrj: { peanuts: true }
bmj: { sesame: true }
mksmf: { shellfish: true }
gptv: { soy: true }
kgkrhg: {wheat: true }

qhvz,kbcpn,fzsl,mjzrj,bmj,mksmf,gptv,kgkrhg

*/
