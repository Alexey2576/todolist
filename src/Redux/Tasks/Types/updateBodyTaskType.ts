import {FilterPriorityTask} from "../Enums";

export type UpdateBodyTaskType = {
   title?: string
   description?: string
   status?: number
   priority?: FilterPriorityTask
   startDate?: string
   deadline?: string
}