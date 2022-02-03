import {v1} from "uuid";
import {ActionsTasksType} from "./tasksActions";
import {FilterPriorityTask, FilterStatusTask, TaskType} from "../../API/tasks-api";

export type TasksStateType = {
   [todoList_ID: string]: TaskType[]
}

const initialTasksState: TasksStateType = {
   "todoList_ID_1": [
      {
         id: v1(),
         title: "Task 1",
         description: null,
         todoListId: "todoList_ID_1",
         order: 0,
         status: FilterStatusTask.New,
         priority: FilterPriorityTask.High,
         startDate: null,
         deadline: null,
         addedDate: "2022"
      },
      {
         id: v1(),
         title: "Task 2",
         description: null,
         todoListId: "todoList_ID_1",
         order: 0,
         status: FilterStatusTask.New,
         priority: FilterPriorityTask.Middle,
         startDate: null,
         deadline: null,
         addedDate: "2022"
      },
      {
         id: v1(),
         title: "Task 3",
         description: null,
         todoListId: "todoList_ID_1",
         order: 0,
         status: FilterStatusTask.New,
         priority: FilterPriorityTask.Low,
         startDate: null,
         deadline: null,
         addedDate: "2022"
      },
   ],
   "todoList_ID_2": [
      {
         id: v1(),
         title: "Task 4",
         description: null,
         todoListId: "todoList_ID_2",
         order: 0,
         status: FilterStatusTask.New,
         priority: FilterPriorityTask.High,
         startDate: null,
         deadline: null,
         addedDate: "2022"
      },
      {
         id: v1(),
         title: "Task 5",
         description: null,
         todoListId: "todoList_ID_2",
         order: 0,
         status: FilterStatusTask.New,
         priority: FilterPriorityTask.Middle,
         startDate: null,
         deadline: null,
         addedDate: "2022"
      },
      {
         id: v1(),
         title: "Task 6",
         description: null,
         todoListId: "todoList_ID_2",
         order: 0,
         status: FilterStatusTask.New,
         priority: FilterPriorityTask.Low,
         startDate: null,
         deadline: null,
         addedDate: "2022"
      },
   ]
}

export const tasksReducer = (state: TasksStateType = initialTasksState, action: ActionsTasksType): TasksStateType => {
   switch (action.type) {
      case "REMOVE_TASK":
         return {
            ...state,
            [action.todoList_ID]: state[action.todoList_ID].filter(t => t.id !== action.task_ID)
         }
      case "ADD_TASK":
         return {
            ...state,
            [action.todoList_ID]: [...state[action.todoList_ID], {
               id: v1(),
               title: action.title,
               description: null,
               todoListId: action.todoList_ID,
               order: 0,
               status: FilterStatusTask.New,
               priority: action.selectPriorityValue,
               startDate: null,
               deadline: null,
               addedDate: "2022"}]
         }
      case "SET_CHECKED_TASK":
         return {
            ...state,
            [action.todoList_ID]: state[action.todoList_ID].map(t => t.id === action.task_ID ? {...t, status: action.checked} : t)
         }
      case "CHANGE_TASK_TITLE":
         return {
            ...state,
            [action.todoList_ID]: state[action.todoList_ID].map(t => t.id === action.task_ID ? {...t, task_title: action.newTitle} : t)
         }
      case "ADD_TODOLIST":
         return {...state, [action.todoList_ID]: []}
      case "REMOVE_TODOLIST":
         const copyState = {...state}
         delete copyState[action.todoList_ID]
         return copyState
      default:
         return state
   }
}

