import axios from "axios";
import {TaskType} from "../Redux/Tasks/Types";

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
   fieldsErrors: FieldsErrorType[]
   resultCode: number
}

export type FieldsErrorType = {
   errorMessage: string
   fieldError: string
}
export type ResponseFetchingTasksType = {
   items: TaskType[]
   totalCount: number
   error: string
}