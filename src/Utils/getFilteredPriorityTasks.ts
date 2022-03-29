import {FilterPriorityTask} from "../Redux/Tasks/Enums";
import {TasksStateType, TaskType} from "../Redux/Tasks/Types";

export const getFilteredPriorityTasks = (todoList_ID: string, filterPriority: FilterPriorityTask, tasks: TasksStateType): TaskType[] => {
   switch (filterPriority) {
      case FilterPriorityTask.High:
         return tasks[todoList_ID].filter(t => t.priority === FilterPriorityTask.High)
      case FilterPriorityTask.Middle:
         return tasks[todoList_ID].filter(t => t.priority === FilterPriorityTask.Middle)
      case FilterPriorityTask.Low:
         return tasks[todoList_ID].filter(t => t.priority === FilterPriorityTask.Low)
      default:
         return tasks[todoList_ID]
   }
}