var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('02.txt')
});

let valid = 0
let validPartTwo = 0
lineReader.on('line', function (line) {
  let tokens = line.split(' ')
  let a = tokens[0].split('-')
  let min = parseInt(a[0])
  let max = parseInt(a[1])
  let char = tokens[1][0]
  let str = tokens[2]
  let count = 0
  for (let c of str) {
    count += c === char ? 1 : 0
  }
  valid += count >= min && count <= max ? 1 : 0
  console.log('Part one', valid, count, min, max)

  validPartTwo += ((str[min - 1] === char || str[max - 1] === char) && !(str[min - 1] === char && str[max - 1] === char)) ? 1 : 0
  console.log('Part two', validPartTwo)
});
