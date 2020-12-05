const { readFileSync } = require('fs')

const data = readFileSync('05.txt').toString().replace(/\r\n/g, '\n').split('\n')

let min = 9e9
let max = 0
let boarding = []
for (let d of data) {
    let row = 0
    let col = 0
    let rowBit = 64
    let colBit = 4
    for (let c of d) {
        if (c === 'F') {
            rowBit /= 2
        } else if (c === 'B') {
            row += rowBit
            rowBit /= 2
        } else if (c === 'L') {
            colBit /= 2
        } else if (c === 'R') {
            col += colBit
            colBit /= 2
        }
    }
    let id = row * 8 + col
    boarding.push(id)
    max = Math.max(max, id)
    min = Math.min(min, id)
}

console.log(`Max min = ${max}, ${min}`)

for (let r = 0; r < 128; r++)
    for (let c = 0; c < 8; c++) {
        let id = r * 8 + c
        if (!boarding.includes(id))
            console.log('Not found:', id)
    }

// Answer: 629, found manually