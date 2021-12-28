import {FilterType, TodoListStateType} from "../../../App";
import {v1} from "uuid";

export type DispatchType =
   ReturnType<typeof addTodoListAC>
   | ReturnType<typeof addTaskAC>
   | ReturnType<typeof removeTaskAC>
   | ReturnType<typeof removeTodoListAC>
   | ReturnType<typeof setValueInputAddTodoListAC>
   | ReturnType<typeof setFilterTodoListAC>
   | ReturnType<typeof setValueSelectAC>
   | ReturnType<typeof setCheckedTaskAC>

export const todoListReducer = (state: TodoListStateType, action: DispatchType): TodoListStateType => {
   switch (action.type) {
      case "ADD_TODOLIST": {
         return {
            ...state,
            todoLists: [...state.todoLists, {
               todoList_ID: action.todoList_ID,
               title: state.valueInputAddTodoList,
               filter: "All",
               selectValue: "High"
            }],
            tasks: {...state.tasks, [action.todoList_ID]: []},
            valueInputAddTodoList: ""
         }
      }
      case "ADD_TASK": {
         return {
            ...state,
            tasks: {
               ...state.tasks,
               [action.todoList_ID]: [...state.tasks[action.todoList_ID], {
                  task_ID: v1(),
                  checked: false,
                  task_title: action.title,
                  task_priority: action.selectValue
               }]
            }
         }
      }
      case "REMOVE_TASK": {
         return {
            ...state,
            tasks: {
               ...state.tasks,
               [action.todoList_ID]: state.tasks[action.todoList_ID].filter(t => t.task_ID !== action.task_ID)
            }
         }
      }
      case "REMOVE_TODOLIST": {
         delete state.tasks[action.todoList_ID]
         return {
            ...state,
            todoLists: state.todoLists.filter(tl => tl.todoList_ID !== action.todoList_ID),
            tasks: {...state.tasks}
         }
      }
      case "SET_VALUE_INPUT_ADD_TODOLIST": {
         return {
            ...state,
            valueInputAddTodoList: action.title
         }
      }
      case "SET_FILTER_TODOLIST": {
         return {
            ...state,
            todoLists: state.todoLists.map(tl => tl.todoList_ID === action.todoList_ID ? {
               ...tl,
               filter: action.filter
            } : tl)
         }
      }
      case "SET_VALUE_SELECT": {
         return {
            ...state,
            todoLists: state.todoLists.map(tl => tl.todoList_ID === action.todoList_ID ? {
               ...tl,
               selectValue: action.selectValue
            } : tl)
         }
      }
      case "SET_CHECKED_TASK": {
         return {
            ...state,
            tasks: {...state.tasks,
               [action.todoList_ID]: state.tasks[action.todoList_ID].map(t => t.task_ID === action.task_ID ? {...t, checked: action.checked} : t)}
         }
      }
      default:
         throw new Error("Error")
   }
}

export const addTodoListAC = (todoList_ID: string) => ({type: "ADD_TODOLIST", todoList_ID} as const)
export const addTaskAC = (title: string, todoList_ID: string, selectValue: FilterType) => ({type: "ADD_TASK", title, todoList_ID, selectValue} as const)
export const removeTaskAC = (todoList_ID: string, task_ID: string) => ({type: "REMOVE_TASK", todoList_ID, task_ID} as const)
export const removeTodoListAC = (todoList_ID: string) => ({type: "REMOVE_TODOLIST", todoList_ID} as const)
export const setValueInputAddTodoListAC = (title: string) => ({type: "SET_VALUE_INPUT_ADD_TODOLIST", title: title} as const)
export const setFilterTodoListAC = (todoList_ID: string, filter: FilterType) => ({type: "SET_FILTER_TODOLIST", todoList_ID, filter} as const)
export const setValueSelectAC = (todoList_ID: string, selectValue: FilterType) => ({type: "SET_VALUE_SELECT", todoList_ID, selectValue} as const)
export const setCheckedTaskAC = (todoList_ID: string, task_ID: string, checked: boolean) => ({type: "SET_CHECKED_TASK", todoList_ID, task_ID, checked} as const)
