import {CommonResponseType, instanceAxios, ResponseFetchingTasksType} from "./settings-api";
import {TaskType, UpdateDomainBodyTaskType} from "../Redux/Tasks/tasksReducer";

export const tasksApi = {
   getTasks: (todolistId: string, count: number, page: number) => {
      return instanceAxios.get<ResponseFetchingTasksType>(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`).then(res => res.data)
   },
   createTask: (todolistId: string, title: string) => {
      return instanceAxios.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title}).then(res => res.data)
   },
   deleteTask: (todolistId: string, taskId: string) => {
      return instanceAxios.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`).then(res => res.data)
   },
   updateTask: (todolistId: string, taskId: string, task: UpdateDomainBodyTaskType) => {
      return instanceAxios.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, task).then(res => res.data)
   },
}