import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./TasksReducer/tasksReducer";
import {todoListsReducer} from "./TodoListsReducer/todoListsReducer";
import {ActionsTasksType} from "./TasksReducer/tasksActions";
import {ActionsTodoListsType} from "./TodoListsReducer/todoListsActions";

const rootReducer = combineReducers({
   todoLists: todoListsReducer,
   tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ActionsTasksType | ActionsTodoListsType