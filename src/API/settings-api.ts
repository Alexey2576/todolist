import axios from "axios";

export const instanceAxios = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1/",
   withCredentials: true,
   headers: {
      "api-key": "0b35bf30-9811-4ef2-8cc3-183ac4bf4914"
   }
})