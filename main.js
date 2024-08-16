//Arguments package
const { argv } = require('node:process');
//File System
const fs = require('node:fs');


console.log('Program start!');
console.log('--------------------* * *--------------------');
//process.argv returns array of arguments
//slice(2) because the real arguments start from the second position
userArgs = process.argv.slice(2);

mode = userArgs[0];
task = userArgs[1];

var tasks = [];

var initial = {
    "id":1,
    "task":"Cleaning"
}
tasks.push(initial);

if(mode=='add'){
    var record = {
        "id":tasks.length+1,
        "task":task
    }
    tasks.push(record);

    
    try {
        fs.writeFileSync('c:\\Users\\Hansen\\Desktop\\tasks.txt', JSON.stringify(tasks));
        // file written successfully
    } catch (err) {
        console.error(err);
    }

    console.log(`Task added sucessfully! (ID:${record.id})`)
}

console.log(tasks)
