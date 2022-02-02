import {FilterPriorityTaskType} from "../../App";
import {addTodoListAC, removeTodoListAC} from "../TodoListsReducer/todoListsActions";

export type ActionsTasksType =
   ReturnType<typeof addTaskAC>
   | ReturnType<typeof removeTaskAC>
   | ReturnType<typeof setCheckedTaskAC>
   | ReturnType<typeof changeTaskTitleAC>
   | ReturnType<typeof addTodoListAC>
   | ReturnType<typeof removeTodoListAC>

export const addTaskAC = (title: string, todoList_ID: string, selectValue: FilterPriorityTaskType) => ({type: "ADD_TASK", title, todoList_ID, selectValue} as const)
export const removeTaskAC = (todoList_ID: string, task_ID: string) => ({type: "REMOVE_TASK", todoList_ID, task_ID} as const)
export const setCheckedTaskAC = (todoList_ID: string, task_ID: string, checked: boolean) => ({type: "SET_CHECKED_TASK", todoList_ID, task_ID, checked} as const)
export const changeTaskTitleAC = (todoList_ID: string, task_ID: string, newTitle: string) => ({type: "CHANGE_TASK_TITLE", todoList_ID, task_ID, newTitle} as const)
