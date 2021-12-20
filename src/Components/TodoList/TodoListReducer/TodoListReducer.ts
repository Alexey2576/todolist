import {FilterType, TodoListStateType} from "../../../App";
import {v1} from "uuid";

export type DispatchTodoListType = {
   type:
      "ADD_TODOLIST" |
      "ADD_TASK" |
      "REMOVE_TODOLIST" |
      "REMOVE_TASK" |
      "SET_VALUE_INPUT_ADD_TODOLIST" |
      "SET_VALUE_ENTER_ADD_TODOLIST" |
      "SET_FILTERED_TASKS" |
      "SET_FILTER_TODOLIST"
   title?: string
   todoList_ID?: string
   task_ID?: string
   priority?: FilterType
}

export const todoListReducer = (state: TodoListStateType, action: DispatchTodoListType): TodoListStateType => {
   switch (action.type) {
      case "ADD_TODOLIST": {
         return {
            ...state,
            todoLists: [...state.todoLists, {
               todoList_ID: action.todoList_ID as string,
               title: state.valueInputAddTodoList,
               filter: "All"
            }],
            tasks: {...state.tasks, [action.todoList_ID as string]: []},
            valueInputAddTodoList: ""
         }
      }
      case "ADD_TASK": {
         return {
            ...state,
            tasks: {
               ...state.tasks,
               [action.todoList_ID as string]: [...state.tasks[action.todoList_ID as string], {
                  task_ID: v1(),
                  task_title: action.title as string,
                  task_priority: action.priority as FilterType
               }]
            }
         }
      }
      case "REMOVE_TASK": {
         return {
            ...state,
            tasks: {
               ...state.tasks,
               [action.todoList_ID as string]: state.tasks[action.todoList_ID as string].filter(t => t.task_ID !== action.task_ID)
            }
         }
      }
      case "REMOVE_TODOLIST": {
         delete state.tasks[action.todoList_ID as string]
         return {
            ...state,
            todoLists: state.todoLists.filter(tl => tl.todoList_ID !== action.todoList_ID),
            tasks: {...state.tasks}
         }
      }
      case "SET_VALUE_INPUT_ADD_TODOLIST": {
         return {
            ...state,
            valueInputAddTodoList: action.title as string
         }
      }
      case "SET_FILTER_TODOLIST": {
         return {
            ...state,
            todoLists: state.todoLists.map(tl => tl.todoList_ID === action.todoList_ID ? {
                  ...tl,
                  filter: action.priority as FilterType
               } : tl)
         }
      }
      default:
         throw new Error("Error")
   }
}

export const addTodoListAC = (
   dispatch: (dispatch: DispatchTodoListType) => void,
   todoList_ID: string
) => dispatch({type: "ADD_TODOLIST", todoList_ID})
export const addTaskAC = (
   dispatch: (dispatch: DispatchTodoListType) => void,
   title: string,
   todoList_ID: string,
   selectPriorityItem: FilterType
) => dispatch({type: "ADD_TASK", title, todoList_ID, priority: selectPriorityItem})
export const removeTaskAC = (
   dispatch: (dispatch: DispatchTodoListType) => void,
   todoList_ID: string,
   task_ID: string
) => dispatch({type: "REMOVE_TASK", todoList_ID, task_ID})
export const removeTodoListAC = (
   dispatch: (dispatch: DispatchTodoListType) => void,
   todoList_ID: string,
) => dispatch({type: "REMOVE_TODOLIST", todoList_ID})
export const setValueInputAddTodoListAC = (
   dispatch: (dispatch: DispatchTodoListType) => void,
   title: string,
) => dispatch({type: "SET_VALUE_INPUT_ADD_TODOLIST", title})
// export const setValueEnterAddTodoListAC = () => {
// }
export const setFilterTodoListAC = (
   dispatch: (dispatch: DispatchTodoListType) => void,
   todoList_ID: string,
   filter: FilterType,
) => dispatch({type: "SET_FILTER_TODOLIST", todoList_ID, priority: filter})
export const setFilteredTasksAC = () => {
}
