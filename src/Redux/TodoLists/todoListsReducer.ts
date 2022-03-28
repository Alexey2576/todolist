import {FilterPriorityTask, FilterStatusTask} from "../Tasks/tasksReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsErrorGettingDataAC, setIsFetchingDataAC} from "../App/appReducer";
import {todoListsApi} from "../../API/todoLists-api";

export const getTodoListsTC = createAsyncThunk("todoList/getTodoLists", async (_, {
   dispatch,
   rejectWithValue
}) => {
   try {
      dispatch(setIsFetchingDataAC({isFetching: true}))
      let todoLists = await todoListsApi.getTodoLists()
      if (todoLists) {
         return {todoLists}
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: "TodoLists is missing"}))
         return rejectWithValue({errorMessage: "TodoLists is missing"})
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
      return rejectWithValue({errorMessage: "Some error"})
   } finally {
      dispatch(setIsFetchingDataAC({isFetching: false}))
   }
})

export const addTodoListTC = createAsyncThunk("todoList/addTodoList", async (title: string, {
   dispatch,
   rejectWithValue
}) => {
   try {
      dispatch(setIsFetchingDataAC({isFetching: true}))
      let data = await todoListsApi.createTodoList(title)
      if (data.resultCode === 0) {
         return {todoList: data.data.item}
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
         return rejectWithValue({errorMessage: data.messages[0]})
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
      return rejectWithValue({errorMessage: "Some error"})
   } finally {
      dispatch(setIsFetchingDataAC({isFetching: false}))
   }
})

export const removeTodoListTC = createAsyncThunk("todoList/removeTodoList", async (todoList_ID: string, {
   dispatch,
   rejectWithValue
}) => {
   try {
      dispatch(setIsFetchingDataAC({isFetching: true}))
      let data = await todoListsApi.deleteTodoList(todoList_ID)
      if (data.resultCode === 0) {
         return {todoList_ID}
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
         return rejectWithValue({errorMessage: data.messages[0]})
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
      return rejectWithValue({errorMessage: "Some error"})
   } finally {
      dispatch(setIsFetchingDataAC({isFetching: false}))
   }
})

export const changeTitleTodoListTC = createAsyncThunk("todoList/changeTitleTodoList", async (param: ChangeTitleParamType, {
   dispatch,
   rejectWithValue
}) => {
   const {todoList_ID, newTitle} = param
   try {
      dispatch(setIsFetchingDataAC({isFetching: true}))
      let data = await todoListsApi.updateTodoList(todoList_ID, newTitle)
      if (data.resultCode === 0) {
         return {todoList_ID, newTitle}
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
         return rejectWithValue({errorMessage: data.messages[0]})
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
      return rejectWithValue({errorMessage: "Some error"})
   } finally {
      dispatch(setIsFetchingDataAC({isFetching: false}))
   }
})


const slice = createSlice({
   name: "todoList",
   initialState: [] as TodoListsStateType[],
   reducers: {
      changeFilterCheckedTodoListAC(state, action: PayloadAction<{ todoList_ID: string, filterStatus: FilterStatusTask }>) {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         state[index].filterStatus = action.payload.filterStatus
      },
      changeFilterPriorityTodoListAC(state, action: PayloadAction<{ todoList_ID: string, filterPriority: FilterPriorityTask }>) {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         state[index].filterPriority = action.payload.filterPriority
      },
      setValueSelectAC(state, action: PayloadAction<{ todoList_ID: string, selectPriorityValue: FilterPriorityTask }>) {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         state[index].selectPriorityValue = action.payload.selectPriorityValue
      },
      setProgressTodoListAC(state, action: PayloadAction<{ todoList_ID: string, progress: ProgressTodoListType }>) {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         state[index].progress = action.payload.progress
      },
   },
   extraReducers: builder => {
      builder
         .addCase(getTodoListsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({
               ...tl,
               filterPriority: FilterPriorityTask.All,
               filterStatus: FilterStatusTask.All,
               selectPriorityValue: null,
               progress: null
            }))
         })
         .addCase(addTodoListTC.fulfilled, (state, action) => {
            state.push(action.payload.todoList)
         })
         .addCase(removeTodoListTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
            state.splice(index, 1)
         })
         .addCase(changeTitleTodoListTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
            state[index].title = action.payload.newTitle
         })
   }
})

export const todoListsReducer = slice.reducer
export const {
   setValueSelectAC,
   changeFilterCheckedTodoListAC,
   changeFilterPriorityTodoListAC,
   setProgressTodoListAC,
} = slice.actions

//========================================= TYPES ======================================================================
export type TodoListsStateType = OwnTodoListType & {
   id: string
   title: string
   addedDate: string
   order: number
}
export type  OwnTodoListType = {
   filterPriority: FilterPriorityTask,
   filterStatus: FilterStatusTask,
   selectPriorityValue: FilterPriorityTask | null
   progress: ProgressTodoListType
}
export type ProgressTodoListType = "add-task" | "remove-todolist" | null
type ChangeTitleParamType = {
   todoList_ID: string
   newTitle: string
}
