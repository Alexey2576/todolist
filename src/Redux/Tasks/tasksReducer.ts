import {RootStateType} from "../store";
import {tasksApi} from "../../API/tasks-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsErrorGettingData, setIsFetchingData} from "../App/appReducer";
import {setProgressTodoList} from "../TodoLists/todoListsReducer";
import {
   TaskType,
   TasksStateType,
   AddTaskParamType,
   ProgressTaskType,
   RemoveTaskParamType,
   UpdateTaskParamType,
   UpdateDomainBodyTaskType
} from "./Types";
import {todoListsActions} from "../index";

const getTasks = createAsyncThunk<{ todoListID: string, tasks: TaskType[] }, string>(
   "task/getTasks",
   async (todoListID: string, {dispatch, rejectWithValue}
   ) => {
      dispatch(setIsFetchingData({isFetching: true}))
      try {
         const data = await tasksApi.getTasks(todoListID, 10, 1)
         const errorMessage = data.error
         if (data) {
            return {todoListID, tasks: data.items}
         } else {
            dispatch(setIsErrorGettingData({errorMessage}))
            return rejectWithValue({errorMessage: "Don't fetch task. Try later"})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      } finally {
         dispatch(setIsFetchingData({isFetching: false}))
      }
   })

const addTask = createAsyncThunk(
   "task/addTask",
   async (param: AddTaskParamType, {dispatch, rejectWithValue}
   ) => {
      const {title, todoList_ID} = param
      dispatch(setProgressTodoList({todoList_ID, progress: "add-task"}))
      try {
         const data = await tasksApi.createTask(todoList_ID, title)
         if (data.resultCode === 0) {
            return {todoList_ID, task: data.data.item}
         } else {
            dispatch(setIsErrorGettingData({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0]})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      } finally {
         dispatch(setProgressTodoList({todoList_ID, progress: null}))
      }
   })

const removeTask = createAsyncThunk(
   "task/removeTask",
   async (param: RemoveTaskParamType, {dispatch, rejectWithValue}
   ) => {
      const {todoList_ID, task_ID} = param
      try {
         dispatch(setProgressTask({todoList_ID, task_ID, progress: "remove-task"}))
         const data = await tasksApi.deleteTask(todoList_ID, task_ID)
         if (data.resultCode === 0) {
            dispatch(setProgressTask({todoList_ID, task_ID, progress: null}))
            return {todoList_ID, task_ID}
         } else {
            dispatch(setIsErrorGettingData({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0]})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      }
   })

const updateTask = createAsyncThunk(
   "task/updateTask",
   async (param: UpdateTaskParamType, {dispatch, rejectWithValue, getState}
   ) => {
      const {todoList_ID, task_ID, updateTaskBody} = param
      const rootState = getState() as RootStateType
      try {
         const task = rootState.tasks[todoList_ID].find(t => t.id === task_ID)
         if (!task) {
            dispatch(setIsErrorGettingData({errorMessage: "Task don't find"}))
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
            dispatch(setIsErrorGettingData({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0]})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      }
   })

export const asyncActions = {
   addTask,
   getTasks,
   removeTask,
   updateTask,
}

export const slice = createSlice({
   name: "task",
   initialState: {} as TasksStateType,
   reducers: {
      setProgressTask: (
         state,
         action: PayloadAction<{ todoList_ID: string, task_ID: string, progress: ProgressTaskType }>
      ) => {
         const index = state[action.payload.todoList_ID].findIndex(t => t.id === action.payload.task_ID)
         state[action.payload.todoList_ID][index].progress = action.payload.progress
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(todoListsActions.addTodoList.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
         })
         .addCase(todoListsActions.removeTodoList.fulfilled, (state, action) => {
            delete state[action.payload.todoList_ID]
         })
         .addCase(todoListsActions.getTodoLists.fulfilled, (state, action) => {
            action.payload.todoLists.forEach((tl: { id: string }) => state[tl.id] = [])
         })
         .addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todoListID] = action.payload.tasks
         })
         .addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoList_ID].unshift({...action.payload.task, progress: null})
         })
         .addCase(removeTask.fulfilled, (state, action) => {
            const index = state[action.payload.todoList_ID].findIndex(t => t.id === action.payload.task_ID)
            state[action.payload.todoList_ID].splice(index, 1)
         })
         .addCase(updateTask.fulfilled, (state, action) => {
            const index = state[action.payload.todoList_ID].findIndex(t => t.id === action.payload.task_ID)
            state[action.payload.todoList_ID][index] =
               {...state[action.payload.todoList_ID][index], ...action.payload.updateTaskBody}
         })

   },
})

export const tasksReducer = slice.reducer
export const {setProgressTask} = slice.actions
