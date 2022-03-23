import axios from "axios";
import {TaskType} from "../Redux/Tasks/tasksReducer";

export const instanceAxios = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1/",
   withCredentials: true,
   headers: {
      "api-key": "0b35bf30-9811-4ef2-8cc3-183ac4bf4914"
   }
})

//========================================= TYPES ======================================================================
export type CommonResponseType<T = {}> = {
   data: T
   messages: string[]
   fieldsErrors: string[]
   resultCode: number
}
export type getTasksType = {
   items: TaskType[]
   totalCount: number
   error: null | string
}