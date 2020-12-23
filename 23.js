let input = [3, 2, 6, 5, 1, 9, 4, 7, 8]
let current = 3

//input = [3, 8, 9, 1, 2, 5, 4, 6, 7] // test
//current = 3

let max = input.length

function move() {
    let index = (input.indexOf(current) + 1) % input.length
    let removed = input.splice(index, 3)
    while (removed.length !== 3)
        removed.push(input.shift())
    let destination = current - 1
    if (destination < 1)
        destination = max
    while (removed.includes(destination)) {
        destination--
        if (destination < 1)
            destination = max
    }
    input.splice(input.indexOf(destination) + 1, 0, ...removed)
    current = input[(input.indexOf(current) + 1) % input.length]
}

for (let i = 0; i < 100; i++)
    move()

console.log(input) // 25368479

// Part two
input = [3, 8, 9, 1, 2, 5, 4, 6, 7] // test
current = 3

for (let i = 10; i <= 1000000; i++)
    input.push(i)

max = input.length

console.log('Input length', max)

for (let i = 0; i < 10000000; i++) {
    if (i % 1000000 === 0)
        console.log('Done', i)
    move()
}

let index = input.indexOf(1)
let v1 = input[index + 1]
let v2 = input[index + 2]
console.log(index, v1, v2, v1 * v2)
