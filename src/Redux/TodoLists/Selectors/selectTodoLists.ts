import {RootStateType} from "../../store";
import {TodoListsStateType} from "../Types";

export const selectTodoLists = (state: RootStateType): TodoListsStateType[] => state.todoLists