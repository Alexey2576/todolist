import {FilterPriorityTask, FilterStatusTask} from "../Enums";
import {ProgressTaskType} from "./progressTaskType";

export type TaskType = OwnTaskType & {
   id: string
   order: number
   title: string
   deadline: string
   addedDate: string
   startDate: string
   todoListId: string
   description: string
   status: FilterStatusTask
   priority: FilterPriorityTask
}
export type OwnTaskType = {
   progress: ProgressTaskType
}