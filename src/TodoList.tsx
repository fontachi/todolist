import {FilterType} from "./App";
import React, {ChangeEvent, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodoListProps = {
    id: string
    title: string;
    tasks: Array<TasksType>;
    removingTask: (listId: string, taskId: string) => void;
    filteredTasks: (listId: string, filter: FilterType) => void;
    addingTask: (listId: string, title: string) => void;
    onCheckedTask: (listId: string, taskId: string, isDone: boolean) => void;
    removeingList: (listId: string) => void;
    changeTaskTitle: (listId: string,taskId:string, title: string) => void;
    onChangeListTitle: (listId: string, title: string) => void;
    filter: string;
}

export function TodoList(props: TodoListProps) {

    let [newTitle, setNewTitle] = useState('');


    const filterListAllTasks = () => {
        props.filteredTasks(props.id, "All")
    }
    const filterListActiveTasks = () => {
        props.filteredTasks(props.id, "Active")
    }
    const filterListCompletedTasks = () => {
        props.filteredTasks(props.id, "Completed")
    }
    const addItemList = (title:string)=>{
        props.addingTask(props.id, title)
    }

    const removeingList = () => {
        props.removeingList(props.id)
    }
    const changeListTitle = (title:string) => {
        props.onChangeListTitle(props.id, title)
    }

    return (
        <div>
            <EditableSpan title={props.title} onChangeItemTitle={changeListTitle}/>
            <IconButton onClick={removeingList}>
                <Delete></Delete>
            </IconButton>
            <div>
             <AddItemForm addItem={addItemList}/>
            </div>

            {
                props.tasks.map((t: TasksType) => {
                    const onRemovingTask = () => {
                        props.removingTask(props.id, t.id)
                    }
                    const onCheckedTask = (e: ChangeEvent<HTMLInputElement>) => {
                        props.onCheckedTask(props.id, t.id, e.currentTarget.checked)
                    }
                    const onChangeTaskTitle = (title:string)=>{
                        props.changeTaskTitle(props.id, t.id,title)
                    }

                    return (
                        <div key={t.id} className={t.isDone ? "is-done" : " "}>
                            <Checkbox defaultChecked={t.isDone} onChange={onCheckedTask}/>
                            <EditableSpan onChangeItemTitle={onChangeTaskTitle} title={t.title}/>
                            <IconButton size={"small"} onClick={onRemovingTask}>
                                <Delete></Delete>
                            </IconButton>
                        </div>
                    )
                })
            }

            <Button  variant={props.filter === "All" ? "contained" : "text"} onClick={filterListAllTasks}>All</Button>
            <Button color={"primary"} variant={"outlined"} className={props.filter === "Active" ? "active-filter" : ""}
                    onClick={filterListActiveTasks}>Active
            </Button>
            <Button color={"secondary"} variant={"outlined"} className={props.filter === "Completed" ? "active-filter" : ""}
                    onClick={filterListCompletedTasks}>Completed
            </Button>
        </div>
    )
}

