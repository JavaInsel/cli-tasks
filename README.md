# Task Tracker
This is a simple CLI App to track and manage your tasks a.k.a to-do list.

## :memo: About the Project:
With this simple app you can create your to-do list, change the status of each task and list out all of your tasks. All of your tasks will be saved locally in JSON format.
This app is written in JavaScript (Node.Js).

## :desktop_computer: How to use:
1. Clone this repository or download the source code as a ZIP file.
2. Make sure Node is installed in your computer.
3. Change the file path in source code (Line:7 , const filePath). This file path is used to save the JSON File created to save all your tasks locally.
4. Open Command Prompt (Windows+R, cmd) or Terminal (for mac).
5. Change the directory to where the source code is placed in your computer.
6. Input the command you want! Format: node main {your command}. "Node main" is used to run the app a.k.a the script!

## :scroll: Available Commands:
- add {your task} -> Example: node main add "Buy groceries"
- update {taks id} {new task} -> Example: node main update 1 "Buy groceries at 5 pm"
- delete {task id} -> Example: node main delete 1
- mark-in-progress {task id} -> Example: node main mark-in-progress 1
- mark-done {task id} -> Example: node main mark-done 1
- list -> Example: node main list
- list done -> Example: node main list done
- list todo -> Example: node main list todo
- list in-progress -> Example: node main list in-progress

## Example:
![Unbenannt](https://github.com/user-attachments/assets/1529a901-632c-4fcf-a9d5-b8d962db534c)

## Hope you enjoy it~ :star_struck:
