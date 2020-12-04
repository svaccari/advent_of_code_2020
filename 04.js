const { readFileSync } = require('fs')

const data = readFileSync('04.txt').toString().replace(/\r\n/g, '\n').split('\n')

let mandatory = ['ecl:', 'pid:', 'eyr:', 'hcl:', 'byr:', 'iyr:', 'hgt:']

let fields = 0
let valid = 0
for (let d of data) {
    if (d.length === 0) {
        valid += fields === mandatory.length ? 1 : 0
        fields = 0
        continue
    }
    for (let m of mandatory)
        if (d.indexOf(m) !== -1)
            fields += 1
}

console.log(`Valid = ${valid}`)

// Part two
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

let mandatoryValidation = [
    {
        key: 'ecl:',
        validate: function (s) {
            return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(s)
        }
    },
    {
        key: 'pid:',
        validate: function (s) {
            let reg = /^\d+$/;
            return s.length === 9 && s.match(reg)
        }
    },
    {
        key: 'eyr:',
        validate: function (s) {
            try {
                let y = parseInt(s)
                return y >= 2020 && y <= 2030
            } catch (err) {
                return false
            }
        }
    },
    {
        key: 'hcl:',
        validate: function (s) {
            let reg = /^#[0-9a-f]{6}$/i
            return s.length === 7 && s.match(reg)
        }
    },
    {
        key: 'byr:',
        validate: function (s) {
            try {
                let y = parseInt(s)
                return y >= 1920 && y <= 2002
            } catch (err) {
                return false
            }
        }
    },
    {
        key: 'iyr:',
        validate: function (s) {
            try {
                let y = parseInt(s)
                return y >= 2010 && y <= 2020
            } catch (err) {
                return false
            }
        }
    },
    {
        key: 'hgt:',
        validate: function (s) {
            // hgt (Height) - a number followed by either cm or in:
            // If cm, the number must be at least 150 and at most 193.
            // If in, the number must be at least 59 and at most 76.
            try {
                let h = parseInt(s)
                if (s.indexOf('cm') !== -1)
                    return h >= 150 && h <= 193
                else if (s.indexOf('in') !== -1)
                    return h >= 59 && h <= 76
                return false
            } catch (err) {
                return false
            }
        }
    }
]

valid = 0
fields = 0
for (let d of data) {
    if (d.length === 0) {
        valid += fields === mandatory.length ? 1 : 0
        fields = 0
        continue
    }
    let tokens = d.split(' ')
    for (let t of tokens) {
        for (let m of mandatoryValidation) {
            if (t.indexOf(m.key) !== -1) {
                if (m.validate(t.split(':')[1]))
                    fields += 1
            }
        }
    }
}

console.log(`Valid part two = ${valid}`)