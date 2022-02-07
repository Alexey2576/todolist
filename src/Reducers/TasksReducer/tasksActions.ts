import {addTodoListAC, removeTodoListAC, setAllTodoListsAC} from "../TodoListsReducer/todoListsActions";
import {FilterPriorityTask, TaskType, UpdateDomainBodyTaskType} from "./tasksReducer";

export type ActionsTasksType =
   | ReturnType<typeof addTaskAC>
   | ReturnType<typeof removeTaskAC>
   | ReturnType<typeof addTodoListAC>
   | ReturnType<typeof removeTodoListAC>
   | ReturnType<typeof setAllTodoListsAC>
   | ReturnType<typeof setAllTasksTodoListAC>
   | ReturnType<typeof updateTaskAC>

export const addTaskAC = (title: string, todoList_ID: string, selectPriorityValue: FilterPriorityTask, task: TaskType) => ({type: "ADD_TASK", title, todoList_ID, selectPriorityValue, task} as const)
export const removeTaskAC = (todoList_ID: string, task_ID: string) => ({type: "REMOVE_TASK", todoList_ID, task_ID} as const)
export const setAllTasksTodoListAC = (todoListID: string, tasks: TaskType[]) => ({type: "SET_ALL_TASKS", todoListID, tasks} as const)
export const updateTaskAC = (todoList_ID: string, task_ID: string, updateTaskBody: UpdateDomainBodyTaskType) => ({type: "UPDATE_TASK", todoList_ID, task_ID, updateTaskBody} as const)
