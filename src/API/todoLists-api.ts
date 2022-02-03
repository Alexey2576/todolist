import {instanceAxios} from "./settings-api";
import {OwnTodoListType} from "../Reducers/TodoListsReducer/todoListsReducer";



export type TodoListsStateType = OwnTodoListType & {
   id: string
   title: string
   addedDate: string
   order: number
}

export type CommonResponseType<T = {}> = {
   data: T
   messages: string[]
   fieldsErrors: string[]
   resultCode: number
}



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