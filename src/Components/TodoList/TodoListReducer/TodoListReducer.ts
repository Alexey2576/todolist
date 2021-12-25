import {FilterType, TodoListStateType} from "../../../App";
import {v1} from "uuid";

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
      default:
         throw new Error("Error")
   }
}
export type DispatchType =
   { type: "ADD_TODOLIST", todoList_ID: string }
   | { type: "ADD_TASK", title: string, todoList_ID: string, selectValue: FilterType }
   | { type: "REMOVE_TASK", todoList_ID: string, task_ID: string }
   | { type: "REMOVE_TODOLIST", todoList_ID: string }
   | { type: "SET_VALUE_INPUT_ADD_TODOLIST", title: string }
   | { type: "SET_FILTER_TODOLIST", todoList_ID: string, filter: FilterType }
   | { type: "SET_VALUE_SELECT", todoList_ID: string, selectValue: FilterType }
export const addTodoListAC = (
   dispatch: (dispatch: DispatchType) => void,
   todoList_ID: string
) => dispatch({type: "ADD_TODOLIST", todoList_ID})
export const addTaskAC = (
   dispatch: (dispatch: DispatchType) => void,
   title: string,
   todoList_ID: string,
   selectValue: FilterType
) => dispatch({type: "ADD_TASK", title, todoList_ID, selectValue})
export const removeTaskAC = (
   dispatch: (dispatch: DispatchType) => void,
   todoList_ID: string,
   task_ID: string
) => dispatch({type: "REMOVE_TASK", todoList_ID, task_ID})
export const removeTodoListAC = (
   dispatch: (dispatch: DispatchType) => void,
   todoList_ID: string,
) => dispatch({type: "REMOVE_TODOLIST", todoList_ID})
export const setValueInputAddTodoListAC = (
   dispatch: (dispatch: DispatchType) => void,
   title: string,
) => dispatch({type: "SET_VALUE_INPUT_ADD_TODOLIST", title: title})
export const setFilterTodoListAC = (
   dispatch: (dispatch: DispatchType) => void,
   todoList_ID: string,
   filter: FilterType,
) => dispatch({type: "SET_FILTER_TODOLIST", todoList_ID, filter})
export const setValueSelectAC = (
   dispatch: (dispatch: DispatchType) => void,
   todoList_ID: string,
   selectValue: FilterType,
) => dispatch({type: "SET_VALUE_SELECT", todoList_ID, selectValue})
