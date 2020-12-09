const { readFileSync } = require('fs')

const data = readFileSync('08.txt').toString().replace(/\r\n/g, '\n').split('\n')

let code = []
for (let d of data) {
    if (d.length === 0)
        continue
    let tokens = d.split(' ')
    code.push({
        word: tokens[0],
        val: parseInt(tokens[1]),
        visited: false
    })
}

let i = 0
let acc = 0

while (!code[i].visited) {
    let curr = code[i]
    curr.visited = true
    if (curr.word === 'acc') {
        acc += curr.val
        i++
    } else if (curr.word === 'jmp')
        i += curr.val
    else
        i++
}

console.log('Acc = ', acc)

// Part two

function terminates(input) {
    let i = 0
    let acc = 0
    while (i < input.length && !input[i].visited) {
        let curr = input[i]
        curr.visited = true
        if (curr.word === 'acc') {
            acc += curr.val
            i++
        } else if (curr.word === 'jmp')
            i += curr.val
        else
            i++
    }
    if (i === input.length)
        console.log('Acc terminated = ', acc)
    return i === input.length
}

for (let x = 0; x < code.length; x++) {
    for (let i = 0; i < code.length; i++)
        code[i].visited = false
    let curr = code[x]
    if (curr.word === 'jmp') {
        curr.word = 'nop'
        terminates(code)
        curr.word = 'jmp'
    } else if (curr.word === 'nop') {
        curr.word = 'jmp'
        terminates(code)
        curr.word = 'nop'
    }
}
