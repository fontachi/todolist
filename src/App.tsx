import React from 'react';
import {useState} from "react";
import './App.css';
import {TasksType} from "./TodoList"
import {TodoList} from "./TodoList";
import {v1} from "uuid"

export type FilterType = "All" | "Completed" | "Active";

function App() {
    let tasks1: Array<TasksType> = [
        {id: v1(), title: "SCC", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ]

    let [tasks, setTasks] = useState<Array<TasksType>>(tasks1);
    let [filterIs, setFilter] = useState<FilterType>("All");

    function addingTask(title: string,) {
        let newTasks=[{id:v1(),title:title,isDone:false}, ...tasks];
        setTasks(newTasks);
    }

    function removingTask(id: string) {
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
            <TodoList title="What to learn"
                      tasks={filterListTasks}
                      removingTask={removingTask}
                      filteredTasks={filteredTasks}
                      addingTask={addingTask}/>
        </div>
    );
}

export default App;
