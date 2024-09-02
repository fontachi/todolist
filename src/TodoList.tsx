import React from "react";
import {FilterType} from "./App";
export type TasksType = {
    id: number,
    title: string,
    isDone: boolean,
}

type TodoListProps = {
    title: string;
    tasks: Array<TasksType>;
    removingTask:(id:number) => void;
    filteredTasks:(filter:FilterType) => void;
}

export function TodoList(props: TodoListProps) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t: TasksType) => {
                        return (
                            <li key={t.id}>
                                <input type={"checkbox"} defaultChecked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={()=>{props.removingTask(t.id)}}>+</button>
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={()=>{props.filteredTasks("All")}}>All</button>
            <button onClick={()=>{props.filteredTasks("Active")}}>Active</button>
            <button onClick={()=>{props.filteredTasks("Completed")}}>Completed</button>
        </div>
    )
}