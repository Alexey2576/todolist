import React, {useCallback, useReducer, useState} from 'react';
import {v1} from "uuid";
import s from './App.module.css'
import {AddNewTodoList} from "./Components/AddNewTodoList/AddNewTodoList";
import {TodoLists} from "./Components/TodoLists/TodoLists";
import {AppBarTodoList} from "./Components/AppBarTodoList/AppBarTodoList";
import {Container} from "@material-ui/core";
import {SideBar} from "./Components/SideBar/SideBar";
import {
   addTodoListAC, changeFilterCheckedTodoListAC, changeFilterPriorityTodoListAC,
   initialTodoListsState, removeTodoListAC, setValueSelectAC,
   todoListsReducer
} from "./Components/Reducer/TodoListsReducer/todoListsReducer";
import {
   addTaskAC,
   initialTasksState,
   removeTaskAC,
   setCheckedTaskAC,
   tasksReducer
} from "./Components/Reducer/TasksReducer/tasksReducer";

export type FilterPriorityTaskType = "High" | "Middle" | "Low" | "All" | null
export type FilterCheckedTaskType = "All" | "Completed" | "Active"

export const App = () => {
   //========================================= USE STATE AND REDUCER ===================================================
   const [todoListsState, todoListsDispatch] = useReducer(todoListsReducer, initialTodoListsState)
   const [tasksState, tasksDispatch] = useReducer(tasksReducer, initialTasksState)
   const [open, setOpen] = useState(false);

   //========================================= TODOLIST CALLBACKS ==========================================================================================================================================================================
   const addTodoListCallback = useCallback((title: string) => {
      const action = addTodoListAC(v1(), title)
      todoListsDispatch(action)
      tasksDispatch(action)
   }, [todoListsDispatch, tasksDispatch])
   const addTaskCallback = useCallback((todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => value.length && tasksDispatch(addTaskAC(value, todoList_ID, selectValue)), [tasksDispatch])
   const removeTaskCallback = useCallback((todoList_ID: string, task_ID: string) => tasksDispatch(removeTaskAC(todoList_ID, task_ID)), [tasksDispatch])
   const removeTodoListCallback = useCallback((todoList_ID: string) => {
      todoListsDispatch(removeTodoListAC(todoList_ID))
      tasksDispatch(removeTodoListAC(todoList_ID))
   }, [todoListsDispatch, tasksDispatch])
   const changeFilterCheckedTodoListCallback = useCallback((todoList_ID: string, filterChecked: FilterCheckedTaskType) => todoListsDispatch(changeFilterCheckedTodoListAC(todoList_ID, filterChecked)), [todoListsDispatch])
   const changeFilterPriorityTodoListCallback = useCallback((todoList_ID: string, filterPriority: FilterPriorityTaskType) => todoListsDispatch(changeFilterPriorityTodoListAC(todoList_ID, filterPriority)), [todoListsDispatch])
   const changeValueSelectCallback = useCallback((todoList_ID: string, selectValue: FilterPriorityTaskType) => todoListsDispatch(setValueSelectAC(todoList_ID, selectValue)), [todoListsDispatch])
   const changeCheckedTaskCallback = useCallback((todoList_ID: string, task_ID: string, checked: boolean) => tasksDispatch(setCheckedTaskAC(todoList_ID, task_ID, checked)), [tasksDispatch])
   const handleDrawerCloseCallback = () => setOpen(false)
   const handleDrawerOpenCallback = () => setOpen(true)

   return (
      <div className={s.todoLists}>
         <AppBarTodoList open={open} handleDrawerOpenCallback={handleDrawerOpenCallback}/>
         <SideBar open={open} handleDrawerCloseCallback={handleDrawerCloseCallback}/>
         <Container>
            <AddNewTodoList addTodoListCallback={addTodoListCallback}/>
            <TodoLists tasksState={tasksState}
                       todoListsState={todoListsState}
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