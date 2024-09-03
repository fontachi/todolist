import React, {ChangeEvent, KeyboardEventHandler, useState} from "react";
import {FilterType} from "./App";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodoListProps = {
    title: string;
    tasks: Array<TasksType>;
    removingTask: (id: string) => void;
    filteredTasks: (filter: FilterType) => void;
    addingTask: (title: string) => void;
}

export function TodoList(props: TodoListProps) {

    let [newTitle, setNewTitle] = useState('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addingTask(newTitle);
            setNewTitle('');
        }
    }
    const addingTask = () => {
        props.addingTask(newTitle);
        setNewTitle('');
    }
    const filterListAllTasks = () => {
      props.filteredTasks("All")
    }
    const filterListActiveTasks = () => {
        props.filteredTasks("Active")
    }
    const filterListCompletedTasks = () => {
        props.filteredTasks("Completed")
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type={"text"} value={newTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addingTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t: TasksType) => {
                        const onRemovingTask = () => {  props.removingTask(t.id)}
                        return (
                            <li key={t.id}>
                                <input type={"checkbox"} defaultChecked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemovingTask}>+
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={filterListAllTasks}>All</button>
            <button onClick={filterListActiveTasks}>Active</button>
            <button onClick={filterListCompletedTasks}>Completed</button>
        </div>
    )
}