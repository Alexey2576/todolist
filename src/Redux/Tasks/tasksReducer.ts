import {ActionsTasksType} from "./tasksActions";

export const tasksReducer = (state: TasksStateType = {}, action: ActionsTasksType): TasksStateType => {
   switch (action.type) {
      case "SET_ALL_TODOLIST":
         const newState = {...state}
         action.todoLists.forEach(tl => newState[tl.id] = [])
         return newState
      case "SET_ALL_TASKS":
         return {
            ...state,
            [action.todoListID]: action.tasks
         }
      case "REMOVE_TASK":
         return {
            ...state,
            [action.todoList_ID]: state[action.todoList_ID].filter(t => t.id !== action.task_ID)
         }
      case "ADD_TASK":
         return {
            ...state,
            [action.todoList_ID]: [{...action.task, progress: null}, ...state[action.todoList_ID]]
         }
      case "UPDATE_TASK":
         return {
            ...state,
            [action.todoList_ID]: state[action.todoList_ID].map(t => t.id === action.task_ID ? {
               ...t,
               ...action.updateTaskBody,
            } : t)
         }
      case "SET_PROGRESS_TASK":
         return {
            ...state,
            [action.todoList_ID]: state[action.todoList_ID].map(t => t.id === action.task_ID ? {
               ...t,
               progress: action.progress
            } : t)
         }
      case "ADD_TODOLIST":
         return {...state, [action.todoList.id]: []}
      case "REMOVE_TODOLIST":
         const copyState = {...state}
         delete copyState[action.todoList_ID]
         return copyState
      default:
         return state
   }
}

//========================================= TYPES ======================================================================
export enum FilterPriorityTask {
   All = 0,
   Low = 1,
   Middle = 2,
   High = 3,
   Urgently = 4,
   Later = 5,
   null = "",
}
export enum FilterStatusTask {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3,
   All = 4,
}
export type UpdateDomainBodyTaskType = {
   title: string
   description: string
   status: number
   priority: FilterPriorityTask
   startDate: string
   deadline: string
}
export type TaskType = OwnTaskType & {
   id: string
   title: string
   description: string
   todoListId: string
   order: number
   status: FilterStatusTask
   priority: FilterPriorityTask
   startDate: string
   deadline: string
   addedDate: string
}
export type OwnTaskType = {
   progress: ProgressTaskType
}
export type ProgressTaskType = "add-task" | "remove-task" | "change-task" | null
export type TasksStateType = {
   [todoList_ID: string]: TaskType[]
}

