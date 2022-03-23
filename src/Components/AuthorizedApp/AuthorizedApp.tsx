import React, {useCallback} from 'react';
import {SideBar} from "./SideBar/SideBar";
import {AddNewTodoList} from "./AddNewTodoList/AddNewTodoList";
import {TodoLists} from "../TodoLists/TodoLists";
import {addTodoListTC, changeTitleTodoListTC, removeTodoListTC} from "../../Redux/TodoLists/todoListsThunks";
import {FilterPriorityTask, FilterStatusTask, TasksStateType} from "../../Redux/Tasks/tasksReducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../Redux/Tasks/tasksThunks";
import {
   changeFilterCheckedTodoListAC,
   changeFilterPriorityTodoListAC,
   setValueSelectAC
} from "../../Redux/TodoLists/todoListsActions";
import {useAppDispatch, useAppSelector} from "../../Redux/store";
import {TodoListsStateType} from "../../Redux/TodoLists/todoListsReducer";
import {Navigate} from "react-router-dom";

export const AuthorizedApp: React.FC<AuthorizedAppType> = ({open, setOpen}) => {
   const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
   const dispatch = useAppDispatch()
   const tasks = useAppSelector<TasksStateType>(state => state.tasks)
   const todoLists = useAppSelector<TodoListsStateType[]>(state => state.todoLists)

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

   if (!isLoggedIn) {
      return <Navigate to={"/login"}/>
   }

   return (
      <>
         <SideBar open={open} handleDrawerCloseCallback={handleDrawerCloseCallback}/>
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
      </>
   );
};

type AuthorizedAppType = {
   open: boolean
   setOpen: (open: boolean) => void
}