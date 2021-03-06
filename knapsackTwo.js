const fs = require('fs');

const args = process.argv.slice(2);

if (args.length != 2) {
    console.error('require correct arguements');
    process.exit(1);
}

let filename = args[0];
let threshold = args[1];

let itemInfo = fs.readFileSync(filename, 'utf-8');
let items = itemInfo.split('\n');
items.pop();

for(let i = 0; i < items.length; i++) {
    items[i] = items[i].split('');
}

let ratios = [];

items.forEach(item => {
    let temp = [];
    temp.push(item[0]);
    temp.push(parseFloat(item[2]/item[1]));
    ratios.push(temp);
})

ratios.sort(sortFunction);

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    return (a[1] < b[1] ? 1 : -1);
}

let result = {};
let currentWeight = 0;
//let finalWeight = 0;
//let finalValue = 0;

for (let i = 0; i < ratios.length; i++) {
    if (currentWeight + (ratios[i][2]) <= threshold)
    currentWeight += (ratios[i][2]);
    result[ratios[i][0]] = {};
}

console.log(`Item to select: ${Object.keys(result)}`);