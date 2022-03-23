import {CommonResponseType, instanceAxios} from "./settings-api";
import {AxiosResponse} from "axios";

export const authAPI = {
   login(data: LoginDataType) {
      return instanceAxios
         .post<LoginDataType, AxiosResponse<CommonResponseType<{ userId: number }>>>(`auth/login`, data)
         .then(res => res.data)
   }
}

export type LoginDataType = {
   email: string
   password: string
   rememberMe?: boolean
   captcha?: string
}