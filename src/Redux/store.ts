import {tasksReducer} from "./Tasks/tasksReducer";
import {todoListsReducer} from "./TodoLists/todoListsReducer";
import thunk from "redux-thunk";
import {appReducer} from "./App/appReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "./Auth/authReducer";
import {configureStore, MiddlewareArray} from "@reduxjs/toolkit";

export const store = configureStore({
   reducer: {
      todoLists: todoListsReducer,
      tasks: tasksReducer,
      app: appReducer,
      auth: authReducer,
   },
   middleware: new MiddlewareArray().concat(thunk)
})


//========================================= TYPES ======================================================================
export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<any>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector