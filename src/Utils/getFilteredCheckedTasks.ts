import {TasksStateType, TaskType} from "../Redux/Tasks/Types";
import {getFilteredPriorityTasks} from "./getFilteredPriorityTasks";
import {FilterPriorityTask, FilterStatusTask} from "../Redux/Tasks/Enums";

export const getFilteredCheckedTasksCallback = (todoList_ID: string, filterStatus: FilterStatusTask, filterPriority: FilterPriorityTask, tasks: TasksStateType): TaskType[] => {
   const filteredPriorityState = getFilteredPriorityTasks(todoList_ID, filterPriority, tasks)
   switch (filterStatus) {
      case FilterStatusTask.New:
         return filteredPriorityState.filter(t => t.status === FilterStatusTask.New)
      case FilterStatusTask.Completed:
         return filteredPriorityState.filter(t => t.status === FilterStatusTask.Completed)
      default:
         return filteredPriorityState
   }
}