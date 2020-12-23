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

console.log(input) // [ 7, 9, 1, 2, 5, 3, 6, 8, 4 ] => Answer: 25368479

// Part two
class Node {
    constructor(val) {
        this.val = val
        this.prev = null
        this.next = null
    }
}

function movePartTwo() {
    let removed = current.next
    current.next = removed.next.next.next // jump 3 nodes
    removedValues = [removed.val, removed.next.val, removed.next.next.val]
    let destination = current.val
    do {
        if (--destination < 1)
            destination = max
    } while (removedValues.includes(destination))
    let destinationNode = map.get(destination)
    let tmp = destinationNode.next // put back the 3 removed nodes
    destinationNode.next = removed
    removed.prev = destinationNode
    removed.next.next.next = tmp
    current = current.next
}

input = [3, 2, 6, 5, 1, 9, 4, 7, 8]

for (let i = 10; i <= 1000000; i++)
    input.push(i)

max = input.length

let map = new Map()
let list = null, cursor = null
for (let i = 0; i < max; i++) {
    let n = new Node(input[i])
    if (i === 0)
        list = cursor = n
    map.set(input[i], n)
    cursor.next = n
    n.prev = cursor
    cursor = n
}
list.prev = cursor // link head to tail
cursor.next = list // link tail to head
current = list

for (let i = 0; i < 10000000; i++) {
    if (i % 1000000 === 0)
        console.log('Done', i)
    movePartTwo()
}

let node1 = map.get(1)
let v1 = node1.next.val
let v2 = node1.next.next.val
console.log('Part two', v1, v2, v1 * v2) // 205375 216878 44541319250