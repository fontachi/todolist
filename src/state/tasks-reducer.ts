import {ListType} from "../App";
import {TasksType} from "../TodoList";
import {v1} from "uuid";

export type addTaskActionType = {
    type: string;
    title: string;
    listId: string;
}

export const taskReducer = (listsTasks: ListType, action: addTaskActionType): ListType=> {
    switch (action.type) {
        case 'ADD-TASK':
            let copyTodoListsTasks: ListType = {...listsTasks};
            let newListTasks: TasksType[] = [...copyTodoListsTasks[action.listId], {id: v1(), title: action.title, isDone: false}];
            copyTodoListsTasks[action.listId] = newListTasks;

        return copyTodoListsTasks
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}