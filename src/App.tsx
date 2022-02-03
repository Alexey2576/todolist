import React, {useCallback, useState} from 'react';
import {v1} from "uuid";
import s from './App.module.css'
import {AddNewTodoList} from "./Components/AddNewTodoList/AddNewTodoList";
import {TodoLists} from "./Components/TodoLists/TodoLists";
import {AppBarTodoList} from "./Components/AppBarTodoList/AppBarTodoList";
import {Container} from "@material-ui/core";
import {SideBar} from "./Components/SideBar/SideBar";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./Reducers/store";
import {TasksStateType} from "./Reducers/TasksReducer/tasksReducer";
import {addTaskAC, removeTaskAC, setCheckedTaskAC} from "./Reducers/TasksReducer/tasksActions";
import {
   addTodoListAC,
   changeFilterCheckedTodoListAC, changeFilterPriorityTodoListAC,
   removeTodoListAC, setValueSelectAC
} from "./Reducers/TodoListsReducer/todoListsActions";
import {Dispatch} from "redux";
import {TodoListsStateType} from "./API/todoLists-api";
import {FilterPriorityTask, FilterStatusTask} from "./API/tasks-api";


export const App = () => {
   const [open, setOpen] = useState(false);
   const tasks = useSelector<RootStateType, TasksStateType>((state: RootStateType) => state.tasks)
   const todoLists = useSelector<RootStateType, TodoListsStateType[]>((state: RootStateType) => state.todoLists)
   const dispatch = useDispatch<Dispatch>()
   //========================================= TODOLIST CALLBACKS ==========================================================================================================================================================================
   const addTodoListCallback = useCallback((title: string) => dispatch(addTodoListAC(v1(), title)), [dispatch])
   const addTaskCallback = useCallback((todoList_ID: string, value: string, selectPriorityValue: FilterPriorityTask) => value.length && dispatch(addTaskAC(value, todoList_ID, selectPriorityValue)), [dispatch])
   const removeTaskCallback = useCallback((todoList_ID: string, task_ID: string) => dispatch(removeTaskAC(todoList_ID, task_ID)), [dispatch])
   const removeTodoListCallback = useCallback((todoList_ID: string) => dispatch(removeTodoListAC(todoList_ID)), [dispatch])
   const changeFilterStatusTodoListCallback = useCallback((todoList_ID: string, filterStatus: FilterStatusTask) => dispatch(changeFilterCheckedTodoListAC(todoList_ID, filterStatus)), [dispatch])
   const changeFilterPriorityTodoListCallback = useCallback((todoList_ID: string, filterPriority: FilterPriorityTask) => dispatch(changeFilterPriorityTodoListAC(todoList_ID, filterPriority)), [dispatch])
   const changeValueSelectCallback = useCallback((todoList_ID: string, selectPriorityValue: FilterPriorityTask) => dispatch(setValueSelectAC(todoList_ID, selectPriorityValue)), [dispatch])
   const changeCheckedTaskCallback = useCallback((todoList_ID: string, task_ID: string, checked: FilterStatusTask) => dispatch(setCheckedTaskAC(todoList_ID, task_ID, checked)), [dispatch])
   const handleDrawerCloseCallback = () => setOpen(false)
   const handleDrawerOpenCallback = () => setOpen(true)

   return (
      <div className={s.todoLists}>
         <AppBarTodoList open={open} handleDrawerOpenCallback={handleDrawerOpenCallback}/>
         <SideBar open={open} handleDrawerCloseCallback={handleDrawerCloseCallback}/>
         <Container>
            <AddNewTodoList addTodoListCallback={addTodoListCallback}/>
            {/*<div>*/
               /*<Button onClick={() => {todoListsApi.getTodoLists().then(res => console.log(res))}} variant={"contained"}>All</Button>*/
            /*</div>*/}
            <TodoLists tasksState={tasks}
                       todoListsState={todoLists}
                       addTaskCallback={addTaskCallback}
                       removeTaskCallback={removeTaskCallback}
                       removeTodoListCallback={removeTodoListCallback}
                       changeFilterStatusTodoListCallback={changeFilterStatusTodoListCallback}
                       changeFilterPriorityTodoList={changeFilterPriorityTodoListCallback}
                       changeValueSelectCallback={changeValueSelectCallback}
                       changeCheckedTaskCallback={changeCheckedTaskCallback}
            />
         </Container>
      </div>
   );
};