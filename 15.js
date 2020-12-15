let input = { // number: turn
    19: 1,
    20: 2,
    14: 3,
    0: 4,
    9: 5,
    1: 6
}

let last = 2
let curr = 0
let turn = Object.keys(input).length + 1

do {
    if (input.hasOwnProperty(curr)) {
        tmp = curr
        curr = turn - input[curr]
        input[tmp] = turn
        continue
    }

    input[curr] = turn
    curr = 0

    if (turn % 100000 === 0)
        console.log('Running', turn)

} while (++turn < 2020) // Result: 1325; set to 30000000 for part two, result = 59006

console.log('Spoken', curr, turn)
