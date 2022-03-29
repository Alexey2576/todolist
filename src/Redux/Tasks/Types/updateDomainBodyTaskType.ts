import {FilterPriorityTask} from "../Enums";

export type UpdateDomainBodyTaskType = {
   title: string
   description: string
   status: number
   priority: FilterPriorityTask
   startDate: string
   deadline: string
}