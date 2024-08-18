//Arguments package
const { argv } = require('node:process');
//File System
const fs = require('node:fs');

//Global variable
const filePath = 'c:\\Users\\Hansen\\Desktop\\tasks.json';

console.log('Program start!');
console.log('----------------------------------------* * *----------------------------------------');
//process.argv returns array of arguments
//slice(2) because the real arguments start from the second position
userArgs = process.argv.slice(2);

const mode = userArgs[0];

if(!fs.existsSync(filePath)){
    console.log('File doesn\'t exist!');
    console.log('Creating a new file...');
    writeToFile([]); //Initialize an empty array to the file
    console.log('File has been created.')
}

var tasks = readFile(filePath);

if(mode=='add'){
    const task = userArgs[1];
    var record = {
        "id":tasks.length+1,
        "description":task,
        "status":"",
        "createdAt":new Date(),
        "updatedAt":""
    }
    tasks.push(record);
    writeToFile(tasks);
    console.log(`Task added sucessfully! (ID:${record.id})`)
}else if(mode=='list'){
    listAllTasks(tasks);
}else if(mode=='update'){
    const id = userArgs[1];
    const task = userArgs[2];
    updateTask(id,task);
}


function writeToFile(content){
    try {
        fs.writeFileSync(filePath, JSON.stringify(content));
    } catch (err) {
        console.error(err);
    }
}

function readFile(path){
    try {
        const data = fs.readFileSync(path, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
      } catch (err) {
        console.error(err);
      }
}

function listAllTasks(tasks){
    console.log('All tasks:');
    tasks.forEach((task)=>{
        console.log(task);
    })
}

function updateTask(id, task){
    let taskToUpdate = tasks[id-1];
    let newTask = {...taskToUpdate,description:task,updatedAt:new Date()};
    const newTasks = tasks.map((task)=>{
        if(task.id==id)
        {
            return newTask
        }
        return task;
    })
    writeToFile(newTasks);
}