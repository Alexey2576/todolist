import {instanceAxios} from "./settings-api";
import {CommonResponseType} from "./todoLists-api";

export type UpdateBodyTaskType = {
   title: string
   description: string
   completed: boolean
   status: number
   priority: number
   startDate: string
   deadline: string
}

type TaskType = {
   id: string
   title: string
   description: null | string
   completed: boolean
   todoListId: string
   todoList?: any
   order: number
   status: number
   priority: number
   startDate: null | string
   deadline: null | string
   addedDate: string
}

type getTasksType = {
   items: TaskType[]
   totalCount: number
   error: null | string
}

export const tasksApi = {
   getTasks: (todolistId: string, count: number, page: number) => {
      return instanceAxios.get<getTasksType>(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`).then(res => res.data)
   },
   createTask: (todolistId: string, title: string) => {
      return instanceAxios.post<CommonResponseType< {item: TaskType} >>(`todo-lists/${todolistId}/tasks`, { title }).then(res => res.data)
   },
   deleteTask: (todolistId: string, taskId: string) => {
      return instanceAxios.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`).then(res => res.data)
   },
   updateTask: (todolistId: string, taskId: number, task: UpdateBodyTaskType) => {
      return instanceAxios.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, { task }).then(res => res.data)
   },
}