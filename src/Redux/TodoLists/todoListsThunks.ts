import {todoListsApi} from "../../API/todoLists-api";
import {addTodoListAC, changeTitleTodoListAC, removeTodoListAC, setAllTodoListsAC} from "./todoListsActions";
import {ThunkDispatchType, ThunkType} from "../store";
import {setIsErrorGettingDataAC, setIsFetchingDataAC} from "../App/appActions";

export const getTodoListsTC = (): ThunkType => async (dispatch: ThunkDispatchType) => {
   try {
      dispatch(setIsFetchingDataAC(true))
      let data = await todoListsApi.getTodoLists()
      dispatch(setAllTodoListsAC(data))
   } catch (e) {

   }
}

export const addTodoListTC = (title: string): ThunkType => async (dispatch: ThunkDispatchType) => {
   try {
      dispatch(setIsFetchingDataAC(true))
      let data = await todoListsApi.createTodoList(title)
      if (data.resultCode === 0) {
         dispatch(addTodoListAC(data.data.item))
         dispatch(setIsFetchingDataAC(false))
      } else {
         dispatch(setIsErrorGettingDataAC(data.messages[0]))
         dispatch(setIsFetchingDataAC(false))
      }
   } catch (e) {

   }
}

export const removeTodoListTC = (todoList_ID: string): ThunkType => async (dispatch: ThunkDispatchType) => {
   try {
      dispatch(setIsFetchingDataAC(true))
      let data = await todoListsApi.deleteTodoList(todoList_ID)
      if (data.resultCode === 0) {
         dispatch(removeTodoListAC(todoList_ID))
         dispatch(setIsFetchingDataAC(false))
      }
   } catch (e) {

   }
}

export const changeTitleTodoListTC = (todoList_ID: string, title: string): ThunkType => async (dispatch: ThunkDispatchType) => {
   try {
      dispatch(setIsFetchingDataAC(true))
      let data = await todoListsApi.updateTodoList(todoList_ID, title)
      if (data.resultCode === 0) {
         dispatch(changeTitleTodoListAC(todoList_ID, title))
         dispatch(setIsFetchingDataAC(false))
      }
   } catch (e) {

   }
}