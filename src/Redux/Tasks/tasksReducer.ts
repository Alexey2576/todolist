import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListAC, removeTodoListAC, setAllTodoListsAC, setProgressTodoListAC} from "../TodoLists/todoListsReducer";
import {tasksApi} from "../../API/tasks-api";
import {setIsErrorGettingDataAC, setIsFetchingDataAC} from "../App/appReducer";

export const getTasksTC = createAsyncThunk("task/getTasks", async (
   todoListID: string,
   {
      dispatch
   }
) => {
   // try {
   const data = await tasksApi.getTasks(todoListID, 10, 1)
   if (data) {
      dispatch(setIsFetchingDataAC({isFetching: false}))
      return {todoListID, tasks: data.items}
   }
   return data
   // } catch (e) {
   //
   // }
})

export const addTaskTC = createAsyncThunk("task/addTask", async (
   param: {
      title: string,
      todoList_ID: string,
      selectPriorityValue: FilterPriorityTask
   },
   {
      dispatch
   }
) => {
   const {title, todoList_ID, selectPriorityValue} = param
   // try {
   dispatch(setProgressTodoListAC({todoList_ID, progress: "add-task"}))
   const data = await tasksApi.createTask(todoList_ID, title)
   // if (data.resultCode === 0)
   dispatch(setProgressTodoListAC({todoList_ID, progress: null}))

   return {title, todoList_ID, selectPriorityValue, task: data.data.item}
   // else
   //    dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
   // } catch (e) {
   //    dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
   // } finally {
   // }
})

const slice = createSlice({
   name: "task",
   initialState: {} as TasksStateType,
   reducers: {
      removeTaskAC(state, action: PayloadAction<{ todoList_ID: string, task_ID: string }>) {
         const index = state[action.payload.todoList_ID].findIndex(t => t.id === action.payload.task_ID)
         state[action.payload.todoList_ID].splice(index, 1)
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
         .addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListID] = action.payload.tasks
         })
         .addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoList_ID].unshift({...action.payload.task, progress: null})
         })

   },
})

export const tasksReducer = slice.reducer
export const {
   setProgressTaskAC,
   updateTaskAC,
   removeTaskAC,
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

