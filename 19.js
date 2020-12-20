const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')
const strings = readFileSync('19_strings.txt').toString().replace(/\r\n/g, '\n').split('\n')

function getRules(data) {
    let rules = {}
    for (let d of data) {
        let index = parseInt(d.split(':')[0])
        let right = d.split(':')[1].trim()
        if (right[0] === '"') {
            rules[index] = right[1]
            continue
        }
        let r = []
        if (right.indexOf('|') === -1) {
            for (let n of right.split(' '))
                if (n.length)
                    r.push(parseInt(n))
            rules[index] = r
            continue
        }
        let r1 = right.split('|')[0]
        let r2 = right.split('|')[1]
        rules[index] = { r1: [], r2: [] }
        for (let n of r1.split(' '))
            if (n.length)
                rules[index].r1.push(parseInt(n))
        for (let n of r2.split(' '))
            if (n.length)
                rules[index].r2.push(parseInt(n))
    }
    return rules
}

let index
function validate(text, rule) {
    if (typeof rule === 'string') {
        if (text[index] === rule) {
            index++
            return true
        }
        return false
    } else if (Array.isArray(rule)) {
        let tmp = 0
        for (let rIndex of rule) {
            if (!validate(text, rIndex)) {
                index -= tmp
                return false
            } else
                tmp++
        }
        return true
    } else if (typeof rule === 'object') {
        let tmp = index
        if (validate(text, rule.r1))
            return true
        index = tmp
        return validate(text, rule.r2)
    }
    return validate(text, rules[rule])
}

let rules = getRules(data)
let valid = 0
for (let s of strings) {
    index = 0
    if (validate(s, 0) && index === s.length)
        valid++
}

console.log('Valid', valid)
