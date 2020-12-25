let k1 = 12320657
let k2 = 9659666

function transform(subjectNumber, key) {
    let v = 1
    let loop = 1
    while (true) {
        v = (v * subjectNumber) % 20201227
        if (v === key)
            return loop
        loop++
    }
}

function applyLoop(subjectNumber, loops) {
    let v = 1
    for (let i = 0; i < loops; i++)
        v = (v * subjectNumber) % 20201227
    return v
}

let loop1 = transform(7, k1)
let loop2 = transform(7, k2)

console.log('Encryption key', applyLoop(k1, loop2), applyLoop(k2, loop1))