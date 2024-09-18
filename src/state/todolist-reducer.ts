import {FilterType, ListType, todoListType} from "../App";
import {v1} from "uuid";

export type AddTodolistActionType = {
    type:  "ADD-TODOLIST" ;
    title: string;
    filter: FilterType;
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    listId: string;
}

export type ChangeTodolistTitleActionType = {
    type:  "CHANGE-TODOLIST-TITLE";
    title: string;
    listId: string;
}

export type ChangeTodolistFilterActionType = {
    type:  "CHANGE-TODOLIST-FILTER";
    filter: string;
    listId: string;
}

export type AllActionType = AddTodolistActionType|RemoveTodolistActionType|ChangeTodolistFilterActionType|ChangeTodolistTitleActionType;

export const RemoveTodolistAC= (listId:string):RemoveTodolistActionType=>{
    return {
        type:  "REMOVE-TODOLIST",
        listId:listId,
    }
}
export const AddTodolistAC= (listTitle:string,listFilter:FilterType):AddTodolistActionType=>{
    return {
        type:  "ADD-TODOLIST",
        title:listTitle,
        filter:listFilter,
    }
}
export const ChangeTodolistTitleAC= (listTitle:string,listId:string):ChangeTodolistTitleActionType=>{
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title:listTitle,
        listId:listId,
    }
}
export const ChangeTodolistFilterAC= (listFilter:FilterType,listId:string):ChangeTodolistFilterActionType=>{
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter:listFilter,
        listId:listId,
    }
}

export const todolistReducer = (lists: Array<todoListType>, action:AllActionType): Array<todoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            let copyTodoListsR: Array<todoListType> = [...lists];
            copyTodoListsR = copyTodoListsR.filter((list) => {
                return list.id !== action.listId;
            })
            return copyTodoListsR
        case  "ADD-TODOLIST":
            let copyTodoListsA: Array<todoListType> = [...lists];
            let idForNewList = v1();
            copyTodoListsA = [{id: idForNewList, title: action.title, filter: action.filter}, ...copyTodoListsA];
           return  copyTodoListsA
        case "CHANGE-TODOLIST-TITLE":
            let copyTodoListsT: Array<todoListType> = [...lists];
            copyTodoListsT = copyTodoListsT.map((list) => {
                return list.id === action.listId ? {...list, title: action.title} : list;
            })
            return copyTodoListsT
        case "CHANGE-TODOLIST-FILTER":
            let copyTodoListsF = [...lists];
            copyTodoListsF = copyTodoListsF.map((list) => {
                return list.id === action.listId ? {...list, filter: action.filter} : list;
            })
            return copyTodoListsF
        default:
             throw new Error(`Unknown action type `);
    }
}