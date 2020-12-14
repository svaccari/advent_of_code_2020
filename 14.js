const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

function applyMask(x, mask) {
    let val = BigInt(x)
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === 'X')
            continue
        let bit = BigInt(Math.pow(2, (mask.length - 1) - i))
        if (mask[i] === '0' && (val & bit)) {
            val -= bit
        } else if (mask[i] === '1') {
            val |= bit
        }
    }
    return val
}

let mem = {}
let mask = ''
for (let d of data) {
    let command = d.split(' = ')
    if (command[0] === 'mask') {
        mask = command[1]
        continue
    }
    let val = applyMask(parseInt(command[1]), mask)
    let index = parseInt(command[0].replace(/\D/g, ''))
    mem[index] = val
}

let sum = BigInt(0)
for (let k of Object.keys(mem))
    sum += mem[k]

console.log('Sum', sum)

// Part two

function baseMask(val, mask) {
    let output = []
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === '0') {
            let bit = BigInt(Math.pow(2, (mask.length - 1) - i))
            output.push(val & bit ? '1' : '0')
        } else
            output.push(mask[i])
    }
    return output
}

mem = {}
mask = ''
function setMem(val, mask) {
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === 'X') {
            let a = [...mask]
            let b = [...mask]
            a[i] = '0'
            b[i] = '1'
            setMem(val, a)
            setMem(val, b)
            return
        }
    }

    mem[mask] = val
}

for (let d of data) {
    let command = d.split(' = ')
    if (command[0] === 'mask') {
        mask = command[1]
        continue
    }
    let address = BigInt(parseInt(command[0].replace(/\D/g, '')))
    let val = BigInt(parseInt(command[1]))
    setMem(val, baseMask(address, mask.split('')))
}

sum = BigInt(0)
for (let k of Object.keys(mem))
    sum += mem[k]

console.log('Sum part two', sum)