const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

const numbers = []

for (let d of data) {
    if (d.length === 0)
        continue
    numbers.push(parseInt(d))
}

let notFound
for (let i = 25; i < numbers.length; i++) {
    let curr = numbers[i]
    let found = false
    for (let x = i - 25; x < i; x++) {
        for (let y = i - 25; y < i; y++) {
            if (numbers[x] + numbers[y] === curr) {
                console.log(`${numbers[x]} + ${numbers[y]} = ${curr}`)
                found = true
                break
            }
        }
        if (found)
            break;
    }
    if (!found) {
        notFound = curr
        console.log('Not found:', curr)
        break;
    }
}

// Part two
for (let start = 0; start < numbers.length; start++) {
    for (let end = start + 1; end < numbers.length; end++) {
        let sum = 0, min = 9e9, max = 0
        for (let i = start; i <= end; i++) {
            sum += numbers[i]
            if (sum > notFound)
                break;
            min = Math.min(min, numbers[i])
            max = Math.max(max, numbers[i])
        }
        if (sum === notFound) {
            console.log(`From ${numbers[start]} to ${numbers[end]}, sum is ${min + max}`)
        }
    }
}