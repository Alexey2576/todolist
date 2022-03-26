import {FilterPriorityTask, FilterStatusTask} from "../Tasks/tasksReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
   name: "todoList",
   initialState: [] as TodoListsStateType[] ,
   reducers: {
      removeTodoListAC(state, action: PayloadAction<{ todoList_ID: string }>) {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         if (index !== -1) {
            state.splice(index , 1)
         }
      },
      addTodoListAC(state, action: PayloadAction<{ todoList: TodoListsStateType }>) {
         state.push(action.payload.todoList)
      },
      changeTitleTodoListAC(state, action: PayloadAction<{ todoList_ID: string, newTitle: string }>) {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         state[index].title = action.payload.newTitle
      },
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
      setAllTodoListsAC(state, action: PayloadAction<{ todoLists: TodoListsStateType[] }>) {
         return action.payload.todoLists.map(tl => ({...tl, filterPriority: FilterPriorityTask.All, filterStatus: FilterStatusTask.All, selectPriorityValue: null, progress: null}))
      },
      setProgressTodoListAC(state, action: PayloadAction<{ todoList_ID: string, progress: ProgressTodoListType }>) {
         const index = state.findIndex(tl => tl.id === action.payload.todoList_ID)
         state[index].progress = action.payload.progress
      },
   },
})

export const todoListsReducer = slice.reducer
export const {
   changeTitleTodoListAC,
   removeTodoListAC,
   setValueSelectAC,
   changeFilterCheckedTodoListAC,
   changeFilterPriorityTodoListAC,
   setAllTodoListsAC,
   setProgressTodoListAC,
   addTodoListAC,
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
