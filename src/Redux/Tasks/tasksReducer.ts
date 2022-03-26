import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListAC, removeTodoListAC, setAllTodoListsAC} from "../TodoLists/todoListsReducer";

const slice = createSlice({
   name: "task",
   initialState: {} as TasksStateType,
   reducers: {
      addTaskAC(state, action: PayloadAction<{ title: string, todoList_ID: string, selectPriorityValue: FilterPriorityTask, task: TaskType }>) {
         state[action.payload.todoList_ID].unshift({...action.payload.task, progress: null})
      },
      removeTaskAC(state, action: PayloadAction<{ todoList_ID: string, task_ID: string }>) {
         const index = state[action.payload.todoList_ID].findIndex(t => t.id === action.payload.task_ID)
         state[action.payload.todoList_ID].splice(index, 1)
      },
      setAllTasksTodoListAC(state, action: PayloadAction<{ todoListID: string, tasks: TaskType[] }>) {
         state[action.payload.todoListID] = action.payload.tasks
      },
      updateTaskAC(state, action: PayloadAction<{ todoList_ID: string, task_ID: string, updateTaskBody: UpdateDomainBodyTaskType }>) {
         const index = state[action.payload.todoList_ID].findIndex(t => t.id === action.payload.task_ID)
         state[action.payload.todoList_ID][index] = {...state[action.payload.todoList_ID][index], ...action.payload.updateTaskBody}
      },
      setProgressTaskAC(state, action: PayloadAction<{ todoList_ID: string, task_ID: string, progress: ProgressTaskType }>) {
         const index = state[action.payload.todoList_ID].findIndex(t => t.id === action.payload.task_ID)
         state[action.payload.todoList_ID][index].progress = action.payload.progress
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(addTodoListAC, (state, action) => {
           state[action.payload.todoList.id] = []
         })
         .addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoList_ID]
         })
         .addCase(setAllTodoListsAC, (state, action) => {
            action.payload.todoLists.forEach(tl => state[tl.id] = [])
         })
   },
})

export const tasksReducer = slice.reducer
export const {
   setProgressTaskAC,
   updateTaskAC,
   addTaskAC,
   removeTaskAC,
   setAllTasksTodoListAC,
} = slice.actions

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

