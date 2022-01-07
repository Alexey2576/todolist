import React, {useCallback, useReducer, useState} from 'react';
import {v1} from "uuid";
import s from './App.module.css'
import {MemoizedAddNewTodoList} from "./Components/AddNewTodoList/AddNewTodoList";
import {TodoLists} from "./Components/TodoLists/TodoLists";
import {AppBarTodoList} from "./Components/AppBarTodoList/AppBarTodoList";
import {Container} from "@material-ui/core";
import {TaskType} from "./Components/TodoLists/ListTasksTodoList/TaskTodoList/TaskTodoList";
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

//========================================= TYPING ===================================================
export type FilterPriorityTaskType = "High" | "Middle" | "Low" | "All" | null
export type FilterCheckedTaskType = "All" | "Completed" | "Active"

const App = () => {
   //========================================= USE STATE AND REDUCER ===================================================
   const [todoListsState, todoListsDispatch] = useReducer(todoListsReducer, initialTodoListsState)
   const [tasksState, tasksDispatch] = useReducer(tasksReducer, initialTasksState)
   const [open, setOpen] = useState(false);

   //========================================= TODOLIST CALLBACKS ==========================================================================================================================================================================
   const addTodoListCallback = useCallback((title: string) => {
      todoListsDispatch(addTodoListAC(v1(), title))
      tasksDispatch(addTodoListAC(v1(), title))
   }, [addTodoListAC])
   const addTaskCallback = useCallback((todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => value.length && tasksDispatch(addTaskAC(value, todoList_ID, selectValue)), [addTaskAC])
   const removeTaskCallback = useCallback((todoList_ID: string, task_ID: string) => tasksDispatch(removeTaskAC(todoList_ID, task_ID)), [removeTaskAC])
   const removeTodoListCallback = useCallback((todoList_ID: string) => {
      todoListsDispatch(removeTodoListAC(todoList_ID))
      tasksDispatch(removeTodoListAC(todoList_ID))
   }, [removeTodoListAC])
   const changeFilterCheckedTodoListCallback = useCallback((todoList_ID: string, filterChecked: FilterCheckedTaskType) => todoListsDispatch(changeFilterCheckedTodoListAC(todoList_ID, filterChecked)), [changeFilterCheckedTodoListAC])
   const changeFilterPriorityTodoListCallback = useCallback((todoList_ID: string, filterPriority: FilterPriorityTaskType) => todoListsDispatch(changeFilterPriorityTodoListAC(todoList_ID, filterPriority)), [changeFilterPriorityTodoListAC])
   const changeValueSelectCallback = useCallback((todoList_ID: string, selectValue: FilterPriorityTaskType) => todoListsDispatch(setValueSelectAC(todoList_ID, selectValue)), [setValueSelectAC])
   const changeCheckedTaskCallback = useCallback((todoList_ID: string, task_ID: string, checked: boolean) => tasksDispatch(setCheckedTaskAC(todoList_ID, task_ID, checked)), [setCheckedTaskAC])
   const handleDrawerCloseCallback = () => setOpen(false)
   const handleDrawerOpenCallback = () => setOpen(true)

   //========================================= FILTERED TASKS (CALLBACK) ====================================================================================================================================================================
   const getFilteredPriorityTasks = (todoList_ID: string, filterPriority: FilterPriorityTaskType): TaskType[] => {
      switch (filterPriority) {
         case "High":
            return tasksState[todoList_ID].filter(t => t.task_priority === "High")
         case "Middle":
            return tasksState[todoList_ID].filter(t => t.task_priority === "Middle")
         case "Low":
            return tasksState[todoList_ID].filter(t => t.task_priority === "Low")
         default:
            return tasksState[todoList_ID]
      }
   }
   const getFilteredCheckedTasksCallback = (todoList_ID: string, filterChecked: FilterCheckedTaskType, filterPriority: FilterPriorityTaskType): TaskType[] => {
      const filteredPriorityState = getFilteredPriorityTasks(todoList_ID, filterPriority)
      switch (filterChecked) {
         case "Active":
            return filteredPriorityState.filter(t => !t.checked)
         case "Completed":
            return filteredPriorityState.filter(t => t.checked)
         default:
            return filteredPriorityState
      }
   }

   return (
      <div className={s.todoLists}>
         <AppBarTodoList open={open} handleDrawerOpenCallback={handleDrawerOpenCallback}/>
         <SideBar open={open} handleDrawerCloseCallback={handleDrawerCloseCallback}/>
         <Container>
            <MemoizedAddNewTodoList addTodoListCallback={addTodoListCallback}/>
            <TodoLists tasksState={tasksState}
                       todoListsState={todoListsState}
                       addTaskCallback={addTaskCallback}
                       removeTaskCallback={removeTaskCallback}
                       removeTodoListCallback={removeTodoListCallback}
                       changeFilterCheckedTodoList={changeFilterCheckedTodoListCallback}
                       changeFilterPriorityTodoList={changeFilterPriorityTodoListCallback}
                       changeValueSelectCallback={changeValueSelectCallback}
                       changeCheckedTaskCallback={changeCheckedTaskCallback}
                       getFilteredCheckedTasksCallback={getFilteredCheckedTasksCallback}/>
         </Container>
      </div>
   );
};

export default App;