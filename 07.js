const { readFileSync } = require('fs')

const data = readFileSync('07.txt').toString().replace(/\r\n/g, '\n').split('\n')

let stop = 'shiny gold'
let bags = {}
for (let d of data) {
    if (d.length === 0)
        continue
    d = d.replace(/bags/g, 'bag')
    let t = d.split(' bag contain ')
    bags[t[0]] = {}
    if (t[1].indexOf('no other bag') !== -1)
        continue
    let tt = t[1].replace(/(\.|,)/g, '').split('bag')
    for (let s of tt)
        if (s.length)
            bags[t[0]][s.substr(2).trim()] = parseInt(s.trim()[0])
}

function canContain(data, color) {
    if (!data.length)
        return false
    let output = []
    for (let d of data) {
        if (d === color)
            return true
        else {
            output = output.concat(Object.keys(bags[d]))
        }
    }
    return canContain(output, color)
}

let sum = 0
for (let c of Object.keys(bags)) {
    if (c === stop)
        continue
    sum += canContain([c], stop) ? 1 : 0
}

console.log(`Sum = ${sum}`)

// Part two

function sumBags(color) {
    let bag = bags[color]
    if (Object.keys(bag).length === 0) {
        return 0
    }
    let sum = 0
    for (let n of Object.keys(bag)) {
        sum += bag[n] + bag[n] * sumBags(n)
    }
    return sum
}

console.log('Bags = ', sumBags(stop))