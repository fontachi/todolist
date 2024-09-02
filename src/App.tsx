import React from 'react';
import {useState} from "react";
import './App.css';
import {TasksType} from "./TodoList"
import {TodoList} from "./TodoList";

export type FilterType = "All" | "Completed" | "Active";

function App() {
    let tasks1: Array<TasksType> = [
        {id: 1, title: "SCC", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "React", isDone: false},
        {id: 5, title: "React", isDone: false},
    ]

    let [tasks, setTasks] = useState<Array<TasksType>>(tasks1);
    let [filterIs, setFilter] = useState<FilterType>("All");

    function removingTask(id: number) {
        let newTasks: Array<TasksType> = tasks.filter((task: TasksType) => {
            return task.id !== id;
        })
        setTasks(newTasks);
    }

    function filteredTasks(filter:FilterType) {
        setFilter(filter)
    }

    let filterListTasks = tasks;
        if (filterIs === "Completed") {
            filterListTasks = tasks.filter((task: TasksType) => {
                return task.isDone === true
            })
        }
        if (filterIs === "Active") {
            filterListTasks = tasks.filter((task: TasksType) => {
                return task.isDone === false
            })
        }


    return (
        <div className="App">
            <TodoList title="What to learn" tasks={filterListTasks} removingTask={removingTask} filteredTasks={filteredTasks} />
        </div>
    );
}

export default App;
