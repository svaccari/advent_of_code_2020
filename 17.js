const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

let w = data[0].length
let h = data.length
let field = {
    minX: 0,
    maxX: w - 1,
    minY: 0,
    maxY: h - 1,
    minZ: 0,
    maxZ: 0
}

let curr = []
let next = []
for (let y = 0; y < h; y++) {
    let tmp = data[y].split('')
    for (let x = 0; x < w; x++) {
        cube = { x: x, y: y, z: 0, active: tmp[x] === '#' }
        curr.push(cube)
    }
}

function addNewCubes(list) {
    for (let x of [field.minX - 1, field.maxX + 1])
        for (let y of [field.minY - 1, field.maxY + 1])
            for (let z of [field.minZ - 1, field.maxZ + 1])
                list.push({ x: x, y: y, z: z, active: false })
}

function newValue(input, xx, yy, zz, state) {
    let active = 0
    for (let cube of input) {
        if (cube.x < xx - 1 || cube.x > xx + 1)
            continue
        if (cube.y < yy - 1 || cube.y > yy + 1)
            continue
        if (cube.z < zz - 1 || cube.z > zz + 1)
            continue
        active += cube.active ? 1 : 0
    }
    if (state)
        return active === 2 || active === 3
    return active === 3
}

for (let cycle = 0; cycle < 6; cycle++) {
    addNewCubes(curr)
    for (let cube of curr) {
        let newVal = newValue(curr, cube.x, cube.y, cube.z, cube.active)
        next.push({
            x: cube.x,
            y: cube.y,
            z: cube.z,
            active: newVal
        })
    }
    curr = next
    next = []
}

let active = curr.filter((x) => x.active).length

console.log('Active = ', active)

// Part two
