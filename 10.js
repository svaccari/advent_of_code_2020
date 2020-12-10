const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

let numbers = []

for (let d of data) {
    if (d.length === 0)
        continue
    numbers.push(parseInt(d))
}

numbers.sort((a, b) => a - b)
numbers.unshift(0)
numbers.push(numbers[numbers.length - 1] + 3)

let steps = {}
for (let i = 1; i < numbers.length; i++) {
    let diff = numbers[i] - numbers[i - 1]
    steps[diff] = steps.hasOwnProperty(diff) ? (steps[diff] + 1) : 1
}

console.log(numbers.length, steps, steps[1] * steps[3])

// Part two

// how many can be eliminated? first, select only the ones with (-1, x, +1) interval
let intervals = []
let curr = []
for (let i = 1; i < numbers.length - 1; i++) {
    let diffPre = numbers[i] - numbers[i - 1]
    let diffPost = numbers[i + 1] - numbers[i]
    if (diffPre === 1 && diffPost === 1) {
        curr.push(numbers[i])
        continue
    }
    if (curr.length) {
        intervals.push(curr)
        curr = []
    }
}

console.log(intervals)

// if len = 1, combinations = 2
// if len = 2, combinations = 4
// if len = 3, combinations = 7

let mul = 1
for (let i of intervals)
    if (i.length === 1)
        mul *= 2
    else if (i.length === 2)
        mul *= 4
    else if (i.length === 3)
        mul *= 7

console.log(`Result: ${mul}`)