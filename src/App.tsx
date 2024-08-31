import React from 'react';
import './App.css';

import {TasksType} from  "./TodoList"

import {TodoList} from "./TodoList";

function App() {

    let tasks1:Array<TasksType> = [
        {id:1,title:"SCC",isDone: true},
        {id:2,title:"JS",isDone: true},
        {id:3,title:"React",isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title="What to learn" tasks = {tasks1} />
        </div>
    );
}

export default App;
