const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

let tiles = []
let curr = { data: [], index: 0, coordinates: [] }
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
        curr = { data: [], index: 0, coordinates: [] }
    }
}

function reverse(s) {
    return [...s].reverse().join('')
}

function calculateMatches() {

    // Calculate borders: 0 = top, 1 = bottom, 2 = left, 3 = right

    for (let t of tiles) {
        t.borders = []
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

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].matching = []
        tiles[i].matchingBorders = []
    }

    for (let i = 0; i < tiles.length - 1; i++) {
        a = tiles[i]
        for (let j = i + 1; j < tiles.length; j++) {
            b = tiles[j]
            if (a.index === b.index)
                continue
            let indexA = 0
            for (let ab of a.borders) {
                reverseA = reverse(ab)
                let indexB = 0
                for (let bb of b.borders) {
                    reverseB = reverse(bb)
                    if (ab === bb) {
                        a.matching.push({ tile: b.index, borders: [indexA, indexB] })
                        b.matching.push({ tile: a.index, borders: [indexB, indexA] })
                        a.matchingBorders.push(indexA)
                        b.matchingBorders.push(indexB)
                    } else if (ab === reverseB) {
                        a.matching.push({ tile: b.index, borders: [indexA, -indexB] })
                        b.matching.push({ tile: a.index, borders: [-indexB, indexA] })
                        a.matchingBorders.push(indexA)
                        b.matchingBorders.push(-indexB)
                    } else if (bb === reverseA) {
                        a.matching.push({ tile: b.index, borders: [-indexA, indexB] })
                        b.matching.push({ tile: a.index, borders: [indexB, -indexA] })
                        a.matchingBorders.push(-indexA)
                        b.matchingBorders.push(indexB)
                    }
                    indexB++
                }
                indexA++
            }
        }
    }

}

// Search for corners

calculateMatches()

let mul = 1
for (let t of tiles) {
    if (t.matching.length === 2) {
        console.log('Corner', t.index, t.matchingBorders)
        mul *= t.index
        // Corner 3061 [ 2, 0 ]
        // Corner 3779 [ 1, 3 ]
        // Corner 3329 [ -3, 0 ]
        // Corner 2789 [ 3, -1 ]
        if (t.matchingBorders === [2, 0]) // 3061 = bottom right
            t.coordinates = [0, 11]
        else if (t.matchingBorders === [1, 3]) // 3779 = top left
            t.coordinates = [0, 0]
    }
}

console.log('Mult', mul)

// Part two

function rotate(t, angle) {

}

function flip(t, mode) {
    if (mode === 'horizontal') {
        for (let i = 0; i < t.data.length; i++)
            t.data[i] = reverse(t.data[i])
    }
    else if (mode === 'vertical') {
        for (let h = 0; h < t.data[0].length; h++) {
            let curr = ''
            for (let v = 0; v < t.data.length; v++)
                curr += t.data[v][h]
            curr = reverse(curr)
            for (let v = 0; v < t.data.length; v++)
                t.data[v][h] = curr[v]
        }
    }
}