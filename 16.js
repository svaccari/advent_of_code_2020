const { readFileSync } = require('fs')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')
const tickets = readFileSync('16_tickets.txt').toString().replace(/\r\n/g, '\n').split('\n')

let rules = []
for (let d of data) {
    const regex = /(\d{2,3})-(\d{3})/gm
    for (match of d.matchAll(regex))
        rules.push({ min: parseInt(match[1]), max: parseInt(match[2]), name: d.split(':')[0] })
}

let nearbyTickets = []
for (let d of tickets) {
    let curr = []
    d.split(',').map((x) => curr.push(parseInt(x)))
    nearbyTickets.push(curr)
}

let valid = []
sum = 0
for (let t of nearbyTickets) {
    let v = true
    for (let n of t) {
        let ok = false
        for (r of rules) {
            if (n >= r.min && n <= r.max) {
                ok = true
                break
            }
        }
        if (!ok) {
            sum += n
            v = false
        }
    }
    if (v)
        valid.push(t)
}

console.log('Sum', sum)

// Part two

let your_ticket = [101, 71, 193, 97, 131, 179, 73, 53, 79, 67, 181, 89, 191, 137, 163, 83, 139, 127, 59, 61]

let found = {
    'class': 0,
    'seat': 15,
    'wagon': 14,
    'type': 16,
    'departure time': 19,
    'departure date': 2,
    'departure platform': 18,
    'departure station': 10,
    'departure location': 9,
    'departure track': 17
}

for (let index = 0; index < your_ticket.length; index++) {
    for (let r = 0; r < rules.length; r += 2) {
       if (found.hasOwnProperty(rules[r].name))
            continue
        let ok = true
        for (let t of valid) {
            if (t[index] >= rules[r].min && t[index] <= rules[r].max)
                continue
            if (t[index] >= rules[r + 1].min && t[index] <= rules[r + 1].max)
                continue
            ok = false
            break
        }
        if (ok)
            console.log(index, rules[r].name)
    }
}

console.log('Part two', your_ticket[19] * your_ticket[2] * your_ticket[18] * your_ticket[10] * your_ticket[9] * your_ticket[17])
