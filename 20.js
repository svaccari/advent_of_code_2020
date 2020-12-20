const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

let tiles = []
let curr = { data: [], index: 0, borders: [], matching: [] }
for (d of data) {
    if (d.length === 0)
        continue
    if (d[0] === 'T') {
        curr.index = parseInt(d.split(' ')[1])
        continue
    }
    curr.data.push(d)
    if (curr.data.length === d.length) {
        tiles.push(curr)
        curr = { data: [], index: 0, borders: [], matching: [] }
    }
}

// Calculate borders: 0 = top, 1 = bottom, 2 = left, 3 = right

for (let t of tiles) {
    t.borders.push(t.data[0])
    t.borders.push(t.data[t.data.length - 1])
    t.borders.push([])
    t.borders.push([])
    for (let i = 0; i < t.data.length; i++) {
        t.borders[2].push(t.data[i][0])
        t.borders[3].push(t.data[i][t.data[i].length - 1])
    }
    t.borders[2] = t.borders[2].join('')
    t.borders[3] = t.borders[3].join('')
}

// Search for matching tiles

for (let i = 0; i < tiles.length - 1; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
        a = tiles[i]
        b = tiles[j]
        if (a.index === b.index)
            continue
        let indexA = 0
        for (let ab of a.borders) {
            reverseA = [...ab].reverse().join('')
            let indexB = 0
            for (let bb of b.borders) {
                reverseB = [...bb].reverse().join('')
                if (ab === bb) {
                    a.matching.push({ tile: b.index, borders: [indexA, indexB]})
                    b.matching.push({ tile: a.index, borders: [indexB, indexA]})
                } else if (ab === reverseB) {
                    a.matching.push({ tile: b.index, borders: [indexA, -indexB]})
                    b.matching.push({ tile: a.index, borders: [-indexB, indexA]})
                } else if (bb === reverseA) {
                    a.matching.push({ tile: b.index, borders: [-indexA, indexB]})
                    b.matching.push({ tile: a.index, borders: [indexB, -indexA]})
                }
                indexB++
            }
            indexA++
        }
    }
}

// Search for corners

let mul = 1
for (let t of tiles) {
    if (t.matching.length === 2) {
        console.log('Corner', t.index, t.matching)
        mul *= t.index
    }
}

console.log('Mult', mul)

// Part two
// 3061 = bottom right
// 3779 = top left
// 3329 = 

console.log(tiles[0].matching)