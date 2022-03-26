import {todoListsApi} from "../../API/todoLists-api";
import {setIsErrorGettingDataAC, setIsFetchingDataAC} from "../App/appReducer";
import {AppDispatch} from "../store";
import {addTodoListAC, changeTitleTodoListAC, removeTodoListAC, setAllTodoListsAC} from "./todoListsReducer";

export const getTodoListsTC = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(setIsFetchingDataAC({isFetching: true}))
      let todoLists = await todoListsApi.getTodoLists()
      dispatch(setAllTodoListsAC({todoLists}))
   } catch (e) {

   }
}

export const addTodoListTC = (title: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setIsFetchingDataAC({isFetching: true}))
      let data = await todoListsApi.createTodoList(title)
      if (data.resultCode === 0) {
         dispatch(addTodoListAC({todoList: data.data.item}))
         dispatch(setIsFetchingDataAC({isFetching: false}))
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
         dispatch(setIsFetchingDataAC({isFetching: false}))
      }
   } catch (e) {

   }
}

export const removeTodoListTC = (todoList_ID: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setIsFetchingDataAC({isFetching: true}))
      let data = await todoListsApi.deleteTodoList(todoList_ID)
      if (data.resultCode === 0) {
         dispatch(removeTodoListAC({todoList_ID}))
         dispatch(setIsFetchingDataAC({isFetching: false}))
      }
   } catch (e) {

   }
}

export const changeTitleTodoListTC = (todoList_ID: string, newTitle: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setIsFetchingDataAC({isFetching: true}))
      let data = await todoListsApi.updateTodoList(todoList_ID, newTitle)
      if (data.resultCode === 0) {
         dispatch(changeTitleTodoListAC({todoList_ID, newTitle}))
         dispatch(setIsFetchingDataAC({isFetching: false}))
      }
   } catch (e) {

   }
}