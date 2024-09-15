import React from 'react';
import {useState} from "react";
import './App.css';
import {TasksType} from "./TodoList"
import {v1} from "uuid"
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {renderIntoDocument} from "react-dom/test-utils";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterType = "All" | "Completed" | "Active";
type ListType = {
    [id: string]: Array<TasksType>,
}
type todoListType = {
    id: string,
    title: string,
    filter: string
}

let listTasks1Id = v1();
let listTasks2Id = v1();

function App() {

    let [todoLists, setList] = useState<Array<todoListType>>([
        {id: listTasks1Id, title: "Wath to learn", filter: "All"},
        {id: listTasks2Id, title: "Wath to pay", filter: "All"},
    ]);
    let [listsTasks, setListTasks] = useState<ListType>({
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
    });

    function addingTask(listId: string, title: string) {
        let copyTodoListsTasks: ListType = {...listsTasks};
        let newListTasks: TasksType[] = [...copyTodoListsTasks[listId], {id: v1(), title: title, isDone: false}];
        copyTodoListsTasks[listId] = newListTasks;
        setListTasks(copyTodoListsTasks);
    }
    function removingTask(listId: string, taskId: string,) {
        let copyTodoListsTasks: ListType = {...listsTasks};
        let newListTasks: Array<TasksType> = copyTodoListsTasks[listId].filter((task) => {
            return task.id !== taskId
        });
        copyTodoListsTasks[listId] = newListTasks;
        setListTasks(copyTodoListsTasks);
    }
    function onCheckedTask(listId: string, taskId: string, isDone: boolean) {

        let copyTodoListsTasks: ListType = {...listsTasks};
        let chengingArrayTasks = copyTodoListsTasks[listId].map((task: TasksType) => {
            return task.id === taskId ? {...task, isDone: isDone} : task
        });
        copyTodoListsTasks[listId] = chengingArrayTasks;
        setListTasks(copyTodoListsTasks)
    }
    function changeItemTitle(listId: string, taskId: string, title: string) {

        let copyTodoListsTasks: ListType = {...listsTasks};
        let chengingArrayTasks = copyTodoListsTasks[listId].map((task: TasksType) => {
            return task.id === taskId ? {...task, title: title} : task
        });
        copyTodoListsTasks[listId] = chengingArrayTasks;
        setListTasks(copyTodoListsTasks)
    }


    function filteredTasks(listId: string, filter: FilterType) {
        let copyTodoLists = [...todoLists];
        copyTodoLists = copyTodoLists.map((list) => {
            return list.id === listId ? {...list, filter: filter} : list;
        })
        setList(copyTodoLists);
    }
    function removeingList(listId: string) {
        let copyTodoLists = [...todoLists];
        copyTodoLists = copyTodoLists.filter((list) => {
            return list.id !== listId;
        })
        let copyListsTasks: ListType = {...listsTasks};
        delete copyListsTasks[listId];
        setListTasks(copyListsTasks);
        setList(copyTodoLists)
    }
    function onChangeListTitle(listId: string, title: string) {
        let copyTodoLists: Array<todoListType> = [...todoLists];
        copyTodoLists = copyTodoLists.map((list) => {
            return list.id === listId ? {...list, title: title} : list;
        })
        setList(copyTodoLists);
    }
    const addList = (title: string) => {
        let copyTodoLists: Array<todoListType> = [...todoLists];
        let idForNewList = v1();
        copyTodoLists = [{id: idForNewList, title: title, filter: "All"}, ...copyTodoLists];
        let copyTodoListTasks: ListType = {...listsTasks};
        copyTodoListTasks[idForNewList] = [];
        setListTasks(copyTodoListTasks)
        setList(copyTodoLists);
    }

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"start"}>
                        <Menu></Menu>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm addItem={addList}/>
                </Grid>
                <Grid container spacing={0}>
                    {todoLists.map((list) => {
                        let filterListTasks = listsTasks[list.id];
                        if (list.filter === "Completed") {
                            filterListTasks = filterListTasks.filter((task: TasksType) => {
                                return task.isDone === true
                            })
                        }
                        if (list.filter === "Active") {
                            filterListTasks = filterListTasks.filter((task: TasksType) => {
                                return task.isDone === false
                            })
                        }
                        return (<Grid item  key={list.id}>
                                <Paper  style={{padding:"10px", margin:"30px"}}>
                                    <TodoList title={list.title}
                                              id={list.id}
                                              tasks={filterListTasks}
                                              removingTask={removingTask}
                                              filteredTasks={filteredTasks}
                                              addingTask={addingTask}
                                              onCheckedTask={onCheckedTask}
                                              removeingList={removeingList}
                                              changeTaskTitle={changeItemTitle}
                                              onChangeListTitle={onChangeListTitle}
                                              filter={list.filter}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}


export default App;
