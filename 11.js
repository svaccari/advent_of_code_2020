const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

let curr = []
let next = []
for (let d of data) {
    curr.push(d.split(''))
    next.push(d.split(''))
}

let w = data[0].length
let h = data.length

function newValue(input, xx, yy) {
    let occupied = 0, empty = 0
    let val = input[yy][xx]
    for (let y = yy - 1; y <= yy + 1; y++) {
        for (let x = xx - 1; x <= xx + 1; x++) {
            if (x === xx && y === yy)
                continue
            if (x < 0 || y < 0 || x >= w || y >= h)
                continue
            empty += input[y][x] === 'L' ? 1 : 0
            occupied += input[y][x] === '#' ? 1 : 0
        }
    }
    if (val === 'L' && occupied === 0) {
        return '#'
    } else if (val === '#' && occupied >= 4) {
        return 'L'
    }
    return val
}

let changed
do {
    changed = 0
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let val = curr[y][x]
            if (val === '.')
                continue
            let newVal = newValue(curr, x, y)
            if (newVal === val)
                continue
            next[y][x] = newVal
            changed++
        }
    }
    curr = []
    for (let y = 0; y < h; y++)
        curr.push(next[y].slice())
} while (changed > 0)

let occupied = 0
for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
        occupied += curr[y][x] === '#' ? 1 : 0
    }
}

console.log('Occupied = ', occupied)

// Part two

function newValuePartTwo(input, xx, yy) {
    let occupied = 0, empty = 0
    let val = input[yy][xx]
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
            if (offsetX === 0 && offsetY === 0)
                continue
            let x = xx
            let y = yy
            do {
                x += offsetX
                y += offsetY
                if (x < 0 || y < 0 || x >= w || y >= h)
                    break
                if (input[y][x] === '.')
                    continue
                break
            } while (x >= 0 && y >= 0 && x < w && y < h)
            if (x < 0 || y < 0 || x >= w || y >= h)
                continue
            empty += input[y][x] === 'L' ? 1 : 0
            occupied += input[y][x] === '#' ? 1 : 0
        }
    }
    if (val === 'L' && occupied === 0) {
        return '#'
    } else if (val === '#' && occupied >= 5) {
        return 'L'
    }
    return val
}

curr = []
next = []
for (let d of data) {
    curr.push(d.split(''))
    next.push(d.split(''))
}

do {
    changed = 0
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let val = curr[y][x]
            if (val === '.')
                continue
            let newVal = newValuePartTwo(curr, x, y)
            if (newVal === val)
                continue
            next[y][x] = newVal
            changed++
        }
    }
    curr = []
    for (let y = 0; y < h; y++)
        curr.push(next[y].slice())
} while (changed > 0)

occupied = 0
for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
        occupied += curr[y][x] === '#' ? 1 : 0
    }
}

console.log('Occupied part two = ', occupied)
