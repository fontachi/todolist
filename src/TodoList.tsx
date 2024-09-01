import React from "react";

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean,
}
type TodoListProps = {
    title: string;
    tasks: Array<TasksType>;
    removingTask:(id:number) => void;
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
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    )
}