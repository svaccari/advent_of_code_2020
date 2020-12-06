const { readFileSync } = require('fs')

const data = readFileSync('06.txt').toString().replace(/\r\n/g, '\n').split('\n')

let sum = 0
let partial = {}
for (let d of data) {
    if (d.length === 0) {
        sum += Object.keys(partial).length
        partial = {}
        continue
    }
    for (let c of d)
        partial[c] = true
}

console.log(`Sum = ${sum}`)

// Part two

sum = 0
partial = {}
groupSize = 0
for (let d of data) {
    if (d.length === 0) {
        count = Object.keys(partial).filter((x) => partial[x] === groupSize).length
        console.log(partial, groupSize, count)
        sum += count
        partial = {}
        groupSize = 0
        continue
    }
    for (let c of d)
        partial[c] = partial.hasOwnProperty(c) ? (partial[c] + 1) : 1
    groupSize++
}

console.log(`Sum part two = ${sum}`)
