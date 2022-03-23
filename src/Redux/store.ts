import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./Tasks/tasksReducer";
import {todoListsReducer} from "./TodoLists/todoListsReducer";
import {ActionsTasksType} from "./Tasks/tasksActions";
import {ActionsTodoListsType} from "./TodoLists/todoListsActions";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./App/appReducer";
import {ActionsAppType} from "./App/appActions";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ActionsAuthType} from "./Auth/authActions";
import {authReducer} from "./Auth/authReducer";

const rootReducer = combineReducers({
   todoLists: todoListsReducer,
   tasks: tasksReducer,
   app: appReducer,
   auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//========================================= TYPES ======================================================================
export type RootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ActionsTasksType | ActionsTodoListsType | ActionsAppType | ActionsAuthType

export const useAppDispatch = () => useDispatch<ThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, AppActionsType>
export type ThunkDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsType>;

// @ts-ignore
window.store = store