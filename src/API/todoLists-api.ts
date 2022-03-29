import {TodoListsStateType} from "../Redux/TodoLists/Types";
import {CommonResponseType, instanceAxios} from "./settings-api";

export const todoListsApi = {
   getTodoLists: () => {
      return instanceAxios.get<TodoListsStateType[]>(`todo-lists`).then(res => res.data)
   },
   createTodoList: (title: string) => {
      return instanceAxios.post<CommonResponseType<{ item: TodoListsStateType }>>(`todo-lists`, { title }).then(res => res.data)
   },
   deleteTodoList: (todolistId: string) => {
      return instanceAxios.delete<CommonResponseType>(`todo-lists/${todolistId}`).then(res => res.data)
   },
   updateTodoList: (todolistId: string, title: string) => {
      return instanceAxios.put<CommonResponseType>(`todo-lists/${todolistId}`, { title }).then(res => res.data)
   },
}