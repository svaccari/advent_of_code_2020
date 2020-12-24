const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

let tiles = {}
for (let d of data) {
    let moves = [] // e, se, sw, w, nw, ne
    let curr = ''
    for (let c of d) {
        if (c === 'e') {
            moves.push(curr === '' ? [1, 0] : (curr === 'n' ? [1, -1] : [0, 1]))
            curr = ''
        } else if (c === 'w') {
            moves.push(curr === '' ? [-1, 0] : (curr === 'n' ? [0, -1] : [-1, 1]))
            curr = ''
        } else
            curr += c
    }
    let offset = [0, 0]
    for (let m of moves) {
        offset[0] += m[0]
        offset[1] += m[1]
    }
    let hash = `${offset[0]},${offset[1]}`
    if (!tiles.hasOwnProperty(hash))
        tiles[hash] = false
    tiles[hash] = !tiles[hash]
}

let count = 0
for (let t of Object.keys(tiles))
    count += tiles[t] ? 1 : 0

console.log('Black', count)

// Part two

