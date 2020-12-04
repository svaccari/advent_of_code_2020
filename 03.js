const { readFileSync } = require('fs')

const data = readFileSync('03.txt').toString().replace(/\r\n/g, '\n').split('\n')

let w = data[0].length

let slopes = [
    { offsetX: 1, offsetY: 1, trees: 0 },
    { offsetX: 3, offsetY: 1, trees: 0 },
    { offsetX: 5, offsetY: 1, trees: 0 },
    { offsetX: 7, offsetY: 1, trees: 0 },
    { offsetX: 1, offsetY: 2, trees: 0 }
]

let mult = 1
for (let s of slopes) {
    let x = 0
    for (let y = 0; y < data.length; y += s.offsetY) {
        s.trees += data[y][x % w] === '#' ? 1 : 0
        x += s.offsetX
    }
    console.log(`Trees = ${s.trees}`)
    mult *= s.trees
}

console.log(`Multiplication of trees = ${mult}`)
