var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('03.txt')
});

lineReader.on('line', function (line) {
});
