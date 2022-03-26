import {combineReducers} from "redux";
import {tasksReducer} from "./Tasks/tasksReducer";
import {todoListsReducer} from "./TodoLists/todoListsReducer";
import {ActionsTasksType} from "./Tasks/tasksActions";
import {ActionsTodoListsType} from "./TodoLists/todoListsActions";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./App/appReducer";
import {ActionsAppType} from "./App/appActions";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "./Auth/authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
   todoLists: todoListsReducer,
   tasks: tasksReducer,
   app: appReducer,
   auth: authReducer,
})

export const store = configureStore({
   reducer: rootReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})


//========================================= TYPES ======================================================================
export type RootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ActionsTasksType | ActionsTodoListsType | ActionsAppType

export const useAppDispatch = () => useDispatch<ThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, AppActionsType>
export type ThunkDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsType>;

// @ts-ignore
window.store = store