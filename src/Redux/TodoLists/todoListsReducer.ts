import {ActionsTodoListsType} from "./todoListsActions";
import {FilterPriorityTask, FilterStatusTask} from "../Tasks/tasksReducer";

export const todoListsReducer = (state: TodoListsStateType[] = [], action: ActionsTodoListsType): TodoListsStateType[] => {
   switch (action.type) {
      case "SET_ALL_TODOLIST":
         return action.todoLists.map(tl => ({...tl, filterPriority: FilterPriorityTask.All, filterStatus: FilterStatusTask.All, selectPriorityValue: null, progress: null}))
      case "REMOVE_TODOLIST":
         return state.filter(tl => tl.id !== action.todoList_ID)
      case "ADD_TODOLIST":
         return [
            action.todoList,
            ...state
         ]
      case "CHANGE_TITLE_TODOLIST":
         return state.map(tl => tl.id === action.todoList_ID ? {...tl, title: action.newTitle} : tl)
      case "CHANGE_FILTER_STATUS_TODOLIST":
         return state.map(tl => tl.id === action.todoList_ID ? {...tl, filterStatus: action.filterStatus} : tl)
      case "CHANGE_FILTER_PRIORITY_TODOLIST":
         return state.map(tl => tl.id === action.todoList_ID ? {...tl, filterPriority: action.filterPriority} : tl)
      case "SET_VALUE_SELECT":
         return state.map(tl => tl.id === action.todoList_ID ? {...tl, selectPriorityValue: action.selectPriorityValue} : tl)
      case "SET_PROGRESS_TODOLIST":
         return state.map(tl => tl.id === action.todoList_ID ? {...tl, progress: action.progress} : tl)
      default: return state
   }
}

//========================================= TYPES ======================================================================
export type TodoListsStateType = OwnTodoListType & {
   id: string
   title: string
   addedDate: string
   order: number
}

export type  OwnTodoListType = {
   filterPriority: FilterPriorityTask,
   filterStatus: FilterStatusTask,
   selectPriorityValue: FilterPriorityTask | null
   progress: ProgressTodoListType
}
export type ProgressTodoListType = "add-task" | "remove-todolist" | null
