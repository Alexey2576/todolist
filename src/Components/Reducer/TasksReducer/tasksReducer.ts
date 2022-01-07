import {FilterPriorityTaskType} from "../../../App";
import {v1} from "uuid";
import {TaskType} from "../../TodoLists/ListTasksTodoList/TaskTodoList/TaskTodoList";
import {addTodoListAC, removeTodoListAC} from "../TodoListsReducer/todoListsReducer";

export type TasksStateType = {
   [todoList_ID: string]: TaskType[]
}

type TasksActionType =
   ReturnType<typeof addTaskAC>
   | ReturnType<typeof removeTaskAC>
   | ReturnType<typeof setCheckedTaskAC>
   | ReturnType<typeof changeTaskTitleAC>
   | ReturnType<typeof addTodoListAC>
   | ReturnType<typeof removeTodoListAC>

export const initialTasksState: TasksStateType = {
   "todoList_ID_1": [
      {task_ID: "1", checked: false, task_title: "HTML", task_priority: "High"},
      {task_ID: "2", checked: false, task_title: "CSS", task_priority: "Middle"},
      {task_ID: "3", checked: false, task_title: "REACT", task_priority: "Low"}
   ],
   "todoList_ID_2": [
      {task_ID: "1", checked: false, task_title: "HTML5", task_priority: "High"},
      {task_ID: "2", checked: false, task_title: "CSS3", task_priority: "Middle"},
      {task_ID: "3", checked: false, task_title: "REDUX", task_priority: "Low"}
   ]
}

export const tasksReducer = (state: TasksStateType , action: TasksActionType): TasksStateType => {
   switch (action.type) {
      case "REMOVE_TASK":
         return {
            ...state,
            [action.todoList_ID]: state[action.todoList_ID].filter(t => t.task_ID !== action.task_ID)
         }
      case "ADD_TASK":
         return {
            ...state,
            [action.todoList_ID]: [
               ...state[action.todoList_ID],
               {task_ID: v1(), task_title: action.title, task_priority: action.selectValue, checked: false}
            ]
         }
      case "SET_CHECKED_TASK":
         return {
            ...state,
            [action.todoList_ID]: state[action.todoList_ID].map(t => t.task_ID === action.task_ID ? {...t, checked: action.checked} : t)
         }
      case "CHANGE_TASK_TITLE":
         return {
            ...state,
            [action.todoList_ID]: state[action.todoList_ID].map(t => t.task_ID === action.task_ID ? {...t, task_title: action.newTitle} : t)
         }
      case "ADD_TODOLIST":
         return {
            ...state,
            [action.todoList_ID]: []
         }
      case "REMOVE_TODOLIST":
         const copyState = {...state}
         delete copyState[action.todoList_ID]
         return copyState
      default:
         return state
   }
}

export const addTaskAC = (title: string, todoList_ID: string, selectValue: FilterPriorityTaskType) => ({type: "ADD_TASK", title, todoList_ID, selectValue} as const)
export const removeTaskAC = (todoList_ID: string, task_ID: string) => ({type: "REMOVE_TASK", todoList_ID, task_ID} as const)
export const setCheckedTaskAC = (todoList_ID: string, task_ID: string, checked: boolean) => ({type: "SET_CHECKED_TASK", todoList_ID, task_ID, checked} as const)
export const changeTaskTitleAC = (todoList_ID: string, task_ID: string, newTitle: string) => ({type: "CHANGE_TASK_TITLE", todoList_ID, task_ID, newTitle} as const)
