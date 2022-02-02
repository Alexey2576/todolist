import {v1} from "uuid";
import {TaskType} from "../../Components/TodoLists/TodoList/ListTasksTodoList/TaskTodoList/TaskTodoList";
import {ActionsTasksType} from "./tasksActions";

export type TasksStateType = {
   [todoList_ID: string]: TaskType[]
}

const initialTasksState: TasksStateType = {
   "todoList_ID_1": [
      {task_ID: v1(), checked: false, task_title: "HTML", task_priority: "High"},
      {task_ID: v1(), checked: false, task_title: "CSS", task_priority: "Middle"},
      {task_ID: v1(), checked: false, task_title: "REACT", task_priority: "Low"}
   ],
   "todoList_ID_2": [
      {task_ID: v1(), checked: false, task_title: "HTML5", task_priority: "High"},
      {task_ID: v1(), checked: false, task_title: "CSS3", task_priority: "Middle"},
      {task_ID: v1(), checked: false, task_title: "REDUX", task_priority: "Low"}
   ]
}

export const tasksReducer = (state: TasksStateType = initialTasksState , action: ActionsTasksType): TasksStateType => {
   switch (action.type) {
      case "REMOVE_TASK":
         return {...state, [action.todoList_ID]: state[action.todoList_ID].filter(t => t.task_ID !== action.task_ID)}
      case "ADD_TASK":
         return {
            ...state,
            [action.todoList_ID]: [...state[action.todoList_ID], {task_ID: v1(), task_title: action.title, task_priority: action.selectValue, checked: false}]
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
         return {...state, [action.todoList_ID]: []}
      case "REMOVE_TODOLIST":
         const copyState = {...state}
         delete copyState[action.todoList_ID]
         return copyState
      default: return state
   }
}

