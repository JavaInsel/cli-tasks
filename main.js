//Arguments package
const { argv } = require('node:process');
//File System
const fs = require('node:fs');

//Global variable
const filePath = '{your_file_path}';

//Programm starts here
console.log(`Welcome to 'Task Tracker' Programm!`)
// console.log(`
//      ██  █████  ██    ██  █████  ██ ███    ██ ███████ ███████ ██      
//      ██ ██   ██ ██    ██ ██   ██ ██ ████   ██ ██      ██      ██      
//      ██ ███████ ██    ██ ███████ ██ ██ ██  ██ ███████ █████   ██      
// ██   ██ ██   ██  ██  ██  ██   ██ ██ ██  ██ ██      ██ ██      ██      
//  █████  ██   ██   ████   ██   ██ ██ ██   ████ ███████ ███████ ███████                                                           
//     `)

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

//Read all existing tasks before do any operation
var tasks = readFile(filePath);

if(mode=='add'){
    const task = userArgs[1];
    let id;
    if(tasks.length==0){
        id = 1;
    }else{
        id = parseInt(tasks[tasks.length-1].id) + 1;
    }
    addTask(id,task);
}else if(mode=='list'){
    if(userArgs[1]=='done'){
        listTasksWithStatus('done');
        return;
    }
    if(userArgs[1]=='todo'){
        listTasksWithStatus('todo');
        return;
    }
    if(userArgs[1]=='in-progress'){
        listTasksWithStatus('in-progress');
        return;
    }
    listAllTasks(tasks);
}else if(mode=='update'){
    const id = userArgs[1];
    const task = userArgs[2];
    updateTask(id,task);
}else if(mode=='delete'){
    const id = userArgs[1];
    deleteTask(id);
}else if(mode=='mark-in-progress'){
    const id = userArgs[1];
    updateStatus(id,'in-progress');
}else if(mode=='mark-done'){
    const id = userArgs[1];
    updateStatus(id,'done');
}else{
    console.log('Command invalid!');
    console.log(' ________________________________________');
    console.log('| Valid commands:                        |');
    console.log('| * add                                  |');
    console.log('| * update                               |');
    console.log('| * delete                               |');
    console.log('| * mark-done/mark-in-progress           |');
    console.log('| * list                                 |');
    console.log('| * list done                            |');
    console.log('| * list todo                            |');
    console.log('| * list in-progress                     |');
    console.log('|________________________________________|');
}
console.log('\n Copyright:');
console.log(`
                                    ██ ███    ██ ███████ ███████ ██      
        ██   ███   ██    ██   ███   ██ ████   ██ ██      ██      ██      
        ██ ██   ██ ██    ██ ██   ██ ██ ██ ██  ██ ███████ █████   ██      
   ██   ██ ███████  ██  ██  ███████ ██ ██  ██ ██      ██ ██      ██      
    █████  ██   ██   ████   ██   ██ ██ ██   ████ ███████ ███████ ███████                                                           
`);

//Helper functions
function addTask(id,task){
    var record = {
        "id":id,
        "description":task,
        "status":"todo",
        "createdAt":new Date(),
        "updatedAt":""
    }
    tasks.push(record);
    writeToFile(tasks);
    console.log(`Task added sucessfully! (ID:${record.id})`)

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

function listTasksWithStatus(status){
    console.log(`All tasks with status ${status}:`);
    tasks.forEach((task)=>{
        if(task.status == status){
            console.log(task);
        }
    })
}

function updateTask(id, task){
    const taskToUpdate = tasks[id-1];
    const newTask = {...taskToUpdate,description:task,updatedAt:new Date()};
    const newTasks = tasks.map((task)=>{
        if(task.id==id)
        {
            return newTask
        }
        return task;
    })
    writeToFile(newTasks);
}

function updateStatus(id,status){
    const taskToUpdate = tasks[id-1];
    const newTask = {...taskToUpdate,status:status,updatedAt:new Date()};
    const newTasks = tasks.map((task)=>{
        if(task.id==id)
        {
            return newTask
        }
        return task;
    })
    writeToFile(newTasks);
}

function deleteTask(id){
    const newTasks = tasks.filter(task=>task.id!=id);
    writeToFile(newTasks);
}