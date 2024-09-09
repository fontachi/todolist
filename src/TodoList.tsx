import React, {ChangeEvent, KeyboardEventHandler, useState} from "react";
import {FilterType} from "./App";
import {Simulate} from "react-dom/test-utils";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodoListProps = {
    id:string
    title: string;
    tasks: Array<TasksType>;
    removingTask: (listId:string,taskId: string) => void;
    filteredTasks: (listId:string,filter: FilterType) => void;
    addingTask: (listId:string,title: string) => void;
    onCheckedTask: (listId:string,taskId: string,isDone:boolean) => void;
    removeingList: (listId:string) => void;
    filter:string;
}

export function TodoList(props: TodoListProps) {

    let [newTitle, setNewTitle] = useState('');
    let [error, setError] = useState<string|null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
           addingTask();
        }
    }
    const addingTask = () => {
        if(newTitle.trim() !== ""){
            props.addingTask( props.id,newTitle);
            setNewTitle('');
        }else{
            setError("Title is required");
        }

    }
    const filterListAllTasks = () => {
      props.filteredTasks(props.id,"All")
    }
    const filterListActiveTasks = () => {
        props.filteredTasks(props.id,"Active")
    }
    const filterListCompletedTasks = () => {
        props.filteredTasks(props.id,"Completed")
    }
    const removeingList=()=>{
        props.removeingList(props.id)
    }

    return (
        <div>
            <h3 className={"listTitle"}>{props.title}</h3> <button onClick={removeingList}>+</button>
            <div>
                <input type={"text"} value={newTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addingTask}>+</button>
                {error ? <div className="error-message">{error}</div> : null}
            </div>

                {
                    props.tasks.map((t: TasksType) => {
                        const onRemovingTask = () => {  props.removingTask(props.id,t.id)}
                        const onCheckedTask= (e:ChangeEvent<HTMLInputElement>)=>{ props.onCheckedTask(props.id,t.id,e.currentTarget.checked)}
                        return (
                            <li key={t.id} className={t.isDone ? "is-done":" "}>
                                <input type={"checkbox"} defaultChecked={t.isDone} onChange={onCheckedTask}/>
                                <span>{t.title}</span>
                                <button onClick={onRemovingTask}>+
                                </button>
                            </li>
                        )
                    })
                }

            <button className={props.filter==="All"? "active-filter":""} onClick={filterListAllTasks}>All</button>
            <button className={props.filter==="Active"? "active-filter":""} onClick={filterListActiveTasks}>Active</button>
            <button className={props.filter==="Completed"? "active-filter":""} onClick={filterListCompletedTasks}>Completed</button>
        </div>
    )
}