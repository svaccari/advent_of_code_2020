const { readFileSync } = require('fs')

function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

let pos = { x: 0, y: 0 }
let offset = { x: 1, y: 0 }
for (let d of data) {
    let command = d[0]
    let val = parseInt(d.substr(1))
    if (command === 'N') {
        pos.y -= val
    } else if (command === 'S') {
        pos.y += val
    } else if (command === 'E') {
        pos.x += val
    } else if (command === 'W') {
        pos.x -= val
    } else if (command === 'L' || command === 'R') {
        let angle = command === 'L' ? val : -val
        let res = rotate(0, 0, offset.x, offset.y, angle)
        offset.x = Math.round(res[0])
        offset.y = Math.round(res[1])
    } else if (command === 'F') {
        pos.x += offset.x * val
        pos.y += offset.y * val
    }
}

console.log('Pos', pos, 'Sum', Math.abs(pos.x) + Math.abs(pos.y))

// Part two

pos = { x: 0, y: 0 }
offset = { x: 10, y: -1 }
for (let d of data) {
    let command = d[0]
    let val = parseInt(d.substr(1))
    if (command === 'N') {
        offset.y -= val
    } else if (command === 'S') {
        offset.y += val
    } else if (command === 'E') {
        offset.x += val
    } else if (command === 'W') {
        offset.x -= val
    } else if (command === 'L' || command === 'R') {
        let angle = command === 'L' ? val : -val
        let res = rotate(0, 0, offset.x, offset.y, angle)
        offset.x = Math.round(res[0])
        offset.y = Math.round(res[1])
    } else if (command === 'F') {
        pos.x += offset.x * val
        pos.y += offset.y * val
    }
}

console.log('Pos part two', pos, 'Sum', Math.abs(pos.x) + Math.abs(pos.y))
