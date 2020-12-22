let p1 = [7, 1, 9, 10, 12, 4, 38, 22, 18, 3, 27, 31, 43, 33, 47, 42, 21, 24, 50, 39, 8, 6, 16, 46, 11]
let p2 = [49, 41, 40, 35, 44, 29, 30, 19, 14, 2, 34, 17, 25, 5, 15, 32, 20, 48, 45, 26, 37, 28, 36, 23, 13]

while (p1.length && p2.length) {
    let card1 = p1.shift()
    let card2 = p2.shift()
    if (card1 > card2) {
        p1.push(card1)
        p1.push(card2)
    } else {
        p2.push(card2)
        p2.push(card1)
    }
}

console.log(p1.length, p2.length)

let score = 0

for (let i = 0; i < p1.length; i++)
    score += (p1.length - i) * p1[i]

console.log('Score', score)

// Part two

p1 = [7, 1, 9, 10, 12, 4, 38, 22, 18, 3, 27, 31, 43, 33, 47, 42, 21, 24, 50, 39, 8, 6, 16, 46, 11]
p2 = [49, 41, 40, 35, 44, 29, 30, 19, 14, 2, 34, 17, 25, 5, 15, 32, 20, 48, 45, 26, 37, 28, 36, 23, 13]

let played = []
function game(a, b) {
    if (b.length === 0)
        return 1
    if (a.length === 0)
        return 2
    let curr = a.join(',') + '|' + b.join(',')
    if (played.includes(curr))
        return 1
    played.push(curr)

    let card1 = a.shift()
    let card2 = b.shift()
    if (a.length >= card1 && b.length >= card2) {
        let aCopy = [], bCopy = []
        for (let i = 0; i < card1; i++)
            aCopy.push(a[i])
        for (let i = 0; i < card2; i++)
            bCopy.push(b[i])
        let winner = game(aCopy, bCopy)
        if (winner === 1) {
            a.push(card1)
            a.push(card2)
        } else {
            b.push(card2)
            b.push(card1)
        }
    } else {
        if (card1 > card2) {
            a.push(card1)
            a.push(card2)
        } else {
            b.push(card2)
            b.push(card1)
        }
    }
    if (b.length === 0)
        return 1
    if (a.length === 0)
        return 2
    return game(a, b)
}

game(p1, p2)

console.log(p1.length, p2.length)

score = 0

if (p1.length) {
    for (let i = 0; i < p1.length; i++)
        score += (p1.length - i) * p1[i]
}
if (p2.length) {
    for (let i = 0; i < p2.length; i++)
        score += (p2.length - i) * p2[i]
}

console.log('Score part two', score) // 32609, 4661
