import {FilterCheckedTaskType, FilterPriorityTaskType} from "../../App";
import {ActionsTodoListsType} from "./todoListsActions";

export type TodoListsStateType = {
   todoList_ID: string
   title: string
   filterPriority: FilterPriorityTaskType
   filterChecked: FilterCheckedTaskType
   selectValue: FilterPriorityTaskType
}

const initialTodoListsState: TodoListsStateType[] = [
   {
      todoList_ID: "todoList_ID_1",
      title: "TodoList 1",
      filterPriority: "All",
      filterChecked: "All",
      selectValue: null
   },
   {
      todoList_ID: "todoList_ID_2",
      title: "TodoList 2",
      filterPriority: "All",
      filterChecked: "All",
      selectValue: null
   }
]

export const todoListsReducer = (state: TodoListsStateType[] = initialTodoListsState, action: ActionsTodoListsType): TodoListsStateType[] => {
   switch (action.type) {
      case "REMOVE_TODOLIST":
         return state.filter(tl => tl.todoList_ID !== action.todoList_ID)
      case "ADD_TODOLIST":
         return [...state, {todoList_ID: action.todoList_ID, title: action.title, filterPriority: "All", filterChecked: "All", selectValue: null}]
      case "CHANGE_TITLE_TODOLIST":
         return state.map(tl => tl.todoList_ID === action.todoList_ID ? {...tl, title: action.newTitle} : tl)
      case "CHANGE_FILTER_CHECKED_TODOLIST":
         return state.map(tl => tl.todoList_ID === action.todoList_ID ? {...tl, filterChecked: action.filterChecked} : tl)
      case "CHANGE_FILTER_PRIORITY_TODOLIST":
         return state.map(tl => tl.todoList_ID === action.todoList_ID ? {...tl, filterPriority: action.filterPriority} : tl)
      case "SET_VALUE_SELECT":
         return state.map(tl => tl.todoList_ID === action.todoList_ID ? {...tl, selectValue: action.selectValue} : tl)
      default: return state
   }
}

