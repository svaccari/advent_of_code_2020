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

// Calculate borders

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
        for (let ab of a.borders) {
            reverseA = [...ab].reverse().join('')
            for (let bb of b.borders) {
                reverseB = [...bb].reverse().join('')
                if (ab === bb || ab === reverseB || bb === reverseA) {
                    a.matching.push(b.index)
                    b.matching.push(a.index)
                }
            }
        }
    }
}

// Search for corners

let mul = 1
for (let t of tiles) {
    if (t.matching.length === 2) {
        console.log('Corner', t.index)
        mul *= t.index
    }
}

console.log('Mult', mul)