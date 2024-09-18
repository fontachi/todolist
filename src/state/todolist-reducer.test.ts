import {
    AddTodolistAC,
    AddTodolistActionType,
    ChangeTodolistTitleActionType,
    RemoveTodolistActionType,
    todolistReducer
} from "./todolist-reducer";
import {v1} from "uuid";
import {todoListType} from "../App";
import {ChangeTodolistFilterActionType} from "./todolist-reducer";
import {RemoveTodolistAC} from "./todolist-reducer";
import {ChangeTodolistTitleAC} from "./todolist-reducer";
import {ChangeTodolistFilterAC} from "./todolist-reducer";


const listTasks1Id=v1();
const listTasks2Id=v1();


test("reducer should remove todolist", () => {

    let todoListState:Array<todoListType> =[
        {id: listTasks1Id, title: "Wath to learn", filter: "All"},
        {id: listTasks2Id, title: "Wath to pay", filter: "All"},
    ];

    let action:RemoveTodolistActionType = RemoveTodolistAC(listTasks2Id);

    const endState:todoListType[]= todolistReducer(todoListState, action);
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(listTasks2Id);
});

test("reducer should add todolist", () => {
    let todoListState:Array<todoListType> =[
        {id: listTasks1Id, title: "Wath to learn", filter: "All"},
        {id: listTasks2Id, title: "Wath to pay", filter: "All"},
    ];

    let action:AddTodolistActionType = AddTodolistAC("Title","All");

    const endState:todoListType[]= todolistReducer(todoListState, action);

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(action.title);
    expect(endState[0].filter).toBe(action.filter);
});

test("reducer should change title", () => {

    let todoListState:Array<todoListType> =[
        {id: listTasks1Id, title: "Wath to learn", filter: "All"},
        {id: listTasks2Id, title: "Wath to pay", filter: "All"},
    ];

    let action:ChangeTodolistTitleActionType = ChangeTodolistTitleAC("Title",listTasks2Id);

    const endState:todoListType[]= todolistReducer(todoListState, action);
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(action.title);

});

test("reducer should change filter", () => {

    let todoListState:Array<todoListType> =[
        {id: listTasks1Id, title: "Wath to learn", filter: "All"},
        {id: listTasks2Id, title: "Wath to pay", filter: "All"},
    ];

    const endState:todoListType[]= todolistReducer(todoListState, ChangeTodolistFilterAC("All",listTasks1Id));
    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe(ChangeTodolistFilterAC("All",listTasks1Id).filter);

});
