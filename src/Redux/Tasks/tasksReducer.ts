import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListTC, getTodoListsTC, removeTodoListTC, setProgressTodoListAC} from "../TodoLists/todoListsReducer";
import {tasksApi} from "../../API/tasks-api";
import {setIsErrorGettingDataAC, setIsFetchingDataAC} from "../App/appReducer";
import {RootStateType} from "../store";

export const getTasksTC = createAsyncThunk<{ todoListID: string, tasks: TaskType[] }, string>("task/getTasks", async (todoListID: string, {
   dispatch,
   rejectWithValue
}) => {
   dispatch(setIsFetchingDataAC({isFetching: true}))
   try {
      const data = await tasksApi.getTasks(todoListID, 10, 1)
      const errorMessage = data.error
      if (data) {
         return {todoListID, tasks: data.items}
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage}))
         return rejectWithValue({errorMessage: "Don't fetch task. Try later"})
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
      return rejectWithValue({errorMessage: "Some error"})
   } finally {
      dispatch(setIsFetchingDataAC({isFetching: false}))
   }
})

export const addTaskTC = createAsyncThunk("task/addTask", async (param: AddTaskParamType, {
   dispatch,
   rejectWithValue
}) => {
   const {title, todoList_ID} = param
   dispatch(setProgressTodoListAC({todoList_ID, progress: "add-task"}))
   try {
      const data = await tasksApi.createTask(todoList_ID, title)
      if (data.resultCode === 0) {
         return {todoList_ID, task: data.data.item}
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
         return rejectWithValue({errorMessage: data.messages[0]})
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
      return rejectWithValue({errorMessage: "Some error"})
   } finally {
      dispatch(setProgressTodoListAC({todoList_ID, progress: null}))
   }
})

export const removeTaskTC = createAsyncThunk("task/removeTask", async (param: RemoveTaskParamType, {
   dispatch,
   rejectWithValue
}) => {
   const {todoList_ID, task_ID} = param
   try {
      dispatch(setProgressTaskAC({todoList_ID, task_ID, progress: "remove-task"}))
      const data = await tasksApi.deleteTask(todoList_ID, task_ID)
      if (data.resultCode === 0) {
         dispatch(setProgressTaskAC({todoList_ID, task_ID, progress: null}))
         return {todoList_ID, task_ID}
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
         return rejectWithValue({errorMessage: data.messages[0]})
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
      return rejectWithValue({errorMessage: "Some error"})
   }
})

export const updateTaskTC = createAsyncThunk("task/updateTask", async (param: UpdateTaskParamType, {
   dispatch,
   rejectWithValue,
   getState
}) => {
   const {todoList_ID, task_ID, updateTaskBody} = param
   const rootState = getState() as RootStateType
   try {
      const task = rootState.tasks[todoList_ID].find(t => t.id === task_ID)
      if (!task) {
         dispatch(setIsErrorGettingDataAC({errorMessage: "Task don't find"}))
         return rejectWithValue({errorMessage: "Task don't find"})
      }
      const updateDomainTaskBody: UpdateDomainBodyTaskType = {
         title: task.title,
         description: task.description,
         status: task.status,
         priority: task.priority,
         startDate: task.startDate,
         deadline: task.deadline,
         ...updateTaskBody
      }

      const data = await tasksApi.updateTask(todoList_ID, task.id, updateDomainTaskBody)
      if (data.resultCode === 0) {
         return {todoList_ID, task_ID: task.id, updateTaskBody: data.data.item}
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
         return rejectWithValue({errorMessage: data.messages[0]})
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
      return rejectWithValue({errorMessage: "Some error"})
   }
})


const slice = createSlice({
   name: "task",
   initialState: {} as TasksStateType,
   reducers: {
      setProgressTaskAC(state, action: PayloadAction<{ todoList_ID: string, task_ID: string, progress: ProgressTaskType }>) {
         const index = state[action.payload.todoList_ID].findIndex(t => t.id === action.payload.task_ID)
         state[action.payload.todoList_ID][index].progress = action.payload.progress
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(addTodoListTC.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
         })
         .addCase(removeTodoListTC.fulfilled, (state, action) => {
            delete state[action.payload.todoList_ID]
         })
         .addCase(getTodoListsTC.fulfilled, (state, action) => {
            action.payload.todoLists.forEach(tl => state[tl.id] = [])
         })
         .addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListID] = action.payload.tasks
         })
         .addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoList_ID].unshift({...action.payload.task, progress: null})
         })
         .addCase(removeTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload.todoList_ID].findIndex(t => t.id === action.payload.task_ID)
            state[action.payload.todoList_ID].splice(index, 1)
         })
         .addCase(updateTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload.todoList_ID].findIndex(t => t.id === action.payload.task_ID)
            state[action.payload.todoList_ID][index] = {...state[action.payload.todoList_ID][index], ...action.payload.updateTaskBody}
         })

   },
})

export const tasksReducer = slice.reducer
export const {setProgressTaskAC} = slice.actions

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
type AddTaskParamType = {
   title: string,
   todoList_ID: string,
   selectPriorityValue: FilterPriorityTask
}

type RemoveTaskParamType = {
   todoList_ID: string
   task_ID: string
}

type UpdateTaskParamType = {
   todoList_ID: string,
   task_ID: string,
   updateTaskBody: UpdateBodyTaskType
}

type UpdateBodyTaskType = {
   title?: string
   description?: string
   status?: number
   priority?: FilterPriorityTask
   startDate?: string
   deadline?: string
}

