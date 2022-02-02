import React, {useCallback, useState} from 'react';
import {v1} from "uuid";
import s from './App.module.css'
import {AddNewTodoList} from "./Components/AddNewTodoList/AddNewTodoList";
import {TodoLists} from "./Components/TodoLists/TodoLists";
import {AppBarTodoList} from "./Components/AppBarTodoList/AppBarTodoList";
import {Button, Container} from "@material-ui/core";
import {SideBar} from "./Components/SideBar/SideBar";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./Reducers/store";
import {TasksStateType} from "./Reducers/TasksReducer/tasksReducer";
import {TodoListsStateType} from "./Reducers/TodoListsReducer/todoListsReducer";
import {addTaskAC, removeTaskAC, setCheckedTaskAC} from "./Reducers/TasksReducer/tasksActions";
import {
   addTodoListAC,
   changeFilterCheckedTodoListAC, changeFilterPriorityTodoListAC,
   removeTodoListAC, setValueSelectAC
} from "./Reducers/TodoListsReducer/todoListsActions";
import {Dispatch} from "redux";
import {todoListsApi} from "./API/todoLists-api";

export type FilterPriorityTaskType = "High" | "Middle" | "Low" | "All" | null
export type FilterCheckedTaskType = "All" | "Completed" | "Active"

export const App = () => {
   const [open, setOpen] = useState(false);
   const tasks = useSelector<RootStateType, TasksStateType>((state: RootStateType) => state.tasks)
   const todoLists = useSelector<RootStateType, TodoListsStateType[]>((state: RootStateType) => state.todoLists)
   const dispatch = useDispatch<Dispatch>()
   //========================================= TODOLIST CALLBACKS ==========================================================================================================================================================================
   const addTodoListCallback = useCallback((title: string) => dispatch(addTodoListAC(v1(), title)), [dispatch])
   const addTaskCallback = useCallback((todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => value.length && dispatch(addTaskAC(value, todoList_ID, selectValue)), [dispatch])
   const removeTaskCallback = useCallback((todoList_ID: string, task_ID: string) => dispatch(removeTaskAC(todoList_ID, task_ID)), [dispatch])
   const removeTodoListCallback = useCallback((todoList_ID: string) => dispatch(removeTodoListAC(todoList_ID)), [dispatch])
   const changeFilterCheckedTodoListCallback = useCallback((todoList_ID: string, filterChecked: FilterCheckedTaskType) => dispatch(changeFilterCheckedTodoListAC(todoList_ID, filterChecked)), [dispatch])
   const changeFilterPriorityTodoListCallback = useCallback((todoList_ID: string, filterPriority: FilterPriorityTaskType) => dispatch(changeFilterPriorityTodoListAC(todoList_ID, filterPriority)), [dispatch])
   const changeValueSelectCallback = useCallback((todoList_ID: string, selectValue: FilterPriorityTaskType) => dispatch(setValueSelectAC(todoList_ID, selectValue)), [dispatch])
   const changeCheckedTaskCallback = useCallback((todoList_ID: string, task_ID: string, checked: boolean) => dispatch(setCheckedTaskAC(todoList_ID, task_ID, checked)), [dispatch])
   const handleDrawerCloseCallback = () => setOpen(false)
   const handleDrawerOpenCallback = () => setOpen(true)

   return (
      <div className={s.todoLists}>
         <AppBarTodoList open={open} handleDrawerOpenCallback={handleDrawerOpenCallback}/>
         <SideBar open={open} handleDrawerCloseCallback={handleDrawerCloseCallback}/>
         <Container>
            <AddNewTodoList addTodoListCallback={addTodoListCallback}/>
            <div>
               <Button onClick={() => {todoListsApi.getTodoLists().then(res => console.log(res))}} variant={"contained"}>All</Button>
            </div>
            <TodoLists tasksState={tasks}
                       todoListsState={todoLists}
                       addTaskCallback={addTaskCallback}
                       removeTaskCallback={removeTaskCallback}
                       removeTodoListCallback={removeTodoListCallback}
                       changeFilterCheckedTodoList={changeFilterCheckedTodoListCallback}
                       changeFilterPriorityTodoList={changeFilterPriorityTodoListCallback}
                       changeValueSelectCallback={changeValueSelectCallback}
                       changeCheckedTaskCallback={changeCheckedTaskCallback}
            />
         </Container>
      </div>
   );
};