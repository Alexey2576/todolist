import {ProgressTodoListType} from "./progressTodoListType";
import {FilterPriorityTask, FilterStatusTask} from "../../Tasks/Enums";

export type TodoListsStateType = OwnTodoListType & {
   id: string
   title: string
   addedDate: string
   order: number
}

export type  OwnTodoListType = {
   filterPriority: FilterPriorityTask,
   filterStatus: FilterStatusTask,
   selectPriorityValue: FilterPriorityTask | null
   progress: ProgressTodoListType
}
