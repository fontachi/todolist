import React from 'react';
import {useState} from "react";
import './App.css';
import {TasksType} from  "./TodoList"
import {TodoList} from "./TodoList";

function App() {
    let tasks1:Array<TasksType> = [
        {id:1,title:"SCC",isDone: true},
        {id:2,title:"JS",isDone: true},
        {id:3,title:"React",isDone: false},
    ]

    let [tasks, setTasks] = useState<Array<TasksType>>(tasks1);

    function removingTask(id:number){
        let newTasks:Array<TasksType> = tasks.filter((task:TasksType) => {
            return task.id !== id;
        })
        setTasks(newTasks);
    }

    return (
        <div className="App">
            <TodoList title="What to learn" tasks = {tasks} removingTask={removingTask} />
        </div>
    );
}

export default App;
