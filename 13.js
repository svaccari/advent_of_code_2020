const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

let chars = data[1].split(',')
let timestamp = parseInt(data[0])
let available = chars.filter(x => x !== 'x').map(x => parseInt(x))
let mult = available.map(x => x * Math.ceil(timestamp / x))
let diff = mult.map(x => x - timestamp)
let min = 0, val = mult[0]
for (let i = 1; i < diff.length; i++) {
    if (mult[i] < val) {
        val = mult[i]
        min = i
    }
}

console.log('Result', available[min] * diff[min])

// Part two

available = [1789,37,47,1889]
chars = [1789,37,47,1889]

let maxIndex = 0
val = available[0]
for (let i = 1; i < available.length; i++) {
    if (available[i] > val) {
        val = available[i]
        maxIndex = i
    }
}

let offset = []
for (let i = 0; i < chars.length; i++)
    if (chars[i] !== 'x')
        offset.push(i)

console.log(available, offset, 'Max', available[maxIndex])

// Prepare to wait: 3 hours if split over 4 cores
// Result: 807435693182510

let k = 1
do
{
    let ok = true
    for (let i = 0; i < available.length; i++) {
        if (i === maxIndex)
            continue
        if ((available[maxIndex] * k + offset[i] - offset[maxIndex]) % available[i] !== 0) {
            ok = false
            break
        }
    }
    if (ok) {
        console.log('Found', k * available[maxIndex] - offset[maxIndex])
        break
    }
    k++
} while (true)