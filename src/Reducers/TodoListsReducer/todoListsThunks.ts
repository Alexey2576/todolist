import {todoListsApi} from "../../API/todoLists-api";
import {addTodoListAC, changeTitleTodoListAC, removeTodoListAC, setAllTodoListsAC} from "./todoListsActions";
import {ThunkDispatchType, ThunkType} from "../store";

export const getTodoListsTC = (): ThunkType => async (dispatch: ThunkDispatchType) => {
   let data = await todoListsApi.getTodoLists()
   dispatch(setAllTodoListsAC(data))
}

export const addTodoListTC = (title: string): ThunkType => async (dispatch: ThunkDispatchType) => {
   let data = await todoListsApi.createTodoList(title)
   dispatch(addTodoListAC(data.data.item))
}

export const removeTodoListTC = (todoList_ID: string): ThunkType => async (dispatch: ThunkDispatchType) => {
   let data = await todoListsApi.deleteTodoList(todoList_ID)
   if (data.resultCode === 0) {
      dispatch(removeTodoListAC(todoList_ID))
   }
}

export const changeTitleTodoListTC = (todoList_ID: string, title: string): ThunkType => async (dispatch: ThunkDispatchType) => {
   let data = await todoListsApi.updateTodoList(todoList_ID, title)
   if (data.resultCode === 0) {
      dispatch(changeTitleTodoListAC(todoList_ID, title))
   }
}