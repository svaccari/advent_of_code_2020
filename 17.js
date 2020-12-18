const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

let w = data[0].length
let h = data.length

let curr = []
for (let y = 0; y < h; y++) {
    let tmp = data[y].split('')
    for (let x = 0; x < w; x++) {
        cube = { x: x, y: y, z: 0, active: tmp[x] === '#' }
        curr.push(cube)
    }
}

function addNear(list, cube) {
    for (let x = cube.x - 1; x <= cube.x + 1; x++) {
        for (let y = cube.y - 1; y <= cube.y + 1; y++) {
            for (let z = cube.z - 1; z <= cube.z + 1; z++) {
                if (x === cube.x && y === cube.y && z === cube.z)
                    continue
                let found = false
                for (let l of list) {
                    if (l.x === x && l.y === y && l.z === z) {
                        found = true
                        break
                    }
                }
                if (found)
                    continue
                list.push({ x: x, y: y, z: z, active: false })
            }
        }
    }
}

function newValue(input, xx, yy, zz, state) {
    let active = 0
    for (let cube of input) {
        if (cube.x === xx && cube.y === yy && cube.z === zz)
            continue
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
    let count = curr.length
    for (let c = 0; c < count; c++)
        addNear(curr, curr[c])
    let next = []
    for (let cube of curr) {
        let newVal = newValue(curr, cube.x, cube.y, cube.z, cube.active)
        next.push({
            x: cube.x,
            y: cube.y,
            z: cube.z,
            active: newVal
        })
    }
    let active = next.filter((x) => x.active).length
    console.log(`${cycle + 1} - Cube count: ${count} => ${next.length} - Active = ${active}`)

    curr = next
}

// Part two

function addNear4D(list, cube) {
    for (let w = cube.w - 1; w <= cube.w + 1; w++) {
        for (let x = cube.x - 1; x <= cube.x + 1; x++) {
            for (let y = cube.y - 1; y <= cube.y + 1; y++) {
                for (let z = cube.z - 1; z <= cube.z + 1; z++) {
                    if (x === cube.x && y === cube.y && z === cube.z && w === cube.w)
                        continue
                    let found = false
                    for (let l of list) {
                        if (l.x === x && l.y === y && l.z === z && l.w === w) {
                            found = true
                            break
                        }
                    }
                    if (found)
                        continue
                    list.push({ x: x, y: y, z: z, w: w, active: false })
                }
            }
        }
    }
}

function newValue4D(input, xx, yy, zz, ww, state) {
    let active = 0
    for (let cube of input) {
        if (cube.x === xx && cube.y === yy && cube.z === zz && cube.w === ww)
            continue
        if (cube.x < xx - 1 || cube.x > xx + 1)
            continue
        if (cube.y < yy - 1 || cube.y > yy + 1)
            continue
        if (cube.z < zz - 1 || cube.z > zz + 1)
            continue
        if (cube.w < ww - 1 || cube.w > ww + 1)
            continue
        active += cube.active ? 1 : 0
    }
    if (state)
        return active === 2 || active === 3
    return active === 3
}

curr = []
for (let y = 0; y < h; y++) {
    let tmp = data[y].split('')
    for (let x = 0; x < w; x++) {
        cube = { x: x, y: y, z: 0, w: 0, active: tmp[x] === '#' }
        curr.push(cube)
    }
}

for (let cycle = 0; cycle < 6; cycle++) {
    let count = curr.length
    for (let c = 0; c < count; c++)
        addNear4D(curr, curr[c])
    let next = []
    for (let cube of curr) {
        let newVal = newValue4D(curr, cube.x, cube.y, cube.z, cube.w, cube.active)
        next.push({
            x: cube.x,
            y: cube.y,
            z: cube.z,
            w: cube.w,
            active: newVal
        })
    }
    let active = next.filter((x) => x.active).length
    console.log(`Part two ${cycle + 1} - Cube count: ${count} => ${next.length} - Active = ${active}`)

    curr = next
}
