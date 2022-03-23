import {addTodoListAC, removeTodoListAC, setAllTodoListsAC} from "../TodoLists/todoListsActions";
import {FilterPriorityTask, ProgressTaskType, TaskType, UpdateDomainBodyTaskType} from "./tasksReducer";

export type ActionsTasksType =
   | ReturnType<typeof addTaskAC>
   | ReturnType<typeof removeTaskAC>
   | ReturnType<typeof addTodoListAC>
   | ReturnType<typeof removeTodoListAC>
   | ReturnType<typeof setAllTodoListsAC>
   | ReturnType<typeof setAllTasksTodoListAC>
   | ReturnType<typeof updateTaskAC>
   | ReturnType<typeof setProgressTaskAC>

export const addTaskAC = (title: string, todoList_ID: string, selectPriorityValue: FilterPriorityTask, task: TaskType) => ({type: "ADD_TASK", title, todoList_ID, selectPriorityValue, task} as const)
export const removeTaskAC = (todoList_ID: string, task_ID: string) => ({type: "REMOVE_TASK", todoList_ID, task_ID} as const)
export const setAllTasksTodoListAC = (todoListID: string, tasks: TaskType[]) => ({type: "SET_ALL_TASKS", todoListID, tasks} as const)
export const updateTaskAC = (todoList_ID: string, task_ID: string, updateTaskBody: UpdateDomainBodyTaskType) => ({type: "UPDATE_TASK", todoList_ID, task_ID, updateTaskBody} as const)
export const setProgressTaskAC = (todoList_ID: string, task_ID: string, progress: ProgressTaskType) => ({type: "SET_PROGRESS_TASK", todoList_ID, task_ID, progress} as const)