import {FilterPriorityTask, FilterStatusTask} from "../../API/tasks-api";

export type ActionsTodoListsType =
   ReturnType<typeof removeTodoListAC>
   | ReturnType<typeof addTodoListAC>
   | ReturnType<typeof changeFilterCheckedTodoListAC>
   | ReturnType<typeof changeFilterPriorityTodoListAC>
   | ReturnType<typeof setValueSelectAC>
   | ReturnType<typeof changeTitleTodoListAC>

export const removeTodoListAC = (todoList_ID: string) => ({type: "REMOVE_TODOLIST", todoList_ID} as const)
export const addTodoListAC = (todoList_ID: string, title: string) => ({type: "ADD_TODOLIST", todoList_ID, title} as const)
export const changeTitleTodoListAC = (todoList_ID: string, newTitle: string) => ({type: "CHANGE_TITLE_TODOLIST", todoList_ID, newTitle} as const)
export const changeFilterCheckedTodoListAC = (todoList_ID: string, filterStatus: FilterStatusTask) => ({type: "CHANGE_FILTER_CHECKED_TODOLIST", todoList_ID, filterStatus} as const)
export const changeFilterPriorityTodoListAC = (todoList_ID: string, filterPriority: FilterPriorityTask) => ({type: "CHANGE_FILTER_PRIORITY_TODOLIST", todoList_ID, filterPriority} as const)
export const setValueSelectAC = (todoList_ID: string, selectPriorityValue: FilterPriorityTask) => ({type: "SET_VALUE_SELECT", todoList_ID, selectPriorityValue} as const)
