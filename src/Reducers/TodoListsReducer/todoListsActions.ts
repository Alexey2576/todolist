import {FilterCheckedTaskType, FilterPriorityTaskType} from "../../App";

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
export const changeFilterCheckedTodoListAC = (todoList_ID: string, filterChecked: FilterCheckedTaskType) => ({type: "CHANGE_FILTER_CHECKED_TODOLIST", todoList_ID, filterChecked} as const)
export const changeFilterPriorityTodoListAC = (todoList_ID: string, filterPriority: FilterPriorityTaskType) => ({type: "CHANGE_FILTER_PRIORITY_TODOLIST", todoList_ID, filterPriority} as const)
export const setValueSelectAC = (todoList_ID: string, selectValue: FilterPriorityTaskType) => ({type: "SET_VALUE_SELECT", todoList_ID, selectValue} as const)
