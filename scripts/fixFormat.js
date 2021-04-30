const fs = require('fs');
const path = require('path');

const outputDir = process.argv[2];

const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.srt'));

const addZeroLeftPadding = (val, length = 2) => val.padStart(length, '0');

files.forEach((f) => {
    const currentFilePath = path.join(outputDir, f);
    const origContents = fs.readFileSync(currentFilePath).toString();

    const contents = origContents.replace(/(\d+):(\d+):(\d+),(\d+)/g, (match, h, m, s, wrongMs) => {
        const wrongMsInt = parseInt(wrongMs);
        const ms = wrongMsInt ? (wrongMsInt / 1000).toString().split('.')[1].padEnd(3, '0') : '000';
        return `${addZeroLeftPadding(h)}:${addZeroLeftPadding(m)}:${addZeroLeftPadding(s)},${ms}`;
    })
// console.log(contents, origContents);
    const newFilename = path.basename(f, '.srt') + '.ro_RO.srt';
    fs.writeFileSync(path.join(outputDir, 'FormatareReparata', newFilename), contents);
})


console.log(files);