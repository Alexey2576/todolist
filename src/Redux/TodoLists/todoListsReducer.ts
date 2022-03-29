import {todoListsApi} from "../../API/todoLists-api";
import {FilterPriorityTask, FilterStatusTask} from "../Tasks/Enums";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsErrorGettingData, setIsFetchingData} from "../App/appReducer";
import {ChangeTitleParamType, ProgressTodoListType, TodoListsStateType} from "./Types";

const getTodoLists = createAsyncThunk(
   "todoList/getTodoLists",
   async (_, {dispatch, rejectWithValue}
   ) => {
      try {
         dispatch(setIsFetchingData({isFetching: true}))
         let todoLists = await todoListsApi.getTodoLists()
         if (todoLists) {
            return {todoLists}
         } else {
            dispatch(setIsErrorGettingData({errorMessage: "TodoLists is missing"}))
            return rejectWithValue({errorMessage: "TodoLists is missing"})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      } finally {
         dispatch(setIsFetchingData({isFetching: false}))
      }
   })

const addTodoList = createAsyncThunk(
   "todoList/addTodoList",
   async (title: string, {dispatch, rejectWithValue}
   ) => {
      try {
         dispatch(setIsFetchingData({isFetching: true}))
         let data = await todoListsApi.createTodoList(title)
         if (data.resultCode === 0) {
            return {todoList: data.data.item}
         } else {
            dispatch(setIsErrorGettingData({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0]})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      } finally {
         dispatch(setIsFetchingData({isFetching: false}))
      }
   })

const removeTodoList = createAsyncThunk(
   "todoList/removeTodoList",
   async (todoList_ID: string, {dispatch, rejectWithValue}
   ) => {
      try {
         dispatch(setIsFetchingData({isFetching: true}))
         let data = await todoListsApi.deleteTodoList(todoList_ID)
         if (data.resultCode === 0) {
            return {todoList_ID}
         } else {
            dispatch(setIsErrorGettingData({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0]})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      } finally {
         dispatch(setIsFetchingData({isFetching: false}))
      }
   })

const changeTitleTodoList = createAsyncThunk(
   "todoList/changeTitleTodoList",
   async (param: ChangeTitleParamType, {dispatch, rejectWithValue}
   ) => {
      const {todoList_ID, newTitle} = param
      try {
         dispatch(setIsFetchingData({isFetching: true}))
         let data = await todoListsApi.updateTodoList(todoList_ID, newTitle)
         if (data.resultCode === 0) {
            return {todoList_ID, newTitle}
         } else {
            dispatch(setIsErrorGettingData({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0]})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      } finally {
         dispatch(setIsFetchingData({isFetching: false}))
      }
   })

export const asyncActions = {
   addTodoList,
   getTodoLists,
   removeTodoList,
   changeTitleTodoList,
}

export const slice = createSlice({
   name: "todoList",
   initialState: [] as TodoListsStateType[],
   reducers: {
      changeFilterCheckedTodoList: (
         state,
         action: PayloadAction<{ todoList_ID: string, filterStatus: FilterStatusTask }>
      ) => {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         state[index].filterStatus = action.payload.filterStatus
      },
      changeFilterPriorityTodoList: (
         state,
         action: PayloadAction<{ todoList_ID: string, filterPriority: FilterPriorityTask }>
      ) => {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         state[index].filterPriority = action.payload.filterPriority
      },
      setValueSelect: (
         state,
         action: PayloadAction<{ todoList_ID: string, selectPriorityValue: FilterPriorityTask }>
      ) => {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         state[index].selectPriorityValue = action.payload.selectPriorityValue
      },
      setProgressTodoList: (
         state,
         action: PayloadAction<{ todoList_ID: string, progress: ProgressTodoListType }>
      ) => {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         state[index].progress = action.payload.progress
      },
   },
   extraReducers: builder => {
      builder
         .addCase(getTodoLists.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({
               ...tl,
               filterPriority: FilterPriorityTask.All,
               filterStatus: FilterStatusTask.All,
               selectPriorityValue: null,
               progress: null
            }))
         })
         .addCase(addTodoList.fulfilled, (state, action) => {
            state.push(action.payload.todoList)
         })
         .addCase(removeTodoList.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
            state.splice(index, 1)
         })
         .addCase(changeTitleTodoList.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
            state[index].title = action.payload.newTitle
         })
   }
})

export const todoListsReducer = slice.reducer
export const {
   setValueSelect,
   setProgressTodoList,
   changeFilterCheckedTodoList,
   changeFilterPriorityTodoList
} = slice.actions