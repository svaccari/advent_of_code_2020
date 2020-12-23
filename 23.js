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

function getNode(list, x) {
    let tmp = list
    while (tmp.val !== x)
        tmp = tmp.next
    return tmp
}

function movePartTwo() {
    let removed = current.next
    current.next = removed.next.next.next // jump 3 nodes
    removedValues = [removed.val, removed.next.val, removed.next.next.val]
    let destination = current.val - 1
    if (destination < 1)
        destination = max
    while (removedValues.includes(destination)) {
        destination--
        if (destination < 1)
            destination = max
    }
    let destinationNode = getNode(current, destination)
    let tmp = destinationNode.next
    destinationNode.next = removed
    removed.prev = destinationNode
    removed.next.next.next = tmp
    current = current.next
}

//input = [3, 8, 9, 1, 2, 5, 4, 6, 7] // test
input = [3, 2, 6, 5, 1, 9, 4, 7, 8]

for (let i = 10; i <= 1000000; i++)
    input.push(i)

max = input.length

let list = new Node(input[0])
let cursor = list
for (let i = 1; i < max; i++) {
    let n = new Node(input[i])
    cursor.next = n
    n.prev = cursor
    cursor = n
}
list.prev = cursor // link head to tail
cursor.next = list // link tail to head
current = list

console.log('Input length', max)

for (let i = 0; i < 10000000; i++) {
    if (i % 100000 === 0)
        console.log('Done', i)
    movePartTwo()
/*    console.log(list.val,
        list.next.val,
        list.next.next.val,
        list.next.next.next.val,
        list.next.next.next.next.val,
        list.next.next.next.next.next.val,
        list.next.next.next.next.next.next.val,
        list.next.next.next.next.next.next.next.val,
        list.next.next.next.next.next.next.next.next.val)*/
}

let node1 = getNode(list, 1)
let v1 = node1.next.val
let v2 = node1.next.next.val
console.log('Part two', v1, v2, v1 * v2)