const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

function getHash(x, y) {
    return (y + 1000) * 10e6 + (x + 1000)
}

function getXY(hash) {
    return [hash % 10e6 - 1000, Math.floor(hash / 10e6) - 1000]
}

let tiles = new Map()
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
    let x = 0, y = 0
    for (let m of moves) {
        x += m[0]
        y += m[1]
    }
    let hash = getHash(x, y)
    let v = tiles.get(hash)
    tiles.set(hash, v === undefined ? true : !v)
}

let count = 0
for (let v of tiles.values())
    count += v ? 1 : 0

console.log('Black', count)

// Part two

let nearOffset = [
    [1, 0], [-1, 0], [1, -1], [0, 1], [0, -1], [-1, 1]
]

for (let i = 0; i < 100; i++) {
    // add neighbours
    let newHashes = []
    for (let t of tiles.keys()) {
        let xy = getXY(t)
        for (let n of nearOffset) {
            let hash = getHash(xy[0] + n[0], xy[1] + n[1])
            if (!tiles.has(hash) && !newHashes.includes(hash))
                newHashes.push(hash)
        }
    }
    for (let h of newHashes)
        tiles.set(h, false)

    // apply rules
    let next = new Map()
    for (let kv of tiles.entries()) {
        let black = 0
        let xy = getXY(kv[0])
        for (let n of nearOffset) {
            let hash = getHash(xy[0] + n[0], xy[1] + n[1])
            black += tiles.get(hash) ? 1 : 0
        }
        next.set(kv[0], kv[1] ? (black === 1 || black == 2) : black === 2)
    }
    tiles = next
}

count = 0
for (let v of tiles.values())
    count += v ? 1 : 0

console.log('Black part two', count)
