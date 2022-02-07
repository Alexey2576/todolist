import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./TasksReducer/tasksReducer";
import {todoListsReducer} from "./TodoListsReducer/todoListsReducer";
import {ActionsTasksType} from "./TasksReducer/tasksActions";
import {ActionsTodoListsType} from "./TodoListsReducer/todoListsActions";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
   todoLists: todoListsReducer,
   tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//========================================= TYPES ======================================================================
export type RootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ActionsTasksType | ActionsTodoListsType
export type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, AppActionsType>
export type ThunkDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsType>;