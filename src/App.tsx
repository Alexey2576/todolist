import React, {useCallback, useEffect, useState} from 'react';
import s from './App.module.css'
import {AddNewTodoList} from "./Components/AddNewTodoList/AddNewTodoList";
import {TodoLists} from "./Components/TodoLists/TodoLists";
import {AppBarTodoList} from "./Components/AppBarTodoList/AppBarTodoList";
import {Container} from "@material-ui/core";
import {SideBar} from "./Components/SideBar/SideBar";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType, ThunkDispatchType} from "./Reducers/store";
import {FilterPriorityTask, FilterStatusTask, TasksStateType} from "./Reducers/TasksReducer/tasksReducer";
import { changeFilterCheckedTodoListAC, changeFilterPriorityTodoListAC, setValueSelectAC } from "./Reducers/TodoListsReducer/todoListsActions";
import { addTodoListTC, changeTitleTodoListTC, getTodoListsTC, removeTodoListTC } from "./Reducers/TodoListsReducer/todoListsThunks";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./Reducers/TasksReducer/tasksThunks";
import {TodoListsStateType} from "./Reducers/TodoListsReducer/todoListsReducer";

export const App = () => {
   const [open, setOpen] = useState(false);
   const tasks = useSelector<RootStateType, TasksStateType>((state: RootStateType) => state.tasks)
   const todoLists = useSelector<RootStateType, TodoListsStateType[]>((state: RootStateType) => state.todoLists)
   const dispatch = useDispatch<ThunkDispatchType>()
   //========================================= TODOLIST CALLBACKS ==========================================================================================================================================================================
   const addTodoListCallback = useCallback((title: string) => dispatch(addTodoListTC(title)), [dispatch])
   const addTaskCallback = useCallback((todoList_ID: string, value: string, selectPriorityValue: FilterPriorityTask) => value.length && dispatch(addTaskTC(value, todoList_ID, selectPriorityValue)), [dispatch])
   const removeTaskCallback = useCallback((todoList_ID: string, task_ID: string) => dispatch(removeTaskTC(todoList_ID, task_ID)), [dispatch])
   const removeTodoListCallback = useCallback((todoList_ID: string) => dispatch(removeTodoListTC(todoList_ID)), [dispatch])
   const changeFilterStatusTodoListCallback = useCallback((todoList_ID: string, filterStatus: FilterStatusTask) => dispatch(changeFilterCheckedTodoListAC(todoList_ID, filterStatus)), [dispatch])
   const changeFilterPriorityTodoListCallback = useCallback((todoList_ID: string, filterPriority: FilterPriorityTask) => dispatch(changeFilterPriorityTodoListAC(todoList_ID, filterPriority)), [dispatch])
   const changeValueSelectCallback = useCallback((todoList_ID: string, selectPriorityValue: FilterPriorityTask) => dispatch(setValueSelectAC(todoList_ID, selectPriorityValue)), [dispatch])
   const changeStatusTaskCallback = useCallback((todoList_ID: string, task_ID: string, status: FilterStatusTask) => dispatch(updateTaskTC(todoList_ID, task_ID, {status})), [dispatch])
   const changeTitleTaskCallback = useCallback((todoList_ID: string, task_ID: string, title: string) => dispatch(updateTaskTC(todoList_ID, task_ID, {title})), [dispatch])
   const changeTitleTodoListCallback = useCallback((todoList_ID: string, title: string) => dispatch(changeTitleTodoListTC(todoList_ID, title)), [dispatch])


   const handleDrawerCloseCallback = () => setOpen(false)
   const handleDrawerOpenCallback = () => setOpen(true)
   //========================================= USE EFFECT ==========================================================================================================================================================================
   useEffect(() => {
      dispatch(getTodoListsTC())
   }, [dispatch])

   return (
      <div className={s.todoLists}>
         <AppBarTodoList open={open} handleDrawerOpenCallback={handleDrawerOpenCallback}/>
         <SideBar open={open} handleDrawerCloseCallback={handleDrawerCloseCallback}/>
         <Container>
            <AddNewTodoList addTodoListCallback={addTodoListCallback}/>
            <TodoLists tasksState={tasks}
                       changeTitleTodoListCallback={changeTitleTodoListCallback}
                       todoListsState={todoLists}
                       addTaskCallback={addTaskCallback}
                       removeTaskCallback={removeTaskCallback}
                       removeTodoListCallback={removeTodoListCallback}
                       changeFilterStatusTodoListCallback={changeFilterStatusTodoListCallback}
                       changeFilterPriorityTodoList={changeFilterPriorityTodoListCallback}
                       changeValueSelectCallback={changeValueSelectCallback}
                       changeStatusTaskCallback={changeStatusTaskCallback}
                       changeTitleTaskCallback={changeTitleTaskCallback}
            />
         </Container>
      </div>
   );
};