import {FilterPriorityTask} from "../Enums";

export type AddTaskParamType = {
   title: string,
   todoList_ID: string,
   selectPriorityValue: FilterPriorityTask
}