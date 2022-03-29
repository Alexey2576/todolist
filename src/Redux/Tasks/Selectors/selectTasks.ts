import {TasksStateType} from "../Types";
import {RootStateType} from "../../store";

export const selectTasks = (state: RootStateType): TasksStateType => state.tasks