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

let offset = []
for (let i = 0; i < chars.length; i++)
    if (chars[i] !== 'x')
        offset.push(i)

console.log(offset)

let k = 1
do
{
    let ok = true
    for (let i = 1; i < available.length; i++)
        if ((available[0] * k + offset[i]) % available[i] !== 0) {
            ok = false
            break
        }
    if (ok) {
        console.log('Found', k * available[0])
        break
    }
    k++
} while (true)