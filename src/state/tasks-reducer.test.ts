import {taskReducer} from "./tasks-reducer";
import {v1} from "uuid";
import {addTaskActionType} from "./tasks-reducer";
import {ListType} from "../App";

const listTasks1Id=v1();
const listTasks2Id=v1();


const addTaskAction:addTaskActionType = {
    type:"ADD-TASK",
    title:"Add Task",
    listId:listTasks1Id,
}

test("reducer should add task", () => {

    let listsTasks:ListType={
        [listTasks1Id]: [
            {id: v1(), title: "SCC", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [listTasks2Id]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bred", isDone: true},
            {id: v1(), title: "Chees", isDone: false},
        ]
    }

    const endState = taskReducer(listsTasks, addTaskAction);

    expect(endState[addTaskAction.listId].length).toBe(4);

});
